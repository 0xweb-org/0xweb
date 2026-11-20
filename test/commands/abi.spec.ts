import { TestUtils } from '../TestUtils';

UTest({
    $config: {
        timeout: 2 * 60 * 1000
    },
    async '$before'() {
        await TestUtils.clean();
    },
    async 'get topic0 for event' () {
        let result = await TestUtils.fork(
            `abi topic0 'event Transfer(address from, address to, uint256 value)'`
        );
        has_(result, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef');
    }
})
