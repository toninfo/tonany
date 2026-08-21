# TON.REN product website

**English** | [简体中文](README.zh-CN.md)

Static site for **TON.REN**: hub plus product pages for **TON** (CLI/TUI),
**TonWorker** (desktop coworker), and **TonAny** (universal TUI assistant).
Shared dark theme with brand red accents, EN/ZH UI.

## Preview

```bash
cd extras/web
python3 -m http.server 8080
# http://127.0.0.1:8080/           → hub
# http://127.0.0.1:8080/ton/       → TON
# http://127.0.0.1:8080/tonworker/ → TonWorker
# http://127.0.0.1:8080/tonany/    → TonAny
```

## Structure

```text
extras/web/
  index.html           # hub (three product entries)
  ton/index.html       # TON product
  tonworker/index.html # TonWorker product
  tonany/index.html    # TonAny product
  css/styles.css
  js/main.js           # install/download, i18n, UI
  assets/
```

## Navigation

- Hub brand **TON.REN** only in the header; product choice is the three cards below.
- Product pages: logo returns to hub; header pills switch **TON | TonWorker | TonAny**.
