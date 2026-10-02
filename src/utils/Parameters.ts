import { $validate } from './$validate';

export const Parameters = {
    account (opts?: { required?: boolean }) {
        return {
            '-a, --account': {
                description: 'Account name. Use gray<-p, --pin> to unlock the account',
                required: opts?.required ?? true,
                fallback: 'session-account',
            }
        }
    },
    pin (opts?: { required?: boolean }) {
        return {
            '-p, --pin': {
                description: 'PIN for account storage encryption. The encryption key is derived from the PIN and the local machine key',
                required: opts?.required ?? true
            },
        }
    },
    chain (opts?: { required?: boolean }) {
        return {
            '-c, --chain': {
                description: `Available chains: ${$validate.platforms().join(', ')}`,
                required: opts?.required ?? true,
                oneOf: $validate.platforms()
            }
        }
    }
}
