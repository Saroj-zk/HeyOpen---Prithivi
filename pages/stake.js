import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
 * with the same two tokens doing the same two jobs. $OPEN is the capital
 * asset you buy and stake, as VVV is. $HEY is minted only by stakers and
 * pays out credit every day, as DIEM is.
 *
 * ------------------------------------------------------------------
 * On the drawing.
 *
 * The page was argued well and drawn as nothing but type: hairline rules,
 * monospace figures, paper cards, one band of ink. Rebuilding those surfaces
 * did not fix it, because the problem was not the surfaces. A page about a
 * mechanism had no picture of the mechanism, and a page about a rate had no
 * picture of the rate. Three things were missing and are now here.
 *
 * A loop. $OPEN becomes sOPEN becomes $HEY becomes credits, and the credits
 * are what sends you back for more $OPEN. That is a cycle, it was being
 * described in three paragraphs, and it is drawn in the hero instead.
 *
 * A scale. The whole argument is that the floor is low and certain and the
 * target sits a long way above it. On one axis that gap is the picture; in
 * two sentences it is arithmetic the reader has to do. Nothing on it is
 * invented: a solid bar at the contract rate, a hatched band at the target,
 * and the axis they both sit on.
 *
 * Bands. Sections alternate between paper, a warm wash, ink and a cool wash,
 * so the page has a rhythm rather than seven white sections and one dark one.
 *
 * Figures stay monospace and totals keep the double rule, because the ledger
 * idiom is the honest part: a fixed rate and a managed target are different
 * kinds of promise and they are still set as different kinds of entry.
 * ------------------------------------------------------------------
 */

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/*                                                                     */
/* Every one of these is a representation about money, so none of them */
/* is invented here.                                                   */
/* ------------------------------------------------------------------ */
const RATES = {
  /* Supply comes from the tokenomics data rather than being retyped, so the
     two pages cannot drift apart. */
  supply: TOKEN.supply,
  /* Fixed, and stated as fixed. */
  base: '6.00%',
  /* All in, and inclusive of the floor rather than stacked on top of it. The
     floor is the worst case inside this band, not a separate payment added to
     it, which is why nothing on the page sums the two. */
  total: '40% to 50%',
  /* What actually lands: the floor at worst, the top of the band at best. */
  range: '6.00% to 50%',
  /* The same hundred that unlocks Pro on the page this follows. */
  threshold: '100 $OPEN',
};

/* The scale the chart is drawn on, and the two figures plotted on it. Held
   as numbers here because a chart cannot read "40% to 50%", and kept beside
   the strings above so a change to one is obviously a change to both. */
const PLOT = { max: 60, floor: 6, targetLow: 40, targetHigh: 50 };

/* The same thing on an actual stake. A percentage is an abstraction and six
   hundred tokens is not. Arithmetic only, on the figures above, and the
   target figure is the whole return rather than an amount added to the
   floor. */
const EXAMPLE = {
  stake: '10,000',
  floorAdd: '+600',
  targetAdd: '+4,000 to +5,000',
  floorTotal: '10,600',
  planTotal: '14,000 to 15,000',
};

/* What the stake unlocks beyond the yield. Written as entries rather than as
   a list of ticks, so it reads as the account it is. */
const PRO = [
  ['Text prompts', 'Unlimited'],
  ['Image and video models', 'The leading ones'],
  ['Every model in the catalogue', 'Included'],
  ['What it costs while staked', 'Nothing'],
];

/* Three things a reader can establish without being asked to take anyone's
   word for it. Each follows from how the thing is built. */
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

/* The cycle, clockwise from the top left. Four states of one position, which
   is why it is a loop and not a list: the credits at the end are the reason
   to hold the $OPEN at the start. Glyphs are the same vocabulary the token
   flow on the home page uses. */
const LOOP = [
  { k: '$OPEN', s: 'You buy and hold it', glyph: '◆', tone: 'amber' },
  { k: 'sOPEN', s: 'Staked, still yours', glyph: '▣', tone: 'paper' },
  { k: '$HEY', s: 'Minted by the stake', glyph: '◇', tone: 'paper' },
  { k: 'Credits', s: 'Spend on any model', glyph: '✦', tone: 'ink' },
];

