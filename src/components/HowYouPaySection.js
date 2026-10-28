import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/context/ThemeContext';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * How you settle the bill.
 *
 * ------------------------------------------------------------------
 * Two claims arrived together and only one of them is news. Taking cards
 * and taking crypto is table stakes; a reader assumes it until told
 * otherwise. The second half is the offer: stake an asset you already hold
 * and the yield arrives as credits, so the bill is paid out of a position
 * you never spent. The accent goes on that half and nowhere else.
 *
 * ------------------------------------------------------------------
 * It has moved four times before landing here, and each move was a real
 * correction rather than a redecoration.
 *
 * A section of its own with two cards, a drawn figure and a row of payment
 * rails was a panel's worth of furniture for a reassurance. A grey line at
 * the foot of the pricing section was invisible, because nobody reaches the
 * foot. A tinted band directly under the price was seen, but it shouted,
 * and it landed in the middle of the one paragraph on that page already
 * carrying four highlighted figures. A card at the foot of the pricing
 * container read correctly but belonged to a section whose subject is the
 * comparison above it.
 *
 * So: its own section, one card, and nothing else in it. It follows the
 * price because "what does it cost" is immediately followed by "and how do
 * I pay", and it sits on the page ground rather than the section ground, so
 * that a band of plain page between two tinted neighbours is what separates
 * it. That is the whole of the design. The card itself keeps the radius,
 * hairline and soft lift every other card on this page uses, so it reads as
 * part of the site rather than as a notice stapled to it.
 *
 * ------------------------------------------------------------------
 * THE HEDGE HAS NOT BEEN REVIEWED. Staking an asset for a return is a
 * representation about money, and "rates are not fixed, nothing here is a
 * guaranteed return" is the shortest true thing that can be said about one.
 * It is inside the card and small, because it qualifies the claim rather
 * than sharing its weight.
 *
 * NO RATE APPEARS ANYWHERE, deliberately. What staked USDC, ETH or BTC
 * earns is not settled in this repo, it moves with the market, and a figure
 * on a marketing page reads as a promise.
 *
 * Nothing is said about chains, custody or lock-up, because none of that
 * was given. If a stake is custodied, or there is a minimum term, it
 * belongs on this card.
 * ------------------------------------------------------------------
 */

export default function HowYouPaySection() {
  const { isDark } = useThemeMode();
  const [ref, shown] = useReveal();

  return (
    <Box
      component="section"
      id="how-you-pay"
      sx={{
        backgroundColor: 'var(--bg-page)',
        py: { xs: 7, md: 10 },
        transition: 'background-color 0.35s ease',
        scrollMarginTop: '96px',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          ref={ref}
          sx={{
            maxWidth: 760,
            mx: 'auto',
            borderRadius: '20px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}`,
            background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
            boxShadow: isDark
              ? 'none'
              : '0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -32px rgba(15,23,42,0.18)',
            px: { xs: 2.6, md: 4 },
            py: { xs: 2.8, md: 3.2 },
            ...revealSx(shown),
          }}
        >
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isDark ? '#9CA3AF' : '#667085',
              mb: 1.3,
            }}
          >
            How you pay
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.02rem', md: '1.14rem' },
              fontWeight: 650,
              lineHeight: 1.55,
              letterSpacing: '-0.015em',
              color: isDark ? '#FFFFFF' : '#111111',
              textWrap: 'pretty',
            }}
          >
            Pay by card or crypto. Or stake{' '}
            <Box component="span" sx={{ color: '#ff6600', fontWeight: 800 }}>
              USDC, ETH or BTC
            </Box>{' '}
            and let the yield cover your credits.
          </Typography>

          <Typography sx={{ mt: 1.4, fontSize: '0.76rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            What a stake earns moves with the market. Rates are not fixed and nothing here is a
            guaranteed return.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
