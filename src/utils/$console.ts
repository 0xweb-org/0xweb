import { $color } from './$color';
import * as rl from 'readline';
import alot from 'alot';

export namespace $console {

    let std = [] as {
        str: string
        isToast?: boolean
    }[];

    export function log(str: string) {
        if (typeof str !== 'string') {
            console.dir(str, { depth: null });
            return;
        }
        write({ str: $color(str) });
    }
    export function toast(str: string) {
        write({ str: $color(str), isToast: true });
    }

    export function table(arr: string[][]) {
        let lengths = arr[0].map((row, i) => {
            let size = alot(arr).max(x => x[i].length);
            return size;
        });

        let lines = arr.map(row => {
            return row
                .map((x, i) => {
                    let size = lengths[i];
                    let str = String(x).padEnd(size, ' ');
                    if (i % 2 === 1) {
                        str = `bold<${str}>`;
                    }
                    return str;
                })
                .join(' ');
        });

        log(lines.join('\n'));
    }

    function write(params: { str: string, isToast?: boolean }) {
        let prev = std[0];
        if (prev?.isToast) {
            rl.clearLine(process.stdout, 0);
            rl.cursorTo(process.stdout, 0, null);
        }
        if (params?.isToast) {
            process.stdout.write(params.str);
        } else {
            console.log(params.str);
        }

        std.unshift(params);
        if (std.length > 100) {
            std.splice(50);
        }
    }
}
