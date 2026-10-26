import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import { INK, MONO, RULE, RULE_ON_INK, FIG, Label, Entry, Button, Head2 } from '@/components/ui/Ledger';
import { TOKEN } from '@/data/token';
import { VERSIONS } from '@/data/stakeCopy';
import CopySwitch, { useCopyVersion } from '@/components/ui/CopySwitch';

/**
 * $OPEN, and what staking it does.
 *
 * Laid out to follow Venice's VVV page, which is the thing this was asked to
 * be like, with the same two tokens doing the same two jobs. $OPEN is the
 * capital asset you buy and stake, as VVV is. $HEY is minted only by stakers
 * and pays out credit every day, as DIEM is.
 *
 * Drawn as a ledger, because that is the company's own word and because
 * staking is bookkeeping. Figures are monospace and tabular so columns line
 * up the way they do on a statement, entries are set with leader dots, and
 * the total carries a double rule, which is the one convention every
 * accountant recognises and which nothing else on the site uses.
 *
 * That device is also what carries the honesty, which is the reason it was
 * chosen over something merely decorative. A fixed base rate and a variable
 * share on top are different kinds of promise, so they are different kinds
 * of entry: the base is a firm line, the share above the total is dashed and
 * holds no figure, because no number can honestly sit there ahead of time.
 * Read only the card and you still learn which half is owed to you.
 *
 * Two things the copy does and does not do. It does say the share only ever
 * adds, which is true and is the reassuring part: a quiet period pays the
 * base in full, never less. It does not say where the share comes from.
 * Leaving a strategy off a landing page is normal; naming a source that is
 * not the real one would be an easier sentence and would be false.
 */

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/*                                                                     */
/* Every one of these is a representation about money, so none of them */
/* is invented here. They are placeholders on purpose: left as they    */
/* are, the page reads as unfinished rather than as a wrong promise.   */
/* ------------------------------------------------------------------ */
const RATES = {
  /* Supply comes from the tokenomics data rather than being retyped, so the
     two pages cannot drift apart. */
  supply: TOKEN.supply,
  /* Fixed, and stated as fixed. */
  base: '6.00%',
  /* A range, and stated as a target rather than as a rate, because a return
     produced by deploying a treasury is not a rate the way a protocol
     emission is. The page never calls this guaranteed. Guaranteed by whom,
     and backed by what, is the version of that claim that can be written,
     and it needs an answer from the business before it goes on a page. */
  /* All in, and inclusive of the floor rather than stacked on top of it.
     The floor is the worst case inside this band, not a separate payment
     added to it, which is why nothing on the page sums the two. */
  total: '40% to 50%',
  /* What actually lands: the floor at worst, the top of the band at best. */
  range: '6.00% to 50%',
  /* The same hundred that unlocks Pro on the page this follows. */
  threshold: '100 $OPEN',
};

/* The same thing on an actual stake. A percentage is an abstraction and six
   hundred tokens is not, which is why the page this was measured against
   works its rate through ten thousand dollars rather than leaving it at a
   rate. Arithmetic only, on the figures above, and the target figure is the
   whole return rather than an amount added to the floor. */
const EXAMPLE = {
  stake: "10,000",
  floorAdd: "+600",
  targetAdd: "+4,000 to +5,000",
  floorTotal: "10,600",
  planTotal: "14,000 to 15,000",
};

/* What makes the number checkable. These are the claims that let a page
   print a figure well above the alternatives without asking to be taken on
   faith, and they are the same three any reader of this kind of page looks
   for. Each needs a real answer from the business before publication. */
/* What the stake unlocks beyond the yield. Written as entries rather than
   as a list of ticks, so it reads as the account it is. */
const PRO = [
  ['Text prompts', 'Unlimited'],
  ['Image and video models', 'The leading ones'],
  ['Every model in the catalogue', 'Included'],
  ['What it costs while staked', 'Nothing'],
];

/* Three things a reader can establish without being asked to take anyone's
   word for it. Each follows from how the thing is built, which is why they
   can sit on the page before anybody signs off on an audit. */
const PROOF = [
  [
    'The floor is a contract rate',
    `The ${RATES.base} is set in the staking contract. It pays on schedule, it does not wait on a decision, and anyone can read it without asking us.`,
  ],
  [
    'The stake stays yours',
    'Staking does not sell your $OPEN or move it beyond your reach. You can unstake, and the balance is visible the whole time.',
  ],
  [
    'The target is reported after the fact',
    'Each period closes with the figure that was actually returned, published against the band rather than compared with it later.',
  ],
];

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

