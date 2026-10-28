import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
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

function Section({ ground, children, sx }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        zIndex: 1,
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
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>{children}</Container>
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
      <Section sx={{ pt: { xs: 8, md: 13 }, pb: { xs: 8, md: 11 } }}>
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

      {/* ── 2. Where the stake actually goes ───────────────────────── */}
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
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 1.1 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 3. There are two tokens ───────────────────────────────── */}
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

      {/* ── 4. And the app is free at a hundred. The one band of ink,
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

      {/* ── 6. So start ───────────────────────────────────────────── */}
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
      <Section sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 9, md: 13 } }}>
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
