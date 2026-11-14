# Calls and transactions

## Read methods

For an uninstalled address, supply an ABI signature including return types and an explicit chain:

```sh
0xweb contract read 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 "latestAnswer() view returns (int256)" --chain eth --json
```

For installed contracts, a method name can resolve from the registered ABI. Use `--arg0`, `--arg1`, etc. to supply inputs; named ABI inputs are also supported. Inspect the ABI before selecting an overload. Quote tuple/array JSON as one shell argument. Supply every required input: missing values can trigger prompts.

`--block` accepts a decimal block number or a date string; use an ISO timestamp for dates. To resolve a date to a reusable block number, see [Blocks by number or date](./blocks.md). Historical calls require an RPC endpoint that serves the requested state. `--account` on a read sets the caller for `eth_call`; it does not turn the read into a transaction. `--address` overrides the destination of an installed contract binding.

## Calldata without sending

To decode calldata locally with a supplied function signature, use:

```sh
0xweb abi decode-calldata 0x70a082310000000000000000000000000000000000000000000000000000000000000000 --abi "balanceOf(address account)" --json
```

`--abi` accepts a function signature, JSON ABI item/array, `.json` file path, or contract address. Files may contain an ABI array or compiler
artifact with an `abi` array. For explorer lookup, supply
`--abi <contract-address> --chain <chain>`. The chain is required in address
mode, which uses the configured explorer and its proxy-resolution behavior.
Short hex address sources such as `0x1` are left-padded to 20 bytes before explorer lookup.
Calldata can be
positional or passed through `--calldata`. Supplied signatures and files need no
chain or network lookup. It returns `name`, positional `args`, and named `params`, using the
same decoder as `contract calldata-parse`. Unknown selectors, malformed hex,
and invalid ABI inputs fail rather than returning a successful null result.

The following examples assume an installed `Counter` with `increment()`:

```sh
0xweb contract calldata Counter increment --chain hardhat --json
0xweb contract calldata-parse Counter 0xd09de08a --chain hardhat --json
```

Encoding returns a transaction-data object, including `data`, rather than a bare hex string. Decoding returns `name`, `args`, and named `params`. Calldata can also be supplied with `--calldata`. These operations require an available ABI/binding; an arbitrary address alone is not enough to infer methods.

Encoding is not broadcasting or proof that execution would succeed. Keep raw token amounts in base units when passing ABI integers.

## Authorized writes

Use `contract write` only for a requested transaction. Confirm unresolved chain, sender, method, destination, and values before sending; existing authorization need not be requested again. Inspect the ABI and encode calldata first when that helps make the operation reviewable.

```sh
0xweb auth status --json
0xweb contract write --help
```

`auth status` is a read-only check of the selected account and 2FA state. It does not unlock the account. `contract write` uses an account from `--account` or the login session and the configured PIN/2FA flow. Avoid putting secrets into saved examples or logs; use the environment's existing authorized credential flow. Do not set up or disable 2FA just to make a command run unattended.

`contract write --json` returns a transaction receipt. Inspect `transactionHash` and `status`; calldata and hashes alone do not establish success. If a timeout leaves submission uncertain, inspect the hash/account nonce before retrying. Account-agent flows may have additional submission or execution steps; inspect the actual result.

Repository implementation: `src/services/ContractService.ts`, `src/commands/list/CAuth.ts`, `src/utils/Parameters.ts`. Tuple arguments and receipt checks: `test/commands/json/contract.spec.ts`.
