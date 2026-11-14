# 0xweb task index

Read only the reference relevant to the task. Examples containing `Counter` assume a contract installed under that name; use the actual package name and ABI.

| Task | Command | Reference |
| --- | --- | --- |
| Install the CLI or configure private RPCs and explorer keys | `npm i -g 0xweb`, `config -e` | [Installation and configuration](./references/setup.md) |
| Get ABI, sources, and generated contents without installing | `contract info` | [Inspection and installation](./references/inspection.md) |
| Generate and register a contract binding | `install` | [Inspection and installation](./references/inspection.md) |
| List installed contracts or inspect their ABI | `contract list`, `contract abi` | [Inspection and installation](./references/inspection.md) |
| Read a method, including at a historical block | `contract read` | [Calls and transactions](./references/calls.md) |
| Encode or decode calldata | `contract calldata`, `contract calldata-parse` | [Calls and transactions](./references/calls.md) |
| Decode calldata with an explicit ABI or function signature | `abi decode-calldata` | [Calls and transactions](./references/calls.md) |
| Decode revert errors, return values, or event data/topics | `abi decode-error`, `abi decode-result`, `abi decode-log` | [ABI data decoding](./references/abi-decoding.md) |
| Send a requested contract transaction | `contract write` | [Calls and transactions](./references/calls.md) |
| Fetch or export event logs | `contract logs` | [Logs and storage](./references/logs-storage.md) |
| Read slots, state variables, or storage layout | `contract slot`, `contract var`, `contract vars` | [Logs and storage](./references/logs-storage.md) |
| Export storage or modify a development fork | `contract dump`, `contract dump-restore`, `contract var-set` | [Logs and storage](./references/logs-storage.md) |
| Diagnose configuration, JSON output, or unattended failures | command `--help`, `auth status`, `rpc` | [Runtime and troubleshooting](./references/runtime.md) |

For other CLI families such as `tx`, `accounts`, `transfer`, or `deploy`, inspect their help before constructing a command. This skill does not prescribe unverified flags for those workflows.
