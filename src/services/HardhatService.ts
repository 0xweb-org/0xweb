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

export class HardhatService {
    constructor (public chain: IPlatformTools) {

    }

    async compile (mix: string) {
        let source = await this.getCompilationSource(mix);
        let provider = new HardhatProvider();
        let result = await provider.compileSol(source.path, {
            contractName: source.contractName,
            tsgen: true
        });
        return result;
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

        let { ContractCtor, source, abi } = await this.compile(mix);
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

    async verify () {
        let deployments = new Deployments(this.chain.client, null);
        let verifier = new ContractVerifier(deployments, this.chain.explorer);
        verifier.ensure(Ctor)
    }

    private async getOpenzeppelinUpgradable (opts?: { proxy?: boolean, beacon?: boolean }) {
        // We can't compile OpenZeppelin's contracts directly from node_modules folder, so create the wrappers
        const baseSource = `./node_modules/@openzeppelin/contracts/proxy`;
        const baseOutput = `./contracts/oz`;
        const deps = {
            TransparentUpgradeableProxy: `'@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol'`,
            ProxyAdmin: `'@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol'`,
            Beacon: `'@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol'`,
            BeaconProxy: `'@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol'`,
        };
        const paths = {
            TransparentUpgradeableProxy: {
                source: `${baseSource}/transparent/TransparentUpgradeableProxy.sol`,
                output: `${baseOutput}/Proxy.sol`,
                template: `
                    pragma solidity ^0.8.20;
                    import { TransparentUpgradeableProxy } from ${deps.TransparentUpgradeableProxy};
                    contract Proxy is TransparentUpgradeableProxy {
                        constructor(address logic_, address owner_, bytes memory data_)
                            TransparentUpgradeableProxy(logic_, owner_, data_) {}
                    }
                `
            },
            ProxyAdmin: {
                source: `${baseSource}/transparent/ProxyAdmin.sol`,
                output: `${baseOutput}/ProxyAdmin.sol`,
                template: `
                    pragma solidity ^0.8.20;
                    import { ProxyAdmin as Admin } from ${deps.ProxyAdmin};
                    contract ProxyAdmin is Admin {
                        constructor(address owner_)
                            Admin(owner_) {}
                    }
                `
            },
            Beacon: {
                source: `${baseSource}/beacon/UpgradeableBeacon.sol`,
                output: `${baseOutput}/Beacon.sol`,
                template: `
                    pragma solidity ^0.8.20;
                    import { UpgradeableBeacon } from ${deps.Beacon};
                    contract Beacon is UpgradeableBeacon {
                        constructor(address implementation_, address owner_)
                            UpgradeableBeacon(implementation_, owner_) {}
                    }
                `
            },
            BeaconProxy: {
                source: `${baseSource}/beacon/BeaconProxy.sol`,
                output: `${baseOutput}/BeaconProxy.sol`,
                template: `
                    pragma solidity ^0.8.20;
                    import { BeaconProxy as Proxy } from ${deps.BeaconProxy};
                    contract BeaconProxy is Proxy {
                        constructor(address beacon_, bytes memory data_)
                            Proxy(beacon_, data_) {}
                    }
                `
            }
        };

        if (opts?.beacon === false) {
            delete paths.Beacon;
            delete paths.BeaconProxy;
        }
        if (opts?.proxy === false) {
            delete paths.ProxyAdmin;
            delete paths.TransparentUpgradeableProxy;
        }

        function fmt (template: string) {
            let match = /^ +/m.exec(template);
            return template.trim().replace(new RegExp(`^${match[0]}`, 'gm'), '');
        }

        let contracts = await alot.fromObject(paths).map(async entry => {
            let info = entry.value;
            let code = fmt(info.template);

            if (await File.existsAsync(info.output) === false) {
                await File.writeAsync(info.output, code);
            }
            let { ContractCtor  } = await this.compile(info.output);
            return {
                key: entry.key,
                Ctor: ContractCtor
            };
        }).toArrayAsync({ threads: 1 });

        return alot(contracts).toDictionary(x => x.key, x => x.Ctor) as {
            [K in keyof typeof paths]: Constructor<IContractWrapped>
        };
    }

    private async ensureSolidityVersion (solPath: string) {

    }

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

}
