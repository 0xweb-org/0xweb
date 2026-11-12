import { UTest } from 'atma-utest';
import { AccountsService } from '@core/services/AccountsService';
import { TotpService } from '@core/services/TotpService';
import { $crypto } from '@dequanto/utils/$crypto';
import { $buffer } from '@dequanto/utils/$buffer';
import { $machine } from '@dequanto/utils/$machine';
import { $promise } from '@dequanto/utils/$promise';
import { File } from 'atma-io';

UTest.create({
    async 'requires the existing authenticator for replacement and removal'() {
        let originals = { read: File.readAsync, write: File.writeAsync, exists: File.existsAsync, id: $machine.id, now: Date.now };
        let encrypted: string;
        let writes = 0;
        let machineSecret = 'test-machine-secret';
        let oldSeed = $buffer.toHex(new Uint8Array(20).fill(1));
        let newSeed = $buffer.toHex(new Uint8Array(20).fill(2));
        let params = { local: 'local' };
        let totp = new TotpService();
        try {
            Date.now = () => 1_234_567_890_000;
            $machine.id = async () => machineSecret;
            File.existsAsync = (async () => encrypted != null) as any;
            File.readAsync = (async () => encrypted) as any;
            File.writeAsync = (async (path, data) => { encrypted = data; writes++; }) as any;
            let oldCode = await totp.generateTotpCode(oldSeed);
            let newCode = await totp.generateTotpCode(newSeed);
            eq_(oldCode.code === newCode.code, false);
            let initial = { 'session-account': 'alice', pin: 'cached-pin', totp: { seed: oldSeed, index: oldCode.totpWindowIndex } };
            let read = async () => JSON.parse(await $crypto.decrypt($buffer.fromHex(encrypted), { secret: machineSecret, encoding: 'utf8' }));
            let reject = async (action: () => Promise<unknown>) => {
                let before = encrypted;
                let beforeWrites = writes;
                let { error } = await $promise.caught(action());
                notEq_(error, null);
                eq_(encrypted, before);
                eq_(writes, beforeWrites);
            };
            await AccountsService.saveSession(initial, params);
            let invalidCredentials = [
                {},
                { pin: 'provided-pin' },
                { totp: '000000' },
                { totp: newCode.code },
            ];
            for (let credentials of invalidCredentials) {
                await reject(() => AccountsService.save2FA(newSeed, { ...params, ...credentials }));
                await reject(() => AccountsService.disable2FA({ ...params, ...credentials }));
            }
            await AccountsService.save2FA(oldSeed, { ...params, totp: oldCode.code });
            let preserved = await read();
            eq_(preserved.pin, initial.pin);
            await AccountsService.save2FA(newSeed, { ...params, pin: 'provided-pin', totp: oldCode.code });
            let replaced = await read();
            eq_(replaced.totp.seed, newSeed);
            eq_(replaced.pin, 'provided-pin');
            eq_(replaced['session-account'], 'alice');
            await reject(() => AccountsService.disable2FA({ ...params, totp: oldCode.code }));
            await AccountsService.disable2FA({ ...params, '2fa': newCode.code });
            let disabled = await read();
            eq_(disabled.totp, undefined);
            eq_(disabled.pin, undefined);
            eq_(disabled['session-account'], 'alice');
            await AccountsService.save2FA(oldSeed, params);
            eq_((await read()).totp.seed, oldSeed);
            encrypted = undefined;
            await AccountsService.save2FA(newSeed, params);
            eq_((await read()).totp.seed, newSeed);
        } finally {
            File.readAsync = originals.read;
            File.writeAsync = originals.write;
            File.existsAsync = originals.exists;
            $machine.id = originals.id;
            Date.now = originals.now;
        }
    },
});
