import { $console } from '@core/utils/$console';
import { File, env } from 'atma-io';
import { ICommand } from '../ICommand';

export const CVersion: ICommand = {
    command: '-v, --version',
    description: [
        'Show package version'
    ],
    async process () {
        let path = env.applicationDir.combine(`/package.json`).toString();
        let json = await File.readAsync<any>( path);
        $console.log(`${json.name}@${json.version}`);
    }
}
