import { $promise } from '@dequanto/utils/$promise';


export namespace $os {
    export async function open(filePath: string) {
        const { exec } = require('child_process');
        let command = (function () {
            switch (process.platform) {
                case 'darwin': {
                    return 'open ' + filePath + ' && lsof -p $! +r 1 &>/dev/null';
                }
                case 'win32': {
                    return 'start /wait ' + filePath;
                }
                default: {
                    return 'xdg-open ' + filePath + ' && tail --pid=$! -f /dev/null';
                }
            }
        })();

        return $promise.fromCallback(exec, command);
    }
}
