import { Generator } from '@dequanto/gen/Generator';
import { ICommand } from '../ICommand';
import { TPlatform } from '@dequanto/models/TPlatform';
import { $require } from '@dequanto/utils/$require';
import { $validate } from '@core/utils/$validate';
import { class_Uri } from 'atma-utils';
import { File } from 'atma-io';
import { Parameters } from '@core/utils/Paramsters';

export const CInstall = <ICommand> {
    command: 'i, install',

    description: [
        `Download contracts ABI and generate the TS class for it.`,
        `Supported chains: ${$validate.platforms().join(', ') }`,
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
        '-p, --proxy-target': {
            description: 'We can detect proxies by standart proxy implementations, in some edge cases you can set the implementation address manually.'
        },
        ...Parameters.chain,
        '-o, --output': {
            description: 'Output directory. Default: ./0xweb/'
        }
    },

    async process (args: string[], params: IInstallParams) {
        let platform: TPlatform = params.chain as TPlatform;
        let [ address ] = args;
        if (/^\w+:0x/.test(address)) {
            let i = address.indexOf(':');
            platform = address.substring(0, i) as any;
            address = address.substring(i + 1);
        }

        $require.notNull(params.name, `--name should be set`);
        $validate.platform(platform, `Chain not set. Use as prefix "eth:0x.." or flag "--chain eth"`);
        $validate.config.blockchainExplorer(platform);

        let output = class_Uri.combine(params.output ?? `./0xweb/`, platform);

        let generator = new Generator({
            name: params.name,
            platform,
            source: {
                abi: address
            },
            implementation: params.proxyTarget,
            output,
            saveAbi: true
        });
        let { main } = await generator.generate();

        let packagePath = `0xweb.json`
        let json = {} as any;
        if (await File.existsAsync(packagePath)) {
            json = await File.readAsync(packagePath);
        }
        if (json.contracts == null) {
            json.contracts = {};
        }
        if (json.contracts[platform] == null) {
            json.contracts[platform] = {};
        }

        json.contracts[platform][address] = {
            name: params.name,
            main
        };
        await File.writeAsync(packagePath, json);
        return { main };
    }
}

interface IInstallParams {
    name: string
    proxyTarget: string
    chain: string
    output: string
}
