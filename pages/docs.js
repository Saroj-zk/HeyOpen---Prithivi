import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, BrandTile } from '@/components/ui/LedgerUI';
import { CAPABILITIES } from '@/data/capabilities';

/**
 * The whole product on one page.
 *
 * Everything else on the site argues for one thing at a time. This page is for
 * the person who wants to know what Hey Open is before deciding whether any of
 * that matters to them, so it is written to be read top to bottom in a few
 * minutes, or skimmed from the rail on the left.
 *
 * Nothing here is new product. Every claim is one the site already makes
 * somewhere, pulled into one place, and the capability blocks read from
 * src/data/capabilities.js rather than restating it.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';

/* The rail, and the order of the page. One list drives both. */
const CHAPTERS = [
  { id: 'overview', label: 'What it is' },
  { id: 'models', label: 'The models' },
  { id: 'create', label: 'What you can make' },
  { id: 'consensus', label: 'Consensus Mode' },
  { id: 'memory', label: 'Memory' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'api', label: 'API' },
  { id: 'token', label: '$OPEN' },
  { id: 'faq', label: 'Questions' },
];

/* ------------------------------------------------------------------ */
/* Shared type                                                         */
/* ------------------------------------------------------------------ */

const EYEBROW = {
  fontSize: '0.7rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  mb: 1.6,
};

const H2 = {
  fontSize: { xs: '1.6rem', md: '2.1rem' },
  fontWeight: 800,
  lineHeight: 1.18,
  letterSpacing: '-0.025em',
  color: 'var(--text-heading)',
  mb: 1.8,
  textWrap: 'balance',
};

const LEAD = {
  fontSize: { xs: '1rem', md: '1.05rem' },
  lineHeight: 1.72,
  color: 'var(--text-secondary)',
  maxWidth: 620,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
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

function Section({ id, eyebrow, title, lead, children, last }) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: '110px', pt: { xs: 7, md: 9 } }}>
      <Reveal>
        <Typography sx={EYEBROW}>{eyebrow}</Typography>
        <Typography component="h2" sx={H2}>
          {title}
        </Typography>
        {lead && <Typography sx={{ ...LEAD, mb: 4 }}>{lead}</Typography>}
      </Reveal>
      {children}
      {!last && (
        <Box sx={{ pt: { xs: 7, md: 9 } }}>
          <Rule />
        </Box>
      )}
    </Box>
  );
}

/* A plain bordered panel. Deliberately square-ish and hairline: the heavier
   card treatments read as decoration on a page this dense. */
