# Vendor Snapshot

本仓库（`toninfo/tonany`）基于开源项目 **Pi Agent Harness** 的源码快照独立演进，**不是**上游仓库的 fork，也不保留与上游的 git remote / submodule / 发布流水线绑定。

## 快照来源

| 字段 | 值 |
|------|-----|
| 上游仓库 | https://github.com/earendil-works/pi |
| 快照提交 | `5cd93f688aaab89dbb6dfa4aca535f21796ae185` |
| 提交说明 | feat(coding-agent): add development pi wrapper |
| 提交时间 | 2026-08-20 15:59:38 +0200 |
| 许可证 | MIT（见 `LICENSE`，原作者 Copyright (c) 2025 Mario Zechner） |

## 已做的脱离处理

1. **无上游 git 历史**：仅复制工作树文件，不引入上游 `.git` / submodule。
2. **npm scope**：`@earendil-works/pi-*` → `@tonany/pi-*`（外部依赖 `@earendil-works/gondolin` 保留）。
3. **package.json repository**：全部指向 `github.com/toninfo/tonany`。
4. **移除上游社区门禁 CI**：contributor gate、issue auto-close、triage、model-catalog 发布等到上游服务的工作流。
5. **运行时默认不回连上游**：
   - 版本检查 / 安装遥测 / 远程模型目录默认关闭
   - 可通过 `PI_LATEST_VERSION_URL`、`PI_REPORT_INSTALL_URL`、`PI_MODEL_CATALOG_URL`、`PI_SHARE_VIEWER_URL` 自建端点

## 说明

- CHANGELOG / 回归测试注释中仍可能出现上游 issue 链接，作为历史溯源保留，不构成 git 或运行时依赖。
- 后续定制请只在本仓库推进；不要再把 `earendil-works/pi` 加为 remote。
