import { UTest } from 'atma-utest';
import { TxLogParser } from '@dequanto/txs/receipt/TxLogParser';
import { $abiCoder } from '@dequanto/abi/$abiCoder';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $contract } from '@dequanto/utils/$contract';
import { TEth } from '@dequanto/models/TEth';

function receiptLog(address: TEth.Address, event: TEth.Abi.Item, topics: TEth.Hex[], data: TEth.Hex, logIndex = 0): TEth.Log {
    return {
        address, topics: [$abiUtils.getTopicSignature(event), ...topics], data,
        blockNumber: 10, logIndex,
        transactionHash: `0x${'11'.repeat(32)}`,
    } as TEth.Log;
}

UTest.create({
    async 'preserves interleaved argument order and repeated receipt logs' () {
        let address: TEth.Address = '0x000000000000000000000000000000000000ab31';
        let account: TEth.Address = '0x0000000000000000000000000000000000000001';
        let event: TEth.Abi.Item = {
            type: 'event', name: 'Changed', inputs: [
                { name: 'value', type: 'uint256' },
                { name: 'account', type: 'address', indexed: true },
                { name: 'previous', type: 'uint256' },
                { name: 'next', type: 'uint256', indexed: true },
            ],
        };
        $contract.store.register({ address, abi: [event] });

        let topics = [$abiCoder.encode(['address'], [account]), $abiCoder.encode(['uint256'], [9n])];
        let logs = [
            receiptLog(address, event, topics, $abiCoder.encode(['uint256', 'uint256'], [7n, 5n])),
            receiptLog(address, event, topics, $abiCoder.encode(['uint256', 'uint256'], [8n, 6n]), 1),
        ];
        let parsed = await TxLogParser.parseWithAbiLookup({ logs }, { platform: 'hardhat' });
        eq_(parsed.length, 2);
        deepEq_(parsed.map(item => item.raw), logs);

        for (let [index, item] of parsed.entries()) {
            eq_(item.decoded, true);
            if (item.decoded === false) {
                continue;
            }
            deepEq_(item.arguments, [
                { name: 'value', value: BigInt(7 + index) },
                { name: 'account', value: account },
                { name: 'previous', value: BigInt(5 + index) },
                { name: 'next', value: 9n },
            ]);
            deepEq_(item.params, { value: BigInt(7 + index), account, previous: BigInt(5 + index), next: 9n });
            eq_(item.event, 'Changed');
            eq_(item.address, address);
            eq_(item.logIndex, index);
            eq_(item.blockNumber, 10);
            eq_(item.transactionHash, logs[index].transactionHash);
        }
    },

    async 'preserves indexed reference hashes and decodes indexed scalars' () {
        let address: TEth.Address = '0x000000000000000000000000000000000000ab32';
        let hash = `0x${'12'.repeat(32)}` as TEth.Hex;
        let cases = [
            { type: 'uint256[2]' },
            { type: 'uint256[]' },
            { type: 'tuple', components: [{ name: 'value', type: 'uint256' }] },
            { type: 'string' },
            { type: 'bytes' },
            { type: 'bytes32' },
        ];
        let events: TEth.Abi.Item[] = cases.map((input, index) => ({
            type: 'event', name: `Snapshot${index}`, inputs: [{ ...input, name: 'value', indexed: true }],
        }));
        $contract.store.register({ address, abi: events });

        let logs = events.map((event, index) => receiptLog(address, event, [hash], '0x', index));
        let parsed = await TxLogParser.parseWithAbiLookup({ logs }, { platform: 'hardhat' });
        eq_(parsed.length, cases.length);

        for (let [index, item] of parsed.entries()) {
            eq_(item.decoded, true);
            if (item.decoded === false) {
                continue;
            }
            eq_(item.event, events[index].name);
            deepEq_(item.arguments, [{ name: 'value', value: hash }]);
            deepEq_(item.params, { value: hash });
            eq_(item.raw, logs[index]);
        }
    },

    async 'still decodes non-indexed arrays and tuples' () {
        let address: TEth.Address = '0x000000000000000000000000000000000000ab33';
        let event: TEth.Abi.Item = {
            type: 'event', name: 'Snapshot', inputs: [
                { name: 'fixed', type: 'uint256[2]' },
                { name: 'dynamic', type: 'uint256[]' },
                { name: 'record', type: 'tuple', components: [{ name: 'value', type: 'uint256' }] },
            ],
        };
        $contract.store.register({ address, abi: [event] });

        let data = $abiCoder.encode(event.inputs, [[1n, 2n], [3n, 4n, 5n], [6n]]);
        let raw = receiptLog(address, event, [], data);
        let [parsed] = await TxLogParser.parseWithAbiLookup({ logs: [raw] }, { platform: 'hardhat' });
        eq_(parsed.decoded, true);
        if (parsed.decoded === false) {
            return;
        }
        deepEq_(parsed.params, { fixed: [1n, 2n], dynamic: [3n, 4n, 5n], record: { value: 6n } });
        deepEq_(parsed.arguments.map(arg => arg.name), ['fixed', 'dynamic', 'record']);
    },
});
