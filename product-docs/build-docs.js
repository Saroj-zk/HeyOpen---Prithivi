/**
 * Builds the five Help Center documents described in the content sheet.
 *
 * ------------------------------------------------------------------
 * SOURCES, in the order they were given weight:
 *
 *   1. The content sheet. Each row's Contents column is the checklist for
 *      that document; every item in it has a section here.
 *   2. The reference help centres named in the sheet's last column:
 *      help.anuma.ai and venice.ai. These set the SHAPE: short intro, a
 *      table of facts, numbered Step walkthroughs for anything a reader
 *      has to do, a "Good to know" list of gotchas, a grouped FAQ, and
 *      "Related articles" at the foot. Venice's privacy page supplies the
 *      four-mode privacy classification pattern used in document 3.
 *   3. Hey_Open_Help_Center_Complete.docx, the first draft, for the body
 *      copy and for what is and is not known.
 *   4. The landing site itself, for the few figures that could be checked.
 *
 * ------------------------------------------------------------------
 * The draft closes with its own publication checklist calling itself "an
 * editorial draft built on public claims and prior project terminology;
 * it is not a verified statement of production functionality."
 *
 * So anything unconfirmed appears as a YELLOW HIGHLIGHTED PLACEHOLDER in
 * the sentence where the fact belongs, rather than as a warning box. The
 * placeholder states exactly what to ask for. Search the document for
 * yellow, fill it in, and the sentence is finished.
 *
 * ------------------------------------------------------------------
 * NO EM DASHES anywhere in the content. Sentences are built with commas,
 * colons and full stops instead. The build asserts this at the end.
 *
 * Run: node product-docs/build-docs.js
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, LevelFormat,
} = require('docx');

const OUT = __dirname;
const UPDATED = 'Last updated 3 November 2026. Draft for internal review.';

const PAGE = { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } };

const INK = '1A1A1A';
const MUTED = '5A5A5A';
const RULE = 'D4D4D4';

/* ---------------- runs ---------------- */

/* A paragraph built from parts. A plain string is body text; {ph: '...'}
   is a yellow placeholder naming the fact that is missing. */
function runs(parts, opts = {}) {
  return parts.map((p) =>
    typeof p === 'string'
      ? new TextRun({ text: p, size: opts.size || 21, color: opts.color || INK, italics: !!opts.italics, bold: !!opts.bold })
      : new TextRun({ text: p.ph, size: opts.size || 21, color: INK, highlight: 'yellow' })
  );
}

const P = (parts, opts = {}) =>
  new Paragraph({ spacing: { after: opts.after === undefined ? 140 : opts.after }, children: runs(Array.isArray(parts) ? parts : [parts], opts) });

const H1 = (t) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_1 });
const H2 = (t) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_2 });
const H3 = (t) => new Paragraph({ text: t, heading: HeadingLevel.HEADING_3 });

const BUL = (parts) =>
  new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 70 }, children: runs(Array.isArray(parts) ? parts : [parts]) });

/* A Step heading plus its explanation, which is how both reference help
   centres present anything the reader has to carry out. */
const STEP = (n, title, parts) => [
  new Paragraph({ spacing: { before: 170, after: 60 }, children: [new TextRun({ text: `Step ${n}: ${title}`, bold: true, size: 21, color: INK })] }),
  new Paragraph({ spacing: { after: 110 }, children: runs(Array.isArray(parts) ? parts : [parts]) }),
];

const SPACER = () => new Paragraph({ spacing: { after: 200 }, children: [] });

/* ---------------- tables ---------------- */

function TABLE(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const mk = (content, bold, fill, w) =>
    new TableCell({
      width: { size: w, type: WidthType.DXA },
      shading: fill ? { type: ShadingType.CLEAR, fill } : undefined,
      margins: { top: 90, bottom: 90, left: 130, right: 130 },
      children: [new Paragraph({ children: runs(Array.isArray(content) ? content : [content], { size: 19, bold }) })],
    });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => mk(h, true, 'EDEFF2', widths[i])) }),
      ...rows.map((r) => new TableRow({ children: r.map((c, i) => mk(c, false, undefined, widths[i])) })),
    ],
  });
}

/* ---------------- shell ---------------- */

function doc(meta, body) {
  return new Document({
    creator: 'Hey Open',
    title: meta.title,
    description: meta.summary,
    numbering: {
      config: [
        { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 240 } } } }] },
      ],
    },
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 21, color: INK } },
        title: { run: { font: 'Calibri', size: 44, bold: true, color: INK }, paragraph: { spacing: { before: 0, after: 80 }, keepNext: true } },
        heading1: { run: { font: 'Calibri', size: 30, bold: true, color: INK }, paragraph: { spacing: { before: 320, after: 140 }, keepNext: true } },
        heading2: { run: { font: 'Calibri', size: 24, bold: true, color: INK }, paragraph: { spacing: { before: 240, after: 110 }, keepNext: true } },
        heading3: { run: { font: 'Calibri', size: 21, bold: true, color: MUTED }, paragraph: { spacing: { before: 180, after: 90 }, keepNext: true } },
      },
    },
    sections: [{
      properties: { page: PAGE },
      children: [
        new Paragraph({ text: meta.title, heading: HeadingLevel.TITLE }),
        new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: meta.subtitle, size: 23, color: MUTED })] }),
        new Paragraph({
          spacing: { after: 100 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
          children: [new TextRun({ text: `${meta.category}  ·  Owner: ${meta.owner}  ·  Destination: ${meta.location}`, size: 18, color: MUTED })],
        }),
        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({ text: 'Anything highlighted in yellow is a fact nobody has confirmed yet. Each one names what to ask for. Fill them in or delete the sentence before this goes to customers.', size: 19, color: MUTED, italics: true })],
        }),
        ...body,
        new Paragraph({
          spacing: { before: 320 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
          children: [new TextRun({ text: UPDATED, size: 18, color: MUTED })],
        }),
      ],
    }],
  });
}

const RELATED = (items) => [H1('Related articles'), ...items.map((i) => BUL(i))];

/* ================================================================== */
/* 1. About & Features                                                 */
/* ================================================================== */

