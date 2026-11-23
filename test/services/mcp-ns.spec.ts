import { NameService } from '@dequanto/ns/NameService';
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

    async 'name service resolves roots and record paths through MCP'() {
        let original = { address: NameService.prototype.getAddress, content: NameService.prototype.getContent };
        let address = '0x0000000000000000000000000000000000000001';
        try {
            NameService.prototype.getAddress = (async domain => {
                eq_(domain, 'example.eth');
                return { address, platform: 'eth' };
            }) as any;
            NameService.prototype.getContent = (async uri => {
                eq_(uri, 'example.eth/foo');
                return { value: 'ipfs://test-cid', platform: 'polygon' };
            }) as any;
            let { tools } = await client.listTools();
            let schema = tools.find(x => x.name === 'ns_view').inputSchema;
            deepEq_(schema.required, ['Uri']);
            deepEq_(Object.keys(schema.properties), ['Uri', 'chain']);
            eq_(tools.some(x => x.name === 'ns_go'), false);
            let resolved = await client.callTool({ name: 'ns_view', arguments: { Uri: 'example.eth/foo' } });
            eq_(resolved.isError, undefined);
            deepEq_(resolved.structuredContent, { uri: 'example.eth/foo', address, content: 'ipfs://test-cid', addressPlatform: 'eth', contentPlatform: 'polygon', errors: {} });
            deepEq_(JSON.parse(resolved.content[0].text), resolved.structuredContent);
            NameService.prototype.getAddress = async () => null;
            NameService.prototype.getContent = async () => null;
            let empty = await client.callTool({ name: 'ns_view', arguments: { Uri: 'example.eth' } });
            deepEq_(empty.structuredContent, { uri: 'example.eth', address: '', content: '', addressPlatform: null, contentPlatform: null, errors: {} });
            NameService.prototype.getAddress = (async () => ({ address, platform: 'eth' })) as any;
            NameService.prototype.getContent = async () => { throw new Error('Content lookup failed'); };
            let partial = await client.callTool({ name: 'ns_view', arguments: { Uri: 'example.eth' } });
            eq_(partial.isError, undefined);
            eq_(partial.structuredContent.address, address);
            eq_(partial.structuredContent.errors.content, 'Content lookup failed');
            NameService.prototype.getAddress = async () => { throw new Error('Address lookup failed'); };
            let failed = await client.callTool({ name: 'ns_view', arguments: { Uri: 'example.eth' } });
            eq_(failed.isError, true);
            has_(failed.content[0].text, 'Name resolution failed');
            let invalid = [{}, { Uri: 'unsupported.invalid' }];
            for (let args of invalid) {
                let result = await client.callTool({ name: 'ns_view', arguments: args });
                eq_(result.isError, true);
            }
        } finally {
            NameService.prototype.getAddress = original.address;
            NameService.prototype.getContent = original.content;
        }
    },

});
