import { UTest } from 'atma-utest';
import { ContractService } from '@core/services/ContractService';
import { PackageService } from '@core/services/PackageService';
import { ContractReader } from '@dequanto/contracts/ContractReader';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'distinguishes missing ABI functions from missing deployed code'() {
        const original = { getPackage: PackageService.prototype.getPackage, read: ContractReader.prototype.readAsync };
        const address = '0x0000000000000000000000000000000000000001';
        let reads = 0;
        let code: string = null;
        const service = new ContractService({ config: { env: 'api' }, chain: { client: {
            platform: 'hardhat', getCode: async () => code,
        } } } as any);
        try {
            PackageService.prototype.getPackage = async () => ({
                name: 'Foo', address, platform: 'hardhat',
                abi: [{ type: 'function', name: 'getFoo', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] }],
            }) as any;
            ContractReader.prototype.readAsync = async () => {
                reads++;
                throw new Error('Function call returned undefined');
            };
            const calls = [
                () => service.call('Foo', 'missing', {}, 'read'),
                () => service.call('Foo', 'missing', {}, 'write'),
                () => service.simulate('Foo', 'missing', {}),
                () => service.calldata('Foo', 'missing', {}),
            ];
            for (const call of calls) {
                const { error } = await $promise.caught(call());
                has_(error.message, 'Function "missing" is not present in the ABI for contract "Foo"');
            }
            eq_(reads, 0);
            const { error } = await $promise.caught(service.call('Foo', 'getFoo', {}, 'read'));
            has_(error.message, `No contract bytecode found at ${address} on hardhat`);
            has_(error.message, 'saved deployment may be stale');
            code = '0x6000';
            const { error: other } = await $promise.caught(service.call('Foo', 'getFoo', {}, 'read'));
            eq_(other.message, 'Function call returned undefined');
            code = null;
            const { error: historical } = await $promise.caught(service.call('Foo', 'getFoo', { block: 1 }, 'read'));
            eq_(historical.message, 'Function call returned undefined');
        } finally {
            PackageService.prototype.getPackage = original.getPackage;
            ContractReader.prototype.readAsync = original.read;
        }
    },
});
