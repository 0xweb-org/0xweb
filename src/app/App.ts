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
import { IAccount } from '@dequanto/models/TAccount';
import { CTx } from '@core/commands/list/CTx';
import { IWeb3EndpointOptions } from '@dequanto/clients/interfaces/IWeb3EndpointOptions';
import { CInfo } from '@core/commands/list/CInfo';
import memd from 'memd';
import { TPlatform } from '@dequanto/models/TPlatform';
import { CRestore } from '@core/commands/list/CRestore';
import { CHardhat } from '@core/commands/list/CHardhat';
import { CRpc } from '@core/commands/list/CRpc';
import { $logger, ELogLevel } from '@dequanto/utils/$logger';

declare const global;

export class App {
    commands = new CommandsHandler();
    config: AppConfig;

    chain?: IPlatformTools

    constructor() {
        global.app = this;
    }

    async execute (argv?: string[]): Promise<any> {
        if (argv?.length > 0) {
            $cli.setParams(argv);
        }

        if ($cli.getParamValue('--color') === 'none') {
            $color_options({ type: 'none' });
        }
        if ($cli.getParamValue('--silent')) {
            $logger.config({ level: ELogLevel.ERROR })
        }

        let { params: cliParams, args: cliArgs } = $cli.parse();

        $console.toast('Loading config');
        this.config = await Config.fetch(cliParams);

        this
            .commands
            .register(CInstall())
            .register(CRestore())
            .register(CInit())
            .register(CContract())
            .register(CAccounts())
            .register(CAccount())
            .register(CSafe())
            .register(CToken())
            .register(CTokens())
            .register(CTransfer())
            .register(CTx())
            .register(CHardhat())
            .register(CBlock())
            .register(CGas())
            .register(CRpc())
            .register(CConfig())
            .register(CVersion)
            .register(CReset())
            .register(CInfo())
            .register(CHelp())
            ;

        let { command, params, args, paramsDefinition } = await this.commands.findCommand(cliArgs, cliParams);

        let platform = $cli.getParamValue('-c, --chain', params);
        if (platform) {
            let opts = <IWeb3EndpointOptions> {};
            let endpoint = $cli.getParamValue('--endpoint', params);
            if (endpoint) {
                opts.endpoints = [ { url: endpoint } ]
            }
            console.log(`OPTS`, opts.endpoints);
            this.chain = await di
                .resolve(PlatformFactory)
                .get(platform as any, opts);
        }

        $console.toast(`Process command gray<${ command.command }>`);

        console.log('App process', this.chain.client.options.endpoints);

        let result = await command.process(args, params, this);

        // flush all caches on exit
        await memd.Cache.flushAllAsync();
        return result;
    }

    async runFromCli () {
        try {
            await this.execute();
            process.exit(0);
        } catch (error) {
            $console.error(`red<${error.message}>`);

            let stack = error.stack.split('\n').slice(1).join('\n');
            $console.error(`gray<${stack}>`);
            process.exit(1);
        }
    }

    async getAccount <T extends IAccount = IAccount> (mix: TAddress | string): Promise<T> {
        //let accounts = di.resolve(AccountsService, app.config);
        let account = await this.chain.accounts.get(mix);
        return account as T;
    }

    async ensureChain (platform: TPlatform) {
        if (this.chain == null) {
            this.chain =  await di
                .resolve(PlatformFactory)
                .get(platform);
        }
    }
}
