import { TestUtils } from '../TestUtils';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import type { Shell } from 'shellbee';


let shell: Shell;

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },

    async $before () {
        await TestUtils.clean();
        await TestNode.start();

        await TestUtils.cli(`accounts new --name deployerApiFoo`);
        await TestUtils.cli(`hardhat setBalance deployerApiFoo 1ether`)

        let stdAddOne = await TestUtils.cli(`deploy ./test/fixtures/hardhat/Foo.sol --name FooApi --chain hardhat --account deployerApiFoo`, {

        });
        has_(stdAddOne, /Deployed\s+0x\w+/);


        shell = await TestUtils.cliParallel(`server start --chain hardhat`, {}, {
            matchReady: /Local:/,
            silent: true,
        });

        await shell.onReadyAsync();
    },

    async $after () {
        await shell.terminate();
    },

    async 'get block'() {

        let json = await getJson('/api/block/get/latest?chain=hardhat');

        eq_(typeof json.number, 'number');
        has_(json.hash, /0x\w+/);
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


        let resp = await fetch(`http://localhost:3000/api/c/write/FooApi/setFoo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foo_: 11,
                account: 'deployerApiFoo'
            })
        });
        let { hash } = await resp.json();
        let tx = await getJson(`/api/tx/view/${hash}?chain=hardhat`);

        eq_(tx.status, 'success');
        eq_(tx.tx.hash, hash);

        let newValue = await getJson(`/api/c/read/FooApi/getFoo`);
        eq_(BigInt(newValue), 11n);

    }
})

async function getJson (path: string) {
    let resp = await fetch(`http://localhost:3000${path}`);
    let json = await resp.json();
    return json;
}
