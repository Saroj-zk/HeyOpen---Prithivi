import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * How you pay for it, and the way out of paying.
 *
 * ------------------------------------------------------------------
 * Two claims, and only one of them is news.
 *
 * Taking cards and taking crypto is table stakes; every reader assumes it
 * until told otherwise, and a section built around it would be a section
 * about nothing. The second half is the actual offer: stake an asset you
 * already hold and the yield arrives as credits, so the bill is paid by a
 * position you never spent. That is the part that gets the headline, the
 * wider column and the drawn figure, and the rails get a card beside it.
 *
 * It sits directly under the price for the same reason the price sits third
 * on this page: the question "what does it cost" is immediately followed by
 * "and how do I pay", and answering the second somewhere else leaves a
 * reader to assume the worst about it.
 *
 * ------------------------------------------------------------------
 * What is drawn, and why it is three steps.
 *
 * Stake, earn, spend. Three nodes and two connectors, because the whole
 * argument is that something happens between the asset and the credits and
 * that the asset is still there at the end. A two-node version would read as
 * "pay with crypto", which is the other card.
 *
 * The line under it is the one a reader should leave with, so it is the only
 * tinted block in the section.
 *
 * ------------------------------------------------------------------
 * NOTHING HERE QUOTES A RATE, and that is deliberate. What staked USDC, ETH
 * or BTC earns is not settled anywhere in this repo, it moves with the
 * market, and a figure on a marketing page reads as a promise. The copy says
 * the yield arrives as credits and stops.
 *
 * THE HEDGE AT THE FOOT OF THE CARD NEEDS SIGN-OFF. Staking an asset for a
 * return is a representation about money, and "rates vary and are not
 * guaranteed" is the shortest true thing that can be said. It is not legal
 * advice and has not been reviewed.
 *
 * The three assets were given. Nothing is said about chains, custody, lock-up
 * or who holds the keys, because none of that was.
 * ------------------------------------------------------------------
 */

const ORANGE = '#ff6600';
const QUIET = 'rgba(71, 85, 105, 0.78)';
const HAIR = 'rgba(15, 23, 42, 0.1)';

const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

const PAPER = {
  position: 'relative',
  borderRadius: '24px',
  border: `1px solid ${HAIR}`,
  background: '#FFFFFF',
  boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 28px 56px -40px rgba(15,23,42,0.24)',
};

/* Drawn on one grid at one weight, like every other mark on the site. No
   card-network logos: those are other people's trademarks and this page is
   not entitled to imply a partnership it has not named. */
const PATHS = {
  card: 'M2.5 6.5A1.5 1.5 0 0 1 4 5h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 15H4a1.5 1.5 0 0 1-1.5-1.5zM2.5 8.5h15M5 12h3',
  lock: 'M6 9V6.5a4 4 0 1 1 8 0V9M4.5 9h11A1.5 1.5 0 0 1 17 10.5v6A1.5 1.5 0 0 1 15.5 18h-11A1.5 1.5 0 0 1 3 16.5v-6A1.5 1.5 0 0 1 4.5 9Z',
  rise: 'M3 15.5 7.8 10l3 2.6L17 5.5M17 5.5h-4M17 5.5v4',
  spark: 'M10 2.5 12.1 7.9 17.5 10l-5.4 2.1L10 17.5l-2.1-5.4L2.5 10l5.4-2.1z',
};

function Mark({ name, size = 20 }) {
  return (
    <Box
      component="svg"
      aria-hidden="true"
      viewBox="0 0 20 20"
      sx={{ width: size, height: size, display: 'block', flexShrink: 0 }}
    >
      <Box
        component="path"
        d={PATHS[name]}
        sx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </Box>
  );
}

/* The rails. Cards first because it is the one that needs no explaining,
   then the three assets, which are the three the stake side names. */
const RAILS = [
  { k: 'Credit and debit cards', mark: 'card' },
  { k: 'USDC', ticker: true },
  { k: 'ETH', ticker: true },
  { k: 'BTC', ticker: true },
];

const FLOW = [
  { mark: 'lock', k: 'Stake', s: 'USDC, ETH or BTC' },
  { mark: 'rise', k: 'It earns', s: 'Yield on the position' },
  { mark: 'spark', k: 'You spend', s: 'Credits, on any model' },
];

/* ------------------------------------------------------------------ */

