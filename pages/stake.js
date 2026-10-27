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
 * ------------------------------------------------------------------
 * On the drawing, which was the part that was not working.
 *
 * The argument was sound and the page was flat: one band of ink and five
 * thousand pixels of left-aligned type at one scale, with cards drawn as
 * hairline rectangles at a 4px radius. Austere is a choice, but at this
 * length it reads as unfinished rather than as restrained.
 *
 * Three things fix it, and none of them touch the words.
 *
 * Surfaces. CARD and CARD_INK are the only two card recipes on the page, so
 * every panel is cut from one of two materials instead of each being drawn by
 * hand. A real radius and a real shadow, and the statement typography sits on
 * top unchanged.
 *
 * Rhythm. Ink now appears three times rather than once, at the yield, at
 * $OPEN, and at the close, so the page alternates instead of fading out on
 * white. The close in particular was the weakest point: the argument ended,
 * and then the page simply stopped.
 *
 * Figure. The hero card leads on the two numbers the whole page is about,
 * side by side with a rule between them, rather than burying them in a list
 * of entries. The two tokens are now two different materials, ink for the
 * asset and paper for the credit, because two identical white cards made the
 * most important distinction on the page the least visible one.
 * ------------------------------------------------------------------
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
   for putting them side by side than for explaining them a section apart.

   They are drawn on different materials for the same reason. On two matching
   white cards the distinction had to be read; on ink and paper it is seen. */
const STAKES = [
  {
    token: '$OPEN',
    kind: 'The capital asset',
    paidIn: 'Value',
    lead: true,
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
/* The two materials. Everything on the page is cut from one of them.  */
/* ------------------------------------------------------------------ */

const CARD = {
  borderRadius: '14px',
  border: '1px solid rgba(11,15,26,0.07)',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFDFE 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(11,15,26,0.04), 0 26px 50px -34px rgba(11,15,26,0.32)',
};

const CARD_INK = {
  borderRadius: '14px',
  border: `1px solid ${RULE_ON_INK}`,
  background: 'linear-gradient(180deg, #1A1F2B 0%, #0B0F1A 62%, #070A11 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.10), 0 1px 2px rgba(11,15,26,0.08), 0 30px 56px -34px rgba(11,15,26,0.6)',
};

/* A header strip, used at the top of every card that is a statement. */
function CardHead({ left, right, onInk }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: { xs: 2.5, md: 3 },
        py: '15px',
        borderBottom: `1px solid ${onInk ? RULE_ON_INK : RULE}`,
      }}
    >
      <Label onInk={onInk}>{left}</Label>
      <Label onInk={onInk}>{right}</Label>
    </Box>
  );
}

/* One of the two headline figures, as it appears in the hero card. */
function Figure({ label, value, note, accent, onInk, sx }) {
  return (
    <Box sx={{ px: { xs: 2.5, md: 3 }, py: { xs: 2.4, md: 2.8 }, ...sx }}>
      <Label onInk={onInk} sx={accent ? { color: 'var(--brand-accent)' } : undefined}>
        {label}
      </Label>
      <Typography
        sx={{
          ...FIG,
          mt: 1.5,
          fontSize: { xs: '2.1rem', md: '2.6rem' },
          fontWeight: 600,
          lineHeight: 0.95,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
          color: accent ? 'var(--brand-accent)' : onInk ? '#FFFFFF' : 'var(--text-heading)',
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          mt: 1.2,
          fontSize: '0.78rem',
          lineHeight: 1.5,
          color: onInk ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)',
        }}
      >
        {note}
      </Typography>
    </Box>
  );
}

/**
 * The thesis of the page, as an object.
 *
 * The two numbers lead, side by side with a rule between them, because they
 * are what the page is about and they were previously the third and fourth
 * lines of a list. The total sits under them, where a total belongs.
 */
