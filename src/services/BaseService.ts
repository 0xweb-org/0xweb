import { App } from '@core/app/App';
import { $console } from '@core/utils/$console';
import { $logger } from '@dequanto/utils/$logger';

export class BaseService {
    public opts: { logger?: boolean } = {};

    constructor(public app: App) {
        this.opts.logger = app.config?.env !== 'api';
    }


    protected printLog (...args: Parameters<typeof $logger.log>) {
        if (this.opts?.logger === false) {
            return;
        }
        $console.log(...args as any[]);
    }
    /** @deprecated printLog instead */
    protected printResult (...args: Parameters<typeof $logger.result>) {
        if (this.opts?.logger === false) {
            return;
        }
        $logger.result(...args);
    }
    protected printLogTable (...args: Parameters<typeof $logger.table>) {
        if (this.opts?.logger === false) {
            return;
        }
        $console.table(...args);
    }
    protected printLogToast (str: string) {
        if (this.opts?.logger === false) {
            return;
        }
        $console.toast(str);
    }
}
