import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { App } from '@core/app/App';
import { NameService } from '@dequanto/ns/NameService';
import { $require } from '@dequanto/utils/$require';
import { $logger } from '@dequanto/utils/$logger';
import { $ns } from '@dequanto/ns/utils/$ns';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { $is } from '@dequanto/utils/$is';
import { $os } from '@core/utils/$os';

export function CNs() {
    return <ICommand>{
        command: 'ns',
        description: [
            'NameService utils: Supports ENS, SpaceID, UnstoppableDomains'
        ],
        subcommands: [
            {
                command: 'view',
                description: [
                    'Load a record'
                ],
                arguments: [
                    {
                        description: `Domain with optional path to get as RECORD. e.g. example.eth/foo`,
                        required: true,
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                async process(args: string[], params: any, app: App) {
                    let [uri] = args;
                    let client = params.chain ? app.chain.client : void 0;
                    let { address, content } = await Resolver.get(uri, client);

                    $logger.table([
                        ['Address', address],
                        ['Content', content]
                    ]);
                }
            },
            {
                command: 'go',
                description: [
                    'Load a record and navigate to ipfs, https, etc.'
                ],
                arguments: [
                    {
                        description: `Domain with optional path to get as RECORD. e.g. example.eth/foo`,
                        required: true,
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                async process(args: string[], params: any, app: App) {
                    let [uri] = args;
                    let client = params.chain ? app.chain.client : void 0;
                    let { address, content } = await Resolver.get(uri, client);

                    $logger.table([
                        ['Address', address],
                        ['Content', content]
                    ]);

                    let nav = content;
                    if ($is.empty(nav)) {
                        $logger.error(`ContentHash or Record of ${uri} ${nav} is empty`);
                        return;
                    }
                    if (nav.startsWith('ipfs://')) {
                        let cid = nav.replace('ipfs://', '');
                        let path = `https://cloudflare-ipfs.com/ipfs/${cid}/`;
                        $console.log(`Opening cyan<bold<${path}>>`);
                        await $os.open(path);
                        return;
                    }
                    if (/^https?/.test(nav)) {
                        $console.log(`Opening cyan<bold<${nav}>>`);
                        await $os.open(nav);
                        return;
                    }
                    $console.log(`Go by clicking on ${nav}`);
                }
            },
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}

namespace Resolver {
    export async function get(uri: string, client?: Web3Client) {
        let ns = new NameService(client);
        let supports = ns.supports(uri);
        $require.True(supports, `${uri} is not supported by any of ${ns.providers.map(p => p.constructor.name).join(', ')}`);

        $logger.toast(`Loading address`);
        let address = await ns.getAddress($ns.getRoot(uri));
        $logger.toast(`Loading content`);
        let content = await ns.getContent(uri);

        return { address, content }
    }
}
