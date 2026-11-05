/**
 * Builds the Hey Open GitBook from product-docs/data/catalog.json.
 *
 * The catalogue was read out of the live model picker, so the model pages
 * are generated rather than typed. When the catalogue changes, recapture
 * catalog.json and rerun this; do not hand-edit the model tables.
 *
 * Run: node product-docs/build-gitbook.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'gitbook');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'catalog.json'), 'utf8'));
const CAPTURED = '4 November 2026';

function write(rel, body) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body.trimStart() + '\n');
  return rel;
}

/* A yellow highlight is not available in Markdown, so an unconfirmed fact
   is wrapped in a GitBook hint block instead. Same contract as the Word
   documents: it names what to ask for and must not ship as fact. */
const ASK = (what) => `\n{% hint style="warning" %}\n**Needs confirming:** ${what}\n{% endhint %}\n`;

const FOOT = (related) => `
---

### Related

${related.map((r) => `- ${r}`).join('\n')}

*Snapshot taken from the live application on ${CAPTURED}. The app is the source of truth; this page is a snapshot.*
`;

const tbl = (headers, rows) =>
  `| ${headers.join(' | ')} |\n|${headers.map(() => ' --- ').join('|')}|\n` +
  rows.map((r) => `| ${r.join(' | ')} |`).join('\n');

const badges = (f) => (f && f.length ? f.join(', ') : '-');

/* ------------------------------------------------------------------ */

const files = [];

/* ---- README ---- */
files.push(write('README.md', `
# Hey Open Help Center

Hey Open is a privacy-focused, multi-model AI workspace. One place to use
models from many providers, with a shared memory that follows you between
them and a privacy filter you set per conversation.

**Available on:** web at [ais.openledger.xyz](https://ais.openledger.xyz/chat).
You can start a conversation without connecting a wallet or creating an
account. Some features require signing in, and a few require a paid plan.

### Start here

- [What is Hey Open?](getting-started/what-is-hey-open.md)
- [Your first conversation](getting-started/first-conversation.md)
- [Choosing the right model](chat/model-selection.md)
- [Privacy filter: Min, Mid and Max](chat/privacy-filter.md)

### At a glance

${tbl(['', 'Count'], [
  ['Text models', String(DATA.counts.text)],
  ['Image models', String(DATA.counts.image)],
  ['Video models', String(DATA.counts.video)],
  ['**Total**', `**${DATA.counts.total}**`],
])}

*Counted in the model picker on ${CAPTURED} with the privacy filter set to Min.*
`));

/* ---- SUMMARY ---- */
files.push(write('SUMMARY.md', `
# Table of contents

- [Hey Open Help Center](README.md)

## Getting Started

- [What is Hey Open?](getting-started/what-is-hey-open.md)
- [Your first conversation](getting-started/first-conversation.md)
- [Signing in and accounts](getting-started/accounts.md)
- [Getting around the workspace](getting-started/workspace.md)
- [Frequently asked questions](getting-started/faq.md)

## Chat

- [Choosing the right model](chat/model-selection.md)
- [Request mode: Default, Saver, Balanced, Boost](chat/request-mode.md)
- [Privacy filter: Min, Mid and Max](chat/privacy-filter.md)
- [Consensus Mode](chat/consensus.md)
- [Memory](chat/memory.md)

## Create

- [Images](create/images.md)
- [Video](create/video.md)
- [Image Tools](create/image-tools.md)
- [Audio Tools](create/audio-tools.md)

## Workspace

- [Agents](workspace/agents.md)
- [Home and Community Feed](workspace/home.md)
- [AI Studio: Model Factory and Staking](workspace/ai-studio.md)

## Account & Data

- [Account and data](account/account-and-data.md)

## Help

- [Troubleshooting](help/troubleshooting.md)
- [What is new](help/whats-new.md)

## Reference

- [User flows](reference/user-flows.md)
- [Screen reference](reference/screens.md)
- [Model catalogue, full list](reference/catalogue.md)
- [Open questions](reference/open-questions.md)
`));

/* ---- Chat: model selection, the page modelled on the reference ---- */

const e2ee = DATA.text.filter((m) => m.f.includes('E2EE'));
const teeOnly = DATA.text.filter((m) => m.f.includes('TEE') && !m.f.includes('E2EE'));
const privateOnly = DATA.text.filter((m) => m.f.includes('Private'));
const web = DATA.text.filter((m) => m.f.includes('Web'));
const unc = DATA.text.filter((m) => m.f.includes('Uncensored'));
const standard = DATA.text.filter((m) => !m.f.includes('E2EE') && !m.f.includes('TEE') && !m.f.includes('Private'));

const family = (prefix) => standard.filter((m) => m.n.startsWith(prefix));

