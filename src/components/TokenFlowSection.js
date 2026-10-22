import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * The second way to pay for inference.
 *
 * Sits directly above pricing and sets it up: the section below sells a
 * monthly plan, this one explains the alternative, so the two read as a pair
 * rather than competing. That framing is the reason it does not say
 * subscriptions are bad, which would undercut the section it introduces.
 *
 * The diagram is the supplied workflow. Nodes on the odd columns of a seven
 * column grid, arrows on the even ones, so the two dashed return paths can be
 * grid items spanning exact column lines. Each return path carries its label
 * on the line in a chip that breaks it, which is what stops the dashes
 * reading as a box drawn around the nodes.
 *
 * No figures appear here. The supply, the mint ratio and the credit rate are
 * not settled anywhere in the repo, and a number on this page would read as a
 * commitment.
 */

const ORANGE = '#ff6600';

/* The frosted panel the site already uses on its controls in ApiSection. */
const GLASS = {
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(14px) saturate(180%)',
  WebkitBackdropFilter: 'blur(14px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.9)',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.07), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)',
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

const DASH = '1px dashed rgba(15, 23, 42, 0.22)';

/* Sits on a dashed line and breaks it, so the line reads as a route with a
   name on it rather than a rectangle drawn around the nodes. */
function OnLine({ children, top }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [top ? 'top' : 'bottom']: top ? 0 : '-1px',
        px: 1.6,
        py: 0.4,
        borderRadius: '8px',
        backgroundColor: 'var(--bg-section-alt)',
        whiteSpace: 'nowrap',
      }}
    >
      <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{children}</Typography>
    </Box>
  );
}

function Node({ step }) {
  return (
    <Box>
      <Typography sx={{ ...LABEL, color: step.fill ? ORANGE : 'var(--text-muted)', mb: 1, textAlign: 'center' }}>
        {step.tag}
      </Typography>
      <Box
        sx={{
          borderRadius: '16px',
          px: { xs: 2, md: 2.4 },
          py: { xs: 2.2, md: 2.6 },
          textAlign: 'center',
          minHeight: { md: 104 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...(step.fill
            ? {
                backgroundColor: ORANGE,
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 16px 34px -16px rgba(255,102,0,0.65), inset 0 1.5px 1.5px rgba(255,255,255,0.4)',
              }
            : GLASS),
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.05rem', md: '1.22rem' },
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
            fontSize: { xs: '0.78rem', md: '0.82rem' },
            lineHeight: 1.4,
            color: step.fill ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
          }}
        >
          {step.s}
        </Typography>
      </Box>
    </Box>
  );
}

function Arrow({ arrow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { md: 1 }, pt: 3 }}>
      {/* badge sits on the line */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
        <Box sx={{ flex: 1, height: '2px', minWidth: { xs: '14px', md: '20px' }, backgroundColor: 'rgba(15,23,42,0.18)' }} />
        <Box
          sx={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: ORANGE,
            color: '#FFFFFF',
            fontSize: '0.74rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 10px -2px rgba(255,102,0,0.5)',
          }}
        >
          {arrow.n}
        </Box>
        <Box sx={{ flex: 1, height: '2px', minWidth: { xs: '14px', md: '20px' }, backgroundColor: 'rgba(15,23,42,0.18)' }} />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '7px solid rgba(15,23,42,0.32)',
            flexShrink: 0,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.84rem' },
          fontWeight: 600,
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        {arrow.t}
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

        {/* ---- diagram ---- */}
        <Box
          ref={figRef}
          sx={{
            position: 'relative',
            borderRadius: '24px',
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-subtle)',
            px: { xs: 2.5, md: 5 },
            pt: { xs: 3, md: 4 },
            pb: { xs: 3.5, md: 4.5 },
            overflow: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(ellipse 45% 70% at 10% 0%, rgba(255,102,0,0.10) 0%, transparent 65%),
                           radial-gradient(ellipse 45% 70% at 92% 100%, rgba(99,132,255,0.10) 0%, transparent 68%)`,
            }}
          />

          <Box sx={{ position: 'relative' }}>
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 3, md: 3.5 } }}>
              The stake-once route
            </Typography>

            {/* Desktop grid: nodes odd, arrows even. */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.1fr)',
                gridTemplateRows: 'auto 30px auto 30px',
                alignItems: 'center',
              }}
            >
              {/* return path over the row, labelled on the line */}
              <Box
                aria-hidden="false"
                sx={{
                  gridColumn: '3 / 8',
                  gridRow: 1,
                  alignSelf: 'stretch',
                  position: 'relative',
                  borderTop: DASH,
                  borderLeft: DASH,
                  borderRight: DASH,
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  mb: 1,
                }}
              >
                <OnLine top>Your collateral stays locked the whole time</OnLine>
              </Box>

              {STEPS.map((step, i) => (
                <React.Fragment key={step.k}>
                  <Box sx={{ gridColumn: i * 2 + 1, gridRow: 3 }}>
                    <Node step={step} />
                  </Box>
                  {ARROWS[i] && (
                    <Box sx={{ gridColumn: i * 2 + 2, gridRow: 3, alignSelf: 'center' }}>
                      <Arrow arrow={ARROWS[i]} />
                    </Box>
                  )}
                </React.Fragment>
              ))}

              {/* return path back from OIU into sOPEN */}
              <Box
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 4,
                  alignSelf: 'stretch',
                  position: 'relative',
                  mt: 1,
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
                    borderBottom: '7px solid rgba(15,23,42,0.32)',
                  },
                }}
              >
                <OnLine>Burn the OIU to unlock it</OnLine>
              </Box>
            </Box>

            {/* Mobile: stacked, routes said in words. */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
              {STEPS.map((step, i) => (
                <React.Fragment key={step.k}>
                  <Node step={step} />
                  {ARROWS[i] && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, py: 1.6, pl: 1 }}>
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
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)', mb: 1, textWrap: 'pretty' }}>
                  Your collateral stays locked the whole time.
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)', textWrap: 'pretty' }}>
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
