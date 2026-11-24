import { File } from 'atma-io';
import { UTest } from 'atma-utest';
import { CliUtils } from '../../CliUtils';

UTest.create({
    async 'version supports JSON and preserves text output'() {
        const pkg = await File.readAsync<any>('./package.json');
        const flags = ['--version', '-v'];
        for (const flag of flags) {
            const result = await CliUtils.forkJson(`${flag} --json --local`);
            deepEq_(result, { name: pkg.name, version: pkg.version });
            const text = await CliUtils.fork(`${flag} --local --color none`);
            has_(text, `${pkg.name}@${pkg.version}`);
        }
    },
});
