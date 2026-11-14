# Logs and storage

Examples assume an installed `Counter` with an `Incremented` event and a `value` state variable. Adapt names to its ABI and Solidity layout.

## Event logs

```sh
0xweb contract logs Counter Incremented --chain hardhat --output std --json
0xweb contract logs Counter Incremented --chain hardhat --output ./events.json --json
0xweb contract logs Counter Incremented --chain hardhat --output ./events.csv --json
```

Default output is `std`, default format is JSON. `--format json` or `--format csv` overrides inference from the output extension. JSON stdout is an array of logs; CSV combined with `--json` is a JSON-encoded string. A file output still returns the result on stdout with `--json` and writes the requested file.

Each JSON log contains `block.number`, `block.date`, `transactionHash`, `event`, and `params`. Repeated event names are normal: keep logs as an array, not a dictionary keyed by event name.

Event input names can be supplied as filter flags. The current action starts at deployment on remote chains and at block zero on Hardhat. It does not expose block-range flags; do not invent `--from-block`/`--to-block`. For large or bounded indexing, use a suitable RPC or dequanto indexing workflow rather than assuming this action is bounded. `contract watch` is long-running; use it only when monitoring is requested and define when to stop.

## Storage reads

```sh
0xweb contract slot Counter 0-5 --chain hardhat --json
0xweb contract vars Counter --chain hardhat --json
0xweb contract var Counter value --chain hardhat --json
0xweb contract dump Counter --chain hardhat --output std --json
```

`slot` reads raw storage words; `vars` returns layout; `var` reads a named accessor such as `users[5].balance`. Quote bracketed accessors for the active shell. Layout-based operations need suitable Solidity sources; `var` also supports `--slot` and `--type` overrides when the layout is known.

For `dump`, `--output std` avoids writing a dump file. A file output is a base path without an extension and produces `.csv` and `.json` files. `--sources`, `--contract-name`, `--implementation`, and comma-separated `--fields` configure source/layout selection. Check returned paths rather than assuming the base path is itself a file.

`var-set` and `dump-restore --file ...` mutate Hardhat development storage. They are not production contract transactions. Confirm the endpoint is the intended development chain/fork and the mutation is requested before using them. A read request does not authorize either action.

Repository implementation: `src/commands/list/CContract.ts`, `src/services/ContractService.ts`. Local fixture and export tests: `test/commands/json/contract.spec.ts`.
