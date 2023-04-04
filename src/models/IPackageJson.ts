import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import type { AbiItem } from 'web3-utils'

export interface IPackageJson {
    contracts: {
        [platform in TPlatform]: {
            [address: string]: {
                name: string
                main: string
                implementation: string
            }
        }
    }
}

export interface IPackageItem {
    platform: TPlatform
    address: TAddress
    name: string
    main: string
    abi?: AbiItem[]
    implementation?: string
}