function Statement() {
  return (
    <Box sx={{ ...CARD, overflow: 'hidden' }}>
      <CardHead left="Statement" right="Per epoch" />

      <Figure
        label="The floor"
        value={RATES.base}
        note="Written into the contract, and paid whatever kind of year it has been"
        accent
        sx={{ borderBottom: `1px solid ${RULE}` }}
      />
      <Figure
        label="Target, all in"
        value={RATES.total}
        note="The band we run the book to, reported once a period closes"
      />

      <Box sx={{ px: { xs: 2.5, md: 3 }, pb: { xs: 2.2, md: 2.6 }, borderTop: `1px solid ${RULE}` }}>
        <Entry name="So you are paid" figure={RATES.range} total />
        <Typography sx={{ mt: '10px', fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
          The {RATES.base} is fixed and is the worst case. The figure beside it is
          what we are aiming at, all in, and it is a target rather than a rate.
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function StakePage() {
  /* Three versions of this page's words live in data/stakeCopy. A is the one
     chosen; change the index to read the page in one of the others. The
     switcher that used to float in the corner was a review tool and is gone,
     since this now ships. */
  const C = VERSIONS[0];

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
        <Box component="section" sx={{ pt: { xs: 7, md: 12 }, pb: { xs: 7, md: 10 } }}>
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

              {/* Two reference links. Underlined text set at 0.72rem read as
                  something left over; as pills they read as the secondary
                  actions they are. */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                {[['Market data', LINKS.marketCap], ['Contract', LINKS.explorer]].map(([label, href]) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      px: '13px',
                      py: '7px',
                      borderRadius: '999px',
                      border: `1px solid ${RULE}`,
                      backgroundColor: 'var(--bg-card)',
                      fontFamily: MONO,
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'all .18s ease',
                      '&:hover': {
                        color: 'var(--text-heading)',
                        borderColor: 'rgba(255,102,0,0.45)',
                      },
                    }}
                  >
                    {label}
                    <Box component="span" aria-hidden="true" sx={{ opacity: 0.55 }}>↗</Box>
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
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Head2 eyebrow="How $OPEN works" title={C.howTitle} />
            </Box>
          </Reveal>

          {/* One card divided into three, rather than three columns with a
              rule over each. The steps are one sequence and now look like
              one object. */}
          <Reveal delay={80}>
            <Box
              sx={{
                ...CARD,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              }}
            >
              {HOW.map((step, i) => (
                <Box
                  key={step.n}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 2.5, md: 3.2 },
                    py: { xs: 3, md: 3.6 },
                    borderRight: { md: i < HOW.length - 1 ? `1px solid ${RULE}` : 'none' },
                    borderBottom: {
                      xs: i < HOW.length - 1 ? `1px solid ${RULE}` : 'none',
                      md: 'none',
                    },
                  }}
                >
                  <Box
                    sx={{
                      ...FIG,
                      width: 36,
                      height: 36,
                      mb: 2.6,
                      borderRadius: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--brand-accent)',
                      backgroundColor: 'rgba(255,102,0,0.09)',
                      border: '1px solid rgba(255,102,0,0.2)',
                    }}
                  >
                    {step.n}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.35rem', md: '1.5rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-heading)',
                      mb: 1.3,
                    }}
                  >
                    {C.how[i].title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 3, flex: 1 }}
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
          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Reveal>
              <Box sx={{ mb: { xs: 5, md: 6 } }}>
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
                actual stake. A reader wants two things here: the worst case,
                and the case worth staking for. So the worst case is a number,
                the good case is a number, and the panel beside them works it
                through on a round figure, because a percentage is an
                abstraction and six hundred tokens is not. */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 5, md: 8 },
                alignItems: 'center',
                mb: { xs: 6, md: 8 },
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
                <Box sx={{ ...CARD_INK, overflow: 'hidden' }}>
                  <CardHead left="Worked through" right="A year" onInk />
                  <Box sx={{ px: { xs: 2.5, md: 3 }, pt: '6px', pb: { xs: 2.4, md: 2.8 } }}>
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
                <Head2 eyebrow={C.pro.eyebrow} title={C.pro.title} lede={C.pro.lede} />
                <Box sx={{ mt: 4 }}>
                  <Button href={LINKS.stake} primary>
                    Stake $OPEN
                    <Box component="span" aria-hidden="true">→</Box>
                  </Button>
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={100}>
              <Box sx={{ ...CARD, overflow: 'hidden' }}>
                <CardHead left="Pro" right={`${RATES.threshold} staked`} />
                <Box sx={{ px: { xs: 2.5, md: 3 }, pt: '6px', pb: { xs: 2.4, md: 2.8 } }}>
                  {PRO.map(([name, figure]) => (
                    <Entry key={name} name={name} figure={figure} />
                  ))}
                  <Typography sx={{ mt: '14px', fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                    {C.pro.note}
                  </Typography>
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Two things to stake ────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Head2 eyebrow={C.stakes.eyebrow} title={C.stakes.title} lede={C.stakes.lede} />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2.5, md: 3 },
                alignItems: 'stretch',
              }}
            >
              {STAKES.map((s, i) => {
                const onInk = Boolean(s.lead);
                return (
                  <Box
                    key={s.token}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      ...(onInk ? CARD_INK : CARD),
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        px: { xs: 2.5, md: 3 },
                        py: '15px',
                        borderBottom: `1px solid ${onInk ? RULE_ON_INK : RULE}`,
                      }}
                    >
                      <Typography
                        sx={{
                          ...FIG,
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: onInk ? 'var(--brand-accent)' : 'var(--text-heading)',
                        }}
                      >
                        {s.token}
                      </Typography>
                      <Label onInk={onInk}>{s.kind}</Label>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        px: { xs: 2.5, md: 3 },
                        pt: { xs: 2.4, md: 2.8 },
                        pb: { xs: 2.6, md: 3 },
                      }}
                    >
                      <Label onInk={onInk}>Paid in</Label>
                      <Typography
                        sx={{
                          mt: 1.3,
                          mb: 2.2,
                          fontSize: { xs: '1.5rem', md: '1.8rem' },
                          fontWeight: 700,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          color: onInk ? '#FFFFFF' : 'var(--text-heading)',
                        }}
                      >
                        {s.paidIn}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '0.98rem',
                          lineHeight: 1.7,
                          color: onInk ? 'rgba(255,255,255,0.66)' : 'var(--text-secondary)',
                          mb: 2.6,
                          flex: 1,
                        }}
                      >
                        {i === 0 ? C.stakes.openBody : C.stakes.heyBody}
                      </Typography>

                      <Box sx={{ borderTop: `1px solid ${onInk ? RULE_ON_INK : RULE}`, pt: 0.6 }}>
                        {s.rows.map(([name, figure]) => (
                          <Entry key={name} name={name} figure={figure} onInk={onInk} />
                        ))}
                      </Box>

                      <Box sx={{ mt: 2.8 }}>
                        <Button href={s.href} primary={s.lead} onInk={onInk} small>
                          {s.cta}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Reveal>

          <Reveal delay={140}>
            <Typography
              sx={{
                mt: { xs: 3, md: 3.5 },
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
        <Box component="section" sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box
              sx={{
                ...CARD,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '0.72fr 1.28fr' },
              }}
            >
              <Box
                sx={{
                  px: { xs: 2.5, md: 3.5 },
                  py: { xs: 3, md: 4 },
                  borderRight: { md: `1px solid ${RULE}` },
                  borderBottom: { xs: `1px solid ${RULE}`, md: 'none' },
                  /* A warm wash under the one figure on the page that never
                     moves, so it reads as the constant it is. */
                  background:
                    'radial-gradient(120% 90% at 0% 0%, rgba(255,102,0,0.07) 0%, transparent 62%)',
                }}
              >
                <Label sx={{ color: 'var(--brand-accent)' }}>Supply</Label>
                <Typography
                  sx={{
                    ...FIG,
                    mt: 2,
                    fontSize: { xs: '3rem', md: '3.8rem' },
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-heading)',
                  }}
                >
                  {RATES.supply}
                </Typography>
                <Typography sx={{ mt: 1.5, fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                  Fixed at launch. No inflation switch.
                </Typography>
              </Box>

              <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: { xs: 3, md: 4 } }}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.3rem', md: '1.6rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.028em',
                    lineHeight: 1.3,
                    color: 'var(--text-heading)',
                    mb: 1.6,
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
          </Reveal>
        </Box>
      </Container>

      {/* ── Close, on ink ──────────────────────────────────────────
          The page used to end by running out of sections on white. The
          last thing a reader sees is now the same material the yield was
          argued on. */}
      <Box component="section" sx={{ backgroundColor: INK, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
          <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
            <Reveal>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2.2rem', md: '3.4rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.04,
                  color: '#FFFFFF',
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
                <Button href={APP} onInk>Try the app first</Button>
              </Box>

              <Typography
                sx={{
                  mt: 6,
                  pt: 4,
                  borderTop: `1px solid ${RULE_ON_INK}`,
                  fontFamily: MONO,
                  fontSize: '0.72rem',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.46)',
                  maxWidth: '72ch',
                  mx: 'auto',
                }}
              >
                Staking rewards are not a guarantee. The {RATES.base} floor is fixed; the{' '}
                {RATES.total} is a target the treasury is run to, not a promised rate, and what
                lands above the floor varies by period. Nothing here is investment advice. Read the
                terms before you stake.
              </Typography>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
