import { class_Uri } from 'atma-utils';

export namespace $path {
    const __root = __dirname.replace(/[\\\/](lib|src).*$/, '');
    export function resolve(path: string) {
        return class_Uri.combine('file://', __root, path);
    }
}
