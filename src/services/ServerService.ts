import alot from 'alot';
import memd  from 'memd';
import { Application, HttpResponse, HttpService } from 'atma-server';
import { App } from '../app/App';
import { ICommand } from '@core/commands/ICommand';
import { $command } from '@core/commands/utils/$command';

import { CRpc } from '@core/commands/list/CRpc';
import { CContract } from '@core/commands/list/CContract';
import { CTx } from '@core/commands/list/CTx';
import { CBlock } from '@core/commands/list/CBlock';

export class ServerService {

    server: Application;

    constructor (public app: App) {

    }

    @memd.deco.memoize()
    async createServer () {
        const service = ServerCommands.toService([
            CContract(),
            CRpc(),
            CTx(),
            CBlock(),
        ], this.app);

        this.server = await Application.create({
            configs: null,
            config: {
                serializer: {
                    json: {
                        formatted: true
                    }
                }
            }
        });
        await this.server.handlers.registerService('^/api', service);
        return this.server;
    }

    async start (params: {
        port: number
    }) {
        let server = await this.createServer();
        await server.listen(params.port);
    }
}



namespace ServerCommands {
    export function toService(commands: ICommand[], app: App) {
        let routes = alot(commands).mapMany(command => {
            return getRoutes('', command);
        }).toArray();

        let definition = alot(routes)
            .filter(x => x.command.api != null)
            .toDictionary(x => {
                return `$get ${x.path}`;
            }, x => {
                return {
                    meta: {
                        origins: '*'
                    },
                    process: wrapProcessor(x.command.api.process ?? x.command.process, app, x.command)
                };
            });

        return HttpService(definition);
    }

    function wrapProcessor(
        process: (args: any[], params?, app?: App, command?: ICommand) => Promise<any>,
        appFromCli: App,
        command: ICommand
    ) {
        return async function (req, res, params) {

            let appFromRequest: App = null;
            let platform = params.chain;
            if (platform) {
                appFromRequest = new App();
                await appFromRequest.ensureChain(platform);
            }

            let cliArgs = [];
            let cliParams = params;
            for (let key in params) {
                let index = /^arg(?<i>\d+)$/.exec(key);
                if (index) {
                    cliArgs[Number(index.groups.i)] = params[key];
                    continue;
                }
                let named = command.arguments?.findIndex(x => x.name === key);
                if (named > -1) {
                    cliArgs[named] = params[key];
                    continue;
                }
            }
            let app = appFromRequest ?? appFromCli;
            app.config ??= {} as any;
            app.config.env = 'api';
            let result = await process(cliArgs, cliParams, app, command);
            return new HttpResponse({
                content: result,
                mimeType: 'application/json; charset=utf-8'
            })
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
                    let name = arg.name ?? `arg${i}`;
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
