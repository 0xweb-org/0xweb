import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { SafeAccount } from '@dequanto/models/TAccount';
import { $address } from '@dequanto/utils/$address';
import { GnosisSafeFactory } from '@dequanto/safe/GnosisSafeFactory';
import { $require } from '@dequanto/utils/$require';
import { CAccounts } from './CAccounts';
import { File } from 'atma-io';
import { HardhatWeb3Client } from '@dequanto/clients/HardhatWeb3Client';

export const CSafe = <ICommand>{
    command: 'safe',

    description: [
        'Multi-sig account tools.'
    ],
    subcommands: [

        {
            command: 'add',
            description: [
                'Add existing safe. '
            ],
            params: {
                '-o, --owner': {
                    description: 'Owners address or name. The EOA should be already present.',
                    required: true,
                },
                '-a, --address': {
                    description: 'Safe address',
                    required: true
                },
                '-n, --name': {
                    description: 'Name of the account',
                    required: true,
                }
            },
            async process (args: string[], params: { owner, address, name, chain }, app: App) {
                let { owner, address, name, chain } = params;
                let service = di.resolve(AccountsService, app.config);
                let accounts = await service.add(<SafeAccount> {
                    type: 'safe',
                    name,
                    address,
                    operator:  $address.isValid(owner) ? {
                        address: owner
                    } : {
                        name: owner
                    },
                    platform: chain
                });

                let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');

                $console.log(`Accounts:`);
                $console.log(str);
            }
        },

        CAccounts.subcommands.find(x => x.command === 'remove'),

        {
            command: 'list',
            description: [
                'List account names'
            ],
            async process (args: string[], params, app: App) {
                let service = di.resolve(AccountsService, app.config);
                let accounts = await service.list();

                accounts = accounts.filter(x => x.type === 'safe')
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
                'Deploy new safe'
            ],
            params: {
                '-n, --name': {
                    description: 'Name of the account to create.',
                    required: true,
                },
                '-o, --owner': {
                    description: 'Address or name of the owner. It should be already present.',
                    required: true,
                },
                '-m, --members': {
                    description: 'Additional owners. Comma-seperated addresses.',
                },
                '--contracts': {
                    description: 'Optionally, JSON serialized file with multiSend, masterCopy and proxyFactory contracts'
                }
            },
            async process (args: string[], params: { name, owner, chain, members, contracts }, app: App) {

                let contracts = null;
                if (params.contracts) {
                    contracts = await File.readAsync<any>(params.contracts);
                }

                let account = await app.chain.accounts.get(params.owner, params.chain);
                $require.notNull(account, `Account ${params.owner} not found`);

                let owners = [
                    account.address,
                    ...(params.members?.split(',').map(x => x.trim()) ?? [])
                ];

                owners.forEach(owner => {
                    $require.Address(owner);
                });


                app.chain.client = new HardhatWeb3Client({
                    chainId: 1337,
                    endpoints: [
                        { url: 'http://127.0.0.1:8545' }
                    ]
                });

                let gnosisSafe = await GnosisSafeFactory.create(account, app.chain.client, {
                    owners,
                    contracts: {
                        [app.chain.client.chainId]: contracts,
                        [31337]: contracts
                    },
                });
                $console.log(`bold<Created green<${gnosisSafe.safeAddress}>>`);


                let addCommand = CSafe.subcommands.find(x => x.command === 'add');
                await addCommand.process(args, {
                    owner: params.owner,
                    address: gnosisSafe.safeAddress,
                    name: params.name,
                    chain: params.chain,
                }, app);
            }
        }
    ],
    params: {
        '-p, --pin': {
            description: 'Account configuration is encrypted with a derived key from the pin and local machine key. ',
            required: true
        },
        '-c, --chain': {
            description: `Available: ${$validate.platforms.join(', ')}`,
            required: true,
            oneOf: $validate.platforms
        }
    },

    async process(args: string[], params, app: App) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
    }
}

