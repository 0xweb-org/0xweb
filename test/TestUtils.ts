import { Web3Client } from '@dequanto/clients/Web3Client';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { l } from '@dequanto/utils/$logger';
import di from 'a-di';
import alot from 'alot';
import { File } from 'atma-io';
import { run } from 'shellbee';

const ACCOUNTS_PATH = './test/bin/accounts.json';
const CONFIG_PATH = './test/bin/config.json';

const PARAMS_DEF = {
    '--config-accounts': ACCOUNTS_PATH,
    '--config-global': CONFIG_PATH,
    '--pin': '12345',
    '--chain': 'hardhat',
    '--color': 'none'
};

export const TestUtils = {
    async clean () {
        await File.removeAsync(ACCOUNTS_PATH);
        await File.removeAsync(CONFIG_PATH);
    },
    async cli (command: string, params: any) {
        params = {
            ...PARAMS_DEF,
            ...params
        };
        let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
        let cmdStr = `node ./index.js ${command} ${paramsStr}`;
        let { stdout, stderr, lastCode } = await run({
            command: cmdStr,
            //silent: true,
        });
        if (lastCode !== 0) {
            console.error(stdout.join('\n'), stderr.join('\n'));
            throw new Error(`Process exit code ${lastCode}`)

        }
        return stdout.join('\n');
    },
    async deployFreeToken (client: Web3Client) {
        let { contract } = await di.resolve(HardhatProvider).deploySol('/dequanto/test/fixtures/contracts/FreeToken.sol', {
            client
        });
        return contract;
    }
}
