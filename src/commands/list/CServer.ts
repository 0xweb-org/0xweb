import { ICommand } from '../ICommand';
import { $promise } from '@dequanto/utils/$promise';
import { ServerService } from '@core/services/ServerService';
import type { App } from '@core/app/App';
import { TAppProcessResult } from '@core/app/types';


export function CServer() {
    return <ICommand>{
        command: 'server',
        description: [
            'API server'
        ],
        subcommands: [
            {
                command: 'start',
                description: [
                    'Launches the API server'
                ],
                arguments: [

                ],
                params: {
                    '--port': {
                        description: 'Port number for the API server',
                        type: 'number',
                        default: 3000
                    }
                },
                async process(args: string[], params: { port: number }, app: App) {

                    const service = new ServerService(app);
                    await service.start(params);
                    await $promise.wait(10 ** 9);

                    return { status: 'wait' } as TAppProcessResult
                }
            },
        ],
        params: {

        },

        async process(args: string[], params, app: App) {
            console.warn(`A sub-command for "server" not found: ${args[0]}. Call "0xweb server ?" to view the list of commands`);
        }
    };
}
