import { ICommand } from '../ICommand';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { HardhatService } from '@core/services/HardhatService';
import { type App } from '@core/app/App';


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
                ...Parameters.pin({ required: false }),
                ...Parameters.chain({ required: true }),
            },
            async process(args: string[], params: any, app: App) {

                let [ mix ] = args;
                let service = new HardhatService(app.chain);
                let result = await service.deploy(mix, params);

                $console.table([
                    [ 'Deployed', result.contract.address ]
                ]);
            }
        },
    ] as ICommand[]
}
