import { $require } from '@dequanto/utils/$require';
import { $console } from '@core/utils/$console';
import { $validate } from '@core/utils/$validate';
import { $bigint } from '@dequanto/utils/$bigint';
import { ICommand } from '../ICommand';
import { $promise } from '@dequanto/utils/$promise';

export function CGas() {
    return <ICommand>{
        command: 'gas',
        description: [
            'Show gas price, latest block base fee, and suggested priority fee. JSON values are decimal strings in wei; unavailable fees are null.'
        ],
        params: {
            '--json': {
                description: 'Print gas prices as JSON in wei',
            },
            '-c, --chain': {
                description: `Default: eth. Available: ${$validate.platforms().join(', ')}`,
                default: 'eth'
            }
        },
        async process(args, params, app) {
            let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
            let client = chainTools.client;
            let gasData = await client.getGasPrice();
            let [block, priority] = await Promise.all([
                gasData.base == null
                    ? $promise.caught(client.getBlock('latest'))
                    : null,
                gasData.priority == null
                    ? $promise.caught(client.getGasPriorityFee())
                    : null,
            ]);
            let base = gasData.base ?? block?.result?.value?.baseFeePerGas ?? null;
            let tip = gasData.priority ?? priority?.result ?? null;
            let result = {
                chain: client.platform,
                price: gasData.price.toString(),
                base: base?.toString() ?? null,
                priority: tip?.toString() ?? null,
            };
            if (!$console.isJsonOnly()) {
                let format = (value: string | null) => value == null
                    ? 'Unavailable'
                    : $bigint.toGweiFromWei(BigInt(value)).toString() + ' gwei';
                $console.table([
                    ['Chain', result.chain],
                    ['Price', format(result.price)],
                    ['Base', format(result.base)],
                    ['Priority', format(result.priority)],
                ]);
            }
            return result;
        }
    };
}
