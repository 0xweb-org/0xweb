import { run } from 'shellbee'

UTest({
    async 'check version' () {
        let { stdout } = await run(`node ./index.js -v`);
        has_(stdout.join(''), /0xweb@\d{1,2}\.\d{1,2}.\d{1,2}/);
    }
})
