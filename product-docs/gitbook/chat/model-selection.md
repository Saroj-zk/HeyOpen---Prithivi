# Choosing the right model

Hey Open gives you models from every major provider through one interface,
with one memory and one privacy setting. The picker in the app is the
source of truth for what is available; this page is a snapshot.

**Available on:** web. Open the model pill under the composer, or press the
model name next to **Auto**.

*Snapshot last updated: 4 November 2026. 64 text models, 35 image models, 34 video models.*

## Auto

**Auto** is the default. You describe the task and the gateway picks a
model for you. Use it for everyday work. Name a model instead when you
need a reproducible result, a specific capability, or a guaranteed
privacy route.

## Standard models

Routed through the gateway. Most carry the **Incognito** badge, which
means the provider does not receive your identity. Assume the provider
still processes the prompt under its own terms.

### OpenAI

| Model | Badges |
| --- | --- |
| GPT 3.5 Turbo | Incognito, Not in Boost |
| GPT 5.1 | Incognito, Web |
| GPT 5.4 | Incognito |
| GPT 5.4 Mini | Incognito |
| GPT 5.6 Luna | Incognito |
| GPT 5.6 Sol | Incognito |
| GPT 5.6 Terra | Incognito |
| GPT 6 Astra | Incognito |
| GPT 6 Luna | Incognito |
| GPT 6 Sol | Incognito |
| GPT OSS 120B | Incognito, Web |
| o3 | Incognito, Web |
| o4 mini | Incognito, Web |

### Anthropic

| Model | Badges |
| --- | --- |
| Claude Fable 5 | Incognito |
| Claude Haiku 4.5 | Incognito, Web |
| Claude Opus 4.7 | Incognito |
| Claude Opus 5 | Incognito, Web |
| Claude Sonnet 5 | Incognito |

### Google

| Model | Badges |
| --- | --- |
| Gemini 2.5 Pro | Incognito, Web |
| Gemini 3.1 Flash Lite | Incognito |
| Gemini 3.5 Flash Lite | Incognito, Web |
| Gemini 3.7 Flash | Incognito, Web |
| Gemini 3.8 Flash | Incognito |
| Gemini 4 Argon | Incognito |
| Gemma 4 26B | Uncensored |
| Gemma 4 31B IT | Incognito, Web |

### xAI

| Model | Badges |
| --- | --- |
| Grok 4.3 | Incognito |
| Grok 4.5 | Incognito, Web |
| Grok 4.6 | Incognito, Web |

### DeepSeek, Qwen, Kimi and others

| Model | Badges |
| --- | --- |
| DeepSeek R1 (0528) | Incognito, Web |
| DeepSeek V4 Flash | Incognito, Web |
| DeepSeek V4 Pro | Incognito, Web |
| DeepSeek V4.1 Flash | Incognito |
| Fugu Ultra | Incognito, Web |
| GLM 4.7 Flash | Incognito, Web |
| GLM 5 | Incognito |
| GLM 5.1 | Incognito |
| GLM 5.3 | Incognito, Web |
| Hy3 | Incognito, Web |
| Kimi K2 Thinking | Incognito, Web |
| Kimi K2.7 Code | Incognito, Web |
| Kimi K3 | Incognito, Web |
| MiMo V2.5 Pro | Incognito, Web |
| MiniMax M3 | Incognito, Web |
| Mistral Large 4.0 | Incognito, Web |
| Mistral Medium 3.5 | Incognito, Web |
| Nemotron 3.5 Lightning | Incognito, Web |
| Qwen3 VL 235B A22B Instruct | Incognito, Web |
| Qwen3.5 27B | Incognito |
| Qwen3.5 35B A3B | Incognito |
| Qwen3.5 397B A17B | Incognito |
| Qwen3.7 Max | Incognito, Web |
| Qwen3.7 Plus | Incognito |
| Qwen3.8 Flash | Incognito |
| Qwen3.8 Max | Incognito, Web |

## Hardware-protected models

These run inside a Trusted Execution Environment. An **E2EE** model is
encrypted on your device and decrypted only inside a verified enclave.
These are the only models available when the privacy filter is set to
**Max**.

### End to end encrypted

