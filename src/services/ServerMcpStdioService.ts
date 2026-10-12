import { createInterface } from 'readline';

type Dict = Record<string, unknown>;
type Id = string | number;

interface Tool {
    name: string;
    description: string;
    inputSchema: Dict;
    annotations?: {
        readOnlyHint?: boolean;
        openWorldHint?: boolean;
    };
    // Each handler must validate its arguments.
    run: (args: Dict) => unknown | Promise<unknown>;
}

function isObject(value: unknown): value is Dict {
    return value !== null
        && typeof value === 'object'
        && !Array.isArray(value);
}

function stringify(value: unknown): string {
    return JSON.stringify(value, (_, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
}

function rpcError(id: Id | null, code: number, message: string) {
    return {
        jsonrpc: '2.0',
        id,
        error: { code, message },
    };
}

export class McpServer {
    private tools = new Map<string, Tool>();
    private state: 'new' | 'initializing' | 'ready' = 'new';

    constructor(
        private info: { name: string; version: string },
    ) {}

    registerTool(tool: Tool): void {
        if (this.state !== 'new') {
            throw new Error('Register tools before initialization');
        }
        if (this.tools.has(tool.name)) {
            throw new Error(`Duplicate tool: ${tool.name}`);
        }
        this.tools.set(tool.name, tool);
    }

    async handle(message: unknown): Promise<unknown | undefined> {
        if (
            !isObject(message)
            || message.jsonrpc !== '2.0'
            || typeof message.method !== 'string'
        ) {
            return rpcError(null, -32600, 'Invalid request');
        }

        // Notifications have no id and must not receive a response.
        if (!Object.hasOwn(message, 'id')) {
            if (
                message.method === 'notifications/initialized'
                && this.state === 'initializing'
            ) {
                this.state = 'ready';
            }
            return undefined;
        }

        let id = message.id;
        if (typeof id !== 'string' && typeof id !== 'number') {
            return rpcError(null, -32600, 'Invalid request id');
        }

        if (message.params !== undefined && !isObject(message.params)) {
            return rpcError(id, -32602, 'Expected object parameters');
        }

        let params = (message.params ?? {}) as Dict;
        let success = (result: unknown) => ({
            jsonrpc: '2.0',
            id,
            result,
        });

        if (message.method === 'ping') {
            return success({});
        }

        if (message.method === 'initialize') {
            if (this.state !== 'new') {
                return rpcError(id, -32600, 'Already initialized');
            }
            if (
                typeof params.protocolVersion !== 'string'
                || !isObject(params.capabilities)
                || !isObject(params.clientInfo)
                || typeof params.clientInfo.name !== 'string'
                || typeof params.clientInfo.version !== 'string'
            ) {
                return rpcError(id, -32602, 'Invalid initialization');
            }

            this.state = 'initializing';

            // This implementation targets exactly this protocol version.
            // A client requesting another version must accept this one
            // or disconnect.
            return success({
                protocolVersion: '2025-11-25',
                capabilities: { tools: {} },
                serverInfo: this.info,
            });
        }

        if (this.state !== 'ready') {
            return rpcError(id, -32600, 'Initialization not complete');
        }

        if (message.method === 'tools/list') {
            if (params.cursor !== undefined) {
                return rpcError(id, -32602, 'Invalid cursor');
            }

            return success({
                tools: [...this.tools.values()].map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema,
                    ...(tool.annotations
                        ? { annotations: tool.annotations }
                        : {}),
                })),
            });
        }

        if (message.method === 'tools/call') {
            if (
                typeof params.name !== 'string'
                || (
                    params.arguments !== undefined
                    && !isObject(params.arguments)
                )
            ) {
                return rpcError(id, -32602, 'Invalid tool parameters');
            }

            let tool = this.tools.get(params.name);
            if (!tool) {
                return rpcError(id, -32602, `Unknown tool: ${params.name}`);
            }

            try {
                let value = await tool.run(
                    (params.arguments ?? {}) as Dict,
                );

                return success({
                    content: [{
                        type: 'text',
                        text: stringify(value ?? null),
                    }],
                });
            } catch (error) {
                return success({
                    isError: true,
                    content: [{
                        type: 'text',
                        text: error instanceof Error
                            ? error.message
                            : String(error),
                    }],
                });
            }
        }

        return rpcError(id, -32601, 'Method not found');
    }
}

export function serveStdio(server: McpServer): void {
    let input = createInterface({
        input: process.stdin,
        crlfDelay: Infinity,
        terminal: false,
    });

    let send = (message: unknown) => {
        process.stdout.write(stringify(message) + '\n');
    };

    input.on('line', line => {
        let message: unknown;

        try {
            message = JSON.parse(line);
        } catch {
            send(rpcError(null, -32700, 'Parse error'));
            return;
        }

        // Calls may run concurrently; response ids correlate results.
        void server.handle(message).then(response => {
            if (response !== undefined) {
                send(response);
            }
        }).catch(error => {
            console.error(error);

            let id = isObject(message) ? message.id : undefined;
            if (typeof id === 'string' || typeof id === 'number') {
                send(rpcError(id, -32603, 'Internal error'));
            }
        });
    });
}
