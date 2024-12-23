import { l } from '@dequanto/utils/$logger';
import { TestNode } from '../../dequanto/test/hardhat/TestNode';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { TestUtils } from '../TestUtils';
import { File } from 'atma-io';
import { run } from 'shellbee';
import { CServer } from '@core/commands/list/CServer';
import { App } from '@core/app/App';


let server = CServer();

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before'() {
        let app = new App()
        await app.execute((['server', 'start']));

    },
    async 'var'() {

    }
})
