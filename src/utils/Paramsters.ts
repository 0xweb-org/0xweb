import { $validate } from './$validate';

export const Parameters = {
    account (opts?: { required?: boolean }) {
        return {
            '-a, --account': {
                description: 'Account name. Accounts should be unlocked with gray<-p, --pin> parameter',
                required: opts?.required ?? true,
            }
        }
    },
    pin () {
        return {
            '-p, --pin': {
                description: 'Account configuration is encrypted with a derived key from the pin and the local machine key. ',
                required: true
            },
        }
    },
    chain () {
        return {
            '-c, --chain': {
                description: `Available chains: ${$validate.platforms().join(', ')}`,
                required: true,
                oneOf: $validate.platforms()
            }
        }
    }
}
