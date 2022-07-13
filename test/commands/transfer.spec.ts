import alot from 'alot';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { run } from 'shellbee';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $bigint } from '@dequanto/utils/$bigint';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';

const ACCOUNTS_PATH = './test/bin/accounts.json';
const CONFIG_PATH = './test/bin/config.json';

const PARAMS_DEF = {
    '--config-accounts': ACCOUNTS_PATH,
    '--config-global': CONFIG_PATH,
    '--pin': '12345',
    '--chain': 'hardhat',
    '--color': 'none'
};

const cli = async (command: string, params: any) => {
    params = {
        ...PARAMS_DEF,
        ...params
    };
    let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
    let cmdStr = `node ./index.js ${command} ${paramsStr}`;
    let { stdout, stderr, lastCode } = await run({
        command: cmdStr,
        //silent: true,
    });
    if (lastCode !== 0) {
        console.error(stdout.join('\n'), stderr.join('\n'));
        throw new Error(`Process exit code ${lastCode}`)

    }
    return stdout.join('\n');
};


UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before' () {
        await File.removeAsync(ACCOUNTS_PATH);
        await File.removeAsync(CONFIG_PATH);
        await TestNode.start();
    },
    async 'transfer ETH' () {
        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        l`> Adding account to storage`;
        let stdAddOne = await cli(`accounts add`, {
            '--name': 'one',
            '--key': owner1.key
        });
        has_(stdAddOne, owner1.address);


        l`> Get balance one`;
        let stdBalanceOne = await cli(`account balance one ETH`, {});
        let balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)[1];
        let balanceOne = Number(balanceOneStr);
        l`> Balance one ${balanceOne}`;
        eq_(balanceOne, $bigint.toEther( await client.getBalance(owner1.address) ));


        l`> Get balance two`;
        let stdBalanceTwo = await cli(`account balance ${owner2.address} ETH`, {});
        let balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)[1];
        let balanceTwo = Number(balanceTwoStr);
        l`> Balance two ${balanceTwo}`;
        eq_(balanceTwo, $bigint.toEther( await client.getBalance(owner2.address) ));

        l`> Transfer`;
        await cli(`transfer 5 ETH --from one --to ${owner2.address}`, {});

        l`Get balance one after`;
        stdBalanceOne = await cli(`account balance one ETH`, {});
        balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)[1];
        let balanceOneAfter = Number(balanceOneStr);
        l`Balance one after ${balanceOne}`;
        /** -5 - spent gas */
        lt_(balanceOneAfter, balanceOne - 5);
        gt_(balanceOneAfter, balanceOne - 6);

        l`Get balance two after`;
        stdBalanceTwo = await cli(`account balance ${owner2.address} ETH`, {});
        balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)[1];
        let balanceTwoAfter = Number(balanceTwoStr);
        l`Balance two after ${balanceTwoAfter}`;
        eq_(balanceTwoAfter, balanceTwo + 5);
    },
    async 'transfer ERC20' () {
        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        l`>Deploy ERC20 token`;
        let { contract } = await provider.deploySol('/dequanto/test/fixtures/contracts/FreeToken.sol', {
            client
        });

        await contract.airdrop();

        let erc20 = new ERC20(contract.address, client);


        l`> Add to known tokens`
        await cli(`tokens add`, {
            '--address': contract.address,
            '--symbol': 'FRT',
            '--decimals': 18,
            '--chain': 'hardhat'
        });

        l`> Adding account to storage`;
        let stdAddOne = await cli(`accounts add`, {
            '--name': 'one',
            '--key': owner1.key
        });
        has_(stdAddOne, owner1.address);


        l`> Get balance one`;
        let stdBalanceOne = await cli(`account balance one FRT`, {});
        let balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)?.[1];

        let balanceOne = Number(balanceOneStr);
        l`> Balance one ${balanceOne}`;

        eq_(balanceOne, 10);
        eq_(balanceOne, $bigint.toEther( await erc20.balanceOf(owner1.address) ));


        l`> Get balance two`;
        let stdBalanceTwo = await cli(`account balance ${owner2.address} FRT`, {});
        let balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)?.[1];
        let balanceTwo = Number(balanceTwoStr);
        l`> Balance two ${balanceTwo}`;
        eq_(balanceTwo, 0n);
        eq_(balanceTwo, $bigint.toEther( await erc20.balanceOf(owner2.address) ));

        l`> Transfer`;
        await cli(`transfer 6 FRT --from one --to ${owner2.address}`, {});

        l`> Get balance one after`;
        stdBalanceOne = await cli(`account balance one FRT`, {});
        balanceOneStr = /Balance\s+([\d\.]+)/.exec(stdBalanceOne)?.[1];
        let balanceOneAfter = Number(balanceOneStr);
        l`> Balance one after ${balanceOneAfter}`;
        eq_(balanceOneAfter, 4);

        l`> Get balance two after`;
        stdBalanceTwo = await cli(`account balance ${owner2.address} FRT`, {});
        balanceTwoStr = /Balance\s+([\d\.]+)/.exec(stdBalanceTwo)?.[1];
        let balanceTwoAfter = Number(balanceTwoStr);
        l`> Balance two after ${balanceTwoAfter}`;
        eq_(balanceTwoAfter, 6);
    }
})
