# Installation and configuration

## Install the CLI

Use an existing project or global installation when available. If setup is
requested and the CLI is missing, install it with Node.js/npm:

```sh
npm i -g 0xweb
0xweb --help
0xweb contract info --help
```

`npm i 0xweb -g` is equivalent. The npm global executable directory must be on
`PATH`. If installation succeeds but the command is unavailable, inspect
`npm prefix -g` and the shell's command lookup before installing again. Respect
any version pinned by the project instead of silently upgrading it.

Installing this skill does not install the CLI. `0xweb install` is a different
operation: it generates contract bindings and registers contracts. Basic RPC
calls and `contract info` do not require creating a project with `0xweb init`.

## Use dedicated RPCs and explorer credentials

Built-in public RPCs and shared explorer keys provide basic access. Shared
quotas and public endpoint capacity can limit throughput or cause throttling.
For repeated queries, indexing, or production automation, use the user's own
RPC endpoints and explorer API keys. A private endpoint is not a guarantee of
lower latency or historical-state support; select the provider plan for the
required chain, archive access, log ranges, and request volume.

RPCs serve chain state, calls, transactions, and logs. Explorer APIs serve
verified ABI/source metadata and related explorer lookups. Configure both when
the workflow needs both. An RPC API key does not replace an explorer API key.

## Persistent configuration

Open the global configuration interactively:

```sh
0xweb config -e
```

The default global file is the appdata `.dequanto/config.yml` file
(`%APPDATA%/.dequanto/config.yml` on Windows). For the selected project's local
configuration:

```sh
0xweb config -e --local
```

This selects `./0xc/config/config.yml`; use `--local` on subsequent commands to
select that local main configuration. Global installation of the npm executable
does not force global configuration or contract installation.

Merge the following structure into the selected YAML file. Replace the example
URL and key with the user's values; preserve unrelated settings:

```yaml
web3:
  eth:
    endpoints:
      - url: "https://rpc.example.invalid/your-project-token"

blockchainExplorer:
  eth:
    key: "YOUR_EXPLORER_API_KEY"
```

Set the `endpoints` list to the intended private endpoints rather than appending
them to public defaults if requests must stay with the private providers. The
main configuration replaces endpoint arrays. For an existing supported chain,
setting the explorer `key` preserves its built-in API URL. If the provider/API
itself differs, configure `blockchainExplorer.<chain>.api` with a compatible API
URL after checking the installed version's explorer implementation. Use the
actual configured platform name, such as `eth` or `eth:sepolia`, for each chain.

For unattended setup, edit the selected YAML file directly; `config -e` launches
an editor. Keep credentials out of committed examples and logs. Avoid displaying
the entire effective config because it can contain authenticated URLs and keys.
`config --set` prints assigned values and splits on `;` and `=`, so it is a poor
choice for secret values or URLs containing those characters.

Other loaded sources include `./configs/dequanto.yml`, the `dequanto` property
in `package.json`, and root `./dequanto.yml`. These can override values according
to load order; do not assume global config always wins. In the source checkout,
inspect `dequanto/src/config/ConfigProvider.ts` for the current order.

## Per-command and environment RPC overrides

To select a specific RPC for one command:

```sh
0xweb rpc eth_chainId --chain eth --endpoint "https://rpc.example.invalid/your-project-token" --json
```

This changes the RPC, not explorer configuration. The example URL is a
placeholder and will not serve requests.

The built-in Ethereum RPC defaults can also be replaced through `RPC_ETH` in
the process environment. For example, in PowerShell:

```powershell
$env:RPC_ETH = 'https://rpc.example.invalid/your-project-token'
0xweb rpc eth_chainId --chain eth --json
```

Environment RPC values populate the defaults before file configuration is
loaded, so later endpoint settings can override them. Use `--endpoint` for an
explicit per-command selection. Do not assume an environment variable named
after an explorer key is supported; configure explorer keys in YAML.

## Verify each connection separately

After configuration, check the chain ID and an explorer-backed metadata lookup:

```sh
0xweb rpc eth_chainId --chain eth --json
0xweb contract info eth:0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419 --json
```

Add `--local` to both commands when using the local main configuration. Confirm
the RPC result identifies Ethereum mainnet (chain ID 1). The metadata command
checks explorer-backed ABI/source retrieval; an RPC-only success does not prove
the explorer key works. Cached metadata can mask a remote request, so do not
claim credential validation unless a fresh explorer request actually succeeded.

For historical reads, also test the requested historical block against the
configured RPC. Do not change providers or retry indefinitely on quota errors;
report the failing service and the capacity or configuration needed.
