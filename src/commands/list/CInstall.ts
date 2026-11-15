import di from 'a-di';
import { env, File } from 'atma-io';
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
import { $config } from '@dequanto/utils/$config';

export function CInstall() {
    return <ICommand>{
        command: 'i, install',

        description: [
            `Download a contract ABI and generate a JavaScript or TypeScript class`,
            `Supported chains: ${$validate.platforms().join(', ')}`,
            'For unattended use, supply --name and --chain (or chain:address), and use --json. Missing required input fails when stdin is not interactive.',
            'Example: 0xweb install ./Contract.sol --name Contract --chain hardhat --save false --json',
        ],
        arguments: [
            {
                name: 'AddressOrPath',
                description: 'Contract address, chain:address (including eth:sepolia:0x...), or local Solidity, ABI JSON, or artifact JSON file',
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
                description: 'Local Solidity, ABI JSON, or artifact JSON file to use with a contract address'
            },
            '--contract-name': {
                description: 'Contract name to extract from the source. If omitted, the default is used'
            },
            '-g, --global': {
                description: 'Write files and package metadata under the appdata .dequanto directory. Overrides --output. Default: false',
                type: 'boolean',
            },
            ...Parameters.chain(),
            '-o, --output': {
                description: 'Output root directory; files are placed under <root>/<chain>/<name>/. Existing generated files are overwritten. Default: ./0xc/'
            },
            '--save': {
                description: 'Write generated files and update 0xweb.json. Use --save false --json to return contents without installing files or package metadata. Default: true',
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
                description: 'Output target: ts (TypeScript), js/mjs (ES modules), or cjs (CommonJS .js). JavaScript targets include .d.ts files. Default: settings.generate.target, then ts',
                type: 'string',
                oneOf: ['js', 'mjs', 'ts', 'cjs'],
            },
            '--json': {
                description: 'Print installation metadata and generated file descriptors as JSON to stdout. Each file includes written; content is included with --include-content or --save false',
            }
        },
        prepare(args, params) {
            let input = args[0];
            $require.notEmpty(input, 'Provide AddressOrPath: a contract address or local Solidity/JSON file');
            let prefix = /^([a-z][\w:-]*):(0x.*)$/i.exec(input);
            if (prefix != null) {
                let [, chain, address] = prefix;
                for (let explicit of [params.chain, params.c]) {
                    $require.True(explicit == null || explicit === chain, 'The address chain prefix conflicts with --chain');
                }
                params.chain = chain;
                args[0] = address;
            }
            if (/^0x/i.test(args[0]) && !/\.(sol|json)$/i.test(args[0])) {
                $require.Address(args[0], 'Invalid contract address: expected 0x followed by 40 hexadecimal characters');
            }
            if (!process.stdin.isTTY) {
                $require.notEmpty(params.name ?? params.n, 'Provide --name for non-interactive installation');
                $require.notEmpty(params.chain ?? params.c, 'Provide --chain or chain:address for non-interactive installation');
            }
        },
        async process(args: string[], params: IInstallParams, app) {
            let platform: TPlatform = params.chain as TPlatform;
            let [ addressOrPath ] = args;
            let isByAddress = $is.Address(addressOrPath);
            let address = isByAddress ? addressOrPath as TEth.Address : null;
            let sourcePath = isByAddress ? params.source : addressOrPath;

            $require.notNull(params.name, `--name should be set`);
            $validate.platform(platform, `Chain not set. Use as prefix "eth:0x.." or flag "--chain eth"`);
            if (sourcePath != null) {
                $require.True(/\.(sol|json)$/.test(sourcePath), 'Source must use the .sol or .json extension (Solidity, ABI JSON, or artifact JSON)');
                $require.True(await File.existsAsync(sourcePath), `Source file not found: ${sourcePath}`);
            } else {
                $require.Address(address, 'Invalid contract address');
                $validate.config.blockchainExplorer(platform);
            }
            let target = params.target ?? $config.get('settings.generate.target') ?? 'ts';
            $require.oneOf(target, ['js', 'mjs', 'ts', 'cjs'], 'Invalid generation target');

            if (params.global === true) {
                params.output = env.appdataDir.combine('.dequanto/0xc/').toDir();
            }

            let output = class_Uri.combine(params.output ?? `./0xc/`, $platform.toPath(platform));

            let generator = new Generator({
                name: params.name,
                contractName: params.contractName,
                target,
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
                }, { global: params.global === true });
            }


            let files = result.files?.map(file => {
                return {
                    kind: file.kind,
                    path: file.path,
                    written: params.save !== false
                        && (file.kind !== 'abi' || params.saveAbi !== false)
                        && (file.kind !== 'source' || params.saveSources !== false),
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
    target: 'js' | 'mjs' | 'ts' | 'cjs'
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

