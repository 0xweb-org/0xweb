import { Generator } from '@dequanto/gen/Generator';
import { ICommand } from '../ICommand';
import { TPlatform } from '@dequanto/models/TPlatform';
import { $require } from '@dequanto/utils/$require';
import { $validate } from '@core/utils/$validate';
import { class_Uri } from 'atma-utils';
import { env, File } from 'atma-io';
import { Parameters } from '@core/utils/Paramsters';
import { PackageService } from '@core/services/PackageService';
import di from 'a-di';
import { $address } from '@dequanto/utils/$address';
import { $is } from '@dequanto/utils/$is';

export function CInstall() {
    return <ICommand>{
        command: 'i, install',

        description: [
            `Download contracts ABI and generate the TS class for it.`,
            `Supported chains: ${$validate.platforms().join(', ')}`,
        ],
        arguments: [
            {
                description: 'Contract address or path',
                required: true
            }
        ],
        params: {
            '-n, --name': {
                description: 'The class name.',
                required: true
            },
            '--imp, --implementation': {
                description: 'We can detect proxies by standard proxy implementations, in some edge cases you can set the implementation address manually.'
            },
            '-g, --global': {
                description: 'Installs the contract globally, to be available via "0xweb" cli command from any CWD.',
                type: 'boolean',
            },
            ...Parameters.chain(),
            '-o, --output': {
                description: 'Output directory. Default: ./0xweb/'
            }
        },

        async process(args: string[], params: IInstallParams) {
            let platform: TPlatform = params.chain as TPlatform;
            let [address] = args;
            if (/^\w+:0x/.test(address)) {
                // eth:0x...
                let i = address.indexOf(':');
                platform = address.substring(0, i) as any;
                address = address.substring(i + 1);
            }

            $require.notNull(params.name, `--name should be set`);
            $validate.platform(platform, `Chain not set. Use as prefix "eth:0x.." or flag "--chain eth"`);
            $validate.config.blockchainExplorer(platform);

            if (params.global) {
                params.output = env.appdataDir.combine('.dequanto/0xweb/').toDir();
            }

            let output = class_Uri.combine(params.output ?? `./0xweb/`, platform);

            let generator = new Generator({
                name: params.name,
                platform,
                source: {
                    abi: address
                },
                implementation: params.implementation,
                output,
                saveAbi: true
            });
            let { main, implementation } = await generator.generate();

            let packageService = di.resolve(PackageService);
            await packageService.savePackage({
                platform,
                address,
                implementation: $is.Address(implementation) && $address.eq(address, implementation) === false ? implementation : void 0,
                name: params.name,
                main,
            });
            return { main };
        }
    };
}

interface IInstallParams {
    name: string
    implementation: string
    chain: string
    output: string
    global: boolean
}
