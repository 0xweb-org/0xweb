import alot from 'alot'
import { App } from '@core/export'
import { $console } from '@core/utils/$console'
import { TAddress } from '@dequanto/models/TAddress'
import { SlotsDump } from '@dequanto/solidity/SlotsDump'
import { $is } from '@dequanto/utils/$is'
import { $require } from '@dequanto/utils/$require'
import { Directory, File } from 'atma-io'
import di from 'a-di'
import { PackageService } from './PackageService'
import { SlotsStorage } from '@dequanto/solidity/SlotsStorage'


export class IContractDumpServiceParams {
    output?: string
    implementation?: TAddress
    fields?: string
    sources?: string
    contractName?: string
    file?: string
}

export class ContractDumpService {

    constructor(public app: App) {

    }

    async dump (nameOrAddress: string | TAddress, params: IContractDumpServiceParams) {

        let { _address, _output, _implementation, _sources } = await this.getContractData(nameOrAddress, params);

        $require.String(_output, 'Output file not defined');
        $require.notNull(this.app.chain, `--chain not specified`);

        let dump = new SlotsDump({
            address: _address,
            implementation: _implementation,
            client: this.app.chain.client,
            explorer: this.app.chain.explorer,
            fields: params.fields?.split(',').map(x => x.trim()),
            sources: _sources,
            parser: {
                withConstants: true,
                withImmutables: true,
            }
        });

        let data = await dump.getStorage();
        let csv = data.memory.map(x => x.join(', ')).join('\n');
        let json = data.json;

        if (params.output !== 'std') {
            let csvFile = new File(`${_output}.csv`);
            let jsonFile = new File(`${_output}.json`);

            await Promise.all([
                csvFile.writeAsync(csv),
                jsonFile.writeAsync(json),
            ]);

            return {
                files: {
                    csv: csvFile.uri.toString(),
                    json: jsonFile.uri.toString()
                }
            };
        }
        return {
            json
        };
    }

    async dumpRestore(nameOrAddress: string, params: IContractDumpServiceParams) {
        let { _address, _output, _implementation, _sources } = await this.getContractData(nameOrAddress, params);
        let dump = new SlotsDump({
            address: _address,
            implementation: _implementation,
            client: this.app.chain.client,
            explorer: this.app.chain.explorer,
            fields: params.fields?.split(',').map(x => x.trim()),
            sources: _sources
        });

        if (/\.json$/.test(params.file)) {
            let json = await File.readAsync<any>(params.file);
            if (Array.isArray(json) && Array.isArray(json[0])) {
                let table = json;
                await dump.restoreStorageFromTable(table);
                return;
            }
            await dump.restoreStorageFromJSON(json);
            return;
        }
        if (/.csv$/.test(params.file)) {
            let csv = await File.readAsync<string>(params.file);
            let table = csv.split('\n').map(x => x.trim()).filter(Boolean).map(row => {
                return row.split(',').map(x => x.trim()).filter(Boolean);
            }) as [string,string][];
            await dump.restoreStorageFromTable(table)
            return;
        }
        throw new Error(`File not supported: ${params.file}`);
    }


    private async getContractData (nameOrAddress: string, params: IContractDumpServiceParams) {
        let _address: TAddress;
        let _implementation: TAddress;
        let _sources;
        let _sourcesPath = params.sources;
        let _contractName = params.contractName;

        // file-output without extensions ()
        let _output: string
        if ($is.Address(nameOrAddress)) {
            _address = nameOrAddress;
            _output = params.output;
        } else {
            let pkg = await this.getPackage(nameOrAddress);
            _address = pkg.address;
            _output = params.output ?? `./dump/${pkg.name}/storage`;
            _implementation = pkg.implementation ?? params.implementation;
            _sourcesPath ??= pkg.main.replace(/[^\/]+$/, `${pkg.name}/`);
            _contractName ??= pkg.contractName;

            await this.app.ensureChain(pkg.platform);
        }

        if (_sourcesPath != null) {
            let isFile = /\.sol$/.test(_sourcesPath);
            if (isFile === false) {
                let exists = await Directory.existsAsync(_sourcesPath);
                $require.True(exists, `Sources directory ${_sourcesPath} does not exist`);

                let files = await Directory.readFilesAsync(_sourcesPath, '**.sol');
                let filesContent = await alot(files).mapAsync(async file => {
                    return {
                        path: file.uri.toString(),
                        content: await file.readAsync(),
                    }
                }).toDictionaryAsync(x => x.path, x => ({ content: x.content }));
                _sources = {
                    files: filesContent,
                };
            } else {
                let file = new File(_sourcesPath);
                let exists = await file.existsAsync();
                $require.True(exists, `Sources file ${_sourcesPath} does not exist`);

                let path = file.uri.toString();
                let content = await file.readAsync <string> ();
                _sources = {
                    files: {
                        [ path ]: content,
                    },
                };
                if (_contractName == null) {
                    let rgx = /\bcontract \s*(?<contractName>\w+)/g;
                    do {
                        let match = rgx.exec(content);
                        if (match == null) {
                            break;
                        }
                        _contractName = match.groups.contractName;
                    } while (true);
                }
            }

            return {
                _output,
                _address,
                _implementation,
                _sources,
                //_sourcesPath,
                _contractName,
            };

        }
    }

    private async getPackage (name: string) {
        let packageService = di.resolve(PackageService, this.app.chain);
        let pkg = await packageService.getPackage(name);
        if (pkg == null) {
            throw new Error(`Package ${name} not found. gray<0xweb c list> to view all installed contracts`);
        }
        if (this.app.chain == null) {
            this.app.chain = packageService.chain;
        }
        return pkg;
    }
}
