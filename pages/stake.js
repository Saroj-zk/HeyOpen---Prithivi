import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { INK, MONO, RULE, RULE_ON_INK, FIG, Label, Entry, Button, Head2 } from '@/components/ui/Ledger';
import { TOKEN } from '@/data/token';
import { VERSIONS } from '@/data/stakeCopy';

/**
 * $OPEN, and what staking it does.
 *
 * Follows Venice's VVV page, which is the thing this was asked to be like,
 * with the same two tokens doing the same two jobs.
 *
 * ------------------------------------------------------------------
 * Two things carry this page now, and both were asked for.
 *
 * A calculator, in the hero. A rate is an abstraction and six hundred tokens
 * is not, and the page had been answering that with one worked example on a
 * fixed ten thousand. Two sliders and the reader can put their own number in,
 * which is the whole difference between reading a claim and testing one.
 *
 * It never shows the target on its own. Every state of it prints the floor
 * and the band together, and the total is a range from one to the other, so
 * there is no position of the sliders that produces a single confident
 * figure to screenshot. That is deliberate: the floor is owed and the band is
 * aimed at, and an interactive thing that let you forget which was which
 * would be worse than no calculator at all. Returns are simple rather than
 * compounded, and the note says so.
 *
 * A flow, for where the stake actually goes. The page used to stop at "we run
 * the book", which asked for trust and gave nothing to look at. It now shows
 * the stake being deployed and the two different kinds of thing that come
 * back: a contract rate that does not depend on any of it, and a surplus
 * that does.
 *
 * WORDING ON THE DEPLOYMENT CARDS NEEDS SIGN-OFF. What the treasury is
 * actually placed in is a representation about money. The three cards below
 * name the categories that were described and deliberately say nothing about
 * instruments, venues, counterparties or proportions, because none of that
 * was given and none of it can be guessed.
 * ------------------------------------------------------------------
 */

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/* ------------------------------------------------------------------ */
const RATES = {
  supply: TOKEN.supply,
  /* Fixed, and stated as fixed. */
  base: '6.00%',
  /* All in, and inclusive of the floor rather than stacked on top of it. */
  total: '40% to 50%',
  range: '6.00% to 50%',
  threshold: '100 $OPEN',
};

/* The same figures as decimals, for the chart and the calculator, which
   cannot read "40% to 50%". Kept beside the strings so a change to one is
   obviously a change to both. */
const PLOT = { max: 60, floor: 6, targetLow: 40, targetHigh: 50 };
const RATE = { floor: 0.06, low: 0.4, high: 0.5 };

/* The calculator's two controls. Stake is in whole $OPEN; term is months,
   because a reader thinking about locking something up thinks in months. */
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
    `The ${RATES.base} is set in the staking contract. It pays on schedule, it does not wait on a decision, and anyone can read it without asking us.`,
  ],
  [
    'The stake stays yours',
    'Staking does not sell your $OPEN or move it beyond your reach. You can unstake, and the balance is visible the whole time.',
  ],
  [
    'The target is reported after the fact',
    'Each period closes with the figure that was actually returned, published against the band rather than compared with it later.',
  ],
];

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

const HOW = [
  { n: '01', cta: 'Buy $OPEN', href: LINKS.buy, glyph: '◆' },
  { n: '02', cta: 'Stake $OPEN', href: LINKS.stake, glyph: '▣' },
  { n: '03', cta: 'Mint $HEY', href: LINKS.mint, glyph: '◇' },
];

/* Where the stake is put to work. Categories only: see the note at the top
   of this file about what cannot be written here without an answer. */
const DEPLOY = [
  { k: 'Compute capital', s: 'Capacity the network runs on', glyph: '▦' },
  { k: 'Options', s: 'Positions run against the book', glyph: '◫' },
  { k: 'AI infrastructure', s: 'The rails underneath the models', glyph: '◈' },
];

