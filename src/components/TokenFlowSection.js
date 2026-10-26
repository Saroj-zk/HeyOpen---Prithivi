import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { useReveal, revealSx } from '@/utils/reveal';
import { ORANGE, DASH_C, LABEL, CLEAR, AMBER, SMOKE } from '@/components/ui/glass';

/**
 * The other way to pay, as an infographic.
 *
 * Three big nodes in a row (stake, mint, earn), a strip of three supply
 * numbers, and four perks as a number or icon over one line. Almost no prose:
 * the figures do the talking. Figures come from the OpenLedger token-economics
 * proposal and are marked as proposed; the 40% APY is described there as
 * aspirational.
 */

const NODES = [
  { tone: 'amber', big: 'OPEN', title: 'Stake OPEN', sub: 'Lock it as collateral', link: 'mint' },
  { tone: 'clear', big: 'HEY', title: 'Mint HEY', sub: 'Against the stake', link: 'stake' },
  { tone: 'smoke', big: '$1', title: 'Earn credits', sub: 'Per staked HEY, every month' },
];

const SUPPLY = [
  { k: '1B', s: 'OPEN max supply' },
  { k: '2.1M', s: 'HEY target supply' },
  { k: '70M', s: 'OPEN locked at target' },
];

const PERKS = [
  { big: '40%', unit: 'APY', s: 'Stake OPEN for 6 months', note: 'Compute-market rewards', Icon: ShowChartRoundedIcon },
  { big: '40%', unit: 'APY', s: 'Run proof of inference quality', note: 'Rewards for 6 months', Icon: VerifiedOutlinedIcon },
  { big: '1,000', unit: 'OPEN', s: 'Unlock HeyChat Pro', note: 'Free uncensored models', Icon: ChatBubbleOutlineRoundedIcon },
  { big: 'YT-AI', unit: '', s: 'Stake ETH, BTC or bStocks', note: 'Yield paid as AI credits', Icon: SavingsOutlinedIcon },
];

const TONES = { amber: AMBER, clear: CLEAR, smoke: SMOKE };

function Link({ text }) {
  return (
    <Box aria-hidden="true" sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', minWidth: 90 }}>
      <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: 0.8 }}>{text}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, borderTop: `1.5px dashed ${DASH_C}` }} />
        <Box sx={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `7.5px solid ${DASH_C}` }} />
      </Box>
    </Box>
  );
}

function Node({ node }) {
  const dark = node.tone !== 'clear';
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', gap: { xs: 2.2, md: 2 }, textAlign: { xs: 'left', md: 'center' }, width: { xs: '100%', md: 190 } }}>
      <Box
        sx={{
          ...TONES[node.tone],
          width: { xs: 88, md: 150 },
          height: { xs: 88, md: 150 },
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ position: 'relative', zIndex: 1, fontSize: { xs: '1.3rem', md: '2.1rem' }, fontWeight: 800, letterSpacing: '-0.03em', color: dark ? '#fff' : 'var(--text-heading)' }}>
          {node.big}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 750, letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>{node.title}</Typography>
        <Typography sx={{ fontSize: '0.9rem', mt: 0.3, color: 'var(--text-secondary)' }}>{node.sub}</Typography>
      </Box>
    </Box>
  );
}

export default function TokenFlowSection() {
  const [headRef, headShown] = useReveal();
  const [flowRef, flowShown] = useReveal();
  const [perkRef, perkShown] = useReveal();

  return (
    <Container id="token-flow" maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box ref={headRef} sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 2 }}>
            The other way to pay
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '2.1rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-primary)', mb: 2, letterSpacing: '-0.03em', lineHeight: 1.1, textWrap: 'balance' }}
          >
            Stake OPEN. Mint HEY.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Get AI credits monthly.</Box>
          </Typography>
        </Box>

        {/* ---- the three moves ---- */}
        <Box
          ref={flowRef}
          sx={{
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-section-alt)',
            backgroundImage: 'radial-gradient(62% 82% at 16% 10%, rgba(255,150,80,0.16) 0%, transparent 62%)',
            px: { xs: 2.5, md: 6 },
            py: { xs: 3.5, md: 6 },
            ...revealSx(flowShown, 60),
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'flex-start' }, justifyContent: 'center', gap: { xs: 3, md: 0 } }}>
            {NODES.map((n, i) => (
              <React.Fragment key={n.title}>
                <Node node={n} />
                {n.link && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, height: 150, alignItems: 'center' }}>
                    <Link text={n.link} />
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>

          <Box sx={{ mt: { xs: 4, md: 6 }, pt: { xs: 3, md: 4 }, borderTop: '1px solid var(--border-normal)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, textAlign: 'center' }}>
            {SUPPLY.map((s) => (
              <Box key={s.s}>
                <Typography sx={{ fontSize: { xs: '1.7rem', md: '2.6rem' }, fontWeight: 750, letterSpacing: '-0.035em', lineHeight: 1, color: 'var(--text-heading)' }}>{s.k}</Typography>
                <Typography sx={{ fontSize: { xs: '0.72rem', md: '0.86rem' }, mt: 0.8, color: 'var(--text-secondary)' }}>{s.s}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ---- the perks ---- */}
        <Box ref={perkRef} sx={{ mt: { xs: 5, md: 8 }, ...revealSx(perkShown) }}>
          <Typography sx={{ ...LABEL, color: 'var(--text-muted)', mb: 2.5 }}>Your stake can also</Typography>
          <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' } }}>
            {PERKS.map((p) => (
              <Box key={p.s} sx={{ borderTop: `2px solid ${ORANGE}`, pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
                  <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-heading)' }}>{p.big}</Typography>
                  {p.unit && <Typography sx={{ ...LABEL, fontSize: '0.7rem', color: ORANGE }}>{p.unit}</Typography>}
                  <Box sx={{ flex: 1 }} />
                  <p.Icon sx={{ fontSize: 22, color: 'var(--text-muted)', alignSelf: 'center' }} />
                </Box>
                <Typography sx={{ fontSize: '0.98rem', fontWeight: 650, mt: 1.4, color: 'var(--text-heading)', lineHeight: 1.35 }}>{p.s}</Typography>
                <Typography sx={{ fontSize: '0.86rem', mt: 0.3, color: 'var(--text-secondary)' }}>{p.note}</Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ mt: 3, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, textWrap: 'pretty' }}>
            Proposed terms, not deployed figures and not financial advice. 40% APY is an aspirational
            case; returns could be lower or zero.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
