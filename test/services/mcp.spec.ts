import { $abi } from '@dequanto/abi/$abi';
import { TotpService } from '@core/services/TotpService';
import { $cli } from '@core/utils/$cli';
import { File } from 'atma-io';
import { UTest } from 'atma-utest';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { middleware } from 'atma-server';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';
import { AccountsService } from '@core/services/AccountsService';
import { Config } from '@dequanto/config/Config';
import { RpcService } from '@core/services/RpcService';
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
            'contract_var', 'contract_var-set', 'contract_vars', 'accounts_list',
            'account_balance', 'account_view', 'account_current', 'account_rename', 'rpc',
            'abi_decode-calldata', 'abi_decode-error', 'abi_decode-result', 'abi_decode-log', 'abi_topic0', 'abi_sig',
            'tx_sign', 'tx_send', 'tx_view',
            'auth_2fa_status', 'auth_2fa_disable', 'auth_2fa_setup', 'auth_status', 'auth_login', 'gas', 'config', 'ns_view', 'deployment_fetch', 'info_network'
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

    async 'config tools view, get and write isolated configuration'() {
        let fetchConfig = Config.fetch;
        let getSession = AccountsService.getSession;
        let writes: { values: unknown; deep: boolean }[] = [];
        let received: Record<string, any>;
        let config = { pin: 'mcp-fixture-secret', accounts: [{ key: 'mcp-fixture-key' }], settings: { target: 'cjs' }, e: false, edit: false, v: true, view: true };
        try {
            AccountsService.getSession = async () => ({});
            Config.fetch = async params => {
                received = params;
                return {
                    toJSON: () => ({ ...config }),
                    $sources: { array: [{
                        data: { name: 'main', path: './test/bin/mcp-config/config.yml' },
                        write: async (values, deep) => { writes.push({ values, deep }); },
                    }] },
                } as any;
            };
            let { tools } = await client.listTools();
            let schema = tools.find(x => x.name === 'config').inputSchema;
            deepEq_(Object.keys(schema.properties), ['view', 'local', 'global', 'set', 'get']);
            eq_(schema.properties.view.type, 'boolean');
            eq_(schema.properties.local.type, 'boolean');
            eq_(schema.properties.global.type, 'boolean');
            eq_(schema.properties.set.type, 'string');
            let call = (args: Record<string, unknown>) => client.callTool({ name: 'config', arguments: args });
            let viewed = await call({ view: true });
            deepEq_(viewed.structuredContent, { pin: '[REDACTED]', accounts: '[REDACTED]', settings: { target: 'cjs' } });
            let secret = await call({ get: 'pin' });
            deepEq_(secret.structuredContent, { result: '[REDACTED]' });
            eq_(JSON.stringify(viewed).includes('mcp-fixture'), false);
            let got = await call({ get: 'settings.target' });
            deepEq_(got.structuredContent, { result: 'cjs' });
            deepEq_(JSON.parse(got.content[0].text), 'cjs');
            let missing = await call({ get: 'settings.missing' });
            deepEq_(missing.structuredContent, { result: null });
            let set = await call({ set: 'settings.target=esm;enabled=true;count=2;url=https://example.test/?a=b', local: true });
            eq_(set.isError, undefined);
            eq_(received.local, true);
            eq_(received.isLocal, true);
            let expected = { settings: { target: 'esm' }, enabled: true, count: 2, url: 'https://example.test/?a=b' };
            deepEq_(writes[0], { values: expected, deep: true });
            deepEq_(set.structuredContent, { path: './test/bin/mcp-config/config.yml', values: expected });
            let json = { settings: { target: 'esm' }, endpoints: ['one', 'two'], enabled: false };
            let setJson = await call({ set: JSON.stringify(json), global: true });
            eq_(setJson.isError, undefined);
            eq_(received.global, true);
            deepEq_(writes[1], { values: json, deep: true });
            let invalid = [{}, { get: 'settings', set: 'x=1' }, { view: true, local: true, global: true }, { set: '__proto__.polluted=true' }, { get: 'constructor' }, { edit: true }, { set: '{invalid' }, { set: '[]' }, { set: 'missing-assignment' }, { view: 'true' }];
            for (let args of invalid) {
                let result = await call(args);
                eq_(result.isError, true);
            }
            eq_(writes.length, 2);
        } finally {
            Config.fetch = fetchConfig;
            AccountsService.getSession = getSession;
        }
    },

    async 'config MCP reads fresh values after a file-backed write'() {
        let getSession = AccountsService.getSession;
        let path = './test/bin/mcp-config/fresh.json';
        try {
            await File.writeAsync(path, { reviewValue: 'before' });
            AccountsService.getSession = async () => ({ 'config-global': path } as any);
            Config.clean();
            let get = () => client.callTool({ name: 'config', arguments: { get: 'reviewValue', local: true } });
            let before = await get();
            deepEq_(before.structuredContent, { result: 'before' });
            let set = await client.callTool({ name: 'config', arguments: { set: 'reviewValue=after', local: true } });
            eq_(set.isError, undefined);
            let saved = await File.readAsync<any>(path, { cached: false });
            eq_(saved.reviewValue, 'after');
            let after = await get();
            deepEq_(after.structuredContent, { result: 'after' });
        } finally {
            AccountsService.getSession = getSession;
            Config.clean();
            if (await File.existsAsync(path)) await File.removeAsync(path);
        }
    },

    async 'gas returns fee data in wei through MCP'() {
        let { tools } = await client.listTools();
        let schema = tools.find(x => x.name === 'gas').inputSchema;
        deepEq_(Object.keys(schema.properties), ['chain']);
        eq_(schema.properties.chain.default, 'eth');
        deepEq_(schema.required, []);
        let result = await client.callTool({ name: 'gas', arguments: { chain: 'hardhat' } });
        eq_(result.isError, undefined);
        eq_(result.structuredContent.chain, 'hardhat');
        let gas = await chain.getGasPrice();
        let block = await chain.getBlock('latest');
        eq_(result.structuredContent.price, gas.price.toString());
        eq_(result.structuredContent.base, block.baseFeePerGas.toString());
        eq_(result.structuredContent.priority, (await chain.getGasPriorityFee()).toString());
        deepEq_(JSON.parse(result.content[0].text), result.structuredContent);
    },

    async 'auth tools manage an isolated session without interactive prompts'() {
        let originals = {
            local: AccountsService.DEFAULTS_PATH_LOCAL, global: AccountsService.DEFAULTS_PATH_GLOBAL,
            fetch: Config.fetch, ask: $cli.ask,
        };
        let sessionPath = './test/bin/mcp-auth/session.json';
        let account = { name: 'Alice', address: '0x0000000000000000000000000000000000000001', key: 'private-key-fixture' };
        let seed = '0x3132333435363738393031323334353637383930' as const;
        let call = (name: string, args: Record<string, unknown> = {}) => client.callTool({ name, arguments: args });
        try {
            AccountsService.DEFAULTS_PATH_LOCAL = sessionPath;
            AccountsService.DEFAULTS_PATH_GLOBAL = sessionPath;
            if (await File.existsAsync(sessionPath)) await File.removeAsync(sessionPath);
            Config.fetch = async () => ({
                $sources: { array: [{ data: { name: 'accounts' }, config: { accounts: [account] } }] }
            } as any);
            $cli.ask = (async () => { throw new Error('Unexpected interactive prompt'); }) as typeof $cli.ask;
            let { tools } = await client.listTools();
            let login = tools.find(x => x.name === 'auth_login').inputSchema;
            deepEq_(login.required, ['accountName']);
            eq_(login.properties.pin.type, 'string');
            eq_(login.properties['2fa'].type, 'string');
            let setup = tools.find(x => x.name === 'auth_2fa_setup').inputSchema;
            eq_(setup.properties.seed.type, 'string');

            let initial = await call('auth_status');
            deepEq_(initial.structuredContent, { '2fa': false, account: '' });
            let missing = await call('auth_login');
            eq_(missing.isError, true);
            let loggedIn = await call('auth_login', { accountName: account.name, pin: 'test-pin' });
            eq_(loggedIn.isError, undefined);
            deepEq_(loggedIn.structuredContent, { name: account.name, address: account.address });
            eq_(JSON.stringify(loggedIn).includes(account.key), false);
            let status = await call('auth_status');
            deepEq_(status.structuredContent, { '2fa': false, account: account.name });

            let missingSeed = await call('auth_2fa_setup', { pin: 'test-pin' });
            eq_(missingSeed.isError, true);
            has_(missingSeed.content[0].text, 'Provide seed');
            let enabled = await call('auth_2fa_setup', { pin: 'test-pin', seed });
            eq_(enabled.isError, undefined);
            deepEq_(enabled.structuredContent, { success: true });
            eq_(JSON.stringify(enabled).includes(seed), false);
            let enabledStatus = await call('auth_2fa_status');
            deepEq_(enabledStatus.structuredContent, { enabled: true, account: account.name });
            let rejected = await call('auth_2fa_disable', { pin: 'test-pin' });
            eq_(rejected.isError, true);
            has_(rejected.content[0].text, '2FA');
            let replacement = await call('auth_2fa_setup', { pin: 'test-pin', seed });
            eq_(replacement.isError, true);
            has_(replacement.content[0].text, '2FA');
            let { code } = await new TotpService().generateTotpCode(seed);
            let disabled = await call('auth_2fa_disable', { '2fa': code });
            eq_(disabled.isError, undefined);
            deepEq_(disabled.structuredContent, { success: true });
            let final = await call('auth_2fa_status');
            deepEq_(final.structuredContent, { enabled: false, account: account.name });
        } finally {
            AccountsService.DEFAULTS_PATH_LOCAL = originals.local;
            AccountsService.DEFAULTS_PATH_GLOBAL = originals.global;
            Config.fetch = originals.fetch;
            $cli.ask = originals.ask;
            if (await File.existsAsync(sessionPath)) await File.removeAsync(sessionPath);
        }
    },

    async 'transaction tools sign, send and view on the local chain'() {
        let { tools } = await client.listTools();
        let sign = tools.find(x => x.name === 'tx_sign').inputSchema;
        deepEq_(sign.required, ['Path', 'chain']);
        eq_(sign.properties.output.type, 'string');
        eq_(sign.properties.pin.type, 'string');
        let send = tools.find(x => x.name === 'tx_send').inputSchema;
        deepEq_(send.required, ['chain']);
        eq_(send.properties.value.type, 'string');
        eq_(send.properties.data.type, 'string');
        deepEq_(tools.find(x => x.name === 'tx_view').inputSchema.required, ['Hash', 'chain']);

        let provider = new HardhatProvider();
        let sender = provider.deployer(0);
        let recipient = provider.deployer(1);
        let input = './test/bin/mcp-tx/input.json';
        let output = './test/bin/mcp-tx/signed.json';
        let getSession = AccountsService.getSession;
        try {
            AccountsService.getSession = async () => ({});
            await File.writeAsync(input, { tx: { to: recipient.address, value: '1' } });
            let signed = await client.callTool({ name: 'tx_sign', arguments: {
                Path: input, output, chain: 'hardhat', account: sender.key,
            } });
            eq_(signed.isError, undefined);
            eq_(signed.structuredContent.path, output);
            deepEq_(signed.structuredContent.account, { address: sender.address });
            eq_(JSON.stringify(signed).includes(sender.key.slice(2)), false);
            let saved = await File.readAsync<any>(output, { cached: false });
            deepEq_(signed.structuredContent.signature, saved.signature);
            deepEq_(signed.structuredContent.tx, saved.tx);

            let before = await chain.getBalance(recipient.address);
            let sent = await client.callTool({ name: 'tx_send', arguments: { Path: output, chain: 'hardhat' } });
            eq_(sent.isError, undefined);
            eq_(sent.structuredContent.status, 1);
            eq_(await chain.getBalance(recipient.address) - before, 1n);
            let viewed = await client.callTool({ name: 'tx_view', arguments: {
                Hash: sent.structuredContent.transactionHash, chain: 'hardhat',
            } });
            eq_(viewed.isError, undefined);
            eq_(viewed.structuredContent.status, 'success');
            eq_(viewed.structuredContent.tx.hash, sent.structuredContent.transactionHash);
            let missing = await client.callTool({ name: 'tx_view', arguments: {
                Hash: `0x${'ab'.repeat(32)}`, chain: 'hardhat',
            } });
            deepEq_(missing.structuredContent, { result: null });

            before = await chain.getBalance(recipient.address);
            let value = 9_007_199_254_740_993n;
            let direct = await client.callTool({ name: 'tx_send', arguments: {
                to: recipient.address, value: value.toString(), data: '0x', account: sender.key, chain: 'hardhat',
            } });
            eq_(direct.isError, undefined);
            eq_(direct.structuredContent.status, 1);
            eq_(await chain.getBalance(recipient.address) - before, value);
            let invalid = await client.callTool({ name: 'tx_send', arguments: { value: 1, chain: 'hardhat' } });
            eq_(invalid.isError, true);
            let required = await client.callTool({ name: 'tx_sign', arguments: { chain: 'hardhat' } });
            eq_(required.isError, true);
        } finally {
            AccountsService.getSession = getSession;
        }
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

    async 'accounts management mutations are not exposed over MCP'() {
        let commands = ['new', 'add', 'remove', 'login', 'backup'];
        for (let command of commands) {
            let { error } = await $promise.caught(client.callTool({ name: `accounts_${command}`, arguments: {} }));
            notEq_(error, null);
            has_(error.message, 'Unknown tool');
        }
    },

    async 'account tools inherit authentication and expose named inputs'() {
        let { tools } = await client.listTools();
        let balance = tools.find(x => x.name === 'account_balance').inputSchema;
        deepEq_(balance.required, ['accountName', 'tokenSymbol']);
        deepEq_(Object.keys(balance.properties), ['accountName', 'tokenSymbol', 'pin', '2fa', 'chain', 'block']);
        eq_(balance.additionalProperties, false);
        let view = tools.find(x => x.name === 'account_view').inputSchema;
        deepEq_(view.required, ['accountName']);
        eq_(view.properties['encrypted-key'].type, 'boolean');
        let current = tools.find(x => x.name === 'account_current').inputSchema;
        deepEq_(current.required, []);
        let rename = tools.find(x => x.name === 'account_rename').inputSchema;
        deepEq_(rename.required, ['oldAccountName', 'newAccountName']);
    },

    async 'views, selects and renames accounts through MCP without exposing keys by default'() {
        let getSession = AccountsService.getSession;
        let fetchConfig = Config.fetch;
        const address = '0x0000000000000000000000000000000000000001';
        let accounts = [{ name: 'Operator', address, key: 'p1:encrypted-key-fixture' }];
        let source = {
            data: { name: 'accounts' },
            config: { accounts },
            async write(value) { this.config = value; },
        };
        try {
            AccountsService.getSession = async () => ({ pin: 'test-pin', 'session-account': 'Operator' });
            Config.fetch = async () => ({ $sources: { array: [source] } } as any);
            let calls = [
                { name: 'account_view', arguments: { accountName: 'Operator' } },
                { name: 'account_current', arguments: {} },
            ];
            for (let call of calls) {
                let result = await client.callTool(call);
                eq_(result.isError, undefined);
                deepEq_(result.structuredContent, { name: 'Operator', address });
                deepEq_(JSON.parse(result.content[0].text), result.structuredContent);
            }
            let encrypted = await client.callTool({ name: 'account_view', arguments: {
                accountName: 'Operator', 'encrypted-key': true
            } });
            eq_(encrypted.isError, undefined);
            deepEq_(encrypted.structuredContent, { name: 'Operator', address, encryptedKey: accounts[0].key });
            let renamed = await client.callTool({ name: 'account_rename', arguments: {
                oldAccountName: 'Operator', newAccountName: 'Renamed'
            } });
            eq_(renamed.isError, undefined);
            deepEq_(renamed.structuredContent, { name: 'Renamed', address });
            deepEq_(source.config.accounts, [{ name: 'Renamed', address, key: accounts[0].key }]);
            let selected = await client.callTool({ name: 'account_current', arguments: { account: 'Renamed' } });
            eq_(selected.isError, undefined);
            deepEq_(selected.structuredContent, renamed.structuredContent);

            let invalid = [
                { name: 'account_view', arguments: {} },
                { name: 'account_view', arguments: { accountName: 'missing' } },
                { name: 'account_view', arguments: { accountName: 'Renamed', 'encrypted-key': 'true' } },
                { name: 'account_rename', arguments: { oldAccountName: 'Renamed' } },
            ];
            for (let call of invalid) {
                let result = await client.callTool(call);
                eq_(result.isError, true);
            }
        } finally {
            AccountsService.getSession = getSession;
            Config.fetch = fetchConfig;
        }
    },

    async 'reads account balances through MCP on Hardhat'() {
        let getSession = AccountsService.getSession;
        try {
            AccountsService.getSession = async () => ({
                pin: 'test-pin', 'config-accounts': './test/bin/mcp-balance/accounts.json'
            });
            const address = '0x0000000000000000000000000000000000000001';
            let block = await chain.getBlock('latest');
            let expected = await chain.getBalance(address, block.number);
            let result = await client.callTool({ name: 'account_balance', arguments: {
                accountName: address, tokenSymbol: 'ETH', chain: 'hardhat', block: String(block.number)
            } });
            eq_(result.isError, undefined, result.content[0].text);
            eq_(result.structuredContent.address, address);
            eq_(result.structuredContent.balance, expected.toString());
            eq_(result.structuredContent.token.decimals, 18);
            deepEq_(JSON.parse(result.content[0].text), result.structuredContent);
        } finally {
            AccountsService.getSession = getSession;
        }
    },

    async 'discovers RPC inputs and calls methods with zero, two and three arguments'() {
        let { tools } = await client.listTools();
        let schema = tools.find(x => x.name === 'rpc').inputSchema;
        deepEq_(schema.required, ['RpcMethodName', 'chain']);
        deepEq_(Object.keys(schema.properties), ['RpcMethodName', 'arg0', 'arg1', 'arg2', 'account', 'chain']);
        eq_(schema.additionalProperties, true);
        let chainId = await client.callTool({ name: 'rpc', arguments: {
            RpcMethodName: 'eth_chainId', chain: 'hardhat'
        } });
        eq_(chainId.isError, undefined, chainId.content[0].text);
        deepEq_(chainId.structuredContent, { result: await chain.getChainId() });
        let block = await chain.getBlock('latest');
        let result = await client.callTool({ name: 'rpc', arguments: {
            RpcMethodName: 'eth_getBlockByNumber', chain: 'hardhat', arg0: String(block.number), arg1: 'false'
        } });
        eq_(result.isError, undefined, result.content[0].text);
        eq_(result.structuredContent.hash, block.hash);
        deepEq_(JSON.parse(result.content[0].text), result.structuredContent);
        let storage = await client.callTool({ name: 'rpc', arguments: {
            RpcMethodName: 'eth_getStorageAt', chain: 'hardhat',
            arg0: '0x0000000000000000000000000000000000000001', arg1: '0', arg2: 'latest'
        } });
        eq_(storage.isError, undefined, storage.content[0].text);
        eq_(BigInt(storage.structuredContent.result), 0n);
    },

    async 'forwards additional indexed RPC inputs'() {
        let process = RpcService.prototype.process;
        try {
            RpcService.prototype.process = async (args, params) => ({ args, arg3: params.arg3, arg4: params.arg4 });
            let result = await client.callTool({ name: 'rpc', arguments: {
                RpcMethodName: 'test', chain: 'hardhat', arg0: '0', arg1: 'false', arg2: 'null',
                arg3: 'json:[1,2]', arg4: 'string:123'
            } });
            eq_(result.isError, undefined);
            deepEq_(result.structuredContent, {
                args: ['test', '0', 'false', 'null'], arg3: 'json:[1,2]', arg4: 'string:123'
            });
        } finally {
            RpcService.prototype.process = process;
        }
    },

    async 'RPC validation and node failures return tool errors'() {
        let inputs = [
            { chain: 'hardhat' },
            { RpcMethodName: 'eth_chainId' },
            { RpcMethodName: 'eth_getBlockByNumber', chain: 'hardhat', arg1: 'false' },
            { RpcMethodName: 'eth_getBlockByNumber', chain: 'hardhat', arg0: 'latest', arg3: 'false' },
            { RpcMethodName: 'eth_getBlockByNumber', chain: 'hardhat', arg0: 'latest', arg1: 'boolean:invalid' },
            { RpcMethodName: 'eth_call', chain: 'hardhat', arg0: '{invalid}' },
            { RpcMethodName: 'unknown_mcp_test_method', chain: 'hardhat' },
        ];
        for (let input of inputs) {
            let result = await client.callTool({ name: 'rpc', arguments: input });
            eq_(result.isError, true);
            eq_(result.content[0].type, 'text');
        }
    },

    async 'ABI tools expose their required inputs without requiring a chain'() {
        let { tools } = await client.listTools();
        let cases = [
            ['abi_decode-calldata', 'Calldata'], ['abi_decode-error', 'RevertData'],
            ['abi_decode-result', 'ReturnData'], ['abi_decode-log', 'EventData'],
            ['abi_topic0', 'event'], ['abi_sig', 'sig'],
        ];
        for (let [name, argument] of cases) {
            let schema = tools.find(tool => tool.name === name).inputSchema;
            deepEq_(schema.required, [argument]);
            eq_(schema.properties[argument].type, 'string');
            eq_(schema.properties.json, undefined);
            eq_(schema.additionalProperties, false);
        }
    },

    async 'computes ABI hashes and decodes calldata, errors, results and logs locally'() {
        let zero = '0x0000000000000000000000000000000000000000';
        let amount = 9_007_199_254_740_993n;
        let topic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
        let cases = [
            { name: 'abi_sig', arguments: { sig: 'transfer(address to, uint256 amount)' }, expected: '0xa9059cbb' },
            { name: 'abi_topic0', arguments: { event: 'event Transfer(address indexed from, address indexed to, uint256 value)' }, expected: topic },
            { name: 'abi_decode-calldata', arguments: {
                Calldata: $abi.encodeCall('transfer(address to, uint256 amount)', [zero, amount]),
                abi: 'transfer(address to, uint256 amount)',
            }, expected: { name: 'transfer', args: [zero, amount.toString()], params: { to: zero, amount: amount.toString() } } },
            { name: 'abi_decode-error', arguments: {
                RevertData: $abi.encodeCall('Error(string message)', ['Not allowed']),
            }, expected: { name: 'Error', args: ['Not allowed'], params: { message: 'Not allowed' } } },
            { name: 'abi_decode-result', arguments: {
                ReturnData: $abi.encode(['uint256'], [amount]),
                abi: JSON.stringify(['balanceOf() returns (uint256 balance)', 'other() returns (bool)']),
                method: 'balanceOf',
            }, expected: { name: 'balanceOf', args: [amount.toString()], params: { balance: amount.toString() } } },
            { name: 'abi_decode-log', arguments: {
                EventData: $abi.encode(['uint256'], [amount]),
                abi: 'event Transfer(address indexed from, address indexed to, uint256 value)',
                topics: JSON.stringify([topic, $abi.encode(['address'], [zero]), $abi.encode(['address'], [zero])]),
            }, expected: { name: 'Transfer', args: [zero, zero, amount.toString()], params: { from: zero, to: zero, value: amount.toString() } } },
        ];
        for (let test of cases) {
            let result = await client.callTool({ name: test.name, arguments: test.arguments });
            eq_(result.isError, undefined, result.content[0].text);
            deepEq_(JSON.parse(result.content[0].text), test.expected);
            deepEq_(result.structuredContent, typeof test.expected === 'string' ? { result: test.expected } : test.expected);
        }
    },

    async 'ABI input and decoding failures are tool errors'() {
        let cases = [
            { name: 'abi_sig', arguments: {} },
            { name: 'abi_topic0', arguments: { event: 1 } },
            { name: 'abi_decode-calldata', arguments: { Calldata: '0x123', abi: 'ping()' } },
            { name: 'abi_decode-calldata', arguments: { Calldata: '0xa9059cbb', abi: 'approve(address,uint256)' } },
            { name: 'abi_decode-error', arguments: { RevertData: '0x' } },
            { name: 'abi_decode-result', arguments: { ReturnData: '0x', abi: 'read() returns (uint256)' } },
            { name: 'abi_decode-log', arguments: { EventData: '0x', abi: 'event Ping()', topics: '{invalid}' } },
            { name: 'abi_decode-result', arguments: { ReturnData: '0x', abi: '0x0000000000000000000000000000000000000001' } },
            { name: 'abi_sig', arguments: { sig: 'ping()', unknown: true } },
        ];
        for (let test of cases) {
            let result = await client.callTool(test);
            eq_(result.isError, true);
            eq_(result.content[0].type, 'text');
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
