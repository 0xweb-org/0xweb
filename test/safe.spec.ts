import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { $address } from '@dequanto/utils/$address';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';
import { TestNode } from '../dequanto/test/hardhat/TestNode';
import { run } from 'shellbee';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import alot from 'alot';
import { HardhatWeb3Client } from '@dequanto/clients/HardhatWeb3Client';
import { $promise } from '@dequanto/utils/$promise';
import * as ethers from 'ethers';
import  axios from 'axios';
import dns from 'dns';

const ACCOUNTS_PATH = './test/bin/accounts.json';
const PARAMS_DEF = {
    '--config-accounts': ACCOUNTS_PATH,
    '--pin': '12345',
    '--chain': 'hardhat'
};

const COMMAND = (params: string) => `node ./index.js ${params} --config-accounts ${ACCOUNTS_PATH} -p 12345 --chain hardhat`
const cli = async (params: string) => {
    let { stdout } = await run(COMMAND(params));
    return stdout.join('\n');
};

const cliEx = async (command: string, params: any) => {
    params = {
        ...PARAMS_DEF,
        ...params
    };
    let paramsStr = alot.fromObject(params).map(x => `${x.key} ${x.value}`).toArray().join(' ');
    let cmdStr = `node ./index.js ${command} ${paramsStr} --network localhost`;
    let { stdout } = await run(cmdStr);
    return stdout.join('\n');
};


UTest({
    async '$before' () {
        await File.removeAsync(ACCOUNTS_PATH);
        await TestNode.start();
    },
    async 'should add, list, remove safe' () {
        let account = ChainAccountProvider.generate();

        l`\n> add account`
        let addedStdout = await cli(`accounts add -n bar -k ${account.key}`);
        has_(addedStdout, account.address);


        l`\n> add`
        let addedSafeStdout = await cli(`safe add -n safe/foo -a ${$address.ZERO} -o ${account.address}`);
        has_(addedSafeStdout, account.address);

        l`\n> is encrypted`
        let jsonStr = await File.readAsync<string>(ACCOUNTS_PATH, { skipHooks: true });
        hasNot_(jsonStr, account.address);
        hasNot_(jsonStr, 'foo');

        l`\n> list`
        let listStdout = await cli('safe list');
        has_(listStdout, 'safe/foo');
        hasNot_(listStdout, account.address);
        has_(listStdout, $address.ZERO);


        l`\n> remove`
        let removeStdout = await cli('safe remove -n safe/foo');
        hasNot_(removeStdout, 'safe/foo');
        hasNot_(removeStdout, account.address);


        listStdout = await cli('safe list');
        hasNot_(listStdout, 'safe/foo');
        hasNot_(listStdout, account.address);
    },

    async '!create safe' () {

        //dns.setDefaultResultOrder('ipv4first')


            // let x = new HardhatWeb3Client();
            // let w = await x.getWeb3();
            // console.log(await w.eth.getChainId());

            // await $promise.wait(10_000);
            // return;

            let provider = new HardhatProvider();
            let client = provider.client('localhost');
            let owner1 = provider.deployer();
            let owner2 = provider.deployer(1);

            const { contract: proxyFactoryContract, abi: proxyFactoryAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/proxies/GnosisSafeProxyFactory.sol', {
                client
            });
            const { contract: safeContract, abi: safeAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/GnosisSafe.sol', {
                client
            });
            const { contract: multiSendContract, abi: multiSendAbi } = await provider.deploySol('/dequanto/test/fixtures/gnosis/libraries/MultiSend.sol', {
                client
            });


            l`Adding account to storage. (Later the owner of the safe)`;
            await cliEx(`accounts add`, {
                '--name': 'bar',
                '--key': owner1.key
            });

            let contracts = {
                multiSendAddress: multiSendContract.address,
                multiSendAbi: multiSendAbi,

                safeMasterCopyAddress: safeContract.address,
                safeMasterCopyAbi: safeAbi,

                safeProxyFactoryAbi: proxyFactoryAbi,
                safeProxyFactoryAddress: proxyFactoryContract.address
            };

            await File.writeAsync('./test/bin/contracts.json', contracts);

            let stdCreateSafe = await cliEx(`safe new`, {
                '--owner': owner1.address,
                '--name': 'safe/test',
                '--contracts': './test/bin/contracts.json'
            });

            let match = /safe\/test\s+\[(?<address>[^\]]+)\]/.exec(stdCreateSafe);
            let address = match?.groups?.address;
            eq_($address.isValid(address), true, 'Safe address not found');


            let resp = await cliEx(`token transfer ETH`, {
                '--owner': owner1.address,
                '--name': 'safe/test',
                '--contracts': './test/bin/contracts.json'
            });

            // eq_($address.isValid(safe.safeAddress), true, `Invalid address ${safe.safeAddress}`);

            // let contract = new GnosisSafe(safe.safeAddress, client);
            // let nonce = await contract.nonce();
            // eq_(Number(nonce), 0);


            // let handler = new GnosisSafeHandler({
            //     safeAddress: safe.safeAddress,
            //     owner: owner1,
            //     client: client,
            //     transport: new InMemoryServiceTransport(client, owner1)
            // });


            // const { contract: freeTokenContract, abi: freeTokenAbi } = await provider.deploySol('/dequanto/test/fixtures/contracts/FreeToken.sol');


            // let balanceBefore = await freeTokenContract.balanceOf(safe.safeAddress);
            // eq_($bigint.toEther(balanceBefore, 18), 0);


            // '> airdrop some tokens to sender (safe)'

            // let writer = new ContractWriter(freeTokenContract.address, client);
            // let txWriter = await writer.writeAsync(<SafeAccount>{
            //     address: safe.safeAddress,
            //     operator: owner1,
            // }, 'airdrop()', [], {
            //     builderConfig: {
            //         send: 'manual'
            //     }
            // });


            // let { hash, threshold } = await handler.createTransaction(txWriter, 0n);

            // await handler.confirmTx(hash, owner2);
            // await handler.confirmTx(hash, owner1);
            // let tx = await handler.submitTransaction(hash);

            // let receipt = await tx.wait();
            // eq_(receipt.status, true);

            // let balance = await freeTokenContract.balanceOf(safe.safeAddress);
            // let eth = $bigint.toEther(balance, 18);
            // eq_(eth, 10);

    }
})
