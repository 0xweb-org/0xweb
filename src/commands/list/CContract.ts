import di from 'a-di';
import { ICommand } from '../ICommand';
import { ContractService } from '@core/services/ContractService';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';


export function CContract() {
    return <ICommand>{
        command: 'c, contract',

        description: [
            `Contract actions`
        ],

        subcommands: [
            {
                command: 'abi',
                description: ['List of the available READ and WRITE methods for the contract'],
                arguments: [
                    {
                        description: 'Installed contract by name',
                        required: true
                    }
                ],
                params: {

                },
                async process(args, params, app) {
                    let [name] = args;

                    let service = di.resolve(ContractService, app);
                    let str = await service.abi(name);
                    $console.log(str);
                }
            },
            {
                command: 'read',
                description: ['READ contract. Parameters are resolved by cli flags or will be prompted.'],
                arguments: [
                    {
                        description: 'Installed contract by name',
                        required: true
                    },
                    {
                        description: 'Method name',
                        required: true
                    },
                ],
                params: {
                    '-b, --block': {
                        description: 'Default: Latest. If archive node is used, READ actions can be performed at specified block number.'
                    },
                    '-c, --chain': {
                        description: `Default: The chain will be taken from the installed contract. `
                    },
                    '--address': {
                        description: `Overwrite contracts address.`
                    },
                },
                async process(args, params, app) {
                    let [name, method] = args;
                    let service = di.resolve(ContractService, app);
                    await service.call(name, method, params, 'read');
                }
            },
            {
                command: 'write',
                description: ['Send a Transaction. Parameters are resolved by cli flags or will be prompted.'],
                arguments: [
                    {
                        description: 'Installed contract by name',
                        required: true
                    },
                    {
                        description: 'Method name or ABI, e.g.: 0xweb c read foo "decimals():uint16"',
                        required: true
                    }
                ],
                params: {
                    '-c, --chain': {
                        description: `Default: The chain will be taken from the installed contract. `
                    },
                    ...Parameters.account(),
                    ...Parameters.pin(),
                    '--nonce': {
                        description: 'Override nonce',
                        type: 'number'
                    },
                    '--safe-transport': {
                        description: `Optionally the file path for multisig signatures, if collected manually, as per default Gnosis Safe Service is used.`,
                    },
                },
                async process(args, params, app) {
                    let [name, method] = args;
                    let service = di.resolve(ContractService, app);
                    await service.call(name, method, params, 'write');
                }
            },
            {
                command: 'logs',
                description: [ 'Load the logs for the contract' ],
                arguments: [
                    {
                        description: 'Name of the installed contract',
                        required: true
                    },
                    {
                        description: 'Log name',
                        required: true
                    }
                ],
                params: {
                    '-c, --chain': {
                        description: `Default: The chain will be taken from the installed contract. `
                    },
                    '-o, --output': {
                        description: `Output file to save the logs data. Default: terminal output`
                    },
                    '--format': {
                        description: `Data format to output`,
                        default: 'csv',
                        oneOf: [ 'csv', 'json' ]
                    },

                },
                async process(args, params, app) {
                    let [ name, eventName ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.logs(name, eventName, params);
                }
            },
            {
                command: 'dump',
                description: [ `Save contract's complete data-set as raw slot-value file and as JSON model file` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    }
                ],
                params: {
                    '--output': {
                        description: 'Output file without extension, as 2 files will be generated the .csv and .json'
                    },
                    '--imp, --implementation': {
                        description: 'Implementation address'
                    },
                    '--fields': {
                        description: 'Comma separated variable names to restrict dump to specific variables.'
                    },
                    ...Parameters.chain({ required: false })
                },
                async process(args, params, app) {
                    let [ name ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.dump(name, params);
                }
            },
            {
                command: 'slot',
                description: [ `Read contracts slot` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    },
                    {
                        description: 'Locations hash',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain()
                },
                async process(args, params, app) {
                    let [ nameOrAddress, location ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.slot(nameOrAddress, location);
                }
            },
            {
                command: 'var',
                description: [ `Read contracts state variable` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    },
                    {
                        description: 'Accessor selector. Supports JSON-a-like paths, e.g: users[5].balance',
                        required: true
                    },

                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                async process(args, params, app) {
                    let [ nameOrAddress, selector ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.varLoad(nameOrAddress, selector);
                }
            },
            {
                command: 'vars',
                description: [ `Get list of state variables` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain()
                },
                async process(args, params, app) {
                    let [ nameOrAddress ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.varList(nameOrAddress);
                }
            },
        ],

        async process(args: string[], params: IInstallParams) {

        }
    };
}

interface IInstallParams {
    name: string
    implementation: string
    chain: string
    output: string
}
