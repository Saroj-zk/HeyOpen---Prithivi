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
 * There are two ways to pay and the card is built in two halves, because
 * that is what the thing being described actually looks like. Run together
 * as one sentence it read as a single long qualification; split, a reader
 * can see at a glance that there is a choice and which side of it is the
 * unusual one.
 *
 * The halves are not equal and the layout says so. Paying directly needs no
 * selling: everyone assumes it, so it gets the narrower column and the
 * quieter heading. Staking an asset you already hold and spending only what
 * it earns is the part nobody expects, so it gets the wider column, the
 * accent on its heading and the sentence that closes the argument, that the
 * position stays yours.
 *
 * One rule between them. A vertical hairline on a desktop, a horizontal one
 * on a phone where the halves stack, which is the whole of the ornament.
 * No icons, no chips, no figure: all three have been tried here and all
 * three turned a reassurance into a pitch.
 *
 * ------------------------------------------------------------------
 * It has moved five times before landing in a section of its own, and each
 * move was a real correction rather than a redecoration.
 *
 * A section with two cards, a drawn figure and a row of payment rails was a
 * panel's worth of furniture for a reassurance. A grey line at the foot of
 * the pricing section was invisible, because nobody reaches the foot. A
 * tinted band directly under the price was seen, but it shouted, and it
 * landed in the middle of the one paragraph on that page already carrying
 * four highlighted figures. A card at the foot of the pricing container
 * read correctly but belonged to a section whose subject is the comparison
 * above it.
 *
 * So: its own section, one card, nothing else in it. It follows the price
 * because "what does it cost" is immediately followed by "and how do I
 * pay", and it sits on the page ground while both neighbours sit on the
 * section ground, so a band of plain page is what separates it. The card
 * keeps the radius, hairline and soft lift every other card on this page
 * uses, so it reads as part of the site rather than as a notice stapled to
 * it.
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
 * belongs in the right-hand column.
 * ------------------------------------------------------------------
 */

const ORANGE = '#ff6600';

export default function HowYouPaySection() {
  const { isDark } = useThemeMode();
  const [ref, shown] = useReveal();

  const hair = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)';
  const heading = isDark ? '#FFFFFF' : '#111111';
  const body = isDark ? '#9CA3AF' : '#667085';

  const EYEBROW = {
    fontSize: '0.68rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  };

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
            maxWidth: 880,
            mx: 'auto',
            borderRadius: '22px',
            border: `1px solid ${hair}`,
            background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
            boxShadow: isDark
              ? 'none'
              : '0 1px 2px rgba(15,23,42,0.04), 0 24px 48px -36px rgba(15,23,42,0.2)',
            px: { xs: 2.6, md: 4 },
            py: { xs: 3, md: 3.6 },
            ...revealSx(shown),
          }}
        >
          <Typography sx={{ ...EYEBROW, color: body, mb: { xs: 2.4, md: 2.8 } }}>
            How you pay
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              gap: { xs: 2.6, md: 4.5 },
            }}
          >
            {/* ---- the half nobody needs convincing of ---- */}
            <Box sx={{ flex: { md: '0 1 34%' }, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.08rem', md: '1.14rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.3,
                  color: heading,
                }}
              >
                Pay directly
              </Typography>
              <Typography sx={{ mt: 1, fontSize: '0.92rem', lineHeight: 1.65, color: body }}>
                Card or crypto, whichever you already use. One bill either way.
              </Typography>
            </Box>

            {/* ---- and the half that is the point ---- */}
            <Box
              sx={{
                flex: { md: '1 1 66%' },
                minWidth: 0,
                borderLeft: { md: `1px solid ${hair}` },
                borderTop: { xs: `1px solid ${hair}`, md: 'none' },
                pl: { md: 4.5 },
                pt: { xs: 2.6, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.08rem', md: '1.14rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.3,
                  color: ORANGE,
                }}
              >
                Or stake instead
              </Typography>
              <Typography sx={{ mt: 1, fontSize: '0.92rem', lineHeight: 1.65, color: body }}>
                Stake{' '}
                <Box component="span" sx={{ color: heading, fontWeight: 750 }}>
                  USDC, ETH or BTC
                </Box>{' '}
                and the yield covers your credits. The position stays yours the whole time, and
                unstaking simply stops the credits.
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: { xs: 2.6, md: 3 },
              pt: { xs: 2, md: 2.2 },
              borderTop: `1px solid ${hair}`,
              fontSize: '0.76rem',
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
