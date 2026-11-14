import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { $logger } from '@dequanto/utils/$logger';
import { $require } from '@dequanto/utils/$require';
import { $console } from '@core/utils/$console';
import { TEth } from '@dequanto/models/TEth';
import { AbiService } from '@core/services/AbiService';
import { $validate } from '@core/utils/$validate';


export function CAbi() {
    return <ICommand>{
        command: 'abi',

        description: [
            `ABI tools`
        ],

        subcommands: [
            {
                command: 'decode-calldata',
                description: [
                    'Decode function calldata using a supplied ABI or an ABI loaded from a blockchain explorer',
                    'Supply --abi with a signature, JSON ABI, file path, or contract address. Addresses require --chain',
                    'Example: 0xweb abi decode-calldata 0x70a082310000000000000000000000000000000000000000000000000000000000000000 --abi "balanceOf(address account)" --json',
                ],
                arguments: [
                    {
                        name: 'Calldata',
                        description: 'Hex calldata including the four-byte function selector',
                        required: true,
                        query: true,
                        fallback: 'calldata',
                    },
                ],
                params: {
                    '-c, --chain': {
                        description: 'Chain for the blockchain explorer. Required for an address ABI source',
                        oneOf: $validate.platforms(),
                    },
                    '--calldata': {
                        description: 'Calldata to decode, as an alternative to the positional argument',
                    },
                    '--abi': {
                        description: 'Function signature, JSON ABI item/array, file path, or contract address (requires --chain). Quote as one shell argument',
                    },
                    '--json': {
                        description: 'Print the decoded function name, positional args, and named params as JSON to stdout',
                    },
                },
                api: {},
                async process(args, params) {
                    let calldata = args[0] ?? params.calldata;
                    $require.True(typeof calldata === 'string' && /^0x[\da-f]{8}(?:[\da-f]{2})*$/i.test(calldata), 'Provide hex calldata containing a four-byte selector and complete bytes');
                    let items = await AbiService.load(params);

                    let selector = calldata.slice(0, 10).toLowerCase();
                    let matching = items.filter(item => item.type === 'function' && $abiUtils.getMethodSignature(item).toLowerCase() === selector);
                    $require.True(matching.length > 0, `No function in the supplied ABI matches selector ${selector}`);

                    let result = $abiUtils.parseMethodCallData(matching, calldata.toLowerCase() as TEth.Hex);
                    if (!$console.isJsonOnly()) {
                        $console.json(result);
                    }
                    return result;
                },
            },
            {
                command: 'decode-error',
                description: [
                    'Decode custom errors or built-in Error(string) and Panic(uint256) revert data. Built-in errors need no ABI source',
                    'Use --abi with a signature, JSON ABI, file path, or contract address. Addresses require --chain',
                ],
                arguments: [
                    { name: 'RevertData', description: 'Hex-encoded data', required: true, query: true, fallback: 'data' },
                ],
                params: {
                    '-c, --chain': {
                        description: 'Chain for the blockchain explorer. Required for an address ABI source',
                        oneOf: $validate.platforms(),
                    },
                    '--abi': {
                        description: 'Signature (include error/event keyword), JSON ABI item/array, file path, or contract address (requires --chain)',
                    },
                    '--data': {
                        description: 'Hex data as an alternative to the positional argument',
                    },
                    '--json': {
                        description: 'Print the decoded error name, positional args, and named params as JSON to stdout',
                    },
                },
                api: {},
                async process(args, params) {
                    let data = AbiService.hex(args[0] ?? params.data, true);
                    let result = AbiService.decodeError(data, await AbiService.load(params, true));
                    if (!$console.isJsonOnly()) {
                        $console.json(result);
                    }
                    return result;
                },
            },
            {
                command: 'decode-result',
                description: [
                    'Decode return data using function outputs. Use --method when the ABI contains multiple functions; return data has no selector',
                    'Use --abi with a signature, JSON ABI, file path, or contract address. Addresses require --chain',
                ],
                arguments: [
                    { name: 'ReturnData', description: 'Hex-encoded data', required: true, query: true, fallback: 'data' },
                ],
                params: {
                    '-c, --chain': {
                        description: 'Chain for the blockchain explorer. Required for an address ABI source',
                        oneOf: $validate.platforms(),
                    },
                    '--abi': {
                        description: 'Signature (include error/event keyword), JSON ABI item/array, file path, or contract address (requires --chain)',
                    },
                    '--data': {
                        description: 'Hex data as an alternative to the positional argument',
                    },
                    '--method': {
                        description: 'Function name or full signature to select, required when the function ABI is ambiguous',
                    },
                    '--json': {
                        description: 'Print the function name, positional output args, and named output params as JSON to stdout',
                    },
                },
                api: {},
                async process(args, params) {
                    let data = AbiService.hex(args[0] ?? params.data);
                    let result = AbiService.decodeResult(data, await AbiService.load(params), params.method);
                    if (!$console.isJsonOnly()) {
                        $console.json(result);
                    }
                    return result;
                },
            },
            {
                command: 'decode-log',
                description: [
                    'Decode event data and topics. Indexed strings, bytes, arrays, and tuples remain hashes. Anonymous events use topics without topic0',
                    'Use --abi with a signature, JSON ABI, file path, or contract address. Addresses require --chain',
                ],
                arguments: [
                    { name: 'EventData', description: 'Hex-encoded data', required: true, query: true, fallback: 'data' },
                ],
                params: {
                    '-c, --chain': {
                        description: 'Chain for the blockchain explorer. Required for an address ABI source',
                        oneOf: $validate.platforms(),
                    },
                    '--abi': {
                        description: 'Signature (include error/event keyword), JSON ABI item/array, file path, or contract address (requires --chain)',
                    },
                    '--data': {
                        description: 'Hex data as an alternative to the positional argument',
                    },
                    '--topics': {
                        description: 'JSON array of all log topics, including topic0 for non-anonymous events; use [] when there are no topics',
                    },
                    '--event': {
                        description: 'Event name or full signature to select when ambiguous, including anonymous events',
                    },
                    '--json': {
                        description: 'Print the event name, args in ABI order, and named params; indexed complex values remain hashes as JSON to stdout',
                    },
                },
                api: {},
                async process(args, params) {
                    let data = AbiService.hex(args[0] ?? params.data);
                    let result = AbiService.decodeLog(data, params.topics, await AbiService.load(params), params.event);
                    if (!$console.isJsonOnly()) {
                        $console.json(result);
                    }
                    return result;
                },
            },
            {
                command: 'topic0',
                description: ['Compute the topic0 hash for an event'],
                arguments: [
                    {
                        description: 'Event ABI',
                        name: 'event',
                        type:'string',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                api: {},
                async process(args, params, app) {
                    let [ event ] = args;

                    let abi = $abiParser.parseMethod(event.trim());
                    let topic0 = $abiUtils.getTopicSignature(abi);
                    $logger.log(`bold<${topic0}>`);
                    return topic0;
                }
            },
            {
                command: 'sig',
                description: ['Compute the selector for a function or error'],
                arguments: [
                    {
                        description: 'Function or error ABI',
                        name: 'sig',
                        type:'string',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                api: {},
                async process(args, params, app) {
                    let [ event ] = args;

                    let abi = $abiParser.parseMethod(event.trim());
                    let sig = $abiUtils.getMethodSignature(abi);
                    $logger.log(`bold<${sig}>`);
                    return sig;
                }
            }
        ],

        async process(args: string[], params) {

        }
    };
}
