import di from 'a-di';
import alot from 'alot';
import { App } from '@core/app/App';
import { InternalTokenService } from '@core/services/InternalTokenService';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Paramsters';
import { InputDataUtils } from '@dequanto/contracts/utils/InputDataUtils';
import { ChainAccount, TAccount } from '@dequanto/models/TAccount';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { TxLogParser } from '@dequanto/txs/receipt/TxLogParser';
import { ITxLogsTransferData } from '@dequanto/txs/receipt/TxLogsTransfer';
import { TxDataBuilder } from '@dequanto/txs/TxDataBuilder';
import { $bigint } from '@dequanto/utils/$bigint';
import { $block } from '@dequanto/utils/$block';
import { $date } from '@dequanto/utils/$date';
import { $gas } from '@dequanto/utils/$gas';
import { $is } from '@dequanto/utils/$is';
import { $number } from '@dequanto/utils/$number';
import { $require } from '@dequanto/utils/$require';
import { $sign } from '@dequanto/utils/$sign';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';
import { AbiItem, AbiInput } from 'web3-utils'
import { ContractService } from '@core/services/ContractService';
import { TxContract } from '@dequanto/contracts/TxContract';

export const CTx: ICommand = {
    command: 'tx',
    description: [
        'Transaction utils'
    ],
    subcommands: [
        {

            command: 'sign',
            description: [
                'Sign a transaction json file'
            ],
            arguments: [
                {
                    description: `Tx JSON file`,
                    required: true
                }
            ],
            params: {
                ...Parameters.account,
                '--output, -o': {
                    description: 'Optional. Override the output file'
                }
            },
            async process(args: string[], params: any, app: App) {
                let [ path ] = args;

                $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);

                let json = await File.readAsync<any>(path);

                let account = await app.getAccount<ChainAccount>(params.account);
                $require.notNull(account, `Account ${params.account} not found`);

                let builder = TxDataBuilder.fromJSON(app.chain.client, account as TAccount, {
                    tx: json.tx,
                    config: json.config
                });

                await builder.setNonce();
                await builder.setGas();

                let tx = builder.getTxData();
                let sig = await $sign.signTx(app.chain.client, tx, account);

                json.signature = sig;
                json.tx = builder.toJSON().tx;

                let output = params.output ?? path;
                await File.writeAsync(output, json);
            }
        },
        {

            command: 'view',
            description: [
                'Load transaction by hash'
            ],
            arguments: [
                {
                    description: `Tx hash`,
                    required: true,
                }
            ],
            params: {
                ...Parameters.chain
            },
            async process(args: string[], params: any, app: App) {
                // $console.table([
                //     [ 'Status', 'yellow<mining>'],
                //     [ 'Tx', 'Lorem' ],
                //     [ 'From', 'Ipsum' ],
                //     [ 'To', `A\nB`],
                //     [ 'Value', '0'],
                //     [ 'Data', ''],

                //     [ '   Method', `CallMethod` ],
                //     [ '   Arguments', `0x123\n0x123123\n0x124125`],

                //     [ 'Gas', '128']
                // ]);

                // return;
                let [ hash ] = args;

                $require.TxHash(hash, `Not valid hash bold<${hash}>`);

                $console.toast(`Fetch Tx ${hash}`);
                let tx = await app.chain.client.getTransaction(hash);
                if (tx == null) {
                    $console.log(`red<Transaction bold<${hash}> not found (${app.chain.platform})>`)
                    return;
                }
                $console.toast(`Fetch Tx Receipt`);
                let block: Awaited<ReturnType<typeof app.chain.client.getBlock>>;

                let receipt = await app.chain.client.getTransactionReceipt(hash);
                if (receipt) {
                    $console.toast(`Fetch Block #${receipt.blockNumber}`);
                    block = await app.chain.client.getBlock(receipt.blockNumber);
                } else {
                    $console.log('yellow<Transaction is still not mined>');
                }

                let data = InputDataUtils.split(tx.input ?? '');

                $console.log(`\ncyan<bold<Transaction>>\n`);
                $console.table([
                    [ 'Status', receipt == null ? 'yellow<mining>' : (receipt.status ? 'green<OK>' : 'red<ERROR>') ],
                    ...(block ? [
                        [ 'Block', `#${ block.number } yellow<${ $date.format($block.getDate(block), 'dd-MM-yyyy HH:mm:ss')}>` ]
                    ] : []),
                    [ 'Tx', hash ],
                    [ 'From', tx.from ],
                    [ 'To', tx.to],
                    [ 'Value', tx.value?.toString() ?? 0],
                    [ 'Data', ''],
                    ...(data.method ? [
                        [ '   Method', `gray<${data.method}>` ],
                        [ '   Arguments', data.args.map(x => `gray<${x}>`).join('\n') ],
                    ] : []),
                    [ 'Gas', $gas.formatUsed(tx, receipt)]
                ]);


                let abi: AbiItem[];
                if (data.method) {
                    let provider = new ContractService(app);
                    abi = await provider.getAbiByAddress(tx.to, app.chain.client, app.chain.explorer);
                }

                let parser = di.resolve(TxLogParser);
                if (abi != null) {
                    parser.topics.register(abi);
                }
                let logs = await parser.parse(receipt);
                let knownLogs = logs.filter(x => x != null);

                let transfers: ITxLogsTransferData[] = knownLogs.filter(x => x.event === 'Transfer');
                if (transfers.length > 0) {
                    let tokenService = new InternalTokenService();
                    let tokenPriceService = new TokenPriceService(app.chain.client, app.chain.explorer);

                    let events = await alot(transfers)
                        .filter(x => $is.Address(x.token.symbol))
                        .mapAsync(async (transfer) => {
                            try {
                                let token = await tokenService.getTokenData(transfer.token.symbol, app.chain.client, app.chain.explorer);
                                let price = await tokenPriceService.getPrice(token, {
                                    amountWei: transfer.amount
                                });
                                return {
                                    ...transfer,
                                    token: token,
                                    usd: $number.round(price.price ?? 0, 2) || '?'
                                };
                            } catch (error) {
                                return {
                                    ...transfer,
                                    usd: '?',
                                }
                            }
                        })
                        .toArrayAsync({ errors: 'include' });

                    $console.log(`\ncyan<bold<Transfers>>\n`);
                    let cells = events.map(event => {
                        return [
                            event.token.symbol,
                            event.from,
                            event.to,
                            $bigint.toEther(event.amount, event.token.decimals),
                            `${event.usd}$`,
                        ];
                    });
                    $console.table([
                        ['Token', 'From', 'To', 'Amount'],
                        ['-----', '----', '--', '------'],
                        ...cells
                    ]);
                }


                let otherEvents = knownLogs.filter(x => x.event !== 'Transfer');
                if (otherEvents.length > 0) {
                    $console.log(`\ncyan<bold<Known Events>>\n`);
                    let cells = otherEvents.map(event => {
                        return [
                            JSON.stringify(event)
                        ];
                    });
                    $console.table([
                        ['Serialized Data'],
                        ['----------------'],
                        ...cells
                    ]);
                }

                if (abi) {
                    let txContract = new TxContract(app.chain.explorer);
                    let decodedInput = await txContract.parseTrasactionWithAbi(tx, abi);
                    $console.log(`\ncyan<bold<Parameters parsed>>\n`);
                    let cells = [
                        ['Method', decodedInput.name]
                    ];
                    for (let key in decodedInput.args) {
                        if (/^\d$/.test(key)) {
                            continue;
                        }
                        let val = decodedInput.args[key];
                        if (Array.isArray(val)) {
                            val = val.map(x => x?.toString() ?? '<null>').join('\n');
                        }
                        cells.push([key, val ?? '<null>']);
                    }

                    $console.table([
                        ...cells
                    ]);
                }
            }
        }
    ],
    async process() {
        throw new Error(`Subcommand is not set`);
    }
}
