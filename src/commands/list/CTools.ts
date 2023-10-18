import { ICommand } from '../ICommand';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $sig } from '@dequanto/utils/$sig';
import { $is } from '@dequanto/utils/$is';

export function CTools ()  {
    return <ICommand>{
        command: 'tool',

        description: [
            'Utility tools.'
        ],
        subcommands: [
            {
                command: 'key-encode',
                example: '0xweb tool key-encode <key> -p <pin>',
                description: [
                    'Encode the private key with the PIN'
                ],
                arguments: [
                    {
                        name: '<key>',
                        description: 'Private Key',
                        required: true,
                    }
                ],
                params: {
                    '-p, --pin': {
                        description: 'Any password to encrypt the private key with',
                        required: true
                    },
                },
                async process (args: string[], params: { pin }, app: App) {
                    let [ privateKey ] = args;
                    if ($is.HexBytes32(privateKey) === false) {
                        throw new Error(`Invalid private key ${privateKey}`);
                    }
                    if (params.pin == null || params.pin.length < 3) {
                        throw new Error(`Invalid private pin ${params.pin}`);
                    }

                    const encryptedKey = await $sig.$key.encrypt(privateKey as any, params.pin);
                    $console.log(encryptedKey)
                }
            },
        ],

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    };
};