files.push(write('chat/model-selection.md', `
# Choosing the right model

Hey Open gives you models from every major provider through one interface,
with one memory and one privacy setting. The picker in the app is the
source of truth for what is available; this page is a snapshot.

**Available on:** web. Open the model pill under the composer, or press the
model name next to **Auto**.

*Snapshot last updated: ${CAPTURED}. ${DATA.counts.text} text models, ${DATA.counts.image} image models, ${DATA.counts.video} video models.*

## Auto

**Auto** is the default. You describe the task and the gateway picks a
model for you. Use it for everyday work. Name a model instead when you
need a reproducible result, a specific capability, or a guaranteed
privacy route.

## Standard models

Routed through the gateway. Most carry the **Incognito** badge, which
means the provider does not receive your identity. Assume the provider
still processes the prompt under its own terms.

### OpenAI

${tbl(['Model', 'Badges'], family('GPT').concat(standard.filter((m) => m.n === 'o3' || m.n === 'o4 mini')).map((m) => [m.n, badges(m.f)]))}

### Anthropic

${tbl(['Model', 'Badges'], family('Claude').map((m) => [m.n, badges(m.f)]))}

### Google

${tbl(['Model', 'Badges'], family('Gemini').concat(family('Gemma')).map((m) => [m.n, badges(m.f)]))}

### xAI

${tbl(['Model', 'Badges'], family('Grok').map((m) => [m.n, badges(m.f)]))}

### DeepSeek, Qwen, Kimi and others

${tbl(['Model', 'Badges'], standard.filter((m) =>
  !/^(GPT|Claude|Gemini|Gemma|Grok)/.test(m.n) && m.n !== 'o3' && m.n !== 'o4 mini'
).map((m) => [m.n, badges(m.f)]))}

## Hardware-protected models

These run inside a Trusted Execution Environment. An **E2EE** model is
encrypted on your device and decrypted only inside a verified enclave.
These are the only models available when the privacy filter is set to
**Max**.

### End to end encrypted

${tbl(['Model', 'Badges'], e2ee.map((m) => [m.n, badges(m.f)]))}

### TEE without E2EE

${tbl(['Model', 'Badges'], teeOnly.map((m) => [m.n, badges(m.f)]))}

### Zero data retention

${tbl(['Model', 'Badges'], privateOnly.map((m) => [m.n, badges(m.f)]))}

## Models that can search the web

${web.length} of the ${DATA.counts.text} text models carry the **Web** badge and can
retrieve live results. Everything else answers from training data alone,
so ask a Web-badged model anything time sensitive.

{% hint style="info" %}
${web.slice(0, 12).map((m) => m.n).join(', ')}, and ${web.length - 12} more.
{% endhint %}

## Reduced filtering

${unc.length} models carry the **Uncensored** badge. Reduced content filtering does
not remove applicable law or the Terms of Service.

${tbl(['Model', 'Badges'], unc.map((m) => [m.n, badges(m.f)]))}

## Image and video models

- **Images:** ${DATA.counts.image} models. See [Images](../create/images.md).
- **Video:** ${DATA.counts.video} models, several priced per second of output. See [Video](../create/video.md).

## Pick a model

1. Open the model pill under the composer. It reads **Auto** until you change it.
2. Filter with the **All / Text / Image / Video** tabs, or type in **Search models**.
3. Sort with **A to Z**, or star a model to keep it at the top.
4. Choose a model. The conversation continues; your memory comes along.

The **privacy filter** in the header limits which models appear at all.
On **Max** you will only see TEE and E2EE models. See
[Privacy filter](privacy-filter.md).

## Which model should I use?

${tbl(['If you want', 'Try'], [
  ['Most things', 'Auto, or GPT 6 Luna'],
  ['Hard reasoning', 'Claude Opus 5, o3, Kimi K2 Thinking'],
  ['Writing', 'Claude Sonnet 5, GPT 6 Sol'],
  ['Code', 'Kimi K2.7 Code, Claude Opus 5'],
  ['Speed', 'Gemini 3.8 Flash, Qwen3.8 Flash, Nemotron 3.5 Lightning'],
  ['Live web results', 'Any model with the **Web** badge, such as Grok 4.6 or GPT 5.1'],
  ['Maximum privacy', 'Any **E2EE** model, such as Qwen3.8 27B (E2EE)'],
  ['Reading an image', 'Qwen3 VL 30B (E2EE) or Qwen3 VL 235B'],
])}

## Good to know

- Every model in the picker shows **Sign in**. Browsing the catalogue is open to everyone; running a model is not.
- **Not in Boost** means the model is unavailable when the request mode is set to Boost. ${DATA.text.filter((m) => m.f.includes('Not in Boost')).length} text models and ${DATA.image.filter((m) => m.f.includes('Not in Boost')).length} image models carry it.
- The **Incognito** badge is about identity, not retention. It is weaker than **Private**, which is about the provider storing nothing.
- Changing the privacy filter changes which models exist in the picker, not just which are recommended.
- Video models are priced per second of output. A ten second clip on Wan 3.0 Prime costs roughly twenty times a ten second clip on Seedance 1.5 Pro.

${ASK('Context window and per-message credit cost for each model. Neither is shown in the picker, and both are needed before this page can answer "which model is cheapest".')}

${FOOT([
  '[Request mode](request-mode.md)',
  '[Privacy filter](privacy-filter.md)',
  '[Consensus Mode](consensus.md)',
  '[Full catalogue](../reference/catalogue.md)',
])}
`));

/* ---- Chat: request mode ---- */
files.push(write('chat/request-mode.md', `
# Request mode

The request mode sets which providers the gateway reaches for first. It
sits next to the model pill under the composer and reads **Boost** by
default in the current build.

![The request mode selector](../images/04-memory-and-request-mode.jpg)

${tbl(['Mode', 'What it does'], DATA.requestMode.map((m) => [`**${m.mode}**`, m.desc]))}

## Choosing one

- **Saver** when the task is routine and you care about cost.
- **Balanced** for general work.
- **Boost** when you are waiting on the answer.
- **Default** when you want the gateway to decide without a bias.

## Good to know

- Some models are marked **Not in Boost** and disappear from the picker in that mode.
- Request mode is about provider selection. It is not the same thing as the [privacy filter](privacy-filter.md), which decides which models are allowed at all.
- Switching mode does not change the model you have pinned; it changes which vendor serves it.

${ASK('Whether request mode changes the price of a request, and by how much. The labels imply a cost difference but the app does not state one.')}

${FOOT(['[Choosing the right model](model-selection.md)', '[Privacy filter](privacy-filter.md)'])}
`));

