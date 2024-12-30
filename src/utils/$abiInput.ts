import alot from 'alot';
import type { TEth } from '@dequanto/models/TEth';
import { $cli } from './$cli';
import { $abiType } from '@dequanto/utils/$abiType';
import { $types } from '@dequanto/solidity/utils/$types';
import { obj_getProperty, obj_setProperty } from 'atma-utils';
import { $bigint } from '@dequanto/utils/$bigint';
import { $require } from '@dequanto/utils/$require';
import { $address } from '@dequanto/utils/$address';
import { File } from 'atma-io';

export namespace $abiInput {
    interface IArgumentProvider {
        get (abi: TEth.Abi.Input): Promise<any>
    }

    const cliInputAsker = <IArgumentProvider> {
        get (abi) {
            return $cli.ask(`Value for bold<${abi.name}> gray<(>bold<blue<${abi.type}>>gray<)>: `, abi.type);
        }
    };
    const apiInputAsker = <IArgumentProvider> {
        get (abi) {
            throw new Error(`Value for "${abi.name}" as ${abi.type} not provided`);
        }
    };

    export async function parseArgumentsFromCli (abi: TEth.Abi.Item, params: Record<string, any>, opts?:{
        argumentProvider?: IArgumentProvider
        env?: 'api' | 'cli'
    }): Promise<any[]> {
        let argumentProvider = opts?.argumentProvider;
        if (argumentProvider == null && opts?.env != null) {
            argumentProvider = opts.env === 'api' ? apiInputAsker : cliInputAsker;
        }
        return getArguments(abi, params, argumentProvider);
    }

    async function getArguments (abi: TEth.Abi.Item, params: Record<string, any>, argumentProvider: IArgumentProvider) {
        let args = await alot(abi.inputs).mapAsync(async (x, i) => {
            let arg = await getArgument(x, i, params, argumentProvider);
            if (arg != null) {
                return deserialize(x, arg)
            }
            return arg;
        }).toArrayAsync({ threads: 1 });
        return args;
    }

    function deserialize (abi: TEth.Abi.Input, value: any) {
        if (abi.type === 'bool') {
            if (value == null || value === '') {
                return false;
            }
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true' || value === '1' || value === value;
            }
            return Boolean(value);
        }
        if (abi.type === 'address') {
            if (value == null || value === '') {
                return $address.ZERO;
            }
            return $require.Address(value, `${abi.name} should be a valid address`);
        }
        if (abi.type === 'string') {
            return String(value);
        }
        let bytesRgxMatch = /^bytes(?<size>\d+)$/.exec(abi.type);
        if (bytesRgxMatch != null) {
            // should be a hex string, but lets skip checks for now, in case it could be any other valid bytes input, like ArrayBuffer, etc.
            return value;
        }


        let numberRgxMatch = /^u?int(?<size>\d+)?$/.exec(abi.type);
        if (numberRgxMatch != null) {
            let size = Number(numberRgxMatch.groups?.size || '256');
            if (size <= 16) {
                return Number(value);
            }
            if (typeof value === 'number') {
                return BigInt(value);
            }
            return $bigint.parse(value);
        }


        if ($types.isArray(abi.type)) {
            $require.Array(value, `${abi.name} should be an array`);

            let abiItem = getArrayAbiItem(abi);
            return value.map(v => deserialize(abiItem, v));
        }

        if (Array.isArray(abi.components)) {
            if (value == null) {
                return null;
            }
            if (typeof value !== 'object') {
                throw new Error(`Argument "${abi.name}" is not an object(is ${typeof value})`);
            }

            return alot(abi.components).toDictionary(x => x.name, x => deserialize(x, value[x.name]));
        }

        return value;
    }

    function getArrayAbiItem (abi: TEth.Abi.Input) {
        let arrayBase = $abiType.array.getBaseType(abi.type);
        return {
            ...abi,
            type: arrayBase
        };
    }

    async function getValue (abi: TEth.Abi.Input, idx: number, params: Record<string, string>) {
        let pfx = getPfx(abi, idx, params);
        if (pfx == null) {
            return null;
        }

        let x = params[pfx];
        if (x != null) {
            if (isJsonInput(abi, x)) {
                return parseJsonInput(abi, x);
            }
            if (isCsvInput(abi, x)) {
                return parseCsvInput(abi, x);
            }
            if (isFileInput(x)) {
                return await loadFileInput(x);
            }
            return x;
        }

        let obj = {};
        for (let key in params) {
            if (key.startsWith(pfx + '.')) {
                let value = params[key];
                let property = key.substring(pfx.length + 1);
                obj_setProperty(obj, property, value);
            }
        }

        return obj;
    }

    function getPfx (abi: TEth.Abi.Input, idx: number, params: Record<string, string>) {
        let arr = [
            `arg${idx}`,
            `arg:${idx}`,
            `arg:${abi.name}`,
            `${abi.name}`
        ];
        for (let key in params) {
            for (let pfx of arr) {
                if (key.startsWith(pfx + '.') || key === pfx) {
                    return pfx;
                }
            }
        }
        return null;
    }
    function isJsonInput (abi: TEth.Abi.Input, value: string) {
        return (Array.isArray(abi.components) || $types.isArray(abi.type)) && typeof value === 'string' && (value[0] === '{' || value[0] === '[');
    }
    function parseJsonInput (abi: TEth.Abi.Input, value: string) {
        try {
            return JSON.parse(value);
        } catch (error) {
            throw new Error(`Argument "${abi.name}" ${value} is not a valid JSON string. ${ error.message }`);
        }
    }
    function isCsvInput (abi: TEth.Abi.Input, value: string) {
        return $types.isArray(abi.type) && typeof value ==='string' && value.includes(',');
    }
    function parseCsvInput (abi: TEth.Abi.Input, value: string) {
        return value.split(',').map(x => x.trim());
    }

    let rgxFileInput = /^load\((?<path>[^)]+\.\w+)\)(?<getter>[\.\w+]+)?$/
    function isFileInput (value: string) {
        return rgxFileInput.test(value);
    }
    async function loadFileInput (value: string) {
        let match = rgxFileInput.exec(value);
        let { path, getter } = match.groups!;
        let content = await File.readAsync(path);
        if (getter) {
            getter = getter.replace(/^\./g, '');
            return obj_getProperty(content, getter);
        }
        return content;
    }

    async function getArgument (abi: TEth.Abi.Input, idx: number, params: Record<string, string>, argumentProvider: IArgumentProvider) {
        let value = await getValue(abi, idx, params);
        if (value != null) {
            return value;
        }

        return await argumentProvider.get(abi);
    }
}
