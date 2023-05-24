import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { TestUtils } from '../TestUtils';

UTest({
    async '$before'() {
        await TestUtils.clean();
        //await TestNode.start();
    },
    async '!compile contract' () {
        let stdAddOne = await TestUtils.cli(`compile ./test/fixtures/hardhat/Foo.sol`, {
        });
        has_(stdAddOne, `Foo.sol/Foo.json`);
    },
    async 'deploy contract' () {

        let result = await TestUtils.cli(`accounts new --name deployerFoo`);
        let address = /Address\s+(?<address>\w+)/.exec(result).groups.address;

        let client = await TestNode.client('localhost');
        await client.debug.setBalance(address, 10n**18n);

        let stdAddOne = await TestUtils.cli(`deploy ./test/fixtures/hardhat/Foo.sol --deployer deployerFoo --chain hardhat`, {

        });
        has_(stdAddOne, /Deployed\s+0x\w+/);
    },

})
