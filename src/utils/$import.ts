import { File } from 'atma-io';
import memd from 'memd';
import { include } from 'includejs';

declare let global;

export function $import(path: string) {
    Initializer.init();

    return new Promise(resolve => {
        include
        .instance()
        .js(path.replace('.ts', '') + '::Module')
        .done(resp => {
            resolve(resp.Module)
        });
    });
}

class Initializer {
    @memd.deco.memoize()
    static init () {

        global.app.config['settings'] = {};
        global.app.config['settings']['atma-loader-ts'] = {
            "typescript": {
                "compilerOptions": {
                    "module": "AMD",
                    "sourceMap": false,
                    "experimentalDecorators": true,
                    "esModuleInterop": true,
                    "allowSyntheticDefaultImports": true,
                    "target": "ES2020"
                }
            }
        };
        File.Middleware.register('ts', 'read', 'atma-loader-ts');

        include.cfg({
            amd: true,
            extentionDefault: {
                js: "ts"
            },
            routes: {
                "@core": "src/{0}",
                "@dequanto": "dequanto/src/{0}",
                "@dequanto-contracts": "dequanto/src/prebuilt/{0}"
            }
        });

    }
}
