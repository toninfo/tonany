<details>
<summary><b>🌐 Language / 语言: 简体中文 ▾</b></summary>

- [简体中文](README.md)（默认）
- [English](README.en.md)

</details>

# TonAny

[产品站](extras/web/) · [Issues](https://github.com/toninfo/tonany/issues) · [Releases](https://github.com/toninfo/tonany/releases)

**本地优先的万能 AI 助理（TUI）。** TonAny 常驻终端，交付的是**办完的事**，而不只是聊天：读文件、改代码、跑命令、记偏好，需要长程工程或办公交付时再交办给兄弟产品。

属于 toninfo 产品线：

| 产品 | 定位 | 形态 |
|------|------|------|
| [ton](https://github.com/toninfo/ton) | 驱动 agent 做长程工程 | Go TUI 编排器 |
| [TonWorker](https://github.com/toninfo/tonworker) | AI 同事，主打办公交付 | 桌面端 |
| **TonAny**（本仓） | AI 助理，干眼前万事 | TUI / CLI |

产品线说明见 [docs/PRODUCT_LINE.md](docs/PRODUCT_LINE.md)，路线图见 [docs/ROADMAP.md](docs/ROADMAP.md)。上游 Pi 快照溯源见 [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md)。

## 快速开始

前置：**Node.js ≥ 22.19**。

```bash
git clone https://github.com/toninfo/tonany.git
cd tonany
npm install --ignore-scripts
npm run hydrate:model-data   # 首次需要，拉取模型目录数据
npm run build:offline
./tonany-test.sh             # Windows: .\tonany-test.ps1
```

全局安装（构建后）：

```bash
npm install -g --ignore-scripts ./packages/coding-agent
tonany
# pi 仍是别名
```

配置目录：`~/.tonany/agent/`；项目扩展 / skills：`.tonany/`。Windows 详见 [packages/coding-agent/docs/windows.md](packages/coding-agent/docs/windows.md)。

## 鉴权

```bash
# 订阅
tonany
/login

# 或 API Key
export ANTHROPIC_API_KEY=sk-ant-...
tonany
```

## 能力与交办

默认工具：`read` / `write` / `edit` / `bash`。内置 skills：

```text
/skill:memory    # 本地 markdown 偏好记忆
/skill:handoff   # 产出 TonHandOff brief → ton / TonWorker
```

- 短任务、本地文件、问答 → **TonAny 自己干**
- 长程工程循环 → **ton**
- 办公连接器 / 交付物 → **TonWorker**

## Packages

| Package | 说明 |
|---------|------|
| [@tonany/pi-coding-agent](packages/coding-agent) | TonAny TUI / CLI |
| [@tonany/pi-agent-core](packages/agent) | Agent 运行时 |
| [@tonany/pi-ai](packages/ai) | 多厂商 LLM API |
| [@tonany/pi-tui](packages/tui) | 终端 UI |
| [@tonany/pi-telemetry](packages/telemetry) | Telemetry 契约 |
| [@tonany/pi-protocol](packages/protocol) | 协议类型 |
| [@tonany/pi-client](packages/client) | Session 客户端 |
| [@tonany/pi-server](packages/server) | Session 服务端 |

## 开发

```bash
npm run build:offline
npm run check
./test.sh
./tonany-test.sh --help
```

产品站预览：

```bash
cd extras/web && python3 -m http.server 8080
```

## 隐私

默认不回连上游 `pi.dev`。版本检查 / 安装遥测 / 远程模型目录需自建端点后才会启用（见 `docs/ROADMAP.md`）。

## 许可证

MIT。上游版权归 Mario Zechner；本仓库修改归 toninfo / TonAny 贡献者。见 [LICENSE](LICENSE)。
