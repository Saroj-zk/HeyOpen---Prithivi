import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { MONO, RULE, RULE_ON_INK, FIG, Label, Button } from '@/components/ui/Ledger';
import { TOKEN } from '@/data/token';
import { VERSIONS } from '@/data/stakeCopy';

/**
 * $OPEN, and what staking it does.
 *
 * ------------------------------------------------------------------
 * Light, because the rest of the site is.
 *
 * The page went dark once to borrow the one component that was working, and
 * the borrowing worked. But a token page in a different colour from every
 * other page is a different product, so it came back to paper and kept what
 * it learned. Ink is one band rather than the whole page, spent on the
 * section that asks you to stop paying for something.
 *
 * Four surfaces, in order of how often they appear:
 *
 *   PAPER   the page itself, and the only ground outside the ink band. A
 *           warm tint used to sit behind one section; with the yield section
 *           gone it landed directly under the hero and read as a stray band
 *           of colour rather than as a change of pace, so it went.
 *   PANEL   white, a hairline, a long soft shadow. Holds almost everything.
 *   ACCENT  PANEL with an amber rim and a warm body. Spent twice: on the
 *           thing you are asked to do, and on the token you are asked to buy.
 *   INK     one full-bleed band, once.
 *
 * ------------------------------------------------------------------
 * Five sections, and nothing that explains the rate.
 *
 *   hero  what $OPEN is, and what staking it gets you
 *   1     where the stake actually goes       architecture, proof
 *   2     there are two tokens                $OPEN and $HEY
 *   3     the app is free at a hundred        Pro, on ink
 *   4     how $OPEN works                     three moves, supply
 *         so start                            close
 *
 * The yield section is gone, and with it the dial and the calculator. Six
 * drawings of the same two numbers were made for that section and none of
 * them survived review; the figures themselves are still on the page, once
 * each, in the returns pair and the $OPEN card. If a worked example ever
 * comes back it should go somewhere a reader asks for it, not above the
 * explanation of what the token is.
 *
 * Headings have no eyebrow. A numbered label above every section is useful
 * when there are seven of them and a reader needs to know where they are;
 * with four it is a second heading in smaller type saying the same thing.
 * Size is the only hierarchy left, and that is enough.
 *
 * ------------------------------------------------------------------
 * The marks are drawn.
 *
 * Every icon on the page was a unicode geometric shape, which renders
 * differently in every font and reads as a placeholder in all of them. They
 * are inline SVG on currentColor instead, one stroke weight, one grid.
 *
 * ------------------------------------------------------------------
 * Each section says the two figures at most once, and most do not say them
 * at all. They were being printed eight and seven times across six of eight
 * sections, which is what made the page feel like it was saying one thing
 * over and over. Everywhere else says "the floor" and "the band".
 *
 * WORDING ON THE DEPLOYMENT CARDS NEEDS SIGN-OFF. What the treasury is
 * actually placed in is a representation about money. The three cards name
 * the categories that were described and say nothing about instruments,
 * venues, counterparties or proportions, because none of that was given.
 * ------------------------------------------------------------------
 */

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/* ------------------------------------------------------------------ */
const RATES = {
  supply: TOKEN.supply,
  base: '6.00%',
  /* The same rate, set as a headline rather than as a contract figure. */
  base_short: '6%',
  /* All in, and inclusive of the floor rather than stacked on top of it. */
  total: '40% to 50%',
  threshold: '100 $OPEN',
};

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

/* ------------------------------------------------------------------ */
/* What each section says                                              */
/* ------------------------------------------------------------------ */

/* 02. Four things one token does, each as a figure, the category it
   belongs to, and a line of detail. No mark: at this size an icon above
   three lines of type is decoration sitting where the eye wants the
   figure. */
const BENEFITS = [
  {
    k: RATES.base_short,
    t: 'Annual staking rewards',
    s: 'Earn annual rewards on eligible staked $OPEN.',
  },
  {
    k: 'Hey Open Pro',
    t: 'Premium AI access',
    s: `Stake ${RATES.threshold} to unlock unlimited supported text and image models.`,
  },
  {
    k: RATES.total,
    t: 'Compute strategy target',
    s: 'Explore targeted returns through enterprise compute and options strategies.',
  },
  {
    k: '$OPEN economy',
    t: 'Buybacks and burns',
    s: 'A proposed net revenue model designed to buy back and burn $OPEN.',
  },
  {
    t: 'Compute-credit collateral',
    s: 'Proposed $HEY is issued against $OPEN locked under staking.',
  },
  {
    t: 'AI agent access',
    s: 'Access premium agents, developer tools and potential agent marketplace payment flows.',
  },
  {
    t: 'Member advantages',
    s: 'Proposed discounts, priority routing, advanced memory and higher service tiers.',
  },
  {
    t: 'Community voting',
    s: 'Vote on protocol rules, incentives and ecosystem direction. New features are released based on what the community votes for.',
  },
];

/* The two lines the token policy figure draws. Revenue climbs as a
   curve, because it accrues continuously; supply comes down in steps,
   because a burn is an event and not a drift. They cross, which is the
   headline said without words.

   No value axis on either, and none implied. What the business earns and
   what it would buy back are not settled anywhere in this repo. */
const POLICY_REVENUE = [
  [14, 112], [66, 104], [118, 88], [170, 74], [222, 56], [274, 44], [326, 30],
];
const POLICY_SUPPLY = 'M14 36 H70 V48 H126 V62 H182 V78 H238 V92 H294 V108 H326';

/* 03a. Six lines of revenue, each with the kind of revenue it is. The
   second line is the one doing the work: "subscriptions" and "commission
   on paid agents" are different businesses, and naming the kind is what
   stops the six reading as six words for the same thing. */
const REVENUE = [
  [
    'Hey Open subscriptions',
    'Monthly and annual plans for private multi-model AI, expanded usage and premium features.',
    'Consumer recurring revenue',
  ],
  [
    'Developer AI APIs',
    'Inference usage through one API layer, with margin on model routing and access.',
    'Usage-based API margin',
  ],
  [
    'Enterprise private AI',
    'Private inference, managed deployments, governance controls and white-label contracts.',
    'Enterprise contracts',
  ],
  [
    'Compute options fees',
    'Hedging, structuring, transaction and settlement services for GPU and cloud-price risk.',
    'Financial marketplace fees',
  ],
  [
    'Agent marketplace',
    'Commission on paid agents, workflow tools and agent subscriptions.',
    'Marketplace take rate',
  ],
  [
    'Agent and memory infrastructure',
    'Hosting, secure memory, developer services and advanced privacy infrastructure.',
    'Infrastructure services',
  ],
];

/* 03. What a qualifying stake turns on. Title and line, not name and
   figure, because none of these four are quantities. */
const PRO = [
  ['Unlimited text models', 'Access supported AI text models.'],
  ['Unlimited image models', 'Generate images across supported models.'],
  ['Premium AI access', 'Unlock the Hey Open Pro experience.'],
  ['No separate subscription', 'Your qualifying stake unlocks Pro.'],
];

/* 04. The two figures side by side, which is the only honest way to show
   them: one is owed, the other is aimed at. */
const STRATEGY = [
  ['layers', 'Enterprise contracts', 'Prepaid agreements create committed compute demand.'],
  ['shield', 'Compute options', 'Hedging strategies manage GPU price exposure.'],
  ['chart', 'Managed economics', 'Contract pricing and cost management create opportunities for operating returns.'],
];

