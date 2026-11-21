import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';

UTest.create({
    $config: { timeout: 60_000 },
    async $before() {
        await TestNode.start();
    },

    async 'preserves zero-argument, positional and indexed CLI calls'() {
        let chainId = await CliUtils.forkJson('rpc eth_chainId --chain hardhat --json');
        eq_(chainId, await new HardhatProvider().client('localhost').getChainId());
        let block = await CliUtils.forkJson('rpc eth_getBlockByNumber latest false --chain hardhat --json');
        let inputs = [
            `--arg0 ${block.number} --arg1 boolean:0`,
            `latest true --arg0 ${block.number} --arg1 false`,
        ];
        for (let input of inputs) {
            let result = await CliUtils.forkJson(`rpc eth_getBlockByNumber ${input} --chain hardhat --json`);
            eq_(result.hash, block.hash);
            deepEq_(result.transactions, block.transactions);
        }
        let storage = await CliUtils.forkJson('rpc eth_getStorageAt --arg0 0x0000000000000000000000000000000000000001 --arg1 0 --arg2 latest --chain hardhat --json');
        eq_(BigInt(storage), 0n);
    },
});
