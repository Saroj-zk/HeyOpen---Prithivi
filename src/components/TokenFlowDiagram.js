import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';
import { ORANGE, DASH_C, LABEL, CLEAR, AMBER, SMOKE, CHIP_BEVEL, CANVAS } from '@/components/ui/glass';

/**
 * The four moves, as a flowchart.
 *
 * Recovered from before the merge that replaced it. The version that landed
 * instead drew three circles and a strip of supply figures; this one draws
 * the thing that actually happens to your tokens, which is what the stake
 * page needs. Both still exist: the infographic is the home page's, hidden
 * there for now, and this is the stake page's.
 *
 * ------------------------------------------------------------------
 * The second way to pay for inference.
 *
 * Sits directly below pricing and answers it. That section sells the monthly
 * plan; this one is the alternative, which is why the copy opens on "the
 * other way to pay" rather than making the comparison itself.
 *
 * Drawn as a flowchart, per the supplied reference: square tiles rather than
 * wide cards, small marker tiles carrying the step between them, dashed
 * routing, and a dashed group enclosing the part of the flow that is locked.
 *
 * Every tile is glass, from one recipe with three tints. The bevel is what
 * reads as glass, not the transparency: a gradient rim, a specular sweep, an
 * inner shadow for thickness. The bodies are nearly opaque on purpose, since
 * a see-through orange over a light panel just looks washed out.
 *
 * Layout is one grid: tiles on odd columns, markers on even ones. The dashed
 * group is a grid item spanning the locked columns with a negative margin, so
 * it wraps the tiles instead of being positioned by eye.
 *
 * No figures appear here. Supply, mint ratio and credit rate are not settled
 * anywhere in the repo, and a number on this page would read as a commitment.
 * That is also why it suits the stake page: the figures it would have shown
 * are the ones the page states once each, lower down, in their own sections.
 *
 * The eyebrow is off by default. No heading on the stake page has one.
 */

const TILES = [
  { id: 'hold', tag: 'You hold', k: '$OPEN', s: 'in your wallet', kind: 'brand', glyph: '◆' },
  { id: 'staked', tag: 'Staked', k: '$OPEN', s: 'locked as collateral', kind: 'glass', glyph: '▤' },
  { id: 'minted', tag: 'Minted', k: '$HEY', s: 'against the stake', kind: 'glass', glyph: '◇' },
  { id: 'credits', tag: 'You receive', k: 'Credits', s: 'every day', kind: 'ink', glyph: '✦' },
];

const MARKERS = [
  { n: '1', t: 'stake' },
  { n: '2', t: 'mint against it' },
  { n: '3', t: 'stake $HEY' },
];