const HOW = [
  { n: '01', cta: 'Buy $OPEN', href: LINKS.buy, glyph: '◆' },
  { n: '02', cta: 'Stake $OPEN', href: LINKS.stake, glyph: '▣' },
  { n: '03', cta: 'Mint $HEY', href: LINKS.mint, glyph: '◇' },
];

/* The two stakes, which is the part of this that is easy to get wrong.
   Staking the capital asset pays in value. Staking what it mints pays in
   compute. Same verb, two currencies out, drawn on two different materials
   so the distinction is seen rather than read. */
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

const CARD_AMBER = {
  borderRadius: '14px',
  border: '1px solid rgba(255,102,0,0.22)',
  background: 'linear-gradient(180deg, #FFF3EA 0%, #FFE8D8 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.85), 0 1px 2px rgba(11,15,26,0.04), 0 26px 50px -34px rgba(214,86,0,0.4)',
};

/* The four section grounds. Paper is the page itself, so it is not listed. */
const WARM = 'linear-gradient(180deg, #FFF8F3 0%, #FDF3EB 100%)';
const COOL = 'linear-gradient(180deg, #F5F8FB 0%, #EEF3F8 100%)';

/** A full-bleed section, on one of the grounds. */
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
          ? { background: ground, borderTop: '1px solid rgba(11,15,26,0.05)', borderBottom: '1px solid rgba(11,15,26,0.05)' }
          : null),
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>{children}</Container>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The loop                                                            */
/* ------------------------------------------------------------------ */

const LOOP_DASH = 'rgba(15,23,42,0.3)';

/** One corner of the cycle. */
function Node({ item }) {
  const ink = item.tone === 'ink';
  const amber = item.tone === 'amber';
  const onDark = ink;

  return (
    <Box
      sx={{
        px: { xs: 1.4, sm: 1.8 },
        py: { xs: 1.3, sm: 1.6 },
        minWidth: 0,
        ...(ink ? CARD_INK : amber ? CARD_AMBER : CARD),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Typography
          sx={{
            ...FIG,
            fontSize: { xs: '0.92rem', sm: '1.02rem' },
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: onDark ? '#FFFFFF' : amber ? '#9A3C00' : 'var(--text-heading)',
          }}
        >
          {item.k}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            fontSize: '0.86rem',
            lineHeight: 1,
            flexShrink: 0,
            opacity: onDark ? 0.8 : 0.45,
            color: onDark ? '#FFFFFF' : amber ? '#9A3C00' : 'var(--text-heading)',
          }}
        >
          {item.glyph}
        </Box>
      </Box>
      <Typography
        sx={{
          mt: 0.5,
          fontSize: { xs: '0.7rem', sm: '0.74rem' },
          lineHeight: 1.4,
          color: onDark ? 'rgba(255,255,255,0.7)' : amber ? 'rgba(154,60,0,0.78)' : 'var(--text-muted)',
        }}
      >
        {item.s}
      </Typography>
    </Box>
  );
}

/** An arrow along one edge of the cycle. */
function Edge({ dir }) {
  const horizontal = dir === 'right' || dir === 'left';
  const tip = {
    width: 0,
    height: 0,
    flexShrink: 0,
    borderTop: horizontal ? '4.5px solid transparent' : dir === 'down' ? `6.5px solid ${LOOP_DASH}` : '0',
    borderBottom: horizontal ? '4.5px solid transparent' : dir === 'up' ? `6.5px solid ${LOOP_DASH}` : '0',
    borderLeft: horizontal
      ? dir === 'right'
        ? `6.5px solid ${LOOP_DASH}`
        : '0'
      : '4.5px solid transparent',
    borderRight: horizontal
      ? dir === 'left'
        ? `6.5px solid ${LOOP_DASH}`
        : '0'
      : '4.5px solid transparent',
  };
  const line = horizontal
    ? { flex: 1, borderTop: `1.5px dashed ${LOOP_DASH}`, minWidth: 10 }
    : { flex: 1, borderLeft: `1.5px dashed ${LOOP_DASH}`, minHeight: 14 };

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        justifySelf: 'center',
        width: horizontal ? '100%' : 'auto',
        height: horizontal ? 'auto' : '100%',
        px: horizontal ? 0.6 : 0,
        py: horizontal ? 0 : 0.6,
      }}
    >
      {(dir === 'left' || dir === 'up') && <Box sx={tip} />}
      <Box sx={line} />
      {(dir === 'right' || dir === 'down') && <Box sx={tip} />}
    </Box>
  );
}

