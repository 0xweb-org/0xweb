import { UTest } from 'atma-utest';
import { TxService } from '@core/services/TxService';
import { InternalTokenService } from '@core/services/InternalTokenService';
import { $abiProvider } from '@dequanto/utils/$abiProvider';
import { $abiCoder } from '@dequanto/abi/$abiCoder';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { TxLogsTransfer } from '@dequanto/txs/receipt/TxLogsTransfer';
import { TEth } from '@dequanto/models/TEth';

const hash = `0x${'11'.repeat(32)}` as TEth.Hex;
const address = '0x0000000000000000000000000000000000000001' as TEth.Address;
const tx = { hash, to: address, input: '0x' } as unknown as TEth.Tx;

function service(receipt: TEth.TxReceipt | null) {
    return new TxService({
        config: { env: 'api' },
        chain: { client: {
            platform: 'eth', network: 'eth',
            getTransaction: async () => tx,
            getTransactionReceipt: async () => receipt,
            getBlock: async () => ({ number: 10 }),
        } },
    } as any);
}

UTest.create({
    async 'returns all logs with emitter ABI lookup and retains transfer summaries' () {
        let changed: TEth.Abi.Item = { type: 'event', name: 'Changed', inputs: [{ name: 'value', type: 'uint256' }] };
        let transfer: TEth.Abi.Item = { type: 'event', name: 'Transfer', inputs: [
            { name: 'from', type: 'address', indexed: true },
            { name: 'to', type: 'address', indexed: true },
            { name: 'value', type: 'uint256' },
        ] };
        let unknown = '0x0000000000000000000000000000000000000002' as TEth.Address;
        let logs = [changed, changed, changed, transfer].map((event, index) => ({
            address: index === 1 ? unknown : address,
            topics: [$abiUtils.getTopicSignature(event), ...(event === transfer
                ? [$abiCoder.encode(['address'], [address]), $abiCoder.encode(['address'], [unknown])] : [])],
            data: $abiCoder.encode(['uint256'], [BigInt(index + 1)]),
            blockNumber: 10, logIndex: index, transactionHash: hash,
        } as TEth.Log));
        let receipt = { status: 1, blockNumber: 10, logs } as TEth.TxReceipt;
        let originalAbi = $abiProvider.getAbi;
        let originalExtract = TxLogsTransfer.prototype.extractFromParsed;
        let originalToken = InternalTokenService.prototype.getTokenData;
        let requests = [];
        let formatted = [];
        Object.assign($abiProvider, { getAbi: async (emitter, platform) => {
            requests.push({ emitter, platform });
            return emitter === unknown ? null : { abi: [changed, transfer] };
        } });
        TxLogsTransfer.prototype.extractFromParsed = async (knownLogs, platform) => {
            eq_(platform, 'eth');
            formatted = knownLogs.filter(log => log.event === 'Transfer');
            return formatted.map(log => ({
                event: log.event, from: log.params.from, to: log.params.to, amount: log.params.value,
                token: { address: log.address, symbol: 'TEST', decimals: 18, platform },
            }));
        };
        InternalTokenService.prototype.getTokenData = async () => { throw new Error('No pricing metadata'); };

        try {
            let result = await service(receipt).getTx(hash);
            eq_(result.status, 'success');
            eq_('events' in result, false);
            eq_(result.receipt, receipt);
            deepEq_(result.logs.map(log => log.raw), logs);
            deepEq_(result.logs.map(log => log.decoded), [true, false, true, true]);
            deepEq_(result.logs[1], { decoded: false, raw: logs[1], reason: 'ABI_UNAVAILABLE' });
            eq_(requests.every(request => request.platform === 'eth'), true);
            eq_(requests.some(request => request.emitter === unknown), true);

            let decoded = result.logs.filter(log => log.decoded === true);
            deepEq_(decoded.map(log => log.event), ['Changed', 'Changed', 'Transfer']);
            deepEq_(decoded.map(log => log.params.value), [1n, 3n, 4n]);

            eq_(formatted.length, 1);
            deepEq_(result.transfers, [{ event: 'Transfer', from: address, to: unknown, amount: 4n, token: null, usd: '?' }]);
        } finally {
            Object.assign($abiProvider, { getAbi: originalAbi });
            TxLogsTransfer.prototype.extractFromParsed = originalExtract;
            InternalTokenService.prototype.getTokenData = originalToken;
        }
    },

    async 'pending transactions return an empty logs array' () {
        let result = await service(null).getTx(hash);
        eq_(result.status, 'pending');
        eq_(result.block, null);
        deepEq_(result.logs, []);
        eq_('events' in result, false);
    },
});
