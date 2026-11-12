# Auto routing and token optimization

Auto routing is HeyOpen's approach to choosing a model based on the request instead of sending every task to the same high-cost model. The website also describes context reuse and pruning as methods to reduce inference overhead.

## Why routing matters

A brief classification request may not need an expensive reasoning model. A lengthy technical problem may benefit from a stronger model. Matching each request to an appropriate capability can improve efficiency and reduce unnecessary token consumption.

## Using Auto

1. Open an eligible chat or API workflow.
2. Choose **Auto** if it is offered in the model selector.
3. Describe the task and include constraints.
4. Review the response and any available model or usage metadata.
5. Select a specific model manually if you need a different result or processing route.

The published API example uses `"model": "auto"`. The routing strategy itself is not disclosed, so users should not assume a fixed decision tree, guaranteed model selection, or a particular percentage of savings.

## Token optimization

Model usage can depend on input and output tokens, media generation, context length, and other factors. The marketing website illustrates potential efficiency gains of up to 60% in a particular scenario. That figure is not a guaranteed reduction for every request.

## When not to use automatic routing

Manually select a model if you need a particular context limit, feature, privacy arrangement, compatibility behavior, or predictable provider. Especially for sensitive material, a specific approved route is preferable to an unspecified automatic route.

**See also:** [API routing](../08-developer-api/automatic-routing-api.md), [Credits and metering](../07-plans-billing-and-account/credits-and-usage.md).
