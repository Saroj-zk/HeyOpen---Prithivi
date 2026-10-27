import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
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
 * The page went dark to borrow the one component that was working, and the
 * borrowing worked: the fan diagram, the calculator and the scale all came
 * good on ink. But a token page in a different colour from every other page
 * is a different product, so they come back to paper and keep what they
 * learned. Ink is now one band rather than the whole page, spent on the
 * section that asks you to stop paying for something.
 *
 * Four surfaces, in order of how often they appear:
 *
 *   PAPER   the page itself
 *   PANEL   white, a hairline, a long soft shadow. Holds almost everything.
 *   ACCENT  PANEL with an amber rim and a warm body. Spent twice: on the
 *           thing you are asked to do, and on the token you are asked to buy.
 *   INK     one full-bleed band, once.
 *
 * ------------------------------------------------------------------
 * Restructured, into six sections from seven.
 *
 *   1  the claim, and what it would pay you      hero, calculator
 *   2  how much, and which half is owed          the scale
 *   3  is any of it real                         architecture, proof
 *   4  there are two tokens                      $OPEN and $HEY
 *   5  and the app is free at a hundred          Pro, on ink
 *   6  so start                                  three moves, supply, close
 *
 * The scale moved above the architecture. A reader asks "how much" before
 * "is it real", and the old order answered them the other way round. Supply
 * and the three moves fold into the closing section, because by then they
 * are logistics rather than argument.
 *
 * ------------------------------------------------------------------
 * The marks are drawn now.
 *
 * Every icon on the page was a unicode geometric shape, which renders
 * differently in every font and reads as a placeholder in all of them. They
 * are inline SVG on currentColor instead, one stroke weight, one grid.
 *
 * ------------------------------------------------------------------
 * Each section says the two figures at most once, and most do not say them
 * at all. They were being printed eight and seven times across six of eight
 * sections, which is what made the page feel like it was saying one thing
 * over and over. The hero states them, the calculator computes them, the
 * scale plots both, the diagram labels one node, and the disclaimer repeats
 * them because that is what a disclaimer is for. Everywhere else says "the
 * floor" and "the band".
 *
 * The calculator never shows the target on its own. Every state prints the
 * floor and the band together and the total is a range from one to the
 * other, so no position of the sliders produces a single confident figure to
 * screenshot.
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
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
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

const WARM = 'linear-gradient(180deg, #FFF9F5 0%, #FDF3EC 100%)';

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