const DEPLOY = [
  { k: 'Compute capital', s: 'Capacity the network runs on', mark: 'chip' },
  { k: 'Options', s: 'Positions run against the book', mark: 'chart' },
  { k: 'AI infrastructure', s: 'The rails underneath the models', mark: 'layers' },
];

const RETURNS = [
  {
    tag: 'Owed to you',
    k: RATES.base,
    s: 'Paid from the staking contract whatever the period did. It does not wait on the book.',
    mark: 'shield',
    tone: 'ink',
    big: true,
  },
  {
    tag: 'Aimed at',
    k: 'Everything above it',
    s: 'What the book makes on top of it. Reported once a period has closed, never promised before.',
    mark: 'rise',
  },
];

/* Three readings of the same promise, under the figure that makes it. */
const PROOF = [
  [
    'The floor is a contract rate',
    'The floor is set in the staking contract. It pays on schedule, and anyone can read it without asking us.',
  ],
  [
    'The stake stays yours',
    'Staking does not sell your $OPEN or move it beyond your reach. You can unstake, and the balance is visible the whole time.',
  ],
  [
    'The target is reported after',
    'Each period ends with the figure that was actually returned, published against the band rather than compared with it later.',
  ],
];


/* 06. Where the supply goes, and how anyone checks. */
const TOKENOMICS = [
  ['coins', 'Revenue-funded buybacks', 'A defined allocation of net revenue funds $OPEN purchases.'],
  ['flame', 'Permanent burns', 'Purchased tokens are removed from circulation.'],
  ['chart', 'Transparent economics', 'Track supply, buybacks, and verified burn activity.'],
];

/* 07. Three moves. The third is no longer a mint: nothing on this page
   mints anything now, so it is the thing the stake actually unlocks. */
const STEPS = [
  { n: '01', mark: 'coins', k: 'Get $OPEN', s: 'Acquire $OPEN to enter the ecosystem.', cta: 'Buy $OPEN', href: LINKS.buy },
  { n: '02', mark: 'lock', k: 'Stake $OPEN', s: 'Stake your tokens to access eligible rewards.', cta: 'Stake $OPEN', href: LINKS.stake },
  { n: '03', mark: 'spark', k: 'Unlock benefits', s: 'Earn staking rewards and access Hey Open Pro when eligible.' },
];

/* The three sections that used to sit here, one line each. The order is
   the order of the argument on the page they link to: there is a business,
   its costs are held still, and what is left reaches the token. */
const ECONOMY = [
  ['building', 'Enterprise AI', 'Custom Branded products create recurring compute demand.'],
  ['shield', 'Compute protection', 'Options-based strategies help manage GPU price volatility.'],
  ['flame', '$OPEN economics', 'Net revenue supports the proposed buyback-and-burn model.'],
];

/* ------------------------------------------------------------------ */
/* Marks                                                               */
/* ------------------------------------------------------------------ */

/* One grid, one stroke weight, drawn on currentColor. A unicode glyph picks
   a different shape out of whatever font happens to be resolving, which is
   why the page used to look like it had placeholders in it. */
const PATHS = {
  lock: 'M6 9V6.5a4 4 0 1 1 8 0V9M4.5 9h11A1.5 1.5 0 0 1 17 10.5v6A1.5 1.5 0 0 1 15.5 18h-11A1.5 1.5 0 0 1 3 16.5v-6A1.5 1.5 0 0 1 4.5 9Z',
  chip: 'M6 6h8v8H6zM8 2v2M12 2v2M8 16v2M12 16v2M2 8h2M2 12h2M16 8h2M16 12h2',
  chart: 'M3 17h14M6 14V8M10 14V4M14 14v-4',
  layers: 'M10 2.5 2.5 6.5 10 10.5l7.5-4zM2.5 10.5 10 14.5l7.5-4M2.5 14 10 18l7.5-4',
  shield: 'M10 2.5 3.5 5v5c0 3.6 2.7 6.6 6.5 7.5 3.8-.9 6.5-3.9 6.5-7.5V5zM7.2 10.2l2 2 3.6-3.9',
  rise: 'M3 15.5 7.8 10l3 2.6L17 5.5M17 5.5h-4M17 5.5v4',
  diamond: 'M10 2.5 17 10l-7 7.5L3 10z',
  spark: 'M10 2.2c.7 4.3 2.8 6.4 7.1 7.1-4.3.7-6.4 2.8-7.1 7.1-.7-4.3-2.8-6.4-7.1-7.1 4.3-.7 6.4-2.8 7.1-7.1Z',
  coins: 'M12.5 6.5a4.5 2.5 0 1 1-9 0 4.5 2.5 0 0 1 9 0ZM3.5 6.5v4c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5v-4M7.5 13.3v1.2c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5v-4c0-1-1-1.9-2.6-2.3',
  building: 'M2.8 17.4h14.4M4.6 17.4V9.2M7.9 17.4V9.2M12.1 17.4V9.2M15.4 17.4V9.2M2.8 9.2h14.4L10 4.6z',
  flame: 'M10 2.6c3 3.4 4.6 5.7 4.6 8.2a4.6 4.6 0 0 1-9.2 0c0-2.5 1.6-4.8 4.6-8.2ZM10 10.4c1.1 1.3 1.7 2.1 1.7 3a1.7 1.7 0 0 1-3.4 0c0-.9.6-1.7 1.7-3Z',
};

/** Market data and the contract, wherever they are least in the way. */
function LinkChips() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {[['Market data', LINKS.marketCap], ['Contract', LINKS.explorer]].map(([label, href]) => (
        <Box
          key={label}
          component="a"
          href={href}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            px: '13px',
            py: '7px',
            borderRadius: '999px',
            border: `1px solid ${RULE}`,
            backgroundColor: 'var(--bg-card)',
            fontFamily: MONO,
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'all .18s ease',
            '&:hover': { color: 'var(--text-heading)', borderColor: 'rgba(255,102,0,0.45)' },
          }}
        >
          {label}
          <Box component="span" aria-hidden="true" sx={{ opacity: 0.55 }}>↗</Box>
        </Box>
      ))}
    </Box>
  );
}

function Mark({ name, size = 20, sx }) {
  return (
    <Box
      component="svg"
      aria-hidden="true"
      viewBox="0 0 20 20"
      sx={{ width: size, height: size, display: 'block', flexShrink: 0, ...sx }}
    >
      <Box
        component="path"
        d={PATHS[name]}
        sx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </Box>
  );
}

/* A mark floating at 40% opacity in a corner reads as a watermark. In a
   tinted chip it reads as a label, which is what it is. */
