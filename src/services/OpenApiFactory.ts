import { ICommand } from '@core/commands/ICommand';
import { $command } from '@core/commands/utils/$command';

export interface IApiRoute {
    path: string;
    command: ICommand;
}

type Schema = {
    type?: string;
    description?: string;
    enum?: (string | number)[];
    default?: unknown;
    pattern?: string;
    [key: string]: unknown;
};

/** Describes the same leaf commands and paths used to register the HTTP API. */
export class OpenApiFactory {
    static create(routes: IApiRoute[]) {
        const paths: Record<string, any> = {};
        for (const { path, command } of routes) {
            if (command.api == null) {
                continue;
            }
            const method = command.api.method ?? 'get';
            const template = path.replace(/:([^/]+)/g, '{$1}');
            const parameters: any[] = [];
            const properties: Record<string, Schema> = {};
            const required: string[] = [];
            const args = command.arguments ?? [];
            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                parameters.push({
                    name: arg.name ?? `cliArg${i}`,
                    in: arg.query ? 'query' : 'path',
                    required: arg.query ? Boolean(arg.required && !arg.fallback) : true,
                    description: arg.description,
                    schema: { type: arg.type ?? 'string' },
                    'x-fallback': arg.fallback ?? undefined,
                });
            }
            for (const [flags, definition] of Object.entries(command.params ?? {})) {
                const aliases = $command.getAliases(flags).map(x => x.name);
                const name = aliases[aliases.length - 1];
                if (name === 'json') {
                    continue;
                }
                const schema = this.schema(definition);
                const isRequired = Boolean(definition.required && definition.default == null
                    && !definition.fallback && !definition.requiredUnless?.length);
                if (method === 'post') {
                    properties[name] = schema;
                    if (isRequired) {
                        required.push(name);
                    }
                } else if (!parameters.some(x => x.name === name && x.in === 'query')) {
                    parameters.push({ name, in: 'query', required: isRequired, description: definition.description, schema });
                }
            }
            const operation: Record<string, any> = {
                operationId: `${method}${path.replace(/[^a-zA-Z0-9_]/g, '_')}`,
                summary: command.description[0],
                description: command.description.join('\n'),
                parameters,
                'x-cli-example': command.example ?? undefined,
                responses: {
                    '200': {
                        description: 'Command result. Large integers are serialized as strings.',
                        content: { 'application/json': { schema: {} } },
                    },
                    default: { description: 'Command validation or execution error' },
                },
            };
            if (method === 'post' && Object.keys(properties).length > 0) {
                operation.requestBody = {
                    description: 'Command parameters as JSON. Parameters may also be supplied in the query string; body values take precedence.',
                    required: false,
                    content: {
                        'application/json': {
                            schema: { type: 'object', properties, required: required.length ? required : undefined, additionalProperties: true },
                        },
                    },
                };
            }
            paths[template] ??= {};
            paths[template][method] = operation;
        }
        paths['/discovery'] = {
            get: {
                operationId: 'get_discovery',
                summary: 'Get the OpenAPI document',
                responses: {
                    '200': { description: 'OpenAPI document', content: { 'application/json': { schema: { type: 'object' } } } },
                },
            },
        };
        return {
            openapi: '3.1.1',
            info: { title: '0xweb HTTP API', version: '1.0.0' },
            servers: [{ url: '/api' }],
            paths,
        };
    }

    private static schema(definition: ICommand['params'][string]): Schema {
        const type = definition.type ?? 'string';
        return {
            type: ['address', 'hex', 'bigint'].includes(type) ? 'string' : type,
            description: definition.description,
            enum: definition.oneOf ?? undefined,
            default: definition.default ?? undefined,
            'x-command-type': definition.type ?? undefined,
            'x-fallback': definition.fallback ?? undefined,
            'x-required-unless': definition.requiredUnless ?? undefined,
        };
    }
}
