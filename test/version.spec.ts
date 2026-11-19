import { CliUtils } from './CliUtils';

UTest({
    async 'check version' () {
        let str = await CliUtils.fork(`-v`);
        has_(str, /0xweb@\d{1,2}\.\d{1,2}.\d{1,2}/);
    }
})
