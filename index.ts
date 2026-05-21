import type { OAuthCredentials } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const TOKEN_PLAN_MODELS = [
	{
		id: "qwen3.6-plus",
		name: "qwen3.6-plus",
		reasoning: true,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 1_000_000,
		maxTokens: 65_536,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "qwen3.6-flash",
		name: "qwen3.6-flash",
		reasoning: true,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 1_000_000,
		maxTokens: 65_536,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "deepseek-v4-pro",
		name: "deepseek-v4-pro",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 65_536,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "deepseek-v4-flash",
		name: "deepseek-v4-flash",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 65_536,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "deepseek-v3.2",
		name: "deepseek-v3.2",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 65_536,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "kimi-k2.6",
		name: "kimi-k2.6",
		reasoning: true,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 32_768,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "kimi-k2.5",
		name: "kimi-k2.5",
		reasoning: true,
		input: ["text", "image"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 262_144,
		maxTokens: 32_768,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "glm-5.1",
		name: "glm-5.1",
		reasoning: true,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 202_752,
		maxTokens: 16_384,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "glm-5",
		name: "glm-5",
		reasoning: true,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 202_752,
		maxTokens: 16_384,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
	{
		id: "MiniMax-M2.5",
		name: "MiniMax-M2.5",
		reasoning: false,
		input: ["text"] as const,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: 204_800,
		maxTokens: 131_072,
		compat: {
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			maxTokensField: "max_tokens",
			requiresToolResultName: true,
			requiresMistralToolIds: true,
			thinkingFormat: "qwen",
		},
	},
];

function createApiKeyCredentials(apiKey: string): Promise<OAuthCredentials> {
	return {
		access: apiKey,
		refresh: apiKey,
		expires: Date.now() + TEN_YEARS_MS,
	};
}

export default function registerModelStudioProvider(pi: ExtensionAPI): void {
	pi.registerProvider("百炼 token-plan", {
		baseUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1",
		api: "openai-completions",
		models: TOKEN_PLAN_MODELS,
		oauth: {
			name: "百炼 token-plan",

			async login(callbacks): Promise<OAuthCredentials> {
				const apiKey = await callbacks.onPrompt({
					message: "Enter your BaiLian Token Plan API key:",
					placeholder: "sk-...",
				});

				const trimmed = apiKey.trim();
				if (trimmed.length === 0) {
					throw new Error("API key is required.");
				}

				return createApiKeyCredentials(trimmed);
			},

			async refreshToken(credentials) {
				return credentials;
			},

			getApiKey(credentials) {
				return credentials.access;
			},
		},
	});
}
