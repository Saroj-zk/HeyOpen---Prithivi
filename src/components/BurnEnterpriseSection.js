import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * Where the money goes, and the one way to pay that never joins the route.
 *
 * Built to the supplied reference: two light panels in a 2:1 split, the left
 * one a funnel that narrows at every step from the four revenue sources down
 * to the burn, the right one the enterprise route, which is paid up front and
 * so never enters the funnel at the top. Everything is centred on one axis and
 * the connectors are dashed with a plain arrowhead.
 *
 * It is deliberately not drawn in the glass the section above uses. That one
 * is a horizontal chain of square tiles with numbered markers, and borrowing
 * its surface as well as its palette gave the page the same figure twice. This
 * one stays flat and quiet, and takes its weight from the taper, the type and
 * the shadows rather than from a bevel.
 *
 * The taper is the argument, so the widths are deliberate rather than whatever
 * the content happens to need: every band is narrower than the one above it,
 * the orange narrower again, and the burn is the smallest thing on the page.
 *
 * No figures anywhere. None of these ratios are settled in the repo, and a
 * number here would read as a commitment.
 */

const ORANGE = '#ff6600';
const INK = '#141820';
const DASH = 'rgba(15, 23, 42, 0.32)';
const QUIET = 'rgba(71, 85, 105, 0.72)';

const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/* The two panels. Warm at the top left, cooling across, which is all that
   separates them from the page behind. */
const PANEL = {
  position: 'relative',
  borderRadius: '24px',
  border: '1px solid rgba(15,23,42,0.06)',
  background: 'linear-gradient(152deg, #F8F3EF 0%, #F2F4F7 44%, #EAEEF3 100%)',
  boxShadow: '0 1px 2px rgba(15,23,42,0.03), 0 30px 60px -40px rgba(15,23,42,0.28)',
  overflow: 'hidden',
};

/* One shadow for everything that sits on a panel: a hairline to hold the edge,
   a tight contact shadow, and a long soft one for lift. The inset highlight
   along the top is what keeps a flat white card from going chalky. */
const LIFT =
  'inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 1px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.05), 0 16px 30px -20px rgba(15,23,42,0.30)';

const TONE = {
  plain: {
    background: 'linear-gradient(170deg, #FFFFFF 0%, #FDFDFE 60%, #F7F9FC 100%)',
    boxShadow: LIFT,
    label: QUIET,
    title: '#0F172A',
  },
  orange: {
    background: `linear-gradient(145deg, #FF8A2B 0%, ${ORANGE} 52%, #E85900 100%)`,
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(15,23,42,0.06), 0 20px 36px -22px rgba(232,89,0,0.75)',
    label: 'rgba(255,255,255,0.78)',
    title: '#FFFFFF',
  },
  ink: {
    background: `linear-gradient(145deg, #262B36 0%, ${INK} 55%, #090C12 100%)`,
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 2px rgba(15,23,42,0.08), 0 22px 40px -24px rgba(20,24,32,0.8)',
    label: 'rgba(255,255,255,0.55)',
    title: '#FFFFFF',
  },
};

const REVENUE = [
  'Enterprise inference & API',
  'Hey Open subscriptions',
  'Pay-as-you-go inference',
  'Agents & compute marketplace',
];

/* Listed as parts so a narrow screen breaks the line at a separator rather
   than through the middle of "Inference costs". */
const COSTS = ['Inference costs', 'Taxes', 'HEY credits', 'Reserves'];

const ENTERPRISE = [
  { key: 'upfront', tone: 'plain', title: 'Pay up front', body: 'One payment for the term' },
  { key: 'reserve', tone: 'orange', title: 'Reserve credits', body: 'In advance, before usage' },
];

