import { ICommand } from '@core/commands/ICommand';
import { TPlatform } from '@dequanto/models/TPlatform';
import { $config } from '@dequanto/utils/$config';
import { $require } from '@dequanto/utils/$require';

export namespace $validate {

    export const platforms = ['eth', 'polygon', 'bsc'];

    export function platform (platform: TPlatform, message?: string) {
        $require.notNull(platform, message);
        $require.oneOf(platform, platforms, message);
    }

    export namespace config {

        export function rpcNodes (platform: TPlatform) {

            let endpoints = $config.get(`web3.${platform}.endpoints`);
            if (Array.isArray(endpoints) && endpoints.length > 0 && /^(https?|wss?)/.test(endpoints[0].url)) {
                return;
            }

            let example = {
                web3: {
                    [platform]: {
                        endpoints: [
                            {
                                url: 'https://rpc-node.foo'
                            },
                            {
                                url: 'wss://rpc-node.foo'
                            }
                        ]
                    }
                }
            };
            let msg = `${platform} nodes not configurated. Run "0xweb config -e" and set node urls in web3.${platform}.endpoints`;
            console.error(msg);
            console.error('Current: ', endpoints, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }

        export function blockchainExplorer (platform: TPlatform) {

            let scan = $config.get(`blockchainExplorer.${platform}`);
            if (scan?.host && scan?.key) {
                return;
            }

            let example = {
                blockchainExplorer: {
                    [platform]: {
                        host: 'https://api.etherscan.io',
                        key: 'YOUR_API_KEY'
                    }
                }
            };
            let msg = `${platform} blockchain explorer not configurated. Run "0xweb config -e" and set node host and key in web3.${platform}`;
            console.error(msg);
            console.error('Current: ', scan, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }
    }


    export function args (command: ICommand, args: string[]) {
        let definition = command.arguments;
        if (definition == null || definition.length === 0) {
            return;
        }
        for (let i = 0; i < definition.length; i++) {
            let def = definition[i];
            if (def.required !== true) {
                return;
            }

            let val = args[i];
            if (val == null) {
                throw new Error(`Argument ${def.name ?? i} is required`);
            }
        }
    }
}
