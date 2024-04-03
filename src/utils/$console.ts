import * as rl from 'readline';
import alot from 'alot';
import { $color } from '@dequanto/utils/$color';
import { $logger } from '@dequanto/utils/$logger';

export namespace $console {

    export function log(str: string | any) {
        $logger.log(str)
    }
    export function result(str: string | any) {
        $logger.result(str);
    }
    export function error(str: string | any) {
        $logger.error(str);
    }

    export function toast(str: string) {
        $logger.toast(str);
    }

    export function table(arr: (string | number | bigint)[][]) {
        return $logger.table(arr)
    }
}
