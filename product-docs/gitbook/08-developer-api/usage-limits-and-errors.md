# Usage limits, error handling, and reliability

A reliable AI integration must handle delays, rejected requests, variable model availability, and usage limits. HeyOpen's Terms allow rate limits, concurrency restrictions, quotas, model-specific restrictions, and changes in availability.

## Recommended client behavior

- Set an appropriate timeout for the selected model and modality.
- Use bounded retries with exponential backoff for transient errors.
- Do not retry chargeable or state-changing operations blindly.
- Show clear feedback to users when a request cannot complete.
- Record minimal operational metadata while protecting prompt content.
- Track billable usage and reconcile unexpected charges.
- Provide a fallback model only if its capabilities and privacy route are suitable.

## Common error categories

| Category | What to investigate |
| --- | --- |
| Authentication | Missing, expired, or invalid API credential |
| Authorization | Plan, permission, or model entitlement |
| Validation | Unsupported model, request field, or input format |
| Quota | Credit balance, rate limit, or concurrency limit |
| Provider error | Upstream availability, timeout, or model restriction |
| Network error | Connectivity, DNS, TLS, and retry policy |

These are general troubleshooting categories, not a verified HeyOpen error-code specification.

## Metering

Usage can depend on model, tokens, media, Compare, and agent execution. The Terms note that some final charges may differ from estimates or be reconciled after provider reporting.

## Service levels

The Terms do not guarantee fixed uptime or latency without a separate written agreement. Enterprise customers should obtain a suitable SLA and support process for production commitments.
