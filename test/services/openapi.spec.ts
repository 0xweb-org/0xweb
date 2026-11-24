import { UTest } from 'atma-utest';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
import { App } from '@core/app/App';
import { ServerService } from '@core/services/ServerService';
import { OpenApiFactory } from '@core/services/OpenApiFactory';
import { ICommand } from '@core/commands/ICommand';

let http: Server;
let endpoint: string;
UTest.create({
    async $before() {
        const app = await new ServerService(new App()).createServer();
        http = createServer((req, res) => app.process(req, res));
        await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve));
        endpoint = `http://127.0.0.1:${(http.address() as AddressInfo).port}`;
    },
    async $after() {
        await new Promise<void>((resolve, reject) => http.close(error => error ? reject(error) : resolve()));
    },
    async 'discovery returns OpenAPI without chain or credentials'() {
        const response = await fetch(`${endpoint}/api/discovery`);
        eq_(response.status, 200, await response.clone().text());
        has_(response.headers.get('content-type'), 'application/json');
        const doc = await response.json();
        eq_(doc.openapi, '3.1.1');
        eq_(doc.info.title, '0xweb HTTP API');
        deepEq_(doc.servers, [{ url: '/api' }]);
        eq_(doc.paths['/discovery'].get.operationId, 'get_discovery');
        const add = doc.paths['/accounts/add'].post;
        eq_(doc.paths['/accounts/add'].get, undefined);
        const body = add.requestBody.content['application/json'].schema;
        has_(body.required, 'name');
        eq_(body.properties.type.default, 'eoa');
        has_(body.properties.type.enum, 'safe');
        eq_(body.properties.login.type, 'boolean');
        eq_(body.properties.json, undefined);
        eq_(doc.paths['/tokens/add'], undefined);
        eq_(doc.paths['/accounts/list'], undefined);
        const rpc = doc.paths['/rpc/{RpcMethodName}'].get;
        eq_(rpc.parameters.find(x => x.name === 'RpcMethodName').in, 'path');
        eq_(rpc.parameters.find(x => x.name === 'RpcMethodName').required, true);
        eq_(rpc.parameters.filter(x => x.name === 'arg0').length, 1);
        eq_(rpc.parameters.find(x => x.name === 'chain').required, true);
        const decode = doc.paths['/abi/decode-calldata'].get;
        eq_(decode.parameters.find(x => x.name === 'Calldata').in, 'query');
        eq_(decode.parameters.find(x => x.name === 'Calldata').required, false);
        eq_(decode.parameters.find(x => x.name === 'Calldata')['x-fallback'], 'calldata');
        const operationIds = new Set();
        const entries = Object.entries(doc.paths);
        for (const [path, item] of entries) {
            const operations = Object.entries(item);
            for (const [method, operation] of operations as [string, any][]) {
                eq_(operationIds.has(operation.operationId), false);
                operationIds.add(operation.operationId);
                notEq_(operation.responses['200'], undefined);
                const names = (operation.parameters ?? []).map(x => `${x.in}:${x.name}`);
                eq_(new Set(names).size, names.length);
                const placeholders = Array.from(path.matchAll(/\{([^}]+)\}/g), match => match[1]);
                for (const name of placeholders) {
                    eq_(operation.parameters.find(x => x.in === 'path' && x.name === name)?.required, true);
                }
            }
        }
        const post = await fetch(`${endpoint}/api/discovery`, { method: 'POST' });
        eq_(post.status >= 400, true);
    },
    'schema generation preserves types and conditional requirements'() {
        const command: ICommand = {
            command: 'example', description: ['Example'], example: '0xweb example', api: {},
            params: {
                '--amount': { description: 'Amount', type: 'bigint', required: true },
                '--address': { description: 'Address', type: 'address' },
                '--data': { description: 'Data', type: 'hex' },
                '--count': { description: 'Count', type: 'number', default: 0 },
                '--pin': { description: 'PIN', required: true, requiredUnless: ['totp'] },
                '--account': { description: 'Account', required: true, fallback: 'session-account' },
            },
            async process() {},
        };
        const before = JSON.stringify(command);
        const doc = OpenApiFactory.create([{ path: '/example', command }]);
        const operation = doc.paths['/example'].get;
        const params = operation.parameters;
        eq_(params.find(x => x.name === 'amount').schema.type, 'string');
        eq_(params.find(x => x.name === 'amount').required, true);
        eq_(params.find(x => x.name === 'address').schema.type, 'string');
        eq_(params.find(x => x.name === 'data').schema.type, 'string');
        eq_(params.find(x => x.name === 'count').schema.default, 0);
        eq_(params.find(x => x.name === 'count').schema.type, 'number');
        eq_(params.find(x => x.name === 'pin').required, false);
        deepEq_(params.find(x => x.name === 'pin').schema['x-required-unless'], ['totp']);
        eq_(params.find(x => x.name === 'account').required, false);
        eq_(operation['x-cli-example'], '0xweb example');
        eq_(JSON.stringify(command), before);
        const hidden = { ...command, api: undefined };
        eq_(OpenApiFactory.create([{ path: '/hidden', command: hidden }]).paths['/hidden'], undefined);
    },
});
