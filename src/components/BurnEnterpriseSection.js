import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useReveal, revealSx } from '@/utils/reveal';
import { ORANGE, DASH_C, LABEL, CLEAR, AMBER, SMOKE, CHIP_BEVEL, CANVAS } from '@/components/ui/glass';

/**
 * Where the money goes, and the one way to pay that never joins the route.
 *
 * Sits under "the other way to pay" and is drawn in the same glass, from the
 * same module: same canvas, same tints, same tile anatomy of a tag, the thing
 * itself, and a note under it.
 *
 * Laid out as that section is, left to right in one band, because a vertical
 * funnel ran to two screens. Order is carried by the tags and by the direction
 * of travel, which is what a reader follows anyway, so the steps are not also
 * numbered.
 *
 * Two headers inside the left canvas rather than one: the sources are a set,
 * everything after them is a sequence, and they are different kinds of thing.
 * The collector bracket between the two bands is what says the four sources
 * become one pot before anything is taken out of it.
 *
 * No figures anywhere. None of these ratios are settled in the repo, and a
 * number here would read as a commitment.
 */

const TINT = { clear: CLEAR, amber: AMBER, smoke: SMOKE };

const REVENUE = [
  'Enterprise inference & API',
  'Hey Open subscriptions',
  'Pay-as-you-go inference',
  'Agents & compute marketplace',
];

const STAGES = [
  {
    key: 'costs',
    tag: 'Taken out first',
    glyph: '▤',
    /* A list rather than a sentence: four separate obligations, and run
       together with separators they read as one line of small print. */
    lines: ['Inference costs', 'Taxes', 'HEY credits', 'Reserves'],
  },
  {
    key: 'surplus',
    tag: 'What is left',
    glyph: '◇',
    title: 'Available surplus',
    note: 'After everything above',
  },
  {
    key: 'buyback',
    tag: 'Buyback',
    glyph: '◆',
    tone: 'amber',
    title: 'Buy OPEN',
    note: 'On the open market',
  },
  {
    key: 'burn',
    tag: 'Burn',
    tone: 'smoke',
    title: 'OPEN, gone for good',
    note: 'Verifiably on chain',
  },
];

const ENTERPRISE = [
  { key: 'upfront', tone: 'clear', title: 'Pay up front', body: 'One payment for the term' },
  { key: 'reserve', tone: 'amber', title: 'Reserve credits', body: 'In advance, before usage' },
];

/* Content sits above the specular sweep, which is an ::after on the tile. */
const OVER = { position: 'relative', zIndex: 1 };

const headingOn = (onDark) => (onDark ? '#FFFFFF' : 'var(--text-heading)');
const tagOn = (onDark) => (onDark ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)');
const noteOn = (onDark) => (onDark ? 'rgba(255,255,255,0.84)' : 'var(--text-muted)');

/* A header for a band inside a canvas. One level up from a tile's tag: same
   letterform, but larger, darker, and marked, so the two do not read as the
   same kind of thing. */
function Band({ children, sx }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      <Box
        aria-hidden="true"
        sx={{ width: '5px', height: '5px', borderRadius: '1.5px', backgroundColor: ORANGE, flexShrink: 0 }}
      />
      <Typography
        sx={{ ...LABEL, fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-secondary)' }}
      >
        {children}
      </Typography>
    </Box>
  );
}

/**
 * The route between two tiles. Along the row on a wide canvas, down the column
 * on a narrow one, with the arrowhead turning to match.
 */
function Route() {
  const line = {
    flex: { md: 1 },
    width: { xs: 0, md: 'auto' },
    height: { xs: 12, md: 0 },
    borderLeft: { xs: `1.5px dashed ${DASH_C}`, md: 0 },
    borderTop: { xs: 0, md: `1.5px dashed ${DASH_C}` },
    minWidth: { md: 10 },
  };

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        flexShrink: 0,
        width: { xs: '100%', md: 24, lg: 32 },
        py: { xs: 0.8, md: 0 },
      }}
    >
      <Box sx={line} />
      <Box
        sx={{
          width: 0,
          height: 0,
          flexShrink: 0,
          borderLeft: { xs: '5px solid transparent', md: `7.5px solid ${DASH_C}` },
          borderRight: { xs: '5px solid transparent', md: 0 },
          borderTop: { xs: `7.5px solid ${DASH_C}`, md: '5px solid transparent' },
          borderBottom: { xs: 0, md: '5px solid transparent' },
        }}
      />
    </Box>
  );
}

