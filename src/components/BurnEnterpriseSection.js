import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useReveal, revealSx } from '@/utils/reveal';

/**
 * Where the money goes, and when enterprise pays for it.
 *
 * ------------------------------------------------------------------
 * The funnel is drawn now, not implied.
 *
 * Every version before this was a stack of rounded white cards that got
 * narrower, each with its own lift shadow, sitting on a grey gradient. The
 * taper was the argument and nothing drew it: a reader had to notice that the
 * boxes were shrinking. Eight shadowed cards on a muddy ground is also the
 * house style of a slide template, which is the specific thing that kept
 * getting called cheap.
 *
 * So the silhouette is real. An SVG behind the stack measures every stage and
 * draws a smooth shape through the left and right edges of each one, which
 * means the funnel hugs the actual content at whatever width the panel ends up
 * and at whatever height the text wraps to. The cards then read as white
 * cutouts inside a narrowing channel rather than as objects floating on a
 * board.
 *
 * Shadows are spent, not sprinkled. The panel has one. The two stages that are
 * the payoff, the buyback and the burn, have one each. Everything else is held
 * by a hairline, which is what separates a financial figure from a deck.
 *
 * The subtraction stays on the axis. Revenue, minus the cost of running the
 * network, equals the net, and the net is the one card tinted toward the
 * orange it feeds.
 *
 * The cost card states that the operating cost is reduced, and then shows the
 * knock-on instead of describing it. Two sentences about larger nets and
 * supply gone for good became three readings, cost down, net up, OPEN burned
 * up, which is the same argument at a glance and about a fifth of the words.
 * It is the only tinted block inside a card on the whole figure, which is the
 * whole reason it gets noticed.
 *
 * The flow now ends where it actually ends. Buying happens on the open market
 * and burning leaves a supply that only moves one way, both of which the
 * tokenomics copy elsewhere on the site already says. A funnel that stopped at
 * the act of burning left the reader to work out the consequence.
 *
 * The voice is the condition, not the activity. "We are reducing the operating
 * cost" put the company in the frame and asked to be taken on trust; "Reduced
 * operating costs" states a property of the thing being described, which is
 * what every other label on this figure does. The first person is gone from
 * the whole section for the same reason: nothing here needs an "us" to be
 * true, and a figure that keeps saying "we" is arguing rather than showing.
 *
 * ------------------------------------------------------------------
 * Two corrections to earlier versions of this file, both content.
 *
 * The enterprise panel used to say that enterprise money never enters the
 * funnel. That contradicted the funnel's own first revenue line, which is
 * enterprise inference and API. The panel is about *when* enterprise pays, not
 * about a separate pot, and it now says so.
 *
 * THE FOUR COST DESCRIPTIONS NEED A CHECK. The names were supplied; the line
 * under each is mine, and each is a statement about where company money goes.
 * Nothing has been confirmed about reserves or how HEY credits are accounted
 * for.
 *
 * No figures anywhere. None of these ratios are settled in the repo, and a
 * number here would read as a commitment.
 * ------------------------------------------------------------------
 */

const ORANGE = '#ff6600';
const INK = '#141820';
const DASH = 'rgba(15, 23, 42, 0.3)';
const QUIET = 'rgba(71, 85, 105, 0.78)';
const HAIR = 'rgba(15, 23, 42, 0.1)';

const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/* The sheet. One shadow on the whole section and nothing inside it competing,
   which is the difference between a document and a pile of cards. */
const PAPER = {
  position: 'relative',
  borderRadius: '24px',
  border: `1px solid ${HAIR}`,
  background: '#FFFFFF',
  boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 28px 56px -40px rgba(15,23,42,0.24)',
};

const TONE = {
  /* Held by a rule, lifted by the channel behind it rather than by a shadow. */
  plain: {
    background: '#FFFFFF',
    border: `1px solid ${HAIR}`,
    boxShadow: 'none',
    label: QUIET,
    title: '#0F172A',
  },
  net: {
    background: 'linear-gradient(150deg, #FFF8F2 0%, #FFF1E5 58%, #FFE9D7 100%)',
    border: '1px solid rgba(255,102,0,0.26)',
    boxShadow: 'none',
    label: '#B4531A',
    title: '#0F172A',
  },
  orange: {
    background: `linear-gradient(145deg, #FF8A2B 0%, ${ORANGE} 52%, #E85900 100%)`,
    border: '1px solid transparent',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 18px 34px -22px rgba(232,89,0,0.8)',
    label: 'rgba(255,255,255,0.8)',
    title: '#FFFFFF',
  },
  ink: {
    background: `linear-gradient(145deg, #262B36 0%, ${INK} 55%, #090C12 100%)`,
    border: '1px solid transparent',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 38px -24px rgba(20,24,32,0.85)',
    label: 'rgba(255,255,255,0.58)',
    title: '#FFFFFF',
  },
};

