import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * Compute options, and what the business earns from them.
 *
 * ------------------------------------------------------------------
 * IT NO LONGER RENDERS AS A SECTION OF ITS OWN.
 *
 * The drawing and the claim moved into the right-hand column of the burn
 * funnel, which is the slot the prepaid enterprise card used to hold. They
 * were adjacent on the page anyway — this is one of the things producing
 * the funnel's first revenue line — and side by side the funnel reads as
 * where the money goes and this reads as one of the places it comes from.
 *
 * What survives here is ComputeOptionsFigure, the chart and everything
 * attached to it, exported so the geometry below has ONE definition. The
 * default export is kept whole so the section can be put back as a section
 * without rebuilding it; it is simply not mounted on the home page.
 *
 * ------------------------------------------------------------------
 * The claim it has to land is the one in the lede: this is a financial
 * product written against compute prices, not a place to rent a GPU.
 * Everything else here is in service of that distinction, which is why the
 * figure is a price chart rather than a rack of hardware.
 *
 * ------------------------------------------------------------------
 * The colours are the site's, not the reference's.
 *
 * The design this came from is mint and sage throughout. This page has two
 * hues, ink and brand orange, and a third introduced for one section would
 * read as a different site. So slate is the price the market does to you
 * and orange is the part the option holds down, which is the same language
 * the burn funnel beside it uses.
 *
 * The fill between the ceiling and the price is the product. A reader does
 * not have to know what an option is to see that the shaded part is the
 * part they are not paying.
 *
 * ------------------------------------------------------------------
 * NO FIGURES ANYWHERE, deliberately. The chart has no value axis, the
 * ceiling carries no number and the two tags carry no rate. What a
 * compute-price option costs or pays is not settled in this repo, and a
 * number on a marketing page reads as a quote.
 *
 * AZURE IS NAMED IN THE SUPPLIED COPY and is someone else's trademark.
 * It appears as the name of a price exposure being hedged, not as a
 * partner or an endorsement, which is the only way this page is entitled
 * to use it. IF LEGAL WANTS IT OUT, the sentence survives losing it.
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

/* The two things the product earns from. Tags, not controls: they label
   the business, and a reader clicking one would expect the chart to
   change, which it has nothing to change into. */
const TAGS = ['Options fees', 'Hedging demand'];

/* A rental price over a term. Lower y is a higher price, so the line
   climbing is the bill climbing. Nothing is to scale and there is no value
   axis: the only claim the shape makes is that the price moves, and that
   one crossing is enough to matter. */
const PRICE = [
  [38, 120], [62, 114], [85, 122], [109, 109], [133, 101], [156, 107],
  [180, 94], [204, 83], [227, 70], [251, 76], [275, 59], [298, 65], [322, 52],
];

const CEILING = 86;
const VIEW_TOP = 36;
const VIEW_H = 124;
const CEILING_PCT = ((CEILING - VIEW_TOP) / VIEW_H) * 100;

/* Where the price first gets above the ceiling, solved on the segment that
   does it rather than guessed, so the fill starts exactly on the line. */
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

/* ------------------------------------------------------------------ */

/**
 * The chart and everything attached to it, without a container.
 *
 * Exported bare so the caller supplies the card. It is drawn at roughly 700
 * points wide inside its old section and at roughly 420 in the funnel's
 * side column, which is why every stroke is pinned in pixels and the
 * ceiling label is positioned by a percentage worked out from the crop.
 * Nothing here is allowed to scale with the box.
 */
