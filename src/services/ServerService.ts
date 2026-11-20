import alot from 'alot';
import memd  from 'memd';
import { env } from 'atma-io';
import { Application, HttpResponse, HttpService, middleware } from 'atma-server';
import { App } from '../app/App';
import { ICommand } from '@core/commands/ICommand';
import { $command } from '@core/commands/utils/$command';

import { CRpc } from '@core/commands/list/CRpc';
import { CContract } from '@core/commands/list/CContract';
import { CTx } from '@core/commands/list/CTx';
import { CBlock } from '@core/commands/list/CBlock';
import { CAuth } from '@core/commands/list/CAuth';
import { CAccounts } from '@core/commands/list/CAccounts';
import { Config } from '@dequanto/config/Config';
import { AccountsService } from './AccountsService';
import { $cli } from '@core/utils/$cli';
import { $validate } from '@core/utils/$validate';

export class ServerService {

    server: Application | undefined;

    constructor (public app: App) {

    }

    @memd.deco.memoize()
    async createServer (params?: { dev?: boolean }) {
        const service = ServerCommands.toService([
            CContract(),
            CRpc(),
            CTx(),
            CBlock(),
            CAuth(),
            CAccounts(),
        ], this.app);

        const debug = Boolean(params?.dev ?? false);
        this.server = await Application.create({
            configs: null,
            //debug: true, //Boolean(params?.dev ?? false),
            config: {
                debug,
                serializer: {
                    json: {
                        formatted: true
                    }
                },
                rewriteRules: [
                    {
                        rule: debug
                            ? '^/(contracts|contract|tx|devbook)(/[\\w\\-_\\/]+)? /index.dev.html'
                            : '^/(contracts|contract|tx|devbook)(/[\\w\\-_\\/]+)? /',
                        conditions: [],
                    },
                    // {
                    //     rule: debug
                    //         ? '^/(\\w+)/tx/(\\w+) /index.dev.html'
                    //         : '^/(\\w+)/tx/(\\w+) /',
                    //     conditions: null,
                    // },
                    {
                        rule: debug
                            ? '^/$ /index.dev.html'
                            : '^/$ /',
                        conditions: [],
                    }
                ]
            },

        });
        await this.server.handlers.registerService('^/api', service);
        return this.server;
    }

    async start (params: {
        port: number,
        dev: boolean
    }) {
        let basePath = env.applicationDir.toDir();
        if (/0xweb\/?$/.test(basePath) === false) {
            basePath = env.currentDir.toDir();
        }
        let server = await this.createServer({ dev: params.dev });
        await server
            .processor({
                middleware: [
                    middleware.bodyJson(),
                ],
                after: [
                    middleware.static({
                        base: basePath
                    })
                ]
            })
            .listen(params.port);
    }
}



namespace ServerCommands {
    export function toService(commands: ICommand[], app: App) {
        let routes = alot(commands).mapMany(command => {
            return getRoutes('', command);
        }).toArray();

        let apiRoutes = routes.flatMap(route => route.command.api == null ? [] : [{ ...route, api: route.command.api }]);
        let definition = alot(apiRoutes)
            .toDictionary(x => {
                return `$${x.api.method ?? 'get'} ${x.path}`;
            }, x => {
                return {
                    meta: {
                        origins: '*'
                    },
                    process: wrapProcessor(x.api.process ?? x.command.process, app, x.command)
                };
            });

        return HttpService(definition);
    }

    function wrapProcessor(
        process: ICommand['process'],
        appFromCli: App,
        command: ICommand
    ) {
        return async function (req: { body?: Record<string, any> }, res: unknown, params: Record<string, any>) {

            let cliArgs = [];
            let cliParams = { ...params };
            for (let key in params) {
                let index = /^cliArg(?<i>\d+)$/.exec(key);
                if (index) {
                    cliArgs[Number(index[1])] = decodeURIComponent(params[key]);
                    continue;
                }
                let named = command.arguments?.findIndex(x => x.name === key) ?? -1;
                if (named > -1) {
                    cliArgs[named] = command.arguments[named].query ? params[key] : decodeURIComponent(params[key]);
                    continue;
                }
            }
            if (req.body != null) {
                for (let key in req.body) {
                    cliParams[key] = req.body[key];
                }
            }

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
            let result = await process(cliArgs, cliParams, app, command);
            return new HttpResponse({
                content: JSON.stringify(result, (_key, value) => typeof value === 'bigint' ? value.toString() : value),
                mimeType: 'application/json; charset=utf-8'
            });
        }
    }

    function getRoutes(path: string, command: ICommand): { path: string, command: ICommand }[] {
        let aliases = $command.getAliases(command.command);
        let routes = alot(aliases).mapMany(({ name, isFlag }) => {

            let route = `${path}/${name}`;
            if (command.arguments) {
                for (let i = 0; i < command.arguments.length; i++) {
                    let arg = command.arguments[i];
                    if (arg.query) {
                        // Should be not the URI segment, but the query parameter
                        continue;
                    }
                    let name = arg.name ?? `cliArg${i}`;
                    route += `/:${name}`;
                }
            }
            if (command.subcommands) {
                let subroutes = [];
                for (let sub of command.subcommands) {
                    subroutes.push(...getRoutes(route, sub));
                }
                return subroutes;
            }
            return [{
                path: route,
                command
            }];
        }).toArray() as { path: string, command: ICommand }[];

        //console.log('Routes', routes.map(x => x.path));
        return routes;
    }
}
