import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { CGas } from '@core/commands/list/CGas';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async $before() {
        await TestNode.start();
    },
    async 'JSON contains exact fees in wei and terminal output uses gwei'() {
        let client = new HardhatProvider().client('localhost');
        let result = await CliUtils.forkJson('gas --chain hardhat --json');
        eq_(result.chain, 'hardhat');
        eq_(result.price, (await client.getGasPrice()).price.toString());
        eq_(result.base, (await client.getBlock('latest')).baseFeePerGas.toString());
        eq_(result.priority, (await client.getGasPriorityFee()).toString());
        let table = await CliUtils.fork('gas --chain hardhat');
        has_(table, 'Price');
        has_(table, 'Base');
        has_(table, 'Priority');
        has_(table, 'gwei');
    },
    async 'optional fees tolerate legacy blocks and unsupported RPC methods'() {
        let client = {
            platform: 'legacy',
            getGasPrice: async () => ({ price: 9_007_199_254_740_993n }),
            getBlock: async () => ({}),
            getGasPriorityFee: async () => { throw new Error('Method not supported'); },
        };
        let app = { chain: { client } } as any;
        let result = await CGas().process([], {}, app);
        deepEq_(result, { chain: 'legacy', price: '9007199254740993', base: null, priority: null });
        client.getBlock = async () => { throw new Error('Block unavailable'); };
        deepEq_(await CGas().process([], {}, app), result);
        client.getGasPrice = async () => { throw new Error('Price unavailable'); };
        let { error } = await $promise.caught(CGas().process([], {}, app));
        eq_(error.message, 'Price unavailable');
    },
});
