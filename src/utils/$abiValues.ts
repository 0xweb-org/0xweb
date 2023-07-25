import type { AbiItem } from 'web3-utils'

export namespace $abiValues {

    type TLogParsed = {
        name: string
        arguments: {
            name: string
            value: any
        }[]
        event: {
          transactionHash: string
          blockHash: string
          blockNumber: number
          address: string
          data: string
          topics: string[]
        }
    }

    export function serializeLog (log: TLogParsed) {
        if (log.name && log.arguments) {
            return `${log.name}(${log.arguments.map(arg => `gray<${arg.name}=>${ serializeValue(arg.value) }`).join(', ')})`
        }

        let event = log.event;
        let lines = [
            `Tx: ${ event.transactionHash}`,
            `Block: ${ event.blockNumber}`,
            `Address: ${ event.address}`,
            `Topics: \n ${ event.topics.map(topic => `  ${topic}`) }`,
            `Data: \n ${ event.data }`
        ];
        return lines.join('\n')
    }
    export function serializeCalldata (calldata: { method: string, arguments: any[] }, abis: AbiItem[]) {
        let methods = abis.filter(a => a.name === calldata.method);
        let method = methods.find(x =>x.inputs?.length === calldata.arguments.length);
        if (method == null) {
            return `${ calldata.method }(${ calldata.arguments.map(arg => serializeValue(arg))})`
        }

        let name = method.name;
        let args = calldata.arguments.map((arg, i) => `gray<${method.inputs[i].name}=>${serializeValue(arg)}`);
        return `${ name }(${ args.join(', ')})`;
    }

    function serializeValue (value: any) {
        if (value == null) {
            return 'NULL';
        }
        if (typeof value !== 'object') {
            return value;
        }
        // if (Array.isArray(value)) {
        //     return `[ ${value.map(v => serializeValue(v)).join(', ')} ]`;
        // }
        return JSON.stringify(value);
    }
}