/* ---- Chat: privacy filter ---- */
files.push(write('chat/privacy-filter.md', `
# Privacy filter: Min, Mid and Max

The privacy filter sits in the header next to **Memory**. It decides which
models you are allowed to use, by how strongly the route protects the
prompt.

![The privacy filter, set to Min](../images/02-privacy-filter.jpg)

${tbl(['Setting', 'What it allows', 'Models available'], [
  ['**Min**', DATA.privacyFilter[0].desc, `All ${DATA.counts.text} text models`],
  ['**Mid**', DATA.privacyFilter[1].desc, `${DATA.text.filter((m) => m.f.includes('Private') || m.f.includes('TEE') || m.f.includes('E2EE')).length} text models`],
  ['**Max**', DATA.privacyFilter[2].desc, `${DATA.text.filter((m) => m.f.includes('TEE') || m.f.includes('E2EE')).length} text models`],
])}

## What the badges mean

${tbl(['Badge', 'Meaning'], Object.entries(DATA.badges).filter(([k]) =>
  ['Incognito', 'Private', 'TEE', 'E2EE'].includes(k)).map(([k, v]) => [`**${k}**`, v]))}

## Good to know

- Raising the filter removes models from the picker. If a model you use disappears, check this setting first.
- **Incognito** is the weakest of the four. It hides who you are from the provider; it does not stop the provider keeping the prompt.
- HTTPS in transit is not end to end encryption. Only **E2EE** means the prompt is encrypted before it leaves your device.
- The filter applies to text models. Image and video models carry their own badges.

${ASK('Whether the privacy filter persists across sessions and devices, and whether changing it mid-conversation starts a new one.')}

${FOOT(['[Choosing the right model](model-selection.md)', '[Request mode](request-mode.md)'])}
`));

/* ---- Chat: consensus ---- */
files.push(write('chat/consensus.md', `
# Consensus Mode

Consensus Mode sends one prompt to several models and shows their answers
together, so you can see where they disagree.

![Consensus requires sign-in and a Pro plan](../images/05-consensus-gate.jpg)

## Availability

Consensus is **available to members on the Pro plan and above** and
requires signing in. Opening it without an account shows a sign-in gate.

## Good to know

- Agreement between models is not proof. Models can share training data and repeat the same error.
- Every participating model consumes usage. One Consensus question can cost several times a single-model turn.
- Use it for a decision worth the cost, not for everyday questions.

${ASK('How many models take part, whether the user chooses them, whether a judge model synthesises the answer, and how the run is charged.')}

${FOOT(['[Choosing the right model](model-selection.md)', '[Plans and billing](../getting-started/accounts.md)'])}
`));

/* ---- Chat: memory ---- */
files.push(write('chat/memory.md', `
# Memory

Memory keeps useful details about you so you do not have to re-explain
yourself to each new model. It is reached from **Memory** in the header.

![Memory settings](../images/04-memory-and-request-mode.jpg)

## The two switches

${tbl(['Switch', 'What it does'], [
  ['**Save memories from chats**', 'Automatically saves useful details about you as you chat. Requires **Use memory** to be on.'],
  ['**Use memory**', 'Lets the assistant use your saved memories in new chats.'],
])}

Turning **Use memory** off disables saving as well, because the save
switch depends on it.

## Good to know

- Memory is not chat history. It stores selected facts, not transcripts.
- Memory is sent to whichever model answers, so it is subject to that model's privacy route. Raise the [privacy filter](privacy-filter.md) before putting anything sensitive in memory.

${ASK('Where memory is stored, whether it is encrypted, whether it syncs across devices, the size limit, and whether it can be exported or imported.')}

${FOOT(['[Privacy filter](privacy-filter.md)', '[Your first conversation](../getting-started/first-conversation.md)'])}
`));

