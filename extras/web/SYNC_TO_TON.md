# Sync note

This `extras/web` tree is the TON.REN product site with **TON / TonWorker / TonAny**.

Canonical host historically lives in `toninfo/ton` (`extras/web`). This Cloud Agent
could not push to `toninfo/ton` (403). After write access is granted, copy this
directory over `toninfo/ton/extras/web` (or merge the branch from a machine that can).

Preview:

```bash
cd extras/web && python3 -m http.server 8080
```
