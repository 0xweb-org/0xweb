import { $console } from '@core/utils/$console';
import { ChainAccountProvider } from '@dequanto/ChainAccountProvider';
import { ChainAccount, Erc4337Account, SafeAccount } from '@dequanto/models/TAccount';
import { $is } from '@dequanto/utils/$is';
import appcfg from 'appcfg';

export class AccountsService {
    constructor (public config: appcfg) {

    }

    async add (params: ChainAccount | SafeAccount | Erc4337Account) {
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

    async list (): Promise<(ChainAccount | SafeAccount | Erc4337Account)[]> {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }

    async get(name: string): Promise<(ChainAccount | SafeAccount | Erc4337Account)>
    async get(key: string): Promise<(ChainAccount | SafeAccount | Erc4337Account)>
    async get(mix: string): Promise<(ChainAccount | SafeAccount | Erc4337Account)> {
        if ($is.Hex(mix) && mix.length > 64) {
            return <ChainAccount> {
                address: ChainAccountProvider.getAddressFromKey(mix),
                key: mix
            };
        }
        let name = mix;
        let accounts = await this.list();
        let account = this.getAccount(name);
        if (account == null) {
            $console.log('Available accounts:');
            $console.log(accounts.map(x => x.name).join('\n'));
            throw new Error(`Account ${name} not found.`);
        }
        return account;
    }
    async create (name: string): Promise<ChainAccount> {
        let current = await this.getAccount(name);
        if (current != null) {
            $console.log(`Account green<bold<${name}>> already exists`);
            return null;
        }
        let account = await ChainAccountProvider.generate({ name, platform: 'eth' });
        await this.add(account);
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
    private async getAccount (name: string): Promise<ChainAccount | SafeAccount | Erc4337Account | null> {
        let accounts = await this.list();
        let account = accounts.find(x => x.name === name);
        return account;
    }
    private async save (accounts) {
        let source = this.getConfig();
        await source.write({ accounts }, false);
    }
}
