import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * Where the money goes, and the one way to pay that skips the loop entirely.
 *
 * Sits under "the other way to pay", which explains how a holder gets credits
 * without spending. This answers the question that follows: what happens to
 * the money people do spend. The order matters, and the headline says it, so
 * the diagram is built as a funnel rather than a cycle. Costs come out at full
 * width, each step below is narrower than the one above it, and the burn is
 * the smallest box on the page. Nothing here promises a figure, because none
 * of the ratios are settled anywhere in the repo.
 *
 * Two panels rather than one, in a 2:1 split: the left is the revenue funnel,
 * the right is enterprise, which pays up front and so never enters the funnel
 * at the top. Below lg they stack.
 *
 * The separator dots in the costs row are their own elements, not characters
 * inside the string, so a narrow screen breaks the line at a dot instead of
 * through the middle of "Inference costs".
 */

const ORANGE = '#ff6600';
const INK = '#141820';
const DASH = 'rgba(15, 23, 42, 0.34)';

const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/* Both outer panels. Warm at the top left, cooling across, which is the only
   thing separating them from the page behind. */
const PANEL = {
  borderRadius: '24px',
  border: '1px solid var(--border-subtle)',
  background: 'linear-gradient(152deg, #F7F2EE 0%, #F2F4F7 42%, #EAEEF3 100%)',
  px: { xs: 2.5, md: 4 },
  py: { xs: 3.5, md: 5 },
};

const CARD_SHADOW =
  '0 1px 2px rgba(15,23,42,0.05), 0 14px 28px -18px rgba(15,23,42,0.28)';

/** A step in the funnel. Plain is white, buyback is orange, burn is near black. */
const TONE = {
  plain: { bg: '#FFFFFF', label: 'var(--text-muted)', title: INK },
  orange: {
    bg: `linear-gradient(135deg, #FF7A1A 0%, ${ORANGE} 55%, #EC5E00 100%)`,
    label: 'rgba(255,255,255,0.78)',
    title: '#FFFFFF',
  },
  ink: {
    bg: `linear-gradient(135deg, #20242D 0%, ${INK} 60%, #0C0F15 100%)`,
    label: 'rgba(255,255,255,0.6)',
    title: '#FFFFFF',
  },
};

/* Costs are listed as parts so the row can break between them. */
const COSTS = ['Inference costs', 'Taxes', 'HEY credits', 'Reserves'];

const REVENUE = [
  'Enterprise inference & API',
  'Hey Open subscriptions',
  'Pay-as-you-go inference',
  'Agents & compute marketplace',
];

const ENTERPRISE = [
  {
    key: 'upfront',
    tone: 'light',
    title: 'Pay up front',
    body: 'One payment for the term',
  },
  {
    key: 'reserve',
    tone: 'orange',
    title: 'Reserve credits',
    body: 'In advance, before usage',
  },
];

function Arrow({ tight }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: tight ? 0.6 : 1,
      }}
    >
      <Box sx={{ height: tight ? '18px' : '26px', borderLeft: `1.5px dashed ${DASH}` }} />
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `6px solid ${DASH}`,
        }}
      />
    </Box>
  );
}

function Step({ width, label, tone = 'plain', icon, children }) {
  const t = TONE[tone];
  return (
    <Box
      sx={{
        width,
        mx: 'auto',
        borderRadius: '16px',
        background: t.bg,
        boxShadow: CARD_SHADOW,
        px: { xs: 2, md: 3 },
        py: { xs: 1.8, md: 2.2 },
        textAlign: 'center',
      }}
    >
      {icon && (
        <LocalFireDepartmentRoundedIcon
          sx={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.92)', display: 'block', mx: 'auto', mb: 0.4 }}
        />
      )}
      <Typography component="div" sx={{ ...LABEL, color: t.label, mb: 0.7 }}>
        {label}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 700,
          letterSpacing: '-0.015em',
          lineHeight: 1.3,
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

        {/* ---- the two panels ---- */}
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
          {/* ---- left: the funnel ---- */}
          <Box sx={{ flex: { lg: '1 1 calc(66.667% - 16px)' }, minWidth: 0, ...PANEL }}>
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', textAlign: 'center', mb: 2.5 }}>
              Revenue
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 1.2, md: 1.5 },
              }}
            >
              {REVENUE.map((line) => (
                <Box
                  key={line}
                  sx={{
                    flex: { xs: '1 1 140px', md: '1 1 0' },
                    minWidth: 0,
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: CARD_SHADOW,
                    px: 1.5,
                    py: 1.6,
                    textAlign: 'center',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: INK,
                  }}
                >
                  {line}
                </Box>
              ))}
            </Box>

            <Arrow />
            <Step width={{ xs: '100%', md: '78%' }} label="Taken out first">
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
                      <Box component="span" aria-hidden="true" sx={{ color: 'var(--text-muted)' }}>
                        &middot;
                      </Box>
                    )}
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{cost}</Box>
                  </React.Fragment>
                ))}
              </Box>
            </Step>

            <Arrow />
            <Step width={{ xs: '90%', md: '56%' }} label="What is left">
              Available surplus
            </Step>

            <Arrow />
            <Step width={{ xs: '80%', md: '40%' }} label="Buyback" tone="orange">
              Buy OPEN
            </Step>

            <Arrow />
            <Step width={{ xs: '78%', md: '36%' }} label="Burn" tone="ink" icon>
              OPEN, gone for good
            </Step>
          </Box>

          {/* ---- right: enterprise, which never enters the funnel ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(33.333% - 16px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              ...PANEL,
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', textAlign: 'center', mb: 2.5 }}>
              Enterprise
            </Typography>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 1, md: 2 },
              }}
            >
              {ENTERPRISE.map((item, i) => (
                <React.Fragment key={item.key}>
                  {i > 0 && <Arrow />}
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: { xs: 86, md: 104 },
                        height: { xs: 86, md: 104 },
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                          item.tone === 'orange' ? TONE.orange.bg : '#FFFFFF',
                        boxShadow:
                          item.tone === 'orange'
                            ? '0 18px 36px -18px rgba(236,94,0,0.65), 0 1px 2px rgba(15,23,42,0.06)'
                            : CARD_SHADOW,
                      }}
                    >
                      {item.tone === 'orange' ? (
                        <Box
                          component="span"
                          sx={{
                            fontSize: { xs: '2rem', md: '2.4rem' },
                            fontWeight: 800,
                            color: '#FFFFFF',
                            lineHeight: 1,
                          }}
                        >
                          $
                        </Box>
                      ) : (
                        <PaymentsRoundedIcon sx={{ fontSize: { xs: '2rem', md: '2.3rem' }, color: INK }} />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.05rem', md: '1.2rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        mb: 0.6,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.body}
                    </Typography>
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
