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
            `Download a contract ABI and generate a JavaScript or TypeScript class`,
            `Supported chains: ${$validate.platforms().join(', ')}`,
        ],
        arguments: [
            {
                description: 'Contract address or source path',
                required: true
            }
        ],
        params: {
            '-n, --name': {
                description: 'Generated class name',
                required: true
            },
            '--imp, --implementation': {
                description: 'Implementation address. Standard proxy implementations are detected automatically'
            },
            '--source': {
                description: 'Optional path to Solidity source code'
            },
            '--contract-name': {
                description: 'Contract name to extract from the source. If omitted, the default is used'
            },
            '-g, --global': {
                description: 'Install the contract globally for use with 0xweb from any working directory',
                type: 'boolean',
            },
            ...Parameters.chain(),
            '-o, --output': {
                description: 'Output root directory. Default: ./0xc/'
            },
            '--save': {
                description: 'Write generated files to disk. Set to false to return file contents without saving files or package metadata. Default: true',
                type: 'boolean',
                default: true
            },
            '--save-sources': {
                description: 'Save Solidity source code to the output directory. Default: true',
                type: 'boolean',
                default: true
            },
            '--save-abi': {
                description: 'Save the ABI as a JSON file in the output directory. Default: true',
                type: 'boolean',
                default: true
            },
            '--include-content': {
                description: 'Include file contents in the result. Automatically enabled when --save is false. Default: false',
                type: 'boolean',
                default: false
            },
            '--target': {
                description: 'Output target: js, mjs, or ts. Default: settings.generate.target',
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
                    abi: address ?? undefined,
                    path: sourcePath,
                },
                defaultAddress: address ?? undefined,
                implementation: params.implementation,
                output,
                save: params.save ?? true,
                saveAbi: params.saveAbi ?? true,
                saveSources: params.saveSources ?? true,
            });
            let result = await generator.generate();
            let {
                main,
                implementation,
                contractName,
            } = result;

            let implementationAddress = $is.Address(implementation) && $address.eq(addressOrPath, implementation) === false ? implementation : void 0;
            if (params.save !== false) {
                let packageService = di.resolve(PackageService, app?.chain);
                await packageService.savePackage({
                    platform,
                    address: address ?? '0x',
                    implementation: implementationAddress,
                    name: params.name,
                    contractName: contractName,
                    main,
                    source: address != null ? {
                        platform: platform,
                        address: implementationAddress ?? address,
                    } : {
                        path: sourcePath
                    }
                }, { global: params.global != null });
            }


            let files = result.files?.map(file => {
                return {
                    kind: file.kind,
                    path: file.path,
                    content: (params.save === false || params.includeContent)
                        ? file.content
                        : void 0
                };
            });

            return {
                platform: platform,
                address: address,
                implementation: implementationAddress,
                name: params.name,
                contractName: result.contractName,
                main: main,
                files: files
            };
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

    // By default, file entries contain paths. Content is included automatically when "save" is false.
    // Set includeContent to include content even when files are saved.
    includeContent: boolean
    save: boolean
    saveAbi: boolean
    saveSources: boolean
}

