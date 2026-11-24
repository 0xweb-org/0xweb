import { $require } from '@dequanto/utils/$require';
import type { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { IWeb3ClientStatus } from '@dequanto/clients/interfaces/IWeb3ClientStatus';
import { ICommand } from '../ICommand';
import alot from 'alot';

export function CInfo() {
    return <ICommand>{
        command: 'info',
        description: [
            'Show network information'
        ],
        subcommands: [
            {
                command: 'network',
                description: [
                    'Show network details'
                ],
                params: {
                    ...Parameters.chain(),
                    '--json': { description: 'Print the chain and node statuses, including syncing details and errors, as JSON' },
                },
                async process(args, params, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let client = chainTools.client;
                    let info: IWeb3ClientStatus[] = await client.getNodeInfos();

                    let result = {
                        chain: client.platform,
                        nodes: info.map(node => ({
                            ...node,
                            ...(node.error ? { error: { name: node.error.name, message: node.error.message } } : {}),
                        })),
                    };
                    if ($console.isJsonOnly() || app.config?.env === 'api') return result;

                    $console.table([
                        [
                            'Nr.',
                            'URL',
                            'Current_Block',
                            'Highest_Block',
                            'Status',
                            'Syncing',
                            'Ping',
                            'Peers',
                            'Node'
                        ],
                        ...alot(info).mapMany(info => {

                            let currentBlock = info.blockNumber;
                            let highestBlock = currentBlock + (info.blockNumberBehind ?? 0);
                            let diffBlock = highestBlock - currentBlock;
                            let status = info.status;
                            let syncingStr = '—';
                            let currentBlockStr = '—';
                            let highestBlockStr = '—';

                            if (info.syncing) {
                                currentBlock = info.syncing.currentBlock;
                                highestBlock = Math.max(info.syncing.highestBlock);
                                diffBlock = highestBlock - currentBlock;
                                status = 'sync';

                                let stages = (info.syncing.stages ?? []) as { stage_name: string, block_number: string | number }[];

                                let chars = alot(stages).max(x => x.stage_name.length);

                                syncingStr = stages
                                    .map(stage => `${ stage.stage_name.padEnd(chars, ' ') } ${ Number(stage.block_number) }`)
                                    .join('\n');
                            }

                            if (currentBlock != null) {
                                currentBlockStr = currentBlock + (diffBlock !== 0 ? ` (${-diffBlock})` : '');
                                highestBlockStr = highestBlock + '';
                            }

                            let infoRow = [
                                info.i,
                                info.url,
                                currentBlockStr,
                                highestBlockStr,
                                status,
                                syncingStr,
                                info.pingMs != null ? info.pingMs + 'ms' : '',
                                info.peers,
                                (info.node ?? '—')
                            ];
                            let rows = [ infoRow ]
                            if (info.error?.message) {
                                rows.push([ info.error.message ]);
                                rows.push(['']);
                            }

                            return rows;
                        }).toArray()
                    ]);
                    return result;
                }
            }
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}
