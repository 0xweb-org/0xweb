import di from 'a-di';
import alot from 'alot';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { File } from 'atma-io';
import { Shell, run } from 'shellbee';
import type { IShellParams } from 'shellbee/interface/IProcessParams';
import { ChainAccount } from '@dequanto/models/TAccount';

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
    async cli (command: string, params: Record<string, string | number>, opts?: { silent?: boolean }) {
        params = {
            ...PARAMS_DEF,
            ...params
        };
        let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
        let cmdStr = `node ./index.js ${command} ${paramsStr}`;
        let { stdout, stderr, lastCode } = await run({
            command: cmdStr,
            silent: opts?.silent ?? false,
        });
        if (lastCode !== 0) {
            console.error(stdout.join('\n'), stderr.join('\n'));
            throw new Error(`Process exit code ${lastCode}`)
        }
        return stdout.join('\n');
    },
    async cliParallel (command: string, params: Record<string, string | number>, opts?: IShellParams ): Promise<Shell> {
        params = {
            ...PARAMS_DEF,
            ...params
        };
        let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
        let cmdStr = `node ./index.js ${command} ${paramsStr}`;

        let shell = new Shell({
            ...(opts ?? {}),
            command: cmdStr,
            //silent: true,
        });
        shell.run();
        return shell;
    },
    async deployFreeToken (client: Web3Client, opts?: { deployer?: ChainAccount }) {
        let { contract } = await di.resolve(HardhatProvider).deploySol('/dequanto/test/fixtures/contracts/FreeToken.sol', {
            client,
            deployer: opts?.deployer
        });
        return contract;
    }
}
