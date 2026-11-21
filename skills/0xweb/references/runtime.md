# Runtime and troubleshooting

For initial installation, private RPCs, and explorer API keys, read
[Installation and configuration](./setup.md).

## Select the executable and configuration

Use the project's existing 0xweb installation. Examples use `0xweb`; inside the source checkout, `node index.js` runs `lib/cli.js`. Source changes do not necessarily affect that bundle until it is rebuilt. Do not rebuild or update a consuming project's installation merely to inspect a contract.

```sh
0xweb --help
0xweb contract info --help
0xweb rpc eth_chainId --chain eth --json
```

Supported chain names come from loaded configuration. RPC endpoints and explorer configuration are separate: successful RPC calls do not prove explorer ABI/source access works. Use `--endpoint` when a task specifies a particular RPC. Check existing project/global configuration before changing it. `0xweb config -e` opens an editor, so it is not an unattended setup command.

The current skill's local-file inspection examples use `--chain hardhat`; ABI/source generation from those files does not require a running Hardhat node. Contract state reads and writes do require a working RPC endpoint.

## MCP server

Start the existing server with `0xweb server start --port 3000`. The HTTP API
remains under `/api`; MCP clients connect to `http://localhost:3000/mcp` using
Streamable HTTP (JSON responses, stateless requests). The built-in MCP handler
supports protocol versions 2025-03-26, 2025-06-18 and 2025-11-25 without an SDK.
It accepts POST requests; GET/SSE and DELETE/session management return 405.
The MCP endpoint accepts loopback Host headers and
same-port loopback browser origins; remote hostnames/proxies are not configured.

`accounts_list`, the `account_*` commands, `block_get`, `rpc`, and the `contract_*` commands are exposed, except the continuous
`contract watch` command. This includes transaction writes and storage mutations.
Discover their generated input schemas with
`tools/list`. Argument names retain the command definition's spelling and case:

```json
{
  "name": "block_get",
  "arguments": {
    "NumberOrDate": "2024-01-20T14:00:37Z",
    "chain": "eth"
  }
}
```

This is the `params` object for `tools/call`. `NumberOrDate` also accepts
`"latest"` or a decimal block number **as a string**. Both inputs are required;
`json` is omitted because MCP always returns structured results. Results include
the block in `structuredContent` and serialized JSON in text content. Invalid
inputs and lookup failures return `isError: true`; unknown tool names are
JSON-RPC errors. Date lookup remains approximate, as described in [blocks](./blocks.md).

Contract method tools (`read`, `write`, `simulate`, and `calldata`) accept additional
properties for ABI inputs, using the CLI names such as `arg0` or `arg:spender`.
Use decimal strings for large integers; arrays and tuples can be JSON values.
`contract_logs` also accepts additional event filters.
Missing ABI inputs return tool errors without prompting. `contract_calldata-parse`
accepts a single `calldata` input for its positional argument/flag.

`accounts_list` returns public account metadata (names, addresses, types, operators,
and role keys), excluding private keys. It accepts `pin` or `2fa`; existing session
credentials are used when available. Account creation, imports, removal, login,
and backup are not exposed through MCP.

The singular account commands are available as `account_balance`, `account_view`,
`account_current`, and `account_rename`. Positional inputs use `accountName`,
`tokenSymbol`, `oldAccountName`, and `newAccountName`, as applicable. They inherit
`pin`, `2fa`, and `chain`. Balance reads need a chain and accept `block` as a decimal
string; the returned balance is an exact decimal string in base units.
`account_current` uses the session account unless `account` is supplied.
`account_view` includes `encryptedKey` only when `encrypted-key` is `true`.
`account_rename` updates the stored account name.

The `rpc` tool requires `RpcMethodName` and `chain`. Pass RPC arguments as contiguous
`arg0`, `arg1`, ... properties, using strings with the same parsing rules as the CLI.
For example, `arg0: "latest"` and `arg1: "false"` call `eth_getBlockByNumber`.
JSON objects and arrays can be supplied as JSON strings. Omitting all `argN` inputs
calls a method with no arguments. This exposes arbitrary node methods, including
state-changing methods supported by the configured RPC endpoint.

## Process handling

### RPC arguments

Pass RPC arguments positionally or as `--arg0`, `--arg1`, through `--argN`.
Flags override the corresponding positional values; indices must be contiguous.
The RPC method and chain are required, including for unattended calls.

```sh
0xweb rpc eth_getBlockByNumber 100 false --chain eth --json
0xweb rpc eth_getBlockByNumber --arg0 uint256:100 --arg1 boolean:0 --chain eth --json
```

Decimal integer strings become hex quantities (`100` becomes `0x64`). Use
`true`/`false` for booleans; bare `0`/`1` are quantities. JSON objects and arrays
must be quoted as one shell argument. `null` becomes JSON null. Supported prefixes
are `string:` (preserve a literal), `json:` (parse any JSON value), `boolean:`
(`true`, `false`, `1`, or `0`), and `uint:`/`uint8:` through `uint256:` in steps
of 8 (unsigned integers with bounds checking). Other strings, including URLs and
block tags, are preserved. For example, `string:null` passes the literal `null`.

For `eth_call`, pass a quoted JSON transaction object followed by a block tag.
Malformed JSON and invalid typed values report the failing `--argN`. Known RPC
results are normalized by dequanto, so chain IDs and block numbers are JSON
numbers rather than raw RPC hex strings. Non-JSON object output renders bigint
fields as decimal strings.

### Execution and output

- Capture stdout and stderr separately. With `--json`, parse stdout only after a zero exit code; a valid result can be a scalar, array, object, or JSON string.
- Provide a bounded timeout for unattended one-shot commands. Do not treat a timeout during a write as proof that nothing was submitted.
- `info`, `install`, and `rpc` fail on missing required inputs with closed stdin. Do not generalize that behavior to all commands: other actions may prompt for missing ABI inputs or credentials.
- A bare `--save` means enabled; use `--save false` when disabling installation. Prefer `contract info` for inspection so this flag cannot be forgotten.
- Keep large integer strings intact. Avoid lossy `Number(...)` conversion of balances, amounts, and uint256 values.

## Recover from errors

| Symptom | Next check |
| --- | --- |
| Unknown `info` action | Inspect installed version/help; use supported no-save install only with explicit `--save false --json --name ...` |
| Missing chain or prefix conflict | Supply one intended chain; use prefixes only on info/install |
| Method missing | Inspect ABI; for an uninstalled read address provide a full ABI signature |
| Explorer failure or missing sources | Check explorer configuration and verification status; use a user-provided local source/artifact if available |
| Historical-state error | Check endpoint archive capability and requested block |
| Prompt or closed-readline error | Supply missing method arguments, account, or authorized authentication inputs |
| JSON parsing error | Check exit status, stderr, executable version, and whether `--json` reached the command |

Do not label unavailable ABI/source information as empty verified metadata. Report the failed lookup and what information was actually obtained.
