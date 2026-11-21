import { UTest } from 'atma-utest';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { middleware } from 'atma-server';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';
import { AccountsService } from '@core/services/AccountsService';
import { Config } from '@dequanto/config/Config';
import { McpFactory } from '@core/services/McpFactory';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $promise } from '@dequanto/utils/$promise';

let http: HttpServer;
let nextId = 0;
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    'MCP-Protocol-Version': '2025-11-25'
};
async function rpc(method: string, params?: Record<string, unknown>) {
    let id = nextId++;
    let response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', id, method, params }) });
    eq_(response.status, 200);
    let message = await response.json();
    eq_(message.jsonrpc, '2.0');
    eq_(message.id, id);
    if (message.error) throw Object.assign(new Error(message.error.message), { code: message.error.code });
    return message.result;
}
const client = {
    listTools: () => rpc('tools/list'),
    callTool: (params: { name: string; arguments: Record<string, unknown> }) => rpc('tools/call', params)
};
let endpoint: string;
let chain = new HardhatProvider().client('localhost');

UTest.create({
    async $before() {
        await TestNode.start();
        let app = await new ServerService(new App()).createServer();
        app.processor({ middleware: [middleware.bodyJson()] });
        http = createServer((req, res) => app.process(req, res));
        await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve));
        endpoint = `http://127.0.0.1:${(http.address() as AddressInfo).port}/mcp`;
        let initialized = await rpc('initialize', {
            protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: '0xweb-test', version: '1.0.0' }
        });
        eq_(initialized.protocolVersion, '2025-11-25');
        deepEq_(initialized.capabilities, { tools: {} });

        let response = await fetch(endpoint, {
            method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })
        });
        eq_(response.status, 202);
        eq_(await response.text(), '');
    },

    async $after() {
        if (http) await new Promise<void>((resolve, reject) => http.close(error => error ? reject(error) : resolve()));
    },

    async 'discovers block, contract and account tools with original argument names'() {
        let { tools } = await client.listTools();
        deepEq_(tools.map(x => x.name), [
            'block_get', 'contract_info', 'contract_list', 'contract_abi', 'contract_read',
            'contract_write', 'contract_simulate', 'contract_calldata', 'contract_calldata-parse',
            'contract_logs', 'contract_dump', 'contract_dump-restore', 'contract_slot',
            'contract_var', 'contract_var-set', 'contract_vars', 'accounts_list'
        ]);
        let decode = tools.find(x => x.name === 'contract_calldata-parse').inputSchema;
        deepEq_(decode.required, ['NameOrAddress', 'calldata']);
        eq_(decode.properties.calldata.type, 'string');
        eq_(tools.find(x => x.name === 'contract_read').inputSchema.additionalProperties, true);

        let schema = tools[0].inputSchema;
        deepEq_(schema.required, ['NumberOrDate', 'chain']);
        deepEq_(Object.keys(schema.properties), ['NumberOrDate', 'chain']);
        has_(tools[0].description, 'date');
        has_((schema.properties.NumberOrDate as { description: string }).description, 'timezone');
    },

    async 'lists only public account metadata and supports empty storage'() {
        let getSession = AccountsService.getSession;
        let fetchConfig = Config.fetch;
        let accounts = [{
            name: 'Operator', address: '0x0000000000000000000000000000000000000001',
            key: 'private-key-fixture',
        }, {
            name: 'Safe', address: '0x0000000000000000000000000000000000000002',
            type: 'safe', operator: { name: 'Operator', key: 'nested-key-fixture' },
        }, {
            name: 'Role', address: '0x0000000000000000000000000000000000000003',
            type: 'zodiac', operator: 'Operator', roleKey: '0x1234',
        }];
        try {
            // Isolate account storage and session credentials from the developer's machine.
            AccountsService.getSession = async () => ({});
            Config.fetch = async () => ({
                $sources: { array: [{ data: { name: 'accounts' }, config: { accounts } }] }
            } as any);
            let { tools } = await client.listTools();
            let schema = tools.find(x => x.name === 'accounts_list').inputSchema;
            deepEq_(Object.keys(schema.properties), ['pin', '2fa']);
            deepEq_(schema.required, []);
            eq_(schema.additionalProperties, false);

            let result = await client.callTool({ name: 'accounts_list', arguments: { pin: 'test-pin' } });
            eq_(result.isError, undefined);
            let expected = [
                { name: 'Operator', address: accounts[0].address, type: 'eoa' },
                { name: 'Safe', address: accounts[1].address, type: 'safe', operator: 'Operator' },
                { name: 'Role', address: accounts[2].address, type: 'zodiac', operator: 'Operator', roleKey: '0x1234' },
            ];
            deepEq_(result.structuredContent, { result: expected });
            deepEq_(JSON.parse(result.content[0].text), expected);

            accounts = [];
            let empty = await client.callTool({ name: 'accounts_list', arguments: { '2fa': '123456' } });
            eq_(empty.isError, undefined);
            deepEq_(empty.structuredContent, { result: [] });
            let missing = await client.callTool({ name: 'accounts_list', arguments: {} });
            eq_(missing.isError, true);
            has_(missing.content[0].text, 'Missing required parameter');
            let invalid = await client.callTool({ name: 'accounts_list', arguments: { pin: 'test-pin', key: 'unexpected' } });
            eq_(invalid.isError, true);
            has_(invalid.content[0].text, 'Unknown argument: key');
        } finally {
            AccountsService.getSession = getSession;
            Config.fetch = fetchConfig;
        }
    },

    async 'account mutations are not exposed over MCP'() {
        let commands = ['new', 'add', 'remove', 'login', 'backup'];
        for (let command of commands) {
            let { error } = await $promise.caught(client.callTool({ name: `accounts_${command}`, arguments: {} }));
            notEq_(error, null);
            has_(error.message, 'Unknown tool');
        }
    },

    async 'reads a contract with dynamic ABI arguments and reports missing values'() {
        let provider = new HardhatProvider();
        let { contract } = await provider.deploySol('./test/fixtures/contracts/StorageCounter.sol', { client: chain });
        let result = await client.callTool({ name: 'contract_read', arguments: {
            NameOrAddress: contract.address, MethodOrAbi: 'getCountMethod():uint256', chain: 'hardhat'
        } });
        eq_(result.isError, undefined);
        deepEq_(result.structuredContent, { result: '1' });

        let { contract: echo } = await provider.deployCode(`
            contract McpEcho {
                function first(uint256[] calldata values) external pure returns (uint256) {
                    return values[0];
                }
            }
        `, { client: chain });
        let inputs = [
            { arg0: ['123456789012345678901234567890'] },
            { values: ['123456789012345678901234567890'] },
        ];
        for (let input of inputs) {
            let result = await client.callTool({ name: 'contract_read', arguments: {
                NameOrAddress: echo.address, MethodOrAbi: 'first(uint256[] values):uint256',
                chain: 'hardhat', ...input
            } });
            eq_(result.isError, undefined);
            deepEq_(result.structuredContent, { result: '123456789012345678901234567890' });
        }
        let missing = await client.callTool({ name: 'contract_read', arguments: {
            NameOrAddress: echo.address, MethodOrAbi: 'first(uint256[] values):uint256', chain: 'hardhat'
        } });
        eq_(missing.isError, true);
        has_(missing.content[0].text, 'not provided');
        let invalid = await client.callTool({ name: 'contract_read', arguments: {
            NameOrAddress: echo.address, MethodOrAbi: 'first(uint256[] values):uint256', chain: 123
        } });
        eq_(invalid.isError, true);
        has_(invalid.content[0].text, 'chain must be string');
    },

    async 'reads latest and numbered blocks and preserves API behavior'() {
        let block = await chain.getBlock('latest');
        let inputs = ['latest', String(block.number)];
        for (let NumberOrDate of inputs) {
            let result = await client.callTool({ name: 'block_get', arguments: { NumberOrDate, chain: 'hardhat' } });
            eq_(result.isError, undefined);
            eq_((result.structuredContent as { hash: string }).hash, block.hash);
            let text = (result.content as { type: string; text: string }[])[0].text;
            deepEq_(JSON.parse(text), result.structuredContent);
        }

        let response = await fetch(endpoint.replace('/mcp', `/api/block/get/${block.number}?chain=hardhat`));
        eq_(response.status, 200);
        eq_((await response.json()).hash, block.hash);
    },

    async 'resolves a block by ISO date'() {
        let block = await chain.getBlock('latest');
        let date = new Date(Number(block.timestamp) * 1_000).toISOString();
        let result = await client.callTool({ name: 'block_get', arguments: { NumberOrDate: date, chain: 'hardhat' } });
        eq_(result.isError, undefined);

        let response = await fetch(endpoint.replace('/mcp', `/api/block/get/${encodeURIComponent(date)}?chain=hardhat`));
        let expected = await response.json();
        eq_((result.structuredContent as { hash: string }).hash, expected.hash);
        lte_(Math.abs(Number(expected.timestamp) - Number(block.timestamp)), 60);
    },

    async 'invalid inputs and command failures are tool errors without prompting'() {
        let inputs = [
            { chain: 'hardhat' },
            { NumberOrDate: 'latest' },
            { NumberOrDate: 1, chain: 'hardhat' },
            { NumberOrDate: 'latest', chain: 'unknown-chain' },
            { NumberOrDate: 'latest', chain: 'hardhat', unexpected: true },
            { NumberOrDate: '-1', chain: 'hardhat' },
        ];
        for (let input of inputs) {
            let result = await client.callTool({ name: 'block_get', arguments: input });
            eq_(result.isError, true);
            eq_((result.content as any[])[0].type, 'text');
        }
    },

    async 'unknown tools are protocol errors'() {
        let { error } = await $promise.caught(client.callTool({ name: 'contract_watch', arguments: {} }));
        notEq_(error, null);
        has_(error.message, 'Unknown tool');
    },

    async 'HTTP transport rejects browser origins, malformed messages and unsupported methods'() {
        let response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', Origin: 'https://untrusted.example' },
            body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' })
        });
        eq_(response.status, 403);
        await response.text();

        let invalid = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
            body: JSON.stringify({ invalid: true })
        });
        eq_(invalid.status, 400);
        eq_((await invalid.json()).error.code, -32600);

        let unsupported = await fetch(endpoint, { method: 'PATCH' });
        eq_(unsupported.status, 405);
        await unsupported.text();
    },

    async 'protocol negotiation, ping and unknown methods'() {
        let initialized = await rpc('initialize', {
            protocolVersion: 'unknown-version', capabilities: {}, clientInfo: { name: 'test', version: '1' }
        });
        eq_(initialized.protocolVersion, '2025-11-25');

        let pong = await rpc('ping');
        deepEq_(pong, {});

        let { error } = await $promise.caught(rpc('unknown/method'));
        eq_((error as any).code, -32601);
    },

    async 'malformed JSON is rejected by body middleware'() {
        let response = await fetch(endpoint, { method: 'POST', headers, body: '{' });
        gte_(response.status, 400);
        await response.text();
    },

    async 'invalid envelopes produce protocol errors'() {
        let cases = [
            { body: '[]', code: -32600 },
            { body: JSON.stringify({ jsonrpc: '2.0', id: null, method: 'ping' }), code: -32600 },
            { body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping', params: [] }), code: -32600 },
        ];
        for (let test of cases) {
            let response = await fetch(endpoint, { method: 'POST', headers, body: test.body });
            eq_(response.status, 400);
            eq_((await response.json()).error.code, test.code);
        }
    },

    async 'notifications never execute tools and do not return JSON-RPC results'() {
        let response = await fetch(endpoint, {
            method: 'POST', headers,
            body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'block_get', arguments: {} } })
        });
        eq_(response.status, 202);
        eq_(await response.text(), '');
    },

    async 'HTTP content negotiation and protocol headers are validated'() {
        let cases = [
            { headers: { ...headers, Accept: 'text/plain' }, status: 406 },
            { headers: { ...headers, 'Content-Type': 'text/plain' }, status: 415 },
            { headers: { ...headers, 'MCP-Protocol-Version': 'invalid' }, status: 400 },
        ];
        for (let test of cases) {
            let response = await fetch(endpoint, { method: 'POST', headers: test.headers, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' }) });
            eq_(response.status, test.status);
            await response.text();
        }
        let response = await fetch(endpoint, { headers: { Accept: 'text/event-stream' } });
        eq_(response.status, 405);
        await response.text();
    },

    async 'factory preserves argument names, parent parameters and canonical aliases'() {
        let factory = new McpFactory([{
            command: 'c, contract', description: ['Contract'],
            params: { '-c, --chain': { description: 'Chain', required: true } },
            process: async () => null,
            subcommands: [{
                command: 'read', description: ['Read'],
                arguments: [{ name: 'AddressOrPath', description: 'Address or file', required: true }],
                params: { '--json': { description: 'JSON' }, '--count': { description: 'Count', type: 'number', default: 1 } },
                process: async () => null
            }]
        }], new App());

        let [tool] = factory.getTools();
        eq_(tool.name, 'contract_read');
        deepEq_(tool.inputSchema.required, ['AddressOrPath', 'chain']);
        deepEq_(Object.keys(tool.inputSchema.properties), ['AddressOrPath', 'chain', 'count']);
        eq_((tool.inputSchema.properties.count as { default: number }).default, 1);
    }
});
