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
            let result = await CHelp.printCommand(command);
            return result;
        }

        let args = cliArgs.slice(1);



        let paramsDefinition = command.params ?? {};

        if (command.subcommands) {
            let subCommand = command.subcommands.find(x => x.command === args[0]);
            if (subCommand == null) {
                throw new Error(`Subcommand 'bold<${args[0]}>' not found`);
            }

            args = args.slice(1);
            command = subCommand;
            paramsDefinition = {
                ...(paramsDefinition ?? {}),
                ...(subCommand.params ?? {}),
            };
        }


        let params = await $command.getParams(cliParams, paramsDefinition);

        // if (command.subcommands?.length > 0) {
        //     let subCommand = command.subcommands.find(x => x.command === args[0]);
        //     if (subCommand != null) {
        //         if (subCommand.params != null) {
        //             let subCommandParams = await $command.getParams(cliParams, subCommand.params);
        //             params = {
        //                 ...params,
        //                 ...subCommandParams,
        //             };
        //         }
        //         args = args.slice(1);
        //         $validate.args(subCommand, args);
        //         return await subCommand.process(args, params, app);
        //     }
        // }

        $validate.args(command, args);
        $validate.params(command, params, paramsDefinition);
        return await command.process(args, params, app);
    }
};
