import { Container, getKeybindings, Spacer, Text } from "@tonany/pi-tui";
import { APP_NAME, APP_TITLE } from "../../../config.ts";
import { type TerminalTheme, theme } from "../theme/theme.ts";
import { DynamicBorder } from "./dynamic-border.ts";
import { keyHint, rawKeyHint } from "./keybinding-hints.ts";

export interface FirstTimeSetupResult {
	theme: TerminalTheme;
	shareAnalytics: boolean;
}

export interface FirstTimeSetupOptions {
	detectedTheme: TerminalTheme;
	onThemePreview: (themeName: TerminalTheme) => void;
	onSubmit: (result: FirstTimeSetupResult) => void;
	onCancel: () => void;
}

const THEME_OPTIONS: Array<{ value: TerminalTheme; label: string }> = [
	{ value: "dark", label: "Dark" },
	{ value: "light", label: "Light" },
];

const ANALYTICS_OPTIONS: Array<{ value: boolean; label: string }> = [
	{ value: false, label: "Don't share (recommended)" },
	{ value: true, label: "Share anonymous usage data" },
];

// TonAny 简易字标（首次启动）
const SETUP_LOGO_LINES = ["████████", "   ██   ", "   ██   ", "   ██   "];

/** First-time setup dialog: theme choice and analytics opt-in. */
export class FirstTimeSetupComponent extends Container {
	private step: "theme" | "analytics" = "theme";
	private themeIndex: number;
	// tonany：默认不分享
	private analyticsIndex = 0;
	private readonly options: FirstTimeSetupOptions;

	constructor(options: FirstTimeSetupOptions) {
		super();
		this.options = options;
		this.themeIndex = Math.max(
			0,
			THEME_OPTIONS.findIndex((option) => option.value === options.detectedTheme),
		);
		this.update();
	}

	// Rebuild the whole dialog on every change so theme previews recolor all text.
	private update(): void {
		this.clear();
		this.addChild(new DynamicBorder());
		this.addChild(new Spacer(1));
		this.addChild(new Text(theme.fg("accent", SETUP_LOGO_LINES.join("\n")), 1, 0));
		this.addChild(new Spacer(1));
		this.addChild(new Text(theme.fg("accent", theme.bold(`Welcome to ${APP_TITLE}.`)), 1, 0));
		this.addChild(
			new Text(theme.fg("muted", `Local-first AI assistant (${APP_NAME}). Get things done in this TUI.`), 1, 0),
		);
		this.addChild(new Spacer(1));

		if (this.step === "theme") {
			this.addChild(new Text(theme.fg("text", "Pick a theme."), 1, 0));
			this.addChild(new Text(theme.fg("muted", `Detected system appearance: ${this.options.detectedTheme}`), 1, 0));
			this.addChild(new Spacer(1));
			this.addOptionList(
				THEME_OPTIONS.map((option) => option.label),
				this.themeIndex,
			);
		} else {
			this.addChild(new Text(theme.fg("text", "Anonymous usage data?"), 1, 0));
			this.addChild(
				new Text(
					theme.fg(
						"muted",
						"Off by default. Opting in only enables local analytics flags in settings.json.\nTonAny does not phone home to upstream services unless you configure endpoints.\nYou can change this later in settings.json or with /privacy.",
					),
					1,
					0,
				),
			);
			this.addChild(new Spacer(1));
			this.addOptionList(
				ANALYTICS_OPTIONS.map((option) => option.label),
				this.analyticsIndex,
			);
		}

		this.addChild(new Spacer(1));
		this.addChild(
			new Text(
				rawKeyHint("↑↓", "navigate") +
					"  " +
					keyHint("tui.select.confirm", this.step === "theme" ? "continue" : "finish") +
					"  " +
					keyHint("tui.select.cancel", "skip setup"),
				1,
				0,
			),
		);
		this.addChild(new Spacer(1));
		this.addChild(new DynamicBorder());
	}

	private addOptionList(labels: string[], selectedIndex: number): void {
		for (let i = 0; i < labels.length; i++) {
			const isSelected = i === selectedIndex;
			const prefix = isSelected ? theme.fg("accent", "→ ") : "  ";
			const label = isSelected ? theme.fg("accent", labels[i]) : theme.fg("text", labels[i]);
			this.addChild(new Text(`${prefix}${label}`, 1, 0));
		}
	}

	private moveSelection(delta: number): void {
		if (this.step === "theme") {
			const next = Math.max(0, Math.min(THEME_OPTIONS.length - 1, this.themeIndex + delta));
			if (next !== this.themeIndex) {
				this.themeIndex = next;
				this.options.onThemePreview(THEME_OPTIONS[this.themeIndex].value);
			}
		} else {
			this.analyticsIndex = Math.max(0, Math.min(ANALYTICS_OPTIONS.length - 1, this.analyticsIndex + delta));
		}
		this.update();
	}

	handleInput(keyData: string): void {
		const kb = getKeybindings();
		if (kb.matches(keyData, "tui.select.up") || keyData === "k") {
			this.moveSelection(-1);
		} else if (kb.matches(keyData, "tui.select.down") || keyData === "j") {
			this.moveSelection(1);
		} else if (kb.matches(keyData, "tui.select.confirm") || keyData === "\n") {
			if (this.step === "theme") {
				this.step = "analytics";
				this.update();
			} else {
				this.options.onSubmit({
					theme: THEME_OPTIONS[this.themeIndex].value,
					shareAnalytics: ANALYTICS_OPTIONS[this.analyticsIndex].value,
				});
			}
		} else if (kb.matches(keyData, "tui.select.cancel")) {
			this.options.onCancel();
		}
	}
}