function Panel({ children, sx }) {
  return (
    <Box
      sx={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        backgroundColor: 'var(--bg-card)',
        p: { xs: 2.4, md: 2.8 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function Grid({ children, min = 240, gap = 2 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: `repeat(auto-fit, minmax(${min}px, 1fr))` },
        gap,
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Page content                                                        */
/* ------------------------------------------------------------------ */

const AT_A_GLANCE = [
  {
    k: '200+',
    t: 'models, one subscription',
    d: 'Every frontier model and the best open-weight ones, behind a single login and a single bill.',
  },
  {
    k: '4',
    t: 'kinds of output',
    d: 'Text, images, audio and video, from the same conversation and the same account.',
  },
  {
    k: '1',
    t: 'memory, everywhere',
    d: 'Switch model mid-conversation and keep the context. It stays in your browser, not on our servers.',
  },
  {
    k: '$20',
    t: 'a month, all in',
    d: 'The same set of tools bought separately comes to $165. No per-model subscriptions.',
  },
];

const CLOSED = [
  { code: 'OA', name: 'GPT', by: 'OpenAI' },
  { code: 'AN', name: 'Claude', by: 'Anthropic' },
  { code: 'GG', name: 'Gemini', by: 'Google' },
  { code: 'XA', name: 'Grok', by: 'xAI' },
];

const OPEN = [
  { code: 'MT', name: 'Llama', by: 'Meta' },
  { code: 'QW', name: 'Qwen', by: 'Alibaba' },
  { code: 'DS', name: 'DeepSeek', by: 'DeepSeek' },
  { code: 'MO', name: 'Kimi', by: 'Moonshot' },
];

const CONSENSUS_STEPS = [
  {
    n: '01',
    t: 'Ask once',
    d: 'You write the question a single time. There is no copying it between tabs and no re-explaining yourself.',
  },
  {
    n: '02',
    t: 'Several models answer',
    d: 'The question goes out to the models you picked, in parallel. You see each answer as it lands, side by side.',
  },
  {
    n: '03',
    t: 'One clear answer',
    d: 'A judge model reads all of them, marks where they agree, flags where they do not, and brings the best thinking together.',
  },
];

const MEMORY_CONTROLS = [
  ['See everything', 'Every stored entry is listed in Settings, in plain language. Nothing is hidden from you.'],
  ['Add and remove', 'Write entries by hand, edit them, or delete any one of them individually.'],
  ['Stop it writing', 'Turn off "Generate memory from chats" and nothing new is ever written.'],
  ['Stop it reading', 'Turn off "Use memory" and nothing stored is ever sent with a request.'],
  ['Keep it in', '"Share memory with external models" is off by default, and stays off until you turn it on.'],
];

const PRIVACY_POINTS = [
  {
    t: 'Start without an account',
    d: 'Open the chat and ask. No email, no name, no profile built in the background.',
  },
  {
    t: 'Prompts are not kept',
    d: 'We process your request, return the answer, and keep a record that it happened — not what was in it.',
  },
  {
    t: 'Not used for training',
    d: 'Your conversations, files and memory are never used to train models, and never sold or licensed for it.',
  },
  {
    t: 'Memory never leaves your browser',
    d: 'There is no server copy to leak, to subpoena, or to restore. Clearing your site data really does erase it.',
  },
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
  {
    q: 'Do I need an account to try it?',
    a: 'No. Open the chat and start asking. An account is only needed for a paid plan, for API keys, and for anything involving the token.',
  },
  {
    q: 'Which models can I use?',
    a: 'Over 200, including GPT, Claude, Gemini and Grok alongside open-weight models like Llama, Qwen, DeepSeek and Kimi. You pick which one answers, or let the router pick for you.',
  },
  {
    q: 'What happens when I switch model mid-conversation?',
    a: 'Nothing is lost. The conversation and your memory carry across, so the new model picks up where the last one stopped rather than starting cold.',
  },
  {
    q: 'Where is my memory stored?',
    a: 'In the browser you are using. It does not sync between devices and we do not hold a copy, which also means we cannot restore it for you if you clear your site data.',
  },
  {
    q: 'Do you train on my conversations?',
    a: 'No. We do not use your conversations, files or memory to train models, and we do not sell or license them to anyone for that purpose.',
  },
  {
    q: 'Can I make images, audio and video too?',
    a: 'Yes, from the same account. Image generation and editing, speech in and out, music, and short video clips are all included rather than sold as separate products.',
  },
  {
    q: 'What does it cost?',
    a: 'One subscription at $20 a month covers everything. Buying the equivalent tools separately comes to around $165 a month.',
  },
  {
    q: 'Is there an API?',
    a: 'Yes. One key reaches every model on the platform, with an OpenAI-compatible interface, so you can change model without changing your code.',
  },
];

/* ------------------------------------------------------------------ */

function TableOfContents({ active }) {
  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'sticky',
        top: 104,
        display: { xs: 'none', md: 'block' },
        width: 196,
        flexShrink: 0,
      }}
    >
      <Typography sx={{ ...EYEBROW, mb: 2 }}>On this page</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
        {CHAPTERS.map((c) => {
          const on = active === c.id;
          return (
            <Box
              key={c.id}
              component="a"
              href={`#${c.id}`}
              sx={{
                fontSize: '0.86rem',
                lineHeight: 1.5,
                py: 0.7,
                pl: 1.6,
                borderLeft: '2px solid',
                borderColor: on ? ORANGE : 'var(--border-normal)',
                color: on ? 'var(--text-heading)' : 'var(--text-muted)',
                fontWeight: on ? 700 : 500,
                textDecoration: 'none',
                transition: 'color 0.2s ease, border-color 0.2s ease',
                '&:hover': { color: 'var(--text-heading)' },
              }}
            >
              {c.label}
            </Box>
          );
        })}
      </Box>
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
          py: 2.2,
          px: 0,
          color: 'var(--text-heading)',
          fontSize: '1rem',
          fontWeight: 650,
        }}
      >
        {item.q}
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 20,
            height: 20,
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: open ? ORANGE : 'var(--text-muted)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
            },
            '&::before': { top: 9, left: 2, width: 16, height: 2 },
            '&::after': {
              top: 2,
              left: 9,
              width: 2,
              height: 16,
              transform: open ? 'scaleY(0)' : 'scaleY(1)',
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <Typography sx={{ ...BODY, maxWidth: 640, pb: 2.4, pr: { md: 5 } }}>{item.a}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const [active, setActive] = React.useState(CHAPTERS[0].id);
  const [openQ, setOpenQ] = React.useState(0);

  /* Rail highlight. Watches a band across the upper half of the viewport so a
     heading counts as current once it has settled, not the instant it appears. */
  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.intersectionRatio));
        let best = null;
        let bestRatio = 0;
        CHAPTERS.forEach((c) => {
          const r = seen.get(c.id) || 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = c.id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-100px 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const total = SEPARATE.reduce((a, [, n]) => a + n, 0);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>Product Guide — Everything Hey Open Does | Hey Open</title>
        <meta
          name="description"
          content="One page covering all of it: 200+ models, text, images, audio and video, Consensus Mode, memory that follows you between models, and what it costs."
        />
      </Head>

      <PageHeader />

      {/* ---------------- Hero ---------------- */}
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 }, pt: { xs: 6, md: 9 }, pb: { xs: 2, md: 3 } }}>
        <Reveal>
          <Box sx={{ maxWidth: 760 }}>
            <Typography sx={EYEBROW}>Product guide</Typography>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.3rem', sm: '3rem', md: '3.6rem' },
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--text-heading)',
                mb: 2.4,
                textWrap: 'balance',
              }}
            >
              Everything Hey Open does,{' '}
              <Box component="span" sx={{ color: ORANGE }}>
                on one page.
              </Box>
            </Typography>
            <Typography sx={{ ...LEAD, fontSize: { xs: '1.05rem', md: '1.15rem' }, maxWidth: 660, mb: 3.6 }}>
              Every frontier model and the best open ones, in a single chat that remembers you
              across all of them. Read it end to end in about five minutes, or jump to the part
              you came for.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Box
                component="a"
                href={APP}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.8,
                  py: 1.35,
                  borderRadius: '10px',
                  backgroundColor: ORANGE,
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease',
                  '&:hover': { backgroundColor: '#E65C00' },
                }}
              >
                Start a chat
                <Box component="span" aria-hidden="true">→</Box>
              </Box>
              <Box
                component="a"
                href="#pricing"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 2.8,
                  py: 1.35,
                  borderRadius: '10px',
                  border: '1px solid var(--border-normal)',
                  color: 'var(--text-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 650,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  '&:hover': { borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-card)' },
                }}
              >
                See what it costs
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Container>

      {/* ---------------- Body ---------------- */}
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ display: 'flex', gap: { md: 6, lg: 9 }, alignItems: 'flex-start' }}>
          <TableOfContents active={active} />

          <Box sx={{ minWidth: 0, flex: 1, maxWidth: 820 }}>
            {/* ---- What it is ---- */}
            <Section
              id="overview"
              eyebrow="What it is"
              title="One chat. Every model worth asking."
              lead="Hey Open puts the frontier models and the strongest open-weight ones behind a single conversation. You choose who answers, or let it choose for you, and what you have already said carries across whichever you pick."
            >
              <Grid min={230}>
                {AT_A_GLANCE.map((item, i) => (
                  <Reveal key={item.t} delay={i * 70}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{
                          fontSize: '1.9rem',
                          fontWeight: 800,
                          letterSpacing: '-0.03em',
                          color: ORANGE,
                          lineHeight: 1,
                          mb: 0.8,
                        }}
                      >
                        {item.k}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}
                      >
                        {item.t}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.87rem' }}>{item.d}</Typography>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
            </Section>

            {/* ---- Models ---- */}
            <Section
              id="models"
              eyebrow="The models"
              title="Closed and open, side by side."
              lead="Over 200 models are available, and the list moves as providers ship. You are never locked to one lab's view of a problem, and nothing needs a second subscription."
            >
              <Grid min={300} gap={2.4}>
                {[
                  { title: 'Closed-source', copy: 'The frontier labs, at their current best.', set: CLOSED },
                  { title: 'Open-weight', copy: 'Strong, cheap, and yours to self-host later.', set: OPEN },
                ].map((group, gi) => (
                  <Reveal key={group.title} delay={gi * 90}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{ fontSize: '1rem', fontWeight: 750, color: 'var(--text-heading)', mb: 0.6 }}
                      >
                        {group.title}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.87rem', mb: 2.4 }}>{group.copy}</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
                        {group.set.map((m) => (
                          <Box key={m.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                            <BrandTile code={m.code} size={30} round />
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{ fontSize: '0.9rem', fontWeight: 650, color: 'var(--text-heading)', lineHeight: 1.3 }}
                              >
                                {m.name}
                              </Typography>
                              <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                                {m.by}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
              <Reveal delay={160}>
                <Typography sx={{ ...BODY, fontSize: '0.88rem', mt: 2.4 }}>
                  The full list, with context limits and what each one is good at, is on the{' '}
                  <Box
                    component="a"
                    href="/models"
                    sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    models page
                  </Box>
                  .
                </Typography>
              </Reveal>
            </Section>

            {/* ---- Capabilities ---- */}
            <Section
              id="create"
              eyebrow="What you can make"
              title="Not only text."
              lead="Images, audio and video come from the same account and the same conversation. There is no separate creative subscription and no second bill."
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.4 }}>
                {CAPABILITIES.map((cap, i) => (
                  <Reveal key={cap.kind} delay={i * 70}>
                    <Panel>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {/* A number rather than FormatTile: its three-letter
                            labels do not sit well at this size. */}
                        <Typography
                          aria-hidden="true"
                          sx={{
                            flexShrink: 0,
                            pt: 0.2,
                            width: 24,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            color: ORANGE,
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </Typography>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'baseline',
                              flexWrap: 'wrap',
                              columnGap: 1.2,
                              mb: 1,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-heading)' }}
                            >
                              {cap.label}
                            </Typography>
                            <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                              {cap.line}
                            </Typography>
                          </Box>
                          <Typography sx={{ ...BODY, fontSize: '0.9rem', mb: 2, maxWidth: 580 }}>
                            {cap.body}
                          </Typography>
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                              gap: 1.2,
                            }}
                          >
                            {cap.uses.map(([name, what]) => (
                              <Box key={name} sx={{ display: 'flex', gap: 1 }}>
                                <Box
                                  component="span"
                                  aria-hidden="true"
                                  sx={{
                                    mt: '7px',
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    backgroundColor: ORANGE,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                                  <Box component="span" sx={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                                    {name}.
                                  </Box>{' '}
                                  {what}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Panel>
                  </Reveal>
                ))}
              </Box>
            </Section>

            {/* ---- Consensus ---- */}
            <Section
              id="consensus"
              eyebrow="Consensus Mode"
              title="Ask once. Get the best of four answers."
              lead="When a question actually matters, one model's opinion is one opinion. Consensus Mode asks several at the same time and then has a judge model reconcile what comes back."
            >
              <Grid min={230}>
                {CONSENSUS_STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={i * 80}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          color: ORANGE,
                          mb: 1.4,
                        }}
                      >
                        {s.n}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}
                      >
                        {s.t}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.87rem' }}>{s.d}</Typography>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
            </Section>

            {/* ---- Memory ---- */}
            <Section
              id="memory"
              eyebrow="Memory"
              title="It remembers you, not just the thread."
              lead="Tell it once that you write in British English, that you are vegetarian, or how your codebase is laid out. It holds on to that and brings it to every model you switch to, instead of making you start again."
            >
              <Reveal>
                <Panel sx={{ mb: 2.4 }}>
                  <Typography sx={{ ...BODY, fontSize: '0.92rem', mb: 0 }}>
                    The part that matters: memory lives in{' '}
                    <Hot>your browser</Hot>, not on our servers. It does not sync between devices, we
                    hold no copy, and clearing your site data erases it for good — which also means we
                    cannot restore it for you.
                  </Typography>
                </Panel>
              </Reveal>
              <Grid min={250}>
                {MEMORY_CONTROLS.map(([name, what], i) => (
                  <Reveal key={name} delay={i * 60}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.8 }}
                      >
                        {name}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.85rem' }}>{what}</Typography>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
              <Reveal delay={140}>
                <Typography sx={{ ...BODY, fontSize: '0.88rem', mt: 2.4 }}>
                  More on how it is built, and what it looks like in use, on the{' '}
                  <Box
                    component="a"
                    href="/memory"
                    sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    memory page
                  </Box>
                  .
                </Typography>
              </Reveal>
            </Section>

            {/* ---- Privacy ---- */}
            <Section
              id="privacy"
              eyebrow="Privacy"
              title="Private by how it is built, not by promise."
              lead="The strongest privacy guarantee is not holding the data in the first place. Most of what you would want deleted here was never ours to delete."
            >
              <Grid min={250}>
                {PRIVACY_POINTS.map((p, i) => (
                  <Reveal key={p.t} delay={i * 70}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}
                      >
                        {p.t}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.87rem' }}>{p.d}</Typography>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
              <Reveal delay={140}>
                <Typography sx={{ ...BODY, fontSize: '0.88rem', mt: 2.4 }}>
                  One thing worth being plain about: Hey Open does not host the frontier models. Your
                  request is passed to the provider of whichever model you chose, and what they do with
                  it is covered by their terms. The{' '}
                  <Box
                    component="a"
                    href="/privacy-policy"
                    sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    privacy policy
                  </Box>{' '}
                  sets out exactly what leaves and what does not.
                </Typography>
              </Reveal>
            </Section>

            {/* ---- Pricing ---- */}
            <Section
              id="pricing"
              eyebrow="Pricing"
              title="Stop paying for every AI separately."
              lead="Subscribing to each of these on its own is how most people end up here. One bill replaces the lot, and adds the 200+ models none of them give you."
            >
              <Reveal>
                <Panel sx={{ p: 0, overflow: 'hidden' }}>
                  <Box sx={{ p: { xs: 2.4, md: 2.8 }, borderBottom: '1px solid var(--border-subtle)' }}>
                    <Typography sx={{ ...EYEBROW, mb: 1 }}>Bought separately</Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
                        gap: 1.2,
                      }}
                    >
                      {SEPARATE.map(([name, cost]) => (
                        <Box key={name}>
                          <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                            {name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}
                          >
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
                      gap: 2,
                      p: { xs: 2.4, md: 2.8 },
                      backgroundColor: 'var(--bg-section-alt)',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', mb: 0.4 }}>
                        That total, every month
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1.7rem',
                          fontWeight: 800,
                          color: 'var(--text-heading)',
                          textDecoration: 'line-through',
                          textDecorationColor: 'var(--text-muted)',
                          lineHeight: 1,
                        }}
                      >
                        ${total}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', mb: 0.4 }}>
                        All of it, and 200+ more, here
                      </Typography>
                      <Typography sx={{ fontSize: '1.7rem', fontWeight: 800, color: ORANGE, lineHeight: 1 }}>
                        $20
                      </Typography>
                    </Box>
                  </Box>
                </Panel>
              </Reveal>
            </Section>

            {/* ---- API ---- */}
            <Section
              id="api"
              eyebrow="API"
              title="One key for all of them."
              lead="The same catalogue is available programmatically, through an OpenAI-compatible interface. Point your existing client at it, change the model name, and the rest of your code stays as it is."
            >
              <Grid min={240}>
                {[
                  ['One integration', 'Add a model, or swap one for a cheaper one, without touching your code again.'],
                  ['Smart routing', 'Send the easy questions to a small model and the hard ones to a frontier model, automatically.'],
                  ['Usage you can see', 'What ran, on which model, and what it cost — per request, not per invoice.'],
                ].map(([t, d], i) => (
                  <Reveal key={t} delay={i * 70}>
                    <Panel sx={{ height: '100%' }}>
                      <Typography
                        sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}
                      >
                        {t}
                      </Typography>
                      <Typography sx={{ ...BODY, fontSize: '0.87rem' }}>{d}</Typography>
                    </Panel>
                  </Reveal>
                ))}
              </Grid>
            </Section>

            {/* ---- Token ---- */}
            <Section
              id="token"
              eyebrow="$OPEN"
              title="The token, briefly."
              lead="There is a token, and you can use the product completely without it. It is not required to sign up, to subscribe, or to use any model."
            >
              <Reveal>
                <Panel>
                  <Typography sx={{ ...BODY, fontSize: '0.9rem', mb: 1.6 }}>
                    Everything written about $OPEN on this site is{' '}
                    <Hot>information only</Hot>. It is not investment advice, not a recommendation, and
                    not an offer to buy or sell anything. Digital assets are volatile and you can lose
                    the whole value of a holding.
                  </Typography>
                  <Typography sx={{ ...BODY, fontSize: '0.88rem', mb: 0 }}>
                    If you want the detail, it is on the{' '}
                    <Box
                      component="a"
                      href="/token"
                      sx={{ color: ORANGE, fontWeight: 650, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      token page
                    </Box>
                    . If you do not, nothing on the rest of this page depends on it.
                  </Typography>
                </Panel>
              </Reveal>
            </Section>

            {/* ---- FAQ ---- */}
            <Section id="faq" eyebrow="Questions" title="The ones people actually ask." last>
              <Reveal>
                <Box sx={{ borderTop: '1px solid var(--border-subtle)' }}>
                  {FAQ.map((item, i) => (
                    <Question
                      key={item.q}
                      item={item}
                      open={openQ === i}
                      onToggle={() => setOpenQ(openQ === i ? -1 : i)}
                    />
                  ))}
                </Box>
              </Reveal>

              <Reveal delay={100}>
                <Box
                  sx={{
                    mt: { xs: 6, md: 8 },
                    p: { xs: 3.2, md: 4.5 },
                    borderRadius: '14px',
                    backgroundColor: 'var(--bg-section-alt)',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.9rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-heading)',
                      mb: 1.4,
                      textWrap: 'balance',
                    }}
                  >
                    Easier to try than to read about.
                  </Typography>
                  <Typography sx={{ ...BODY, maxWidth: 420, mx: 'auto', mb: 3 }}>
                    No account needed. Open it, ask something difficult, and switch model halfway
                    through.
                  </Typography>
                  <Box
                    component="a"
                    href={APP}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 3,
                      py: 1.4,
                      borderRadius: '10px',
                      backgroundColor: ORANGE,
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease',
                      '&:hover': { backgroundColor: '#E65C00' },
                    }}
                  >
                    Start a chat
                    <Box component="span" aria-hidden="true">→</Box>
                  </Box>
                </Box>
              </Reveal>
            </Section>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
