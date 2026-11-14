import { $require } from '@dequanto/utils/$require';
import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { App } from '@core/app/App';
import { RpcService } from '@core/services/RpcService';

/**
 * Call any RPC method, e.g. https://www.quicknode.com/docs/ethereum/eth_getStorageAt
 */
export function CRpc() {
    return <ICommand> {
        command: 'rpc',
        description: [
            'Call an RPC method. Supply arguments positionally or with --arg0, --arg1, ... --argN; flags override the corresponding positional values. Do not skip indices.',
            'Decimal integers become hex quantities; true/false become booleans. Quote JSON objects and arrays as a single argument. null is a JSON null.',
            'Explicit prefixes: string: (literal), json: (any JSON value), boolean: (true/false/1/0), uint: or uint8: through uint256: in steps of 8 (unsigned hex quantity). Other strings are preserved.',
            'Examples: 0xweb rpc eth_chainId --chain eth --json; 0xweb rpc eth_getBlockByNumber latest false --chain eth --json',
        ],
        arguments: [
            {
                name: 'RpcMethodName',
                description: 'RPC method name',
                required: true,
            },
            {
                query: true,
                description: 'Argument 1',
                required: false
            },
            {
                query: true,
                description: 'Argument 2',
                required: false
            },
            {
                query: true,
                description: 'Additional RPC arguments',
                required: false
            }
        ],
        params: {
            ...Parameters.account({ required: false }),
            ...Parameters.chain(),
            '--json': {
                description: 'Print one RPC result as JSON to stdout. Known RPC methods return dequanto-normalized values; large integers are decimal strings',
            },
            '--arg0': {
                description: 'First RPC argument. In the CLI, this can also be a positional argument',
                required: false
            },
            '--arg1': {
                description: 'Second RPC argument. In the CLI, this can also be a positional argument',
                required: false
            }
        },
        prepare(args, params) {
            $require.notEmpty(args[0]?.trim(), 'Provide an RPC method name');
            if (!process.stdin.isTTY) {
                $require.notEmpty(params.chain ?? params.c, 'Provide --chain for non-interactive RPC calls');
            }
        },
        api: {},
        async process(args: any[], params?, app?: App) {
            app = $require.notNull(app, `Application not initialized`);
            let service = new RpcService(app);
            let result = await service.process(args, params, app);
            return result;
        }
    }
}
