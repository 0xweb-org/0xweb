import di from 'a-di';
import alot from 'alot';
import { TEth } from '@dequanto/models/TEth';
import { BaseService } from './BaseService';
import { $require } from '@dequanto/utils/$require';
import { $hex } from '@dequanto/utils/$hex';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $contract } from '@dequanto/utils/$contract';
import { TAbiItem } from '@dequanto/types/TAbi';
import { InputDataUtils } from '@dequanto/contracts/utils/InputDataUtils';
import { ContractAbiProvider } from '@dequanto/contracts/ContractAbiProvider';
import { TxLogParser } from '@dequanto/txs/receipt/TxLogParser';
import { InternalTokenService } from './InternalTokenService';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { ITxLogsTransferData } from '@dequanto/txs/receipt/TxLogsTransfer';
import { ERC20 } from '@dequanto/prebuilt/openzeppelin/ERC20';
import { $number } from '@dequanto/utils/$number';
import { $bigint } from '@dequanto/utils/$bigint';
import { TxContract } from '@dequanto/contracts/TxContract';
import { TAddress } from '@dequanto/models/TAddress';
import { ITxLogItem } from '@dequanto/txs/receipt/ITxLogItem';
import { $date } from '@dequanto/utils/$date';
import { $block } from '@dequanto/utils/$block';
import { $gas } from '@dequanto/utils/$gas';
import { App } from '@core/app/App';


type TTransactionDetails = {
    status: 'pending' | 'success' | 'failed'

    calldata?: {
        method?: string
        bytecode?: TEth.Hex
        args?: TEth.Hex[]
    }
    calldataParsed?: {
        method: string;
        args?: any[];
        params?: {
            [key: string]: any;
        };
        value?: string | number | bigint;
    }

    abi: TAbiItem[]

    block: TEth.Block
    tx: TEth.Tx
    receipt?: TEth.TxReceipt

    transfers?: {
        token: {
            symbol: string;
            name: string;
            decimals: number;
            address: `0x${string}`;
            platform: string;
        };
        usd: string | number;
        event: string;
        from: TAddress;
        to: TAddress;
        amount: bigint;
    }[]

    // Other events
    events?: ITxLogItem<Record<string, any>, string>[]
}

export class TxService extends BaseService {

    static async printTx (app: App, hash: TEth.Hex, tx?: TEth.Tx, receipt?: TEth.TxReceipt) {
        let service = new TxService(app);
        let details = await service.getTx(hash, tx, receipt);
        await service.printTx(details);
    }

    async tx(hash: TEth.Hex): Promise<TTransactionDetails> {
        let details = await this.getTx(hash);
        if (this.opts.logger !== false) {
            await this.printTx(details);
        }
        return details;
    }


    async getTx (hash: TEth.Hex, tx?: TEth.Tx, receipt?: TEth.TxReceipt) {
        let { client, explorer } = this.app.chain;

        $require.TxHash(hash, `Not valid hash bold<${hash}>`);
        if (tx == null) {
            this.printLogToast(`Fetch Tx ${hash}`);
            tx = await client.getTransaction(hash);
            if (tx == null) {
                this.printLog(`red<Transaction bold<${hash}> not found (${client.platform})>`)
                return null;
            }
        }
        if (receipt == null) {
            this.printLogToast(`Fetch Tx Receipt ${hash}`);
            receipt = await client.getTransactionReceipt(hash);
            if (receipt == null) {
                this.printLog('yellow<Transaction is still not mined>');
            }
        }

        let calldata = splitInput(tx);

        let block = receipt == null
            ? null
            : await client.getBlock(receipt.blockNumber);

        let eventsTransfer: TTransactionDetails['transfers'];
        let eventsOther: TTransactionDetails['events'];
        let dataArguments: TTransactionDetails['calldataParsed'];

        let abi: TAbiItem[];
        if (calldata.method || calldata.bytecode) {
            let resolver = new ContractAbiProvider(client, explorer);
            let address = $hex.isEmpty(receipt.contractAddress) === false
                ? receipt.contractAddress
                : tx.to;

            if (client.network !== 'hardhat') {
                let result = await resolver.getAbi(address);
                abi = result.abiJson;
            }
        }

        let parser = di.resolve(TxLogParser);
        if (abi != null) {
            parser.topics.register(abi);
        }
        let logs = await parser.parse(receipt);
        let knownLogs = logs.filter(x => x != null);

        let transfers = knownLogs.filter(x => x.event === 'Transfer') as any as ITxLogsTransferData[];
        if (transfers.length > 0) {
            let tokenService = new InternalTokenService();
            let tokenPriceService = new TokenPriceService(client, explorer);

            eventsTransfer = await alot(transfers)
                //.filter(x => $is.Address(x.token?.symbol))
                .mapAsync(async (transfer) => {
                    if (transfer.token.symbol == null) {

                        let IERC20 = new ERC20(transfer.token.address, client);
                        let [ name, symbol ] = await Promise.all([
                            IERC20.name(),
                            IERC20.symbol(),
                        ]);
                        transfer.token.name = name;
                        transfer.token.symbol = symbol;
                    }

                    try {
                        let token = await tokenService.getTokenData(transfer.token.address, client, explorer);
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
                            token: null,
                            usd: '?',
                        }
                    }
                })
                .toArrayAsync({ });
        }


