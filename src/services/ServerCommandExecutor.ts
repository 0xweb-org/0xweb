import { App } from '../app/App';
import { ICommand } from '@core/commands/ICommand';
import { $command } from '@core/commands/utils/$command';
import { Config } from '@dequanto/config/Config';
import { AccountsService } from './AccountsService';
import { $cli } from '@core/utils/$cli';
import { $validate } from '@core/utils/$validate';

/** Shared, non-interactive execution for HTTP API and MCP commands. */
export class ServerCommandExecutor {
    static async execute(command: ICommand, cliArgs: any[], cliParams: Record<string, any>, appFromCli: App, process = command.process) {
        let defaults = await AccountsService.getSession(cliParams);
        cliParams = { ...defaults, ...cliParams };
        if ($cli.isLocal(cliParams)) {
            cliParams.isLocal = true;
        }
        await command.prepare?.(cliArgs, cliParams);
        // HTTP requests must report missing input instead of prompting on stdin.
        for (let [flags, definition] of Object.entries(command.params ?? {})) {
            if (definition.required && definition.default == null
                && !$command.getAliases(flags).some(alias => cliParams[alias.name] != null)
                && cliParams[definition.fallback] == null
                && !definition.requiredUnless?.some(key => cliParams[key] != null)) {
                throw new Error(`Missing required parameter: ${flags}`);
            }
        }
        cliParams = await $command.getParams(cliParams, command.params ?? {});
        $validate.args(command, cliArgs);
        $validate.params(command, command.params ?? {}, cliParams);
        let app = new App();
        app.chain = appFromCli.chain;
        app.config = await Config.fetch(cliParams);
        app.config.env = 'api';
        if (cliParams.chain) {
            await app.ensureChain(cliParams.chain);
        }
        return process(cliArgs, cliParams, app, command);
    }
}
