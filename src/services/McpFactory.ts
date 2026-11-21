import { IncomingMessage } from 'http';
import { IHttpHandler, HttpResponse } from 'atma-server';
import { File, env } from 'atma-io';
import { App } from '../app/App';
import { ICommand } from '@core/commands/ICommand';
import { $command } from '@core/commands/utils/$command';
import { ServerCommandExecutor } from './ServerCommandExecutor';
import { $require } from '@dequanto/utils/$require';

/** Generates MCP discovery documents and RPC handlers from an explicit command allowlist. */
export class McpFactory {
    private entries = new Map<string, { command: ICommand; tool: Tool }>();
    private serverInfo: { name: string; version: string };

    constructor(commands: ICommand[], private app: App) {
        let pkg = File.read<{ name: string; version: string }>(env.applicationDir.combine('/package.json').toString());
        this.serverInfo = { name: pkg.name, version: pkg.version };
        for (let command of commands) {
            this.addCommand(command);
        }
    }

    getTools(): Tool[] {
        return Array.from(this.entries.values(), x => x.tool);
    }

    createHandler(): IHttpHandler {
        return { process: req => this.handleRequest(req) };
    }

    async handleRequest(req: IncomingMessage & { body?: unknown }): Promise<HttpResponse> {
        let port = req.socket.localPort;
        let hosts = [`localhost:${port}`, `127.0.0.1:${port}`, `[::1]:${port}`];
        let origins = hosts.map(host => `http://${host}`);
        if (!hosts.includes(req.headers.host) || (req.headers.origin && !origins.includes(req.headers.origin))) {
            return new HttpResponse({
                statusCode: 403,
                mimeType: 'application/json; charset=utf-8',
                content: this.error(null, -32000, 'Invalid Host or Origin')
            });
        }
        // No server-initiated SSE stream or sessions are needed for these request/response tools.
        if (req.method !== 'POST') {
            return new HttpResponse({
                statusCode: 405,
                mimeType: 'application/json; charset=utf-8',
                headers: { Allow: 'POST' },
                content: this.error(null, -32000, 'Use POST for MCP requests')
            });
        }
        let accept = req.headers.accept ?? '';
        if (!accept.includes('application/json') || !accept.includes('text/event-stream')) {
            return new HttpResponse({
                statusCode: 406,
                mimeType: 'application/json; charset=utf-8',
                content: this.error(null, -32000, 'Accept must include application/json and text/event-stream')
            });
        }
        if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] ?? '')) {
            return new HttpResponse({
                statusCode: 415,
                mimeType: 'application/json; charset=utf-8',
                content: this.error(null, -32000, 'Content-Type must be application/json')
            });
        }
        let version = req.headers['mcp-protocol-version'];
        if (version != null && !PROTOCOL_VERSIONS.includes(String(version))) {
            return new HttpResponse({
                statusCode: 400,
                mimeType: 'application/json; charset=utf-8',
                content: this.error(null, -32600, 'Unsupported MCP protocol version')
            });
        }
        let message = req.body;
        if (!isObject(message) || message.jsonrpc !== '2.0' || typeof message.method !== 'string'
            || ('id' in message && typeof message.id !== 'string' && !(typeof message.id === 'number' && Number.isFinite(message.id)))
            || ('params' in message && !isObject(message.params))) {
            return new HttpResponse({
                statusCode: 400,
                mimeType: 'application/json; charset=utf-8',
                content: this.error(null, -32600, 'Invalid JSON-RPC request')
            });
        }
        if (!('id' in message)) {
            // Notifications have no response and must never execute a tool.
            return new HttpResponse({
                statusCode: 202,
                content: ''
            });
        }
        let { id, method } = message;
        let params = message.params ?? {};
        switch (method) {
            case 'initialize':
                if (typeof params.protocolVersion !== 'string' || !isObject(params.capabilities)
                    || !isObject(params.clientInfo) || typeof params.clientInfo.name !== 'string' || typeof params.clientInfo.version !== 'string') {
                    return new HttpResponse({
                        statusCode: 200,
                        mimeType: 'application/json; charset=utf-8',
                        content: this.error(id, -32602, 'Invalid initialization parameters')
                    });
                }
                return new HttpResponse({
                    statusCode: 200,
                    mimeType: 'application/json; charset=utf-8',
                    content: {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            protocolVersion: PROTOCOL_VERSIONS.includes(params.protocolVersion) ? params.protocolVersion : '2025-11-25',
                            capabilities: { tools: {} },
                            serverInfo: this.serverInfo
                        }
                    }
                });
            case 'ping':
                return new HttpResponse({
                    statusCode: 200,
                    mimeType: 'application/json; charset=utf-8',
                    content: { jsonrpc: '2.0', id, result: {} }
                });
            case 'tools/list':
                if (params.cursor != null) {
                    return new HttpResponse({
                        statusCode: 200,
                        mimeType: 'application/json; charset=utf-8',
                        content: this.error(id, -32602, 'Invalid cursor')
                    });
                }
                return new HttpResponse({
                    statusCode: 200,
                    mimeType: 'application/json; charset=utf-8',
                    content: { jsonrpc: '2.0', id, result: { tools: this.getTools() } }
                });
            case 'tools/call': {
                if (typeof params.name !== 'string' || (params.arguments !== undefined && !isObject(params.arguments))) {
                    return new HttpResponse({
                        statusCode: 200,
                        mimeType: 'application/json; charset=utf-8',
                        content: this.error(id, -32602, 'Expected tool name and arguments object')
                    });
                }
                let entry = this.entries.get(params.name);
                if (entry == null) {
                    return new HttpResponse({
                        statusCode: 200,
                        mimeType: 'application/json; charset=utf-8',
                        content: this.error(id, -32602, `Unknown tool: ${params.name}`)
                    });
                }
                let result = await this.callCommand(entry, params.arguments ?? {});
                return new HttpResponse({
                    statusCode: 200,
                    mimeType: 'application/json; charset=utf-8',
                    content: { jsonrpc: '2.0', id, result }
                });
            }
            default:
                return new HttpResponse({
                    statusCode: 200,
                    mimeType: 'application/json; charset=utf-8',
                    content: this.error(id, -32601, `Unknown method: ${method}`)
                });
        }
    }

    private async callCommand(entry: { command: ICommand; tool: Tool }, input: Record<string, any>) {
        try {
            // Validate precisely the primitive schema generated from ICommand, without a schema library.
            let schema = entry.tool.inputSchema;
            for (let key of schema.required) {
                $require.notNull(input[key], `Missing required argument: ${key}`);
            }
            for (let [key, value] of Object.entries(input)) {
                let property = Object.hasOwn(schema.properties, key) ? schema.properties[key] : null;
                $require.notNull(property, `Unknown argument: ${key}`);
                $require.True(
                    typeof value === property.type && (typeof value !== 'number' || Number.isFinite(value)),
                    `Argument ${key} must be ${property.type}`
                );
                if (property.enum) {
                    $require.oneOf(value, property.enum, `Invalid value for ${key}`);
                }
            }
            let args = (entry.command.arguments ?? []).map(arg => input[arg.name]);
            let params = { ...input };
            for (let arg of entry.command.arguments ?? []) {
                delete params[arg.name];
            }
            // Dispatch directly to the registered command's process through the shared validation/setup.
            let result = await ServerCommandExecutor.execute(entry.command, args, params, this.app);
            let value = JSON.parse(JSON.stringify(result ?? null, (_key, x) => typeof x === 'bigint' ? x.toString() : x));
            let structuredContent = isObject(value)
                ? value
                : { result: value };

            return { content: [{ type: 'text', text: JSON.stringify(value) }], structuredContent };
        } catch (error) {
            return { isError: true, content: [{ type: 'text', text: error.message ?? String(error) }] };
        }
    }

    private error(id: string | number | null, code: number, message: string) {
        return { jsonrpc: '2.0', id, error: { code, message } };
    }

    private addCommand(command: ICommand, path: string[] = [], parent?: ICommand) {
        let aliases = $command.getAliases(command.command);
        let name = aliases[aliases.length - 1].name;
        let parts = [...path, name];
        let merged = {
            ...command,
            params: {
                ...parent?.params,
                ...command.params
            },
            arguments: [
                ...(parent?.arguments ?? []),
                ...(command.arguments ?? [])
            ]
        };
        if (command.subcommands?.length) {
            for (let child of command.subcommands) {
                this.addCommand(child, parts, merged);
            }
            return;
        }
        let properties: Record<string, any> = {};
        let required: string[] = [];
        for (let arg of merged.arguments) {
            $require.True(Boolean(arg.name) && !Object.hasOwn(properties, arg.name), `MCP arguments must have unique names: ${parts.join(' ')}`);
            properties[arg.name] = {
                type: arg.type ?? 'string',
                description: arg.description
            };
            if (arg.required) {
                required.push(arg.name);
            }
        }
        for (let [flags, param] of Object.entries(merged.params)) {
            let aliases = $command.getAliases(flags);
            let key = aliases[aliases.length - 1].name;
            if (key === 'json') {
                continue;
            }
            $require.True(!Object.hasOwn(properties, key), `Duplicate MCP input: ${key}`);
            properties[key] = {
                type: CliTypeMapper.toMcp(param),
                description: param.description,
                enum: param.oneOf ?? undefined,
                default: param.default ?? undefined
            };
            if (CliTypeMapper.isRequired(param)) {
                required.push(key);
            }
        }
        let toolName = parts.join('_');
        $require.True(!this.entries.has(toolName), `Duplicate MCP tool: ${toolName}`);
        this.entries.set(toolName, {
            command: merged,
            tool: {
                name: toolName,
                description: command.description.join('\n'),
                inputSchema: {
                    type: 'object',
                    properties,
                    required,
                    additionalProperties: false
                }
            }
        });
    }
}

const PROTOCOL_VERSIONS = ['2025-03-26', '2025-06-18', '2025-11-25'];

interface Tool {
    name: string;
    description: string;
    inputSchema: {
        type: 'object';
        properties: Record<string, { type: string; description: string; enum?: (string | number)[]; default?: any }>;
        required: string[];
        additionalProperties: false;
    };
}

function isObject(value: unknown): value is Record<string, any> {
    return value != null && typeof value === 'object' && !Array.isArray(value);
}


type TParam = NonNullable<ICommand['params']>[''];

namespace CliTypeMapper {
    export function toMcp (param: TParam) {
        return param.type === 'address'
            ? 'string'
            : (param.type ?? 'string');
    }
    export function isRequired (param: TParam) {
        return param.required && param.default == null && !param.requiredUnless?.length && !param.fallback
    }
}