/* ---- Getting started ---- */
files.push(write('getting-started/what-is-hey-open.md', `
# What is Hey Open?

Hey Open is a private, multi-model AI workspace. One app gives you every
leading AI model with a privacy setting you choose per conversation, a
memory that follows you between models, and a creative suite for images,
video and audio in the same place.

**Available on:** web at [ais.openledger.xyz](https://ais.openledger.xyz/chat).
The app opens straight into a chat. You can read the whole model
catalogue without connecting a wallet; sending a message requires signing
in.

*Snapshot last updated: ${CAPTURED}.*

![The chat screen](../images/01-chat-empty.jpg)

## Every model, one workspace

Switching AI apps normally means starting over. In Hey Open you pick the
model per task and keep the same thread: ${DATA.counts.text} text models from OpenAI,
Anthropic, Google, xAI, DeepSeek, Qwen, Kimi, Mistral and others, plus
${DATA.counts.image} image models and ${DATA.counts.video} video models. ${DATA.counts.total} in total.

Leave it on **Auto** and the gateway picks for you. See
[Choosing the right model](../chat/model-selection.md).

## Privacy you set per conversation

Most products make privacy an account setting. Hey Open makes it a filter
in the header that decides which models you are allowed to use at all.

${tbl(['Setting', 'What it allows'], DATA.privacyFilter.map((p) => [`**${p.tier}**`, p.desc]))}

Raising the filter removes models from the picker. On **Max** only the
${DATA.text.filter((m) => m.f.includes('TEE') || m.f.includes('E2EE')).length} hardware-protected
models remain. See [Privacy filter](../chat/privacy-filter.md).

## Speed or cost, per request

Separately from privacy, a **request mode** on the composer decides which
providers the gateway reaches for first.

${tbl(['Mode', 'What it does'], DATA.requestMode.map((m) => [`**${m.mode}**`, m.desc]))}

See [Request mode](../chat/request-mode.md).

## What else you can do

- **Consensus Mode.** Ask several models at once and compare their answers. Pro plan and above. See [Consensus Mode](../chat/consensus.md).
- **Memory.** Saved details about you, reused in new chats, with two switches that control saving and use. See [Memory](../chat/memory.md).
- **Create.** ${DATA.counts.image} image models and ${DATA.counts.video} video models, ${DATA.video.filter((v) => v.price).length} of which publish a price per second. See [Images](../create/images.md) and [Video](../create/video.md).
- **Image Tools.** ${DATA.imageTools.length} single-purpose tools: ${DATA.imageTools.slice(0, 4).map((t) => t[0]).join(', ')} and more. See [Image Tools](../create/image-tools.md).
- **Audio Tools.** ${DATA.audioTools.length} tools: ${DATA.audioTools.map((t) => t[0]).join(', ')}. See [Audio Tools](../create/audio-tools.md).
- **Agents.** A marketplace of specialised agents. See [Agents](../workspace/agents.md).
- **Community Feed.** Dated image and video posts on the home screen.

![The expanded sidebar](../images/09-sidebar-expanded.jpg)

## Navigating

The sidebar groups everything into three areas, plus your recent chats.

${tbl(['Group', 'Contains'], [
  ['**Workspace**', DATA.nav.WORKSPACE.map((r) => r[0]).join(', ')],
  ['**AI Studio**', DATA.nav['AI STUDIO'].map((r) => r[0]).join(', ')],
  ['**Tools**', DATA.nav.TOOLS.map((r) => `${r[0]} (${r[1].split(' ')[0]})`).join(', ')],
])}

**More** opens ${DATA.nav.more.map((r) => r[0]).join(', ')}.
See [Getting around the workspace](workspace.md).

## Plans

${tbl(['Plan', 'Price', 'What you get'], [
  ['Free', '$0', [{ ph: '' }] && 'Browsing the catalogue, Image Tools and Audio Tools. Sending a message needs an account.'],
  ['Hey Open Pro', '$20 per month, as advertised on the marketing site', 'Premium models, Consensus Mode, shared memory.'],
])}

Consensus Mode states its own requirement in the app: *available to
members on the Pro plan and above*. Everything else about plan
entitlements is unconfirmed, so see
[Signing in and accounts](accounts.md).

## Not available yet

Three areas are labelled **Coming Soon** in the current build.

${tbl(['Area', 'Described as'], [
  ['**Model Factory**', 'Customize and train your own AI models'],
  ['**Staking**', 'Stake tokens to support the network and earn rewards'],
  ['**Voice Chat**', 'Have natural, real-time conversations'],
])}

Every agent in the marketplace is also badged Coming Soon.

{% hint style="danger" %}
The marketing site describes staking, buybacks and burns in the present
tense. In the application, Staking is a Coming Soon page. Do not write a
help article explaining how to stake until it ships.
{% endhint %}

## Good to know

- You can browse the entire catalogue signed out. Every model shows **Sign in** when you try to use it.
- Privacy is set per conversation, not once for the account.
- ${DATA.text.filter((m) => m.f.includes('Web')).length} of the ${DATA.counts.text} text models can retrieve live web results. The rest answer from training data alone.
- Video is priced per second of output, from $${DATA.video.filter((v) => v.price).map((v) => Number(v.price)).sort((a, b) => a - b)[0].toFixed(2)} to $${DATA.video.filter((v) => v.price).map((v) => Number(v.price)).sort((a, b) => b - a)[0].toFixed(2)}.
- Models badged **Not in Boost** disappear from the picker in Boost mode.
- **Incognito** is about identity, not retention. It is weaker than **Private**, which means the provider stores nothing.
- Light, dark and system themes are in the sidebar header.

${ASK('Plan names and prices inside the application, credit allowances, and what the Free tier includes. The marketing site advertises Pro at $20 per month; the application was only inspected signed out.')}

${FOOT([
  '[Your first conversation](first-conversation.md)',
  '[Choosing the right model](../chat/model-selection.md)',
  '[Privacy filter](../chat/privacy-filter.md)',
  '[Frequently asked questions](faq.md)',
])}
`));

files.push(write('getting-started/first-conversation.md', `
# Your first conversation

![The chat screen](../images/01-chat-empty.jpg)

1. Open [ais.openledger.xyz](https://ais.openledger.xyz/chat). The composer is in the middle of the screen.
2. Leave the model on **Auto** for now, or open the picker and choose one.
3. Type a question and press send. Try: *"Explain how an API rate limiter works. Use a simple analogy first, then give a Node.js example."*
4. Read the answer for scope before accuracy: did it answer the question you meant?
5. Follow up in the same thread. *"Now add an example using Redis and explain the trade-offs."*

## Shortcuts on the empty screen

Five starters sit under the composer: **Weather**, **Code**, **Write**,
**Analyze** and **Brainstorm**. They fill the composer with a starting
prompt.

## If the answer is weak

- Too broad: say what to keep, what to cut, and what a good answer looks like.
- Misunderstood: ask the model to state its assumptions before continuing.
- Confidently wrong: check it elsewhere, or ask a second model to critique it. A second opinion sharpens scrutiny; it does not prove correctness.

## Good to know

- Sending a message requires signing in. The composer is visible either way.
- A long thread costs more per turn than a short one, because earlier turns are resent as context.

${FOOT(['[Choosing the right model](../chat/model-selection.md)', '[Memory](../chat/memory.md)'])}
`));

files.push(write('getting-started/accounts.md', `
# Signing in and accounts

The application opens without an account. The header offers **Connect
Wallet**, and every model in the picker shows **Sign in**.

## What works signed out

- Opening the application and reading the interface.
- Browsing the full model catalogue, including badges and video prices.
- Opening Image Tools and Audio Tools.
- Reading the home screen and the community feed.

## What needs signing in

- Sending a message to any model.
- Consensus Mode, which additionally needs **Pro plan and above**.

${ASK('The full list of sign-in methods. The header offers Connect Wallet; whether email or social sign-in also exists was not visible signed out.')}

${ASK('Plan names and prices inside the application. The marketing site advertises Hey Open Pro at $20 per month; the application was not checked signed in.')}

${ASK('Account recovery if the wallet used to sign in is lost, and whether a signed-out session can be migrated to an account.')}

${FOOT(['[What is Hey Open?](what-is-hey-open.md)', '[Consensus Mode](../chat/consensus.md)'])}
`));

