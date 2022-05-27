import { class_Uri } from 'atma-utils';

export namespace $path {
    const __root = __dirname.replace(/[\\\/](lib|src).*$/, '');
    export function resolve(path: string) {
        return `file://` + class_Uri.combine(__root, path);
    }
}
