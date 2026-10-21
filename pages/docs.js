import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductWindow from '@/components/ProductWindow';
import { Reveal } from '@/components/ui/LedgerUI';

/**
 * How to use Hey Open.
 *
 * Four things only: pick a model, write the request, make an image, steal a
 * prompt. Everything else was cut. A guide nobody finishes is worth less than
 * a short one somebody acts on, so the rule here is that anything which does
 * not change what the reader does next comes out.
 *
 * What is described was checked against the running app at ais.openledger.xyz
 * on 21 Oct 2026.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';
const MONO = '"SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace';

const CHAPTERS = [
  { id: 'models', label: 'Pick a model' },
  { id: 'prompt', label: 'Write the request' },
  { id: 'images', label: 'Make images' },
  { id: 'recipes', label: 'Steal a prompt' },
];

/* ------------------------------------------------------------------ */
/* Type. Everything a step larger than it was.                         */
/* ------------------------------------------------------------------ */

const EYEBROW = {
  fontSize: '0.78rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  mb: 2.4,
};

const H2 = {
  fontSize: { xs: '2rem', md: '2.7rem' },
  fontWeight: 800,
  lineHeight: 1.12,
  letterSpacing: '-0.03em',
  color: 'var(--text-heading)',
  mb: 2.4,
  textWrap: 'balance',
};

const LEAD = {
  fontSize: { xs: '1.12rem', md: '1.22rem' },
  lineHeight: 1.65,
  color: 'var(--text-secondary)',
  maxWidth: 660,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: { xs: '1.02rem', md: '1.06rem' },
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
  textWrap: 'pretty',
};

function Band({ id, alt, children }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: '100px',
        py: { xs: 10, md: 17 },
        backgroundColor: alt ? 'var(--bg-section-alt)' : 'var(--bg-page)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 5 } }}>
        {children}
      </Container>
    </Box>
  );
}

function Intro({ eyebrow, title, lead }) {
  return (
    <Reveal>
      <Box sx={{ mb: { xs: 6, md: 9 } }}>
        <Typography sx={EYEBROW}>{eyebrow}</Typography>
        <Typography component="h2" sx={{ ...H2, maxWidth: 740 }}>
          {title}
        </Typography>
        {lead && <Typography sx={LEAD}>{lead}</Typography>}
      </Box>
    </Reveal>
  );
}

