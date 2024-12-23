import di from 'a-di';
import memd from 'memd';
import AppConfig from 'appcfg'
import { Config } from '@dequanto/config/Config';
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
import { TPlatform } from '@dequanto/models/TPlatform';
import { CRestore } from '@core/commands/list/CRestore';
import { CHardhat } from '@core/commands/list/CHardhat';
import { CRpc } from '@core/commands/list/CRpc';
import { $logger, ELogLevel } from '@dequanto/utils/$logger';
import { CSolidity } from '@core/commands/list/CSolidity';
import { CTools } from '@core/commands/list/CTools';
import { CNs } from '@core/commands/list/CNs';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { TokenService } from '@dequanto/tokens/TokenService';
import { TokenTransferService } from '@dequanto/tokens/TokenTransferService';
import { TokensService } from '@dequanto/tokens/TokensService';
import { AccountsService } from '@core/services/AccountsService';
import { BlockchainExplorerFactory } from '@dequanto/explorer/BlockchainExplorerFactory';
import { CServer } from '@core/commands/list/CServer';
import { IConfigData } from '@dequanto/config/interface/IConfigData';
import { TAppProcessResult } from './types';


declare const global;

export class App {
    commands = new CommandsHandler();
    config: AppConfig & IConfigData & { env?: 'cli' | 'api' };

    chain?: IPlatformTools

    constructor() {
        if (global.app instanceof App === false) {
            global.app = this;
        } else {
            this.config = global.app.config;
            this.chain = global.app.chain;
        }
    }

    async execute (argv?: string[]): Promise<TAppProcessResult> {
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
        let defaults = await AccountsService.getDefaults(cliParams);
        if (defaults) {
            for (let key in defaults) {
                if (key in cliParams === false) {
                    cliParams[key] = defaults[key];
                }
            }
        }
        if ($cli.isLocal(cliParams)) {
            cliParams['isLocal'] = true;
        }
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
            .register(CNs())
            .register(CConfig())
            .register(CSolidity())
            .register(CTools())
            .register(CServer())
            .register(CVersion)
            .register(CReset())
            .register(CInfo())
            .register(CHelp())

            ;

        let { command, params, args, paramsDefinition } = await this.commands.findCommand(cliArgs, cliParams);

        let platform = $cli.getParamValue('-c, --chain', params);
        if (platform) {
            let opts = <IWeb3EndpointOptions> {};
            let endpoint = $cli.getParamValue('--endpoint,--endpoints', params);
            if (endpoint) {
                let urls = endpoint.split(/[,;]/).map(x => x.trim()).filter(Boolean);
                opts.endpoints = urls.map(x => ({ url: x }));
            }

            this.chain = await di
                .resolve(PlatformFactory)
                .get(platform as TPlatform, opts);
        }

        $console.toast(`Process command gray<${ command.command }>`);

        let result = await command.process(args, params, this);

        // flush all caches on exit
        //- await memd.Cache.flushAllAsync();
        return result;
    }

    async runFromCli () {
        try {
            let result = await this.execute();
            if (result?.status === 'wait') {
                // do not exit on long running commands
                return;
            }
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
    async setChain (client: Web3Client): Promise<this> {
        const explorer = BlockchainExplorerFactory.get(client.platform);
        this.chain = {
            platform: client.network,
            client,
            tokens: new TokensService(client.network, explorer),
            token: new TokenService(client),
            explorer: explorer,
            accounts: new ChainAccountService(),
            transfer: new TokenTransferService(client),
        };
        return this;
    }
}
