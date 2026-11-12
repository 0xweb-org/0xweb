import { TFnWithCallback } from '@dequanto/utils/types';

export namespace $cb {
    export function single<TResult, TArgs extends any[]>(ctx: any, fn: TFnWithCallback<TArgs, TResult>, ...args: TArgs): Promise<TResult> {
        return new Promise((resolve, reject) => {
            try {
                fn.call(ctx, ...args, (result: any) => {
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}
