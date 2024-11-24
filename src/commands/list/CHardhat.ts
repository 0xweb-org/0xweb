import { ICommand } from '../ICommand';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { HardhatService } from '@core/services/HardhatService';
import { type App } from '@core/app/App';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { TransparentUpgradeableProxy } from '@dequanto/prebuilt/openzeppelin/compiled/TransparentUpgradeableProxy/TransparentUpgradeableProxy';
import { ProxyAdmin } from '@dequanto/prebuilt/openzeppelin/ProxyAdmin';
import { UpgradeableBeacon } from '@dequanto/prebuilt/openzeppelin/UpgradeableBeacon';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $tx } from '@core/utils/$tx';


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
                deployer: {
                    description: 'Address, Key or the Name of the account to deploy from',
                    required: true,
                },
                proxy: {
                    description: `Will use TransparentUpgradeableProxy for deploying contracts`,
                    required: false,
                    default: false
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
    ] as ICommand[]
}
