import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { TxDataBuilder } from '@dequanto/txs/TxDataBuilder';
import { $require } from '@dequanto/utils/$require';
import { $sig } from '@dequanto/utils/$sig';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';
import { TxWriter } from '@dequanto/txs/TxWriter';
import { $tx } from '@core/utils/$tx';
import type { EoAccount, TAccount } from '@dequanto/models/TAccount';
import type { TEth } from '@dequanto/models/TEth';
import type { TAddress } from '@dequanto/models/TAddress';
import type { ITxBuilderOptions } from '@dequanto/txs/ITxBuilderOptions';
import { $is } from '@dequanto/utils/$is';
import { ContractService } from '@core/services/ContractService';
import di from 'a-di';
import { PackageService } from '@core/services/PackageService';


type TTxSendParams = {
    to?: TAddress | string
    account?: string | TEth.Hex | TAddress
    value?: string | TEth.Hex
    data?: TEth.Hex
    signature?: TEth.Hex
}
type TTxSendJson = TEth.DataLike<TEth.Tx> | {
    tx: TEth.DataLike<TEth.Tx>
    signature?: TEth.Hex
    config?: ITxBuilderOptions
};

export function CTx() {
    return <ICommand>{
        command: 'tx',
        description: [
            'Transaction utils'
        ],
        subcommands: [
            {

                command: 'sign',
                description: [
                    'Sign a transaction in a json file'
                ],
                arguments: [
                    {
                        description: `Path to a Tx JSON file`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.account(),
                    '--output, -o': {
                        description: 'Optional. Override the output file'
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let [path] = args;

                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);

                    let json = await File.readAsync<any>(path);

                    let account = await app.getAccount<EoAccount>(params.account);
                    $require.notNull(account, `Account ${params.account} not found`);

                    let builder = TxDataBuilder.fromJSON(app.chain.client, account as TAccount, {
                        tx: json.tx,
                        config: json.config
                    });

                    await builder.setNonce();
                    await builder.setGas();

                    let tx = builder.getTxData();
                    let rpc = await app.chain.client.getRpc();
                    let txSignedRaw = await $sig.signTx(tx, account, rpc);

                    let { v, r, s } = $sig.TxDeserializer.deserialize(txSignedRaw);
                    let txJson = builder.toJSON();

                    json.signature = { v, r, s };
                    json.account = txJson.account;
                    json.tx = txJson.tx;

                    let output = params.output ?? path;
                    await File.writeAsync(output, json);
                }
            },
            {
                command: 'send',
                description: [
                    'Sends the transaction. Could be a serialized JSON Tx or Tx data from CLI'
                ],
                arguments: [
                    {
                        description: `Path to a Tx JSON file, otherwise TxParams must be passed via parameters`,
                        required: false
                    }
                ],
                params: {
                    to: {
                        description: 'Recipient address or contract name',
                    },
                    value: {
                        description: 'Amount to send',
                        type: 'bigint'
                    },
                    data: {
                        description: 'Tx data to be sent',
                        type: 'hex'
                    },
                    ...Parameters.account({ required: false }),
                },
                async process(args: string[], params: TTxSendParams, app: App) {
                    let client = app.chain.client;
                    let tx: TEth.DataLike<TEth.Tx>;
                    let config: ITxBuilderOptions;
                    let signature: TEth.Hex;

                    let [ path ] = args;
                    if (path != null) {
                        $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);
                        let json = await File.readAsync<TTxSendJson>(path);
                        if ('tx' in json) {
                            tx = json.tx;
                            config = json.config;
                            signature = json.signature;
                        } else {
                            tx = json;
                        }
                    } else {
                        let to = params.to as TAddress;
                        if ($is.Address(to) === false) {
                            let packageService = di.resolve(PackageService, app.chain);
                            let pkg = await packageService.getPackage(to);
                            $require.notNull(pkg, `Package ${to} not found`);
                            to = pkg.address
                            $require.Address(to, `Package ${pkg.name} contains no address`);
                        }
                        tx = {
                            to: to,
                            value: params.value ?? 0n,
                            data: params.data,
                        };
                    }

                    let account = params.account
                        ? await app.getAccount(params.account)
                        : null;

                    if (account == null && signature != null) {
                        let txSerialized = $sig.TxSerializer.serialize(tx, signature);
                        let address = await $sig.recoverTx(txSerialized);
                        account = { address };
                    }
                    $require.notNull(account, `Account not resolved from CLI, neither valid signature in tx json exists`);

                    let builder = TxDataBuilder.fromJSON(client, account as TAccount, {
                        tx: tx,
                        config: config
                    });

                    let writer = TxWriter.create(client, builder, account as TAccount);
                    if (signature) {
                        $console.toast(`Sending transaction with predefined signature`);
                        writer.send({ signature: signature });
                    } else {
                        $console.toast(`Sending transaction`);
                        writer.send();
                    }

                    let hash = await writer.onSent;
                    let receipt = await writer.onCompleted;
                    await $tx.log(
                        app.chain.client,
                        app.chain.explorer,
                        hash,
                        null,
                        receipt,
                    );
                    return receipt;
                }
            },
            {

                command: 'view',
                description: [
                    'Load transaction by hash'
                ],
                arguments: [
                    {
                        description: `Tx hash`,
                        required: true,
                    }
                ],
                params: {
                    ...Parameters.chain()
                },
                async process(args: string[], params: any, app: App) {

                    let [ hash ] = args as [ TEth.Hex ];
                    await $tx.log(app.chain.client, app.chain.explorer, hash);
                }
            }
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}
