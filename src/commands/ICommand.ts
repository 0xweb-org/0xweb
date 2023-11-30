import { type App } from '@core/app/App';


export interface ICommand {
    command: string
    example?: string
    description: string[]
    arguments?: {
        description: string
        name?: string
        type?: 'number' | 'string' | 'boolean'
        required?: boolean
    }[]
    params?: {
        [definition: string]: {
            // will be parsed from definition (the last one)
            key?: string
            description: string
            required?: boolean
            type?: 'number' | 'string' | 'boolean' | 'address',
            map?: <T>(input: string) => T

            oneOf?: (string | number)[]
            validate?: (any) => any
            default?: any
        }
    }
    subcommands?: ICommand[]
    process: (args: any[], params?, app?: App) => Promise<void | any>
}

export abstract class Command implements ICommand {
    command: string;
    description: string[];
    arguments?: { description: string; type?: 'string' | 'number' | 'boolean'; required?: boolean; }[];
    params?: {
        [definition: string]: {
            // will be parsed from definition (the last one)
            key?: string; description: string; required?: boolean; type?: 'string' | 'number' | 'boolean';
        };
    };
    subcommands?: ICommand[];
    process: (args: any[], params?: any, app?: App) => Promise<void | any>;
}
