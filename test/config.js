module.exports = {
     $config: {
        async $before () {
            // increase to 1min per test suite
            UTest.cfg({ timeout: 60_000 });
        }
    },
    suites: {
        node : {
            exec: 'node',
            tests: 'test/**.spec.ts'
        }
    }
};