/** One stage in the band: tag at the top, the thing itself under it. */
function Stage({ stage }) {
  const onDark = Boolean(stage.tone) && stage.tone !== 'clear';

  return (
    <Box
      sx={{
        flex: { md: '1 1 0' },
        minWidth: 0,
        display: 'flex',
        borderRadius: '20px',
        px: { xs: 1.9, md: 2 },
        py: { xs: 1.7, md: 1.9 },
        overflow: 'hidden',
        ...TINT[stage.tone || 'clear'],
      }}
    >
      <Box sx={{ ...OVER, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Typography component="div" sx={{ ...LABEL, color: tagOn(onDark) }}>
            {stage.tag}
          </Typography>
          <Box
            aria-hidden="true"
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1,
              display: 'flex',
              flexShrink: 0,
              opacity: onDark ? 0.85 : 0.4,
              color: headingOn(onDark),
            }}
          >
            {stage.key === 'burn' ? <LocalFireDepartmentRoundedIcon sx={{ fontSize: '1.1rem' }} /> : stage.glyph}
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', pt: 1.2 }}>
          {stage.lines ? (
            stage.lines.map((line) => (
              <Typography
                key={line}
                sx={{
                  fontSize: { xs: '0.92rem', md: '0.9rem', lg: '0.95rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.5,
                  color: headingOn(onDark),
                }}
              >
                {line}
              </Typography>
            ))
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.02rem', lg: '1.1rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                  color: headingOn(onDark),
                }}
              >
                {stage.title}
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: { xs: '0.76rem', md: '0.78rem' },
                  lineHeight: 1.4,
                  color: noteOn(onDark),
                }}
              >
                {stage.note}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function BurnEnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="burn" maxWidth="xl" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 3.5, md: 4.5 }, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 1.8 }}>
            Burn &amp; enterprise
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2.1rem', md: '3rem' },
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            Costs first.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Then buyback and burn.</Box>
          </Typography>
        </Box>

        {/* ---- the two canvases ---- */}
        <Box
          ref={figRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'stretch',
            gap: { xs: 2.5, md: 3 },
            ...revealSx(figShown, 120),
          }}
        >
          {/* ---- left: in, then out, in that order ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(72% - 12px)' },
              minWidth: 0,
              ...CANVAS,
              px: { xs: 2, md: 3.5 },
              py: { xs: 2.5, md: 3.5 },
            }}
          >
            <Band sx={{ mb: 1.6 }}>Revenue in</Band>

            {/* Four sources, sharing the row equally and wrapping their own
                text, so the long one does not take a row to itself. */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 1.2 } }}>
              {REVENUE.map((line) => (
                <Box
                  key={line}
                  sx={{
                    flex: { xs: '1 1 140px', md: '1 1 0' },
                    minWidth: 0,
                    borderRadius: '14px',
                    px: 1.4,
                    py: 1.3,
                    overflow: 'hidden',
                    ...CLEAR,
                  }}
                >
                  <Typography
                    sx={{
                      ...OVER,
                      fontSize: { xs: '0.8rem', md: '0.82rem' },
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: '-0.015em',
                      textAlign: 'center',
                      color: 'var(--text-heading)',
                    }}
                  >
                    {line}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* The four sources become one pot. A bracket closing downward
                says that in a way a single arrow from nowhere does not. */}
            <Box aria-hidden="true" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  alignSelf: 'stretch',
                  mx: '12%',
                  mt: '12px',
                  height: '13px',
                  borderBottom: `1.5px dashed ${DASH_C}`,
                  borderLeft: `1.5px dashed ${DASH_C}`,
                  borderRight: `1.5px dashed ${DASH_C}`,
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              />
              <Box sx={{ height: '11px', borderLeft: `1.5px dashed ${DASH_C}` }} />
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `7.5px solid ${DASH_C}`,
                }}
              />
            </Box>

            <Band sx={{ mt: 2, mb: 1.6 }}>Where it goes, in this order</Band>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'stretch', md: 'stretch' },
              }}
            >
              {STAGES.map((stage, i) => (
                <React.Fragment key={stage.key}>
                  {i > 0 && <Route />}
                  <Stage stage={stage} />
                </React.Fragment>
              ))}
            </Box>
          </Box>

          {/* ---- right: the money that never joins the route ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(28% - 12px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              ...CANVAS,
              px: { xs: 2, md: 3 },
              py: { xs: 2.5, md: 3.5 },
            }}
          >
            <Band sx={{ mb: 1.6 }}>Enterprise</Band>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {ENTERPRISE.map((item, i) => {
                const onDark = item.tone !== 'clear';
                return (
                  <React.Fragment key={item.key}>
                    {i > 0 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                        <Box aria-hidden="true" sx={{ height: '14px', borderLeft: `1.5px dashed ${DASH_C}` }} />
                        <Box
                          aria-hidden="true"
                          sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: `7.5px solid ${DASH_C}`,
                          }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        borderRadius: '18px',
                        px: { xs: 1.9, md: 2 },
                        py: { xs: 1.9, md: 2.1 },
                        overflow: 'hidden',
                        ...TINT[item.tone],
                      }}
                    >
                      <Box sx={{ ...OVER, display: 'flex', alignItems: 'center', gap: 1.8 }}>
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            flexShrink: 0,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* On the amber tile a white disc fights the body,
                               so the disc is a lighter wash of it instead. */
                            backgroundColor: onDark ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.92)',
                            boxShadow: onDark
                              ? 'inset 0 0 0 1px rgba(255,255,255,0.42), inset 0 1px 0 rgba(255,255,255,0.6)'
                              : CHIP_BEVEL,
                          }}
                        >
                          {onDark ? (
                            <Box component="span" sx={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                              $
                            </Box>
                          ) : (
                            <PaymentsRoundedIcon sx={{ fontSize: '1.45rem', color: 'var(--text-heading)' }} />
                          )}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', md: '1.06rem' },
                              fontWeight: 750,
                              letterSpacing: '-0.025em',
                              lineHeight: 1.2,
                              color: headingOn(onDark),
                              mb: 0.4,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.4, color: noteOn(onDark) }}>
                            {item.body}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
