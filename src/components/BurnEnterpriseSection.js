import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useReveal, revealSx } from '@/utils/reveal';
import { ORANGE, LABEL, CLEAR, AMBER, CHIP_BEVEL, CANVAS, DASH_C } from '@/components/ui/glass';
import { INK, MONO } from '@/components/ui/Ledger';

/**
 * Where the money goes, and the one way to pay that never joins the route.
 *
 * A flow diagram, like the section above it, but not the same flow diagram.
 * That one is a straight chain on paper: every node the same size, every link
 * the same, one direction. This one branches. The trunk runs left to right and
 * the costs come off it downward, which is the whole claim the headline makes,
 * and it is drawn on ink so the two are told apart before a word is read.
 *
 * The branch is why the geometry is pinned rather than flowed. The junction
 * cell spans the first two rows and draws its own elbow, so the line along the
 * trunk and the line down to the costs meet at a point instead of being two
 * separate rules that happen to be near each other. That needs a known centre,
 * so the first row has a fixed height and everything in it is centred against
 * that; TRUNK_H is therefore load bearing, not decoration.
 *
 * Below lg the branch cannot survive, so the diagram becomes a single column
 * and the costs take their place in it as a step.
 *
 * No figures anywhere. None of these ratios are settled in the repo, and a
 * number here would read as a commitment.
 */

const TRUNK_H = 180;   /* row 1: the trunk, and the centre the elbow meets.
                          Tall enough for the source node, which is the tallest
                          thing on the trunk; shorter and it hangs out of the row. */
const DROP_H = 34;     /* row 2: the gap the branch travels down through */
const JUNCTION_W = 44; /* col 2: where the trunk and the branch meet */

const DASH_INK = 'rgba(255,255,255,0.34)';

const REVENUE = [
  'Enterprise inference & API',
  'Hey Open subscriptions',
  'Pay-as-you-go inference',
  'Agents & compute marketplace',
];

const COSTS = ['Inference costs', 'Taxes', 'HEY credits', 'Reserves'];

const ENTERPRISE = [
  { key: 'upfront', title: 'Pay up front', body: 'One payment for the term' },
  { key: 'reserve', title: 'Reserve credits', body: 'In advance, before usage' },
];

/* Content sits above the specular sweep, which is an ::after on a glass tile. */
const OVER = { position: 'relative', zIndex: 1 };

const TIP = {
  width: 0,
  height: 0,
  position: 'absolute',
};

/** A node on the diagram. `tone` picks the surface; ink is the default here. */
function Node({ tag, title, lines, note, tone, icon, sx }) {
  const amber = tone === 'amber';

  return (
    <Box
      sx={{
        borderRadius: '18px',
        px: { xs: 1.8, md: 2 },
        py: { xs: 1.6, md: 1.8 },
        overflow: 'hidden',
        ...(amber
          ? AMBER
          : {
              position: 'relative',
              backgroundColor: 'rgba(255,255,255,0.055)',
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.14)',
            }),
        ...sx,
      }}
    >
      <Box sx={{ ...OVER, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="div"
            sx={{ ...LABEL, color: amber ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.46)', mb: 0.9 }}
          >
            {tag}
          </Typography>

          {lines ? (
            lines.map((line) => (
              <Typography
                key={line}
                sx={{
                  fontFamily: MONO,
                  fontSize: { xs: '0.78rem', md: '0.8rem' },
                  lineHeight: 1.65,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255,255,255,0.84)',
                }}
              >
                {line}
              </Typography>
            ))
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: { xs: '1.02rem', md: '1.1rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                  color: '#FFFFFF',
                }}
              >
                {title}
              </Typography>
              {note && (
                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: MONO,
                    fontSize: '0.71rem',
                    lineHeight: 1.4,
                    color: amber ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {note}
                </Typography>
              )}
            </>
          )}
        </Box>
        {icon && <Box sx={{ flexShrink: 0, display: 'flex', mt: '-2px' }}>{icon}</Box>}
      </Box>
    </Box>
  );
}

/** A plain link along the trunk, at lg. */
function Along() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
        height: '10px',
      }}
    >
      <Box sx={{ flex: 1, borderTop: `1.5px dashed ${DASH_INK}` }} />
      <Box
        sx={{
          ...TIP,
          right: '-1px',
          top: '50%',
          mt: '-5px',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: `7.5px solid ${DASH_INK}`,
        }}
      />
    </Box>
  );
}

