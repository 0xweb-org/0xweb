import { UTest } from 'atma-utest';
import { CDeployment } from '@core/commands/list/CDeployment';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';
import { DeploymentsStorage } from '@dequanto/contracts/deploy/storage/DeploymentsStorage';
import { $console } from '@core/utils/$console';
import { spawnSync } from 'child_process';

UTest.create({
    async 'fetch returns JSON data and forwards the required main parameter'() {
        let original = { save: Deployments.prototype.saveExisting, get: DeploymentsStorage.prototype.getDeploymentInfo, log: console.log, json: $console.isJsonOnly() };
        let address = '0x0000000000000000000000000000000000000001';
        let record = { id: 'Counter', address, main: './Counter.ts', name: 'Counter' };
        let output: string[] = [];
        try {
            $console.setJsonOnly(true);
            Deployments.prototype.saveExisting = async function (params) {
                deepEq_(params, { contractAddress: address, name: 'Counter', id: 'Counter', main: './Counter.ts' });
                eq_(this.opts.directory, './0xc/deployments');
            };
            DeploymentsStorage.prototype.getDeploymentInfo = (async () => record) as any;
            let command = CDeployment().subcommands[0];
            let result = await command.process([address, 'Counter'], { main: './Counter.ts' }, { chain: { client: { platform: 'eth', network: 'eth' } } } as any);
            console.log = value => { output.push(value); };
            $console.json(result);
            eq_(output.length, 1);
            deepEq_(JSON.parse(output[0]), { chain: 'eth', directory: './0xc/deployments', deployment: record });
        } finally {
            Deployments.prototype.saveExisting = original.save;
            DeploymentsStorage.prototype.getDeploymentInfo = original.get;
            console.log = original.log;
            $console.setJsonOnly(original.json);
        }
    },
    'CLI JSON invalid inputs fail with empty stdout'() {
        let cases = [[], ['invalid', 'Counter', '--main', './Counter.ts']];
        for (let args of cases) {
            let result = spawnSync(process.execPath, ['index.js', 'deployment', 'fetch', ...args, '--chain', 'eth', '--json', '--local'], {
                encoding: 'utf8', input: '', timeout: 15_000,
            });
            eq_(result.status, 1);
            eq_(result.stdout, '');
        }
    },
});
