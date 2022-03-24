import AppConfig from 'appcfg'
import { CommandsHandler } from '../commands/CommandsHandler';
import { CVersion } from '../commands/list/CVersion';
import { CInstall } from '../commands/list/CInstall';
import { CConfig } from '../commands/list/CConfig';
import { CHelp } from '@core/commands/list/CHelp';
import { $secret } from '@core/utils/$secret';
import { CAccounts } from '@core/commands/list/CAccounts';
import { $cli } from '@core/utils/$cli';
import { CBlock } from '@core/commands/list/CBlock';
import { IPlatformTools, PlatformFactory } from '@dequanto/chains/PlatformFactory';
import di from 'a-di';
import { CAccount } from '@core/commands/list/CAccount';
import { $console } from '@core/utils/$console';
import { CReset } from '@core/commands/list/CReset';
import { CContract } from '@core/commands/list/CContract';
import { CInit } from '@core/commands/list/CInit';
import { Config } from '@dequanto/Config';
import { CToken } from '@core/commands/list/CToken';

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
            .register(CToken)
            .register(CBlock)
            .register(CConfig)
            .register(CVersion)
            .register(CReset)
            .register(CHelp)
            ;
    }

    async execute (): Promise<void> {

        let platform = $cli.getParamValue('-c, --chain') ?? 'eth';
        $console.toast('Load config');
        let config = this.config = await Config.fetch();

        let { params, args } = config.$cli;
        let i = args.findIndex(x => /\bindex(\.(ts|js))?\b/i.test(x));
        if (i > -1) {
            args = args.slice(i + 1);
        }

        this.chain = await di
            .resolve(PlatformFactory)
            .get(platform as any);

        let name = args[0];
        if (name) {
            $console.toast(`Process command gray<${args[0]}>`);
        }
        await this.commands.process(args, params, this);
    }

    async runFromCli () {
        try {
            await this.execute();
        } catch (error) {
            $console.log(`red<${error.message}>`);

            let stack = error.stack.split('\n').slice(1).join('\n');
            $console.log(`gray<${stack}>`);
        }
        process.exit(0);
    }
}