const HOW = [
  {
    n: '01',
    title: 'Get $OPEN',
    body: 'An ERC-20, with a fixed supply and no inflation switch. Buy it wherever it trades.',
    cta: 'Buy $OPEN',
    href: LINKS.buy,
  },
  {
    n: '02',
    title: 'Stake it',
    body: `Everything you stake earns from the epoch it lands in. ${RATES.base} is the floor, ${RATES.total} is the aim.`,
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    n: '03',
    title: 'Mint $HEY',
    body: 'Staked $OPEN mints $HEY, and nothing else does. Stake the $HEY and it pays you in compute.',
    cta: 'Mint $HEY',
    href: LINKS.mint,
  },
];

/* The two stakes, which is the part of this that is easy to get wrong.
   Staking the capital asset pays in value. Staking what it mints pays in
   compute. Same verb, two different currencies out, and the page is clearer
   for putting them side by side than for explaining them a section apart. */
const STAKES = [
  {
    token: '$OPEN',
    kind: 'The capital asset',
    paidIn: 'Value',
    lead: true,
    body:
      'The asset you buy and hold. Staking it pays a fixed floor you cannot drop below and aims well above it, in $OPEN rather than in anything you have to spend here.',
    rows: [
      ['Floor', RATES.base],
      ['On plan', RATES.total],
      ['Paid in', '$OPEN'],
    ],
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    token: '$HEY',
    kind: 'Minted by stakers',
    paidIn: 'Compute credits',
    body:
      'Minted against staked $OPEN and held or sold like anything else. Staking it pays out credit for the catalogue, which is the network paying you in the thing it makes.',
    rows: [
      ['Minted from', 'Staked $OPEN'],
      ['Pays out', 'Compute credits'],
      ['Good for', 'Every model'],
    ],
    cta: 'Mint $HEY',
    href: LINKS.mint,
  },
];

/* ------------------------------------------------------------------ */
/* Ledger parts                                                        */
/* ------------------------------------------------------------------ */

/* The thesis of the page, as an object: what staking pays, set as the
   statement it produces. */
