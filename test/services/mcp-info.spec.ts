import { AccountsService } from '@core/services/AccountsService';
import { Config } from '@dequanto/config/Config';
import { UTest } from 'atma-utest';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { middleware } from 'atma-server';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';

let nodes: any[] = [];
let failure: Error;
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

UTest.create({
    async $before() {
        let app = await new ServerService(Object.assign(new App(), { chain: { client: { platform: 'eth', network: 'eth', getNodeInfos: async () => { if (failure) throw failure; return nodes; } } } }) as App).createServer();
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

    async 'network information preserves statuses and serializes errors'() {
        let original = { session: AccountsService.getSession, fetch: Config.fetch };
        try {
            AccountsService.getSession = async () => ({});
            Config.fetch = async () => ({}) as any;
            let { tools } = await client.listTools();
            let schema = tools.find(x => x.name === 'info_network').inputSchema;
            deepEq_(schema.required, ['chain']);
            deepEq_(Object.keys(schema.properties), ['chain']);
            nodes = [
                { i: 0, url: 'http://node.test', status: 'live', blockNumber: 100, pingMs: 0 },
                { i: 1, status: 'sync', syncing: { currentBlock: 80, highestBlock: 100 } },
                { i: 2, status: 'error', error: new Error('Node unavailable') },
            ];
            let result = await client.callTool({ name: 'info_network', arguments: { chain: 'eth' } });
            eq_(result.isError, undefined);
            eq_(result.structuredContent.chain, 'eth');
            eq_(result.structuredContent.nodes[0].pingMs, 0);
            deepEq_(result.structuredContent.nodes[1].syncing, nodes[1].syncing);
            deepEq_(result.structuredContent.nodes[2].error, { name: 'Error', message: 'Node unavailable' });
            deepEq_(JSON.parse(result.content[0].text), result.structuredContent);
            nodes = [];
            let empty = await client.callTool({ name: 'info_network', arguments: { chain: 'eth' } });
            deepEq_(empty.structuredContent, { chain: 'eth', nodes: [] });
            let missing = await client.callTool({ name: 'info_network', arguments: {} });
            eq_(missing.isError, true);
            failure = new Error('Pool failed');
            let failed = await client.callTool({ name: 'info_network', arguments: { chain: 'eth' } });
            eq_(failed.isError, true);
            has_(failed.content[0].text, 'Pool failed');
        } finally {
            AccountsService.getSession = original.session;
            Config.fetch = original.fetch;
            failure = null;
        }
    },
});
