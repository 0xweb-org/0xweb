import { File, env, Directory } from 'atma-io';
import { ICommand } from '../ICommand';
import { run } from 'shellbee';
import { class_Uri } from 'atma-utils';
import { $console } from '@core/utils/$console';
import { $path } from '@core/utils/$path';

interface IInitOptions {
    dir?: string
    source?: 'git' | 'npm'
    hardhat?: boolean
}
export function CInit() {
    return <ICommand>{
        command: 'init',
        description: [
            'Clone dequanto sources and configure aliases in tsconfig'
        ],
        params: {
            '-d, --dir': {
                description: 'Target directory. Default: current working directory'
            },
            '-s, --source': {
                description: 'Values: git, npm. If "git" - dequanto repo will be installed as a submodule, if "npm" - dequanto will be installed as node_module',
                default: 'npm'
            },
            '--hardhat': {
                description: 'Initialize also Hardhat project',
                type: 'boolean'
            }
        },
        async process(args: string[], params: IInitOptions) {
            let cwd = new class_Uri(`file://${process.cwd()}/`);
            let directory: class_Uri;
            if (params.dir) {
                directory = new class_Uri(params.dir + '/');
                if (directory.isRelative()) {
                    directory = cwd.combine(directory);
                }
                await Directory.ensureAsync(directory.toString());
            } else {
                directory = cwd;
            }



            $console.log(`Prepare dequanto package in bold<${directory.toLocalDir()}>`);
            let worker = new InitWorker(directory, params);
            await worker.init();
        }
    };
}

class InitWorker {
    repo = `https://github.com/0xweb-org/dequanto.git`;

    constructor(public directory: class_Uri, public params: IInitOptions) {

    }

    async init() {
        await this.ensureGit();
        await this.ensurePackageJson();
        await this.ensureDequanto();
        await this.ensureTsConfig();
        await this.ensureTsConfigExtended();
        await this.ensureDependencies();
        await this.ensureHardhatConfig();

        $console.log(`green<bold<Completed>>`);
    }

    private getPathDequanto(path?: string) {
        let isNpm = this.params.source !== 'git';
        let uri = this.directory.combine(isNpm ? './node_modules/dequanto/' : './dequanto/');
        if (path != null) {
            uri = uri.combine(path);
        }
        return uri.toString();
    }

    private async ensureDequanto() {
        if (this.params.source === 'git') {
            await this.ensureDequantoFromGit();
            return;
        }
        await this.ensureDequantoFromNpm();
    }
    private async ensureDequantoFromNpm() {
        let hasDependency = await Directory.existsAsync(this.getPathDequanto());
        if (hasDependency) {
            return;
        }
        await run({
            command: `npm install dequanto`,
            cwd: this.directory.toLocalDir(),
        });
    }
    private async ensureDequantoFromGit() {
        let hasRepo = await Directory.existsAsync(this.getPathDequanto());
        if (hasRepo) {
            return;
        }
        await run({
            command: `git submodule add ${this.repo}`,
            cwd: this.directory.toLocalDir(),
        });
    }


    private async ensureGit() {
        $console.toast('Check git repository');
        let hasGit = await Directory.existsAsync(this.directory.combine('./.git/').toString());
        if (hasGit) {
            return;
        }
        $console.toast('Initialize git repository');
        await run({
            command: 'git init',
            cwd: this.directory.toLocalDir(),
        });

        await this.ensureFile('./.gitignore', {
            create() {
                return [
                    'node_modules'
                ].join('\n');
            },
            edit(content) {
                return null;
            }
        })
    }

    private async ensurePackageJson() {
        let path = this.directory.combine('./package.json');
        let file = new File(path);
        let pkg = {} as any;
        let exists = await file.existsAsync();
        if (exists) {
            pkg = await file.readAsync();
        }

        let modified = extendWithDefaultValues(pkg, {
            "atma": {
                "plugins": [
                    "atma-loader-ts"
                ],
                "settings": {
                    "include": {
                        "amd": true,
                        "extensionDefault": {
                            "js": "ts"
                        },
                        "routes": "#import ./tsconfig.json compilerOptions.paths"
                    },
                    "atma-loader-ts": {
                        "sourceMap": true,
                        "typescript": "#import ./tsconfig-atma.json"
                    }
                }
            }
        });

        if (exists === false || modified === true) {
            await file.writeAsync(pkg);
        }

        function extendWithDefaultValues(target, source) {
            let modified = false;
            for (let key in source) {
                let val = source[key];
                if (target[key] == null) {
                    target[key] = val;
                    modified = true;
                    continue;
                }
                if (Array.isArray(val) && val.length > 0) {
                    let targetArr = target[key];
                    if (Array.isArray(targetArr) === false) {
                        console.dir(targetArr, { depth: null });
                        throw new Error(`Target value in ${key} is not an array`);
                    }
                    for (let item of val) {
                        if (typeof item === 'object') {
                            console.dir(item, { depth: null });
                            throw new Error(`Not implemented. Only strings in array are supported`)
                        }
                        if (targetArr.includes(item) === false) {
                            modified = true;
                            targetArr.push(item);
                        }
                    }
                    continue;
                }
                if (typeof val === 'object') {
                    let targetObj = target[key];

                    if (typeof targetObj !== 'object') {
                        if (typeof targetObj === 'string' && targetObj.startsWith('#import')) {
                            // using appcfg partial loaders, dismiss for now, @todo for the future - follow the link, and extend values there
                            continue;
                        }
                        console.dir(targetObj, { depth: null });
                        throw new Error(`Target value in ${key} is not an object`);
                    }
                    let $modified = extendWithDefaultValues(targetObj, val);
                    modified = $modified || modified;
                }
            }
            return modified;
        }

    }