function SectionHead({ eyebrow, title, lede, onInk, maxWidth = 760 }) {
  return (
    <Box sx={{ maxWidth }}>
      <Label onInk={onInk} sx={{ color: 'var(--brand-accent)' }}>{eyebrow}</Label>
      <Typography
        component="h2"
        sx={{
          mt: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
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
    boxShadow: '0 2px 6px rgba(11,15,26,0.2)',
    '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 7px rgba(255,102,0,0.14)' },
    '&.Mui-active': { boxShadow: '0 0 0 11px rgba(255,102,0,0.18)' },
  },
};

function Control({ label, display, ...slider }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Label>{label}</Label>
        <Typography
          sx={{ ...FIG, fontSize: { xs: '1.02rem', md: '1.12rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}
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
      <Box sx={{ ...HEAD_STRIP, borderBottomColor: 'rgba(255,102,0,0.18)' }}>
        <Label sx={{ color: 'var(--brand-accent)' }}>Work it out</Label>
        <Label>Move the sliders</Label>
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

      <Box sx={{ px: { xs: 2.2, md: 2.6 }, pt: 1, pb: { xs: 2.4, md: 2.8 }, borderTop: '1px solid rgba(255,102,0,0.18)' }}>
        <Entry name="The floor pays" figure={`+${money(floor)}`} />
        <Entry name="On plan, all in" figure={`+${money(low)} to +${money(high)}`} dashed />
        <Entry name="You hold, all in" figure={`${money(stake + floor)} to ${money(stake + high)}`} total />

        <Box
          sx={{
            mt: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: pro ? 'var(--brand-accent)' : 'var(--text-muted)',
          }}
        >
          <Mark name="shield" size={15} />
          <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'inherit' }}>
            {pro ? `Pro unlocked, ${RATES.threshold} is the threshold` : `Stake ${RATES.threshold} to unlock Pro`}
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
          height: { xs: 'auto', md: 56 },
          mb: 1.2,
        }}
      >
        <Box sx={{ position: { xs: 'static', md: 'absolute' }, left: { md: 0 }, bottom: { md: 0 } }}>
          <Label>Owed to you</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 600, lineHeight: 1.05, color: 'var(--text-heading)' }}>
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
          <Label sx={{ color: 'var(--brand-accent)' }}>Aimed at, all in</Label>
          <Typography sx={{ ...FIG, fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 600, lineHeight: 1.05, color: 'var(--brand-accent)' }}>
            {RATES.total}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: { xs: 48, md: 60 },
          borderRadius: '10px',
          border: `1px solid ${RULE}`,
          backgroundColor: 'rgba(11,15,26,0.035)',
          overflow: 'hidden',
        }}
      >
        {/* the floor: solid, because it is */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: at(PLOT.floor),
            background: `linear-gradient(180deg, #2A3142 0%, ${INK} 100%)`,
            borderRight: '2px solid rgba(11,15,26,0.9)',
          }}
        />
        {/* the target: hatched and dashed, because it is a band we aim at
            rather than a line we are owed */}
        <Box
          sx={{
            position: 'absolute',
            left: at(PLOT.targetLow),
            width: at(PLOT.targetHigh - PLOT.targetLow),
            top: 0,
            bottom: 0,
            background:
              'repeating-linear-gradient(135deg, rgba(255,102,0,0.72) 0 7px, rgba(255,160,90,0.3) 7px 14px)',
            borderLeft: '1.5px dashed rgba(214,86,0,0.85)',
            borderRight: '1.5px dashed rgba(214,86,0,0.85)',
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
              color: 'var(--text-muted)',
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
/* The architecture                                                    */
/* ------------------------------------------------------------------ */

const FLOW_DASH = 'rgba(15,23,42,0.34)';

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
        py: { xs: 1.8, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'border-color .18s ease, transform .18s ease',
        '&:hover': { transform: 'translateY(-1px)' },
        ...sx,
      }}
    >
      {tag && <Label onInk={ink} sx={{ mb: 1 }}>{tag}</Label>}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.2 }}>
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
        {mark && <Mark name={mark} sx={{ color: head, opacity: ink ? 0.7 : 0.4, mt: '2px' }} />}
      </Box>
      {s && <Typography sx={{ mt: 0.8, fontSize: '0.84rem', lineHeight: 1.55, color: body }}>{s}</Typography>}
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
            'radial-gradient(ellipse 64% 56% at 70% 0%, rgba(255,102,0,0.16) 0%, rgba(255,80,0,0.04) 46%, transparent 74%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── 1. The claim, and what it would pay you ───────────────── */}
      <Section sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 7, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 0.9fr' },
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
                fontSize: { xs: '2.7rem', sm: '3.4rem', md: '4.2rem' },
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
              sx={{ mt: 3, fontSize: { xs: '1.05rem', md: '1.14rem' }, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '48ch', textWrap: 'pretty' }}
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

      {/* ── 2. How much, and which half is owed ───────────────────── */}
      <Section sx={{ pb: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <SectionHead eyebrow={C.yield.eyebrow} title={C.yield.title} lede={C.yield.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ ...PANEL, p: { xs: 2.5, md: 4 }, mb: { xs: 3.5, md: 4.5 } }}>
            <Scale />
          </Box>
        </Reveal>

        <Reveal delay={120}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3.5, md: 6 } }}>
            <Box>
              <Label>{C.yield.floorLabel}</Label>
              <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {C.yield.floorBody}
              </Typography>
            </Box>
            <Box>
              <Label sx={{ color: 'var(--brand-accent)' }}>{C.yield.targetLabel}</Label>
              <Typography sx={{ mt: 1.4, fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {C.yield.targetBody}
              </Typography>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={160}>
          <Typography sx={{ mt: { xs: 3, md: 3.5 }, fontFamily: MONO, fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '72ch' }}>
            {C.yield.workedNote}
          </Typography>
        </Reveal>
      </Section>

      {/* ── 3. Is any of it real ──────────────────────────────────── */}
      <Section ground={WARM} sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
            <SectionHead
              eyebrow="Where the stake works"
              title="Locked here. Put to work there."
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

      {/* ── 4. There are two tokens ───────────────────────────────── */}
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

      {/* ── 5. And the app is free at a hundred. The one band of ink,
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
              <SectionHead onInk eyebrow={C.pro.eyebrow} title={C.pro.title} lede={C.pro.lede} maxWidth={480} />
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
            <SectionHead eyebrow="How $OPEN works" title={C.howTitle} />
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
              <Box sx={{ mt: 3 }}>
                <Button href="/token" small>Read the tokenomics</Button>
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
              lands above the floor varies by period. The calculator is an illustration on the
              figures above, not a quote. Nothing here is investment advice. Read the terms
              before you stake.
            </Typography>
          </Box>
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
