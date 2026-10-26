import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { useReveal, revealSx } from '@/utils/reveal';
import { ORANGE, DASH_C, LABEL, CLEAR, AMBER, SMOKE } from '@/components/ui/glass';

/**
 * Buyback and burn, as a funnel.
 *
 * Four revenue streams across the top; each band below is narrower than the
 * last, because each step takes something away: costs and reserves first,
 * then only the surplus buys OPEN, then the OPEN is burned. Band widths show
 * order, not amounts: none are specified. Enterprise is a short pair of
 * nodes beside it.
 */

const SOURCES = ['Enterprise inference & API', 'OpenChat subscriptions', 'Pay-as-you-go inference', 'Agents & compute marketplace'];

const BANDS = [
  { w: '78%', tone: 'clear', label: 'Taken out first', text: 'Inference costs · Taxes · HEY credits · Reserves' },
  { w: '56%', tone: 'clear', label: 'What is left', text: 'Available surplus' },
  { w: '38%', tone: 'amber', label: 'Buyback', text: 'Buy OPEN' },
];

const TONES = { clear: CLEAR, amber: AMBER, smoke: SMOKE };

const arrow = {
  content: '""',
  position: 'absolute',
  bottom: -1,
  left: '-5.5px',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderTop: `7.5px solid ${DASH_C}`,
};

function Drop() {
  return (
    <Box aria-hidden="true" sx={{ height: 26, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ height: '100%', borderLeft: `1.5px dashed ${DASH_C}`, position: 'relative', '&::after': arrow }} />
    </Box>
  );
}

function Band({ band }) {
  const dark = band.tone !== 'clear';
  return (
    <Box
      sx={{
        ...TONES[band.tone],
        width: { xs: '100%', md: band.w },
        mx: 'auto',
        borderRadius: '18px',
        px: 2.4,
        py: { xs: 1.8, md: 2.2 },
        textAlign: 'center',
      }}
    >
      <Typography sx={{ ...LABEL, position: 'relative', zIndex: 1, color: dark ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)' }}>{band.label}</Typography>
      <Typography sx={{ position: 'relative', zIndex: 1, mt: 0.6, fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 750, letterSpacing: '-0.02em', lineHeight: 1.25, color: dark ? '#fff' : 'var(--text-heading)' }}>
        {band.text}
      </Typography>
    </Box>
  );
}

export default function RevenueBurnSection() {
  const [headRef, headShown] = useReveal();
  const [bodyRef, bodyShown] = useReveal();

  return (
    <Container id="revenue-burn" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 2 }}>
            Burn &amp; enterprise
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '2.1rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-primary)', mb: 2, letterSpacing: '-0.03em', lineHeight: 1.1, textWrap: 'balance' }}
          >
            Costs first.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Then buyback and burn.</Box>
          </Typography>
        </Box>

        <Box
          ref={bodyRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: { xs: 2.5, lg: 3 },
            ...revealSx(bodyShown, 60),
          }}
        >
          {/* ---- the funnel ---- */}
          <Box
            sx={{
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-section-alt)',
              backgroundImage: 'radial-gradient(62% 82% at 16% 10%, rgba(255,150,80,0.16) 0%, transparent 62%)',
              px: { xs: 2, md: 5 },
              py: { xs: 3, md: 4.5 },
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', textAlign: 'center', mb: 1.6 }}>Revenue</Typography>
            <Box sx={{ display: 'grid', gap: 1.2, gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
              {SOURCES.map((t) => (
                <Box key={t} sx={{ ...CLEAR, borderRadius: '14px', px: 1.6, py: 1.6, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 64 }}>
                  <Typography sx={{ position: 'relative', zIndex: 1, fontSize: '0.84rem', fontWeight: 650, lineHeight: 1.3, color: 'var(--text-heading)' }}>{t}</Typography>
                </Box>
              ))}
            </Box>

            {BANDS.map((b) => (
              <React.Fragment key={b.label}>
                <Drop />
                <Band band={b} />
              </React.Fragment>
            ))}

            <Drop />
            <Box sx={{ ...SMOKE, width: { xs: '100%', md: '26%' }, minWidth: { md: 250 }, mx: 'auto', borderRadius: '18px', px: 2, py: { xs: 1.8, md: 2.2 }, textAlign: 'center' }}>
              <LocalFireDepartmentOutlinedIcon sx={{ position: 'relative', zIndex: 1, fontSize: 26, color: '#fff' }} />
              <Typography sx={{ ...LABEL, position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.88)', mt: 0.4 }}>Burn</Typography>
              <Typography sx={{ position: 'relative', zIndex: 1, mt: 0.4, fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 750, letterSpacing: '-0.02em', color: '#fff' }}>OPEN, gone for good</Typography>
            </Box>
          </Box>

          {/* ---- enterprise ---- */}
          <Box
            sx={{
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-section-alt)',
              backgroundImage: 'radial-gradient(70% 60% at 50% 0%, rgba(255,150,80,0.16) 0%, transparent 70%)',
              px: { xs: 2, md: 3 },
              py: { xs: 3, md: 4.5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: 1.6 }}>Enterprise</Typography>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Box sx={{ ...CLEAR, width: 128, height: 128, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PaymentsOutlinedIcon sx={{ position: 'relative', zIndex: 1, fontSize: 52, color: 'var(--text-heading)' }} />
              </Box>
              <Typography sx={{ mt: 1.8, fontSize: '1.3rem', fontWeight: 750, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>Pay up front</Typography>
              <Typography sx={{ fontSize: '0.9rem', mt: 0.3, color: 'var(--text-secondary)' }}>One payment for the term</Typography>

              <Box aria-hidden="true" sx={{ height: 44, my: 1.6, borderLeft: `1.5px dashed ${DASH_C}`, position: 'relative', '&::after': arrow }} />

              <Box sx={{ ...AMBER, width: 128, height: 128, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ position: 'relative', zIndex: 1, fontSize: '2.4rem', fontWeight: 800, color: '#fff' }}>$</Typography>
              </Box>
              <Typography sx={{ mt: 1.8, fontSize: '1.3rem', fontWeight: 750, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>Reserve credits</Typography>
              <Typography sx={{ fontSize: '0.9rem', mt: 0.3, color: 'var(--text-secondary)' }}>In advance, before usage</Typography>
            </Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 2.5, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, textWrap: 'pretty' }}>
          Revenue is not profit, and a buyback budget is not an executed buyback. There is no assurance
          that future revenue will support buybacks. Illustrative proposal.
        </Typography>
      </Box>
    </Container>
  );
}
