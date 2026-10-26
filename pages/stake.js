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
 * $OPEN, and what staking it does.
 *
 * Laid out to follow Venice's VVV page, which is the thing this was asked to
 * be like, with the same two tokens doing the same two jobs. $OPEN is the
 * capital asset you buy and stake, the way VVV is. HEY is minted only by
 * stakers and pays out credit every day, the way DIEM is. The section order
 * follows theirs too: how it works in three cards, then the capital asset,
 * then what staking unlocks, then the mint, then supply, then questions.
 *
 * The one thing we have that they do not is a yield in two parts, and that
 * is where the care goes. A fixed base rate and a variable share on top are
 * different kinds of promise, so the page never lets them look alike: the
 * base is a filled bar inside a solid card, the variable share is an open
 * dashed one with no fill, because no number can honestly sit in it ahead of
 * time. Someone who reads only the graphic still learns that the second part
 * is not owed to them.
 *
 * Two things the copy deliberately does and does not do. It does say that
 * the variable share only ever adds, which is true and is the reassuring
 * part: a period with nothing to share pays the base, it never pays less.
 * It does not say where that share comes from. Leaving the strategy off a
 * landing page is normal. Naming a source that is not the real one would be
 * an easier sentence and would be false, and on a yield product that is the
 * difference someone eventually asks about.
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
  supply: '[SUPPLY]',
};

/* Swap the # for the real destinations when they exist. */
const LINKS = {
  buy: '#',
  stake: '#',
  mint: '#',
  explorer: '#',
  marketCap: '#',
};

const APP = 'https://ais.openledger.xyz/chat';

/* The three moves, as on the page this follows: acquire, stake, mint. */
const HOW = [
  {
    n: '01',
    title: `Get $OPEN`,
    body: `An ERC-20 on ${RATES.chain}. Buy it on ${RATES.buyAt}, or anywhere else it trades.`,
    cta: 'Buy $OPEN',
    href: LINKS.buy,
  },
  {
    n: '02',
    title: 'Stake $OPEN',
    body: `Earn on everything you stake, and at ${RATES.proThreshold} the app stops being something you pay for.`,
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    n: '03',
    title: 'Mint HEY',
    body: `HEY is the second token here, and only stakers can make it. Each one pays out ${RATES.heyRate} of credit a day.`,
    cta: 'Mint HEY',
    href: LINKS.mint,
  },
];

const UNLOCKS = [
  ['Yield on the stake', 'A base rate on everything staked, and a variable share on top of it.'],
  ['The right to mint HEY', 'HEY is minted against staked $OPEN and nothing else. No stake, no mint.'],
  [`${RATES.proThreshold} unlocks the full app`, 'Stake the threshold and the subscription stops being something you pay for.'],
  ['A vote that costs something', 'Governance weight sits with the stake, so the people steering the network are the ones exposed to it.'],
];

