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
import memd from 'memd';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { IBlockChainExplorer } from '@dequanto/BlockchainExplorer/IBlockChainExplorer';
import { ContractAbiProvider } from '@dequanto/contracts/ContractAbiProvider';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { $account } from '@dequanto/utils/$account';
import { ChainAccount } from '@dequanto/models/TAccount';

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

    async call (name: string, method: string, params: ICallParams) {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);

        let abiItem = abi.find(x => x.name === method && x.type === 'function');
        if (abiItem == null) {
            throw new Error(`Method ${method} not found. gray<0xweb c abi <name>> to view available methods`);
        }

        let methodSignature = this.stringifyAbi(abiItem);
        let isRead = await  GeneratorFromAbi.Gen.isReader(abiItem);
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
            pckg = await packageService.getBuiltIn(name)
            if (pckg == null) {
                throw new Error(`Package ${name} not found. gray<0xweb c list> to view all installed contracts`);
            }
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
