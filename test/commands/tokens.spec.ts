import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { run } from 'shellbee';
import alot from 'alot';
import { $bigint } from '@dequanto/utils/$bigint';
import { $address } from '@dequanto/utils/$address';

const ACCOUNTS_PATH = './test/bin/accounts.json';
const CONFIG_PATH = './test/bin/config.json';

const cliEx = async (command: string, params: any) => {
    params = {
        '--config-accounts': ACCOUNTS_PATH,
        '--config-global': CONFIG_PATH,
        '--pin': '12345',
        '--chain': 'hardhat',
        '--color': 'none',
        ...params
    };
    let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
    let cmdStr = `node ./index.js ${command} ${paramsStr}`;
    let { stdout } = await run({
        command: cmdStr,
        silent: true,
    })
    return stdout.join('\n');
};


UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before' () {
        await File.removeAsync(CONFIG_PATH);
    },
    async 'add, find, remove token' () {

        l`Adding token to storage`;
        let stdAddOne = await cliEx(`tokens add`, {
            '--symbol': 'FRT',
            '--address': $address.ZERO,
            '--chain': 'hardhat'
        });

        let json = await File.readAsync <any> (CONFIG_PATH);
        deepEq_(json.tokens, [
            {
                symbol: 'FRT',
                platforms: [
                    {
                        platform: 'hardhat',
                        decimals: 18,
                        address: $address.ZERO
                    }
                ]
            }
        ]);


        l`Find token`;
        let stdFindOne = await cliEx(`tokens find FRT`, {

        });
        has_(stdFindOne, /Symbol \s*FRT/);
        has_(stdFindOne, /Address \s*0x0000000000000000000000000000000000000000/);
    }
})
