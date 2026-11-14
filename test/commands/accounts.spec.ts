import { UTest } from 'atma-utest';
import { CAccounts } from '@core/commands/list/CAccounts';
import { AccountsService } from '@core/services/AccountsService';
import { KeyUtils } from '@dequanto/utils/$sig';
import { $promise } from '@dequanto/utils/$promise';
import { $console } from '@core/utils/$console';
import { File } from 'atma-io';

UTest.create({
    async 'does not log in when saving an account fails'() {
        let original = AccountsService.saveLogin;
        let loginCalls = 0;
        AccountsService.saveLogin = async () => { loginCalls++; };
        let config = { $sources: { array: [{ data: { name: 'accounts' }, config: { accounts: [] },
            async write() { throw new Error('Storage unavailable'); },
        }] } };

        try {
            let command = CAccounts().subcommands.find(x => x.command === 'add');
            let { error } = await $promise.caught(command.process([], {
                name: 'operator', address: '0x1', type: 'eoa', login: true,
            }, { config } as any));
            has_(error.message, 'Storage unavailable');
            eq_(loginCalls, 0);
        } finally {
            AccountsService.saveLogin = original;
        }
    },

    async 'propagates backup decryption failures without writing a file'() {
        let original = { withKey: KeyUtils.withKey, exists: File.existsAsync, write: File.writeAsync };
        let writes = 0;
        KeyUtils.withKey = async () => { throw new Error('Invalid encrypted key'); };
        File.existsAsync = async () => false;
        File.writeAsync = (async () => { writes++; }) as any;
        let config = { $sources: { array: [{ data: { name: 'accounts' }, config: { accounts: [
            { name: 'operator', address: '0x1', type: 'eoa', key: 'p1:invalid' },
        ] } }] } };

        try {
            let command = CAccounts().subcommands.find(x => x.command === 'backup');
            let { error } = await $promise.caught(command.process(['./test/bin/unused-backup.hex'], {
                secret: 'test-secret',
            }, { config } as any));
            has_(error.message, 'Invalid encrypted key');
            eq_(writes, 0);
        } finally {
            KeyUtils.withKey = original.withKey;
            File.existsAsync = original.exists;
            File.writeAsync = original.write;
        }
    },

    async 'treats a missing account type as EOA without exposing key data'() {
        let original = $console.result;
        let output: string;
        $console.result = value => { output = value; };
        let config = { $sources: { array: [{ data: { name: 'accounts' }, config: { accounts: [
            { name: 'legacy', address: '0x1', key: 'private-key' },
        ] } }] } };

        try {
            let command = CAccounts().subcommands.find(x => x.command === 'list');
            let result = await command.process([], {}, { config } as any);
            deepEq_(result, [{ name: 'legacy', address: '0x1', type: 'eoa' }]);
            eq_(output.includes('undefined'), false);
            eq_(output.includes('Operator:'), false);
            eq_(output.includes('private-key'), false);
        } finally {
            $console.result = original;
        }
    },
});