const about = doc(
  {
    title: 'Hey Open: About & Features',
    subtitle: 'What Hey Open is, who it serves, and how it differs from a single-model chatbot',
    category: 'Product & Marketing', owner: 'Marketing', location: 'Website / About & Features',
    summary: 'What Hey Open is, who it serves, and how it differs from a single-model chatbot.',
  },
  [
    P([ 'Hey Open is a privacy-focused, multi-model AI workspace. One subscription gives you conversational AI, analysis, coding help and creative generation across many providers, so you stop keeping a separate account, a separate bill and a separate conversation history for each one.' ]),
    P([ 'Available on: web at ', { ph: 'CONFIRM: the canonical public URL. The draft cites hey-open.vercel.app; the site metadata uses openledger.xyz' }, '. The application runs at ais.openledger.xyz/chat. Native desktop, iOS and Android availability: ', { ph: 'CONFIRM: which platforms have a released build, and the download links' }, '.' ]),
    P([ 'Hey Open is the consumer-facing product. OpenLedger is the network and infrastructure name behind parts of it, which is why you may see the Hey Open brand on the website and an OpenLedger address in the application or the API. Seeing a blockchain feature described on a marketing page does not mean it is live in the chat product yet.' ]),

    H1('One workspace, every model'),
    P([ 'Switching AI apps normally means starting over. In Hey Open the conversation and your saved context stay in one place: choose a different model for each task and it can pick up where the last one left off.' ]),
    P([ 'The catalogue spans text, image, video, audio and music. The public site advertises ', { ph: 'CONFIRM: catalogue size. The site says 200+ models; the models page says 200+ from N providers' }, '. What any individual account can actually run depends on the current catalogue, provider availability, the plan and the processing route.' ]),

    H1('What else you can do'),
    TABLE(
      ['Feature', 'What it does'],
      [
        ['Consensus Mode', 'Sends one prompt to several models at once and synthesises a combined answer, so you can see where they disagree.'],
        ['Universal Memory', 'Keeps selected preferences, project facts and decisions so every model you use already has the context.'],
        ['Auto routing', 'You describe the task instead of picking a model, and Hey Open selects a capable one.'],
        ['Create', 'Images, video, audio and music from models in the same catalogue as chat.'],
        ['API and agents', 'An OpenAI-compatible chat-completions endpoint, plus agent workflows for developers.'],
        ['Token dashboard', 'Stake $OPEN. Described in the economics pages as linked to compute credits.'],
      ],
      [2500, 7580]
    ),
    SPACER(),

    H1('Who Hey Open is for'),
    TABLE(
      ['Audience', 'What they use it for'],
      [
        ['Everyday users and learners', 'Answering questions, comparing options, organising plans, understanding concepts, writing clearly.'],
        ['Professionals and researchers', 'Drafting, summarisation, structured analysis, and comparing reasoning across models without separate workflows.'],
        ['Developers', 'Code, documentation, debugging, design decisions, and an OpenAI-compatible API for their own applications.'],
        ['Creators and marketing teams', 'Ideas and scripts, image and video generation, audio and music, in one workspace.'],
        ['Businesses and enterprise teams', 'Custom-branded AI products, managed inference and organisation-level controls.'],
      ],
      [2900, 7180]
    ),
    SPACER(),
    P([ 'You do not have to belong to one group. A single project can involve research, code, a presentation outline and image prompts, and Hey Open is built so you can choose a different model at each stage.' ]),

    H1('What you can do'),
    H2('Chat and research'),
    P([ 'Ask questions, iterate on writing, compare solutions and investigate complex topics. Pick a specific model, or use Auto. Quality, latency, context size and whether web results are available all differ by model.' ]),
    H2('Write and code'),
    P([ 'Draft articles and emails, analyse information, request code explanations, work through debugging. Test generated code and verify citations before relying on either.' ]),
    H2('Create across formats'),
    P([ 'Develop a story with a text model, design a still with an image model, build a moving shot with a video model. Whether a generated asset carries into the next model automatically or has to be reattached: ', { ph: 'CONFIRM: does a generated image pass to a video model automatically, or must the user reattach it' }, '.' ]),
    H2('Compare multiple models'),
    P([ 'Consensus Mode is useful for surfacing disagreement on a consequential question. Agreement between models does not establish that an answer is true: models can share training data and repeat the same error. Running several models also consumes more usage than a single turn.' ]),
    H2('Keep relevant context'),
    P([ 'Universal Memory stores selected reusable context, not a full copy of every conversation. The memory page describes browser-local storage and a control governing whether memory is shared with models routed to outside providers, which is off by default.' ]),

    H1('Privacy'),
    P([ 'Hey Open states it does not use private chats or Universal Memory to train its own models without separate disclosed authorisation. Beyond that, privacy is not one property of the whole product: it depends on which model you choose and how that request is routed.' ]),
    TABLE(
      ['Layer', 'What happens', 'Who controls it'],
      [
        ['Your device', 'Conversation history can remain local to your browser.', 'You'],
        ['Hey Open', 'Relays the request, adds selected memory context if enabled.', 'Hey Open'],
        ['Model provider', 'Processes the prompt under its own retention and training terms.', 'The provider'],
      ],
      [2000, 5200, 2880]
    ),
    SPACER(),
    P([ 'The published Privacy Policy says external providers may receive prompts and relevant context, that some routes involve temporary handling, and that zero-retention restrictions apply only where that particular arrangement covers them. The homepage currently carries blanket zero-retention and no-training language, which is not compatible with that as written. Route-by-route provider matrix: ', { ph: 'REQUIRED BEFORE PUBLICATION: a table of which providers receive data on which route, and what each retains' }, '.' ]),
    P([ 'Never put passwords, recovery phrases, secret keys or API credentials into a prompt, on any route.' ]),

    H1('Plans'),
    TABLE(
      ['Plan', 'Price', 'What you get'],
      [
        ['Free', ['$0. ', { ph: 'CONFIRM: what the free tier includes' }], [{ ph: 'CONFIRM: which models, which modalities, and the monthly allowance' }]],
        ['Hey Open Pro', '$20 per month', ['Premium models across the catalogue, shared memory, and generation advertised as unlimited for supported text and image models. ', { ph: 'CONFIRM: whether video, audio and music are included or metered separately' }]],
        ['Annual', [{ ph: 'CONFIRM: whether an annual plan exists and its total term price' }], [{ ph: 'CONFIRM: discount versus monthly' }]],
      ],
      [1900, 3200, 4980]
    ),
    SPACER(),
    P([ 'The $20 figure is corroborated by the live pricing section, which sets it against eight separate subscriptions totalling $165. See the Plans, Pricing & Credits Guide for how usage is measured.' ]),

    H1('Hey Open versus a single-model chatbot'),
    TABLE(
      ['Area', 'Typical single-model chatbot', 'Hey Open'],
      [
        ['Model choice', 'One provider or model family', 'Search and choose across providers and modalities'],
        ['Switching tasks', 'Another app or another subscription', 'Switch model inside the same workspace'],
        ['Complex answers', 'One perspective at a time', 'Consensus Mode compares several models'],
        ['Lasting context', 'Tied to that provider’s app', 'Universal Memory carries context across models'],
        ['Media', 'Limited to one vendor’s capabilities', 'Text, image, video, audio and music in one catalogue'],
        ['Developer access', 'Provider-specific account and SDK', 'One OpenAI-compatible endpoint plus Auto routing'],
        ['Privacy', 'Depends on that provider', 'Route-specific protections you can choose per conversation'],
      ],
      [1900, 3900, 4280]
    ),
    SPACER(),
    P([ 'This describes design, not a guarantee that every capability behaves identically across providers. More models do not automatically produce a more accurate answer.' ], { italics: true, color: MUTED }),

    H1('Good to know'),
    BUL([ 'A quoted context window is a technical upper limit, not permission to upload unlimited content.' ]),
    BUL([ 'A privacy label such as TEE or E2EE is route-specific and may not mean the same thing across two providers.' ]),
    BUL([ 'Consensus Mode is not fact-checking. It shows disagreement; it does not resolve it.' ]),
    BUL([ 'Image, video and audio generation may be metered separately from text even on a plan advertising unlimited text.' ]),
    BUL([ 'Minimum age to use Hey Open: ', { ph: 'CONFIRM: minimum age from the Terms' }, '.' ]),
    BUL([ 'The published Terms still contain placeholders for the legal entity’s jurisdiction and registered address. Do not state an entity name, office address or regulated status until those are filled in.' ]),

    H1('Frequently asked questions'),
    H3('How is Hey Open different from ChatGPT or Claude?'),
    P([ 'Those are models. Hey Open is the workspace that brings many models together with shared context, so you pick the right one for each task instead of reorganising your work around a single vendor.' ]),
    H3('Do I need a separate subscription for each model?'),
    P([ 'No. One Hey Open plan is intended to cover the catalogue. Which models your account can actually run depends on your plan, provider eligibility and region.' ]),
    H3('Can I switch models without losing context?'),
    P([ 'Yes, within a conversation. Different models support different context lengths, so a very long thread may not carry over in full.' ]),
    H3('Do I need an account to start?'),
    P([ 'You can open the application, read the whole model catalogue and look around without connecting a wallet. Sending a message requires signing in: every model in the picker shows a Sign in marker. Verified in the live application on 4 November 2026.' ]),
    H3('Does Hey Open train on my chats?'),
    P([ 'Hey Open states it does not train its own models on private chats or memory without separate authorisation. What the model provider does with a prompt is governed by that provider’s own terms.' ]),

    H1('Company and contact'),
    TABLE(
      ['Item', 'Value'],
      [
        ['Product brand', 'Hey Open'],
        ['Network referenced', 'OpenLedger'],
        ['Web application', 'ais.openledger.xyz/chat'],
        ['Support, billing, privacy', 'support@heyopen.ai'],
        ['Enterprise and custom-branded AI', 'marketing@openledger.xyz'],
        ['Legal entity and registered address', [{ ph: 'CONFIRM: entity name and registered address once the Terms placeholders are filled' }]],
      ],
      [3400, 6680]
    ),
    SPACER(),
    ...RELATED([ 'Getting Started & Account Management Guide', 'Plans, Pricing & Credits Guide', 'AI Model Catalog & Routing Guide', 'Hey Open User Guide: Text, Images & Videos' ]),
  ]
);

