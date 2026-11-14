import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';
import { spawnSync } from 'child_process';

interface BlockJson {
    number: number;
    hash: string;
    parentHash: string;
    timestamp: number;
    transactions: string[];
}

UTest.create({
    $config: { timeout: 120_000 },

    async 'returns a numbered Ethereum block as JSON'() {
        let block = await CliUtils.cliJson<BlockJson>('block get 1 --chain eth --json');
        eq_(block.number, 1);
        eq_(Number.isInteger(block.timestamp), true);
        gt_(block.timestamp, 0);
        eq_(/^0x[\da-f]{64}$/i.test(block.hash), true);
        eq_(/^0x[\da-f]{64}$/i.test(block.parentHash), true);
        deepEq_(block.transactions, []);

        let rpc = await CliUtils.cliJson<BlockJson>('rpc eth_getBlockByNumber 0x1 false --chain eth --json');
        eq_(block.hash, rpc.hash);
        eq_(block.timestamp, rpc.timestamp);
    },

    async 'returns latest without progress or table output in JSON stdout'() {
        let block = await CliUtils.cliJson<BlockJson>('block get latest --chain eth --json');
        eq_(Number.isInteger(block.number), true);
        gt_(block.number, 1);
        eq_(Number.isInteger(block.timestamp), true);
        eq_(/^0x[\da-f]{64}$/i.test(block.hash), true);
        eq_(Array.isArray(block.transactions), true);
    },

    async 'resolves ISO dates with UTC and explicit offsets to nearby blocks'() {
        let dates = ['2024-01-20T14:00:37Z', '2024-01-20T16:00:37+02:00'];
        for (let date of dates) {
            let block = await CliUtils.cliJson<BlockJson>(`block get "${date}" --chain eth --json`);
            eq_(Number.isInteger(block.number), true);
            gt_(block.number, 1);

            // The resolver is approximate and may return a block on either side.
            let distance = Math.abs(block.timestamp - Date.parse(date) / 1_000);
            lt_(distance, 60);

            let numbered = await CliUtils.cliJson<BlockJson>(`block get ${block.number} --chain eth --json`);
            eq_(numbered.hash, block.hash);
            eq_(numbered.timestamp, block.timestamp);
        }
    },

    'reports missing or invalid inputs on stderr with closed stdin'() {
        let cases = [[], ['not-a-block'], ['2024-13-20T14:00:00Z'], ['1.5'], ['Infinity'], ['9007199254740992']];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'block', 'get', ...args, '--chain', 'eth', '--json'], {
                input: '', encoding: 'utf8', timeout: 10_000,
            });
            eq_(result.status, 1, result.stderr);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }
    },

    'rejects unknown subcommands with a nonzero exit code'() {
        let result = spawnSync(process.execPath, ['index.js', 'block', 'unknown', '--chain', 'eth', '--json'], {
            input: '', encoding: 'utf8', timeout: 10_000,
        });
        eq_(result.status, 1);
        eq_(result.stdout, '');
        has_(result.stderr, 'Unknown block subcommand');
    },
});
