# Universal Memory sharing and privacy

Memory and conversation data are related but distinct. Universal Memory supplies selected background to supported AI models when relevant. That sharing can create additional privacy considerations.

## External model sharing

The public memory page illustrates a **Share memory with external models** control that is off by default. When disabled, memory is not intended to be sent to routes using independent providers such as OpenAI, Anthropic, or Google. The exact provider handling is governed by the selected route and its processing arrangement.

## How context may be used

A model does not need every saved fact for every task. The memory architecture illustrates retrieving relevant context for the current prompt. However, users should not assume an exact retrieval algorithm or fully identical behavior across models.

## Sensitive information

Avoid retaining access keys, recovery phrases, payment credentials, highly sensitive documents, or details you would not want included in a future model request. If a saved memory is used in a prompt sent to an external provider, its processing may be subject to that provider's terms.

## Browser storage and deletion

The product page states that local memory does not automatically synchronize across devices. Clear or remove entries through the Memory interface when possible. Browser site-data deletion can also remove local records, with possible effects on sign-in and settings.

## Privacy Policy qualification

The formal policy states that retention, synchronization, and encryption can depend on implementation and that memory deletion cannot reverse prior third-party processing. Review the policy for more detail.

**Next:** [Model provider privacy](../06-privacy-and-security/model-provider-privacy.md).
