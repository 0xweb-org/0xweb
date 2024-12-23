import { App } from '@core/app/App';
import { $logger } from '@dequanto/utils/$logger';

export class BaseService {
    public opts: { logger?: boolean } = {};

    constructor(public app: App) {
        this.opts.logger = app.config?.env !== 'api';
    }


    protected printLog (...args) {
        if (this.opts?.logger === false) {
            return;
        }
        $logger.log(...args);
    }
    /** @deprecated printLog instead */
    protected printResult (...args) {
        if (this.opts?.logger === false) {
            return;
        }
        $logger.result(...args);
    }
    protected printLogTable (...args: Parameters<typeof $logger.table>) {
        if (this.opts?.logger === false) {
            return;
        }
        $logger.table(...args);
    }
    protected printLogToast (str: string) {
        if (this.opts?.logger === false) {
            return;
        }
        $logger.toast(str);
    }
}
