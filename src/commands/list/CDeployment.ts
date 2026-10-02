import { ICommand } from '../ICommand';
import { Parameters } from '@core/utils/Parameters';
import { $address } from '@dequanto/utils/$address';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';

export function CDeployment() {
    return <ICommand>{
        command: 'deployment',

        description: [
            `Deployment toolkit`
        ],
        subcommands: [
            {
                command: 'fetch',
                description: ['Fetch and install existing deployment to local deployments meta. Also detect proxies'],
                arguments: [
                    {
                        description: 'Contract address',
                        required: true,
                    },
                    {
                        description: 'Contract name: should exist in artifacts',
                        required: true
                    },
                ],
                params: {
                    // file: {
                    //     description: 'Local meta file with the deployments',
                    //     required: false,
                    // },
                    directory: {
                        description: 'Local meta directory with the deployments, the file is appended: <dir>/deployments-<chain>.json',
                        required: false,
                    },
                    id: {
                        description: `Will be used as the ID for the deployment`,
                        required: false,
                    },
                    main: {
                        description: `The generated class for the contract. The full-path or just the name if no overlappings`,
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

