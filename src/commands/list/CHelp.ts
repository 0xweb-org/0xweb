import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';

export function CHelp() {
    const Help = <ICommand & { printCommand }>{
        command: 'help, -h, --help',
        description: [
            'Print this overview'
        ],
        async process(args, params: { command?: ICommand }, app: App) {

            let path = env.applicationDir.combine(`/package.json`).toString();
            let json = await File.readAsync<any>(path);

            if (params.command != null) {
                Help.printCommand(params.command);
                return;
            }

            $console.log('');
            $console.log('bold<green<!>> We provide our Demo Keys for etherscan and co. Please, replace them with yours: bold<yellow<0xweb config -e>>');

            $console.log('');
            $console.log(`0xweb@${json.version} Commands`);
            $console.log('');

            for (let command of app.commands.list) {
                if (/help/.test(command.command)) {
                    continue;
                }
                Help.printCommand(command, {}, { short: true });
            }
            $console.log('');
            $console.log('For more details use "0xweb COMMAND --help" or "0xweb COMMAND SUBCOMMAND --help"');

        },

        printCommand(command: ICommand, paramsDefinition?, opts?) {
            let str = print.command({
                ...command,
                params: paramsDefinition ?? void 0
            }, opts);
            $console.log(str);
        }
    };
    return Help;
}
namespace print {
    export function command(c: ICommand, opts: { short?: boolean }, prefix = '') {
        let lines = [];

        lines.push(`yellow<bold<${c.command}>>`);
        lines.push(c.description.map(x => `  ${x}`).join('\n'));

        if (opts?.short !== true &&  c.arguments?.length > 0) {
            lines.push(`  italic<Arguments>`);
            c.arguments.forEach((arg, i) => {
                lines.push(`    bold<${arg.name ?? i}${arg.required ? '*' : ''}>: ${arg.description}`);
            });
        }
        if (c.subcommands?.length > 0) {
            lines.push(`    gray<Subcommands>`);
            for (let sub of c.subcommands) {
                lines.push(print.command(sub, opts, prefix + '    '));
            }
        }
        if (opts?.short !== true && c.params && Object.keys(c.params).length > 0) {
            lines.push(`  italic<Flags>`);
            for (let key in c.params) {
                let arg = c.params[key];
                lines.push(`    bold<${key}${arg.required ? '*' : ''}>: ${arg.description}`);
            }
        }
        //lines.push(``);

        return lines.map(x => `${prefix}${x}`).join('\n');
    }
}
