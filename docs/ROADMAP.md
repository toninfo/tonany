# TonAny 计划（TUI-only）

> 原则：**换皮 + 克制演进**。不改 agent 内核架构，不上桌面壳，不跟 ton / TonWorker 抢定位。  
> 产品线背景见 [PRODUCT_LINE.md](./PRODUCT_LINE.md)。

## 目标

把本仓从「Pi coding agent 快照」变成 **TonAny：本地 TUI 万能助理**。

一句话：常驻终端的 AI 助理，能读改跑、能用技能，默认帮你把眼前事办完。

## 已完成（本阶段）

- [x] 品牌换皮：`APP_NAME=tonany`，配置目录 `.tonany`，CLI `tonany`（保留 `pi` 别名）
- [x] 默认 system prompt：TonAny 通用助理人格（编码是能力之一，不是唯一身份）
- [x] 帮助文案 / update self 别名对齐
- [x] 产品线与本计划文档

## Phase A — 体验打磨（小改）

不碰架构，只改产品感觉：

1. 启动 logo / 标题统一为 TonAny
2. README / coding-agent 文档去 Pi 官网依赖，改成本仓说明
3. 默认主题与欢迎语轻微调整（仍用现有 TUI）
4. Windows 使用说明对齐（用户主环境）

## Phase B — 助理能力包（扩展，不塞 core）

用 skills / extensions，而不是改 `agent-core`：

| Pack | 内容 | 实现 |
|------|------|------|
| 默认 | 读改跑 + 问答 | 现有 tools |
| `memory`（轻量） | 用户偏好笔记 | skill + 本地 markdown，先不做向量库 |
| `handoff`（可选） | 提示何时交给 ton / TonWorker | prompt template / skill |

权限保持现状：project trust + 用户确认习惯；暂不引入复杂权限档位 UI。

## Phase C — 家族互通（以后）

仅在 ton / TonWorker 侧也准备好时再做：

```text
TonHandOff { intent, brief, cwd?, permission }
```

TonAny 产出摘要交办；结果可写回本地笔记。本阶段只预留文档约定，不写跨仓代码。

## 明确不做（当前）

- Electron / Tauri 桌面壳
- 重写 TUI / 换 UI 框架
- 合并 ton / TonWorker 引擎
- 大规模 npm scope 再命名（`@tonany/pi-*` 内部包名可暂留）
- 主动回连上游 `pi.dev`

## 本地使用

```bash
# Node >= 22.19
npm install --ignore-scripts
npm run hydrate:model-data
npm run build:offline
./tonany-test.sh          # 或 ./pi-test.sh
# 安装后：tonany
```

配置目录：`~/.tonany/agent/`，项目本地：`.tonany/`。
