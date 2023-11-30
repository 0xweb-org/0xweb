import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { EoAccount, TAccount } from '@dequanto/models/TAccount';
import { TxDataBuilder } from '@dequanto/txs/TxDataBuilder';
import { $require } from '@dequanto/utils/$require';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { class_Uri } from 'atma-utils';

export function CSolidity() {
    return <ICommand>{
        command: 'sol',
        description: [
            'Solidity utilities'
        ],
        subcommands: [
            {

                command: 'yul',
                description: [
                    'Compile Solidity code to Yul'
                ],
                arguments: [
                    {
                        description: `Solidity path`,
                        required: true
                    }
                ],
                params: {
                    '--output, -o': {
                        description: 'Optional. Override the output file'
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let [path] = args;

                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);

                    let provider = new HardhatProvider();
                    let result = await provider.compileSol(path);
                    //console.log('r', result);
                    let metaInfoPath = result.output;

                    $require.True(await File.existsAsync(metaInfoPath), `File bold<${metaInfoPath}> does not exist`);

                    let dbgInfoPath = metaInfoPath.replace('.json', '.dbg.json');
                    $require.True(await File.existsAsync(dbgInfoPath), `File bold<${metaInfoPath}> does not exist`);

                    let dbgInfo = await File.readAsync<any>(dbgInfoPath);

                    let dbgInfoPathDir = new class_Uri(dbgInfoPath).toDir();
                    let buildInfoPath = class_Uri.combine(dbgInfoPathDir, dbgInfo.buildInfo);
                    $require.True(await File.existsAsync(buildInfoPath), `File bold<${metaInfoPath}> does not exist`);

                    let buildInfo = await File.readAsync<any>(buildInfoPath);
                    //console.log(buildInfo.output.contracts['cache/foo.sol'].Foo.evm);
                }
            }
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}
