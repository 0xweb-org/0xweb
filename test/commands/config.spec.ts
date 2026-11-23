import { UTest } from 'atma-utest';
import AppConfig from 'appcfg';
import { File } from 'atma-io';
import { CConfig } from '@core/commands/list/CConfig';
import { Config } from '@dequanto/config/Config';
import { $console } from '@core/utils/$console';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'configuration parsing and redaction use isolated file storage'() {
        let path = './test/bin/config-review/config.json';
        let log = $console.log;
        let result = $console.result;
        let messages: string[] = [];
        try {
            await File.writeAsync(path, {});
            let config = await AppConfig.fetch([
                { config: { pin: 'fixture-pin', accounts: [{ key: 'fixture-key' }], provider: { apiKey: 'fixture-api-key' } } },
                { name: 'main', path, writable: true },
            ]);
            let app = { config } as any;
            let run = (params) => CConfig().process([], params, app);
            $console.log = (...args) => { messages.push(JSON.stringify(args)); };
            $console.result = (value) => { messages.push(JSON.stringify(value)); };
            let viewed = await run({ view: true });
            eq_(viewed.pin, '[REDACTED]');
            eq_(viewed.accounts, '[REDACTED]');
            eq_(viewed.provider.apiKey, '[REDACTED]');
            eq_(await run({ get: 'pin' }), '[REDACTED]');
            eq_(await run({ get: 'accounts.0.key' }), null);
            eq_(config.pin, 'fixture-pin');
            let set = await run({ set: ' pin = another-fixture; n=-2; exponent=1e3; large=9007199254740993; malformed=1.2.3; enabled=false; empty=null' });
            eq_(set.values.pin, '[REDACTED]');
            let saved = await File.readAsync<any>(path, { cached: false });
            deepEq_(saved, { pin: 'another-fixture', n: -2, exponent: 1_000, large: '9007199254740993', malformed: '1.2.3', enabled: false, empty: 'null' });
            let before = JSON.stringify(saved);
            let invalid = [
                { set: '__proto__.cconfigPolluted=true' },
                { set: 'constructor.prototype.cconfigPolluted=true' },
                { set: '{"nested":{"__proto__":{"cconfigPolluted":true}}}' },
                { set: '{"items":[{"prototype":{}}]}' },
                { get: '__proto__' }, { get: 'constructor.prototype' },
                { set: '{"large":9007199254740993}' }, { set: 'x..y=1' }, { set: ' =1' }, { set: '' }, { set: 'n=1e999' },
                {}, { view: true, get: 'pin' }, { view: true, local: true, global: true },
                { set: '{"pin":"fixture-secret"' },
            ];
            for (let params of invalid) {
                let { error } = await $promise.caught(run(params));
                notEq_(error, null);
                eq_(error.message.includes('fixture-secret'), false);
            }
            eq_(({} as any).cconfigPolluted, undefined);
            eq_(JSON.stringify(await File.readAsync(path, { cached: false })), before);
            let output = messages.join('');
            let secrets = ['fixture-pin', 'fixture-key', 'fixture-api-key', 'another-fixture'];
            for (let secret of secrets) eq_(output.includes(secret), false);
        } finally {
            $console.log = log;
            $console.result = result;
            Config.clean();
            if (await File.existsAsync(path)) await File.removeAsync(path);
        }
    },
});
