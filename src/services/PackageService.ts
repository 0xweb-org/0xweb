import di from 'a-di';
import alot from 'alot';
import { IPackageItem, IPackageJson } from '@core/models/IPackageJson';
import { IPlatformTools, PlatformFactory } from '@dequanto/chains/PlatformFactory';
import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import { File, Directory, env } from 'atma-io';
import { $address } from '@dequanto/utils/$address';
import { TAbiItem } from '@dequanto/types/TAbi';
import memd from 'memd';
import { DeploymentsStorage, IDeployment } from '@dequanto/contracts/deploy/storage/DeploymentsStorage';
import { $logger } from '@dequanto/utils/$logger';
import { $require } from '@dequanto/utils/$require';
import { platform } from 'process';

type TDeploymentEntry = {
    platform: string;
    name: string;
    deployments: IDeployment[];
};

export class PackageService {
    constructor(public chain?: IPlatformTools) {

    }

    async getPackage (name: string): Promise<IPackageItem> {
        let localList = await this.getLocalList();
        let pkg = await this.findFromList(name, localList);
        if (pkg == null) {
            let deploymentsList = await this.getDeploymentsList();
            pkg = await this.findFromList(name, deploymentsList);
        }
        if (pkg == null) {
            let globalList = await this.getGlobalList();
            pkg = await this.findFromList(name, globalList);
        }
        if (pkg == null) {
            pkg = await this.getBuiltIn(name);
        }
        if (pkg != null && pkg.address == null) {
            // if the package was installed via local compilation/deployment
            let deploymentsList = await this.getDeploymentsList();
            let platformDeployments = deploymentsList.filter(d => d.platform === this.chain.platform);
            let deployment = platformDeployments.find(d => d.name === pkg.name);

            pkg.address = deployment?.address;
        }
        return pkg;
    }
    async getLocalPackages () {
        return await this.getLocalList();
    }

    /**
     * Make sure the method is called in a queue, to prevent race conditions for save
     */
    @memd.deco.queued()
    async savePackage (pkg: IPackageItem, opts: { global: boolean }) {
        let packagePath = opts?.global
            ? env.appdataDir.combine('.dequanto/0xweb.json').toString()
            : `0xweb.json`

        let json = {} as IPackageJson;
        if (await File.existsAsync(packagePath)) {
            json = await File.readAsync(packagePath);
        }
        let asContract = pkg.address != null;
        if (asContract) {
            if (json.contracts == null) {
                json.contracts = {};
            }
            if (json.contracts[pkg.platform] == null) {
                json.contracts[pkg.platform] = {};
            }
            let platformPkgs = json.contracts[pkg.platform]
            if (pkg.name) {
                for (let key in platformPkgs) {
                    if (pkg.name === platformPkgs[key].name) {
                        delete platformPkgs[key];
                        break;
                    }
                }
            }
            platformPkgs[pkg.address] = {
                name: pkg.name,
                main: pkg.main,
                contractName: pkg.contractName,
                implementation: pkg.implementation
            };
        } else {
            if (json.dependencies == null) {
                json.dependencies = {};
            }
            if (json.dependencies[pkg.name] == null) {
                json.dependencies[pkg.name] = {
                    main: pkg.main,
                    contractName: pkg.contractName,
                    source: pkg.source,
                    deployments: {}
                }
            }
            if (pkg.platform != null) {
                if (json.dependencies[pkg.name].deployments == null) {
                    json.dependencies[pkg.name].deployments = {};
                }
                json.dependencies[pkg.name].deployments[pkg.platform] = {
                    address: pkg.address,
                    implementation: pkg.implementation
                };
            }
        }
        await File.writeAsync(packagePath, json);
    }
    private async getBuiltIn (name: string): Promise<IPackageItem> {
        let file: InstanceType<typeof File>;
        let fromLocal: string;
        const DEQUANTO_PATH = 'dequanto/src/prebuilt/openzeppelin/';
        const LOCAL_GIT = `./${DEQUANTO_PATH}`;
        const LOCAL_NPM = `./node_modules/${DEQUANTO_PATH}`;
        if (await Directory.existsAsync(LOCAL_NPM)) {
            fromLocal = LOCAL_NPM;
        }
        if (fromLocal == null && await Directory.existsAsync(LOCAL_GIT)) {
            fromLocal = LOCAL_GIT;
        }
        if (fromLocal != null) {
            let ozFiles = await Directory.readFilesAsync(fromLocal, '**.json');
            file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
        }

        if (file == null) {
            let fromApp = env.applicationDir.combine(DEQUANTO_PATH).toString();
            if (await Directory.existsAsync(fromApp) === true) {
                let ozFiles = await Directory.readFilesAsync(fromApp, '**.json');
                file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
            }
        }
        if (file == null || await file.existsAsync() === false) {
            return null;
        }
        let abi = await File.readAsync<TAbiItem[]>(file.uri.toString());
        return {
            address: null,
            name,
            contractName: file.uri.file,
            platform: this.chain?.client.platform,
            main: file.uri.toString(),
            abi
        };
    }

