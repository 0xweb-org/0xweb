import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { TestUtils } from '../TestUtils';



let provider = new HardhatProvider();
let client = provider.client('localhost');
let owner1 = provider.deployer(0);
let owner2 = provider.deployer(1);

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before'() {
        await TestUtils.clean();
        await TestNode.start();
    },
    async 'should sign, send signed tx json' () {

        let STDOUT_SILENT = true;

        await File.writeAsync('./test/bin/tx.json', {
            tx: {
                to: owner2.address,
                value: 1,
            }
        });

        l`Signing with ${owner1.address}`;
        let result = await TestUtils.cli(`tx sign ./test/bin/tx.json`, {
            '--account': owner1.key,
            '--chain': 'hardhat'
        }, { silent: STDOUT_SILENT });


        let json = await File.readAsync<any>('./test/bin/tx.json', { cached: false });
        eq_(typeof json.tx.nonce, 'number', json.tx.nonce);
        has_(json.signature.r, /^0x/);

        let balanceBefore = await client.getBalance(owner2.address);
        l`Balance for ${owner2.address}: ${balanceBefore}ETH`

        let txSendStdout = await TestUtils.cli(`tx send ./test/bin/tx.json`, {

        }, { silent: STDOUT_SILENT });

        let tx = /Tx\s+(?<tx>0x\w+)/.exec(txSendStdout)?.groups.tx;
        has_(tx, /^0x[\w]{64}/);


        let balanceAfter = await client.getBalance(owner2.address);
        l`Balance for ${owner2.address}: bold<green<${balanceAfter}ETH>>`

        eq_(balanceAfter - balanceBefore, 1n);


        let txViewStdout = await TestUtils.cli(`tx view ${tx}`, {

        }, { silent: STDOUT_SILENT });

        has_(txViewStdout, tx);


        let txDetails = await TestUtils.api(`/api/tx/view/${tx}?chain=hardhat`);
        eq_(txDetails.tx.hash, tx);
        eq_(txDetails.tx.from?.toLowerCase(), owner1.address.toLowerCase());
    }
})
