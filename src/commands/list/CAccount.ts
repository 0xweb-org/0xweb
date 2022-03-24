import di from 'a-di';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $bigint } from '@dequanto/utils/$bigint';
import { $console } from '@core/utils/$console';

export const CAccount = <ICommand>{
    command: 'account',

    description: [
        'Account tools.'
    ],
    subcommands: [
        {
            command: 'balance',
            //example: 'web3m account balance <accountName> <tokenSymbol> -p <pin>',
            description: [
                'Get account balance '
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

            },
            async process (args: string[], params: any, app: App) {
                let [ accountName, tokenName ] = args;

                let accounts = di.resolve(AccountsService, app.config);
                let account = await accounts.get(accountName);

                $console.toast(`Loading token ${tokenName}`);
                let token = await app.chain.tokens.getToken(tokenName, true);
                if (token == null) {
                    throw new Error(`Unknown token: ${tokenName}`);
                }

                $console.toast(`Loading balance for ${account.address}`);
                let balance = await app.chain.token.balanceOf(account.address, token);
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
        '-p, --pin': {
            description: 'Account configuration is encrypted with a derived key from the pin and local machine key. ',
            required: true
        },
        '-c, --chain': {
            description: `Default: eth. Available: ${$validate.platforms.join(', ')}`
        }
    },

    async process(args: string[], params, app: App) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "web3m accounts --help" to view the list of commands`);
    }
}

