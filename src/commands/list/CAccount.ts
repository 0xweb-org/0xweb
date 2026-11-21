import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { App } from '@core/app/App';
import { $bigint } from '@dequanto/utils/$bigint';
import { $console } from '@core/utils/$console';
import { TAddress } from '@dequanto/models/TAddress';
import { $address } from '@dequanto/utils/$address';
import { $require } from '@dequanto/utils/$require';
import { Parameters } from '@core/utils/Parameters';
import { $sig } from '@dequanto/utils/$sig';

export function CAccount ()  {
    return <ICommand>{
        command: 'account',

        description: [
            'View and manage an account'
        ],
        subcommands: [
            {
                command: 'balance',
                example: '0xweb account balance <accountName> <tokenSymbol> -p <pin>',
                description: [
                    'Get the account balance for ETH or an ERC-20 token'
                ],
                arguments: [
                    {
                        name: 'accountName',
                        description: 'Account name saved with the "accounts" command',
                        required: true,
                    },
                    {
                        name: 'tokenSymbol',
                        description: 'Token symbol or address',
                        required: true,
                    }
                ],
                params: {
                    '--json': {
                        description: 'Print the account address, token metadata, and balance in base units as a decimal string to stdout',
                    },
                    '-b, --block': {
                        description: 'Block number to query. Default: latest',
                        map: Number
                    }
                },
                async process (args: string[], params: any, app: App) {
                    let [ accountName, tokenName ] = args;

                    let address: TAddress;
                    if ($address.isValid(accountName)) {
                        address = accountName;
                    } else {
                        let accounts = di.resolve(AccountsService, app.config, params);
                        let account = await accounts.get(accountName);
                        address = $require.notNull(account?.address, `Account ${accountName} has no address`);
                    }
                    $require.Address(address);

                    $console.toast(`Loading token ${tokenName}`);
                    let chain = $require.notNull(app.chain, `Chain not initialized`);
                    let token = await chain.tokens.getToken(tokenName, true);
                    if (token == null) {
                        throw new Error(`Unknown token: ${tokenName} for ${chain.client.platform}`);
                    }

                    let decimals = $require.notNull(token.decimals, `Decimals not resolved for token ${tokenName}`);

                    $console.toast(`Loading balance for ${address}`);
                    let balance = await chain.token.balanceOf(address, token, { forBlock: params.block });
                    let eth = $bigint.toEther(balance, decimals);

                    $console.table([
                        ['Symbol', tokenName],
                        ['Address', token.address],
                        ['Decimals', decimals.toString()],
                        ['Balance', `green<${eth}>`]
                    ]);
                    return {
                        address,
                        token: { symbol: token.symbol, address: token.address, decimals },
                        balance: balance.toString(),
                    };
                }
            },
            {
                command: 'view',
                description: [
                    'View account details'
                ],
                arguments: [
                    {
                        name: 'accountName',
                        description: 'Account name saved with the "accounts" command',
                        required: true,
                    },
                ],
                params: {
                    '--json': {
                        description: 'Print account details as JSON to stdout. Includes an encrypted key only with --encrypted-key',
                    },
                    '--encrypted-key': {
                        description: 'Also show the private key encrypted with the PIN',
                        type: 'boolean',
                    }
                },
                async process (args: string[], params: { encryptedKey?: boolean, pin: string }, app: App) {
                    let [ accountName ] = args;

                    let accounts = di.resolve(AccountsService, app.config, params);
                    let account = await accounts.get(accountName);
                    $require.notNull(account, `Account ${accountName} not found`);
                    let result: { name: string; address: TAddress; encryptedKey?: string } = {
                        name: account.name ?? accountName,
                        address: account.address,
                    };
                    let tableData = [
                        ['Account', accountName],
                        ['Address', account.address ?? ''],
                    ];

                    if (params.encryptedKey) {
                        let key = (account as any).key;
                        if (key) {
                            if (/p1:/.test(key) === false) {
                                const encrypted = await $sig.$key.encrypt(key, params.pin);
                                key = encrypted;
                            }
                            tableData.push(['Key', key]);
                            result.encryptedKey = key;
                        }
                    }
                    $console.table(tableData);
                    return result;
                }
            },
            {
                command: 'current',
                description: [
                    'Show the current account'
                ],
                params: {
                    '--json': {
                        description: 'Print the current account name and address as JSON to stdout',
                    },
                    ...Parameters.account({ required: true })
                },
                async process(args: string[], params, app: App) {
                    $require.notEmpty(params.account, `No default account is loaded`);
                    let service = di.resolve(AccountsService, app.config, params);
                    let account = await service.get(params.account);
                    $require.notNull(account, `${params.account} not found`)
                    $console.table([
                        ['Name', account.name ?? ''],
                        ['Address', account.address ?? ''],
                    ]);
                    return { name: account.name, address: account.address };
                }
            },
            {
                command: 'rename',
                description: [
                    'Rename an account'
                ],
                params: {
                    '--json': {
                        description: 'Print the renamed account name and address as JSON to stdout',
                    },
                },
                arguments: [
                    {
                        name: 'oldAccountName',
                        description: 'Account name saved with the "accounts" command',
                        required: true,
                    },
                    {
                        name: 'newAccountName',
                        description: 'New account name',
                        required: true,
                    }
                ],
                async process(args: string[], params, app: App) {
                    let [oldName, newName ] = args;
                    $require.notEmpty(oldName, `No default account is loaded`);
                    let service = di.resolve(AccountsService, app.config, params);
                    let account = await service.get(oldName);
                    $require.notNull(account, `${oldName} not found`);

                    await service.remove(oldName);
                    await service.add({
                        ...account,
                        name: newName,
                    });
                    $console.log(`Renamed account from "${oldName}" to "${newName}"`);
                    return { name: newName, address: account.address };
                }
            },
        ],
        params: {
            ...Parameters.pin(),
            ...Parameters.chain({ required: false }),
        },

        async process(args: string[], params, app: App) {
            throw new Error(`Unknown account subcommand: ${args[0] ?? '(missing)'}. Call "0xweb account --help" to view the list of commands`);
        }
    };
};

