import { TAddress } from '@dequanto/models/TAddress';
import { TPlatform } from '@dequanto/models/TPlatform';
import { TAbiItem } from '@dequanto/types/TAbi';


export interface IPackageJson {
    deployments?: {
        [platform: string]: {
            name?: string
            // Deployments Path
            path: string
        }[]
    }
    contracts?: {
        [platform in TPlatform]: {
            [address: string]: {
                name: string
                main: string
                contractName?: string
                implementation: TAddress
                source?: { path: string } | {
                    address: TAddress
                    platform: TPlatform
                }
            }
        }
    }
    dependencies?: {
        [name: string]: {
            main: string
            contractName: string
            source: { path: string } | {
                address: TAddress
                platform: TPlatform
            },
            deployments: {
                [platform in TPlatform]: {
                    address: TAddress
                    implementation?: TAddress
                }
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
    abi?: TAbiItem[]
    implementation?: TAddress
    source?: { path: string } | {
        address: TAddress
        platform: TPlatform
    }
}
