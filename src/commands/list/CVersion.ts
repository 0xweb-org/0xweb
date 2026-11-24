import { $console } from '@core/utils/$console';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';

export const CVersion: ICommand = {
    command: '-v, --version',
    description: [
        'Show the package version'
    ],
    params: {
        '--json': { description: 'Print the package name and version as JSON' },
    },
    api: { method: 'get' },
    mcp: false,
    async process (args, params, app) {
        let path = env.applicationDir.combine(`/package.json`).toString();
        let json = await File.readAsync<any>( path);
        const result = { name: json.name, version: json.version };
        if (!$console.isJsonOnly() && app?.config?.env !== 'api') {
            $console.log(`${result.name}@${result.version}`);
        }
        return result;
    }
}
