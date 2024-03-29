import { ICommand } from '../ICommand';
import { env, File } from 'atma-io';
import { class_Uri } from 'atma-utils';
import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $promise } from '@dequanto/utils/$promise';
import { $os } from '@core/utils/$os';


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
                description: 'Open/create the configuration file in AppData to edit',
            }
        },

        async process(args: string[], params, app: App) {

            if (params.edit) {

                File.registerExtensions({
                    'yml': [
                        "atma-io-middleware-yml:read",
                        "atma-io-middleware-yml:write"
                    ]
                }, false)

                let path = env.appdataDir.combine('.dequanto/config.yml').toString();
                if (await File.existsAsync(path) === false) {
                    let json = getJson();
                    $console.log(`Create bold<${path}>`);
                    await File.writeAsync(path, json);
                }
                let sysPath = new class_Uri(path).toLocalFile();
                $console.log(`Open cyan<bold<file://${sysPath}>>`);
                await $os.open(sysPath);
                await $promise.wait(500);
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
