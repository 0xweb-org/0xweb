import { run } from 'shellbee'
import { Directory, env, File } from 'atma-io'

UTest({
    async 'install contract (local)' () {

        return UTest({
            async $before () {
                await Directory.removeAsync('/0xweb/eth/DisperseContract/');
                let { stdout } = await run(`node index.js i 0xd152f549545093347a162dce210e7293f1452150 --name DisperseContract --chain eth`);
            },
            async 'check paths' () {
                let content = await File.readAsync<string>(`/0xweb/eth/DisperseContract/DisperseContract.ts`, { skipHooks: true });
                has_(content, 'class DisperseContract extends ContractBase');

                let packagePath = '0xweb.json';
                let json = await File.readAsync<any>(packagePath);

                has_(json.contracts.eth['0xd152f549545093347a162dce210e7293f1452150'].main, 'DisperseContract.ts');
            },
            async 'check abi' () {
                let { stdout } = await run(`node index.js c abi DisperseContract --color none`);
                has_(stdout.join(''), `disperseTokenSimple(address token, address[] recipients, uint256[] values)`);
            }
        })
    },
    async 'install contract (global)' () {

        let _global = env.appdataDir.combine('.dequanto/').toDir();
        let _basePath = `${_global}/0xweb/eth/ChainLinkEth/`;
        return UTest({
            async $before () {
                if (await Directory.existsAsync(_basePath)) {
                    await Directory.removeAsync(_basePath);
                }
                let { stdout } = await run(`node index.js i 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --name ChainLinkEth --chain eth --global`);
            },
            async 'check paths' () {
                let content = await File.readAsync(`${_basePath}/ChainLinkEth.ts`);
                has_(content, 'class ChainLinkEth extends ContractBase');

                let json = await File.readAsync<any>(`${_global}/0xweb.json`);

                has_(json.contracts.eth['0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'].main, 'ChainLinkEth.ts');
            },
            async 'check abi' () {
                let { stdout } = await run(`node index.js c abi ChainLinkEth --color none`);
                has_(stdout.join(''), `getRoundData`);
            }
        })
    },

})