/* ================================================================== */
/* 2. Plans, Pricing & Credits                                         */
/* ================================================================== */

const pricing = doc(
  {
    title: 'Plans, Pricing & Credits Guide',
    subtitle: 'What each plan includes, how usage is measured, and how billing works',
    category: 'Product & Marketing', owner: 'Marketing', location: 'Website / Pricing + Help Center',
    summary: 'Plans, feature differences, credits, routing charges, balances, renewal and fair use.',
  },
  [
    P([ 'Credits are how Hey Open measures usage. Sending a message, generating an image and creating a video all consume them, and your plan sets how many you get. This guide covers what each plan includes, what consumes credits, how to see your usage, and what happens at renewal.' ]),

    H1('1. Plans'),
    TABLE(
      ['Plan', 'Price', 'Credits per month', 'What you get'],
      [
        ['Free', '$0', [{ ph: 'CONFIRM: free credit grant' }], [{ ph: 'CONFIRM: which models and modalities are included on Free' }]],
        ['Hey Open Pro', '$20 per month', [{ ph: 'CONFIRM: Pro credit grant, or confirm Pro is not credit-metered' }], 'Premium models across the catalogue, shared memory, generation advertised as unlimited for supported text and image models.'],
        ['Annual', [{ ph: 'CONFIRM: annual price' }], [{ ph: 'CONFIRM' }], [{ ph: 'CONFIRM: whether an annual plan is offered at all' }]],
      ],
      [1700, 2100, 2400, 3880]
    ),
    SPACER(),
    P([ 'The $20 monthly figure is corroborated by the live pricing section. Every other figure in that table is unconfirmed.' ], { italics: true, color: MUTED }),

    H2('What "unlimited" means'),
    P([ 'The landing page advertises unlimited supported text and image generation. The Terms of Service separately permit model-specific prices, included credits, rate limits and overages. Both cannot be published as written.' ]),
    P([ 'The entitlement that actually applies is whatever the checkout screen displays, together with any fair-use policy it incorporates. Reconciled definition: ', { ph: 'REQUIRED: a one-sentence definition of unlimited that the commercial owner will stand behind, including any fair-use ceiling' }, '.' ]),

    H1('2. How credits work'),
    P([ 'Three things are often confused. They are not interchangeable, and a support reply should never swap one for another.' ]),
    TABLE(
      ['Term', 'What it is', 'Transferable?'],
      [
        ['Plan entitlement', 'What functionality the account may use at all.', 'No'],
        ['Usage credits', 'An internal measure or spending allowance for eligible model requests.', [{ ph: 'CONFIRM: can a credit balance be transferred, refunded or cashed out' }]],
        ['$HEY', 'A proposed tokenised compute-credit mechanism described in the economics pages.', [{ ph: 'CONFIRM: whether $HEY exists today and whether it maps 1:1 to usage credits' }]],
      ],
      [1900, 5300, 2880]
    ),
    SPACER(),
    P([ 'Do credits roll over, reset or expire at the billing boundary: ', { ph: 'REQUIRED: reset, rollover and expiry rules. The published Terms leave all three unresolved' }, '.' ]),

    H1('3. What uses credits'),
    TABLE(
      ['Action', 'What drives the cost'],
      [
        ['Chat message', 'Input and output tokens, the model selected, and the conversation length, because prior turns are resent as context.'],
        ['Reasoning models', 'More output tokens per turn than a fast general model, so a higher cost for the same question.'],
        ['Image generation', 'The model and the requested resolution. Each regenerated variation is charged again.'],
        ['Video generation', 'Clip length and model. Typically the most expensive action available.'],
        ['Audio and music', 'Duration and model.'],
        ['Consensus Mode', 'Every participating model, plus an optional evaluating model. One question can cost several times a single turn.'],
        ['Agents and API', ['Per request, under ', { ph: 'CONFIRM: whether API usage draws on the same credit balance or is billed separately' }]],
        ['Web search', [{ ph: 'CONFIRM: whether a retrieval-enabled turn carries an extra charge' }]],
      ],
      [2300, 7780]
    ),
    SPACER(),

    H2('Request mode, the cost lever'),
    P([ 'The composer carries a request mode selector that decides which providers the gateway reaches for first. Read from the live application on 4 November 2026.' ]),
    TABLE(
      ['Mode', 'What it does', 'Cost effect'],
      [
        ['Default', 'Every model; the gateway picks the vendor.', [{ ph: 'CONFIRM' }]],
        ['Saver', 'Cheapest providers first.', 'Lowest, by its own description'],
        ['Balanced', 'A balance of speed and cost.', [{ ph: 'CONFIRM' }]],
        ['Boost', 'Fastest providers first.', [{ ph: 'CONFIRM' }]],
      ],
      [1600, 5200, 3280]
    ),
    SPACER(),
    P([ 'The sheet specifies "Min = Surplus, Med = Infron, Max = OpenRouter". That does not describe this product. Min / Mid / Max is a separate PRIVACY filter in the header, which limits which models may be used at all; it is not a cost tier, and the middle setting is spelled Mid. Surplus and Infron appear nowhere in the application. That line of the sheet needs rewriting.' ]),

    H1('4. Worked examples'),
    P([ 'The shape of each example below is correct. Every number has to come from a metering test against the authenticated application before publication.' ]),
    TABLE(
      ['Task', 'Model class', 'Credits', 'Note'],
      [
        ['Rewrite a short email', 'Fast general', [{ ph: 'MEASURE' }], 'Cost grows with thread length, not just message length.'],
        ['Summarise a 20 page PDF', 'Long context', [{ ph: 'MEASURE' }], 'Upload limits apply. See the User Guide.'],
        ['Review a pull request', 'Coding', [{ ph: 'MEASURE' }], 'Context must fit the diff plus surrounding code.'],
        ['Generate one image', 'Image', [{ ph: 'MEASURE' }], 'Each variation is charged separately.'],
        ['Generate a six second clip', 'Video', [{ ph: 'MEASURE' }], ['Confirm whether a cancelled job is charged: ', { ph: 'CONFIRM' }]],
        ['Ask four models at once', 'Consensus', [{ ph: 'MEASURE' }], 'Roughly the sum of the participants plus any judge model.'],
      ],
      [2600, 1700, 1500, 4280]
    ),
    SPACER(),

    H1('5. Viewing your usage'),
    ...STEP(1, 'Open Settings', [ 'Open the settings menu from the sidebar or your profile icon.' ]),
    ...STEP(2, 'Go to Usage', [ 'The settings illustration shows a Usage area alongside Payments and Billing. Exact label and location in the live app: ', { ph: 'CONFIRM: the real navigation path to the usage screen' }, '.' ]),
    ...STEP(3, 'Read the breakdown', [ 'Record the starting and ending balance for a test request, together with the model name, timestamp and any usage detail shown. ', { ph: 'CONFIRM: whether usage is broken down by model, and what time filters exist' }, '.' ]),
    ...STEP(4, 'Set a limit if you need one', [ 'For long tasks or API work, set an account or spending limit where the product permits it. ', { ph: 'CONFIRM: whether spend limits exist, and where' }, '.' ]),

    H1('6. Getting more credits'),
    BUL([ 'Upgrade your plan.' ]),
    BUL([ 'Buy a top-up pack: ', { ph: 'CONFIRM: whether top-up packs are sold, at what size and price' }, '.' ]),
    BUL([ 'Stake $OPEN. The economics pages describe staking as linked to compute credits. ', { ph: 'CONFIRM: whether staking currently grants credits, at what rate, and whether a threshold unlocks Pro' }, '.' ]),
    BUL([ 'Wait for the next reset, if credits reset rather than roll over.' ]),

    H1('7. Paying'),
    TABLE(
      ['', 'Card', 'Cryptocurrency'],
      [
        ['Renewal', 'Renews automatically unless the checkout says otherwise.', 'May require manual renewal.'],
        ['Reversible?', 'Subject to the processor and statutory rights.', 'A completed blockchain payment may be irreversible.'],
        ['Before paying', 'Check amount, currency, renewal date and tax.', 'Check asset, amount, chain, destination and confirmation rules.'],
        ['If it seems stuck', 'Check the statement and the account entitlement.', 'Check the transaction on the correct block explorer and compare the hash against the payment status in the product.'],
      ],
      [1700, 4100, 4280]
    ),
    SPACER(),
    P([ 'Never send a second transfer until support confirms the first cannot be reconciled. A wallet approval for a subscription is not the same thing as a stake or an agent-payment permission.' ]),
    P([ 'If the entitlement does not appear after a successful payment, do not buy a second subscription. Contact support with the original payment reference.' ]),

    H1('8. Failed requests'),
    P([ 'Processing can begin before an error reaches your browser, so an interrupted response is not automatically free. Before retrying, record the request time, the model, the visible balance before and after, the job status and any non-secret transaction ID, and check whether the original operation actually completed. This matters most for paid generation and agent actions.' ]),
    P([ 'Charging policy for partial failures, rounding and negative balances: ', { ph: 'REQUIRED: the Terms expressly leave failed-request charging, rounding rules and credit expiry unresolved' }, '.' ]),

    H1('9. Fair use and rate limits'),
    P([ 'Rate limits and fair-use thresholds: ', { ph: 'REQUIRED: per-minute and per-day request limits, any fair-use ceiling on unlimited plans, and the overage rate once a limit is passed' }, '.' ]),
    P([ 'Do not infer that no limit exists because none is published. Publishing this section with invented numbers would be worse than publishing nothing.' ], { italics: true, color: MUTED }),

    H1('10. Taxes, invoices and price changes'),
    P([ 'Confirm the amount, currency, renewal schedule, tax treatment and any promotion on the checkout page itself, then keep the receipt and the displayed next billing date. A card receipt and a public-chain transaction record prove different things: a transaction hash shows a transfer happened on a network, not that it was credited to the right account.' ]),
    P([ 'Invoices, tax IDs and billing address changes: ', { ph: 'CONFIRM: whether PDF invoices, tax IDs, downloadable receipts and self-service billing-address changes are supported' }, '. Price-change notice period: ', { ph: 'REQUIRED: the Terms contain an unfilled price-change notice period' }, '.' ]),

    H1('11. Cancelling'),
    ...STEP(1, 'Sign in with the right identity', [ 'A different wallet or browser profile may show a different plan.' ]),
    ...STEP(2, 'Open Subscription or Billing', [ 'Find the cancellation control. ', { ph: 'CONFIRM: the real path to cancellation in the live app' }, '.' ]),
    ...STEP(3, 'Read the effective date', [ 'The Terms describe cancellation at the end of the current paid period, not immediate forfeiture of the time you have paid for.' ]),
    ...STEP(4, 'Confirm and keep the receipt', [ 'Retain the confirmation message or email.' ]),
    ...STEP(5, 'Recheck the renewal status', [ 'If no cancellation control exists, email support@heyopen.ai from the authorised account channel with the plan and a non-sensitive order reference.' ]),
    P([ 'Cancelling the recurring service does not automatically revoke API keys, delete local memory, close your account or unwind an on-chain stake.' ], { after: 60 }),

    H1('12. Refunds'),
    P([ 'Contact support with the charge date, amount, currency, order or invoice number, account contact and a short description of the disputed event. For a blockchain payment, add the public transaction hash and the network. Never include full card numbers, private keys or recovery phrases.' ]),
    P([ 'Refund window and policy: ', { ph: 'REQUIRED: the Terms preserve statutory refund rights but contain an unfilled refund-policy URL. No universal refund window can be stated until it is filled' }, '.' ]),

    H1('Good to know'),
    BUL([ 'Consensus Mode charges for each participating model. It is the easiest way to spend a lot of credits by accident.' ]),
    BUL([ 'Auto routing can reduce waste on some requests. It does not make a paid feature free, and two Auto calls are not guaranteed to pick the same model.' ]),
    BUL([ 'A long conversation costs more per turn than a short one, because earlier turns are resent as context.' ]),
    BUL([ 'Crypto sent on the wrong chain may be unrecoverable. Support cannot reverse it.' ]),
    BUL([ 'Cancelling is not the same as deleting your account, and neither unwinds a stake.' ]),

    H1('Frequently asked questions'),
    H3('What happens when I run out of credits?'),
    P([ { ph: 'CONFIRM: what the out-of-credits screen offers on each plan' }, '.' ]),
    H3('Do unused credits roll over?'),
    P([ { ph: 'REQUIRED: rollover and expiry rules' }, '.' ]),
    H3('Is an interrupted response charged?'),
    P([ 'Possibly. Processing may have started before the error appeared. ', { ph: 'REQUIRED: the failed-request charging rule' }, '.' ]),
    H3('Can I upgrade or downgrade at any time?'),
    P([ { ph: 'CONFIRM: whether a downgrade takes effect immediately or at period end, and what happens to unused credits' }, '.' ]),
    H3('Does the API use the same credits as chat?'),
    P([ { ph: 'CONFIRM: API metering and whether it shares the subscription balance' }, '.' ]),

    ...RELATED([ 'Hey Open: About & Features', 'Getting Started & Account Management Guide', 'AI Model Catalog & Routing Guide' ]),
  ]
);

