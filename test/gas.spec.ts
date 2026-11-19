import { CliUtils } from './CliUtils';

UTest({
    async 'check gas' () {
        let str = await CliUtils.fork(`gas --chain polygon`);
        has_(str, /[\d\.]+\s*gwei/i);
    }
})
