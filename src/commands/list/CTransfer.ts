import di from 'a-di';
import { ICommand } from '../ICommand';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $is } from '@dequanto/utils/$is';
import { IToken } from '@dequanto/models/IToken';
import { TokenTransferService } from '@dequanto/tokens/TokenTransferService';
import { $bigint } from '@dequanto/utils/$bigint';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { ChainAccount, TAccount } from '@dequanto/models/TAccount';
import { Parameters } from '@core/utils/Parameters';
import { l } from '@dequanto/utils/$logger';
import { $address } from '@dequanto/utils/$address';


export function CTransfer() {
    return <ICommand>{
        command: 'transfer',
        example: '0xweb transfer 0.1 ETH --from 0x... --to 0x... ',
        description: [
            'Transfer ETH or ERC20'
        ],
        arguments: [
            {
                name: '<amount>',
                description: 'Amount in ETHER, or percents. Supports negative values to leave rest amounts at sender account',
                required: true,
            },
            {
                name: '<token>',
                description: 'Token symbol or token address',
                required: true,
            }
        ],
        params: {
            '-f, --from': {
                description: 'Senders name or address. ',
                required: true
            },
            '-t, --to': {
                description: 'Receivers name or address. ',
                required: true
            },
            ...Parameters.chain(),
            ...Parameters.pin(),
            '--safe-transport': {
                description: `Optionally the file path for multisig signatures, if collected manually, as per default Gnosis Safe Service is used.`,
            },
            '--sig-transport': {
                description: `Optionally the file where we save the tx and wait until the signature for the TX is provided.`,
            },
            '--tx-output': {
                description: `Save the TX to the file, and do not send it to the blockchain`,
            }
        },
        async process(args: string[], params: { from, to, chain, safeTransport?, sigTransport?, txOutput? }, app: App) {
            let [amountStr, tokenMix] = args;


            $console.toast(`Loading token ${tokenMix}`);
            let token = await app.chain.tokens.getToken(tokenMix, true);
            if (token == null && $is.Address(tokenMix)) {
                token = <IToken>{
                    address: tokenMix,
                    decimals: 18,
                    platform: app.chain.client.platform,
                };
            }
            if (token == null && tokenMix === app.chain.client.chainToken) {
                token = <IToken>{
                    symbol: tokenMix,
                    address: $address.ZERO,
                    decimals: 18,
                    platform: app.chain.client.platform,
                };
            }
            if (token == null) {
                throw new Error(`Token ${tokenMix} not found`);
            }

            let accountFrom = await app.getAccount(params.from) as ChainAccount;
            if (accountFrom == null) {
                throw new Error(`Account ${params.from} not found in storage`);
            }
            let accountTo = $is.Address(params.to)
                ? <ChainAccount>{ address: params.to }
                : await app.getAccount(params.to);

            if (accountTo == null) {
                throw new Error(`Account ${params.to} not found in storage`);
            }
            if (accountTo.platform && accountTo.platform !== app.chain.client.platform) {
                throw new Error(`Chain missmatch. Account ${accountTo.address} required ${accountTo.platform}, but got ${app.chain.client.platform}`);
            }

            let service = di.resolve(TokenTransferService, app.chain.client);

            $console.toast(`Loading current balance for ${accountFrom.address}`);
            let balance = await service.getBalance(accountFrom.address, token);
            $console.log(`Account balance: ${$bigint.toEther(balance, token.decimals)}`);


            let amount: bigint | number;
            let percents = /^(?<value>[\d\.]+)%$/.exec(amountStr);
            if (percents) {
                let p = Number(percents.groups.value);
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

            $console.toast(`Transfering ${amount}${token.symbol} from ${accountFrom.address} to ${accountTo.address}`);


            let safeTransportFile = params.safeTransport;
            if (safeTransportFile) {
                service.$configWriter({
                    safeTransport: new FileServiceTransport(app.chain.client, accountFrom, safeTransportFile)
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

            let tx = await service.transfer(accountFrom, accountTo.address, token, amount);
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
