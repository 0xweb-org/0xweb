import di from 'a-di';
import alot from 'alot';
import { ICommand } from '../ICommand';
import { AccountsService } from '@core/services/AccountsService';
import { $address } from '@dequanto/utils/$address';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { Parameters } from '@core/utils/Parameters';
import { $sig, KeyUtils } from '@dequanto/utils/$sig';
import { $require } from '@dequanto/utils/$require';
import { EoAccount } from '@dequanto/models/TAccount';
import { $hex } from '@dequanto/utils/$hex';
import { File } from 'atma-io';
import { $crypto } from '@dequanto/utils/$crypto';
import { TEth } from '@dequanto/models/TEth';

type TAccount = Partial<TEth.EoAccount>
    & Partial<TEth.SafeAccount>
    & Partial<TEth.ZodiacAccount>
;

export function CAccounts() {
    return <ICommand>{
        command: 'accounts',

        description: [
            'Manage accounts'
        ],
        subcommands: [
            {
                command: 'add',
                description: [
                    'Add an existing account'
                ],
                params: {
                    '--json': {
                        description: 'Print the updated account list and public metadata as JSON',
                    },
                    '-k, --key': {
                        description: 'Private key (plain or encrypted). Optional for reads; required for writes',
                    },
                    '-a, --address': {
                        description: 'Account address. Optional if a private key is provided',
                    },
                    '-n, --name': {
                        description: 'Name of the account',
                        required: true,
                    },
                    '-t, --type': {
                        description: 'Type of the account',
                        oneOf: ['eoa', 'safe', 'timelock', 'erc4337', 'zodiac'],
                        default: 'eoa'
                    },
                    '--login': {
                        description: 'Set the account as the default',
                        type: 'boolean',
                        default: false,
                    },
                    '--operator': {
                        description: 'NameOrAddress of the operator account. Required for non-EOA accounts'
                    },
                    '--role-key': {
                        description: 'For Zodiac account roleKey. Required for Zodiac account'
                    }
                },
                async process(args: string[], params: any, app: App) {
                    let service = di.resolve(AccountsService, app.config, params);
                    let { key, address, name } = params;
                    $require.True(!key || (params.type ?? 'eoa') === 'eoa', '--key is only supported for EOA accounts');
                    if (address != null) {
                        address = $address.toChecksum($require.Address(address, 'Provide a valid account address'));
                    }
                    if (key == null && address == null) {
                        throw new Error(`Provide key("-k 0xabcd") or address ("-a 0x1234")`)
                    }
                    if (key) {
                        let addr = await $sig.$account.getAddressFromKey(key);
                        if (address != null && $address.eq(addr, address) === false) {
                            throw new Error(`Provided key resolves to ${addr} address, but ${address} was provided.`);
                        }
                        address = addr;
                    }

                    const account = {
                        name,
                        address: $address.toChecksum($require.Address(address)),
                        type: params.type ?? 'eoa'
                    } as TAccount;

                    if (key) {
                        const secret = app.config.$get('pin') as string ?? params.pin;
                        $require.notEmpty(secret, `Secret not resolved`);
                        const encryptedKey = /^p\d:/.test(key)
                            ? key
                            : await $sig.$key.encrypt(key, secret);
                        // will store only encrypted key
                        account.key = encryptedKey;
                    }
                    if (account.type !== 'eoa') {
                        const operator = $require.notEmpty(params.operator, `Operator is required`);
                        const operatorAcc = (await service.list()).find(x => x.name === operator || $address.eq(x.address, operator));
                        $require.notNull(operatorAcc, `Operator not found, please add the account before`);
                        account.operator = operator;
                    }
                    if (account.type === 'zodiac') {
                        const roleKey = $require.notNull(params.roleKey, `RoleKey is required for Zodiac`);
                        account.roleKey = roleKey;
                    }

                    let accounts = await service.add(account);
                    if (params.login) {
                        await AccountsService.saveLogin(
                            $require.notNull(account.name, `Account name is missing`),
                            params
                        );
                    }

                    $console.result(formatAccounts(accounts));

                    return accounts.map(toAccountJson);
                }
            },
            {
                command: 'remove',
                description: [
                    'Remove an account'
                ],
                params: {
                    '--json': {
                        description: 'Print the remaining account list and public metadata as JSON',
                    },
                    '-n, --name': {
                        description: 'Name of the account to remove',
                        required: true,
                    },
                },
                async process(args: string[], params: any, app: App) {
                    let { name } = params;
                    let service = di.resolve(AccountsService, app.config, params);
                    let accounts: Awaited<ReturnType<AccountsService['list']>> = await service.remove(name);

                    $console.result(formatAccounts(accounts));
                    return accounts.map(toAccountJson);
                }
            },
            {
                command: 'list',
                description: [
                    'List account names'
                ],
                params: {
                    '--json': {
                        description: 'Print account names, addresses, types, operators, and role keys as JSON',
                    },
                },
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config, params);
                    let accounts = await service.list();
                    $console.result(formatAccounts(accounts));
                    return accounts.map(toAccountJson);
                }
            },
            {
                command: 'new',
                description: [
                    'Create a new account'
                ],
                params: {
                    '--json': {
                        description: 'Print the created account public metadata as JSON, excluding its private key',
                    },
                    '-n, --name': {
                        description: 'Name of the account to create',
                        required: true,
                    },
                    '--login': {
                        description: 'Set the account as the default',
                        type: 'boolean',
                        default: false,
                    }
                },
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config, params);
                    let account = await service.create(params.name);
                    if (params.login) {
                        await AccountsService.saveLogin($require.notNull(account.name, `Account name is missing`), params);
                    }
                    $console.log(`yellow<You must backup the key bold<!!!>>`)
                    $console.table([
                        ['Name', account.name ?? ''],
                        ['Address', account.address ?? ''],
                        ['Key', account.key ?? ''],
                    ]);
                    return toAccountJson(account);
                }
            },
            {
                command: 'login',
                description: [
                    'Set the account as the default'
                ],
                arguments: [
                    {
                        name: 'Account',
                        description: 'Name of the account to set as default',
                        required: true
                    }
                ],
                params: {
                    '--json': {
                        description: 'Print the selected default account public metadata as JSON',
                    },
                },
                async process(args: string[], params, app: App) {
                    let [ name ] = args;
                    let service = di.resolve(AccountsService, app.config, params);
                    let account = await service.get(name);
                    $require.notNull(account, `${name} not found`)

                    await AccountsService.saveLogin($require.notNull(account.name, `Account name is missing`), params);
                    $console.table([
                        ['Name', account.name ?? ''],
                        ['Address', account.address ?? ''],
                    ]);
                    return toAccountJson(account);
                }
            },
            {
                command: 'backup',
                arguments: [
                    {
                        name: 'Path',
                        description: 'Output file for the encrypted account backup',
                        required: true
                    }
                ],
                params: {
                    '--json': {
                        description: 'Print the backup path and account count as JSON',
                    },
                    '-s, --secret': {
                        description: 'Strong password to encrypt the backup',
                        required: true,
                        validate (val) {
                            val = val.trim();
                            $require.gt(val.length, 6, `Min secret length is 6 characters`);
                        }
                    }
                },
                description: [
                    'Back up accounts to an encrypted file. Uses AES-GCM with sha256(secret) as the key and a prefixed 16-byte IV',
                    'The decrypted payload is { version: 1, accounts: [...] }, preserving public metadata and private keys when available'
                ],
                async process(args: string[], params, app: App) {
                    let service = di.resolve(AccountsService, app.config, params);
                    let accounts = await service.list();
                    $require.True(accounts.length > 0, 'No accounts to back up');
                    let [ path ] = args;
                    $require.True(await File.existsAsync(path) === false, `File ${path} already exists`);

                    let entries = await alot(accounts).mapAsync(async account => {
                        let metadata = toAccountJson(account);
                        if (account.key == null) {
                            return metadata;
                        }
                        return await KeyUtils.withKey(account as EoAccount, decrypted => ({
                            ...metadata,
                            key: $require.notNull(decrypted.key, `Account ${account.name} has no private key`),
                        }));
                    }).toArrayAsync({ threads: 1 });

                    let str = JSON.stringify({ version: 1, accounts: entries });
                    let encrypted = await $crypto.encrypt(str, {
                        secret:  params.secret
                    });
                    let hex = $hex.ensure(encrypted);

                    await File.writeAsync(path, hex, { skipHooks: true });
                    $console.result(`Backed up ${accounts.length} accounts to ${path}`);
                    return { path, count: accounts.length };
                }
            },
        ],
        params: {
            ...Parameters.pin(),
        },

        async process(args: string[], params, app: App) {
            throw new Error(`Unknown accounts subcommand: ${args[0] ?? '(missing)'}. Call "0xweb accounts --help" to view the list of commands`);
        }
    }
}



function formatAccounts(accounts: TAccount[]): string {
    if (accounts.length === 0) {
        return 'No accounts added. Use "0xweb accounts add --help" to get started.';
    }

    let entries = accounts.map(account => {
        let type = account.type && account.type !== 'eoa' ? ` (${account.type})` : '';
        let entry = `  ${account.name ?? 'Unnamed account'}${type}\n    ${account.address ?? 'No address'}`;
        if (type) {
            let operator = typeof account.operator === 'string'
                ? account.operator
                : account.operator?.name ?? account.operator?.address;
            entry += `\n    Operator: ${operator ?? 'Not configured'}`;
        }
        return entry;
    });
    return `Accounts:\n\n${entries.join('\n\n')}`;
}

function toAccountJson(account: TAccount) {
    let operator = typeof account.operator === 'string'
        ? account.operator
        : account.operator?.name ?? account.operator?.address;
    return {
        name: account.name,
        address: account.address,
        type: account.type ?? 'eoa',
        ...(operator != null ? { operator } : {}),
        ...(account.roleKey != null ? { roleKey: account.roleKey } : {}),
    };
}
