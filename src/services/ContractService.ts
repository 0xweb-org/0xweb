import { IPlatformTools } from '@dequanto/chains/PlatformFactory';
import di from 'a-di';
import { File, env } from 'atma-io';
import { PackageService } from './PackageService';
import { AbiItem, AbiInput } from 'web3-utils'
import { GeneratorFromAbi } from '@dequanto/gen/GeneratorFromAbi';
import { IPackageItem } from '@core/models/IPackageJson';
import alot from 'alot';
import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { ContractReader } from '@dequanto/contracts/ContractReader';
import { TxTopicInMemoryProvider } from '@dequanto/txs/receipt/TxTopicInMemoryProvider';
import { ContractWriter } from '@dequanto/contracts/ContractWriter';
import { AccountsService } from './AccountsService';
import appcfg from 'appcfg';
import { TPlatform } from '@dequanto/models/TPlatform';
import { App } from '@core/app/App';
import { ITxConfig } from '@dequanto/txs/ITxConfig';
import { ITxWriterOptions } from '@dequanto/txs/TxWriter';

interface ICallParams {
    block?: string | number
    account?: string
    chain?: TPlatform
    nonce?: number
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

    async call (name: string, method: string, params: ICallParams) {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);

        let abiItem = abi.find(x => x.name === method && x.type === 'function');
        if (abiItem == null) {
            throw new Error(`Method ${method} not found. gray<web3m c abi <name>> to view available methods`);
        }

        let methodSignature = this.stringifyAbi(abiItem);
        let isRead = await  GeneratorFromAbi.Gen.isReader(abiItem);

        $console.log('')
        $console.table([
            ['Contract', pckg.address],
            ['Platform', pckg.platform],
            ['Action', isRead ? 'READ' : 'WRITE'],
            ['Method',  methodSignature.trim()],
        ]);
        $console.log('')

        if (isRead) {
            await this.$read(pckg, abiItem, params);
        }
    }

    private async $read (pckg: IPackageItem, abi: AbiItem, params) {
        let args = await this.getArguments(abi, params);
        let reader = await this.getContractReader(params);
        let result = await reader.readAsync(pckg.address, abi, ...args);

        $console.log(result);
    }
    private async getContractReader (params) {
        let reader = di.resolve(ContractReader, this.app.chain.client);
        if (params.block) {
            reader.forBlock(Number(params.block));
        }
        return reader;
    }

    private async $write (pckg: IPackageItem, abi: AbiItem, params: ICallParams) {
        let args = await this.getArguments(abi, params);
        let writer = await this.getContractWriter(pckg, abi, params);

        let accounts = di.resolve(AccountsService, this.app.config);
        let account = await accounts.get(params.account);

        let tx = await writer.writeAsync(account, abi, args, {
            builderConfig: <ITxConfig> {
                nonce: params.nonce
            },
            writerConfig: <ITxWriterOptions> {

            },
        });
        let receipt = await tx.onCompleted;
        $console.log(!receipt.status ? `red<bold<Failed>>` : `green<bold<OK>> ${receipt.transactionHash}`);
    }
    private async getContractWriter (pckg: IPackageItem, abi: AbiItem, params) {

        let logParser = di.resolve(TxTopicInMemoryProvider);
        logParser.register(abi);

        let writer = di.resolve(ContractWriter, pckg.address, this.app.chain.client);
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
                let value = await this.getArgument(x, obj);
                return {
                    key: x.name,
                    value: x.value
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
            throw new Error(`Package ${name} not found. gray<web3m c list> to view all installed contracts`);
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
