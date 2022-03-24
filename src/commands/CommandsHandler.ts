import { ICommand } from './ICommand';
import { $command } from './utils/$command';
import { App } from '@core/app/App';
import { $validate } from '@core/utils/$validate';
import { CHelp } from './list/CHelp';


export class CommandsHandler  {

    private commands: Record<string, ICommand> = Object.create(null);
    private flags: Record<string, ICommand> = Object.create(null);
    public list: ICommand[] = [];

    register (command: ICommand): this {
        $command.getAliases(command.command).map(({ name, isFlag }) => {
            if (isFlag) {
                this.flags[name] = command;
            } else {
                this.commands[name] = command;
            }
        });
        this.list.push(command);
        return this;
    }


    async process (cliArgs: string[], cliParams, app: App) {
        let config = app.config;
        let name = null;
        let command: ICommand;
        if (cliArgs.length === 0) {
            name = Object.keys(cliParams)[0];
            command = this.flags[name];
        } else {
            name = cliArgs[0];
            command = this.commands[name];
        }
        if (name == null) {
            command = this.commands['help'];
        }
        if (command == null) {
            throw new Error(`Unknown command: ${name}`);
        }

        if (cliParams.help) {
            CHelp.printCommand(command);
            return;
        }

        let params = $command.getParams(cliParams, command.params);
        let args = cliArgs.slice(1);

        if (args.length > 0 && command.subcommands?.length > 0) {
            let subCommand = command.subcommands.find(x => x.command === args[0]);
            if (subCommand != null) {
                if (subCommand.params != null) {
                    let subCommandParams = $command.getParams(cliParams, subCommand.params);
                    params = {
                        ...params,
                        ...subCommandParams,
                    };
                }
                args = args.slice(1);
                $validate.args(subCommand, args);
                return await subCommand.process(args, params, app);
            }
        }

        $validate.args(command, args);
        return await command.process(args, params, app);
    }
};
