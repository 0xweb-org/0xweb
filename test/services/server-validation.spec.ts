import { UTest } from 'atma-utest';
import { TestUtils } from '../TestUtils';
import { $promise } from '@dequanto/utils/$promise';

UTest.create({
    async 'API setup and account creation reject missing inputs without prompting' () {
        let cases = [
            { url: '/api/auth/2fa/setup', message: 'Provide seed for non-interactive 2FA setup' },
            { url: '/api/accounts/add', message: 'Missing required parameter: -n, --name' },
        ];
        for (let test of cases) {
            let { error } = await $promise.caught(TestUtils.api({ url: test.url, method: 'post', body: { local: true } }));
            notEq_(error, null);
            has_((error as any).content?.message ?? error.message, test.message);
        }
    },

    async 'account mutations require POST' () {
        let { error } = await $promise.caught(TestUtils.api('/api/accounts/add?local=true'));
        notEq_(error, null);
        has_((error as any).content?.message ?? error.message, 'endpoint not Found: <GET>');
    },
});
