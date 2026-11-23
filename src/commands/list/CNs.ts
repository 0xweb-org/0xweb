import { $console } from '@core/utils/$console';
import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { App } from '@core/app/App';
import { NameService } from '@dequanto/ns/NameService';
import { $require } from '@dequanto/utils/$require';
import { $ns } from '@dequanto/ns/utils/$ns';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { $os } from '@core/utils/$os';

export function CNs() {
    return <ICommand>{
        command: 'ns',
        description: [
            'Name service tools for ENS, Space ID, and Unstoppable Domains'
        ],
        subcommands: [
            {
                command: 'view',
                description: [
                    'Resolve address and content records, including their chains and per-field errors'
                ],
                arguments: [
                    {
                        name: 'Uri',
                        description: `Domain with an optional record path, e.g. example.eth/foo`,
                        required: true,
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    '--json': { description: 'Print the resolved address and content as JSON' },
                },
                async process(args: string[], params: any, app: App) {
                    let [uri] = args;
                    let client = params.chain ? $require.notNull(app.chain, `Chain not initialized`).client : void 0;
                    let record = await Resolver.get(uri, client);
                    let { address, content } = record;

                    $console.table([
                        ['Address', address],
                        ['Content', content]
                    ]);
                    return record;
                }
            },
            {
                command: 'go',
                mcp: false,
                description: [
                    'Resolve a record and open its content URL (IPFS, HTTP, or HTTPS)'
                ],
                arguments: [
                    {
                        name: 'Uri',
                        description: `Domain with an optional record path, e.g. example.eth/foo`,
                        required: true,
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false }),
                    '--json': { description: 'Print the resolved address and content as JSON' },
                },
                async process(args: string[], params: any, app: App) {
                    let [uri] = args;
                    let client = params.chain ? $require.notNull(app.chain, `Chain not initialized`).client : void 0;
                    let record = await Resolver.get(uri, client);
                    let { address, content } = record;

                    $console.table([
                        ['Address', address],
                        ['Content', content]
                    ]);

                    let result = { ...record, url: null as string | null, opened: false };
                    if (!content) {
                        result.errors.content ??= 'No content record found';
                        $console.error(result.errors.content);
                        return result;
                    }
                    result.url = getContentUrl(content);
                    $console.log(`Opening cyan<bold<${result.url}>>`);
                    await $os.open(result.url);
                    result.opened = true;
                    return result;
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

        $console.toast('Loading address and content');
        let [addressResult, contentResult] = await Promise.allSettled([
            Promise.resolve().then(() => ns.getAddress($ns.getRoot(uri))),
            Promise.resolve().then(() => ns.getContent(uri)),
        ]);
        let errors: { address?: string; content?: string } = {};
        if (addressResult.status === 'rejected') errors.address = String(addressResult.reason?.message ?? addressResult.reason);
        if (contentResult.status === 'rejected') errors.content = String(contentResult.reason?.message ?? contentResult.reason);
        if (addressResult.status === 'rejected' && contentResult.status === 'rejected') {
            throw new Error(`Name resolution failed: address: ${errors.address}; content: ${errors.content}`);
        }
        let address = addressResult.status === 'fulfilled' ? addressResult.value : null;
        let content = contentResult.status === 'fulfilled' ? contentResult.value : null;
        return {
            uri,
            address: address?.address ?? '',
            content: content?.value ?? '',
            addressPlatform: address?.platform ?? null,
            contentPlatform: content?.platform ?? null,
            errors,
        };
    }
}

function getContentUrl(content: string): string {
    if (/[\x00-\x20\x7f\\]/.test(content) || !/^(https?|ipfs):\/\//i.test(content)) {
        throw new Error('Content must be a valid HTTP, HTTPS, or IPFS URL');
    }
    let url: URL;
    try {
        url = new URL(content);
    } catch {
        throw new Error('Invalid content URL');
    }
    if (!url.hostname || url.username || url.password) {
        throw new Error('Content URL must have a host and no embedded credentials');
    }
    if (url.protocol === 'ipfs:') {
        if (url.port || !/^[a-z\d]+$/i.test(url.hostname)) throw new Error('Invalid IPFS content identifier');
        // Preserve CID casing and any file path, query, or fragment.
        return `https://cloudflare-ipfs.com/ipfs/${url.hostname}${url.pathname || '/'}${url.search}${url.hash}`;
    }
    return url.href;
}
