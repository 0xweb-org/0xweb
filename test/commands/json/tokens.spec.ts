import { File } from 'atma-io';
import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { CToken } from '@core/commands/list/CToken';
import { CTokens } from '@core/commands/list/CTokens';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { $console } from '@core/utils/$console';

const configPath = './test/bin/tokens-json/config.json';
const address = '0x0000000000000000000000000000000000000001';
const token = { address, symbol: 'JSONTEST', decimals: 6, platform: 'eth' };
UTest.create({
    async $before() {
        await File.writeAsync(configPath, {});
    },
    async $after() {
        await File.removeAsync(configPath);
    },
    async 'CLI adds and finds tokens with JSON output'() {
        let flags = `--chain eth --config-global ${configPath} --json --local`;
        let added = await CliUtils.forkJson(`tokens add --address ${address} --symbol JSONTEST --decimals 6 ${flags}`);
        deepEq_(added, token);
        let stored = await File.readAsync<any>(configPath);
        eq_(stored.tokens[0].symbol, 'JSONTEST');
        let found = await CliUtils.forkJson(`tokens find JSONTEST ${flags}`);
        eq_(found.address, token.address);
        eq_(found.symbol, token.symbol);
        eq_(found.decimals, 6);
        let table = await CliUtils.fork(`tokens find JSONTEST --chain eth --config-global ${configPath} --local --color none`);
        has_(table, /Symbol\s*JSONTEST/);
    },
    async 'price and balances return JSON data without table output'() {
        let original = {
            price: TokenPriceService.prototype.getPrice,
            transfers: ERC20.prototype.getPastLogsTransfer,
            balance: ERC20.prototype.balanceOf,
            table: $console.table,
            json: $console.isJsonOnly(),
        };
        try {
            $console.setJsonOnly(true);
            $console.table = () => { throw new Error('Unexpected table output'); };
            TokenPriceService.prototype.getPrice = (async () => ({ price: 1, provider: 'test' })) as any;
            ERC20.prototype.getPastLogsTransfer = (async () => [{ address }]) as any;
            ERC20.prototype.balanceOf = async () => 1_234_567n;
            let app = { chain: {
                client: { platform: 'eth', network: 'eth' },
                tokens: { getToken: async () => token, getKnownToken: async () => token },
            } } as any;
            let price = await CToken().subcommands[0].process(['JSONTEST'], {}, app);
            eq_(price.price, 1);
            deepEq_(price.token, token);
            let command = CTokens().subcommands.find(x => x.command === 'for');
            let result = await command.process([address], {}, app);
            eq_(result.balances[0].balanceWei, '1234567');
            eq_(result.balances[0].balance, 1.23456);
            deepEq_(JSON.parse(JSON.stringify(result)).balances[0].priceInfo, { price: 1, provider: 'test' });
        } finally {
            TokenPriceService.prototype.getPrice = original.price;
            ERC20.prototype.getPastLogsTransfer = original.transfers;
            ERC20.prototype.balanceOf = original.balance;
            $console.table = original.table;
            $console.setJsonOnly(original.json);
        }
    },
});
