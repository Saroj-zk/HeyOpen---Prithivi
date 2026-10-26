import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';

/**
 * Staking $OPEN.
 *
 * The shape follows Venice's VVV page, which is the thing this was modelled
 * on: buy the token, stake it, mint the second token against the stake, spend
 * that on the product. The difference is the yield, which comes in two parts
 * rather than one.
 *
 * On those two parts, a note for whoever edits this next. The page says the
 * base rate is fixed and that the variable share is variable, performance
 * linked, not promised, and can be zero. It does not say where the variable
 * share comes from, which is deliberate and is a normal thing to leave off a
 * landing page. What it also does not do is name a source that is not the
 * real one: saying it comes from protocol fees, or from network usage, would
 * be an easier sentence and would be false. Vague is fine. Wrong is not, and
 * on a yield product the difference is the one a regulator asks about.
 *
 * The drawing carries the same distinction, so the honesty survives someone
 * reading only the graphic: the base is a solid bar and the variable share
 * is an open, dashed one. A reader who looks at nothing else still sees that
 * the second part is not the same kind of promise as the first.
 */

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/*                                                                     */
/* Every one of these is a representation about money, so none of them */
/* is invented here. They are placeholders on purpose: left as they    */
/* are, the page reads as unfinished rather than as a wrong promise.   */
/* ------------------------------------------------------------------ */
const RATES = {
  base: '[BASE APY]',
  variableLabel: '[VARIABLE]',
  payout: '[PAYOUT PERIOD]',
  unbond: '[UNBONDING PERIOD]',
  proThreshold: '[THRESHOLD]',
  heyRate: '[DAILY CREDIT]',
  buyAt: '[EXCHANGE]',
  chain: '[CHAIN]',
};

const APP = 'https://ais.openledger.xyz/chat';

const STEPS = [
  {
    n: '01',
    title: 'Get $OPEN',
    body: `An ERC-20 on ${RATES.chain}. Buy it on ${RATES.buyAt} or anywhere else it trades.`,
  },
  {
    n: '02',
    title: 'Stake it',
    body: 'Staked $OPEN becomes sOPEN. It never leaves your wallet for good, and it earns from the epoch it lands in.',
  },
  {
    n: '03',
    title: 'Mint HEY',
    body: 'Lock sOPEN to mint HEY. Only stakers can mint it, and burning the HEY unlocks the stake behind it.',
  },
  {
    n: '04',
    title: 'Spend it',
    body: `Each HEY pays out ${RATES.heyRate} of credit a day, for any model on the network. Use it, or sell it to someone who will.`,
  },
];

const UNLOCKS = [
  ['Yield on the stake', 'A base rate on everything staked, plus a variable share on top.'],
  ['The right to mint HEY', 'HEY is minted against staked $OPEN and nothing else. No stake, no mint.'],
  [`${RATES.proThreshold} unlocks the full app`, 'Stake the threshold and the subscription stops being something you pay for.'],
  ['A vote that costs something', 'Governance weight sits with the stake, so the people steering the network are the ones exposed to it.'],
];

const FAQ = [
  [
    'How is the yield paid?',
    `In $OPEN, every ${RATES.payout}, to the address that holds the stake. The base rate and the variable share arrive together.`,
  ],
  [
    'Is the variable share guaranteed?',
    'No. It moves with performance, it is set per period rather than promised in advance, and it can be zero. Only the base rate is fixed.',
  ],
  [
    'Can I unstake?',
    `Yes, after an unbonding period of ${RATES.unbond}. Stake that is backing minted HEY is locked until that HEY is burned.`,
  ],
  [
    'What happens to HEY when I unstake?',
    'Nothing, unless it was minted against the stake you are withdrawing. That HEY has to be burned first, which releases the sOPEN behind it.',
  ],
  [
    'Is this the same as the tokenomics page?',
    'No. That page covers where $OPEN comes from and what burns it. This one covers what happens when you stake it.',
  ],
];

