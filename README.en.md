<details>
<summary><b>🌐 Language / 语言: English ▾</b></summary>

- [简体中文](README.md) (default)
- [English](README.en.md)

</details>

# TonAny

[Product site](extras/web/) · [Issues](https://github.com/toninfo/tonany/issues) · [Releases](https://github.com/toninfo/tonany/releases)

**Local-first universal AI assistant (TUI).** TonAny lives in your terminal and aims for **finished work**, not just chat: read files, edit code, run commands, remember preferences — and hand off to sibling products when the job is long engineering or office delivery.

Part of the toninfo product line:

| Product | Role | Shape |
|---------|------|-------|
| [ton](https://github.com/toninfo/ton) | Drive agents on long engineering sessions | Go TUI orchestrator |
| [TonWorker](https://github.com/toninfo/tonworker) | AI coworker for office deliverables | Desktop app |
| **TonAny** (this repo) | AI assistant for whatever is in front of you | TUI / CLI |

See [docs/PRODUCT_LINE.md](docs/PRODUCT_LINE.md), [docs/ROADMAP.md](docs/ROADMAP.md), and [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md) for lineage from the Pi harness snapshot.

## Quick start

Requires **Node.js ≥ 22.19**.

```bash
git clone https://github.com/toninfo/tonany.git
cd tonany
npm install --ignore-scripts
npm run hydrate:model-data   # first time: hydrate model catalogs
npm run build:offline
./tonany-test.sh             # Windows: .\tonany-test.ps1
```

Global install after build:

```bash
npm install -g --ignore-scripts ./packages/coding-agent
tonany
# `pi` remains an alias
```

Config: `~/.tonany/agent/`. Project extensions/skills: `.tonany/`. Windows notes: [packages/coding-agent/docs/windows.md](packages/coding-agent/docs/windows.md).

## Auth

```bash
# Subscription
tonany
/login

# Or API key
export ANTHROPIC_API_KEY=sk-ant-...
tonany
```

## Skills & handoff

Default tools: `read` / `write` / `edit` / `bash`. Built-in skills:

```text
/skill:memory    # local markdown preferences
/skill:handoff   # draft TonHandOff brief → ton / TonWorker
```

- Short local tasks → **TonAny**
- Long engineering loops → **ton**
- Office connectors / deliverables → **TonWorker**

## Packages

| Package | Description |
|---------|-------------|
| [@tonany/pi-coding-agent](packages/coding-agent) | TonAny TUI / CLI |
| [@tonany/pi-agent-core](packages/agent) | Agent runtime |
| [@tonany/pi-ai](packages/ai) | Multi-provider LLM API |
| [@tonany/pi-tui](packages/tui) | Terminal UI |
| [@tonany/pi-telemetry](packages/telemetry) | Telemetry contracts |
| [@tonany/pi-protocol](packages/protocol) | Protocol types |
| [@tonany/pi-client](packages/client) | Session client |
| [@tonany/pi-server](packages/server) | Session server |

## Development

```bash
npm run build:offline
npm run check
./test.sh
./tonany-test.sh --help
```

Preview the product site:

```bash
cd extras/web && python3 -m http.server 8080
```

## Privacy

No upstream `pi.dev` phone-home by default. Optional self-hosted endpoints are documented in `docs/ROADMAP.md`.

## License

MIT. Upstream copyright Mario Zechner; subsequent changes © toninfo / TonAny contributors. See [LICENSE](LICENSE).
