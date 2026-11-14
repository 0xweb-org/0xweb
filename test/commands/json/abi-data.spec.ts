import { UTest } from 'atma-utest';
import { $abi } from '@dequanto/abi/$abi';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $address } from '@dequanto/utils/$address';
import { CliUtils } from '../../CliUtils';
import { spawnSync } from 'child_process';
import { Fragment } from '@dequanto/abi/fragments';
import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { resolve } from 'path';

UTest.create({
    $config: { timeout: 60_000 },

    async 'decodes custom and built-in revert errors'() {
        let signature = 'error InsufficientBalance(address account, uint256 amount)';
        let data = $abi.encodeCall(JSON.parse(Fragment.from(signature).format('json')), [$address.ZERO, 123n]);
        let result = await CliUtils.cliJson(`abi decode-error ${data} --abi "${signature}" --json`);
        eq_(result.name, 'InsufficientBalance');
        deepEq_(result.args, [$address.ZERO, '123']);
        deepEq_(result.params, { account: $address.ZERO, amount: '123' });

        let reason = $abi.encodeCall('Error(string message)', ['Not allowed']);
        let error = await CliUtils.cliJson(`abi decode-error --data ${reason} --json`);
        eq_(error.name, 'Error');
        deepEq_(error.params, { message: 'Not allowed' });

        let panic = $abi.encodeCall('Panic(uint256 code)', [17n]);
        let decoded = await CliUtils.cliJson(`abi decode-error ${panic} --json`);
        eq_(decoded.name, 'Panic');
        deepEq_(decoded.args, ['17']);
    },

    async 'decodes return values and selects overloaded functions'() {
        let abi = [
            $abiParser.parseMethod('balanceOf(address owner) view returns (uint256 balance)'),
            $abiParser.parseMethod('balanceOf() view returns (uint256 balance)'),
        ];
        let data = $abi.encode(['uint256'], [9_007_199_254_740_993n]);
        let result = await CliUtils.cliJson(`abi decode-result ${data} --abi '${JSON.stringify(abi)}' --method "balanceOf(address)" --json`);
        eq_(result.name, 'balanceOf');
        deepEq_(result.args, ['9007199254740993']);
        deepEq_(result.params, { balance: '9007199254740993' });

        let values = $abi.encode(['uint256[]', 'string'], [[1n, 2n], 'hello']);
        let dynamic = await CliUtils.cliJson(`abi decode-result ${values} --abi "read() view returns (uint256[] values, string label)" --json`);
        deepEq_(dynamic.params, { values: ['1', '2'], label: 'hello' });

        let empty = await CliUtils.cliJson('abi decode-result 0x --abi "ping()" --json');
        deepEq_(empty.args, []);
    },

    async 'decodes event topics and data in ABI input order'() {
        let signature = 'event Changed(uint256 amount, address indexed owner, string label)';
        let event = JSON.parse(Fragment.from(signature).format('json'));
        let topics = [$abiUtils.getTopicSignature(event), $abi.encode(['address'], [$address.ZERO])];
        let data = $abi.encode(['uint256', 'string'], [123n, 'hello']);
        let result = await CliUtils.cliJson(`abi decode-log ${data} --topics '${JSON.stringify(topics)}' --abi "${signature}" --json`);
        eq_(result.name, 'Changed');
        deepEq_(result.args, ['123', $address.ZERO, 'hello']);
        deepEq_(result.params, { amount: '123', owner: $address.ZERO, label: 'hello' });
    },

    async 'keeps indexed complex values hashed and supports anonymous events'() {
        let signature = 'event Tagged(string indexed tag, uint256[2] indexed values)';
        let event = JSON.parse(Fragment.from(signature).format('json'));
        let tagHash = '0x' + '11'.repeat(32);
        let valuesHash = '0x' + '22'.repeat(32);
        let topics = [$abiUtils.getTopicSignature(event), tagHash, valuesHash];
        let result = await CliUtils.cliJson(`abi decode-log 0x --topics '${JSON.stringify(topics)}' --abi "${signature}" --json`);
        deepEq_(result.args, [tagHash, valuesHash]);

        let anonymous = { ...JSON.parse(Fragment.from('event Hidden(address indexed owner, uint256 amount)').format('json')), anonymous: true };
        let anonymousTopics = [$abi.encode(['address'], [$address.ZERO])];
        let data = $abi.encode(['uint256'], [7n]);
        let hidden = await CliUtils.cliJson(`abi decode-log ${data} --topics '${JSON.stringify(anonymousTopics)}' --abi '${JSON.stringify(anonymous)}' --event Hidden --json`);
        deepEq_(hidden.params, { owner: $address.ZERO, amount: '7' });

        let noTopics = { ...$abiParser.parseMethod('event Plain(uint256 amount)'), anonymous: true };
        let plain = await CliUtils.cliJson(`abi decode-log ${data} --topics '[]' --abi '${JSON.stringify(noTopics)}' --json`);
        deepEq_(plain.args, ['7']);
    },

    'rejects unknown, ambiguous, malformed, and incomplete inputs'() {
        let ambiguous = JSON.stringify(['read() returns (uint256)', 'other() returns (uint256)']);
        let cases = [
            ['decode-error', '0x'],
            ['decode-error', '0x12345678'],
            ['decode-error', '0x08c379a0'],
            ['decode-result', '0x', '--abi', 'read() returns (uint256)'],
            ['decode-result', $abi.encode(['uint256'], [1n]), '--abi', 'read() returns (uint256 a, uint256 b)'],
            ['decode-result', '0x', '--abi', ambiguous],
            ['decode-result', '0x', '--abi', ambiguous, '--method', 'missing'],
            ['decode-log', '0x', '--abi', 'event Ping()'],
            ['decode-log', '0x', '--abi', 'event Ping()', '--topics', '[]'],
            ['decode-log', '0x', '--abi', 'event Ping()', '--topics', '["0x1234"]'],
            ['decode-log', '0x', '--abi', 'event Ping()', '--topics', '{invalid}'],
            ['decode-log', '0x', '--abi', 'event Ping()', '--topics', JSON.stringify(['0x' + '00'.repeat(32)]), '--event', 'Ping'],
            ['decode-error', '0x08c379a0', '--abi', $address.ZERO],
            ['decode-result', '0x', '--abi', $address.ZERO],
            ['decode-log', '0x', '--topics', '[]', '--abi', $address.ZERO],
        ];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'abi', ...args, '--json'], {
                input: '', encoding: 'utf8', timeout: 10_000,
            });
            eq_(result.status, 1, result.stderr);
            eq_(result.stdout, '');
            gt_(result.stderr.length, 0);
        }
    },

    async 'loads each decoder ABI from a compiler artifact'() {
        let abi = [
            JSON.parse(Fragment.from('error Denied()').format('json')),
            $abiParser.parseMethod('read() returns (uint256 value)'),
            JSON.parse(Fragment.from('event Updated(uint256 value)').format('json')),
        ];
        let base = resolve('test/bin/abi-data');
        mkdirSync(base, { recursive: true });

        let directory = mkdtempSync(resolve(base, 'run-'));
        let path = resolve(directory, 'artifact.json');
        writeFileSync(path, JSON.stringify({ abi }));

        let error = await CliUtils.cliJson(`abi decode-error ${$abi.encodeCall(abi[0], [])} --abi "${path}" --json`);
        eq_(error.name, 'Denied');
        deepEq_(error.args, []);

        let data = $abi.encode(['uint256'], [5n]);
        let result = await CliUtils.cliJson(`abi decode-result ${data} --abi "${path}" --method read --json`);
        deepEq_(result.params, { value: '5' });

        let topics = JSON.stringify([$abiUtils.getTopicSignature(abi[2])]);
        let log = await CliUtils.cliJson(`abi decode-log ${data} --topics '${topics}' --abi "${path}" --json`);
        deepEq_(log.params, { value: '5' });
    },
});
