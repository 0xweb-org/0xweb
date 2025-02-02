import di from 'a-di';
import { env } from 'atma-io';
import { Generator } from '@dequanto/gen/Generator';
import { ICommand } from '../ICommand';
import { TPlatform } from '@dequanto/models/TPlatform';
import { class_Uri } from 'atma-utils';
import { Parameters } from '@core/utils/Parameters';
import { PackageService } from '@core/services/PackageService';
import { $address } from '@dequanto/utils/$address';
import { $is } from '@dequanto/utils/$is';
import { $require } from '@dequanto/utils/$require';
import { $validate } from '@core/utils/$validate';
import { $platform } from '@dequanto/utils/$platform';
import { TEth } from '@dequanto/models/TEth';

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
            '--source': {
                description: 'Optional, the solidity source code'
            },
            '--contract-name': {
                description: 'Optionally the contract name to extract from the source. Otherwise default is taken'
            },
            '-g, --global': {
                description: 'Installs the contract globally, to be available via "0xweb" cli command from any CWD.',
                type: 'boolean',
            },
            ...Parameters.chain(),
            '-o, --output': {
                description: 'Output directory. Default: ./0xc/'
            },
            '--save-sources': {
                description: 'Optionally disables saving the solidity source code to the output directory.',
                type: 'boolean',
                default: true
            },
            '--target': {
                description: 'The output source: js | mjs | ts. Default is configured in "settings.generate.target"',
                type:'string'
            }
        },

        async process(args: string[], params: IInstallParams, app) {
            let platform: TPlatform = params.chain as TPlatform;
            let [ addressOrPath ] = args;
            if (/^\w+:0x/.test(addressOrPath)) {
                // eth:0x...
                let i = addressOrPath.indexOf(':');
                platform = addressOrPath.substring(0, i) as any;
                addressOrPath = addressOrPath.substring(i + 1);
            }
            let isByAddress = /0x[\da-f]+/i.test(addressOrPath);
            let address = isByAddress ? addressOrPath as TEth.Address : null;
            let sourcePath = isByAddress ? params.source : addressOrPath;

            $require.notNull(params.name, `--name should be set`);
            $validate.platform(platform, `Chain not set. Use as prefix "eth:0x.." or flag "--chain eth"`);
            $validate.config.blockchainExplorer(platform);

            if (params.global) {
                params.output = env.appdataDir.combine('.dequanto/0xc/').toDir();
            }

            let output = class_Uri.combine(params.output ?? `./0xc/`, $platform.toPath(platform));

            let generator = new Generator({
                name: params.name,
                contractName: params.contractName,
                target: params.target as any,
                platform,
                source: {
                    abi: address,
                    path: sourcePath,
                },
                defaultAddress: address,
                implementation: params.implementation,
                output,
                saveAbi: true,
                saveSources: params.saveSources ?? true,
            });
            let { main, implementation, contractName } = await generator.generate();

            let packageService = di.resolve(PackageService, app?.chain);
            let implementationAddress = $is.Address(implementation) && $address.eq(addressOrPath, implementation) === false ? implementation : void 0;
            await packageService.savePackage({
                platform,
                address: address,
                implementation: implementationAddress,
                name: params.name,
                contractName: contractName,
                main,
                source: isByAddress ? {
                    platform: platform,
                    address: implementationAddress ?? address,
                } : {
                    path: sourcePath
                }
            }, { global: params.global != null });
            return { main };
        }
    };
}

interface IInstallParams {
    name: string
    contractName: string
    implementation: string
    target: 'js' |'mjs' | 'ts'
    chain: string
    output: string
    source: string
    global: boolean
    saveSources: boolean
}