/* ================================================================== */
/* 3. Model Catalog & Routing                                          */
/* ================================================================== */

const models = doc(
  {
    title: 'AI Model Catalog & Routing Guide',
    subtitle: 'What is in the catalogue, how requests are routed, and how to choose a model',
    category: 'Product & Marketing', owner: 'Tech', location: 'In-app Model Directory / Help Center',
    summary: 'Model capabilities, privacy classification, routing tiers, selection, substitutions and outages.',
  },
  [
    P([ 'Hey Open gives one account access to models from many providers, across text, image, video, audio and music. This guide explains how the catalogue is organised, what the privacy labels mean, how routing picks a model when you do not, and how to choose one yourself.' ]),

    H1('1. How the catalogue is organised'),
    P([ 'Open the model picker and search by model name, provider or task. Models are grouped by what they can produce and by speciality: reasoning, coding, vision, long context and media generation.' ]),
    P([ 'Availability in the catalogue does not mean availability to your account. Entitlement, provider eligibility, region and current provider status all apply, and the catalogue changes as providers add and retire models.' ]),

    H1('2. Capability classes'),
    TABLE(
      ['Class', 'Use it for', 'Watch out for'],
      [
        ['Fast general', 'Short everyday requests, rewriting, summaries', 'Weaker on multi-step reasoning'],
        ['Reasoning', 'Planning, multi-step analysis, difficult maths', 'Slower and more expensive per turn'],
        ['Coding', 'Review, debugging, refactors, test generation', 'Context must fit the relevant code'],
        ['Vision', 'Interpreting supported images', 'A text model cannot read an image'],
        ['Long context', 'Large reference documents', 'The quoted window is an upper limit, not a target'],
        ['Image', 'Still image generation and editing', 'Often metered separately from text'],
        ['Video', 'Motion clips', 'Different queuing, duration caps and billing'],
        ['Audio and music', 'Narration, sound design, music', 'Speech-to-text, text-to-speech and music are separate services'],
      ],
      [1800, 4100, 4180]
    ),
    SPACER(),

    H1('3. Privacy classification'),
    P([ 'Models carry privacy labels. These describe the route a request takes, not a property of the whole product, and two providers can use the same word differently. Always read the label shown on the model you actually selected.' ]),
    TABLE(
      ['Label', 'What it means', 'Trade-off'],
      [
        ['Standard', 'The request is relayed to the provider, which processes it under its own retention and training terms.', 'Widest model selection. Assume the provider stores the content.'],
        ['Incognito', 'Routed so the provider does not receive your identity. The most common badge in the catalogue.', 'Weakest of the four. The provider still processes the prompt under its own terms.'],
        ['TEE', 'Trusted Execution Environment. Inference runs inside a hardware-isolated enclave, so the GPU operator cannot read the prompt.', 'Fewer models available. Responses may be slower.'],
        ['E2EE', 'End to end encrypted. The prompt is encrypted on your device and decrypted only inside a verified enclave.', ['Strongest protection. ', { ph: 'CONFIRM: which features are unavailable in E2EE, for example web search or memory' }]],
      ],
      [1400, 4600, 4080]
    ),
    SPACER(),
    P([ 'HTTPS in transit and server-side inference are not end-to-end encryption. Which models carry which label: ', { ph: 'REQUIRED: the list of models available under TEE and E2EE, and whether those routes are plan-gated' }, '.' ]),

    H1('4. The two controls: privacy filter and request mode'),
    P([ 'The application has two separate selectors, and the content sheet conflates them. Both were read from the live application on 4 November 2026.' ]),
    H2('Privacy filter: Min, Mid, Max'),
    P([ 'In the header, next to Memory. It decides which models you are allowed to use at all, by how strongly the route protects the prompt. Raising it removes models from the picker.' ]),
    TABLE(
      ['Setting', 'What it allows', 'Text models available'],
      [
        ['Min', 'Every model, whatever it is tagged.', '64 of 64'],
        ['Mid', 'Private, TEE and E2EE models only.', '10 of 64'],
        ['Max', 'TEE and E2EE models only, hardware-protected prompts.', '9 of 64'],
      ],
      [1500, 5200, 3380]
    ),
    SPACER(),
    H2('Request mode: Default, Saver, Balanced, Boost'),
    P([ 'On the composer, next to the model pill. This is the provider-selection control, and it reads Boost by default in the current build.' ]),
    TABLE(
      ['Mode', 'What it does'],
      [
        ['Default', 'Every model; the gateway picks the vendor.'],
        ['Saver', 'Cheapest providers first.'],
        ['Balanced', 'A balance of speed and cost.'],
        ['Boost', 'Fastest providers first.'],
      ],
      [1800, 8280]
    ),
    SPACER(),
    P([ 'Three text models and ten image models are badged Not in Boost and disappear from the picker in that mode.' ]),
    P([ 'CORRECTION TO THE CONTENT SHEET. The sheet specifies "Min = Surplus, Med = Infron, Max = OpenRouter". The product has no such mapping: the privacy tier is spelled Mid rather than Med and selects by privacy guarantee, not by provider; provider selection is the separate request mode above; and the names Surplus and Infron appear nowhere in the application. Whether request mode changes price: ', { ph: 'CONFIRM: the labels imply a cost difference but the app does not state one' }, '.' ]),

    H1('5. Auto routing'),
    P([ 'With Auto you describe the task instead of naming a model, and a routing layer assigns it to a capable model without always reaching for the most expensive one.' ]),
    P([ 'Auto does not guarantee the lowest price, a particular provider, or a correct answer. Two Auto calls on similar prompts are not guaranteed to select the same model or return the same result.' ]),
    H2('When to name a model instead'),
    BUL([ 'You need reproducible output, for testing or for a published result.' ]),
    BUL([ 'You need a specific capability, provider or output format.' ]),
    BUL([ 'You need a defined privacy route. Do not assume the router preserves a required TEE route or a provider exclusion unless that is implemented and visible.' ]),
    BUL([ 'An enterprise policy names the approved providers.' ]),
    P([ 'API callers should log the serving model returned in the response where supported, so a result can be traced back to the model that produced it.' ], { after: 60 }),

    H1('6. Token optimisation'),
    P([ 'A request carries more than your message: the current instruction, chat history, retrieved memory, tool definitions and any media. Token optimisation keeps what matters and trims duplicated or irrelevant material, using model selection, context reuse and prompt trimming.' ]),
    P([ 'The site promotes up to 60% fewer billed tokens in one example. That is a marketing estimate, not a guaranteed saving on a given request and not an entitlement to unlimited usage. Long inputs, several participating models and media generation can still produce high usage.' ]),
    P([ 'Trimming is not free of risk. Aggressive trimming can drop a decision made earlier in the thread. If correctness depends on a specific instruction or passage, restate it rather than trusting automatic selection.' ]),

    H1('7. Reading a model card'),
    ...STEP(1, 'Check the modality', [ 'Confirm the model produces what you need. A text model cannot generate an image, and a vision model reads images rather than creating them.' ]),
    ...STEP(2, 'Check the context limit', [ 'A 1M token window is a technical maximum. The interface may accept less, and a long context costs more per turn.' ]),
    ...STEP(3, 'Check the privacy label', [ 'Read the model-specific explanation rather than assuming a shared definition across providers.' ]),
    ...STEP(4, 'Check cost and availability', [ 'Note the estimated price or usage requirement and whether your plan includes the model, before you run a long job.' ]),

    H1('8. Choosing a model'),
    TABLE(
      ['If you are', 'Choose', 'Because'],
      [
        ['Rewriting a short email', 'Fast general', 'Cheapest and quickest; the task does not need reasoning'],
        ['Comparing two contracts', 'Long context with a confirmed privacy route', 'Document length plus confidentiality both matter'],
        ['Refactoring a repository', 'Coding', 'Needs to hold the relevant code and produce testable output'],
        ['Planning a migration', 'Reasoning, then a second model to critique it', 'Multi-step, and the failure modes are what matter'],
        ['Generating a hero image', 'Image, with dimensions confirmed first', 'Each variation is charged'],
        ['Interpreting a screenshot', 'Vision', 'Only a vision-capable model can read it'],
      ],
      [2700, 3200, 4180]
    ),
    SPACER(),
    P([ 'Choose by task, not popularity. The best known model is not automatically the best fit, and it is often not the cheapest.' ]),

    H1('9. Substitutions and outages'),
    P([ 'If a model is refused, a rejection does not mean your account or your funds are broken. The model may need a different plan, a separate entitlement or a region in which it is available. Record the exact wording of the refusal before retrying.' ]),
    P([ 'Fallback behaviour: ', { ph: 'REQUIRED: does Auto silently substitute another model when the first choice is unavailable, is the user told, and is the substitute charged at its own rate' }, '. Status page or incident channel: ', { ph: 'CONFIRM: where users should check for a provider outage' }, '.' ]),

    H1('10. The catalogue'),
    P([ 'The catalogue was read from the live model picker on 4 November 2026 with the privacy filter set to Min, so nothing was hidden. It holds 133 models.' ]),
    TABLE(
      ['Tab', 'Models', 'Notes'],
      [
        ['Text', '64', '9 are TEE or E2EE. 24 carry the Web badge and can retrieve live results. 4 are Uncensored.'],
        ['Image', '35', '9 Flux models are Not in Boost. 11 are Image required and cannot generate from text alone.'],
        ['Video', '34', '13 publish a price per second of output, from $0.02 to $0.28.'],
      ],
      [1400, 1400, 7280]
    ),
    SPACER(),
    P([ 'The full list is generated rather than typed, from product-docs/data/catalog.json, and appears in the GitBook at Reference, Model catalogue. Do not hand-edit it: a model list typed into a document goes stale silently and nobody notices until a customer is misled. Recapture the JSON and rebuild.' ]),
    P([ 'Not available from the picker, and still needed: ', { ph: 'REQUIRED: context window and per-message credit cost for each model. Neither is shown anywhere in the model picker' }, '.' ]),

    H1('Good to know'),
    BUL([ 'The catalogue changes. Any model name written into a document will eventually be wrong.' ]),
    BUL([ 'A context window is an upper limit, not a recommendation. Filling it is slow and expensive.' ]),
    BUL([ 'Privacy labels are route-specific. The same word can mean different things at two providers.' ]),
    BUL([ 'Auto is a convenience, not a guarantee. Name the model when the result has to be reproducible.' ]),
    BUL([ 'Media models are metered differently from text models, often substantially so.' ]),

    H1('Frequently asked questions'),
    H3('Which model should I use?'),
    P([ 'Start from the task, using the table in section 8. If you are unsure, Auto is a reasonable default for everyday work.' ]),
    H3('Why did my model change mid-session?'),
    P([ 'Auto may select differently per request, and a provider outage can trigger a substitution. ', { ph: 'CONFIRM: whether the user is notified when a substitution happens' }, '.' ]),
    H3('Does E2EE work with every feature?'),
    P([ { ph: 'CONFIRM: which features are disabled under E2EE' }, '.' ]),
    H3('Can I exclude a provider?'),
    P([ { ph: 'CONFIRM: whether a user or an enterprise policy can exclude named providers from routing' }, '.' ]),

    ...RELATED([ 'Hey Open User Guide: Text, Images & Videos', 'Plans, Pricing & Credits Guide', 'Hey Open: About & Features' ]),
  ]
);

