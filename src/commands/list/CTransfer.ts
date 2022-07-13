import di from 'a-di';
import { ICommand } from '../ICommand';
import { $validate } from '@core/utils/$validate';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $is } from '@dequanto/utils/$is';
import { IToken } from '@dequanto/models/IToken';
import { TokenPriceService } from '@dequanto/tokens/TokenPriceService';
import { TokenTransferService } from '@dequanto/tokens/TokenTransferService';
import { $bigint } from '@dequanto/utils/$bigint';
import { $require } from '@dequanto/utils/$require';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';


export const CTransfer = <ICommand>{
    command: 'transfer',
    example: '0xweb token transfer 0.1 ETH --from 0x... --to 0x... ',
    description: [
        'Get token price'
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
        '-c, --chain': {
            description: `Default: eth. Available: ${$validate.platforms.join(', ')}`,
            required: true
        },
        '--safe-transport': {
            description: `Optionally the file path for multisig signatures, if collected manually, as per default Gnosis Safe Service is used.`,
        }
    },
    async process (args: string[], params: { from, to, chain, safeTransport? }, app: App) {
        let [ amountStr, tokenMix ] = args;


        $console.toast(`Loading token ${tokenMix}`);
        let token = await app.chain.tokens.getToken(tokenMix, true);
        if (token == null && $is.Address(tokenMix)) {
            token = <IToken> {
                address: tokenMix,
                decimals: 18,
                platform: app.chain.client.platform,
            };
        }
        if (token == null) {
            throw new Error(`Token ${tokenMix} not found`);
        }

        let accountFrom = await app.getAccount(params.from);
        if (accountFrom == null) {
            throw new Error(`Account ${params.from} not found in storage`);
        }
        let accountTo = $is.Address(params.to)
            ? { address: params.to }
            : await app.getAccount(params.to);

        if (accountTo == null) {
            throw new Error(`Account ${params.to} not found in storage`);
        }

        let service = di.resolve(TokenTransferService, app.chain.client);

        $console.toast(`Loading current balance for ${accountFrom.address}`);
        let balance = await service.getBalance(accountFrom.address, token);
        $console.log(`Account balance: ${ $bigint.toEther(balance, token.decimals) }`);


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

        let tx = await service.transfer(accountFrom, accountTo.address, token, amount);
        let receipt = await tx.wait();
        $console.log(`Receipt ${receipt.transactionHash}`);
    }
}

