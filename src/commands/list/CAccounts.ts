import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { $address } from '@dequanto/utils/$address';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { $sig } from '@dequanto/utils/$sig';
import { $require } from '@dequanto/utils/$require';

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

                    const secret = params.pin ?? app.config.$get('pin') as string;
                    $require.notEmpty(secret, `Secret not resolve`);
                    const encryptedKey = /^p\d:/.test(key)
                        ? key
                        : await $sig.$key.encrypt(key, secret);

                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.add({
                        key: encryptedKey as any,
                        address,
                        name
                    });

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
                },
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let account = await service.create(params.name);
                    if (account == null) {
                        return;
                    }
                    $console.log(`yellow<You must backup the key bold<!!!>>`)
                    $console.table([
                        ['Name', account.name],
                        ['Address', account.address],
                        ['Key', account.key],
                    ]);
                }
            }
        ],
        params: {
            ...Parameters.pin(),
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    }
}
