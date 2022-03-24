import { File, env, Directory } from 'atma-io';
import { ICommand } from '../ICommand';
import { Shell, run } from 'shellbee';
import { class_Uri } from 'atma-utils';
import { $console } from '@core/utils/$console';

interface IInitOptions {
    dir?: string
    source?: 'git' | 'npm'
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
    repo = `https://github.com/tenbits/dequanto.git`;

    constructor(public directory: class_Uri, public params: IInitOptions) {

    }

    async init() {
        await this.ensureGit();
        await this.ensurePackageJson();
        await this.ensureDequanto();
        await this.ensureTsConfig();
        await this.ensureDependencies();
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
                        throw new Error(`Target value in ${key} is not an array`);
                    }
                    for (let item of val) {
                        if (typeof item === 'object') {
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
                    if (typeof target[key] !== 'object') {
                        throw new Error(`Target value in ${key} is not an object`);
                    }
                    let $modified = extendWithDefaultValues(target[key], val);
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

        let added = [];
        let deps = pckgCurrent.dependencies;
        for (let name in pckgDequanto.dependencies) {
            if (name in deps === false) {
                deps[name] = pckgDequanto.dependencies[name];
                added.push(name);
            }
        }

        $console.toast(`Save new gray<package.json> with new deps: ${added}`);
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
            ? "node_modules/dequanto/src/*"
            : "dequanto/src/*";
        pckg.compilerOptions.paths['@dequanto-contracts/*'] = isNpm
            ? "node_modules/dequanto/contracts/*"
            : "dequanto/contracts/*";

        $console.toast('Save modified tsconfig');
        await file.writeAsync(pckg);
    }
}
