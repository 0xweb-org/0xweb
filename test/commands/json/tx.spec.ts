import { UTest } from 'atma-utest';
import { File } from 'atma-io';
import { CliUtils } from '../../CliUtils';
import { TestNode } from '../../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { spawnSync } from 'child_process';

const provider = new HardhatProvider();
const client = provider.client('localhost');
const sender = provider.deployer(0);
const recipient = provider.deployer(1);
const inputPath = './test/bin/json-tx/input.json';
const outputPath = './test/bin/json-tx/signed.json';
const flags = '--chain hardhat --local --json';
let hash: string;

UTest.create({
    $config: { timeout: 60_000 },
    async $before() {
        await TestNode.start();
        await File.writeAsync(inputPath, { tx: { to: recipient.address, value: '1' } });
    },

    async 'sign returns the signed payload and honors both output aliases'() {
        let aliases = ['--output', '-o'];
        for (let alias of aliases) {
            let result = await CliUtils.forkJson(`tx sign ${inputPath} ${alias} ${outputPath} --account ${sender.key} ${flags}`);
            eq_(result.path, outputPath);
            deepEq_(result.account, { address: sender.address });
            eq_(result.tx.to, recipient.address);
            eq_(typeof result.tx.nonce, 'number');
            has_(result.signature.r, /^0x[\da-f]{64}$/i);
            has_(result.signature.s, /^0x[\da-f]{64}$/i);
            let saved = await File.readAsync<any>(outputPath, { cached: false });
            deepEq_(result.signature, saved.signature);
            deepEq_(result.tx, saved.tx);
            deepEq_(result.account, saved.account);
            let input = await File.readAsync<any>(inputPath, { cached: false });
            eq_(input.signature, undefined);
            eq_(JSON.stringify(result).includes(sender.key.slice(2)), false);
        }
    },

    async 'send returns a receipt for a signed file without a signer'() {
        let before = await client.getBalance(recipient.address);
        let receipt = await CliUtils.forkJson(`tx send ${outputPath} ${flags}`);
        eq_(receipt.status, 1);
        has_(receipt.transactionHash, /^0x[\da-f]{64}$/i);
        eq_(receipt.from.toLowerCase(), sender.address.toLowerCase());
        eq_(receipt.to.toLowerCase(), recipient.address.toLowerCase());
        eq_(await client.getBalance(recipient.address) - before, 1n);
        hash = receipt.transactionHash;
    },

    async 'view returns transaction details and null for a missing transaction'() {
        let result = await CliUtils.forkJson(`tx view ${hash} ${flags}`);
        eq_(result.status, 'success');
        eq_(result.tx.hash, hash);
        eq_(result.receipt.transactionHash, hash);
        eq_(result.block.number, result.receipt.blockNumber);
        deepEq_(result.logs, []);
        let missing = await CliUtils.forkJson(`tx view 0x${'ab'.repeat(32)} ${flags}`);
        eq_(missing, null);
    },

    async 'send accepts transaction fields and returns one JSON receipt'() {
        let before = await client.getBalance(recipient.address);
        let receipt = await CliUtils.forkJson(`tx send --to ${recipient.address} --value 2 --account ${sender.key} ${flags}`);
        eq_(receipt.status, 1);
        eq_(await client.getBalance(recipient.address) - before, 2n);
    },

    'invalid inputs fail without JSON on stdout'() {
        let cases = [
            ['sign', './test/bin/json-tx/missing.json', '--account', sender.key],
            ['send', './test/bin/json-tx/missing.json'],
            ['view', 'invalid-hash'],
        ];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'tx', ...args, '--chain', 'hardhat', '--local', '--json'], {
                input: '', encoding: 'utf8', timeout: 10_000,
            });
            eq_(result.status, 1);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }
    },
});
