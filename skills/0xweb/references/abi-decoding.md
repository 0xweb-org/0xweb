# ABI data decoding

Use `abi decode-calldata`, `abi decode-error`, `abi decode-result`, and
`abi decode-log` for local decoding of encoded bytes. These commands do not send
transactions. Supply `--abi` with a quoted signature/JSON item or array, a file path to an
ABI array/compiler artifact, or a contract address with `--chain` for
explorer ABI lookup. File paths need no particular extension.
Address lookup needs explorer configuration and may use RPC for proxy
resolution; the other sources decode offline.
Short hex address sources such as `0x1` are left-padded to 20 bytes before explorer lookup.

All return `name`, positional `args`, and named `params` when names are available.
Retain large integer strings. Unknown selectors and ambiguous ABI selection fail
instead of guessing. `--json` keeps stdout machine-readable; errors go to stderr.

## Errors

```sh
0xweb abi decode-error <revert-data> --abi "error InsufficientBalance(address account, uint256 amount)" --json
0xweb abi decode-error <revert-data> --abi <contract-address> --chain eth --json
```

The four-byte selector selects the error. Built-in `Error(string message)` and
`Panic(uint256 code)` work without an ABI source. For custom signatures, include
the `error` keyword or provide an ABI JSON item with `type: "error"`. An empty
revert is not a decoded error. A decoded error payload alone does not establish
which contract emitted it; error data can be propagated or fabricated.

## Return values

```sh
0xweb abi decode-result <return-data> --abi "balanceOf(address owner) view returns (uint256 balance)" --json
0xweb abi decode-result <return-data> --abi ./Token.json --method "balanceOf(address)" --json
```

Return data has no selector. With several functions in the ABI, provide
`--method` as an unambiguous name or full signature. Include the declared outputs
in a supplied signature. Outputs are decoded strictly without filling missing
values. `0x` is valid for a function with no outputs.

## Event logs

```sh
0xweb abi decode-log <data> --topics '["<topic0>","<indexed-owner-word>"]' --abi "event Updated(address indexed owner, uint256 amount)" --json
```

Pass the log's complete topics array as JSON. For non-anonymous events, topic0
selects the event and is checked against an explicitly selected `--event`.
For anonymous events, omit topic0 and use `--event` when ABI selection is
ambiguous. `--event` accepts a name or full event signature. Topic counts must
match the selected ABI; each topic is exactly 32 bytes. Use `--topics '[]'` for
an anonymous event with no indexed fields.

`args` preserves ABI declaration order across indexed and non-indexed fields.
Indexed `string`, `bytes`, arrays (including fixed arrays), and tuples are hashes:
their original values cannot be recovered from a topic. These remain hex hashes
in the result. Preserve `indexed` flags in the supplied event ABI.

For error, result, and log decoding, `--data` can replace the positional data
argument. Calldata decoding retains its `--calldata` alternative.
