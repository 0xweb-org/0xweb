import { UTest } from 'atma-utest';
import { CInstall } from '@core/commands/list/CInstall';
import { CommandsHandler } from '@core/commands/CommandsHandler';
import { PackageService } from '@core/services/PackageService';
import { $validate } from '@core/utils/$validate';
import { Generator } from '@dequanto/gen/Generator';
import { Web3ClientFactory } from '@dequanto/clients/Web3ClientFactory';
import { BlockchainExplorerFactory } from '@dequanto/explorer/BlockchainExplorerFactory';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'normalizes chain prefixes before parameter validation' () {
        let original = $validate.platforms;
        try {
            $validate.platforms = () => ['hardhat', 'eth', 'eth:sepolia'];
            let handler = new CommandsHandler().register(CInstall());
            let address = '0x0000000000000000000000000000000000000001';

            let result = await handler.findCommand(['i', `eth:sepolia:${address}`], { n: 'Counter', save: 'false' });
            eq_(result.params.chain, 'eth:sepolia');
            eq_(result.params.save, false);
            eq_(result.args[0], address);

            let invalid = [
                { input: `eth:${address}`, params: { name: 'Counter', c: 'hardhat' } },
                { input: '0x1234', params: { name: 'Counter', chain: 'hardhat' } },
                { input: './Counter.sol', params: { name: 'Counter', chain: 'hardhat', target: 'invalid' } },
            ];
            for (let test of invalid) {
                let { error } = await $promise.caught(handler.findCommand(['install', test.input], test.params));
                notEq_(error, null);
            }

            let path = await handler.findCommand(['i', './0xabc.sol'], { name: 'Counter', chain: 'hardhat', target: 'cjs' });
            eq_(path.args[0], './0xabc.sol');
            eq_(path.params.target, 'cjs');
        } finally {
            $validate.platforms = original;
        }
    },
    async 'keeps false global flags local and reports writes per generated file' () {
        let originals = {
            generate: Generator.prototype.generate,
            save: PackageService.prototype.savePackage,
            client: Web3ClientFactory.get,
            explorer: BlockchainExplorerFactory.get,
            platforms: $validate.platforms,
        };
        let registrations: boolean[] = [];
        let outputs: string[] = [];
        try {
            $validate.platforms = () => ['hardhat'];
            Web3ClientFactory.get = (() => ({})) as any;
            BlockchainExplorerFactory.get = (() => ({})) as any;
            Generator.prototype.generate = (async function () {
                outputs.push(this.options.output);
                return {
                    main: 'Counter.ts', contractName: 'Counter',
                    files: ['binding', 'declaration', 'abi', 'source'].map(kind => ({ kind, path: kind, content: kind })),
                };
            }) as any;
            PackageService.prototype.savePackage = async (_pkg, opts) => { registrations.push(opts.global); };

            let handler = new CommandsHandler().register(CInstall());
            let input = './test/fixtures/install/ContractBySource.sol';
            let run = async (params) => {
                let resolved = await handler.findCommand(['i', input], { name: 'Counter', chain: 'hardhat', target: 'ts', ...params });
                return resolved.command.process(resolved.args, resolved.params, { chain: {} } as any);
            };

            let local = await run({ global: 'false', 'save-abi': 'false', 'save-sources': 'false' });
            deepEq_(registrations, [false]);
            eq_(outputs[0], './0xc/hardhat');
            eq_(local.files[0].content, undefined);

            let written = local.files.map(file => file.written);
            deepEq_(written, [true, true, false, false]);

            let memory = await run({ save: 'false' });
            eq_(registrations.length, 1);
            eq_(memory.files[0].content, 'binding');

            let memoryWrites = memory.files.map(file => file.written);
            deepEq_(memoryWrites, [false, false, false, false]);

            let global = await run({ global: 'true', 'include-content': 'true' });
            deepEq_(registrations, [false, true]);
            eq_(global.files[0].content, 'binding');

            let globalOutput = outputs[2].includes('.dequanto/0xc/hardhat');
            eq_(globalOutput, true);
        } finally {
            Generator.prototype.generate = originals.generate;
            PackageService.prototype.savePackage = originals.save;
            Web3ClientFactory.get = originals.client;
            BlockchainExplorerFactory.get = originals.explorer;
            $validate.platforms = originals.platforms;
        }
    },
});
