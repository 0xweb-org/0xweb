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
            'Send RPC method'
        ],
        arguments: [
            {
                description: 'Method Name'
            },
            {
                description: 'Argument 1',
                required: false
            },
            {
                description: 'Argument 2',
                required: false
            },
            {
                description: '...',
                required: false
            }
        ],
        params: {
            ...Parameters.account({ required: false }),
            ...Parameters.chain(),
        },
        async process(args: any[], params?, app?: App) {
            let service = new RpcService();
            let result = await service.process(args, params, app);
            if (typeof result !== 'object') {
                $logger.result(result);
                return;
            }
            $logger.result(JSON.stringify(result, null, 4));
        }
    }
}
