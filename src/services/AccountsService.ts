import { $console } from '@core/utils/$console';
import { ChainAccount } from '@dequanto/ChainAccounts';
import appcfg from 'appcfg';

export class AccountsService {
    constructor (public config: appcfg) {

    }

    async add (params: ChainAccount) {
        let accounts = this.getAccounts();
        if (accounts.find(x => x.name === params.name)) {
            console.warn(`Account ${params.name} already exists`);
        } else {
            accounts.push(params);
            await this.save(accounts);
        }
        return accounts;
    }

    async remove (name: string) {
        let accounts = this.getAccounts();
        let index = accounts.findIndex(x => x.name === name)
        if (index === -1) {
            console.warn(`Account ${name} not found`);
        } else {
            accounts.splice(index, 1);
            await this.save(accounts);
        }
        return accounts;
    }

    async list (): Promise<ChainAccount[]> {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }

    async get(name: string): Promise<ChainAccount> {
        let accounts = await this.list();
        let account = accounts.find(x => x.name === name);
        if (account == null) {
            $console.log('Available accounts:');
            $console.log(accounts.map(x => x.name).join('\n'));
            throw new Error(`Account ${name} not found.`);
        }
        return account;
    }


    private getAccounts () {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }
    private getConfig () {
        let source = this.config.$sources.array.find(x =>x.data.name === 'accounts');
        if (source == null) {
            throw new Error(`Configuration source for accounts not found`);
        }
        if (source.config == null) {
            source.config = {};
        }
        return source;
    }
    private async save (accounts) {
        let source = this.getConfig();
        await source.write({ accounts }, false);
    }
}