files.push(write('getting-started/workspace.md', `
# Getting around the workspace

![The home screen](../images/08-home.jpg)

## The sidebar

${tbl(['Icon', 'Goes to', 'State'], [
  ['Theme', 'Switches between light and dark', 'Live'],
  ['Search', 'Search your chats', 'Live'],
  ['New Chat', 'Starts a fresh conversation', 'Live'],
  ['Consensus', 'Consensus Mode', 'Pro plan and above'],
  ['Home', 'Home screen, quick actions and community feed', 'Live'],
  ['More', 'Further navigation', 'Live'],
  ['Model Factory', 'Customize and train your own AI models', '**Coming Soon**'],
  ['Staking', 'Stake tokens to support the network', '**Coming Soon**'],
  ['Image Tools', `${DATA.imageTools.length} image tools`, 'Live'],
  ['Audio Tools', `${DATA.audioTools.length} audio tools`, 'Live'],
  ['Invite and earn $10', 'Referral', 'Live'],
])}

## The header

- **Memory**, which opens the two memory switches.
- **Privacy**, which opens the Min / Mid / Max filter.
- **Connect Wallet**.

## The composer

- The model pill, reading **Auto** by default.
- The request mode pill, reading **Boost** by default.
- Voice input, and send.
- An expand control for a larger editor.

## The home screen

Four quick actions: **New Chat**, **Launch Agent** (Agent Marketplace),
**Generate Image**, and **Voice Chat** which is marked Coming Soon. Below
them is a **Community Feed** of dated image and video posts.

![Search chats](../images/07-search-chats.jpg)

${FOOT(['[User flows](../reference/user-flows.md)', '[Screen reference](../reference/screens.md)'])}
`));

/* ---- Create ---- */
const imgEdit = DATA.image.filter((m) => /Edit$/.test(m.n));
const imgGen = DATA.image.filter((m) => !/Edit$/.test(m.n));

files.push(write('create/images.md', `
# Images

${DATA.counts.image} image models sit in the same picker as chat, under the **Image**
tab.

![The model picker](../images/03-model-picker-video.jpg)

## Generating from a prompt

${tbl(['Model', 'Badges'], imgGen.map((m) => [m.n, badges(m.f)]))}

## Editing an existing image

These take a source image. ${DATA.image.filter((m) => m.f.includes('Image required')).length} models across the tab are marked
**Image required** and cannot generate from text alone.

${tbl(['Model', 'Badges'], imgEdit.map((m) => [m.n, badges(m.f)]))}

## Writing a prompt

${tbl(['Element', 'Example'], [
  ['Subject', 'A private AI workspace as modular glass panels'],
  ['Style', 'Editorial illustration, restrained'],
  ['Palette', 'Neutral background, blue-grey'],
  ['Lighting', 'Soft directional'],
  ['Composition', 'Wide 16:9, generous negative space'],
  ['Exclusions', 'No text, no logos'],
])}

## Good to know

- Nine Flux models are marked **Not in Boost** and disappear in that request mode.
- Models ending in **Edit** expect a source image.
- Models marked **(Unfiltered)** have reduced content filtering. Law and the Terms still apply.
- Each regeneration is a new charge. Decide what is wrong before pressing it again.

${ASK('Output resolutions, aspect ratios and per-image cost. None are shown in the picker.')}

${FOOT(['[Video](video.md)', '[Image Tools](image-tools.md)', '[Choosing the right model](../chat/model-selection.md)'])}
`));

const priced = DATA.video.filter((m) => m.price).sort((a, b) => Number(a.price) - Number(b.price));
files.push(write('create/video.md', `
# Video

${DATA.counts.video} video models, under the **Video** tab in the picker. ${priced.length} of them
publish a price per second of output, which makes video the one place in
the product where cost is visible before you commit.

![Video models with per-second pricing](../images/03-model-picker-video.jpg)

## Priced models

${tbl(['Model', 'Per second', '10 second clip', 'Badges'], priced.map((m) => [
  m.n, `$${m.price}`, `$${(Number(m.price) * 10).toFixed(2)}`, badges(m.f),
]))}

The range is wide: ten seconds costs **$${(Number(priced[0].price) * 10).toFixed(2)}** on ${priced[0].n} and **$${(Number(priced[priced.length - 1].price) * 10).toFixed(2)}** on ${priced[priced.length - 1].n}, a factor of ${Math.round(Number(priced[priced.length - 1].price) / Number(priced[0].price))}.

## Models without a published price

${tbl(['Model', 'Badges'], DATA.video.filter((m) => !m.price).map((m) => [m.n, badges(m.f)]))}

## Planning a shot

${tbl(['Element', 'Example'], [
  ['Subject and action', 'Rain running down a glass office wall at dusk'],
  ['Camera', 'Locked off, slow focus pull to a distant skyline'],
  ['Duration', 'Six seconds'],
  ['Mood', 'Muted blue light'],
  ['Exclusions', 'No text, no captions'],
])}

## Good to know

- **Image required** models need a starting frame: Runway Gen4.5 and Wan 3.0 both do.
- Price is per second of **output**, so clip length is the main cost lever.
- Media jobs queue differently from chat. Do not treat an unconfirmed job as a finished asset.

${ASK('Maximum clip length per model, output resolution, whether audio is included, and whether a cancelled or failed job is charged.')}

${FOOT(['[Images](images.md)', '[Choosing the right model](../chat/model-selection.md)'])}
`));

files.push(write('create/image-tools.md', `
# Image Tools

${DATA.imageTools.length} single-purpose tools, reached from the sidebar. Each does one job,
so you do not have to describe it in a prompt.

![Image Tools](../images/06-image-tools.jpg)

${tbl(['Tool', 'What it does'], DATA.imageTools.map(([n, d]) => [`**${n}**`, d]))}

## Good to know

- These are separate from the image models in the chat picker. Use a tool when the job is one of the nine above; use a model when you need a prompt.
- The panel opens over whatever screen you are on.

${ASK('Whether the tools consume the same credits as image models, what resolutions they output, and whether any require signing in.')}

${FOOT(['[Images](images.md)', '[Audio Tools](audio-tools.md)'])}
`));

