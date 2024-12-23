import { App } from '@core/app/App';
import { TestUtils } from '../TestUtils';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import type { Shell } from 'shellbee';


let shell: Shell;

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },

    async $before () {
        await TestNode.start();
        shell = await TestUtils.cliParallel(`server start --chain hardhat`, {}, {
            matchReady: /Local:/,
            silent: false,
        });
        await shell.onReadyAsync();
    },

    async $after () {
        await shell.terminate();
    },

    async 'get block'() {
        let json;
        try {
            let resp = await fetch('http://localhost:3000/api/block/get/latest?chain=hardhat');
            json = await resp.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
        eq_(typeof json.number, 'number');
        has_(json.hash, /0x\w+/);
    },
})
