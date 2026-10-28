import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * The compute market, as a direction rather than a product.
 *
 * ------------------------------------------------------------------
 * What this section is for.
 *
 * The burn funnel above lists "Agents & compute marketplace" as one of four
 * revenue lines and then never mentions it again. A reader who stops on that
 * line has no idea what it means, and it is the only one of the four that is
 * not self-explanatory. This is that line, opened up.
 *
 * ------------------------------------------------------------------
 * Everything here is in the future tense, and the design has to carry that.
 *
 * None of this is running. No contracts are offered, no venue is live, and no
 * part of the staking or burn argument depends on it. A section that looked
 * like the live ones would be read as a live one, so it opens with a status
 * pill instead of the orange eyebrow every shipping section uses, and it
 * closes with a line saying plainly what has and has not been built.
 *
 * The one thing here that is NOT speculative is the precedent, which is why it
 * gets the only dark card. FalconX executed the first over-the-counter compute
 * forward on 27 May 2026 against Nvidia H100 pricing, benchmarked to the Ornn
 * Compute Price Index, with Robert Leshner as counterparty; ICE and CME are
 * both building listed compute futures. That is a third party, with a date and
 * a link, and it is the only sentence here a sceptic has to accept. Two
 * exchanges building products matters more than one trade, so both are stated.
 *
 * ------------------------------------------------------------------
 * Why a price path and not a payoff diagram.
 *
 * The instrument is an option, and the textbook way to draw one is the hockey
 * stick. That drawing is only legible to someone who already understands
 * options, which is the wrong audience: the reader here runs an AI company and
 * cares about a bill, not about convexity. So the chart is the thing they
 * already picture, a rental price wandering over a term, with a flat line
 * across it at the price they locked and the gap above it filled in. No
 * vocabulary is needed to see that the filled part is the part they do not pay.
 *
 * The path is deliberately uneven and crosses once, late. A line that shot
 * straight up would be selling a scenario.
 *
 * ------------------------------------------------------------------
 * The one place figures appear.
 *
 * $2.50/hr, 30 days, USDC. Those are tagged illustrative and they are claims
 * about the GPU rental market, not about what anything here pays a holder,
 * which is the class of number the rest of the site refuses to print. The card
 * is unreadable without them: "covers above a price you choose, for a term you
 * choose" describes nothing. IF THESE SHOULD GO, the card survives losing
 * them; the chart does not depend on them at all.
 * ------------------------------------------------------------------
 */

const ORANGE = '#ff6600';
const INK = '#141820';
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

/* The rental price over the term. Lower y is a higher price, so the line
   climbing means the bill climbing. Nothing is to scale and there is no value
   axis: the only claim the shape makes is that the price moves, and that one
   crossing is enough to matter. */
const PRICE = [
  [38, 120], [62, 114], [85, 122], [109, 109], [133, 101], [156, 107],
  [180, 94], [204, 83], [227, 70], [251, 76], [275, 59], [298, 65], [322, 52],
];

const CEILING = 86;
const BASE = 152;

/* The drawing is cropped to the band the data actually occupies. Drawn from
   y=0 the chart carried about a third of its height as empty sky above the
   highest point, which read as the card being padded rather than as headroom.
   The ceiling's position is derived from the crop rather than written down
   twice, so the HTML label over the line cannot drift from it. */
const VIEW_TOP = 36;
const VIEW_H = 124;
const CEILING_PCT = ((CEILING - VIEW_TOP) / VIEW_H) * 100;

/* Where the path first gets above the ceiling, solved on the segment that does
   it rather than guessed, so the fill starts exactly on the line. */
const CROSS = (() => {
  for (let i = 1; i < PRICE.length; i += 1) {
    const [x0, y0] = PRICE[i - 1];
    const [x1, y1] = PRICE[i];
    if (y0 >= CEILING && y1 < CEILING) {
      return x0 + ((y0 - CEILING) / (y0 - y1)) * (x1 - x0);
    }
  }
  return PRICE[0][0];
})();

const above = PRICE.filter(([, y]) => y < CEILING);

const pricePath = `M${PRICE.map(([x, y]) => `${x} ${y}`).join(' L')}`;
const coveredPath = `M${CROSS} ${CEILING} ${above
  .map(([x, y]) => `L${x} ${y}`)
  .join(' ')} L${above[above.length - 1][0]} ${CEILING} Z`;

/* Swatches are drawn, not approximated with borders, so each one is the mark
   it stands for at the size it appears in the chart. */
