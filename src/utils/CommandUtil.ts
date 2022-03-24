import { class_Uri } from 'atma-utils';
import { File } from 'atma-io';

export namespace CommandUtil {
    export async function formatPaths(command: string, cwd: string) {

        command = command.trim();

        let redirect = '';
        let redirectIdx = command.indexOf('>>')
        if (redirectIdx > -1) {
            redirect = ' ' + command.substring(redirectIdx);
            command = command.substring(0, redirectIdx).trim();
        }

        command = ensureCwdIfCronbee(command, cwd);

        command = await rewriteAbsPath(command, cwd);
        command = ensureCwd(command, cwd);
        return command + redirect;
    }
    export function split(command: string): string[] {
        let args = [];
        for (let i = 0; i < command.length; i++) {
            let c = command[i];
            if (c === ' ') {
                continue;
            }
            if (c === '"') {
                let end = command.indexOf('"', i + 1);
                if (end === -1) {
                    throw new Error(`Invalid command ${command}. Quote not closed`);
                }
                args.push(command.slice(i + 1, end));
                i = end + 1;
                continue;
            }

            let rgx = /(\s|$)/g;

            rgx.lastIndex = i;
            let match = rgx.exec(command);
            if (match == null) {
                throw new Error(`Invalid command ${command}. Param has no ending`);
            }

            args.push(command.slice(i, match.index));
            i = match.index;
        }
        return args;
    }

    async function rewriteAbsPath(command: string, cwd: string): Promise<string> {
        let rgxCommand = /^[^\s]+/;
        let match = rgxCommand.exec(command);
        if (match == null) {
            return command;
        }
        if (match[0] === 'cronbee') {
            let args = await rewriteAbsPath(slice(command, match), cwd);
            command = `cronbee ${args}`;
        }
        let path = await getAbsPathIfNodeModule(match[0], cwd);
        if (path) {
            command = `${path} ${slice(command, match)}`;
        }
        return command;
    }

    function slice(str: string, match: RegExpMatchArray) {
        return str.substring(match.index + match[0].length + 1).trim();
    }

    async function getAbsPathIfNodeModule(name: string, cwd) {
        let path = class_Uri.combine(cwd, '/node_modules/.bin/', name);
        let exists = await File.existsAsync('file://' + path);
        if (exists) {
            return path;
        }
        return null;
    }

    function ensureCwd(str: string, cwd) {
        if (str.includes('-cwd') === false && process.platform !== 'win32') {
            return `cd ${cwd} && ${str}`;
        }
        return str;
    }

    function ensureCwdIfCronbee(command: string, cwd) {
        if (command.includes('cronbee') && command.includes('-cwd') === false) {
            return `${command} --cwd ${cwd}`;
        }
        return command;
    }
}
