import { File, env, Directory } from 'atma-io';
import { ICommand } from '../ICommand';
import { Shell, run } from 'shellbee';
import { class_Uri } from 'atma-utils';
import { $console } from '@core/utils/$console';
import { $cli } from '@core/utils/$cli';
import { $path } from '@core/utils/$path';

interface IInitOptions {
    dir?: string
    source?: 'git' | 'npm'
    hardhat?: boolean
}
export const CInit: ICommand = {
    command: 'init',
    description: [
        'Clone dequanto sources and configurate aliases in tsconfig'
    ],
    params: {
        '-d, --dir': {
            description: 'Target directory. Default: current working directory'
        },
        '-s, --source': {
            description: 'Values: git, npm. If "git" - dequanto repo will be installed as a submodule, if "npm" - dequanto will be installed as node_module'
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



        $console.log(`Prepair dequanto package in bold<${directory.toLocalDir()}>`);
        let worker = new InitWorker(directory, params);
        await worker.init();
    }
}

class InitWorker {
    repo = `https://github.com/0xweb/dequanto.git`;

    constructor(public directory: class_Uri, public params: IInitOptions) {

    }

    async init() {
        await this.ensureGit();
        await this.ensurePackageJson();
        await this.ensureDequanto();
        await this.ensureTsConfig();
        await this.ensureDependencies();
        await this.ensureHardhatConfig();

        $console.log(`green<bold<Completed>>`);
    }

    private getPathDequanto(path?: string) {
        let isNpm = this.params.source === 'npm';
        let uri = this.directory.combine(isNpm ? './node_modules/dequanto/' : './dequanto/');
        if (path != null) {
            uri = uri.combine(path);
        }
        return uri.toString();
    }

    private async ensureDequanto() {
        if (this.params.source === 'npm') {
            await this.ensureDequantoFromNpm();
            return;
        }
        await this.ensureDequantoFromGit();
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
            create () {
                return [
                    'node_modules'
                ].join('\n');
            },
            edit (content) {
                return null;
            }
        })
    }

    private async ensurePackageJson() {
        let path = this.directory.combine('./package.json');
        let file = new File(path);
        let pckg = {} as any;
        let exists = await file.existsAsync();
        if (exists) {
            pckg = await file.readAsync();
        }

        let modified = extendWithDefaultValues(pckg, {
            "atma": {
                "plugins": [
                    "atma-loader-ts"
                ],
                "settings": {
                    "include": {
                        "amd": true,
                        "extentionDefault": {
                            "js": "ts"
                        },
                        "routes": {
                            "@core": "src/{0}",
                            "@dequanto": "dequanto/src/{0}"
                        }
                    },
                    "atma-loader-ts": {
                        "typescript": {
                            "compilerOptions": {
                                "module": "AMD",
                                "sourceMap": false,
                                "experimentalDecorators": true,
                                "esModuleInterop": true,
                                "allowSyntheticDefaultImports": true,
                                "target": "ES2020"
                            }
                        }
                    }
                }
            }
        });

        if (exists === false || modified === true) {
            await file.writeAsync(pckg);
        }

        function extendWithDefaultValues (target, source) {
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
                        console.dir(targetArr, { depth: null});
                        throw new Error(`Target value in ${key} is not an array`);
                    }
                    for (let item of val) {
                        if (typeof item === 'object') {
                            console.dir(item, { depth: null});
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
        let filePackageDequanto = new File(this.directory.combine('./dequanto/package.json'));

        let [pckgDequanto, pckgCurrent] = await Promise.all([
            filePackageDequanto.readAsync<any>(),
            filePackageCurrent.readAsync<any>()
        ]);
        if (pckgCurrent.dependencies == null) {
            pckgCurrent.dependencies = {};
        }

        let requiredDeps = pckgDequanto.dependencies;

        if (this.params.hardhat) {
            requiredDeps = {
                ...requiredDeps,
                'hardhat': 'latest',
                '@nomiclabs/hardhat-web3': 'latest',
                '@nomiclabs/hardhat-waffle': 'latest',
                '@nomiclabs/hardhat-etherscan': 'latest',
                '@0xweb/hardhat': 'latest'
            };
        }

        let added = [];
        let deps = pckgCurrent.dependencies;
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
        await filePackageCurrent.writeAsync(pckgCurrent);
        $console.log(`Starting gray<npm install>`);
        await run({
            command: 'npm install',
            cwd: this.directory.toLocalDir(),
        });
    }

    private async ensureTsConfig() {
        $console.toast('Check tsconfig.json');

        let path = this.directory.combine('./tsconfig.json');
        let file = new File(path);
        let pckg: any = await file.existsAsync()
            ? await file.readAsync()
            : {};

        if (pckg.compilerOptions == null) {
            pckg.compilerOptions = {
                "baseUrl": "./",
                "declaration": true,
                "target": "es5",
                "module": "commonjs",
                "sourceMap": false,
                "experimentalDecorators": true,
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true
            };
        }
        if (pckg.compilerOptions.paths == null) {
            pckg.compilerOptions.paths = {};
        }

        if (pckg.compilerOptions.paths['@dequanto/*'] != null) {
            return;
        }

        if (pckg.compilerOptions.baseUrl == null) {
            pckg.compilerOptions.baseUrl = './';
        }


        let isNpm = this.params.source === 'npm';
        pckg.compilerOptions.paths['@dequanto/*'] = isNpm
            ? [ "node_modules/dequanto/src/*" ]
            : [ "dequanto/src/*" ];
        pckg.compilerOptions.paths['@dequanto-contracts/*'] = isNpm
            ? [ "node_modules/dequanto/contracts/*" ]
            : [ "dequanto/contracts/*" ];

        pckg.compilerOptions.paths['@0xweb/*'] = [ "0xweb/*" ]

        $console.toast('Save modified tsconfig');
        await file.writeAsync(pckg);
    }

    private async ensureHardhatConfig () {
        const template = await File.readAsync<string>($path.resolve('/templates/hardhat.config.js'), { skipHooks: true });
        this.ensureFile(`hardhat.config.js`, {
            create () {
                return template;
            },
            edit (content: string) {

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

    private async ensureFile (filename: string, handler: {
        create: () => string
        edit: (content: string) => string | null
    }) {
        if (await File.existsAsync(filename) === false) {
            let content = handler.create();
            await File.writeAsync(filename, content, { skipHooks: true });
            return;
        }
        let current = await File.readAsync<string>(filename, { skipHooks: true });
        let modified = handler.edit(current);
        if (modified != null && modified !== current) {
            await File.writeAsync(filename, modified, { skipHooks: true });
            return;
        }
    }
}
