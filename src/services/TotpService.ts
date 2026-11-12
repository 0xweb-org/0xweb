import { $crypto } from '@dequanto/utils/$crypto';
import { $buffer } from '@dequanto/utils/$buffer';
import { TEth } from '@dequanto/models/TEth';
import { $require } from '@dequanto/utils/$require';

const PERIOD = 30; // seconds
export class TotpService {
    async generateSeed (): Promise<TEth.Hex> {
        return $buffer.toHex($crypto.randomBytes(20));
    }
    async createTotpLink (seed: TEth.Hex, opts?: { account?: string; issuer?: string }): Promise<string> {
        $require.Hex(seed);
        $require.eq(seed.length % 2, 0, `TOTP seed must be non-empty hex bytes`);

        let account = opts?.account ?? 'default';
        let issuer = opts?.issuer ?? '0xweb';
        if (!account.trim() || !issuer.trim() || account.includes(':') || issuer.includes(':')) {
            throw new Error('TOTP account and issuer must be non-empty and must not contain colons');
        }
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let secret = '';
        let value = 0;
        let bits = 0;
        // Encode the seed as unpadded Base32, mapping each 5-bit group to a character.
        for (let byte of $buffer.fromHex(seed)) {
            value = (value << 8) | byte;
            bits += 8;
            while (bits >= 5) {
                bits -= 5;
                secret += alphabet[(value >>> bits) & 31];
            }
            value &= (1 << bits) - 1;
        }
        if (bits > 0) {
            secret += alphabet[(value << (5 - bits)) & 31];
        }
        let label = `${encodeURIComponent(issuer)}:${encodeURIComponent(account)}`;
        return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=${PERIOD}`;
    }

    /** Generates a six-digit code for a Unix timestamp in milliseconds. */
    async generateTotpCode (seed: TEth.Hex, time = Date.now()): Promise<{
            code: string
            totpWindowIndex: number
        }> {
        $require.Hex(seed);
        $require.eq(seed.length % 2, 0, `TOTP seed must be non-empty hex bytes`);

        if (!Number.isSafeInteger(time) || time < 0) {
            throw new Error('TOTP time must be a non-negative integer timestamp in milliseconds');
        }
        let totpWindowIndex = Math.floor(time / (PERIOD * 1_000));
        let code = await this.generateCodeForWindow($buffer.fromHex(seed), totpWindowIndex);
        return {
            code,
            totpWindowIndex,
        };
    }

    /** Checks six-digit TOTP codes within one 30-second step of the current time.
     * Replay protection and attempt limits must be handled by the caller.
     */
    async validateTotp (seed: TEth.Hex, code: string): Promise<{
        valid: boolean,
        totpWindowIndex?: number
    }> {
        if (typeof code !== 'string') {
            return { valid: false };
        }
        code = code.replace(/\s/g, '');
        if (code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
            return { valid: false };
        }
        if (typeof seed !== 'string' || seed.length % 2 !== 0 || !/^0x[0-9a-fA-F]+$/.test(seed)) {
            return { valid: false };
        }
        let secret = $buffer.fromHex(seed);
        // Zero-based index of the 30-second window since the Unix epoch (1970-01-01 UTC).
        let totpWindowIndex = Math.floor(Date.now() / (PERIOD * 1000));
        let windowOffset = -1;
        let matchedWindowIndex: number | undefined;
        // Accept the previous, current, or next window to allow for clock skew and entry delays.
        for (; windowOffset <= 1; windowOffset++) {
            // There is no valid counter before the Unix epoch.
            if (totpWindowIndex + windowOffset < 0) {
                continue;
            }
            let expected = await this.generateCodeForWindow(secret, totpWindowIndex + windowOffset);
            // Compare all digits without returning early on a mismatch.
            let difference = 0;
            for (let i = 0; i < 6; i++) {
                difference |= expected.charCodeAt(i) ^ code.charCodeAt(i);
            }
            // Remember a match while still checking the remaining windows.
            if (difference === 0) {
                matchedWindowIndex = totpWindowIndex + windowOffset;
            }
        }
        return {
            valid: matchedWindowIndex !== undefined,
            totpWindowIndex: matchedWindowIndex
        };
    }

    private async generateCodeForWindow (secret: Uint8Array, totpWindowIndex: number): Promise<string> {
        // TOTP uses the window index as an unsigned 8-byte big-endian HMAC message.
        let counter = new Uint8Array(8);
        new DataView(counter.buffer).setBigUint64(0, BigInt(totpWindowIndex), false);
        // The authenticator computes the same HMAC using the shared seed as its key.
        let hash = await $crypto.hmac(counter, { secret, algorithm: 'SHA-1' });
        // Dynamic truncation: the last 4 bits select four bytes from the HMAC.
        // Clear the top bit to obtain a non-negative 31-bit integer.
        let offset = hash[hash.length - 1] & 0x0f;
        let value = ((hash[offset] & 0x7f) << 24)
            | (hash[offset + 1] << 16)
            | (hash[offset + 2] << 8)
            | hash[offset + 3];
        // Keep six decimal digits, preserving any leading zeros.
        return (value % 1_000_000).toString().padStart(6, '0');
    }
}
