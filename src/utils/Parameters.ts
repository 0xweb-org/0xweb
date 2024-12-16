import { $validate } from './$validate';

export const Parameters = {
    account (opts?: { required?: boolean }) {
        return {
            '-a, --account': {
                description: 'Account name. Accounts should be unlocked with gray<-p, --pin> parameter',
                required: opts?.required ?? true,
                fallback: 'session-account',
            }
        }
    },
    pin (opts?: { required?: boolean }) {
        return {
            '-p, --pin': {
                description: 'Accounts storage is encrypted with a derived key from the pin and the local machine key. ',
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
