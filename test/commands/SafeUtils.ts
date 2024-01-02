import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { TAddress } from '@dequanto/models/TAddress';
import { $address } from '@dequanto/utils/$address';
import { File } from 'atma-io';
import memd from 'memd';
import { TestUtils } from '../TestUtils';

export class SafeUtils {

    static async create(owner: TAddress, name: string) {
        let path = await SafeUtils.prepare();
        let stdCreateSafe = await TestUtils.cli(`safe new`, {
            '--owner': owner,
            '--name': name,
            '--contracts': path
        });

        let match = /safe\/test\s+\[(?<address>[^\]]+)\]/.exec(stdCreateSafe);
        let safeAddress = match?.groups?.address;
        eq_($address.isValid(safeAddress), true, 'Safe address not found');
        return safeAddress as TAddress;
    }

    @memd.deco.memoize()
    static async prepare () {
        let path = './test/bin/contracts.json';
        if (await File.existsAsync(path)) {
            await File.removeAsync(path);
        }
        let provider = new HardhatProvider();
        let client = provider.client('localhost');

        const { contract: proxyFactoryContract, abi: proxyFactoryAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/proxies/GnosisSafeProxyFactory.sol', {
            client
        });
        const { contract: safeContract, abi: safeAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/GnosisSafe.sol', {
            client
        });
        const { contract: multiSendContract, abi: multiSendAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/libraries/MultiSend.sol', {
            client
        });

        let contracts = {
            Safe: safeContract.address,
            SafeProxyFactory: proxyFactoryContract.address,
            MultiSend: multiSendContract.address,
        };

        console.log(`Gnosis Safe Contracts`, contracts);
        await File.writeAsync(path, contracts);
        return path;
    }
}