files.push(write('create/audio-tools.md', `
# Audio Tools

${DATA.audioTools.length} tools, reached from the sidebar.

${tbl(['Tool', 'What it does'], DATA.audioTools.map(([n, d]) => [`**${n}**`, d]))}

## Good to know

- Speech, music and transcription are different services. Pick the tool that matches the job.
- Do not imitate a real person's voice or upload a protected recording without rights and consent. A paid plan does not grant ownership of third-party music.

${ASK('Supported languages, maximum duration, output formats, and cost per use.')}

${FOOT(['[Image Tools](image-tools.md)', '[Images](../create/images.md)'])}
`));

/* ---- Reference ---- */
files.push(write('reference/user-flows.md', `
# User flows

Every flow below was walked in the live application on ${CAPTURED},
signed out. Steps that require an account are marked.

## 1. First visit to first answer

\`\`\`
Open ais.openledger.xyz
        |
        v
  Redirects to /chat  ........................ no wallet, no account needed
        |
        v
  Chat screen: composer, Auto model, Boost mode
        |
        +---> optional: set the privacy filter (Min / Mid / Max)
        +---> optional: open the model picker and choose a model
        |
        v
  Type a message and send
        |
        v
  SIGN IN REQUIRED  ........................... every model shows "Sign in"
\`\`\`

![The chat screen](../images/01-chat-empty.jpg)

**What this resolves:** the landing site says "no account required to
start" and the application does open without one. The gate is on
**sending**, not on arriving.

## 2. Choosing a model

\`\`\`
Model pill (reads "Auto")
        |
        v
  Picker opens
        |
        +-- Search models
        +-- Tabs: All | Text | Image | Video
        +-- Sort: A to Z
        +-- Star a model to pin it
        |
        v
  Pick a model  ->  conversation continues, memory follows
\`\`\`

![The model picker](../images/03-model-picker-video.jpg)

The privacy filter is applied **before** this list is built. On **Max**
the picker only contains TEE and E2EE models.

## 3. Setting privacy

\`\`\`
Header -> Privacy
        |
        v
  Min  ->  ${DATA.privacyFilter[0].desc}
  Mid  ->  ${DATA.privacyFilter[1].desc}
  Max  ->  ${DATA.privacyFilter[2].desc}
\`\`\`

![The privacy filter](../images/02-privacy-filter.jpg)

## 4. Setting request mode

\`\`\`
Composer -> request mode pill (reads "Boost")
        |
        v
  Default  ->  ${DATA.requestMode[0].desc}
  Saver    ->  ${DATA.requestMode[1].desc}
  Balanced ->  ${DATA.requestMode[2].desc}
  Boost    ->  ${DATA.requestMode[3].desc}
\`\`\`

Models marked **Not in Boost** leave the picker in Boost mode.

## 5. Consensus Mode

\`\`\`
Sidebar -> Consensus
        |
        v
  /consensus
        |
        v
  "Sign in to use Consensus"
  "Consensus is available to members on the Pro plan and above."
\`\`\`

![The Consensus gate](../images/05-consensus-gate.jpg)

## 6. Creating an image

\`\`\`
Sidebar -> Image Tools            OR     Model picker -> Image tab
        |                                        |
        v                                        v
  Nine single-purpose tools              ${DATA.counts.image} image models
  (Text to Image, Headshots, ...)        (Flux, Gemini, GPT, Grok, Seedream)
                                                 |
                                                 v
                                         "Image required" models
                                         need a source image
\`\`\`

![Image Tools](../images/06-image-tools.jpg)

## 7. Dead ends

Two sidebar destinations render a Coming Soon page:

\`\`\`
Sidebar -> Model Factory  ->  "Customize and train your own AI models."  [Coming Soon]
Sidebar -> Staking        ->  "Stake tokens to support the network..."   [Coming Soon]
Home    -> Voice Chat     ->  [Coming Soon]
\`\`\`

{% hint style="danger" %}
**Staking is not live.** The marketing site describes staking, buybacks
and burns in the present tense. In the application it is a Coming Soon
page. Any help article describing how to stake would be documenting
something a user cannot do.
{% endhint %}

${FOOT(['[Screen reference](screens.md)', '[Open questions](open-questions.md)'])}
`));

files.push(write('reference/screens.md', `
# Screen reference

Captured from the live application on ${CAPTURED}, signed out, at 1440x900.

## Chat

![Chat](../images/01-chat-empty.jpg)

The default screen. Composer, model pill (**Auto**), request mode pill
(**Boost**), voice input, and five starter chips: Weather, Code, Write,
Analyze, Brainstorm.

## Privacy filter

![Privacy filter](../images/02-privacy-filter.jpg)

Opened from **Privacy** in the header. Three settings, Min selected.

## Model picker

![Model picker](../images/03-model-picker-video.jpg)

Search, A to Z sort, tabs for All / Text / Image / Video, favourites, and
per-second pricing on video models.

## Memory and request mode

![Memory and request mode](../images/04-memory-and-request-mode.jpg)

Memory has two switches. Request mode has four settings.

## Consensus

![Consensus](../images/05-consensus-gate.jpg)

Gated on sign-in and the Pro plan.

## Image Tools

![Image Tools](../images/06-image-tools.jpg)

Nine tools in a panel that opens over the current screen.

## Search

![Search](../images/07-search-chats.jpg)

Searches your chats. Empty signed out.

## Home

![Home](../images/08-home.jpg)

Quick actions and the community feed.

${FOOT(['[User flows](user-flows.md)'])}
`));

