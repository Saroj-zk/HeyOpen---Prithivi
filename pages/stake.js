import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import TokenFlowDiagram from '@/components/TokenFlowDiagram';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { MONO, RULE, RULE_ON_INK, FIG, Label, Entry, Button } from '@/components/ui/Ledger';
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
  /* All in, and inclusive of the floor rather than stacked on top of it. */
  total: '40% to 50%',
  threshold: '100 $OPEN',
};

const PRO = [
  ['Text prompts', 'Unlimited'],
  ['Image and video models', 'The leading ones'],
  ['Every model in the catalogue', 'Included'],
  ['What it costs while staked', 'Nothing'],
];

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

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

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
  spark: 'M10 2.5v15M2.5 10h15M5 5l10 10M15 5 5 15',
  coins: 'M12.5 6.5a4.5 2.5 0 1 1-9 0 4.5 2.5 0 0 1 9 0ZM3.5 6.5v4c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5v-4M7.5 13.3v1.2c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5v-4c0-1-1-1.9-2.6-2.3',
  chat: 'M10 3.5c4.1 0 7.5 2.4 7.5 5.4S14.1 14.3 10 14.3c-.7 0-1.4-.1-2.1-.2L4 16l1-3C3.4 12 2.5 10.6 2.5 8.9 2.5 5.9 5.9 3.5 10 3.5Z',
  code: 'M7.3 5.5 3 10l4.3 4.5M12.7 5.5 17 10l-4.3 4.5M11.3 4.2l-2.6 11.6',
  bot: 'M10 2.5v2.2M6.2 4.7h7.6A2.2 2.2 0 0 1 16 6.9v6.2a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 13.1V6.9a2.2 2.2 0 0 1 2.2-2.2ZM7.6 8.8v1.6M12.4 8.8v1.6M4 9.4H2.6M16 9.4h1.4',
  bolt: 'M11.5 2 4.5 11.5H9l-.5 6.5 7-9.5H11z',
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
        border: `1px solid ${
          ink ? 'rgba(255,102,0,0.3)' : accent ? 'rgba(255,102,0,0.24)' : 'rgba(11,15,26,0.08)'
        }`,
      }}
    >
      <Mark name={name} size={19} />
    </Box>
  );
}

const HOW = [
  { n: '01', cta: 'Buy $OPEN', href: LINKS.buy, mark: 'coins' },
  { n: '02', cta: 'Stake $OPEN', href: LINKS.stake, mark: 'lock' },
  { n: '03', cta: 'Mint $HEY', href: LINKS.mint, mark: 'spark' },
];

/* Where the stake is put to work. Categories only: see the note at the top
   of this file about what cannot be written here without an answer. */
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

const STAKES = [
  {
    token: '$OPEN',
    mark: 'diamond',
    kind: 'The capital asset',
    paidIn: 'Value',
    lead: true,
    rows: [
      ['Minted into', '$HEY'],
      ['Paid in', '$OPEN'],
      ['Spendable', 'Anywhere'],
    ],
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    token: '$HEY',
    mark: 'spark',
    kind: 'Minted by stakers',
    paidIn: 'Compute credits',
    rows: [
      ['Minted from', 'Staked $OPEN'],
      ['Pays out', 'Compute credits'],
      ['Good for', 'Every model'],
    ],
    cta: 'Mint $HEY',
    href: LINKS.mint,
  },
];

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

const PANEL_INK = {
  position: 'relative',
  borderRadius: '16px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, #1A1F2B 0%, #0B0F1A 70%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 26px 52px -34px rgba(11,15,26,0.6)',
};

