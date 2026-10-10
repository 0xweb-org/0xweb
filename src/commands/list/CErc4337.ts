import di from 'a-di';
import alot from 'alot';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { EoAccount, Erc4337Account, SafeAccount, TAccount } from '@dequanto/models/TAccount';
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
import { CSafe } from './CSafe';
import { TxService } from '@core/services/TxService';

export function CErc4337 () {
    return <ICommand>{
        command: 'aa',

        description: [
            'ERC-4337 account abstraction tools',
        ],
        subcommands: [

            {
                command: 'add',
                description: [
                    'Add an existing ERC-4337 account'
                ],
                params: {
                    '-o, --owner': {
                        description: 'Address or name of an existing owner account (EOA)',
                        required: true,
                    },
                    '-a, --address': {
                        description: 'ERC-4337 address',
                        required: true
                    },
                    '-n, --name': {
                        description: 'Name of the account',
                        required: true,
                    }
                },
                async process(args: string[], params: { owner: string, address: `0x${string}`, name: string, chain: string }, app: App) {
                    let { owner, address, name, chain } = params;
                    let service = di.resolve(AccountsService, app.config);
                    let accounts: Awaited<ReturnType<AccountsService['list']>> = await service.add(<Erc4337Account>{
                        type: 'erc4337',
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

            $require.notNull(CAccounts().subcommands?.find(x => x.command === 'remove'), `Accounts remove command not found`),

            {
                command: 'list',
                description: [
                    'List ERC-4337 account names'
                ],
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config);
                    let accounts = await service.list();

                    accounts = accounts.filter(x => x.type === 'erc4337')
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
                    'Deploy a new ERC-4337 account'
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
                    '--contracts': {
                        description: 'Optional JSON file with entryPoint and accountFactory contract addresses'
                    },
                    ...Parameters.pin({ required: true })
                },
                async process(args: string[], params: { name: string, owner: string, chain: string, contracts?: string }, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);

                    let contracts = null;
                    if (params.contracts) {
                        contracts = await File.readAsync<any>(params.contracts);
                    }

                    let account = await chainTools.accounts.get(params.owner, { platform: params.chain }) as EoAccount;
                    $require.notNull(account, `Account ${params.owner} not found`);

                    let aa = await GnosisSafeFactory.create(account, chainTools.client, {
                        owners,
                        contracts: {
                            [chainTools.client.chainId]: contracts ?? void 0
                        },
                    });
                    $console.table([
                        ['ERC-4337 Address', gnosisSafe.safeAddress]
                    ]);

                    let addCommand = $require.notNull(CSafe().subcommands?.find(x => x.command === 'add'), `Safe add command not found`);
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
                async process(args: string[], params: { account: string }, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let [path] = args;
                    let client = chainTools.client;
                    let account = await chainTools.accounts.get(params.account) as EoAccount;

                    $require.notNull(account, `Account ${params.account} not found`);
                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);


                    let safeWorker = new SafeWorker(path, client, account);
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
                async process(args: string[], params: { account: string }, app: App) {
                    let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
                    let [path] = args;
                    let client = chainTools.client;
                    let account = await chainTools.accounts.get(params.account) as EoAccount;

                    $require.notNull(account, `Account ${params.account} not found`);
                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);


                    let safeWorker = new SafeWorker(path, client, account);

                    $console.toast('Sending transaction');
                    let tx = await safeWorker.send();
                    let hash = await tx.onSent;
                    $console.toast(`Transaction ${hash} sent. Waiting for receipt`);

                    let receipt = await tx.onCompleted;
                    await TxService.printTx(app, receipt.transactionHash, undefined, receipt);
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

        let confirmation = await gnosis.createTxSignature(json.safeTxHash, account);
        let confirmations = json.confirmations as (typeof confirmation)[];
        if (confirmations == null) {
            confirmations = json.confirmations = [];
        }

        let address = $require.notNull(account.address, `Signer account has no address`);
        let has = confirmations.find(x => $address.eq(x.signature?.signer, address));
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
