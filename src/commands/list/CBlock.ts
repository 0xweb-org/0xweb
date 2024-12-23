import { ICommand } from '../ICommand';
import { type App } from '@core/app/App';
import { Parameters } from '@core/utils/Parameters';
import { BlockService } from '@core/services/BlockService';


export function CBlock() {
    return <ICommand> {
        command: 'block',
        description: [
            'Block utils'
        ],
        subcommands: [
            {
                command: 'get',
                description: [
                    'Get block info'
                ],
                arguments: [
                    {
                        name: 'NumberOrDate',
                        description: `latest or <blockNumber> or <date> e.g. "20.01.2024 14:00:00"`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain(),
                },
                api: {},
                async process(args: string[], params: any, app: App) {

                    let service = new BlockService(app);
                    let [ blockNr ] = args;
                    return service.getBlock(blockNr)
                }
            },
        ],
        params: {

        },

        async process(args: string[], params, app: App) {
            console.warn(`A sub-command for "block" not found: ${args[0]}. Call "0xweb block ?" to view the list of commands`);
        }
    };
}
