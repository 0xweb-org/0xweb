import { UTest } from 'atma-utest';
import { TEth } from '@dequanto/models/TEth';
import { CliUtils } from '../../CliUtils';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { TotpService } from '@core/services/TotpService';
import { File } from 'atma-io';
import { $require } from '@dequanto/utils/$require';

const usdc = `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`;

UTest.create({
    $config: {
        timeout: 60_000
    },
    async $before() {
        const fixtures = ['./0xc/config/account.json', './0xc/config/accounts.json'];
        for (let path of fixtures) {
            if (await File.existsAsync(path)) {
                await File.removeAsync(path);
            }
        }
    },
    async 'returns installed contracts as a JSON array'() {
        let contracts = await CliUtils.cliJson<unknown[]>(
            `c list --local --json`
        );
        let isArray = Array.isArray(contracts);
        eq_(isArray, true, 'Expected a JSON array of installed contracts');
    },
    async 'returns the contract ABI as a JSON array'() {
        let abi = await CliUtils.cliJson<TEth.Abi.Item[]>(
            `c abi ${usdc} --chain eth --local --json`
        );
        let isArray = Array.isArray(abi);
        eq_(isArray, true, 'Expected the contract ABI as a JSON array');

        let decimals = abi.find(item => item.name === 'decimals');
        eq_(decimals?.type, 'function');
    },
    async 'returns a contract read result as a JSON scalar'() {
        let decimals = await CliUtils.cliJson<number>(
            `c read ${usdc} "decimals() view returns (uint256)" --chain eth --local --json`
        );
        eq_(decimals, 6);
    },
    async 'returns transaction receipts and reads updated state using PIN and 2FA'() {
        await TestNode.start();

        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let deployer = provider.deployer();
        let path = './test/fixtures/contracts/StorageCounter.sol';
        let { contract } = await provider.deploySol(path, { client });

        let totp = new TotpService();
        let seed = await totp.generateSeed();
        await CliUtils.cliJson(
            `auth 2fa setup -p 123 --seed ${seed} --local --json`,
        );

        let status = await CliUtils.cliJson<{ enabled: boolean }>(
            `auth 2fa status --local --json`,
        );
        eq_(status.enabled, true);

        let { code } = await totp.generateTotpCode(seed);
        await CliUtils.cliJson(
            `accounts add --name deployer --k ${deployer.key} --2fa ${code} --local --json`,
        );

        let receiptWithPin = await CliUtils.cliJson(
            `c write ${contract.address} "increment()" --chain hardhat --local --json --account ${deployer.address} -p 123`,
        );
        $require.TxHash(receiptWithPin.transactionHash);
        eq_(receiptWithPin.status, 1);

        ({ code } = await totp.generateTotpCode(seed));
        let receiptWithTotp = await CliUtils.cliJson(
            `c write ${contract.address} "increment()" --chain hardhat --local --json --account ${deployer.address} --2fa ${code}`,
        );
        $require.TxHash(receiptWithTotp.transactionHash);
        eq_(receiptWithTotp.status, 1);

        let counter = await CliUtils.cliJson(
            `c read ${contract.address} "counter():uint256" --chain hardhat --local --json`,
        );
        eq_(counter, 3);

        ({ code } = await totp.generateTotpCode(seed));
        let authLogin = await CliUtils.cliJson(
            `auth login deployer --2fa ${code} --local --json`,
        );
        eq_(authLogin.name, 'deployer');
        eq_(authLogin.address, deployer.address);

        let authStatus = await CliUtils.cliJson(
            `auth status --local --json`,
        );
        eq_(authStatus['2fa'], true);
        eq_(authStatus['account'], 'deployer');

        let data = {
            owner: usdc,
            amount: '5'
        };

        // Omit --account to use the account selected by auth login.
        ({ code } = await totp.generateTotpCode(seed));
        let updateReceipt = await CliUtils.cliJson(
            `c write ${contract.address} "updateUser((address owner, uint256 amount) data)" --chain hardhat --local --json --2fa ${code} --arg0 '${JSON.stringify(data)}'`
        );
        $require.TxHash(updateReceipt.transactionHash);
        eq_(updateReceipt.status, 1);

        let user = await CliUtils.cliJson(
            `c read ${contract.address} "user() view returns (address owner, uint256 amount)" --chain hardhat --local --json`
        );
        eq_(user.owner.toLowerCase(), data.owner.toLowerCase());
        let amount = BigInt(user.amount);
        let expectedAmount = BigInt(data.amount);
        eq_(amount, expectedAmount);
    },

    async 'returns encoded calldata as a JSON object'() {
        let recipient = '0x0000000000000000000000000000000000000001';
        let expectedData = '0xa9059cbb'
            + '0000000000000000000000000000000000000000000000000000000000000001'
            + '0000000000000000000000000000000000000000000000000000000000000005';
        let transaction = await CliUtils.cliJson(
            `c calldata ERC20 transfer --arg0 ${recipient} --arg1 5 --chain eth --local --json`
        );
        eq_(transaction.data, expectedData);
        eq_(transaction.value, 0);
        eq_(transaction.chainId, 1);
    },
    async 'returns parsed calldata as a JSON object'() {
        let recipient = '0x0000000000000000000000000000000000000001';
        let calldata = '0xa9059cbb'
            + '0000000000000000000000000000000000000000000000000000000000000001'
            + '0000000000000000000000000000000000000000000000000000000000000005';
        let parsed = await CliUtils.cliJson(
            `c calldata-parse ERC20 ${calldata} --chain eth --local --json`
        );
        eq_(parsed.name, 'transfer');
        deepEq_(parsed.args, [recipient, '5']);
        deepEq_(parsed.params, { to: recipient, amount: '5' });
        let parsedByFlag = await CliUtils.cliJson(
            `c calldata-parse ERC20 --calldata ${calldata} --chain eth --local --json`
        );
        deepEq_(parsedByFlag, parsed);
    },
    async 'logs'() {
        await TestNode.start();

        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let deployer = provider.deployer();
        let path = './test/fixtures/contracts/StorageCounter.sol';
        let { contract, abi } = await provider.deploySol(path, { client });
        let receipts = [] as TEth.TxReceipt[];
        for (let i = 0; i < 3; i++) {
            let receipt = await CliUtils.cliJson(
                `c write ${contract.address} "increment()" --chain hardhat --account ${deployer.key} -p 123 --local --json`,
            );
            eq_(receipt.status, 1);
            receipts.push(receipt);
        }

        let outputDir = `./test/bin/logs/${contract.address}`;
        let abiPath = `${outputDir}/StorageCounter.json`;
        let configPath = './0xweb.json';
        let originalConfig = await File.readAsync<string>(configPath, { skipHooks: true });
        let config = JSON.parse(originalConfig);
        config.contracts ??= {};
        config.contracts.hardhat ??= {};
        config.contracts.hardhat[contract.address] = {
            name: 'LogsCounter',
            main: abiPath,
            contractName: 'StorageCounter',
        };
        await File.writeAsync(abiPath, abi);
        let command = `c logs LogsCounter Incremented --chain hardhat --local`;
        function checkLogs (logs: TEth.EventLog[]) {
            let isArray = Array.isArray(logs);
            eq_(isArray, true);
            eq_(logs.length, receipts.length);
            for (let i = 0; i < receipts.length; i++) {
                let log = logs[i];
                eq_(log.event, 'Incremented');
                eq_(log.transactionHash, receipts[i].transactionHash);
                eq_(log.block!.number, receipts[i].blockNumber);
                let timestamp = Date.parse(log.block!.date!);
                let hasDate = Number.isFinite(timestamp);
                eq_(hasDate, true);
                let value = BigInt(log.params!.value);
                let expectedValue = BigInt(i + 2);
                eq_(value, expectedValue);
            }
        };
        return UTest.create({
            async $before () {
                await File.writeAsync(configPath, config);
            },
            async $after () {
                await File.writeAsync(configPath, originalConfig, { skipHooks: true });
            },
            async 'load Incremented logs to std as JSON' () {
                let logs = await CliUtils.cliJson(`${command} --json`);
                checkLogs(logs);
            },
            async 'save Incremented logs to a JSON file' () {
                let output = `${outputDir}/Incremented.json`;
                if (await File.existsAsync(output)) {
                    await File.removeAsync(output);
                }
                await CliUtils.cli(`${command} --output ${output} --format json`);
                let logs = await File.readAsync<TEth.EventLog[]>(output);
                checkLogs(logs);
            },
            async 'save Incremented logs to a CSV file' () {
                let output = `${outputDir}/Incremented.csv`;
                if (await File.existsAsync(output)) {
                    await File.removeAsync(output);
                }
                await CliUtils.cli(`${command} --output ${output} --format csv`);
                let csv = await File.readAsync<string>(output, { skipHooks: true });
                let rows = csv.trim().split(/\r?\n/).map(row => row.split(',').map(value => value.trim()));
                let header = rows.shift();
                deepEq_(header, ['Block', 'Date', 'Tx', 'Event', 'value']);
                eq_(rows.length, receipts.length);
                for (let i = 0; i < rows.length; i++) {
                    let [block, date, transactionHash, event, value] = rows[i];
                    let blockNumber = Number(block);
                    eq_(blockNumber, receipts[i].blockNumber);
                    let hasDate = Number.isFinite(Date.parse(date));
                    eq_(hasDate, true);
                    eq_(transactionHash, receipts[i].transactionHash);
                    eq_(event, 'Incremented');
                    let amount = BigInt(value);
                    let expectedAmount = BigInt(i + 2);
                    eq_(amount, expectedAmount);
                }
            },
        });
    },
    async 'storage' () {
        await TestNode.start();
        let provider = new HardhatProvider();
        let client = provider.client('localhost');
        let source = './test/fixtures/contracts/StorageCounter.sol';
        let { contract } = await provider.deploySol(source, { client });
        let outputDir = `./test/bin/storage/${contract.address}`;
        let configPath = './0xweb.json';
        let originalConfig = await File.readAsync<string>(configPath, { skipHooks: true });
        let flags = '--chain hardhat --local --json';
        let expectedModel = {
            counter: '1',
            user: { owner: contract.address, amount: '5' },
        };
        let expectedSlots = [
            '0x' + '1'.padStart(64, '0'),
            '0x' + contract.address.slice(2).toLowerCase().padStart(64, '0'),
            '0x' + '5'.padStart(64, '0'),
        ];
        function checkModel (model) {
            let counter = BigInt(model.counter);
            let amount = BigInt(model.user.amount);
            let owner = model.user.owner.toLowerCase();
            eq_(counter, 1n);
            eq_(amount, 5n);
            eq_(owner, contract.address.toLowerCase());
        }
        return UTest.create({
            async $before () {
                await CliUtils.cli(`i ${contract.address} --name StorageJson --source ${source} --output ${outputDir} --chain hardhat --local`);
            },
            async $after () {
                await File.writeAsync(configPath, originalConfig, { skipHooks: true });
            },
            async 'storage slot returns a hex value and an inclusive range' () {
                let slot = await CliUtils.cliJson(`c slot StorageJson 0 ${flags}`);
                eq_(slot, expectedSlots[0]);
                let slots = await CliUtils.cliJson(`c slot StorageJson 0-2 ${flags}`);
                deepEq_(slots, expectedSlots);
            },
            async 'storage var returns a scalar, struct and nested field' () {
                let counter = await CliUtils.cliJson(`c var StorageJson counter --local --json`);
                eq_(counter, 1);
                let user = await CliUtils.cliJson(`c var StorageJson user ${flags}`);
                checkModel({ counter, user });
                let amount = await CliUtils.cliJson(`c var StorageJson user.amount ${flags}`);
                eq_(amount, 5);
                let bySlot = await CliUtils.cliJson(`c var ${contract.address} counter --slot 0 --type uint256 ${flags}`);
                eq_(bySlot, counter);
            },
            async 'storage vars returns the variable layout' () {
                let slots = await CliUtils.cliJson(`c vars StorageJson ${flags}`);
                deepEq_(slots, [
                    { slot: 0, position: 0, name: 'counter', size: 256, type: 'uint256' },
                    { slot: 1, position: 0, name: 'user', size: 512, type: '(address owner, uint256 amount)' },
                ]);
            },
            async 'storage var-set updates scalar and nested values' () {
                try {
                    let result = await CliUtils.cliJson(`c var-set StorageJson counter 31 ${flags}`);
                    eq_(result, 31);
                    let counter = await CliUtils.cliJson(`c read ${contract.address} "counter():uint256" ${flags}`);
                    eq_(counter, 31);
                    result = await CliUtils.cliJson(`c var-set StorageJson user.amount 12 ${flags}`);
                    eq_(result, 12);
                    let amount = await CliUtils.cliJson(`c var StorageJson user.amount ${flags}`);
                    eq_(amount, 12);
                } finally {
                    await CliUtils.cliJson(`c var-set StorageJson counter 1 ${flags}`);
                    await CliUtils.cliJson(`c var-set StorageJson user.amount 5 ${flags}`);
                }
            },
            async 'storage dump returns JSON stdout and writes JSON and CSV files' () {
                let model = await CliUtils.cliJson(`c dump StorageJson --sources ${source} --output std ${flags}`);
                checkModel(model);
                let output = `${outputDir}/dump`;
                let extensions = ['json', 'csv'];
                for (let extension of extensions) {
                    let path = `${output}.${extension}`;
                    if (await File.existsAsync(path)) {
                        await File.removeAsync(path);
                    }
                }
                let result = await CliUtils.cliJson(`c dump StorageJson --sources ${source} --output ${output} ${flags}`);
                let json = await File.readAsync(`${output}.json`);
                checkModel(json);
                let csv = await File.readAsync<string>(`${output}.csv`, { skipHooks: true });
                let rows = csv.trim().split(/\r?\n/).map(row => row.split(',').map(value => value.trim()));
                let expectedRows = expectedSlots.map((value, index) => ['0x' + index.toString(16).padStart(64, '0'), value]);
                deepEq_(rows, expectedRows);
                let jsonExists = await File.existsAsync(result.files.json);
                let csvExists = await File.existsAsync(result.files.csv);
                eq_(jsonExists, true);
                eq_(csvExists, true);
            },
            async 'storage dump-restore restores JSON and CSV snapshots' () {
                let formats = ['json', 'csv'];
                for (let format of formats) {
                    let path = `${outputDir}/restore.${format}`;
                    let data = format === 'json'
                        ? JSON.stringify(expectedModel)
                        : expectedSlots.map((value, index) => `0x${index.toString(16).padStart(64, '0')}, ${value}`).join('\n');
                    await File.writeAsync(path, data, { skipHooks: true });
                    await CliUtils.cliJson(`c var-set StorageJson counter 99 ${flags}`);
                    await CliUtils.cliJson(`c var-set StorageJson user.amount 42 ${flags}`);
                    let result = await CliUtils.cliJson(`c dump-restore StorageJson --sources ${source} --contract-name StorageCounter --file ${path} ${flags}`);
                    deepEq_(result, { success: true });
                    let counter = await CliUtils.cliJson(`c read ${contract.address} "counter():uint256" ${flags}`);
                    let user = await CliUtils.cliJson(`c read ${contract.address} "user() view returns (address owner, uint256 amount)" ${flags}`);
                    checkModel({ counter, user });
                }
            },
        });
    }
});
