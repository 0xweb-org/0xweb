import di from 'a-di';
import { ICommand } from '../ICommand';
import { ContractService } from '@core/services/ContractService';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { $require } from '@dequanto/utils/$require';


export function CContract() {
    return <ICommand>{
        command: 'c, contract',

        description: [
            `Contract actions`
        ],

        subcommands: [
            {
                command: 'list',
                description: ['List installed contracts'],
                arguments: [

                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                async process(args, params, app) {

                    let service = di.resolve(ContractService, app);
                    let pkgs = await service.printList(params);
                    let rows = pkgs.map(x => [
                        x.name, x.address, x.platform
                    ]);
                    $console.table([
                        ['Name', 'Address', 'Platform (default)'],
                        ...rows
                    ]);
                    return rows;
                }
            },
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
                    $console.result(str);
                    return str;
                }
            },
            {
                command: 'read',
                description: ['READ contract. Parameters are resolved by cli flags or will be prompted.'],
                arguments: [
                    {
                        description: 'Address or the name of the installed contract',
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
                        type: 'address',
                        description: `Overwrite contracts address.`
                    },
                    '--account': {
                        type: 'address',
                        description: `Make call request from the account.`
                    },
                },
                async process(args, params, app) {
                    let [ nameOrAddress , method] = args;
                    let service = di.resolve(ContractService, app);
                    await service.call(nameOrAddress, method, params, 'read');
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
                command: 'calldata',
                description: ['Serialize transaction calldata. Parameters are resolved by cli flags or will be prompted.'],
                arguments: [
                    {
                        description: 'Installed contract by name or address',
                        required: true
                    },
                    {
                        description: 'Method name or ABI, e.g.: 0xweb c data foo "approve(address spender, uint256 amount)"',
                        required: true
                    }
                ],
                params: {

                },
                async process(args, params, app) {
                    let [name, method] = args;
                    let service = di.resolve(ContractService, app);
                    let json = await service.calldata(name, method, params);
                    $console.log(json);
                    return json;
                },

                subcommands: [
                    {
                        command: 'parse',
                        description: [ 'Parse hex calldata using contracts ABI' ],
                        arguments: [
                            {
                                description: 'Installed contract by name or address',
                                required: true
                            },
                            {
                                description: 'Hex',
                                required: true
                            },
                        ],
                        params: {

                        },
                        async process(args, params, app) {
                            let [ name, calldata ] = args;

                            $require.Hex(calldata, `Calldata must be a hex string`);
                            let service = di.resolve(ContractService, app);
                            let json = await service.calldataParse(name, calldata);
                            $console.log(json);
                            return json;
                        }
                    },

                ]
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
                        description: 'Log name, could be * for all events',
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
                        description: 'Output file without extension, as 2 files will be generated the .csv and .json, use "std" value to output to console only'
                    },
                    '--sources': {
                        description: `Optionally the solidity file or local directory with the solidity contracts, otherwise it will be fetched from blockchain explorer`
                    },
                    '--contract-name': {
                        description: 'Optionally the contract name, if directory is specified as source'
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
                command: 'dump-restore',
                description: [ `In development (Hardhat) chains it is possible to write storage back from a JSON or CSV dump` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    }
                ],
                params: {
                    '-f, --file': {
                        description: 'Input .csv or .json file'
                    },
                    '--sources': {
                        description: `Optionally the solidity file or local directory with the solidity contracts, otherwise it will be fetched from blockchain explorer`
                    },
                    '--contract-name': {
                        description: 'Optionally the contract name, if directory is specified as source'
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
                    await service.dumpRestore(name, params);
                }
            },
            {
                command: 'slot',
                description: [ `Read contracts slot` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Name of the installed contract or the Address',
                        required: true
                    },
                    {
                        name: 'SlotOrRange',
                        description: 'Locations hash. Except ranges, e.g.: 0-50',
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
                    ...Parameters.chain({ required: false }),
                    slot: {
                        description: 'Overrides the slot number for this variable',
                        type: 'number'
                    },
                    type: {
                        description: 'Overrides the type for this variable',
                        type: 'string'
                    },
                    offset: {
                        description: 'Reads with storage offset',
                        type: 'string'
                    }
                },
                async process(args, params, app) {
                    let [ nameOrAddress, selector ] = args;
                    let service = di.resolve(ContractService, app);
                    let value = await service.varLoad(nameOrAddress, selector, {
                        slot: params.slot,
                        type: params.type,
                        offset: params.offset,
                    });
                    return value;
                }
            },
            {
                command: 'var-set',
                description: [ `Sets contracts state variable. Hardhat network only` ],
                arguments: [
                    {
                        description: 'Name of the installed contract or the Address',
                        required: true
                    },
                    {
                        description: 'Accessor selector. Supports JSON-a-like paths, e.g: users[5].balance',
                        required: true
                    },
                    {
                        description: 'Value',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    type: {
                        description: 'Overrides the type for this variable',
                        type: 'string'
                    }
                },
                async process(args, params, app) {
                    let [ nameOrAddress, selector, value ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.varSet(nameOrAddress, selector, value, {
                        type: params.type,
                    });
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
            {
                command: 'watch',
                description: [ `Start LOG monitoring for the contract` ],
                arguments: [
                    {
                        description: 'Name of the installed contract',
                        required: true
                    },
                ],
                params: {
                    '-e, --event': {
                        description: 'Event name. Supports "*" selector',
                        required: false
                    },
                    '-t, --tx': {
                        description: 'Method name. Supports "*" selector',
                    },
                    ...Parameters.chain()
                },
                async process(args, params, app) {
                    let [ nameOrAddress ] = args;
                    let service = di.resolve(ContractService, app);
                    await service.watchLog(nameOrAddress, params);
                    // never exit
                    await new Promise(() => {});
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
