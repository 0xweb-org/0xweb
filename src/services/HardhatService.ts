import alot from 'alot';
import { Directory, File } from 'atma-io';
import { PackageService } from './PackageService';
import { IPlatformTools } from '@dequanto/chains/PlatformFactory';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $require } from '@dequanto/utils/$require';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { ContractVerifier } from '@dequanto/explorer/ContractVerifier';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';
import { Constructor } from 'atma-utils';
import { IContractWrapped } from '@dequanto/contracts/ContractClassFactory';
import { ContractBase } from '@dequanto/contracts/ContractBase';
import { TEth } from '@dequanto/models/TEth';
import { $abiInput } from '@core/utils/$abiInput';
import { $path } from '@dequanto/utils/$path';

export class HardhatService {
    constructor (public chain: IPlatformTools) {

    }

    async compile (mix: string, opts?: {
        install?: string
    }) {
        let source = await this.getCompilationSource(mix);
        let provider = new HardhatProvider();

        let isFile = $path.hasExt(mix);
        if (isFile) {
            let result = await provider.compileSol(source.path, {
                contractName: source.contractName,
                tsgen: true,
                install: opts?.install
            });
            return [ result ].filter(Boolean);
        }

        let result = await provider.compileSolDirectory(source.path, {
            contractName: source.contractName,
            tsgen: true,
            install: opts?.install
        });
        return result.filter(Boolean);
    }

    async deploy (mix: string, params: {
        account: string
        proxy?: boolean
        verify?: boolean
        name?: string
        [key: `arg${number}`]: any
    }): Promise<{
        contract: ContractBase,
        contractReceipt?: TEth.TxReceipt,
    }> {

        let accounts = new ChainAccountService()
        let account = await accounts.get(params.account);
        $require.notNull(account?.address, `Account ${ params.account } not resolved`);
        let withProxy = Boolean(params.proxy);

        let ProxyData = {
            Proxy: null,
            ProxyAdmin: null,
            Beacon: {
                Beacon: null,
                BeaconProxy: null,
            }
        }
        if (withProxy) {
            let proxyContracts = await this.getOpenzeppelinUpgradable({ beacon: false });

            ProxyData.Proxy = proxyContracts.TransparentUpgradeableProxy;
            ProxyData.ProxyAdmin = proxyContracts.ProxyAdmin;
            ProxyData.Beacon.Beacon = proxyContracts.Beacon;
            ProxyData.Beacon.BeaconProxy = proxyContracts.BeaconProxy;
        }

        let deployments = new Deployments(this.chain.client, account, {
            directory: './0xc/deployments/',
            ...ProxyData
        })

        let [ compilation ] = await this.compile(mix);
        let { ContractCtor, source, abi } = compilation;
        let ctorAbi = abi.find(x => x.type === 'constructor');
        let args = ctorAbi == null
            ? []
            : await $abiInput.parseArgumentsFromCli(ctorAbi as TEth.Abi.Item, params);

        let id = params.name ?? source.contractName;
        if (withProxy) {
            return await deployments.ensureWithProxy(ContractCtor, {
                id,
                name: source.contractName,
                initialize: args.length === 0 ? null : args,
                verification: params?.verify ?? true
            });
        }

        return await deployments.ensure(ContractCtor, {
            id,
            arguments: args.length === 0 ? null : args,
            verification: params?.verify ?? true
        });
    }

    async verify (params: { id?: string, address?: TEth.Address }) {
        let deployments = new Deployments(this.chain.client, null);
        await deployments.verify({
            id: params.id,
            address: params.address,
        });
    }

    private async getOpenzeppelinUpgradable (opts?: { proxy?: boolean, beacon?: boolean }) {
        // We can't compile OpenZeppelin's contracts directly from node_modules folder, so create the wrappers
        const baseSource = `./node_modules/@openzeppelin/contracts/proxy`;
        const baseOutput = `./contracts/oz`;
        const deps = {
            TransparentUpgradeableProxy: `@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol`,
            ProxyAdmin: `@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol`,
            Beacon: `@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol`,
            BeaconProxy: `@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol`,
        };
        const paths = {
            TransparentUpgradeableProxy: {
                source: `${baseSource}/transparent/TransparentUpgradeableProxy.sol`,
                output: `${baseOutput}/Proxy.sol`,
                template: `
                    import \"${deps.TransparentUpgradeableProxy}\";
                `,
                //install: `TransparentUpgradeableProxy,ProxyAdmin`,
                contracts: [`TransparentUpgradeableProxy`,`ProxyAdmin`]
            },
            Beacon: {
                source: `${baseSource}/beacon/UpgradeableBeacon.sol`,
                output: `${baseOutput}/Beacon.sol`,
                template: `
                    import \"${deps.Beacon}\";
                `,
                //install: `UpgradeableBeacon,BeaconProxy`,
                contracts: [`UpgradeableBeacon`,`BeaconProxy`],
            }
        };

        if (opts?.beacon === false) {
            delete paths.Beacon;
        }
        if (opts?.proxy === false) {
            delete paths.TransparentUpgradeableProxy;
        }

        function fmt (template: string) {
            let match = /^ +/m.exec(template);
            return template.trim().replace(new RegExp(`^${match[0]}`, 'gm'), '');
        }

        let provider = new HardhatProvider();
        let contracts = await alot.fromObject(paths).mapMany(async entry => {
            let info = entry.value;
            let code = fmt(info.template);

            if (await File.existsAsync(info.output) === false) {
                await File.writeAsync(info.output, code);
            }
            await this.compile(info.output);

            return await alot(info.contracts)
                .mapAsync(async key => {
                    let compilation = await provider.getContractFromSolPath(deps[key]);
                    return {
                        key: key,
                        Ctor: compilation.ContractCtor
                    };
                })
                .toArrayAsync();
        }).toArrayAsync({ threads: 1 });

        return alot(contracts).toDictionary(x => x.key, x => x.Ctor) as {
            [K in keyof typeof deps]: Constructor<IContractWrapped>
        };
    }

    private async ensureSolidityVersion (solPath: string) {

    }

    /**
     * @param mix *.sol file, .../ directory or packageName
     */
    private async getCompilationSource (mix: string): Promise<{
        path: string
        contractName?: string
    }> {
        let isName = /^[\w_]+$/.test(mix);
        if (isName) {
            let pkgService = new PackageService();
            let pkg = await pkgService.getPackage(mix);
            $require.notNull(pkg, `Package "${mix}" not installed`);
            let tsMain = pkg.main;
            let $base = tsMain.replace(/[^\\/]+$/g, '');
            let files = await Directory.readFiles($base, '*.sol');
            if (files.length === 1) {
                return {
                    path: files[0].uri.toString(),
                    contractName: null
                }
            }
        }
        if ($path.hasExt(mix)) {
            let file = new File(mix);
            let path = file.uri.toString();
            if (await file.existsAsync() === false) {
                throw new Error(`File ${path} not found`);
            }
            return {
                path,
                contractName: null
            };
        }
        let dir = new Directory(mix);
        if (await dir.existsAsync() === false) {
            throw new Error(`Directory ${mix} not found`);
        }
        return {
            path: dir.uri.toString(),
            contractName: null
        };
    }

}