        eventsOther = knownLogs.filter(x => x.event !== 'Transfer');

        if (abi) {
            let parsed = decodeInput(tx, abi);
            dataArguments = {
                method: parsed.name,
                args: parsed.args,
                params: parsed.params,
                value: 'value' in parsed ? parsed.value : 0
            };
        }


        return <TTransactionDetails> {
            status: receipt == null ? 'pending' : (receipt.status ? 'success' : 'failed'),
            block,
            tx,
            receipt,
            abi,
            transfers: eventsTransfer,
            events: eventsOther,
            calldata: calldata,
            calldataParsed: dataArguments,
        };
    }

    async printTx (details: TTransactionDetails) {
        let { tx, receipt, block, calldata, calldataParsed, abi, transfers, events } = details;
        let hash = tx.hash;


        this.printLog(`\ncyan<bold<Transaction>>\n`);
        this.printLogTable([
            ['Status', receipt == null ? 'yellow<mining>' : (receipt.status ? 'green<OK>' : 'red<ERROR>')],
            ...(block ? [
                ['Block', `#${block.number} yellow<${$date.format($block.getDate(block), 'dd-MM-yyyy HH:mm:ss')}>`]
            ] : []),
            ['Tx', `cyan<${hash}>`],
            ['From', tx.from],
            ['To', tx.to],
            ['Nonce', tx.nonce],
            ['Value', tx.value?.toString() ?? 0],
            ['Data', ''],
            ...(calldata?.method ? [
                ['   Method', `gray<${calldata.method}>`],
            ] : []),
            ...(calldata?.bytecode ? [
                ['   Bytecode', `gray<${calldata?.bytecode}>`],
            ] : []),
            ...(calldata.args ? [
                ['   Arguments', calldata.args.map(x => `gray<${x}>`).join('\n')],
            ] : []),
            ['Gas', $gas.formatUsed(tx, receipt)]
        ]);


        if (transfers?.length > 0) {
            this.printLog(`\ncyan<bold<Transfers>>\n`);
            let rows = transfers.map(event => {
                return [
                    event.token?.symbol,
                    event.from,
                    event.to,
                    event.amount != null
                        ? $bigint.toEther(event.amount, event.token?.decimals ?? 18)
                        : '',
                    `${event.usd}$`,
                ];
            });
            this.printLogTable([
                ['Token', 'From', 'To', 'Amount'],
                ['-----', '----', '--', '------'],
                ...rows
            ]);
        }


        if (events?.length > 0) {
            this.printLog(`\ncyan<bold<Known Events>>\n`);
            let rows = events.map(event => {
                return [
                    event.address,
                    [
                        event.event,
                        ...event.arguments?.map(arg => `  gray<${arg.name}=>${ serializeValue(arg.value) }`)
                    ].join('\n')
                ];
            });
            this.printLogTable([
                ['Contract', 'Event/Parameters'],
                ['----------------'],
                ...rows
            ]);
        }

        if (calldataParsed != null) {
            this.printLog(`\ncyan<bold<Parameters parsed>>\n`);
            let rows = [
                ['Method', calldataParsed.method]
            ];
            if (calldataParsed.params) {
                for (let key in calldataParsed.params) {
                    let val = calldataParsed.params[key];
                    if (Array.isArray(val)) {
                        val = val.map(x => x?.toString() ?? '<null>').join('\n');
                    }
                    rows.push([key, val ?? '<null>']);
                }
            } else if (calldataParsed.args) {
                calldataParsed.args.forEach((x, i) => {
                    rows.push([i, x ?? '<null>']);
                })
            }

            this.printLogTable([
                ...rows
            ]);
        }
    }
}



function splitInput (tx: TEth.Tx): {
    method?: string
    bytecode?: TEth.Hex
    args?: TEth.Hex[]
} {
    let inputHex = tx.input ?? tx.data;
    if ($hex.isEmpty(inputHex)) {
        return { };
    }
    if ($hex.isEmpty(tx.to)) {
        let { arguments: argsHex, bytecode } = $contract.parseDeploymentBytecode(inputHex);
        let argsArr = [];
        if ($hex.isEmpty(argsHex) === false) {
            let hex = `0x00000000` + $hex.raw(argsHex);
            let split = InputDataUtils.split(hex);
            argsArr = split.args;
        }
        return {
            bytecode: bytecode as TEth.Hex,
            args: argsArr
        };
    }
    return InputDataUtils.split(inputHex) as {
        method: string
        args: TEth.Hex[]
    };
}

function decodeInput(tx: TEth.Tx, abi: TAbiItem[]) {
    if ($hex.isEmpty(tx.to)) {
        let { arguments: argsHex, bytecode } = $contract.parseDeploymentBytecode(tx.input);
        let ctorAbi = abi.find(x => x.type === 'constructor');
        if (ctorAbi) {
            return {
                ...$abiUtils.decode(ctorAbi.inputs, argsHex),
                name: 'constructor',
            };
        }
        return null;
    }
    return $abiUtils.parseMethodCallData(abi, tx);
}

function serializeValue (value: any) {
    if (value == null) {
        return 'NULL';
    }
    if (typeof value !== 'object') {
        return value;
    }
    return JSON.stringify(value);
}
