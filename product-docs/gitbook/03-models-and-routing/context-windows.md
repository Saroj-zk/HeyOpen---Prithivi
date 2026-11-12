# Context windows and long inputs

A model's context window is the maximum amount of information it can process as part of a request, typically measured in tokens for language models. HeyOpen's catalog lists different context sizes, including models with very large advertised limits.

## Context is not the same as memory

**Conversation context** is information supplied to the model for the current response. **Universal Memory** is selected information saved for possible use across later conversations and models. A large context window does not automatically give the model persistent memory.

## Tips for long documents

- Choose a model with enough context to accommodate your text, instructions, and expected output.
- Split unrelated documents into separate tasks when possible.
- Ask the model to state when the provided material is incomplete.
- For compliance or contractual analysis, verify citations against the source pages.
- Be aware that upload limits may be lower than a model's theoretical context limit.

## Why long context may cost more

Processing longer prompts can consume more input tokens. Pricing can also depend on the model, routing, caching, or media preprocessing. A model with a large maximum context does not mean every request is billed as though it filled that window.

## Example

If a 200-page report exceeds the application's usable limit for one request, identify sections to analyze, summarize those sections, and consolidate the findings. Preserve original references so the final synthesis can be checked.
