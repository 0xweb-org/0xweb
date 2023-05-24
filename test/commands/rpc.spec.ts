import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { TestUtils } from '../TestUtils';
import { ethers } from 'ethers';



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
    async 'should call simple rpc method' () {

        let result = await TestUtils.cli('rpc eth_chainId --chain hardhat --silent');
        let chainId = Number(result);
        eq_(chainId, 1337);
    },

})
