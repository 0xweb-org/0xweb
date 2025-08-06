import { TEth } from '@dequanto/models/TEth';

export namespace $fmt {
    export function addressAbbr (address: TEth.Address) {
        return '0×' + address.slice(2, 6) + ' ••• ' + address.slice(-4);
    }
}
