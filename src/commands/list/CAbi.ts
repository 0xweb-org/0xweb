import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { $logger } from '@dequanto/utils/$logger';


export function CAbi() {
    return <ICommand>{
        command: 'abi',

        description: [
            `ABI tools`
        ],

        subcommands: [
            {
                command: 'topic0',
                description: ['Create topic0 ID for the event'],
                arguments: [
                    {
                        description: 'event ABI',
                        name: 'event',
                        type:'string',
                        required: true
                    }
                ],
                params: {
                    ...Parameters.chain({ required: false })
                },
                api: {},
                async process(args, params, app) {
                    let [ event ] = args;

                    let abi = $abiParser.parseMethod(event.trim());
                    let topic0 = $abiUtils.getTopicSignature(abi);
                    $logger.log(`bold<${topic0}>`);
                    return topic0;
                }
            }
        ],

        async process(args: string[], params) {

        }
    };
}
