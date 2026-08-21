# Security Policy

tonany 是基于 Pi 源码快照的本地 coding agent。默认以运行它的用户权限工作；隔离边界由你自己的容器 / 沙箱策略决定。

本仓库**不**向 `security@earendil.com` 或上游 GitHub Security Advisories 报告问题——那些是上游项目渠道。

## Reporting a Vulnerability

请通过本仓库的私有渠道报告（GitHub Security Advisories，或仓库维护者约定的私下联系方式）。报告请包含：

- 影响与危害描述
- 复现步骤 / PoC / 相关日志
- 受影响 package、版本、commit 或配置
- 已知缓解手段（如有）

不要为安全问题开公开 issue。

## Trust Boundary Notes

- 用户主目录、workspace、shell 启动脚本、环境变量、agent 配置若已被攻击者写入，通常不视为独立漏洞，除非能证明本工具越权提升了 OS 权限边界。
- 扩展、skills、不可信仓库内的指令文件都可造成 prompt injection；请只在可信环境中加载第三方扩展。
