import { IPackageItem, IPackageJson } from '@core/models/IPackageJson';
import { IPlatformTools } from '@dequanto/chains/PlatformFactory';
import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import { File, Directory } from 'atma-io';
import type { AbiItem } from 'web3-utils'

export class PackageService {
    constructor(public chain: IPlatformTools) {

    }

    async getPackage (name: string): Promise<IPackageItem> {
        let list = await this.list();
        let platform = this.chain.client.platform;
        return list.find(x => x.platform === platform && x.name === name);
    }
    async getBuiltIn (name: string): Promise<IPackageItem> {
        let ozFiles = await Directory.readFilesAsync('./dequanto/contracts/openzeppelin/', '**.ts');
        let file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
        if (file == null || await file.existsAsync() === false) {
            return null;
        }
        let abi = await File.readAsync<AbiItem[]>(file.uri.toString().replace('.ts', '.json'));
        return {
            address: null,
            name,
            platform: this.chain.client.platform,
            main: file.uri.toString(),
            abi
        };
    }

    private async list (): Promise<IPackageItem[]> {
        let $0xweb = await File.readAsync<IPackageJson>('0xweb.json');
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