/* ================================================================== */
/* 4. Getting Started & Account Management                             */
/* ================================================================== */

const started = doc(
  {
    title: 'Getting Started & Account Management Guide',
    subtitle: 'Signing in, your first conversation, settings, plans and closing your account',
    category: 'Getting Started', owner: 'Marketing', location: 'Help Center / Getting Started',
    summary: 'Sign-up, sign-in, first conversation, profile, plan changes and account deletion.',
  },
  [
    P([ 'This guide takes you from opening Hey Open for the first time through to managing or closing the account. If you only want to ask one question, section 3 is enough.' ]),

    H1('1. Before you begin'),
    BUL([ 'Use the official application address. Do not follow a link from an advertisement, a private message, or a wallet-connection popup embedded in another site.' ]),
    BUL([ 'Use a current browser with JavaScript enabled and a stable connection.' ]),
    BUL([ 'If you connect a wallet, use one you control. Wallet ownership is not the same as a conventional email account.' ]),
    P([ 'A wallet connection is not a request to transfer tokens. If your wallet shows an unexpected spending approval or transaction, reject it and check the address bar. No legitimate Hey Open support request will ever ask for your seed phrase, private key, verification code or API credentials.' ]),

    H1('2. Creating an account'),
    P([ 'Two entry descriptions currently exist and they do not agree. The website says a visitor can start without creating an account. The application presents Connect Wallet before authenticated details appear. A guest session, a standard account and a wallet-linked identity may differ in how long they persist, how they recover and what they can buy.' ]),
    ...STEP(1, 'Open the application', [ 'Go to ais.openledger.xyz/chat and read the entry screen it actually shows.' ]),
    ...STEP(2, 'Choose how to sign in', [ 'If wallet connection is requested, pick a wallet you control, confirm the domain and the permissions, and approve only an authentication signature you understand. If email or federated login is offered, complete its verification. Available methods: ', { ph: 'CONFIRM: the real list of sign-in options, for example wallet, Google, Apple, email' }, '.' ]),
    ...STEP(3, 'Verify if asked', [ 'Some accounts may need verification before full access. ', { ph: 'CONFIRM: whether verification exists, what it unlocks, and whether an unverified account is limited' }, '.' ]),
    ...STEP(4, 'Check the workspace reopens', [ 'Sign out and return. Confirm the same identity opens the same workspace with your history intact.' ]),
    ...STEP(5, 'Decide before you pay', [ 'Establish whether a guest session can be linked or recovered before buying anything. Do not create several paid identities until support confirms whether they can be merged.' ]),
    P([ 'Guest to account migration, wallet linking, session expiry and recovery: ', { ph: 'REQUIRED: does chat history follow the account, can a guest session be upgraded, and how is an account recovered if the wallet is lost' }, '.' ]),

    H1('3. Your first conversation'),
    ...STEP(1, 'Find the composer', [ 'The message box sits at the centre of the chat workspace.' ]),
    ...STEP(2, 'Pick a model, or use Auto', [ 'For a first question, Auto is fine. See the Model Catalog guide when the choice starts to matter.' ]),
    ...STEP(3, 'Ask something real but not sensitive', [ 'Try: "Explain how an API rate limiter works. Use a simple analogy first, then give a Node.js example."' ]),
    ...STEP(4, 'Read for scope before accuracy', [ 'Check whether the answer addressed the question you meant, then continue: "Now add an example using Redis and explain the trade-offs." The second turn should build on the first if the thread is retained.' ]),
    H2('If the answer is weak'),
    BUL([ 'Too broad: say what to keep, what to cut, and what a good answer looks like.' ]),
    BUL([ 'Misunderstood: ask the model to state its assumptions before continuing.' ]),
    BUL([ 'Confidently wrong: verify it elsewhere, or ask a second model to critique it. A second opinion sharpens scrutiny; it does not prove correctness.' ]),
    P([ 'Start with an ordinary question before enabling memory, connecting integrations or buying credits. Check usage before rerunning an expensive model repeatedly.' ], { after: 60 }),

    H1('4. Finding your way around'),
    TABLE(
      ['Area', 'What it is for'],
      [
        ['Chat', 'The composer, the thread, and the model picker.'],
        ['Model picker', 'Search by model, provider or task. Shows modality, context and privacy labels.'],
        ['Consensus Mode', 'Ask several models the same question and compare.'],
        ['Universal Memory', 'Review, add, edit and delete the context carried between models.'],
        ['Settings', ['Illustrated with General, Appearance, Memory, Payments, Billing, Usage, Data & Information and Storage. ', { ph: 'CONFIRM: the real settings tabs in the authenticated app' }]],
      ],
      [2400, 7680]
    ),
    SPACER(),
    P([ 'Before leaving a draft, copy anything you cannot afford to lose and check the session is saved.' ]),

    H1('5. Managing your profile and settings'),
    P([ 'Profile fields, display preferences and notification controls: ', { ph: 'CONFIRM: what a user can actually change, and where. The settings list above comes from a marketing illustration, not a verified menu' }, '.' ]),

    H1('6. Upgrading or downgrading'),
    ...STEP(1, 'Open the plan screen', [ 'Find Billing or Subscription in settings and choose a tier.' ]),
    ...STEP(2, 'Read what is included', [ 'Check the included models and modalities and every disclosed limit before choosing a payment method.' ]),
    ...STEP(3, 'Confirm the charge', [ 'Check amount, currency, renewal schedule, tax and any promotion on the checkout page itself.' ]),
    ...STEP(4, 'Return and verify', [ 'Go back to the account and confirm the entitlement appeared. If it did not, do not buy a second subscription: contact support with the original payment reference.' ]),
    ...STEP(5, 'Save the receipt', [ 'Keep the receipt and the displayed next billing date.' ]),
    P([ 'Downgrade behaviour: ', { ph: 'CONFIRM: does a downgrade take effect immediately or at period end, and what happens to unused credits' }, '.' ]),

    H1('7. Payment method'),
    P([ 'Card subscriptions normally renew automatically unless the checkout says otherwise. Crypto subscriptions may require manual renewal, and a completed blockchain payment may be irreversible. Verify asset, amount, chain, destination and confirmation rules in the live checkout before paying.' ]),
    P([ 'Changing a stored payment method: ', { ph: 'CONFIRM: whether a user can update or remove a stored card, and where' }, '.' ]),

    H1('8. Cancelling'),
    P([ 'Cancellation generally takes effect at the end of the current paid period rather than immediately. Full steps are in the Plans, Pricing & Credits Guide, section 11.' ]),
    P([ 'Cancelling does not revoke API keys, delete local memory, close your account or unwind an on-chain stake. Those are four separate actions.' ]),

    H1('9. Chat history'),
    P([ 'The privacy page states that private history can remain available locally in your browser. Retention by the model provider is a separate question governed by that provider’s terms, and operational metadata is a third. Treat them as three different answers when replying to a customer.' ]),
    P([ 'Exporting or deleting history: ', { ph: 'CONFIRM: whether a user can export conversations, in what format, and whether deleting a conversation removes it everywhere' }, '.' ]),

    H1('10. Deleting your account'),
    P([ 'Account deletion is irreversible and interacts with several other things at once. The table below is the shape the answer needs; each row has to be confirmed before this section can be published, because the draft’s own checklist says no irreversible steps should be documented without QA.' ]),
    TABLE(
      ['What', 'What happens on deletion'],
      [
        ['Conversations and history', [{ ph: 'CONFIRM' }]],
        ['Universal Memory', [{ ph: 'CONFIRM: including whether local browser memory is cleared' }]],
        ['Remaining credit balance', [{ ph: 'CONFIRM: forfeited, refunded, or blocked until spent' }]],
        ['Active subscription', [{ ph: 'CONFIRM: is it cancelled automatically' }]],
        ['API keys', [{ ph: 'CONFIRM' }]],
        ['Staked position', [{ ph: 'CONFIRM: does a stake block deletion, and is it unwound' }]],
        ['Data kept for legal reasons', [{ ph: 'CONFIRM: what is retained and for how long' }]],
      ],
      [3200, 6880]
    ),
    SPACER(),

    H1('11. Getting help'),
    P([ 'Email support@heyopen.ai. Include the feature, the browser, the exact error text, the approximate time, the model used and a non-secret account reference. Never include a password, recovery phrase, private key or bearer token.' ]),
    P([ 'For a billing question add the charge date, amount, currency and order number. For a blockchain payment add the public transaction hash and the network.' ]),

    H1('Good to know'),
    BUL([ 'A different wallet or browser profile is a different identity, and may show a different plan.' ]),
    BUL([ 'A rejected model does not mean a broken account. It often means a plan or entitlement difference.' ]),
    BUL([ 'A mobile browser is not a native app. Add to Home Screen creates a shortcut, not an installation.' ]),
    BUL([ 'Do not download a CLI or desktop build claiming to be Hey Open without verifying the source.' ]),
    BUL([ 'Cancelling, deleting and unstaking are three separate actions with three separate effects.' ]),

    H1('Frequently asked questions'),
    H3('Can I use Hey Open without an account?'),
    P([ 'Partly. The application opens without a wallet and the full catalogue is browsable, as are Image Tools and Audio Tools. Sending a message to any model requires signing in, and Consensus additionally requires the Pro plan.' ]),
    H3('Is there a mobile app?'),
    P([ { ph: 'CONFIRM: iOS and Android availability and store links. No verified download path was found during review' }, '.' ]),
    H3('Will my history follow me to a new device?'),
    P([ 'History is described as local to the browser, which suggests it does not. ', { ph: 'CONFIRM: whether any backup or sync exists' }, '.' ]),
    H3('What if I lose my wallet?'),
    P([ { ph: 'REQUIRED: the account recovery path when the wallet used to sign in is lost' }, '.' ]),

    ...RELATED([ 'Hey Open: About & Features', 'Plans, Pricing & Credits Guide', 'Hey Open User Guide: Text, Images & Videos' ]),
  ]
);