const HEAD_STRIP = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  px: { xs: 2.2, md: 2.6 },
  py: '14px',
  borderBottom: `1px solid ${RULE}`,
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
function SectionHead({ title, lede, onInk, tier = 'major', maxWidth = 760 }) {
  return (
    <Box sx={{ maxWidth }}>
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
/* What the enterprise side actually sells                             */
/* ------------------------------------------------------------------ */

/* Three products on one set of rails. The chrome line is what the buyer's
   own customer sees; the line under it is what the product does. */
const STACK = [
  {
    id: 'apps',
    tab: 'AI Apps',
    mark: 'chat',
    name: 'Branded AI Workspace',
    chrome: 'Your enterprise brand',
    k: 'Ask your AI assistant',
    s: 'Private workspace. Multiple models. Managed inference.',
  },
  {
    id: 'api',
    tab: 'Inference APIs',
    mark: 'code',
    name: 'Enterprise Model API',
    chrome: 'Your enterprise API',
    k: 'POST /v1/inference',
    mono: true,
    s: 'Model access. Usage metering. Scalable compute.',
  },
  {
    id: 'agents',
    tab: 'AI Agents',
    mark: 'bot',
    name: 'Enterprise Agent Platform',
    chrome: 'Your enterprise agents',
    k: 'Automate complex workflows',
    s: 'AI agents. Tools. Managed execution.',
  },
];

/* THE FIRST LINE IS NOT THE SUPPLIED ONE. "Their brand. Our technology."
   was the same sentence as the headline three inches above it, which reads
   as a copy bug rather than as a bookend. The other two are verbatim. */
const HEDGE_PROOF = [
  ['Source', 'Secure the compute capacity.'],
  ['Protect', 'Hedge the price exposure on it.'],
  ['Deliver', 'Quote enterprises a contracted rate.'],
];

const TOKEN_PROOF = [
  ['Stake', 'Reaches the compute utility.'],
  ['Buyback', 'Funded from a defined share of net revenue.'],
  ['Burn', 'Supply reduced through verifiable transactions.'],
];

const STACK_PROOF = [
  ['White-label', 'The product ships under their name.'],
  ['Prepaid compute', 'Committed usage, clear billing.'],
  ['Scalable inference', 'Infrastructure that grows with demand.'],
];

/**
 * One platform, three businesses, shown rather than listed.
 *
 * The three products differ in one way only, which is what the buyer's own
 * customer ends up looking at. A list of three bullet points hides that; a
 * single device that changes what is on its screen is the whole argument in
 * one object. So the frame, the chrome label and the footer never move, and
 * only the screen swaps.
 *
 * The screen is the one piece of ink in this section, because it is a
 * screen. Everything around it is the page's ordinary white panel, which is
 * what keeps the dark card reading as a product rather than as a band.
 *
 * It holds a minimum height so the three do not resize the section as a
 * reader clicks through them. Content that jumps on a tab change is the
 * fastest way to make a control feel broken.
 */
function WhiteLabel() {
  const [active, setActive] = React.useState(0);
  const item = STACK[active];

  return (
    <Box sx={{ ...PANEL, p: { xs: 1.8, md: 2.8 } }}>
      <Box
        role="tablist"
        aria-label="White-label products"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          p: '4px',
          borderRadius: '999px',
          backgroundColor: 'rgba(11,15,26,0.045)',
          border: `1px solid ${RULE}`,
        }}
      >
        {STACK.map((p, i) => {
          const on = i === active;
          return (
            <Box
              key={p.id}
              component="button"
              type="button"
              role="tab"
              id={`stack-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`stack-panel-${p.id}`}
              onClick={() => setActive(i)}
              sx={{
                appearance: 'none',
                cursor: 'pointer',
                border: on ? '1px solid rgba(11,15,26,0.07)' : '1px solid transparent',
                borderRadius: '999px',
                px: { xs: 0.5, md: 2 },
                py: { xs: 1, md: 1.15 },
                fontFamily: 'inherit',
                fontSize: { xs: '0.76rem', md: '0.9rem' },
                fontWeight: on ? 700 : 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                color: on ? 'var(--text-heading)' : 'var(--text-muted)',
                backgroundColor: on ? '#FFFFFF' : 'transparent',
                boxShadow: on ? '0 1px 2px rgba(11,15,26,0.06)' : 'none',
                transition: 'color .18s ease, background-color .18s ease',
                '&:hover': { color: 'var(--text-heading)' },
              }}
            >
              {p.tab}
            </Box>
          );
        })}
      </Box>

      <Box
        role="tabpanel"
        id={`stack-panel-${item.id}`}
        aria-labelledby={`stack-tab-${item.id}`}
        sx={{ mt: { xs: 2.2, md: 2.8 } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: { xs: 1.6, md: 1.8 },
          }}
        >
          <Chip name={item.mark} />
          <Typography
            sx={{
              flex: '1 1 auto',
              minWidth: '150px',
              fontSize: { xs: '1rem', md: '1.12rem' },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: 'var(--text-heading)',
            }}
          >
            {item.name}
          </Typography>
          <Label
            sx={{
              ml: 'auto',
              flexShrink: 0,
              px: '11px',
              py: '5px',
              borderRadius: '999px',
              border: `1px solid ${RULE}`,
              backgroundColor: 'var(--bg-card)',
            }}
          >
            White-label
          </Label>
        </Box>

        {/* The buyer's chrome, and inside it the screen their customer sees. */}
        <Box
          sx={{
            borderRadius: '18px',
            border: `1px solid ${RULE}`,
            backgroundColor: 'rgba(11,15,26,0.035)',
            p: { xs: 1.3, md: 1.7 },
          }}
        >
          <Label sx={{ display: 'block', mb: 1.1, ml: '6px' }}>{item.chrome}</Label>
          <Box
            key={item.id}
            sx={{
              ...PANEL_INK,
              px: { xs: 2.2, md: 3 },
              py: { xs: 2.4, md: 2.8 },
              minHeight: { xs: 104, md: 110 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '@keyframes stackIn': {
                from: { opacity: 0, transform: 'translateY(6px)' },
                to: { opacity: 1, transform: 'none' },
              },
              animation: 'stackIn .3s cubic-bezier(0.16, 1, 0.3, 1)',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <Typography
              sx={{
                fontFamily: item.mono ? MONO : undefined,
                fontSize: item.mono
                  ? { xs: '1.02rem', md: '1.2rem' }
                  : { xs: '1.14rem', md: '1.4rem' },
                fontWeight: item.mono ? 500 : 700,
                letterSpacing: item.mono ? '-0.01em' : '-0.03em',
                lineHeight: 1.2,
                color: '#FFFFFF',
              }}
            >
              {item.k}
            </Typography>
            <Typography
              sx={{
                mt: 1.1,
                fontSize: { xs: '0.84rem', md: '0.88rem' },
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.62)',
              }}
            >
              {item.s}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 1.8, md: 2.2 },
            pt: { xs: 1.5, md: 1.8 },
            borderTop: `1px solid ${RULE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.1,
            color: 'var(--text-muted)',
          }}
        >
          <Mark name="bolt" size={14} />
          <Label sx={{ textAlign: 'center' }}>Powered by Hey Open infrastructure</Label>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Two dashboards                                                      */
/* ------------------------------------------------------------------ */

/* Deterministic, because toLocaleString is not guaranteed to agree between
   Node and the browser and these numbers are server rendered first. */
function comma(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function usd(n) {
  return `$${n.toFixed(2)}`;
}

const SLIDER_SX = {
  color: 'var(--brand-accent)',
  height: 6,
  padding: '14px 0',
  '& .MuiSlider-rail': { opacity: 1, backgroundColor: 'rgba(11,15,26,0.1)' },
  '& .MuiSlider-track': { border: 'none' },
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    border: '2px solid var(--brand-accent)',
    boxShadow: '0 2px 6px rgba(11,15,26,0.18)',
    '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 7px rgba(255,102,0,0.14)' },
    '&.Mui-active': { boxShadow: '0 0 0 11px rgba(255,102,0,0.16)' },
  },
};

/* A label above a control, with the value it currently reads. */
function Dial({ label, value, children }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Label>{label}</Label>
        <Typography
          component="span"
          sx={{ ...FIG, fontSize: { xs: '1.02rem', md: '1.12rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}
        >
          {value}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */

/* The contract the drawing illustrates. One strike, one premium, and a
   rate that does not move, which is the entire point of the figure. */
const STRIKE = 3.0;
const PREMIUM = 0.2;
const CONTRACTED = 3.6;
const MKT = { min: 2, max: 6, step: 0.1, start: 4.5 };

/* Seven periods that already happened, and an eighth the reader sets. The
   history is fixed so that only the last point answers the slider: a chart
   where every point moved together would be an animation, not a what-if. */
const HISTORY = [2.4, 2.62, 2.55, 3.1, 3.42, 3.28, 3.8];

const PLOT = { x0: 12, x1: 328, y0: 14, y1: 114 };

/* What the hedge actually does. Below the strike you pay the market and the
   premium is wasted; above it you pay the strike and the premium, and that
   is the whole mechanism. Nothing here is a forecast. */
function hedged(p) {
  return Math.min(p, STRIKE) + PREMIUM;
}

function yOf(p) {
  const t = (p - MKT.min) / (MKT.max - MKT.min);
  return PLOT.y1 - t * (PLOT.y1 - PLOT.y0);
}

function seriesPath(values) {
  const step = (PLOT.x1 - PLOT.x0) / (values.length - 1);
  return values
    .map((v, i) => `${i ? 'L' : 'M'}${(PLOT.x0 + i * step).toFixed(1)} ${yOf(v).toFixed(1)}`)
    .join(' ');
}

/**
 * What happens when GPU prices rise.
 *
 * The two lines are the argument and they are drawn in the same language the
 * compute market figure on the home page uses: slate is the price the market
 * does to you, orange is the part we do something about. No third hue is
 * introduced for the sake of a legend.
 *
 * The orange line goes flat the moment the slate one crosses the strike.
 * That flattening is the product. A reader who drags the handle up watches
 * the gap open by itself, which is a thing no sentence does as well.
 *
 * Drag it down instead and the orange line sits ABOVE the slate one, because
 * below the strike the premium is money spent for nothing. That is left in
 * deliberately. A figure that only ever flatters the hedge is a sales chart.
 *
 * Figure left, readout right. Drawn full width the chart was 470px tall on a
 * desktop, because an SVG with a viewBox grows with its column, and the
 * section came out at 1402 against a page where every other one is 900.
 * Halving the column halves the drawing and puts the two numbers next to the
 * lines they come from, which is where they were always wanted.
 */
function Protection() {
  const [market, setMarket] = React.useState(MKT.start);

  const mkt = [...HISTORY, market];
  const hdg = mkt.map(hedged);
  const now = hedged(market);

  return (
    <Box sx={{ ...PANEL, px: { xs: 2, md: 3.2 }, py: { xs: 2.4, md: 2.8 } }}>
      <Typography
        sx={{
          fontSize: { xs: '1.08rem', md: '1.22rem' },
          fontWeight: 750,
          letterSpacing: '-0.025em',
          lineHeight: 1.25,
          color: 'var(--text-heading)',
        }}
      >
        What happens when GPU prices rise?
      </Typography>
      <Typography sx={{ mt: 0.7, fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
        One compute option, covering an equivalent number of GPU-hours. Drag the price.
      </Typography>

      <Box
        sx={{
          mt: { xs: 2, md: 2.2 },
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'stretch',
          gap: { xs: 2.2, lg: 3.4 },
        }}
      >
        {/* ---- the figure ---- */}
        <Box sx={{ flex: { lg: '1 1 58%' }, minWidth: 0 }}>
          <Dial label="Simulated market price" value={`${usd(market)}/hr`}>
            <Slider
              sx={SLIDER_SX}
              value={market}
              onChange={(e, v) => setMarket(v)}
              min={MKT.min}
              max={MKT.max}
              step={MKT.step}
              aria-label="Simulated market price per GPU hour"
            />
          </Dial>

          <Box component="svg" viewBox="0 6 340 114" sx={{ width: '100%', display: 'block', mt: 0.4 }}>
            {[3, 4, 5].map((g) => (
              <line
                key={g}
                x1={PLOT.x0}
                y1={yOf(g)}
                x2={PLOT.x1}
                y2={yOf(g)}
                stroke="rgba(15,23,42,0.08)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* the rate an enterprise is quoted, which does not move */}
            <line
              x1={PLOT.x0}
              y1={yOf(CONTRACTED)}
              x2={PLOT.x1}
              y2={yOf(CONTRACTED)}
              stroke="rgba(71,85,105,0.55)"
              strokeWidth="1.3"
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d={seriesPath(mkt)}
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={seriesPath(hdg)}
              fill="none"
              stroke="var(--brand-accent)"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* and where the reader is holding it */}
            <circle cx={PLOT.x1} cy={yOf(market)} r="3.4" fill="#FFFFFF" stroke="#334155" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <circle cx={PLOT.x1} cy={yOf(now)} r="3.4" fill="#FFFFFF" stroke="var(--brand-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label>Earlier</Label>
            <Label>Now</Label>
          </Box>

          <Box sx={{ mt: 1.6, display: 'flex', flexWrap: 'wrap', gap: { xs: 1.4, md: 2.2 } }}>
            {[
              ['Market cost', '#334155', false],
              ['Hedged cost', 'var(--brand-accent)', false],
              ['Enterprise rate', 'rgba(71,85,105,0.55)', true],
            ].map(([k, c, dash]) => (
              <Box key={k} sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
                <Box
                  aria-hidden="true"
                  sx={{ width: '16px', height: '0px', flexShrink: 0, borderTop: `2px ${dash ? 'dashed' : 'solid'} ${c}` }}
                />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{k}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ---- what it costs you either way ---- */}
        <Box
          sx={{
            flex: { lg: '1 1 42%' },
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            borderLeft: { lg: `1px solid ${RULE}` },
            pl: { lg: 3.4 },
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: { xs: 1.3, md: 1.5 } }}>
            {[
              ['Without protection', usd(market), 'Market cost per hour', false],
              ['With protection', usd(now), 'Hedged cost per hour', true],
            ].map(([tag, fig, note, lead]) => (
              <Box
                key={tag}
                sx={{
                  ...(lead ? ACCENT : PANEL),
                  boxShadow: 'none',
                  px: { xs: 1.6, md: 1.8 },
                  py: { xs: 1.5, md: 1.7 },
                }}
              >
                <Label sx={{ color: lead ? '#9A3C00' : undefined }}>{tag}</Label>
                <Typography
                  sx={{
                    ...FIG,
                    mt: 0.7,
                    fontSize: { xs: '1.6rem', md: '1.85rem' },
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: lead ? '#9A3C00' : 'var(--text-heading)',
                  }}
                >
                  {fig}
                </Typography>
                <Typography sx={{ mt: 0.6, fontSize: '0.8rem', lineHeight: 1.4, color: lead ? 'rgba(154,60,0,0.8)' : 'var(--text-secondary)' }}>
                  {note}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography
            sx={{
              mt: { xs: 1.6, md: 'auto' },
              pt: { xs: 1.5, md: 1.7 },
              borderTop: `1px solid ${RULE}`,
              fontSize: '0.78rem',
              lineHeight: 1.55,
              color: 'var(--text-muted)',
            }}
          >
            Illustrative only: {usd(STRIKE)} option strike, {usd(PREMIUM)} premium per covered
            GPU-hour, matched price exposure. Actual costs and protection vary, and hedges do not
            guarantee margins or compute availability.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

const STAKE_DIAL = { min: 100, max: 100000, step: 100, start: 100 };
const REV_DIAL = { min: 10000, max: 1000000, step: 10000, start: 100000 };
const ALLOC_DIAL = { min: 40, max: 50, step: 1, start: 45 };

/**
 * The two things $OPEN is for, side by side because they are two things.
 *
 * Left is utility and it deliberately prints no rate. Credits per staked
 * token are not settled anywhere in this repo, so the control reports the
 * stake back and says where the real number will come from. A slider that
 * invented a credit figure would be the yield calculator again under a new
 * name.
 *
 * Right is the allocation, and it is the one place on the page where the 40
 * to 50 band is shown doing what it actually does: a share of eligible net
 * revenue, spent buying $OPEN, multiplied out in front of the reader.
 *
 * THIS CONTRADICTS THE REST OF THE PAGE, which still presents the same band
 * as a return the treasury is run to. One of the two is wrong, and until
 * that is settled this section is the conservative one.
 */
function OpenUtility() {
  const [stake, setStake] = React.useState(STAKE_DIAL.start);
  const [revenue, setRevenue] = React.useState(REV_DIAL.start);
  const [alloc, setAlloc] = React.useState(ALLOC_DIAL.start);

  const budget = revenue * (alloc / 100);

  return (
    <Box sx={{ ...PANEL, px: { xs: 2, md: 3.2 }, py: { xs: 2.4, md: 1.9 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: { xs: 1.8, md: 1.8 } }}>
        <Typography
          sx={{
            flex: '1 1 auto',
            minWidth: '150px',
            fontSize: { xs: '1.08rem', md: '1.22rem' },
            fontWeight: 750,
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            color: 'var(--text-heading)',
          }}
        >
          Explore $OPEN utility
        </Typography>
        <Label sx={{ ml: 'auto', flexShrink: 0, px: '11px', py: '5px', borderRadius: '999px', border: `1px solid ${RULE}`, backgroundColor: 'var(--bg-card)' }}>
          Illustrative
        </Label>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'stretch',
          gap: { xs: 2.4, lg: 3.4 },
        }}
      >
        {/* ---- what the stake reaches ---- */}
        <Box sx={{ flex: { lg: '1 1 44%' }, minWidth: 0 }}>
          <Dial label="Your $OPEN stake" value={`${comma(stake)} $OPEN`}>
            <Slider
              sx={SLIDER_SX}
              value={stake}
              onChange={(e, v) => setStake(v)}
              min={STAKE_DIAL.min}
              max={STAKE_DIAL.max}
              step={STAKE_DIAL.step}
              aria-label="Your $OPEN stake"
            />
          </Dial>

          <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Chip name="bolt" />
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.04rem' }, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>
                Compute credit access
              </Typography>
              <Typography sx={{ mt: 0.6, fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Staking is what connects a holding to compute. What a stake is worth in credits
                comes from the published schedule, not from this control.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ---- and what the business does with its own money ---- */}
        <Box
          sx={{
            flex: { lg: '1 1 56%' },
            minWidth: 0,
            borderLeft: { lg: `1px solid ${RULE}` },
            borderTop: { xs: `1px solid ${RULE}`, lg: 'none' },
            pl: { lg: 3.4 },
            pt: { xs: 2.2, lg: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.04rem', md: '1.14rem' },
              fontWeight: 750,
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              color: 'var(--text-heading)',
            }}
          >
            Understand the {RATES.total} allocation
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            A share of eligible net revenue, spent buying $OPEN. A proposed policy, not a staking
            rate and not a promised return.
          </Typography>

          <Box sx={{ mt: { xs: 1.6, md: 1.2 }, display: 'grid', gap: { xs: 1.2, md: 0.9 } }}>
            <Dial label="Illustrative eligible net revenue" value={`$${comma(revenue)}`}>
              <Slider
                sx={SLIDER_SX}
                value={revenue}
                onChange={(e, v) => setRevenue(v)}
                min={REV_DIAL.min}
                max={REV_DIAL.max}
                step={REV_DIAL.step}
                aria-label="Illustrative eligible net revenue"
              />
            </Dial>

            <Dial label="Buyback allocation" value={`${alloc}%`}>
              <Slider
                sx={SLIDER_SX}
                value={alloc}
                onChange={(e, v) => setAlloc(v)}
                min={ALLOC_DIAL.min}
                max={ALLOC_DIAL.max}
                step={ALLOC_DIAL.step}
                aria-label="Buyback allocation percentage"
              />
            </Dial>
          </Box>

          <Box
            sx={{
              ...ACCENT,
              boxShadow: 'none',
              mt: { xs: 1.6, md: 1.4 },
              px: { xs: 1.8, md: 2.1 },
              py: { xs: 1.6, md: 1.4 },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 1.2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Label sx={{ color: '#9A3C00' }}>Illustrative buyback budget</Label>
              <Typography sx={{ mt: 0.5, fontSize: '0.8rem', lineHeight: 1.4, color: 'rgba(154,60,0,0.8)' }}>
                Eligible net revenue times the allocation.
              </Typography>
            </Box>
            <Typography
              sx={{
                ...FIG,
                ml: 'auto',
                fontSize: { xs: '1.9rem', md: '2.2rem' },
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                color: '#9A3C00',
              }}
            >
              ${comma(budget)}
            </Typography>
          </Box>

          <Typography sx={{ mt: { xs: 1.4, md: 1.2 }, fontSize: '0.78rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
            A final policy still has to state the percentage, what counts as eligible revenue,
            the timing, reserve treatment, and where the buybacks can be verified.
          </Typography>
        </Box>
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

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1500,
          height: 700,
          background:
            'radial-gradient(ellipse 62% 58% at 50% 0%, rgba(255,102,0,0.16) 0%, rgba(255,80,0,0.04) 46%, transparent 74%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── 1. What this is ───────────────────────────────────────── */}
      <Section first sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <Box sx={{ maxWidth: 880, mx: 'auto', textAlign: 'center' }}>
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

      {/* ── 2. The four moves ──────────────────────────────────────
          The flowchart from before the merge that replaced it, recovered and
          put where it belongs. It brings its own Container, hence `bare`.
          No eyebrow, because no heading on this page has one. */}
      <Section bare>
        <TokenFlowDiagram />
      </Section>

      {/* ── 3. Where the stake actually goes ───────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
            <SectionHead
              title="Where the work actually happens."
              lede="Your $OPEN does not leave your wallet. What it backs is deployed across three places, and two different kinds of thing come back: a rate the contract owes you either way, and whatever the book makes on top."
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

      {/* ── 4. And who all that compute is sold to ───────────
          The cards above name compute capital and AI infrastructure as two
          of the three places the stake is deployed. This is the demand on
          the other side of both, which is the part a staker otherwise has
          no way to see. It sits here rather than later because it answers
          the section it follows.

          It is the one section on a ground of its own. On the page's flat
          white everything here read as plain, and the white showcase panel
          had nothing to sit against. The tint is the site's existing alt
          background rather than a new colour: cool, where the page's only
          other tint is the warm glow behind the hero, so the two cannot be
          mistaken for each other.

          No eyebrow, because no heading on this page has one. */}
      <Section
        ground="linear-gradient(180deg, #F2F5F9 0%, #EBF0F5 46%, #EFF3F7 100%)"
        sx={{ py: { xs: 7, md: 10 } }}
      >
        <Reveal>
          <Box sx={{ mb: { xs: 3, md: 3.5 } }}>
            <SectionHead
              tier="minor"
              title={
                <>
                  <Box component="span" sx={{ display: 'block' }}>Their brand.</Box>
                  <Box component="span" sx={{ display: 'block' }}>Our infrastructure.</Box>
                </>
              }
              lede="Hey Open powers white-label AI products for businesses. From inference APIs to complete AI applications, enterprises can launch under their own brand while we manage the infrastructure behind them."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <WhiteLabel />
        </Reveal>

        <Reveal delay={60}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2.6, md: 5 },
              mt: { xs: 3, md: 3 },
              pt: { xs: 3, md: 3 },
              borderTop: `1px solid ${RULE}`,
            }}
          >
            {STACK_PROOF.map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 0.8 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Typography
            sx={{
              mt: { xs: 2.5, md: 1.5 },
              maxWidth: 620,
              fontSize: { xs: '1.02rem', md: '1.12rem' },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.45,
              color: 'var(--text-heading)',
              textWrap: 'pretty',
            }}
          >
            Every deployment creates another channel for AI compute demand.
          </Typography>
        </Reveal>
      </Section>

      {/* ── 5. How the cost of all that is held still ──────────
          The section above promises enterprises a contracted rate. This is
          the only reason that promise can be made, so it follows directly.
          Plain ground, between two tinted ones, because the figure in it is
          the loudest object on the page and does not need help. */}
      <Section sx={{ py: { xs: 7, md: 5 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 3, md: 2.5 } }}>
            <SectionHead
              tier="minor"
              title={
                <>
                  <Box component="span" sx={{ display: 'block' }}>Compute prices move.</Box>
                  <Box component="span" sx={{ display: 'block' }}>We manage the exposure.</Box>
                </>
              }
              lede="GPU prices move, and a business that simply pays them cannot quote anyone a stable rate. Compute is bought and its price exposure hedged, which is what makes a contracted rate possible."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Protection />
        </Reveal>

        <Reveal delay={60}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2.4, md: 5 },
              mt: { xs: 3, md: 1.5 },
              pt: { xs: 3, md: 1.5 },
              borderTop: `1px solid ${RULE}`,
            }}
          >
            {HEDGE_PROOF.map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 0.8 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Typography
            sx={{
              mt: { xs: 2.5, md: 1.5 },
              maxWidth: 620,
              fontSize: { xs: '1.02rem', md: '1.12rem' },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.45,
              color: 'var(--text-heading)',
              textWrap: 'pretty',
            }}
          >
            More predictable compute costs. A business built to scale.
          </Typography>
        </Reveal>
      </Section>

      {/* ── 6. And what any of it has to do with the token ──────
          The close of the business block, and the only place the allocation
          band is shown doing arithmetic instead of being quoted. Tinted, to
          bookend the enterprise section at the other end. */}
      <Section
        ground="linear-gradient(180deg, #EFF3F7 0%, #EBF0F5 46%, #F2F5F9 100%)"
        sx={{ py: { xs: 7, md: 5 } }}
      >
        <Reveal>
          <Box sx={{ mb: { xs: 3, md: 2.5 } }}>
            <SectionHead
              tier="minor"
              title={
                <>
                  <Box component="span" sx={{ display: 'block' }}>A working AI economy.</Box>
                  <Box component="span" sx={{ display: 'block' }}>A role for $OPEN.</Box>
                </>
              }
              lede="Stake $OPEN to reach compute credits and the benefits that come with them. Behind it sits the business above, and a proposed buyback and burn funded from its net revenue."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <OpenUtility />
        </Reveal>

        <Reveal delay={60}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2.4, md: 5 },
              mt: { xs: 3, md: 1.5 },
              pt: { xs: 3, md: 1.5 },
              borderTop: `1px solid ${RULE}`,
            }}
          >
            {TOKEN_PROOF.map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 0.8 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Box sx={{ mt: { xs: 2.5, md: 1.5 }, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                flex: '1 1 320px',
                fontSize: { xs: '1.02rem', md: '1.12rem' },
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.45,
                color: 'var(--text-heading)',
                textWrap: 'pretty',
              }}
            >
              Defined utility. Transparent economics. Verifiable activity.
            </Typography>
            <Button href={LINKS.stake} primary>Stake $OPEN</Button>
          </Box>
        </Reveal>
      </Section>

      {/* ── 7. There are two tokens ───────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <SectionHead tier="minor" title={C.stakes.title} lede={C.stakes.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2.5, md: 3 }, alignItems: 'stretch' }}>
            {STAKES.map((s, i) => {
              const lead = Boolean(s.lead);
              return (
                <Box key={s.token} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...(lead ? ACCENT : PANEL) }}>
                  <Box sx={{ ...HEAD_STRIP, borderBottomColor: lead ? 'rgba(255,102,0,0.18)' : RULE }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: '9px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: lead ? 'var(--brand-accent)' : 'var(--text-heading)',
                          backgroundColor: lead ? 'rgba(255,102,0,0.1)' : 'rgba(11,15,26,0.04)',
                          border: `1px solid ${lead ? 'rgba(255,102,0,0.26)' : RULE}`,
                        }}
                      >
                        <Mark name={s.mark} size={16} />
                      </Box>
                      <Typography sx={{ ...FIG, fontSize: '1.05rem', fontWeight: 600, color: lead ? 'var(--brand-accent)' : 'var(--text-heading)' }}>
                        {s.token}
                      </Typography>
                    </Box>
                    <Label>{s.kind}</Label>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: { xs: 2.5, md: 3 }, pt: { xs: 2.4, md: 2.8 }, pb: { xs: 2.6, md: 3 } }}>
                    <Label>Paid in</Label>
                    <Typography
                      sx={{ mt: 1.3, mb: 2.2, fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-heading)' }}
                    >
                      {s.paidIn}
                    </Typography>
                    <Typography sx={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-secondary)', mb: 2.6, flex: 1 }}>
                      {i === 0 ? C.stakes.openBody : C.stakes.heyBody}
                    </Typography>
                    <Box sx={{ borderTop: `1px solid ${lead ? 'rgba(255,102,0,0.18)' : RULE}`, pt: 0.6 }}>
                      {s.rows.map(([name, figure]) => (
                        <Entry key={name} name={name} figure={figure} />
                      ))}
                    </Box>
                    <Box sx={{ mt: 2.8 }}>
                      <Button href={s.href} primary={lead} small>{s.cta}</Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Reveal>

        <Reveal delay={140}>
          <Typography sx={{ mt: { xs: 3, md: 3.5 }, fontFamily: MONO, fontSize: '0.74rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '76ch' }}>
            {C.stakes.foot}
          </Typography>
        </Reveal>
      </Section>

      {/* ── 8. And the app is free at a hundred. The one band of ink,
             spent on the section that asks you to stop paying for
             something. ──────────────────────────────────────────── */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 11 } }}>
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
              <SectionHead tier="minor" onInk title={C.pro.title} lede={C.pro.lede} maxWidth={480} />
              <Box sx={{ mt: 4 }}>
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ ...PANEL_INK, overflow: 'hidden' }}>
              <Box sx={{ ...HEAD_STRIP, borderBottomColor: RULE_ON_INK }}>
                <Label onInk>Pro</Label>
                <Label onInk>{RATES.threshold} staked</Label>
              </Box>
              <Box sx={{ px: { xs: 2.5, md: 3.2 }, pt: '6px', pb: { xs: 2.6, md: 3 } }}>
                {PRO.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} onInk />
                ))}
                <Typography sx={{ mt: '14px', fontSize: '0.82rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.46)' }}>
                  {C.pro.note}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* ── 9. So start ───────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <SectionHead tier="minor" title={C.howTitle} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
            {HOW.map((step, i) => (
              <Box key={step.n} sx={{ ...PANEL, display: 'flex', flexDirection: 'column', px: { xs: 2.4, md: 2.8 }, py: { xs: 2.8, md: 3.2 } }}>
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
                <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.45rem' }, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-heading)', mb: 1.2 }}>
                  {C.how[i].title}
                </Typography>
                <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-secondary)', mb: 3, flex: 1 }}>
                  {C.how[i].body}
                </Typography>
                <Box>
                  <Button href={step.href} small>{step.cta}</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={120}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.76fr 1.24fr' },
              gap: { xs: 3, md: 6 },
              alignItems: 'center',
              mt: { xs: 6, md: 8 },
              pt: { xs: 5, md: 7 },
              borderTop: `1px solid ${RULE}`,
            }}
          >
            <Box>
              <Label sx={{ color: 'var(--brand-accent)' }}>Supply</Label>
              <Typography
                sx={{ ...FIG, mt: 1.8, fontSize: { xs: '3rem', md: '3.8rem' }, fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--text-heading)' }}
              >
                {RATES.supply}
              </Typography>
              <Typography sx={{ mt: 1.4, fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                Fixed at launch. No inflation switch.
              </Typography>
            </Box>
            <Box>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, color: 'var(--text-heading)', mb: 1.6, textWrap: 'balance' }}
              >
                {C.supply.title}
              </Typography>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{C.supply.body}</Typography>
              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.6 }}>
                <Button href="/token" small>Read the tokenomics</Button>
                <LinkChips />
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── The ask ───────────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 8, md: 11 } }}>
        <Reveal>
          <Box sx={{ textAlign: 'center' }}>
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
              {C.close.title}
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
              Staking rewards are not a guarantee. The {RATES.base} floor is fixed; the{' '}
              {RATES.total} is a target the treasury is run to, not a promised rate, and what
              lands above the floor varies by period. Nothing here is investment advice.
              Read the terms before you stake.
            </Typography>
          </Box>
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
