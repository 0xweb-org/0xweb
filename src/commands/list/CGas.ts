import { $require } from '@dequanto/utils/$require';
import { $console } from '@core/utils/$console';
import { $validate } from '@core/utils/$validate';
import { $bigint } from '@dequanto/utils/$bigint';
import { ICommand } from '../ICommand';

export function CGas() {
    return <ICommand>{
        command: 'gas',
        description: [
            'Show the current gas price for a chain'
        ],
        params: {
            '-c, --chain': {
                description: `Default: eth. Available: ${$validate.platforms().join(', ')}`
            }
        },
        async process(args, params, app) {
            let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
            let gasData = await chainTools.client.getGasPrice();
            let gwei = $bigint.toGweiFromWei(gasData.price);
            $console.table([
                ['Chain', chainTools.client.platform],
                ['Price', gwei.toString() + ' gwei']
            ]);
        }
    };
}