    private async ensureDependencies() {
        $console.toast('Check and install required dequanto dependencies');

        let filePackageCurrent = new File(this.directory.combine('./package.json'));
        let filePackageDequanto = new File(this.getPathDequanto('package.json'));

        let [pkgDequanto, pkgCurrent] = await Promise.all([
            filePackageDequanto.readAsync<any>(),
            filePackageCurrent.readAsync<any>()
        ]);
        if (pkgCurrent.dependencies == null) {
            pkgCurrent.dependencies = {};
        }

        let requiredDeps = pkgDequanto.dependencies;
        if (this.params.hardhat) {
            requiredDeps = {
                ...requiredDeps,
                'atma-loader-ts': 'latest',
                'hardhat': 'latest',
                '@0xweb/hardhat': 'latest'
            };
        }

        let added = [];
        let deps = pkgCurrent.dependencies;
        for (let name in requiredDeps) {
            if (name in deps === false) {
                deps[name] = requiredDeps[name];
                added.push(name);
            }
        }
        if (added.length === 0) {
            $console.toast(`Required dependencies are already bold<green<installed>>`);
            return;
        }

        $console.log(`Extending gray<package.json> with new dependencies: \n ${added.map(x => `   bold<${x}>`).join('\n')}`);
        await filePackageCurrent.writeAsync(pkgCurrent);
        $console.log(`Starting gray<npm install>`);
        await run({
            command: 'npm install',
            cwd: this.directory.toLocalDir(),
        });

        // Repeat the install to fix the npm bug:
        // If initially the 0xweb had some transient dependency version < than in pkgCurrent
        // after the first install, npm removes that package from node_modules.
        await run({
            command: `npm install`,
            cwd: this.directory.toLocalDir(),
        });
    }

    private async ensureTsConfig() {
        $console.toast('Check tsconfig.json');

        let path = this.directory.combine('./tsconfig.json');
        let file = new File(path);
        let pkg: any = await file.existsAsync()
            ? await file.readAsync()
            : {};

        if (pkg.compilerOptions == null) {
            pkg.compilerOptions = {
                "baseUrl": "./",
                "declaration": true,
                "target": "ES2020",
                "module": "NodeNext",
                "sourceMap": false,
                "experimentalDecorators": true,
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true,
                "moduleResolution": "NodeNext",
            };
        }
        if (pkg.compilerOptions.paths == null) {
            pkg.compilerOptions.paths = {};
        }

        if (pkg.compilerOptions.paths['@dequanto/*'] != null) {
            return;
        }

        if (pkg.compilerOptions.baseUrl == null) {
            pkg.compilerOptions.baseUrl = './';
        }

        if (pkg.compilerOptions.moduleResolution == null) {
            pkg.compilerOptions.moduleResolution = 'node';
        }


        let isNpm = this.params.source !== 'git';
        pkg.compilerOptions.paths['@dequanto/*'] = isNpm
            ? ["node_modules/dequanto/src/*"]
            : ["dequanto/src/*"];
        pkg.compilerOptions.paths['@dequanto-contracts/*'] = isNpm
            ? ["node_modules/dequanto/src/prebuilt/*"]
            : ["dequanto/src/prebuilt/*"];

        pkg.compilerOptions.paths['dequanto/*'] = isNpm
            ? ["node_modules/dequanto/src/*"]
            : ["dequanto/src/*"];

        pkg.compilerOptions.paths['@0xc/*'] = ["0xc/*"]

        $console.toast('Save modified tsconfig');
        await file.writeAsync(pkg);
    }

    private async ensureTsConfigExtended() {

        let path = this.directory.combine('./tsconfig-atma.json');
        let file = new File(path);
        let pkg: any = await file.existsAsync()
            ? await file.readAsync()
            : {};

        let modified = false;
        if (pkg.compilerOptions?.module == null) {
            pkg.compilerOptions ??= {};
            pkg.compilerOptions.module = 'AMD';
            modified = true;
        }
        if (pkg.compilerOptions?.target == null) {
            pkg.compilerOptions ??= {};
            pkg.compilerOptions.target = "ES2022";
            modified = true;
        }
        if (pkg.extends == null) {
            pkg.extends = './tsconfig.json';
            modified = true;
        }
        if (modified) {
            await file.writeAsync(pkg);
        }
    }

    private async ensureHardhatConfig() {
        const template = await File.readAsync<string>($path.resolve('/templates/hardhat.config.js'), { skipHooks: true });
        await this.ensureFile(`hardhat.config.js`, {
            create() {
                return template;
            },
            edit(content: string) {
                let requires = template
                    .split('\n')
                    .map(line => /require\("(?<name>[^"]+)"\)/.exec(line))
                    .filter(x => x != null)
                    .map(x => x.groups.name)
                    .filter(name => content.includes(name) === false)
                    .map(name => `require("${name}")`)
                    .join(env.newLine);

                return requires + env.newLine + content;
            }
        });
    }

    private async ensureFile(filename: string, handler: {
        create: () => string | Promise<string>
        edit: (content: string) => string | null | Promise<string | null>
    }) {
        if (await File.existsAsync(filename) === false) {
            let content = await handler.create();
            await File.writeAsync(filename, content, { skipHooks: true });
            return;
        }
        let current = await File.readAsync<string>(filename, { skipHooks: true });
        let modified = await handler.edit(current);
        if (modified != null && modified !== current) {
            await File.writeAsync(filename, modified, { skipHooks: true });
            return;
        }
    }
}
