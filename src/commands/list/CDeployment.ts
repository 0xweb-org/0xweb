import { $require } from '@dequanto/utils/$require';
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
                        name: 'ContractAddress',
                        description: 'Contract address',
                        required: true,
                    },
                    {
                        name: 'ContractName',
                        description: 'Contract name matching a compiled artifact',
                        required: true
                    },
                ],
                params: {
                    '--json': { description: 'Print the chain, metadata directory, and imported deployment record as JSON' },
                    directory: {
                        description: 'Local deployment metadata directory. Updates <dir>/deployments-<chain>.json',
                        required: false,
                    },
                    id: {
                        description: `ID to assign to the deployment. Default: contract name`,
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
                    $require.AddressNotEmpty(contractAddress);
                    let id = params.id ?? contractName;
                    $require.True(id.trim().length > 0, `Deployment ID must not be empty`);
                    let directory = params.directory ?? './0xc/deployments';

                    let client = $require.notNull(app?.chain, `Chain not initialized`).client;
                    let deployments = new Deployments(client, {
                        address: $address.ZERO
                    }, {
                        directory: directory,
                    });

                    await deployments.saveExisting({
                        contractAddress,
                        name: contractName,
                        id,
                        main: params.main
                    });
                    let deployment = await deployments.store.getDeploymentInfo(contractName, { id });
                    return { chain: client.platform, directory, deployment };
                }
            },
        ],
        async process () {
            throw new Error(`Subcommand not found`)
        }

    };
}
