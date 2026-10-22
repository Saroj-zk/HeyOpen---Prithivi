import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * How $OPEN turns into inference credits.
 *
 * A full bleed dark band on an otherwise light page, styled from the
 * Tokenomics Studio concept: deep ink base, teal and violet ambient light,
 * and panels made of glass rather than filled rectangles.
 *
 * The glass is four things together, and it falls apart if any one is left
 * out: a near transparent vertical gradient so the panel has a top and a
 * bottom, a hairline border at low alpha, an inset highlight along the top
 * edge that reads as the lit rim, and a long soft drop so it floats. Blur
 * behind it is what makes the ambient light bleed through.
 *
 * Numbered arrows run between the nodes and two dashed brackets double back,
 * as in the supplied workflow. Everything sits on one seven column grid,
 * nodes on the odd columns and arrows on the even ones, so each bracket is a
 * grid item spanning exact column lines rather than a percentage guess.
 *
 * ACCENT: the concept uses mint against violet, so that is what this band
 * uses. It is the one constant below; switching the section back to brand
 * orange is a one line change.
 */

const A = {
  ink: '#070A12',
  mint: '#4FE3B0',
  mint2: '#7DF0CE',
  violet: '#8B5CF6',
  text: 'rgba(255,255,255,0.94)',
  text2: 'rgba(255,255,255,0.60)',
  text3: 'rgba(255,255,255,0.40)',
  line: 'rgba(255,255,255,0.10)',
  line2: 'rgba(255,255,255,0.22)',
};

/* The panel treatment, in one place so every surface in the band matches. */
const GLASS = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)',
  border: `1px solid ${A.line}`,
  backdropFilter: 'blur(22px) saturate(150%)',
  WebkitBackdropFilter: 'blur(22px) saturate(150%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 24px 60px -28px rgba(0,0,0,0.9)',
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

const DASH = `1px dashed ${A.line2}`;

function Node({ step }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '16px',
        px: { xs: 2.2, md: 2.6 },
        py: { xs: 2.2, md: 2.8 },
        textAlign: 'center',
        minHeight: { md: 112 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        ...(step.fill
          ? {
              background: `linear-gradient(145deg, ${A.mint} 0%, ${A.mint2} 100%)`,
              border: '1px solid rgba(255,255,255,0.45)',
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 46px -18px ${A.mint}80`,
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
          color: step.fill ? '#04221A' : A.text,
          mb: 0.6,
        }}
      >
        {step.k}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', md: '0.85rem' },
          lineHeight: 1.4,
          color: step.fill ? 'rgba(4,34,26,0.72)' : A.text3,
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
          background: `linear-gradient(145deg, ${A.mint}, ${A.mint2})`,
          color: '#04221A',
          fontSize: '0.74rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          boxShadow: `0 0 0 4px rgba(79,227,176,0.12), 0 6px 16px -6px ${A.mint}`,
        }}
      >
        {arrow.n}
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.82rem' },
          fontWeight: 500,
          color: A.text2,
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
            background: `linear-gradient(90deg, ${A.line2}, ${A.mint})`,
          }}
        />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: `6px solid ${A.mint}`,
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
    <Box
      id="token-flow"
      sx={{
        position: 'relative',
        backgroundColor: A.ink,
        overflow: 'hidden',
        py: { xs: 8, md: 14 },
        scrollMarginTop: '96px',
        /* The band is full bleed, so it needs its own rounding at the seams
           rather than inheriting the page's. */
        borderRadius: { xs: '28px', md: '36px' },
        mx: { xs: 1.5, md: 3 },
      }}
    >
      {/* Ambient light. Two pools, teal left and violet right, plus a faint
          dot field so the glass has something to refract. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse 55% 65% at 12% 0%, rgba(79,227,176,0.20) 0%, transparent 68%),
                       radial-gradient(ellipse 55% 70% at 88% 8%, rgba(139,92,246,0.24) 0%, transparent 70%),
                       radial-gradient(ellipse 70% 50% at 50% 100%, rgba(79,227,176,0.07) 0%, transparent 70%)`,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.5) 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.5) 60%, transparent 100%)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', px: { xs: 2.5, md: 6 } }}>
        <Box sx={{ maxWidth: 1340, mx: 'auto' }}>
          {/* ---- heading ---- */}
          <Box ref={headRef} sx={{ maxWidth: 780, mb: { xs: 5, md: 7 }, ...revealSx(headShown) }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                px: 1.8,
                py: 0.7,
                mb: 3,
                borderRadius: '9999px',
                ...GLASS,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: A.mint, boxShadow: `0 0 10px ${A.mint}` }} />
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: A.mint,
                }}
              >
                Dual token AI economy
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.4rem' },
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                color: A.text,
                mb: 2.4,
                textWrap: 'balance',
              }}
            >
              Stake for capacity.{' '}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(100deg, ${A.mint} 0%, ${A.mint2} 55%, ${A.violet} 120%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Draw credits daily.
              </Box>
            </Typography>

            <Typography sx={{ fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.65, color: A.text2, textWrap: 'pretty' }}>
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
              ...GLASS,
              px: { xs: 2.5, md: 6 },
              py: { xs: 4, md: 6 },
              ...revealSx(figShown, 120),
            }}
          >
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: A.text3,
                mb: { xs: 3.5, md: 5 },
              }}
            >
              Three steps, done once
            </Typography>

            {/* Desktop grid: nodes on odd columns, arrows on even ones. */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.15fr)',
                gridTemplateRows: 'auto 36px auto 36px auto',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{ gridColumn: '3 / 8', gridRow: 1, textAlign: 'center', fontSize: '0.84rem', color: A.text3, pb: 1 }}
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
                    borderBottom: `6px solid ${A.line2}`,
                  },
                }}
              />

              <Typography
                sx={{ gridColumn: '3 / 6', gridRow: 5, textAlign: 'center', fontSize: '0.84rem', color: A.text3, pt: 1 }}
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
                          background: `linear-gradient(145deg, ${A.mint}, ${A.mint2})`,
                          color: '#04221A',
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
                      <Typography sx={{ fontSize: '0.86rem', fontWeight: 500, color: A.text2 }}>
                        {ARROWS[i].t}
                      </Typography>
                    </Box>
                  )}
                </React.Fragment>
              ))}
              <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${A.line}` }}>
                <Typography sx={{ fontSize: '0.86rem', color: A.text3, mb: 1.2, textWrap: 'pretty' }}>
                  Your sOPEN stays locked as collateral for as long as the OIU exists.
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: A.text3, textWrap: 'pretty' }}>
                  Burn OIU to release the collateral.
                </Typography>
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
              <Box key={t} sx={{ borderRadius: '18px', ...GLASS, px: { xs: 2.4, md: 3 }, py: { xs: 2.4, md: 3 } }}>
                <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: A.text, mb: 1 }}>{t}</Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: A.text2, textWrap: 'pretty' }}>
                  {d}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
