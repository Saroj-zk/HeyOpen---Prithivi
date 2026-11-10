# How model providers handle requests

Hey Open acts as a unified access layer, but some models are developed, hosted, or operated by external organizations. Your prompt may be sent to a chosen provider to generate the result.

## What may be transmitted?

Depending on the feature, requests can contain text prompts, contextual memory that you allowed to be shared, documents or images, media inputs, and operational information needed for routing. Consensus Mode may send the same prompt to several providers.

## What may be retained?

The published Privacy Policy distinguishes protected prompt content from account and operational records. Some routes can have verified zero-retention arrangements. Other configurations may temporarily buffer or store content while generating or delivering an output. Generated images, audio, and video may require temporary storage.

## What about training?

Hey Open states that it does not use private prompts, outputs, or Universal Memory to train its own models without separately disclosed authorization. Third-party training restrictions depend on the provider agreement and route. Avoid assuming the same rule applies uniformly to every provider.

## A request privacy checklist

| Question | Why it matters |
| --- | --- |
| Which model and provider handles this? | Identifies an external processor |
| Is the route labeled TEE, E2EE, or zero retention? | Identifies specific claimed safeguards |
| Is web search enabled? | May involve another external service |
| Is memory shared? | Adds stored context to the prompt |
| Is this media generation? | May require temporary output storage |
| Does the request involve payment or agents? | May create lasting financial or external records |

## Recommendation

For high-sensitivity workloads, use a route specifically approved by your organization or request written technical and contractual assurances rather than relying on broad marketing text.

**Legal reference:** [Privacy Policy](https://hey-open.vercel.app/privacy-policy) and [Terms](https://hey-open.vercel.app/terms).
