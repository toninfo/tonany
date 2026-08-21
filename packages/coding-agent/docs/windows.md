# Windows Setup

TonAny 在 Windows 上需要 bash 来跑 `bash` 工具。探测顺序：

1. `~/.tonany/agent/settings.json` 里的自定义 `shellPath`
2. Git Bash（`C:\Program Files\Git\bin\bash.exe`）
3. PATH 上的 `bash.exe`（Cygwin / MSYS2 / WSL）

多数用户安装 [Git for Windows](https://git-scm.com/download/win) 即可。

## Custom Shell Path

编辑 `%USERPROFILE%\.tonany\agent\settings.json`：

```json
{
  "shellPath": "C:\\cygwin64\\bin\\bash.exe"
}
```

或指向 Git Bash：

```json
{
  "shellPath": "C:\\Program Files\\Git\\bin\\bash.exe"
}
```

## Run from source (PowerShell)

```powershell
cd path\to\tonany
npm install --ignore-scripts
npm run hydrate:model-data
npm run build:offline
.\tonany-test.ps1
# 或：.\tonany-test.bat
```

全局安装后：

```powershell
tonany
```

`pi` 仍是别名，行为相同。

## Paths

| 用途 | 路径 |
|------|------|
| 用户配置 | `%USERPROFILE%\.tonany\agent\` |
| 项目扩展 / skills | `<project>\.tonany\` |
| 会话 | `%USERPROFILE%\.tonany\agent\sessions\`（可用环境变量覆盖） |

环境变量示例：

```powershell
$env:TONANY_CODING_AGENT_DIR="D:\tonany-agent"
```

## Tips

- 终端推荐 Windows Terminal；UTF-8 代码页更稳。
- 若工具里的 POSIX 命令失败，确认 Git Bash / WSL 在 PATH 上。
- 不要用「未安装 bash」的纯 `cmd.exe` 期望 `bash` 工具可用。
