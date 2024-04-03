import { IPackageItem } from '@core/models/IPackageJson';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { ContractBase } from '@dequanto/contracts/ContractBase';
import { ContractClassFactory } from '@dequanto/contracts/ContractClassFactory';
import { TAbiItem } from '@dequanto/types/TAbi';

export class ContractFactory {
    constructor (public client: Web3Client) {

    }

    async create (input: {
        pkg: IPackageItem,
        abi: TAbiItem[],
    }): Promise<ContractBase> {

        let { pkg, abi } = input;
        let { contract } = ContractClassFactory.fromAbi(pkg.address, abi, this.client);
        return contract;
    }
}