function Chip({ name, tone }) {
  const ink = tone === 'ink';
  const accent = tone === 'accent';
  return (
    <Box
      sx={{
        width: 38,
        height: 38,
        flexShrink: 0,
        borderRadius: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ink ? 'var(--brand-accent)' : accent ? '#C2541A' : 'var(--text-heading)',
        backgroundColor: ink
          ? 'rgba(255,102,0,0.14)'
          : accent
            ? 'rgba(255,102,0,0.1)'
            : 'rgba(11,15,26,0.045)',
        border: `1px solid ${ink ? 'rgba(255,102,0,0.3)' : accent ? 'rgba(255,102,0,0.24)' : 'rgba(11,15,26,0.08)'
          }`,
      }}
    >
      <Mark name={name} size={19} />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Four surfaces                                                       */
/* ------------------------------------------------------------------ */

const INK = '#0B0F1A';

const PANEL = {
  position: 'relative',
  borderRadius: '16px',
  border: '1px solid rgba(11,15,26,0.07)',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFDFE 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(11,15,26,0.04), 0 26px 50px -34px rgba(11,15,26,0.32)',
};

const ACCENT = {
  ...PANEL,
  border: '1px solid rgba(255,102,0,0.26)',
  background: 'linear-gradient(180deg, #FFF8F3 0%, #FFEFE2 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(11,15,26,0.04), 0 26px 52px -34px rgba(214,86,0,0.38)',
};

/* A pane of glass on ink. The rim is two lines, not one: a bright inset
   along the top edge where light would catch, and a hairline all round.
   `saturate` on the backdrop is what keeps the bloom underneath coloured
   rather than washing it to grey. */
const GLASS = {
  position: 'relative',
  borderRadius: '18px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.035) 100%)',
  backdropFilter: 'blur(22px) saturate(150%)',
  WebkitBackdropFilter: 'blur(22px) saturate(150%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.05), 0 22px 44px -28px rgba(0,0,0,0.9)',
};

const PANEL_INK = {
  position: 'relative',
  borderRadius: '16px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, #1A1F2B 0%, #0B0F1A 70%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 26px 52px -34px rgba(11,15,26,0.6)',
};

/**
 * A section, one screen tall.
 *
 * Every section now holds at least a viewport and centres what it contains,
 * so a reader lands on one thing at a time instead of catching the top of the
 * next one under the bottom of this one.
 *
 * It is a floor, not a fixed height. The sections with three cards and a
 * supply block in them are taller than a screen on a phone and are left to
 * be; forcing those to a fixed height is how content gets clipped.
 *
 * svh rather than vh, because on a phone vh is the viewport with the browser
 * chrome retracted, which is not the viewport you are looking at when the
 * page loads. The vh line stays underneath it for anything that does not know
 * svh yet.
 *
 * The first section takes the header's spacer off its height. That spacer is
 * in the flow, so without the subtraction the opening screen is the header
 * plus the top nine tenths of the hero, and everything after it is off by the
 * same amount.
 */
const HEADER = { xs: '78px', md: '92px' };

function Section({ ground, full = true, first, bare, children, sx }) {
  const tall = first
    ? { xs: `calc(100vh - ${HEADER.xs})`, md: `calc(100vh - ${HEADER.md})` }
    : '100vh';
  const tallSmall = first
    ? { xs: `calc(100svh - ${HEADER.xs})`, md: `calc(100svh - ${HEADER.md})` }
    : '100svh';
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        zIndex: 1,
        ...(full
          ? {
            minHeight: tall,
            '@supports (min-height: 100svh)': { minHeight: tallSmall },
            display: 'flex',
            alignItems: 'center',
          }
          : null),
        ...(ground === 'ink'
          ? { backgroundColor: INK }
          : ground
            ? {
              background: ground,
              borderTop: '1px solid rgba(11,15,26,0.05)',
              borderBottom: '1px solid rgba(11,15,26,0.05)',
            }
            : null),
        ...sx,
      }}
    >
      {bare ? (
        children
      ) : (
        <Container maxWidth="lg" sx={{ width: '100%', px: { xs: 2.5, sm: 4, md: 6 } }}>
          {children}
        </Container>
      )}
    </Box>
  );
}

/**
 * A section heading.
 *
 * It used to open with a numbered eyebrow, 01 through 05 with a rule and a
 * label, so a reader could tell how far through the argument they were. That
 * went with the yield section: four stops do not need signposting, and the
 * labels were restating the headline underneath them in smaller type.
 *
 * The tier stays, because it is the only thing left carrying shape. Five
 * consecutive headings at the same size and weight is a flat line; the
 * sections that carry the argument are large and the ones that support it
 * step down.
 */
