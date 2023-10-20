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
import { ChainAccount, IAccount } from '@dequanto/models/TAccount';
import { $buffer } from '@dequanto/utils/$buffer';
import { $crypto } from '@dequanto/utils/$crypto';
import { $sig } from '@dequanto/utils/$sig';

export function CAccount ()  {
    return <ICommand>{
        command: 'account',

        description: [
            'Account tools.'
        ],
        subcommands: [
            {
                command: 'balance',
                //example: '0xweb account balance <accountName> <tokenSymbol> -p <pin>',
                description: [
                    'Get account balance for ETH or any ERC20 token'
                ],
                arguments: [
                    {
                        name: '<accountName>',
                        description: 'Account name added with "accounts" command',
                        required: true,
                    },
                    {
                        name: '<tokenSymbol>',
                        description: 'Token Symbol or Address',
                        required: true,
                    }
                ],
                params: {
                    '-b, --block': {
                        description: 'Balance at specific block. Default: latest',
                        map: Number
                    }
                },
                async process (args: string[], params: any, app: App) {
                    let [ accountName, tokenName ] = args;

                    let address: TAddress;
                    if ($address.isValid(accountName)) {
                        address = accountName;
                    } else {
                        let accounts = di.resolve(AccountsService, app.config);
                        let account = await accounts.get(accountName);
                        address = account?.address;
                    }
                    $require.Address(address);


                    $console.toast(`Loading token ${tokenName}`);
                    let token = await app.chain.tokens.getToken(tokenName, true);
                    if (token == null) {
                        throw new Error(`Unknown token: ${tokenName} for ${app.chain.client.platform}`);
                    }

                    $console.toast(`Loading balance for ${address}`);
                    let balance = await app.chain.token.balanceOf(address, token, { forBlock: params.block });
                    let eth = $bigint.toEther(balance, token.decimals);

                    $console.table([
                        ['Symbol', tokenName],
                        ['Address', token.address],
                        ['Decimals', token.decimals.toString()],
                        ['Balance', `green<${eth}>`]
                    ]);
                }
            },
            {
                command: 'view',
                description: [
                    'View accounts details. '
                ],
                arguments: [
                    {
                        name: '<accountName>',
                        description: 'Account name added with "accounts" command',
                        required: true,
                    },
                ],
                params: {
                    '--encrypted-key': {
                        description: 'Prints also the KEY encoded with PIN',
                        type: 'boolean',
                    }
                },
                async process (args: string[], params: { encryptedKey?: boolean, pin: string }, app: App) {
                    let [ accountName ] = args;

                    let accounts = di.resolve(AccountsService, app.config);
                    let account = await accounts.get(accountName);
                    $require.notNull(account, `Account ${accountName} not found`);
                    let tableData = [
                        ['Account', accountName],
                        ['Address', account.address],
                    ];

                    if (params.encryptedKey) {
                        let key = (account as any).key;
                        if (key) {
                            if (/p1:/.test(key) === false) {
                                const encrypted = await $sig.$key.encrypt(key, params.pin);
                                key = encrypted;
                            }
                            tableData.push(['Key', key]);
                        }
                    }

                    $console.table(tableData);
                }
            },
        ],
        params: {
            ...Parameters.pin(),
            ...Parameters.chain({ required: false }),
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    };
};

