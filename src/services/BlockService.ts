import { $require } from '@dequanto/utils/$require';
import { BaseService } from './BaseService';
import { TEth } from '@dequanto/models/TEth';
import { $block } from '@dequanto/utils/$block';
import { BlockDateResolver } from '@dequanto/blocks/BlockDateResolver';
import { $date } from '@dequanto/utils/$date';

export class BlockService extends BaseService {

    async getBlock(blockNr: string) {
        let { client } = $require.notNull(this.app.chain, `Chain not initialized`);
        $require.True(typeof blockNr === 'string' && blockNr.trim().length > 0, 'Provide a block number, latest, or a date');
        blockNr = blockNr.trim();

        if (blockNr === 'latest') {
            this.printLogToast('Getting latest block number...');
            let nr = await client.getBlockNumber();
            blockNr = String(nr);
        }

        if (/[\.\-]\d+[\.\-]/.test(blockNr)) {
            let date = $date.parse(blockNr);
            if (date == null || isNaN(date.getTime())) {
                throw new Error(`Could not parse date ${blockNr}`);
            }
            this.printLogToast(`Finding the block for ${date.toISOString()}`);
            let resolver = new BlockDateResolver(client);
            let nr = await resolver.getBlockNumberFor(date);
            blockNr = String(nr);
        }

        let nr = Number(blockNr);

        $require.True(Number.isSafeInteger(nr) && nr >= 0, 'Block number must be a nonnegative safe integer');
        this.printLogToast(`Loading block bold<${nr}>`);

        let block = await client.getBlock(nr);
        $require.notNull(block, `Block ${nr} was not found`);
        this.printLogTable([
            ['Block', nr],
            ['Hash', block.hash],
            ['Parent', block.parentHash],
            ['Miner', block.miner],
            ['Time', $date.format($block.getDate(block), 'dd.MM.yyyy HH:mm:ss') + ` gray<(${ block.timestamp })>`],
            ['Transactions', block.transactions?.length ?? 0],
        ]);
        let hashes = block.transactions?.map((tx, i) => {
            return [`#${i + 1}`, tx as TEth.Hex];
        });
        this.printLogTable([
            ...(hashes ?? [])
        ]);
        return block;
    }
}
