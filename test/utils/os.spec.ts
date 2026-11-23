import { UTest } from 'atma-utest';
import { $os } from '@core/utils/$os';
import { $promise } from '@dequanto/utils/$promise';
import { EventEmitter } from 'events';

UTest.create({
    async 'opener passes targets as data and handles process completion'() {
        const cp = require('child_process');
        let spawn = cp.spawn;
        let platform = Object.getOwnPropertyDescriptor(process, 'platform');
        let outcome: 'success' | 'exit' | 'error' = 'success';
        let calls: any[] = [];
        try {
            cp.spawn = (command, args, opts) => {
                calls.push({ command, args, opts });
                let child = new EventEmitter();
                queueMicrotask(() => {
                    if (outcome === 'error') child.emit('error', new Error('Launcher unavailable'));
                    else child.emit('close', outcome === 'success' ? 0 : 1, null);
                });
                return child;
            };
            let targets = ['https://example.test/?a=1&b=$(noop)', 'https://example.test/;echo-test', './test/file with spaces.yml'];
            let platforms = ['win32', 'darwin', 'linux'];
            for (let value of platforms) {
                Object.defineProperty(process, 'platform', { value });
                for (let target of targets) {
                    await $os.open(target);
                    let call = calls[calls.length - 1];
                    eq_(call.opts.shell, false);
                    eq_(call.opts.windowsHide, true);
                    if (value === 'win32') {
                        eq_(call.command, 'powershell.exe');
                        eq_(call.args.join(' ').includes(target), false);
                        has_(call.opts.env.OXWEB_OPEN_TARGET, target.startsWith('https:') ? target : 'file with spaces.yml');
                    } else {
                        eq_(call.command, value === 'darwin' ? 'open' : 'xdg-open');
                        eq_(call.args.length, 1);
                        has_(call.args[0], target.startsWith('https:') ? target : 'file with spaces.yml');
                    }
                }
            }
            outcome = 'exit';
            let exited = await $promise.caught($os.open('https://example.test'));
            has_(exited.error.message, 'exited with 1');
            outcome = 'error';
            let errored = await $promise.caught($os.open('https://example.test'));
            eq_(errored.error.message, 'Launcher unavailable');
            let before = calls.length;
            let invalid = await $promise.caught($os.open('https://example.test/\ninvalid'));
            notEq_(invalid.error, null);
            eq_(calls.length, before);
        } finally {
            cp.spawn = spawn;
            Object.defineProperty(process, 'platform', platform);
        }
    },
});
