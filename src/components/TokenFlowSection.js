import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * The second way to pay for inference.
 *
 * Drawn as a flowchart canvas, per the supplied reference: ruled paper, square
 * tiles rather than wide cards, small marker tiles carrying the step between
 * them, dashed routing, and a dashed group enclosing the part of the flow that
 * is locked.
 *
 * The tiles are glass. That needs something behind it or it reads as grey, so
 * the canvas is a warm ruled ground with the brand's own glass render bled off
 * the right edge. The grid lines refracting through the tiles are most of what
 * sells it.
 *
 * Layout is one grid: tiles on odd columns, markers on even ones. The dashed
 * group is a grid item spanning the locked columns with a negative margin, so
 * it wraps the tiles instead of being positioned by eye.
 *
 * No figures appear here. Supply, mint ratio and credit rate are not settled
 * anywhere in the repo, and a number on this page would read as a commitment.
 */

const ORANGE = '#ff6600';
const INK = '#14161B';
const DASH_C = 'rgba(20, 22, 27, 0.30)';

const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
};

/* One glass recipe, three tints. The bevel is what makes it read as glass,
   so every tile gets the same construction and only the body colour changes:
   a gradient body, a blurred and saturated backdrop, a gradient rim brightest
   at the top left, an inner shadow along the bottom for thickness, and a
   specular sweep where the light lands. */
function glass({ hi, mid, lo, rim, inner, drop }) {
  return {
    position: 'relative',
    background: `linear-gradient(150deg, ${hi} 0%, ${mid} 52%, ${lo} 100%)`,
    backdropFilter: 'blur(20px) saturate(200%)',
    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
    boxShadow: [
      `inset 0 1px 0 ${rim}`,
      `inset 0 0 0 0.5px ${rim}`,
      `inset 0 -16px 28px -20px ${inner}`,
      '0 1px 2px rgba(20,22,27,0.05)',
      `0 20px 40px -18px ${drop}`,
    ].join(','),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      padding: '1px',
      background: `linear-gradient(145deg, ${rim} 0%, rgba(255,255,255,0.08) 44%, rgba(255,255,255,0.06) 62%, ${rim} 100%)`,
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      background: 'radial-gradient(130% 95% at 6% -14%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 56%)',
      pointerEvents: 'none',
    },
  };
}

const CLEAR = glass({
  hi: 'rgba(255,255,255,0.62)',
  mid: 'rgba(255,255,255,0.24)',
  lo: 'rgba(255,255,255,0.46)',
  rim: 'rgba(255,255,255,0.95)',
  inner: 'rgba(90,110,160,0.38)',
  drop: 'rgba(40,55,90,0.30)',
});

const AMBER = glass({
  hi: 'rgba(255,146,70,0.80)',
  mid: 'rgba(255,102,0,0.52)',
  lo: 'rgba(222,84,0,0.72)',
  rim: 'rgba(255,255,255,0.70)',
  inner: 'rgba(150,52,0,0.55)',
  drop: 'rgba(214,86,0,0.42)',
});

const SMOKE = glass({
  hi: 'rgba(58,63,76,0.82)',
  mid: 'rgba(20,22,27,0.60)',
  lo: 'rgba(10,12,16,0.80)',
  rim: 'rgba(255,255,255,0.34)',
  inner: 'rgba(0,0,0,0.6)',
  drop: 'rgba(14,16,22,0.5)',
});

const TILES = [
  { tag: 'You hold', k: '$OPEN', s: 'in your wallet', kind: 'brand', glyph: '◆' },
  { tag: 'Staked', k: 'sOPEN', s: 'collateral', kind: 'glass', glyph: '▤' },
  { tag: 'Minted', k: 'OIU', s: 'against sOPEN', kind: 'glass', glyph: '◇' },
  { tag: 'You receive', k: 'Credits', s: 'every day', kind: 'ink', glyph: '✦' },
];

const MARKERS = [
  { n: '1', t: 'stake' },
  { n: '2', t: 'mint against it' },
  { n: '3', t: 'stake the OIU' },
];

