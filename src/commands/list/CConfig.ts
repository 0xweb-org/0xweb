import { ICommand } from '../ICommand';
import { File } from 'atma-io';
import { obj_setProperty } from 'atma-utils';
import { Config } from '@dequanto/config/Config';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $promise } from '@dequanto/utils/$promise';
import { $os } from '@core/utils/$os';
import { $require } from '@dequanto/utils/$require';


export function CConfig() {
    return <ICommand>{

        command: 'config',

        description: [
            'View and edit web3 configuration. Choose exactly one operation. Credential fields are redacted from output.'
        ],
        params: {
            '-v, --view': {
                description: 'Show the current configuration',
                type: 'boolean',
            },
            '-e, --edit': {
                description: 'Open or create the configuration file in AppData or the current working directory',
                type: 'boolean',
            },
            '--local': {
                description: 'Edit the local configuration',
                type: 'boolean',
            },
            '--global': {
                description: 'Edit the global configuration',
                type: 'boolean',
            },
            '--set': {
                description: 'Set a configuration value, e.g. --set settings.target=cjs. Also accepts a JSON object',
                type:'string',
            },
            '--get': {
                description: 'Get a configuration value, e.g. --get settings.target',
                type:'string',
            },
        },

        async process(args: string[], params: { edit?: boolean, set?: string, get?: string, view?: boolean, local?: boolean, global?: boolean }, app: App) {

            let operations = [params.edit === true, params.view === true, params.get != null, params.set != null];
            $require.True(operations.filter(Boolean).length === 1, 'Choose exactly one of --edit, --view, --get, or --set');
            $require.True(!(params.local && params.global), 'Choose either --local or --global');

            if (params.edit) {
                $require.True(app.config?.env !== 'api', 'Opening a configuration editor is only supported in the CLI');

                File.registerExtensions({
                    'yml': [
                        "atma-io-middleware-yml:read",
                        "atma-io-middleware-yml:write"
                    ]
                }, false);

                let source = app.config.$sources.array.find(x => x.data?.name === 'main');
                source = $require.notNull(source, `Main config source not found`);
                let data = $require.notNull(source.data, `Main config source data not found`);
                if (!('path' in data) || typeof data.path !== 'string') {
                    throw new Error(`Main config source has no file path`);
                }
                let path = data.path;


                if (await File.existsAsync(path) === false) {
                    let json = {};
                    $console.log(`Create bold<${path}>`);
                    await File.writeAsync(path, json);
                }
                let sysPath = new File(path).uri.toLocalFile();
                let github = `https://github.com/0xweb-org/dequanto/blob/master/configs/dequanto.yml`;
                $console.log(`Defaults yellow<bold<file://${github}>>`);
                $console.log(`Open cyan<bold<file://${sysPath}>>`);
                await $os.open(sysPath);
                await $promise.wait(500);
                return;
            }

            if (params.set != null) {
                let json = {};
                let source = app.config.$sources.array.find(x => x.data?.name === 'main');
                source = $require.notNull(source, `Main config source not found`);
                let data = $require.notNull(source.data, `Main config source data not found`);
                if (!('path' in data) || typeof data.path !== 'string') {
                    throw new Error(`Main config source has no file path`);
                }
                json = parseValues(params.set);

                if (source.write == null) {
                    throw new Error(`Main config source is not writable`);
                }
                await source.write(json, /*deepExtend*/ true);
                Config.clean();
                let values = redact(json);
                $console.log(`Set the configuration at ${data.path} : ` + JSON.stringify(values, null, 2));
                return { path: data.path, values };
            }

            if (params.get != null) {
                let json = getJson();
                if (params.get?.length > 0) {
                    let parts = validatePath(params.get.trim());
                    for (let key of parts) {
                        json = json != null && typeof json === 'object' && Object.hasOwn(json, key) ? json[key] : undefined;
                    }
                }
                $console.result(json);
                return json ?? null;
            }
            if (params.view) {
                $console.log('Current configuration:');
                let json = getJson();
                $console.result(json);
                return json;
            }

            function getJson() {
                let json = app.config.toJSON();
                delete json.e;
                delete json.edit;
                delete json.v;
                delete json.view;
                return redact(json);
            }
        }
    };
}

const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype']);
const secretKeys = new Set([
    'accounts', 'pin', 'totp', '2fa', 'key', 'privatekey', 'secret', 'clientsecret',
    'password', 'passphrase', 'mnemonic', 'seed', 'apikey', 'token', 'accesstoken',
    'refreshtoken', 'authorization', 'cookie', 'credentials', 'secrets', 'headers',
]);

function validatePath(path: string): string[] {
    let parts = path.split('.');
    $require.True(parts.every(key => key.length > 0 && key === key.trim() && !forbiddenKeys.has(key)), 'Invalid configuration path');
    return parts;
}

function validateObject(value: unknown) {
    if (typeof value === 'number') {
        $require.True(Number.isFinite(value) && (!Number.isInteger(value) || Number.isSafeInteger(value)), 'Unsafe configuration number: encode large integers as strings');
    }
    if (value == null || typeof value !== 'object') return;
    for (let key of Object.keys(value)) {
        validatePath(key);
        validateObject(value[key]);
    }
}

function parseValues(input: string): Record<string, unknown> {
    let str = input.trim();
    $require.True(str.length > 0, 'Configuration assignment must not be empty');
    if (/^[\[\{]/.test(str)) {
        let json: unknown;
        try {
            json = JSON.parse(str);
        } catch {
            throw new Error('Invalid configuration JSON');
        }
        $require.True(json != null && typeof json === 'object' && !Array.isArray(json), 'Configuration must be a JSON object');
        validateObject(json);
        return json as Record<string, unknown>;
    }
    let json = {};
    let assignments = str.split(';');
    for (let assignment of assignments) {
        let separator = assignment.indexOf('=');
        $require.True(separator > 0, 'Expected a configuration assignment: key=value');
        let key = assignment.slice(0, separator).trim();
        validatePath(key);
        let raw = assignment.slice(separator + 1).trim();
        let value: unknown = raw;
        if (raw === 'true' || raw === 'false') {
            value = raw === 'true';
        } else if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) {
            let number = Number(raw);
            $require.True(Number.isFinite(number), 'Configuration number must be finite');
            value = Number.isInteger(number) && !Number.isSafeInteger(number) ? raw : number;
        }
        obj_setProperty(json, key, value);
    }
    return json;
}

/** Redact recognized credential fields before selecting paths or logging results. */
function redact(value: any): any {
    if (Array.isArray(value)) return value.map(redact);
    if (value == null || typeof value !== 'object') return value;
    let result = Object.create(null);
    for (let key of Object.keys(value)) {
        if (forbiddenKeys.has(key)) continue;
        let sensitive = key.split('.').some(part => secretKeys.has(part.replace(/[-_]/g, '').toLowerCase()));
        result[key] = sensitive ? '[REDACTED]' : redact(value[key]);
    }
    return result;
}
