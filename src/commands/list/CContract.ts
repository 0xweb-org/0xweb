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
            `Interact with contracts`
        ],

        subcommands: [
            {
                command: 'list',
                description: ['List installed contracts'],
                arguments: [],
                params: {
                    ...Parameters.chain({ required: false })
                },
                api: {},
                async process(args, params, app) {

                    let service = di.resolve(ContractService, app);
                    let pkgs = await service.printList(params);
                    return pkgs;
                }
            },
            {
                command: 'abi',
                description: ['List the read and write methods available on a contract'],
                arguments: [
                    {
                        name: 'Name',
                        description: 'Name of an installed contract',
                        required: true
                    }
                ],
                params: {},
                api: {},
                async process(args, params, app) {
                    let [ name ] = args;

                    let service = di.resolve(ContractService, app);
                    let { abi, pkg } = await service.abi(name);
                    let str = await service.formatAbi(pkg, abi);
                    $console.result(str);
                    return abi;
                }
            },
            {
                command: 'read',
                description: ['Read from a contract. Supply method arguments as CLI flags or enter them when prompted'],
                arguments: [
                    {
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        description: 'Method name',
                        required: true
                    },
                ],
                params: {
                    '-b, --block': {
                        description: 'Block number to read from. Historical reads require an archive node. Default: latest'
                    },
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    '--address': {
                        type: 'address',
                        description: `Override the contract address`
                    },
                    '--account': {
                        description: `Account to use as the caller`
                    },
                    '--abi': {
                        description: `ABI string to parse`
                    },
                },
                api: {},
                async process(args, params, app) {
                    let [ nameOrAddress , method] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.call(nameOrAddress, method, params, 'read');
                }
            },
            {
                command: 'write',
                description: ['Send a contract transaction. Supply method arguments as CLI flags or enter them when prompted'],
                arguments: [
                    {
                        description: 'Name of an installed contract',
                        required: true
                    },
                    {
                        description: 'Method name or ABI, e.g. "approve(address spender, uint256 amount)"',
                        required: true
                    },
                ],
                params: {
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    ...Parameters.account(),
                    ...Parameters.pin(),
                    '--nonce': {
                        description: 'Override the transaction nonce',
                        type: 'number'
                    },
                    '--safe-transport': {
                        description: `File path for manually collected multisig signatures. Default: Gnosis Safe Service`,
                    },
                    '--abi': {
                        description: `ABI string to parse`
                    },
                },
                async process(args, params, app) {
                    let [name, method] = args;
                    let service = di.resolve(ContractService, app);
                    await service.call(name, method, params, 'write');
                },
                api: {
                    method: 'post',
                    async process(args, params, app) {
                        let [name, method] = args;
                        let service = di.resolve(ContractService, app);
                        return await service.call(name, method, params, 'write');
                    },
                }
            },
            {
                command: 'calldata',
                description: ['Encode transaction calldata. Supply method arguments as CLI flags or enter them when prompted'],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: "MethodOrAbi",
                        description: 'Method name or ABI, e.g. "approve(address spender, uint256 amount)"',
                        required: true
                    }
                ],
                params: {
                    '--abi': {
                        description: 'ABI string (useful for API requests)',
                    }
                },
                api: {},
                async process(args, params, app) {
                    let [name, method] = args;
                    let service = di.resolve(ContractService, app);
                    let data = await service.calldata(name, method, params);
                    return data;
                }
            },
            {
                command: 'calldata-parse',
                description: [ 'Decode hex calldata using the contract ABI' ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: 'calldata',
                        query: true,
                        description: 'Calldata as a hex string',
                        required: true
                    },
                ],
                params: {
                    '--calldata': {
                        description: 'Calldata to decode. In the CLI, this can also be a positional argument'
                    }
                },
                api: {},
                async process(args, params, app) {
                    let [ name, calldata ] = args;
                    if (params.calldata) {
                        calldata = params.calldata;
                    }
                    $require.Hex(calldata, `Calldata must be a hex string`);
                    let service = di.resolve(ContractService, app);
                    let json = await service.calldataParse(name, calldata);
                    return json;
                },
            },
            {
                command: 'logs',
                description: [ 'Fetch event logs for a contract' ],
                arguments: [
                    {
                        description: 'Name of an installed contract',
                        required: true
                    },
                    {
                        description: 'Event name, or "*" for all events',
                        required: true
                    }
                ],
                params: {
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    '-o, --output': {
                        description: `Output file for event logs. Default: terminal output`
                    },
                    '--format': {
                        description: `Output format: csv or json`,
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
                description: [ `Save contract storage as raw slot values in CSV and as a JSON model` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    }
                ],
                params: {
                    '--output': {
                        description: 'Output path without an extension; creates .csv and .json files. Use "std" for terminal output only'
                    },
                    '--sources': {
                        description: `Solidity file or local source directory. If omitted, sources are fetched from the blockchain explorer`
                    },
                    '--contract-name': {
                        description: 'Contract name to select when the source is a directory'
                    },
                    '--imp, --implementation': {
                        description: 'Implementation address'
                    },
                    '--fields': {
                        description: 'Comma-separated names of the state variables to include'
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
                description: [ `Restore contract storage from a JSON or CSV dump on a Hardhat development network` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    }
                ],
                params: {
                    '-f, --file': {
                        description: 'Input .csv or .json file'
                    },
                    '--sources': {
                        description: `Solidity file or local source directory. If omitted, sources are fetched from the blockchain explorer`
                    },
                    '--contract-name': {
                        description: 'Contract name to select when the source is a directory'
                    },
                    '--imp, --implementation': {
                        description: 'Implementation address'
                    },
                    '--fields': {
                        description: 'Comma-separated names of the state variables to include'
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
                description: [ `Read contract storage slots` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: 'SlotOrRange',
                        description: 'Storage slot or range, e.g. 0-50',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain()
                },
                api: {},
                async process(args, params, app) {
                    let [ nameOrAddress, location ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.slot(nameOrAddress, location);
                }
            },
            {
                command: 'var',
                description: [ `Read a contract state variable` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: 'Accessor',
                        description: 'State variable path, e.g. users[5].balance',
                        required: true
                    },

                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    slot: {
                        description: 'Override the storage slot for this variable',
                        type: 'number'
                    },
                    type: {
                        description: 'Override the type of this variable',
                        type: 'string'
                    },
                    offset: {
                        description: 'Storage offset to use when reading',
                        type: 'string'
                    }
                },
                api: {},
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
                description: [ `Set a contract state variable. Hardhat networks only` ],
                arguments: [
                    {
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        description: 'State variable path, e.g. users[5].balance',
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
                        description: 'Override the type of this variable',
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
                description: [ `List contract state variables` ],
                arguments: [
                    {
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain()
                },
                api: {},
                async process(args, params, app) {
                    let [ nameOrAddress ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.varList(nameOrAddress);
                }
            },
            {
                command: 'watch',
                description: [ `Monitor contract logs` ],
                arguments: [
                    {
                        description: 'Name of an installed contract',
                        required: true
                    },
                ],
                params: {
                    '-e, --event': {
                        description: 'Event name, or "*" for all events',
                        required: false
                    },
                    '-t, --tx': {
                        description: 'Method name, or "*" for all methods',
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
