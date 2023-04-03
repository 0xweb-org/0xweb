import di from 'a-di';
import alot from 'alot';
import { File, env } from 'atma-io';
import { PackageService } from './PackageService';
import { AbiItem, AbiInput } from 'web3-utils'
import { GeneratorFromAbi } from '@dequanto/gen/GeneratorFromAbi';
import { IPackageItem } from '@core/models/IPackageJson';
import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { ContractReader } from '@dequanto/contracts/ContractReader';
import { TxTopicInMemoryProvider } from '@dequanto/txs/receipt/TxTopicInMemoryProvider';
import { ContractWriter } from '@dequanto/contracts/ContractWriter';
import { AccountsService } from './AccountsService';
import { TPlatform } from '@dequanto/models/TPlatform';
import { App } from '@core/app/App';
import { ITxConfig } from '@dequanto/txs/ITxConfig';
import { ITxWriterOptions } from '@dequanto/txs/TxWriter';
import { TAddress } from '@dequanto/models/TAddress';
import { PlatformFactory } from '@dequanto/chains/PlatformFactory';
import { $require } from '@dequanto/utils/$require';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { $account } from '@dequanto/utils/$account';
import { ChainAccount } from '@dequanto/models/TAccount';
import { SlotsDump } from '@dequanto/solidity/SlotsDump';
import { $is } from '@dequanto/utils/$is';
import { $csv } from '@dequanto/utils/$csv';
import { $block } from '@dequanto/utils/$block';
import { $logger } from '@dequanto/utils/$logger';
import { ITxLogItem } from '@dequanto/txs/receipt/ITxLogItem';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { $abiParser } from '@dequanto/utils/$abiParser';

interface ICallParams {
    block?: string | number
    account?: string
    chain?: TPlatform
    nonce?: number
    address?: TAddress
    safeTransport?: string
}


export class ContractService {
    constructor(public app: App) {

    }

    async help (name: string): Promise<string> {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);

        let methods = await abi.filter(x => x.type === 'function');
        let reads = methods.filter(x => GeneratorFromAbi.Gen.isReader(x));
        let writes = methods.filter(x => GeneratorFromAbi.Gen.isReader(x) === false);

        let lines = [
            `bold<cyan<${env.currentDir.combine(pckg.main).toLocalFile()}>>`
        ];

        lines.push(`bold<Read>`);
        lines.push(...reads.map(this.stringifyAbi));

        lines.push('');
        lines.push(`bold<Write>`)
        lines.push(...writes.map(this.stringifyAbi));

