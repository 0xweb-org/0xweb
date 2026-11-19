import alot from 'alot';
import { run } from 'shellbee'
import { Directory, File } from 'atma-io'
import { CliUtils } from './CliUtils';



const path_ROOT = './bin/bootstrap/';

UTest({
    $config: {
        timeout: 120_000
    },

    'bootstrap': {
        async '$before' () {
            if (Directory.exists(path_ROOT)) {
                await Directory.removeAsync(path_ROOT);
            }
        },
        async 'initialize' () {
            await CliUtils.fork(`init -d ${path_ROOT} --atma`);

            let paths = [
                'tsconfig.json',
                'package.json',
                'node_modules/dequanto/'
            ];

            await alot (paths).forEachAsync(async name => {
                let path = `${path_ROOT}${name}`;
                let exists = name.endsWith('/')
                    ? await Directory.existsAsync(path)
                    : await File.existsAsync(path);

                eq_(exists, true, `Path does not exist: ${path}`);
            }).toArrayAsync({ threads: 1 });

            let packageJson = await File.readAsync<any>(`${path_ROOT}/package.json`);

            eq_('dequanto' in packageJson.dependencies, true, `No dequanto package in dependencies`);
            eq_('hardhat' in packageJson.dependencies, false, 'Command without --hardhat flag still has the hardhat library');

            await run({ command: `npm i atma@latest`,  cwd: path_ROOT });

            let tsConfigFile = new File(`${path_ROOT}tsconfig.json`);
            let tsConfig = await tsConfigFile.readAsync<any>();
            tsConfig.compilerOptions.paths['dequanto/*'] = ["node_modules/dequanto/src/*"];
            tsConfig.compilerOptions.paths['@dequanto/*'] = ["node_modules/dequanto/src/*"];
            await tsConfigFile.writeAsync(tsConfig)
        },
    },
    async 'install contract' () {
        await CliUtils.fork(`i 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --name chainlink/oracle-eth --output ${path_ROOT}0xc/ --chain eth`);

        let content = await File.readAsync<string>(`${path_ROOT}/0xc/eth/chainlink/oracle-eth/oracle-eth.ts`, { skipHooks: true });
        has_(content, 'class ChainlinkOracleEth extends ContractBase');

        let packagePath = '0xweb.json';
        let json = await File.readAsync<any>(packagePath);

        has_(json.contracts.eth['0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'].main, 'oracle-eth.ts');
    },
    async 'execute api' () {
        await File.writeAsync(`${path_ROOT}check.ts`, `

            import { ChainlinkOracleEth } from './0xc/eth/chainlink/oracle-eth/oracle-eth';
            import { Config } from 'dequanto/config/Config';
            import { $bigint } from 'dequanto/utils/$bigint';

            async function example () {
                await Config.fetch();

                let oracle = new ChainlinkOracleEth();
                let decimals = await oracle.decimals();
                let price = await oracle.latestAnswer();

                console.log(\`ETH Price \${$bigint.toEther(price, decimals)}\`);
                process.exit(0);
            }
            example();
        `);

        let { stdout } = await run({
            command: `npx atma run ./check.ts --config-global dev/null`,
            cwd: path_ROOT
        });

        let match = /ETH Price (?<price>[\d\.]+)/.exec(stdout.join(''));
        let val = Number(match?.groups.price);
        eq_(isNaN(val), false, stdout.join(''));
    },
    async 'execute via cli' () {
        let str = await CliUtils.fork(`contract read chainlink/oracle-eth latestAnswer --config-global dev/null --chain eth`);
        has_(str, /\d{10,}n/, `"${str}" - Should contain BigInt as the ETH price`);
    }
})
