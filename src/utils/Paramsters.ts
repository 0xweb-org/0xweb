import { $validate } from './$validate';

export const Parameters = {
    pin: {
        '-p, --pin': {
            description: 'Account configuration is encrypted with a derived key from the pin and local machine key. ',
            required: true
        },
    },
    chain: {
        '-c, --chain': {
            description: `Available chains: ${$validate.platforms.join(', ')}`,
            required: true,
            oneOf: $validate.platforms
        }
    }
}
