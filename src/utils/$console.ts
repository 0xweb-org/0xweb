import * as rl from 'readline';
import alot from 'alot';
import { $color } from '@dequanto/utils/$color';

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
        write({ str });
    }
    export function toast(str: string) {
        write({ str, isToast: true });
    }

    export function table(arr: (string | number)[][]) {

        arr = arr.filter(x => x != null && x.length > 0);

        let lengths = arr[0].map((row, i) => {
            let size = alot(arr).max(x => {
                let str = String(x[i]);
                let lines = str.split('\n');
                return alot(lines).max(x => x.length);
            });
            return size;
        });


        let lines = arr.map(row => {

            let multiLines = row.map(x => String(x).split('\n'));
            let multiLinesCount = alot(multiLines).max(x => x.length);
            return alot
                .fromRange(0, multiLinesCount)
                .map(y => {

                    return row.map((_, i) => {
                        let x = multiLines[i][y];
                        let size = lengths[i];
                        let str = String(x ?? '').padEnd(size, ' ');
                        if (i % 2 === 1) {
                            str = `bold<${str}>`;
                        }
                        return str;
                    })
                    .join(' ');
                })
                .toArray()
                .join('\n')
        });

        log(lines.join('\n'));
    }

    function write(params: { str: string, isToast?: boolean }) {
        let prev = std[0];
        if (prev?.isToast) {
            rl.clearLine(process.stdout, 0);
            rl.cursorTo(process.stdout, 0, null);

            rl.moveCursor(process.stdout, 0, -1);
            rl.clearLine(process.stdout, 0);
        }
        if (params?.isToast) {
            process.stdout.write( $color(params.str) + '\n' );
        } else {
            console.log( $color(params.str) );
        }

        std.unshift(params);
        if (std.length > 100) {
            std.splice(50);
        }
    }
}