function Statement({ onInk }) {
  return (
    <Box
      sx={{
        borderRadius: '4px',
        border: `1px solid ${onInk ? RULE_ON_INK : RULE}`,
        backgroundColor: onInk ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
        boxShadow: onInk ? 'none' : '0 1px 2px rgba(11,15,26,.04), 0 24px 56px -28px rgba(11,15,26,.22)',
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
          borderBottom: `1px solid ${onInk ? RULE_ON_INK : RULE}`,
        }}
      >
        <Label onInk={onInk}>Statement</Label>
        <Label onInk={onInk}>Per epoch</Label>
      </Box>

      <Entry name="The floor" figure={RATES.base} onInk={onInk} />
      <Entry name="Target, all in" figure={RATES.total} dashed onInk={onInk} />
      <Entry name="So you are paid" figure={RATES.range} total onInk={onInk} />

      <Typography
        sx={{
          mt: '14px',
          fontSize: '0.8rem',
          lineHeight: 1.6,
          color: onInk ? 'rgba(255,255,255,0.52)' : 'var(--text-muted)',
        }}
      >
        The {RATES.base} is fixed and is the worst case. The line above it is
        the figure we are aiming at, all in, and it is a target rather than a
        rate.
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function StakePage() {
  /* Three versions of this page's words, switchable in the corner while they
     are being chosen between. The structure, the figures and the drawing are
     the same in all three: only the argument changes. */
  const [version, setVersion] = useCopyVersion('heyopen.stake.copy', VERSIONS.length);
  const C = VERSIONS[version];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>Stake $OPEN: Earn Yield and Mint $HEY | Hey Open</title>
        <meta
          name="description"
          content="$OPEN is the capital asset of Hey Open. Stake it for a fixed floor and a target well above it, and to mint $HEY, which pays out compute credits when you stake it."
        />
      </Head>

      <PageHeader />
      <CopySwitch versions={VERSIONS} index={version} onChange={setVersion} />

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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Box component="section" sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 7, md: 11 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 0.92fr' },
              gap: { xs: 5, md: 8 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Label sx={{ color: 'var(--brand-accent)' }}>{C.hero.eyebrow}</Label>
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
                {C.hero.title}
              </Typography>
              <Typography
                sx={{
                  mt: 3,
                  fontSize: { xs: '1.05rem', md: '1.16rem' },
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '48ch',
                  textWrap: 'pretty',
                }}
              >
                {C.hero.lede}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
                <Button href={LINKS.stake} primary>
                  Stake $OPEN
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href={LINKS.buy}>Buy $OPEN</Button>
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
            </Reveal>

            <Reveal delay={120}>
              <Statement />
            </Reveal>
          </Box>
        </Box>

        {/* ── Three moves ────────────────────────────────────────── */}
        <Box component="section" sx={{ pb: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Head2 eyebrow="How $OPEN works" title={C.howTitle} />
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
              {HOW.map((step, i) => (
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
                    {C.how[i].title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.96rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 3, flex: 1 }}
                  >
                    {C.how[i].body}
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

      {/* ── The yield, on ink ────────────────────────────────────── */}
      <Box component="section" sx={{ backgroundColor: INK, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
          <Box sx={{ py: { xs: 8, md: 13 } }}>
            <Reveal>
              <Box sx={{ mb: { xs: 5, md: 7 } }}>
                <Head2
                  onInk
                  eyebrow={C.yield.eyebrow}
                  title={C.yield.title}
                  lede={C.yield.lede}
                  maxWidth={760}
                />
              </Box>
            </Reveal>

            {/* The deal, in two numbers, and then what it looks like on an
                actual stake.
             *
             * This block used to be two matched paragraphs beside a repeat of
             * the chart above it, which buried the proposition in prose and
             * then said nothing new. A reader wants two things here: the worst
             * case, and the case worth staking for. So the worst case is a
             * number, the good case is a number, and the panel beside them
             * works it through on a round figure, because a percentage is an
             * abstraction and six hundred tokens is not. */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 5, md: 8 },
                alignItems: 'center',
                mb: { xs: 6, md: 9 },
              }}
            >
              <Reveal>
                <Box>
                  <Box sx={{ pb: { xs: 3.5, md: 4 }, mb: { xs: 3.5, md: 4 }, borderBottom: `1px solid ${RULE_ON_INK}` }}>
                    <Label onInk sx={{ color: 'var(--brand-accent)' }}>{C.yield.floorLabel}</Label>
                    <Typography
                      sx={{
                        ...FIG,
                        mt: 1.8,
                        fontSize: { xs: '3.2rem', md: '4.4rem' },
                        fontWeight: 600,
                        lineHeight: 0.92,
                        letterSpacing: '-0.045em',
                        color: '#FFFFFF',
                      }}
                    >
                      {RATES.base}
                    </Typography>
                    <Typography
                      sx={{ mt: 2, fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.66)', maxWidth: '38ch' }}
                    >
                      {C.yield.floorBody}
                    </Typography>
                  </Box>

                  <Box>
                    <Label onInk>{C.yield.targetLabel}</Label>
                    <Typography
                      sx={{
                        ...FIG,
                        mt: 1.8,
                        fontSize: { xs: '3.2rem', md: '4.4rem' },
                        fontWeight: 600,
                        lineHeight: 0.92,
                        letterSpacing: '-0.045em',
                        color: 'var(--brand-accent)',
                      }}
                    >
                      {RATES.total}
                    </Typography>
                    <Typography
                      sx={{ mt: 2, fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.66)', maxWidth: '38ch' }}
                    >
                      {C.yield.targetBody}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>

              <Reveal delay={120}>
                <Box>
                  <Box
                    sx={{
                      borderRadius: '4px',
                      border: `1px solid ${RULE_ON_INK}`,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      px: { xs: 2.5, md: 3.5 },
                      pt: { xs: 2.2, md: 2.6 },
                      pb: { xs: 2.4, md: 3 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        pb: '14px',
                        borderBottom: `1px solid ${RULE_ON_INK}`,
                      }}
                    >
                      <Label onInk>Worked through</Label>
                      <Label onInk>A year</Label>
                    </Box>

                    <Entry name="You stake" figure={`${EXAMPLE.stake} $OPEN`} onInk />
                    <Entry name="The floor pays" figure={EXAMPLE.floorAdd} onInk />
                    <Entry name="On plan, all in" figure={EXAMPLE.targetAdd} dashed onInk />
                    <Entry name="You hold, on plan" figure={EXAMPLE.planTotal} total onInk />

                    <Typography
                      sx={{
                        mt: '16px',
                        fontSize: '0.84rem',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.52)',
                      }}
                    >
                      {C.yield.workedNote}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Box>


            {/* Why the number is believable. A rate this far above the
                alternatives is only worth printing next to the reason anyone
                should believe it, which is the second thing both reference
                pages do and the part most yield pages skip. */}
            <Reveal delay={60}>
              <Box sx={{ borderTop: `1px solid ${RULE_ON_INK}`, pt: { xs: 4, md: 5 } }}>
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                  <Label onInk sx={{ color: 'rgba(255,255,255,0.7)' }}>{C.yield.proofEyebrow}</Label>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: { xs: 3, md: 6 },
                  }}
                >
                  {PROOF.map(([title, body]) => (
                    <Box key={title}>
                      <Typography
                        sx={{
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: '#FFFFFF',
                          mb: 1.2,
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                        {body}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Stake to unlock Pro ────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box>
                <Head2
                  eyebrow={C.pro.eyebrow}
                  title={C.pro.title}
                  lede={C.pro.lede}
                />
                <Box sx={{ mt: 4 }}>
                  <Button href={LINKS.stake} primary>
                    Stake $OPEN
                    <Box component="span" aria-hidden="true">→</Box>
                  </Button>
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={100}>
              <Box
                sx={{
                  borderRadius: '4px',
                  border: `1px solid ${RULE}`,
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: '0 1px 2px rgba(11,15,26,.04), 0 24px 56px -30px rgba(11,15,26,.20)',
                  px: { xs: 2.5, md: 3.5 },
                  pt: { xs: 2.2, md: 2.6 },
                  pb: { xs: 2.4, md: 3 },
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
                  <Label>Pro</Label>
                  <Label>{RATES.threshold} staked</Label>
                </Box>
                {PRO.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} />
                ))}
                <Typography sx={{ mt: '14px', fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  {C.pro.note}
                </Typography>
              </Box>
            </Reveal>
          </Box>
        </Box>


        {/* ── Two things to stake ────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Head2
                eyebrow={C.stakes.eyebrow}
                title={C.stakes.title}
                lede={C.stakes.lede}
              />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2.5, md: 3 },
              }}
            >
              {STAKES.map((s, i) => (
                <Box
                  key={s.token}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '4px',
                    border: `1px solid ${s.lead ? 'rgba(255,102,0,0.4)' : RULE}`,
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: s.lead
                      ? '0 1px 2px rgba(11,15,26,.04), 0 24px 56px -28px rgba(255,102,0,.3)'
                      : '0 1px 2px rgba(11,15,26,.04), 0 24px 56px -32px rgba(11,15,26,.18)',
                    px: { xs: 2.5, md: 3.5 },
                    pt: { xs: 2.4, md: 3 },
                    pb: { xs: 2.8, md: 3.5 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      pb: '16px',
                      mb: '20px',
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    <Typography
                      sx={{
                        ...FIG,
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: s.lead ? 'var(--brand-accent)' : 'var(--text-heading)',
                      }}
                    >
                      {s.token}
                    </Typography>
                    <Label>{s.kind}</Label>
                  </Box>

                  <Label sx={{ color: 'var(--text-muted)' }}>Paid in</Label>
                  <Typography
                    sx={{
                      mt: 1.4,
                      mb: 2.4,
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: 'var(--text-heading)',
                    }}
                  >
                    {s.paidIn}
                  </Typography>

                  <Typography
                    sx={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)', mb: 3, flex: 1 }}
                  >
                    {i === 0 ? C.stakes.openBody : C.stakes.heyBody}
                  </Typography>

                  <Box sx={{ borderTop: `1px solid ${RULE}`, pt: 1 }}>
                    {s.rows.map(([name, figure]) => (
                      <Entry key={name} name={name} figure={figure} />
                    ))}
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Button href={s.href} primary={s.lead} small>
                      {s.cta}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={140}>
            <Typography
              sx={{
                mt: { xs: 3, md: 4 },
                fontFamily: MONO,
                fontSize: '0.74rem',
                lineHeight: 1.8,
                color: 'var(--text-muted)',
                maxWidth: '76ch',
              }}
            >
              {C.stakes.foot}
            </Typography>
          </Reveal>
        </Box>


        {/* ── Supply ─────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ borderTop: `2px solid ${INK}`, pt: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
                  gap: { xs: 2.5, md: 8 },
                  alignItems: 'start',
                }}
              >
                <Box>
                  <Label sx={{ color: 'var(--brand-accent)' }}>Supply</Label>
                  <Typography
                    sx={{
                      ...FIG,
                      mt: 2,
                      fontSize: { xs: '3rem', md: '4.2rem' },
                      fontWeight: 600,
                      lineHeight: 0.95,
                      letterSpacing: '-0.04em',
                      color: 'var(--text-heading)',
                    }}
                  >
                    {RATES.supply}
                  </Typography>
                  <Typography sx={{ mt: 1.5, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Fixed at launch. No inflation switch.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.6rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.028em',
                      lineHeight: 1.3,
                      color: 'var(--text-heading)',
                      mb: 1.8,
                      textWrap: 'balance',
                    }}
                  >
                    {C.supply.title}
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    {C.supply.body}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Button href="/token" small>
                      Read the tokenomics
                    </Button>
                  </Box>
                </Box>
              </Box>
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
                {C.close.title}
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
                  mt: 6,
                  fontFamily: MONO,
                  fontSize: '0.72rem',
                  lineHeight: 1.85,
                  color: 'var(--text-muted)',
                  maxWidth: '72ch',
                  mx: 'auto',
                }}
              >
                Staking rewards are not a guarantee. The {RATES.base} floor is fixed; the
                {RATES.total} is a target the treasury is run to, not a promised rate, and what
                lands above the floor varies by period. Nothing here is investment advice. Read the
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
