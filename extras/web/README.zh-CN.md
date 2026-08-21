# TON.REN 产品站

[English](README.md) | **简体中文**

**TON.REN** 静态站：门户 + **TON**（CLI/TUI）、**TonWorker**（桌面同事）、**TonAny**（万能 TUI 助理）产品页。共用深色主题与品牌红点缀，中英界面。

## 本地预览

```bash
cd extras/web
python3 -m http.server 8080
# http://127.0.0.1:8080/           → 门户
# http://127.0.0.1:8080/ton/       → TON
# http://127.0.0.1:8080/tonworker/ → TonWorker
# http://127.0.0.1:8080/tonany/    → TonAny
```

## 目录结构

```text
extras/web/
  index.html           # 门户（三产品入口）
  ton/index.html       # TON 产品页
  tonworker/index.html # TonWorker 产品页
  tonany/index.html    # TonAny 产品页
  css/styles.css
  js/main.js
  assets/
```

## 导航

- 门户只在顶栏展示 **TON.REN**；下方三张卡片即产品入口。
- 产品页：Logo 回门户；顶栏胶囊 **TON | TonWorker | TonAny** 切换。
