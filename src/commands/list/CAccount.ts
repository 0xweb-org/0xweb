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

        ],
        params: {
            ...Parameters.pin(),
            ...Parameters.chain(),
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    };
};