/* ================================================================== */
/* 5. User Guide                                                       */
/* ================================================================== */

const guide = doc(
  {
    title: 'Hey Open User Guide: Text, Images & Videos',
    subtitle: 'Working across chat, image, video and audio in one workspace',
    category: 'Product Guides', owner: 'Marketing', location: 'Help Center / Product Guide',
    summary: 'Text chat, reasoning, web search, images, video, uploads, exports, history and memory.',
  },
  [
    P([ 'This guide covers the day to day work: writing a good request, generating and refining media, moving between models in one thread, and getting the output back out again.' ]),

    H1('1. Text chat'),
    P([ 'Tell the model the deliverable, the audience, the inputs, the constraints and what must be checked. The more of those you leave out, the more the model invents.' ]),
    TABLE(
      ['Instead of', 'Ask'],
      [
        ['Write a launch post', 'Write a 400 word launch announcement for enterprise IT buyers. Avoid exaggerated security claims. Include a headline, a subhead and three benefits.'],
        ['Fix this code', 'In Node.js 22, explain why this request handler leaks connections. Show the smallest safe fix and a test.'],
        ['Summarise this', 'Summarise these minutes in five bullets, and separate decisions from unresolved issues.'],
        ['Make it shorter', 'Cut this to 150 words. Keep the second paragraph intact and do not change any figure.'],
      ],
      [2400, 7680]
    ),
    SPACER(),
    P([ 'Refine in follow-ups rather than rewriting the whole prompt, and switch to a specialised model for a second pass. Always test generated code and review dependencies and credential handling before production use. Generated content can be useful without being accurate, original, or safe to publish.' ]),

    H2('Reasoning'),
    P([ 'Reasoning models take longer and cost more per turn, and are worth it for planning, multi-step analysis and anything where the failure modes matter more than the prose. For a consequential decision, ask one model to propose and a second to attack the proposal.' ]),

    H2('Web search'),
    P([ 'Live retrieval works only on models that support it. When asking for anything time-sensitive, give the relevant date and ask for sources. An unverified citation can be fabricated: request a link and check that it resolves and is current.' ]),
    P([ 'Which models support retrieval, and whether it costs extra: ', { ph: 'CONFIRM' }, '.' ]),

    H1('2. Switching models mid-thread'),
    ...STEP(1, 'Stay in the same conversation', [ 'Continue where the context was introduced rather than opening a new thread.' ]),
    ...STEP(2, 'Change the model before you send', [ 'Select the new model, then write the next message.' ]),
    ...STEP(3, 'Name what to continue from', [ 'Say "Continue from the API decision above, but review it for security gaps." Do not assume the new model has read everything.' ]),
    ...STEP(4, 'Re-supply anything decisive', [ 'If the new model misses a requirement, quote it or attach the source again.' ]),
    P([ 'A switch does not guarantee the new model reproduces the previous interpretation, that every earlier token fits its context window, that a media asset transfers without reattachment, or that external-provider sharing settings can be bypassed.' ]),

    H1('3. Generating images'),
    ...STEP(1, 'Select an image-capable model', [ 'A text model cannot generate pictures. Check the modality on the model card.' ]),
    ...STEP(2, 'Describe the image, not the feeling', [ 'Cover subject, intended use, style, composition, background, lighting and framing.' ]),
    ...STEP(3, 'Set dimensions only if supported', [ 'Specify aspect ratio or resolution when the model exposes those controls. Supported sizes: ', { ph: 'CONFIRM: available resolutions and aspect ratios per image model' }, '.' ]),
    ...STEP(4, 'Assess before regenerating', [ 'Check anatomy, text rendering, logos, likeness and brand accuracy. Each regeneration is charged.' ]),
    ...STEP(5, 'Refine one variable at a time', [ 'Change the lighting or the composition, not both, or you will not know which change worked.' ]),
    H2('Prompt anatomy'),
    TABLE(
      ['Element', 'Example'],
      [
        ['Subject', 'A private AI workspace represented as modular glass panels'],
        ['Style', 'Editorial illustration, restrained'],
        ['Palette', 'Neutral background, blue-grey'],
        ['Lighting', 'Soft directional'],
        ['Composition', 'Wide 16:9, generous negative space'],
        ['Exclusions', 'No text, no logos'],
      ],
      [2200, 7880]
    ),
    SPACER(),
    P([ 'For a campaign, reuse a short visual brief covering identity, colours, prohibited elements and continuity rules, and a reference image where supported. Editing an existing image: ', { ph: 'CONFIRM: whether inpainting, outpainting or image-to-image editing is available, and on which models' }, '.' ]),

    H1('4. Generating video'),
    P([ 'Plan the shot before spending credits. Video is usually the most expensive thing in the product, and a vague prompt produces an expensive unusable clip.' ]),
    TABLE(
      ['Element', 'Example'],
      [
        ['Subject and action', 'Rain running down a glass office wall at dusk'],
        ['Camera', 'Locked off, slow focus pull to a distant skyline'],
        ['Duration', 'Six seconds'],
        ['Mood and palette', 'Muted blue light'],
        ['Exclusions', 'No text, no on-screen captions'],
      ],
      [2200, 7880]
    ),
    SPACER(),
    ...STEP(1, 'Choose a video-capable model', [ 'Check duration and resolution limits before writing the prompt.' ]),
    ...STEP(2, 'Supply a starting image if supported', [ 'For image to video, provide a permitted frame and describe only the movement you want added.' ]),
    ...STEP(3, 'Generate and wait', [ 'Media jobs queue differently from chat. Do not treat an unconfirmed job status as a finished asset.' ]),
    ...STEP(4, 'Review the clip', [ 'Check continuity, artefacts, incorrect text, duration and whether there is sound. Some models produce silent video; others include audio.' ]),
    P([ 'Limits per model: ', { ph: 'CONFIRM: maximum clip length, resolutions, aspect ratios, expected wait time and credit cost for each video model' }, '. Whether a cancelled or failed job is charged: ', { ph: 'CONFIRM' }, '.' ]),

    H1('5. Audio and music'),
    P([ 'Speech to text, dictation, text to speech, sound effects and music generation are different services. Confirm which one a model supports before submitting.' ]),
    BUL([ 'Narration: specify language, tone, pace and pronunciation notes.' ]),
    BUL([ 'Music: specify genre, instrumentation, mood and approximate duration where configurable.' ]),
    BUL([ 'Transcription: ask for timestamps or speaker separation only if the provider supports them.' ]),
    P([ 'Do not imitate a real person’s voice or upload a protected recording without rights and consent. A paid Hey Open plan does not grant ownership of third-party music or samples.' ]),

    H1('6. File uploads'),
    TABLE(
      ['Question', 'Answer'],
      [
        ['Which file types are accepted?', [{ ph: 'CONFIRM: supported document, image, audio and video formats' }]],
        ['What is the size limit?', [{ ph: 'CONFIRM: maximum file size, and any page or duration cap' }]],
        ['How many files per message?', [{ ph: 'CONFIRM' }]],
        ['How long is an upload kept?', [{ ph: 'CONFIRM: retention for uploaded files, and whether they are sent to the model provider' }]],
      ],
      [3400, 6680]
    ),
    SPACER(),
    P([ 'For a coding task, attach the error and the relevant code, never production credentials. For a document, say what to extract and in what format rather than asking for a general summary.' ]),

    H1('7. Working across media in one thread'),
    P([ 'A cross-media project usually runs: text model for the concept, script and storyboard; image model for reference frames; video model to animate a permitted frame; audio tools for voiceover or music. Review each step before starting the next.' ]),
    P([ 'Do not assume the next model can see the previous model’s output. Whether a generated asset carries forward automatically: ', { ph: 'CONFIRM: does a generated image pass to a video model automatically, or must it be reattached' }, '.' ]),
    P([ 'Keep a short reusable brief with visual identity, character details, brand colours, prohibited elements and continuity rules. This is what stops two providers interpreting the same project differently.' ]),

    H1('8. Exporting and downloading'),
    ...STEP(1, 'Check what you are actually getting', [ 'Confirm resolution, file extension, duration, any watermark, and whether metadata or the original prompt is embedded in the file.' ]),
    ...STEP(2, 'Download and keep the original', [ 'Keep source files and version names. Regenerating later will not reproduce the same asset.' ]),
    ...STEP(3, 'Check the rights before publishing', [ 'The Terms do not claim ownership of an output merely because it was generated, but they do not guarantee copyright eligibility or freedom from third-party claims. Obtain consent for real people’s likenesses.' ]),
    P([ 'If a download fails, try a current browser, allow downloads for the official origin and check available storage. Available export formats: ', { ph: 'CONFIRM: per modality' }, '.' ]),

    H1('9. Chat history'),
    P([ 'Private history can remain available locally in your browser. Provider retention and operational metadata are separate questions governed by the Privacy Policy. Copy anything you cannot afford to lose before leaving a draft.' ]),
    P([ 'Search, rename, pin, archive and delete: ', { ph: 'CONFIRM: which history controls exist' }, '. Temporary chat: ', { ph: 'CONFIRM: what a temporary chat does and does not store' }, '.' ]),

    H1('10. Memory toggles'),
    P([ 'Universal Memory stores selected reusable context such as preferences, project facts and decisions. It is not a transcript, and it is not the same thing as chat history.' ]),
    TABLE(
      ['Control', 'What it does'],
      [
        ['Add a memory manually', 'You write the fact yourself.'],
        ['Automatic capture', ['The product proposes memories from your conversations. Default state: ', { ph: 'CONFIRM: is automatic capture on or off by default' }]],
        ['Share with external models', 'Off by default. When off, memory is not sent to models routed to outside providers.'],
        ['Delete a memory', ['Removes it from the memory layer. Whether it is also removed from a provider that already received it: ', { ph: 'CONFIRM' }]],
      ],
      [2800, 7280]
    ),
    SPACER(),
    P([ 'Storage, encryption and portability: ', { ph: 'CONFIRM: where memory is stored, whether it is encrypted, the real size limit, whether it syncs across devices, and whether import and export exist' }, '.' ]),

    H1('11. Limitations'),
    BUL([ 'AI output can be inaccurate, outdated or unsuitable. Verify anything consequential.' ]),
    BUL([ 'A quoted context window is a technical upper limit, not permission to upload unlimited content.' ]),
    BUL([ 'Consensus Mode is not fact-checking. Models can share training data and repeat the same error.' ]),
    BUL([ 'A privacy label is route-specific and may not mean the same thing at two providers.' ]),
    BUL([ 'Media generation has different queuing, moderation and billing from chat.' ]),
    BUL([ 'An outline is not an exported artefact. No native slide-deck export or hosted app builder is established by the public site.' ]),

    H1('Good to know'),
    BUL([ 'Each regenerated image or clip is charged again. Decide what is wrong before pressing regenerate.' ]),
    BUL([ 'A long thread costs more per turn than a short one, because earlier turns are resent.' ]),
    BUL([ 'Reattach a file if the new model seems not to have seen it. That is usually what happened.' ]),
    BUL([ 'Never paste production credentials into a prompt, on any route or any plan.' ]),

    H1('Frequently asked questions'),
    H3('Why did the model forget what we agreed earlier?'),
    P([ 'The thread may have exceeded its context window, or trimming removed it. Restate the decisive requirement explicitly.' ]),
    H3('Can I edit an image I already generated?'),
    P([ { ph: 'CONFIRM: whether image editing, inpainting or image-to-image is supported' }, '.' ]),
    H3('Why is my video silent?'),
    P([ 'Some models produce silent video and others include audio. Check the model card before planning a soundtrack.' ]),
    H3('Can I use generated media commercially?'),
    P([ 'The Terms do not claim ownership of your output, but they do not guarantee copyright eligibility either. Check the provider licence for the specific model, and obtain consent for real likenesses.' ]),

    ...RELATED([ 'AI Model Catalog & Routing Guide', 'Getting Started & Account Management Guide', 'Plans, Pricing & Credits Guide' ]),
  ]
);

