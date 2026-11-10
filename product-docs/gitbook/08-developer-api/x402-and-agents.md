# x402-ready agents and payments

Hey Open markets an agent-ready model interface and describes x402 as a way to support payment-enabled agent interactions. **The public site does not establish that every agent payment workflow is live or document an executable x402 integration contract.**

## Why agents need a payment layer

An autonomous application may call paid models, invoke tools, purchase data, or pass work between services. A payment protocol can help represent a chargeable action without requiring a traditional card transaction for each call.

## Conceptual workflow

1. An agent receives a task with defined permissions and spending limits.
2. The agent chooses a model or external tool.
3. A service advertises its access or payment requirement.
4. The agent uses an approved payment mechanism if the workflow supports it.
5. The tool or model returns the requested result.
6. The application records cost, output, and execution status.

This is a conceptual architecture, **not** a validated sequence of currently deployed Hey Open x402 endpoints.

## What to confirm before implementing

Settlement network and accepted assets, payment challenge format, authentication, limits, refunds, replay protection, transaction finality, supported chains, error handling, and audit metadata all require official technical confirmation.

## Security and control

Agents can cause external effects that may be irreversible. Use least-privilege permissions, spending ceilings, explicit authorization for consequential actions, idempotency checks, and a manual approval path where appropriate.

**Related:** [Agent integration design](agent-integration-patterns.md), [Wallet payments](../07-plans-billing-and-account/payment-methods.md).
