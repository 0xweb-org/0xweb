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
