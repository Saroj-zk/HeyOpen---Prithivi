import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * How $OPEN turns into inference credits.
 *
 * Light, like the rest of the page. The glass here is the treatment the site
 * already uses on its frosted controls (see ApiSection): translucent white,
 * a white rather than grey border, an inset white highlight along the top
 * edge, and a soft drop. A warm wash sits behind the panels so the frost has
 * something to pick up, otherwise translucency on a flat background is just
 * a lighter grey.
 *
 * Laid out as the supplied workflow: nodes left to right, numbered arrows
 * between them, and two dashed brackets doubling back. Everything sits on one
 * seven column grid, nodes on the odd columns and arrows on the even ones, so
 * each bracket is a grid item spanning exact column lines rather than a
 * percentage guess.
 */

const ORANGE = '#ff6600';

/* The site's own frosted panel, in one place so every surface matches. */
const GLASS = {
  backgroundColor: 'rgba(255, 255, 255, 0.62)',
  backdropFilter: 'blur(14px) saturate(180%)',
  WebkitBackdropFilter: 'blur(14px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.78)',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95)',
};

const STEPS = [
  { k: '$OPEN', s: 'in your wallet' },
  { k: 'sOPEN', s: 'staked $OPEN' },
  { k: 'OIU', s: 'minted against sOPEN' },
  { k: 'Inference credits', s: 'arrive daily', fill: true },
];

const ARROWS = [
  { n: '1', t: 'stake' },
  { n: '2', t: 'mint against it' },
  { n: '3', t: 'stake the OIU' },
];

const NOTES = [
  ['Done once', 'Set it up and the credits keep arriving. Nothing to renew, no monthly charge.'],
  ['Collateral, not spend', 'Minting locks $OPEN rather than spending it. Burn the OIU and the stake comes back.'],
  ['Earlier costs less', 'The mint rate climbs as OIU supply grows, so each new one is backed by more than the last.'],
];

const DASH = '1px dashed var(--border-strong)';

function Node({ step }) {
  return (
    <Box
      sx={{
        borderRadius: '16px',
        px: { xs: 2.2, md: 2.6 },
        py: { xs: 2.2, md: 2.8 },
        textAlign: 'center',
        minHeight: { md: 110 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...(step.fill
          ? {
              backgroundColor: ORANGE,
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 14px 32px -14px rgba(255, 102, 0, 0.7), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.4)',
            }
          : GLASS),
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          fontWeight: 700,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: step.fill ? '#FFFFFF' : 'var(--text-heading)',
          mb: 0.6,
        }}
      >
        {step.k}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', md: '0.85rem' },
          lineHeight: 1.4,
          color: step.fill ? 'rgba(255, 255, 255, 0.88)' : 'var(--text-muted)',
        }}
      >
        {step.s}
      </Typography>
    </Box>
  );
}

function Arrow({ arrow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: { md: 1 } }}>
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
          mb: 1,
          boxShadow: '0 0 0 4px rgba(255, 102, 0, 0.12)',
        }}
      >
        {arrow.n}
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.84rem' },
          fontWeight: 600,
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          mb: 1.2,
        }}
      >
        {arrow.t}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box
          sx={{
            flex: 1,
            height: '1px',
            minWidth: { xs: '28px', md: '42px' },
            backgroundColor: 'var(--text-primary)',
            opacity: 0.55,
          }}
        />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid var(--text-primary)',
            opacity: 0.55,
          }}
        />
      </Box>
    </Box>
  );
}

export default function TokenFlowSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="token-flow" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 780, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: ORANGE,
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            How $OPEN pays for inference
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
            Three steps,{' '}
            <Box component="span" sx={{ color: ORANGE }}>done once.</Box>
          </Typography>
          <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, textWrap: 'pretty' }}>
            Stake $OPEN, mint OIU against the stake, then stake the OIU. Credits arrive every day
            after that without you touching it again, and the collateral is still yours.
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
            px: { xs: 2.5, md: 6 },
            py: { xs: 4, md: 6 },
            overflow: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          {/* Warm wash and dot field, so the frosted panels have something to
              pick up rather than sitting on a flat fill. */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(ellipse 50% 60% at 12% 0%, rgba(255, 102, 0, 0.11) 0%, transparent 68%),
                           radial-gradient(ellipse 55% 65% at 88% 10%, rgba(99, 132, 255, 0.10) 0%, transparent 70%)`,
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.09) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.45) 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.45) 65%, transparent 100%)',
            }}
          />

          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-heading)',
                mb: { xs: 3.5, md: 5 },
              }}
            >
              Three steps, done once
            </Typography>

            {/* Desktop: nodes on odd columns, arrows on even ones. */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.15fr)',
                gridTemplateRows: 'auto 36px auto 36px auto',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{ gridColumn: '3 / 8', gridRow: 1, textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted)', pb: 1 }}
              >
                Your sOPEN stays locked as collateral for as long as the OIU exists.
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

              <Box
                aria-hidden="true"
                sx={{
                  gridColumn: '3 / 6',
                  gridRow: 4,
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
                    left: '-4px',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: '6px solid var(--border-strong)',
                  },
                }}
              />

              <Typography
                sx={{ gridColumn: '3 / 6', gridRow: 5, textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted)', pt: 1 }}
              >
                Burn OIU to release the collateral.
              </Typography>
            </Box>

            {/* Mobile: the same sequence stacked, brackets said in words. */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
              {STEPS.map((step, i) => (
                <React.Fragment key={step.k}>
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
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid var(--border-normal)' }}>
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)', mb: 1.2, textWrap: 'pretty' }}>
                  Your sOPEN stays locked as collateral for as long as the OIU exists.
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)', textWrap: 'pretty' }}>
                  Burn OIU to release the collateral.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ---- notes ---- */}
        <Box
          sx={{
            mt: { xs: 2.5, md: 3 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {NOTES.map(([t, d]) => (
            <Box
              key={t}
              sx={{
                borderRadius: '18px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                px: { xs: 2.4, md: 3 },
                py: { xs: 2.4, md: 3 },
              }}
            >
              <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                {t}
              </Typography>
              <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                {d}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
