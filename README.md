# Pi Agent BaiLian Token Plan Models / Pi Agent 百炼 Token Plan 模型扩展

为 Pi 添加阿里云百炼 **Token Plan** 的 AI 模型支持。

Adds Alibaba Cloud BaiLian **Token Plan** models to Pi.

Fork of [pi-bailian-models](https://github.com/rUrU516/pi-bailian-models) with Token Plan support.

## 可用模型 / Available Models

| 模型 | 上下文 | 最大输出 | 推理 | 视觉 |
|------|--------|----------|------|------|
| qwen3.6-plus | 1M | 65,536 | ✅ | ✅ |
| qwen3.6-flash | 1M | 65,536 | ✅ | ✅ |
| deepseek-v4-pro | 262K | 65,536 | ❌ | ❌ |
| deepseek-v4-flash | 262K | 65,536 | ❌ | ❌ |
| deepseek-v3.2 | 262K | 65,536 | ❌ | ❌ |
| kimi-k2.6 | 262K | 32,768 | ✅ | ✅ |
| kimi-k2.5 | 262K | 32,768 | ✅ | ✅ |
| glm-5.1 | 202K | 16,384 | ✅ | ❌ |
| glm-5 | 202K | 16,384 | ✅ | ❌ |
| MiniMax-M2.5 | 204K | 131,072 | ❌ | ❌ |

## 安装 / Installation

**从源码安装 (From source):**
```bash
pi install git:github.com/fhaze/pi-bailian-models
```

## 使用方法 / Usage

1. **进入 Pi 后**，在对话框中输入 `/login`
2. 选择 **"百炼 token-plan"** 提供商
3. 输入你的 **百炼 Token Plan API 密钥**（以 `sk-` 开头）
4. 之后在模型选择中选择对应的模型即可使用

> 💡 API 密钥获取：访问 [阿里云百炼控制台](https://bailian.console.aliyun.com/)

---

**After entering Pi:**
1. Type `/login` in the chat
2. Select **"百炼 token-plan"** provider
3. Enter your **BaiLian Token Plan API key** (starts with `sk-`)
4. Select the model you want to use

> 💡 Get API key: [Alibaba Cloud BaiLian Console](https://bailian.console.aliyun.com/)

## License / 许可证

MIT
