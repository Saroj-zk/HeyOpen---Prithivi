import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { MONO, RULE, RULE_ON_INK, FIG, Label, Button } from '@/components/ui/Ledger';

/**
 * The business behind $OPEN, at length.
 *
 * These three sections lived on the stake page and crowded it. That page is
 * about what staking does for the reader; this one is about the company that
 * makes staking worth anything, which is a different argument for a reader
 * who has already decided to care. The stake page keeps a single card
 * summarising all of it and a link here.
 *
 * Deliberately not in the navigation. It is reached from the stake page.
 *
 * Three sections, three compositions, so the page does not read as one shape
 * repeated: words beside a thing, words above a thing, and one sheet.
 *
 * THE ALLOCATION BAND LIVES HERE NOW, and the return target lives on the
 * stake page. They are separate measures that happen to print the same range
 * today, and keeping them on separate pages is most of what stops a reader
 * taking them for one number. The panel says so in as many words too.
 */

const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };

/* The share of eligible net revenue spent buying $OPEN back. Not the return
   target quoted on the stake page: a different measure of a different thing,
   free to move apart from it. */
const ALLOC_BAND = '40% to 50%';

/* ------------------------------------------------------------------ */
/* Marks                                                               */
/* ------------------------------------------------------------------ */

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
  ['Custom Branded', 'The product ships under their name.'],
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
    <Box>
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
            Custom Branded
          </Label>
        </Box>

        {/* The buyer's window. The bar carries their name; the screen is ours. */}
        <Box sx={{ ...PANEL_INK, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.6,
              px: { xs: 1.8, md: 2.2 },
              py: { xs: 1.1, md: 1.2 },
              borderBottom: `1px solid ${RULE_ON_INK}`,
              backgroundColor: 'rgba(255,255,255,0.045)',
            }}
          >
            <Box aria-hidden="true" sx={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {[0, 1, 2].map((d) => (
                <Box key={d} sx={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)' }} />
              ))}
            </Box>
            <Label onInk sx={{ minWidth: 0 }}>{item.chrome}</Label>
          </Box>

          <Box
            key={item.id}
            sx={{
              px: { xs: 2.2, md: 3 },
              py: { xs: 2.6, md: 3 },
              minHeight: { xs: 96, md: 104 },
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
function usd(n) {
  return `$${n.toFixed(2)}`;
}

/* On ink the rail has to come up and the thumb has to fill with the ground
   behind it, or it reads as a hole punched in the panel. */
const SLIDER_INK = {
  color: 'var(--brand-accent)',
  height: 6,
  padding: '14px 0',
  '& .MuiSlider-rail': { opacity: 1, backgroundColor: 'rgba(255,255,255,0.17)' },
  '& .MuiSlider-track': { border: 'none' },
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    backgroundColor: INK,
    border: '2px solid var(--brand-accent)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
    '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 7px rgba(255,102,0,0.2)' },
    '&.Mui-active': { boxShadow: '0 0 0 11px rgba(255,102,0,0.24)' },
  },
};

/* The instrument's own surface. Not a white card painted dark: a pane of
   slightly lifted ground, held by one rim, so the figure inside it looks lit
   rather than printed. */
const GLASS_INK = {
  position: 'relative',
  borderRadius: '20px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
};

/* A label above a control, with the value it currently reads. */
function Dial({ label, value, onInk, children }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
        <Label onInk={onInk}>{label}</Label>
        <Typography
          component="span"
          sx={{
            ...FIG,
            fontSize: { xs: '1.02rem', md: '1.12rem' },
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: onInk ? '#FFFFFF' : 'var(--text-heading)',
          }}
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
 * The answer first. Two readouts across the top, the price you would pay
 * and the price you do pay, and only then the chart that works it out. A
 * figure that opens with its axes asks the reader to assemble the point;
 * this one states it and then shows why.
 *
 * Lit rather than printed, because of the three sections in this block it is
 * the one that is literally a readout of a moving number. One pane of glass
 * on ink. The pale line is what the market does to you, orange is the part
 * we do something about, and a wash under the orange so the gap the hedge
 * opens reads before any of the words do.
 *
 * Drag the price down and the orange line sits ABOVE the pale one, because
 * below the strike the premium is money spent for nothing. That is left in
 * deliberately. A figure that only ever flatters the hedge is a sales chart.
 */
function Protection() {
  const [market, setMarket] = React.useState(MKT.start);

  const mkt = [...HISTORY, market];
  const hdg = mkt.map(hedged);
  const now = hedged(market);

  return (
    <Box sx={{ ...GLASS_INK, overflow: 'hidden' }}>
      {/* ---- the answer ---- */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          borderBottom: `1px solid ${RULE_ON_INK}`,
        }}
      >
        {[
          ['Without protection', usd(market), 'What the market charges', false],
          ['With protection', usd(now), 'What the hedge costs you', true],
        ].map(([tag, fig, note, lead], i) => (
          <Box
            key={tag}
            sx={{
              px: { xs: 2.2, md: 3.2 },
              py: { xs: 2, md: 1.8 },
              borderLeft: { sm: i === 0 ? 'none' : `1px solid ${RULE_ON_INK}` },
              borderTop: { xs: i === 0 ? 'none' : `1px solid ${RULE_ON_INK}`, sm: 'none' },
              background: lead ? 'rgba(255,102,0,0.085)' : 'transparent',
            }}
          >
            <Label sx={{ color: lead ? '#FFB071' : 'rgba(255,255,255,0.5)' }}>{tag}</Label>
            <Typography
              sx={{
                ...FIG,
                mt: 0.8,
                fontSize: { xs: '2rem', md: '2.3rem' },
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: lead ? '#FF8A2B' : '#FFFFFF',
              }}
            >
              {fig}
            </Typography>
            <Typography sx={{ mt: 0.7, fontSize: '0.84rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.5)' }}>
              {note}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ---- and the working ---- */}
      <Box sx={{ px: { xs: 2.2, md: 3.2 }, pt: { xs: 1.8, md: 2 }, pb: { xs: 1.6, md: 1.8 } }}>
        <Dial onInk label="Simulated market price" value={`${usd(market)}/hr`}>
          <Slider
            sx={SLIDER_INK}
            value={market}
            onChange={(e, v) => setMarket(v)}
            min={MKT.min}
            max={MKT.max}
            step={MKT.step}
            aria-label="Simulated market price per GPU hour"
          />
        </Dial>

        <Box component="svg" viewBox="0 6 340 114" sx={{ width: '100%', display: 'block', mt: 0.4, height: { md: 138 } }}>
          <defs>
            <linearGradient id="hedgeGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,102,0,0.28)" />
              <stop offset="100%" stopColor="rgba(255,102,0,0)" />
            </linearGradient>
          </defs>

          {[3, 4, 5].map((g) => (
            <line
              key={g}
              x1={PLOT.x0}
              y1={yOf(g)}
              x2={PLOT.x1}
              y2={yOf(g)}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <line
            x1={PLOT.x0}
            y1={yOf(CONTRACTED)}
            x2={PLOT.x1}
            y2={yOf(CONTRACTED)}
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1.3"
            strokeDasharray="5 4"
            vectorEffect="non-scaling-stroke"
          />

          <path d={`${seriesPath(hdg)} L${PLOT.x1} ${PLOT.y1} L${PLOT.x0} ${PLOT.y1} Z`} fill="url(#hedgeGlow)" />

          <path
            d={seriesPath(mkt)}
            fill="none"
            stroke="#94A3B8"
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

          <circle cx={PLOT.x1} cy={yOf(market)} r="3.4" fill={INK} stroke="#94A3B8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <circle cx={PLOT.x1} cy={yOf(now)} r="3.4" fill={INK} stroke="var(--brand-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Label onInk>Earlier</Label>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.4, md: 2.2 }, mx: 'auto' }}>
            {[
              ['Market cost', '#94A3B8', false],
              ['Hedged cost', 'var(--brand-accent)', false],
              ['Enterprise rate', 'rgba(255,255,255,0.32)', true],
            ].map(([k, c, dash]) => (
              <Box key={k} sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
                <Box
                  aria-hidden="true"
                  sx={{ width: '16px', height: '0px', flexShrink: 0, borderTop: `2px ${dash ? 'dashed' : 'solid'} ${c}` }}
                />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.66)' }}>{k}</Typography>
              </Box>
            ))}
          </Box>
          <Label onInk>Now</Label>
        </Box>
      </Box>

      {/* ---- how it is actually done, in order ---- */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          borderTop: `1px solid ${RULE_ON_INK}`,
          backgroundColor: 'rgba(0,0,0,0.22)',
        }}
      >
        {HEDGE_PROOF.map(([title, body], i) => (
          <Box
            key={title}
            sx={{
              px: { xs: 2.2, md: 3.2 },
              py: { xs: 1.6, md: 1.4 },
              borderLeft: { md: i === 0 ? 'none' : `1px solid ${RULE_ON_INK}` },
              borderTop: { xs: i === 0 ? 'none' : `1px solid ${RULE_ON_INK}`, md: 'none' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.1 }}>
              <Typography
                component="span"
                sx={{ ...FIG, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--brand-accent)' }}
              >
                {`0${i + 1}`}
              </Typography>
              <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                {title}
              </Typography>
            </Box>
            <Typography sx={{ mt: 0.5, fontSize: '0.86rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.58)' }}>
              {body}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          px: { xs: 2.2, md: 3.2 },
          py: { xs: 1.4, md: 1.2 },
          borderTop: `1px solid ${RULE_ON_INK}`,
          fontSize: '0.75rem',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.42)',
        }}
      >
        Illustrative only: {usd(STRIKE)} option strike, {usd(PREMIUM)} premium per covered GPU-hour,
        matched price exposure. Actual costs and protection vary, and hedges do not guarantee
        margins or compute availability.
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

/* Where enterprise revenue goes once it is earned.

   Set out as a statement, not as a flow chart. The first attempt was boxes
   joined by arrows, which is a picture of there being a process; it never
   said the thing the section exists to say, which is that the token is
   funded out of what is LEFT after the business has been run, not out of
   the top line. Subtraction says that in a form every reader already knows
   how to read, and it says it without a single box.

   So: a source, two deductions, a double rule, a subtotal, and the two
   places the subtotal goes. The double rule is the accounting convention
   and it is doing the work three arrows and a centred card were doing.

   No icons. Five decorative tiles would put the emphasis on the furniture,
   and the operator gutter already tells a reader what each row is.

   NO FIGURES, which is the one way this differs from a real statement. The
   rows carry names and the arithmetic is structural. What the enterprise
   side earns and what the compute costs are not settled in this repo, and a
   column of numbers here would read as a disclosure. */
const LEDGER = [
  {
    t: 'Enterprise revenue',
    s: 'Custom-branded solutions and AI usage.',
  },
  {
    op: '\u2212',
    t: 'Compute capacity',
    s: 'Fund the infrastructure serving enterprise workloads.',
  },
  {
    op: '\u2212',
    t: 'Options and protection',
    s: 'Fund hedging premiums to manage price exposure.',
  },
  {
    op: '=',
    t: 'Available revenue after costs',
    s: 'After service delivery, obligations and reserves.',
    total: true,
  },
];

/* THE ALLOCATION BAND IS NAMED HERE and nowhere else on the site now. The
   reference says only "under the allocation policy"; left at that, the one
   number this page exists to carry would have gone with the calculator. */
const ALLOCATED = [
  {
    op: '\u2192',
    t: 'Reinvest and scale',
    s: 'Expand compute capacity to serve future demand.',
  },
  {
    op: '\u2192',
    t: '$OPEN economy',
    s: `Support proposed buybacks and burns under the ${ALLOC_BAND} allocation policy.`,
    accent: true,
  },
];

/* One ruled row: operator, what it is, what it means.
 *
 * The name and the note are a wrapping pair rather than two fixed columns,
 * so on a narrow screen the note drops under the name it belongs to instead
 * of squeezing into a gutter three words wide. The operator keeps its own
 * fixed column at every width, because the column of operators running down
 * the left is the only thing making this read as arithmetic. */
function Row({ op, t, s: body, total, accent, first }) {
  const emphatic = total || accent;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: { xs: 1.4, md: 2 },
        py: { xs: 1.7, md: 1.9 },
        ...(first
          ? null
          : total
            ? { borderTop: '3px double rgba(11,15,26,0.26)' }
            : { borderTop: `1px solid ${RULE}` }),
      }}
    >
      <Typography
        aria-hidden="true"
        component="span"
        sx={{
          ...FIG,
          width: '18px',
          flexShrink: 0,
          fontSize: '1.05rem',
          lineHeight: 1,
          color: accent ? 'var(--brand-accent)' : total ? 'var(--text-heading)' : 'var(--text-muted)',
        }}
      >
        {op || ''}
      </Typography>

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, md: 2.4 } }}>
        <Typography
          sx={{
            flex: '0 1 300px',
            minWidth: 0,
            fontSize: emphatic ? { xs: '1.1rem', md: '1.18rem' } : { xs: '1.02rem', md: '1.06rem' },
            fontWeight: 750,
            letterSpacing: '-0.025em',
            lineHeight: 1.3,
            color: accent ? 'var(--brand-accent)' : 'var(--text-heading)',
          }}
        >
          {t}
        </Typography>
        <Typography
          sx={{
            flex: '1 1 280px',
            minWidth: 0,
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}

/**
 * The whole section as one sheet.
 *
 * It replaces the staking calculator that closed this page. That one asked a
 * reader to move three sliders to arrive at a figure nothing in this repo
 * can stand behind, and the arithmetic it set out was the same band quoted
 * four inches above it. This answers the question the sliders were standing
 * in for, which is where the money goes once the business has earned it.
 *
 * The composition is kept. The other two sections on this page are words
 * beside a thing and words above a thing; this is still the one rectangle,
 * with the heading as its masthead and the chain and the ask as its footer.
 *
 * THE STATEMENT IS A PROPOSAL, not a description of something running. The
 * badge says proposed and the note under it says so again in a sentence.
 * NEITHER HAS BEEN REVIEWED.
 */
function RevenueFlow() {
  return (
    <Box sx={{ border: `1px solid ${RULE}`, borderRadius: '20px', backgroundColor: 'var(--bg-card)', overflow: 'hidden' }}>
      {/* ---- masthead: the section's heading lives here ---- */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          gap: { xs: 1.5, md: 3 },
          px: { xs: 2.2, md: 3.4 },
          py: { xs: 2.4, md: 2.6 },
          borderBottom: `1px solid ${RULE}`,
          backgroundColor: 'rgba(11,15,26,0.022)',
        }}
      >
        <Box sx={{ flex: '1 1 320px', minWidth: 0 }}>
          <SectionHead
            maxWidth="100%"
            title={
              <>
                <Box component="span" sx={{ display: 'block' }}>Revenue earned.</Box>
                <Box component="span" sx={{ display: 'block', color: 'var(--brand-accent)' }}>
                  Compute reinvested.
                </Box>
              </>
            }
          />
        </Box>
        <Typography
          sx={{
            flex: '1 1 340px',
            minWidth: 0,
            fontSize: '0.98rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            textWrap: 'pretty',
          }}
        >
          Enterprise revenue powers more than AI services. Hey Open uses it to fund compute
          capacity and price protection, helping deliver predictable costs while building
          infrastructure for growing demand.
        </Typography>
      </Box>

      {/* ---- body: the statement ---- */}
      <Box sx={{ px: { xs: 2.2, md: 3.4 }, py: { xs: 2.4, md: 2.8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            pb: { xs: 0.6, md: 0.8 },
          }}
        >
          <Label>Where the revenue goes</Label>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: '12px',
              py: '7px',
              borderRadius: '999px',
              border: `1px solid ${RULE}`,
              backgroundColor: 'rgba(11,15,26,0.03)',
              flexShrink: 0,
            }}
          >
            <Label>Proposed, not a forecast</Label>
          </Box>
        </Box>

        {LEDGER.map((r, i) => (
          <Row key={r.t} {...r} first={i === 0} />
        ))}

        {/* The subtotal is where the subtraction stops and the allocation
            starts, so the second half is labelled rather than simply ruled.
            Without it the two arrows read as two more deductions. */}
        <Box sx={{ pt: { xs: 2.2, md: 2.4 }, pb: { xs: 0.4, md: 0.6 } }}>
          <Label>Allocated to</Label>
        </Box>

        {ALLOCATED.map((r, i) => (
          <Row key={r.t} {...r} first={i === 0} />
        ))}

        <Typography
          sx={{
            mt: { xs: 2.2, md: 2.4 },
            pt: { xs: 1.8, md: 2 },
            borderTop: `1px solid ${RULE}`,
            fontSize: '0.78rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
          }}
        >
          Illustrative. No revenue, cost, buyback or burn is quoted or guaranteed here, and the
          allocation above is a proposed policy range rather than a commitment.
        </Typography>
      </Box>

      {/* ---- footer: the chain, and the ask ---- */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: { xs: 2, md: 3 },
          px: { xs: 2.2, md: 3.4 },
          py: { xs: 2, md: 2.1 },
          borderTop: `1px solid ${RULE}`,
          backgroundColor: 'rgba(11,15,26,0.022)',
        }}
      >
        <Box sx={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.4, md: 0 } }}>
          {TOKEN_PROOF.map(([title, body], i) => (
            <React.Fragment key={title}>
              {i > 0 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '22px',
                    height: '1px',
                    flexShrink: 0,
                    mx: 1.8,
                    backgroundColor: 'rgba(11,15,26,0.24)',
                  }}
                />
              )}
              <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.94rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>
                  {title}
                </Typography>
                <Typography sx={{ mt: 0.3, fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{body}</Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
        <Box sx={{ ml: { md: 'auto' }, flexShrink: 0 }}>
          <Button href={LINKS.stake} primary>Stake $OPEN</Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function EnterprisePage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>The economics behind $OPEN | Hey Open</title>
        <meta
          name="description"
          content="Hey Open powers Custom branded AI products for enterprises, with compute protection designed to keep costs predictable. As the business grows, its revenue connects real AI usage to $OPEN buybacks and burns."
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

      {/* ---- what this page is ---- */}
      <Section first sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <Box sx={{ maxWidth: 860 }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.04,
                color: 'var(--text-heading)',
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>Real AI demand.</Box>
              <Box component="span" sx={{ display: 'block' }}>A stronger $OPEN economy.</Box>
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2.4, md: 3 },
                maxWidth: 680,
                fontSize: { xs: '1.04rem', md: '1.14rem' },
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                textWrap: 'pretty',
              }}
            >
              Hey Open powers white-label AI products for enterprises, with compute protection
              designed to keep costs predictable. As the business grows, its revenue model connects
              real AI usage to $OPEN buybacks and burns.
            </Typography>

            <Box sx={{ mt: { xs: 3.5, md: 4 }, display: 'flex', flexWrap: 'wrap', gap: 1.6 }}>
              <Button href="/stake" primary>Stake $OPEN</Button>
              <Button href="/token">Read the tokenomics</Button>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── 1. What the business actually sells ───────────
          The cards above name compute capital and AI infrastructure as two
          of the three places the stake is deployed. This is the demand on
          the other side of both, which is the part a staker otherwise has
          no way to see.

          Split, not stacked. The claim and the three things it rests on run
          down the left and the product sits on the right at full size, so
          this section is a column of words beside an object where the next
          one is a column of words above an object and the one after that is
          a single sheet. That is the difference a reader actually sees.

          No eyebrow, because no heading on this page has one. */}
      <Section
        ground="linear-gradient(180deg, #F2F5F9 0%, #EBF0F5 46%, #EFF3F7 100%)"
        sx={{ py: { xs: 7, md: 5 } }}
      >
        <Reveal>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: { lg: 'center' },
              gap: { xs: 3.5, lg: 6 },
            }}
          >
            <Box sx={{ flex: { lg: '0 1 400px' }, minWidth: 0 }}>
              <SectionHead
                tier="minor"
                maxWidth="100%"
                title={
                  <>
                    <Box component="span" sx={{ display: 'block' }}>Their brand.</Box>
                    <Box component="span" sx={{ display: 'block' }}>Our infrastructure.</Box>
                  </>
                }
                lede="Hey Open powers Custom Branded AI products for businesses. From inference APIs to complete applications, enterprises launch under their own brand while we run what is underneath."
              />

              <Box sx={{ mt: { xs: 2.6, md: 3 } }}>
                {STACK_PROOF.map(([title, body], i) => (
                  <Box
                    key={title}
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 2,
                      pt: i ? 1.3 : 0,
                      mt: i ? 1.3 : 0,
                      borderTop: i ? `1px solid ${RULE}` : 'none',
                    }}
                  >
                    <Typography
                      sx={{
                        flex: '0 0 128px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-heading)',
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {body}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  mt: { xs: 2.6, md: 3 },
                  fontSize: { xs: '1rem', md: '1.06rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.45,
                  color: 'var(--text-heading)',
                  textWrap: 'pretty',
                }}
              >
                Every deployment creates another channel for AI compute demand.
              </Typography>
            </Box>

            <Box sx={{ flex: { lg: '1 1 0' }, minWidth: 0, width: '100%' }}>
              <WhiteLabel />
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ── 2. How the cost of it is held still ──────────
          The section above promises enterprises a contracted rate. This is
          the only reason that promise can be made, so it follows directly.

          Centred and narrow over one wide instrument, which is the opposite
          shape to the section before it. Everything that used to sit under
          the panel as a separate block is inside the panel now, so the
          section is two things rather than five. */}
      <Section ground="ink" sx={{ py: { xs: 7, md: 5 } }}>
        <Reveal>
          <Box sx={{ maxWidth: 620, mx: 'auto', textAlign: 'center', mb: { xs: 3, md: 2.4 } }}>
            <SectionHead
              tier="minor"
              onInk
              maxWidth="100%"
              title={
                <>
                  <Box component="span" sx={{ display: 'block' }}>Compute prices move.</Box>
                  <Box component="span" sx={{ display: 'block', color: 'var(--brand-accent)' }}>
                    We manage the exposure.
                  </Box>
                </>
              }
              lede="A business that simply pays the market cannot quote anyone a stable rate. Compute is bought and its price exposure hedged, which is what makes a contracted rate possible."
            />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Protection />
        </Reveal>

        <Reveal delay={60}>
          <Typography
            sx={{
              mt: { xs: 2.5, md: 1.5 },
              textAlign: 'center',
              fontSize: { xs: '1.02rem', md: '1.12rem' },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.45,
              color: '#FFFFFF',
              textWrap: 'pretty',
            }}
          >
            More predictable compute costs. A business built to scale.
          </Typography>
        </Reveal>
      </Section>

      {/* ── 3. And where the revenue goes ──────────
          The close of the business block. The two sections above sell the
          enterprise side and then show what it costs to run; this is what
          happens to the money afterwards, which is the only part of the
          three that a token holder is actually buying into.

          It replaces the staking calculator. That asked for three slider
          moves to reach a figure nothing here can stand behind, and this
          page is the one place the allocation band is supposed to be stated
          plainly rather than computed.

          One object, nothing stacked. The heading is the sheet's masthead
          and the chain and the ask are its footer, so where the two sections
          above are words-beside-a-thing and words-above-a-thing, this is a
          single rectangle. Plain ground, because the sheet is the only thing
          on it, and because the section above it is ink. */}
      <Section sx={{ py: { xs: 7, md: 5 } }}>
        <Reveal>
          <RevenueFlow />
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
