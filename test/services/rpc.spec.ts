import { UTest } from 'atma-utest';
import { RpcService } from '@core/services/RpcService';
import { CRpc } from '@core/commands/list/CRpc';
import { CommandsHandler } from '@core/commands/CommandsHandler';
import { $console } from '@core/utils/$console';
import { $validate } from '@core/utils/$validate';
import { $promise } from '@dequanto/utils/$promise';

class TestRpcService extends RpcService {
    output: any[] = [];

    protected printResult(...args: any[]) {
        this.output.push(args[0]);
    }
}

function fixture(result: any = null) {
    let calls: any[][] = [];
    let app = {
        config: {},
        chain: {
            client: {
                with: async callback => callback({
                    rpc: {
                        fns: {
                            test: async (...args) => {
                                calls.push(args);
                                return result;
                            },
                        },
                    },
                }),
            },
        },
    } as any;
    let service = new TestRpcService(app);
    return { service, calls, run: (args: any[], params = {}) => service.process(args, params, app) };
}

UTest.create({
    async 'parses quantities, booleans, JSON, and literal strings'() {
        let cases = [
            { input: '100', expected: '0x64' },
            { input: '0', expected: '0x0' },
            { input: '1', expected: '0x1' },
            { input: '9007199254740993', expected: '0x20000000000001' },
            { input: 'uint256:100', expected: '0x64' },
            { input: 'uint:0xff', expected: '0xff' },
            { input: 'uint8:255', expected: '0xff' },
            { input: 'true', expected: true },
            { input: 'FALSE', expected: false },
            { input: 'boolean:1', expected: true },
            { input: 'boolean:0', expected: false },
            { input: 'null', expected: null },
            { input: 'json:null', expected: null },
            { input: 'json:3', expected: 3 },
            { input: 'json:"latest"', expected: 'latest' },
            { input: ' {"to":"0x1234"}', expected: { to: '0x1234' } },
            { input: '["latest",false]', expected: ['latest', false] },
            { input: 'string:100', expected: '100' },
            { input: 'string:null', expected: 'null' },
            { input: 'string:{invalid}', expected: '{invalid}' },
            { input: 'https://example.invalid', expected: 'https://example.invalid' },
            { input: 'prefix:boolean:true', expected: 'prefix:boolean:true' },
            { input: 'latest', expected: 'latest' },
            { input: '0x64', expected: '0x64' },
            { input: { to: '0x1234' }, expected: { to: '0x1234' } },
            { input: false, expected: false },
        ];
        for (let test of cases) {
            let rpc = fixture();
            await rpc.run(['test', test.input]);
            deepEq_(rpc.calls, [[test.expected]], `Input: ${JSON.stringify(test.input)}`);
        }
    },

    async 'applies indexed flags over positional arguments in numeric order'() {
        let rpc = fixture();
        await rpc.run(['test', 'latest', 'false'], { arg2: '{"value":1}', arg0: '100' });
        deepEq_(rpc.calls, [['0x64', false, { value: 1 }]]);

        let flagged = fixture();
        await flagged.run(['test'], { arg1: 'false', arg0: 'latest' });
        deepEq_(flagged.calls, [['latest', false]]);
    },

    async 'rejects invalid inputs before making an RPC request'() {
        let cases = [
            { args: [], params: {}, message: 'method name' },
            { args: [' '], params: {}, message: 'method name' },
            { args: ['test'], params: { arg1: 'latest' }, message: 'Missing RPC argument --arg0' },
            { args: ['test', 'latest'], params: { arg2: 'false' }, message: 'Missing RPC argument --arg1' },
            { args: ['test'], params: { arg9007199254740992: 'x' }, message: 'Invalid RPC argument index' },
            { args: ['test', '{invalid}'], params: {}, message: 'Invalid RPC argument --arg0' },
            { args: ['test', 'latest', 'json:['], params: {}, message: 'Invalid RPC argument --arg1' },
            { args: ['test', 'boolean:maybe'], params: {}, message: '--arg0' },
            { args: ['test', 'uint256:-1'], params: {}, message: '--arg0' },
            { args: ['test', 'uint256:1.5'], params: {}, message: '--arg0' },
            { args: ['test', 'uint8:256'], params: {}, message: '--arg0' },
            { args: ['test', 'uint7:1'], params: {}, message: '--arg0' },
        ];
        for (let test of cases) {
            let rpc = fixture();
            let { error } = await $promise.caught(rpc.run(test.args, test.params));
            notEq_(error, null);
            eq_(error?.message.includes(test.message), true);
            eq_(rpc.calls.length, 0);
        }
    },

    async 'formats nested bigint values without changing the returned result'() {
        let previous = $console.isJsonOnly();
        try {
            $console.setJsonOnly(false);

            let result = { gasUsed: 21_000n, nested: [9_007_199_254_740_993n, -9_007_199_254_740_993n] };
            let rpc = fixture(result);
            let actual = await rpc.run(['test']);
            eq_(actual, result);
            eq_(rpc.service.output.length, 1);

            let printed = JSON.parse(rpc.service.output[0]);
            deepEq_(printed, { gasUsed: '21000', nested: ['9007199254740993', '-9007199254740993'] });

            $console.setJsonOnly(true);

            let json = fixture(result);
            let jsonResult = await json.run(['test']);
            eq_(jsonResult, result);
            eq_(json.service.output.length, 0);
        } finally {
            $console.setJsonOnly(previous);
        }
    },

    async 'does not fill omitted optional positional arguments with undefined'() {
        let original = $validate.platforms;
        try {
            $validate.platforms = () => ['eth'];
            let handler = new CommandsHandler().register(CRpc());
            let empty = await handler.findCommand(['rpc', 'eth_chainId'], { chain: 'eth' });
            deepEq_(empty.args, ['eth_chainId']);
            let flagged = await handler.findCommand(['rpc', 'eth_getBlockByNumber'], {
                chain: 'eth', arg0: 'latest', arg1: 'false'
            });
            deepEq_(flagged.args, ['eth_getBlockByNumber', 'latest', 'false']);
        } finally {
            $validate.platforms = original;
        }
    },

    async 'requires an RPC method before processing CLI parameters'() {
        let original = $validate.platforms;
        try {
            $validate.platforms = () => ['eth'];

            let handler = new CommandsHandler().register(CRpc());
            let { error } = await $promise.caught(handler.findCommand(['rpc'], { chain: 'eth' }));
            notEq_(error, null);
            eq_(error?.message.includes('method name'), true);
        } finally {
            $validate.platforms = original;
        }
    },
});
