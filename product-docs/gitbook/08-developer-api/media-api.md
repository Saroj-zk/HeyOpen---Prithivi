# Media and multimodal API capabilities

Hey Open promotes text, image, video, audio, and music capabilities, but the public source material does **not** specify a complete authenticated API schema for generating each media type.

## Known and unknown

**Published:** An OpenAI-compatible `/v1/chat/completions` example, including a bearer token and `auto` model selection.

**Not fully verified:** Production endpoints for image, video, audio, music, file upload, streaming, embeddings, model listing, and media job status. These should not be invented by assuming unrelated provider API paths.

## Preparing for media integration

Before implementing a media endpoint, request or verify:

1. Supported model identifiers and input format.
2. Accepted file or URL types, upload limits, and content restrictions.
3. Whether generation is synchronous or uses a queued job.
4. Pricing, usage units, and failed-request billing rules.
5. Output format, expiry, and download behavior.
6. Privacy, retention, and third-party processing disclosures.
7. Rate limits and error codes.

## Architectural recommendation

Design your application around a provider adapter so media schemas can differ without changing your user interface. Store generated assets according to your own retention and permission requirements. Treat temporary provider URLs as ephemeral unless explicitly documented otherwise.

## For now

Use the in-app catalog for currently available media capabilities. Request verified API specifications before deploying a media generation integration.
