import { $require } from '@dequanto/utils/$require';
import di from 'a-di';
import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $is } from '@dequanto/utils/$is';
import { IToken } from '@dequanto/models/IToken';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';


export function CToken() {
    return <ICommand>{
        command: 'token',

        description: [
            'Get token information'
        ],
        subcommands: [
            {
                command: 'price',
                example: '0xweb token price ETH -b <blockNumber>',
                description: [
                    'Get the price of a token'
                ],
                arguments: [
                    {
                        name: '<token>',
                        description: 'Token symbol or address',
                        required: true,
                    }
                ],
                params: {
                    '-b, --block': {
                        description: 'Block number to query. Default: latest',
                        map: Number
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let [tokenMix] = args;

                    $console.toast(`Loading token ${tokenMix}`);
                    let token = await chainTools.tokens.getToken(tokenMix, true);
                    if (token == null && $is.Address(tokenMix)) {
                        token = <IToken>{
                            address: tokenMix,
                            decimals: 18,
                            platform: chainTools.client.platform,
                        };
                    }
                    if (token == null) {
                        throw new Error(`Token ${tokenMix} not found`);
                    }

                    $console.toast(`Loading price`);
                    let service = di.resolve(TokenPriceService, chainTools.client, chainTools.explorer);
                    let priceData = await service.getPrice(token, {
                        block: params.block,
                    });

                    $console.table([
                        ['Symbol', token.symbol ?? ''],
                        ['Address', token.address],
                        ['Decimals', token.decimals?.toString() ?? ''],
                        ['Price', `green<${priceData.price}>`]
                    ]);
                }
            },

        ],
        params: {
            '-c, --chain': {
                description: `Default: eth. Available: ${$validate.platforms().join(', ')}`
            }
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "token" not found: ${args[0]}. Call "0xweb token --help" to view the list of commands`);
        }
    }
};
