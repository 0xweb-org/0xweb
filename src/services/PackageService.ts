import { IPackageItem, IPackageJson } from '@core/models/IPackageJson';
import { IPlatformTools, PlatformFactory } from '@dequanto/chains/PlatformFactory';
import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import di from 'a-di';
import { File, Directory, env } from 'atma-io';
import type { AbiItem } from 'web3-utils'

export class PackageService {
    constructor(public chain: IPlatformTools) {

    }

    async getPackage (name: string): Promise<IPackageItem> {
        let localList = await this.getLocalList();
        let pckg = await this.findFromList(name, localList);
        if (pckg == null) {
            let globalList = await this.getGlobalList();
            pckg = await this.findFromList(name, globalList);
        }
        if (pckg == null) {
            pckg = await this.getBuiltIn(name);
        }
        return pckg;
    }
    private async getBuiltIn (name: string): Promise<IPackageItem> {
        let file: InstanceType<typeof File>;
        let fromCWD = './dequanto/contracts/openzeppelin/';
        if (await Directory.existsAsync(fromCWD) === true) {
            let ozFiles = await Directory.readFilesAsync(fromCWD, '**.json');
            file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
        }
        if (file == null) {
            let fromApp = env.appdataDir.combine(fromCWD).toString();
            let ozFiles = await Directory.readFilesAsync(fromApp, '**.json');
            file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
        }

        if (file == null || await file.existsAsync() === false) {
            return null;
        }

        let abi = await File.readAsync<AbiItem[]>(file.uri.toString());
        return {
            address: null,
            name,
            platform: this.chain.client.platform,
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
        let list = await this.readFromFile('0xweb.json');
        return list;
    }

    private async getGlobalList (): Promise<IPackageItem[]> {
        let path = env.appdataDir.combine('.dequanto/0xweb.json').toString();
        return this.readFromFile(path);
    }

    private async readFromFile(path: string): Promise<IPackageItem[]>  {
        let file = new File(path);
        if (await file.existsAsync() === false) {
            return []
        }
        let $0xweb = await file.readAsync<IPackageJson>();
        let contracts = $0xweb.contracts;
        let list = [] as IPackageItem[];

        for (let platform in contracts) {
            for (let address in contracts[platform]) {
                let pckg = contracts[platform][address];
                list.push({
                    platform: platform as TPlatform,
                    address: address as TAddress,
                    name: pckg.name,
                    main: pckg.main,
                });
            }
        }
        return list;
    }
}
