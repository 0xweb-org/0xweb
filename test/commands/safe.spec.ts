import alot from 'alot';
import { File } from 'atma-io';
import { Shell } from 'shellbee';
import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { $address } from '@dequanto/utils/$address';
import { l } from '@dequanto/utils/$logger';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { $bigint } from '@dequanto/utils/$bigint';
import { $fn } from '@dequanto/utils/$fn';
import { $signRaw } from '@dequanto/utils/$signRaw';
import { SafeUtils } from './SafeUtils';
import { GnosisSafeHandler } from '@dequanto/safe/GnosisSafeHandler';

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
    async 'parse tx' () {
        let a = `0x6a761202000000000000000000000000b45ddddddddddddddddddddddddddddd30fad3610000000000000000000000000000000000000000000000000186cc6acd4b0000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008271111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111116d1b000000000000000000000000000000000000000000000000000000000000`;
        let aParsed = GnosisSafeHandler.parseSafeTx(a);
        eq_(aParsed.args[1], $bigint.toWei(.11));
    },
    async 'should add, list, remove safe'() {
        let account = ChainAccountProvider.generate();

        l`\n> add account`
        let addedStdout = await cli(`accounts add`, {
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
        hasNot_(removeStdout, $address.ZERO);


        listStdout = await cli('safe list', {});
        hasNot_(listStdout, 'safe/foo');
        hasNot_(listStdout, $address.ZERO);
    },

    async '!create safe and execute TXs'() {

        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        let path = await SafeUtils.prepair();


        l`> Adding account to storage. (Later the owner of the safe)`;
        await cli(`accounts add`, {
            '--name': 'one',
            '--key': owner1.key
        });

        let stdCreateSafe = await cli(`safe new`, {
            '--owner': owner1.address,
            '--name': 'safe/test',
            '--contracts': path
        });

        let match = /safe\/test\s+\[(?<address>[^\]]+)\]/.exec(stdCreateSafe);
        let safeAddress = match?.groups?.address;
        eq_($address.isValid(safeAddress), true, 'Safe address not found');


        l`> Deploy ERC20 token`;
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

        l`> Fund SAFE`
        await cli(`transfer 6 FRT`, {
            '--from': 'one',
            '--to': 'safe/test',
        });

        eq_($bigint.toEther(await erc20.balanceOf(safeAddress)), 6);


        l`> Send from SAFE to EOA`
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

        l`>> Separate steps for: create TX, sign TX, send Tx`

        await File.removeAsync(SAFE_TX);

        l`> Create Tx`;
        await cli(`transfer 2 FRT`, {
            '--from': 'safe/test',
            '--to': owner2.address,
            '--tx-output': SAFE_TX
        });
    }
})
