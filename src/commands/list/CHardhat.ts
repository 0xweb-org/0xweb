import { ICommand } from '../ICommand';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { HardhatService } from '@core/services/HardhatService';
import { type App } from '@core/app/App';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { Web3ClientFactory } from '@dequanto/clients/Web3ClientFactory';
import { $require } from '@dequanto/utils/$require';
import { $bigint } from '@dequanto/utils/$bigint';
import { $logger } from '@dequanto/utils/$logger';
import { TEth } from '@dequanto/models/TEth';
import { $is } from '@dequanto/utils/$is';
import { TxService } from '@core/services/TxService';
import { BlockchainExplorerFactory } from '@dequanto/explorer/BlockchainExplorerFactory';
import { ContractVerifier } from '@dequanto/explorer/ContractVerifier';


export function CHardhat() {
    return [
        {
            command: 'compile',
            description: [
                'Compile a Solidity file, directory, or installed package'
            ],
            arguments: [
                { description: `File path or package name` }
            ],
            params: {
                install: {
                    description: `Comma-separated names of contracts to install after compilation. Default: all`
                },
                ...Parameters.chain({ required: false })
            },
            async process(args: string[], params: any, app: App) {

                let [ mix ] = args;
                let service = new HardhatService(app);
                let results = await service.compile(mix, {
                    install: params.install
                });
                let rows = results.map(result => {
                    return [ '✅', result.output ]
                });
                if (rows.length > 0) {
                    $console.table([
                        ...rows
                    ]);
                }
            }
        },
        {
            command: 'deploy',
            description: [
                'Deploy contracts from Solidity files or installed packages'
            ],
            arguments: [
                { description: `File path or package name` }
            ],
            params: {
                proxy: {
                    description: `Deploy contracts through TransparentUpgradeableProxy`,
                    required: false,
                    default: false
                },
                verify: {
                    description: `Verify the deployed contract on public networks`,
                    required: false,
                    default: true
                },
                name: {
                    description: 'Deployment name. Default: the contract name',
                    required: false,
                },
                ...Parameters.pin({ required: false }),
                ...Parameters.chain({ required: true }),
                ...Parameters.account({ required: true})
            },
            async process(args: string[], params: any, app: App) {

                let [ mix ] = args;
                let service = new HardhatService(app);

                let { contract, contractReceipt } = await service.deploy(mix, params);
                if (contractReceipt) {
                    await TxService.printTx(app, contractReceipt.transactionHash, undefined, contractReceipt);
                }

                $console.table([
                    [ 'Deployed', contract.address ]
                ]);
            }
        },
        {
            command: 'verify',
            description: [
                'Verify a deployed contract using Hardhat artifacts. gray<Constructor arguments are parsed automatically from transaction data>'
            ],
            arguments: [
                { description: `Contract address` },
                { description: `Contract name` }
            ],
            params: {
                key: {
                    description: 'Override the configured API key'
                },
                api: {
                    description: 'Override the configured API URL'
                },
                ...Parameters.chain({ required: true })
            },
            async process(args: [TEth.Address, string], params: any, app: App) {
                let chainTools = $require.notNull(app?.chain, `Chain not initialized`);


                let [ address, name ] = args;
                let { client } = chainTools;
                let explorer = await BlockchainExplorerFactory.getAsync(client.platform, {
                    key: params.key,
                    api: params.api,
                });
                let verifier = new ContractVerifier({ client }, explorer);

                let contractInfo = await explorer.getContractCreation(address)
                let result = await verifier.ensure(name, {
                    address,
                    tx: contractInfo.txHash,
                });

                $console.table([
                    [ '✅ Verified', address ]
                ]);
            }
        },
        {
            command: 'hardhat',
            description: [
                'Hardhat debugging commands'
            ],
            subcommands: [
                {
                    command: 'setBalance',
                    description: ['Set an account balance'],
                    arguments: [
                        {
                            description: 'Account address or name',
                            required: true,
                        },
                        {
                            description: 'Balance in wei or a formatted value, e.g. 2.4ether or 3.7^18',
                            required: true
                        },
                    ],
                    async process (args, params, app) {
                        let [ accountMix, amount ] = args;
                        let address: TEth.Address;
                        if ($is.Address(accountMix)) {
                            address = accountMix;
                        } else {
                            let accounts = new ChainAccountService({

                            });
                            let acc = await accounts.get(accountMix);
                            $require.notNull(acc, `Account ${accountMix} not found`);
                            address = $require.notNull(acc.address, `Account ${accountMix} has no address`);
                        }

                        $require.Address(address, `Invalid address (${address}) for ${accountMix}`);

                        let amountWei = BigInt($bigint.parse(amount));
                        let client = await Web3ClientFactory.getAsync('hardhat');

                        let balanceBefore = await client.getBalance(address);
                        $logger.log(`Balance Before bold<${ $bigint.toEther(balanceBefore)}> ether`);

                        await client.debug.setBalance(address, amountWei)

                        let balanceAfter = await client.getBalance(address);
                        $logger.log(`Balance After bold<${ $bigint.toEther(balanceAfter)}> ether`);
                    }
                },
                {
                    command: 'impersonateAccount',
                    description: ['Impersonate an account'],
                    arguments: [
                        {
                            description: 'Account address',
                            required: true,
                        }
                    ],
                    async process (args, params, app) {
                        let [ address ] = args;
                        $require.Address(address);


                        let client = await Web3ClientFactory.getAsync('hardhat');

                        await client.debug.impersonateAccount(address);

                        $logger.log(`Impersonating Account ${address}`);
                    }
                },
                {
                    command: 'stopImpersonatingAccount',
                    description: ['Stop impersonating an account'],
                    arguments: [
                        {
                            description: 'Account address',
                            required: true,
                        }
                    ],
                    async process (args, params, app) {
                        let [ address ] = args;
                        $require.Address(address);

                        let client = await Web3ClientFactory.getAsync('hardhat');
                        await client.debug.stopImpersonatingAccount(address);

                        $logger.log(`Stopped Impersonating Account ${address}`);
                    }
                },
                {
                    command: 'mine',
                    description: ['Mine blocks at one-second intervals'],
                    arguments: [
                        {
                            name: 'CountOrDateRange',
                            description: 'Number of blocks, or a duration converted to seconds, e.g. 1day, 5minutes, or 3weeks',
                            required: true,
                        }
                    ],
                    async process (args, params, app) {
                        let [ toMine ] = args;
                        if (/^\d+$/.test(toMine)) {
                            toMine = Number(toMine);
                        }

                        let client = await Web3ClientFactory.getAsync('hardhat');
                        let blockNumberBefore = await client.getBlockNumber();
                        $logger.log(`Block number bold<${ $bigint.toEther(blockNumberBefore)}>`);

                        await client.debug.mine(toMine);

                        let blockNumberAfter = await client.getBlockNumber();
                        $logger.log(`Block number bold<${ $bigint.toEther(blockNumberAfter)}>`);
                    }
                }
            ]
        },
    ] as ICommand[]
}
