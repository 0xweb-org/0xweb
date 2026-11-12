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
    async $before () {
        const fixtures = ['./0xc/config/account.json', './0xc/config/accounts.json'];
        for (let path of fixtures) {
            if (await File.existsAsync(path)) {
                await File.removeAsync(path);
            }
        }
    },
    async 'returns installed contracts as a JSON array' () {
        let contracts = await CliUtils.cliJson<unknown[]>(
            `c list --local --json`
        );
        let isArray = Array.isArray(contracts);
        eq_(isArray, true, 'Expected a JSON array of installed contracts');
    },
    async 'returns the contract ABI as a JSON array' () {
        let abi = await CliUtils.cliJson<TEth.Abi.Item[]>(
            `c abi ${usdc} --chain eth --local --json`
        );
        let isArray = Array.isArray(abi);
        eq_(isArray, true, 'Expected the contract ABI as a JSON array');

        let decimals = abi.find(item => item.name === 'decimals');
        eq_(decimals?.type, 'function');
    },
    async 'returns a contract read result as a JSON scalar' () {
        let decimals = await CliUtils.cliJson<number>(
            `c read ${usdc} "decimals() view returns (uint256)" --chain eth --local --json`
        );
        eq_(decimals, 6);
    },
    async '!returns transaction receipts and reads updated state using PIN and 2FA' () {
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
            { silent: true }
        );

        let status = await CliUtils.cliJson<{ enabled: boolean }>(
            `auth 2fa status --local --json`,
            { silent: true }
        );
        eq_(status.enabled, true);

        let { code } = await totp.generateTotpCode(seed);
        await CliUtils.cliJson(
            `accounts add --name deployer --k ${deployer.key} --2fa ${code} --local --json`,
            { silent: true }
        );

        let receiptWithPin = await CliUtils.cliJson(
            `c write ${contract.address} "increment()" --chain hardhat --local --json --account ${deployer.address} -p 123`,
            { silent: true }
        );
        $require.TxHash(receiptWithPin.transactionHash);
        eq_(receiptWithPin.status, 1);

        ({ code } = await totp.generateTotpCode(seed));
        let receiptWithTotp = await CliUtils.cliJson(
            `c write ${contract.address} "increment()" --chain hardhat --local --json --account ${deployer.address} --2fa ${code}`,
            { silent: true }
        );
        $require.TxHash(receiptWithTotp.transactionHash);
        eq_(receiptWithTotp.status, 1);

        let counter = await CliUtils.cliJson(
            `c read ${contract.address} "counter():uint256" --chain hardhat --local --json`,
            { silent: true }
        );
        eq_(counter, 3);

        ({ code } = await totp.generateTotpCode(seed));
        let authLogin = await CliUtils.cliJson(
            `auth login deployer --2fa ${code} --local --json`,
            { silent: true }
        );
        eq_(authLogin.name, 'deployer');
        eq_(authLogin.address, deployer.address);

        let authStatus = await CliUtils.cliJson(
            `auth status --local --json`,
            { silent: true }
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
});
