import { UTest } from 'atma-utest';
import { CAuth } from '@core/commands/list/CAuth';
import { AccountsService } from '@core/services/AccountsService';
import { TotpService } from '@core/services/TotpService';
import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { TEth } from '@dequanto/models/TEth';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'confirms setup before saving and propagates authorization failures' () {
        let qrcode = require('qrcode-terminal');
        let original = {
            seed: TotpService.prototype.generateSeed,
            ask: $cli.ask, save: AccountsService.save2FA,
            qr: qrcode.generate, write: process.stderr.write,
            log: $console.log, error: $console.error,
        };
        let seed: TEth.Hex = '0x3132333435363738393031323334353637383930';
        let params = { totp: 'old-authenticator-code' };
        let prompts = 0;
        let saved = 0;
        let messages: string[] = [];
        let errors: string[] = [];
        let rendered: string;
        let confirmedCode: string;
        try {
            TotpService.prototype.generateSeed = async () => seed;
            qrcode.generate = (link, opts, callback) => { rendered = link; callback('[QR]'); };
            process.stderr.write = (() => true) as any;
            $console.log = (message) => { messages.push(message); };
            $console.error = (message) => { errors.push(message); };
            $cli.ask = (async () => {
                prompts++;
                if (prompts > 3) {
                    throw new Error('Setup did not terminate');
                }
                if (prompts === 1) {
                    return 'invalid';
                }
                confirmedCode = (await new TotpService().generateTotpCode(seed)).code;
                return ` ${confirmedCode} `;
            }) as typeof $cli.ask;
            AccountsService.save2FA = async (savedSeed, savedParams) => {
                eq_(prompts, 2);
                eq_(savedSeed, seed);
                eq_(savedParams, params);
                eq_(savedParams.totp, 'old-authenticator-code');
                saved++;
            };
            let setup = CAuth().subcommands.find(x => x.command === '2fa').subcommands.find(x => x.command === 'setup');
            await setup.process([], params);
            eq_(prompts, 2);
            eq_(saved, 1);
            eq_(errors.length, 1);
            eq_(messages.join(''), '2FA enabled');
            eq_(rendered.startsWith('otpauth://totp/'), true);
            eq_(messages.join('').includes(confirmedCode), false);

            messages.length = 0;
            let failure = new Error('Invalid existing 2FA code');
            AccountsService.save2FA = async () => { throw failure; };
            let caught: Error;
            try {
                await setup.process([], params);
            } catch (error) {
                caught = error as Error;
            }
            eq_(caught, failure);
            eq_(messages.length, 0);

            prompts = 0;
            saved = 0;
            errors.length = 0;
            $cli.ask = (async () => {
                prompts++;
                if (prompts > 3) {
                    throw new Error('Setup exceeded the attempt limit');
                }
                return 'invalid';
            }) as typeof $cli.ask;
            AccountsService.save2FA = async () => { saved++; };
            caught = undefined;
            try {
                await setup.process([], params);
            } catch (error) {
                caught = error as Error;
            }
            eq_(caught?.message, 'Too many invalid codes. Run setup again to retry.');
            eq_(prompts, 3);
            eq_(saved, 0);
            eq_(messages.length, 0);
            eq_(errors.join('\n'), 'Invalid code. Attempts remaining: 2.\nInvalid code. Attempts remaining: 1.');

            prompts = 0;
            $cli.ask = (async () => {
                prompts++;
                return prompts < 3 ? 'invalid' : (await new TotpService().generateTotpCode(seed)).code;
            }) as typeof $cli.ask;
            await setup.process([], params);
            eq_(prompts, 3);
            eq_(saved, 1);
            eq_(messages.join(''), '2FA enabled');
            messages.length = 0;
            let directParams = { ...params, seed };
            TotpService.prototype.generateSeed = async () => { throw new Error('Unexpected seed generation'); };
            qrcode.generate = () => { throw new Error('Unexpected QR generation'); };
            $cli.ask = async () => { throw new Error('Unexpected confirmation prompt'); };
            AccountsService.save2FA = async (savedSeed, savedParams) => {
                eq_(savedSeed, seed);
                eq_(savedParams, directParams);
                saved++;
            };
            await setup.process([], directParams);
            eq_(saved, 2);
            eq_(messages.join(''), '2FA enabled');

            messages.length = 0;
            AccountsService.save2FA = async () => { throw failure; };
            let { error } = await $promise.caught(setup.process([], directParams));
            eq_(error, failure);
            eq_(messages.length, 0);
        } finally {
            TotpService.prototype.generateSeed = original.seed;
            $cli.ask = original.ask;
            AccountsService.save2FA = original.save;
            qrcode.generate = original.qr;
            process.stderr.write = original.write;
            $console.log = original.log;
            $console.error = original.error;
        }
    },
});
