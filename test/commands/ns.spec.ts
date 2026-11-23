import { UTest } from 'atma-utest';
import { CNs } from '@core/commands/list/CNs';
import { NameService } from '@dequanto/ns/NameService';
import { $console } from '@core/utils/$console';
import { $logger } from '@dequanto/utils/$logger';
import { $os } from '@core/utils/$os';
import { App } from '@core/app/App';
import { $promise } from '@dequanto/utils/$promise';
import { spawnSync } from 'child_process';

UTest.create({
    async 'JSON mode returns records without table or progress output and preserves navigation'() {
        let original = { address: NameService.prototype.getAddress, content: NameService.prototype.getContent,
            open: $os.open, table: $logger.table, toast: $logger.toast, json: $console.isJsonOnly() };
        let content = 'ipfs://QmTestCid123';
        let opened: string[] = [];
        try {
            NameService.prototype.getAddress = async () => null;
            NameService.prototype.getContent = (async () => ({ value: content })) as any;
            $os.open = async url => { opened.push(url); };
            $logger.table = () => { throw new Error('Unexpected table output'); };
            $logger.toast = () => { throw new Error('Unexpected progress output'); };
            $console.setJsonOnly(true);
            let commands = CNs().subcommands;
            let view = commands.find(x => x.command === 'view');
            let go = commands.find(x => x.command === 'go');
            deepEq_(await view.process(['example.eth'], {}, new App()), { uri: 'example.eth', address: '', content, addressPlatform: null, contentPlatform: null, errors: {} });
            let ipfs = await go.process(['example.eth'], {}, new App());
            deepEq_(ipfs, { uri: 'example.eth', address: '', content, addressPlatform: null, contentPlatform: null, errors: {}, url: 'https://cloudflare-ipfs.com/ipfs/QmTestCid123/', opened: true });
            content = 'https://example.test/foo';
            let http = await go.process(['example.eth'], {}, new App());
            eq_(http.url, content);
            eq_(http.opened, true);
            content = 'ipfs://QmTestCid123/folder/file.html?q=1#part';
            let file = await go.process(['example.eth'], {}, new App());
            eq_(file.url, 'https://cloudflare-ipfs.com/ipfs/QmTestCid123/folder/file.html?q=1#part');
            let invalid = ['unsupported:value', 'httpsnot-a-url', 'https://', 'https://user:pass@example.test', 'https://example.test/ bad', 'ipfs://bad-cid/file'];
            for (let value of invalid) {
                content = value;
                let { error } = await $promise.caught(go.process(['example.eth'], {}, new App()));
                notEq_(error, null);
            }
            NameService.prototype.getAddress = async () => { throw new Error('Address lookup failed'); };
            content = 'https://example.test/partial';
            let partial = await go.process(['example.eth'], {}, new App());
            eq_(partial.opened, true);
            eq_(partial.errors.address, 'Address lookup failed');
            $os.open = async () => { throw new Error('Launcher failed'); };
            let failed = await $promise.caught(go.process(['example.eth'], {}, new App()));
            eq_(failed.error.message, 'Launcher failed');
            content = '';
            let empty = await go.process(['example.eth'], {}, new App());
            eq_(empty.opened, false);
            eq_(opened.length, 4);
        } finally {
            NameService.prototype.getAddress = original.address;
            NameService.prototype.getContent = original.content;
            $os.open = original.open;
            $logger.table = original.table;
            $logger.toast = original.toast;
            $console.setJsonOnly(original.json);
        }
    },
    'CLI JSON failures keep stdout empty'() {
        let args = [[], ['unsupported.invalid']];
        for (let input of args) {
            let result = spawnSync(process.execPath, ['index.js', 'ns', 'view', ...input, '--json', '--local'], {
                encoding: 'utf8', input: '', timeout: 15_000,
            });
            eq_(result.status, 1);
            eq_(result.stdout, '');
        }
    },
});
