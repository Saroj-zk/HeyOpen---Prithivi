import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductDemo from '@/components/ProductDemo';
import ProductWindow from '@/components/ProductWindow';
import { Reveal, BrandTile } from '@/components/ui/LedgerUI';
import { MODELS } from '@/data/catalog';

/**
 * The whole product on one page.
 *
 * The job here is not to list features, it is to show someone what they would
 * actually be doing. So every section leads with the thing itself - the running
 * chat demo, the model picker, real generated output, the actual price list -
 * and the words come after, short.
 *
 * Nothing on this page is new product. The demos are the components the home
 * and models pages already use, and the model table reads from the catalogue,
 * so none of it can drift from what the rest of the site says.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';

const CHAPTERS = [
  { id: 'do', label: 'What you can do' },
  { id: 'models', label: 'Every model' },
  { id: 'consensus', label: 'Consensus Mode' },
  { id: 'memory', label: 'Memory' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'Questions' },
];

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

const EYEBROW = {
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  mb: 1.8,
};

const H2 = {
  fontSize: { xs: '1.75rem', md: '2.4rem' },
  fontWeight: 800,
  lineHeight: 1.12,
  letterSpacing: '-0.03em',
  color: 'var(--text-heading)',
  mb: 2,
  textWrap: 'balance',
};

const LEAD = {
  fontSize: { xs: '1rem', md: '1.08rem' },
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
  maxWidth: 580,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: '0.94rem',
  lineHeight: 1.68,
  color: 'var(--text-secondary)',
  textWrap: 'pretty',
};

function Hot({ children }) {
  return (
    <Box component="span" sx={{ color: ORANGE, fontWeight: 700 }}>
      {children}
    </Box>
  );
}

/* A section is a band. Alternating background is what gives the page its
   rhythm; a single flat surface with forty bordered boxes on it does not. */
