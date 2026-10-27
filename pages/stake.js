import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { MONO, RULE_ON_INK, FIG, Label, Entry, Button } from '@/components/ui/Ledger';
import { TOKEN } from '@/data/token';
import { VERSIONS } from '@/data/stakeCopy';

/**
 * $OPEN, and what staking it does.
 *
 * ------------------------------------------------------------------
 * The page is dark, and that is not a mood.
 *
 * Every light version of this page was told the same thing. The one piece of
 * it that was ever called good was the deployment diagram, which was the only
 * thing on it drawn on ink. So the page stops being paper with one dark band
 * in the middle and becomes the material that was working, end to end.
 *
 * Three surfaces and no more. GROUND is near black. PANEL is one step up and
 * holds everything. ACCENT is PANEL with an orange rim, and it is spent twice
 * on the whole page: on the thing you are asked to do, and on the token you
 * are asked to buy. A fourth surface would make all four mean less.
 *
 * Light appears once, in a strip at the bottom, so the footer does not arrive
 * as a wall. Nothing is set on that strip, because white type over a ground
 * that is busy turning pale is how the first attempt at it failed.
 *
 * ------------------------------------------------------------------
 * The order answers questions in the order they get asked.
 *
 *   1  what is it, and what would it pay me      hero, calculator
 *   2  the three figures                         strip
 *   3  is any of this real                       architecture, proof
 *   4  how much, and which part is owed          scale, owed against aimed at
 *   5  what else do I get                        Pro
 *   6  there are two tokens?                     $OPEN and $HEY
 *   7  alright, how do I start                   three moves
 *   8  the ask                                   supply, close
 *
 * The three moves used to sit in the middle, which put "buy it" in front of a
 * reader who had not yet been told what it pays. They now land last, next to
 * the button.
 *
 * ------------------------------------------------------------------
 * The architecture diagram is a fan, not a table.
 *
 * One node becomes three and the three become one: a spine, a stub into it,
 * and a branch to each card. Three columns of stacked rows read as a table and
 * a table does not say "this splits". The branch positions are arithmetic
 * rather than eyeballed, which is what keeps them on the cards when the cards
 * change height; see CENTRES.
 *
 * ------------------------------------------------------------------
 * The calculator never shows the target on its own. Every state prints the
 * floor and the band together, and the total is a range from one to the
 * other, so no position of the sliders produces a single confident figure to
 * screenshot. The floor is owed and the band is aimed at, and an interactive
 * thing that let a reader forget which was which would be worse than no
 * calculator at all.
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

/* The same figures as numbers, for the chart and the calculator, which
   cannot read "40% to 50%". Kept beside the strings so a change to one is
   obviously a change to both. */
const PLOT = { max: 60, floor: 6, targetLow: 40, targetHigh: 50 };
const RATE = { floor: 0.06, low: 0.4, high: 0.5 };

const STAKE_SLIDER = { min: 100, max: 100000, step: 100, start: 10000 };
const TERM_SLIDER = { min: 1, max: 36, step: 1, start: 12 };

const PRO = [
  ['Text prompts', 'Unlimited'],
  ['Image and video models', 'The leading ones'],
  ['Every model in the catalogue', 'Included'],
  ['What it costs while staked', 'Nothing'],
];

const PROOF = [
  [
    'The floor is a contract rate',
    `The ${RATES.base} is set in the staking contract. It pays on schedule and anyone can read it without asking us.`,
  ],
  [
    'The stake stays yours',
    'Staking does not sell your $OPEN or move it beyond your reach. You can unstake, and the balance is visible the whole time.',
  ],
  [
    'The target is reported after',
    'Each period closes with the figure that was actually returned, published against the band rather than compared with it later.',
  ],
];

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

const HOW = [
  { n: '01', cta: 'Buy $OPEN', href: LINKS.buy },
  { n: '02', cta: 'Stake $OPEN', href: LINKS.stake },
  { n: '03', cta: 'Mint $HEY', href: LINKS.mint },
];

/* Where the stake is put to work. Categories only: see the note at the top
   of this file about what cannot be written here without an answer. */
const DEPLOY = [
  { k: 'Compute capital', s: 'Capacity the network runs on', glyph: '▦' },
  { k: 'Options', s: 'Positions run against the book', glyph: '◫' },
  { k: 'AI infrastructure', s: 'The rails underneath the models', glyph: '◈' },
];

