import memd from 'memd';
import { env } from 'atma-io';
import { ERC20 } from '@dequanto-contracts/openzeppelin/ERC20';
import { IBlockChainExplorer } from '@dequanto/explorer/IBlockChainExplorer';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { TAddress } from '@dequanto/models/TAddress';

export class InternalTokenService {

    @memd.deco.memoize({
        trackRef: true,
        keyResolver (address: TAddress, client: Web3Client, explorer: IBlockChainExplorer) {
            return `${client.platform}:${address}`
        },
        persistance: new memd.FsTransport({
            path: env.appdataDir.combine('./0xc/cache/tokens.json').toString()
        })
    })
    async getTokenData (address: TAddress, client: Web3Client, explorer: IBlockChainExplorer) {
        let erc20 = new ERC20(address, client, explorer);
        let [ symbol, name, decimals ] = await Promise.all([
            erc20.symbol(),
            erc20.name(),
            erc20.decimals(),
        ]);

        return {
            symbol,
            name,
            decimals,
            address,
            platform: client.platform
        };
    }
}
