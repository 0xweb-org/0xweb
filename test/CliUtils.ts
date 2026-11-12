import { l } from '@dequanto/utils/$logger';
import { run } from 'shellbee';

export const CliUtils = {
    async cliJson<T = any>(command: string, opts?: { silent?: boolean }): Promise<T> {
        let str = await CliUtils.cli(command, opts);
        try {
            return JSON.parse(str.trim());
        } catch (error) {
            throw new Error(`"${str}" is not a valid JSON`);
        }
    },
    async cli(command: string, opts?: { silent?: boolean }) {
        let cmdStr = `node ./index.js ${command}`;
        l`Execute bold<yellow<${cmdStr}>>`;
        let { stdout, stderr, lastCode } = await run({
            command: cmdStr,
            silent: opts?.silent ?? true,
        });
        if (lastCode !== 0) {
            console.error(stdout.join('\n'), stderr.join('\n'));
            throw new Error(`Process exit code ${lastCode}`)
        }
        return stdout.join('\n').trim();
    },
}
