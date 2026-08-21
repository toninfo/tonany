# tonany

基于 [Pi Agent Harness](https://github.com/earendil-works/pi) 源码快照的**独立定制仓库**。已切断与上游的 git / npm scope / 默认运行时回连关系，详见 [VENDOR_SNAPSHOT.md](VENDOR_SNAPSHOT.md)。

## Packages

| Package | Description |
|---------|-------------|
| **[@tonany/pi-coding-agent](packages/coding-agent)** | Interactive coding agent CLI |
| **[@tonany/pi-agent-core](packages/agent)** | Agent runtime with tool calling and state management |
| **[@tonany/pi-ai](packages/ai)** | Unified multi-provider LLM API |
| **[@tonany/pi-tui](packages/tui)** | Terminal UI library with differential rendering |
| **[@tonany/pi-telemetry](packages/telemetry)** | Vendor-neutral telemetry contracts |
| **[@tonany/pi-protocol](packages/protocol)** | Client/server protocol types |
| **[@tonany/pi-client](packages/client)** | Session client |
| **[@tonany/pi-server](packages/server)** | Session server |

## Development

```bash
npm install --ignore-scripts  # 安装依赖（跳过 lifecycle scripts）
npm run build                 # 构建全部 packages
npm run build:offline         # 使用已有 model data，不访问网络
npm run check                 # lint / format / typecheck
./test.sh                     # 测试（无 API key 时跳过 LLM 相关用例）
./pi-test.sh                  # 从源码运行 pi（任意目录可执行）
```

## 与上游的差异（定制基线）

- npm scope：`@tonany/*`
- 默认不探测 `pi.dev` 版本、不上报安装遥测、不拉取上游模型目录
- 自建端点（可选）：
  - `PI_LATEST_VERSION_URL`
  - `PI_REPORT_INSTALL_URL`
  - `PI_MODEL_CATALOG_URL`
  - `PI_SHARE_VIEWER_URL`

## License

MIT。上游版权归 Mario Zechner；本仓库后续修改版权归 toninfo/tonany 贡献者。完整条款见 [LICENSE](LICENSE)。
