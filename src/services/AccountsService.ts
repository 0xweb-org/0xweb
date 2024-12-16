import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { EoAccount, Erc4337Account, SafeAccount } from '@dequanto/models/TAccount';
import { $buffer } from '@dequanto/utils/$buffer';
import { $crypto } from '@dequanto/utils/$crypto';
import { $is } from '@dequanto/utils/$is';
import { $machine } from '@dequanto/utils/$machine';
import { $require } from '@dequanto/utils/$require';
import { $sig } from '@dequanto/utils/$sig';
import type appcfg from 'appcfg';
import { env, File } from 'atma-io';

export class AccountsService {
    constructor (public config: appcfg) {

    }
    static DEFAULTS_PATH_LOCAL = `./0xc/config/accounts.json`;
    static DEFAULTS_PATH_GLOBAL = `%APPDATA%/.dequanto/account.json`;

    static async getDefaults (params: Record<string, string>) {
        let isLocal = $cli.isLocal(params);
        let p = $cli.getParamValue('--pin, -p', params);
        if (p == null) {
            return null;
        }
        let path = AccountsService.getDefaultsDir({ isLocal });
        if (await File.existsAsync(path) === false) {
            return null;
        }
        let cipher = await File.readAsync<string> (path, {
            skipHooks: true,
            encoding: 'utf8'
        });
        let secret = await $machine.id();
        let buffer = await $buffer.fromHex(cipher);
        let json = await $crypto.decrypt(buffer, { secret, encoding: 'utf8' });
        return JSON.parse(json);
    }

    static async saveAsDefaults (accountName: string, params: Record<string, string>, config: appcfg) {
        $require.notNull(accountName, `At least account name is required`);
        let isLocal = $cli.isLocal(params);
        let account = {
            'config-accounts': $cli.getParamValue('config-accounts', params) || void 0,
            'account': accountName
        } as {
            account: string
            'config-accounts': string
        };
        let path = AccountsService.getDefaultsDir({ isLocal });
        let secret = await $machine.id();
        let cipher = await $crypto.encrypt(JSON.stringify(account), { secret, encoding: 'hex' });
        await File.writeAsync(path, cipher, { skipHooks: true });
    }

    static getDefaultsDir (opts: { isLocal: boolean }) {
        if (opts.isLocal) {
            return AccountsService.DEFAULTS_PATH_LOCAL;
        }
        return AccountsService.DEFAULTS_PATH_GLOBAL.replace('%APPDATA%', env.appdataDir)
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
