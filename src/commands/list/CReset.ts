import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';

export function CReset() {
    return <ICommand>{
        command: 'reset',
        description: [
            'Reset various things'
        ],
        subcommands: [
            {
                command: 'accounts',
                description: [
                    'Remove all accounts'
                ],
                params: {
                    '--config-accounts': {
                        description: 'Optional. File path. Default is gray<%appdata%/.dequanto/accounts.json>'
                    }
                },
                async process() {
                    let configPathAccounts = $cli.getParamValue('config-accounts')
                        ?? env.appdataDir.combine('./.dequanto/accounts.json').toString();

                    let exists = await File.existsAsync(configPathAccounts);
                    if (exists === false) {
                        throw new Error(`File does not exist: ${configPathAccounts}`);
                    }
                    await File.removeAsync(configPathAccounts);
                    $console.result(`bold<green<Accounts file removed>>`);
                }
            },
            {
                command: 'config',
                description: [
                    'Remove global config file: bold<%appdata%/.dequanto/config.yml>'
                ],
                params: {

                },
                async process() {
                    let path = env.appdataDir.combine('./.dequanto/config.yml').toString();

                    let exists = await File.existsAsync(path);
                    if (exists === false) {
                        throw new Error(`File does not exist: ${path}`);
                    }
                    await File.removeAsync(path);
                    $console.result(`bold<green<Config file removed>>`);
                }
            }
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}
