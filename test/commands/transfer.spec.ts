import alot from 'alot';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { run } from 'shellbee';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $bigint } from '@dequanto/utils/$bigint';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { SafeUtils } from './SafeUtils';
import { TestUtils } from '../TestUtils';
import { $address } from '@dequanto/utils/$address';


UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before' () {
        await TestUtils.clean();
        await TestNode.start();
    },
    'transfer ETH': {
        async 'EOA to EOA' () {
            let provider = new HardhatProvider();
            let client = provider.client('localhost');
            let owner1 = provider.deployer();
            let owner2 = provider.deployer(1);

            l`> Adding account to storage`;
            let stdAddOne = await TestUtils.cli(`accounts add`, {
                '--name': 'one',
                '--key': owner1.key
            });
            has_(stdAddOne, owner1.address);

            l`> Get balance one`;
            let stdBalanceOne = await TestUtils.cli(`account balance one ETH`, {});
            let balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)[1];
            let balanceOne = Number(balanceOneStr);
            l`> Balance one ${balanceOne}`;
            eq_(balanceOne, $bigint.toEther( await client.getBalance(owner1.address) ));


            l`> Get balance two`;
            let stdBalanceTwo = await TestUtils.cli(`account balance ${owner2.address} ETH`, {});
            let balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)[1];
            let balanceTwo = Number(balanceTwoStr);
            l`> Balance two ${balanceTwo}`;
            eq_(balanceTwo, $bigint.toEther( await client.getBalance(owner2.address) ));

            l`> Transfer`;
            await TestUtils.cli(`transfer 5 ETH --from one --to ${owner2.address}`, {});

            l`Get balance one after`;
            stdBalanceOne = await TestUtils.cli(`account balance one ETH`, {});
            balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)[1];
            let balanceOneAfter = Number(balanceOneStr);
            l`Balance one after ${balanceOne}`;
            /** -5 - spent gas */
            lt_(balanceOneAfter, balanceOne - 5);
            gt_(balanceOneAfter, balanceOne - 6);

            l`Get balance two after`;
            stdBalanceTwo = await TestUtils.cli(`account balance ${owner2.address} ETH`, {});
            balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)[1];
            let balanceTwoAfter = Number(balanceTwoStr);
            l`Balance two after ${balanceTwoAfter}`;
            eq_(balanceTwoAfter, balanceTwo + 5);
        },
        async 'EOA to SAFE' () {
            let provider = new HardhatProvider();
            let owner1 = provider.deployer();
            let client = provider.client('localhost');

            l`Adding account to storage. (Later the owner of the safe)`;
            await TestUtils.cli(`accounts add`, {
                '--name': 'one',
                '--key': owner1.key
            });

            let safeAddress = await SafeUtils.create(owner1.address, 'safe/test');

            l`Transfer ETH to safe`;
            await TestUtils.cli(`transfer 1.5 ETH --from one --to safe/test`, {
                '--from': 'one',
                '--to': 'safe/test'
            });
            let balance = await client.getBalance(safeAddress);
            eq_($bigint.toEther(balance), 1.5);
        },
    },
    async '!transfer ERC20' () {
        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        l`>Deploy ERC20 token`;
        let contract = await TestUtils.deployFreeToken(client)
        await contract.airdrop();

        let erc20 = new ERC20(contract.address, client);


        l`> Add to known tokens`
        await TestUtils.cli(`tokens add`, {
            '--address': contract.address,
            '--symbol': 'FRT',
            '--decimals': 18,
            '--chain': 'hardhat'
        });

        l`> Adding account to storage`;
        let stdAddOne = await TestUtils.cli(`accounts add`, {
            '--name': 'one',
            '--key': owner1.key
        });
        has_(stdAddOne, owner1.address);


        l`> Get balance one`;
        let stdBalanceOne = await TestUtils.cli(`account balance one FRT`, {});
        let balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)?.[1];

        let balanceOne = Number(balanceOneStr);
        l`> Balance one ${balanceOne}`;

        eq_(balanceOne, 10);
        eq_(balanceOne, $bigint.toEther( await erc20.balanceOf(owner1.address) ));


        l`> Get balance two`;
        let stdBalanceTwo = await TestUtils.cli(`account balance ${owner2.address} FRT`, {});
        let balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)?.[1];
        let balanceTwo = Number(balanceTwoStr);
        l`> Balance two ${balanceTwo}`;
        eq_(balanceTwo, 0n);
        eq_(balanceTwo, $bigint.toEther( await erc20.balanceOf(owner2.address) ));

        l`> Transfer`;
        await TestUtils.cli(`transfer 6 FRT --from one --to ${owner2.address}`, {});

        l`> Get balance one after`;
        stdBalanceOne = await TestUtils.cli(`account balance one FRT`, {});
        balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)?.[1];
        let balanceOneAfter = Number(balanceOneStr);
        l`> Balance one after ${balanceOneAfter}`;
        eq_(balanceOneAfter, 4);

        l`> Get balance two after`;
        stdBalanceTwo = await TestUtils.cli(`account balance ${owner2.address} FRT`, {});
        balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)?.[1];
        let balanceTwoAfter = Number(balanceTwoStr);
        l`> Balance two after ${balanceTwoAfter}`;
        eq_(balanceTwoAfter, 6);


        l`> Call ERC20 interface with built-in openzeppelin contract`
        stdBalanceTwo = await TestUtils.cli(`contract read erc20 balanceOf`, {
            '--chain': 'hardhat',
            '--address': contract.address,
            '--account': owner1.address,
        });
        has_(stdBalanceTwo, '4000000000000000000n');
    },

    async 'transfer ERC20 with file signature' () {
        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        l`>Deploy ERC20 token`;
        let contract = await TestUtils.deployFreeToken(client)
        await contract.airdrop();

        let erc20 = new ERC20(contract.address, client);


        l`> Add to known tokens`
        await TestUtils.cli(`tokens add`, {
            '--address': contract.address,
            '--symbol': 'FRT',
            '--decimals': 18,
            '--chain': 'hardhat'
        });

        l`> Adding account to storage`;
        let stdAddOne = await TestUtils.cli(`accounts add`, {
            '--name': 'nokeyAcc',
            '--address': owner1.address,
        });

        await TestUtils.cli(`transfer 6 FRT --from nokeyAcc --to ${owner2.address}`, {
            '--sig-transport': './test/bin/tx.json'
        });

    }
})
