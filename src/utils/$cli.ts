import * as readline from 'readline';
import alot from 'alot';
import { $command } from '@core/commands/utils/$command';
import { $is } from '@dequanto/utils/$is';
import { $console } from './$console';
import { $color } from '@dequanto/utils/$color';

export namespace $cli {

    export function getParamValue(flag: string): string | null {
        let args = process.argv;

        let aliases = $command.getAliases(flag);
        return alot(aliases)
            .map(x => {
                let command = toCommand(x.name);
                let i = args.findIndex(x => toCommand(x) === command);
                if (i > -1) {
                    return args[i + 1];
                }
                return null;
            })
            .filter(x => x != null)
            .first();
    }

    export function ask(question: string, type?: string) {
        return new Promise(resolve => {
            rl.question($color(question), (answer) => {

                let { error, value } = parseInput(answer, type);
                if (value != null) {
                    resolve(value);
                    return;
                }
                $console.log(`red<Input Error:>  ${error.message}`);

                ask(question, type).then(resolve);
            });
        })
    }
    //export function askAbiInput ()

    // remove "-"(s) from start
    function toCommand(flag: string) {
        return flag.replace(/^\-+/, '');
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    function parseInput(input, type): { error?: Error, value?: any } {
        input = input.trim();

        if (!type) {
            return { value: input };
        }

        let rgxArray = /[(\d+)?]$/;
        if (rgxArray.test(type) && isBuffer(type) === false) {
            type = type.replace(rgxArray, '');
            let results = input.split(',').map(x => parseInput(x, type));
            let error = results.find(x => x.error)[0]?.error;
            if (error) {
                return { error };
            }
            return { value: results.map(x => x.value) }
        };

        if (type === 'address') {
            if ($is.Address(input) === false) {
                return { error: new Error(`Not an address`) }
            }
            return { value: input }
        }
        if (/int/.test(type)) {
            let isNumber = /^\-?\d+$/.test(input);
            if (isNumber == false) {
                isNumber = /^0x[a-fA-F0-9]+$/.test(input);
            }
            if ( isNumber === false) {
                return { error: new Error(`Not a number`) };
            }
            return { value: BigInt(input) };
        }
        if (isBuffer(type)) {

            let isHex = /^0x[a-fA-F0-9]+$/.test(input);
            if (isHex === false || input.length % 2 !== 0) {
                return { error: new Error(`Invalid HEX buffer string`) };
            }
            return { value: input }
        }
        if (type === 'bool') {
            if (/(true|1|yes)/i.test(input)) {
                return { value: true };
            }
            if (/(false|0|no)/i.test(input)) {
                return { value: false };
            }
            return { error: new Error(`Invalid Boolean. Expects on of: true, 1, yes, false, 0, no`) };
        }

        return { value: input };
    }

    function isBuffer (type: string) {
        return /byte/.test(type);
    }
}