const KEY = [
  {
    k: 'GPU rental price',
    s: 'Moves with the market, hedged or not',
    mark: (
      <polyline
        points="2,15 7,9 12,12 18,4"
        fill="none"
        stroke="#334155"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    k: 'Your ceiling',
    s: 'The most you pay for the whole term',
    mark: (
      <line x1="2" y1="10" x2="18" y2="10" stroke={ORANGE} strokeWidth="1.6" strokeDasharray="3 3" />
    ),
  },
  {
    k: 'What the contract pays',
    s: 'Everything above the ceiling, in USDC',
    mark: (
      <>
        <rect x="2" y="7" width="16" height="9" fill="rgba(255,102,0,0.2)" />
        <line x1="2" y1="7" x2="18" y2="7" stroke={ORANGE} strokeWidth="1.6" />
      </>
    ),
  },
];

const SPEC = [
  ['Covers above', '$2.50/hr'],
  ['Term', '30 days'],
  ['Settles in', 'USDC'],
];

const FALCONX =
  'https://www.falconx.io/newsroom/falconx-executes-first-otc-compute-forward-trade';

/* ------------------------------------------------------------------ */

/**
 * The bill, with a lid on it.
 *
 * Two things here are fixed in pixels rather than in viewBox units, because
 * this chart is drawn at roughly 340px on a phone and 680px on a desktop, and
 * anything measured in user units doubles across that range. The strokes carry
 * `non-scaling-stroke`, so a hairline stays a hairline. The ceiling label is
 * HTML laid over the drawing rather than an SVG `text`, so it stays the size of
 * the other labels on the card instead of growing past them. It is placed by a
 * percentage computed from the crop, so the two cannot drift apart.
 */
function Chart() {
  return (
    <Box sx={{ mt: { xs: 2.2, md: 2.6 } }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="svg"
          viewBox={`0 ${VIEW_TOP} 340 ${VIEW_H}`}
          sx={{ width: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="coveredFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,102,0,0.34)" />
              <stop offset="100%" stopColor="rgba(255,102,0,0.08)" />
            </linearGradient>
          </defs>

          {/* the term runs along the bottom */}
          <line
            x1="38"
            y1={BASE}
            x2="322"
            y2={BASE}
            stroke="rgba(15,23,42,0.14)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* everything above the ceiling is the contract's problem */}
          <path d={coveredPath} fill="url(#coveredFill)" />

          {/* the ceiling itself */}
          <line
            x1="38"
            y1={CEILING}
            x2="322"
            y2={CEILING}
            stroke={ORANGE}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            vectorEffect="non-scaling-stroke"
          />

          {/* and the price, which does what it likes */}
          <path
            d={pricePath}
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </Box>

        {/* Rides the dashed line, wherever the crop puts it. */}
        <Typography
          component="div"
          sx={{
            ...LABEL,
            position: 'absolute',
            left: '11.2%',
            top: `${CEILING_PCT}%`,
            transform: 'translateY(-100%)',
            mt: '-5px',
            color: ORANGE,
            pointerEvents: 'none',
          }}
        >
          Your ceiling
        </Typography>
      </Box>

      <Typography component="div" sx={{ ...LABEL, color: QUIET, textAlign: 'center', mt: 0.6 }}>
        The term
      </Typography>

      <Box sx={{ mt: { xs: 2.2, md: 2.6 }, display: 'grid', gap: { xs: 1.3, md: 1.5 } }}>
        {KEY.map((item) => (
          <Box key={item.k} sx={{ display: 'flex', gap: 1.4 }}>
            <Box
              component="svg"
              aria-hidden="true"
              viewBox="0 0 20 20"
              sx={{ width: '20px', height: '20px', mt: '3px', flexShrink: 0 }}
            >
              {item.mark}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  color: '#0F172A',
                }}
              >
                {item.k}
              </Typography>
              <Typography sx={{ mt: 0.2, fontSize: '0.83rem', lineHeight: 1.45, color: QUIET }}>
                {item.s}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function ComputeMarketSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container
      id="compute-market"
      maxWidth="xl"
      sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: '96px' }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* ---- heading ---- */}
        <Box ref={headRef} sx={{ maxWidth: 840, mb: { xs: 3.5, md: 4 }, ...revealSx(headShown) }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              px: '13px',
              py: '7px',
              mb: 1.8,
              borderRadius: '999px',
              border: `1px solid ${HAIR}`,
              backgroundColor: 'rgba(15,23,42,0.035)',
            }}
          >
            <Box
              aria-hidden="true"
              sx={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ORANGE }}
            />
            <Typography component="span" sx={{ ...LABEL, color: QUIET }}>
              In development, not live
            </Typography>
          </Box>

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
            Compute has a price.{' '}
            <Box component="span" sx={{ color: ORANGE }}>Now it has a market.</Box>
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
            The largest line in an AI company&rsquo;s budget is compute, and nobody can tell them
            what it will cost next quarter. That is the kind of problem every other commodity
            solved with a contract, and compute is getting one now. A venue for those contracts is
            what we are building next.
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
          {/* ---- what price protection actually does ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(62% - 12px)' },
              minWidth: 0,
              ...PAPER,
              px: { xs: 2.2, md: 4 },
              py: { xs: 3, md: 3.5 },
            }}
          >
            <Typography component="div" sx={{ ...LABEL, color: QUIET }}>
              What price protection does
            </Typography>
            <Typography
              sx={{
                mt: 0.9,
                fontSize: { xs: '1.08rem', md: '1.22rem' },
                fontWeight: 750,
                letterSpacing: '-0.025em',
                lineHeight: 1.3,
                color: '#0F172A',
                textWrap: 'balance',
              }}
            >
              Your bill stops at the line you chose.
            </Typography>

            <Chart />
          </Box>

          {/* ---- the contract, and the proof the market is real ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(38% - 12px)' },
              minWidth: 0,
              display: 'grid',
              gap: { xs: 2.5, md: 3 },
              alignContent: 'start',
            }}
          >
            <Box sx={{ ...PAPER, px: { xs: 2.2, md: 2.8 }, py: { xs: 2.6, md: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.02rem', md: '1.08rem' },
                    fontWeight: 750,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.3,
                    color: '#0F172A',
                  }}
                >
                  H100 cost protection
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    ...LABEL,
                    flexShrink: 0,
                    px: '9px',
                    py: '4px',
                    borderRadius: '999px',
                    color: QUIET,
                    border: `1px solid ${HAIR}`,
                  }}
                >
                  Illustrative
                </Typography>
              </Box>

              <Box sx={{ mt: { xs: 1.8, md: 2.1 } }}>
                {SPEC.map(([k, v], i) => (
                  <Box
                    key={k}
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 1.5,
                      py: 1.1,
                      borderTop: i === 0 ? 'none' : `1px solid ${HAIR}`,
                    }}
                  >
                    <Typography component="span" sx={{ ...LABEL, color: QUIET }}>
                      {k}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: '0.98rem', md: '1.02rem' },
                        fontWeight: 750,
                        letterSpacing: '-0.02em',
                        color: '#0F172A',
                      }}
                    >
                      {v}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography sx={{ mt: 1.4, fontSize: '0.8rem', lineHeight: 1.45, color: QUIET }}>
                An example of the shape, not a quote. Nothing is being offered.
              </Typography>
            </Box>

            {/* The only object on this section that is not a plan. */}
            <Box
              sx={{
                borderRadius: '24px',
                border: '1px solid transparent',
                background: `linear-gradient(145deg, #262B36 0%, ${INK} 55%, #090C12 100%)`,
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 38px -24px rgba(20,24,32,0.85)',
                px: { xs: 2.2, md: 2.8 },
                py: { xs: 2.6, md: 3 },
              }}
            >
              <Typography component="div" sx={{ ...LABEL, color: 'rgba(255,255,255,0.58)' }}>
                Already traded
              </Typography>
              <Typography
                sx={{
                  mt: 0.9,
                  fontSize: { xs: '1.08rem', md: '1.2rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.3,
                  color: '#FFFFFF',
                  textWrap: 'balance',
                }}
              >
                This market is not hypothetical.
              </Typography>
              <Typography
                sx={{
                  mt: 1.3,
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.72)',
                  textWrap: 'pretty',
                }}
              >
                In May 2026 FalconX executed the first over-the-counter compute forward, written
                against Nvidia H100 pricing. ICE and CME are both building listed compute futures.
                The instrument exists. The venue is what is missing.
              </Typography>
              <Box
                component="a"
                href={FALCONX}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 1.8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: ORANGE,
                  textDecoration: 'none',
                  '&:hover': { color: '#FF8A2B' },
                }}
              >
                Read the trade announcement
                <Box component="span" aria-hidden="true">&#8599;</Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ---- and the line that keeps this section honest ---- */}
        <Typography
          sx={{
            mt: { xs: 3, md: 3.5 },
            pt: { xs: 2, md: 2.2 },
            borderTop: `1px solid ${HAIR}`,
            maxWidth: 940,
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: QUIET,
            textWrap: 'pretty',
          }}
        >
          This is the compute marketplace named in the revenue lines above. It is in development:
          no venue is open, no contract is being offered, and nothing here is a solicitation to
          trade. Staking, $HEY and the burn work exactly as described above and do not depend on
          any of it.
        </Typography>
      </Box>
    </Container>
  );
}
