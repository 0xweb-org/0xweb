import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { $require } from '@dequanto/utils/$require';
import { $date } from '@dequanto/utils/$date';
import { $block } from '@dequanto/utils/$block';
import { $console } from '@core/utils/$console';
import { type App } from '@core/app/App';
import { BlockDateResolver } from '@dequanto/blocks/BlockDateResolver';
import { TEth } from '@dequanto/models/TEth';


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
                    { description: `latest or <blockNumber> or <date> e.g. "20.01.2024 14:00:00"` }
                ],
                params: {
                    '-c, --chain': {
                        description: `Default: eth. Available: ${$validate.platforms().join(', ')}`
                    },
                },
                async process(args: string[], params: any, app: App) {

                    let [blockNr] = args;
                    if (blockNr === 'latest') {
                        $console.toast('Getting latest block number...');
                        let nr = await app.chain.client.getBlockNumber();
                        blockNr = String(nr);
                    }

                    if (/[\.\-]\d+[\.\-]/.test(blockNr)) {
                        // Date 'xx.01.xxxx'
                        let date = $date.parse(blockNr);
                        if (date == null || isNaN(date.getTime())) {
                            throw new Error(`Could not parse date ${blockNr}`);
                        }
                        $console.toast(`Finding the block for ${date.toISOString()}`);
                        let resolver = new BlockDateResolver(app.chain.client);
                        let nr = await resolver.getBlockNumberFor(date);
                        blockNr = String(nr);
                    }

                    let nr = Number(blockNr);

                    $require.Number(nr, 'BlockNumber is not a number');
                    $console.toast(`Loading block bold<${nr}>`);

                    let block = await app.chain.client.getBlock(nr);
                    $console.table([
                        ['Block', nr],
                        ['Hash', block.hash],
                        ['Parent', block.parentHash],
                        ['Miner', block.miner],
                        ['Time', $date.format($block.getDate(block), 'dd.MM.yyyy HH:mm:ss') + ` gray<(${ block.timestamp })>`],
                        ['Transactions', block.transactions?.length ?? 0],
                    ]);
                    let hashes = block.transactions?.map((tx, i) => {
                        return [`#${i + 1}`, tx as TEth.Hex];
                    });
                    $console.table([
                        ...hashes
                    ]);
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
