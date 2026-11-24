import { AccountsService } from '@core/services/AccountsService';
import { Config } from '@dequanto/config/Config';
import { UTest } from 'atma-utest';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { middleware } from 'atma-server';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';

import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';

const address = '0x0000000000000000000000000000000000000001';
const token = { address, symbol: 'TEST', decimals: 18, platform: 'eth' };
let saved;
let priceOptions;
let priceFailure = false;
let transfers = [];
const tokenService = {
    getToken: async query => query === 'missing' ? null : token,
    getKnownToken: async query => {
        if (query === 'missing') {
            throw new Error('Missing token');
        }
        return token;
    },
    addKnownToken: async value => { saved = value; },
};
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
    if (message.error) {
        throw Object.assign(new Error(message.error.message), { code: message.error.code });
    }
    return message.result;
}
const client = {
    listTools: () => rpc('tools/list'),
    callTool: (params: { name: string; arguments: Record<string, unknown> }) => rpc('tools/call', params)
};
let endpoint: string;

UTest.create({
    async $before() {
        let app = await new ServerService(Object.assign(new App(), { chain: { client: { platform: 'eth', network: 'eth' }, tokens: tokenService } }) as App).createServer();
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
        if (http) {
            await new Promise<void>((resolve, reject) => http.close(error => error ? reject(error) : resolve()));
        }
    },

    async 'token tools expose schemas and structured results'() {
        let original = {
            session: AccountsService.getSession, fetch: Config.fetch,
            price: TokenPriceService.prototype.getPrice,
            transfers: ERC20.prototype.getPastLogsTransfer,
            balance: ERC20.prototype.balanceOf,
        };
        try {
            AccountsService.getSession = async () => ({});
            Config.fetch = async () => ({}) as any;
            TokenPriceService.prototype.getPrice = (async (_token, opts) => {
                priceOptions = opts;
                return priceFailure ? { error: new Error('Oracle unavailable') } : { price: 2, provider: 'test' };
            }) as any;
            ERC20.prototype.getPastLogsTransfer = async () => transfers;
            ERC20.prototype.balanceOf = async () => 1_000_000_000_000_000_001n;
            let { tools } = await client.listTools();
            let names = ['token_price', 'tokens_add', 'tokens_find', 'tokens_for'];
            for (let name of names) {
                let tool = tools.find(x => x.name === name);
                notEq_(tool, undefined);
                eq_(tool.inputSchema.properties.json, undefined);
            }
            let schema = tools.find(x => x.name === 'token_price').inputSchema;
            eq_(schema.properties.block.type, 'number');
            eq_(schema.properties.chain.default, 'eth');
            let added = await client.callTool({ name: 'tokens_add', arguments: { chain: 'eth', address, symbol: 'TEST' } });
            deepEq_(saved, token);
            deepEq_(added.structuredContent, token);
            let found = await client.callTool({ name: 'tokens_find', arguments: { chain: 'eth', symbol: 'TEST' } });
            deepEq_(found.structuredContent, token);
            let price = await client.callTool({ name: 'token_price', arguments: { token: 'TEST', block: 0 } });
            eq_(price.structuredContent.price, 2);
            eq_(price.structuredContent.provider, 'test');
            deepEq_(price.structuredContent.token, token);
            eq_(priceOptions.block, 0);
            let empty = await client.callTool({ name: 'tokens_for', arguments: { chain: 'eth', address } });
            deepEq_(empty.structuredContent, { chain: 'eth', address, balances: [] });
            transfers = [{ address }, { address }];
            priceFailure = true;
            let balances = await client.callTool({ name: 'tokens_for', arguments: { chain: 'eth', address } });
            eq_(balances.structuredContent.balances.length, 1);
            eq_(balances.structuredContent.balances[0].balanceWei, '1000000000000000001');
            eq_(priceOptions.amountWei, 1_000_000_000_000_000_001n);
            deepEq_(balances.structuredContent.balances[0].priceInfo.error, { name: 'Error', message: 'Oracle unavailable' });
            deepEq_(JSON.parse(balances.content[0].text), balances.structuredContent);
            let failedPrice = await client.callTool({ name: 'token_price', arguments: { token: 'TEST' } });
            eq_(failedPrice.structuredContent.error.message, 'Oracle unavailable');
            let invalid = [
                { name: 'token_price', arguments: {} },
                { name: 'token_price', arguments: { token: 'TEST', block: -1 } },
                { name: 'token_price', arguments: { token: 'TEST', block: 1.5 } },
                { name: 'token_price', arguments: { token: 'missing' } },
                { name: 'tokens_find', arguments: { chain: 'eth' } },
                { name: 'tokens_find', arguments: { chain: 'eth', symbol: 'missing' } },
                { name: 'tokens_for', arguments: { chain: 'eth', address: 'invalid' } },
                { name: 'tokens_add', arguments: { chain: 'eth', address, symbol: 'TEST', decimals: 256 } },
                { name: 'tokens_add', arguments: { chain: 'eth', address: 'invalid', symbol: 'TEST' } },
                { name: 'tokens_add', arguments: { address, symbol: 'TEST' } },
            ];
            for (let request of invalid) {
                let result = await client.callTool(request);
                eq_(result.isError, true);
            }
        } finally {
            AccountsService.getSession = original.session;
            Config.fetch = original.fetch;
            TokenPriceService.prototype.getPrice = original.price;
            ERC20.prototype.getPastLogsTransfer = original.transfers;
            ERC20.prototype.balanceOf = original.balance;
        }
    },
});
