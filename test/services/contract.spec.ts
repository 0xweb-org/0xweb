import { App } from '@core/app/App';
import { CContract } from '@core/commands/list/CContract';
import { ContractBase } from '@dequanto/contracts/ContractBase';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { l } from '@dequanto/utils/$logger';
import { run } from 'shellbee';


const hh = new HardhatProvider();
const client = hh.client();
const app = await new App().setChain(client);

let contract: ContractBase;

UTest({
    async '$before' () {
        let path = './test/fixtures/contracts/StorageCounter.sol';

        l`Deploy: ${path}`;
        let deployment = await hh.deploySol(path, { client });
        contract = deployment.contract;

        let command = `node index i ${contract.address} --name Counter --chain hardhat --source ${path}`;

        l`Install: ${contract.address}`;
        let result = await run({
            command,
            silent: true,
        });
    },
    async 'list installation' () {
        let str = await app.execute([
            'contract',
            'list'
        ]);
        has_(JSON.stringify(str), contract.address);
    },

    'calldata': {
        async 'simple' () {
            let result = await app.execute(
                'contract calldata Counter getCountMethod'.split(' ')
            );
            eq_(result.data, '0xe3412189');

            let resultParsed = await app.execute(
                'contract calldata parse Counter 0xe3412189'.split(' ')
            );
            eq_(resultParsed.name, 'getCountMethod');
            console.log(resultParsed);
        },
        async 'with argument' () {
            let result = await app.execute([
                `contract`,
                `calldata`,
                `Counter`,
                `updateUser`,
                `--user_`,
                `{"owner": "0x123", "amount": "0x456"}`
            ]);
            eq_(result?.data, '0x48a6e18c00000000000000000000000000000000000000000000000000000000000001230000000000000000000000000000000000000000000000000000000000000456');

            let deployer = hh.deployer();
            let receipt = await app.execute([
                `tx`,
                `send`,
                `--to`, `Counter`,
                `--data`, result.data,
                `--account`, deployer.key,
            ]);
            eq_(receipt.status, 1);

            let user = await app.execute([
                `contract`,
                `var`,
                `Counter`,
                'user'
            ]);
            eq_(Number(user.owner), 0x123);
            eq_(user.amount, 0x456n);
        }
    }
})
