import { $cli } from '@core/utils/$cli';
import { $console } from '@core/utils/$console';
import { EoAccount, Erc4337Account, SafeAccount } from '@dequanto/models/TAccount';
import { TEth } from '@dequanto/models/TEth';
import { $buffer } from '@dequanto/utils/$buffer';
import { $crypto } from '@dequanto/utils/$crypto';
import { $is } from '@dequanto/utils/$is';
import { $machine } from '@dequanto/utils/$machine';
import { $require } from '@dequanto/utils/$require';
import { $sig } from '@dequanto/utils/$sig';
import type appcfg from 'appcfg';
import { env, File } from 'atma-io';
import { TotpService } from './TotpService';
import { $address } from '@dequanto/utils/$address';


export class AccountsService {
    constructor (public config: appcfg, private params: Record<string, string>) {

    }
    static DEFAULTS_PATH_LOCAL = `./0xc/config/account.json`;
    static DEFAULTS_PATH_GLOBAL = `%APPDATA%/.dequanto/account.json`;

    static async getSession (params: Record<string, string>, isSafe?: boolean) {
        let isLocal = $cli.isLocal(params);
        let storage = new SessionStorage({ isLocal });
        return storage.load({
            pin: $cli.getParamValue('--pin, -p', params),
            totp: $cli.getParamValue('--totp, --2fa', params),
        }, isSafe);
    }

    static async saveSession (session: IAccountSession, params: Record<string, string>) {
        let isLocal = $cli.isLocal(params);
        let storage = new SessionStorage({ isLocal });
        return storage.save(session);
    }

    static async status2FA (params: Record<string, string> = {}): Promise<{ enabled: boolean, account: string }> {
        let storage = new SessionStorage({ isLocal: $cli.isLocal(params) });
        let session = await storage.read();
        return {
            enabled: session?.totp?.seed != null && session?.pin != null,
            account: session?.['session-account'] ?? '',
        };
    }

    static async save2FA (seed: TEth.Hex, params: Record<string, string>) {
        let totpService = new TotpService();
        let session = await AccountsService.getSessionFor2FAChange(params);
        let { totpWindowIndex } = await totpService.generateTotpCode(seed);
        session.pin = $cli.getParamValue('--pin, -p', params) ?? session.pin;
        session.totp = {
            seed,
            index: totpWindowIndex
        };
        await AccountsService.saveSession(session, params);
    }

    static async disable2FA (params: Record<string, string>) {
        let session = await AccountsService.getSessionFor2FAChange(params);
        delete session.totp;
        delete session.pin;
        await AccountsService.saveSession(session, params);
    }

    private static async getSessionFor2FAChange (params: Record<string, string>): Promise<IAccountSession> {
        // Read the persisted seed even when explicit credentials bypass normal session loading.
        let storage = new SessionStorage({ isLocal: $cli.isLocal(params) });
        let session = await storage.read() ?? {};
        if (session.totp?.seed != null) {
            let code = $cli.getParamValue('--totp, --2fa', params);
            $require.notNull(code, 'Provide a valid code from the existing authenticator to change 2FA');
            let validation = await new TotpService().validateTotp(session.totp.seed, code!);
            $require.True(validation.valid, 'Invalid 2FA code');
            $require.Number(session.totp.index, 'The previously accepted TOTP window index is required');
            $require.gte(validation.totpWindowIndex, session.totp.index, 'The TOTP window index is older than the previously accepted window');
        }
        return session;
    }

    static async saveLogin (accountName: string, params: Record<string, string>) {
        $require.notNull(accountName, `An account name is required`);
        let session = await AccountsService.getSession(params, true) ?? {} as IAccountSession;

        session['config-accounts'] = $cli.getParamValue('config-accounts', params) || void 0;
        session['session-account'] = accountName;
        await AccountsService.saveSession(session, params);
    }

    static getDefaultsDir (opts: { isLocal: boolean }) {
        if (opts.isLocal) {
            return AccountsService.DEFAULTS_PATH_LOCAL;
        }
        return AccountsService.DEFAULTS_PATH_GLOBAL.replace('%APPDATA%', env.appdataDir);
    }

    async add (params: EoAccount | SafeAccount | Erc4337Account) {
        let accounts = this.getAccounts();
        if (accounts.find(account => account.name === params.name)) {
            console.warn(`Account ${params.name} already exists`);
        } else {
            accounts.push(params);
            await this.save(accounts);
        }
        return accounts;
    }

    async remove (name: string) {
        let accounts = this.getAccounts();
        let accountIndex = accounts.findIndex(account => account.name === name);
        if (accountIndex === -1) {
            console.warn(`Account ${name} not found`);
        } else {
            accounts.splice(accountIndex, 1);
            await this.save(accounts);
        }
        return accounts;
    }

    async list (): Promise<(EoAccount | SafeAccount | Erc4337Account)[]> {
        let configSource = this.getConfig();
        let accounts = configSource.config?.accounts ?? [];
        return accounts;
    }

