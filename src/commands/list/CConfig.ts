import { ICommand } from '../ICommand';
import { File } from 'atma-io';
import { obj_setProperty } from 'atma-utils';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $promise } from '@dequanto/utils/$promise';
import { $os } from '@core/utils/$os';
import { $require } from '@dequanto/utils/$require';


export function CConfig() {
    return <ICommand>{

        command: 'config',

        description: [
            'View and edit web3 configuration'
        ],
        params: {
            '-v, --view': {
                description: 'Print current configuration. ',
            },
            '-e, --edit': {
                description: 'Open/create the configuration file in AppData or CWD folder to edit',
            },
            '--local': {
                description: 'Edit local config',
            },
            '--global': {
                description: 'Edit global config',
            },
            '--set': {
                description: 'Set configuration value',
                type:'string',
            }
        },

        async process(args: string[], params, app: App) {

            if (params.edit) {

                File.registerExtensions({
                    'yml': [
                        "atma-io-middleware-yml:read",
                        "atma-io-middleware-yml:write"
                    ]
                }, false);

                let source = app.config.$sources.array.find(x =>x.data.name === 'main');
                $require.notNull(source, `Main config source not found`);
                let path = source.data.path;


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

            if (params.set) {
                let json = {};
                let source = app.config.$sources.array.find(x =>x.data.name === 'main');
                $require.notNull(source, `Main config source not found`);
                let values = params.set.split(';');
                values.forEach(str => {
                    let [ key, value ] = str.split('=');
                    if (value === 'true') {
                        obj_setProperty(json, key, true);
                        return;
                    }
                    if (value === 'false') {
                        obj_setProperty(json, key, false);
                        return;
                    }
                    if (/^[\d\.]+$/.test(value)) {
                        obj_setProperty(json, key, Number(value));
                        return;
                    }
                    obj_setProperty(json, key, value);
                });
                $console.log(`Set the configuration at ${source.data.path} : ` + JSON.stringify(json, null, 2));

                await source.write(json, /*deepExtend*/ true);
                return;
            }

            if (true || params.view) {
                $console.log('Current configuration:');
                $console.result(getJson());
                return;
            }

            function getJson() {
                let json = app.config.toJSON();
                delete json.e;
                delete json.edit;
                delete json.v;
                delete json.view;
                return json;
            }
        }
    };
}
