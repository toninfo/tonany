# Quickstart

从安装到第一次有用的 TonAny 会话。

## Install

从本仓源码（推荐开发）：

```bash
# Node >= 22.19
npm install --ignore-scripts
npm run hydrate:model-data
npm run build:offline
./tonany-test.sh
```

或安装 coding-agent 包：

```bash
npm install -g --ignore-scripts @tonany/pi-coding-agent
tonany
```

`--ignore-scripts` 会跳过依赖生命周期脚本；正常安装不需要 install scripts。

### Uninstall

```bash
npm uninstall -g @tonany/pi-coding-agent
```

卸载不会删除 `~/.tonany/agent/` 下的设置、凭据、会话和已装包。

在项目目录启动：

```bash
cd /path/to/project
tonany
```

Windows 见 [windows.md](windows.md)。

## Authenticate

### 订阅登录

```text
/login
```

可选 Claude Pro/Max、ChatGPT Plus/Pro (Codex)、GitHub Copilot 等。

### API key

```bash
# PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-..."
tonany

# bash
export ANTHROPIC_API_KEY=sk-ant-...
tonany
```

也可用 `/login` 把 API key 写入 `~/.tonany/agent/auth.json`。

详见 [Providers](providers.md)。

## First session

```text
Summarize this repository and tell me how to run its checks.
```

默认工具：`read` / `write` / `edit` / `bash`。更多能力用 skills：

```text
/skill:memory
/skill:handoff
```

## Product line

| 产品 | 何时用 |
|------|--------|
| **TonAny** | 眼前事、本地文件、短任务、助理问答 |
| **ton** | 长程工程编排（clarify → plan → execute → verify） |
| **TonWorker** | 办公交付与连接器 |

交办说明：`/skill:handoff`。产品线总览：仓库根目录 `docs/PRODUCT_LINE.md`。