/* And the two different kinds of thing that come back. The first does not
   depend on any of the above, which is the entire point of printing them
   side by side. */
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
/* Materials                                                           */
/* ------------------------------------------------------------------ */

const CARD = {
  borderRadius: '14px',
  border: '1px solid rgba(11,15,26,0.07)',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFDFE 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(11,15,26,0.04), 0 26px 50px -34px rgba(11,15,26,0.32)',
};

const CARD_INK = {
  borderRadius: '14px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, #1A1F2B 0%, #0B0F1A 62%, #070A11 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.10), 0 1px 2px rgba(11,15,26,0.08), 0 30px 56px -34px rgba(11,15,26,0.6)',
};

const WARM = 'linear-gradient(180deg, #FFF8F3 0%, #FDF3EB 100%)';
const COOL = 'linear-gradient(180deg, #F5F8FB 0%, #EEF3F8 100%)';

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

/* ------------------------------------------------------------------ */
/* The calculator                                                      */
/* ------------------------------------------------------------------ */

const money = (n) => Math.round(n).toLocaleString('en-US');

const SLIDER_SX = {
  color: 'var(--brand-accent)',
  height: 5,
  py: '14px',
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

/** One labelled control: what it is, what it currently says, and the track. */
function Control({ label, display, ...slider }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Label>{label}</Label>
        <Typography
          sx={{
            ...FIG,
            fontSize: { xs: '1.02rem', md: '1.12rem' },
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-heading)',
          }}
        >
          {display}
        </Typography>
      </Box>
      <Slider {...slider} sx={SLIDER_SX} />
    </Box>
  );
}

/**
 * Put your own number in.
 *
 * Simple rather than compounded, and pro-rata on the term, which is the
 * arithmetic a reader can check in their head. Both lines are always shown:
 * see the note at the top of the file about why there is no state of this
 * thing that prints the target by itself.
 */
function Calculator() {
  const [stake, setStake] = React.useState(STAKE_SLIDER.start);
  const [months, setMonths] = React.useState(TERM_SLIDER.start);

  const years = months / 12;
  const floor = stake * RATE.floor * years;
  const low = stake * RATE.low * years;
  const high = stake * RATE.high * years;
  const pro = stake >= 100;

  return (
    <Box sx={{ ...CARD, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2.5, md: 3 },
          py: '15px',
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <Label sx={{ color: 'var(--brand-accent)' }}>Work it out</Label>
        <Label>Move the sliders</Label>
      </Box>

      <Box sx={{ px: { xs: 2.5, md: 3 }, pt: { xs: 2.2, md: 2.6 }, pb: 1 }}>
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

      <Box sx={{ px: { xs: 2.5, md: 3 }, pt: 1, pb: { xs: 2.4, md: 2.8 }, borderTop: `1px solid ${RULE}` }}>
        <Entry name={`The floor, ${RATES.base}`} figure={`+${money(floor)}`} />
        <Entry name={`On plan, ${RATES.total}`} figure={`+${money(low)} to +${money(high)}`} dashed />
        <Entry name="You hold, all in" figure={`${money(stake + floor)} to ${money(stake + high)}`} total />

        <Box
          sx={{
            mt: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.8rem',
            color: pro ? 'var(--brand-accent)' : 'var(--text-muted)',
          }}
        >
          <Box component="span" aria-hidden="true">{pro ? '✓' : '·'}</Box>
          <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'inherit' }}>
            {pro
              ? `Pro unlocked, ${RATES.threshold} is the threshold`
              : `Stake ${RATES.threshold} to unlock Pro`}
          </Typography>
        </Box>

        <Typography sx={{ mt: '10px', fontSize: '0.76rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
          Simple, not compounded, and pro-rata on the term. The floor is owed to
          you; the band is what we run the book to and is not a promised rate.
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The flow: where the stake goes, and what comes back                 */
/* ------------------------------------------------------------------ */

const FLOW_DASH = 'rgba(255,255,255,0.32)';

/** An arrow along the flow. Across on a wide canvas, down on a narrow one. */
function Along() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        py: { xs: 1.4, lg: 0 },
        px: { lg: 1 },
        width: { xs: '100%', lg: 'auto' },
        minWidth: { lg: 34 },
        height: { lg: '100%' },
      }}
    >
      <Box
        sx={{
          flex: { lg: 1 },
          width: { xs: 0, lg: 'auto' },
          height: { xs: 16, lg: 0 },
          minWidth: { lg: 14 },
          borderLeft: { xs: `1.5px dashed ${FLOW_DASH}`, lg: 0 },
          borderTop: { xs: 0, lg: `1.5px dashed ${FLOW_DASH}` },
        }}
      />
      <Box
        sx={{
          width: 0,
          height: 0,
          flexShrink: 0,
          borderLeft: { xs: '5px solid transparent', lg: `7.5px solid ${FLOW_DASH}` },
          borderRight: { xs: '5px solid transparent', lg: 0 },
          borderTop: { xs: `7.5px solid ${FLOW_DASH}`, lg: '5px solid transparent' },
          borderBottom: { xs: 0, lg: '5px solid transparent' },
        }}
      />
    </Box>
  );
}

