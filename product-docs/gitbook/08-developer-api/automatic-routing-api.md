# Use Auto routing through the API

The homepage's API example uses `"model": "auto"`, consistent with Hey Open's broader model-routing proposition.

## What Auto is intended to do

The router chooses a model that can handle the request, rather than forcing every task through the same model family. This can be useful in systems where requests vary from short classification prompts to more demanding analysis.

## Example request

```json
{
  "model": "auto",
  "messages": [
    {"role": "system", "content": "Answer clearly and state uncertainty."},
    {"role": "user", "content": "Summarize the risks in a staged deployment."}
  ]
}
```

The `system` role and message structure follow the advertised OpenAI-compatible pattern. Confirm actual acceptance and behavior against the production endpoint.

## Monitor the routed model

The product guide illustrates responses naming the model that served a request. If the production API exposes this metadata, capture it for cost analysis, debugging, and privacy audits. Do not assume a particular response field until documented.

## When to choose a fixed model

Use an explicit model when you need a specific provider, context window, output type, evaluated model version, latency profile, or privacy classification.

## Cost caveat

Marketing examples show possible token savings through routing and context optimization. They are illustrative, not guarantees for every request. Meter actual usage and evaluate quality across representative tasks.
