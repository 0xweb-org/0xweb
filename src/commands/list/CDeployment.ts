import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { $address } from '@dequanto/utils/$address';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';

export function CDeployment() {
    return <ICommand>{
        command: 'deployment',

        description: [
            `Manage contract deployments`
        ],
        subcommands: [
            {
                command: 'fetch',
                description: ['Import an existing deployment into local deployment metadata and detect proxies'],
                arguments: [
                    {
                        description: 'Contract address',
                        required: true,
                    },
                    {
                        description: 'Contract name matching a compiled artifact',
                        required: true
                    },
                ],
                params: {
                    // file: {
                    //     description: 'Local meta file with the deployments',
                    //     required: false,
                    // },
                    directory: {
                        description: 'Local deployment metadata directory. Updates <dir>/deployments-<chain>.json',
                        required: false,
                    },
                    id: {
                        description: `ID to assign to the deployment`,
                        required: false,
                    },
                    main: {
                        description: `Generated contract class: full path, or class name if unique`,
                        required: true,
                    },
                    ...Parameters.chain({ required: true }),
                },
                async process(args, params, app) {
                    let [contractAddress, contractName] = args;
                    let { file, chain } = params;
                    let directory = params.directory ?? './0xc/deployments';

                    let client = app!.chain!.client;
                    let deployments = new Deployments(client, {
                        address: $address.ZERO
                    }, {
                        directory: directory,
                    });

                    await deployments.saveExisting({
                        contractAddress,
                        name: contractName,
                        id: params.id ?? void 0,
                        main: params.name
                    });
                }
            },
        ],
        async process () {
            throw new Error(`Subcommand not found`)
        }

    };
}

interface IInstallParams {
    name: string
    contractName: string
    implementation: string
    target: 'js' | 'mjs' | 'ts'
    chain: string
    output: string
    source: string
    global: boolean
    saveSources: boolean
}