        return lines.join('\n');
    }

    async call (name: string, method: string, params: ICallParams, action: 'read' | 'write') {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);

        let abiItem = method?.includes(`(`)
            ? $abiParser.parseMethod(method)
            : abi.find(x => x.name === method && x.type === 'function');

        if (abiItem == null) {
            let str = [
                `Method ${method} not found. 0xweb c abi ${name} to view available methods.`,
                `Or provide the ABI e.g.: 0xweb c read ${name} "decimals() returns (uint16)"`
            ].join(' ');
            throw new Error(str);
        }

        let methodSignature = this.stringifyAbi(abiItem);
        let isRead = typeof action === 'string'
            ? action === 'read'
            : await GeneratorFromAbi.Gen.isReader(abiItem);

        let platform = params.chain ?? pckg.platform;
        if (platform !== this.app?.chain?.client.platform) {
            this.app.chain = await di
                .resolve(PlatformFactory)
                .get(platform as any);
        }

        $console.log('')
        $console.table([
            ['Contract', params.address ?? pckg.address],
            ['Platform', platform],
            ['Action', isRead ? 'READ' : 'WRITE'],
            ['Method',  methodSignature.trim()],
        ]);
        $console.log('')

        if (isRead) {
            await this.$read(pckg, abiItem, params);
        } else {
            await this.$write(pckg, abiItem, params);
        }
    }
    async logs (name: string, eventName: string, params: { output, format?: 'csv' | 'json' }) {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);
        let event = abi.find(x => x.name === eventName && x.type === 'event');
        $require.notNull(event, `"${eventName}" is not a valid Event in Contract "${name}". Use "0xweb c ${name} abi" to view the contracts ABI`);

        await this.app.ensureChain(pckg.platform);

        let args = alot(event.inputs)
            .map(input => [ input.name, params?.[input.name] ])
            .filter(tuple => tuple[1] != null)
            .toDictionary(x => x[0], x => x[1]);

        let reader = await this.getContractReader(params);
        let logs = await reader.getLogsParsed(event, {
            address: pckg.address,
            fromBlock: 'deployment',
            params: args
        });
        $console.log(`Loaded bold<${logs.length}> ${eventName} Events`);

        let blockDates = await BlockDateLoader.load(this.app.chain.client, logs);

        function formatFromOutput(path: string) {
            if (path == null) {
                return null;
            }
            return /\.(?<ext>\w+)$/.exec(path)?.groups.ext;
        }

        let format = params.format ?? formatFromOutput(params.output) ?? 'json';
        $require.oneOf(format, ['csv', 'json']);

        let str: string = '';
        if (format === 'json') {
            let json = logs.map(log => ({
                block: {
                    number: log.blockNumber,
                    date: blockDates[log.blockNumber]
                },
                transactionHash: log.transactionHash,
                event: log.event,
                params: log.params
            }));
            str = JSON.stringify(json, null, '  ');
        }
        if (format === 'csv') {
            let headers = [ 'Block', 'Date', 'Tx', 'Event', ...event.inputs.map(x => x.name) ].join(', ');
            let rows = logs.map(log => {
                let row = [
                    log.blockNumber,
                    blockDates[log.blockNumber]?.toISOString() ?? '',
                    log.transactionHash,
                    log.event,
                    ...log.arguments.map(arg => arg.value)
                ];
                return row.join(', ');
            });
            str = `${ headers }\n${ rows.join('\n') }`;
        }
        let output = params.output ?? `./cache/${eventName}_${pckg.address}.${ format }`;
        let file = new File(output);

        $console.log(`Loaded bold<green<${logs.length}>> Logs`);
        await file.writeAsync(str, { skipHooks: true });
        $console.log(`File cyan<${ file.uri.toString() }>`);
    }
    async dump (nameOrAddress: string | TAddress, params: { output?: string }) {
        let _address: TAddress;
        // file-output without extensions ()
        let _output: string
        if ($is.Address(nameOrAddress)) {
            _address = nameOrAddress;
            _output = params.output;
        } else {
            let pckg = await this.getPackage(nameOrAddress);
            _address = pckg.address;
            _output = params.output ?? `./dump/${pckg.name}/storage`
        }

        $require.String(_output, 'Output file not defined');

        let dump = new SlotsDump({
            address: _address,
            client: this.app.chain.client,
            explorer: this.app.chain.explorer,
        });

        let data = await dump.getStorage();
        let csv = data.memory.map(x => x.join(', ')).join('\n');
        let json = data.json;

        let csvFile = new File(`${_output}.csv`);
        let jsonFile = new File(`${_output}.json`);

        await Promise.all([
            csvFile.writeAsync(csv),
            jsonFile.writeAsync(json),
        ]);
        $console.table([
            [ 'Slots', csvFile.uri.toString() ],
            [ 'JSON', jsonFile.uri.toString() ],
        ])
    }

    async slot (nameOrAddress: string | TAddress, slot: string) {
        let address = await this.getAddress(nameOrAddress);
        let slotValue = await this.app.chain.client.getStorageAt(address, slot);
        console.log(slotValue);
    }

    private async getAddress(nameOrAddress): Promise<TAddress> {
        if ($is.Address(nameOrAddress)) {
            return nameOrAddress;
        }
        let pckg = await this.getPackage(nameOrAddress);
        return pckg.address;
    }

    private async $read (pckg: IPackageItem, abi: AbiItem, params: ICallParams) {
        let address = params.address ?? pckg.address;
        $require.Address(address, 'Contracts address invalid');

        let args = await this.getArguments(abi, params);
        let reader = await this.getContractReader(params);
        let result = await reader.readAsync(address, abi, ...args);

        let output = result != null && typeof result === 'object'
            ? JSON.stringify(result, null, '  ')
            : result;
        $console.log(output);
    }
    private async getContractReader (params) {
        let reader = di.resolve(ContractReader, this.app.chain.client);
        if (params.block) {
            let block: number | Date;
            if (/^\d+$/.test(params.block)) {
                block = Number(params.block)
            } else {
                block = new Date(params.block);
                if (isNaN(block.valueOf())) {
                    throw new Error(`Date format is invalid ${params.block}`);
                }
            }
            reader.forBlock(block);
        }
        return reader;
    }
    private async $write (pckg: IPackageItem, abi: AbiItem, params: ICallParams) {
        let args = await this.getArguments(abi, params);
        let writer = await this.getContractWriter(pckg, abi, params);

        let accounts = di.resolve(AccountsService, this.app.config);
        let account = await accounts.get(params.account);

        let writerConfig = <ITxWriterOptions> {

        };
        if ($account.isSafe(account) && params.safeTransport) {
            let sender: ChainAccount = $account.getSender(account);
            if (sender.key == null) {
                sender = await accounts.get(sender.address ?? sender.name) as ChainAccount;
            }
            writerConfig.safeTransport = new FileServiceTransport(this.app.chain.client, sender, params.safeTransport);
        }

        let tx = await writer.writeAsync(account, abi, args, {
            builderConfig: <ITxConfig> {
                nonce: params.nonce
            },
            writerConfig,
        });
        let receipt = await tx.onCompleted;
        $console.log(!receipt.status ? `red<bold<Failed>>` : `green<bold<OK>> ${receipt.transactionHash}`);
    }
    private async getContractWriter (pckg: IPackageItem, abi: AbiItem, params: ICallParams) {

        let logParser = di.resolve(TxTopicInMemoryProvider);
        logParser.register(abi);

        let writer = di.resolve(ContractWriter, params.address ?? pckg.address, this.app.chain.client);
        return writer;
    }
    private async getArguments (abi: AbiItem, params) {
        let args = await alot(abi.inputs).mapAsync(async x => {
            return this.getArgument(x, params);
        }).toArrayAsync({ threads: 1 });
        return args;
    }
    private async getArgument (abi: AbiInput, params) {
        if (abi.components != null) {
            $console.log('gray<Object input>');
            $console.table(abi.components.map(x => {
                return [ x.name, x.type ];
            }));

            let obj = {};
            for (let key in params) {
                let keyPrfx = `${abi.name}.`;
                if (key.startsWith(keyPrfx)) {
                    let subKey = key.replace(keyPrfx, '');
                    obj[subKey] = params[key];
                }
            }

            let arr = await alot(abi.components).mapAsync(async x => {
                let value:any = await this.getArgument(x, obj);
                return {
                    key: x.name,
                    value: value
                };
            }).toArrayAsync({ threads: 1 });

            return alot(arr).toDictionary(x => x.key, x => x.value);
        }
        let val = params[abi.name];
        if (val != null) {
            return val;
        }
        return $cli.ask(`Value for bold<${abi.name}> gray<(>bold<blue<${abi.type}>>gray<)>: `, abi.type);
    }
    private async getPackage (name: string) {
        let packageService = di.resolve(PackageService, this.app.chain);
        let pckg = await packageService.getPackage(name);
        if (pckg == null) {
            throw new Error(`Package ${name} not found. gray<0xweb c list> to view all installed contracts`);
        }
        return pckg;
    }
    private async getAbi(pckg: IPackageItem) {
        let abi = await File.readAsync<AbiItem[]>(pckg.main.replace('.ts', '.json'));
        return abi;
    }
    private stringifyAbi (abi: AbiItem) {
        let str = GeneratorFromAbi.Gen.serializeMethodAbi(abi, true);
        let line = '  ' + str.replace('function', '').trim();

        line = line.replace('returns', 'gray<returns>');
        line = line.replace(/(address|string|u?int\d+|bytes)/g, 'bold<blue<$1>>');
        line = line.replace(/([()])/g, 'green<$1>');
        return line;
    }
}