/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return (
    <Typography
      sx={{
        fontSize: '0.74rem',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--brand-accent)',
      }}
    >
      {children}
    </Typography>
  );
}

function SectionHead({ eyebrow, title, lede }) {
  return (
    <Box sx={{ maxWidth: 820, mb: { xs: 4, md: 6 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography
        component="h2"
        sx={{
          mt: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          color: 'var(--text-heading)',
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>
      {lede && (
        <Typography
          sx={{
            mt: 2,
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {lede}
        </Typography>
      )}
    </Box>
  );
}

function Button({ children, href, primary }) {
  const external = href.startsWith('http');
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    px: '22px',
    py: '13px',
    borderRadius: '9999px',
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all .18s cubic-bezier(.32,.72,0,1)',
    ...(primary
      ? {
          backgroundColor: 'var(--brand-accent)',
          color: '#FFFFFF',
          border: '1px solid var(--brand-accent)',
          '&:hover': { filter: 'brightness(1.07)' },
        }
      : {
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-heading)',
          border: '1px solid var(--border-normal)',
          '&:hover': { backgroundColor: 'var(--bg-card-hover)' },
        }),
  };

  if (external) {
    return (
      <Box component="a" href={href} target="_blank" rel="noopener noreferrer" sx={sx}>
        {children}
      </Box>
    );
  }
  return (
    <Link href={href} legacyBehavior>
      <Box component="a" sx={sx}>
        {children}
      </Box>
    </Link>
  );
}

/* The two parts of the yield, drawn so the difference between them is
   visible before anything is read. The base is a filled bar. The variable
   share is an open one, dashed, with no fill to measure, because there is
   no number that can honestly go in it ahead of time. */
function YieldMeter() {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 2.5, sm: 3 },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              mb: 1.2,
            }}
          >
            Base rate
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--text-heading)',
            }}
          >
            {RATES.base}
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: '10px',
              borderRadius: '5px',
              backgroundColor: 'var(--brand-accent)',
            }}
          />
          <Typography sx={{ mt: 1.5, fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
            Fixed. Paid every {RATES.payout}, whatever else happens.
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              mb: 1.2,
            }}
          >
            Variable share
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--text-muted)',
            }}
          >
            {RATES.variableLabel}
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: '10px',
              borderRadius: '5px',
              border: '1.5px dashed var(--brand-accent)',
              backgroundColor: 'transparent',
            }}
          />
          <Typography sx={{ mt: 1.5, fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
            Not fixed and not promised. Set per period, and it can be zero.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function StakePage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>Stake $OPEN: Earn Yield and Mint HEY | Hey Open</title>
        <meta
          name="description"
          content="Stake $OPEN to earn a fixed base rate plus a variable share, and to mint HEY, which pays out daily credits for every model on the network."
        />
      </Head>

      <PageHeader />

      {/* Ambient warmth, matching the tokenomics page so the two read as a
          pair rather than as two different products. */}
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
          height: 700,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 102, 0, 0.18) 0%, rgba(255, 80, 0, 0.04) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <Box component="section" sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 6, md: 9 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 5, md: 7 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Eyebrow>Staking</Eyebrow>
              <Typography
                component="h1"
                sx={{
                  mt: 2.5,
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.2rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.02,
                  color: 'var(--text-heading)',
                  textWrap: 'balance',
                }}
              >
                Stake $OPEN.
              </Typography>
              <Typography
                sx={{
                  mt: 3,
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '52ch',
                  textWrap: 'pretty',
                }}
              >
                Earn a base rate on everything you stake, with a variable share on top. Staked
                $OPEN is also the only thing that mints HEY, which pays out credits every day for
                any model on the network.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
                <Button href={APP} primary>
                  Start staking
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href="/token">Read the tokenomics</Button>
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <YieldMeter />
            </Reveal>
          </Box>
        </Box>

        {/* ── How it works ───────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead
              eyebrow="How it works"
              title="Four steps, and the stake stays yours."
              lede="The same shape as holding anything that earns: acquire it, stake it, and draw on what it produces without selling the thing itself."
            />
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {STEPS.map((step) => (
                <Box
                  key={step.n}
                  sx={{
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    p: { xs: 2.5, md: 3 },
                    transition: 'border-color .2s ease, box-shadow .2s ease',
                    '&:hover': { borderColor: 'var(--border-normal)', boxShadow: 'var(--shadow-card)' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: 'var(--brand-accent)',
                      mb: 1.6,
                    }}
                  >
                    {step.n}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.12rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-heading)',
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {step.body}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── The two parts of the yield ─────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead
              eyebrow="The yield"
              title="One payment, two different promises."
              lede="They arrive together and they are not the same kind of thing, so the page keeps them apart."
            />
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2.5, md: 3 },
              }}
            >
              <Box
                sx={{
                  borderRadius: '20px',
                  border: '1px solid var(--border-normal)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-card)',
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-accent)',
                    mb: 2,
                  }}
                >
                  Fixed
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.4rem', md: '1.6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    color: 'var(--text-heading)',
                    mb: 1.6,
                  }}
                >
                  The base rate is owed to you.
                </Typography>
                <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  It is set in advance, it accrues from the epoch your stake lands in, and it does
                  not depend on anything going well. If you stake and do nothing else, this is
                  what you get.
                </Typography>
              </Box>

              <Box
                sx={{
                  borderRadius: '20px',
                  /* Dashed, deliberately. This card is not the same promise as
                     the one beside it and should not look like it. */
                  border: '1.5px dashed var(--border-strong)',
                  backgroundColor: 'transparent',
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    mb: 2,
                  }}
                >
                  Variable
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.4rem', md: '1.6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    color: 'var(--text-heading)',
                    mb: 1.6,
                  }}
                >
                  The share on top is not.
                </Typography>
                <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  Stakers take a share of what the treasury returns over a period. It is declared
                  after the fact rather than promised ahead of it, it moves with performance, and
                  in a period where there is nothing to share it is zero.
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── What staking gets you ──────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead eyebrow="What it unlocks" title="The stake is the key to the rest of it." />
          </Reveal>

          <Reveal delay={80}>
            <Box sx={{ borderTop: '1px solid var(--border-subtle)' }}>
              {UNLOCKS.map(([title, body]) => (
                <Box
                  key={title}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.3fr' },
                    gap: { xs: 0.8, md: 4 },
                    py: { xs: 2.5, md: 3 },
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-heading)',
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    {body}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead eyebrow="Questions" title="The ones that actually get asked." />
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {FAQ.map(([q, a]) => (
                <Box
                  key={q}
                  sx={{
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    p: { xs: 2.5, md: 3 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      letterSpacing: '-0.015em',
                      color: 'var(--text-heading)',
                      mb: 1.2,
                    }}
                  >
                    {q}
                  </Typography>
                  <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    {a}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── Close ──────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box
              sx={{
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-section-alt)',
                px: { xs: 3, md: 6 },
                py: { xs: 5, md: 7 },
                textAlign: 'center',
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.9rem', md: '2.6rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.1,
                  color: 'var(--text-heading)',
                  maxWidth: '18ch',
                  mx: 'auto',
                  textWrap: 'balance',
                }}
              >
                Hold it, stake it, spend what it makes.
              </Typography>
              <Typography
                sx={{
                  mt: 2.5,
                  fontSize: '1.02rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  maxWidth: '58ch',
                  mx: 'auto',
                }}
              >
                The stake earns, the HEY it mints pays for the models, and the $OPEN behind both
                is still yours the whole time.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4, justifyContent: 'center' }}>
                <Button href={APP} primary>
                  Start staking
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href="/docs">See what you can build</Button>
              </Box>

              <Typography
                sx={{
                  mt: 4,
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  maxWidth: '66ch',
                  mx: 'auto',
                }}
              >
                Staking rewards are not a guarantee. The base rate is fixed; the variable share is
                not, and can be zero. Nothing here is investment advice. Read the terms before you
                stake.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
