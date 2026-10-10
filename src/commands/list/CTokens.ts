import di from 'a-di';
import alot from 'alot';
import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { IToken } from '@dequanto/models/IToken';
import { $require } from '@dequanto/utils/$require';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { TokensService } from '@dequanto/tokens/TokensService';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { $bigint } from '@dequanto/utils/$bigint';
import { TEth } from '@dequanto/models/TEth';


export function CTokens() {
    return <ICommand>{
        command: 'tokens',

        description: [
            'Manage known tokens'
        ],
        subcommands: [
            {
                command: 'add',
                example: '0xweb tokens add --address 0x... --symbol FRT --decimals 18 --chain eth',
                description: [
                    'Add a token to the list of known tokens'
                ],
                params: {
                    '-a, --address': {
                        description: 'Token contract address',
                        required: true,
                        validate: $require.Address,
                    },
                    '-s, --symbol': {
                        description: 'Token symbol',
                        required: true
                    },
                    '-d, --decimals': {
                        description: 'Number of token decimals. Default: 18',
                        default: 18,
                        type: 'number'
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let { address, symbol, decimals, chain } = params;

                    await chainTools.tokens.addKnownToken(<IToken>{
                        address,
                        symbol,
                        decimals,
                        platform: chain
                    });
                    $console.result(`Added token ${symbol} [${address}] in ${chain}`);
                }
            },
            {
                command: 'find',
                example: '0xweb tokens find USDC',
                description: [
                    'Find a token by symbol or address and show its details'
                ],
                arguments: [
                    {
                        name: '<symbol>'
                    }
                ],
                params: {

                },
                async process(args: string[], params: any, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let [query] = args;

                    try {
                        let token = await chainTools.tokens.getKnownToken(query);
                        $console.table([
                            ['Symbol', token.symbol ?? ''],
                            ['Address', token.address],
                            ['Decimals', token.decimals ?? ''],
                            ['Platform', token.platform],
                        ]);
                    } catch (error) {
                        throw new Error(`Token '${query}' not found for '${params.chain}'`);
                    }
                }
            },
            {
                command: 'for',
                example: '0xweb tokens for 0x...',
                description: [
                    'Find tokens received by an address and show their balances'
                ],
                arguments: [
                    {
                        address: '<address>'
                    }
                ],
                params: {

                },
                async process(args: TEth.Address[], params: any, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);

                    let [eoa] = args;
                    $require.Address(eoa, 'Provide the valid address to get the tokens for');

                    $console.toast('Loading Transfer events...');
                    let erc20 = new ERC20(undefined, chainTools.client);
                    let transfers = await erc20.getPastLogsTransfer({
                        params: {
                            to: eoa
                        }
                    });

                    let tokenAddresses = alot(transfers)
                        .map(x => x.address)
                        .distinct()
                        .toArray();

                    $console.log(`Got bold<cyan<${tokenAddresses.length}>> tokens for ${eoa}`);

                    $console.toast(`Loading tokens info...`);
                    let tokensService = di.resolve(TokensService, chainTools.platform);
                    let tokens = await alot(tokenAddresses)
                        .mapAsync(async address => {
                            return tokensService.getKnownToken(address);
                        })
                        .toArrayAsync({ errors: 'include' });

                    let knownTokens = tokens
                        .filter(x => x instanceof Error === false)

                    $console.log(`Got bold<cyan<${knownTokens.length}>> known ERC20 tokens`);

                    let priceService = di.resolve(TokenPriceService, chainTools.client, chainTools.explorer);

                    $console.toast(`Loading account balances...`);
                    let balances = await alot(knownTokens)
                        .mapAsync(async token => {
                            $console.toast(`Loading balance for ${token.symbol}...`);
                            let balance = await new ERC20(token.address, chainTools.client).balanceOf(eoa)
                            let priceInfo = await priceService.getPrice(token, {
                                amountWei: balance
                            });
                            return {
                                token,
                                balance: $bigint.toEther(balance, token.decimals),
                                priceInfo
                            };
                        })
                        .toArrayAsync();

                    let table = balances.map(result => {
                        return [
                            result.token.symbol ?? result.token.name ?? '',
                            result.token.address,
                            `${result.balance}`,
                            result.priceInfo.error
                                ? result.priceInfo.error.message
                                : `${result.priceInfo.price}$`,
                        ]
                    });
                    $console.table([
                        ['Token', 'Address', 'Balance(Ξ)', '$'],
                        ...table,
                    ]);
                }
            },
        ],
        params: {
            '-c, --chain': {
                description: `Default: eth. Available: ${$validate.platforms().join(', ')}`,
                required: true,
                oneOf: $validate.platforms()
            }
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "token" not found: ${args[0]}. Call "0xweb token --help" to view the list of commands`);
        }
    };
}

