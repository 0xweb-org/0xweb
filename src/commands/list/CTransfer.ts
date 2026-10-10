import { $require } from '@dequanto/utils/$require';
import di from 'a-di';
import { ICommand } from '../ICommand';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $is } from '@dequanto/utils/$is';
import { IToken } from '@dequanto/models/IToken';
import { TokenTransferService } from '@dequanto/tokens/TokenTransferService';
import { $bigint } from '@dequanto/utils/$bigint';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { EoAccount, TAccount } from '@dequanto/models/TAccount';
import { Parameters } from '@core/utils/Parameters';
import { l } from '@dequanto/utils/$logger';
import { $address } from '@dequanto/utils/$address';
import { TxWriter } from '@dequanto/txs/TxWriter';


export function CTransfer() {
    return <ICommand>{
        command: 'transfer',
        example: '0xweb transfer 0.1 ETH --from 0x... --to 0x... ',
        description: [
            'Transfer ETH or ERC-20 tokens'
        ],
        arguments: [
            {
                name: '<amount>',
                description: 'Amount in token units or a percentage of the balance. Use a negative amount to specify how much to leave in the sender account',
                required: true,
            },
            {
                name: '<token>',
                description: 'Token symbol or address',
                required: true,
            }
        ],
        params: {
            '-f, --from': {
                description: 'Sender account name or address',
                required: true
            },
            '-t, --to': {
                description: 'Recipient account name or address',
                required: true
            },
            ...Parameters.chain(),
            ...Parameters.pin(),
            '--safe-transport': {
                description: `File path for manually collected multisig signatures. Default: Gnosis Safe Service`,
            },
            '--sig-transport': {
                description: `File path to save the transaction and wait for an external signature`,
            },
            '--tx-output': {
                description: `Save the transaction to a file without broadcasting it`,
            }
        },
        async process(args: string[], params: { from: string, to: string, chain: string, safeTransport?: string, sigTransport?: string, txOutput?: string }, app: App) {
            let chainTools = $require.notNull(app?.chain, `Chain not initialized`);
            let [amountStr, tokenMix] = args;


            $console.toast(`Loading token ${tokenMix}`);
            let token = await chainTools.tokens.getToken(tokenMix, true);
            if (token == null && $is.Address(tokenMix)) {
                token = <IToken>{
                    address: tokenMix,
                    decimals: 18,
                    platform: chainTools.client.platform,
                };
            }
            if (token == null && tokenMix === chainTools.client.chainToken) {
                token = <IToken>{
                    symbol: tokenMix,
                    address: $address.ZERO,
                    decimals: 18,
                    platform: chainTools.client.platform,
                };
            }
            if (token == null) {
                throw new Error(`Token ${tokenMix} not found`);
            }

            let accountFrom = await app.getAccount(params.from) as EoAccount;
            if (accountFrom == null) {
                throw new Error(`Account ${params.from} not found in storage`);
            }
            let accountTo = $is.Address(params.to)
                ? <EoAccount>{ address: params.to }
                : await app.getAccount(params.to);

            if (accountTo == null) {
                throw new Error(`Account ${params.to} not found in storage`);
            }
            if (accountTo.platform && accountTo.platform !== chainTools.client.platform) {
                //-throw new Error(`Chain mismatch. Account ${accountTo.address} required ${accountTo.platform}, but got ${chainTools.client.platform}`);
            }

            let service = di.resolve(TokenTransferService, chainTools.client);

            $console.toast(`Loading current balance for ${accountFrom.address}`);
            let fromAddress = $require.notNull(accountFrom.address, `Sender account has no address`);
            let toAddress = $require.notNull(accountTo.address, `Recipient account has no address`);
            let balance = await service.getBalance(fromAddress, token);
            $console.log(`Account balance: ${$bigint.toEther(balance, token.decimals)}`);


            let amount: bigint | number;
            let percents = /^(?<value>[\d\.]+)%$/.exec(amountStr);
            if (percents) {
                let p = Number(percents[1]);
                amount = $bigint.multWithFloat(balance, p / 100);
            } else {
                let num = Number(amountStr);
                if (isNaN(num)) {
                    throw new Error(`Invalid amount number ${amountStr}`);
                }
                amount = num;
            }

            if (!amount) {
                throw new Error(`Invalid amount: ${amountStr}`);
            }

            $console.toast(`Transferring ${amount}${token.symbol} from ${accountFrom.address} to ${accountTo.address}`);

            let safeTransportFile = params.safeTransport;
            if (safeTransportFile) {
                service.$configWriter({
                    safeTransport: new FileServiceTransport(chainTools.client, accountFrom, safeTransportFile)
                });
            }
            let sigTransportFile = params.sigTransport;
            if (sigTransportFile) {
                service.$configWriter({
                    sigTransport: sigTransportFile
                });
            }
            let txOutput = params.txOutput;
            if (txOutput) {
                service.$configWriter({
                    txOutput: txOutput
                });
            }

            let tx: TxWriter;
            if (amount === balance) {
                tx = await service.transferAll(accountFrom, toAddress, token);
            } else if (amount < 0) {
                tx = await service.transferAllWithRemainder(accountFrom, toAddress, token, amount);
            } else {
                tx = await service.transfer(accountFrom, toAddress, token, amount);
            }

            if (txOutput) {
                let path = await tx.onSaved;
                l`Transfer transaction green<saved>. To submit to the blockchain call "0xweb tx send ${path}"`;
                return;
            }
            let receipt = await tx.wait();
            l`Transfered. Receipt: bold<${receipt.transactionHash}>`;
        }
    };
}
