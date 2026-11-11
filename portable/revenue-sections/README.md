# Revenue sections

Two home-page sections, lifted out of the Hey Open site so they can be
dropped into the OpenLedger main site. Copy this whole folder; nothing
outside it is needed.

| Section | What it shows |
| --- | --- |
| `HowYouPaySection` | "Pay for it. Or let your holdings pay for it." — two cards, pay directly or stake, with the rate disclaimer beneath. |
| `BurnEnterpriseSection` | "You use AI. $OPEN burns." — the revenue → costs → net → buyback → burn funnel, with the compute-options chart in the right column. |
| `ComputeOptionsFigure` | The chart on its own, if you want it somewhere else. `BurnEnterpriseSection` already renders it. |

## Install

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

React 17+ and MUI 5+. No GSAP, no ScrollTrigger: the entrance animation is
an IntersectionObserver in `reveal.js`, about a hundred lines with no
dependencies.

## Use

`tokens.css` is a global stylesheet, so import it from the app's root
entry, not from the page. Next.js rejects a global CSS import anywhere
but `pages/_app.js` and fails the whole build, not just that route.

```jsx
// pages/_app.js  (or src/main.jsx, or wherever the app boots)
import '../portable/revenue-sections/tokens.css';
```

```jsx
// the page itself
import {
  HowYouPaySection,
  BurnEnterpriseSection,
} from '../portable/revenue-sections';

export default function Page() {
  return (
    <main>
      <HowYouPaySection />
      <BurnEnterpriseSection />
    </main>
  );
}
```

If the host already defines these five custom properties, skip
`tokens.css` altogether and the sections use the host's values.

Both take no props and set their own vertical rhythm and background, so
they sit directly in a page with nothing around them.

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

## What you may want to change

**Tokens.** `tokens.css` defines the five custom properties the sections
read. If the host already has a palette, map its variables in that file
rather than taking these values.

**The accent.** `#ff6600` is written literally throughout rather than as a
variable, so the sections survive being dropped into a host with no tokens
at all. Search and replace if the brand differs.

**Dark mode.** The components branch on `isDark` from `theme.js`, which
always answers `false` — the site they came from has one palette. If the
host has a dark mode, re-export its own hook from `theme.js` and the dark
values come to life. They have not been looked at in a while, so check
them before relying on them.

**The figures are drawn, not fetched.** The funnel's revenue lines, the
deduction rows and the chart's price series are literals near the top of
each file. They are illustrative. The chart's hedged-ceiling crossing is
solved from the series rather than hard-coded, so editing the series moves
the crossing with it.

**Copy mentioning the token.** Hey Open is going to market as a web2
subscription, which is why these left that site. The copy still says
`$OPEN`, `$HEY credits`, buyback and burn throughout, which is correct for
the OpenLedger site and is the reason they belong there instead.

## Files

```
HowYouPaySection.js       the pay/stake section
BurnEnterpriseSection.js  the funnel, and the compute column beside it
ComputeOptionsSection.js  the chart, plus a standalone section wrapper
reveal.js                 scroll-reveal hook, no dependencies
theme.js                  isDark hook; point it at the host's if it has one
tokens.css                the five custom properties above
index.js                  re-exports, so one import path covers the folder
```