| Model | Badges |
| --- | --- |
| DeepSeek V4 Flash (E2EE) | E2EE, TEE |
| GLM 5.3 Flash (E2EE) | E2EE, TEE |
| Qwen3 VL 30B (E2EE) | E2EE, TEE, Vision |
| Qwen3.6 35B | E2EE, TEE |
| Qwen3.8 27B (E2EE) | E2EE, TEE |

### TEE without E2EE

| Model | Badges |
| --- | --- |
| Gemma 4 26B A4B (Unfiltered) | TEE, Uncensored |
| GLM 5.2 | TEE |
| Qwen3.8 27B | TEE, Uncensored |

### Zero data retention

| Model | Badges |
| --- | --- |
| Qwen3 VL 32B Instruct | Private, Not in Boost |

## Models that can search the web

30 of the 64 text models carry the **Web** badge and can
retrieve live results. Everything else answers from training data alone,
so ask a Web-badged model anything time sensitive.

{% hint style="info" %}
Claude Haiku 4.5, Claude Opus 5, DeepSeek R1 (0528), DeepSeek V4 Flash, DeepSeek V4 Pro, Fugu Ultra, Gemini 2.5 Pro, Gemini 3.5 Flash Lite, Gemini 3.7 Flash, Gemma 4 31B IT, GLM 4.7 Flash, GLM 5.3, and 18 more.
{% endhint %}

## Reduced filtering

3 models carry the **Uncensored** badge. Reduced content filtering does
not remove applicable law or the Terms of Service.

| Model | Badges |
| --- | --- |
| Gemma 4 26B | Uncensored |
| Gemma 4 26B A4B (Unfiltered) | TEE, Uncensored |
| Qwen3.8 27B | TEE, Uncensored |

## Image and video models

- **Images:** 35 models. See [Images](../create/images.md).
- **Video:** 34 models, several priced per second of output. See [Video](../create/video.md).

## Pick a model

1. Open the model pill under the composer. It reads **Auto** until you change it.
2. Filter with the **All / Text / Image / Video** tabs, or type in **Search models**.
3. Sort with **A to Z**, or star a model to keep it at the top.
4. Choose a model. The conversation continues; your memory comes along.

The **privacy filter** in the header limits which models appear at all.
On **Max** you will only see TEE and E2EE models. See
[Privacy filter](privacy-filter.md).

## Which model should I use?

| If you want | Try |
| --- | --- |
| Most things | Auto, or GPT 6 Luna |
| Hard reasoning | Claude Opus 5, o3, Kimi K2 Thinking |
| Writing | Claude Sonnet 5, GPT 6 Sol |
| Code | Kimi K2.7 Code, Claude Opus 5 |
| Speed | Gemini 3.8 Flash, Qwen3.8 Flash, Nemotron 3.5 Lightning |
| Live web results | Any model with the **Web** badge, such as Grok 4.6 or GPT 5.1 |
| Maximum privacy | Any **E2EE** model, such as Qwen3.8 27B (E2EE) |
| Reading an image | Qwen3 VL 30B (E2EE) or Qwen3 VL 235B |

## Good to know

- Every model in the picker shows **Sign in**. Browsing the catalogue is open to everyone; running a model is not.
- **Not in Boost** means the model is unavailable when the request mode is set to Boost. 2 text models and 10 image models carry it.
- The **Incognito** badge is about identity, not retention. It is weaker than **Private**, which is about the provider storing nothing.
- Changing the privacy filter changes which models exist in the picker, not just which are recommended.
- Video models are priced per second of output. A ten second clip on Wan 3.0 Prime costs roughly twenty times a ten second clip on Seedance 1.5 Pro.


{% hint style="warning" %}
**Needs confirming:** Context window and per-message credit cost for each model. Neither is shown in the picker, and both are needed before this page can answer "which model is cheapest".
{% endhint %}



---

### Related

- [Request mode](request-mode.md)
- [Privacy filter](privacy-filter.md)
- [Consensus Mode](consensus.md)
- [Full catalogue](../reference/catalogue.md)

*Snapshot taken from the live application on 4 November 2026. The app is the source of truth; this page is a snapshot.*


