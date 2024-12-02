import { ICommand } from '../ICommand';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { HardhatService } from '@core/services/HardhatService';
import { type App } from '@core/app/App';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { $tx } from '@core/utils/$tx';
import { Web3ClientFactory } from '@dequanto/clients/Web3ClientFactory';
import { $require } from '@dequanto/utils/$require';
import { $bigint } from '@dequanto/utils/$bigint';
import { $logger } from '@dequanto/utils/$logger';
import { TEth } from '@dequanto/models/TEth';
import { $is } from '@dequanto/utils/$is';


export function CHardhat() {
    return [
        {
            command: 'compile',
            description: [
                'Compile solidity files or installed packages'
            ],
            arguments: [
                { description: `file or package name` }
            ],
            params: {
                ...Parameters.chain({ required: false })
            },
            async process(args: string[], params: any, app: App) {

                let [ mix ] = args;
                let service = new HardhatService(app.chain);
                let result = await service.compile(mix);
                $console.table([
                    [ 'Compiled', result.output ]
                ]);
            }
        },
        {
            command: 'deploy',
            description: [
                'Deploy solidity files or installed packages'
            ],
            arguments: [
                { description: `file or package name` }
            ],
            params: {
                account: {
                    description: 'Address, Key or the Name of the account to deploy from',
                    required: true,
                },
                proxy: {
                    description: `Will use TransparentUpgradeableProxy for deploying contracts`,
                    required: false,
                    default: false
                },
                verify: {
                    description: `When deploying to public networks, verify the deployed contract`,
                    required: false,
                    default: true
                },
                name: {
                    description: 'Name the deployment, defaults to the contract name',
                    required: false,
                },
                ...Parameters.pin({ required: false }),
                ...Parameters.chain({ required: true }),
            },
            async process(args: string[], params: any, app: App) {

                let [ mix ] = args;
                let service = new HardhatService(app.chain);

                let { contract, contractReceipt } = await service.deploy(mix, params);
                if (contractReceipt) {
                    await $tx.log(
                        app.chain.client,
                        app.chain.explorer,
                        contractReceipt.transactionHash,
                        null,
                        contractReceipt,
                    );
                }

                $console.table([
                    [ 'Deployed', contract.address ]
                ]);
            }
        },
        {
            command: 'hardhat',
            description: [
                'Hardhat debug commands'
            ],
            subcommands: [
                {
                    command: 'setBalance',
                    description: ['Set account balance'],
                    arguments: [
                        {
                            description: 'Account address or name',
                            required: true,
                        },
                        {
                            description: 'Balance in wei, or formatted like 2.4ether, 3.7^18',
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
                            address = acc.address;
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
                    description: ['Impersonate Account'],
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
                    description: ['Stop Impersonating Account'],
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
                    description: ['Mines a specified number of blocks at a given interval (1 second)'],
                    arguments: [
                        {
                            description: 'Number of blocks or amount of seconds parsed from a timespan, e.g. 1day, 5minutes, 3weeks, etc',
                            required: true,
                        }
                    ],
                    async process (args, params, app) {
                        let [ address ] = args;
                        $require.Address(address);

                        let client = await Web3ClientFactory.getAsync('hardhat');
                        let blockNumberBefore = await client.getBlockNumber();
                        $logger.log(`Block number bold<${ $bigint.toEther(blockNumberBefore)}>`);

                        await client.debug.mine(address);

                        let blockNumberAfter = await client.getBlockNumber();
                        $logger.log(`Block number bold<${ $bigint.toEther(blockNumberAfter)}>`);
                    }
                }
            ]
        },
    ] as ICommand[]
}