    private async ensureChain (packageName: string, list: IPackageItem[]) {
        if (this.chain?.client == null) {
            let viaInstalled = list.filter(x => x.name === packageName);
            if (viaInstalled.length === 0) {
                return false;
            }
            this.chain =  await di
                .resolve(PlatformFactory)
                .get(viaInstalled[0].platform);
        }
        return true;
    }

    private async findFromList (name: string, list: IPackageItem[]) {
        if (await this.ensureChain(name, list) === false) {
            return;
        }
        let platform = this.chain.client.platform;
        let item = list.find(x => x.platform === platform && x.name === name);
        return item;
    }
    private async getLocalList (): Promise<IPackageItem[]> {
        let { list } = await this.readFromFile('0xweb.json');
        return list;
    }
    private async getDeploymentsList (): Promise<IPackageItem[]> {
        let file = new File('0xweb.json');
        if (await file.existsAsync() === false) {
            return []
        }
        let platform = this.chain?.client?.platform ?? 'hardhat';
        let $0xweb = await file.readAsync<IPackageJson>();
        let deployments = $0xweb.deployments;
        if (deployments == null || deployments[platform] == null) {
            return [];
        }
        let deploymentsArr = deployments[platform];
        let contracts = await alot(deploymentsArr).mapManyAsync(async x => {
            if (await File.existsAsync(x.path) === false) {
                $logger.warn(`File not found ${x.path}. Skipping...`);
                return [];
            }
            let deployments = await File.readAsync<IDeployment[]>(x.path);
            return deployments.map(d => {
                return <IPackageItem> {
                    platform,
                    address: d.address,
                    name: d.id ?? d.name,
                    contractName: d.name,
                    main: d.main ?? `./0xc/hardhat/${d.name}/${d.name}.ts`,
                    implementation: d.implementation,
                };
            })
        }).toArrayAsync();

        return contracts;
    }

    private async getGlobalList (): Promise<IPackageItem[]> {
        let path = env.appdataDir.combine('.dequanto/0xweb.json').toString();
        let { list } = await this.readFromFile(path);
        return list;
    }

    private async readFromFile(path: string): Promise<{ list: IPackageItem[], deployments: TDeploymentEntry[] }>  {
        let file = new File(path);
        if (await file.existsAsync() === false) {
            return { list: [], deployments: [] };
        }
        let $0xweb = await file.readAsync<IPackageJson>();
        let list = [] as IPackageItem[];

        let contracts = $0xweb.contracts ?? {};
        for (let platform in contracts) {
            for (let address in contracts[platform]) {
                let pkg = contracts[platform][address];
                list.push({
                    platform: platform as TPlatform,
                    address: address as TAddress,
                    name: pkg.name,
                    main: pkg.main,
                    contractName: pkg.contractName,
                    implementation: pkg.implementation,
                });
            }
        }

        let dependencies = $0xweb.dependencies ?? {};
        for (let name in dependencies) {
            let pkg = dependencies[name];
            let deployments = alot.fromObject(pkg.deployments ?? {}).toArray();
            if (deployments.length === 0) {
                deployments.push({
                    key: 'eth',
                    value: {
                        address: $address.ZERO
                    }
                });
            }
            deployments.forEach(d => {
                list.push({
                    platform: d.key as TPlatform,
                    address: d.value.address as TAddress,
                    name: name,
                    contractName: pkg.contractName,
                    main: pkg.main,
                    implementation: d.value.implementation,
                });
            })
        }
        let deployments = [] as TDeploymentEntry[];
        if ($0xweb.deployments != null) {
            deployments = await alot
                .fromObject($0xweb.deployments)
                .mapManyAsync(async d => {

                    return alot(d.value)
                        .mapAsync(async deployment => {
                            return {
                                platform: d.key,
                                name: deployment.name,
                                deployments: await File.readAsync<IDeployment[]>(deployment.path)
                            }
                        })
                        .toArrayAsync();
                })
                .toArrayAsync();

            deployments.forEach(d => {

                d.deployments.forEach(deployment => {

                    let pkgMain = list.find(x => x.main != null && x.name === deployment.name);
                    list.push({
                        platform: d.platform as TPlatform,
                        address: deployment.address as TAddress,
                        name: deployment.id ?? deployment.name,
                        contractName: deployment.name,
                        main: pkgMain?.main,
                        implementation: deployment.implementation,
                    });
                })
            });
        }

        return { list, deployments };
    }
}
