import { run } from 'shellbee'

UTest({
    async 'check gas' () {
        let { stdout } = await run(`node ./index.js gas --chain polygon`);
        has_(stdout.join(''), /[\d\.]+\s*gwei/i);
    }
})
