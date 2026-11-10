# Developer API troubleshooting

If an API request fails, isolate authentication, request shape, model eligibility, account usage, and network behavior before changing your application.

## First checks

1. Verify that you are using an officially issued and active key.
2. Confirm that the key is sent as a bearer token.
3. Compare your URL with the published chat endpoint.
4. Confirm the model value is supported for your account.
5. Test with a short, non-sensitive prompt.
6. Review account credits, usage, and relevant restrictions.

## Published minimal endpoint

`POST https://api.openledger.xyz/v1/chat/completions`

The website displays an OpenAI-compatible request using `model: auto`. It does not expose a complete authoritative API schema or error-code list in the reviewed public pages.

## Intermittent errors

Use bounded retries for transient failures, not unbounded loops. Avoid blindly retrying paid actions because you may duplicate work or consumption. Capture non-sensitive diagnostic information and request identifiers if returned.

## Incorrect model or missing capability

A model name shown in the visual catalog may not match its accepted API identifier. Confirm current supported IDs and modalities in the authenticated developer documentation.

## Escalate with useful details

Contact **support@heyopen.ai** with timestamp, sanitized request shape, relevant response status, account identifier, and request ID if available. Remove keys, confidential prompts, personal data, and other secrets.
