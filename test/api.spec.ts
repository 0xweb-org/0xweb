import { Directory, File } from 'atma-io'
import { App } from '../lib/0xweb.js'

UTest({
    async '$before' () {
        await Directory.remove('/0xc/eth/WETH/');
    },
    async 'should install package via API' () {
        let app = new App();
        let result = await app.execute(['install', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '--name', 'WETH', '--chain', 'eth'])

        eq_(result.main, './0xc/eth/WETH/WETH.ts');

        let content = await File.readAsync<string>(`/0xc/eth/WETH/WETH.ts`, { skipHooks: true });
        has_(content, 'class WETH extends ContractBase');

        let packagePath = '0xweb.json';
        let json = await File.readAsync<any>(packagePath);

        has_(json.contracts.eth['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'].main, 'WETH.ts');
    }
})
