/*
 * Amendments to the approved review copy.
 *
 * build-gitbook-full.js is a splitter: it must not quietly reword the
 * handbook. Everything that departs from the review copy lives here
 * instead, so the delta is one short, reviewable file rather than a
 * diff against 75 generated pages.
 *
 * Each entry says where the instruction came from, because a reader
 * needs to tell "the product changed" from "the document was wrong".
 */

// ---------------------------------------------------------------------
// 1. Replacements inside existing articles.
//    `find` must occur exactly once in that article, or the build fails
//    loudly rather than silently skipping the change.
// ---------------------------------------------------------------------
const EDITS = [
  {
    file: '10-open-and-token-economy/staking-and-benefits.md',
    why: 'Threshold changed by the product team, 10 November 2026: Pro is granted for $1,000 worth of $OPEN staked, not a fixed 100 tokens.',
    find: '| 100 $OPEN staked for Hey Open Pro | Advertised threshold; availability must be confirmed |',
    replace: '| $1,000 worth of $OPEN staked for Hey Open Pro | Current threshold. It is a value in dollars, not a fixed number of tokens, so the quantity of $OPEN required moves with the token price |',
  },
  {
    file: '10-open-and-token-economy/staking-and-benefits.md',
    why: 'The threshold is a dollar value, which behaves differently from a token count and is worth stating plainly.',
    find: '## Before participating',
    replace: [
      '## How the Pro threshold works',
      '',
      'Hey Open Pro is granted while you hold **$1,000 worth of $OPEN** staked. The',
      'threshold is denominated in dollars rather than in tokens, so the number of $OPEN',
      'it takes to reach it changes as the token price changes. A position that qualifies',
      'today can fall below the threshold without you selling anything, so check the',
      'current requirement rather than assuming a fixed token count.',
      '',
      '## Before participating',
    ].join('\n'),
  },
  {
    file: '07-plans-billing-and-account/plans-and-pricing.md',
    why: 'Staking is a second route to Pro and belongs where people compare prices.',
    find: '## Paid usage beyond subscriptions',
    replace: [
      '## Two routes to Pro',
      '',
      'Pro can be paid for monthly, or unlocked by staking $OPEN.',
      '',
      '| Route | What it takes | Status |',
      '| --- | --- | --- |',
      '| Subscription | The monthly plan price | Available now |',
      '| Staking | $1,000 worth of $OPEN staked, which you keep | Staking is not yet live in the application |',
      '',
      'Staking is not a cheaper subscription. The tokens stay yours and continue to earn,',
      'but they are locked while staked, subject to an unstaking cooling period, and their',
      'value moves with the market in a way a fixed monthly price does not. See',
      '[Staking $OPEN](../10-open-and-token-economy/staking-and-benefits.md).',
      '',
      '## Paid usage beyond subscriptions',
    ].join('\n'),
  },
  {
    file: '01-getting-started/terminology.md',
    why: '$HEY is not announced yet, 10 November 2026. Held back until it is.',
    find: '| $HEY | A proposed compute-credit concept discussed in ecosystem material, not interchangeable with $OPEN |\n',
    replace: '',
  },
  {
    file: '10-open-and-token-economy/overview.md',
    why: '$HEY is not announced yet, 10 November 2026. Held back until it is.',
    find: '- **$HEY:** A proposed compute-credit concept described in ecosystem material, not a replacement name for the $OPEN token.\n',
    replace: '',
  },
  {
    file: '12-reference/glossary.md',
    why: '$HEY is not announced yet, 10 November 2026. Held back until it is.',
    find: '| $HEY | Proposed compute-credit concept described in ecosystem materials |\n',
    replace: '',
  },
];

// ---------------------------------------------------------------------
// 3. Articles written but not published.
//    Nothing in the book may link to one, or the build fails.
// ---------------------------------------------------------------------
const DROP_PAGES = [
  {
    file: '10-open-and-token-economy/hey-compute-credits.md',
    why: '$HEY is not announced yet, 10 November 2026. The article stays in the review copy; remove this entry to publish it.',
  },
];

// ---------------------------------------------------------------------
// 2. Whole articles the review copy does not cover.
//    `after` places the page in SUMMARY immediately below that file.
// ---------------------------------------------------------------------
const NEW_PAGES = [
  {
    file: '07-plans-billing-and-account/referrals-and-affiliate.md',
    section: 'Plans, Billing & Account',
    after: '07-plans-billing-and-account/billing-history.md',
    why: 'The referral and affiliate programme is in the product but absent from the review copy.',
    body: `# Referrals and the affiliate programme

Hey Open pays a commission for users you refer who go on to subscribe. There are two
entry points, both in the account menu at the foot of the sidebar: **Copy referral
link**, which gives you your link straight away, and **Affiliate**, which opens the
programme page with the terms, a dashboard and an earnings calculator.

![The affiliate programme page](../.gitbook/assets/a14-affiliate-hero.jpg)

_The affiliate programme page, reached from Affiliate in the account menu._

## What the programme pays

| Term | What the page states |
| --- | --- |
| Commission | 20% of every payment made by a user you refer |
| Duration | Up to 12 months per referral |
| Attribution window | 90 days from the click |
| Cost to join | $0, with no approval waitlist |
| Application review | Within 48 hours |
| Payout schedule | The 1st of each month, for the previous month |
| Payout method | PayPal or wire transfer |
| Minimum payout | $25 |
| Referral cap | None |

![The commission tiers](../.gitbook/assets/a17-affiliate-rates.jpg)

_Commission is calculated on the plan the referral subscribes to._

## How it works

1. **Apply.** Complete a short application. It is reviewed within 48 hours, after which
   you receive your referral link and dashboard access.
2. **Share your link.** It works anywhere: a blog, a newsletter, social media, a podcast,
   a video description. Banners, copy snippets and email templates are provided.
3. **Earn.** Commission accrues on each payment your referrals make and is paid monthly.

![The three steps](../.gitbook/assets/a16-affiliate-steps.jpg)

_Three steps from application to first payout._

## What counts as a referral

A referral is someone who clicks your link and creates a **paid** account within 90 days.
Free sign-ups earn nothing; only paid conversions do. If a referral later upgrades their
plan, your commission adjusts to 20% of the new price for the remainder of their window.

![What the programme provides](../.gitbook/assets/a15-affiliate-benefits.jpg)

_Monthly payouts, a real-time dashboard, creative assets and a 90-day cookie._

## What partners get

A real-time dashboard for clicks, conversions and earnings; a library of banners, copy
and email templates; and a named contact for questions, custom campaigns and
co-marketing.

## Before you promote it

> **Two things on this page need settling before it is quoted to partners.**
>
> **The programme page names the wrong product.** Its copy refers throughout to
> "Anuma" rather than Hey Open, and the commission examples are calculated against
> $9.99 and $19.99 plans that do not match Hey Open's published pricing. The page
> appears to carry template copy that was never rebranded.
>
> **The duration contradicts itself.** The summary cards say commission is "recurring
> for life of subscription" with "no time limit on commissions", while the steps and
> the FAQ both say "up to 12 months per referral". These cannot both be right.

Confirm the commission rate, the duration and the plan prices with the team before
relying on any figure here.
`,
  },
];

module.exports = { EDITS, NEW_PAGES, DROP_PAGES };
