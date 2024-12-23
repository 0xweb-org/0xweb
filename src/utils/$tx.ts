import di from 'a-di';
import alot from 'alot';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { $require } from '@dequanto/utils/$require';
import { $console } from './$console';
import { $date } from '@dequanto/utils/$date';
import { $block } from '@dequanto/utils/$block';
import { $gas } from '@dequanto/utils/$gas';
import { InputDataUtils } from '@dequanto/contracts/utils/InputDataUtils';
import { TxContract } from '@dequanto/contracts/TxContract';
import { $bigint } from '@dequanto/utils/$bigint';
import { $number } from '@dequanto/utils/$number';
import { ITxLogsTransferData } from '@dequanto/txs/receipt/TxLogsTransfer';
import { InternalTokenService } from '@core/services/InternalTokenService';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { TxLogParser } from '@dequanto/txs/receipt/TxLogParser';
import { ContractAbiProvider } from '@dequanto/contracts/ContractAbiProvider';
import { IBlockchainExplorer } from '@dequanto/explorer/IBlockchainExplorer';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { TEth } from '@dequanto/models/TEth';
import { TAbiItem } from '@dequanto/types/TAbi';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $is } from '@dequanto/utils/$is';
import { $contract } from '@dequanto/utils/$contract';
import { $hex } from '@dequanto/utils/$hex';
import { $abiValues } from './$abiValues';
import { $logger } from '@dequanto/utils/$logger';



export namespace $tx {

    /** @deprecated Use TxService instead */
    export async function log(client: Web3Client, explorer: IBlockchainExplorer, hash: TEth.Hex, tx?: TEth.Tx, receipt?: TEth.TxReceipt) {
        $logger.warn(`$tx.log is deprecated. Use TxService instead.`);
        $require.TxHash(hash, `Not valid hash bold<${hash}>`);
        if (tx == null) {
            $console.toast(`Fetch Tx ${hash}`);
            tx = await client.getTransaction(hash);
            if (tx == null) {
                $console.log(`red<Transaction bold<${hash}> not found (${client.platform})>`)
                return;
            }
        }
        if (receipt == null) {
            $console.toast(`Fetch Tx Receipt ${hash}`);
            receipt = await client.getTransactionReceipt(hash);
            if (receipt == null) {
                $console.log('yellow<Transaction is still not mined>');
            }
        }

        let data = splitInput(tx);

        let block = receipt == null
            ? null
            : await client.getBlock(receipt.blockNumber);



        $console.log(`\ncyan<bold<Transaction>>\n`);
        $console.table([
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
            ...(data.method ? [
                ['   Method', `gray<${data.method}>`],
            ] : []),
            ...(data.bytecode ? [
                ['   Bytecode', `gray<${data.bytecode}>`],
            ] : []),
            ...(data.args ? [
                ['   Arguments', data.args.map(x => `gray<${x}>`).join('\n')],
            ] : []),
            ['Gas', $gas.formatUsed(tx, receipt)]
        ]);

        let abi: TAbiItem[];
        if (data.method || data.bytecode) {
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

        let transfers = knownLogs.filter(x => x.event === 'Transfer') as any as ITxLogsTransferData[] ;
        if (transfers.length > 0) {
            let tokenService = new InternalTokenService();
            let tokenPriceService = new TokenPriceService(client, explorer);


            let events = await alot(transfers)
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
                        let token = await tokenService.getTokenData(transfer.token.symbol, client, explorer);
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
                    event.token?.symbol,
                    event.from,
                    event.to,
                    event.amount != null
                        ? $bigint.toEther(event.amount, event.token?.decimals ?? 18)
                        : '',
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
                    event.address,
                    [
                        event.event,
                        ...event.arguments?.map(arg => `  gray<${arg.name}=>${ serializeValue(arg.value) }`)
                    ].join('\n')
                ];
            });
            $console.table([
                ['Contract', 'Event/Parameters'],
                ['----------------'],
                ...cells
            ]);
        }

        if (abi) {
            let txContract = new TxContract(explorer);
            let decodedInput = decodeInput(tx, abi);
            if (decodedInput != null) {
                $console.log(`\ncyan<bold<Parameters parsed>>\n`);
                let cells = [
                    ['Method', decodedInput.name]
                ];
                if (decodedInput.params) {
                    for (let key in decodedInput.params) {
                        let val = decodedInput.params[key];
                        if (Array.isArray(val)) {
                            val = val.map(x => x?.toString() ?? '<null>').join('\n');
                        }
                        cells.push([key, val ?? '<null>']);
                    }
                } else if (decodedInput.args) {
                    decodedInput.args.forEach((x, i) => {
                        cells.push([i, x ?? '<null>']);
                    })
                }

                $console.table([
                    ...cells
                ]);
            }
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
            bytecode: bytecode,
            args: argsArr
        };
    }
    return InputDataUtils.split(inputHex);
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
