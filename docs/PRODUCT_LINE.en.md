# toninfo product line

**English** | [简体中文](PRODUCT_LINE.md)

| Product | Role | Shape | Status | Repo |
|---------|------|-------|--------|------|
| **ton** | Drive agents on long engineering work | Go TUI orchestrator | Available | [toninfo/ton](https://github.com/toninfo/ton) |
| **TonWorker** | AI coworker for office deliverables | Tauri desktop + Python agent | Available | [toninfo/tonworker](https://github.com/toninfo/tonworker) |
| **TonAny** | AI assistant for whatever is in front of you | TUI agent harness (this repo) | Rebranded; iterating UX | [toninfo/tonany](https://github.com/toninfo/tonany) |

## Split

- **ton**: Clarify → Plan → Execute → Verify ⇄ Repair — how engineering sessions are driven.
- **TonWorker**: docs / mail / calendar / connectors — how office outcomes are delivered.
- **TonAny**: local-first assistant entry — how the person is served (Q&A, files, commands, skills).

## Handoff

TonAny ships `/skill:handoff`: decide whether to do the work locally or hand off to ton / TonWorker, and produce a `TonHandOff` brief (no remote process launch in this phase).

## Red lines

- TonAny does **not** ship a desktop shell for now (no competing with TonWorker’s desktop).
- TonAny does **not** reimplement ton’s verify/repair loop.
- TonAny does **not** ship TonWorker’s connector suite as a first feature.
- Specialist work uses the handoff brief protocol.

## Product site

Hub + three product pages live in [`extras/web/`](../extras/web/) (TON.REN style, brand red). Syncing back to `toninfo/ton`’s `extras/web` needs write access to that repo.

## Mental model

```text
Long engineering task     → ton
Office deliverable        → TonWorker
Whatever is in front of you → TonAny
```
