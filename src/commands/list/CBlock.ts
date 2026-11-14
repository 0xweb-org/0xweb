import { ICommand } from '../ICommand';
import { type App } from '@core/app/App';
import { Parameters } from '@core/utils/Parameters';
import { BlockService } from '@core/services/BlockService';


export function CBlock() {
    return <ICommand> {
        command: 'block',
        description: [
            'Block utilities'
        ],
        subcommands: [
            {
                command: 'get',
                description: [
                    'Get block information by date or number. Date lookup is approximate and may return a block before or after the requested time'
                ],
                arguments: [
                    {
                        name: 'NumberOrDate',
                        description: `Nonnegative block number, "latest", or a date. Prefer ISO with a timezone, e.g. "2024-01-20T14:00:37Z". "20.01.2024 14:00:37" uses local time`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain(),
                    '--json': {
                        description: 'Print the block object as JSON, including number, hash, timestamp (Unix seconds), and transactions',
                    },
                },
                api: {},
                async process(args: string[], params: any, app: App) {

                    let service = new BlockService(app);
                    let [ blockNr ] = args;
                    return service.getBlock(blockNr);
                }
            },
        ],
        params: {

        },

        async process(args: string[], params, app: App) {
            throw new Error(`Unknown block subcommand: ${args[0] ?? '(missing)'}. Call "0xweb block --help" to view the list of commands`);
        }
    };
}
