import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { EoAccount, TAccount } from '@dequanto/models/TAccount';
import { TxDataBuilder } from '@dequanto/txs/TxDataBuilder';
import { $require } from '@dequanto/utils/$require';
import { $sig } from '@dequanto/utils/$sig';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';
import { TxWriter } from '@dequanto/txs/TxWriter';
import { $tx } from '@core/utils/$tx';

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
                    console.log(txSignedRaw, '<');
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
                    'Sends transaction from JSON'
                ],
                arguments: [
                    {
                        description: `Path to a Tx JSON file`,
                        required: true
                    }
                ],
                params: {
                    ...Parameters.account({ required: false }),
                },
                async process(args: string[], params: any, app: App) {
                    let [path] = args;
                    let client = app.chain.client;

                    $require.True(await File.existsAsync(path), `File bold<${path}> does not exist`);

                    let json = await File.readAsync<any>(path);
                    let account = params.account
                        ? await app.getAccount(params.account)
                        : null;

                    if (account == null && json.signature) {
                        let txSerialized = $sig.TxSerializer.serialize(json.tx, json.signature);
                        let address = await $sig.recoverTx(txSerialized);
                        account = { address };
                    }
                    $require.notNull(account, `Account not resolved from CLI, neither valid signature  in tx json exists`);

                    let builder = TxDataBuilder.fromJSON(client, account as TAccount, {
                        tx: json.tx,
                        config: json.config
                    });

                    let writer = TxWriter.create(client, builder, account as TAccount);
                    if (json.signature) {
                        $console.toast(`Sending transaction with predefined signature`);
                        writer.send({ signature: json.signature });
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

                    let [hash] = args;
                    await $tx.log(app.chain.client, app.chain.explorer, hash);
                }
            }
        ],
        async process() {
            throw new Error(`Subcommand is not set`);
        }
    };
}
