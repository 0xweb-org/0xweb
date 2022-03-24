import { run } from 'shellbee'

UTest({
    async 'check version' () {
        let { stdout } = await run(`node ./index.js -v`);
        has_(stdout.join(''), /web3m@\d{1,2}\.\d{1,2}.\d{1,2}/);
    }
})
