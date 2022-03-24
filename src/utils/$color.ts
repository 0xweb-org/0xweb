export function $color (str: string) {
    return painter.paint(str, ColorData.ColorAscii);
}

namespace ColorData {

    export const ColorAscii = {
        type: 'ascii',
        START: '\u001b[',
        END: '\u001b[0m',

        value: {
            red: '31m',
            green: '32m',
            yellow: '33m',
            blue: '34m',
            magenta: '35m',
            cyan: '36m',
            white: '37m',
            black: '30m',

            gray: '90m',

            bg_black: '40m',
            bg_red: '41m',
            bg_green: '42m',
            bg_yellow: '43m',
            bg_blue: '44m',
            bg_magenta: '45m',
            bg_cyan: '46m',
            bg_white: '47m',

            bold: '1m',
            italic: '3m',
            underline: '4m',
            inverse: '7m'
        },
        start (key) {
            return this.START + this.value[key];
        },

        rgx_search: null as RegExp
    };
}


namespace painter {

    export function paint(str: string, colorData: typeof ColorData['ColorAscii']) {

        prepairColor(colorData);
        colorData.rgx_search.lastIndex = 0;

        var match,
            key,
            end,
            doRenew = colorData.type === 'ascii',
            stack = doRenew && [] || null,
            txt
            ;

        var out = '', last = 0;
        while (1) {
            match = colorData.rgx_search.exec(str);
            if (match == null)
                break;

            key = match[1];
            if (colorData.value[key] == null)
                continue;

            var index = match.index,
                bound = index + match[0].length,
                head, txt;

            if (last !== index)
                out += createRange(str, last, index, colorData);


            end = index_End(str, bound);
            last = end + 1;

            if (end === -1) {
                out += createRange(str, index, end, colorData);
                continue;
            }

            head = colorData.start(key);
            txt = str.substring(bound, end);
            txt = paint(txt, colorData);

            out += head
                + txt
                + colorData.END
                + (doRenew ? stack_renew(stack, end, colorData) : '')
                ;

            if (doRenew)
                stack.push({ end: end, key: key });

            colorData.rgx_search.lastIndex = end + 1;
        }

        if (last < str.length) {
            out += createRange(str, last, str.length, colorData);
        }

        return out;
    };

    function createRange(str, start, end, ColorData) {
        var txt = str.substring(start, end);
        if (ColorData.decorator)
            return ColorData.decorator(txt);

        return txt;
    }
    function index_End(str, start) {
        var count = 1,
            imax = str.length,
            i = start,
            c;
        for (; i < imax; i++) {
            c = str.charCodeAt(i);

            if (c === 60 /* < */)
                count++;
            if (c === 62 /* > */)
                count--;
            if (count === 0)
                return i;
        }
        return -1;
    }
    function stack_renew(stack, index, ColorData) {
        var str = '',
            imax = stack.length,
            i = -1, x;
        while (++i < imax) {
            x = stack[i];

            if (x.end < index)
                continue;
            str += ColorData.start(x.key);
        }
        return str;
    }
    function prepairColor(colorData: typeof ColorData['ColorAscii']) {
        if (colorData.rgx_search == null) {
            var str = '(';
            for (var key in colorData.value) {
                str += str === '(' ? key : '|' + key;
            }

            str += ')<';
            colorData.rgx_search = new RegExp(str, 'g');
        }
        return colorData;
    }
}