const COMPARE = [
  {
    h: 'Subscribe',
    sub: 'Pay every month',
    rows: [
      ['You pay', 'A fixed amount, monthly'],
      ['You stop', 'Cancel whenever you like'],
      ['Afterwards', 'Nothing to reclaim'],
    ],
  },
  {
    h: 'Stake once',
    sub: 'Pay with collateral',
    accent: true,
    rows: [
      ['You lock', '$OPEN, which stays yours'],
      ['You receive', 'Credits daily, indefinitely'],
      ['Afterwards', 'Burn the OIU, unlock the stake'],
    ],
  },
];

/* A square node. Label top left, glyph bottom right, as in the reference. */
function Tile({ tile }) {
  const brand = tile.kind === 'brand';
  const ink = tile.kind === 'ink';
  const onDark = brand || ink;

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        width: { xs: 132, sm: 150, md: 162 },
        height: { xs: 132, sm: 150, md: 162 },
        borderRadius: '20px',
        p: { xs: 1.6, md: 1.9 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        ...(brand ? AMBER : ink ? SMOKE : CLEAR),
      }}
    >
      <Typography
        sx={{
          ...LABEL,
          position: 'relative',
          zIndex: 1,
          color: onDark ? 'rgba(255,255,255,0.72)' : 'var(--text-muted)',
        }}
      >
        {tile.tag}
      </Typography>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.02rem', md: '1.14rem' },
                fontWeight: 750,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: onDark ? '#FFFFFF' : 'var(--text-heading)',
              }}
            >
              {tile.k}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.72rem', md: '0.76rem' },
                lineHeight: 1.35,
                mt: 0.4,
                color: onDark ? 'rgba(255,255,255,0.68)' : 'var(--text-muted)',
              }}
            >
              {tile.s}
            </Typography>
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1,
              flexShrink: 0,
              opacity: onDark ? 0.85 : 0.5,
              color: onDark ? '#FFFFFF' : 'var(--text-heading)',
            }}
          >
            {tile.glyph}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* The small marker tile that carries the step, with dashed line either side. */
function Marker({ marker }) {
  const line = {
    flex: 1,
    height: 0,
    borderTop: `1.5px dashed ${DASH_C}`,
    minWidth: { xs: 10, md: 18 },
  };
  return (
    <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 0.5, md: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={line} />
        <Box
          sx={{
            position: 'relative',
            width: { xs: 34, md: 40 },
            height: { xs: 34, md: 40 },
            borderRadius: '13px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: ORANGE,
            ...CLEAR,
            /* A 40px tile needs a tighter, brighter rim than a 162px one
               or the bevel disappears at this size. */
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,1)',
              'inset 0 0 0 0.5px rgba(255,255,255,0.6)',
              'inset 0 -6px 12px -8px rgba(90,110,160,0.4)',
              '0 2px 4px rgba(20,22,27,0.06)',
              '0 10px 20px -10px rgba(40,55,90,0.35)',
            ].join(','),
          }}
        >
          <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>{marker.n}</Box>
        </Box>
        <Box sx={line} />
        <Box
          aria-hidden="true"
          sx={{
            width: 0,
            height: 0,
            flexShrink: 0,
            borderTop: '4.5px solid transparent',
            borderBottom: '4.5px solid transparent',
            borderLeft: `6.5px solid ${DASH_C}`,
          }}
        />
      </Box>
      <Typography
        sx={{
          mt: 1.2,
          fontSize: { xs: '0.7rem', md: '0.78rem' },
          fontWeight: 600,
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        {marker.t}
      </Typography>
    </Box>
  );
}

