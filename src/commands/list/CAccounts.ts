import di from 'a-di';
import alot from 'alot';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { $address } from '@dequanto/utils/$address';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { $sig, KeyUtils } from '@dequanto/utils/$sig';
import { $require } from '@dequanto/utils/$require';
import { EoAccount } from '@dequanto/models/TAccount';
import { $hex } from '@dequanto/utils/$hex';
import { File } from 'atma-io';
import { $crypto } from '@dequanto/utils/$crypto';

export function CAccounts() {
    return <ICommand>{
        command: 'accounts',

        description: [
            'Manage accounts.'
        ],
        subcommands: [
            {
                command: 'add',
                description: [
                    'Add existing account'
                ],
                params: {
                    '-k, --key': {
                        description: 'Private key(plain or encrypted). Optional for READs, required for WRITE actions',
                    },
                    '-a, --address': {
                        description: 'Address. Optional, if key is also set',
                    },
                    '-n, --name': {
                        description: 'Name of the account',
                        required: true,
                    },
                    '--login': {
                        description: 'Save the account as the default one',
                        type: 'boolean',
                        default: false,
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let { key, address, name } = params;
                    if (key == null && address == null) {
                        throw new Error(`Provide key("-k 0xabcd") or address ("-a 0x1234")`)
                    }
                    if (key) {
                        let addr = await $sig.$account.getAddressFromKey(key);
                        if (address != null && $address.eq(addr, address) === false) {
                            throw new Error(`Provided key resolves to ${addr} address, but ${address} was provided.`);
                        }
                        address = addr;
                    }

                    const account = {
                        name,
                        address,
                        type: 'eoa'
                    } as EoAccount;

                    if (key) {
                        const secret = params.pin ?? app.config.$get('pin') as string;
                        $require.notEmpty(secret, `Secret not resolve`);
                        const encryptedKey = /^p\d:/.test(key)
                            ? key
                            : await $sig.$key.encrypt(key, secret);
                        // will store only encrypted key
                        account.key = encryptedKey;
                    }

                    if (params.login) {
                        await AccountsService.saveAsDefaults(account.name, params, app.config);
                    }

                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.add(account);
                    let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');

                    $console.log(`Accounts:`);
                    $console.result(str);
                }
            },
            {
                command: 'remove',
                description: [
                    'Remove account'
                ],
                params: {
                    '-n, --name': {
                        description: 'Name of the account to remove',
                        required: true,
                    },
                },
                async process(args: string[], params: any, app: App) {
                    let { name } = params;
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.remove(name);

                    let str = accounts.length > 0
                        ? accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n')
                        : `   No account added`;
                    $console.log(`Accounts:`);
                    $console.result(str);
                }
            },
            {
                command: 'list',
                description: [
                    'List account names'
                ],
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.list();
                    if (accounts.length === 0) {
                        console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                        return;
                    }
                    let str = accounts.map(x => ` - ${x.name} [${x.address}]`).join('\n');
                    $console.result(str);
                }
            },
            {
                command: 'new',
                description: [
                    'Create new account'
                ],
                params: {
                    '-n, --name': {
                        description: 'Name of the account to create',
                        required: true,
                    },
                    '--login': {
                        description: 'Save the account as the default one',
                        type: 'boolean',
                        default: false,
                    }
                },
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let account = await service.create(params.name);
                    if (account == null) {
                        return;
                    }
                    if (params.login) {
                        await AccountsService.saveAsDefaults(account.name, params, app.config);
                    }
                    $console.log(`yellow<You must backup the key bold<!!!>>`)
                    $console.table([
                        ['Name', account.name],
                        ['Address', account.address],
                        ['Key', account.key],
                    ]);
                }
            },
            {
                command: 'login',
                description: [
                    'Save the account as the default one'
                ],
                arguments: [
                    {
                        description: 'Name of the account to set as default'
                    }
                ],
                async process(args: string[], params, app: App) {
                    let [ name ] = args;
                    let service = di.resolve(AccountsService, app.config);
                    let account = await service.get(name);
                    $require.notNull(account, `${name} not found`)

                    await AccountsService.saveAsDefaults(account.name, params, app.config);
                    $console.table([
                        ['Name', account.name],
                        ['Address', account.address],
                    ]);
                }
            },
            {
                command: 'current',
                description: [
                    'Get current logged-in account'
                ],
                params: {

                },
                async process(args: string[], params, app: App) {
                    $require.notEmpty(params.account, `No default account is loaded`);
                    let service = di.resolve(AccountsService, app.config);
                    let account = await service.get(params.account);
                    $require.notNull(account, `${params.account} not found`)
                    $console.table([
                        ['Name', account.name],
                        ['Address', account.address],
                    ]);
                }
            },
            {
                command: 'backup',
                arguments: [
                    {
                        description: 'Json File to export'
                    }
                ],
                params: {
                    '-s, --secret': {
                        description: 'Strong password to encrypt the keys',
                        required: true,
                        validate (val) {
                            val = val.trim();
                            $require.gt(val.length, 6, `Min secret length is 6 characters`);
                        }
                    }
                },
                description: [
                    'Backup to file. Algo: sha256(secret) as the KEY for AES-GCM with additional IV (16bytes/prefixed)'
                ],
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.list();
                    if (accounts.length === 0) {
                        console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                        return;
                    }

                    let [ path ] = args;

                    let arr = await alot(accounts).mapAsync(async x => {
                        return new Promise(resolve => {
                            if (x.key == null) {
                                resolve([
                                    x.name,
                                    x.type,
                                    $hex.raw(x.address),
                                ]);
                                return;
                            }
                            KeyUtils.withKey(x as EoAccount, account => {
                                resolve([
                                    x.name,
                                    x.type,
                                    $hex.raw(x.address),
                                    $hex.raw(account.key)
                                ]);
                            })

                        });
                    }).toArrayAsync({ threads: 1 });

                    $require.True(await File.existsAsync(path) === false, `File ${path} already exists`);

                    let str = JSON.stringify(arr);
                    let encrypted = await $crypto.encrypt(str, {
                        secret:  params.secret
                    });
                    let hex = $hex.ensure(encrypted);

                    await File.writeAsync(path, hex, { skipHooks: true });
                }
            },
        ],
        params: {
            ...Parameters.pin(),
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    }
}
