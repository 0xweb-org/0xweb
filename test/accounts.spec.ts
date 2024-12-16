import { config } from '@dequanto/config/Config';
import { l } from '@dequanto/utils/$logger';
import { $sig } from '@dequanto/utils/$sig';
import { File } from 'atma-io';
import { run } from 'shellbee';


const ACCOUNTS_PATH = './test/bin/accounts.json';
const ACCOUNT_PATH = './0xc/config/account.json';
const COMMAND_RAW = (params) => `node ./index.js ${params}`;
const COMMAND = (params) => COMMAND_RAW(`${params} --config-accounts ${ACCOUNTS_PATH} -p 12345`);
const cli = async (params: string) => {
    let { stdout, stderr } = await run(COMMAND(params));
    return stdout.join('\n');
};
const cliRaw = async (params: string) => {
    let { stdout, stderr } = await run(COMMAND_RAW(params));
    return stdout.join('\n');
};

UTest({
    async '$before' () {
        await File.removeAsync(ACCOUNTS_PATH);
        await File.removeAsync(ACCOUNT_PATH);
    },
    async 'should add, list, remove account' () {
        let account = $sig.$account.generate();

        l`> add`
        let addedStdout = await cli(`accounts add -n foo -k ${account.key}`);
        has_(addedStdout, account.address);

        let jsonStr = await File.readAsync<string>(ACCOUNTS_PATH, { skipHooks: true });
        hasNot_(jsonStr, account.address);
        hasNot_(jsonStr, 'foo');

        l`> list`
        let listStdout = await cli('accounts list');
        has_(listStdout, 'foo');
        has_(listStdout, account.address);

        l`> Check encrypted key`
        let str = await cli(`account view foo --encrypted-key`);
        has_(str, `p1:0x`);
        hasNot_(str, account.key);

        l`> Decrypt key`
        let key = /p1:0x[a-f\d]+/.exec(str)[0];

        config.pin = '12345';

        let address = await $sig.$account.getAddressFromKey(key as any);
        eq_(address, account.address);

        l`> Set default`
        let strDefaults = await cli(`accounts login foo`);
        has_(strDefaults, account.address);

        l`> Get default`
        let strDefaultsCurrent = await cliRaw(`account current -p 12345`);


        has_(strDefaultsCurrent, account.address);


        l`> remove`
        let removeStdout = await cli('accounts remove -n foo');
        hasNot_(removeStdout, 'foo');
        hasNot_(removeStdout, account.address);


        listStdout = await cli('accounts list');
        hasNot_(listStdout, 'foo');
        hasNot_(listStdout, account.address);
    }
})
