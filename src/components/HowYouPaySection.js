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
 * There are two ways to pay and the section is built in two halves, because
 * that is what the thing being described actually looks like. Run together
 * as one sentence it read as a single long qualification; split, a reader
 * can see at a glance that there is a choice and which side of it is the
 * unusual one.
 *
 * The halves are not equal and the layout says so. Paying directly needs no
 * selling: everyone assumes it, so it gets the narrower card and the
 * quieter heading. Staking an asset you already hold and spending only what
 * it earns is the part nobody expects, so it gets the wider card, the
 * accent, and the sentence that closes the argument, that the position
 * stays yours.
 *
 * No icons, no chips, no figure: all three have been tried here and all
 * three turned a reassurance into a pitch.
 *
 * ------------------------------------------------------------------
 * IT IS A SECTION NOW, not a card that happens to sit on its own.
 *
 * It spent a long time as one 880px card holding a six-word eyebrow, afloat
 * in a container twice its width, with no heading of any kind. Every other
 * section on this page opens with an eyebrow, a title and a lede, so the
 * one that did not read as a notice someone had stapled on rather than as
 * part of the argument.
 *
 * The heading is where the idea now lives. "Pay for it, or let your
 * holdings pay for it" IS the proposition, and it was previously nowhere on
 * the page: a reader had to assemble it from two card titles. The halves
 * underneath are then free to be the detail rather than the pitch.
 *
 * Before that it moved five times, and each move was a real correction.
 * A section with two cards, a drawn figure and a row of payment rails was a
 * panel's worth of furniture for a reassurance. A grey line at the foot of
 * the pricing section was invisible, because nobody reaches the foot. A
 * tinted band directly under the price was seen, but it shouted, and it
 * landed in the middle of the one paragraph on that page already carrying
 * four highlighted figures. A card at the foot of the pricing container
 * read correctly but belonged to a section whose subject is the comparison
 * above it.
 *
 * It still follows the price, because "what does it cost" is immediately
 * followed by "and how do I pay", and it still sits on the page ground
 * while both neighbours sit on the section ground, so a band of plain page
 * is what separates it.
 *
 * ------------------------------------------------------------------
 * THE HEDGE HAS NOT BEEN REVIEWED. Staking an asset for a return is a
 * representation about money, and "rates are not fixed, nothing here is a
 * guaranteed return" is the shortest true thing that can be said about one.
 * It sits under a rule, across the full width, because it qualifies both
 * halves and not just the one it is nearest to.
 *
 * NO RATE APPEARS ANYWHERE, deliberately. What staked USDC, ETH or BTC
 * earns is not settled in this repo, it moves with the market, and a figure
 * on a marketing page reads as a promise.
 *
 * Nothing is said about chains, custody or lock-up, because none of that
 * was given. If a stake is custodied, or there is a minimum term, it
 * belongs in the right-hand card.
 * ------------------------------------------------------------------
 */

const ORANGE = '#ff6600';

export default function HowYouPaySection() {
  const { isDark } = useThemeMode();
  const [headRef, headShown] = useReveal();
  const [cardsRef, cardsShown] = useReveal();

  const hair = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)';
  const heading = isDark ? '#FFFFFF' : '#111111';
  const body = isDark ? '#9CA3AF' : '#667085';

  /* The two cards share everything but their tint, so the accent is the
     only thing a reader has to notice. */
  const card = (accent) => ({
    flex: accent ? { md: '1 1 62%' } : { md: '0 1 38%' },
    minWidth: 0,
    borderRadius: '20px',
    border: `1px solid ${accent ? (isDark ? 'rgba(255,102,0,0.3)' : 'rgba(255,102,0,0.22)') : hair}`,
    background: accent
      ? isDark
        ? 'linear-gradient(180deg, rgba(255,102,0,0.1) 0%, rgba(255,102,0,0.035) 100%)'
        : 'linear-gradient(180deg, #FFF8F3 0%, #FFFFFF 100%)'
      : isDark
        ? 'rgba(255,255,255,0.03)'
        : '#FFFFFF',
    boxShadow: isDark
      ? 'none'
      : accent
        ? '0 1px 2px rgba(15,23,42,0.04), 0 24px 48px -36px rgba(214,86,0,0.3)'
        : '0 1px 2px rgba(15,23,42,0.04), 0 24px 48px -36px rgba(15,23,42,0.2)',
    px: { xs: 2.6, md: 3.4 },
    py: { xs: 2.8, md: 3.2 },
  });

  const cardTitle = (accent) => ({
    fontSize: { xs: '1.14rem', md: '1.24rem' },
    fontWeight: 750,
    letterSpacing: '-0.028em',
    lineHeight: 1.3,
    color: accent ? ORANGE : heading,
  });

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
        <Box sx={{ maxWidth: 1180, mx: 'auto' }}>
          {/* ---- the proposition, which used to be nowhere ---- */}
          <Box ref={headRef} sx={{ maxWidth: 760, mb: { xs: 3.4, md: 4.2 }, ...revealSx(headShown) }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: ORANGE,
                mb: 1.8,
              }}
            >
              How you pay
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2.1rem', md: '2.8rem' },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: heading,
                textWrap: 'balance',
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>Pay for it.</Box>
              <Box component="span" sx={{ display: 'block', color: ORANGE }}>
                Or let your holdings pay for it.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2.2,
                fontSize: { xs: '1rem', md: '1.06rem' },
                lineHeight: 1.7,
                color: body,
                textWrap: 'pretty',
              }}
            >
              Two ways to cover your credits, and one of them leaves what you hold untouched.
            </Typography>
          </Box>

          {/* ---- and the two of them ---- */}
          <Box
            ref={cardsRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              gap: { xs: 2, md: 2.6 },
              ...revealSx(cardsShown, 120),
            }}
          >
            {/* the half nobody needs convincing of */}
            <Box sx={card(false)}>
              <Typography sx={cardTitle(false)}>Pay directly</Typography>
              <Typography sx={{ mt: 1.2, fontSize: '0.96rem', lineHeight: 1.7, color: body }}>
                Card or crypto, whichever you already use. One bill either way.
              </Typography>
            </Box>

            {/* and the half that is the point */}
            <Box sx={card(true)}>
              <Typography sx={cardTitle(true)}>Or stake instead</Typography>
              <Typography sx={{ mt: 1.2, fontSize: '0.96rem', lineHeight: 1.7, color: body }}>
                Stake{' '}
                <Box component="span" sx={{ color: heading, fontWeight: 750 }}>
                  USDC, ETH or BTC
                </Box>{' '}
                and the yield covers your credits. The position stays yours the whole time, and
                unstaking simply stops the credits.
              </Typography>
            </Box>
          </Box>

          {/* Across the full width, under both, because it qualifies both. */}
          <Typography
            sx={{
              mt: { xs: 2.4, md: 2.8 },
              pt: { xs: 1.8, md: 2 },
              borderTop: `1px solid ${hair}`,
              fontSize: '0.78rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
            }}
          >
            What a stake earns moves with the market. Rates are not fixed and nothing here is a
            guaranteed return.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
