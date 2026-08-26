<details>
<summary><b>🌐 Language / 语言: 简体中文 ▾</b></summary>

- [简体中文](README.md)（默认）
- [English](README.en.md)

</details>

# TonAny

[产品站](https://ton.ren/tonany/) · [Issues](https://github.com/toninfo/tonany/issues) · [Releases](https://github.com/toninfo/tonany/releases)

**本地优先的万能 AI 助理。** TonAny 常驻你的终端，交付的是**办完的事**，而不只是对话：整理目录、改代码、跑命令、记住偏好；遇到长程工程或办公交付，再交办给兄弟产品。

它跑在你自己的机器上，不绑定任何模型：自带 Anthropic、OpenAI、Google 等 API key，或接本地兼容端点。默认不回连上游服务；数据只通过*你选择*的模型离开本机。

属于 [toninfo](https://github.com/toninfo) 产品线：

| 产品 | 定位 | 形态 |
|------|------|------|
| [ton](https://github.com/toninfo/ton) | 驱动 agent 做长程工程 | Go TUI 编排器 |
| [TonWorker](https://github.com/toninfo/tonworker) | AI 同事，主打办公交付 | 桌面端 |
| **TonAny**（本仓） | AI 助理，干眼前万事 | TUI / CLI |

更多：[产品线](docs/PRODUCT_LINE.md) · [路线图](docs/ROADMAP.md) · [上游快照](VENDOR_SNAPSHOT.md)

## 工作原理

1. 在项目目录启动 TonAny，用自然语言描述想要的结果。
2. 它用 `read` / `write` / `edit` / `bash`（以及 skills）在本地把事做完。
3. 需要跨会话记住偏好时，走 `/skill:memory`（本地 markdown，不做向量库）。
4. 任务变成「长程工程」或「办公交付」时，用 `/skill:handoff` 产出 `TonHandOff` brief，交给 [ton](https://github.com/toninfo/ton) 或 [TonWorker](https://github.com/toninfo/tonworker)。

```text
┌──────────────────────────────────────────────┐
│                 TonAny TUI                   │  交互 · 会话 · 扩展
├──────────────────────────────────────────────┤
│     agent loop（@tonany/pi-coding-agent）    │  工具 · skills · 权限/信任
├──────────────┬───────────────┬───────────────┤
│  本地文件    │  你的模型 Key │  handoff brief│
│  与终端      │  任意提供商   │  → ton / TW   │
└──────────────┴───────────────┴───────────────┘
```

## 它能做什么

- **眼前事直接干** — 读改文件、跑命令、解释仓库、整理工作区。
- **可扩展** — TypeScript Extensions、Skills、Prompt Templates、Themes；项目级放 `.tonany/`。
- **轻量记忆** — `/skill:memory` 把偏好写到 `~/.tonany/agent/memory/`。
- **产品线交办** — `/skill:handoff` 生成交办摘要，不假装远程拉起对面进程。
- **四种模式** — 交互 TUI、print/JSON、RPC、SDK 嵌入。

## 自带模型

模型访问权属于你：订阅 `/login`，或环境变量 / `auth.json` 里的 API key。内置多厂商目录（Anthropic、OpenAI、Gemini、DeepSeek、OpenRouter、Ollama 兼容等）。详见 [packages/coding-agent/docs/providers.md](packages/coding-agent/docs/providers.md)。

## 从源码运行

前置：**Node.js ≥ 22.19**。

```bash
git clone https://github.com/toninfo/tonany.git
cd tonany

npm install --ignore-scripts
npm run hydrate:model-data   # 首次：生成 providers 模型数据
npm run build:offline
./tonany-test.sh             # Windows: .\tonany-test.ps1 或 .\tonany-test.bat
```

构建后也可：

```bash
npm install -g --ignore-scripts ./packages/coding-agent
tonany
# `pi` 仍是别名
```

| 路径 | 用途 |
|------|------|
| `~/.tonany/agent/` | 全局配置、凭据、会话、记忆 |
| `.tonany/` | 项目扩展 / skills / prompts |
| `TONANY_CODING_AGENT_DIR` | 覆盖配置目录 |

Windows 说明：[packages/coding-agent/docs/windows.md](packages/coding-agent/docs/windows.md) · 快速上手：[docs/quickstart](packages/coding-agent/docs/quickstart.md)

### 鉴权示例

```bash
tonany
/login

# 或
export ANTHROPIC_API_KEY=sk-ant-...
tonany
```

## 仓库结构

| 目录 | 内容 |
|------|------|
| `packages/coding-agent/` | TonAny CLI / TUI、skills、会话 |
| `packages/agent/` | Agent 运行时 |
| `packages/ai/` | 多厂商 LLM API |
| `packages/tui/` | 终端 UI |
| `packages/{protocol,client,server}/` | 会话协议与服务 |
| `docs/` | 产品线与路线图 |
| `.tonany/` | 本仓项目级 skills / prompts |

## 基于 Pi harness

TonAny 的 agent 内核来自开源 [Pi](https://github.com/earendil-works/pi) 源码快照，已切断上游 git / 默认运行时回连，并换皮为 TonAny。细节见 [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md)。

## 开发

```bash
npm run build:offline
npm run check
./test.sh
```

产品站在 [toninfo/ton](https://github.com/toninfo/ton) 的 `extras/web/`（含 TonAny 页），线上：https://ton.ren/tonany/

贡献约定见 [CONTRIBUTING.md](CONTRIBUTING.md)。安全报告见 [SECURITY.md](SECURITY.md)。

## 隐私

本地优先：会话、设置、记忆与 Key 在本机。默认关闭上游版本检查与安装遥测；若需自建端点，见路线图中的环境变量说明。

## 许可证

MIT。上游版权归 Mario Zechner；本仓库后续修改归 toninfo / TonAny 贡献者。见 [LICENSE](LICENSE)。
