import { UTest } from 'atma-utest';
import { AbiService } from '@core/services/AbiService';
import { $validate } from '@core/utils/$validate';
import { BlockchainExplorerFactory } from '@dequanto/explorer/BlockchainExplorerFactory';

UTest.create({
    async 'normalizes short ABI addresses before explorer lookup'() {
        let getExplorer = BlockchainExplorerFactory.get;
        let validatePlatform = $validate.platform;
        let validateExplorer = $validate.config.blockchainExplorer;
        let addresses: string[] = [];
        BlockchainExplorerFactory.get = (() => ({
            async getContractAbi(address: string) {
                addresses.push(address);
                return { abi: '[]' };
            },
        })) as typeof getExplorer;
        $validate.platform = () => {};
        $validate.config.blockchainExplorer = () => {};

        try {
            for (let address of ['0x0', '0x1', '0x1234']) {
                let result = await AbiService.load({ abi: address, chain: 'eth' });
                deepEq_(result, []);
                eq_(addresses[addresses.length - 1], `0x${address.slice(2).padStart(40, '0')}`);
            }
        } finally {
            BlockchainExplorerFactory.get = getExplorer;
            $validate.platform = validatePlatform;
            $validate.config.blockchainExplorer = validateExplorer;
        }
    },
});
