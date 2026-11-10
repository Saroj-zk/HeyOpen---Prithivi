# Conversation history and temporary chats

Conversation history is the record of messages and outputs in a chat. Hey Open's privacy page describes conversations being available in the browser rather than as permanent server-side chat history. The marketing interface also illustrates **Temporary Chat**.

## What to expect

- A chat thread provides short-term continuity for follow-up questions.
- Universal Memory stores selected reusable details separately from the thread.
- Browser-local information may be lost if site storage is cleared, the browser profile changes, or private browsing data is discarded.
- External providers and media-processing routes may have different temporary retention arrangements even when Hey Open itself does not keep a permanent conversation copy.

## Temporary chat

Temporary Chat appears in the marketing interface, but its precise deletion rules and current availability were not publicly verified in the authenticated product. Treat it as a session-level option only if your app shows it, and inspect its notice before submitting sensitive content.

## Best practices

For important work, download or copy outputs to your own trusted storage if the interface supports it. Do not rely on browser persistence as a backup mechanism. Avoid sending secrets into AI chats, regardless of whether they are marked temporary.

## A common misunderstanding

Deleting a local conversation does not necessarily delete copies already processed by an external provider or remove operational billing or security records. For provider-specific disclosures see [Privacy across model providers](../06-privacy-and-security/model-provider-privacy.md).
