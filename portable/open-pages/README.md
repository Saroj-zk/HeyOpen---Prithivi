# $OPEN, Token and Enterprise pages

Three full pages lifted out of the Hey Open site for the OpenLedger main
site. Copy this whole folder; nothing outside it is needed.

| Export | Was served at | What it is |
| --- | --- | --- |
| `StakePage` | `/stake` | "The Gateway for Unrestricted AI" — staking, the yield floor and target, minting. The nav called this one **$OPEN**. |
| `TokenPage` | `/token` | Tokenomics: the revenue flywheel, buybacks, burns, utility and principles. |
| `EnterprisePage` | `/enterprise` | Enterprise offering, custom-branded AI, compute-price protection. |

## Install

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

React 17+ and MUI 5+. No GSAP: the entrance animation is an
IntersectionObserver in `reveal.js`, with no dependencies.

## Use

These export **page content only**. The site header, footer and `<head>`
tags were stripped on the way out, because a page that drags another
site's chrome with it is not portable. Wrap them in the host's own.

```jsx
// pages/_app.js, or wherever the app boots
import '../portable/open-pages/tokens.css';
```

```jsx
// pages/stake.js in the host
import { StakePage, PAGE_META } from '../portable/open-pages';
import Head from 'next/head';

export default function Stake() {
  const meta = PAGE_META.StakePage;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <YourHeader />
      <StakePage />
      <YourFooter />
    </>
  );
}
```

`PAGE_META` carries the title, description and original path each page
used to set for itself, so the host can feed them to whatever head
manager it has.

## Fonts

The components name **Inter** and **Roboto Mono** directly. They are not
bundled: the site these came from loads them in its document head, and
without them the pages fall back to system faces and the typography
shifts. Add this to the host's `<head>` (Next: `pages/_document.js`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

If the host already serves Inter, only Roboto Mono is missing, and it is
used for small monospaced labels only.

## Images

`TokenPage` loads two images by absolute URL, so they must be served
from the host's web root at exactly these paths:

```
public/images/Build for agents.jpg
public/images/optimization.png
```

Both are in `public-assets/images/` here. Copy that folder into the
host's `public/`. Nothing else in this bundle loads a file by URL.

## What you may want to change

**The copy is in `data/`.** `data/stakeCopy.js` holds **four complete
written versions** of the stake page; `StakePage.js` picks one with
`VERSIONS[3]` near the top of the component. Change the index to read the
page in one of the others. `data/token.js` holds the token figures,
flywheel steps, principles and utility list that both `TokenPage` and
`StakePage` read.

**Figures are literals, not feeds.** The yield numbers, the supply
figures and the chart series are written into `data/` and into the page
files. Nothing fetches. Check them against what the token actually does
before publishing.

**Stale threshold.** `data/stakeCopy.js` still says Hey Open Pro is free
at **100 $OPEN staked** in two places, and the stake hero repeats it. The
threshold was changed to **$1,000 worth of $OPEN** on 10 November 2026.
Fix this before the pages go live.

**Internal links.** The pages link to each other by the paths in the
table above. If the host serves them elsewhere, search for `/stake`,
`/token` and `/enterprise` and repoint them.

**Tokens.** `tokens.css` defines the custom properties the pages read. If
the host already has a palette, map its variables there instead of taking
these values. The accent `#ff6600` is written literally throughout.

**Dark mode.** `theme.js` always answers `isDark: false` — the site these
came from has one palette. Point it at the host's own theme hook if it
has a dark mode; those branches have not been exercised in a while.

## Files

```
StakePage.js        the $OPEN page
TokenPage.js        tokenomics
EnterprisePage.js   enterprise
index.js            re-exports, plus PAGE_META
data/stakeCopy.js   four written versions of the stake page
data/token.js       token figures, flywheel, principles, utility
ui/Ledger.js        typographic primitives the pages are built from
ui/LedgerUI.js      Reveal, Rule, brand marks
reveal.js           scroll-reveal hook, no dependencies
theme.js            isDark hook
tokens.css          the custom properties above
```

`ui/` and `reveal.js` are **copies**: pages still living in the Hey Open
site import their own versions from `src/`. Edits here do not affect that
site, and vice versa.
