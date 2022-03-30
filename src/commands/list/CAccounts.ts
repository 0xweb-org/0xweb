import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { ChainAccountProvider } from '@dequanto/ChainAccounts';
import { $address } from '@dequanto/utils/$address';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';

export const CAccounts = <ICommand>{
    command: 'accounts',

    description: [
        'Manage accounts.'
    ],
    subcommands: [
        {
            command: 'add',
            description: [
                'Add account'
            ],
            params: {
                '-k, --key': {
                    description: 'Private key. Optional, only if READ actions will be used.',
                },
                '-a, --address': {
                    description: 'Address. Optional, if key is also set',
                },
                '-n, --name': {
                    description: 'Name of the account',
                    required: true,
                },
            },
            async process (args: string[], params: any, app: App) {
                let { key, address, name } = params;
                if (key == null && address == null) {
                    throw new Error(`Provide key("-k 0xabcd") or address ("-a 0x1234")`)
                }
                if (key) {
                    let addr = ChainAccountProvider.getAddressFromKey(key);
                    if (address != null && $address.eq(addr, address)) {
                        throw new Error(`Provided key resolves to ${addr} address, but ${address} was provided.`);
                    }
                    address = addr;
                }

                let service = di.resolve(AccountsService, app.config);
                let accounts = await service.add({ key, address, name });

                let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');

                $console.log(`Accounts:`);
                $console.log(str);
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
            async process (args: string[], params: any, app: App) {
                let { name } = params;
                let service = di.resolve(AccountsService, app.config);
                let accounts = await service.remove(name);

                let str = accounts.length > 0
                    ? accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n')
                    : `   No account added`;
                $console.log(`Accounts:`);
                $console.log(str);
                $console.log('');
            }
        },
        {
            command: 'list',
            description: [
                'List account names'
            ],
            async process (args: string[], params, app: App) {
                let service = di.resolve(AccountsService, app.config);
                let accounts = await service.list();
                if (accounts.length === 0) {
                    console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                    return;
                }
                let str = accounts.map(x => ` - ${x.name} [${x.address}]`).join('\n');
                $console.log(str);
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
            async process (args: string[], params, app: App) {
                let service = di.resolve(AccountsService, app.config);
                let account = await service.create(params.name);
                if (account == null) {
                    return;
                }
                $console.log(`yellow<You must backup the key bold<!!!>>`)
                $console.table([
                    [ 'Name', account.name ],
                    [ 'Address', account.address ],
                    [ 'Key', account.key ],
                ]);
            }
        }
    ],
    params: {
        '-p, --pin': {
            description: 'Account configuration is encrypted with a derived key from the pin and local machine key. ',
            required: true
        }
    },

    async process(args: string[], params, app: App) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
    }
}
