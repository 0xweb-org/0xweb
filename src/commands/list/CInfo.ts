import type { App } from '@core/app/App';
import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Paramsters';
import { IWeb3ClientStatus } from '@dequanto/clients/interfaces/IWeb3ClientStatus';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';

export const CInfo: ICommand = {
    command: 'info',
    description: [
        'Show various information'
    ],
    subcommands: [
        {
            command: 'network',
            description: [
                'Show Network info'
            ],
            params: {
                ...Parameters.chain
            },
            async process (args, params, app: App) {
                let client = app.chain.client;
                let info: IWeb3ClientStatus[] = await client.getNodeInfos();

                $console.table([
                    [
                        'URL',
                        'Current Block',
                        'Status',
                        'Syncing',
                        'Ping',
                        'Peers'
                    ],
                    ...info.map(info => {
                        return [
                            info.url,
                            info.blockNumber,
                            info.status,
                            JSON.stringify(info.syncing),
                            info.pingMs,
                            info.peers,
                        ]
                    })
                ]);
            }
        }
    ],
    async process () {
        throw new Error(`Subcommand is not set`);
    }
}
