import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { File } from 'atma-io';
import { AccountsService } from '@core/services/AccountsService';
import { $crypto } from '@dequanto/utils/$crypto';
import { $buffer } from '@dequanto/utils/$buffer';
import { $sig } from '@dequanto/utils/$sig';
import { spawnSync } from 'child_process';

interface AccountJson {
    name: string;
    address: string;
    type: 'eoa' | 'safe' | 'timelock' | 'zodiac';
    operator?: string;
    roleKey?: string;
}

const accounts: AccountJson[] = [
    { name: 'operator', address: '0x0000000000000000000000000000000000000001', type: 'eoa' },
    { name: 'treasury', address: '0x0000000000000000000000000000000000000002', type: 'safe', operator: 'operator' },
    { name: 'governance', address: '0x0000000000000000000000000000000000000003', type: 'timelock', operator: 'operator' },
];
const accountsPath = './test/bin/json-accounts/accounts.json';
const backupPath = './test/bin/json-accounts/backup.hex';
const sessionPath = AccountsService.getDefaultsDir({ isLocal: true });
let originalSession: string;
let created: AccountJson;
const testKey = '0x' + '0'.repeat(63) + '1';
const flags = `--config-accounts ${accountsPath} --pin json-accounts-test --local --json`;

UTest.create({
    $config: { timeout: 60_000 },

    async $before() {
        originalSession = await File.existsAsync(sessionPath)
            ? await File.readAsync<string>(sessionPath, { skipHooks: true })
            : null;
        for (let path of [accountsPath, backupPath]) {
            if (await File.existsAsync(path)) {
                await File.removeAsync(path);
            }
        }
    },

    async $after() {
        if (originalSession != null) {
            await File.writeAsync(sessionPath, originalSession, { skipHooks: true });
        } else if (await File.existsAsync(sessionPath)) {
            await File.removeAsync(sessionPath);
        }
    },

    async 'lists an empty account store as a JSON array'() {
        let result = await CliUtils.forkJson<AccountJson[]>(`accounts list ${flags}`);
        deepEq_(result, []);
    },

    async 'adds EOA, Safe, and timelock accounts as JSON'() {
        for (let [index, account] of accounts.entries()) {
            let operator = account.type === 'eoa' ? '' : '--operator operator';
            let result = await CliUtils.forkJson<AccountJson[]>(
                `accounts add --name ${account.name} --address ${account.address} --type ${account.type} ${operator} --login false ${flags}`
            );
            deepEq_(result, accounts.slice(0, index + 1));
        }
    },

    async 'lists all persisted account names, addresses, and types as JSON'() {
        let result = await CliUtils.forkJson<AccountJson[]>(`accounts list ${flags}`);
        deepEq_(result, accounts);
    },

    async 'creates an account without exposing its key and can log in'() {
        created = await CliUtils.forkJson<AccountJson>(`accounts new --name generated --login true ${flags}`);
        eq_(created.name, 'generated');
        eq_(created.type, 'eoa');
        eq_(/^0x[\da-f]{40}$/i.test(created.address), true);
        deepEq_(Object.keys(created).sort(), ['address', 'name', 'type']);

        let status = await CliUtils.forkJson(`auth status ${flags}`);
        eq_(status.account, 'generated');

        let selected = await CliUtils.forkJson(`accounts login treasury ${flags}`);
        deepEq_(selected, accounts[1]);

        let loggedIn = await CliUtils.forkJson(`auth status ${flags}`);
        eq_(loggedIn.account, 'treasury');
    },

    async 'adds a key-backed EOA and a Zodiac account with public metadata'() {
        let result = await CliUtils.forkJson<AccountJson[]>(`accounts add --name signer --key ${testKey} --login true ${flags}`);
        let signer = result.find(account => account.name === 'signer');
        deepEq_(signer, { name: 'signer', address: await $sig.$account.getAddressFromKey(testKey as any), type: 'eoa' });

        let status = await CliUtils.forkJson(`auth status ${flags}`);
        eq_(status.account, 'signer');

        let zodiac = await CliUtils.forkJson<AccountJson[]>(`accounts add --name roles --type zodiac --address 0x4 --operator operator --role-key 0x${'11'.repeat(32)} ${flags}`);
        deepEq_(zodiac.find(account => account.name === 'roles'), {
            name: 'roles', address: '0x' + '0'.repeat(39) + '4', type: 'zodiac',
            operator: 'operator', roleKey: '0x' + '11'.repeat(32),
        });
    },

    async 'backs up keys and contract metadata to an encrypted file'() {
        let result = await CliUtils.forkJson(`accounts backup ${backupPath} --secret backup-test-secret ${flags}`);
        deepEq_(result, { path: backupPath, count: 6 });

        let encrypted = await File.readAsync<string>(backupPath, { skipHooks: true });
        eq_(encrypted.includes(testKey.slice(2)), false);

        let plaintext = await $crypto.decrypt($buffer.fromHex(encrypted as any), { secret: 'backup-test-secret', encoding: 'utf8' });
        let backup = JSON.parse(plaintext);
        eq_(backup.version, 1);
        eq_(backup.accounts.length, 6);
        deepEq_(backup.accounts.slice(0, 3), accounts);
        eq_(backup.accounts.find(account => account.name === 'signer').key, testKey);
        eq_(backup.accounts.find(account => account.name === 'roles').roleKey, '0x' + '11'.repeat(32));
        eq_(backup.accounts.find(account => account.name === 'roles').operator, 'operator');

        let generated = backup.accounts.find(account => account.name === 'generated');
        let address = await $sig.$account.getAddressFromKey(generated.key);
        eq_(address, created.address);
    },

    async 'rejects invalid commands without stdout or changing the stored accounts'() {
        let before = await File.readAsync<string>(accountsPath, { skipHooks: true });
        let sessionBefore = await File.readAsync<string>(sessionPath, { skipHooks: true });
        let backupBefore = await File.readAsync<string>(backupPath, { skipHooks: true });
        let cases = [
            ['unknown'], ['login'], ['login', 'missing'], ['backup', '--secret', 'backup-test-secret'],
            ['backup', backupPath, '--secret', 'backup-test-secret'],
            ['add', '--name', 'operator', '--address', '0x5', '--login', 'true'],
            ['new', '--name', 'operator', '--login', 'true'], ['remove', '--name', 'missing'],
            ['add', '--name', 'invalid', '--address', 'xyz'],
            ['add', '--name', 'invalid', '--type', 'safe', '--key', testKey, '--operator', 'operator'],
            ['add', '--name', 'invalid', '--type', 'safe', '--address', '0x5'],
            ['add', '--name', 'invalid', '--type', 'safe', '--address', '0x5', '--operator', 'missing'],
            ['add', '--name', 'invalid', '--type', 'zodiac', '--address', '0x5', '--operator', 'operator'],
        ];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'accounts', ...args,
                '--config-accounts', accountsPath, '--pin', 'json-accounts-test', '--local', '--json'], {
                input: '', encoding: 'utf8', timeout: 10_000,
            });
            eq_(result.status, 1, result.stderr);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }

        let after = await File.readAsync<string>(accountsPath, { skipHooks: true });
        eq_(after, before);

        let sessionAfter = await File.readAsync<string>(sessionPath, { skipHooks: true });
        eq_(sessionAfter, sessionBefore);

        let backupAfter = await File.readAsync<string>(backupPath, { skipHooks: true });
        eq_(backupAfter, backupBefore);
    },

    async 'removes accounts and lists the empty store again'() {
        let remaining = await CliUtils.forkJson<AccountJson[]>(`accounts list ${flags}`);
        for (let account of [...remaining].reverse()) {
            remaining = remaining.filter(item => item.name !== account.name);

            let result = await CliUtils.forkJson<AccountJson[]>(`accounts remove --name ${account.name} ${flags}`);
            deepEq_(result, remaining);
        }

        let result = await CliUtils.forkJson<AccountJson[]>(`accounts list ${flags}`);
        deepEq_(result, []);
    },
});
