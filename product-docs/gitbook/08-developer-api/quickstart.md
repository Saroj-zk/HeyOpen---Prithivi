# API quickstart with cURL

This example is based on the request shape displayed on HeyOpen's homepage. It demonstrates a chat request to the published endpoint. Validate the endpoint and model eligibility using issued credentials before deploying.

## Prerequisite

Obtain a valid API key through your approved HeyOpen developer access flow and store it in the environment variable `OPENLEDGER_API_KEY`.

## Send a chat request

```bash
curl https://api.openledger.xyz/v1/chat/completions \
  -H "Authorization: Bearer $OPENLEDGER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "messages": [
      {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
  }'
```

## What each field does

| Field | Purpose |
| --- | --- |
| `model` | Selects a supported model or published `auto` routing option |
| `messages` | Provides conversation messages in the OpenAI-compatible structure |
| `role` | Identifies the sender of each message |
| `content` | Supplies the text of the message |

## What to check in the result

Confirm that the server returned a successful response, inspect the generated answer, and record any usage metadata the API actually provides. The public website does not provide a full response schema or exhaustive status-code reference.

## Next steps

Try [Python](python-sdk.md) or [TypeScript](typescript-sdk.md), and review [Usage and reliability](usage-limits-and-errors.md) before connecting production traffic.
