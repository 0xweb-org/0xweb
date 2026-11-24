import { UTest } from 'atma-utest';
import { TEth } from '@dequanto/models/TEth';
import { CliUtils } from '../../CliUtils';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { TotpService } from '@core/services/TotpService';
import { File } from 'atma-io';
import { $require } from '@dequanto/utils/$require';
import { $address } from '@dequanto/utils/$address';
import { TestUtils, TApiRequest } from '../../TestUtils';
import { $promise } from '@dequanto/utils/$promise';
import alot from 'alot';

const usdc = `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`;

function suite(transport: 'CLI' | 'API') {
    const fixtures = ['./0xc/config/account.json', './0xc/config/accounts.json'];
    // Run stateful scenarios independently so both transports use identical assertions.
    async function request<T = any>(command: string, api: TApiRequest): Promise<T> {
        if (transport === 'CLI') {
            return CliUtils.forkJson<T>(command);
        }
        let result = await TestUtils.api(api);
        let url = typeof api === 'string' ? api : api.url;
        if (url.startsWith('/api/c/write/')) {
            // API writes return on submission; validate the response before checking the mined receipt.
            deepEq_(Object.keys(result), ['hash']);
            $require.TxHash(result.hash);

            let client = new HardhatProvider().client('localhost');
            let receipt = await $promise.waitForObject(async () => [
                null,
                await client.getTransactionReceipt(result.hash)
            ], {
                intervalMs: 50,
                timeoutMs: 10_000,
            });
            eq_(receipt.transactionHash, result.hash);
            return receipt as T;
        }
        return result;
    }
    return {
        $config: {
            timeout: 60_000
        },
        async $before() {
            for (let path of fixtures) {
                await File.removeAsync(path);
            }
        },
        async 'returns installed contracts as a JSON array'() {
            let contracts = await request<unknown[]>(
                `c list --local --json`,
                `/api/c/list?local=true`
            );
            let isArray = Array.isArray(contracts);
            eq_(isArray, true, 'Expected a JSON array of installed contracts');
        },
        async 'returns the contract ABI as a JSON array'() {
            let abi = await request<TEth.Abi.Item[]>(
                `c abi ${usdc} --chain eth --local --json`,
                `/api/c/abi/${usdc}?chain=eth&local=true`
            );
            let isArray = Array.isArray(abi);
            eq_(isArray, true, 'Expected the contract ABI as a JSON array');

            let decimals = abi.find(item => item.name === 'decimals');
            eq_(decimals?.type, 'function');
        },
        async 'returns a contract read result as a JSON scalar'() {
            let decimals = await request<number>(
                `c read ${usdc} decimals --abi "decimals() view returns (uint256)" --chain eth --local --json`,
                `/api/c/read/${usdc}/decimals?abi=decimals() view returns (uint256)&chain=eth&local=true`
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
            let setup = await request(
                `auth 2fa setup -p 123 --seed ${seed} --local --json`,
                {
                    url: `/api/auth/2fa/setup`,
                    method: 'post',
                    body: { pin: '123', seed: seed, local: true }
                }
            );
            deepEq_(setup, { success: true });

            let status = await request<{ enabled: boolean }>(
                `auth 2fa status --local --json`,
                `/api/auth/2fa/status?local=true`
            );
            eq_(status.enabled, true);

            let { code } = await totp.generateTotpCode(seed);
            let accounts = await request(
                `accounts add --name deployer --k ${deployer.key} --2fa ${code} --local --json`,
                {
                    url: `/api/accounts/add`,
                    method: 'post',
                    body: { name: 'deployer', key: deployer.key, '2fa': code, local: true }
                }
            );
            let added = accounts.find(account => account.name === 'deployer');
            eq_(added?.address.toLowerCase(), deployer.address.toLowerCase());

            let receiptWithPin = await request(
                `c write ${contract.address} increment --abi "increment()" --chain hardhat --local --json --account ${deployer.address} -p 123`,
                {
                    url: `/api/c/write/${contract.address}/increment`,
                    method: 'post',
                    body: { abi: 'increment()', chain: 'hardhat', local: true, account: deployer.address, pin: '123' }
                }
            );
            $require.TxHash(receiptWithPin.transactionHash);
            eq_(receiptWithPin.status, 1);

            ({ code } = await totp.generateTotpCode(seed));
            let receiptWithTotp = await request(
                `c write ${contract.address} increment --abi "increment()" --chain hardhat --local --json --account ${deployer.address} --2fa ${code}`,
                {
                    url: `/api/c/write/${contract.address}/increment`,
                    method: 'post',
                    body: { abi: 'increment()', chain: 'hardhat', local: true, account: deployer.address, '2fa': code }
                }
            );
            $require.TxHash(receiptWithTotp.transactionHash);
            eq_(receiptWithTotp.status, 1);

            let counter = await request(
                `c read ${contract.address} counter --abi "counter():uint256" --chain hardhat --local --json`,
                `/api/c/read/${contract.address}/counter?abi=counter():uint256&chain=hardhat&local=true`
            );
            eq_(counter, 3);

            ({ code } = await totp.generateTotpCode(seed));
            let authLogin = await request(
                `auth login deployer --2fa ${code} --local --json`,
                {
                    url: `/api/auth/login/deployer`,
                    method: 'post',
                    body: { '2fa': code, local: true }
                }
            );
            eq_(authLogin.name, 'deployer');
            eq_(authLogin.address, deployer.address);

            let authStatus = await request(
                `auth status --local --json`,
                `/api/auth/status?local=true`
            );
            eq_(authStatus['2fa'], true);
            eq_(authStatus['account'], 'deployer');

            let data = {
                owner: usdc,
                amount: '5'
            };

            // Omit --account to use the account selected by auth login.
            ({ code } = await totp.generateTotpCode(seed));
            let updateReceipt = await request(
                `c write ${contract.address} updateUser --abi "updateUser((address owner, uint256 amount) data)" --chain hardhat --local --json --2fa ${code} --arg0 '${JSON.stringify(data)}'`,
                {
                    url: `/api/c/write/${contract.address}/updateUser`,
                    method: 'post',
                    body: {
                        abi: 'updateUser((address owner, uint256 amount) data)',
                        chain: 'hardhat',
                        local: true,
                        '2fa': code,
                        arg0: JSON.stringify(data)
                    }
                }
            );
            $require.TxHash(updateReceipt.transactionHash);
            eq_(updateReceipt.status, 1);

            let user = await request(
                `c read ${contract.address} user --abi "user() view returns (address owner, uint256 amount)" --chain hardhat --local --json`,
                `/api/c/read/${contract.address}/user?abi=user() view returns (address owner, uint256 amount)&chain=hardhat&local=true`
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
            let transaction = await request(
                `c calldata ERC20 transfer --arg0 ${recipient} --arg1 5 --chain eth --local --json`,
                `/api/c/calldata/ERC20/transfer?arg0=${recipient}&arg1=5&chain=eth&local=true`
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
            let parsed = await request(
                `c calldata-parse ERC20 ${calldata} --chain eth --local --json`,
                `/api/c/calldata-parse/ERC20?chain=eth&local=true&calldata=${calldata}`
            );
            eq_(parsed.name, 'transfer');
            deepEq_(parsed.args, [recipient, '5']);
            deepEq_(parsed.params, { to: recipient, amount: '5' });
            let parsedByFlag = await request(
                `c calldata-parse ERC20 --calldata ${calldata} --chain eth --local --json`,
                `/api/c/calldata-parse/ERC20?calldata=${calldata}&chain=eth&local=true`
            );
            deepEq_(parsedByFlag, parsed);
        },
        async '!logs'() {
            await TestNode.start();

            let provider = new HardhatProvider();
            let client = provider.client('localhost');
            let deployer = provider.deployer();
            let path = './test/fixtures/contracts/StorageCounter.sol';
            let { contract, abi } = await provider.deploySol(path, { client });
            let receipts = [] as TEth.TxReceipt[];
            for (let i = 0; i < 3; i++) {
                let receipt = await request(
                    `c write ${contract.address} increment --abi "increment()" --chain hardhat --account ${deployer.key} -p 123 --local --json`,
                    {
                        url: `/api/c/write/${contract.address}/increment`,
                        method: 'post',
                        body: { abi: 'increment()', chain: 'hardhat', account: deployer.key, pin: '123', local: true }
                    }
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
            config.contracts.hardhat = alot.fromObject(config.contracts.hardhat as Record<string, any>)
                .filter(x => x.value.name !== 'LogsCounter')
                .toDictionary(x => x.key, x => x.value);
            config.contracts.hardhat[contract.address] = {
                name: 'LogsCounter',
                main: abiPath,
                contractName: 'StorageCounter',
            };
            await File.writeAsync(abiPath, abi);
            let command = `c logs LogsCounter Incremented --chain hardhat --local`;
            function checkLogs(logs: TEth.EventLog[]) {
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
                async $before() {
                    await File.writeAsync(configPath, config);
                },
                async $after() {
                    await File.writeAsync(configPath, originalConfig, { skipHooks: true });
                },
                async 'load Incremented logs to std as JSON'() {
                    let logs = await request(
                        `${command} --json`,
                        `/api/c/logs/LogsCounter/Incremented?chain=hardhat&local=true`
                    );
                    checkLogs(logs);
                },
                async 'save Incremented logs to a JSON file'() {
                    let output = `${outputDir}/Incremented.json`;
                    if (await File.existsAsync(output)) {
                        await File.removeAsync(output);
                    }
                    await CliUtils.fork(`${command} --output ${output} --format json`);
                    let logs = await File.readAsync<TEth.EventLog[]>(output);
                    checkLogs(logs);
                },
                async 'save Incremented logs to a CSV file'() {
                    let output = `${outputDir}/Incremented.csv`;
                    if (await File.existsAsync(output)) {
                        await File.removeAsync(output);
                    }
                    await CliUtils.fork(`${command} --output ${output} --format csv`);
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
        async 'storage'() {
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
            function checkModel(model) {
                let counter = BigInt(model.counter);
                let amount = BigInt(model.user.amount);
                let owner = model.user.owner.toLowerCase();
                eq_(counter, 1n);
                eq_(amount, 5n);
                eq_(owner, contract.address.toLowerCase());
            }
            return UTest.create({
                async $before() {
                    await CliUtils.fork(`i ${contract.address} --name StorageJson --source ${source} --output ${outputDir} --chain hardhat --local`);
                },
                async $after() {
                    await File.writeAsync(configPath, originalConfig, { skipHooks: true });
                },
                async 'storage slot returns a hex value and an inclusive range'() {
                    let slot = await request(
                        `c slot StorageJson 0 ${flags}`,
                        `/api/c/slot/StorageJson/0?chain=hardhat&local=true`
                    );
                    eq_(slot, expectedSlots[0]);
                    let slots = await request(
                        `c slot StorageJson 0-2 ${flags}`,
                        `/api/c/slot/StorageJson/0-2?chain=hardhat&local=true`
                    );
                    deepEq_(slots, expectedSlots);
                },
                async 'storage var returns a scalar, struct and nested field'() {
                    let counter = await request(
                        `c var StorageJson counter --local --json`,
                        `/api/c/var/StorageJson/counter?local=true`
                    );
                    eq_(counter, 1);
                    let user = await request(
                        `c var StorageJson user ${flags}`,
                        `/api/c/var/StorageJson/user?chain=hardhat&local=true`
                    );
                    checkModel({ counter, user });
                    let amount = await request(
                        `c var StorageJson user.amount ${flags}`,
                        `/api/c/var/StorageJson/user.amount?chain=hardhat&local=true`
                    );
                    eq_(amount, 5);
                    let bySlot = await request(
                        `c var ${contract.address} counter --slot 0 --type uint256 ${flags}`,
                        `/api/c/var/${contract.address}/counter?slot=0&type=uint256&chain=hardhat&local=true`
                    );
                    eq_(bySlot, counter);
                },
                async 'storage vars returns the variable layout'() {
                    let slots = await request(
                        `c vars StorageJson ${flags}`,
                        `/api/c/vars/StorageJson?chain=hardhat&local=true`
                    );
                    deepEq_(slots, [
                        { slot: 0, position: 0, name: 'counter', size: 256, type: 'uint256' },
                        { slot: 1, position: 0, name: 'user', size: 512, type: '(address owner, uint256 amount)' },
                    ]);
                },
                async 'storage var-set updates scalar and nested values'() {
                    try {
                        let result = await request(
                            `c var-set StorageJson counter 31 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/counter/31`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                        eq_(result, 31);
                        let counter = await request(
                            `c read ${contract.address} counter --abi "counter():uint256" ${flags}`,
                            `/api/c/read/${contract.address}/counter?abi=counter():uint256&chain=hardhat&local=true`
                        );
                        eq_(counter, 31);
                        result = await request(
                            `c var-set StorageJson user.amount 12 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/user.amount/12`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                        eq_(result, 12);
                        let amount = await request(
                            `c var StorageJson user.amount ${flags}`,
                            `/api/c/var/StorageJson/user.amount?chain=hardhat&local=true`
                        );
                        eq_(amount, 12);
                    } finally {
                        await request(
                            `c var-set StorageJson counter 1 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/counter/1`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                        await request(
                            `c var-set StorageJson user.amount 5 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/user.amount/5`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                    }
                },
                async 'storage dump returns JSON stdout and writes JSON and CSV files'() {
                    let model = await request(
                        `c dump StorageJson --sources ${source} --output std ${flags}`,
                        `/api/c/dump/StorageJson?sources=${encodeURIComponent(source)}&output=std&chain=hardhat&local=true`
                    );
                    checkModel(model);
                    let output = `${outputDir}/dump`;
                    let extensions = ['json', 'csv'];
                    for (let extension of extensions) {
                        let path = `${output}.${extension}`;
                        if (await File.existsAsync(path)) {
                            await File.removeAsync(path);
                        }
                    }
                    let result = await request(
                        `c dump StorageJson --sources ${source} --output ${output} ${flags}`,
                        `/api/c/dump/StorageJson?sources=${encodeURIComponent(source)}&output=${encodeURIComponent(output)}&chain=hardhat&local=true`
                    );
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
                async 'storage dump-restore restores JSON and CSV snapshots'() {
                    let formats = ['json', 'csv'];
                    for (let format of formats) {
                        let path = `${outputDir}/restore.${format}`;
                        let data = format === 'json'
                            ? JSON.stringify(expectedModel)
                            : expectedSlots.map((value, index) => `0x${index.toString(16).padStart(64, '0')}, ${value}`).join('\n');
                        await File.writeAsync(path, data, { skipHooks: true });
                        await request(
                            `c var-set StorageJson counter 99 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/counter/99`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                        await request(
                            `c var-set StorageJson user.amount 42 ${flags}`,
                            {
                                url: `/api/c/var-set/StorageJson/user.amount/42`,
                                method: 'post',
                                body: { chain: 'hardhat', local: true }
                            }
                        );
                        let result = await request(
                            `c dump-restore StorageJson --sources ${source} --contract-name StorageCounter --file ${path} ${flags}`,
                            {
                                url: `/api/c/dump-restore/StorageJson`,
                                method: 'post',
                                body: { sources: source, 'contract-name': 'StorageCounter', file: path, chain: 'hardhat', local: true }
                            }
                        );
                        deepEq_(result, { success: true });
                        let counter = await request(
                            `c read ${contract.address} counter --abi "counter():uint256" ${flags}`,
                            `/api/c/read/${contract.address}/counter?abi=counter():uint256&chain=hardhat&local=true`
                        );
                        let user = await request(
                            `c read ${contract.address} user --abi "user() view returns (address owner, uint256 amount)" ${flags}`,
                            `/api/c/read/${contract.address}/user?abi=user() view returns (address owner, uint256 amount)&chain=hardhat&local=true`
                        );
                        checkModel({ counter, user });
                    }
                },
            });
        },
        'simulate': {
            async 'should fail with traces in error'() {
                let from = $address.ZERO;
                let to = "0x1";
                let amount = 10e6
                let r1 = await request(
                    `c simulate ${usdc} transfer --abi "transfer(address to, uint256 amount)" --chain eth --arg0 ${to} --arg1 ${amount} --account ${from} --json`,
                    `/api/c/simulate/${usdc}/transfer?abi=transfer(address to, uint256 amount)&chain=eth&arg0=${to}&arg1=${amount}&account=${from}`
                );
                eq_(r1.success, false);
                has_(r1.error, 'ERC20: transfer from the zero address');
                // API execution may retain terminal colors in formatted trace messages.
                let errorMessage = r1.error.replace(/\u001b\[[0-9;]*m/g, '');
                has_(errorMessage, '.transfer(to: ', `Should include formatted traces`);
                has_(r1.traces?.method, 'transfer', `Should include trace JSON`);
            },

            async 'should transfer from Sky'() {
                let from = '0x37305B1cD40574E4C5Ce33f8e8306Be057fD7341';
                let to = "0x1";
                let amount = 10e6
                let r1 = await request(
                    `c simulate ${usdc} transfer --abi "transfer(address to, uint256 amount)" --chain eth --arg0 ${to} --arg1 ${amount} --account ${from} --json`,
                    `/api/c/simulate/${usdc}/transfer?abi=transfer(address to, uint256 amount)&chain=eth&arg0=${to}&arg1=${amount}&account=${from}`
                );
                eq_(r1.success, true);

                eq_(r1.logs.length, r1.receipt.logs.length);
                deepEq_(r1.logs.map(log => log.raw), r1.receipt.logs);

                let transfer = r1.logs.find(log => log.decoded && log.event === 'Transfer');
                notEq_(transfer, null);
                eq_(transfer.address.toLowerCase(), usdc.toLowerCase());
                eq_(transfer.params.from.toLowerCase(), from.toLowerCase());
                eq_(transfer.params.to.toLowerCase(), '0x0000000000000000000000000000000000000001');
                eq_(transfer.params.value, amount.toString());
            },
        }
    };
}

UTest.create({
    '!test via CLI': suite('CLI'),
    'test via API': suite('API')
});
