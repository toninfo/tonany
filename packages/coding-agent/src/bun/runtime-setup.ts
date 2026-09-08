import { bedrockProviderModule } from "@tonany/pi-ai/bedrock-provider";
import { registerBunOAuthFlows } from "@tonany/pi-ai/bun-oauth";
import { setBedrockProviderModule } from "@tonany/pi-ai/compat";
import { APP_NAME } from "../config.ts";

process.title = APP_NAME;
process.emitWarning = (() => {}) as typeof process.emitWarning;
registerBunOAuthFlows();
setBedrockProviderModule(bedrockProviderModule);
