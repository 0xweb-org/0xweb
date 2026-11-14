import { App } from '@core/app/App';
import { $bigint } from '@dequanto/utils/$bigint';
import { $require } from '@dequanto/utils/$require';
import { BaseService } from './BaseService';
import { $console } from '@core/utils/$console';

export class RpcService extends BaseService {
    async process(args: any[], params?: Record<string, any>, app?: App) {

        let client = $require.notNull(app?.chain, `Chain not initialized`).client;
        let [ method, ...methodArgs ] = args as [ string, ...any[]];
        $require.True(typeof method === 'string' && method.trim().length > 0, 'Provide an RPC method name');

        let indexedArgs = new Map(methodArgs.map((value, index) => [index, value]));

        for (let key in params) {
            let argMatch = /^arg(?<index>\d+)$/.exec(key);
            if (argMatch) {
                let index = Number(argMatch[1]);
                $require.True(Number.isSafeInteger(index), `Invalid RPC argument index: ${key}`);
                indexedArgs.set(index, params[key]);
            }
        }

        methodArgs = [...indexedArgs].sort(([a], [b]) => a - b).map(([index, arg], expectedIndex) => {
            $require.True(index === expectedIndex && arg !== undefined, `Missing RPC argument --arg${expectedIndex}`);
            try {
                return this.parseArgument(arg);
            } catch (error) {
                throw new Error(`Invalid RPC argument --arg${index}: ${error.message}`);
            }
        });

        let result = await client.with(async wClient => {
            let rpc = wClient.rpc;
            if (method in rpc.fns === false) {
                rpc.extend([{
                    name: method,
                    call: method,
                }]);
            }
            let result = await rpc.fns[method](...methodArgs);
            return result;
        });

        if (!$console.isJsonOnly()) {
            if (typeof result !== 'object') {
                this.printResult(result);
            } else {
                this.printResult(JSON.stringify(result, (_key, value) => {
                    return typeof value === 'bigint' ? value.toString() : value;
                }, 4));
            }
        }

        return result;
    }

    private parseArgument(arg: any) {
        if (typeof arg !== 'string') {
            return arg;
        }

        let prefix = /^(string|json|boolean|uint\d*):/.exec(arg);
        let type = prefix?.[1];
        let str = prefix == null ? arg : arg.slice(prefix[0].length);
        if (type === 'string') {
            return str;
        }
        if (type === 'json' || (type == null && /^\s*[\[{]/.test(str))) {
            return JSON.parse(str);
        }
        if (type == null) {
            if (str === 'null') {
                return null;
            }
            type = /^\d+$/.test(str) ? 'uint256' : /^(true|false)$/i.test(str) ? 'boolean' : null;
        }
        if (type === 'boolean') {
            str = str.toLowerCase();
            if ('true' === str || '1' === str) {
                return true;
            }
            if ('false' === str || '0' === str) {
                return false;
            }
            throw new Error(`Invalid boolean value: ${str}`);
        }
        if (type?.startsWith('uint')) {
            let bits = Number(type.slice(4) || 256);
            $require.True(bits >= 8 && bits <= 256 && bits % 8 === 0, `Invalid unsigned integer type: ${type}`);
            $require.True(/^(\d+|0x[\da-f]+)$/i.test(str), `Expected an unsigned integer for ${type}`);

            let num = BigInt(str);
            $require.True(num < (1n << BigInt(bits)), `Value exceeds ${type}`);
            return $bigint.toHex(num);
        }

        return str;
    }
}