const RETURNS = [
  {
    tag: 'Owed to you',
    k: RATES.base,
    s: 'Paid from the staking contract whatever the period did. It does not wait on the book.',
    accent: true,
  },
  {
    tag: 'Aimed at',
    k: 'Everything above it',
    s: `What the book returns on top, run toward ${RATES.total} all in. Reported once a period closes.`,
  },
];

const STAKES = [
  {
    token: '$OPEN',
    glyph: '◆',
    kind: 'The capital asset',
    paidIn: 'Value',
    lead: true,
    rows: [
      ['Floor', RATES.base],
      ['On plan', RATES.total],
      ['Paid in', '$OPEN'],
    ],
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    token: '$HEY',
    glyph: '◇',
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
/* Three surfaces                                                      */
/* ------------------------------------------------------------------ */

const GROUND = '#070A11';
const WHITE = '#FFFFFF';
const BODY = 'rgba(255,255,255,0.64)';
const QUIET = 'rgba(255,255,255,0.46)';

const PANEL = {
  position: 'relative',
  borderRadius: '16px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, #171C28 0%, #0D1119 64%, #090C13 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -36px rgba(0,0,0,0.9)',
};

const ACCENT = {
  ...PANEL,
  border: '1px solid rgba(255,102,0,0.34)',
  background: 'linear-gradient(180deg, #241A14 0%, #140F12 60%, #0B0C12 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,180,130,0.16), 0 30px 64px -36px rgba(255,102,0,0.35)',
};

const HEAD_STRIP = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  px: { xs: 2.2, md: 2.6 },
  py: '14px',
  borderBottom: `1px solid ${RULE_ON_INK}`,
};

function Section({ children, sx }) {
  return (
    <Box component="section" sx={{ position: 'relative', zIndex: 1, ...sx }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>{children}</Container>
    </Box>
  );
}

function SectionHead({ eyebrow, title, lede, maxWidth = 760 }) {
  return (
    <Box sx={{ maxWidth }}>
      <Label onInk sx={{ color: 'var(--brand-accent)' }}>{eyebrow}</Label>
      <Typography
        component="h2"
        sx={{
          mt: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          color: WHITE,
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>
      {lede && (
        <Typography sx={{ mt: 2.2, fontSize: '1.04rem', lineHeight: 1.65, color: BODY, textWrap: 'pretty' }}>
          {lede}
        </Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The calculator                                                      */
/* ------------------------------------------------------------------ */

const money = (n) => Math.round(n).toLocaleString('en-US');

const SLIDER_SX = {
  color: 'var(--brand-accent)',
  height: 5,
  py: '14px',
  '& .MuiSlider-rail': { opacity: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
  '& .MuiSlider-track': { border: 'none' },
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    backgroundColor: '#FFF4EC',
    border: '2px solid var(--brand-accent)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
    '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 7px rgba(255,102,0,0.2)' },
    '&.Mui-active': { boxShadow: '0 0 0 11px rgba(255,102,0,0.24)' },
  },
};

function Control({ label, display, ...slider }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Label onInk>{label}</Label>
        <Typography
          sx={{ ...FIG, fontSize: { xs: '1.02rem', md: '1.12rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: WHITE }}
        >
          {display}
        </Typography>
      </Box>
      <Slider {...slider} sx={SLIDER_SX} />
    </Box>
  );
}

function Calculator() {
  const [stake, setStake] = React.useState(STAKE_SLIDER.start);
  const [months, setMonths] = React.useState(TERM_SLIDER.start);

  const years = months / 12;
  const floor = stake * RATE.floor * years;
  const low = stake * RATE.low * years;
  const high = stake * RATE.high * years;
  const pro = stake >= 100;

  return (
    <Box sx={{ ...ACCENT, overflow: 'hidden' }}>
      <Box sx={HEAD_STRIP}>
        <Label onInk sx={{ color: 'var(--brand-accent)' }}>Work it out</Label>
        <Label onInk>Move the sliders</Label>
      </Box>

      <Box sx={{ px: { xs: 2.2, md: 2.6 }, pt: { xs: 2.2, md: 2.6 }, pb: 1 }}>
        <Control
          label="You stake"
          display={`${money(stake)} $OPEN`}
          value={stake}
          min={STAKE_SLIDER.min}
          max={STAKE_SLIDER.max}
          step={STAKE_SLIDER.step}
          aria-label="Amount of OPEN staked"
          onChange={(e, v) => setStake(v)}
          valueLabelDisplay="off"
        />
        <Control
          label="For"
          display={months === 1 ? '1 month' : `${months} months`}
          value={months}
          min={TERM_SLIDER.min}
          max={TERM_SLIDER.max}
          step={TERM_SLIDER.step}
          aria-label="Term in months"
          onChange={(e, v) => setMonths(v)}
          valueLabelDisplay="off"
        />
      </Box>

      <Box sx={{ px: { xs: 2.2, md: 2.6 }, pt: 1, pb: { xs: 2.4, md: 2.8 }, borderTop: `1px solid ${RULE_ON_INK}` }}>
        <Entry name={`The floor, ${RATES.base}`} figure={`+${money(floor)}`} onInk />
        <Entry name={`On plan, ${RATES.total}`} figure={`+${money(low)} to +${money(high)}`} dashed onInk />
        <Entry name="You hold, all in" figure={`${money(stake + floor)} to ${money(stake + high)}`} total onInk />

        <Box sx={{ mt: '14px', display: 'flex', alignItems: 'center', gap: 1, color: pro ? 'var(--brand-accent)' : QUIET }}>
          <Box component="span" aria-hidden="true">{pro ? '✓' : '·'}</Box>
          <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'inherit' }}>
            {pro ? `Pro unlocked, ${RATES.threshold} is the threshold` : `Stake ${RATES.threshold} to unlock Pro`}
          </Typography>
        </Box>

        <Typography sx={{ mt: '10px', fontSize: '0.76rem', lineHeight: 1.6, color: QUIET }}>
          Simple, not compounded, and pro-rata on the term. The floor is owed to
          you; the band is what we run the book to and is not a promised rate.
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The architecture                                                    */
/* ------------------------------------------------------------------ */

/* Bright enough to read as a drawn line on a near-black ground. At 0.34 the
   fan measured correct and looked like a smudge. */
const FLOW_DASH = 'rgba(255,255,255,0.46)';

/* The three deployment cards are separate panels in a grid of equal rows, so
   where each branch must land is arithmetic rather than a guess: three rows
   of height H with two gaps of G put the centres at H/2, 1.5H+G, 2.5H+2G.
   The fan is drawn against those, which is what keeps it on the cards when
   the cards change height. */
const GAP = 14;
const H = `((100% - ${GAP * 2}px) / 3)`;
const CENTRES = [
  `calc(${H} * 0.5)`,
  `calc(${H} * 1.5 + ${GAP}px)`,
  `calc(${H} * 2.5 + ${GAP * 2}px)`,
];

const DASH_H = { borderTop: `1.5px dashed ${FLOW_DASH}`, height: 0 };
const DASH_V = { borderLeft: `1.5px dashed ${FLOW_DASH}`, width: 0 };

function Tip({ sx }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        width: 0,
        height: 0,
        borderTop: '4.5px solid transparent',
        borderBottom: '4.5px solid transparent',
        borderLeft: `7px solid ${FLOW_DASH}`,
        ...sx,
      }}
    />
  );
}

/** One node splitting into three, or three converging into one. */
function Fan({ dir }) {
  const out = dir === 'out';

  return (
    <Box
      aria-hidden="true"
      sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative', width: 58, alignSelf: 'stretch' }}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: out ? 0 : '50%', width: '50%', ...DASH_H }} />
      <Box sx={{ position: 'absolute', left: '50%', top: CENTRES[0], height: `calc(${H} * 2 + ${GAP * 2}px)`, ...DASH_V }} />
      {CENTRES.map((c, i) => (
        <React.Fragment key={i}>
          <Box sx={{ position: 'absolute', top: c, left: out ? '50%' : 0, width: '50%', ...DASH_H }} />
          {out && <Tip sx={{ top: `calc(${c} - 4.5px)`, right: '-1px' }} />}
        </React.Fragment>
      ))}
      {!out && <Tip sx={{ top: 'calc(50% - 4.5px)', right: '-1px' }} />}
    </Box>
  );
}

/** What the fan collapses to below lg, where there is no room to branch. */
function Down() {
  return (
    <Box
      aria-hidden="true"
      sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center', py: 1.3 }}
    >
      <Box sx={{ height: 16, ...DASH_V }} />
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${FLOW_DASH}`,
        }}
      />
    </Box>
  );
}

/** A node on the diagram. */
function Node({ tag, k, s, glyph, accent, big, tone, sx }) {
  return (
    <Box
      sx={{
        ...(tone === 'accent' ? ACCENT : PANEL),
        overflow: 'hidden',
        px: { xs: 2, md: 2.3 },
        py: { xs: 1.8, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'border-color .18s ease, box-shadow .18s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.28)' },
        ...sx,
      }}
    >
      {tag && <Label onInk sx={{ mb: 1 }}>{tag}</Label>}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.2 }}>
        <Typography
          sx={{
            ...(big ? FIG : null),
            fontSize: big ? { xs: '1.6rem', md: '1.9rem' } : { xs: '1rem', md: '1.06rem' },
            fontWeight: big ? 600 : 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: accent ? 'var(--brand-accent)' : WHITE,
          }}
        >
          {k}
        </Typography>
        {glyph && (
          <Box aria-hidden="true" sx={{ fontSize: '0.95rem', lineHeight: 1, opacity: 0.45, color: WHITE, flexShrink: 0 }}>
            {glyph}
          </Box>
        )}
      </Box>
      {s && (
        <Typography sx={{ mt: 0.7, fontSize: '0.82rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.58)' }}>{s}</Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The scale                                                           */
/* ------------------------------------------------------------------ */

const at = (v) => `${(v / PLOT.max) * 100}%`;

function Scale() {
  const ticks = [0, 10, 20, 30, 40, 50, 60];

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          display: { xs: 'flex', md: 'block' },
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 2,
          height: { xs: 'auto', md: 52 },
          mb: 1,
        }}
      >
        <Box sx={{ position: { xs: 'static', md: 'absolute' }, left: { md: 0 }, bottom: { md: 0 } }}>
          <Label onInk sx={{ color: 'var(--brand-accent)' }}>Owed to you</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 600, lineHeight: 1.05, color: WHITE }}>
            {RATES.base}
          </Typography>
        </Box>
        <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            left: { md: at((PLOT.targetLow + PLOT.targetHigh) / 2) },
            transform: { md: 'translateX(-50%)' },
            bottom: { md: 0 },
            textAlign: { xs: 'right', md: 'center' },
            whiteSpace: 'nowrap',
          }}
        >
          <Label onInk>Aimed at, all in</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 600, lineHeight: 1.05, color: 'var(--brand-accent)' }}>
            {RATES.total}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: { xs: 46, md: 58 },
          borderRadius: '10px',
          border: `1px solid ${RULE_ON_INK}`,
          backgroundColor: 'rgba(255,255,255,0.035)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: at(PLOT.floor),
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.16) 100%)',
            borderRight: '2px solid rgba(255,255,255,0.92)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: at(PLOT.targetLow),
            width: at(PLOT.targetHigh - PLOT.targetLow),
            top: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(135deg, rgba(255,122,26,0.62) 0 7px, rgba(255,102,0,0.26) 7px 14px)',
            borderLeft: '1.5px dashed rgba(255,170,110,0.95)',
            borderRight: '1.5px dashed rgba(255,170,110,0.95)',
          }}
        />
      </Box>

      <Box sx={{ position: 'relative', height: 22, mt: 0.8 }}>
        {ticks.map((t) => (
          <Typography
            key={t}
            sx={{
              ...FIG,
              position: 'absolute',
              left: at(t),
              transform: t === 0 ? 'none' : t === PLOT.max ? 'translateX(-100%)' : 'translateX(-50%)',
              fontSize: '0.66rem',
              whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            {t}%
          </Typography>
        ))}
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
    <Box sx={{ minHeight: '100vh', backgroundColor: GROUND, position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>Stake $OPEN: Earn Yield and Mint $HEY | Hey Open</title>
        <meta
          name="description"
          content="$OPEN is the capital asset of Hey Open. Stake it for a fixed floor and a target well above it, and to mint $HEY, which pays out compute credits when you stake it."
        />
      </Head>

      <PageHeader />

      {/* Two fields of warmth on an otherwise black page: one behind the
          claim, one behind the ask. Nothing in between, so they read as
          emphasis rather than as decoration. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1500,
          height: 820,
          background:
            'radial-gradient(ellipse 62% 54% at 72% 2%, rgba(255,102,0,0.20) 0%, rgba(255,70,0,0.06) 44%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── 1. Hero ───────────────────────────────────────────────── */}
      <Section sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 0.9fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'center',
          }}
        >
          <Reveal>
            <Label onInk sx={{ color: 'var(--brand-accent)' }}>{C.hero.eyebrow}</Label>
            <Typography
              component="h1"
              sx={{
                mt: 2.5,
                fontSize: { xs: '2.7rem', sm: '3.4rem', md: '4.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.05em',
                lineHeight: 0.98,
                color: WHITE,
                textWrap: 'balance',
              }}
            >
              {C.hero.title}
            </Typography>
            <Typography
              sx={{ mt: 3, fontSize: { xs: '1.05rem', md: '1.14rem' }, lineHeight: 1.65, color: BODY, maxWidth: '48ch', textWrap: 'pretty' }}
            >
              {C.hero.lede}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
              <Button href={LINKS.stake} primary>
                Stake $OPEN
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
              <Button href={LINKS.buy} onInk>Buy $OPEN</Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
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
                    border: `1px solid ${RULE_ON_INK}`,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    fontFamily: MONO,
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: QUIET,
                    textDecoration: 'none',
                    transition: 'all .18s ease',
                    '&:hover': { color: WHITE, borderColor: 'rgba(255,102,0,0.5)' },
                  }}
                >
                  {label}
                  <Box component="span" aria-hidden="true" sx={{ opacity: 0.6 }}>↗</Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={120}>
            <Calculator />
          </Reveal>
        </Box>
      </Section>

      {/* ── 2. The three figures ──────────────────────────────────── */}
      <Section sx={{ pb: { xs: 6, md: 9 } }}>
        <Reveal delay={60}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              borderTop: `1px solid ${RULE_ON_INK}`,
              borderBottom: `1px solid ${RULE_ON_INK}`,
            }}
          >
            {[
              ['Owed to you', RATES.base, 'Written into the contract', true],
              ['Aimed at, all in', RATES.total, 'Reported once a period closes', false],
              ['Supply', RATES.supply, 'Fixed at launch, no inflation switch', false],
            ].map(([label, value, note, accent], i) => (
              <Box
                key={label}
                sx={{
                  pr: { sm: 3 },
                  pl: { sm: i === 0 ? 0 : 3 },
                  py: { xs: 2.6, md: 3.2 },
                  borderRight: { sm: i < 2 ? `1px solid ${RULE_ON_INK}` : 'none' },
                  borderBottom: { xs: i < 2 ? `1px solid ${RULE_ON_INK}` : 'none', sm: 'none' },
                }}
              >
                <Label onInk sx={accent ? { color: 'var(--brand-accent)' } : undefined}>{label}</Label>
                <Typography
                  sx={{
                    ...FIG,
                    mt: 1.4,
                    fontSize: { xs: '2.1rem', md: '2.6rem' },
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    whiteSpace: 'nowrap',
                    color: accent ? 'var(--brand-accent)' : WHITE,
                  }}
                >
                  {value}
                </Typography>
                <Typography sx={{ mt: 1.2, fontSize: '0.78rem', lineHeight: 1.5, color: QUIET }}>{note}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 3. The architecture ───────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <SectionHead
              eyebrow="Where the stake works"
              title="Locked here. Put to work there."
              lede="Your $OPEN does not leave your wallet. What it backs is deployed across three places, and two different kinds of thing come back: a rate the contract owes you either way, and whatever the book makes on top."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'stretch',
              mb: { xs: 5, md: 7 },
            }}
          >
            {/* the one */}
            <Box sx={{ display: 'flex', flex: { lg: '0 1 240px' }, minWidth: 0 }}>
              <Node
                tag="The stake"
                k="Staked $OPEN"
                s="Locked as collateral, still yours, visible the whole time. You can unstake."
                glyph={'▣'}
                tone="accent"
                sx={{ flex: 1 }}
              />
            </Box>

            <Fan dir="out" />
            <Down />

            {/* the three */}
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
                <Node key={d.k} k={d.k} s={d.s} glyph={d.glyph} />
              ))}
            </Box>

            <Fan dir="in" />
            <Down />

            {/* and what comes back */}
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
                <Node key={r.tag} tag={r.tag} k={r.k} s={r.s} accent={r.accent} big={r.accent} />
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
              borderTop: `1px solid ${RULE_ON_INK}`,
            }}
          >
            {PROOF.map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: WHITE, mb: 1.1 }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)' }}>{body}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 4. The two numbers on one axis ────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <SectionHead eyebrow={C.yield.eyebrow} title={C.yield.title} lede={C.yield.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ ...PANEL, p: { xs: 2.5, md: 4 }, mb: { xs: 4, md: 5 } }}>
            <Scale />
          </Box>
        </Reveal>

        <Reveal delay={120}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3.5, md: 6 } }}>
            <Box>
              <Label onInk sx={{ color: 'var(--brand-accent)' }}>{C.yield.floorLabel}</Label>
              <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.7, color: BODY }}>{C.yield.floorBody}</Typography>
            </Box>
            <Box>
              <Label onInk>{C.yield.targetLabel}</Label>
              <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.7, color: BODY }}>{C.yield.targetBody}</Typography>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={160}>
          <Typography sx={{ mt: { xs: 3, md: 4 }, fontFamily: MONO, fontSize: '0.78rem', lineHeight: 1.8, color: QUIET, maxWidth: '72ch' }}>
            {C.yield.workedNote}
          </Typography>
        </Reveal>
      </Section>

      {/* ── 5. Pro ────────────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ ...PANEL, overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box
              sx={{
                px: { xs: 2.5, md: 4 },
                py: { xs: 3.5, md: 5 },
                borderRight: { md: `1px solid ${RULE_ON_INK}` },
                borderBottom: { xs: `1px solid ${RULE_ON_INK}`, md: 'none' },
              }}
            >
              <SectionHead eyebrow={C.pro.eyebrow} title={C.pro.title} lede={C.pro.lede} maxWidth={460} />
              <Box sx={{ mt: 3.5 }}>
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={HEAD_STRIP}>
                <Label onInk>Pro</Label>
                <Label onInk>{RATES.threshold} staked</Label>
              </Box>
              <Box sx={{ flex: 1, px: { xs: 2.5, md: 3.2 }, pt: '6px', pb: { xs: 2.6, md: 3 } }}>
                {PRO.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} onInk />
                ))}
                <Typography sx={{ mt: '14px', fontSize: '0.82rem', lineHeight: 1.7, color: QUIET }}>{C.pro.note}</Typography>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── 6. Two things to stake ────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <SectionHead eyebrow={C.stakes.eyebrow} title={C.stakes.title} lede={C.stakes.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2.5, md: 3 }, alignItems: 'stretch' }}>
            {STAKES.map((s, i) => {
              const lead = Boolean(s.lead);
              return (
                <Box key={s.token} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...(lead ? ACCENT : PANEL) }}>
                  <Box sx={HEAD_STRIP}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          color: lead ? 'var(--brand-accent)' : WHITE,
                          backgroundColor: lead ? 'rgba(255,102,0,0.16)' : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${lead ? 'rgba(255,102,0,0.36)' : RULE_ON_INK}`,
                        }}
                      >
                        {s.glyph}
                      </Box>
                      <Typography sx={{ ...FIG, fontSize: '1.05rem', fontWeight: 600, color: lead ? 'var(--brand-accent)' : WHITE }}>
                        {s.token}
                      </Typography>
                    </Box>
                    <Label onInk>{s.kind}</Label>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: { xs: 2.5, md: 3 }, pt: { xs: 2.4, md: 2.8 }, pb: { xs: 2.6, md: 3 } }}>
                    <Label onInk>Paid in</Label>
                    <Typography
                      sx={{ mt: 1.3, mb: 2.2, fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: WHITE }}
                    >
                      {s.paidIn}
                    </Typography>
                    <Typography sx={{ fontSize: '0.96rem', lineHeight: 1.7, color: BODY, mb: 2.6, flex: 1 }}>
                      {i === 0 ? C.stakes.openBody : C.stakes.heyBody}
                    </Typography>
                    <Box sx={{ borderTop: `1px solid ${RULE_ON_INK}`, pt: 0.6 }}>
                      {s.rows.map(([name, figure]) => (
                        <Entry key={name} name={name} figure={figure} onInk />
                      ))}
                    </Box>
                    <Box sx={{ mt: 2.8 }}>
                      <Button href={s.href} primary={lead} onInk={!lead} small>{s.cta}</Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Reveal>

        <Reveal delay={140}>
          <Typography sx={{ mt: { xs: 3, md: 3.5 }, fontFamily: MONO, fontSize: '0.74rem', lineHeight: 1.8, color: QUIET, maxWidth: '76ch' }}>
            {C.stakes.foot}
          </Typography>
        </Reveal>
      </Section>

      {/* ── 7. How to start. Last, because it is the thing you do
             once everything above has been answered. ───────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <SectionHead eyebrow="How $OPEN works" title={C.howTitle} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
            {HOW.map((step, i) => (
              <Box key={step.n} sx={{ ...PANEL, display: 'flex', flexDirection: 'column', px: { xs: 2.4, md: 2.8 }, py: { xs: 2.8, md: 3.2 } }}>
                <Typography sx={{ ...FIG, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--brand-accent)', mb: 2.2 }}>
                  {step.n}
                </Typography>
                <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.45rem' }, fontWeight: 700, letterSpacing: '-0.03em', color: WHITE, mb: 1.2 }}>
                  {C.how[i].title}
                </Typography>
                <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.7, color: BODY, mb: 3, flex: 1 }}>{C.how[i].body}</Typography>
                <Box>
                  <Button href={step.href} onInk small>{step.cta}</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── 8. Supply, then the ask ───────────────────────────────── */}
      <Section sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 } }}>
        {/* The second field of warmth, behind the button. */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 1200,
            height: 520,
            background: 'radial-gradient(ellipse 54% 60% at 50% 100%, rgba(255,102,0,0.16) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.78fr 1.22fr' },
              gap: { xs: 3, md: 6 },
              alignItems: 'center',
              pb: { xs: 6, md: 8 },
              mb: { xs: 6, md: 8 },
              borderBottom: `1px solid ${RULE_ON_INK}`,
            }}
          >
            <Box>
              <Label onInk sx={{ color: 'var(--brand-accent)' }}>Supply</Label>
              <Typography sx={{ ...FIG, mt: 1.8, fontSize: { xs: '3rem', md: '4rem' }, fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.04em', color: WHITE }}>
                {RATES.supply}
              </Typography>
              <Typography sx={{ mt: 1.4, fontSize: '0.86rem', lineHeight: 1.55, color: QUIET }}>
                Fixed at launch. No inflation switch.
              </Typography>
            </Box>
            <Box>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, color: WHITE, mb: 1.6, textWrap: 'balance' }}
              >
                {C.supply.title}
              </Typography>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: BODY }}>{C.supply.body}</Typography>
              <Box sx={{ mt: 3 }}>
                <Button href="/token" onInk small>Read the tokenomics</Button>
              </Box>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.02,
                color: WHITE,
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
              <Button href={APP} onInk>Try the app first</Button>
            </Box>

            <Typography
              sx={{ mt: 6, fontFamily: MONO, fontSize: '0.72rem', lineHeight: 1.85, color: QUIET, maxWidth: '72ch', mx: 'auto' }}
            >
              Staking rewards are not a guarantee. The {RATES.base} floor is fixed; the{' '}
              {RATES.total} is a target the treasury is run to, not a promised rate, and what
              lands above the floor varies by period. The calculator is an illustration on the
              figures above, not a quote. Nothing here is investment advice. Read the terms
              before you stake.
            </Typography>
          </Box>
        </Reveal>
      </Section>

      {/* The one place light appears, so the footer does not arrive as a
          wall. Nothing is set on it. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          zIndex: 1,
          height: { xs: 110, md: 160 },
          background: `linear-gradient(180deg, ${GROUND} 0%, #0C1018 34%, #1B222E 72%, var(--bg-page) 100%)`,
        }}
      />

      <Footer />
    </Box>
  );
}
