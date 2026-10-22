import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * The second way to pay for inference.
 *
 * Sits directly above pricing and sets it up: that section sells a monthly
 * plan, this one explains the alternative, so the two read as a pair.
 *
 * Diagram notes, because the first two attempts got these wrong:
 *
 *  - Route captions sit OUTSIDE their bracket, above the top one and below
 *    the bottom one. Putting a chip on the line looked neat in isolation and
 *    collided with the cards either side of it.
 *  - The node row is fenced off from both brackets by its own grid rows, so
 *    nothing can drift into it as the copy changes.
 *  - Cards are solid white with a real border. Frosted translucency on a
 *    light panel just reads as washed out at this size.
 *  - The badge sits above its arrow and the verb below it, which is the
 *    arrangement in the supplied workflow and leaves the shaft unbroken.
 *
 * No figures appear here. Supply, mint ratio and credit rate are not settled
 * anywhere in the repo, and a number on this page would read as a commitment.
 */

const ORANGE = '#ff6600';
const INK = 'rgba(15, 23, 42, 0.72)';
const DASH = '1px dashed rgba(15, 23, 42, 0.28)';

/* Real glass, not a translucent rectangle. Five things together:
     1. a body that is a gradient, lighter where light enters
     2. heavy blur with saturation and a little brightness, so colour
        from the backdrop blooms through instead of going grey
     3. a specular rim: a gradient border, brightest top left, done with
        the two layer mask trick because a border cannot hold a gradient
     4. an inset highlight on the top edge, a weaker bounce on the bottom
     5. two shadows, a tight contact one and a long ambient one
   None of it reads without a backdrop worth refracting, which is what
   the panel behind it is for. */
const GLASS = {
  position: 'relative',
  background:
    'linear-gradient(150deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.38) 48%, rgba(255,255,255,0.54) 100%)',
  backdropFilter: 'blur(26px) saturate(200%) brightness(1.06)',
  WebkitBackdropFilter: 'blur(26px) saturate(200%) brightness(1.06)',
  boxShadow: [
    'inset 0 1px 0 rgba(255,255,255,0.95)',
    'inset 0 -1px 0 rgba(255,255,255,0.45)',
    'inset 0 8px 24px -12px rgba(255,255,255,0.9)',
    '0 1px 2px rgba(15,23,42,0.07)',
    '0 22px 44px -18px rgba(15,23,42,0.28)',
  ].join(','),
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background:
      'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.26) 42%, rgba(255,255,255,0.20) 62%, rgba(255,255,255,0.88) 100%)',
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
    background:
      'radial-gradient(120% 90% at 8% -12%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 55%)',
    pointerEvents: 'none',
  },
};

const LABEL = {
  fontSize: '0.64rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const STEPS = [
  { tag: 'You hold', k: '$OPEN', s: 'in your wallet' },
  { tag: 'Staked', k: 'sOPEN', s: 'earns as collateral' },
  { tag: 'Minted', k: 'OIU', s: 'backed by your sOPEN' },
  { tag: 'You receive', k: 'Inference credits', s: 'every day, automatically', fill: true },
];

const ARROWS = [
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

function Node({ step }) {
  return (
    <Box
      sx={{
        borderRadius: '14px',
        px: { xs: 2, md: 2.2 },
        py: { xs: 2.2, md: 2.4 },
        textAlign: 'center',
        minHeight: { md: 96 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...(step.fill
          ? {
              position: 'relative',
              background: `linear-gradient(150deg, #FF9150 0%, ${ORANGE} 55%, #E35A00 100%)`,
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.55)',
                'inset 0 -1px 0 rgba(0,0,0,0.14)',
                '0 1px 2px rgba(170,58,0,0.28)',
                '0 22px 44px -18px rgba(255,102,0,0.62)',
              ].join(','),
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background:
                  'radial-gradient(120% 90% at 10% -12%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0) 55%)',
                pointerEvents: 'none',
              },
            }
          : GLASS),
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.02rem', md: '1.16rem' },
          fontWeight: 700,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: step.fill ? '#FFFFFF' : 'var(--text-heading)',
          mb: 0.5,
        }}
      >
        {step.k}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.81rem' },
          lineHeight: 1.4,
          color: step.fill ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
        }}
      >
        {step.s}
      </Typography>
    </Box>
  );
}

