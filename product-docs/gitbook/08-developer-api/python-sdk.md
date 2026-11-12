# Python integration example

HeyOpen's product guide describes an OpenAI-compatible client pattern. The following example uses the common OpenAI Python SDK interface with the **website-advertised base URL**. It has not been validated against a live authenticated account.

## Install and configure

```bash
pip install openai
export OPENLEDGER_API_KEY="your-issued-key"
```

## Make a request

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["OPENLEDGER_API_KEY"],
    base_url="https://api.openledger.xyz/v1",
    timeout=30.0,
)

response = client.chat.completions.create(
    model="auto",
    messages=[
        {"role": "user", "content": "Draft a three-sentence product summary."}
    ],
)

print(response.choices[0].message.content)
```

## Production checklist

- Confirm the SDK version and compatibility of the endpoint.
- Store the key in a secret manager.
- Capture request identifiers where returned.
- Add bounded retries and avoid retrying non-idempotent actions blindly.
- Validate usage reporting and billing.
- Avoid transmitting secrets or regulated data without an approved processing arrangement.

## If it fails

The public pages do not list supported SDK versions, a stable model-ID catalog for API use, or a complete error schema. Use the official account documentation or support channel to confirm these details before production deployment.
