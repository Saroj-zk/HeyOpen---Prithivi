import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import TokenFlowDiagram from '@/components/TokenFlowDiagram';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { INK, MONO, RULE, RULE_ON_INK, FIG, Label, Entry, Button, Head2 } from '@/components/ui/Ledger';
import { MODELS, MODEL_TOTAL } from '@/data/catalog';

/**
 * $HEY, the second token.
 *
 * Laid out to follow Venice's DIEM page, which is the thing this was asked to
 * be like, with the two tokens doing the two jobs: $OPEN is the capital asset
 * you buy and stake, as VVV is, and $HEY is minted by stakers and pays out
 * compute, as DIEM is. Their section order is kept: what it is, how it works
 * in three cards, what it changes, the models it reaches, then who it is for.
 *
 * Reoriented rather than copied. The hero is mirrored against the staking
 * page, card on the left and words on the right, so the two read as a pair
 * rather than as the same page twice, and everything is drawn from the same
 * ledger parts so a figure means the same thing on both.
 *
 * The model names in the marquee come from the catalogue the rest of the site
 * runs on, so the list cannot claim a model the network does not carry.
 */

/* ------------------------------------------------------------------ */
/* The one number here that is an assumption rather than a fact.       */
/*                                                                     */
/* It is set to match DIEM, on the basis that the two tokens were      */
/* asked to work the same way and the staking threshold already        */
/* matches at a hundred. It is a claim about money, so it needs        */
/* confirming before this page is published, and it is the only place  */
/* to change it.                                                       */
/* ------------------------------------------------------------------ */
const CREDIT_PER_DAY = '$1';

const LINKS = { buy: '#', stake: '#', mint: '#', trade: '#', explorer: '#', marketCap: '#' };

const HOW = [
  {
    n: '01',
    title: 'Get $HEY',
    body: 'Buy it on the open market, or mint it yourself if you are already staking $OPEN.',
    cta: 'Buy $HEY',
    href: LINKS.buy,
  },
  {
    n: '02',
    title: 'Stake it',
    body: `Each $HEY you stake pays out ${CREDIT_PER_DAY} of credit a day, for any model on the network.`,
    cta: 'Stake $HEY',
    href: LINKS.stake,
  },
  {
    n: '03',
    title: 'Or sell it',
    body: 'It is a token, so it trades. If you are not spending the compute, somebody else will.',
    cta: 'Trade $HEY',
    href: LINKS.trade,
  },
];

const AUDIENCES = [
  [
    'For developers and agents',
    'A battery that recharges',
    `Every day you can draw up to ${CREDIT_PER_DAY} of inference per $HEY, on any model in the catalogue. Spend it or do not; tomorrow it is full again.`,
  ],
  [
    'For the onchain economy',
    'Compute a contract can hold',
    'An agent can own its own inference. A protocol can hold compute as collateral. A treasury can hand it out without handing out an API key.',
  ],
  [
    'For applications',
    'A cost you can plan',
    'Capacity priced once and held, rather than an invoice that arrives after the fact and moves with your traffic.',
  ],
  [
    'For $OPEN stakers',
    'Minted from the stake you already have',
    'All $HEY comes from staked $OPEN and nothing else makes it. Mint against your stake and use the compute, or sell it to somebody who needs it more than you do.',
  ],
];

/* A sample of the catalogue for the marquee, taken from the same data the
   models page runs on so the two cannot disagree. */
const MARQUEE = MODELS.filter((m) => m.name).slice(0, 26).map((m) => m.name);

/* ------------------------------------------------------------------ */

/* The token as a statement, which is the thesis: one unit, one day, and
   another day behind it. */
