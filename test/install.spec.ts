import { run } from 'shellbee'
import { Directory, File } from 'atma-io'

UTest({
    async '$before' () {
        await Directory.remove('/0xweb/eth/DisperseContract/');
    },
    async 'install contract' () {
        let { stdout } = await run(`node index.js i 0xd152f549545093347a162dce210e7293f1452150 --name DisperseContract --chain eth`);

        let content = await File.readAsync<string>(`/0xweb/eth/DisperseContract/DisperseContract.ts`, { skipHooks: true });
        has_(content, 'class DisperseContract extends ContractBase');

        let packagePath = '0xweb.json';
        let json = await File.readAsync<any>(packagePath);

        has_(json.contracts.eth['0xd152f549545093347a162dce210e7293f1452150'].main, 'DisperseContract.ts');
    }

})
