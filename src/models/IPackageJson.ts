import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';

export interface IPackageJson {
    contracts: {
        [platform in TPlatform]: {
            [address: string]: {
                name: string
                main: string
            }
        }
    }
}

export interface IPackageItem {
    platform: TPlatform
    address: TAddress
    name: string
    main: string
}
