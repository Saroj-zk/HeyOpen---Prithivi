import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * How $OPEN turns into inference credits.
 *
 * Laid out as the workflow diagram that was supplied: boxes left to right,
 * numbered arrows between them, and two dashed brackets doubling back to show
 * what the collateral is doing while it is locked.
 *
 * The brackets are the fiddly part. Everything sits on one seven column grid
 * (box, arrow, box, arrow, box, arrow, box) so each bracket can be a grid item
 * spanning exact column lines rather than a percentage guess. Three open sided
 * borders make the bracket shape: top plus sides for the one that hangs down
 * over the row, bottom plus sides for the one that reaches up into it.
 *
 * NOTE ON ACCURACY: the mechanic here is the one described in the concept
 * (stake, mint against the stake, stake that to draw credits, burn to unlock),
 * and no figures are invented. The mint curve and the redemption behaviour are
 * stated qualitatively for that reason. See the section comment in index.js.
 */

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

const DASH = '1px dashed var(--border-strong)';

function Node({ step }) {
  return (
    <Box
      sx={{
        borderRadius: '14px',
        px: { xs: 2, md: 2.4 },
        py: { xs: 2, md: 2.6 },
        textAlign: 'center',
        minHeight: { md: 104 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: step.fill ? '#FF6600' : 'var(--bg-card)',
        border: step.fill ? '1px solid #FF6600' : '1px solid var(--border-normal)',
        boxShadow: step.fill ? '0 10px 26px -12px rgba(255,102,0,.55)' : 'none',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: step.fill ? '#FFFFFF' : 'var(--text-heading)',
          mb: 0.6,
        }}
      >
        {step.k}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', md: '0.86rem' },
          lineHeight: 1.4,
          color: step.fill ? 'rgba(255,255,255,0.86)' : 'var(--text-muted)',
        }}
      >
        {step.s}
      </Typography>
    </Box>
  );
}

/* The numbered badge, the shaft and the label under it. */
function Arrow({ arrow }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: { md: 1 } }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#FF6600',
          color: '#FFFFFF',
          fontSize: '0.74rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 0.8,
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
          mb: 1,
        }}
      >
        {arrow.t}
      </Typography>
      {/* shaft plus head */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--text-primary)', minWidth: { xs: 28, md: 40 } }} />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid var(--text-primary)',
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
    <Container
      id="token-flow"
      maxWidth="xl"
      sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 760, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#ff6600',
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
            <Box component="span" sx={{ color: '#ff6600' }}>done once.</Box>
          </Typography>
          <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, textWrap: 'pretty' }}>
            Stake $OPEN, mint OIU against the stake, then stake the OIU. Credits arrive every day
            after that without you touching it again, and your collateral is still yours.
          </Typography>
        </Box>

        {/* ---- diagram ---- */}
        <Box
          ref={figRef}
          sx={{
            position: 'relative',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-section-alt)',
            backgroundImage: 'radial-gradient(var(--border-normal) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            px: { xs: 2.5, md: 6 },
            py: { xs: 4, md: 6 },
            overflow: 'hidden',
            ...revealSx(figShown, 120),
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-heading)',
              mb: { xs: 3, md: 5 },
            }}
          >
            Three steps, done once
          </Typography>

          {/* Desktop: one grid, boxes on odd columns, arrows on even ones, so
              the brackets can span exact column lines. */}
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.15fr)',
              gridTemplateRows: 'auto 34px auto 34px auto',
              alignItems: 'center',
            }}
          >
            {/* caption over the top bracket */}
            <Typography
              sx={{
                gridColumn: '3 / 8',
                gridRow: 1,
                textAlign: 'center',
                fontSize: '0.86rem',
                color: 'var(--text-muted)',
                pb: 1,
              }}
            >
              Your sOPEN stays locked as collateral for as long as the OIU exists.
            </Typography>

            {/* top bracket: hangs down over the row */}
            <Box
              aria-hidden="true"
              sx={{
                gridColumn: '3 / 8',
                gridRow: 2,
                alignSelf: 'stretch',
                borderTop: DASH,
                borderLeft: DASH,
                borderRight: DASH,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            />

            {/* the flow itself */}
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

            {/* bottom bracket: reaches back up from OIU into sOPEN */}
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
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                /* head on the left upright, pointing back into sOPEN */
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
              sx={{
                gridColumn: '3 / 6',
                gridRow: 5,
                textAlign: 'center',
                fontSize: '0.86rem',
                color: 'var(--text-muted)',
                pt: 1,
              }}
            >
              Burn OIU to release the collateral.
            </Typography>
          </Box>

          {/* Mobile: the same sequence stacked, brackets dropped and said in
              words instead, because a doubling back line in a column is noise. */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step.k}>
                <Node step={step} />
                {ARROWS[i] && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, py: 1.6, pl: 1 }}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        backgroundColor: '#FF6600',
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
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
                Your sOPEN stays locked as collateral for as long as the OIU exists.
              </Typography>
              <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)', textWrap: 'pretty' }}>
                Burn OIU to release the collateral.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ---- the one thing the diagram cannot show ---- */}
        <Box
          sx={{
            mt: { xs: 2.5, md: 3 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {[
            ['Done once', 'Set it up and the credits keep arriving. There is nothing to renew and no monthly charge.'],
            ['Collateral, not spend', 'Minting locks $OPEN rather than spending it. Burn the OIU and the stake comes back.'],
            ['Earlier costs less', 'The mint rate climbs as OIU supply grows, so each new one is backed by more than the last.'],
          ].map(([t, d]) => (
            <Box key={t} sx={{ borderTop: '2px solid var(--border-normal)', pt: 2 }}>
              <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.8 }}>
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
