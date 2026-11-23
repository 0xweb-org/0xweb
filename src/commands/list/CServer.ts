import { ICommand } from '../ICommand';
import { ServerService } from '@core/services/ServerService';
import { TAppProcessResult } from '@core/app/types';
import type { App } from '@core/app/App';


export function CServer() {
    return <ICommand>{
        command: 'server',
        description: [
            'HTTP API and MCP server'
        ],
        subcommands: [
            {
                command: 'start',
                description: [
                    'Start the API, MCP (/mcp), and UI server.'
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
                async process(args: string[], params: { port: number, dev: boolean }, app: App) {

                    //-app.config.debug = params.dev;
                    const service = new ServerService(app);
                    await service.start(params);
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
