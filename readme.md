## [`0xweb`](https://0xweb.org) - Contract package manager and CLI Web3 Toolkit


<p align='center'>
    <img src='images/background.jpg'/>
</p>

----
[![Website Link](https://img.shields.io/badge/%F0%9F%8C%90-website-green.svg)](https://0xweb.org)
[![Documentation Link](https://img.shields.io/badge/%E2%9D%93-documentation-green.svg)](https://docs.0xweb.org)
[![NPM version](https://badge.fury.io/js/0xweb.svg)](http://badge.fury.io/js/0xweb)
[![CircleCI](https://circleci.com/gh/0xweb-org/0xweb.svg?style=svg)](https://circleci.com/gh/0xweb-org/0xweb)

| | |
|--|--|
|[Demo: Backend](https://github.com/0xweb-org/examples-backend) | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/0xweb-org/examples-backend/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/0xweb-org/examples-backend/tree/master) |
|[Demo: Storage](https://github.com/0xweb-org/examples-storage) | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/0xweb-org/examples-storage/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/0xweb-org/examples-storage/tree/master) |
|[Demo: Hardhat](https://github.com/0xweb-org/examples-hardhat) | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/0xweb-org/examples-hardhat/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/0xweb-org/examples-hardhat/tree/master) |
|[Demo: Price Loader](https://github.com/0xweb-org/examples-price) | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/0xweb-org/examples-price/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/0xweb-org/examples-price/tree/master) |



- Generate TypeScript or ES6 classes for contracts fetched from Etherscan and Co.
- CLI commands to query the contracts or to submit transactions
- RESTful API for the installed contracts
- Deploy and track deployed contracts with ease

> [Dequanto library 📦](https://github.com/0xweb-org/dequanto) is used for the wrapped classes

Here the example of generated classes: [0xweb-org/0xweb-sample 🔗](https://github.com/0xweb-org/0xweb-sample)


### Install

```bash
$ npm i 0xweb -g

# Boostrap dequanto library in cwd
$ 0xweb init

# Download sources/ABI and generate TS classes
$ 0xweb install 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --name chainlink/oracle-eth --chain eth
```

> Use the `--hardhat` flag, if you want to develop|compile|deploy|test contracts: `0xweb init --hardhat`

#### Install from scripts and AI agents

The portable [0xweb skill](skills/0xweb/SKILL.md) provides CLI workflows and
examples for coding agents. Keep the complete `skills/0xweb` directory together;
its [task index](skills/0xweb/INDEX.md) links to the relevant references.

To inspect a contract without installing it, use `contract info`:

```bash
0xweb contract info ./Contract.sol --chain hardhat --json
0xweb contract info 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --chain eth --json
```

It returns the same metadata and file descriptors as `install --save false`,
always includes contents, and never writes generated files or package metadata.
Explorer dependencies may still use caches. `--name` is optional (default:
`Contract`) and only names the generated binding. Inputs are addresses or local
files, not installed package names. ABI and available source contents are in
`files` entries with kinds `abi` and `source`; unverified contracts may not have
sources. Every entry has `written: false`. The `--source`, `--contract-name`,
`--implementation`, and `--target` options work as with install. Saving cannot
be enabled on this command.

Provide `--name` and `--chain`, or use a chain-prefixed address such as
`eth:sepolia:0x...`. The prefix and an explicit `--chain` must agree. There is no
default chain. Missing required input fails without prompting when stdin is not
interactive. Use `--json` to receive one JSON result on stdout; failures exit
with a nonzero status and diagnostics on stderr.

```bash
# Generate from a local Solidity file without installing generated files or metadata
0xweb install ./Contract.sol --name Contract --chain hardhat --save false --json

# Install from an ABI array or compiler artifact JSON
0xweb install ./artifacts/Contract.json --name Contract --chain eth --json

# Use local source for an existing deployed address
0xweb install 0x0000000000000000000000000000000000000001 --source ./Contract.sol --name Contract --chain hardhat --json
```

`--source` accepts a Solidity or JSON file when the positional input is an
address. For Solidity files containing several contracts, select one explicitly
with `--contract-name`. Remote addresses require explorer configuration and may
require API keys; local files do not require explorer requests to load the ABI.

By default, installation writes under `./0xc/<chain>/<name>/` and updates the
working directory's `0xweb.json`. A chain containing `:` uses `_` in its directory
name. `--output` changes the root. `--global` overrides that root and writes files
and the registry under the appdata `.dequanto` directory. `--global false` keeps
installation local. Existing generated files and the matching package entry can
be overwritten; no overwrite confirmation is requested.

Targets are `ts`, `js` (ES modules in `.js`), `mjs` (ES modules in `.mjs`), and
`cjs` (CommonJS in `.js`). JavaScript targets also produce `.d.ts` declarations.
The default is `settings.generate.target`, falling back to `ts`. Choose a target
compatible with the consuming project's module configuration.

The JSON result contains `platform`, `address` (`null` for file inputs), `name`,
`main`, and `files`. `implementation` is present for a distinct resolved proxy
implementation; `contractName` can be omitted when unavailable, such as with a
bare ABI array. For example, a no-save ABI input returns:

```json
{
  "platform": "hardhat",
  "address": null,
  "name": "Contract",
  "main": "./0xc/hardhat/Contract/Contract.ts",
  "files": [
    { "kind": "binding", "path": "./0xc/hardhat/Contract/Contract.ts", "written": false, "content": "...generated TypeScript..." },
    { "kind": "abi", "path": "./0xc/hardhat/Contract/ContractAbi.json", "written": false, "content": "[]" }
  ]
}
```

File kinds are `binding`, `declaration`, `abi`, and `source`. `written` describes
whether this invocation wrote the file, not whether that path already exists.
`--save-abi false` and `--save-sources false` suppress those writes but retain
their generated descriptors. `--include-content` includes contents even when
saving; `--save false` includes contents automatically and skips generated-file
and package-registry writes. Use it with `--json` to retrieve those contents in
the CLI. It is not a guarantee against dependency caches or compilation artifacts.

#### API Usage

> Use autogenerated TypeScript classes for much safer and faster backend implementation

```ts
import { ChainlinkOracleEth } from '0xc/eth/chainlink/oracle-eth/oracle-eth';
import { Config } from 'dequanto/config/Config';
import { $bigint } from 'dequanto/utils/$bigint';

await Config.fetch();

let oracle = new ChainlinkOracleEth();
let decimals = await oracle.decimals();
let price = await oracle.latestAnswer();

console.log(`ETH Price`, $bigint.toEther(price, decimals));
```

### CLI Usage

> **READ** and **WRITE** to installed contracts directly from the command line

```bash
$ 0xweb contract chainlink/oracle-eth latestAnswer
```

#### WEB Usage

The package has the built-in web interface to make the blockchain analyze and interaction simpler.

1. If you initialize the Transaction via CMD, you may want to sign the transaction with your browser wallet. For this, 0xweb spins up the HTTP server and redirects your browser to visit local page where the details of the transaction being shown, and you can sign and submit the transaction.

2. Launch local server to view the validated contract in UI interface to interact with.

```bash
0xweb server start
```

## Config

> ❗❣️❗ We include our default KEYs for etherscan/co and infura. They are rate-limited. Please, create and insert your keys. Thank you!

```bash
$ 0xweb config --edit

## optionally, you can provide the Nodes Endpoint with `--endpoint` flag
$ 0xweb COMMAND --endpoint https://my-node-url-here
```

## [Commands overview 🔗](https://docs.0xweb.org/cli/commands-overview)

## Various Blockchain tools

> Get the commands overview

```bash
$ 0xweb --help
$ 0xweb install --help
```

### `block`

1. Get current block info

```bash
$ 0xweb block get latest
```

### `token`

1. Get Token Price

```bash
$ 0xweb token price WETH
```

### `accounts`

**🔐 Wallet** feature allows to store accounts in encrypted local storage. We use local machine KEY and provided PIN in arguments or environment to create cryptographically strong secrets 🔑 for account encryption.

When calling contracts `WRITE` methods, you should first add an account to the wallet, and then use PIN to unlock the storage

```bash
$ 0xweb account add --name foo --key the_private_key --pin foobar
$ 0xweb token transfer USDC --from foo --to 0x123456 --amount 20 --pin foobar
```

🏁

----
©️ MIT License.
