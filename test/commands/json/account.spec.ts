import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { File } from 'atma-io';
import { AccountsService } from '@core/services/AccountsService';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $sig } from '@dequanto/utils/$sig';
import { spawnSync } from 'child_process';

const accountsPath = './test/bin/json-account/accounts.json';
const sessionPath = AccountsService.getDefaultsDir({ isLocal: true });
const key = '0x' + '0'.repeat(63) + '1';
const flags = `--config-accounts ${accountsPath} --pin json-account-test --local`;
let address: string;

UTest.create({
    $config: { timeout: 60_000 },

    async $before() {
        await File.removeAsync(sessionPath);
        await File.removeAsync(accountsPath);

        await TestNode.start();
        address = await $sig.$account.getAddressFromKey(key as any);
        await CliUtils.forkJson(`accounts add --name signer --key ${key} --login true ${flags} --json`);
    },

    async 'view and current return account metadata without private keys'() {
        let commands = ['account view signer', 'account current'];
        for (let command of commands) {
            let result = await CliUtils.forkJson(`${command} ${flags} --json`);
            deepEq_(result, { name: 'signer', address });
        }
    },

    async 'view includes an encrypted key only when requested'() {
        let result = await CliUtils.forkJson(`account view signer --encrypted-key ${flags} --json`);
        eq_(result.name, 'signer');
        eq_(result.address, address);
        eq_(/^p1:0x[\da-f]+$/i.test(result.encryptedKey), true);
        notEq_(result.encryptedKey, key);
        deepEq_(Object.keys(result).sort(), ['address', 'encryptedKey', 'name']);
    },

    async 'balance returns exact base units for named accounts and addresses'() {
        let chain = new HardhatProvider().client('localhost');
        let block = await chain.getBlock('latest');
        let expected = await chain.getBalance(address as any, block.number);
        let accounts = ['signer', address];
        for (let account of accounts) {
            let result = await CliUtils.forkJson(`account balance ${account} ETH --chain hardhat --block ${block.number} ${flags} --json`);
            eq_(result.address, address);
            eq_(result.balance, expected.toString());
            eq_(typeof result.balance, 'string');
            eq_(result.token.symbol, 'ETH');
            eq_(result.token.decimals, 18);
        }
    },

    async 'rename returns the persisted name and address'() {
        let result = await CliUtils.forkJson(`account rename signer renamed ${flags} --json`);
        deepEq_(result, { name: 'renamed', address });
        let viewed = await CliUtils.forkJson(`account view renamed ${flags} --json`);
        deepEq_(viewed, result);
        let accounts = await CliUtils.forkJson(`accounts list ${flags} --json`);
        deepEq_(accounts.map(account => account.name), ['renamed']);
    },

    async 'formatted output remains available without json'() {
        let output = await CliUtils.fork(`account view renamed ${flags}`);
        has_(output, 'renamed');
        has_(output, address);
        hasNot_(output, key);
    },

    'invalid account commands fail without JSON on stdout'() {
        let cases = [['unknown'], ['view', 'missing'], ['rename', 'missing', 'other']];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'account', ...args,
                '--config-accounts', accountsPath, '--pin', 'json-account-test', '--local', '--json'], {
                input: '', encoding: 'utf8', timeout: 10_000,
            });
            eq_(result.status, 1);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }
    },
});