/**
 * The cycle, as a square.
 *
 * A three by three grid: the nodes take the corners, the arrows take the
 * edges between them, and the middle holds the one word that says what the
 * shape is. Clockwise, because that is the direction the value travels.
 */
function Loop() {
  return (
    <Box
      sx={{
        ...CARD,
        p: { xs: 2, sm: 2.6, md: 3 },
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
        gridTemplateRows: 'auto auto auto',
        rowGap: { xs: 0.5, sm: 0.8 },
      }}
    >
      <Box sx={{ gridColumn: 1, gridRow: 1 }}><Node item={LOOP[0]} /></Box>
      <Box sx={{ gridColumn: 2, gridRow: 1, display: 'flex', minWidth: { xs: 28, sm: 42 } }}><Edge dir="right" /></Box>
      <Box sx={{ gridColumn: 3, gridRow: 1 }}><Node item={LOOP[1]} /></Box>

      <Box sx={{ gridColumn: 1, gridRow: 2, display: 'flex', minHeight: { xs: 30, sm: 40 } }}><Edge dir="up" /></Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: MONO,
            fontSize: '0.56rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          Loop
        </Typography>
      </Box>
      <Box sx={{ gridColumn: 3, gridRow: 2, display: 'flex', minHeight: { xs: 30, sm: 40 } }}><Edge dir="down" /></Box>

      <Box sx={{ gridColumn: 1, gridRow: 3 }}><Node item={LOOP[3]} /></Box>
      <Box sx={{ gridColumn: 2, gridRow: 3, display: 'flex' }}><Edge dir="left" /></Box>
      <Box sx={{ gridColumn: 3, gridRow: 3 }}><Node item={LOOP[2]} /></Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The scale                                                           */
/* ------------------------------------------------------------------ */

const at = (v) => `${(v / PLOT.max) * 100}%`;

/**
 * The two figures on one axis.
 *
 * The argument of the whole section is the distance between them, and a
 * distance is the one thing a sentence cannot show. Everything plotted is a
 * figure already stated above: a solid bar to the contract rate, a hatched
 * band across the target, and the axis they sit on. No series, no history,
 * nothing implied about what lands in between.
 */
function Scale() {
  const ticks = [0, 10, 20, 30, 40, 50, 60];

  return (
    <Box>
      {/* labels, held above the track so neither sits on top of a bar */}
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
          <Typography
            sx={{
              ...FIG,
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              fontWeight: 600,
              lineHeight: 1.05,
              color: 'var(--brand-accent)',
            }}
          >
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
        {/* the floor: solid, because it is */}
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
              'repeating-linear-gradient(135deg, rgba(255,122,26,0.62) 0 7px, rgba(255,102,0,0.26) 7px 14px)',
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
  /* Three versions of this page's words live in data/stakeCopy. A is the one
     chosen; change the index to read the page in one of the others. */
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

      {/* ── Hero: the claim, and a picture of the mechanism ───────── */}
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
            <Loop />
          </Reveal>
        </Box>
      </Section>

      {/* ── The numbers, as a strip under the claim ───────────────── */}
      <Section sx={{ pb: { xs: 6, md: 9 } }}>
        <Reveal delay={60}>
          <Box
            sx={{
              ...CARD,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            }}
          >
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {HOW.map((step, i) => (
              <Box
                key={step.n}
                sx={{ ...CARD, display: 'flex', flexDirection: 'column', px: { xs: 2.5, md: 3 }, py: { xs: 2.8, md: 3.2 } }}
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
                  <Box aria-hidden="true" sx={{ fontSize: '1.1rem', opacity: 0.35, color: 'var(--text-heading)' }}>
                    {step.glyph}
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1.35rem', md: '1.5rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    mb: 1.3,
                  }}
                >
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

      {/* ── The yield, on ink, led by the scale ───────────────────── */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 11 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Head2 onInk eyebrow={C.yield.eyebrow} title={C.yield.title} lede={C.yield.lede} maxWidth={760} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
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
                <Label onInk>Worked through</Label>
                <Label onInk>A year</Label>
              </Box>
              <Box sx={{ px: { xs: 2.5, md: 3 }, pt: '6px', pb: { xs: 2.4, md: 2.8 } }}>
                <Entry name="You stake" figure={`${EXAMPLE.stake} $OPEN`} onInk />
                <Entry name="The floor pays" figure={EXAMPLE.floorAdd} onInk />
                <Entry name="On plan, all in" figure={EXAMPLE.targetAdd} dashed onInk />
                <Entry name="You hold, on plan" figure={EXAMPLE.planTotal} total onInk />
                <Typography sx={{ mt: '16px', fontSize: '0.84rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.52)' }}>
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

      {/* ── Pro, on paper ─────────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
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

      {/* ── Two things to stake, on a cool ground ─────────────────── */}
      <Section ground={COOL} sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Head2 eyebrow={C.stakes.eyebrow} title={C.stakes.title} lede={C.stakes.lede} />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 2.5, md: 3 },
              alignItems: 'stretch',
            }}
          >
            {STAKES.map((s, i) => {
              const onInk = Boolean(s.lead);
              return (
                <Box
                  key={s.token}
                  sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', ...(onInk ? CARD_INK : CARD) }}
                >
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
                      <Typography
                        sx={{
                          ...FIG,
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: onInk ? 'var(--brand-accent)' : 'var(--text-heading)',
                        }}
                      >
                        {s.token}
                      </Typography>
                    </Box>
                    <Label onInk={onInk}>{s.kind}</Label>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      px: { xs: 2.5, md: 3 },
                      pt: { xs: 2.4, md: 2.8 },
                      pb: { xs: 2.6, md: 3 },
                    }}
                  >
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
          <Typography
            sx={{
              mt: { xs: 3, md: 3.5 },
              fontFamily: MONO,
              fontSize: '0.74rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              maxWidth: '76ch',
            }}
          >
            {C.stakes.foot}
          </Typography>
        </Reveal>
      </Section>

      {/* ── Supply, on paper ──────────────────────────────────────── */}
      <Section sx={{ py: { xs: 7, md: 10 } }}>
        <Reveal>
          <Box
            sx={{
              ...CARD,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.72fr 1.28fr' },
            }}
          >
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
              <Typography
                sx={{
                  ...FIG,
                  mt: 2,
                  fontSize: { xs: '3rem', md: '3.8rem' },
                  fontWeight: 600,
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-heading)',
                }}
              >
                {RATES.supply}
              </Typography>
              <Typography sx={{ mt: 1.5, fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                Fixed at launch. No inflation switch.
              </Typography>
            </Box>

            <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 3, md: 4 } }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.028em',
                  lineHeight: 1.3,
                  color: 'var(--text-heading)',
                  mb: 1.6,
                  textWrap: 'balance',
                }}
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

      {/* ── Close, on ink ─────────────────────────────────────────── */}
      <Section ground="ink" sx={{ py: { xs: 8, md: 11 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Reveal>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.4rem' },
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                color: '#FFFFFF',
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
              lands above the floor varies by period. Nothing here is investment advice. Read the
              terms before you stake.
            </Typography>
          </Reveal>
        </Box>
      </Section>

      <Footer />
    </Box>
  );
}
