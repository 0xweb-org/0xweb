import { UTest } from 'atma-utest';
import { spawnSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
let cwd: string;
function cli(args: string[], command = ['install']) {
    return spawnSync(process.execPath, [resolve(root, 'index.js'), ...command, ...args, '--json'], {
        cwd, input: '', encoding: 'utf8', timeout: 15_000, maxBuffer: 5_000_000,
    });
}
function install(args: string[]) {
    let result = cli(args);
    eq_(result.status, 0, result.stderr);
    eq_(result.error, undefined);
    return JSON.parse(result.stdout);
}

UTest.create({
    $config: { timeout: 60_000 },
    $before() {
        let base = resolve(root, 'test/bin/install-agent');
        mkdirSync(base, { recursive: true });
        cwd = mkdtempSync(resolve(base, 'run-'));
        copyFileSync(resolve(root, 'test/fixtures/install/ContractBySource.sol'), resolve(cwd, '0xabc.sol'));
        writeFileSync(resolve(cwd, 'artifact.json'), JSON.stringify({ abi: [] }));
    },
    'returns source contents without installing files'() {
        let result = install(['./0xabc.sol', '--name', 'Counter', '--chain', 'hardhat', '--save', 'false']);
        eq_(result.address, null);
        eq_(result.platform, 'hardhat');
        eq_(result.files.some(file => file.kind === 'source'), true);
        for (let file of result.files) {
            eq_(file.written, false);
            eq_(typeof file.content, 'string');
            eq_(existsSync(resolve(cwd, file.path)), false);
        }
        eq_(existsSync(resolve(cwd, '0xweb.json')), false);
    },
    'resolves address prefixes before app initialization'() {
        let address = '0x0000000000000000000000000000000000000001';
        let result = install([`hardhat:${address}`, '--source', './0xabc.sol', '--name', 'Prefixed', '--save', 'false']);
        eq_(result.platform, 'hardhat');
        eq_(result.address, address);
    },
    'contract info returns install metadata and cannot enable saving'() {
        let expected = install(['./0xabc.sol', '--name', 'Contract', '--chain', 'hardhat', '--save', 'false']);
        let response = cli(['./0xabc.sol', '--chain', 'hardhat', '--save', 'true', '--global', 'true', '--include-content', 'false'], ['contract', 'info']);
        eq_(response.status, 0, response.stderr);
        eq_(response.error, undefined);

        let result = JSON.parse(response.stdout);
        deepEq_(result, expected);
        eq_(existsSync(resolve(cwd, '0xweb.json')), false);

        for (let file of result.files) {
            eq_(file.written, false);
            eq_(typeof file.content, 'string');
            eq_(existsSync(resolve(cwd, file.path)), false);
        }
    },
    'contract info accepts a chain prefix and a binding name alias'() {
        let address = '0x0000000000000000000000000000000000000001';
        let response = cli([`hardhat:${address}`, '--source', './0xabc.sol', '-n', 'Info'], ['c', 'info']);
        eq_(response.status, 0, response.stderr);

        let result = JSON.parse(response.stdout);
        eq_(result.name, 'Info');
        eq_(result.address, address);
        eq_(result.platform, 'hardhat');
        eq_(result.files.every(file => file.written === false), true);
    },
    'supports JavaScript targets and artifact inputs'() {
        for (let target of ['js', 'mjs', 'cjs']) {
            let result = install(['artifact.json', '--name', 'Artifact', '--chain', 'hardhat', '--target', target, '--save', 'false']);
            eq_(result.main.endsWith(target === 'mjs' ? '.mjs' : '.js'), true);
            eq_(result.files.some(file => file.kind === 'declaration'), true);
        }
    },
    'reports only the files actually written'() {
        let result = install(['./0xabc.sol', '--name', 'Saved', '--chain', 'hardhat', '--global', 'false', '--save-abi', 'false', '--save-sources', 'false']);
        for (let file of result.files) {
            eq_(file.written, file.kind === 'binding');
            eq_(existsSync(resolve(cwd, file.path)), file.written);
            eq_(file.content, undefined);
        }
        eq_(existsSync(resolve(cwd, '0xweb.json')), true);
    },
    'fails unattended input errors without prompting'() {
        let cases = [
            { args: ['./0xabc.sol', '--chain', 'hardhat'], message: '--name' },
            { args: ['./0xabc.sol', '--name', 'Counter'], message: '--chain' },
            { args: ['0x1234', '--name', 'Counter', '--chain', 'hardhat'], message: 'Invalid contract address' },
            { args: ['./0xabc.sol', '--name', 'Counter', '--chain', 'hardhat', '--target', 'invalid'], message: 'invalid' },
        ];
        for (let test of cases) {
            let result = cli(test.args);
            eq_(result.status, 1, result.stderr);
            eq_(result.error, undefined);
            eq_(result.stdout, '');
            eq_(result.stderr.includes(test.message), true);
            eq_(result.stderr.includes('readline was closed'), false);
        }
    },
});
