import { $console } from '@core/utils/$console';
import { $validate } from '@core/utils/$validate';
import { $bigint } from '@dequanto/utils/$bigint';
import { ICommand } from '../ICommand';

export const CGas: ICommand = {
    command: 'gas',
    description: [
        'Print current GAS price for a chain'
    ],
    params: {
        '-c, --chain': {
            description: `Default: eth. Available: ${$validate.platforms().join(', ')}`
        }
    },
    async process (args, params, app) {
        let gasData = await app.chain.client.getGasPrice();
        let gwei = $bigint.toGweiFromWei(gasData.price);
        $console.table([
            ['Chain', app.chain.client.platform],
            ['Price', gwei.toString() + ' gwei']
        ]);
    }
}