/* A square node. Label top left, glyph bottom right, as in the reference. */
function Tile({ tile, stacked }) {
  const brand = tile.kind === 'brand';
  const ink = tile.kind === 'ink';
  const onDark = brand || ink;

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        /* Square in the row, a wide band when stacked: a 162px square in
           a 375px column leaves most of the width empty. */
        width: stacked ? '100%' : { xs: 132, sm: 150, md: 162 },
        height: stacked ? 'auto' : { xs: 132, sm: 150, md: 162 },
        minHeight: stacked ? 88 : 'auto',
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
          color: onDark ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)',
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
                color: onDark ? 'rgba(255,255,255,0.82)' : 'var(--text-muted)',
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
  /* The segments carry the whole gap between two tiles. Padding here
     would hold the dashes off one tile and the arrowhead off the other,
     which is what made the route look detached. */
  const line = {
    flex: 1,
    height: 0,
    borderTop: `1.5px dashed ${DASH_C}`,
    minWidth: { xs: 13, md: 25 },
  };
  return (
    <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            boxShadow: CHIP_BEVEL,
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
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7.5px solid ${DASH_C}`,
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

/* One step, between two stacked tiles: a short rule, the numbered marker,
   then the verb. Vertical, so the sequence still reads downward. */
function Step({ marker }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, py: 1.4, pl: 1.4 }}>
      <Box sx={{ width: '1.5px', height: 22, backgroundColor: DASH_C, flexShrink: 0 }} />
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '10px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.74rem',
          fontWeight: 800,
          color: ORANGE,
          ...CLEAR,
        }}
      >
        <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>{marker.n}</Box>
      </Box>
      <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {marker.t}
      </Typography>
    </Box>
  );
}

export default function TokenFlowDiagram({ eyebrow = false }) {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="stake-flow" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          {eyebrow && (
            <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 2 }}>
              The other way to pay
            </Typography>
          )}
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
            Stake once.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Credits arrive daily.</Box>
          </Typography>
          <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, textWrap: 'pretty' }}>
            This route spends nothing. You lock $OPEN as collateral, mint $HEY against it,
            and credits arrive every day until you decide to unlock. The stake stays yours the
            whole time.
          </Typography>
        </Box>

        {/* ---- the canvas ---- */}
        <Box
          ref={figRef}
          sx={{
            ...CANVAS,
            px: { xs: 2, md: 5 },
            pt: { xs: 3, md: 4 },
            pb: { xs: 3, md: 4 },
            overflow: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 2.5, md: 3 } }}>
              The stake-once route
            </Typography>

            <Box
              sx={{
                /* The row needs about 1100px: four fixed 162px tiles plus
                   three step labels that do not wrap. */
                display: { xs: 'none', lg: 'grid' },
                gridTemplateColumns: 'repeat(7, auto)',
                justifyContent: 'center',
                alignItems: 'start',
                rowGap: 0,
              }}
            >
              {/* The locked pair, bracketed from above: a run with a short
                  drop at each end. As a closed rounded box it had no height
                  to give it, so it collapsed into a rule that appeared to
                  cross the canvas rather than to cover two tiles. */}
              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 1,
                  zIndex: 0,
                  alignSelf: 'start',
                  /* Half a tile in from each end, so the drops stand over the
                     centres of the stake and $HEY and line up with the risers of
                     the return route below. */
                  mx: '81px',
                  mt: '-30px',
                  height: '22px',
                  borderTop: `1.5px dashed ${DASH_C}`,
                  borderLeft: `1.5px dashed ${DASH_C}`,
                  borderRight: `1.5px dashed ${DASH_C}`,
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <Typography
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 1,
                  zIndex: 1,
                  justifySelf: 'center',
                  alignSelf: 'start',
                  mt: '-54px',
                  px: 1.2,
                  ...LABEL,
                  color: 'var(--text-secondary)',
                }}
              >
                Locked while it backs $HEY
              </Typography>

              {TILES.map((tile, i) => (
                <React.Fragment key={tile.id}>
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
                  /* Half the 162px tile, so the line drops from under the
                     centre of $HEY and rises into the centre of the stake
                     rather than into the gaps beside them. */
                  mx: '81px',
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
                Burn $HEY to unlock it
              </Typography>
            </Box>

            {/* Below lg: the same sequence down the page. The locked pair get
                a dashed wrapper of their own, and the return path becomes a
                line of text, because a route doubling back inside a single
                column is noise rather than information. */}
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: 'column' }}>
              <Tile tile={TILES[0]} stacked />
              <Step marker={MARKERS[0]} />

              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '18px',
                  border: `1.5px dashed ${DASH_C}`,
                  p: { xs: 1.6, sm: 2 },
                  pt: { xs: 2.4, sm: 2.6 },
                }}
              >
                <Typography
                  sx={{
                    ...LABEL,
                    position: 'absolute',
                    top: -8,
                    left: 16,
                    px: 1,
                    backgroundColor: 'var(--bg-section-alt)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.56rem',
                  }}
                >
                  Locked while it backs $HEY
                </Typography>
                <Tile tile={TILES[1]} stacked />
                <Step marker={MARKERS[1]} />
                <Tile tile={TILES[2]} stacked />
              </Box>

              <Step marker={MARKERS[2]} />
              <Tile tile={TILES[3]} stacked />

              <Typography
                sx={{
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: '1px solid var(--border-normal)',
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  textWrap: 'pretty',
                }}
              >
                Burn $HEY to unlock the collateral at any time.
              </Typography>
            </Box>
          </Box>
        </Box>

      </Box>
    </Container>
  );
}
