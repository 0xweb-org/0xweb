import { ICommand } from '@core/commands/ICommand';
import { TPlatform } from '@dequanto/models/TPlatform';
import { $config } from '@dequanto/utils/$config';
import { $require } from '@dequanto/utils/$require';
import { $console } from './$console';
import { IBlockchainExplorerConfig } from '@dequanto/explorer/BlockchainExplorer';

export namespace $validate {

    export function platforms () {
        let web3Config = $config.get('web3');
        $require.notNull(web3Config, `Configuration was not loaded, or is invalid. "web3" field not found`);

        let keys = Object.keys(web3Config);
        return keys;
    }

    export function platform (platform: TPlatform, message?: string) {
        $require.notNull(platform, message);
        $require.oneOf(platform, platforms(), message);
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
            let msg = `${platform} nodes not configured. Run "0xweb config -e" and set node urls in web3.${platform}.endpoints`;
            console.error(msg);
            console.error('Current: ', endpoints, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }

        export function blockchainExplorer (platform: TPlatform) {
            if (platform === 'hardhat') {
                return;
            }
            let scan = $config.get <IBlockchainExplorerConfig> (`blockchainExplorer.${platform}`);
            if (scan?.host || scan?.api) {
                return;
            }

            let example = {
                blockchainExplorer: {
                    [platform]: {
                        api: 'https://api.foo.some/api',
                        key: 'YOUR_API_KEY_OPTIONAL'
                    }
                }
            };
            let msg = `${platform} blockchain explorer not configured. Run "0xweb config -e" and set node host and key in web3.${platform}`;
            console.error(msg);
            console.error('Current: ', scan, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }
    }


    export function args (command: ICommand, args: string[], options?: { inputFailed?: boolean }): Promise<void> {
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
                let str = `${def.name ?? i}`;
                if (def.description) {
                    str += ` (${def.description})`
                }

                throw new Error(`Argument ${str} is required`);
            }
        }
    }

    export function params (command: ICommand, paramsDef: ICommand['params'], params) {
        for (let key in paramsDef) {
            let def = paramsDef[key];
            let val = params[key];

            if (Array.isArray(def.oneOf)) {
                $require.oneOf(val, def.oneOf);
            }
            if (def.validate) {
                try {
                    def.validate(val);
                } catch (error) {
                    $console.log(`Parameter '${def.key}' is invalid:`);
                    $console.table([
                        ['Info', def.description ],
                    ]);

                    throw error;
                }
            }
        }
    }
}