function Band({ id, alt, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: '96px',
        py: { xs: 8, md: 13 },
        backgroundColor: alt ? 'var(--bg-section-alt)' : 'var(--bg-page)',
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}

function Intro({ eyebrow, title, lead, center }) {
  return (
    <Reveal>
      <Box sx={{ mb: { xs: 5, md: 7 }, mx: center ? 'auto' : 0, textAlign: center ? 'center' : 'left' }}>
        <Typography sx={EYEBROW}>{eyebrow}</Typography>
        <Typography component="h2" sx={{ ...H2, maxWidth: center ? 760 : 680, mx: center ? 'auto' : 0 }}>
          {title}
        </Typography>
        {lead && <Typography sx={{ ...LEAD, mx: center ? 'auto' : 0 }}>{lead}</Typography>}
      </Box>
    </Reveal>
  );
}

/* The frame the running demos sit in. Matches the one the home page uses so
   the product looks like one product across the site. */
function Screen({ children, height, pad = false }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height,
        borderRadius: '18px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
        p: pad ? { xs: 1.5, md: 2 } : 0,
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const THINGS = [
  {
    id: 'ask',
    kicker: 'Ask',
    title: 'Ask anything — including the slow, multi-step things.',
    body:
      'Small questions come back immediately. Bigger ones it works through in stages, pulling what it needs as it goes and showing you each step rather than making you wait at a blank screen.',
    points: ['Reason through hard problems', 'Research across several steps', 'Search the live web and cite it'],
    /* Not `multimodel` — the hero already runs that one, and two identical
       chat windows a screen apart reads as a bug. */
    demo: 'agent',
  },
  {
    id: 'see',
    kicker: 'Create',
    title: 'Make the image you are describing.',
    body:
      'Describe it and get it back — photoreal or illustrated, up to 2K. Hand over a picture you already have and change only the part you point at, with the rest untouched.',
    points: ['Generate from a written brief', 'Mask a region and replace it', 'Readable text inside the image'],
    gallery: [
      { src: '/images/imagine_portrait.jpg', tall: true, alt: 'Portrait generated from a text description' },
      { src: '/images/imagine_sneaker.jpg', alt: 'Product shot generated from a text description' },
      { src: '/images/scenery_alpine.jpg', alt: 'Landscape generated from a text description' },
    ],
    prompt: '“Golden hour portrait on a Santorini terrace, 85mm, shallow depth of field”',
  },
  {
    id: 'hear',
    kicker: 'Speak',
    title: 'Talk to it. Hear it answer.',
    body:
      'Turn a recording into accurate text across more than ninety languages, answer out loud without a text round trip, or write an instrumental track from a description of the mood.',
    points: ['Transcribe noisy rooms and accents', 'Speech to speech in one call', 'Music and effects from a prompt'],
    image: { src: '/images/voice_orb.jpg', alt: 'Voice interface' },
  },
];

/* Names must match src/data/catalog.js exactly; a miss is dropped silently. */
const TABLE = ['GPT-4.1', 'Claude Opus 4', 'Gemini 2.5 Pro', 'Grok 4', 'DeepSeek R1', 'Llama 4 Maverick'];

const CONSENSUS = [
  { code: 'OA', name: 'GPT', line: 'Works it through step by step and shows the arithmetic.' },
  { code: 'AN', name: 'Claude', line: 'Catches the assumption the question was hiding.' },
  { code: 'GG', name: 'Gemini', line: 'Brings the current numbers in from the live web.' },
];

const MEMORY_CONTROLS = [
  ['See everything', 'Every stored entry is listed in Settings, in plain language.'],
  ['Add and remove', 'Write entries by hand, edit them, delete any one of them.'],
  ['Stop it writing', 'Turn off “Generate memory from chats” and nothing new is written.'],
  ['Stop it reading', 'Turn off “Use memory” and nothing stored is sent with a request.'],
];

const PRIVACY_POINTS = [
  ['Start without an account', 'Open the chat and ask. No email, no name, no profile built in the background.'],
  ['Prompts are not kept', 'We process the request, return the answer, and keep a record that it happened — not what was in it.'],
  ['Never used for training', 'Your conversations, files and memory are not used to train models, and not sold or licensed for it.'],
  ['Memory stays in your browser', 'No server copy to leak, subpoena or restore. Clearing site data really does erase it.'],
];

const SEPARATE = [
  ['ChatGPT Plus', 20],
  ['Claude Pro', 20],
  ['Gemini Advanced', 20],
  ['Grok', 30],
  ['Midjourney', 30],
  ['ElevenLabs', 22],
  ['Runway', 15],
  ['Perplexity Pro', 8],
];

const FAQ = [
  { q: 'Do I need an account to try it?', a: 'No. Open the chat and start asking. An account is only needed for a paid plan, for API keys, and for anything involving the token.' },
  { q: 'What happens when I switch model mid-conversation?', a: 'Nothing is lost. The conversation and your memory carry across, so the new model picks up where the last one stopped rather than starting cold.' },
  { q: 'Where is my memory stored?', a: 'In the browser you are using. It does not sync between devices and we hold no copy, which also means we cannot restore it if you clear your site data.' },
  { q: 'Do you train on my conversations?', a: 'No. We do not use your conversations, files or memory to train models, and we do not sell or license them to anyone for that purpose.' },
  { q: 'Can I make images, audio and video too?', a: 'Yes, from the same account and the same conversation. There is no separate creative subscription.' },
  { q: 'Is there an API?', a: 'Yes. One key reaches every model, through an OpenAI-compatible interface, so you can change model without changing your code.' },
];

/* ------------------------------------------------------------------ */

function Rail({ active }) {
  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'fixed',
        left: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: { xs: 'none', xl: 'flex' },
        flexDirection: 'column',
        gap: 1.4,
      }}
    >
      {CHAPTERS.map((c) => {
        const on = active === c.id;
        return (
          <Box
            key={c.id}
            component="a"
            href={`#${c.id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              '&:hover .dot': { backgroundColor: ORANGE },
              '&:hover .lbl': { opacity: 1 },
            }}
          >
            <Box
              className="dot"
              sx={{
                width: on ? 8 : 6,
                height: on ? 8 : 6,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: on ? ORANGE : 'var(--border-strong)',
                transition: 'all 0.25s ease',
              }}
            />
            <Typography
              className="lbl"
              sx={{
                fontSize: '0.74rem',
                fontWeight: on ? 700 : 500,
                color: on ? 'var(--text-heading)' : 'var(--text-muted)',
                opacity: on ? 1 : 0,
                transition: 'opacity 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {c.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function Question({ item, open, onToggle }) {
  return (
    <Box sx={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          py: 2.4,
          px: 0,
          color: 'var(--text-heading)',
          fontSize: { xs: '0.98rem', md: '1.05rem' },
          fontWeight: 650,
        }}
      >
        {item.q}
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 18,
            height: 18,
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: open ? ORANGE : 'var(--text-muted)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
            },
            '&::before': { top: 8, left: 0, width: 18, height: 2 },
            '&::after': { top: 0, left: 8, width: 2, height: 18, transform: open ? 'scaleY(0)' : 'scaleY(1)' },
          }}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography sx={{ ...BODY, maxWidth: 680, pb: 2.6 }}>{item.a}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function CTA({ children, href, solid }) {
  return (
    <Box
      component="a"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 1.45,
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: 700,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        ...(solid
          ? { backgroundColor: ORANGE, color: '#FFFFFF', '&:hover': { backgroundColor: '#E65C00' } }
          : {
              border: '1px solid var(--border-normal)',
              color: 'var(--text-heading)',
              '&:hover': { borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-card)' },
            }),
      }}
    >
      {children}
    </Box>
  );
}

function Ticks({ points }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1, mt: 3 }}>
      {points.map((p) => (
        <Box key={p} sx={{ display: 'flex', alignItems: 'center', gap: 1.3 }}>
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              flexShrink: 0,
              width: 17,
              height: 17,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 102, 0, 0.12)',
              color: ORANGE,
              fontSize: '0.62rem',
              fontWeight: 900,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✓
          </Box>
          <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{p}</Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const [active, setActive] = React.useState(CHAPTERS[0].id);
  const [openQ, setOpenQ] = React.useState(0);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.intersectionRatio));
        let best = null;
        let ratio = 0;
        CHAPTERS.forEach((c) => {
          const r = seen.get(c.id) || 0;
          if (r > ratio) {
            ratio = r;
            best = c.id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.15, 0.4, 0.8] }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const total = SEPARATE.reduce((a, [, n]) => a + n, 0);
  const rows = TABLE.map((n) => MODELS.find((m) => m.name === n)).filter(Boolean);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>What You Can Do With Hey Open — Product Guide | Hey Open</title>
        <meta
          name="description"
          content="See it rather than read about it: one chat across 200+ models, image and audio generation, Consensus Mode, memory that follows you, and what it costs."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

      {/* ================= HERO ================= */}
      <Box sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
              gap: { xs: 5, md: 7 },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box>
                <Typography sx={EYEBROW}>Product guide</Typography>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.3rem', sm: '2.9rem', md: '3.4rem' },
                    fontWeight: 800,
                    lineHeight: 1.06,
                    letterSpacing: '-0.035em',
                    color: 'var(--text-heading)',
                    mb: 2.4,
                    textWrap: 'balance',
                  }}
                >
                  One chat.{' '}
                  <Box component="span" sx={{ color: ORANGE }}>
                    Every AI worth asking.
                  </Box>
                </Typography>
                <Typography sx={{ ...LEAD, fontSize: { xs: '1.05rem', md: '1.15rem' }, mb: 3.6 }}>
                  Ask a question, choose who answers, and switch model halfway through without
                  repeating yourself. Images, voice and video come from the same place. Here is
                  the whole thing, on one page.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <CTA href={APP} solid>
                    Start a chat
                    <Box component="span" aria-hidden="true">→</Box>
                  </CTA>
                  <CTA href="#pricing">See what it costs</CTA>
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <Screen height={{ xs: 360, sm: 420, md: 470 }}>
                <ProductDemo flow="multimodel" active />
              </Screen>
            </Reveal>
          </Box>
        </Container>
      </Box>

      {/* ================= WHAT YOU CAN DO ================= */}
      <Band id="do" alt>
        <Intro
          center
          eyebrow="What you can do"
          title="Three things, from the same conversation."
          lead="Not three products with three subscriptions. One window, and whichever model suits what you just asked for."
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 7, md: 11 } }}>
          {THINGS.map((thing, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={thing.id}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
                    gap: { xs: 4, md: 7 },
                    alignItems: 'center',
                  }}
                >
                  {/* Words */}
                  <Box sx={{ order: { xs: 2, md: flip ? 2 : 1 } }}>
                    <Typography
                      sx={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: ORANGE,
                        mb: 1.4,
                      }}
                    >
                      {thing.kicker}
                    </Typography>
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: { xs: '1.4rem', md: '1.75rem' },
                        fontWeight: 750,
                        lineHeight: 1.18,
                        letterSpacing: '-0.025em',
                        color: 'var(--text-heading)',
                        mb: 1.6,
                        textWrap: 'balance',
                      }}
                    >
                      {thing.title}
                    </Typography>
                    <Typography sx={{ ...BODY, maxWidth: 480 }}>{thing.body}</Typography>
                    <Ticks points={thing.points} />
                  </Box>

                  {/* The thing itself */}
                  <Box sx={{ order: { xs: 1, md: flip ? 1 : 2 }, minWidth: 0 }}>
                    {thing.demo && (
                      <Screen height={{ xs: 340, sm: 400, md: 440 }}>
                        <ProductDemo flow={thing.demo} active />
                      </Screen>
                    )}

                    {thing.gallery && (
                      <Box>
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '1.15fr 1fr',
                            gridTemplateRows: 'repeat(2, 1fr)',
                            gap: 1.4,
                            height: { xs: 320, sm: 390, md: 430 },
                          }}
                        >
                          {thing.gallery.map((g) => (
                            <Box
                              key={g.src}
                              sx={{
                                gridRow: g.tall ? 'span 2' : 'auto',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                border: '1px solid var(--border-subtle)',
                                backgroundColor: 'var(--bg-card)',
                              }}
                            >
                              <Box
                                component="img"
                                src={g.src}
                                alt={g.alt}
                                loading="lazy"
                                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </Box>
                          ))}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.82rem',
                            color: 'var(--text-muted)',
                            mt: 1.6,
                            fontStyle: 'italic',
                            textWrap: 'pretty',
                          }}
                        >
                          {thing.prompt}
                        </Typography>
                      </Box>
                    )}

                    {thing.image && (
                      <Box
                        sx={{
                          borderRadius: '18px',
                          overflow: 'hidden',
                          border: '1px solid var(--border-subtle)',
                          height: { xs: 300, sm: 380, md: 430 },
                        }}
                      >
                        <Box
                          component="img"
                          src={thing.image.src}
                          alt={thing.image.alt}
                          loading="lazy"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Band>

      {/* ================= MODELS ================= */}
      <Band id="models">
        <Intro
          center
          eyebrow="Every model"
          title="Over 200 of them, behind one picker."
          lead="The frontier labs and the strongest open-weight models, in the same list. Switch whenever you like — it is the same conversation either way."
        />

        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <ProductWindow />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box
            sx={{
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', minWidth: 620, borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ backgroundColor: 'var(--bg-section-alt)' }}>
                    {['Model', 'Provider', 'Context', 'Best for'].map((h) => (
                      <Box
                        key={h}
                        component="th"
                        sx={{
                          textAlign: 'left',
                          px: 2.4,
                          py: 1.8,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {rows.map((m) => (
                    <Box
                      key={m.name}
                      component="tr"
                      sx={{ borderTop: '1px solid var(--border-subtle)' }}
                    >
                      <Box component="td" sx={{ px: 2.4, py: 1.8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                          <BrandTile code={m.code} size={26} round />
                          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
                            {m.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box component="td" sx={{ px: 2.4, py: 1.8, fontSize: '0.88rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {m.provider}
                      </Box>
                      <Box component="td" sx={{ px: 2.4, py: 1.8 }}>
                        <Box
                          component="span"
                          sx={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            px: 1.1,
                            py: 0.4,
                            borderRadius: '6px',
                            backgroundColor: 'var(--bg-pill)',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {m.detail}
                        </Box>
                      </Box>
                      <Box component="td" sx={{ px: 2.4, py: 1.8, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        {m.bestFor}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ px: 2.4, py: 2, borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-section-alt)' }}>
              <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                A handful of the text models.{' '}
                <Box component="a" href="/models" sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  See the full list →
                </Box>
              </Typography>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= CONSENSUS ================= */}
      <Band id="consensus" alt>
        <Intro
          center
          eyebrow="Consensus Mode"
          title="When it matters, ask all of them at once."
          lead="One model's answer is one opinion. Ask the question once and several answer in parallel, then a judge model reconciles what comes back into a single answer."
        />

        <Reveal>
          <Box sx={{ maxWidth: 940, mx: 'auto' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
                mb: 3,
              }}
            >
              {CONSENSUS.map((c) => (
                <Box
                  key={c.name}
                  sx={{
                    p: 2.4,
                    borderRadius: '14px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.4 }}>
                    <BrandTile code={c.code} size={26} round />
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {c.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ ...BODY, fontSize: '0.87rem' }}>{c.line}</Typography>
                </Box>
              ))}
            </Box>

            {/* Three feeding one */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                aria-hidden="true"
                sx={{
                  width: 2,
                  height: 36,
                  background: `linear-gradient(to bottom, var(--border-normal), ${ORANGE})`,
                }}
              />
            </Box>

            <Box
              sx={{
                p: { xs: 2.8, md: 3.4 },
                borderRadius: '16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid',
                borderColor: 'rgba(255, 102, 0, 0.35)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                  mb: 1.4,
                }}
              >
                One answer
              </Typography>
              <Typography sx={{ ...BODY, fontSize: '1rem', maxWidth: 640 }}>
                The judge marks where they agree, flags where they do not, and brings the best of
                the three together — so you see <Hot>the disagreement</Hot>, not just the most
                confident-sounding reply.
              </Typography>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= MEMORY ================= */}
      <Band id="memory">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'center',
          }}
        >
          <Reveal>
            <Screen height={{ xs: 360, sm: 420, md: 480 }}>
              <ProductDemo flow="memory" active />
            </Screen>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Typography sx={EYEBROW}>Memory</Typography>
              <Typography component="h2" sx={H2}>
                It remembers you, not just the thread.
              </Typography>
              <Typography sx={BODY}>
                Tell it once that you write in British English, that you are vegetarian, or how your
                codebase is laid out. It holds on to that and carries it to whichever model you
                switch to, instead of making you start again.
              </Typography>
              <Typography sx={{ ...BODY, mt: 2 }}>
                The part that matters: memory lives in <Hot>your browser</Hot>, not on our servers.
                No sync, no copy held by us, and clearing your site data erases it for good.
              </Typography>

              <Box sx={{ mt: 3.5, display: 'flex', flexDirection: 'column' }}>
                {MEMORY_CONTROLS.map(([t, d], i) => (
                  <Box
                    key={t}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      py: 1.6,
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', minWidth: 132, flexShrink: 0 }}>
                      {t}
                    </Typography>
                    <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>{d}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= PRIVACY ================= */}
      <Band id="privacy" alt>
        <Intro
          center
          eyebrow="Privacy"
          title="The data we do not hold cannot leak."
          lead="Most of what you would want deleted here was never ours in the first place. That is a design decision, not a policy promise."
        />
        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
              maxWidth: 940,
              mx: 'auto',
            }}
          >
            {PRIVACY_POINTS.map(([t, d], i) => (
              <Box key={t} sx={{ display: 'flex', gap: 2 }}>
                <Typography
                  aria-hidden="true"
                  sx={{ fontSize: '0.72rem', fontWeight: 800, color: ORANGE, pt: 0.4, minWidth: 22 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.8 }}>
                    {t}
                  </Typography>
                  <Typography sx={{ ...BODY, fontSize: '0.9rem' }}>{d}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
        <Reveal delay={120}>
          <Typography sx={{ ...BODY, fontSize: '0.88rem', textAlign: 'center', mt: 5, maxWidth: 640, mx: 'auto' }}>
            We do not host the frontier models. Your request goes to the provider of whichever model
            you chose, and the{' '}
            <Box component="a" href="/privacy-policy" sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              privacy policy
            </Box>{' '}
            sets out exactly what leaves and what does not.
          </Typography>
        </Reveal>
      </Band>

      {/* ================= PRICING ================= */}
      <Band id="pricing">
        <Intro
          center
          eyebrow="Pricing"
          title="Stop paying for every AI separately."
          lead="Subscribing to each of these on its own is how most people end up here. One bill replaces the lot."
        />

        <Reveal>
          <Box
            sx={{
              maxWidth: 880,
              mx: 'auto',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <Box sx={{ p: { xs: 2.8, md: 3.4 } }}>
              <Typography sx={{ ...EYEBROW, mb: 2.4 }}>Bought separately</Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                  gap: { xs: 2, md: 2.4 },
                }}
              >
                {SEPARATE.map(([name, cost]) => (
                  <Box key={name}>
                    <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, mb: 0.2 }}>
                      {name}
                    </Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      ${cost}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 3,
                px: { xs: 2.8, md: 3.4 },
                py: { xs: 3, md: 3.4 },
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-section-alt)',
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-muted)', mb: 0.6 }}>
                  That total, every month
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.1rem' },
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through',
                    lineHeight: 1,
                  }}
                >
                  ${total}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-muted)', mb: 0.6 }}>
                  All of it, and 200+ more, here
                </Typography>
                <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.1rem' }, fontWeight: 800, color: ORANGE, lineHeight: 1 }}>
                  $20
                </Typography>
              </Box>
              <CTA href={APP} solid>
                Start a chat
                <Box component="span" aria-hidden="true">→</Box>
              </CTA>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= FAQ ================= */}
      <Band id="faq" alt>
        <Box sx={{ maxWidth: 820, mx: 'auto' }}>
          <Intro center eyebrow="Questions" title="The ones people actually ask." />
          <Reveal>
            <Box sx={{ borderTop: '1px solid var(--border-subtle)' }}>
              {FAQ.map((item, i) => (
                <Question key={item.q} item={item} open={openQ === i} onToggle={() => setOpenQ(openQ === i ? -1 : i)} />
              ))}
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ textAlign: 'center', mt: { xs: 7, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.6rem', md: '2.1rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  mb: 1.6,
                  textWrap: 'balance',
                }}
              >
                Easier to try than to read about.
              </Typography>
              <Typography sx={{ ...BODY, maxWidth: 440, mx: 'auto', mb: 3.4 }}>
                No account needed. Open it, ask something difficult, and switch model halfway
                through.
              </Typography>
              <CTA href={APP} solid>
                Start a chat
                <Box component="span" aria-hidden="true">→</Box>
              </CTA>
            </Box>
          </Reveal>
        </Box>
      </Band>

      <Footer />
    </Box>
  );
}