const REVENUE = [
  'Enterprise inference & API',
  'Hey Open subscriptions',
  'Pay-as-you-go inference',
  'Agents & compute marketplace',
];

/* The names were given. The second line on each is a gloss, kept to the
   shortest thing that is true, and flagged at the top of this file. */
const COSTS = [
  { k: 'Inference', s: 'The compute behind every call' },
  { k: 'Taxes', s: 'Due where the network runs' },
  { k: 'HEY credits', s: 'Compute already claimed' },
  { k: 'Reserves', s: 'Held back, not spent' },
];

const ENTERPRISE = [
  { n: '01', k: 'Pay up front', s: 'One payment for the term' },
  { n: '02', k: 'Reserve credits', s: 'In advance, before usage', lead: true },
];

/* What the reduction does, in the order it does it. Cost is the only one
   that goes down, and the other two go up because of it. */
const CHAIN = [
  { dir: 'down', k: 'Cost' },
  { dir: 'up', k: 'Net' },
  { dir: 'up', k: 'OPEN burned' },
];

const INDEX = {
  fontSize: '0.62rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  lineHeight: 1,
  color: ORANGE,
};

/* ------------------------------------------------------------------ */
/* The channel                                                         */
/* ------------------------------------------------------------------ */

/**
 * A smooth path down a column of points.
 *
 * Each segment is a cubic whose handles sit on the midpoint of the vertical
 * gap, which gives a shape that leaves and arrives vertically and bows in
 * between. Straight lines between the stages would make a staircase, and a
 * single trapezoid would miss the stages whose width does not sit on the
 * line.
 */
