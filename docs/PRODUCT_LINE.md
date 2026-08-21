# toninfo 产品线

| 产品 | 定位 | 形态 | 仓库 |
|------|------|------|------|
| **ton** | 驱动 agent 做长程工程 | Go TUI 编排器 | [toninfo/ton](https://github.com/toninfo/ton) |
| **TonWorker** | AI 同事，主打办公交付 | Tauri 桌面 + Python agent | [toninfo/tonworker](https://github.com/toninfo/tonworker) |
| **TonAny** | AI 助理，干眼前万事 | TUI agent harness（本仓） | [toninfo/tonany](https://github.com/toninfo/tonany) |

## 分工

- **ton**：Clarify → Plan → Execute → Verify ⇄ Repair；管「工程会话怎么被驱动」。
- **TonWorker**：文档/邮件/日历/连接器；管「办公成果怎么被交付」。
- **TonAny**：本地优先的通用助理入口；管「人怎么被服务」——问答、文件、命令、技能，短任务自己干。

## 红线

- TonAny **现阶段不做**桌面壳（不跟 TonWorker 抢桌面）。
- TonAny **不做** ton 的长程 verify/repair 编排。
- TonAny **首发不做** 25+ 办公连接器。
- 专活以后用交办协议转给 ton / TonWorker，而不是在本仓重造。

## 用户心智

```text
要搞定一个工程任务     → ton
要搞定办公交付物       → TonWorker
要处理眼前这件事 / 杂务 → TonAny
```
