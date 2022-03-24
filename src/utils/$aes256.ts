export interface IEncryptionParams {
    secret: string | Buffer
}

const CIPHER_ALGO = 'aes-256-ctr';

export namespace $aes256 {

    let crypto: typeof import('crypto');

    export function encrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto = crypto ?? require("crypto");

        if (buffer.length === 0) {
            return Buffer.from([]);
        }
        let key: Buffer;
        if (Buffer.isBuffer(secret)) {
            key = secret;
        } else if (typeof secret === 'string' && secret.length > 0) {
            // consider to use Rfc2898DeriveBytes
            key = crypto
                .createHash('sha256')
                .update(secret)
                .digest();
        } else {
            throw new TypeError('Secret must be a non-empty string or buffer');
        }

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(CIPHER_ALGO, key, iv);


        const ciphertext = cipher.update(buffer);
        const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]);
        return encrypted;
    }

    export function decrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto = crypto ?? require("crypto");

        if (buffer.length === 0) {
            return Buffer.from([]);
        }

        let key: Buffer;
        if (Buffer.isBuffer(secret)) {
            key = secret;
        } else if (typeof secret === 'string' && secret.length > 0) {
            // consider to use Rfc2898DeriveBytes
            key = crypto
                .createHash('sha256')
                .update(secret)
                .digest();
        } else {
            throw new TypeError('Secret must be a non-empty string or buffer');
        }


        if (Buffer.byteLength(buffer) < 17) {
            throw new Error('Provided "encrypted" must decrypt to a non-empty string or buffer');
        }

        const iv = buffer.slice(0, 16);
        const decipher = crypto.createDecipheriv(CIPHER_ALGO, key, iv);
        const cipherbuf = buffer.slice(16);
        const output = Buffer.concat([decipher.update(cipherbuf), decipher.final()]);
        return output;
    }


    export function delegateEncrypt (params: IEncryptionParams) {
        return function (content: Buffer): Buffer {
            return encrypt(content, params);
        };
    }
    export function delegateDecrypt (params: IEncryptionParams) {
        return function (content: Buffer): Buffer {
            return decrypt(content, params);
        };
    }
}