files.push(write('reference/catalogue.md', `
# Model catalogue, full list

Read from the live picker on ${CAPTURED} with the privacy filter set to
**Min**, so nothing was hidden. ${DATA.counts.total} models in total.

Regenerate this page rather than editing it: see
\`product-docs/data/catalog.json\`.

## Badges

${tbl(['Badge', 'Meaning'], Object.entries(DATA.badges).map(([k, v]) => [`**${k}**`, v]))}

## Text, ${DATA.counts.text} models

${tbl(['#', 'Model', 'Badges'], DATA.text.map((m, i) => [String(i + 1), m.n, badges(m.f)]))}

## Image, ${DATA.counts.image} models

${tbl(['#', 'Model', 'Badges'], DATA.image.map((m, i) => [String(i + 1), m.n, badges(m.f)]))}

## Video, ${DATA.counts.video} models

${tbl(['#', 'Model', 'Per second', 'Badges'], DATA.video.map((m, i) => [
  String(i + 1), m.n, m.price ? `$${m.price}` : '-', badges(m.f),
]))}

${FOOT(['[Choosing the right model](../chat/model-selection.md)'])}
`));

files.push(write('reference/open-questions.md', `
# Open questions

Everything the live application could not answer, in one place. Each entry
names who is likely to own it.

## Resolved by walking the product

These were open in the first draft and are now answered:

${tbl(['Question', 'Answer'], [
  ['Can a visitor use the app without a wallet?', 'The app opens and the catalogue is browsable signed out. Sending a message requires sign-in.'],
  ['What are Min, Mid and Max?', 'A privacy filter, not a routing cost tier. Min allows every model; Max allows only TEE and E2EE.'],
  ['What is the routing control?', 'Request mode: Default, Saver, Balanced, Boost. Saver is cheapest-first, Boost is fastest-first.'],
  ['How many models are there?', `${DATA.counts.total}: ${DATA.counts.text} text, ${DATA.counts.image} image, ${DATA.counts.video} video.`],
  ['Is staking live?', 'No. The Staking page reads Coming Soon.'],
  ['Is Consensus free?', 'No. Pro plan and above, and requires sign-in.'],
  ['Is there video pricing?', `Yes, ${priced.length} video models publish a price per second, from $${priced[0].price} to $${priced[priced.length - 1].price}.`],
])}

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

${FOOT(['[User flows](user-flows.md)', '[Choosing the right model](../chat/model-selection.md)'])}
`));

/* ---- Getting started: FAQ ---- */
files.push(write('getting-started/faq.md', `
# Frequently asked questions

## Hey Open

### How is Hey Open different from ChatGPT or Claude?

Those are models. Hey Open is the workspace that brings ${DATA.counts.total} of them
together, with one memory and a privacy setting you choose per
conversation, so you pick the right model per task instead of
reorganising your work around one vendor.

### Do I need a separate subscription for each model?

No. One Hey Open plan is intended to cover the catalogue. What your
account can actually run depends on your plan and provider eligibility.

### Can I switch models without losing context?

Yes, within a conversation. Different models support different context
lengths, so a very long thread may not carry over in full.

### Do I need an account to start?

You can open the app, browse all ${DATA.counts.total} models, and open Image Tools and
Audio Tools without connecting a wallet. Sending a message requires
signing in: every model in the picker shows a **Sign in** marker.

## Privacy

### What do Min, Mid and Max do?

They are a privacy filter, not a speed or cost setting. **Min** allows
every model. **Mid** allows Private, TEE and E2EE models only. **Max**
allows TEE and E2EE models only.

### Is Incognito the same as private?

No. **Incognito** means the provider does not receive your identity. It
does not mean the provider stores nothing. **Private** means zero data
retention, and **TEE** and **E2EE** are stronger again.

### Which models are the most private?

The ${DATA.text.filter((m) => m.f.includes('E2EE')).length} models badged **E2EE**. The prompt is encrypted on your
device and decrypted only inside a verified enclave.

## Models and usage

### What is the difference between the privacy filter and request mode?

The privacy filter decides **which models you may use**. Request mode
decides **which provider serves them**, biased toward cost or speed.

### Why did a model disappear from the picker?

Either you raised the privacy filter, or you switched to **Boost** and
the model is badged **Not in Boost**.

### Which models can search the web?

The ${DATA.text.filter((m) => m.f.includes('Web')).length} badged **Web**. Everything else answers from training data.

### How much does video cost?

${DATA.video.filter((v) => v.price).length} video models publish a price per second of output. See [Video](../create/video.md).

## Plans

### Is Consensus Mode free?

No. The app states it is available to members on the Pro plan and above,
and it requires signing in.

### Can I stake tokens?

Not yet. Staking is a **Coming Soon** page in the current build.

${ASK('Free tier allowance, Pro price inside the app, credit mechanics, and what happens when a user runs out.')}

${FOOT(['[What is Hey Open?](what-is-hey-open.md)', '[Privacy filter](../chat/privacy-filter.md)', '[Choosing the right model](../chat/model-selection.md)'])}
`));

/* ---- Workspace: agents ---- */
files.push(write('workspace/agents.md', `
# Agents

The agent marketplace sits under **More** in the sidebar, at /agents.

![The agent marketplace](../images/11-agent-marketplace.jpg)

The page describes itself as: every agent, in one place. Discover
specialized AI agents, explore their capabilities and launch the right
agent for your task.

${tbl(['Agent', 'Category', 'What it does', 'Tier'], DATA.agents.items.map((x) => ['**' + x[0] + '**', x[1], x[2], x[3]]))}

{% hint style="warning" %}
**Every agent listed is badged Coming Soon.** The marketplace is
browsable, but no agent can be launched in the current build. The ratings
and download counts on the cards are placeholder values and should not be
quoted anywhere.
{% endhint %}

## Good to know

- Agents are tiered Free, Premium and Enterprise, which implies a plan gate once they ship.
- Each card lists the models the agent would use.
- The home screen **Launch Agent** quick action opens this same marketplace.

${ASK('When agents ship, what each tier costs, whether users can build their own, and how an agent run is charged.')}

${FOOT(['[Home and Community Feed](home.md)', '[What is Hey Open?](../getting-started/what-is-hey-open.md)'])}
`));

