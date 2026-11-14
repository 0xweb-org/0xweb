import { File } from 'atma-io';
import { $abi } from '@dequanto/abi/$abi';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { $require } from '@dequanto/utils/$require';
import { $is } from '@dequanto/utils/$is';
import { $address } from '@dequanto/utils/$address';
import { BlockchainExplorerFactory } from '@dequanto/explorer/BlockchainExplorerFactory';
import { TAbiItem } from '@dequanto/types/TAbi';
import { $validate } from '@core/utils/$validate';
import { Fragment, EventFragment } from '@dequanto/abi/fragments';

export class AbiService {
    static async load(params, optional = false): Promise<TAbiItem[]> {
        if (optional && params.abi == null) {
            return [];
        }
        $require.True(typeof params.abi === 'string', 'Provide --abi with an address, file path, signature, or JSON string');

        let input = params.abi.trim();
        $require.notEmpty(input, 'Provide a non-empty ABI source');

        let abi;
        if ($is.Address(input)) {
            let address = $address.toChecksum($require.Address(input, 'Provide a contract address'));
            $require.notEmpty(params.chain, 'Provide --chain when using a contract address as the ABI source');
            $validate.platform(params.chain);
            $validate.config.blockchainExplorer(params.chain);

            let explorer = BlockchainExplorerFactory.get(params.chain);
            let result = await explorer.getContractAbi(address);
            abi = JSON.parse(result.abi);
        } else if (/^[\[{]/.test(input)) {
            abi = JSON.parse(input);
        } else if (/^(?:(?:function|event|error)\s+)?[\w$]+\s*\(/.test(input)) {
            abi = this.parseSignature(input);
        } else {
            $require.True(input.endsWith('.json'), 'ABI files must have a .json extension');
            $require.True(await File.existsAsync(input), `ABI file not found: ${input}`);
            abi = await File.readAsync<TAbiItem[] | { abi: TAbiItem[] }>(input);
            abi = abi?.abi ?? abi;
            $require.True(Array.isArray(abi), 'ABI file must contain an ABI array or an artifact with an abi array');
        }

        let items = (Array.isArray(abi) ? abi : [abi]).map(item => {
            return typeof item === 'string' ? this.parseSignature(item) : item;
        });
        $require.True(items.every(item => item != null && typeof item === 'object' && typeof item.type === 'string'), 'Invalid ABI items');
        return items;
    }

    static hex(data: string, selector = false): string {
        $require.True(typeof data === 'string' && /^0x(?:[\da-f]{2})*$/i.test(data), 'Provide hex data containing complete bytes');
        $require.True(!selector || data.length >= 10, 'Data must include a four-byte selector');
        return data.toLowerCase();
    }

    static decodeError(data: string, items: TAbiItem[]) {
        data = this.hex(data, true);
        let errors = items.filter(item => item.type === 'error');
        for (let signature of ['error Error(string message)', 'error Panic(uint256 code)']) {
            let builtin = this.parseSignature(signature);
            if (!errors.some(item => $abiUtils.getMethodSignature(item) === $abiUtils.getMethodSignature(builtin))) {
                errors.push(builtin);
            }
        }

        let selector = data.slice(0, 10);
        let matches = errors.filter(item => $abiUtils.getMethodSignature(item).toLowerCase() === selector);
        $require.True(matches.length === 1, `Expected one error matching selector ${selector}; found ${matches.length}`);

        let item = matches[0];
        return { name: item.name, ...$abiUtils.decode(item.inputs ?? [], `0x${data.slice(10)}`) };
    }

    static decodeResult(data: string, items: TAbiItem[], method?: string) {
        data = this.hex(data);
        let item = this.select(items.filter(item => item.type === 'function'), method, '--method');
        // Decode the exact declared outputs; do not pad missing return values.
        return { name: item.name, ...$abiUtils.decode(item.outputs ?? [], data) };
    }

    static decodeLog(data: string, topicsInput: string | string[], items: TAbiItem[], event?: string) {
        data = this.hex(data);
        let topics = typeof topicsInput === 'string' ? JSON.parse(topicsInput) : topicsInput;
        $require.True(Array.isArray(topics) && topics.length <= 4 && topics.every(topic => typeof topic === 'string' && /^0x[\da-f]{64}$/i.test(topic)), 'Provide --topics as a JSON array of up to four 32-byte hex topics (including topic0 for non-anonymous events)');
        topics = topics.map(topic => topic.toLowerCase());

        let events = items.filter(item => item.type === 'event');
        let candidates = event == null
            ? events.filter(item => item.anonymous || $abiUtils.getTopicSignature(item).toLowerCase() === topics[0])
            : events;
        let item = this.select(candidates, event, '--event');
        let offset = item.anonymous ? 0 : 1;
        $require.True(item.anonymous || $abiUtils.getTopicSignature(item).toLowerCase() === topics[0], 'Event signature does not match topic0');

        let inputs = item.inputs ?? [];
        let indexed = inputs.filter(input => input.indexed);
        $require.True(topics.length === indexed.length + offset, `Expected ${indexed.length + offset} topics for ${item.name}`);

        let values = $abi.decode(inputs.filter(input => !input.indexed), data);
        let topicIndex = offset;
        let valueIndex = 0;
        let args = inputs.map(input => {
            if (!input.indexed) {
                return values[valueIndex++];
            }
            let topic = topics[topicIndex++];
            // Solidity hashes every indexed array/tuple, even when statically sized.
            let hashed = input.type === 'string' || input.type === 'bytes' || input.type.includes('[') || input.type.startsWith('tuple');
            return hashed ? topic : $abi.decode([input], topic)[0];
        });
        let params = Object.fromEntries(inputs.flatMap((input, index) => input.name ? [[input.name, args[index]]] : []));
        return { name: item.name, args, params };
    }

    private static select(items: TAbiItem[], name: string | undefined, flag: string) {
        let matches = items;
        if (name != null) {
            matches = name.includes('(')
                ? items.filter(item => $abiUtils.getMethodSignature(item) === $abiUtils.getMethodSignature(this.parseSignature(name)))
                : items.filter(item => item.name === name);
        }
        $require.True(matches.length === 1, `Expected one ABI item; found ${matches.length}. Use ${flag} with an unambiguous name or full signature`);
        return matches[0];
    }

    private static parseSignature(signature: string): TAbiItem {
        if (!/^(event|error)\s/.test(signature.trim())) {
            return $abiParser.parseMethod(signature);
        }
        let fragment = Fragment.from(signature.trim());
        let item: TAbiItem = JSON.parse(fragment.format('json'));
        if (fragment.type === 'event') {
            // Array formatting can omit the top-level indexed flag.
            item.inputs.forEach((input, index) => {
                input.indexed = (fragment as EventFragment).inputs[index].indexed === true;
            });
        }
        return item;
    }
}
