# Encryption, E2EE, and trusted execution

Hey Open's privacy page describes encryption in transit and Trusted Execution Environments (TEEs), and the model mockup distinguishes certain **E2EE** and **TEE** routes. These are different technical concepts.

## Encryption in transit

A secure connection protects information while it travels between endpoints. It does not, by itself, prevent an endpoint or processing provider from seeing the content it must process.

## End-to-end encryption (E2EE)

E2EE usually means content is encrypted at the sender and only intended endpoints can decrypt it. Whether this applies to a particular AI processing path depends on key custody, where decryption occurs, and how inference is performed. Do not infer E2EE simply from the presence of HTTPS.

## Trusted Execution Environment (TEE)

A TEE is an isolated execution environment intended to reduce unauthorized access to code and data during processing. For AI inference, a TEE-backed route can add protections while a model handles the request. Its security properties depend on the hardware, implementation, attestation, and surrounding system.

## What a privacy badge does not guarantee

A TEE label does not automatically mean the entire workflow is E2EE, that every external processor is excluded, or that all operational metadata disappears. Likewise, zero retention is a separate contractual and technical property.

## Choosing the right route

For sensitive work, choose a model explicitly identified as suitable for the required processing arrangement. Confirm the scope in the in-app disclosure and any enterprise agreements. If a label's technical scope is unclear, do not treat it as a verified security guarantee.

**Related:** [Privacy labels](../03-models-and-routing/model-labels.md), [Third-party processing](model-provider-privacy.md).
