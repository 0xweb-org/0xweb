import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { $require } from '@dequanto/utils/$require';
import { TotpService } from '@core/services/TotpService';
import { $cli } from '@core/utils/$cli';
import { $cb } from '@core/utils/$cb';
import { TEth } from '@dequanto/models/TEth';


export function CAuth() {
    return <ICommand>{
        command: 'auth',

        description: [
            'Manage authenticated account'
        ],
        subcommands: [
            {
                command: '2fa',
                description: [
                    'Manage 2fa'
                ],
                subcommands: [
                    {
                        command: 'status',
                        description: ['Show whether two-factor authentication is enabled'],
                        async process(args: string[], params) {
                            let status = await AccountsService.status2FA(params);
                            $console.log(status.enabled ? '2FA is enabled' : '2FA is disabled');
                            return status;
                        }
                    },
                    {
                        command: 'disable',
                        description: ['Disable 2FA using a code from the existing authenticator'],
                        params: {
                            '--totp, --2fa': { description: 'Code from the existing authenticator' },
                        },
                        async process(args: string[], params) {
                            await AccountsService.disable2FA(params);
                            $console.log('2FA disabled');
                            return { success: true };
                        }
                    },
                    {
                        command: 'setup',
                        description: [
                            'Set up an authenticator app for two-factor authentication'
                        ],
                        params: {
                            ...Parameters.pin(),
                            '--seed': { description: 'Hex-encoded TOTP seed to save without QR generation or confirmation', type: 'string' },
                            '--totp, --2fa': { description: 'Code from the existing authenticator when replacing 2FA' },
                        },
                        async process(args: string[], params, app: App) {
                            let providedSeed = params.seed;
                            if (providedSeed != null) {
                                await AccountsService.save2FA(providedSeed as TEth.Hex, params);
                                $console.log('2FA enabled');
                                return { success: true };;
                            }
                            let totp = di.resolve(TotpService);
                            let seed = await totp.generateSeed();
                            let link = await totp.createTotpLink(seed);
                            let qrcode = require('qrcode-terminal');
                            let output = await $cb.single(
                                qrcode,
                                qrcode.generate,
                                link,
                                { small: true }
                            );
                            process.stderr.write('\nScan this QR code with your authenticator app:\n');
                            process.stderr.write(output + '\n');

                            let maxAttempts = 3;
                            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                                let code = await $cli.ask('Enter the 6-digit code from the new authenticator to confirm setup: ', 'string');
                                let result = await totp.validateTotp(seed, code.trim());
                                if (result.valid === false) {
                                    if (attempt < maxAttempts) {
                                        $console.error(`Invalid code. Attempts remaining: ${maxAttempts - attempt}.`);
                                    }
                                    continue;
                                }

                                // Keep --totp for authorization against the existing seed.
                                await AccountsService.save2FA(seed, params);
                                $console.log('2FA enabled');
                                return { success: true };;
                            }
                            throw new Error('Too many invalid codes. Run setup again to retry.');
                        }
                    }
                ]
            },
            {
                command: 'status',
                description: [
                    'Returns account and 2fa status'
                ],
                arguments: [],
                async process(args: string[], params, app: App) {
                    let status = await AccountsService.status2FA(params);
                    $console.log(status.enabled ? '2FA is enabled' : '2FA is disabled');
                    $console.log(status.account ? `Account: ${status.account}` : 'No default account');
                    return {
                        '2fa': status.enabled,
                        'account': status.account
                    };
                }
            },
            {
                command: 'login',
                description: [
                    'Set the account as the default'
                ],
                arguments: [
                    {
                        description: 'Name of the account to set as default'
                    }
                ],
                async process(args: string[], params, app: App) {
                    let [name] = args;
                    let service = di.resolve(AccountsService, app.config, params);
                    let account = await service.get(name);
                    $require.notNull(account, `${name} not found`)

                    await AccountsService.saveLogin($require.notNull(account.name, `Account name is missing`), params);
                    $console.table([
                        ['Name', account.name ?? ''],
                        ['Address', account.address ?? ''],
                    ]);
                    return {
                        name: account.name,
                        address: account.address,
                    }
                }
            }
        ],


        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    }
}
