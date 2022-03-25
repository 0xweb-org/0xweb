import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { $require } from '@dequanto/utils/$require';
import { $date } from '@dequanto/utils/$date';
import { $block } from '@dequanto/utils/$block';
import { $console } from '@core/utils/$console';
import { type App } from '@core/app/App';



export const CBlock = <ICommand>{
    command: 'block',
    description: [
        'View blocks info.'
    ],
    subcommands: [
        {
            command: 'get',
            description: [
                'Get block'
            ],
            arguments: [
                { description: `latest or <blockNumber>` }
            ],
            params: {
                '-c, --chain': {
                    description: `Default: eth. Available: ${$validate.platforms.join(', ')}`
                },
            },
            async process (args: string[], params: any, app: App) {


                let [ blockNr ] = args;
                if (blockNr === 'latest') {
                    $console.toast('Getting latest block number...');
                    let nr = await app.chain.client.getBlockNumber();
                    blockNr = String(nr);
                }

                let nr = Number(blockNr);

                $require.Number(nr, 'BlockNumber is not a number');
                $console.toast(`Loading block bold<${nr}>`);

                let block = await app.chain.client.getBlock(nr);

                $console.table([
                    [ 'Block', nr],
                    [ 'Time', $date.format($block.getDate(block), 'dd-MM-yyyy HH:mm:ss') ],
                    [ 'Transactions', block.transactions.length ],
                ]);
            }
        },
    ],
    params: {

    },

    async process(args: string[], params, app: App) {
        console.warn(`Command for an "account" not found: ${args[0]}. Call "web3m accounts --help" to view the list of commands`);
    }
}
