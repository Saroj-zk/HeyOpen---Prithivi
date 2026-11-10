# Universal Memory troubleshooting

Universal Memory uses different controls for saved entries, automatic memory generation, and sharing with outside models. Start by checking those settings before assuming memory is malfunctioning.

## A model forgot my preference

Confirm memory use is enabled and that the preference is saved. Not every model will interpret or apply retained context identically. Add a clear, short entry and test with a new chat.

## My memory disappeared

The public memory page describes storage in the current browser, without automatic device synchronization. Browser cleanup, private browsing, or switching profiles may remove or hide locally stored data.

## A new memory was not saved

Check whether automatic generation is enabled. You can add durable facts manually if that control is available.

## External models are not receiving memory

The public settings illustration shows external-model memory sharing off by default. Review the setting and the privacy implications before enabling it.

## A memory is inaccurate

Delete or edit it using the available controls. Memory should reflect current facts and decisions rather than outdated assumptions.

## A document cannot be uploaded

Confirm file type, size limit, and feature availability. The marketing illustration shows PDF/text support with a 10 MB per-file indicator, but production limits may differ.

**Related:** [Memory setup](../05-universal-memory/memory-setup.md), [Memory privacy](../05-universal-memory/sharing-and-privacy.md).
