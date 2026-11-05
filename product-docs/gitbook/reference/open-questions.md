# Open questions

Everything the live application could not answer, in one place. Each entry
names who is likely to own it.

## Resolved by walking the product

These were open in the first draft and are now answered:

| Question | Answer |
| --- | --- |
| Can a visitor use the app without a wallet? | The app opens and the catalogue is browsable signed out. Sending a message requires sign-in. |
| What are Min, Mid and Max? | A privacy filter, not a routing cost tier. Min allows every model; Max allows only TEE and E2EE. |
| What is the routing control? | Request mode: Default, Saver, Balanced, Boost. Saver is cheapest-first, Boost is fastest-first. |
| How many models are there? | 133: 64 text, 35 image, 34 video. |
| Is staking live? | No. The Staking page reads Coming Soon. |
| Is Consensus free? | No. Pro plan and above, and requires sign-in. |
| Is there video pricing? | Yes, 13 video models publish a price per second, from $0.02 to $0.28. |

## Corrections to the content sheet

{% hint style="danger" %}
The sheet specifies **"Min = Surplus, Med = Infron, Max = OpenRouter"**.

The application has two separate controls and neither matches:

- **Privacy filter**: Min / **Mid** / Max. Not "Med". It selects by privacy guarantee, not by provider.
- **Request mode**: Default / Saver / Balanced / Boost. This is the provider-selection control.

The names *Surplus* and *Infron* appear nowhere in the application. This
line in the sheet needs rewriting before any document repeats it.
{% endhint %}

## Still open, by owner

### Commercial

- Plan names, prices and credit allowances inside the application.
- Per-message credit cost for each model. Not shown in the picker.
- Whether request mode changes price, and by how much.
- Rollover, expiry and failed-request charging. All three are placeholders in the published Terms.
- Fair use ceilings and rate limits.

### Product

- Context window per model.
- Maximum clip length and output resolution for video.
- Whether a cancelled or failed media job is charged.
- Output resolutions for image models and Image Tools.
- Sign-in methods beyond Connect Wallet.
- Account recovery if the wallet is lost.

### Privacy and legal

- Where memory is stored, whether it is encrypted, whether it syncs.
- A route-by-route provider matrix: who receives data on which route and what they retain.
- Terms placeholders: jurisdiction, registered address, refund policy, price-change notice.
- The SOC 2 Type II claim, with audit scope and date.

### Marketing alignment

- The site describes staking, buybacks and burns in the present tense. Staking is Coming Soon in the app.
- The site advertises "unlimited" text and image generation; the Terms permit credits, rate limits and overages.
- The homepage carries blanket zero-retention language; the Privacy Policy permits provider-dependent processing.


---

### Related

- [User flows](user-flows.md)
- [Choosing the right model](../chat/model-selection.md)

*Snapshot taken from the live application on 4 November 2026. The app is the source of truth; this page is a snapshot.*


