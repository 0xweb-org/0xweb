import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { run } from 'shellbee';


const ACCOUNTS_PATH = './test/bin/accounts.json';
const COMMAND = (params: string) => `node ./index.js accounts ${params} --config-accounts ${ACCOUNTS_PATH} -p 12345`
const cli = async (params: string) => {
    let { stdout, stderr } = await run(COMMAND(params));
    return stdout.join('\n');
};

UTest({
    async '$before' () {
        await File.removeAsync(ACCOUNTS_PATH);
    },
    async 'should add, list, remove account' () {
        let account = ChainAccountProvider.generate();

        l`> add`
        let addedStdout = await cli(`add -n foo -k ${account.key}`);
        has_(addedStdout, account.address);

        let jsonStr = await File.readAsync<string>(ACCOUNTS_PATH, { skipHooks: true });
        hasNot_(jsonStr, account.address);
        hasNot_(jsonStr, 'foo');

        l`> list`
        let listStdout = await cli('list');
        has_(listStdout, 'foo');
        has_(listStdout, account.address);


        l`> remove`
        let removeStdout = await cli('remove -n foo');
        hasNot_(removeStdout, 'foo');
        hasNot_(removeStdout, account.address);


        listStdout = await cli('list');
        hasNot_(listStdout, 'foo');
        hasNot_(listStdout, account.address);

        l`> Check encrypted key`
        let { stdout } = await run(`node index.js account view foo --pin 12345 --encrypted-key`);
        has_(stdout.join('\n'), `p1:0x`);
        hasNot_(stdout.join('\n'), account.key);
    }
})