function SectionHead({ eyebrow, title, lede, onInk, tier = 'major', maxWidth = 760 }) {
  return (
    <Box sx={{ maxWidth }}>
      {eyebrow && (
        <Label onInk={onInk} sx={{ display: 'block', mb: 1.8, color: 'var(--brand-accent)' }}>
          {eyebrow}
        </Label>
      )}
      <Typography
        component="h2"
        sx={{
          fontSize:
            tier === 'minor'
              ? { xs: '1.7rem', sm: '2rem', md: '2.2rem' }
              : { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          color: onInk ? '#FFFFFF' : 'var(--text-heading)',
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>
      {lede && (
        <Typography
          sx={{
            mt: 2.2,
            fontSize: '1.04rem',
            lineHeight: 1.65,
            color: onInk ? 'rgba(255,255,255,0.66)' : 'var(--text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {lede}
        </Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The architecture                                                    */
/* ------------------------------------------------------------------ */

const LINE = 'rgba(15,23,42,0.2)';
const RUN = 'rgba(255,102,0,0.9)';

/* Three rows of height H and two gaps of G put the card centres at H/2,
   1.5H+G and 2.5H+2G. The fan column is alignSelf stretch, so its height is
   the row's height and those three numbers are where the branches have to
   land. Arithmetic rather than eyeballing is what keeps them on the cards
   when the cards change height. */
const GAP = 14;

/* An elbow with rounded corners: out along the middle, down or up the spine,
   then out again. A straight run when there is no corner to turn. */
function elbow(w, from, to) {
  const x = w / 2;
  const r = Math.min(9, Math.abs(to - from) / 2);
  if (r < 1) return `M0 ${from} H${w}`;
  const dir = to > from ? 1 : -1;
  return [
    `M0 ${from}`,
    `H${x - r}`,
    `Q${x} ${from} ${x} ${from + r * dir}`,
    `V${to - r * dir}`,
    `Q${x} ${to} ${x + r} ${to}`,
    `H${w}`,
  ].join(' ');
}

/**
 * One node splitting into three, or three converging into one.
 *
 * Drawn as SVG rather than as CSS borders, for two reasons. Corners can be
 * turned with a curve instead of a right angle, and a dash can be made to
 * travel: the second path over each route is dashed and its offset animates,
 * which is the stake visibly moving along the route rather than a diagram of
 * it having moved. Held still for anyone who asked not to see motion.
 */
function Fan({ dir }) {
  const ref = React.useRef(null);
  const [h, setH] = React.useState(300);
  const W = 64;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => setH(el.clientHeight || 300);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowH = (h - GAP * 2) / 3;
  const centres = [rowH * 0.5, rowH * 1.5 + GAP, rowH * 2.5 + GAP * 2];
  const mid = h / 2;
  const out = dir === 'out';

  const routes = out
    ? centres.map((c) => elbow(W, mid, c))
    : centres.map((c) => elbow(W, c, mid));

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative', width: W, alignSelf: 'stretch' }}
    >
      <Box
        component="svg"
        width={W}
        height={h}
        viewBox={`0 0 ${W} ${h}`}
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
          '@keyframes runAlong': { to: { strokeDashoffset: -18 } },
        }}
      >
        <defs>
          <marker id={`tip-${dir}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill={LINE} />
          </marker>
        </defs>

        {routes.map((d, i) => (
          <g key={i}>
            {/* the route */}
            <path d={d} fill="none" stroke={LINE} strokeWidth="1.5" markerEnd={`url(#tip-${dir})`} />
            {/* and what is moving along it */}
            <Box
              component="path"
              d={d}
              sx={{
                fill: 'none',
                stroke: RUN,
                strokeWidth: 1.8,
                strokeLinecap: 'round',
                strokeDasharray: '5 13',
                animation: 'runAlong 1.1s linear infinite',
                animationDelay: `${i * 0.18}s`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.45 },
              }}
            />
          </g>
        ))}
      </Box>
    </Box>
  );
}

/** What the fan collapses to below lg, where there is no room to branch. */
function Down() {
  return (
    <Box
      aria-hidden="true"
      sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', justifyContent: 'center', py: 1.2 }}
    >
      <Box
        component="svg"
        width="12"
        height="34"
        viewBox="0 0 12 34"
        /* A flex child with align-items stretch ignores the width and height
           attributes and fills the row, which turned a 12 by 34 connector
           into a bar the height of the gap. */
        sx={{ width: 12, height: 34, flexShrink: 0, '@keyframes runDown': { to: { strokeDashoffset: -18 } } }}
      >
        <path d="M6 0 V27" fill="none" stroke={LINE} strokeWidth="1.5" />
        <path d="M1.5 26 L6 33 L10.5 26 z" fill={LINE} />
        <Box
          component="path"
          d="M6 0 V27"
          sx={{
            fill: 'none',
            stroke: RUN,
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeDasharray: '5 13',
            animation: 'runDown 1.1s linear infinite',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.45 },
          }}
        />
      </Box>
    </Box>
  );
}

/**
 * A node on the diagram.
 *
 * The mark moved out of the far corner and into a chip beside the text,
 * which is the difference between a watermark and a label.
 */
function Node({ tag, k, s, mark, tone, big, sx }) {
  const ink = tone === 'ink';
  const accent = tone === 'accent';
  const surface = ink ? PANEL_INK : accent ? ACCENT : PANEL;
  const head = ink ? '#FFFFFF' : accent ? '#9A3C00' : 'var(--text-heading)';
  const body = ink ? 'rgba(255,255,255,0.62)' : accent ? 'rgba(154,60,0,0.8)' : 'var(--text-secondary)';

  return (
    <Box
      sx={{
        ...surface,
        overflow: 'hidden',
        px: { xs: 2, md: 2.3 },
        py: { xs: 1.9, md: 2.1 },
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.8,
        transition: 'transform .18s ease, box-shadow .18s ease',
        '&:hover': { transform: 'translateY(-2px)' },
        ...(ink
          ? { boxShadow: `${surface.boxShadow}, 0 0 0 1px rgba(255,102,0,0.12)` }
          : null),
        ...sx,
      }}
    >
      {mark && <Chip name={mark} tone={tone} />}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {tag && <Label onInk={ink} sx={{ display: 'block', mb: 0.8 }}>{tag}</Label>}
        <Typography
          sx={{
            ...(big ? FIG : null),
            fontSize: big ? { xs: '1.7rem', md: '2rem' } : { xs: '1rem', md: '1.06rem' },
            fontWeight: big ? 600 : 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: head,
          }}
        >
          {k}
        </Typography>
        {s && <Typography sx={{ mt: 0.8, fontSize: '0.84rem', lineHeight: 1.55, color: body }}>{s}</Typography>}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function StakePage() {
  /* Four versions of this page's words live in data/stakeCopy. D is the one
     chosen; change the index to read the page in one of the others. */
  const C = VERSIONS[3];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>Stake $OPEN: Earn Yield and Mint $HEY | Hey Open</title>
        <meta
          name="description"
          content="$OPEN is the capital asset of Hey Open. Stake it for a fixed floor and a target well above it, and to mint $HEY, which pays out compute credits when you stake it."
        />
      </Head>

      <PageHeader />

      {/* The sky behind the opening screen.
          It was a radial wash of brand orange, which is the one thing every
          other crypto page opens with. The painting does the same job, warm
          at the edges and open in the middle, and the headline sits in the
          open middle by design: the plate is positioned so the pale centre
          of the sky lands behind the type.
          Two scrims, not one. The vertical pass lifts the whole plate toward
          the page colour so dark text keeps its contrast on a light painting;
          the lower stop goes fully opaque so the image ends in the page
          rather than on a cut edge. Decorative, so aria-hidden, and it never
          takes a pointer. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: { xs: 560, md: 820 },
          backgroundImage:
            'linear-gradient(180deg, rgba(248,249,250,0.42) 0%, rgba(248,249,250,0.5) 38%, rgba(248,249,250,0.86) 74%, var(--bg-page) 100%), url(/images/stake-sky.webp)',
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center 32%',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── 1. What this is ───────────────────────────────────────── */}
      <Section first sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 880, mx: 'auto', textAlign: 'center' }}>
            {/* The subject of the headline, said once, in the sky.

                The sentence on this screen is "the gateway for unrestricted
                AI" and it had no subject: a reader had to already know what
                the page was about to know what was doing the gating. The
                word sits behind and just above the line, soft enough to
                belong to the painting rather than to the type, so the screen
                reads $OPEN, the gateway for unrestricted AI, top to bottom.

                Blurred rather than merely faint. A hard-edged ghost at this
                size reads as a second headline someone forgot to delete; the
                blur is what puts it behind the glass instead of on it.

                Anchored to the headline, not to the section, and measured in
                its own em. Hung off the section's centre it sat behind the
                second line on a phone instead of above the first, because
                the headline wraps there and the centre stops meaning the
                same thing. `top: 0` is the top of the heading whatever the
                heading does, the rise is a fraction of the word's own
                height, and the blur is too, so the three stay in proportion
                from 320px to a desktop. The size is capped against the
                viewport for the same reason: at a fixed rem the word ran off
                both edges of a phone and read as two orange smudges rather
                than as a word. It wants to be about half the measure, not
                all of it: at 15rem it filled the column and stopped reading
                as something behind the headline.

                Decorative, so it is hidden from the accessibility tree and
                never takes a pointer. */}
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: '50%',
                top: 0,
                transform: 'translate(-50%, -74%)',
                zIndex: -1,
                pointerEvents: 'none',
                fontSize: 'min(14vw, 9.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.055em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                color: 'var(--brand-accent)',
                opacity: { xs: 0.2, md: 0.26 },
                filter: 'blur(0.075em)',
              }}
            >
              $OPEN
            </Box>

            {/* Sized to hold one line on a desktop. It is the page's only
                headline and it is a name, so breaking it across two rows made
                it read as a sentence that had run on. */}
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.1rem' },
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                color: 'var(--text-heading)',
                textWrap: 'balance',
              }}
            >
              {C.hero.title}
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2.5, md: 3 },
                fontSize: { xs: '1.05rem', md: '1.16rem' },
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '54ch',
                mx: 'auto',
                textWrap: 'pretty',
              }}
            >
              {C.hero.lede}
            </Typography>

            {/* Stacked rather than side by side: at this width a centred pair
                reads as one column of choices instead of a primary and an
                afterthought. */}
            <Box
              sx={{
                mt: { xs: 4, md: 5 },
                mx: 'auto',
                maxWidth: 300,
                display: 'grid',
                gap: 1.3,
                '& a': { width: '100%', justifyContent: 'center' },
              }}
            >
              <Button href={LINKS.stake} primary>Stake $OPEN</Button>
              <Button href={LINKS.buy}>Buy $OPEN</Button>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── 2. What one token does ───────────
          Four square cards in a row, read left to right.

          Two earlier attempts are worth not repeating. A scroll-stack
          needed opaque cards, two and a half screens of travel to happen
          in, and it still only worked with a cursor. Four wide rows stacked
          downward read as a list and left the section with nothing to look
          at. A row of squares is the one arrangement where all four are
          taken in at once, which is what a set of benefits wants. */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 9.5 } }}>
        {/* What the glass has to blur. Two blooms, warm and off-centre, so
            the four panes do not all pick up the same flat tone. Behind the
            content at z-index -1, which still paints above the section's own
            background. Decorative, so it is hidden and takes no pointer. */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            background:
              'radial-gradient(44% 58% at 80% 14%, rgba(255,102,0,0.26) 0%, rgba(255,102,0,0.05) 46%, transparent 72%),' +
              'radial-gradient(40% 54% at 14% 88%, rgba(255,140,60,0.14) 0%, transparent 70%)',
          }}
        />

        <Reveal>
          <Box sx={{ mb: { xs: 3.5, md: 3 } }}>
            <SectionHead
              eyebrow="The utility of $OPEN"
              onInk
              maxWidth={820}
              title={
                <>
                  <Box component="span" sx={{ display: 'block' }}>One token.</Box>
                  <Box component="span" sx={{ display: 'block' }}>More ways to benefit.</Box>
                </>
              }
              lede="What a single staked position is worth, and what it opens up. Several of these are proposals rather than live features."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          {/* Eight cards, in the two groups they actually are.

              Four of them carry a headline value and four do not, and every
              attempt to pretend otherwise has failed in the same way. With
              the value on top, the four titles that had one sat half an inch
              below the four that did not, so only cards in the same row
              could be compared. Pinned to the foot instead, the rule above
              it appeared on half the cards and sat a different distance
              below the copy in each, and the four without it had nothing
              anchoring the slack at the bottom.

              So the difference is labelled rather than hidden. Inside a
              group every card now has the same anatomy, which is what makes
              the alignment hold: same top line, same title height, same
              rhythm down to the body.

              The value goes back on top and keeps the accent. It is the
              card's headline where there is one, and the title under it is
              the category, which is the order a reader wants them in.

              THE SLACK IN A SHORT CARD IS LEFT AT THE BOTTOM, unanchored
              and therefore invisible. It only read as dead space when a
              rule was sitting on it. */}
          {[
            ['What a stake is worth', BENEFITS.filter((b) => b.k)],
            ['What a stake unlocks', BENEFITS.filter((b) => !b.k)],
          ].map(([group, items], gi) => (
            <Box key={group} sx={{ mt: gi ? { xs: 3.2, md: 3.4 } : 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 1.8, md: 2 } }}>
                <Label onInk sx={{ flexShrink: 0 }}>{group}</Label>
                <Box aria-hidden="true" sx={{ flex: 1, height: '1px', backgroundColor: RULE_ON_INK }} />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  gap: { xs: 1.6, md: 2 },
                }}
              >
                {items.map((b) => (
                  <Box
                    key={b.t}
                    sx={{
                      ...GLASS,
                      px: { xs: 2.4, md: 2.5 },
                      py: { xs: 2.5, md: 2.5 },
                      transition: 'transform .22s ease, box-shadow .22s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.06), 0 30px 56px -28px rgba(0,0,0,0.95)',
                      },
                    }}
                  >
                    {b.k && (
                      <Typography
                        sx={{
                          fontSize: { xs: '1.5rem', md: '1.55rem' },
                          fontWeight: 700,
                          letterSpacing: '-0.035em',
                          lineHeight: 1.05,
                          /* Tabular, not FIG: FIG is the mono face and two
                             of these four are phrases, not figures. */
                          fontVariantNumeric: 'tabular-nums',
                          whiteSpace: { md: 'nowrap' },
                          color: 'var(--brand-accent)',
                          mb: { xs: 1.4, md: 1.5 },
                        }}
                      >
                        {b.k}
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        fontSize: { xs: '1.04rem', md: '1.06rem' },
                        fontWeight: 750,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.3,
                        color: '#FFFFFF',
                      }}
                    >
                      {b.t}
                    </Typography>

                    <Typography sx={{ mt: 0.9, fontSize: '0.91rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
                      {b.s}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Reveal>

        <Reveal delay={60}>
          <Box
            sx={{
              mt: { xs: 3, md: 2.2 },
              pt: { xs: 2.6, md: 2.2 },
              borderTop: `1px solid ${RULE_ON_INK}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
            }}
          >
            <Typography
              sx={{
                flex: '1 1 340px',
                minWidth: 0,
                fontSize: { xs: '1.04rem', md: '1.16rem' },
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.45,
                color: '#FFFFFF',
                textWrap: 'pretty',
              }}
            >
              Earn rewards. Unlock premium AI. Explore the compute economy.
            </Typography>
            <Box sx={{ flexShrink: 0 }}>
              <Button href={LINKS.stake} primary>
                Stake $OPEN
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
            </Box>
          </Box>

          {/* The band is a target and the page has to say so somewhere a
              reader reaches. It used to say it in the beyond-staking
              section, which is hidden, leaving the closing disclaimer as
              the only place. This is that line, under the card that prints
              the figure. */}
          <Typography
            sx={{
              mt: { xs: 2, md: 2.2 },
              fontSize: '0.78rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.42)',
            }}
          >
            The {RATES.total} remains a strategy target, not a guaranteed additional staking
            payout.
          </Typography>
        </Reveal>
      </Section>

      {/* ── 3. Where the money actually comes from ───────
          The section above lists what a holder gets. This is the other half
          of that promise: the businesses the gets are paid out of. It
          follows immediately because a reader who has just been shown a
          rate and a buyback is owed the answer to "funded by what".

          Light, because the section above it is ink. Six cards in three
          columns, which is the only arrangement where six of anything reads
          as a set rather than a list.

          No icons. The section above had them and lost them, and six
          decorative tiles here would put the page straight back where it
          was. The second line carries the colour instead, and it earns it:
          it names the kind of revenue, which is the part that makes six
          different businesses legible as six different businesses.

          The kind sits on a rule at the foot of every card, pushed there
          rather than following the copy, so all six line up however long
          the description above them runs. */}
      <Section sx={{ py: { xs: 7, md: 9 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 3.5, md: 4 } }}>
            <SectionHead
              eyebrow="Revenue, not speculation"
              maxWidth={820}
              title={
                <>
                  Six ways to generate{' '}
                  <Box component="span" sx={{ color: 'var(--brand-accent)' }}>real revenue.</Box>
                </>
              }
              lede="Not all revenue needs to come from speculation. The ecosystem is designed around payments for useful products and financial services."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: { xs: 1.8, md: 2.2 },
            }}
          >
            {REVENUE.map(([name, body, kind]) => (
              <Box
                key={name}
                sx={{
                  ...PANEL,
                  display: 'flex',
                  flexDirection: 'column',
                  px: { xs: 2.2, md: 2.6 },
                  py: { xs: 2.4, md: 2.6 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.06rem', md: '1.12rem' },
                    fontWeight: 750,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.3,
                    color: 'var(--text-heading)',
                  }}
                >
                  {name}
                </Typography>

                <Typography sx={{ mt: 1, fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  {body}
                </Typography>

                <Box sx={{ mt: 'auto', pt: { xs: 1.8, md: 2 } }}>
                  <Typography
                    sx={{
                      pt: { xs: 1.4, md: 1.6 },
                      borderTop: `1px solid ${RULE}`,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'var(--brand-accent)',
                    }}
                  >
                    {kind}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 4. And what it unlocks. HIDDEN ────────────
          Reverted to the design it had before the darker pass, then hidden.
          The ink band with the benefits in a panel and the threshold as a
          tinted strip at its foot, exactly as it was.

          HIDDEN ON REQUEST. Nothing is deleted. The markup sits behind a
          false branch and PRO is still defined, so bringing it back is
          deleting the two lines that wrap it, and what comes back is the
          old design rather than the rebuilt one. Commenting it out would
          not work: the markup carries comments of its own and those do not
          nest, so the first inner terminator would close the wrapper and
          spill the rest of the file onto the page as text.

          Note what leaves with it. The hundred staked is the single
          condition the Pro offer turns on, and section two now mentions Pro
          only as one of four benefits. If this stays hidden, the threshold
          is stated nowhere on the page. */}
      {false && (
        <Section ground="ink" sx={{ py: { xs: 8, md: 10 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box>
                <SectionHead
                  eyebrow="Exclusive staking benefits"
                  tier="minor"
                  onInk
                  maxWidth={480}
                  title="Stake $OPEN. Unlock Hey Open Pro."
                  lede="Stake 100 $OPEN to unlock Hey Open Pro. Unlimited access to supported text and image models, premium AI features, and no separate subscription fee."
                />
                <Box sx={{ mt: 4 }}>
                  <Button href={LINKS.stake} primary>
                    Stake $OPEN
                    <Box component="span" aria-hidden="true">→</Box>
                  </Button>
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={100}>
              <Box>
                <Box sx={{ ...PANEL_INK, overflow: 'hidden' }}>
                  <Box sx={{ px: { xs: 2.5, md: 3.2 }, py: { xs: 2.4, md: 2.8 } }}>
                    {PRO.map(([name, body], i) => (
                      <Box
                        key={name}
                        sx={{ pt: i ? 1.8 : 0, mt: i ? 1.8 : 0, borderTop: i ? `1px solid ${RULE_ON_INK}` : 'none' }}
                      >
                        <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                          {name}
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontSize: '0.88rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.58)' }}>
                          {body}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      px: { xs: 2.5, md: 3.2 },
                      py: { xs: 1.8, md: 2 },
                      borderTop: `1px solid ${RULE_ON_INK}`,
                      backgroundColor: 'rgba(255,102,0,0.11)',
                    }}
                  >
                    <Typography
                      sx={{ ...FIG, fontSize: { xs: '0.92rem', md: '1rem' }, fontWeight: 600, letterSpacing: '-0.005em', color: '#FFB071' }}
                    >
                      {RATES.threshold} staked = Hey Open Pro unlocked
                    </Typography>
                  </Box>
                </Box>

                <Typography sx={{ mt: 1.8, fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.46)' }}>
                  Access remains active while staking requirements and applicable usage policies are
                  met.
                </Typography>
              </Box>
            </Reveal>
          </Box>
        </Section>
      )}

      {/* ── 5. And what sits on top of the rate. HIDDEN ─────────────────────
          Two figures, side by side, because that is the only honest way to
          show them: one is owed and the other is aimed at. They are set at
          the same size so neither looks like the headline, and the one that
          is a target takes the accent and the tint, so a reader can see
          which is which before reading a word.

          The qualification sits next to the button that acts on it, not at
          the foot of the page. A reader who clicks has already read it.

          HIDDEN ON REQUEST. Nothing is deleted: the markup below is behind
          a false branch, and STRATEGY and RATES.base_short are still
          defined above, so bringing it back is deleting the two lines that
          wrap it. Commenting the block out would not work: the section
          carries JSX comments of its own and those do not nest, so the
          first inner terminator would close the wrapper and spill the rest
          of the file onto the page as text. Do not write a comment
          terminator inside a comment, which is how this very note shipped
          itself to production once already.

          Note what leaves with it. This was the only place the page set the
          6% against the 40 to 50 band and said in as many words that the
          band is a strategy target rather than a staking return. The
          closing disclaimer still says it, and the band is still printed
          there, but it is now the only place a reader meets the
          distinction. */}
      {false && (
        <Section
          ground="linear-gradient(180deg, #F2F5F9 0%, #EBF0F5 46%, #EFF3F7 100%)"
          sx={{ py: { xs: 7, md: 9 } }}
        >
          <Reveal>
            <Box sx={{ mb: { xs: 3.5, md: 4 } }}>
              <SectionHead
                eyebrow="Beyond staking"
                tier="minor"
                title="6% from staking. More from the strategy."
                lede="Beyond the base staking rewards, Hey Open is developing an enterprise compute strategy targeting 40% to 50% returns through compute procurement, prepaid contracts, and options-based risk management."
              />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                ...PANEL,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              }}
            >
              {[
                [RATES.base_short, 'Base annual staking rewards', false],
                [RATES.total, 'Target compute strategy returns', true],
              ].map(([fig, label, lead], i) => (
                <Box
                  key={label}
                  sx={{
                    px: { xs: 2.4, md: 3.4 },
                    py: { xs: 2.6, md: 3 },
                    borderLeft: { sm: i === 0 ? 'none' : `1px solid ${RULE}` },
                    borderTop: { xs: i === 0 ? 'none' : `1px solid ${RULE}`, sm: 'none' },
                    background: lead ? 'rgba(255,102,0,0.05)' : 'transparent',
                  }}
                >
                  <Typography
                    sx={{
                      ...FIG,
                      fontSize: { xs: '2.4rem', md: '3rem' },
                      fontWeight: 600,
                      letterSpacing: '-0.045em',
                      lineHeight: 1,
                      color: lead ? 'var(--brand-accent)' : 'var(--text-heading)',
                    }}
                  >
                    {fig}
                  </Typography>
                  <Typography sx={{ mt: 1.2, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={60}>
            <Box sx={{ mt: { xs: 3.5, md: 4 } }}>
              <Label sx={{ display: 'block', mb: 2.2 }}>How the strategy works</Label>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2.4, md: 4 } }}>
                {STRATEGY.map(([mark, name, body], i) => (
                  <Box
                    key={name}
                    sx={{ pl: { md: i === 0 ? 0 : 3.6 }, borderLeft: { md: i === 0 ? 'none' : `1px solid ${RULE}` } }}
                  >
                    <Box sx={{ color: 'var(--brand-accent)', mb: 1.4 }}>
                      <Mark name={mark} size={22} />
                    </Box>
                    <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>
                      {name}
                    </Typography>
                    <Typography sx={{ mt: 0.7, fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                      {body}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={60}>
            <Box
              sx={{
                mt: { xs: 3, md: 3.5 },
                pt: { xs: 2.6, md: 3 },
                borderTop: `1px solid ${RULE}`,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: { xs: 2, md: 3 },
              }}
            >
              <Box sx={{ flexShrink: 0 }}>
                <Button href="/enterprise" primary>Explore the return strategy</Button>
              </Box>
              <Typography sx={{ flex: '1 1 340px', minWidth: 0, fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                The {RATES.total} figure is a strategy target, not a guaranteed staking return.
                Actual results and any distribution to stakers depend on the programme&rsquo;s
                published terms.
              </Typography>
            </Box>
          </Reveal>
        </Section>
      )}

      {/* ── 6. Where the stake actually works ───────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
            <SectionHead
              eyebrow="Where the stake works"
              tier="minor"
              title="Where the work actually happens."
              lede="Your $OPEN does not leave your wallet. What it backs is deployed across three places, and two different kinds of thing come back: the rate the staking contract owes you either way, and whatever the strategy makes on top of it."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'stretch', mb: { xs: 5, md: 6 } }}>
            <Box sx={{ display: 'flex', flex: { lg: '0 1 240px' }, minWidth: 0 }}>
              <Node
                tag="The stake"
                k="Staked $OPEN"
                s="Locked as collateral, still yours, visible the whole time. You can unstake."
                mark="lock"
                tone="accent"
                sx={{ flex: 1 }}
              />
            </Box>

            <Fan dir="out" />
            <Down />

            <Box
              sx={{
                flex: { lg: '1 1 0' },
                minWidth: 0,
                display: 'grid',
                gridTemplateRows: { lg: 'repeat(3, 1fr)' },
                gap: `${GAP}px`,
              }}
            >
              {DEPLOY.map((d) => (
                <Node key={d.k} k={d.k} s={d.s} mark={d.mark} />
              ))}
            </Box>

            <Fan dir="in" />
            <Down />

            <Box
              sx={{
                flex: { lg: '1 1 0' },
                minWidth: 0,
                display: 'grid',
                gridTemplateRows: { lg: 'repeat(2, 1fr)' },
                gap: `${GAP}px`,
              }}
            >
              {RETURNS.map((r) => (
                <Node key={r.tag} tag={r.tag} k={r.k} s={r.s} mark={r.mark} tone={r.tone} big={r.big} />
              ))}
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 3, md: 5 },
              pt: { xs: 4, md: 5 },
              borderTop: `1px solid ${RULE}`,
            }}
          >
            {PROOF.map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 0.8 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 7. The business behind all of it. HIDDEN ──────────
          The ink card with its own light, the three glass claims and the
          way through to /enterprise. Replaced by the token policy section
          below, which answers a question this one only gestured at.

          HIDDEN ON REQUEST. Nothing is deleted and ECONOMY is still
          defined, so bringing it back is deleting the two lines that wrap
          it. A comment wrapper would not work here: the markup carries
          comments of its own and those do not nest.

          Note what leaves with it. This was the page's only link to
          /enterprise, and that page is not in the navigation. With this
          hidden, /enterprise is reachable only by typing the address. */}
      {false && (
        <Section sx={{ py: { xs: 7, md: 9 } }}>
          <Reveal>
            <Box
              sx={{
                ...PANEL_INK,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '26px',
                px: { xs: 2.6, md: 5 },
                py: { xs: 3.6, md: 4.6 },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'radial-gradient(ellipse 60% 78% at 86% 0%, rgba(255,102,0,0.2) 0%, rgba(255,102,0,0.05) 44%, transparent 70%)',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Label onInk sx={{ display: 'block', mb: 1.8, color: 'var(--brand-accent)' }}>
                  The business behind $OPEN
                </Label>
                <Typography
                  component="h2"
                  sx={{
                    maxWidth: 640,
                    fontSize: { xs: '1.85rem', sm: '2.25rem', md: '2.6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.06,
                    color: '#FFFFFF',
                  }}
                >
                  <Box component="span" sx={{ display: 'block' }}>Real AI demand.</Box>
                  <Box component="span" sx={{ display: 'block', color: 'var(--brand-accent)' }}>
                    A stronger $OPEN economy.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: { xs: 2, md: 2.4 },
                    maxWidth: 620,
                    fontSize: { xs: '0.96rem', md: '1.02rem' },
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.62)',
                    textWrap: 'pretty',
                  }}
                >
                  Hey Open powers Custom Branded AI products for enterprises while managing compute
                  costs through options-based strategies. As businesses scale, infrastructure usage
                  drives commercial activity across the ecosystem.
                </Typography>

                <Box
                  sx={{
                    mt: { xs: 3, md: 3.6 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: { xs: 1.6, md: 2 },
                  }}
                >
                  {ECONOMY.map(([mark, name, body]) => (
                    <Box
                      key={name}
                      sx={{
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.022) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                        px: { xs: 2, md: 2.3 },
                        py: { xs: 2, md: 2.3 },
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--brand-accent)',
                          backgroundColor: 'rgba(255,102,0,0.13)',
                          border: '1px solid rgba(255,102,0,0.3)',
                        }}
                      >
                        <Mark name={mark} size={20} />
                      </Box>
                      <Typography
                        sx={{
                          mt: 1.8,
                          fontSize: { xs: '1.02rem', md: '1.06rem' },
                          fontWeight: 700,
                          letterSpacing: '-0.025em',
                          lineHeight: 1.25,
                          color: '#FFFFFF',
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography sx={{ mt: 0.8, fontSize: '0.89rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.56)' }}>
                        {body}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: { xs: 2.8, md: 3.4 },
                    pt: { xs: 2.2, md: 2.6 },
                    borderTop: `1px solid ${RULE_ON_INK}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Typography sx={{ flex: '1 1 300px', minWidth: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
                    How enterprise revenue, compute protection and $OPEN economics work together.
                  </Typography>

                  <Box
                    component="a"
                    href="/enterprise"
                    sx={{
                      flexShrink: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      px: '22px',
                      py: '13px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255,255,255,0.24)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '-0.015em',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      transition: 'background-color .18s ease, border-color .18s ease, transform .18s ease',
                      '&:hover': {
                        backgroundColor: 'var(--brand-accent)',
                        borderColor: 'var(--brand-accent)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    Explore the $OPEN economy
                    <Box component="span" aria-hidden="true" sx={{ opacity: 0.75 }}>&#8599;</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Section>
      )}

      {/* ── 8. What the business would do with the surplus ────
          Replaces the business card above it. That one said there was a
          business and pointed at another page; this one answers the
          question a holder actually has, which is what happens to the
          money once the business has it.

          Words left, figure right. The figure is the headline drawn:
          revenue climbing as a curve because it accrues continuously,
          supply coming down in steps because a burn is an event rather
          than a drift. They cross in the middle, which is the whole claim
          and needs no caption to land.

          The four numbered policy steps from the reference are not here on
          purpose. Each one is a commitment about treasury mechanics, and
          none of them is settled in this repo.

          No axis, no values, no figures anywhere. What the business earns
          and what it would buy back are unknown, and a number here would
          read as a projection. The badge says hypothetical and the note
          under the card says nothing is guaranteed. NEITHER HAS BEEN
          REVIEWED. */}
      <Section sx={{ py: { xs: 7, md: 9 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { lg: 'center' },
            gap: { xs: 4, lg: 7 },
          }}
        >
          <Reveal>
            <Box sx={{ flex: { lg: '0 1 440px' }, minWidth: 0 }}>
              <SectionHead
                eyebrow="The proposed token policy"
                maxWidth="100%"
                title={
                  <>
                    <Box component="span" sx={{ display: 'block' }}>Revenue grows.</Box>
                    <Box component="span" sx={{ display: 'block', color: 'var(--brand-accent)' }}>
                      Supply can shrink.
                    </Box>
                  </>
                }
                lede="When the business generates eligible surplus cash, a treasury policy could fund $OPEN purchases and permanent on-chain burns."
              />
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box
              sx={{
                flex: { lg: '1 1 0' },
                minWidth: 0,
                width: '100%',
                ...PANEL,
                px: { xs: 2.2, md: 3.2 },
                py: { xs: 2.4, md: 2.8 },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: '12px',
                  py: '7px',
                  borderRadius: '999px',
                  border: `1px solid ${RULE}`,
                  backgroundColor: 'rgba(11,15,26,0.03)',
                }}
              >
                <Label>Hypothetical, not a forecast</Label>
              </Box>

              <Box component="svg" viewBox="0 10 340 128" sx={{ width: '100%', display: 'block', mt: { xs: 2, md: 2.4 } }}>
                <defs>
                  <linearGradient id="policyRise" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,102,0,0.22)" />
                    <stop offset="100%" stopColor="rgba(255,102,0,0.02)" />
                  </linearGradient>
                </defs>

                {/* what the revenue line is measured against */}
                <line
                  x1="14"
                  y1="126"
                  x2="326"
                  y2="126"
                  stroke="rgba(15,23,42,0.12)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />

                <path
                  d={`M${POLICY_REVENUE.map(([x, y]) => `${x} ${y}`).join(' L')} L326 126 L14 126 Z`}
                  fill="url(#policyRise)"
                />

                {/* supply, stepping down: a burn is an event, not a drift */}
                <path
                  d={POLICY_SUPPLY}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                <path
                  d={`M${POLICY_REVENUE.map(([x, y]) => `${x} ${y}`).join(' L')}`}
                  fill="none"
                  stroke="var(--brand-accent)"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </Box>

              <Box sx={{ mt: 1.4, display: 'flex', flexWrap: 'wrap', gap: { xs: 1.4, md: 2.4 } }}>
                {[['Revenue', 'var(--brand-accent)'], ['Supply', '#334155']].map(([k, c]) => (
                  <Box key={k} sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
                    <Box aria-hidden="true" sx={{ width: '16px', height: '0px', flexShrink: 0, borderTop: `2px solid ${c}` }} />
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{k}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  mt: { xs: 1.8, md: 2 },
                  pt: { xs: 1.6, md: 1.8 },
                  borderTop: `1px solid ${RULE}`,
                  fontSize: '0.78rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}
              >
                Illustrative only. No revenue, purchase or burn is guaranteed, and tokens burned
                would depend on actual execution price and market conditions.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* ── 9. What that does to the supply. HIDDEN ──────────
          The fixed supply figure, the three buyback and burn mechanics and
          the row of reference links.

          HIDDEN ON REQUEST. Nothing is deleted and TOKENOMICS, RATES.supply
          and LinkChips are all still defined, so it is two lines to bring
          back.

          Note what leaves with it. The supply figure is stated nowhere else
          on the page, and this section held the only links to /token, to
          market data and to the contract. LinkChips is now unused. */}
      {false && (
        <Section sx={{ py: { xs: 7, md: 9 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <SectionHead
                eyebrow="$OPEN tokenomics"
                tier="minor"
                title="Less supply. Built around real usage."
                lede="Hey Open's proposed buyback-and-burn mechanism connects available net revenue to $OPEN purchases and permanent token burns."
              />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
                gap: { xs: 3, md: 6 },
                alignItems: 'center',
              }}
            >
              <Box sx={{ ...ACCENT, px: { xs: 2.6, md: 3.2 }, py: { xs: 3, md: 3.6 } }}>
                <Label sx={{ color: '#9A3C00' }}>Supply</Label>
                <Typography
                  sx={{
                    ...FIG,
                    mt: 1.8,
                    fontSize: { xs: '2.8rem', md: '3.4rem' },
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: '#9A3C00',
                  }}
                >
                  {RATES.supply}
                </Typography>
                <Typography sx={{ mt: 1.4, fontSize: '0.86rem', lineHeight: 1.55, color: 'rgba(154,60,0,0.8)' }}>
                  Fixed at launch. No inflation switch.
                </Typography>
              </Box>

              <Box>
                {TOKENOMICS.map(([mark, name, body], i) => (
                  <Box
                    key={name}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      pt: i ? 2.2 : 0,
                      mt: i ? 2.2 : 0,
                      borderTop: i ? `1px solid ${RULE}` : 'none',
                    }}
                  >
                    <Chip name={mark} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>
                        {name}
                      </Typography>
                      <Typography sx={{ mt: 0.5, fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                        {body}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.6 }}>
                  <Button href="/token" small>Read the tokenomics</Button>
                  <LinkChips />
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Section>
      )}

      {/* ── 10. So start. HIDDEN ────────────
          The three numbered cards: get it, stake it, unlock what it gives.

          HIDDEN ON REQUEST. Nothing is deleted and STEPS is still defined.

          Note what leaves with it. Nothing essential: the hero still
          carries both Buy $OPEN and Stake $OPEN, and the ask carries Stake
          $OPEN again, so both routes survive. What goes is the only place
          the page set them out in order. */}
      {false && (
        <Section sx={{ py: { xs: 7, md: 9 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <SectionHead
                eyebrow="Get started with $OPEN"
                tier="minor"
                title="Three moves. Put $OPEN to work."
              />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
              {STEPS.map((step) => (
                <Box
                  key={step.n}
                  sx={{ ...PANEL, display: 'flex', flexDirection: 'column', px: { xs: 2.4, md: 2.8 }, py: { xs: 2.8, md: 3.2 } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.4 }}>
                    <Box
                      sx={{
                        ...FIG,
                        width: 36,
                        height: 36,
                        borderRadius: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--brand-accent)',
                        backgroundColor: 'rgba(255,102,0,0.09)',
                        border: '1px solid rgba(255,102,0,0.2)',
                      }}
                    >
                      {step.n}
                    </Box>
                    <Mark name={step.mark} sx={{ color: 'var(--text-heading)', opacity: 0.32 }} />
                  </Box>
                  <Typography
                    sx={{ fontSize: { xs: '1.3rem', md: '1.45rem' }, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-heading)', mb: 1.2 }}
                  >
                    {step.k}
                  </Typography>
                  <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-secondary)', flex: 1 }}>
                    {step.s}
                  </Typography>
                  {step.cta && (
                    <Box sx={{ mt: 3 }}>
                      <Button href={step.href} small>{step.cta}</Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Reveal>
        </Section>
      )}

      {/* ── The ask ───────────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 8, md: 11 } }}>
        <Reveal>
          <Box sx={{ textAlign: 'center' }}>
            <Label sx={{ display: 'block', mb: 2.2, color: 'var(--brand-accent)' }}>
              Put $OPEN to work
            </Label>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.02,
                color: 'var(--text-heading)',
                maxWidth: '17ch',
                mx: 'auto',
                textWrap: 'balance',
              }}
            >
              Your $OPEN. More than a holding.
            </Typography>

            <Typography
              sx={{
                mt: 2.6,
                maxWidth: '58ch',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                textWrap: 'pretty',
              }}
            >
              Earn staking rewards, unlock Hey Open Pro, and take part in an AI ecosystem powered
              by real products and enterprise demand.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4, justifyContent: 'center' }}>
              <Button href={LINKS.stake} primary>
                Stake $OPEN
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
              <Button href={APP}>Try the app first</Button>
            </Box>

            <Typography
              sx={{ mt: 6, fontFamily: MONO, fontSize: '0.72rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '72ch', mx: 'auto' }}
            >
              Staking rewards are not a guarantee. {RATES.base} is the base annual staking rate.
              The {RATES.total} band is a target for the enterprise compute strategy, not a
              staking return, and any distribution to stakers depends on that programme&rsquo;s
              published terms. Nothing here is investment advice. Read the terms before you stake.
            </Typography>
          </Box>
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
