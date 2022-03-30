import { IPackageItem, IPackageJson } from '@core/models/IPackageJson';
import { IPlatformTools } from '@dequanto/chains/PlatformFactory';
import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import { File } from 'atma-io';

export class PackageService {
    constructor(public chain: IPlatformTools) {

    }

    async getPackage (name: string) {
        let list = await this.list();
        let platform = this.chain.client.platform ;
        return list.find(x => x.platform === platform && x.name === name);
    }

    async list () {
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
