import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import type { AbiItem } from 'web3-utils'

export interface IPackageJson {
    contracts: {
        [platform in TPlatform]: {
            [address: string]: {
                name: string
                main: string
                contractName: string
                implementation: string
            }
        }
    }
}

export interface IPackageItem {
    platform: TPlatform
    address: TAddress
    name: string
    contractName: string
    main: string
    abi?: AbiItem[]
    implementation?: string
}
