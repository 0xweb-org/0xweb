import { UTest } from 'atma-utest';
import { BlockService } from '@core/services/BlockService';
import { BlockDateResolver } from '@dequanto/blocks/BlockDateResolver';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'rejects invalid heights before querying RPC'() {
        let calls = 0;
        let service = new BlockService({ config: { env: 'api' }, chain: {
            client: { async getBlock() { calls++; return null; } },
        } } as any);

        for (let input of ['', ' ', '-1', '1.5', 'Infinity', '9007199254740992', 'not-a-block']) {
            let { error } = await $promise.caught(service.getBlock(input));
            notEq_(error, null);
        }
        eq_(calls, 0);
    },

    async 'reports missing blocks and permits genesis'() {
        let requested: number;
        let service = new BlockService({ config: { env: 'api' }, chain: {
            client: { async getBlock(number: number) { requested = number; return null; } },
        } } as any);

        let { error } = await $promise.caught(service.getBlock('0'));
        eq_(requested, 0);
        has_(error.message, 'Block 0 was not found');
    },

    async 'preserves legacy seconds and date/time rollover'() {
        let original = BlockDateResolver.prototype.getBlockNumberFor;
        let resolvedDate: Date;
        BlockDateResolver.prototype.getBlockNumberFor = async function (date: Date) {
            resolvedDate = date;
            return 1;
        };
        let service = new BlockService({ config: { env: 'api' }, chain: {
            client: { async getBlock() { return { number: 1, timestamp: 1, transactions: [] }; } },
        } } as any);

        try {
            for (let input of ['20.01.2024 14:00:37', '2024-01-20 14:00:37']) {
                await service.getBlock(input);
                eq_(resolvedDate.getTime(), new Date(2024, 0, 20, 14, 0, 37).getTime());
            }

            let cases = [
                { input: '31.02.2024 14:00:37', expected: new Date(2024, 1, 31, 14, 0, 37) },
                { input: '20.01.2024 14:00:60', expected: new Date(2024, 0, 20, 14, 0, 60) },
            ];
            for (let { input, expected } of cases) {
                await service.getBlock(input);
                eq_(resolvedDate.getTime(), expected.getTime());
            }
        } finally {
            BlockDateResolver.prototype.getBlockNumberFor = original;
        }
    },
});