/* ---- Workspace: home ---- */
files.push(write('workspace/home.md', `
# Home and Community Feed

![The home screen](../images/08-home.jpg)

Home carries a composer, four quick actions, and a feed of community
posts.

## Quick actions

${tbl(['Action', 'Label', 'Description', 'State'], DATA.homeQuickActions.map((q) => ['**' + q[0] + '**', q[1] || '-', q[2], q[3]]))}

## Agents and Tools tabs

Two tabs sit under the hero, **Agents** and **Tools**, which change what
the home screen offers.

## Community Feed

A grid of dated image and video posts below the quick actions.

${ASK('Who can post to the community feed, whether posts are moderated, and whether a user can keep their generations out of it.')}

${FOOT(['[Agents](agents.md)', '[Getting around the workspace](../getting-started/workspace.md)'])}
`));

/* ---- Workspace: AI studio ---- */
files.push(write('workspace/ai-studio.md', `
# AI Studio: Model Factory and Staking

The sidebar groups two destinations under **AI Studio**. Neither is
available in the current build.

${tbl(['Area', 'Described in the app as', 'State'], DATA.nav['AI STUDIO'].map((r) => ['**' + r[0] + '**', r[1], '**' + r[2] + '**']))}

Opening either shows the title, that description, and a Coming Soon
badge. Nothing else is on the page.

{% hint style="danger" %}
The marketing site describes staking, buybacks and burns as part of the
$OPEN economy, in the present tense. In the application, Staking is a
Coming Soon page.

Until it ships, help articles must not explain how to stake, what the
rewards are, or how to unstake. Documenting an irreversible on-chain
action that does not exist yet is the worst outcome available here.
{% endhint %}

${ASK('Ship dates for Model Factory and Staking, and whether the Token Dashboard under More is a third separate surface or the same thing.')}

${FOOT(['[What is Hey Open?](../getting-started/what-is-hey-open.md)', '[Open questions](../reference/open-questions.md)'])}
`));

/* ---- Account ---- */
files.push(write('account/account-and-data.md', `
# Account and data

## Signing in

The header and the sidebar foot both offer **Connect Wallet**. Every
model in the picker shows **Sign in**.

${ASK('The full list of sign-in methods. Only Connect Wallet is visible signed out; whether email or social sign-in exists was not established.')}

## Themes

Light, dark and system themes are selectable from the sidebar header.

## Recent chats and search

The sidebar keeps a **Recent chats** list with a new-chat control. Chat
search is at the top of the sidebar, or **Ctrl K**.

![Chat search](../images/07-search-chats.jpg)

## Invite and earn

**Invite & Earn $10** sits at the foot of the sidebar.

${ASK('Referral terms: what the inviter and the invitee each receive, when it pays out, and any cap.')}

## Your data

${ASK('Whether conversations can be exported, whether memory can be exported or imported, what deleting a conversation removes, and what deleting an account removes. None of this was visible signed out. Account deletion is irreversible, so nothing should be published until it has been QA tested.')}

${FOOT(['[Memory](../chat/memory.md)', '[Signing in and accounts](../getting-started/accounts.md)'])}
`));

/* ---- Help ---- */
files.push(write('help/troubleshooting.md', `
# Troubleshooting

## A model is missing from the picker

Two settings hide models:

1. The **privacy filter**. On Mid or Max only Private, TEE and E2EE models appear. See [Privacy filter](../chat/privacy-filter.md).
2. **Request mode**. Models badged **Not in Boost** disappear in Boost mode. See [Request mode](../chat/request-mode.md).

## I cannot send a message

Sending requires signing in. Browsing the catalogue does not.

## Consensus will not open

Consensus requires signing in and a Pro plan. The gate says so.

## A page says Coming Soon

Model Factory, Staking and Voice Chat are unavailable in the current
build, and every agent in the marketplace is badged Coming Soon.

## The model forgot something from earlier

The thread may have exceeded the model context window, or trimming
removed it. Restate the decisive requirement explicitly.

## A model gave a different answer than last time

If the model pill reads **Auto**, two requests can be served by different
models. Name a model when you need a reproducible result.

${ASK('Error messages, rate-limit behaviour, what to do about a failed media job, and the in-app support path. A Contact support control exists on the chat screen but was not exercised.')}

${FOOT(['[Privacy filter](../chat/privacy-filter.md)', '[Request mode](../chat/request-mode.md)', '[Frequently asked questions](../getting-started/faq.md)'])}
`));

files.push(write('help/whats-new.md', `
# What is new

A place to record changes as they ship. Nothing here is an official
announcement; these are observations from walking the product.

## Observed on ${CAPTURED}

- **Consensus Mode** carries a NEW badge in the sidebar.
- The catalogue holds ${DATA.counts.total} models: ${DATA.counts.text} text, ${DATA.counts.image} image, ${DATA.counts.video} video.
- ${DATA.video.filter((v) => v.price).length} video models publish a price per second of output.
- **Model Factory**, **Staking** and **Voice Chat** are Coming Soon.
- Every agent in the marketplace is Coming Soon.

${ASK('A real changelog. This page should be fed by whoever ships, not reconstructed from a walkthrough.')}

${FOOT(['[What is Hey Open?](../getting-started/what-is-hey-open.md)'])}
`));

/* ---- done ---- */
console.log(`Wrote ${files.length} pages to product-docs/gitbook/`);
files.forEach((f) => console.log('  ' + f));
