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
 * capital asset you buy and stake, as VVV is. HEY is minted only by stakers
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

/* ---- page scoped tokens ------------------------------------------ */
/* Ink is a near black with a blue cast rather than a true black, so the
   dark band reads as paper stock rather than as a hole in the page. */
const INK = '#0B0F1A';
const MONO = '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const RULE = 'rgba(11, 15, 26, 0.14)';
const RULE_ON_INK = 'rgba(255, 255, 255, 0.20)';
const FIG = { fontFamily: MONO, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' };

/* ------------------------------------------------------------------ */
/* Fill these in before the page goes live.                            */
/*                                                                     */
/* Every one of these is a representation about money, so none of them */
/* is invented here. They are placeholders on purpose: left as they    */
/* are, the page reads as unfinished rather than as a wrong promise.   */
/* ------------------------------------------------------------------ */
const RATES = {
  /* Fixed, and stated as fixed. */
  base: '6.00%',
  /* A range, and stated as a target rather than as a rate, because a return
     produced by deploying a treasury is not a rate the way a protocol
     emission is. The page never calls this guaranteed. Guaranteed by whom,
     and backed by what, is the version of that claim that can be written,
     and it needs an answer from the business before it goes on a page. */
  addLow: '40%',
  addHigh: '50%',
  /* Not a sum. Whether the target is added to the base or already includes
     it is the business's to say, and doing that arithmetic here would be
     inventing the headline number. Say what it is made of instead. */
  total: '6.00% plus target',
  payout: '[PERIOD]',
  unbond: '[UNBONDING]',
  threshold: '[THRESHOLD]',
  heyRate: '[CREDIT]',
  buyAt: '[EXCHANGE]',
  chain: '[CHAIN]',
  supply: '[SUPPLY]',
  benchAsOf: 'as of [DATE]',
  benchSource: '[SOURCES]',
};

/* The comparison, and the scale it is drawn on.
 *
 * A rate means nothing on its own, so the section shows it next to what the
 * same money earns elsewhere. The benchmark figures below are the ones that
 * need checking before this page is published, and the footnote under the
 * chart carries the date and the source so a reader can check them too. They
 * are set as numbers rather than as placeholder text because the bars have to
 * be drawn to a scale, and a bar cannot be drawn from the word SAVINGS. */
const BENCH = [
  { label: 'A savings account', value: 0.4, figure: '0.40%' },
  { label: 'Treasury bills, three month', value: 4, figure: '4.00%' },
  { label: 'Lending a stablecoin onchain', value: 8, figure: '8.00%' },
  { label: 'Staked $OPEN', base: 6, low: 40, high: 50, ours: true },
];
/* The axis runs to the top of our own band, so every bar is drawn true. */
const SCALE = 56;

/* What makes the number checkable. These are the claims that let a page
   print a figure well above the alternatives without asking to be taken on
   faith, and they are the same three any reader of this kind of page looks
   for. Each needs a real answer from the business before publication. */
const PROOF = [
  [
    'The floor is on chain',
    `The ${RATES.base} is a protocol rate. It is set in the contract, it pays on schedule, and you do not have to trust anyone to read it.`,
  ],
  [
    'The target is reported, not asserted',
    'Each period closes with the figure the treasury actually returned, published against the band rather than compared to it afterwards. [WHERE IT IS PUBLISHED]',
  ],
  [
    'The book is examined',
    'Reserves and controls are reviewed by somebody who does not work here. [WHO AUDITS IT, AND HOW OFTEN]',
  ],
];

/* Swap the # for the real destinations when they exist. */
const LINKS = { buy: '#', stake: '#', mint: '#', explorer: '#', marketCap: '#' };
const APP = 'https://ais.openledger.xyz/chat';

const HOW = [
  {
    n: '01',
    title: 'Get $OPEN',
    body: `An ERC-20 on ${RATES.chain}. Buy it on ${RATES.buyAt}, or anywhere else it trades.`,
    cta: 'Buy $OPEN',
    href: LINKS.buy,
  },
  {
    n: '02',
    title: 'Stake it',
    body: `Earn on everything you stake, and at ${RATES.threshold} the app stops being something you pay for.`,
    cta: 'Stake $OPEN',
    href: LINKS.stake,
  },
  {
    n: '03',
    title: 'Mint HEY',
    body: `The second token here, and only stakers can make it. Each one pays out ${RATES.heyRate} of credit a day.`,
    cta: 'Mint HEY',
    href: LINKS.mint,
  },
];

const UNLOCKS = [
  ['Yield on the stake', 'Base rate, plus the share on top'],
  ['The right to mint HEY', 'Staked $OPEN only'],
  ['The full app', `At ${RATES.threshold} staked`],
  ['Governance weight', 'Carried by the stake'],
];

const HEY_SPEC = [
  ['Minted from', 'Staked $OPEN only'],
  ['Pays out', `${RATES.heyRate} of credit, daily`],
  ['Good for', 'Every model on the network'],
  ['Runs for', 'As long as you hold it'],
  ['To release the stake', 'Burn the HEY'],
];

const FAQ = [
  [
    'How is the yield paid?',
    `In $OPEN, every ${RATES.payout}, to the address holding the stake. Both entries arrive together.`,
  ],
  [
    'Is the share on top guaranteed?',
    'No. It is declared after a period rather than promised before it, and it can be nothing. What it cannot do is go backwards: a quiet period still pays the base rate in full.',
  ],
  [
    'Can I unstake?',
    `Yes, after an unbonding period of ${RATES.unbond}. Stake backing minted HEY stays locked until that HEY is burned.`,
  ],
  [
    'What is HEY, exactly?',
    `A second token, minted only against staked $OPEN. Each one pays out ${RATES.heyRate} of credit every day, for any model on the network, for as long as you hold it.`,
  ],
  [
    'What happens to HEY when I unstake?',
    'Nothing, unless it was minted against the stake you are withdrawing. That HEY is burned first, which releases the $OPEN behind it.',
  ],
  [
    'How is this different from the tokenomics page?',
    'That page covers where $OPEN comes from and what takes it out of supply. This one covers what happens while you hold it.',
  ],
];

/* ------------------------------------------------------------------ */
/* Ledger parts                                                        */
/* ------------------------------------------------------------------ */

function Label({ children, sx, onInk }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: MONO,
        fontSize: '0.66rem',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: onInk ? 'rgba(255,255,255,0.52)' : 'var(--text-muted)',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

/* One line of a statement: what it is, a run of leader dots, what it comes
   to. The dots are the thing that makes a row read as an entry rather than
   as a label and a number that happen to share a line. */
function Entry({ name, figure, dashed, total, onInk }) {
  const ink = onInk ? '#FFFFFF' : 'var(--text-heading)';
  const quiet = onInk ? 'rgba(255,255,255,0.62)' : 'var(--text-secondary)';
  const rule = onInk ? RULE_ON_INK : RULE;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '12px',
        pt: total ? { xs: '16px', md: '18px' } : '13px',
        pb: '13px',
        /* The total sits under a double rule. It is the one piece of
           accounting grammar everyone can already read. */
        borderTop: total ? `3px double ${onInk ? 'rgba(255,255,255,0.5)' : 'rgba(11,15,26,0.45)'}` : 'none',
      }}
    >
      <Typography
        sx={{
          fontSize: total ? { xs: '0.95rem', md: '1rem' } : '0.92rem',
          fontWeight: total ? 600 : 400,
          color: total ? ink : quiet,
          /* Entries carry words as well as figures here, so neither side can
             refuse to wrap: at 375px a nowrap value ran 85px past the edge,
             clipped rather than scrolling because the page clips overflow. */
          whiteSpace: { xs: 'normal', md: 'nowrap' },
          minWidth: 0,
        }}
      >
        {name}
      </Typography>
      <Box
        aria-hidden="true"
        sx={{ flex: 1, minWidth: '16px', borderBottom: `1px dotted ${rule}`, transform: 'translateY(-5px)' }}
      />
      {dashed ? (
        /* Set inside a dashed rule rather than printed like the entry above
           it. A target is a different kind of number from a rate and should
           not be typeset as though it were the same. */
        <Box
          sx={{
            px: '9px',
            py: '3px',
            borderRadius: '4px',
            border: `1.5px dashed ${onInk ? 'rgba(255,255,255,0.4)' : 'rgba(11,15,26,0.3)'}`,
            ...FIG,
            fontSize: '0.9rem',
            fontWeight: 500,
            color: onInk ? 'rgba(255,255,255,0.72)' : 'var(--text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          {figure}
        </Box>
      ) : (
        <Typography
          sx={{
            ...FIG,
            fontSize: total ? { xs: '1.15rem', md: '1.3rem' } : '0.98rem',
            fontWeight: total ? 600 : 500,
            color: total ? 'var(--brand-accent)' : ink,
            whiteSpace: 'normal',
            textAlign: 'right',
            minWidth: 0,
          }}
        >
          {figure}
        </Typography>
      )}
    </Box>
  );
}

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
        <Label onInk={onInk}>Per {RATES.payout}</Label>
      </Box>

      <Entry name="Base rate" figure={RATES.base} onInk={onInk} />
      <Entry name="Target on top" figure={`${RATES.addLow} to ${RATES.addHigh}`} dashed onInk={onInk} />
      <Entry name="Paid to you" figure={RATES.total} total onInk={onInk} />

      <Typography
        sx={{
          mt: '14px',
          fontSize: '0.8rem',
          lineHeight: 1.6,
          color: onInk ? 'rgba(255,255,255,0.52)' : 'var(--text-muted)',
        }}
      >
        The {RATES.base} is fixed. The line above the total is a target, not a
        rate, and it is only ever added.
      </Typography>
    </Box>
  );
}