    async get(name: string): Promise<(EoAccount | SafeAccount | Erc4337Account)>
    async get(key: string): Promise<(EoAccount | SafeAccount | Erc4337Account)>
    async get(address: TEth.Address): Promise<(EoAccount | SafeAccount | Erc4337Account)>
    async get(nameOrKeyOrAddress: string): Promise<(EoAccount | SafeAccount | Erc4337Account)> {
        if ($is.Hex(nameOrKeyOrAddress) && nameOrKeyOrAddress.length > 64) {
            return <EoAccount> {
                address: await $sig.$account.getAddressFromKey(nameOrKeyOrAddress),
                key: nameOrKeyOrAddress
            };
        }
        let mix = nameOrKeyOrAddress;
        let accounts = await this.list();
        let account = await this.getAccount(mix);
        if (account == null) {
            $console.log('Available accounts:');
            $console.log(accounts.map(account => account.name).join('\n'));
            throw new Error(`Account ${mix} not found.`);
        }
        return account;
    }
    async create (name: string): Promise<EoAccount | null> {
        let existingAccount = await this.getAccount(name);
        if (existingAccount != null) {
            $console.log(`Account green<bold<${name}>> already exists`);
            return null;
        }
        let account = $sig.$account.generate({ name, platform: 'eth' });
        await this.add(account);
        return account;
    }


    private getAccounts (): (EoAccount | SafeAccount | Erc4337Account)[] {
        let configSource = this.getConfig();
        let accounts = configSource.config?.accounts ?? [];
        return accounts;
    }
    private getConfig () {
        let configSource = this.config.$sources.array.find(source => source.data?.name === 'accounts');
        if (configSource == null) {
            throw new Error(`Configuration source for accounts not found`);
        }
        if (configSource.config == null) {
            configSource.config = {};
        }
        return configSource;
    }
    private async getAccount (nameOrAddress: string | TEth.Address): Promise<EoAccount | SafeAccount | Erc4337Account | undefined> {
        let accounts = await this.list();
        let account = accounts.find(account =>
            account.name === nameOrAddress || $address.eq(account.address!, nameOrAddress)
        );
        return account;
    }
    private async save (accounts: (EoAccount | SafeAccount | Erc4337Account)[]) {
        let configSource = this.getConfig();
        if (configSource.write == null) {
            throw new Error(`Configuration source for accounts is not writable`);
        }
        await configSource.write({ accounts }, false);
    }
}


interface IAccountSession {
    'config-accounts'?: string | null
    'session-account'?: string | null

    pin?: string | null
    totp?: {
        seed: TEth.Hex
        /** Last accepted 30-second TOTP window index. */
        index: number
    }
}

class SessionStorage {
    constructor (private opts: { isLocal: boolean }) {

    }
    async save (session: IAccountSession) {
        let sessionPath = this.getSessionPath();
        let machineSecret = await $machine.id();
        let encryptedSession = await $crypto.encrypt(JSON.stringify(session), { secret: machineSecret, encoding: 'hex' });
        await File.writeAsync(sessionPath, encryptedSession, { skipHooks: true });
    }

    /** Loads the stored session when no explicit credentials are supplied.
     * A stored PIN is removed unless the session's TOTP check succeeds.
     * After validation, the accepted TOTP window index is persisted.
     */
    async load (params: { pin?: string | null, totp?: string | null }, isSafe: boolean) {
        let hasPin = params.pin != null;
        let session = await this.read();
        if (session == null) {
            return null;
        }
        if (hasPin) {
            if (!isSafe) {
                delete session.pin;
            }
            return session;
        }
        let code = params.totp!;
        let totp = session.totp;
        if (totp?.seed == null || code == null) {
            if (!isSafe) {
                // Do not expose the stored PIN when 2FA is not configured.
                delete session.pin;
            }
            return session;
        }

        let totpService = new TotpService();
        let validation = await totpService.validateTotp(totp.seed, code);
        if (!validation.valid) {
            throw new Error(`Invalid 2FA code: ${code}`);
        }
        $require.Number(totp.index, `The previously accepted TOTP window index is required`);
        if (totp.index === validation.totpWindowIndex) {
            // Reuse within the previously accepted window does not update storage.
            return session;
        }

        $require.gte(validation.totpWindowIndex, totp.index, `The TOTP window index is older than the previously accepted window`);
        session.totp!.index = validation.totpWindowIndex!;
        await this.save(session);
        return session;
    }

    /** Reads persisted data without authenticating; callers must authorize access before using it. */
    async read (): Promise<IAccountSession | null> {
        let sessionPath = this.getSessionPath();
        if (await File.existsAsync(sessionPath) === false) {
            return null;
        }
        let encryptedSession = await File.readAsync<string>(sessionPath, {
            skipHooks: true,
            encoding: 'utf8'
        });
        let machineSecret = await $machine.id();
        let serializedSession = await $crypto.decrypt($buffer.fromHex(encryptedSession), {
            secret: machineSecret, encoding: 'utf8'
        });
        return JSON.parse(serializedSession) as IAccountSession;
    }

    private getSessionPath () {
        if (this.opts.isLocal) {
            return AccountsService.DEFAULTS_PATH_LOCAL;
        }
        return AccountsService.DEFAULTS_PATH_GLOBAL.replace('%APPDATA%', env.appdataDir);
    }
}
