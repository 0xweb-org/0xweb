# Inspection and installation

## Metadata without installation

```sh
0xweb contract info ./Contract.sol --chain hardhat --json
0xweb contract info ./artifacts/Contract.json --chain hardhat --json
0xweb contract info eth:0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --json
```

Inputs are full 20-byte addresses, `.sol` files, ABI JSON arrays, or artifact JSON objects with an `abi` array. File extensions are lowercase. `--source ./Contract.sol` supplies local source for a positional deployed address. Use `--contract-name` to select a contract from Solidity containing multiple contracts.

`--name` optionally names the generated binding and defaults to `Contract`; it does not select the Solidity contract. Targets are `ts`, `js` (ES modules), `mjs`, and `cjs` (CommonJS in `.js`). JavaScript targets also return declarations. The default target comes from `settings.generate.target`, falling back to `ts`.

The result has `platform`, `address`, `name`, `main`, and `files`, with optional `contractName` and `implementation`. Local file inputs have `address: null`.

Each file has `kind`, `path`, `written`, and `content`. Kinds include `binding`, `declaration`, `abi`, and `source`. Parse the `abi` file's `content` as JSON to obtain ABI items. Collect every `source` entry; do not assume only one source file. Unverified contracts may have no available sources or fail explorer resolution.

For `info`, every entry has `written: false`. Paths describe generated destinations, not files the caller should expect to exist. Save flags cannot enable saving on `info`. Explorer dependencies may still use caches.

## Installation

```sh
0xweb install ./Contract.sol --name Counter --chain hardhat --json
0xweb install ./Contract.sol --name Counter --chain hardhat --save false --json
```

Installation requires `--name` and a chain, supplied either with `--chain` or an address prefix. Missing required input fails with non-interactive stdin. A prefix conflicting with `--chain` is rejected.

By default, generated files go under `./0xc/<chain>/<name>/`, and installation updates the working directory's `0xweb.json`. A colon in the chain name becomes an underscore in its directory. `--output` changes the root; `--global` overrides it with the appdata `.dequanto` location for files and registry. `--global false` stays local. Existing generated files and matching registry entries may be overwritten without prompting.

`--save false` skips generated-file and registry writes and includes contents automatically; `--include-content` is redundant in that case. With saving enabled, use `--include-content` to include contents. `--save-abi false` and `--save-sources false` suppress those writes but retain their descriptors. `written` describes this invocation, not prior file existence.

## Installed packages

```sh
0xweb contract list --json
0xweb contract abi Counter --chain hardhat --json
```

`abi` returns an ABI array; `info` returns metadata and file contents. Resolve an installed package's address or source path before using it with `info`.

Repository implementation: `src/commands/list/CInstall.ts`, `src/commands/list/CContract.ts`, `src/services/PackageService.ts`. JSON integration examples: `test/commands/json/install.spec.ts`.
