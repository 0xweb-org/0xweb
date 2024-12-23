import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { TestUtils } from '../TestUtils';

let hh = new HardhatProvider();

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before'() {
        await TestNode.start();
    },
    async 'check block' () {
        let client = hh.client('localhost');
        let blockNrBefore = await client.getBlockNumber();
        await TestUtils.cli('hardhat mine 1');
        let blockNrAfter = await client.getBlockNumber();
        eq_(blockNrAfter - blockNrBefore, 1);

        let blockData = await client.getBlock(blockNrAfter);

        let blockCliResp = await TestUtils.cli('block get latest');
        has_(blockCliResp, blockData.hash);

        let blockApiResp = await TestUtils.api(`/api/block/get/latest?chain=hardhat`);
        eq_(blockApiResp.hash, blockData.hash);
    }

});
