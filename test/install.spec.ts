import { run } from 'shellbee'
import { Directory, File } from 'atma-io'

UTest({
    async '$before' () {
        await Directory.remove('/web3m/eth/DisperseContract/');
    },
    async 'install contract' () {
        let { stdout } = await run(`node index.js i eth:0xd152f549545093347a162dce210e7293f1452150 --name DisperseContract`);

        let content = await File.readAsync<string>(`/web3m/eth/DisperseContract/DisperseContract.ts`, { skipHooks: true });
        has_(content, 'class DisperseContract extends ContractBase');

        let packagePath = 'web3m.json';
        let json = await File.readAsync<any>(packagePath);

        has_(json.contracts.eth['0xd152f549545093347a162dce210e7293f1452150'].main, 'DisperseContract.ts');
    }
})
