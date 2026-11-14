# Blocks by number or date

Use `block get` to retrieve block metadata or resolve a date to a block number.
0xweb searches block timestamps through the chain's RPC; it does not require a
native block-by-date RPC method or an explorer API key.

```sh
0xweb block get "2024-01-20T14:00:37Z" --chain eth --json
0xweb block get "2024-01-20T16:00:37+02:00" --chain eth --json
0xweb block get 19050000 --chain eth --json
0xweb block get latest --chain eth --json
```

Prefer a quoted ISO timestamp with `Z` or an explicit UTC offset. The legacy
`dd.MM.yyyy HH:mm:ss` format includes seconds but uses the machine's local
timezone; prefer ISO with an explicit timezone for reproducible results.

The JSON result is the block object, including `number`, `hash`, `parentHash`,
`timestamp` (Unix seconds), and `transactions`. Use `number` as the resolved
height. Date lookup makes multiple RPC calls, so configured private RPCs can
improve reliability; the endpoint must serve historical block headers.

Date resolution is approximate: it may return a block before or after the
requested instant. It is not a guaranteed nearest-block or at-or-before lookup.
Compare the returned `timestamp` with the requested time. For an exact historical
boundary, inspect neighboring numbered blocks to establish the required side.
Use dates within the chain's history; future or pre-genesis dates may fail.

For historical contract reads, `contract read --block` also accepts an ISO date
directly; see [Calls and transactions](./calls.md). Resolve a numbered block first
when several operations must use the same height, and retain the hash when
recording the result.
