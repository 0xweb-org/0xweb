import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { $address } from '@dequanto/utils/$address';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { run, Shell } from 'shellbee';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import alot from 'alot';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { $bigint } from '@dequanto/utils/$bigint';
import { $fn } from '@dequanto/utils/$fn';
import { $signRaw } from '@dequanto/utils/$signRaw';

const ACCOUNTS_PATH = './test/bin/accounts.json';
const CONFIG_PATH = './test/bin/config.json';
const SAFE_TX = './test/bin/safe-transfer.json'
const PARAMS_DEF = {
    '--config-accounts': ACCOUNTS_PATH,
    '--config-global': CONFIG_PATH,
    '--pin': '12345',
    '--chain': 'hardhat'
};

const cli = async (command: string, params: any) => {
    let shell = await cliStart(command, params).onCompleteAsync()
    let { stdout } = shell;
    return stdout.join('\n');
};
const cliStart = (command: string, params: any) => {
    params = {
        ...PARAMS_DEF,
        ...params
    };
    let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
    let cmdStr = `node ./index.js ${command} ${paramsStr}`;
    let shell = new Shell({ command: cmdStr });
    shell.run();
    return shell;
}


UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before'() {
        await File.removeAsync(ACCOUNTS_PATH);
        await File.removeAsync(CONFIG_PATH);
        await File.removeAsync(SAFE_TX);
        await TestNode.start();
    },
    async 'should add, list, remove safe'() {
        let account = ChainAccountProvider.generate();

        l`\n> add account`
        let addedStdout = await cli(`accounts add` {
            '-n': 'bar',
            '-k': account.key
        });
        has_(addedStdout, account.address);


        l`\n> add`
        let addedSafeStdout = await cli(`safe add`, {
            '-n': 'safe/foo',
            '-a': $address.ZERO,
            '-o': account.address,
        });
        has_(addedSafeStdout, account.address);

        l`\n> is encrypted`
        let jsonStr = await File.readAsync<string>(ACCOUNTS_PATH, { skipHooks: true });
        hasNot_(jsonStr, account.address);
        hasNot_(jsonStr, 'foo');

        l`\n> list`
        let listStdout = await cli('safe list', {});
        has_(listStdout, 'safe/foo');
        hasNot_(listStdout, account.address);
        has_(listStdout, $address.ZERO);


        l`\n> remove`
        let removeStdout = await cli('safe remove', {
            '-n': 'safe/foo'
        });
        hasNot_(removeStdout, 'safe/foo');
        hasNot_(removeStdout, account.address);


        listStdout = await cli('safe list', {});
        hasNot_(listStdout, 'safe/foo');
        hasNot_(listStdout, account.address);
    },

    async '!create safe'() {

        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        const { contract: proxyFactoryContract, abi: proxyFactoryAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/proxies/GnosisSafeProxyFactory.sol', {
            client
        });
        const { contract: safeContract, abi: safeAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/GnosisSafe.sol', {
            client
        });
        const { contract: multiSendContract, abi: multiSendAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/libraries/MultiSend.sol', {
            client
        });


        l`Adding account to storage. (Later the owner of the safe)`;
        await cli(`accounts add`, {
            '--name': 'one',
            '--key': owner1.key
        });

        let contracts = {
            multiSendAddress: multiSendContract.address,
            multiSendAbi: multiSendAbi,

            safeMasterCopyAddress: safeContract.address,
            safeMasterCopyAbi: safeAbi,

            safeProxyFactoryAbi: proxyFactoryAbi,
            safeProxyFactoryAddress: proxyFactoryContract.address
        };

        await File.writeAsync('./test/bin/contracts.json', contracts);

        let stdCreateSafe = await cli(`safe new`, {
            '--owner': owner1.address,
            '--name': 'safe/test',
            '--contracts': './test/bin/contracts.json'
        });

        let match = /safe\/test\s+\[(?<address>[^\]]+)\]/.exec(stdCreateSafe);
        let safeAddress = match?.groups?.address;
        eq_($address.isValid(safeAddress), true, 'Safe address not found');


        l`>Deploy ERC20 token`;
        let { contract: freeTokenContract } = await provider.deploySol('/dequanto/test/fixtures/contracts/FreeToken.sol', {
            client
        });
        await freeTokenContract.airdrop();
        let erc20 = new ERC20(freeTokenContract.address, client);

        l`> Add to known tokens`
        await cli(`tokens add`, {
            '--address': freeTokenContract.address,
            '--symbol': 'FRT',
            '--decimals': 18,
            '--chain': 'hardhat'
        });


        await cli(`transfer 6 FRT`, {
            '--from': 'one',
            '--to': 'safe/test',
        });

        eq_($bigint.toEther(await erc20.balanceOf(safeAddress)), 6);


        let shell = cliStart(`transfer 4 FRT`, {
            '--from': 'safe/test',
            '--to': owner2.address,
            '--safe-transport': SAFE_TX
        });

        let safeTx = await $fn.waitForObject(async () => {
            let file = new File(SAFE_TX, { cached: false })
            if (await file.existsAsync() === false) {
                return [null, null];
            }
            let txs = await file.readAsync<any[]>();
            eq_(txs.length, 1);

            let safeTx = txs[0];

            let sig1 = $signRaw.signEC(safeTx.safeTxHash, owner1.key);
            let sig2 = $signRaw.signEC(safeTx.safeTxHash, owner2.key);
            safeTx.confirmations = [
                { owner: owner1.address, signature: sig1.signature },
                { owner: owner2.address, signature: sig2.signature },
            ];

            await file.writeAsync(txs);

            return [null, safeTx];
        });

        let { stdout } = await shell.onCompleteAsync();

        eq_($bigint.toEther(await erc20.balanceOf(owner2.address)), 4);
    }
})
