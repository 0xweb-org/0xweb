import { Deployments } from '@dequanto/contracts/deploy/Deployments';
import { AccountsService } from '@core/services/AccountsService';
import { Config } from '@dequanto/config/Config';
import { File } from 'atma-io';
import { UTest } from 'atma-utest';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { middleware } from 'atma-server';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';

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
        let app = await new ServerService(Object.assign(new App(), { chain: { client: { platform: 'eth', network: 'eth' } } }) as App).createServer();
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

    async 'imports deployment metadata through MCP'() {
        let original = { save: Deployments.prototype.saveExisting, session: AccountsService.getSession, fetch: Config.fetch };
        let directory = './test/bin/mcp-deployment';
        let path = `${directory}/deployments-eth.json`;
        let address = '0x0000000000000000000000000000000000000001';
        let calls = 0;
        try {
            if (await File.existsAsync(path)) await File.removeAsync(path);
            AccountsService.getSession = async () => ({});
            Config.fetch = async () => ({}) as any;
            Deployments.prototype.saveExisting = async function (params) {
                calls++;
                eq_(params.main, './test/fixtures/Counter.ts');
                eq_(params.name, 'Counter');
                eq_(params.contractAddress, address);
                eq_(this.opts.directory, directory);
                await this.store.upsertMany([{ id: params.id, name: params.name, main: params.main, address, implementation: address } as any]);
            };
            let { tools } = await client.listTools();
            let schema = tools.find(x => x.name === 'deployment_fetch').inputSchema;
            deepEq_(schema.required, ['ContractAddress', 'ContractName', 'main', 'chain']);
            eq_(schema.properties.json, undefined);
            let args = { ContractAddress: address, ContractName: 'Counter', main: './test/fixtures/Counter.ts', chain: 'eth', directory };
            let imported = await client.callTool({ name: 'deployment_fetch', arguments: args });
            eq_(imported.isError, undefined);
            eq_(imported.structuredContent.chain, 'eth');
            eq_(imported.structuredContent.directory, directory);
            let saved = await File.readAsync<any[]>(path, { cached: false });
            deepEq_(imported.structuredContent.deployment, saved[0]);
            eq_(saved[0].id, 'Counter');
            let explicit = await client.callTool({ name: 'deployment_fetch', arguments: { ...args, id: 'Custom' } });
            eq_(explicit.isError, undefined);
            eq_(explicit.structuredContent.deployment.id, 'Custom');
            let invalid = [{ ...args, ContractAddress: 'invalid' }, { ...args, id: '' }, { ContractAddress: address, ContractName: 'Counter', chain: 'eth' }];
            for (let input of invalid) {
                let result = await client.callTool({ name: 'deployment_fetch', arguments: input });
                eq_(result.isError, true);
            }
            eq_(calls, 2);
            Deployments.prototype.saveExisting = async () => { throw new Error('Explorer failed'); };
            let failure = await client.callTool({ name: 'deployment_fetch', arguments: args });
            eq_(failure.isError, true);
            has_(failure.content[0].text, 'Explorer failed');
        } finally {
            Deployments.prototype.saveExisting = original.save;
            AccountsService.getSession = original.session;
            Config.fetch = original.fetch;
            if (await File.existsAsync(path)) await File.removeAsync(path);
        }
    },
});
