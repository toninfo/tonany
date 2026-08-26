<details>
<summary><b>🌐 Language / 语言: English ▾</b></summary>

- [简体中文](README.md) (default)
- [English](README.en.md)

</details>

# TonAny

[Product site](https://ton.ren/tonany/) · [Issues](https://github.com/toninfo/tonany/issues) · [Releases](https://github.com/toninfo/tonany/releases)

**Local-first universal AI assistant.** TonAny lives in your terminal and delivers **finished work**, not just chat: tidy folders, edit code, run commands, remember preferences — and hand off to sibling products when the job is long engineering or office delivery.

It runs on your machine and does not lock you into a model: bring API keys for Anthropic, OpenAI, Google, and others, or point at a local-compatible endpoint. No upstream phone-home by default; data leaves your machine only through the models *you* choose.

Part of the [toninfo](https://github.com/toninfo) product line:

| Product | Role | Shape |
|---------|------|-------|
| [ton](https://github.com/toninfo/ton) | Drive agents on long engineering sessions | Go TUI orchestrator |
| [TonWorker](https://github.com/toninfo/tonworker) | AI coworker for office deliverables | Desktop app |
| **TonAny** (this repo) | AI assistant for whatever is in front of you | TUI / CLI |

More: [product line](docs/PRODUCT_LINE.md) · [roadmap](docs/ROADMAP.md) · [vendor snapshot](VENDOR_SNAPSHOT.md)

## How it works

1. Start TonAny in a project directory and describe the outcome you want.
2. It uses `read` / `write` / `edit` / `bash` (plus skills) to get it done locally.
3. For cross-session preferences, use `/skill:memory` (local markdown — no vector DB).
4. When the job becomes long engineering or office delivery, `/skill:handoff` drafts a `TonHandOff` brief for [ton](https://github.com/toninfo/ton) or [TonWorker](https://github.com/toninfo/tonworker).

```text
┌──────────────────────────────────────────────┐
│                 TonAny TUI                   │  interaction · sessions · extensions
├──────────────────────────────────────────────┤
│     agent loop (@tonany/pi-coding-agent)     │  tools · skills · trust
├──────────────┬───────────────┬───────────────┤
│  local files │  your model   │  handoff brief│
│  & terminal  │  any provider │  → ton / TW   │
└──────────────┴───────────────┴───────────────┘
```

## What it can do

- **Handle the moment** — read/edit files, run commands, explain a repo, tidy a workspace.
- **Stay extensible** — TypeScript Extensions, Skills, Prompt Templates, Themes under `.tonany/`.
- **Light memory** — `/skill:memory` writes preferences to `~/.tonany/agent/memory/`.
- **Product-line handoff** — `/skill:handoff` produces a brief; it does not pretend to remote-launch siblings.
- **Four modes** — interactive TUI, print/JSON, RPC, and SDK embedding.

## Bring your own model

Model access is yours: `/login` for subscriptions, or API keys via env / `auth.json`. Built-in multi-provider catalogs (Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama-compatible, and more). See [packages/coding-agent/docs/providers.md](packages/coding-agent/docs/providers.md).

## Run from source

Requires **Node.js ≥ 22.19**.

```bash
git clone https://github.com/toninfo/tonany.git
cd tonany

npm install --ignore-scripts
npm run hydrate:model-data   # first time: hydrate provider model data
npm run build:offline
./tonany-test.sh             # Windows: .\tonany-test.ps1 or .\tonany-test.bat
```

After build you can also:

```bash
npm install -g --ignore-scripts ./packages/coding-agent
tonany
# `pi` remains an alias
```

| Path | Purpose |
|------|---------|
| `~/.tonany/agent/` | Global config, credentials, sessions, memory |
| `.tonany/` | Project extensions / skills / prompts |
| `TONANY_CODING_AGENT_DIR` | Override config directory |

Windows: [packages/coding-agent/docs/windows.md](packages/coding-agent/docs/windows.md) · Quickstart: [packages/coding-agent/docs/quickstart.md](packages/coding-agent/docs/quickstart.md)

### Auth examples

```bash
tonany
/login

# or
export ANTHROPIC_API_KEY=sk-ant-...
tonany
```

## Repository layout

| Directory | Contents |
|-----------|----------|
| `packages/coding-agent/` | TonAny CLI / TUI, skills, sessions |
| `packages/agent/` | Agent runtime |
| `packages/ai/` | Multi-provider LLM API |
| `packages/tui/` | Terminal UI |
| `packages/{protocol,client,server}/` | Session protocol and services |
| `docs/` | Product line and roadmap |
| `.tonany/` | Project-level skills / prompts for this repo |

## Built on the Pi harness

TonAny’s agent core comes from an open-source [Pi](https://github.com/earendil-works/pi) source snapshot — detached from upstream git and default phone-home, then rebranded. Details: [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md).

## Development

```bash
npm run build:offline
npm run check
./test.sh
```

Product site lives in [toninfo/ton](https://github.com/toninfo/ton) `extras/web/` (includes the TonAny page). Live: https://ton.ren/tonany/

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

## Privacy

Local-first: sessions, settings, memory, and keys stay on your machine. Upstream version checks and install telemetry are off by default; optional self-hosted endpoints are documented in the roadmap.

## License

MIT. Upstream copyright Mario Zechner; subsequent changes © toninfo / TonAny contributors. See [LICENSE](LICENSE).
