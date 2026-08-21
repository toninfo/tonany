# TonAny

本地优先的 **万能 AI 助理（TUI）**。基于 Pi agent harness 源码快照独立演进，属于 toninfo 产品线：

| 产品 | 定位 |
|------|------|
| [ton](https://github.com/toninfo/ton) | 驱动 agent 做长程工程 |
| [TonWorker](https://github.com/toninfo/tonworker) | AI 同事，主打办公 |
| **TonAny**（本仓） | AI 助理，干眼前万事 |

详见 [docs/PRODUCT_LINE.md](docs/PRODUCT_LINE.md) 与 [docs/ROADMAP.md](docs/ROADMAP.md)。上游快照说明见 [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md)。

## Quick Start

```bash
npm install --ignore-scripts
npm run hydrate:model-data   # 首次需要
npm run build:offline
./tonany-test.sh             # 从源码跑；亦可 ./pi-test.sh
```

全局安装（构建后）：

```bash
npm install -g --ignore-scripts ./packages/coding-agent
tonany
```

配置目录：`~/.tonany/agent/`；项目扩展：`.tonany/`。

## Packages

| Package | Description |
|---------|-------------|
| **[@tonany/pi-coding-agent](packages/coding-agent)** | TonAny TUI / CLI |
| **[@tonany/pi-agent-core](packages/agent)** | Agent runtime |
| **[@tonany/pi-ai](packages/ai)** | Multi-provider LLM API |
| **[@tonany/pi-tui](packages/tui)** | Terminal UI |
| **[@tonany/pi-telemetry](packages/telemetry)** | Telemetry contracts |
| **[@tonany/pi-protocol](packages/protocol)** | Client/server protocol |
| **[@tonany/pi-client](packages/client)** | Session client |
| **[@tonany/pi-server](packages/server)** | Session server |

## Development

```bash
npm run build                 # 构建（会刷新 model data）
npm run build:offline         # 离线构建
npm run check                 # lint / format / typecheck
./test.sh                     # 测试
./tonany-test.sh --help
```

## License

MIT。上游版权归 Mario Zechner；本仓库修改归 toninfo / TonAny 贡献者。见 [LICENSE](LICENSE)。