function DailyStatement() {
  return (
    <Box
      sx={{
        borderRadius: '4px',
        border: `1px solid ${RULE}`,
        backgroundColor: 'var(--bg-card)',
        boxShadow: '0 1px 2px rgba(11,15,26,.04), 0 24px 56px -28px rgba(11,15,26,.22)',
        px: { xs: 2.5, md: 3.5 },
        pt: { xs: 2.2, md: 2.6 },
        pb: { xs: 2.2, md: 2.8 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          pb: '14px',
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <Label>Statement</Label>
        <Label>Per day</Label>
      </Box>

      <Entry name="You stake" figure="1 $HEY" />
      <Entry name="It pays out" figure={`${CREDIT_PER_DAY} of credit`} />
      <Entry name="Good for" figure={`All ${MODEL_TOTAL} models`} />
      <Entry name="Then tomorrow" figure="The same again" total />

      <Typography sx={{ mt: '14px', fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
        The credit renews daily and does not expire. Unspent days do not bank,
        and the $HEY behind them keeps paying for as long as it is staked.
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function HeyPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>$HEY: Compute Credit, Every Day | Hey Open</title>
        <meta
          name="description"
          content="$HEY is minted from staked $OPEN. Stake it and it pays out compute credit every day, for any model on the network, renewed daily."
        />
      </Head>

      <PageHeader />

      <Box
        data-ambient-blur
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 640,
          background:
            'radial-gradient(ellipse 72% 58% at 50% 0%, rgba(255, 102, 0, 0.15) 0%, rgba(255, 80, 0, 0.03) 52%, transparent 78%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Hero, mirrored against the staking page ─────────────── */}
        <Box component="section" sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 7, md: 11 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.92fr 1fr' },
              gap: { xs: 5, md: 8 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              {/* on a narrow screen the words come first regardless */}
              <Box sx={{ order: { xs: 2, md: 1 } }}>
                <DailyStatement />
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <Box>
                <Label sx={{ color: 'var(--brand-accent)' }}>The second token</Label>
                <Typography
                  component="h1"
                  sx={{
                    mt: 2.5,
                    fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.98,
                    color: 'var(--text-heading)',
                    textWrap: 'balance',
                  }}
                >
                  $HEY
                </Typography>
                <Typography
                  sx={{
                    mt: 3,
                    fontSize: { xs: '1.05rem', md: '1.16rem' },
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    maxWidth: '46ch',
                    textWrap: 'pretty',
                  }}
                >
                  $HEY is how the network hands out compute rather than money. Stake one and it
                  pays out {CREDIT_PER_DAY} of credit a day, for any model in the catalogue, and
                  the next day it pays again.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
                  <Button href={LINKS.stake} primary>
                    Stake $HEY
                    <Box component="span" aria-hidden="true">→</Box>
                  </Button>
                  <Button href={LINKS.buy}>Buy $HEY</Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3.5 }}>
                  {[['Market data', LINKS.marketCap], ['Contract', LINKS.explorer]].map(([label, href]) => (
                    <Box
                      key={label}
                      component="a"
                      href={href}
                      sx={{
                        fontFamily: MONO,
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        borderBottom: `1px solid ${RULE}`,
                        pb: '3px',
                        '&:hover': { color: 'var(--text-heading)', borderColor: 'var(--brand-accent)' },
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Three moves ────────────────────────────────────────── */}
        <Box component="section" sx={{ pb: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Head2 eyebrow="How $HEY works" title="Hold it, stake it, or pass it on." />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 0, md: 5 },
              }}
            >
              {HOW.map((step) => (
                <Box
                  key={step.n}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: `2px solid ${INK}`,
                    pt: { xs: 2.4, md: 3 },
                    pb: { xs: 4, md: 0 },
                  }}
                >
                  <Typography sx={{ ...FIG, fontSize: '0.78rem', fontWeight: 600, color: 'var(--brand-accent)', mb: 2 }}>
                    {step.n}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.45rem', md: '1.6rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-heading)',
                      mb: 1.4,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.96rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 3, flex: 1 }}
                  >
                    {step.body}
                  </Typography>
                  <Box>
                    <Button href={step.href} small>
                      {step.cta}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>
      </Container>

      {/* ── Where a $HEY comes from ──────────────────────────
          Moved here off the staking page. It draws the whole route: $OPEN
          held, $OPEN staked, $HEY minted against it, credits arriving. This
          is the page about the token in the middle of that, and on the
          staking page it had become the only section that mentioned $HEY at
          all, which made it the odd one out there.

          It sits outside the measure above because it brings its own
          Container, and after the three moves rather than before them: that
          section is what you do with a $HEY once you hold one, this is
          where one comes from. */}
      <TokenFlowDiagram />

      {/* ── What it changes, and what it reaches ─────────────────── */}
      <Box component="section" sx={{ backgroundColor: INK, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
          <Box sx={{ pt: { xs: 8, md: 13 }, pb: { xs: 5, md: 7 } }}>
            <Reveal>
              <Head2
                onInk
                eyebrow="What it changes"
                title="Compute you hold, instead of compute you rent."
                lede="A subscription is a bill that arrives whether you used it or not, and an API key is a bill that arrives after you did. A $HEY is a fixed amount of inference a day that belongs to whoever holds the token, and it does not expire."
                maxWidth={760}
              />
            </Reveal>
          </Box>
        </Container>

        {/* The catalogue, running past. Names come from the site's own model
            data, so this cannot advertise something the network does not
            carry. It holds still if the reader asked for less motion. */}
        <Box sx={{ pb: { xs: 8, md: 13 } }}>
          <Box sx={{ mb: 2.5, px: { xs: 2.5, sm: 4, md: 6 } }}>
            <Container maxWidth="lg" disableGutters>
              <Label onInk>All {MODEL_TOTAL} of them</Label>
            </Container>
          </Box>

          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              width: 'max-content',
              gap: '10px',
              '@media (prefers-reduced-motion: no-preference)': {
                animation: 'heyMarquee 64s linear infinite',
              },
              '@keyframes heyMarquee': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-50%)' },
              },
            }}
          >
            {[0, 1].map((pass) => (
              <Box key={pass} sx={{ display: 'flex', gap: '10px', pr: '10px' }}>
                {MARQUEE.map((name) => (
                  <Box
                    key={`${pass}-${name}`}
                    sx={{
                      px: '14px',
                      py: '9px',
                      borderRadius: '4px',
                      border: `1px solid ${RULE_ON_INK}`,
                      fontFamily: MONO,
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.72)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {name}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>

          <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
            <Box sx={{ mt: { xs: 4, md: 5 } }}>
              <Button href={LINKS.stake} onInk>
                Stake $HEY
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Who it is for ──────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Head2 eyebrow="Who it is for" title="Four ways people use it." />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box sx={{ borderTop: `2px solid ${INK}` }}>
              {AUDIENCES.map(([who, title, body]) => (
                <Box
                  key={who}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '0.7fr 1.3fr' },
                    gap: { xs: 1.2, md: 6 },
                    py: { xs: 3, md: 3.6 },
                    borderBottom: `1px solid ${RULE}`,
                  }}
                >
                  <Label sx={{ pt: { md: '6px' } }}>{who}</Label>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        color: 'var(--text-heading)',
                        mb: 1.2,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                      {body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── Close ──────────────────────────────────────────────── */}
        <Box component="section" sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 8, md: 13 } }}>
          <Reveal>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.06,
                  color: 'var(--text-heading)',
                  maxWidth: '17ch',
                  mx: 'auto',
                  textWrap: 'balance',
                }}
              >
                A day of compute, every day.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4, justifyContent: 'center' }}>
                <Button href={LINKS.stake} primary>
                  Stake $HEY
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href="/stake">Where $HEY comes from</Button>
              </Box>

              <Typography
                sx={{
                  mt: 6,
                  fontFamily: MONO,
                  fontSize: '0.72rem',
                  lineHeight: 1.85,
                  color: 'var(--text-muted)',
                  maxWidth: '72ch',
                  mx: 'auto',
                }}
              >
                $HEY pays out credit for use on this network, not a return. Nothing here is
                investment advice. Read the terms before you stake.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
