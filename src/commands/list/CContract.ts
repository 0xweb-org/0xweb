import di from 'a-di';
import { ICommand } from '../ICommand';
import { ContractService } from '@core/services/ContractService';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Paramsters';


export const CContract = <ICommand> {
    command: 'c, contract',

    description: [
        `Contract actions`
    ],

    subcommands: [
        {
            command: 'abi',
            description: [ 'List of the available READ and WRITE methods for the contract' ],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                }
            ],
            params: {

            },
            async process (args, params, app) {
                let [name] = args;

                let service = di.resolve(ContractService, app);
                let str = await service.help(name);
                $console.log(str);
            }
        },
        {
            command: 'read',
            description: [ 'READ contract. Parameters are resolved by cli flags or will be prompted.' ],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                },
                {
                    description: 'Method name',
                    required: true
                }
            ],
            params: {
                '-b, --block': {
                    description: 'Default: Latest. If archive node is used, READ actions can be performed at specified block number.'
                },
                '-c, --chain': {
                    description: `Default: The chain will be taken from the installed contract. `
                },
            },
            async process (args, params, app) {
                let [name, method] = args;
                let service = di.resolve(ContractService, app);
                await service.call(name, method, params);
            }
        },
        {
            command: 'write',
            description: [ 'Send a Transaction. Parameters are resolved by cli flags or will be prompted.' ],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                },
                {
                    description: 'Method name',
                    required: true
                }
            ],
            params: {
                '-b, --block': {
                    description: 'Default: Latest. If archive node is used, READ actions can be performed at specified block number.'
                },
                '-c, --chain': {
                    description: `Default: The chain will be taken from the installed contract. `
                },
                '-a, --account': {
                    description: 'Account name. Accounts should be unlocked with gray<-p, --pin> parameter',
                    required: true,
                },
                ...Parameters.pin,
                '--nonce': {
                    description: 'Rewrite nonce',
                    type: 'number'
                }

            },
            async process (args, params, app) {
                let [name, method] = args;
                let service = di.resolve(ContractService, app);
                await service.call(name, method, params);
            }
        },
    ],

    async process (args: string[], params: IInstallParams) {

    }
}

interface IInstallParams {
    name: string
    proxyTarget: string
    chain: string
    output: string
}
