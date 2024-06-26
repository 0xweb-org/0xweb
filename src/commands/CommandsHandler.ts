import { ICommand } from './ICommand';
import { $command } from './utils/$command';
import { App } from '@core/app/App';
import { $validate } from '@core/utils/$validate';
import { CHelp } from './list/CHelp';
import { $console } from '@core/utils/$console';


export class CommandsHandler  {

    private commands: Record<string, ICommand> = Object.create(null);
    private flags: Record<string, ICommand> = Object.create(null);
    public list: ICommand[] = [];

    register (command: ICommand | ICommand[]): this {
        if (Array.isArray(command)) {
            command.forEach(c => this.register(c));
            return this;
        }
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

    async findCommand (cliArgs: string[], cliParams): Promise<{
        command?: ICommand,
        args?: any[],
        params?
        paramsDefinition?
    }> {
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
            $console.log(`Running "${ process.argv.join(' ')}"`);
            throw new Error(`Unknown command: ${name}`);
        }

        let {
            command: commandExtracted,
            args,
            paramsDefinition,
            isHelp
        }  = this.extractCommand(command, cliArgs, cliParams)

        command = commandExtracted;

        if (isHelp) {
            let params;
            if (/help/.test(command.command) === false) {
                params = { command };
                command = this.commands['help'];
            }
            return { command, paramsDefinition, params: params ?? {} };
        }

        let params = await $command.getParams(cliParams, paramsDefinition);
        $validate.args(command, args);
        $validate.params(command, params, paramsDefinition);
        return { command, args, params };
    }

    private extractCommand (command: ICommand, cliArgs, cliParams): {
        command: ICommand,
        args: string[],
        paramsDefinition,
        breadcrumbs: string[],
        isHelp: boolean
    } {
        let args = cliArgs.slice(1);
        let paramsDefinition = command.params ?? {};
        let isHelp = 'help' in cliParams;
        let breadcrumbs = [];
        while (command.subcommands != null) {
            let name = args[0];
            let subCommand = command.subcommands.find(x => x.command === name);
            if (subCommand) {
                args = args.slice(1);
                command = subCommand;
                paramsDefinition = {
                    ...(paramsDefinition ?? {}),
                    ...(subCommand.params ?? {}),
                };
                breadcrumbs.push(name);
                continue;
            }

            if (typeof command.process === 'function') {
                // A command looks like to be a handler too
                break;
            }

            if (isHelp === false) {
                throw new Error(`Subcommand 'bold<${args[0]}>' of 'bold<${name}>' not found`);
            }
            break;
        }
        return {
            command,
            args,
            paramsDefinition,
            breadcrumbs,
            isHelp,
        };
    }


    // async process (cliArgs: string[], cliParams, app: App) {
    //     let name = null;
    //     let command: ICommand;
    //     if (cliArgs.length === 0) {
    //         name = Object.keys(cliParams)[0];
    //         command = this.flags[name];
    //     } else {
    //         name = cliArgs[0];
    //         command = this.commands[name];
    //     }
    //     if (name == null) {
    //         command = this.commands['help'];
    //     }
    //     if (command == null) {
    //         throw new Error(`Unknown command: ${name}`);
    //     }

    //     if (cliParams.help) {
    //         let result = await CHelp().printCommand(command);
    //         return result;
    //     }

    //     let args = cliArgs.slice(1);



    //     let paramsDefinition = command.params ?? {};

    //     if (command.subcommands) {
    //         let subCommand = command.subcommands.find(x => x.command === args[0]);
    //         if (subCommand == null) {
    //             throw new Error(`Subcommand 'bold<${args[0]}>' not found`);
    //         }

    //         args = args.slice(1);
    //         command = subCommand;
    //         paramsDefinition = {
    //             ...(paramsDefinition ?? {}),
    //             ...(subCommand.params ?? {}),
    //         };

    //         console.log('1subcommand', command, '\n');

    //         if (command.subcommands) {
    //             let subCommand = command.subcommands.find(x => x.command === args[0]);
    //             if (subCommand == null) {
    //                 throw new Error(`2n subcommand 'bold<${args[0]}>' not found`);
    //             }
    //             args = args.slice(1);
    //             command = subCommand;
    //             paramsDefinition = {
    //                 ...(paramsDefinition ?? {}),
    //                 ...(subCommand.params ?? {}),
    //             };
    //             console.log('2subcommand', command, '\n');
    //         }
    //     }


    //     let params = await $command.getParams(cliParams, paramsDefinition);
    //     $validate.args(command, args);
    //     $validate.params(command, params, paramsDefinition);
    //     return await command.process(args, params, app);
    // }
};
