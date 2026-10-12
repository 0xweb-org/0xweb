import { $logger } from '@dequanto/utils/$logger';

export namespace $console {

    let jsonOnly = false;
    export function setJsonOnly(jsonOnly_: boolean) {
        jsonOnly = jsonOnly_;
    }

    export function log(str: string | any) {
        if (jsonOnly) {
            return;
        }
        $logger.log(str)
    }
    export function result(str: string | any) {
        if (jsonOnly) {
            return;
        }
        $logger.result(str);
    }
    export function error(str: string | any) {
        $logger.error(str);
    }

    export function toast(str: string) {
        if (jsonOnly) {
            return;
        }
        $logger.toast(str);
    }

    export function table(arr: (string | number | bigint)[][]) {
        if (jsonOnly) {
            return;
        }
        return $logger.table(arr)
    }

    export function json (mix: any) {
        console.log(stringify(mix));
    }

    function stringify (mix: any) {
        if (mix == null) {
            return 'null';
        }
        if (typeof mix === 'object') {
            return JSON.stringify(mix, function (_key, value) {
                if (typeof value !== 'bigint') {
                    return value;
                }
                if (value < Number.MAX_SAFE_INTEGER) {
                    return Number(value);
                }
                return value.toString();
            }, '    ');
        }
        if (typeof mix === 'bigint') {
            if (mix < Number.MAX_SAFE_INTEGER) {
                return Number(mix);
            }
            return '"' + mix.toString() + '"';
        }
        return JSON.stringify(mix);
    }
}
