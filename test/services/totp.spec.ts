import { UTest } from 'atma-utest';
import { TotpService } from '@core/services/TotpService';
import { $buffer } from '@dequanto/utils/$buffer';
import { $promise } from '@dequanto/utils/$promise';
import { TEth } from '@dequanto/models/TEth';

UTest.create({
    async 'generates codes at window boundaries and rejects invalid inputs' () {
        let service = new TotpService();
        let seed = $buffer.toHex(new TextEncoder().encode('12345678901234567890'));
        let result = await service.generateTotpCode(seed, 0);
        eq_(result.code, '755224');
        result = await service.generateTotpCode(seed, 29_999);
        eq_(result.code, '755224');
        result = await service.generateTotpCode(seed, 30_000);
        eq_(result.code, '287082');
        for (let time of [-1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
            let { error } = await $promise.caught(service.generateTotpCode(seed, time));
            notEq_(error, null);
        }
        for (let invalid of ['0x', '0x1', '0xgg']) {
            let { error } = await $promise.caught(service.generateTotpCode(invalid as TEth.Hex, 0));
            notEq_(error, null);
        }
    },

    async 'creates authenticator enrollment links' () {
        let service = new TotpService();
        // Example secret from Google's Key URI Format documentation.
        let link = await service.createTotpLink('0x48656c6c6f21deadbeef', {
            account: 'alice+test@example.com', issuer: 'ACME & Co',
        });
        eq_(link, 'otpauth://totp/ACME%20%26%20Co:alice%2Btest%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=ACME%20%26%20Co&algorithm=SHA1&digits=6&period=30');
        // Unpadded Base32, including partial groups and leading zero bytes.
        for (let [hex, expected] of [
            ['0x66', 'MY'], ['0x666f', 'MZXQ'], ['0x666f6f', 'MZXW6'],
            ['0x666f6f62', 'MZXW6YQ'], ['0x666f6f6261', 'MZXW6YTB'],
            ['0x666f6f626172', 'MZXW6YTBOI'], ['0x0000', 'AAAA'],
        ]) {
            let link = await service.createTotpLink(hex as TEth.Hex);
            let expectedLink = `otpauth://totp/0xweb:default?secret=${expected}&issuer=0xweb&algorithm=SHA1&digits=6&period=30`;
            eq_(link, expectedLink);
        }
    },

    async 'generates hex seeds' () {
        let service = new TotpService();
        let seed = await service.generateSeed();
        let other = await service.generateSeed();
        let isHexSeed = /^0x[0-9a-f]{40}$/.test(seed);
        let seedBytes = $buffer.fromHex(seed);
        eq_(isHexSeed, true);
        eq_(seedBytes.length, 20);
        eq_(other.length, 42);
        eq_(seed === other, false);
    },

    async 'validates RFC 6238 SHA-1 vectors as six-digit codes' () {
        let service = new TotpService();
        let seed = $buffer.toHex(new TextEncoder().encode('12345678901234567890'));
        let vectors = [
            [59, '287082'],
            [1_111_111_109, '081804'],
            [1_111_111_111, '050471'],
            [1_234_567_890, '005924'],
            [2_000_000_000, '279037'],
            [20_000_000_000, '353130'],
        ] as const;
        let now = Date.now;
        try {
            for (let [seconds, code] of vectors) {
                Date.now = () => seconds * 1_000;
                let result = await service.generateTotpCode(seed, seconds * 1_000);
                eq_(result.code, code);
                result = await service.generateTotpCode(seed);
                eq_(result.code, code);
                let validation = await service.validateTotp(seed, code);
                eq_(validation.valid, true);
            }
        } finally {
            Date.now = now;
        }
    },

    async 'enforces the time window and input format' () {
        let service = new TotpService();
        let seed = $buffer.toHex(new TextEncoder().encode('12345678901234567890'));
        let now = Date.now;
        try {
            for (let seconds of [0, 29, 30, 59, 60, 89]) {
                Date.now = () => seconds * 1_000;
                let result = await service.validateTotp(seed, '287082');
                eq_(result.valid, true);
                eq_(result.totpWindowIndex, 1);
            }
            Date.now = () => 90_000;
            let result = await service.validateTotp(seed, '287082');
            eq_(result.valid, false);
            Date.now = () => 59_000;
            for (let code of ['287082\n', ' 287082', '287 082', '\t28\n70\r82 ', '287\u00a0082']) {
                let result = await service.validateTotp(seed, code);
                eq_(result.valid, true);
                eq_(result.totpWindowIndex, 1);
            }
            for (let code of ['', ' \t\n', '28708', '0287082', '287-082', 'abcdef', '000000']) {
                let result = await service.validateTotp(seed, code);
                eq_(result.valid, false);
            }
            let wrongSeed = $buffer.toHex(new Uint8Array(20));
            result = await service.validateTotp(wrongSeed, '287082');
            eq_(result.valid, false);
            for (let invalid of ['0x', '0x1', '0xgg', `${seed}zz`, `${seed}\n`, seed.slice(2)]) {
                let result = await service.validateTotp(invalid as TEth.Hex, '287082');
                eq_(result.valid, false);
            }
        } finally {
            Date.now = now;
        }
    },
});
