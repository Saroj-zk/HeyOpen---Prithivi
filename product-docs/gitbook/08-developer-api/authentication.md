# API authentication and key security

The Hey Open website shows API requests authenticated with a bearer token. Do not publish or embed that secret in frontend code.

## Request header

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

Use a real key issued to your account through an official Hey Open workflow. A variable such as `OPENLEDGER_API_KEY` is only a suggested environment-variable name.

## Recommended environment setup

```bash
export OPENLEDGER_API_KEY="your-issued-key"
```

Use your team's secret manager in production rather than checking credentials into source control, sharing them in screenshots, or pasting them into chat messages.

## Secure key handling

- Place API calls behind a trusted backend rather than a public client application.
- Restrict who can view production secrets.
- Use separate development and production credentials if the product supports them.
- Rotate and revoke keys promptly after suspected exposure.
- Monitor usage for unexpected spikes.
- Apply your own user authentication and abuse prevention to applications built on the API.

## If authentication fails

Verify that the key is active, the bearer prefix is correct, the account has the relevant entitlement, and the base URL matches the official published service. The exact HTTP error format has not been independently confirmed.

## Privacy

An API key identifies the account responsible for usage, even when request content follows a privacy-focused route. Operational metering and security records may still be processed.