export function ComputeOptionsFigure() {
  return (
    <>
      {/* Wraps, because in a side column the title and the badge do not
          both fit on one line and space-between alone would have let them
          collide rather than stack. */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.2,
        }}
      >
        <Typography component="div" sx={{ ...LABEL, color: QUIET }}>
          Cloud price index
        </Typography>

        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            px: '11px',
            py: '6px',
            borderRadius: '999px',
            border: '1px solid rgba(255,102,0,0.26)',
            backgroundColor: 'rgba(255,102,0,0.07)',
            flexShrink: 0,
          }}
        >
          <Box
            component="svg"
            aria-hidden="true"
            viewBox="0 0 20 20"
            sx={{ width: 13, height: 13, display: 'block', color: ORANGE }}
          >
            <Box
              component="path"
              d="M10 16V4M10 4 5 9M10 4l5 5"
              sx={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
            />
          </Box>
          <Typography component="span" sx={{ ...LABEL, color: '#B4531A' }}>
            Protected
          </Typography>
        </Box>
      </Box>

      {/* The drawing. Strokes are fixed in pixels, because this chart is
          about 300px wide on a phone and 700 on a desktop and anything
          measured in user units doubles across that range. The ceiling
          label is HTML over the top for the same reason, placed by a
          percentage worked out from the crop so the two cannot drift. */}
      <Box sx={{ position: 'relative', mt: { xs: 2.2, md: 2.6 } }}>
        <Box
          component="svg"
          viewBox={`0 ${VIEW_TOP} 340 ${VIEW_H}`}
          sx={{ width: '100%', display: 'block', height: { md: 210 } }}
        >
          <defs>
            <linearGradient id="optionsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,102,0,0.32)" />
              <stop offset="100%" stopColor="rgba(255,102,0,0.06)" />
            </linearGradient>
          </defs>

          {[3, 4, 5].map((g) => {
            const y = 114 - (g - 2) * 25;
            return (
              <line
                key={g}
                x1="38"
                y1={y}
                x2="322"
                y2={y}
                stroke="rgba(15,23,42,0.07)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {/* everything above the ceiling is the option's problem */}
          <path d={coveredPath} fill="url(#optionsFill)" />

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
          Hedged ceiling
        </Typography>
      </Box>

      <Box
        sx={{
          mt: { xs: 1.6, md: 1.8 },
          pt: { xs: 1.5, md: 1.7 },
          borderTop: `1px solid ${HAIR}`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 1.4, md: 2.4 },
        }}
      >
        {[
          ['Rental price', '#334155', false],
          ['Hedged ceiling', ORANGE, true],
        ].map(([k, c, dash]) => (
          <Box key={k} sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
            <Box
              aria-hidden="true"
              sx={{ width: '16px', height: '0px', flexShrink: 0, borderTop: `2px ${dash ? 'dashed' : 'solid'} ${c}` }}
            />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: QUIET }}>{k}</Typography>
          </Box>
        ))}

        <Typography sx={{ flex: '1 1 100%', mt: 0.6, fontSize: '0.76rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
          Illustrative. No index level, premium or payout is quoted here.
        </Typography>
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The original standalone section. NOT MOUNTED on the home page: the
 * figure above now lives in the burn funnel's side column. Kept whole so
 * putting it back is importing it again, not rebuilding it.
 */
export default function ComputeOptionsSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();

  return (
    <Container id="compute-options" maxWidth="xl" sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: '96px' }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { lg: 'center' },
          gap: { xs: 4, lg: 7 },
        }}
      >
        {/* ---- the claim ---- */}
        <Box ref={headRef} sx={{ flex: { lg: '0 1 440px' }, minWidth: 0, ...revealSx(headShown) }}>
          <Typography sx={{ ...LABEL, fontSize: '0.75rem', letterSpacing: '0.1em', color: ORANGE, mb: 1.8 }}>
            Enterprise financial products
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2.1rem', md: '2.8rem' },
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            <Box component="span" sx={{ display: 'block' }}>Compute options.</Box>
            <Box component="span" sx={{ display: 'block', color: ORANGE }}>Predictable AI costs.</Box>
          </Typography>

          <Typography
            sx={{
              mt: 2.2,
              fontSize: { xs: '1rem', md: '1.06rem' },
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              textWrap: 'pretty',
            }}
          >
            Enterprises can hedge future Azure and GPU rental price exposure using compute-price
            options. Not another GPU rental platform.
          </Typography>

          <Box sx={{ mt: { xs: 2.6, md: 3 }, display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
            {TAGS.map((t) => (
              <Typography
                key={t}
                component="span"
                sx={{
                  px: '16px',
                  py: '9px',
                  borderRadius: '999px',
                  border: `1px solid ${HAIR}`,
                  backgroundColor: 'var(--bg-card)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  color: '#0F172A',
                  boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                }}
              >
                {t}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* ---- and the picture of it ---- */}
        <Box
          ref={figRef}
          sx={{
            flex: { lg: '1 1 0' },
            minWidth: 0,
            width: '100%',
            ...PAPER,
            px: { xs: 2.2, md: 3.4 },
            py: { xs: 2.6, md: 3 },
            ...revealSx(figShown, 120),
          }}
        >
          <ComputeOptionsFigure />
        </Box>
      </Box>
    </Container>
  );
}
