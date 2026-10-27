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
 * Sits under "the other way to pay" and is drawn in the same glass: same
 * canvas, same tints, same numbered chips on dashed routing, and the same tile
 * anatomy, which is a tag at the top left, the thing itself below it, and a
 * glyph in the far corner. The two sections read as one figure in two parts
 * rather than as two diagrams that happen to share a palette.
 *
 * A funnel rather than a cycle, because the headline is about order. Revenue
 * enters at full width, costs come out first, and each step below is narrower
 * than the one above until the burn, which is the smallest tile on the page.
 *
 * The step verbs sit beside the chips rather than inside the tiles, which is
 * what uses the space either side of a funnel. Left out, the figure was a
 * narrow column of boxes with wide empty margins, and that was most of what
 * made it look cheap.
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

/* Listed as parts so the row can break between them rather than through the
   middle of "Inference costs". */
const COSTS = ['Inference costs', 'Taxes', 'HEY credits', 'Reserves'];

const ENTERPRISE = [
  { key: 'upfront', tone: 'clear', title: 'Pay up front', body: 'One payment for the term' },
  { key: 'reserve', tone: 'amber', title: 'Reserve credits', body: 'In advance, before usage' },
];

/* Content sits above the specular sweep, which is an ::after on the tile. */
const OVER = { position: 'relative', zIndex: 1 };

const onDarkText = (onDark) => (onDark ? '#FFFFFF' : 'var(--text-heading)');
const onDarkTag = (onDark) => (onDark ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)');

/**
 * A run of dashed line down to the next tile, with the step on it.
 *
 * `n` gives it a numbered chip, as in the section above. Without one it is
 * plain routing, which is what the enterprise side wants: that is a single
 * payment, not a numbered stage in a sequence.
 */
