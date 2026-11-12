import { UTest } from 'atma-utest';
import { AccountsService } from '@core/services/AccountsService';
import { TotpService } from '@core/services/TotpService';
import { App } from '@core/app/App';
import { Config } from '@dequanto/config/Config';
import { $crypto } from '@dequanto/utils/$crypto';
import { $machine } from '@dequanto/utils/$machine';
import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { $promise } from '@dequanto/utils/$promise';
import { File } from 'atma-io';

UTest.create({
    async 'reports local and global status without authentication or writes' () {
        let original = {
            exists: File.existsAsync, read: File.readAsync, write: File.writeAsync,
            id: $machine.id, validateTotp: TotpService.prototype.validateTotp,
            fetch: Config.fetch, parse: $cli.parse,
            log: $console.log, toast: $console.toast, app: (globalThis as any).app,
        };
        let contents = new Map<string, string>();
        let params: Record<string, string> = { local: 'local' };
        let messages: string[] = [];
        let machineSecret = 'status-test-machine';
        try {
            File.existsAsync = (async path => contents.has(path)) as any;
            File.readAsync = (async path => contents.get(path)) as any;
            File.writeAsync = (async () => { throw new Error('Status must not write'); }) as any;
            $machine.id = async () => machineSecret;
            TotpService.prototype.validateTotp = async () => { throw new Error('Status must not authenticate'); };
            Config.fetch = (async () => ({})) as any;
            $cli.parse = () => ({ args: ['auth', '2fa', 'status'], params });
            $console.log = message => { messages.push(message); };
            $console.toast = (() => {}) as any;

            let status = await AccountsService.status2FA(params);
            deepEq_(status, { enabled: false, account: '' });
            let localPath = AccountsService.getDefaultsDir({ isLocal: true });
            let globalPath = AccountsService.getDefaultsDir({ isLocal: false });
            let session = { 'session-account': 'alice', pin: 'private-pin', totp: { seed: '0x010203', index: 1 } };
            let encrypted = await $crypto.encrypt(JSON.stringify(session), { secret: machineSecret, encoding: 'hex' });
            contents.set(localPath, encrypted);
            let app = new App();
            let result = await app.execute();
            deepEq_(result, { enabled: true, account: 'alice' });
            let message = messages.pop();
            eq_(message, '2FA is enabled');
            let storedSession = contents.get(localPath);
            eq_(storedSession, encrypted);

            params = { global: 'global' };
            result = await app.execute();
            deepEq_(result, { enabled: false, account: '' });
            message = messages.pop();
            eq_(message, '2FA is disabled');
            let disabled = await $crypto.encrypt('{"pin":"private-pin"}', { secret: machineSecret, encoding: 'hex' });
            contents.set(globalPath, disabled);
            status = await AccountsService.status2FA(params);
            deepEq_(status, { enabled: false, account: '' });
            contents.set(globalPath, encrypted);
            status = await AccountsService.status2FA(params);
            deepEq_(status, { enabled: true, account: 'alice' });
            contents.set(globalPath, 'invalid ciphertext');
            let { error } = await $promise.caught(AccountsService.status2FA(params));
            notEq_(error, null);
        } finally {
            File.existsAsync = original.exists;
            File.readAsync = original.read;
            File.writeAsync = original.write;
            $machine.id = original.id;
            TotpService.prototype.validateTotp = original.validateTotp;
            Config.fetch = original.fetch;
            $cli.parse = original.parse;
            $console.log = original.log;
            $console.toast = original.toast;
            (globalThis as any).app = original.app;
        }
    },
});