function column(points) {
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const mid = ((a.y + b.y) / 2).toFixed(1);
    d += ` C${a.x.toFixed(1)} ${mid} ${b.x.toFixed(1)} ${mid} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

/** How far outside each card the channel runs. */
const CLEAR = 9;

function useChannel(stageCount) {
  const wrapRef = React.useRef(null);
  const stageRefs = React.useRef([]);
  const [shape, setShape] = React.useState(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const measure = () => {
      const stages = stageRefs.current.filter(Boolean);
      if (stages.length < 2) return;

      const box = wrap.getBoundingClientRect();
      if (!box.width) return;

      const rows = stages.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - box.left,
          right: r.right - box.left,
          mid: r.top - box.top + r.height / 2,
        };
      });

      const first = rows[0];
      const last = rows[rows.length - 1];

      const left = [
        { x: first.left - CLEAR, y: 0 },
        ...rows.map((r) => ({ x: r.left - CLEAR, y: r.mid })),
        { x: last.left - CLEAR, y: box.height },
      ];
      const right = [
        { x: last.right + CLEAR, y: box.height },
        ...rows.map((r) => ({ x: r.right + CLEAR, y: r.mid })).reverse(),
        { x: first.right + CLEAR, y: 0 },
      ];

      setShape({
        w: box.width,
        h: box.height,
        d: `${column(left)} L${right[0].x.toFixed(1)} ${right[0].y.toFixed(1)} ${column(right).slice(1)} Z`,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    stageRefs.current.filter(Boolean).forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [stageCount]);

  const setStage = React.useCallback((i) => (el) => {
    stageRefs.current[i] = el;
  }, []);

  return { wrapRef, setStage, shape };
}

/* ------------------------------------------------------------------ */
/* Parts                                                               */
/* ------------------------------------------------------------------ */

/** A joint. `op` puts the arithmetic sign on the axis. */
function Joint({ op }) {
  const stem = op ? { xs: 9, md: 11 } : { xs: 15, md: 17 };

  return (
    <Box
      aria-hidden="true"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 0.6, md: 0.7 } }}
    >
      <Box sx={{ height: stem, borderLeft: `1.5px dashed ${DASH}` }} />
      {op && (
        <>
          <Box
            sx={{
              width: 30,
              height: 30,
              my: 0.6,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.05rem',
              fontWeight: 800,
              lineHeight: 1,
              color: '#0F172A',
              background: '#FFFFFF',
              border: `1px solid ${HAIR}`,
            }}
          >
            {op}
          </Box>
          <Box sx={{ height: stem, borderLeft: `1.5px dashed ${DASH}` }} />
        </>
      )}
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

/** One stage of the funnel. */
const Stage = React.forwardRef(function Stage({ width, label, tone = 'plain', icon, note, children, sx }, ref) {
  const t = TONE[tone];

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width,
        mx: 'auto',
        borderRadius: '16px',
        px: { xs: 2, md: 3 },
        py: { xs: 1.7, md: 2 },
        textAlign: 'center',
        background: t.background,
        border: t.border,
        boxShadow: t.boxShadow,
        ...sx,
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
      {note && (
        <Typography sx={{ mt: 0.6, fontSize: { xs: '0.78rem', md: '0.82rem' }, lineHeight: 1.45, color: t.label }}>
          {note}
        </Typography>
      )}
    </Box>
  );
});

/** Where the money comes from. Four columns of one row, divided, not boxed. */
const Sources = React.forwardRef(function Sources(props, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        borderRadius: '16px',
        border: `1px solid ${HAIR}`,
        background: '#FFFFFF',
        px: { xs: 1.6, md: 2.4 },
        py: { xs: 1.8, md: 2 },
      }}
    >
      <Typography component="div" sx={{ ...LABEL, color: QUIET, textAlign: 'center', mb: { xs: 1.6, md: 1.8 } }}>
        Revenue
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          columnGap: { xs: 1.5, md: 0 },
          rowGap: { xs: 1.8, md: 0 },
        }}
      >
        {REVENUE.map((line, i) => (
          <Box
            key={line}
            sx={{
              px: { md: 1.8 },
              textAlign: 'center',
              borderLeft: { md: i === 0 ? 'none' : `1px solid ${HAIR}` },
            }}
          >
            <Typography component="div" sx={{ ...INDEX, mb: 0.8 }}>
              {`0${i + 1}`}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.84rem', md: '0.88rem' },
                fontWeight: 700,
                letterSpacing: '-0.015em',
                lineHeight: 1.35,
                color: '#0F172A',
              }}
            >
              {line}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

/** What it costs to run, itemised, and what is being done about it. */
const Cost = React.forwardRef(function Cost(props, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: { xs: '100%', md: '88%' },
        mx: 'auto',
        borderRadius: '16px',
        border: `1px solid ${HAIR}`,
        background: '#FFFFFF',
        px: { xs: 1.6, md: 2.6 },
        py: { xs: 1.8, md: 2.1 },
      }}
    >
      <Typography component="div" sx={{ ...LABEL, color: QUIET, textAlign: 'center' }}>
        Taken out of revenue
      </Typography>

      <Typography
        component="div"
        sx={{
          mt: 0.8,
          mb: { xs: 1.8, md: 2 },
          fontSize: { xs: '1rem', md: '1.15rem' },
          fontWeight: 750,
          letterSpacing: '-0.025em',
          lineHeight: 1.3,
          textAlign: 'center',
          color: '#0F172A',
          textWrap: 'balance',
        }}
      >
        Reduced operating costs
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          columnGap: { xs: 1.5, md: 0 },
          rowGap: { xs: 1.6, md: 0 },
        }}
      >
        {COSTS.map((cost, i) => (
          <Box
            key={cost.k}
            sx={{
              px: { md: 1.8 },
              textAlign: 'center',
              borderLeft: { md: i === 0 ? 'none' : `1px solid ${HAIR}` },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.86rem', md: '0.92rem' },
                fontWeight: 750,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                color: '#0F172A',
              }}
            >
              {cost.k}
            </Typography>
            <Typography sx={{ mt: 0.4, fontSize: '0.73rem', lineHeight: 1.4, color: QUIET }}>
              {cost.s}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: { xs: 1.8, md: 2.1 },
          borderRadius: '12px',
          border: '1px solid rgba(255,102,0,0.18)',
          background: 'rgba(255,102,0,0.055)',
          px: { xs: 1.4, md: 2.2 },
          py: { xs: 1.2, md: 1.4 },
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 0.7, md: 1.6 },
        }}
      >
        {CHAIN.map((step, i) => (
          <React.Fragment key={step.k}>
            {i > 0 && (
              <Box
                aria-hidden="true"
                sx={{
                  width: { xs: 10, md: 28 },
                  height: '1px',
                  flexShrink: 0,
                  backgroundColor: 'rgba(255,102,0,0.4)',
                }}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.7, md: 0.9 } }}>
              <Box
                sx={{
                  width: { xs: 20, md: 24 },
                  height: { xs: 20, md: 24 },
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  border: '1px solid rgba(255,102,0,0.32)',
                }}
              >
                {step.dir === 'down' ? (
                  <ArrowDownwardRoundedIcon sx={{ fontSize: { xs: '0.78rem', md: '0.9rem' }, color: ORANGE }} />
                ) : (
                  <ArrowUpwardRoundedIcon sx={{ fontSize: { xs: '0.78rem', md: '0.9rem' }, color: ORANGE }} />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.78rem', md: '0.9rem' },
                  fontWeight: 750,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  color: '#0F172A',
                }}
              >
                {step.k}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
});

/* ------------------------------------------------------------------ */

export default function BurnEnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [figRef, figShown] = useReveal();
  const { wrapRef, setStage, shape } = useChannel(5);

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
            Costs out first.{' '}
            <Box component="span" sx={{ color: ORANGE }}>The net buys OPEN and burns it.</Box>
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
          {/* ---- the funnel ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(66.667% - 12px)' },
              minWidth: 0,
              ...PAPER,
              px: { xs: 2, md: 4 },
              py: { xs: 3, md: 3.5 },
            }}
          >
            <Box ref={wrapRef} sx={{ position: 'relative' }}>
              {/* the channel the stages sit in */}
              {shape && (
                <Box
                  component="svg"
                  aria-hidden="true"
                  viewBox={`0 0 ${shape.w} ${shape.h}`}
                  preserveAspectRatio="none"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  <defs>
                    <linearGradient id="channelFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(15,23,42,0.035)" />
                      <stop offset="62%" stopColor="rgba(255,102,0,0.05)" />
                      <stop offset="100%" stopColor="rgba(255,102,0,0.1)" />
                    </linearGradient>
                  </defs>
                  <path d={shape.d} fill="url(#channelFill)" stroke={HAIR} strokeWidth="1" />
                </Box>
              )}

              <Box sx={{ position: 'relative' }}>
                <Sources ref={setStage(0)} />

                <Joint op={'−'} />
                <Cost ref={setStage(1)} />

                <Joint op="=" />
                <Stage
                  ref={setStage(2)}
                  width={{ xs: '92%', md: '56%' }}
                  label="Net"
                  tone="net"
                  note="All of it goes to the buyback"
                >
                  Revenue after costs
                </Stage>

                <Joint />
                <Stage
                  ref={setStage(3)}
                  width={{ xs: '82%', md: '44%' }}
                  label="Buyback"
                  tone="orange"
                  note="On the open market"
                >
                  Buy OPEN
                </Stage>

                <Joint />
                <Stage
                  ref={setStage(4)}
                  width={{ xs: '80%', md: '38%' }}
                  label="Burn"
                  tone="ink"
                  note="Supply has one direction"
                  icon={
                    <LocalFireDepartmentRoundedIcon
                      sx={{ fontSize: '1.2rem', color: ORANGE, display: 'block', mx: 'auto', mb: 0.4 }}
                    />
                  }
                >
                  OPEN, gone for good
                </Stage>
              </Box>
            </Box>
          </Box>

          {/* ---- enterprise: the same money, paid earlier ---- */}
          <Box
            sx={{
              flex: { lg: '1 1 calc(33.333% - 12px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ...PAPER,
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 3, md: 3.5 },
            }}
          >
            <Typography sx={{ ...LABEL, color: QUIET }}>Enterprise</Typography>
            <Typography
              sx={{
                mt: 1.4,
                fontSize: { xs: '1.3rem', md: '1.5rem' },
                fontWeight: 750,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: '#0F172A',
                textWrap: 'balance',
              }}
            >
              Paid before the compute is used.
            </Typography>
            <Typography
              sx={{
                mt: 1.4,
                fontSize: { xs: '0.9rem', md: '0.94rem' },
                lineHeight: 1.6,
                color: QUIET,
                textWrap: 'pretty',
              }}
            >
              Enterprise buys the term up front and holds credits in reserve. The money
              arrives before the usage it pays for, and it is the first of the four
              revenue lines in the funnel.
            </Typography>

            <Box sx={{ mt: { xs: 2.5, md: 3 }, display: 'grid', gap: { xs: 1.4, md: 1.6 } }}>
              {ENTERPRISE.map((item) => (
                <Box
                  key={item.n}
                  sx={{
                    display: 'flex',
                    gap: 1.6,
                    pl: 1.8,
                    py: 0.4,
                    borderLeft: `2px solid ${item.lead ? ORANGE : HAIR}`,
                  }}
                >
                  <Typography component="div" sx={{ ...INDEX, mt: 0.4, color: item.lead ? ORANGE : QUIET }}>
                    {item.n}
                  </Typography>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.98rem', md: '1.02rem' },
                        fontWeight: 750,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                        color: '#0F172A',
                      }}
                    >
                      {item.k}
                    </Typography>
                    <Typography sx={{ mt: 0.3, fontSize: '0.84rem', lineHeight: 1.45, color: QUIET }}>
                      {item.s}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
