/**
 * TON.REN site — hub + TON + TonWorker + TonAny.
 * Install/download picker, copy, tabs, mobile menu, i18n (en/zh).
 * Default locale: English. Preference persisted in localStorage.
 */

(() => {
  "use strict";

  const STORAGE_KEY = "ton-web-lang";
  const page = document.body?.dataset?.page || "ton";

  // —— i18n dictionaries ——
  const I18N = {
    en: {
      "meta.title": "TON — AI Engineering Session",
      "meta.description":
        "Local TUI for auditable coding-agent sessions. Clarify → Plan → Execute → Verify ⇄ Repair → Summarize.",
      "hub.meta.title": "TON.REN — Local AI tools",
      "hub.meta.description":
        "TON.REN — local AI tools. TON · TonWorker · TonAny.",
      "hub.lede": "Local AI tools. Pick what you need.",
      "hub.ton.kind": "CLI · TUI",
      "hub.ton.desc":
        "Auditable coding-agent sessions. Clarify → Plan → Execute → Verify.",
      "hub.tw.kind": "Desktop",
      "hub.tw.desc":
        "Everyday AI coworker. Finished work — docs, calendar, inbox — not just chat.",
      "hub.ta.kind": "CLI · TUI",
      "hub.ta.desc":
        "Universal AI assistant. Get anything done in the terminal — then hand off to TON or TonWorker when needed.",
      "hub.open": "Open →",
      "ta.meta.title": "TonAny — Universal AI assistant",
      "ta.meta.description":
        "Local-first TUI AI assistant. Get anything done in the terminal — hand off long engineering to TON, office deliverables to TonWorker.",
      "ta.eyebrow": "CLI · TUI · universal assistant",
      "ta.banner.text": "open source · MIT · local-first TUI",
      "ta.hero.subtitle":
        "Local-first AI assistant in your terminal. Handle the moment — hand off the rest.",
      "ta.install.source": "From source",
      "ta.install.run": "Run TUI",
      "ta.install.win": "Windows",
      "ta.features.title": "Assistant first. Specialist when needed.",
      "ta.terminal.aria": "TonAny TUI preview",
      "ta.terminal.phase": "Assist",
      "ta.terminal.you1":
        "Tidy this folder and remember I prefer concise replies",
      "ta.terminal.ta1":
        "On it — list → group → move. Preference saved via /skill:memory.",
      "ta.family.body":
        "TonAny handles the moment. Long engineering loops go to <code>TON</code>. Office deliverables go to <code>TonWorker</code>. Use <code>/skill:handoff</code> for a brief.",
      "ta.family.ton": "Engineering sessions · clarify → verify",
      "ta.family.tw": "Desktop coworker · deliverables",
      "ta.family.ta": "Universal assistant · TUI",
      "ta.privacy.title": "Local by default",
      "ta.privacy.body":
        "No upstream phone-home by default. Sessions and settings live under ~/.tonany. Bring your own model keys.",
      "ta.footer.tag": "Universal assistant · TUI · local-first.",
      "tw.meta.title": "TonWorker — AI that gets everyday work done",
      "tw.meta.description":
        "Local-first desktop AI coworker. Finished deliverables across your files and tools — with approval before consequential actions.",
      "tw.nav.download": "Download",
      "tw.nav.app": "App",
      "tw.nav.how": "How it works",
      "tw.eyebrow": "Desktop · local-first · MIT",
      "tw.banner.text": "open source · MIT · local-first",
      "tw.banner.cta": "Download",
      "tw.hero.subtitle":
        "Ask for finished work — a brief, a report, a calendar block — not another chat thread.",
      "tw.hero.see": "See the app →",
      "tw.showcase.title": "The desktop you actually get",
      "tw.showcase.sub":
        "Sidebar sessions, inbox approvals, plan steps, and deliverable files — same structure as the app.",
      "tw.ui.newSession": "+ New session",
      "tw.ui.coworker": "Coworker",
      "tw.ui.chat": "Chat",
      "tw.ui.code": "Code",
      "tw.ui.sessionName": "Weekly status report",
      "tw.ui.sessionName2": "Calendar cleanup",
      "tw.ui.inbox": "Inbox",
      "tw.ui.scheduled": "Scheduled",
      "tw.ui.connectors": "Connectors",
      "tw.ui.greeting": "What should we produce?",
      "tw.ui.plan": "Plan",
      "tw.ui.step1": "Fetch commits & PRs from GitHub",
      "tw.ui.step2": "Draft markdown summary",
      "tw.ui.step3": "Propose calendar hold for review",
      "tw.ui.approvalTitle": "Run a command",
      "tw.ui.allow": "Allow once",
      "tw.ui.deny": "Deny",
      "tw.ui.composer": "Message TonWorker…",
      "tw.ui.progress": "Progress",
      "tw.ui.todo1": "Fetch GitHub activity",
      "tw.ui.todo2": "Draft summary",
      "tw.ui.todo3": "Calendar proposal",
      "tw.ui.todo4": "Save artifact",
      "tw.ui.artifacts": "Artifacts",
      "tw.dl.macarm": "macOS · Apple Silicon",
      "tw.dl.macintel": "macOS · Intel",
      "tw.dl.win": "Windows",
      "tw.dl.linux": "Linux · AppImage",
      "tw.dl.releases": "All releases",
      "tw.dl.go": "Download",
      "tw.features.title": "Built for everyday work",
      "tw.f.personas.t": "Personas",
      "tw.f.personas.d":
        "Coworker, Chat, and Code surfaces — each with its own sessions, tools, and workspace rules.",
      "tw.f.inbox.t": "Inbox",
      "tw.f.inbox.d":
        "Approvals, questions, and unattended prompts land in one queue. Resolve without losing session context.",
      "tw.f.scheduled.t": "Scheduled",
      "tw.f.scheduled.d":
        "Morning briefs, weekly reports, standing watches — cron-style automations with full run transcripts.",
      "tw.f.connectors.t": "Connectors & MCP",
      "tw.f.connectors.d":
        "GitHub, Slack, Notion, HubSpot, Gmail, Calendar, terminal, files — plus any MCP server you wire in.",
      "tw.f.artifacts.t": "Artifacts",
      "tw.f.artifacts.d":
        "Deliverables show up as real files — preview markdown, PDF, sheets, and code in the right rail.",
      "tw.f.models.t": "Bring your model",
      "tw.f.models.d":
        "OpenAI, Anthropic, Gemini, DeepSeek, Kimi, Ollama, and more — switch per task, keys stay local.",
      "tw.download.title": "Download",
      "tw.download.sub":
        "macOS, Windows, and Linux builds from GitHub Releases.",
      "tw.preview.aria": "TonWorker preview",
      "tw.preview.you1":
        "Summarize this week's GitHub activity and draft a status note for my team.",
      "tw.preview.tw1":
        "Plan: pull commits → draft note → propose calendar block. Approve send?",
      "tw.preview.approve": "Approval required · calendar write",
      "tw.tools.title": "Your tools",
      "tw.tools.body":
        "Connect GitHub, Slack, Notion, HubSpot, and more — plus terminal, local files, and <code>MCP</code>.",
      "tw.tools.github": "Issues · PRs · status",
      "tw.tools.collab": "Drafts · docs",
      "tw.tools.cal": "Schedule · triage",
      "tw.tools.mcp": "Any reachable tool",
      "tw.how.title": "How it works",
      "tw.how.sub": "Outcome in. Deliverable out. You stay in the loop.",
      "tw.how.s1t": "Ask",
      "tw.how.s1": "Describe the outcome",
      "tw.how.s2t": "Plan",
      "tw.how.s2": "Steps across apps",
      "tw.how.s3t": "Approve",
      "tw.how.s3": "Writes & sends",
      "tw.how.s4t": "Deliver",
      "tw.how.s4": "Finished artifact",
      "tw.privacy.title": "Your data stays local",
      "tw.privacy.body":
        "Conversations, connector tokens, and model keys run and stay on your machine. Work context does not need to pass through a third-party cloud — less exposure, lower leak risk.",
      "tw.footer.tag": "Desktop coworker · deliverables · approvals.",
      "tw.footer.releases": "Releases",
      "nav.docs": "Docs",
      "nav.menu": "Menu",
      "nav.install": "Install",
      "nav.loop": "Loop",
      "lang.aria": "Language",
      "banner.aria": "Announcement",
      "banner.text": "v1.0 · open source · MIT",
      "banner.cta": "Install",
      "hero.subtitle": "Local TUI for auditable coding-agent sessions.",
      "install.go": "Go (add PATH)",
      "install.curl": "Linux / macOS",
      "install.ps1": "Windows",
      "install.build": "From source",
      "install.setup": "Configure LLM key",
      "install.copy": "Copy",
      "cta.start": "Install",
      "cta.guide": "Guide",
      "features.title": "One loop. Many drivers.",
      "terminal.aria": "TON TUI preview",
      "terminal.phase": "Clarify",
      "terminal.you1": "Build a static login page with dark mode",
      "terminal.ton1":
        "Got it — static HTML/CSS login with prefers-color-scheme. Light or dark default?",
      "terminal.oq": "Open questions",
      "terminal.oqHint": "defaults apply on /start",
      "terminal.oq1": "- Which page opens after login?",
      "drivers.body":
        "One state machine; swap backends. <code>fake</code> for CI; OpenCode / Claude / Cursor for real runs.",
      "drivers.opencode": "Default · local headless",
      "drivers.claude": "Claude CLI · long context",
      "drivers.cursor": "Cursor CLI · IDE bridge",
      "loop.title": "One closed loop",
      "loop.sub": "Gates when needed. Agent runs locally. Everything persisted.",
      "loop.clarify": "Goals & constraints",
      "loop.ready": "Confirm",
      "loop.plan": "Milestones",
      "loop.execute": "Unattended",
      "loop.verify": "Accept",
      "loop.repair": "Repair",
      "loop.summarize": "Summary",
      "footer.tag": "Local TUI · auditable agent sessions.",
      "footer.product": "Product",
      "footer.resources": "Resources",
      "footer.config": "Config",
      "footer.commands": "Commands",
      "footer.family": "Family",
    },
    zh: {
      "meta.title": "TON — AI Engineering Session",
      "meta.description":
        "本地 TUI，编排可审计的 coding-agent 会话。Clarify → Plan → Execute → Verify ⇄ Repair → Summarize。",
      "hub.meta.title": "TON.REN — 本地 AI 工具",
      "hub.meta.description":
        "TON.REN — 本地 AI 工具。TON · TonWorker · TonAny。",
      "hub.lede": "本地 AI 工具。按需选择。",
      "hub.ton.kind": "CLI · TUI",
      "hub.ton.desc": "可审计的 coding-agent 会话。Clarify → Plan → Execute → Verify。",
      "hub.tw.kind": "桌面端",
      "hub.tw.desc": "日常 AI 同事。交付完成的工作——文档、日历、收件箱，而不只是对话。",
      "hub.ta.kind": "CLI · TUI",
      "hub.ta.desc":
        "万能 AI 助理。终端里先把眼前事办完；需要时再交给 TON 或 TonWorker。",
      "hub.open": "进入 →",
      "ta.meta.title": "TonAny — 万能 AI 助理",
      "ta.meta.description":
        "本地优先的 TUI AI 助理。终端里干眼前万事；长程工程交给 TON，办公交付交给 TonWorker。",
      "ta.eyebrow": "CLI · TUI · 万能助理",
      "ta.banner.text": "开源 · MIT · 本地优先 TUI",
      "ta.hero.subtitle": "本地优先的终端 AI 助理。眼前事自己干，专活再交办。",
      "ta.install.source": "源码安装",
      "ta.install.run": "启动 TUI",
      "ta.install.win": "Windows",
      "ta.features.title": "先当助理，专活再交办",
      "ta.terminal.aria": "TonAny TUI 预览",
      "ta.terminal.phase": "Assist",
      "ta.terminal.you1": "整理这个目录，并记住我喜欢简洁回复",
      "ta.terminal.ta1": "收到 — 列表 → 归类 → 移动。偏好已写入 /skill:memory。",
      "ta.family.body":
        "TonAny 处理眼前事。长程工程交给 <code>TON</code>，办公交付交给 <code>TonWorker</code>。用 <code>/skill:handoff</code> 生成交办 brief。",
      "ta.family.ton": "工程会话 · clarify → verify",
      "ta.family.tw": "桌面同事 · 交付成果",
      "ta.family.ta": "万能助理 · TUI",
      "ta.privacy.title": "默认本地",
      "ta.privacy.body":
        "默认不回连上游。会话与配置在 ~/.tonany。模型 Key 自备。",
      "ta.footer.tag": "万能助理 · TUI · 本地优先。",
      "tw.meta.title": "TonWorker — 搞定日常事务的 AI",
      "tw.meta.description":
        "本地优先的桌面 AI 同事。跨文件与工具交付完成成果；关键动作前先征询你。",
      "tw.nav.download": "下载",
      "tw.nav.app": "界面",
      "tw.nav.how": "工作原理",
      "tw.eyebrow": "桌面端 · 本地优先 · MIT",
      "tw.banner.text": "开源 · MIT · 本地优先",
      "tw.banner.cta": "下载",
      "tw.hero.subtitle":
        "要的是交付成果——简报、报告、日历安排——而不是又多一个聊天窗口。",
      "tw.hero.see": "看看真实界面 →",
      "tw.showcase.title": "这就是桌面端长什么样",
      "tw.showcase.sub":
        "侧栏会话、收件箱审批、计划步骤与交付文件——与 App 同一套结构。",
      "tw.ui.newSession": "+ 新建会话",
      "tw.ui.coworker": "Coworker",
      "tw.ui.chat": "Chat",
      "tw.ui.code": "Code",
      "tw.ui.sessionName": "周报草稿",
      "tw.ui.sessionName2": "日历整理",
      "tw.ui.inbox": "收件箱",
      "tw.ui.scheduled": "定时任务",
      "tw.ui.connectors": "连接器",
      "tw.ui.greeting": "今天要产出什么？",
      "tw.ui.plan": "计划",
      "tw.ui.step1": "从 GitHub 拉取提交与 PR",
      "tw.ui.step2": "起草 Markdown 摘要",
      "tw.ui.step3": "提议日历时段供审阅",
      "tw.ui.approvalTitle": "运行命令",
      "tw.ui.allow": "允许一次",
      "tw.ui.deny": "拒绝",
      "tw.ui.composer": "给 TonWorker 发消息…",
      "tw.ui.progress": "进度",
      "tw.ui.todo1": "拉取 GitHub 动态",
      "tw.ui.todo2": "起草摘要",
      "tw.ui.todo3": "日历提议",
      "tw.ui.todo4": "保存产物",
      "tw.ui.artifacts": "产物",
      "tw.dl.macarm": "macOS · Apple Silicon",
      "tw.dl.macintel": "macOS · Intel",
      "tw.dl.win": "Windows",
      "tw.dl.linux": "Linux · AppImage",
      "tw.dl.releases": "全部版本",
      "tw.dl.go": "下载",
      "tw.features.title": "为日常事务而生",
      "tw.f.personas.t": "多 Persona",
      "tw.f.personas.d":
        "Coworker、Chat、Code 三种工作面——各自独立的会话、工具与工作区规则。",
      "tw.f.inbox.t": "收件箱",
      "tw.f.inbox.d":
        "审批、追问与无人值守提示统一排队；处理时不丢会话上下文。",
      "tw.f.scheduled.t": "定时任务",
      "tw.f.scheduled.d":
        "晨间简报、周报、值守任务——类 cron 自动化，完整运行记录可查。",
      "tw.f.connectors.t": "连接器与 MCP",
      "tw.f.connectors.d":
        "GitHub、Slack、Notion、HubSpot、Gmail、日历、终端、文件——还可接入任意 MCP 服务。",
      "tw.f.artifacts.t": "产物",
      "tw.f.artifacts.d":
        "交付物以真实文件呈现——右栏可预览 Markdown、PDF、表格与代码。",
      "tw.f.models.t": "自带模型",
      "tw.f.models.d":
        "OpenAI、Anthropic、Gemini、DeepSeek、Kimi、Ollama 等——按任务切换，Key 留在本地。",
      "tw.download.title": "下载",
      "tw.download.sub": "macOS、Windows、Linux 构建见 GitHub Releases。",
      "tw.preview.aria": "TonWorker 预览",
      "tw.preview.you1": "汇总本周 GitHub 活动，给团队起草一份进度说明。",
      "tw.preview.tw1": "计划：拉取提交 → 起草笔记 → 提议日历时段。批准写入？",
      "tw.preview.approve": "需要审批 · 日历写入",
      "tw.tools.title": "你的工具",
      "tw.tools.body":
        "连接 GitHub、Slack、Notion、HubSpot 等，外加终端、本地文件与 <code>MCP</code>。",
      "tw.tools.github": "Issues · PR · 状态",
      "tw.tools.collab": "草稿 · 文档",
      "tw.tools.cal": "日程 · 分诊",
      "tw.tools.mcp": "可达的任意工具",
      "tw.how.title": "工作原理",
      "tw.how.sub": "输入目标，输出交付物。你始终在环内。",
      "tw.how.s1t": "提出",
      "tw.how.s1": "描述想要的结果",
      "tw.how.s2t": "规划",
      "tw.how.s2": "跨应用拆步",
      "tw.how.s3t": "审批",
      "tw.how.s3": "写入与发送",
      "tw.how.s4t": "交付",
      "tw.how.s4": "完成的产物",
      "tw.privacy.title": "数据留在本机",
      "tw.privacy.body":
        "对话、连接器令牌与模型 Key 在本机运行与保存。工作上下文不必经第三方云端中转——暴露面更小，外泄风险更低。",
      "tw.footer.tag": "桌面同事 · 交付成果 · 审批在环。",
      "tw.footer.releases": "发行版",
      "nav.docs": "文档",
      "nav.menu": "菜单",
      "nav.install": "安装",
      "nav.loop": "闭环",
      "lang.aria": "语言",
      "banner.aria": "公告",
      "banner.text": "v1.0 · 开源 · MIT",
      "banner.cta": "安装",
      "hero.subtitle": "本地 TUI，编排可审计的 coding-agent 会话。",
      "install.go": "Go（加 PATH）",
      "install.curl": "Linux / macOS",
      "install.ps1": "Windows",
      "install.build": "源码安装",
      "install.setup": "配置 LLM Key",
      "install.copy": "复制",
      "cta.start": "安装",
      "cta.guide": "指南",
      "features.title": "一套闭环，多种驱动",
      "terminal.aria": "TON TUI 预览",
      "terminal.phase": "Clarify",
      "terminal.you1": "做一个带暗色模式的静态登录页",
      "terminal.ton1": "收到 — 静态 HTML/CSS 登录页，支持 prefers-color-scheme。默认亮色还是暗色？",
      "terminal.oq": "Open questions",
      "terminal.oqHint": "/start 时用默认值",
      "terminal.oq1": "- 登录成功后打开哪一页？",
      "drivers.body":
        "一套状态机，后端可换。CI 用 <code>fake</code>；实战接 OpenCode / Claude / Cursor。",
      "drivers.opencode": "默认 · 本地 headless",
      "drivers.claude": "Claude CLI · 长上下文",
      "drivers.cursor": "Cursor CLI · IDE 衔接",
      "loop.title": "同一条闭环",
      "loop.sub": "闸门按需介入。Agent 本地跑完。全程落盘。",
      "loop.clarify": "目标与约束",
      "loop.ready": "确认",
      "loop.plan": "里程碑",
      "loop.execute": "无人值守",
      "loop.verify": "验收",
      "loop.repair": "修复",
      "loop.summarize": "摘要",
      "footer.tag": "本地 TUI · 可审计 agent 会话。",
      "footer.product": "产品",
      "footer.resources": "资源",
      "footer.config": "配置",
      "footer.commands": "命令",
      "footer.family": "产品族",
    },
  };

  const TON_COMMANDS = {
    curl: "curl -fsSL https://raw.githubusercontent.com/toninfo/ton/main/install.sh | bash",
    ps1: "irm https://raw.githubusercontent.com/toninfo/ton/main/install.ps1 | iex",
    go: "go install github.com/toninfo/ton/cmd/ton@latest && export PATH=\"$(go env GOPATH)/bin:$PATH\"",
    build: "git clone https://github.com/toninfo/ton.git && cd ton && make install",
    setup: "ton setup --api-key <YOUR_KEY>",
  };

  const TW_DOWNLOADS = {
    macarm:
      "https://github.com/toninfo/tonworker/releases/latest/download/TonWorker-macos-arm64.dmg",
    macintel:
      "https://github.com/toninfo/tonworker/releases/latest/download/TonWorker-macos-x64.dmg",
    win: "https://github.com/toninfo/tonworker/releases/latest/download/TonWorker-windows-setup.exe",
    linux:
      "https://github.com/toninfo/tonworker/releases/latest/download/TonWorker-linux-x86_64.AppImage",
    releases: "https://github.com/toninfo/tonworker/releases",
  };

  const TA_COMMANDS = {
    source:
      "git clone https://github.com/toninfo/tonany.git && cd tonany && npm install --ignore-scripts && npm run hydrate:model-data && npm run build:offline",
    run: "./tonany-test.sh",
    win: ".\\tonany-test.ps1",
  };

  const COMMANDS =
    page === "tonworker" ? TW_DOWNLOADS : page === "tonany" ? TA_COMMANDS : TON_COMMANDS;
  const defaultCmd = page === "tonworker" ? "macarm" : page === "tonany" ? "source" : "curl";
  const labelPrefix =
    page === "tonworker" ? "tw.dl." : page === "tonany" ? "ta.install." : "install.";

  let currentLang = "en";
  let currentCmd = defaultCmd;

  function t(key) {
    return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
  }

  function installLabel(key) {
    return t(`${labelPrefix}${key}`);
  }

  function applyI18n(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const val = t(key);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      const val = t(key);
      if (val != null) el.setAttribute("aria-label", val);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const val = t(key);
      if (val != null) el.setAttribute("title", val);
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      const val = t(key);
      if (val != null) el.setAttribute("content", val);
    });

    const titleKey =
      page === "hub"
        ? "hub.meta.title"
        : page === "tonworker"
          ? "tw.meta.title"
          : page === "tonany"
            ? "ta.meta.title"
            : "meta.title";
    document.title = t(titleKey);

    document.querySelectorAll("#langMenu [data-lang]").forEach((btn) => {
      const on = btn.dataset.lang === lang;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    if (labelEl) labelEl.textContent = installLabel(currentCmd);
    menu?.querySelectorAll("button[data-cmd]").forEach((b) => {
      const k = b.dataset.cmd;
      b.textContent = installLabel(k);
      b.classList.toggle("active", k === currentCmd);
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }

  const selectBtn = document.getElementById("installSelect");
  const menu = document.getElementById("installMenu");
  const labelEl = document.getElementById("installLabel");
  const commandEl = document.getElementById("commandText");
  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const heroDownloadBtn = document.getElementById("heroDownloadBtn");

  function setCommand(key) {
    if (!COMMANDS[key]) return;
    currentCmd = key;
    if (commandEl) commandEl.textContent = COMMANDS[key];
    if (labelEl) labelEl.textContent = installLabel(key);
    const href = COMMANDS[key];
    if (downloadBtn) downloadBtn.setAttribute("href", href);
    if (heroDownloadBtn) heroDownloadBtn.setAttribute("href", href);
    menu?.querySelectorAll("button[data-cmd]").forEach((b) => {
      b.classList.toggle("active", b.dataset.cmd === key);
    });
  }

  selectBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLangMenu();
    const open = menu?.classList.toggle("open");
    if (menu) menu.hidden = !open;
    selectBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu?.querySelectorAll("button[data-cmd]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setCommand(btn.dataset.cmd);
      menu.classList.remove("open");
      menu.hidden = true;
      selectBtn?.setAttribute("aria-expanded", "false");
    });
  });

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    if (btn) {
      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1200);
    }
  }

  copyBtn?.addEventListener("click", () => {
    copyText(COMMANDS[currentCmd] || commandEl?.textContent || "", copyBtn);
  });

  document.querySelectorAll("[data-copy-static]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.closest(".command-display")?.querySelector(".command-text");
      copyText(code?.textContent?.trim() || TON_COMMANDS.go, btn);
    });
  });

  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");

  function closeLangMenu() {
    langMenu?.classList.remove("open");
    if (langMenu) langMenu.hidden = true;
    langBtn?.setAttribute("aria-expanded", "false");
  }

  langBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    menu?.classList.remove("open");
    if (menu) menu.hidden = true;
    selectBtn?.setAttribute("aria-expanded", "false");
    const open = langMenu?.classList.toggle("open");
    if (langMenu) langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  langMenu?.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      applyI18n(btn.dataset.lang);
      closeLangMenu();
    });
  });

  langMenu?.addEventListener("click", (e) => e.stopPropagation());

  const tabs = document.querySelectorAll(".tab-item");
  const panels = document.querySelectorAll("[data-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      tabs.forEach((tEl) => {
        tEl.classList.toggle("active", tEl === tab);
        tEl.setAttribute("aria-selected", tEl === tab ? "true" : "false");
      });
      panels.forEach((p) => {
        p.classList.toggle("active", p.dataset.panel === id);
      });
    });
  });

  const menuBtn = document.getElementById("menuBtn");
  const mobilePanel = document.getElementById("mobilePanel");

  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLangMenu();
    const open = mobilePanel?.classList.toggle("open");
    if (mobilePanel) mobilePanel.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", () => {
    menu?.classList.remove("open");
    if (menu) menu.hidden = true;
    selectBtn?.setAttribute("aria-expanded", "false");
    closeLangMenu();
    mobilePanel?.classList.remove("open");
    if (mobilePanel) mobilePanel.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
  });

  mobilePanel?.addEventListener("click", (e) => e.stopPropagation());

  let initial = "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") initial = saved;
  } catch {
    /* ignore */
  }
  applyI18n(initial);
  if (COMMANDS[currentCmd]) setCommand(currentCmd);
})();
