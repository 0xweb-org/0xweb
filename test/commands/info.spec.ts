import { File } from 'atma-io';
import { UTest } from 'atma-utest';
import { CInfo } from '@core/commands/list/CInfo';
import { $console } from '@core/utils/$console';
import { CliUtils } from '../CliUtils';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';

let server: Server;
let endpoint: string;
const configPath = './test/bin/info/config.json';
UTest.create({
    async $before() {
        server = createServer(async (req, res) => {
            let body = '';
            for await (let chunk of req) body += chunk;
            let data = JSON.parse(body);
            let respond = message => ({ jsonrpc: '2.0', id: message.id, result: {
                eth_blockNumber: '0x64', eth_syncing: false, net_peerCount: '0x3', net_version: '1', eth_chainId: '0x1',
            }[message.method] });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(Array.isArray(data) ? data.map(respond) : respond(data)));
        });
        await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
        endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
        await File.writeAsync(configPath, { web3: { eth: { chainId: 1, endpoints: [{ url: endpoint }] } } });
    },
    async $after() {
        await new Promise<void>(resolve => server.close(() => resolve()));
        if (await File.existsAsync(configPath)) await File.removeAsync(configPath);
    },
    async 'CLI emits network JSON using a local RPC endpoint'() {
        let result = await CliUtils.forkJson(`info network --chain eth --config-global ${configPath} --json --local`);
        eq_(result.chain, 'eth');
        eq_(result.nodes.length, 1);
        eq_(result.nodes[0].url, endpoint);
        eq_(result.nodes[0].blockNumber, 100);
        eq_(result.nodes[0].peers, 3);
        eq_(result.nodes[0].status, 'live');
    },
    async 'table tolerates missing syncing stages and zero ping'() {
        let table = $console.table;
        let json = $console.isJsonOnly();
        let rows;
        try {
            $console.setJsonOnly(false);
            $console.table = value => { rows = value; };
            let nodes = [{ i: 0, url: 'test', syncing: { currentBlock: 1, highestBlock: 2 }, pingMs: 0 }];
            let result = await CInfo().subcommands[0].process([], {}, { chain: { client: { platform: 'eth', getNodeInfos: async () => nodes } } } as any);
            eq_(rows[1][4], 'sync');
            eq_(rows[1][6], '0ms');
            eq_(result.nodes.length, 1);
        } finally {
            $console.table = table;
            $console.setJsonOnly(json);
        }
    },
});
