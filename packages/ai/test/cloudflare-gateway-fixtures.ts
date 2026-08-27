import { getModel } from "../src/compat.ts";
import { CLOUDFLARE_AI_GATEWAY_COMPAT_BASE_URL } from "../src/api/cloudflare.ts";
import type { Model } from "../src/types.ts";

/**
 * Workers AI compat 模型经 Cloudflare AI Gateway 路由；hydrate 后的静态目录可能不含该 id，
 * 测试里从 workers-ai 模板合成，避免 ModelId 类型与运行时行为脱节。
 */
export function cloudflareGatewayWorkersAiKimiModel(): Model<"openai-completions"> {
	const template = getModel("cloudflare-workers-ai", "@cf/moonshotai/kimi-k2.6")!;
	return {
		...template,
		provider: "cloudflare-ai-gateway",
		id: "workers-ai/@cf/moonshotai/kimi-k2.6",
		baseUrl: CLOUDFLARE_AI_GATEWAY_COMPAT_BASE_URL,
	};
}

/** 静态目录中存在的 Gateway 模型，供 live 集成测试使用。 */
export function cloudflareGatewayCatalogModel() {
	return getModel("cloudflare-ai-gateway", "gpt-4o-mini")!;
}
