# Writing effective prompts

You do not need a specialized command language to use HeyOpen. Good results usually come from specifying the outcome and giving the model enough relevant context.

## A practical prompt formula

**Task + context + constraints + output format + success criteria**

For example:

> Review the following product announcement for a US audience. Keep the tone confident and clear, avoid exaggerated claims, make it under 150 words, and return a final draft plus three headline options.

## Useful prompt patterns

**Summarize:** "Summarize this document for a non-technical reader. Start with the decision, then list risks and open questions."

**Compare:** "Compare options A, B, and C by cost, privacy, speed, and implementation effort. Clearly mark unknowns."

**Code:** "Find the likely cause of this TypeScript error. Give a minimal fix, explain why it works, and add a test case."

**Reasoning:** "List the assumptions behind this plan and challenge the three riskiest ones."

**Create:** "Describe a product hero illustration with subject, mood, composition, aspect ratio, and negative constraints."

## Follow-up instead of restarting

If the initial answer is close, be specific: "Keep the first section, shorten the second, and make the CTA more direct." Follow-ups reuse conversational context where supported.

## Work with uncertain information

Ask the model to identify unknowns, distinguish facts from guesses, and cite sources when an external source is available. Model agreement, including Compare output, is not a substitute for source verification.

## Handling sensitive inputs

Before sharing confidential material, confirm the processing route, external providers, file handling, and retention policies. Do not enter passwords, access keys, or wallet recovery phrases.