function Prompt({ children }) {
  const [copied, setCopied] = React.useState(false);
  const text = String(children);

  const copy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {}
    );
  };

  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        p: { xs: 2.6, md: 3 },
      }}
    >
      <Typography
        component="code"
        sx={{
          display: 'block',
          fontFamily: MONO,
          fontSize: { xs: '0.92rem', md: '0.95rem' },
          lineHeight: 1.75,
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </Typography>
      <Box
        component="button"
        type="button"
        onClick={copy}
        aria-label="Copy this prompt"
        sx={{
          mt: 2.2,
          px: 1.6,
          py: 0.7,
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'transparent',
          color: copied ? ORANGE : 'var(--text-muted)',
          font: 'inherit',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'color 0.2s ease, border-color 0.2s ease',
          '&:hover': { color: 'var(--text-heading)', borderColor: 'var(--border-normal)' },
        }}
      >
        {copied ? 'Copied' : 'Copy prompt'}
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
        px: 3.4,
        py: 1.6,
        borderRadius: '11px',
        fontSize: '1rem',
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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const PICK = [
  ['You are not sure', 'Leave it alone', 'The default is set to be reasonable at most things.'],
  ['It has to be current', 'Anything labelled Web', 'Without web access a model only knows what it was trained on.'],
  ['A long document', 'A large context window', 'Hover any model to see its figure. 200K and above holds most of them.'],
  ['You want a picture', 'The Image tab', 'Text models describe a picture rather than draw one.'],
  ['The subject is sensitive', 'A model labelled TEE', 'It runs inside a hardware enclave, so the host cannot read the request.'],
];

const WEAK = 'Write about our new product.';

const STRONG = `You are writing for developers who have used ChatGPT but never a multi-model tool.

Write a 150 word launch note for Hey Open, a single chat that runs 200+ AI models.

Lead with the problem of juggling four subscriptions. Plain English, no exclamation marks, no "revolutionary". End with one line telling them where to start.`;

const LAYERS = [
  ['Subject', 'A ceramic coffee cup'],
  ['Setting', 'on a weathered oak table beside a window'],
  ['Light', 'soft morning light from the left, long shadows'],
  ['Lens', 'shot on 50mm, shallow depth of field'],
  ['Mood', 'muted, warm, slightly desaturated'],
];

const GALLERY = [
  { src: '/images/imagine_portrait.jpg', tall: true, alt: 'Portrait generated from a written prompt' },
  { src: '/images/imagine_sneaker.jpg', alt: 'Product photograph generated from a written prompt' },
  { src: '/images/scenery_alpine.jpg', alt: 'Mountain landscape generated from a written prompt' },
];

const SAMPLE_PROMPT =
  'Portrait of a woman on a Santorini terrace at golden hour, white linen shirt, sea and whitewashed houses behind her, 85mm, shallow depth of field, warm natural light';

const RECIPES = [
  {
    title: 'Get through a long document',
    why: 'Ask for the shape before the detail, so you know which part to actually read.',
    prompt: `Here is a [contract / report / spec]. Before summarising, list the sections and what each one is for.

Then tell me the three things that would cost me most if I missed them. Quote the exact line for each.`,
  },
  {
    title: 'Review code you did not write',
    why: 'Ask for risk, not praise. Requiring a severity stops it listing style opinions as bugs.',
    prompt: `Review this code as if you are on call for it tonight.

For each problem: the file and line, what breaks, the input that triggers it, and a severity of high, medium or low. Order by severity. Ignore formatting and naming.`,
  },
  {
    title: 'Pressure test a decision',
    why: 'Asking for the strongest case against you beats asking for a recommendation.',
    prompt: `I am planning to [decision]. My reasoning is [reasoning].

Give me the strongest argument against it, as someone who thinks it is a mistake would put it. Then tell me what would have to be true for their case to beat mine.`,
  },
  {
    title: 'Write in a voice that is not generic',
    why: 'Describing a tone rarely works. Showing it two samples of your own writing almost always does.',
    prompt: `Here are two things I have written: [paste them]. Study the sentence length, how formal it is, and the words I avoid.

Now write [the thing you want] in that voice. Never use: delve, leverage, seamless, robust.`,
  },
];

/* ------------------------------------------------------------------ */

function Rail({ active }) {
  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'fixed',
        left: 26,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: { xs: 'none', xl: 'flex' },
        flexDirection: 'column',
        gap: 2,
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
              gap: 1.4,
              textDecoration: 'none',
              '&:hover .lbl': { opacity: 1 },
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 2,
                flexShrink: 0,
                backgroundColor: on ? ORANGE : 'var(--border-strong)',
                transition: 'background-color 0.25s ease',
              }}
            />
            <Typography
              className="lbl"
              sx={{
                fontSize: '0.82rem',
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

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const [active, setActive] = React.useState(CHAPTERS[0].id);

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>How to Use Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Which model to pick, how to phrase a request, how to build an image prompt, and four prompts you can copy and run today."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

      {/* ================= HERO ================= */}
      <Box sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 5 } }}>
          <Reveal>
            <Box sx={{ maxWidth: 780 }}>
              <Typography sx={EYEBROW}>Guide</Typography>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.2rem' },
                  fontWeight: 800,
                  lineHeight: 1.03,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-heading)',
                  mb: 3.2,
                  textWrap: 'balance',
                }}
              >
                How to actually use{' '}
                <Box component="span" sx={{ color: ORANGE }}>
                  Hey Open.
                </Box>
              </Typography>
              <Typography sx={{ ...LEAD, fontSize: { xs: '1.2rem', md: '1.35rem' }, maxWidth: 620, mb: 4.5 }}>
                Four things that change the quality of what you get back. About five minutes.
              </Typography>
              <CTA href={APP} solid>
                Open the chat
                <Box component="span" aria-hidden="true">→</Box>
              </CTA>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ================= 1. PICK A MODEL ================= */}
      <Band id="models" alt>
        <Intro
          eyebrow="One"
          title="Pick a model."
          lead="Click the model name under the message box. Most people never open it, and it is where most of the difference sits."
        />

        <Reveal>
          <Box sx={{ mb: { xs: 7, md: 10 } }}>
            <ProductWindow />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', minWidth: 620, borderCollapse: 'collapse' }}>
              <Box component="tbody">
                {PICK.map(([iff, pick, why]) => (
                  <Box key={iff} component="tr" sx={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <Box
                      component="td"
                      sx={{
                        py: { xs: 2.6, md: 3.2 },
                        pr: 3,
                        fontSize: { xs: '1rem', md: '1.08rem' },
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        verticalAlign: 'top',
                        width: '26%',
                      }}
                    >
                      {iff}
                    </Box>
                    <Box
                      component="td"
                      sx={{
                        py: { xs: 2.6, md: 3.2 },
                        pr: 3,
                        fontSize: { xs: '1rem', md: '1.08rem' },
                        fontWeight: 700,
                        color: ORANGE,
                        verticalAlign: 'top',
                        width: '26%',
                      }}
                    >
                      {pick}
                    </Box>
                    <Box
                      component="td"
                      sx={{
                        py: { xs: 2.6, md: 3.2 },
                        fontSize: { xs: '0.98rem', md: '1.04rem' },
                        lineHeight: 1.65,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {why}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= 2. WRITE THE REQUEST ================= */}
      <Band id="prompt">
        <Intro
          eyebrow="Two"
          title="Write the request properly."
          lead="The model is rarely the problem. Nearly every disappointing answer traces back to a request that left the important decisions to the machine."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.25fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'start',
          }}
        >
          <Reveal>
            <Box>
              <Typography sx={{ ...EYEBROW, mb: 2 }}>What most people send</Typography>
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: 'var(--text-muted)',
                  mb: 3,
                }}
              >
                {WEAK}
              </Typography>
              <Typography sx={BODY}>
                Nothing says who reads it, how long it should be, or what tone to take. The model
                guesses all three, and it guesses the average of everything it has ever seen. That
                is why the answer sounds like nobody wrote it.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Typography sx={{ ...EYEBROW, color: ORANGE, mb: 2 }}>Send this instead</Typography>
              <Prompt>{STRONG}</Prompt>
              <Typography sx={{ ...BODY, mt: 3 }}>
                Same request, with the reader, the length, the tone and the ban list decided by you.
                Twenty seconds longer to write, three rounds of correction saved.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= 3. MAKE IMAGES ================= */}
      <Band id="images" alt>
        <Intro
          eyebrow="Three"
          title="Make images."
          lead="Switch the picker to Image first. Then describe it the way a photographer would, one decision at a time, rather than piling on adjectives."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          <Reveal>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 1fr',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 2,
                height: { xs: 360, sm: 440, md: 500 },
              }}
            >
              {GALLERY.map((g) => (
                <Box
                  key={g.src}
                  sx={{
                    gridRow: g.tall ? 'span 2' : 'auto',
                    borderRadius: '14px',
                    overflow: 'hidden',
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
          </Reveal>

          <Reveal delay={100}>
            <Box>
              {LAYERS.map(([t, example], i) => (
                <Box
                  key={t}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    py: 2,
                    borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.04rem' },
                      fontWeight: 700,
                      color: 'var(--text-heading)',
                      minWidth: 90,
                      flexShrink: 0,
                    }}
                  >
                    {t}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: MONO,
                      fontSize: { xs: '0.9rem', md: '0.94rem' },
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {example}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 4 }}>
                <Typography sx={{ ...EYEBROW, mb: 2 }}>The prompt behind the portrait</Typography>
                <Prompt>{SAMPLE_PROMPT}</Prompt>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= 4. RECIPES ================= */}
      <Band id="recipes">
        <Intro
          eyebrow="Four"
          title="Steal a prompt."
          lead="Replace what is in brackets and send it. Each one is built around a single trick that reliably changes the reply."
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 9 } }}>
          {RECIPES.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' },
                  gap: { xs: 2.5, md: 6 },
                  alignItems: 'start',
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontWeight: 750,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-heading)',
                      mb: 1.4,
                      textWrap: 'balance',
                    }}
                  >
                    {r.title}
                  </Typography>
                  <Typography sx={{ ...BODY, fontSize: { xs: '1rem', md: '1.04rem' } }}>
                    {r.why}
                  </Typography>
                </Box>
                <Prompt>{r.prompt}</Prompt>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Band>

      {/* ================= CLOSE ================= */}
      <Box sx={{ py: { xs: 10, md: 16 }, backgroundColor: 'var(--bg-section-alt)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 5 } }}>
          <Reveal>
            <Box sx={{ maxWidth: 620 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.9rem', md: '2.5rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  mb: 2.4,
                  textWrap: 'balance',
                }}
              >
                Reading about prompting does very little.
              </Typography>
              <Typography sx={{ ...LEAD, mb: 4 }}>
                Ten minutes with the review prompt will teach you more than the rest of this page.
              </Typography>
              <CTA href={APP} solid>
                Open the chat
                <Box component="span" aria-hidden="true">→</Box>
              </CTA>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
