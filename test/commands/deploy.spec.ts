import { HardhatService } from '@core/services/HardhatService';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { TestUtils } from '../TestUtils';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { Directory, File } from 'atma-io';
import { $require } from '@dequanto/utils/$require';
import { $contract } from '@dequanto/utils/$contract';
import { l } from '@dequanto/utils/$logger';
import { IDeployment } from '@dequanto/contracts/deploy/storage/DeploymentsStorage';

UTest({
    $config: {
        timeout: 60 * 1000
    },
    async '$before'() {
        await TestUtils.clean();
        await TestNode.start();
        await Directory.copyTo('./lib/', './node_modules/0xweb/lib/', { verbose: true });
    },
    async 'compile contract'() {
        let stdAddOne = await TestUtils.cli(`compile ./test/fixtures/hardhat/Foo.sol`, {
        });
        l`The output should contain the path to the compiled artifact`;
        has_(stdAddOne, `artifacts/test/fixtures/hardhat/Foo.sol/Foo.json`);

        let classPath = './0xc/hardhat/Foo/Foo.ts';
        eq_(await File.existsAsync(classPath), true, `The ts file should be created at ${classPath}`);
    },
    async 'deploy contract'() {
        let client = await TestNode.client('localhost');

        return UTest({
            async $before () {
                let result = await TestUtils.cli(`accounts new --name deployerFoo`);
                let address = /Address\s+(?<address>\w+)/.exec(result).groups.address;
                await client.debug.setBalance($require.Address(address), 10n ** 18n);
            },
            async 'single contract' () {
                let stdAddOne = await TestUtils.cli(`deploy ./test/fixtures/hardhat/Foo.sol --deployer deployerFoo --chain hardhat --name FooSingle`, {

                });
                has_(stdAddOne, /Deployed\s+0x\w+/);

                let $0xweb = await File.readAsync('./0xweb.json');
                has_($0xweb, {
                    "deployments": {
                        "hardhat": [
                            {
                                "path": "./0xc/deployments/deployments-hardhat.json"
                            }
                        ]
                    }
                });
                let $deployments = await File.readAsync<IDeployment[]>('./0xc/deployments/deployments-hardhat.json');
                let $deploymentInfo = $deployments.find(x => x.id === 'FooSingle');

                notEq_($deploymentInfo, undefined, `The deployment info should be found in the deployments file`);
                eq_($deploymentInfo.name, 'Foo', `The deployment name should be equal the contract name in sol file: 'Foo'`);

                let fooResponse = await TestUtils.cli(`c read FooSingle getFoo`);
                has_(fooResponse, `10n`);
            },
            async 'with proxy' () {
                let stdAddOne = await TestUtils.cli(`deploy ./test/fixtures/hardhat/Foo.sol --deployer deployerFoo --chain hardhat --name FooProxy --proxy`, {

                });
                has_(stdAddOne, /Deployed\s+0x\w+/);

                let fooResponse = await TestUtils.cli(`c read FooProxy getFoo`);
                has_(fooResponse, `10n`);
            }
        });
    },

})
