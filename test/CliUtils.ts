import { l } from '@dequanto/utils/$logger';
import { run } from 'shellbee';

export const CliUtils = {
    async forkJson<T = any>(command: string, opts?: { silent?: boolean }): Promise<T> {
        let str = await CliUtils.fork(command, opts);
        try {
            return JSON.parse(str.trim());
        } catch (error) {
            throw new Error(`"${str}" is not a valid JSON`);
        }
    },
    async fork(command: string, opts?: { silent?: boolean }) {
        let cmdStr = `./index.js ${command}`;
        l`Execute bold<yellow<${cmdStr}>>`;
        let { stdout, stderr, lastCode } = await run({
            command: cmdStr,
            silent: opts?.silent ?? true,
            fork: true,
        });
        if (lastCode !== 0) {
            console.error(stdout.join('\n'), stderr.join('\n'));
            throw new Error(`Process exit code ${lastCode}`)
        }
        return stdout.join('\n').trim();
    },
}
