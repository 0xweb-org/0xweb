import di from 'a-di';
import alot from 'alot';
import memd from 'memd';
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
import { Web3Client } from '@dequanto/clients/Web3Client';
import { IBlockchainExplorer } from '@dequanto/explorer/IBlockchainExplorer';
import { IWeb3Client } from '@dequanto/clients/interfaces/IWeb3Client';
import { ILogger } from '@dequanto/loggers/ILogger';
import { IndexDbDriver, IndexedDbStore } from '@core/www/services/IndexDbDriver';


export type TTransactionDetails = {
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

export class TxDetailsLoader {

    constructor(
        public client: Web3Client,
        public explorer: IBlockchainExplorer,
        public logger: ILogger) {

    }

    @memd.deco.memoize({
        store: new IndexedDbStore('txDetails'),
        key: (opts: { this: TxDetailsLoader }, hash: TEth.Hex) => {
            let KEY = `${opts.this.client.platform}/${hash}`;
            return KEY;
        }
    })
    async getTx(hash: TEth.Hex) {
        let { client, explorer } = this;

        $require.TxHash(hash, `Not valid hash bold<${hash}>`);
        this.logger.info(`Fetch Tx ${hash}`);
        let tx = await client.getTransaction(hash);
        if (tx == null) {
            this.logger.error(`red<Transaction bold<${hash}> not found (${client.platform})>`)
            return null;
        }


        this.logger.info(`Fetch Tx Receipt ${hash}`);
        let receipt = await client.getTransactionReceipt(hash);
        if (receipt == null) {
            this.logger.warn('yellow<Transaction is still not mined>');
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
                        let [name, symbol] = await Promise.all([
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
                .toArrayAsync({});
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


        return <TTransactionDetails>{
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

}



function splitInput(tx: TEth.Tx): {
    method?: string
    bytecode?: TEth.Hex
    args?: TEth.Hex[]
} {
    let inputHex = tx.input ?? tx.data;
    if ($hex.isEmpty(inputHex)) {
        return {};
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
