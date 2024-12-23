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
                name: 'RpcMethodName',
                description: 'Method Name'
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
                description: '...',
                required: false
            }
        ],
        params: {
            ...Parameters.account({ required: false }),
            ...Parameters.chain(),
            '--arg0': {
                description: 'Api: Argument 1; Cli: simple arguments also supported',
                required: false
            },
            '--arg1': {
                description: 'Api: Argument 2; Cli: simple arguments also supported',
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
