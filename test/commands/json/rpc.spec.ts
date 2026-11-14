import { UTest } from 'atma-utest';
import { $abi } from '@dequanto/abi/$abi';
import { $address } from '@dequanto/utils/$address';
import { CliUtils } from '../../CliUtils';

interface RpcBlockJson {
    number: number;
    hash: string;
    parentHash: string;
    timestamp: number;
    transactions: string[];
}

UTest.create({
    $config: {
        timeout: 60_000,
    },

    async 'returns the Ethereum chain ID as a JSON number'() {
        let chainId = await CliUtils.cliJson<number>('rpc eth_chainId --chain eth --json');
        eq_(chainId, 1);
    },

    async 'returns the USDC balance of the zero address through eth_call'() {
        let transaction = {
            to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            data: $abi.encodeCall('balanceOf(address)', [$address.ZERO]),
        };
        let result = await CliUtils.cliJson<string>(
            `rpc eth_call '${JSON.stringify(transaction)}' latest --chain eth --json`
        );
        eq_(typeof result, 'string');

        let isAbiWord = /^0x[\da-f]{64}$/i.test(result);
        eq_(isAbiWord, true);

        let balance = BigInt(result);
        eq_(balance, 0n);
    },

    async 'resolves latest to an Ethereum block with a numeric block number'() {
        let block = await CliUtils.cliJson<RpcBlockJson>(
            'rpc eth_getBlockByNumber latest false --chain eth --json'
        );
        notEq_(block, null);
        eq_(Number.isInteger(block.number), true);
        gt_(block.number, 1);

        let hashIsValid = /^0x[\da-f]{64}$/i.test(block.hash);
        eq_(hashIsValid, true);

        let transactionsAreHashes = Array.isArray(block.transactions)
            && block.transactions.every(hash => /^0x[\da-f]{64}$/i.test(hash));
        eq_(transactionsAreHashes, true);
    },

    async 'returns block information for a specific Ethereum block number'() {
        let blockNumber = 1;
        let blockHex = `0x${blockNumber.toString(16)}`;
        let block = await CliUtils.cliJson<RpcBlockJson>(
            `rpc eth_getBlockByNumber ${blockHex} false --chain eth --json`
        );
        notEq_(block, null);
        eq_(block.number, blockNumber);
        eq_(Number.isInteger(block.timestamp), true);
        gt_(block.timestamp, 0);

        let hashesAreValid = [block.hash, block.parentHash].every(hash => /^0x[\da-f]{64}$/i.test(hash));
        eq_(hashesAreValid, true);

        let transactions = block.transactions;
        deepEq_(transactions, []);

        let argumentsToTest = [
            `${blockNumber} false`,
            `--arg0 uint256:${blockNumber} --arg1 boolean:0`,
        ];
        for (let args of argumentsToTest) {
            let sameBlock = await CliUtils.cliJson<RpcBlockJson>(
                `rpc eth_getBlockByNumber ${args} --chain eth --json`
            );
            eq_(sameBlock.number, blockNumber);
            eq_(sameBlock.hash, block.hash);
        }
    },
});