/* Pull word/document.xml out of a .docx buffer using only zlib. A docx is
   a zip of deflated entries; we need exactly one of them. */
function extractDocumentXml(buf, zlib) {
  let out = '';
  for (let i = 0; i < buf.length - 3; i += 1) {
    if (buf.readUInt32LE(i) !== 0x04034b50) continue;
    const method = buf.readUInt16LE(i + 8);
    const compSize = buf.readUInt32LE(i + 18);
    const nameLen = buf.readUInt16LE(i + 26);
    const extraLen = buf.readUInt16LE(i + 28);
    const name = buf.slice(i + 30, i + 30 + nameLen).toString('utf8');
    if (name !== 'word/document.xml') continue;
    const start = i + 30 + nameLen + extraLen;
    const data = buf.slice(start, start + compSize);
    out = method === 0 ? data.toString('utf8') : zlib.inflateRawSync(data).toString('utf8');
    break;
  }
  return out;
}

/* ---------------- write ---------------- */

const FILES = [
  ['1 - Hey Open - About & Features.docx', about],
  ['2 - Plans, Pricing & Credits Guide.docx', pricing],
  ['3 - AI Model Catalog & Routing Guide.docx', models],
  ['4 - Getting Started & Account Management Guide.docx', started],
  ['5 - Hey Open User Guide - Text, Images & Videos.docx', guide],
];

(async () => {
  let bad = 0;
  for (const [name, d] of FILES) {
    const buf = await Packer.toBuffer(d);
    fs.writeFileSync(path.join(OUT, name), buf);

    /* The no-em-dash rule, asserted rather than trusted. Read the file
       back, unzip document.xml and look for U+2014 and U+2013. Trusting
       that none were typed is exactly how one survives. */
    const AdmLess = require('zlib');
    const raw = fs.readFileSync(path.join(OUT, name));
    const xml = extractDocumentXml(raw, AdmLess);
    const dashes = (xml.match(/[–—]/g) || []).length;
    if (dashes) {
      bad += dashes;
      console.log(`        ${dashes} EM/EN DASH(ES) FOUND in ${name}`);
    }
    const marks = (xml.match(/CONFIRM|REQUIRED|MEASURE/g) || []).length;
    console.log(`${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${String(marks).padStart(3)} placeholders  ${name}`);
  }
  console.log(bad ? `FAILED: ${bad} dash(es) present` : 'OK: no em or en dashes in any document');
  if (bad) process.exitCode = 1;
})();