namespace BlockDateLoader {
    export async function load (client: Web3Client, logs: ITxLogItem[]) {
        let blockNrs = alot(logs).map(x => x.blockNumber).distinct().toArray();
        let min = alot(blockNrs).min(x => x);
        let max = alot(blockNrs).max(x => x);
        let MAX_REQ = 50;
        let MIN_STEP = 100;
        let step = Math.max(MIN_STEP, Math.floor((max - min) / MAX_REQ));

        let nrs = alot
            .fromRange(0, MAX_REQ)
            .map(i => min + (step * i))
            .filter(x => x < max)
            .toArray();

        nrs.push(max);

        let blocks = await client.getBlocks(nrs);
        $console.log(`Loaded bold<${blockNrs.length}> block dates by approx ${nrs.length}`);


        let knownDates = alot(blocks).map(block => [block.number, Number(block.timestamp)] as const).toArray();

        let dates = alot(blockNrs).map(nr => {
            let a: (typeof knownDates[0]);
            let b: (typeof knownDates[0]);
            for (let i = 0; i < knownDates.length - 1; i++) {
                a = knownDates[i];
                b = knownDates[i + 1];
                let [ aNr, aTime ] = a;
                let [ bNr, bTime ] = b;
                if (aNr >= nr && nr <= bNr) {
                    break;
                }
            }
            let [ aNr, aTime ] = a;
            let [ bNr, bTime ] = b;
            let avg = (bTime - aTime) / (bNr - aNr);

            let startTime = aTime;
            let rangeTime = (nr - aNr) * avg;
            let time = startTime + rangeTime;

            return [nr, time];
        })
        .toDictionary(x => x[0], x => new Date(Number(x[1]) * 1000))

        return dates;
    }
}
