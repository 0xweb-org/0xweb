import { $abiInput } from '@core/utils/$abiInput';
import { TAbiItem } from '@dequanto/types/TAbi';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { l } from '@dequanto/utils/$logger';
import { File } from 'atma-io';


UTest({

    async 'should parse arguments' () {
        let abi = $abiParser.parseMethod('foo(string bar, uint256 baz)');

        return UTest({
            async 'simple' () {
                var [ arg1, arg2 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    bar: 'Hello, World!',
                    baz: '42'
                });
                eq_(arg1, 'Hello, World!');
                eq_(arg2, 42n);
                eq_(typeof arg2, 'bigint');


                var [ arg1, arg2 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    'arg:0': 'Hello, World',
                    'arg:1': '2.3^3'
                });
                eq_(arg1, 'Hello, World');
                eq_(arg2, 2300n);
                eq_(typeof arg2, 'bigint');
            }
        });
    },

    async 'should parse struct' () {
        let abi = $abiParser.parseMethod('foo((string name, uint age) user)');

        return UTest({
            async 'as json' () {
                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    user: '{"name": "John Doe", "age": 30 }',
                });
                deepEq_(arg1, {
                    name: 'John Doe', age: 30n
                });
            },
            async 'as args' () {
                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    'arg0.name': 'John Doe',
                    'arg0.age': '30'
                });
                deepEq_(arg1, {
                    name: 'John Doe', age: 30n
                });
            },
            async 'as named arg' () {
                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    'user.name': 'John Doe',
                    'user.age': '30'
                });
                deepEq_(arg1, {
                    name: 'John Doe', age: 30n
                });
            },
            async 'load from file' () {
                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    'arg0': 'load(./test/fixtures/cli/user.json)',
                });
                deepEq_(arg1, {
                    name: 'John Doe', age: 30n
                });
            },
            async 'load from file with getter' () {
                let abi = $abiParser.parseMethod('foo(string name)');
                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    'arg0': 'load(./test/fixtures/cli/user.json).name',
                });
                deepEq_(arg1, 'John Doe');
            }
        });
    },

    async 'should parse array' () {
        let abi = $abiParser.parseMethod('foo(string[] memory bar, uint256[] memory baz)');

        return UTest({
            async 'simple' () {
                var [ arg1, arg2 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    bar: '["foo","bar"]',
                    baz: '[1,2]'
                });
                deepEq_(arg1, ["foo","bar"]);
                deepEq_(arg2, [1n, 2n]);
            },
            async 'as struct' () {
                let abi = $abiParser.parseMethod('foo((string name, uint age)[] users)');

                var [ arg1 ] = await $abiInput.parseArgumentsFromCli(abi, {
                    users: '[ {"name": "John Doe", "age": 30} ]',
                });
                deepEq_(arg1, [ {"name": "John Doe", "age": 30n} ]);
            },
        });
    },

    async 'should ask' () {
        let params = { name: 'John Doe', age: 30n };
        let provider = {
            get (abi: TAbiItem) {
                return params[abi.name]
            }
        };
        let abi = $abiParser.parseMethod('foo(string name, uint age)');
        var args = await $abiInput.parseArgumentsFromCli(abi, {

        }, provider);
        deepEq_(args, [ params.name, params.age ]);
    }
})
