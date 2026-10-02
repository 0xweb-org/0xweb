import di from 'a-di';
import alot from 'alot';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { EoAccount, SafeAccount, TAccount } from '@dequanto/models/TAccount';
import { $address } from '@dequanto/utils/$address';
import { GnosisSafeFactory } from '@dequanto/safe/GnosisSafeFactory';
import { $require } from '@dequanto/utils/$require';
import { CAccounts } from './CAccounts';
import { File } from 'atma-io';
import { Parameters } from '@core/utils/Parameters';
import { GnosisSafeHandler } from '@dequanto/safe/GnosisSafeHandler';
import { TxDataBuilder } from '@dequanto/txs/TxDataBuilder';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { $tx } from '@core/utils/$tx';
import { $logger, l } from '@dequanto/utils/$logger';
import { TxService } from '@core/services/TxService';
import { TEth } from '@dequanto/models/TEth';

export function CSafe() {
    return <ICommand>{
        command: 'safe',

        description: [
            'Manage Safe multisig accounts'
        ],
        subcommands: [

            {
                command: 'add',
                description: [
                    'Add an existing Safe account'
                ],
                params: {
                    '-o, --owner': {
                        description: 'Address or name of an existing owner account (EOA)',
                        required: true,
                    },
                    '-a, --address': {
                        description: 'Safe address',
                        required: true
                    },
                    '-n, --name': {
                        description: 'Name of the account',
                        required: true,
                    }
                },
                async process(args: string[], params: { owner, address, name, chain }, app: App) {
                    let { owner, address, name, chain } = params;
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.add(<SafeAccount>{
                        type: 'safe',
                        name,
                        address,
                        operator: $address.isValid(owner) ? {
                            address: owner
                        } : {
                            name: owner
                        },
                        platform: chain
                    });

                    let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');

                    $console.log(`Accounts:`);
                    $console.result(str);
                }
            },

            CAccounts().subcommands.find(x => x.command === 'remove'),

            {
                command: 'list',
                description: [
                    'List Safe account names'
                ],
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.list();

                    accounts = accounts.filter(x => x.type === 'safe')
                    if (accounts.length === 0) {
                        console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                        return;
                    }
                    let str = accounts.map(x => ` - ${x.name} [${x.address}]`).join('\n');
                    $console.result(str);
                }
            },
            {
                command: 'new',
                description: [
                    'Deploy a new Safe account'
                ],
                params: {
                    '-n, --name': {
                        description: 'Name of the account to create',
                        required: true,
                    },
                    '-o, --owner': {
                        description: 'Address or name of an existing owner account',
                        required: true,
                    },
                    '-m, --members': {
                        description: 'Comma-separated addresses of additional owners',
                        default: [],
                        map(line) {
                            return line.split(',').map(x => x.trim()).filter(Boolean);
                        }
                    },
                    '--contracts': {
                        description: 'Optional JSON file with contract addresses for Safe, SafeL2, SafeProxyFactory, MultiSend, and CreateCall',
                    }
                },
                async process(args: string[], params: { name, owner, chain, members, contracts }, app: App) {

                    let contracts = null;
                    if (params.contracts) {
                        contracts = await File.readAsync<any>(params.contracts);
                    }

                    let account = await app.chain.accounts.get(params.owner, params.chain) as EoAccount;
                    $require.notNull(account, `Account ${params.owner} not found`);

                    let owners = alot([
                        account.address,
                        ...params.members
                    ])
                        .distinct()
                        .forEach(owner => $require.Address(owner))
                        .toArray();


                    console.log(`Deploy safe new ${app.chain.client.platform}`, contracts, owners);
                    let gnosisSafe = await GnosisSafeFactory.create(account, app.chain.client, {
                        owners,
                        contracts: {
                            [app.chain.client.platform]: contracts ?? void 0
                        },
                    });
                    $console.table([
                        ['Safe Address', gnosisSafe.safeAddress]
                    ]);

                    let addCommand = CSafe().subcommands.find(x => x.command === 'add');
                    await addCommand.process(args, {
                        owner: params.owner,
                        address: gnosisSafe.safeAddress,
                        name: params.name,
                        chain: params.chain,
                    }, app);
                }
            },
            {
                command: 'sign',
                description: [
                    'Add confirmations to the multisig transaction in a JSON file'
                ],
                arguments: [
                    {
                        description: `Path to a transaction JSON file`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.account(),
                },
                async process(args: string[], params: { account }, app: App) {
                    let [path] = args;
                    let client = app.chain.client;
                    let account = await app.chain.accounts.get(params.account) as EoAccount;

                    $require.notNull(account, `Account ${params.account} not found`);
                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);


                    let safeWorker = new SafeWorker(path, this.client, account);
                    await safeWorker.sign();
                }
            },
            {
                command: 'submit,send',
                description: [
                    'Submit a transaction from a JSON file. The file must already contain all required confirmations'
                ],
                arguments: [
                    {
                        description: `Path to a transaction JSON file`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.account(),
                },
                async process(args: string[], params: { account }, app: App) {
                    let [path] = args;
                    let client = app.chain.client;
                    let account = await app.chain.accounts.get(params.account) as EoAccount;

                    $require.notNull(account, `Account ${params.account} not found`);
                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);


                    let safeWorker = new SafeWorker(path, this.client, account);

                    $console.toast('Sending transaction');
                    let tx = await safeWorker.send();
                    let hash = await tx.onSent;
                    $console.toast(`Transaction ${hash} sent. Waiting for receipt`);

                    let receipt = await tx.onCompleted;
                    await TxService.printTx(app, hash as TEth.Hex, null, receipt);
                }
            },
        ],
        params: {
            ...Parameters.pin(),
            ...Parameters.chain(),
        },

        async process(args: string[], params, app: App) {
            console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
        }
    }
}

class SafeWorker {
    constructor(private path: string, private client: Web3Client, private account: EoAccount) {

    }

    async send() {
        let { json, gnosis } = await this.load();
        return gnosis.submitTransaction(json.safeTxHash);
    }

    async sign() {
        let client = this.client;
        let path = this.path;
        let account = this.account;


        let { json, gnosis } = await this.load();

        let confirmation = await gnosis.createTxSignature(json.safeTxHash);
        let confirmations = json.confirmations as (typeof confirmation)[];
        if (confirmations == null) {
            confirmations = json.confirmations = [];
        }

        let has = confirmations.find(x => $address.eq(x.signature?.signer, this.account.address));
        if (has) {
            throw new Error(`Signature for ${this.account.address} already exists`);
        }

        confirmations.push(confirmation);
        await File.writeAsync<any>(path, json);
    }

    private async load() {
        let { client, account, path } = this;

        $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);

        let json = await File.readAsync<any>(path);
        $require.Address(json.safeAddress, `No "safeAddress" field in the json file: ${path}`);

        let gnosis = di.resolve(GnosisSafeHandler, {
            owners: [ account ],
            safeAddress: json.safeAddress,
            client: this.client,
            transport: new FileServiceTransport(this.client, account, path)
        });

        let safeTxHash = json.safeTxHash;
        if (safeTxHash == null) {
            // ensure safeTxHash
            let builder = TxDataBuilder.fromJSON(client, account, {
                tx: json.tx,
                config: json.config
            });
            let { safeTxHash: hash } = await gnosis.createTxHash(builder);
            safeTxHash = hash;

            json.safeTxHash = safeTxHash;
            await File.writeAsync<any>(path, json);
        }

        return {
            json,
            gnosis
        };
    }

}