/** A link down the column, below lg. */
function Down() {
  return (
    <Box
      aria-hidden="true"
      sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: 'column', alignItems: 'center', py: 1 }}
    >
      <Box sx={{ height: '14px', borderLeft: `1.5px dashed ${DASH_INK}` }} />
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7.5px solid ${DASH_INK}`,
        }}
      />
    </Box>
  );
}

export default function BurnEnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  const trunkNode = { alignSelf: { lg: 'center' } };

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
          {/* ---- the diagram ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(70% - 12px)' },
              minWidth: 0,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              backgroundColor: INK,
              /* One ember, in the corner the burn ends in. */
              backgroundImage:
                'radial-gradient(56% 74% at 90% 94%, rgba(255,102,0,0.20) 0%, transparent 62%)',
              px: { xs: 2.2, md: 3.5 },
              py: { xs: 2.8, md: 3.5 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', lg: 'grid' },
                flexDirection: { xs: 'column' },
                gridTemplateColumns: {
                  lg: `minmax(0, 1.55fr) ${JUNCTION_W}px minmax(0, 0.95fr) 30px minmax(0, 0.88fr) 30px minmax(0, 1fr)`,
                },
                gridTemplateRows: { lg: `${TRUNK_H}px ${DROP_H}px auto` },
              }}
            >
              {/* source */}
              <Box sx={{ gridColumn: { lg: 1 }, gridRow: { lg: 1 }, ...trunkNode }}>
                <Node tag="Revenue in" lines={REVENUE} />
              </Box>

              {/* the junction: trunk out to the right, branch down to the
                  costs. One element so the two meet at a point. */}
              <Box
                aria-hidden="true"
                sx={{
                  display: { xs: 'none', lg: 'block' },
                  gridColumn: 2,
                  gridRow: '1 / 3',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${TRUNK_H / 2}px`,
                    borderTop: `1.5px dashed ${DASH_INK}`,
                  }}
                />
                <Box
                  sx={{
                    ...TIP,
                    right: '-1px',
                    top: `${TRUNK_H / 2 - 5}px`,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: `7.5px solid ${DASH_INK}`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: `${TRUNK_H / 2}px`,
                    bottom: 0,
                    borderLeft: `1.5px dashed ${DASH_INK}`,
                  }}
                />
                <Box
                  sx={{
                    ...TIP,
                    left: '50%',
                    ml: '-5px',
                    bottom: '-1px',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: `7.5px solid ${DASH_INK}`,
                  }}
                />
              </Box>

              <Down />
              <Box sx={{ gridColumn: { lg: '2 / 6' }, gridRow: { lg: 3 }, pt: { lg: 0 } }}>
                <Node tag="Taken out first" lines={COSTS} />
              </Box>

              <Down />
              <Box sx={{ gridColumn: { lg: 3 }, gridRow: { lg: 1 }, ...trunkNode }}>
                <Node tag="What is left" title="Available surplus" note="After everything above" />
              </Box>

              <Box sx={{ gridColumn: { lg: 4 }, gridRow: { lg: 1 } }}>
                <Along />
              </Box>
              <Down />
              <Box sx={{ gridColumn: { lg: 5 }, gridRow: { lg: 1 }, ...trunkNode }}>
                <Node tag="Buyback" title="Buy OPEN" note="On the open market" tone="amber" />
              </Box>

              <Box sx={{ gridColumn: { lg: 6 }, gridRow: { lg: 1 } }}>
                <Along />
              </Box>
              <Down />
              <Box sx={{ gridColumn: { lg: 7 }, gridRow: { lg: 1 }, ...trunkNode }}>
                <Node
                  tag="Burn"
                  title="OPEN, gone for good"
                  note="Verifiably on chain"
                  icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: '1.15rem', color: ORANGE }} />}
                />
              </Box>
            </Box>
          </Box>

          {/* ---- the money that never joins the route ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(30% - 12px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              ...CANVAS,
              px: { xs: 2, md: 3 },
              py: { xs: 2.8, md: 3.5 },
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)' }}>Enterprise</Typography>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: 2 }}>
              {ENTERPRISE.map((item, i) => (
                <React.Fragment key={item.key}>
                  {i > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1.2 }}>
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
                      py: { xs: 1.9, md: 2 },
                      overflow: 'hidden',
                      ...CLEAR,
                    }}
                  >
                    <Box sx={{ ...OVER, display: 'flex', alignItems: 'center', gap: 1.8 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          flexShrink: 0,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255,255,255,0.92)',
                          boxShadow: CHIP_BEVEL,
                        }}
                      >
                        {item.key === 'reserve' ? (
                          <Box component="span" sx={{ fontSize: '1.4rem', fontWeight: 800, color: ORANGE, lineHeight: 1 }}>
                            $
                          </Box>
                        ) : (
                          <PaymentsRoundedIcon sx={{ fontSize: '1.4rem', color: 'var(--text-heading)' }} />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: { xs: '1rem', md: '1.06rem' },
                            fontWeight: 750,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.2,
                            color: 'var(--text-heading)',
                            mb: 0.4,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: MONO, fontSize: '0.72rem', lineHeight: 1.4, color: 'var(--text-muted)' }}
                        >
                          {item.body}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
