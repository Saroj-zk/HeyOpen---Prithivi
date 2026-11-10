# Developer API overview

Hey Open's public website describes one API layer for accessing multiple models and integrating AI into applications. The published example uses an **OpenAI-compatible chat completion format** with an `auto` model option.

## Published integration pattern

The marketing website shows this base endpoint:

`https://api.openledger.xyz/v1/chat/completions`

Authentication is illustrated with a bearer token named `OPENLEDGER_API_KEY`. This is a **published example**, not a complete verified API contract. The authenticated key issuance flow, full model identifiers, rate-limit headers, error schema, and available endpoints were not publicly documented in sufficient detail for this review.

## Common use cases

- Add AI chat to a product.
- Route basic and complex support tickets to different models.
- Use a single integration layer for supported model families.
- Build internal assistants and agent-oriented workflows.
- Run model comparisons or specialized content-generation services where supported.

## Implementation checklist

1. Obtain production API access through the officially supported workflow.
2. Confirm the currently published endpoint, account entitlements, and applicable data-processing route.
3. Store keys in a server-side secret manager.
4. Test a minimal non-sensitive request.
5. Add timeouts, retries with backoff, usage monitoring, and error handling.
6. Confirm pricing, rate limits, and service terms before launch.
7. Perform a security and privacy review for any real user data.

The pages in this section separate **website-shown request examples** from **integration patterns that still require endpoint verification**.

**Next:** [API quickstart](quickstart.md), [Authentication](authentication.md), [Developer troubleshooting](../11-help-and-troubleshooting/api-troubleshooting.md).
