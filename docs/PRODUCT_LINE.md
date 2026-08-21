# toninfo 产品线

[English](PRODUCT_LINE.en.md) | **简体中文**

| 产品 | 定位 | 形态 | 状态 | 仓库 |
|------|------|------|------|------|
| **ton** | 驱动 agent 做长程工程 | Go TUI 编排器 | 可用 | [toninfo/ton](https://github.com/toninfo/ton) |
| **TonWorker** | AI 同事，主打办公交付 | Tauri 桌面 + Python agent | 可用 | [toninfo/tonworker](https://github.com/toninfo/tonworker) |
| **TonAny** | AI 助理，干眼前万事 | TUI agent harness（本仓） | 换皮完成，体验迭代中 | [toninfo/tonany](https://github.com/toninfo/tonany) |

## 分工

- **ton**：Clarify → Plan → Execute → Verify ⇄ Repair；管「工程会话怎么被驱动」。
- **TonWorker**：文档/邮件/日历/连接器；管「办公成果怎么被交付」。
- **TonAny**：本地优先的通用助理入口；管「人怎么被服务」——问答、文件、命令、技能，短任务自己干。

## 交办

TonAny 内置 `/skill:handoff`：判断该自己干还是交给 ton / TonWorker，并产出 `TonHandOff` brief（本阶段不远程拉起对面进程）。

## 红线

- TonAny **现阶段不做**桌面壳（不跟 TonWorker 抢桌面）。
- TonAny **不做** ton 的长程 verify/repair 编排。
- TonAny **不做** TonWorker 那套办公连接器首发。
- 专活用交办协议转给 ton / TonWorker。

## 产品站

门户与三产品页在 [`extras/web/`](../extras/web/)（TON.REN 风格，品牌红）。同步回 `toninfo/ton` 的 `extras/web` 需 ton 仓写权限。

## 用户心智

```text
要搞定一个工程任务     → ton
要搞定办公交付物       → TonWorker
要处理眼前这件事 / 杂务 → TonAny
```