const FAQ = [
  [
    'How is the yield paid?',
    `In $OPEN, every ${RATES.payout}, to the address holding the stake. The base rate and the variable share arrive together.`,
  ],
  [
    'Is the variable share guaranteed?',
    'No. It is declared per period rather than promised in advance, and it can be zero. What it cannot do is go backwards: a period with nothing to share still pays the base rate in full.',
  ],
  [
    'Can I unstake?',
    `Yes, after an unbonding period of ${RATES.unbond}. Stake that is backing minted HEY stays locked until that HEY is burned.`,
  ],
  [
    'What is HEY, exactly?',
    `A second token, minted only against staked $OPEN. Each one pays out ${RATES.heyRate} of credit every day, for any model on the network, for as long as you hold it.`,
  ],
  [
    'What happens to HEY when I unstake?',
    'Nothing, unless it was minted against the stake you are withdrawing. That HEY has to be burned first, which releases the $OPEN behind it.',
  ],
  [
    'How is this different from the tokenomics page?',
    'That page covers where $OPEN comes from and what takes it out of supply. This one covers what happens while you hold it.',
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

function SectionHead({ eyebrow, title, lede, center }) {
  return (
    <Box sx={{ maxWidth: 820, mb: { xs: 4, md: 6 }, mx: center ? 'auto' : 0, textAlign: center ? 'center' : 'left' }}>
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

function Button({ children, href, primary, small }) {
  const external = href.startsWith('http');
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    px: small ? '16px' : '22px',
    py: small ? '10px' : '13px',
    borderRadius: '9999px',
    fontSize: small ? '0.86rem' : '0.95rem',
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

  if (external || href === '#') {
    return (
      <Box
        component="a"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        sx={sx}
      >
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

/* The two parts of the yield, drawn so the difference is visible before
   anything is read. The base is a filled bar. The variable share is an open
   one, dashed, with no fill to measure, because there is no number that can
   honestly go in it ahead of time. */
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
          <Box sx={{ mt: 2, height: '10px', borderRadius: '5px', backgroundColor: 'var(--brand-accent)' }} />
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
            On top of it
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
            Variable, and only ever added. Never taken off the base.
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
          content="$OPEN is the capital asset of Hey Open. Stake it to earn a fixed base rate with a variable share on top, to unlock the full app, and to mint HEY, which pays out credit every day."
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
              <Eyebrow>The capital asset</Eyebrow>
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
                $OPEN is the capital asset of Hey Open. Stake it to earn a base rate with a
                variable share on top, to unlock the full app, and to mint HEY, which pays out
                credit every day for any model on the network.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href={LINKS.buy}>Buy $OPEN</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mt: 3 }}>
                {[['Market data', LINKS.marketCap], ['Contract', LINKS.explorer]].map(([label, href]) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    sx={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border-normal)',
                      pb: '2px',
                      '&:hover': { color: 'var(--text-heading)' },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <YieldMeter />
            </Reveal>
          </Box>
        </Box>

        {/* ── How it works, in three ─────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead eyebrow="How $OPEN works" title="Three moves, and the stake stays yours." center />
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {HOW.map((step) => (
                <Box
                  key={step.n}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '18px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    p: { xs: 3, md: 3.5 },
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
                      mb: 1.8,
                    }}
                  >
                    {step.n}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-heading)',
                      mb: 1.2,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 3, flex: 1 }}
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

        {/* ── The yield, in two parts ────────────────────────────── */}
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
                  /* Dashed, deliberately. This is not the same promise as the
                     card beside it and should not look like it. */
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
                  Additional
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
                  The share on top only ever adds.
                </Typography>
                <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  It is declared after a period rather than promised before it, so the size of it
                  moves and it can be nothing at all. What it cannot do is go backwards. A quiet
                  period pays the base rate in full, and a good one pays more than it.
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Stake to unlock the app ────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 4, md: 7 },
                alignItems: 'center',
              }}
            >
              <Box>
                <SectionHead
                  eyebrow="What it unlocks"
                  title={`Stake ${RATES.proThreshold} and stop paying for the app.`}
                  lede="Everything the subscription gets you, for as long as the stake is there. Unstake and it goes back to being a subscription, with nothing lost in between."
                />
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
              </Box>

              <Box sx={{ borderTop: '1px solid var(--border-subtle)' }}>
                {UNLOCKS.map(([title, body]) => (
                  <Box key={title} sx={{ py: { xs: 2.2, md: 2.6 }, borderBottom: '1px solid var(--border-subtle)' }}>
                    <Typography
                      sx={{
                        fontSize: '1.02rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-heading)',
                        mb: 0.8,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {body}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Mint HEY ───────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <Box
              sx={{
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-section-alt)',
                px: { xs: 3, md: 6 },
                py: { xs: 5, md: 7 },
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
                  gap: { xs: 3.5, md: 7 },
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Eyebrow>The second token</Eyebrow>
                  <Typography
                    component="h2"
                    sx={{
                      mt: 2,
                      fontSize: { xs: '2rem', md: '2.8rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.035em',
                      lineHeight: 1.08,
                      color: 'var(--text-heading)',
                      textWrap: 'balance',
                    }}
                  >
                    Mint HEY with staked $OPEN.
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2.5,
                      fontSize: '1.02rem',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      textWrap: 'pretty',
                    }}
                  >
                    HEY is how the network hands out use rather than money. Every HEY pays out{' '}
                    {RATES.heyRate} of credit a day, for any model in the catalogue, for as long
                    as you hold it. All of it is made from staked $OPEN, and nothing else can make
                    it. Use what it pays, or sell it to somebody who will.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
                    <Button href={LINKS.mint} primary>
                      Mint HEY
                      <Box component="span" aria-hidden="true">→</Box>
                    </Button>
                    <Button href="/docs">See what credit buys</Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    borderRadius: '18px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    p: { xs: 2.5, md: 3 },
                  }}
                >
                  {[
                    ['Minted from', 'Staked $OPEN only'],
                    ['Pays out', `${RATES.heyRate} of credit, daily`],
                    ['Good for', 'Every model on the network'],
                    ['Runs for', 'As long as you hold it'],
                    ['To unlock the stake', 'Burn the HEY'],
                  ].map(([k, v], i, arr) => (
                    <Box
                      key={k}
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: 2,
                        py: 1.6,
                        borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{k}</Typography>
                      <Typography
                        sx={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: 'var(--text-heading)',
                          textAlign: 'right',
                        }}
                      >
                        {v}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Supply ─────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
          <Reveal>
            <SectionHead
              eyebrow="Supply"
              title="Bought back and burned, not printed."
              lede={`$OPEN launched with a fixed supply of ${RATES.supply}. A share of what the product earns buys $OPEN on the open market, rewards the providers doing the work, and burns what the network does not need. Less supply, verifiably, rather than more.`}
            />
            <Button href="/token">Read the tokenomics</Button>
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
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.9rem', md: '2.8rem' },
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
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href={APP}>Try the app first</Button>
              </Box>

              <Typography
                sx={{
                  mt: 5,
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  maxWidth: '66ch',
                  mx: 'auto',
                }}
              >
                Staking rewards are not a guarantee. The base rate is fixed; the share on top is
                not, and can be zero in any period. Nothing here is investment advice. Read the
                terms before you stake.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
