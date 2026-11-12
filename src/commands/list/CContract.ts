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
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the array of installed contracts as JSON to stdout'
                    },
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
                        name: 'NameOrAddress',
                        description: 'Name of an installed contract',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the ABI items as a JSON array to stdout'
                    },
                },
                api: {},
                async process(args, params, app) {
                    let [ name ] = args;

                    let service = di.resolve(ContractService, app);
                    let { abi, pkg } = await service.abi(name);

                    if (!$console.isJsonOnly()) {
                        let mix = await service.formatAbi(pkg, abi);
                        $console.result(mix);
                    }
                    return abi;
                }
            },
            {
                command: 'read',
                description: ['Read from a contract. Supply method arguments as CLI flags or enter them when prompted'],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: 'MethodOrAbi',
                        description: 'Method name or ABI signature',
                        required: true
                    },
                ],
                params: {
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    '--json': {
                        description: 'Print the contract read result as JSON to stdout'
                    },
                    '-b, --block': {
                        description: 'Block number to read from. Historical reads require an archive node. Default: latest'
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
                        name: 'NameOrAddress',
                        description: 'Name of an installed contract',
                        required: true
                    },
                    {
                        name: 'MethodOrAbi',
                        description: 'Method name or ABI, e.g. "approve(address spender, uint256 amount)"',
                        required: true
                    },
                ],
                params: {
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    '--json': {
                        description: 'Print the transaction receipt as JSON to stdout'
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
                    return await service.call(name, method, params, 'write');
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
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the transaction data object as JSON to stdout'
                    },
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
                        fallback: 'calldata',
                        description: 'Calldata as a hex string',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the decoded method and arguments as JSON to stdout'
                    },
                    '--calldata': {
                        description: 'Calldata to decode. Can also be supplied directly after the contract name'
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
                        name: 'NameOrAddress',
                        description: 'Name of an installed contract',
                        required: true
                    },
                    {
                        name: 'EventName',
                        description: 'Event name from the contract ABI',
                        required: true
                    }
                ],
                params: {
                    '-c, --chain': {
                        description: `Chain to use. Default: the installed contract's chain`
                    },
                    '--json': {
                        description: 'Print the full logs array as JSON to stdout; CSV format is returned as a JSON string'
                    },
                    '-o, --output': {
                        description: `Output file for event logs, or "std" for stdout. Default: std`
                    },
                    '--format': {
                        description: `Output format: csv or json`,
                        oneOf: [ 'csv', 'json' ]
                    },
                },
                async process(args, params, app) {
                    let [ name, eventName ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.logs(name, eventName, params);
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
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the storage model or generated file paths as JSON to stdout'
                    },
                    '--output': {
                        description: 'Output path without an extension; creates .csv and .json files. Use "std" for terminal output only'
                    },
                    '--sources': {
                        description: 'Solidity file or source directory. Defaults to installed sources or the blockchain explorer'
                    },
                    '--contract-name': {
                        description: 'Contract to select from the Solidity sources'
                    },
                    '--imp, --implementation': {
                        description: 'Implementation address',
                        type: 'address'
                    },
                    '--fields': {
                        description: 'Comma-separated state variables to include'
                    },
                },
                async process(args, params, app) {
                    let [ name ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.dump(name, params);
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
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the restore success result as JSON to stdout'
                    },
                    '-f, --file': {
                        description: 'Input .csv or .json file',
                        required: true,
                        validate: value => $require.True(/\.(csv|json)$/i.test(value ?? ''), 'Provide --file with a .csv or .json extension')
                    },
                    '--sources': {
                        description: 'Solidity file or source directory. Defaults to installed sources or the blockchain explorer'
                    },
                    '--contract-name': {
                        description: 'Contract to select from the Solidity sources'
                    },
                    '--imp, --implementation': {
                        description: 'Implementation address',
                        type: 'address'
                    },
                    '--fields': {
                        description: 'Comma-separated state variables to include'
                    },
                },
                async process(args, params, app) {
                    let [ name ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.dumpRestore(name, params);
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
                    ...Parameters.chain(),
                    '--json': {
                        description: 'Print the slot value or array of slot values as JSON to stdout'
                    },
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
                    '--json': {
                        description: 'Print the state variable value as JSON to stdout'
                    },
                    '--slot': {
                        description: 'Override the storage slot for this variable',
                        type: 'string'
                    },
                    '--type': {
                        description: 'Override the type of this variable',
                        type: 'string'
                    },
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
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                    {
                        name: 'Accessor',
                        description: 'State variable path, e.g. users[5].balance',
                        required: true
                    },
                    {
                        name: 'Value',
                        description: 'Value',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    '--json': {
                        description: 'Print the updated state variable value as JSON to stdout'
                    },
                },
                async process(args, params, app) {
                    let [ nameOrAddress, selector, value ] = args;
                    let service = di.resolve(ContractService, app);
                    return await service.varSet(nameOrAddress, selector, value, {
                        type: params.type,
                    });
                }
            },
            {
                command: 'vars',
                description: [ `List contract state variables` ],
                arguments: [
                    {
                        name: 'NameOrAddress',
                        description: 'Contract address or name of an installed contract',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain(),
                    '--json': {
                        description: 'Print the storage variable layout as a JSON array to stdout'
                    },
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
                        name: 'NameOrAddress',
                        description: 'Name of an installed contract',
                        required: true
                    },
                ],
                params: {
                    ...Parameters.chain(),
                    '-e, --event': {
                        description: 'Event name, or "*" for all events',
                        required: false
                    },
                    '-t, --tx': {
                        description: 'Method name, or "*" for all methods',
                    },
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
