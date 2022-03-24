export namespace CsvUtil {
    export function parse (str: string, delimiterChar?: string) {
        let arr = []

        let valueStart = 0;
        let quote = 34; //'"';
        let delimiter = delimiterChar?.charCodeAt(0) ?? 44; //',';
        let row = [];
        let state = State.row;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);

            if (c === quote) {
                if (state === State.row) {
                    // starts
                    valueStart = i + 1;
                    state = State.valueQuoted;
                    continue;
                }
                if (state === State.valueQuoted) {

                    // ends
                    row.push(str.substring(valueStart, i));
                    state = State.row;
                    continue;
                }
            }
            if (c === 10 /*'\n'*/ || c === 13 /*'\r'*/) {
                if (state === State.row) {
                    if (row.length > 0) {
                        arr.push(row);
                        row = [];
                        continue;
                    }
                }
            }
            if (c === delimiter) {
                if (state === State.valueSimple) {
                    // ends
                    row.push(str.substring(valueStart, i));
                    state = State.row;
                    continue;
                }
                continue;
            }
            if (c === 92 /* \ */) {
                i++;
                continue;
            }


            if (state === State.row && c > 32) {
                valueStart = i;
                state = State.valueSimple;
                continue;
            }
        }
        if (state === State.valueSimple) {
            row.push(str.substring(valueStart));
            state = State.row;
        }
        if (row.length) {
            arr.push(row);
        }

        return arr;
    }
}

enum State {
    row = 0,
    valueQuoted = 1,
    valueSimple = 2,
};
