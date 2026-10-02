import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { App } from '@core/app/App';
import { RpcService } from '@core/services/RpcService';
import { $logger } from '@dequanto/utils/$logger';

/**
 * Call any RPC method, e.g. https://www.quicknode.com/docs/ethereum/eth_getStorageAt
 */
export function CRpc() {
    return <ICommand> {
        command: 'rpc',
        description: [
            'Call an RPC method'
        ],
        arguments: [
            {
                name: 'RpcMethodName',
                description: 'RPC method name'
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
            '--arg0': {
                description: 'First RPC argument. In the CLI, this can also be a positional argument',
                required: false
            },
            '--arg1': {
                description: 'Second RPC argument. In the CLI, this can also be a positional argument',
                required: false
            }
        },
        api: {},
        async process(args: any[], params?, app?: App) {
            let service = new RpcService(app);
            let result = await service.process(args, params, app);
            return result;
        }
    }
}
