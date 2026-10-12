import { run } from 'shellbee'
import { Directory, env, File } from 'atma-io'

UTest({
    $config: {
        timeout: 60 * 1000
    },
    async 'install contract (local)'() {
        let cwd = './test/bin/test-install/';
        let _basePath = `${cwd}0xc/eth/foo/DisperseContract/`;
        let _mainPath = `${_basePath}DisperseContract.ts`;
        return UTest({
            async $before() {

                if (await Directory.existsAsync(cwd)) {
                    await Directory.removeAsync(cwd);
                }

                await Directory.ensureAsync(cwd);

                let { stdout } = await run({
                    command: `node ../../../index.js i 0xd152f549545093347a162dce210e7293f1452150 --name foo/DisperseContract --chain eth`,
                    cwd: cwd
                });
            },
            async 'check paths'() {
                let content = await File.readAsync<string>(_mainPath, { skipHooks: true });
                has_(content, 'class FooDisperseContract extends ContractBase');

                let packagePath = `${cwd}0xweb.json`;
                let json = await File.readAsync<any>(packagePath);

                has_(json.contracts.eth['0xd152f549545093347a162dce210e7293f1452150'].main, 'DisperseContract.ts');
            },
            async 'check abi'() {
                let { stdout } = await run({
                    command: `node ../../../index.js c abi foo/DisperseContract --color none`,
                    cwd
                });
                has_(stdout.join(''), `disperseTokenSimple(address token, address[] recipients, uint256[] values)`);
            },
            async 'restore'() {
                await Directory.removeAsync(_basePath);

                eq_(await File.existsAsync(_mainPath), false);

                let { stdout } = await run({
                    command: `node ../../../index.js restore`,
                    cwd
                });
                eq_(await File.existsAsync(_mainPath), true);
            }
        });
    },
    async 'install contract (global)'() {

        let _global = env.appdataDir.combine('.dequanto/').toDir();
        let _basePath = `${_global}/0xc/eth/ChainLinkEth/`;
        return UTest({
            async $before() {
                if (await Directory.existsAsync(_basePath)) {
                    await Directory.removeAsync(_basePath);
                }
                let { stdout } = await run({
                    command: `node index.js i 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --name ChainLinkEth --chain eth --global`,
                    silent: true,
                });
            },
            async 'check global paths'() {
                let content = await File.readAsync(`${_basePath}/ChainLinkEth.ts`);
                has_(content, 'class ChainLinkEth extends ContractBase');

                let json = await File.readAsync<any>(`${_global}/0xweb.json`);

                has_(json.contracts.eth['0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'].main, 'ChainLinkEth.ts');
            },
            async 'check global abi'() {
                let { stdout } = await run({
                    command: `node index.js c abi ChainLinkEth --color none`,
                    silent: true,
                });
                has_(stdout.join(''), `getRoundData`);
            },
            async 'check global abi as json'() {
                let { stdout } = await run({
                    command: `node index.js c abi ChainLinkEth --json`,
                    silent: true,
                });
                eq_(stdout.length, 1);
                let [str] = stdout;
                has_(str, /"name": "NewRound"/);
                has_(str, /^\[/);
                has_(str, /\]\s*$/);
                let json = JSON.parse(str);
                eq_(Array.isArray(json), true);
            }
        })
    },
    async 'install contract (Memory Only)'() {
        let { stdout } = await run({
            command: `node index.js i 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --name ChainLinkEthMem --chain eth --json --save false`,
            silent: true,
        });
        const result = JSON.parse(stdout.join(''));
        eq_(await File.existsAsync(result.main), false);

        eq_(result.platform, 'eth');
        eq_(result.address, '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419');
        eq_(result.name, 'ChainLinkEthMem');
        eq_(result.contractName, 'EACAggregatorProxy');
        eq_(result.main, './0xc/eth/ChainLinkEthMem/ChainLinkEthMem.ts');
        deepEq_(result.files.map(x => x.kind), [
            'binding',
            'abi',
            'source',
        ]);
        has_(result.files[2].content, 'EACAggregatorProxy');
    },
    async 'install contract by solidity source'() {
        let _basePath = './0xc/eth/ContractBySource/';
        return UTest({
            async $before() {

                if (await Directory.existsAsync(_basePath)) {
                    await Directory.removeAsync(_basePath);
                }
                let { stdout } = await run(`node index.js i ./test/fixtures/install/ContractBySource.sol --name ContractBySource --chain eth`);
            },
            async 'check paths'() {
                let content = await File.readAsync<string>(`${_basePath}/ContractBySource.ts`, { skipHooks: true });
                has_(content, 'class ContractBySource extends ContractBase');

                let packagePath = '0xweb.json';
                let json = await File.readAsync<any>(packagePath);

                has_(json.dependencies['ContractBySource'].main, 'ContractBySource.ts');
            },
            async 'check abi'() {
                let { stdout } = await run(`node index.js c abi ContractBySource --color none`);
                has_(stdout.join(''), `fooBySource()`);
            }
        });
    },
    async 'install contract by address with solidity source'() {
        let _basePath = './0xc/eth_goerli/ContractBySource/';
        return UTest({
            async $before() {

                if (await Directory.existsAsync(_basePath)) {
                    await Directory.removeAsync(_basePath);
                }
                let { stdout, stderr } = await run(`node index.js i 0x1234 --source ./test/fixtures/install/ContractBySource.sol --name ContractBySource --chain eth:goerli`);
                console.log(`stdout: ${stderr.join('')} ${stdout.join('')}`);
            },
            async 'check paths'() {
                let content = await File.readAsync<string>(`${_basePath}/ContractBySource.ts`, { skipHooks: true });
                has_(content, 'class ContractBySource extends ContractBase');

                let packagePath = '0xweb.json';
                let json = await File.readAsync<any>(packagePath);

                has_(json.dependencies['ContractBySource'].main, 'ContractBySource.ts');
            },
            async 'check abi'() {
                let { stdout } = await run(`node index.js c abi ContractBySource --color none`);
                has_(stdout.join(''), `fooBySource()`);
            }
        });
    }

})
