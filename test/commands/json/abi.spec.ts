import { UTest } from 'atma-utest';
import { $abi } from '@dequanto/abi/$abi';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { $address } from '@dequanto/utils/$address';
import { CliUtils } from '../../CliUtils';
import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const signature = 'transfer(address to, uint256 amount)';
const amount = 9_007_199_254_740_993n;
const calldata = $abi.encodeCall(signature, [$address.ZERO, amount]);

UTest.create({
    $config: { timeout: 60_000 },

    async 'decodes a function signature without a chain'() {
        let result = await CliUtils.forkJson(
            `abi decode-calldata ${calldata} --abi "${signature}" --json`
        );
        eq_(result.name, 'transfer');
        deepEq_(result.args, [$address.ZERO, amount.toString()]);
        deepEq_(result.params, { to: $address.ZERO, amount: amount.toString() });
    },

    async 'loads the USDC ABI from the Ethereum explorer'() {
        let result = await CliUtils.forkJson(
            `abi decode-calldata ${calldata} --abi 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --chain eth --json`
        );
        eq_(result.name, 'transfer');
        deepEq_(result.args, [$address.ZERO, amount.toString()]);
    },

    async 'selects an overload from JSON ABI items'() {
        let abi = [
            $abiParser.parseMethod('transfer(address to)'),
            $abiParser.parseMethod(signature),
        ];
        let result = await CliUtils.forkJson(
            `abi decode-calldata --calldata ${calldata} --abi '${JSON.stringify(abi)}' --json`
        );
        deepEq_(result.args, [$address.ZERO, amount.toString()]);

        let item = await CliUtils.forkJson(
            `abi decode-calldata ${calldata} --abi '${JSON.stringify(abi[1])}' --json`
        );
        deepEq_(item, result);
    },

    async 'loads ABI arrays and compiler artifacts from files'() {
        let base = resolve('test/bin/abi-decode');
        mkdirSync(base, { recursive: true });

        let directory = mkdtempSync(resolve(base, 'run-'));
        let abi = [$abiParser.parseMethod(signature)];
        let fixtures = [abi, { contractName: 'Token', abi }];
        for (let [index, fixture] of fixtures.entries()) {
            let file = resolve(directory, `abi ${index}.json`);
            writeFileSync(file, JSON.stringify(fixture));

            let result = await CliUtils.forkJson(
                `abi decode-calldata ${calldata} --abi "${file}" --json`
            );
            eq_(result.name, 'transfer');
            deepEq_(result.params, { to: $address.ZERO, amount: amount.toString() });
        }
    },

    async 'decodes dynamic arrays and functions without arguments'() {
        let method = 'setValues(uint256[] values)';
        let input = $abi.encodeCall(method, [[1n, amount]]);
        let result = await CliUtils.forkJson(`abi decode-calldata ${input} --abi "${method}" --json`);
        deepEq_(result.args, [['1', amount.toString()]]);

        let emptyCall = $abi.encodeCall('ping()', []);
        let empty = await CliUtils.forkJson(`abi decode-calldata ${emptyCall} --abi "ping()" --json`);
        eq_(empty.name, 'ping');
        deepEq_(empty.args, []);
    },

    'reports invalid inputs on stderr without contaminating JSON stdout'() {
        let cases = [
            ['0x123', '--abi', signature],
            [calldata],
            [calldata, '--abi', 'approve(address spender, uint256 amount)'],
            [calldata, '--abi', '{invalid}'],
            [calldata.slice(0, 10), '--abi', signature],
            [calldata, '--abi', $address.ZERO],
            [calldata, '--abi', ''],
            [calldata, '--abi', './test/bin/missing-abi.json'],
            [calldata, '--abi', './test/bin/unsupported.abi'],
        ];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'abi', 'decode-calldata', ...args, '--json'], {
                encoding: 'utf8', input: '', timeout: 10_000,
            });
            eq_(result.status, 1, result.stderr);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }
    },
});