/** A stage of the flow: a heading strip, then its rows. */
function Stage({ tag, children, sx }) {
  return (
    <Box sx={{ ...CARD_INK, overflow: 'hidden', display: 'flex', flexDirection: 'column', ...sx }}>
      <Box sx={{ px: { xs: 2, md: 2.2 }, py: '13px', borderBottom: `1px solid ${RULE_ON_INK}` }}>
        <Label onInk>{tag}</Label>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
}

/** One row inside a stage. Lifts a little under the pointer, so the diagram
    answers when you move across it. */
function Row({ k, s, glyph, accent, big, last }) {
  return (
    <Box
      sx={{
        flex: 1,
        px: { xs: 2, md: 2.2 },
        py: { xs: 1.6, md: 1.9 },
        borderBottom: last ? 'none' : `1px solid ${RULE_ON_INK}`,
        transition: 'background-color .18s ease',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.2 }}>
        <Typography
          sx={{
            ...(big ? FIG : null),
            fontSize: big ? { xs: '1.5rem', md: '1.7rem' } : { xs: '0.98rem', md: '1.02rem' },
            fontWeight: big ? 600 : 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: accent ? 'var(--brand-accent)' : '#FFFFFF',
          }}
        >
          {k}
        </Typography>
        {glyph && (
          <Box aria-hidden="true" sx={{ fontSize: '0.95rem', lineHeight: 1, opacity: 0.5, color: '#FFFFFF' }}>
            {glyph}
          </Box>
        )}
      </Box>
      <Typography sx={{ mt: 0.7, fontSize: '0.82rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.58)' }}>
        {s}
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The scale                                                           */
/* ------------------------------------------------------------------ */

const at = (v) => `${(v / PLOT.max) * 100}%`;

/** The two figures on one axis, because the argument is the gap between them. */
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
          <Label onInk sx={{ color: 'var(--brand-accent)' }}>Guaranteed</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 600, lineHeight: 1.05, color: '#FFFFFF' }}>
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
          <Label onInk>Target, all in</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 600, lineHeight: 1.05, color: 'var(--brand-accent)' }}>
            {RATES.total}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: { xs: 46, md: 56 },
          borderRadius: '8px',
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
  const C = VERSIONS[0];

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
        data-ambient-blur
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 640,
          background:
            'radial-gradient(ellipse 72% 58% at 50% 0%, rgba(255, 102, 0, 0.15) 0%, rgba(255, 80, 0, 0.03) 52%, transparent 78%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Hero: the claim, and a thing to try ───────────────────── */}
      <Section sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 0.95fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'center',
          }}
        >
          <Reveal>
            <Label sx={{ color: 'var(--brand-accent)' }}>{C.hero.eyebrow}</Label>
            <Typography
              component="h1"
              sx={{
                mt: 2.5,
                fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.4rem' },
                fontWeight: 700,
                letterSpacing: '-0.05em',
                lineHeight: 0.98,
                color: 'var(--text-heading)',
                textWrap: 'balance',
              }}
            >
              {C.hero.title}
            </Typography>
            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: '1.05rem', md: '1.14rem' },
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '48ch',
                textWrap: 'pretty',
              }}
            >
              {C.hero.lede}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
              <Button href={LINKS.stake} primary>
                Stake $OPEN
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
              <Button href={LINKS.buy}>Buy $OPEN</Button>
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
          </Reveal>

          <Reveal delay={120}>
            <Calculator />
          </Reveal>
        </Box>
      </Section>

      {/* ── The numbers, as a strip ───────────────────────────────── */}
      <Section sx={{ pb: { xs: 6, md: 9 } }}>
        <Reveal delay={60}>
          <Box sx={{ ...CARD, overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
            {[
              ['The floor', RATES.base, 'Written into the contract', true],
              ['Target, all in', RATES.total, 'Reported once a period closes', false],
              ['Supply', RATES.supply, 'Fixed at launch, no inflation switch', false],
            ].map(([label, value, note, accent], i) => (
              <Box
                key={label}
                sx={{
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 2.4, md: 2.8 },
                  borderRight: { sm: i < 2 ? `1px solid ${RULE}` : 'none' },
                  borderBottom: { xs: i < 2 ? `1px solid ${RULE}` : 'none', sm: 'none' },
                }}
              >
                <Label sx={accent ? { color: 'var(--brand-accent)' } : undefined}>{label}</Label>
                <Typography
                  sx={{
                    ...FIG,
                    mt: 1.4,
                    fontSize: { xs: '2rem', md: '2.4rem' },
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    whiteSpace: 'nowrap',
                    color: accent ? 'var(--brand-accent)' : 'var(--text-heading)',
                  }}
                >
                  {value}
                </Typography>
                <Typography sx={{ mt: 1.2, fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  {note}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── Three moves, on a warm ground ─────────────────────────── */}
      <Section ground={WARM} sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Head2 eyebrow="How $OPEN works" title={C.howTitle} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
            {HOW.map((step, i) => (
              <Box key={step.n} sx={{ ...CARD, display: 'flex', flexDirection: 'column', px: { xs: 2.5, md: 3 }, py: { xs: 2.8, md: 3.2 } }}>
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
                  <Box aria-hidden="true" sx={{ fontSize: '1.1rem', opacity: 0.35, color: 'var(--text-heading)' }}>
                    {step.glyph}
                  </Box>
                </Box>
                <Typography sx={{ fontSize: { xs: '1.35rem', md: '1.5rem' }, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-heading)', mb: 1.3 }}>
                  {C.how[i].title}
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 3, flex: 1 }}>
                  {C.how[i].body}
                </Typography>
                <Box>
                  <Button href={step.href} small>{step.cta}</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ── Where the stake works, on ink ─────────────────────────── */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 11 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Head2
              onInk
              eyebrow="Where the stake works"
              title="Locked here. Put to work there."
              lede="Your $OPEN does not leave your wallet. What it backs is deployed, and two different kinds of thing come back: a rate the contract owes you either way, and whatever the book makes on top."
              maxWidth={760}
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,0.82fr) auto minmax(0,1.06fr) auto minmax(0,1.12fr)' },
              alignItems: 'stretch',
              mb: { xs: 6, md: 8 },
            }}
          >
            <Stage tag="The stake">
              <Row
                k="Staked $OPEN"
                s="Locked as collateral, still yours, visible the whole time. You can unstake."
                glyph={'▣'}
                last
              />
            </Stage>

            <Along />

            <Stage tag="Put to work in">
              {DEPLOY.map((d, i) => (
                <Row key={d.k} k={d.k} s={d.s} glyph={d.glyph} last={i === DEPLOY.length - 1} />
              ))}
            </Stage>

            <Along />

            <Stage tag="What comes back">
              {RETURNS.map((r, i) => (
                <Row key={r.tag} k={r.k} s={r.s} accent={r.accent} big={r.accent} last={i === RETURNS.length - 1} />
              ))}
            </Stage>
          </Box>
        </Reveal>

        <Reveal delay={60}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Scale />
          </Box>
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 7 },
            alignItems: 'start',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Reveal>
            <Box>
              <Box sx={{ pb: 3, mb: 3, borderBottom: `1px solid ${RULE_ON_INK}` }}>
                <Label onInk sx={{ color: 'var(--brand-accent)' }}>{C.yield.floorLabel}</Label>
                <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.66)' }}>
                  {C.yield.floorBody}
                </Typography>
              </Box>
              <Box>
                <Label onInk>{C.yield.targetLabel}</Label>
                <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.66)' }}>
                  {C.yield.targetBody}
                </Typography>
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={120}>
            <Box sx={{ ...CARD_INK, overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: { xs: 2.5, md: 3 },
                  py: '15px',
                  borderBottom: `1px solid ${RULE_ON_INK}`,
                }}
              >
                <Label onInk>Why the floor holds</Label>
                <Label onInk>Either way</Label>
              </Box>
              <Box sx={{ px: { xs: 2.5, md: 3 }, pt: { xs: 2, md: 2.4 }, pb: { xs: 2.4, md: 2.8 } }}>
                <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)' }}>
                  The {RATES.base} is a protocol rate, set in the staking contract and paid
                  on schedule. A quiet period pays it in full. What the book
                  returns changes what lands above it, never what lands at it.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.84rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.52)' }}>
                  {C.yield.workedNote}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>

        <Reveal delay={60}>
          <Box sx={{ borderTop: `1px solid ${RULE_ON_INK}`, pt: { xs: 4, md: 5 } }}>
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Label onInk sx={{ color: 'rgba(255,255,255,0.7)' }}>{C.yield.proofEyebrow}</Label>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 6 } }}>
              {PROOF.map(([title, body]) => (
                <Box key={title}>
                  <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', mb: 1.2 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                    {body}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── Pro ───────────────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
          <Reveal>
            <Box>
              <Head2 eyebrow={C.pro.eyebrow} title={C.pro.title} lede={C.pro.lede} />
              <Box sx={{ mt: 4 }}>
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ ...CARD, overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: { xs: 2.5, md: 3 },
                  py: '15px',
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                <Label>Pro</Label>
                <Label>{RATES.threshold} staked</Label>
              </Box>
              <Box sx={{ px: { xs: 2.5, md: 3 }, pt: '6px', pb: { xs: 2.4, md: 2.8 } }}>
                {PRO.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} />
                ))}
                <Typography sx={{ mt: '14px', fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  {C.pro.note}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* ── Two things to stake ───────────────────────────────────── */}
      <Section ground={COOL} sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Head2 eyebrow={C.stakes.eyebrow} title={C.stakes.title} lede={C.stakes.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2.5, md: 3 }, alignItems: 'stretch' }}>
            {STAKES.map((s, i) => {
              const onInk = Boolean(s.lead);
              return (
                <Box key={s.token} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...(onInk ? CARD_INK : CARD) }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      px: { xs: 2.5, md: 3 },
                      py: '15px',
                      borderBottom: `1px solid ${onInk ? RULE_ON_INK : RULE}`,
                    }}
                  >
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
                          color: onInk ? 'var(--brand-accent)' : 'var(--text-heading)',
                          backgroundColor: onInk ? 'rgba(255,102,0,0.14)' : 'rgba(11,15,26,0.05)',
                          border: `1px solid ${onInk ? 'rgba(255,102,0,0.3)' : RULE}`,
                        }}
                      >
                        {s.glyph}
                      </Box>
                      <Typography sx={{ ...FIG, fontSize: '1.05rem', fontWeight: 600, color: onInk ? 'var(--brand-accent)' : 'var(--text-heading)' }}>
                        {s.token}
                      </Typography>
                    </Box>
                    <Label onInk={onInk}>{s.kind}</Label>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: { xs: 2.5, md: 3 }, pt: { xs: 2.4, md: 2.8 }, pb: { xs: 2.6, md: 3 } }}>
                    <Label onInk={onInk}>Paid in</Label>
                    <Typography
                      sx={{
                        mt: 1.3,
                        mb: 2.2,
                        fontSize: { xs: '1.5rem', md: '1.8rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        color: onInk ? '#FFFFFF' : 'var(--text-heading)',
                      }}
                    >
                      {s.paidIn}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.98rem',
                        lineHeight: 1.7,
                        color: onInk ? 'rgba(255,255,255,0.66)' : 'var(--text-secondary)',
                        mb: 2.6,
                        flex: 1,
                      }}
                    >
                      {i === 0 ? C.stakes.openBody : C.stakes.heyBody}
                    </Typography>
                    <Box sx={{ borderTop: `1px solid ${onInk ? RULE_ON_INK : RULE}`, pt: 0.6 }}>
                      {s.rows.map(([name, figure]) => (
                        <Entry key={name} name={name} figure={figure} onInk={onInk} />
                      ))}
                    </Box>
                    <Box sx={{ mt: 2.8 }}>
                      <Button href={s.href} primary={s.lead} onInk={onInk} small>{s.cta}</Button>
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

      {/* ── Supply ────────────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ ...CARD, overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.72fr 1.28fr' } }}>
            <Box
              sx={{
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 3, md: 4 },
                borderRight: { md: `1px solid ${RULE}` },
                borderBottom: { xs: `1px solid ${RULE}`, md: 'none' },
                background: 'radial-gradient(120% 90% at 0% 0%, rgba(255,102,0,0.07) 0%, transparent 62%)',
              }}
            >
              <Label sx={{ color: 'var(--brand-accent)' }}>Supply</Label>
              <Typography sx={{ ...FIG, mt: 2, fontSize: { xs: '3rem', md: '3.8rem' }, fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--text-heading)' }}>
                {RATES.supply}
              </Typography>
              <Typography sx={{ mt: 1.5, fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                Fixed at launch. No inflation switch.
              </Typography>
            </Box>

            <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 3, md: 4 } }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 700, letterSpacing: '-0.028em', lineHeight: 1.3, color: 'var(--text-heading)', mb: 1.6, textWrap: 'balance' }}
              >
                {C.supply.title}
              </Typography>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {C.supply.body}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button href="/token" small>Read the tokenomics</Button>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── Close ─────────────────────────────────────────────────── */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 11 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Reveal>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: '2.2rem', md: '3.4rem' }, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#FFFFFF', maxWidth: '17ch', mx: 'auto', textWrap: 'balance' }}
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
              sx={{
                mt: 6,
                pt: 4,
                borderTop: `1px solid ${RULE_ON_INK}`,
                fontFamily: MONO,
                fontSize: '0.72rem',
                lineHeight: 1.85,
                color: 'rgba(255,255,255,0.46)',
                maxWidth: '72ch',
                mx: 'auto',
              }}
            >
              Staking rewards are not a guarantee. The {RATES.base} floor is fixed; the{' '}
              {RATES.total} is a target the treasury is run to, not a promised rate, and what
              lands above the floor varies by period. The calculator is an illustration on the
              figures above, not a quote. Nothing here is investment advice. Read the terms
              before you stake.
            </Typography>
          </Reveal>
        </Box>
      </Section>

      <Footer />
    </Box>
  );
}