function Node({ item }) {
  return (
    <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ORANGE,
          backgroundColor: 'rgba(255,102,0,0.09)',
          border: '1px solid rgba(255,102,0,0.24)',
        }}
      >
        <Mark name={item.mark} size={21} />
      </Box>
      <Typography
        sx={{
          mt: 1.5,
          fontSize: { xs: '1.02rem', md: '1.08rem' },
          fontWeight: 750,
          letterSpacing: '-0.025em',
          lineHeight: 1.25,
          color: '#0F172A',
        }}
      >
        {item.k}
      </Typography>
      <Typography sx={{ mt: 0.5, fontSize: '0.86rem', lineHeight: 1.5, color: QUIET }}>
        {item.s}
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function PayAndStakeSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="paying" maxWidth="xl" sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: '96px' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading, centred to pick up the price above it ---- */}
        <Box
          ref={headRef}
          sx={{ maxWidth: 820, mx: 'auto', textAlign: 'center', mb: { xs: 4, md: 5 }, ...revealSx(headShown) }}
        >
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 1.8 }}>
            How you pay
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.9rem' },
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            Pay how you like.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Or never pay at all.</Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: '1rem', md: '1.06rem' },
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              textWrap: 'pretty',
            }}
          >
            Card or crypto, whichever you already use. Or stake USDC, ETH or BTC and the yield
            arrives as credits, so the position you are already holding covers what you spend.
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
          {/* ---- the rails ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 36%' },
              minWidth: 0,
              ...PAPER,
              px: { xs: 2.2, md: 3 },
              py: { xs: 2.6, md: 3 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="div" sx={{ ...LABEL, color: QUIET }}>
              Pay directly
            </Typography>
            <Typography
              sx={{
                mt: 0.9,
                fontSize: { xs: '1.14rem', md: '1.3rem' },
                fontWeight: 750,
                letterSpacing: '-0.03em',
                lineHeight: 1.25,
                color: '#0F172A',
              }}
            >
              Card or crypto.
            </Typography>

            <Box sx={{ mt: { xs: 2, md: 2.4 }, display: 'grid', gap: 1.1 }}>
              {RAILS.map((r) => (
                <Box
                  key={r.k}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.4,
                    px: 1.6,
                    py: 1.2,
                    borderRadius: '12px',
                    border: `1px solid ${HAIR}`,
                    backgroundColor: 'rgba(15,23,42,0.015)',
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      flexShrink: 0,
                      borderRadius: '9px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: r.ticker ? '#0F172A' : ORANGE,
                      backgroundColor: r.ticker ? 'rgba(15,23,42,0.05)' : 'rgba(255,102,0,0.09)',
                      fontSize: '0.58rem',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {r.ticker ? r.k : <Mark name={r.mark} size={17} />}
                  </Box>
                  <Typography sx={{ fontSize: '0.94rem', fontWeight: 650, letterSpacing: '-0.015em', color: '#0F172A' }}>
                    {r.ticker ? `${r.k} on chain` : r.k}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              sx={{
                mt: { xs: 2, md: 'auto' },
                pt: { xs: 1.6, md: 2 },
                fontSize: '0.84rem',
                lineHeight: 1.55,
                color: QUIET,
              }}
            >
              One bill either way, and the same price whichever rail it arrives on.
            </Typography>
          </Box>

          {/* ---- or the way out of paying ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 64%' },
              minWidth: 0,
              ...PAPER,
              px: { xs: 2.2, md: 3.4 },
              py: { xs: 2.6, md: 3 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="div" sx={{ ...LABEL, color: ORANGE }}>
              Or stake instead
            </Typography>
            <Typography
              sx={{
                mt: 0.9,
                fontSize: { xs: '1.14rem', md: '1.3rem' },
                fontWeight: 750,
                letterSpacing: '-0.03em',
                lineHeight: 1.25,
                color: '#0F172A',
              }}
            >
              Keep the asset. Spend what it earns.
            </Typography>

            <Box
              sx={{
                mt: { xs: 2.4, md: 2.8 },
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: { xs: 2.2, md: 0 },
              }}
            >
              {FLOW.map((item, i) => (
                <React.Fragment key={item.k}>
                  {i > 0 && (
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        alignSelf: 'center',
                        width: { sm: '24px', md: '38px' },
                        height: '1px',
                        flexShrink: 0,
                        mx: { sm: 1.6, md: 2 },
                        mt: '-28px',
                        backgroundColor: 'rgba(255,102,0,0.4)',
                      }}
                    />
                  )}
                  <Node item={item} />
                </React.Fragment>
              ))}
            </Box>

            {/* The sentence a reader should leave with, so the only tint. */}
            <Box
              sx={{
                mt: { xs: 2.4, md: 'auto' },
                pt: { xs: 2.2, md: 2.6 },
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  flex: '1 1 100%',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,102,0,0.2)',
                  background: 'rgba(255,102,0,0.055)',
                  px: { xs: 1.6, md: 2 },
                  py: { xs: 1.3, md: 1.5 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '0.94rem', md: '1rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.5,
                    color: '#0F172A',
                    textWrap: 'pretty',
                  }}
                >
                  The stake stays yours the whole time. Unstake it and the credits simply stop.
                </Typography>
              </Box>

              <Typography sx={{ flex: '1 1 100%', mt: 0.4, fontSize: '0.78rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                What a stake earns moves with the market. Rates are not fixed and nothing here is a
                guaranteed return.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