export default function TokenFlowSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();
  const [cmpRef, cmpShown] = useReveal();

  return (
    <Container id="token-flow" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 2 }}>
            Two ways to pay for inference
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2.1rem', md: '3rem' },
              fontWeight: 700,
              color: 'var(--text-primary)',
              mb: 2,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            Rent it monthly, or{' '}
            <Box component="span" sx={{ color: ORANGE }}>stake once and keep it.</Box>
          </Typography>
          <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, textWrap: 'pretty' }}>
            A subscription is the simple route and it is the one most people want. The other route
            spends nothing: you lock $OPEN as collateral, mint against it, and credits arrive every
            day until you decide to unlock.
          </Typography>
        </Box>

        {/* ---- the canvas ---- */}
        <Box
          ref={figRef}
          sx={{
            position: 'relative',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.85)',
            background:
              'radial-gradient(60% 80% at 18% 12%, rgba(255,150,80,0.10) 0%, transparent 62%),' +
              'linear-gradient(145deg, #F2F5FA 0%, #FAFBFE 48%, #EEF1F7 100%)',
            px: { xs: 2, md: 5 },
            pt: { xs: 3, md: 4 },
            pb: { xs: 3, md: 4 },
            overflowX: { xs: 'auto', lg: 'hidden' },
            overflowY: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          <Box sx={{ position: 'relative', minWidth: { xs: 760, lg: 'auto' } }}>
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 2.5, md: 3 } }}>
              The stake-once route
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, auto)',
                justifyContent: { xs: 'start', lg: 'center' },
                alignItems: 'start',
                rowGap: 0,
              }}
            >
              {/* the dashed group, wrapping the locked part of the flow */}
              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 1,
                  zIndex: 0,
                  m: '-18px',
                  mt: '-26px',
                  borderRadius: '26px',
                  border: `1.5px dashed ${DASH_C}`,
                }}
              />
              <Typography
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 1,
                  zIndex: 1,
                  justifySelf: 'center',
                  alignSelf: 'start',
                  mt: '-40px',
                  px: 1.2,
                  ...LABEL,
                  color: 'var(--text-secondary)',
                }}
              >
                Locked while it backs the OIU
              </Typography>

              {TILES.map((tile, i) => (
                <React.Fragment key={tile.k}>
                  <Box sx={{ gridColumn: i * 2 + 1, gridRow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Tile tile={tile} />
                  </Box>
                  {MARKERS[i] && (
                    <Box sx={{ gridColumn: i * 2 + 2, gridRow: 1, alignSelf: 'center', pb: 3 }}>
                      <Marker marker={MARKERS[i]} />
                    </Box>
                  )}
                </React.Fragment>
              ))}

              {/* the return route, under the locked group */}
              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 2,
                  mt: '18px',
                  mx: '-18px',
                  height: 30,
                  position: 'relative',
                  borderBottom: `1.5px dashed ${DASH_C}`,
                  borderLeft: `1.5px dashed ${DASH_C}`,
                  borderRight: `1.5px dashed ${DASH_C}`,
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-5px',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: `7px solid ${DASH_C}`,
                  },
                }}
              />
              <Typography
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 3,
                  textAlign: 'center',
                  mt: 1.2,
                  fontSize: { xs: '0.74rem', md: '0.8rem' },
                  color: 'var(--text-secondary)',
                }}
              >
                Burn the OIU to unlock it
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ---- the two routes, side by side ---- */}
        <Box
          ref={cmpRef}
          sx={{
            mt: { xs: 2.5, md: 3 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
            ...revealSx(cmpShown, 100),
          }}
        >
          {COMPARE.map((c) => (
            <Box
              key={c.h}
              sx={{
                borderRadius: '20px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid',
                borderColor: c.accent ? 'rgba(255,102,0,0.35)' : 'var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                px: { xs: 2.6, md: 3.4 },
                py: { xs: 2.6, md: 3.2 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.4, mb: 2.4 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.15rem', md: '1.3rem' },
                    fontWeight: 750,
                    letterSpacing: '-0.02em',
                    color: c.accent ? ORANGE : 'var(--text-heading)',
                  }}
                >
                  {c.h}
                </Typography>
                <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{c.sub}</Typography>
              </Box>
              {c.rows.map(([k, v], i) => (
                <Box
                  key={k}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '112px 1fr',
                    gap: 2,
                    py: 1.5,
                    borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                  }}
                >
                  <Typography sx={{ ...LABEL, fontSize: '0.64rem', color: 'var(--text-muted)', pt: '3px' }}>{k}</Typography>
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                    {v}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