function Button({ children, href, primary, onInk, small }) {
  const external = href.startsWith('http');
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    px: small ? '17px' : '23px',
    py: small ? '10px' : '13px',
    borderRadius: '4px',
    fontSize: small ? '0.86rem' : '0.94rem',
    fontWeight: 600,
    letterSpacing: '-0.005em',
    textDecoration: 'none',
    transition: 'all .18s cubic-bezier(.32,.72,0,1)',
    ...(primary
      ? {
          backgroundColor: 'var(--brand-accent)',
          color: '#FFFFFF',
          border: '1px solid var(--brand-accent)',
          '&:hover': { filter: 'brightness(1.08)' },
        }
      : onInk
      ? {
          backgroundColor: 'transparent',
          color: '#FFFFFF',
          border: `1px solid ${RULE_ON_INK}`,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
        }
      : {
          backgroundColor: 'transparent',
          color: 'var(--text-heading)',
          border: `1px solid ${RULE}`,
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

function Head2({ eyebrow, title, lede, onInk, center, maxWidth = 860 }) {
  return (
    <Box sx={{ maxWidth, mx: center ? 'auto' : 0, textAlign: center ? 'center' : 'left' }}>
      <Label onInk={onInk} sx={{ color: onInk ? 'rgba(255,255,255,0.6)' : 'var(--brand-accent)' }}>
        {eyebrow}
      </Label>
      <Typography
        component="h2"
        sx={{
          mt: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3.05rem' },
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          color: onInk ? '#FFFFFF' : 'var(--text-heading)',
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>
      {lede && (
        <Typography
          sx={{
            mt: 2.2,
            fontSize: '1.04rem',
            lineHeight: 1.65,
            color: onInk ? 'rgba(255,255,255,0.66)' : 'var(--text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {lede}
        </Typography>
      )}
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
          content="$OPEN is the capital asset of Hey Open. Stake it to earn a fixed base rate with a share on top, to unlock the full app, and to mint HEY, which pays out credit every day."
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
              <Label sx={{ color: 'var(--brand-accent)' }}>The capital asset</Label>
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
                Stake $OPEN.
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
                $OPEN is the capital asset of Hey Open. Stake it to earn, to unlock the full app,
                and to mint HEY, which pays out credit every day for any model on the network.
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
              <Head2 eyebrow="How $OPEN works" title="Three moves, and the stake stays yours." />
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

      {/* ── The yield, on ink ────────────────────────────────────── */}
      <Box component="section" sx={{ backgroundColor: INK, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
          <Box sx={{ py: { xs: 8, md: 13 } }}>
            <Reveal>
              <Box sx={{ mb: { xs: 5, md: 7 } }}>
                <Head2
                  onInk
                  eyebrow="The yield"
                  title={`A ${RATES.base} floor, and a target well above it.`}
                  lede="The floor is a rate the protocol sets and pays whatever happens. The target is what the treasury is managing to on top of it. Both are paid in value rather than in credit, and the difference between the two is worth understanding before you stake."
                  maxWidth={760}
                />
              </Box>
            </Reveal>

            {/* The comparison. The number only means something next to the
                numbers it is competing with, which is the move both of the
                pages this was measured against make. Ours is the only bar
                drawn in two materials, because it is the only one that is
                part fixed and part aimed at. */}
            <Reveal delay={80}>
              <Box
                sx={{
                  border: `1px solid ${RULE_ON_INK}`,
                  borderRadius: '4px',
                  px: { xs: 2.5, md: 4 },
                  pt: { xs: 3, md: 3.5 },
                  pb: { xs: 2.5, md: 3 },
                  mb: { xs: 5, md: 7 },
                }}
              >
                <Box sx={{ mb: { xs: 3, md: 3.5 } }}>
                  <Label onInk sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    What the same money earns, a year
                  </Label>
                </Box>

                {BENCH.map((row) => {
                  const ours = Boolean(row.ours);
                  const total = ours ? row.base + row.high : row.value;
                  return (
                    <Box key={row.label} sx={{ mb: { xs: 2.2, md: 2.6 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: '0.9rem', md: '0.96rem' },
                            fontWeight: ours ? 700 : 400,
                            color: ours ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                          }}
                        >
                          {row.label}
                        </Typography>
                        <Typography
                          sx={{
                            ...FIG,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            fontWeight: ours ? 700 : 500,
                            color: ours ? 'var(--brand-accent)' : 'rgba(255,255,255,0.55)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {ours ? `${RATES.base} + ${RATES.addLow} to ${RATES.addHigh}` : row.figure}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', height: ours ? '28px' : '12px' }}>
                        {ours ? (
                          <>
                            {/* the part that is owed */}
                            <Box
                              sx={{
                                width: `${(row.base / SCALE) * 100}%`,
                                height: '100%',
                                borderTopLeftRadius: '3px',
                                borderBottomLeftRadius: '3px',
                                backgroundColor: 'var(--brand-accent)',
                              }}
                            />
                            {/* the target, up to the bottom of the band */}
                            <Box
                              sx={{
                                width: `${(row.low / SCALE) * 100}%`,
                                height: '100%',
                                border: '1.5px dashed rgba(255,255,255,0.45)',
                                borderLeft: 'none',
                                borderRight: 'none',
                                background:
                                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 5px, transparent 5px, transparent 11px)',
                              }}
                            />
                            {/* and the rest of the band, where it is less
                                certain still. Drawing the range as one block
                                would say the figure could land anywhere above
                                the floor, which is not what a band means. */}
                            <Box
                              sx={{
                                width: `${((row.high - row.low) / SCALE) * 100}%`,
                                height: '100%',
                                borderTopRightRadius: '3px',
                                borderBottomRightRadius: '3px',
                                border: '1.5px dashed rgba(255,255,255,0.28)',
                                borderLeft: 'none',
                                background:
                                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 5px, transparent 5px, transparent 11px)',
                              }}
                            />
                          </>
                        ) : (
                          <Box
                            sx={{
                              width: `${Math.max((row.value / SCALE) * 100, 0.6)}%`,
                              height: '100%',
                              borderRadius: '3px',
                              backgroundColor: 'rgba(255,255,255,0.26)',
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  );
                })}

                <Typography
                  sx={{
                    mt: { xs: 2.5, md: 3 },
                    pt: 2,
                    borderTop: `1px solid ${RULE_ON_INK}`,
                    fontFamily: MONO,
                    fontSize: '0.68rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.42)',
                  }}
                >
                  Solid is the fixed floor. Hatched is the target, not a rate.
                  Comparison rates {RATES.benchAsOf}, sources {RATES.benchSource}.
                </Typography>
              </Box>
            </Reveal>

            {/* The two layers, said in words */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 4, md: 8 },
                alignItems: 'start',
                mb: { xs: 6, md: 9 },
              }}
            >
              <Reveal>
                <Box>
                  <Box sx={{ pb: 3.5, mb: 3.5, borderBottom: `1px solid ${RULE_ON_INK}` }}>
                    <Label onInk sx={{ color: 'var(--brand-accent)' }}>The floor</Label>
                    <Typography
                      sx={{
                        mt: 1.6,
                        fontSize: { xs: '1.4rem', md: '1.65rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.25,
                        color: '#FFFFFF',
                        mb: 1.4,
                      }}
                    >
                      {RATES.base} is owed to you.
                    </Typography>
                    <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.66)' }}>
                      Set by the protocol, accruing from the epoch your stake lands in, and not
                      dependent on anything going well. Stake and do nothing else and this is
                      what you get, in a good year and a bad one.
                    </Typography>
                  </Box>

                  <Box>
                    <Label onInk>The target</Label>
                    <Typography
                      sx={{
                        mt: 1.6,
                        fontSize: { xs: '1.4rem', md: '1.65rem' },
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.25,
                        color: '#FFFFFF',
                        mb: 1.4,
                      }}
                    >
                      {RATES.addLow} to {RATES.addHigh} is what we are managing to.
                    </Typography>
                    <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.66)' }}>
                      The treasury puts the staked supply to work and stakers take a share of what
                      it returns. The band is the range we run the book to, reported after each
                      period rather than promised before it. It is added to the floor and never
                      taken out of it.
                    </Typography>
                  </Box>
                </Box>
              </Reveal>

              <Reveal delay={120}>
                <Box>
                  <Statement onInk />
                  <Typography
                    sx={{
                      mt: 2.5,
                      fontSize: '0.86rem',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.52)',
                    }}
                  >
                    Both lines are paid in value, not in credit. The credit side of the network is
                    HEY, which is minted separately and does a different job.
                  </Typography>
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
                  <Label onInk sx={{ color: 'rgba(255,255,255,0.7)' }}>Why you can check it</Label>
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
        {/* ── What staking unlocks ───────────────────────────────── */}
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
                  eyebrow="What it unlocks"
                  title={`Stake ${RATES.threshold} and stop paying for the app.`}
                  lede="Everything the subscription gets you, for as long as the stake is there. Unstake and it goes back to being a subscription, with nothing lost in between."
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
              <Box sx={{ borderTop: `2px solid ${INK}`, pt: 1 }}>
                {UNLOCKS.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} />
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── HEY ────────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box>
                <Head2
                  eyebrow="The second token"
                  title="Mint HEY with staked $OPEN."
                  lede="HEY is how the network hands out use rather than money. All of it is made from staked $OPEN, and nothing else can make it. Use what it pays, or sell it to somebody who will."
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
                  <Button href={LINKS.mint} primary>
                    Mint HEY
                    <Box component="span" aria-hidden="true">→</Box>
                  </Button>
                  <Button href="/docs">See what credit buys</Button>
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
                  py: { xs: 2, md: 2.5 },
                }}
              >
                <Box sx={{ pb: '14px', borderBottom: `1px solid ${RULE}` }}>
                  <Label>HEY</Label>
                </Box>
                {HEY_SPEC.map(([name, figure]) => (
                  <Entry key={name} name={name} figure={figure} />
                ))}
              </Box>
            </Reveal>
          </Box>
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
                    Bought back and burned, not printed.
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    A share of what the product earns buys $OPEN on the open market, rewards the
                    providers doing the work, and burns what the network does not need. Less
                    supply, verifiably, rather than more.
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

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <Box component="section" sx={{ py: { xs: 7, md: 11 } }}>
          <Reveal>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Head2 eyebrow="Questions" title="The ones that actually get asked." />
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                columnGap: { md: 8 },
              }}
            >
              {FAQ.map(([q, a]) => (
                <Box key={q} sx={{ borderTop: `1px solid ${RULE}`, py: { xs: 2.6, md: 3 } }}>
                  <Typography
                    sx={{
                      fontSize: '1.04rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-heading)',
                      mb: 1.2,
                    }}
                  >
                    {q}
                  </Typography>
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    {a}
                  </Typography>
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
                Hold it, stake it, spend what it makes.
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
                Staking rewards are not a guarantee. The base rate is fixed; the share on top is
                not, and can be nothing in any period. Nothing here is investment advice. Read the
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