function Link({ n, verb }) {
  const seg = { width: 0, borderLeft: `1.5px dashed ${DASH_C}`, height: { xs: 12, md: 15 } };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 0.5, md: 0.8 },
      }}
    >
      <Box aria-hidden="true" sx={seg} />
      {n && (
        <Box
          sx={{
            width: { xs: 30, md: 34 },
            height: { xs: 30, md: 34 },
            borderRadius: '12px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '0.72rem', md: '0.76rem' },
            fontWeight: 800,
            color: ORANGE,
            ...CLEAR,
            boxShadow: CHIP_BEVEL,
          }}
        >
          <Box component="span" sx={OVER}>{n}</Box>
        </Box>
      )}
      <Box aria-hidden="true" sx={seg} />
      <Box
        aria-hidden="true"
        sx={{
          width: 0,
          height: 0,
          flexShrink: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7.5px solid ${DASH_C}`,
        }}
      />
      {verb && (
        /* Beside the chip on a wide panel, under the route on a narrow one.
           One element either way, so the text is never in the DOM twice. */
        <Typography
          sx={{
            position: { xs: 'static', md: 'absolute' },
            left: { md: '50%' },
            top: { md: '50%' },
            transform: { md: 'translateY(-50%)' },
            ml: { md: '30px' },
            mt: { xs: 0.7, md: 0 },
            whiteSpace: { md: 'nowrap' },
            textAlign: 'center',
            fontSize: { xs: '0.74rem', md: '0.78rem' },
            fontWeight: 600,
            color: 'var(--text-secondary)',
          }}
        >
          {verb}
        </Typography>
      )}
    </Box>
  );
}

/** One tile in the funnel: tag, the thing itself, and a glyph in the corner. */
function Node({ width, tag, glyph, tone = 'clear', children }) {
  const onDark = tone !== 'clear';

  return (
    <Box
      sx={{
        width,
        mx: 'auto',
        zIndex: 1,
        borderRadius: '20px',
        px: { xs: 1.9, md: 2.4 },
        py: { xs: 1.6, md: 1.9 },
        overflow: 'hidden',
        ...TINT[tone],
      }}
    >
      <Box sx={{ ...OVER, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="div" sx={{ ...LABEL, color: onDarkTag(onDark), mb: 0.5 }}>
            {tag}
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: { xs: '1rem', md: '1.16rem' },
              fontWeight: 750,
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              color: onDarkText(onDark),
            }}
          >
            {children}
          </Typography>
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            fontSize: '1.05rem',
            lineHeight: 1,
            flexShrink: 0,
            display: 'flex',
            opacity: onDark ? 0.85 : 0.45,
            color: onDarkText(onDark),
          }}
        >
          {glyph}
        </Box>
      </Box>
    </Box>
  );
}

export default function BurnEnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="burn" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 2 }}>
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
            gap: { xs: 3, md: 4 },
            ...revealSx(figShown, 120),
          }}
        >
          {/* ---- left: the route revenue takes ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(66.667% - 16px)' },
              minWidth: 0,
              ...CANVAS,
              px: { xs: 2, md: 5 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 2, md: 2.5 } }}>
              Revenue
            </Typography>

            {/* Four sources, sharing the row equally and wrapping their own
                text, so the long one does not take a row to itself. */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.2, md: 1.4 } }}>
              {REVENUE.map((line) => (
                <Box
                  key={line}
                  sx={{
                    flex: { xs: '1 1 140px', md: '1 1 0' },
                    minWidth: 0,
                    borderRadius: '16px',
                    px: 1.6,
                    py: 1.6,
                    overflow: 'hidden',
                    ...CLEAR,
                  }}
                >
                  <Typography
                    sx={{
                      ...OVER,
                      fontSize: { xs: '0.82rem', md: '0.86rem' },
                      fontWeight: 700,
                      lineHeight: 1.35,
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

            <Link n="1" verb="paid before anything else" />
            <Node width={{ xs: '100%', md: '84%' }} tag="Taken out first" glyph="▤">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 1, rowGap: 0.2 }}>
                {COSTS.map((cost, i) => (
                  <React.Fragment key={cost}>
                    {i > 0 && (
                      <Box component="span" aria-hidden="true" sx={{ color: 'var(--text-muted)' }}>
                        &middot;
                      </Box>
                    )}
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{cost}</Box>
                  </React.Fragment>
                ))}
              </Box>
            </Node>

            <Link n="2" verb="whatever is still there" />
            <Node width={{ xs: '92%', md: '62%' }} tag="What is left" glyph="◇">
              Available surplus
            </Node>

            <Link n="3" verb="bought on the open market" />
            <Node width={{ xs: '84%', md: '48%' }} tag="Buyback" glyph="◆" tone="amber">
              Buy OPEN
            </Node>

            <Link n="4" verb="burned, verifiably on chain" />
            <Node
              width={{ xs: '82%', md: '45%' }}
              tag="Burn"
              tone="smoke"
              glyph={<LocalFireDepartmentRoundedIcon sx={{ fontSize: '1.2rem' }} />}
            >
              OPEN, gone for good
            </Node>
          </Box>

          {/* ---- right: the money that never joins the route ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(33.333% - 16px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              ...CANVAS,
              px: { xs: 2, md: 3.5 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: { xs: 2, md: 2.5 } }}>
              Enterprise
            </Typography>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pb: { xs: 0.5, md: 1.5 },
              }}
            >
              {ENTERPRISE.map((item, i) => {
                const onDark = item.tone !== 'clear';
                return (
                  <React.Fragment key={item.key}>
                    {i > 0 && <Link verb="before a single call" />}
                    <Box
                      sx={{
                        borderRadius: '20px',
                        px: { xs: 2, md: 2.4 },
                        py: { xs: 2.2, md: 2.6 },
                        overflow: 'hidden',
                        ...TINT[item.tone],
                      }}
                    >
                      <Box sx={{ ...OVER, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: { xs: 56, md: 64 },
                            height: { xs: 56, md: 64 },
                            flexShrink: 0,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* On the amber tile a white disc would fight the
                               body, so the disc is a lighter wash of it. */
                            backgroundColor: onDark ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.92)',
                            boxShadow: onDark
                              ? 'inset 0 0 0 1px rgba(255,255,255,0.42), inset 0 1px 0 rgba(255,255,255,0.6)'
                              : CHIP_BEVEL,
                          }}
                        >
                          {onDark ? (
                            <Box
                              component="span"
                              sx={{ fontSize: { xs: '1.5rem', md: '1.7rem' }, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}
                            >
                              $
                            </Box>
                          ) : (
                            <PaymentsRoundedIcon sx={{ fontSize: { xs: '1.5rem', md: '1.7rem' }, color: 'var(--text-heading)' }} />
                          )}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: { xs: '1.02rem', md: '1.16rem' },
                              fontWeight: 750,
                              letterSpacing: '-0.025em',
                              lineHeight: 1.2,
                              color: onDarkText(onDark),
                              mb: 0.4,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: '0.78rem', md: '0.82rem' },
                              lineHeight: 1.45,
                              color: onDark ? 'rgba(255,255,255,0.86)' : 'var(--text-muted)',
                            }}
                          >
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
