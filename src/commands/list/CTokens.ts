import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { IToken } from '@dequanto/models/IToken';
import { $require } from '@dequanto/utils/$require';


export const CTokens = <ICommand>{
    command: 'tokens',

    description: [
        'Managa known tokens.'
    ],
    subcommands: [
        {
            command: 'add',
            example: '0xweb tokens add --address 0x... --symbol FRT --decimals 18 --chain eth',
            description: [
                'Add new token to the known list.'
            ],
            params: {
                '-a, --address': {
                    description: 'Tokens address',
                    required: true,
                    validate: $require.Address,
                },
                '-s, --symbol': {
                    description: 'Tokens symbol',
                    required: true
                },
                '-d, --decimals': {
                    description: 'Tokens decimals. Default: 18',
                    default: 18,
                    type: 'number'
                }
            },
            async process (args: string[], params: any, app: App) {
                let { address, symbol, decimals, chain } = params;

                await app.chain.tokens.addKnownToken(<IToken>{
                    address,
                    symbol,
                    decimals,
                    platform: chain
                });
                $console.log(`Added token ${symbol} [${address}] in ${chain}`);
            }
        },
        {
            command: 'find',
            example: '0xweb tokens find USDC',
            description: [
                'Add new token to the known list.'
            ],
            arguments: [
                {
                    name: '<symbol>'
                }
            ],
            params: {

            },
            async process (args: string[], params: any, app: App) {
                let [ query ] = args;

                try {
                    let token = await app.chain.tokens.getKnownToken(query);
                    $console.table([
                        [ 'Symbol', token.symbol ],
                        [ 'Address', token.address ],
                        [ 'Decimals', token.decimals ],
                        [ 'Platform', token.platform ],
                    ]);
                } catch (error) {
                    throw new Error(`Token '${query}' not found for '${params.chain}'`);
                }
            }
        },
    ],
    params: {
        '-c, --chain': {
            description: `Default: eth. Available: ${$validate.platforms.join(', ')}`,
            required: true,
            oneOf: $validate.platforms
        }
    },

    async process(args: string[], params, app: App) {
        console.warn(`Command for an "token" not found: ${args[0]}. Call "0xweb token --help" to view the list of commands`);
    }
}