function Arrow() {
  return (
    <Box
      aria-hidden="true"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 0.6, md: 0.7 } }}
    >
      <Box sx={{ height: { xs: 15, md: 17 }, borderLeft: `1.5px dashed ${DASH}` }} />
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${DASH}`,
        }}
      />
    </Box>
  );
}

/** One band of the funnel. */
function Band({ width, label, tone = 'plain', icon, children }) {
  const t = TONE[tone];

  return (
    <Box
      sx={{
        width,
        mx: 'auto',
        borderRadius: '18px',
        px: { xs: 2, md: 3 },
        py: { xs: 1.6, md: 1.9 },
        textAlign: 'center',
        background: t.background,
        boxShadow: t.boxShadow,
      }}
    >
      {icon}
      <Typography component="div" sx={{ ...LABEL, color: t.label, mb: 0.7 }}>
        {label}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 750,
          letterSpacing: '-0.025em',
          lineHeight: 1.25,
          color: t.title,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export default function BurnEnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="burn" maxWidth="xl" sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 3.5, md: 4 }, ...revealSx(headShown) }}>
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

        {/* ---- the two panels ---- */}
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
          {/* ---- left: the funnel ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(66.667% - 12px)' },
              minWidth: 0,
              ...PANEL,
              px: { xs: 2, md: 4 },
              py: { xs: 3, md: 3.5 },
            }}
          >
            <Typography sx={{ ...LABEL, color: QUIET, textAlign: 'center', mb: { xs: 2, md: 2.5 } }}>
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
                    borderRadius: '14px',
                    px: 1.6,
                    py: 1.5,
                    textAlign: 'center',
                    background: TONE.plain.background,
                    boxShadow: LIFT,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.82rem', md: '0.86rem' },
                      fontWeight: 700,
                      lineHeight: 1.35,
                      letterSpacing: '-0.015em',
                      color: '#0F172A',
                    }}
                  >
                    {line}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Arrow />
            <Band width={{ xs: '100%', md: '80%' }} label="Taken out first">
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: 1,
                  rowGap: 0.2,
                }}
              >
                {COSTS.map((cost, i) => (
                  <React.Fragment key={cost}>
                    {i > 0 && (
                      <Box component="span" aria-hidden="true" sx={{ color: 'rgba(71,85,105,0.5)' }}>
                        &middot;
                      </Box>
                    )}
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{cost}</Box>
                  </React.Fragment>
                ))}
              </Box>
            </Band>

            <Arrow />
            <Band width={{ xs: '90%', md: '58%' }} label="What is left">
              Available surplus
            </Band>

            <Arrow />
            <Band width={{ xs: '80%', md: '42%' }} label="Buyback" tone="orange">
              Buy OPEN
            </Band>

            <Arrow />
            <Band
              width={{ xs: '78%', md: '34%' }}
              label="Burn"
              tone="ink"
              icon={
                <LocalFireDepartmentRoundedIcon
                  sx={{ fontSize: '1.2rem', color: ORANGE, display: 'block', mx: 'auto', mb: 0.4 }}
                />
              }
            >
              OPEN, gone for good
            </Band>
          </Box>

          {/* ---- right: enterprise ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(33.333% - 12px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              ...PANEL,
              px: { xs: 2, md: 3 },
              py: { xs: 3, md: 3.5 },
            }}
          >
            <Typography sx={{ ...LABEL, color: QUIET, textAlign: 'center', mb: { xs: 2, md: 2.5 } }}>
              Enterprise
            </Typography>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pb: { xs: 0.5, md: 1 },
              }}
            >
              {ENTERPRISE.map((item, i) => {
                const orange = item.tone === 'orange';
                return (
                  <React.Fragment key={item.key}>
                    {i > 0 && <Arrow />}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: { xs: 88, md: 100 },
                          height: { xs: 88, md: 100 },
                          mx: 'auto',
                          mb: 1.8,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: orange ? TONE.orange.background : TONE.plain.background,
                          boxShadow: orange ? TONE.orange.boxShadow : LIFT,
                        }}
                      >
                        {orange ? (
                          <Box
                            component="span"
                            sx={{ fontSize: { xs: '2rem', md: '2.25rem' }, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}
                          >
                            $
                          </Box>
                        ) : (
                          <PaymentsRoundedIcon sx={{ fontSize: { xs: '2rem', md: '2.2rem' }, color: '#0F172A' }} />
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { xs: '1.05rem', md: '1.18rem' },
                          fontWeight: 750,
                          letterSpacing: '-0.025em',
                          color: '#0F172A',
                          mb: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.86rem', md: '0.9rem' }, lineHeight: 1.5, color: 'rgba(71,85,105,0.9)' }}>
                        {item.body}
                      </Typography>
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
