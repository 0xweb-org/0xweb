import { $console } from '@core/utils/$console';
import { EoAccount, Erc4337Account, SafeAccount } from '@dequanto/models/TAccount';
import { $buffer } from '@dequanto/utils/$buffer';
import { $cli } from '@dequanto/utils/$cli';
import { $crypto } from '@dequanto/utils/$crypto';
import { $is } from '@dequanto/utils/$is';
import { $machine } from '@dequanto/utils/$machine';
import { $require } from '@dequanto/utils/$require';
import { $sig } from '@dequanto/utils/$sig';
import type appcfg from 'appcfg';
import { File } from 'atma-io';

export class AccountsService {
    constructor (public config: appcfg) {

    }
    static DEFAULTS_PATH = `./0xc/config/account.json`;

    static async getDefaults () {
        if (await File.existsAsync(AccountsService.DEFAULTS_PATH) === false) {
            return null;
        }
        const cipher = await File.readAsync<string> (AccountsService.DEFAULTS_PATH, {
            skipHooks: true,
            encoding: 'utf8'
        });
        const secret = await $machine.id();
        const buffer = await $buffer.fromHex(cipher);
        const json = await $crypto.decrypt(buffer, { secret, encoding: 'utf8' });
        return JSON.parse(json);
    }

    static async saveAsDefaults (accountName: string, params: Record<string, string>, config: appcfg) {
        $require.notNull(accountName, `At least account name is required`);
        const account = {
            configAccounts: $cli.getParamValue('config-accounts', params) ?? void 0,
            account: accountName
        } as {
            account: string
            configAccounts: string
        }
        const secret = await $machine.id();
        const cipher = await $crypto.encrypt(JSON.stringify(account), { secret, encoding: 'hex' });
        await File.writeAsync(AccountsService.DEFAULTS_PATH, cipher, { skipHooks: true });
    }

    async add (params: EoAccount | SafeAccount | Erc4337Account) {
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

    async list (): Promise<(EoAccount | SafeAccount | Erc4337Account)[]> {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }

    async get(name: string): Promise<(EoAccount | SafeAccount | Erc4337Account)>
    async get(key: string): Promise<(EoAccount | SafeAccount | Erc4337Account)>
    async get(mix: string): Promise<(EoAccount | SafeAccount | Erc4337Account)> {
        if ($is.Hex(mix) && mix.length > 64) {
            return <EoAccount> {
                address: await $sig.$account.getAddressFromKey(mix),
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
    async create (name: string): Promise<EoAccount> {
        let current = await this.getAccount(name);
        if (current != null) {
            $console.log(`Account green<bold<${name}>> already exists`);
            return null;
        }
        let account = $sig.$account.generate({ name, platform: 'eth' });
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
    private async getAccount (name: string): Promise<EoAccount | SafeAccount | Erc4337Account | null> {
        let accounts = await this.list();
        let account = accounts.find(x => x.name === name);
        return account;
    }
    private async save (accounts) {
        let source = this.getConfig();
        await source.write({ accounts }, false);
    }
}
