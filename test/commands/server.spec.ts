import { TestUtils } from '../TestUtils';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import type { Shell } from 'shellbee';
import { $promise } from '@dequanto/utils/$promise';
import { File } from 'atma-io';
import { createServer } from 'net';
import { AddressInfo } from 'net';

const ACCOUNTS_PATH = './0xc/config/accounts.json';
const ACCOUNT_PATH = './0xc/config/account.json';
let shell: Shell;
let endpoint: string;

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },

    async $before () {
        await File.removeAsync(ACCOUNTS_PATH);
        await File.removeAsync(ACCOUNT_PATH);

        await TestUtils.clean();
        await TestNode.start();
        // The node may have restarted while deployment records survived on disk.
        const deploymentsPath = './0xc/deployments/deployments-hardhat.json';
        if (await File.existsAsync(deploymentsPath)) {
            const deployments = await File.readAsync<any[]>(deploymentsPath);
            await File.writeAsync(deploymentsPath, deployments.filter(x => x.id !== 'FooApi'));
        }

        await TestUtils.fork(`accounts new --name deployerApiFoo`);
        await TestUtils.fork(`hardhat setBalance deployerApiFoo 1ether`)

        let stdAddOne = await TestUtils.fork(`deploy ./test/fixtures/hardhat/Foo.sol --name FooApi --chain hardhat --account deployerApiFoo`, {

        });
        has_(stdAddOne, /Deployed\s+0x\w+/);


        const listener = createServer();
        await new Promise<void>(resolve => listener.listen(0, '127.0.0.1', resolve));
        const port = (listener.address() as AddressInfo).port;
        await new Promise<void>(resolve => listener.close(() => resolve()));
        endpoint = `http://127.0.0.1:${port}`;
        shell = await TestUtils.cliParallel(`server start --chain hardhat --port ${port}`, {}, {
            matchReady: /Local:/,
            silent: true,
        });

        await shell.onReadyAsync();
    },

    async $after () {
        if (shell) {
            await shell.terminate();
        }
    },

    async 'get block'() {

        let json = await getJson('/api/block/get/latest?chain=hardhat');

        eq_(typeof json.number, 'number');
        has_(json.hash, /0x\w+/);
    },

    async 'unknown functions report the missing ABI entry'() {
        const { error } = await $promise.caught(getJson('/api/c/read/FooApi/missingFunction'));
        notEq_(error, null);
        has_(error.message, 'Function "missingFunction" is not present in the ABI');
    },

    async 'fetch contract info' () {
        let json = await getJson('/api/c/list');

        let fooApi = json.find(c => c.name === 'FooApi');
        notEq_(fooApi, undefined, `FooApi not found`);

        let abi = await getJson('/api/c/abi/FooApi');
        has_(abi, [
            {
                name: 'getFoo',
                type: 'function',
            }
        ]);

        let value = await getJson(`/api/c/read/FooApi/getFoo`);
        eq_(value, '10');
        eq_(BigInt(value), 10n);

        let resp = await fetch(`${endpoint}/api/c/write/FooApi/setFoo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foo_: 11,
                account: 'deployerApiFoo',
                pin: '12345',
                'config-accounts': './test/bin/accounts.json',
                'config-global': './test/bin/config.json'
            })
        });
        let { hash } = await readJson(resp);
        let tx = await getJson(`/api/tx/view/${hash}?chain=hardhat`);

        eq_(tx.status, 'success');
        eq_(tx.tx.hash, hash);

        let newValue = await getJson(`/api/c/read/FooApi/getFoo`);
        eq_(BigInt(newValue), 11n);

    }
})

async function getJson (path: string) {
    let resp = await fetch(`${endpoint}${path}`);
    return readJson(resp);
}

async function readJson(resp: Response) {
    const json = await resp.json();
    if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.url}: ${json.error ?? json.message ?? JSON.stringify(json)}`);
    }
    return json;
}
