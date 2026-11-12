# TypeScript integration example

You can use an OpenAI-compatible client pattern for TypeScript with the base URL shown on the HeyOpen website. This example illustrates the intended integration approach; test it with your issued key and current API requirements.

## Install

```bash
npm install openai
```

## Example

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENLEDGER_API_KEY,
  baseURL: "https://api.openledger.xyz/v1",
});

const response = await client.chat.completions.create({
  model: "auto",
  messages: [
    { role: "user", content: "Explain the difference between caching and persistence." }
  ],
});

console.log(response.choices[0]?.message?.content);
```

## Where to run it

Keep this code in a server-side environment, such as an application backend or secure function. Do not expose `OPENLEDGER_API_KEY` in client-side JavaScript or a publicly downloadable bundle.

## Request handling

Use application-level timeouts, retries appropriate to the operation, structured logs without sensitive prompt contents, and safeguards for end-user activity. Verify the rate limits and error responses applicable to your account.

## Model names

The website example uses `auto`. Do not infer that every model display name is an accepted API identifier. Confirm model IDs from the authenticated developer interface or official integration materials.