/* Badge above, verb beneath it, then an unbroken shaft. */
function Arrow({ arrow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { md: 1.2 } }}>
      <Box
        sx={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: ORANGE,
          color: '#FFFFFF',
          fontSize: '0.72rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 0.9,
        }}
      >
        {arrow.n}
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.83rem' },
          fontWeight: 600,
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          mb: 1.1,
        }}
      >
        {arrow.t}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, height: '1.5px', minWidth: { xs: '34px', md: '52px' }, backgroundColor: INK }} />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7px solid ${INK}`,
            flexShrink: 0,
          }}
        />
      </Box>
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

        {/* ---- diagram ---- */}
        <Box
          ref={figRef}
          sx={{
            position: 'relative',
            borderRadius: '24px',
            background:
              'radial-gradient(62% 80% at 10% 12%, rgba(255,138,46,0.26) 0%, transparent 62%),' +
              'radial-gradient(58% 76% at 90% 88%, rgba(96,132,255,0.24) 0%, transparent 66%),' +
              'radial-gradient(46% 62% at 62% 38%, rgba(255,205,160,0.22) 0%, transparent 70%),' +
              'linear-gradient(145deg, #FAFCFF 0%, #EDF1F8 100%)',
            border: '1px solid rgba(255,255,255,0.9)',
            px: { xs: 2.5, md: 5 },
            pt: { xs: 3, md: 3.5 },
            pb: { xs: 3.5, md: 4 },
            overflow: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          {/* The brand's own glass render, oversized and bled off the
              right edge. This is the thing the cards refract. Without it
              the frost has nothing to pick up and reads as grey. */}
          <Box
            aria-hidden="true"
            component="img"
            src="/images/liquid_glass_light.jpg"
            alt=""
            loading="lazy"
            sx={{
              position: 'absolute',
              right: '-7%',
              top: '50%',
              transform: 'translateY(-50%) rotate(-12deg)',
              width: { xs: '150%', md: '58%' },
              maxWidth: 720,
              opacity: 0.6,
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage: 'radial-gradient(ellipse 85% 75% at 42% 45%, #000 15%, transparent 82%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 42% 45%, #000 15%, transparent 82%)',
            }}
          />

          <Box sx={{ position: 'relative' }}>
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 2.5, md: 3 } }}>
              The stake-once route
            </Typography>

            {/* Desktop. Rows fence the node row off from both brackets, so a
                caption can never drift into a card. */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns:
                  'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.08fr)',
                gridTemplateRows: 'auto 26px 14px auto 14px 26px auto',
                alignItems: 'center',
              }}
            >
              {/* caption, then bracket, then a gap, then the row */}
              <Typography
                sx={{ gridColumn: '3 / 8', gridRow: 1, textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-secondary)', pb: 1 }}
              >
                Your collateral stays locked the whole time
              </Typography>
              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 8',
                  gridRow: 2,
                  alignSelf: 'stretch',
                  borderTop: DASH,
                  borderLeft: DASH,
                  borderRight: DASH,
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />

              {/* node labels sit with their node, inside row 4 */}
              {STEPS.map((step, i) => (
                <React.Fragment key={step.k}>
                  <Box sx={{ gridColumn: i * 2 + 1, gridRow: 4 }}>
                    <Typography
                      sx={{ ...LABEL, color: step.fill ? ORANGE : 'var(--text-muted)', mb: 1, textAlign: 'center' }}
                    >
                      {step.tag}
                    </Typography>
                    <Node step={step} />
                  </Box>
                  {ARROWS[i] && (
                    <Box sx={{ gridColumn: i * 2 + 2, gridRow: 4, alignSelf: 'center', pt: 2.2 }}>
                      <Arrow arrow={ARROWS[i]} />
                    </Box>
                  )}
                </React.Fragment>
              ))}

              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 6,
                  alignSelf: 'stretch',
                  position: 'relative',
                  borderBottom: DASH,
                  borderLeft: DASH,
                  borderRight: DASH,
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-1px',
                    left: '-5px',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '7px solid rgba(15,23,42,0.4)',
                  },
                }}
              />
              <Typography
                sx={{ gridColumn: '3 / 6', gridRow: 7, textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-secondary)', pt: 1 }}
              >
                Burn the OIU to unlock it
              </Typography>
            </Box>

            {/* Mobile: stacked, routes said in words. */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
              {STEPS.map((step, i) => (
                <React.Fragment key={step.k}>
                  <Typography sx={{ ...LABEL, color: step.fill ? ORANGE : 'var(--text-muted)', mb: 1 }}>
                    {step.tag}
                  </Typography>
                  <Node step={step} />
                  {ARROWS[i] && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, py: 1.8, pl: 1 }}>
                      <Box
                        sx={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: ORANGE,
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {ARROWS[i].n}
                      </Box>
                      <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {ARROWS[i].t}
                      </Typography>
                    </Box>
                  )}
                </React.Fragment>
              ))}
              <Box sx={{ mt: 2.5, pt: 2.5, borderTop: '1px solid var(--border-normal)' }}>
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-secondary)', mb: 1, textWrap: 'pretty' }}>
                  Your collateral stays locked the whole time.
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                  Burn the OIU to unlock it.
                </Typography>
              </Box>
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
                  <Typography sx={{ ...LABEL, color: 'var(--text-muted)', pt: '3px' }}>{k}</Typography>
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
