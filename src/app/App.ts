import di from 'a-di';
import AppConfig from 'appcfg'
import { Config } from '@dequanto/Config';
import { CommandsHandler } from '../commands/CommandsHandler';
import { CVersion } from '../commands/list/CVersion';
import { CInstall } from '../commands/list/CInstall';
import { CConfig } from '../commands/list/CConfig';
import { CHelp } from '../commands/list/CHelp';
import { CAccounts } from '../commands/list/CAccounts';
import { $cli } from '@core/utils/$cli';
import { CBlock } from '../commands/list/CBlock';
import { IPlatformTools, PlatformFactory } from '@dequanto/chains/PlatformFactory';
import { CAccount } from '../commands/list/CAccount';
import { $console } from '@core/utils/$console';
import { CReset } from '../commands/list/CReset';
import { CContract } from '../commands/list/CContract';
import { CInit } from '../commands/list/CInit';
import { CToken } from '../commands/list/CToken';
import { CGas } from '../commands/list/CGas';
import { CSafe } from '@core/commands/list/CSafe';
import { TAddress } from '@dequanto/models/TAddress';
import { CTransfer } from '@core/commands/list/CTransfer';
import { $color_options } from '@dequanto/utils/$color';
import { CTokens } from '@core/commands/list/CTokens';

declare const global;

export class App {
    commands = new CommandsHandler();
    config: AppConfig;

    chain?: IPlatformTools

    constructor() {
        global.app = this;

        this
            .commands
            .register(CInstall)
            .register(CInit)
            .register(CContract)
            .register(CAccounts)
            .register(CAccount)
            .register(CSafe)
            .register(CToken)
            .register(CTokens)
            .register(CTransfer)
            .register(CBlock)
            .register(CGas)
            .register(CConfig)
            .register(CVersion)
            .register(CReset)
            .register(CHelp)
            ;
    }

    async execute (argv?: string[]): Promise<any> {
        if (argv?.length > 0) {
            $cli.setParams(argv);
        }

        if ($cli.getParamValue('--color') === 'none') {
            $color_options({ type: 'none' });
        }

        let { params: cliParams, args: cliArgs } = $cli.parse(argv);
        let { command, params, args, paramsDefinition } = await this.commands.findCommand(cliArgs, cliParams);

        if ('help' in cliParams) {
            await CHelp.printCommand(command, paramsDefinition);
            return null;
        }

        $console.toast('Loading config');
        this.config = await Config.fetch(params);

        let platform = $cli.getParamValue('-c, --chain', params);
        if (platform) {
            this.chain = await di
                .resolve(PlatformFactory)
                .get(platform as any);
        }

        let name = args[0];
        if (name) {
            $console.toast(`Process command gray<${args[0]}>`);
        }
        //await this.commands.process(args, params, this);
        return await command.process(args, params, this);
    }

    async runFromCli () {
        try {
            await this.execute();
            process.exit(0);
        } catch (error) {
            $console.log(`red<${error.message}>`);

            let stack = error.stack.split('\n').slice(1).join('\n');
            $console.log(`gray<${stack}>`);
            process.exit(1);
        }
    }

    async getAccount (mix: TAddress | string) {
        //let accounts = di.resolve(AccountsService, app.config);
        let account = await this.chain.accounts.get(mix);
        return account;
    }
}

