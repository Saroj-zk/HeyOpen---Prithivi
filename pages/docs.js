import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductDemo from '@/components/ProductDemo';
import ProductWindow from '@/components/ProductWindow';
import { Reveal } from '@/components/ui/LedgerUI';

/**
 * What you can make with Hey Open.
 *
 * Earlier passes at this page explained the product in prose and looked
 * nothing like the rest of the site. This one leads with the output: every
 * claim is a real result with the exact prompt that produced it printed
 * underneath, and the page uses the same vocabulary as the home and
 * capabilities pages (ambient glow, pill eyebrow, framed product, alternating
 * bands) so it reads as part of the same site.
 *
 * Everything described was checked against the running app on 21 Oct 2026.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';
const MONO = '"SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace';

const CHAPTERS = [
  { id: 'make', label: 'What you can make' },
  { id: 'models', label: 'Every model' },
  { id: 'better', label: 'Better answers' },
  { id: 'recipes', label: 'Prompts to steal' },
];

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

const H2 = {
  fontSize: { xs: '2.1rem', md: '3rem' },
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: '-0.035em',
  color: 'var(--text-heading)',
  mb: 2.4,
  textWrap: 'balance',
};

const LEAD = {
  fontSize: { xs: '1.1rem', md: '1.25rem' },
  lineHeight: 1.65,
  color: 'var(--text-secondary)',
  maxWidth: 640,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: { xs: '1rem', md: '1.06rem' },
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
  textWrap: 'pretty',
};

function Pill({ children }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        color: ORANGE,
        mb: 3,
        px: 1.8,
        py: 0.7,
        borderRadius: '9999px',
        backgroundColor: 'rgba(255, 102, 0, 0.08)',
        border: '1px solid rgba(255, 102, 0, 0.25)',
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} />
      {children}
    </Box>
  );
}

function Band({ id, alt, children }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: '100px',
        py: { xs: 9, md: 15 },
        backgroundColor: alt ? 'var(--bg-section-alt)' : 'var(--bg-page)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
        {children}
      </Container>
    </Box>
  );
}

function Intro({ pill, title, lead, center }) {
  return (
    <Reveal>
      <Box sx={{ mb: { xs: 5, md: 8 }, textAlign: center ? 'center' : 'left' }}>
        <Pill>{pill}</Pill>
        <Typography component="h2" sx={{ ...H2, maxWidth: 820, mx: center ? 'auto' : 0 }}>
          {title}
        </Typography>
        {lead && <Typography sx={{ ...LEAD, mx: center ? 'auto' : 0 }}>{lead}</Typography>}
      </Box>
    </Reveal>
  );
}

/* A result, with the request that produced it printed underneath. The pairing
   is the whole point: a gallery alone shows that it can draw, and a prompt
   alone shows nothing at all. */
function Result({ item }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-popup)' },
      }}
    >
      {/* The source images are 4:3. Much below this and the crop starts
          cutting the subject rather than the margins. */}
      <Box sx={{ position: 'relative', flex: 1, minHeight: item.tall ? 420 : 300 }}>
        <Box
          component="img"
          src={item.src}
          alt={item.alt}
          loading="lazy"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            px: 1.4,
            py: 0.5,
            borderRadius: '8px',
            backgroundColor: 'rgba(12, 14, 20, 0.62)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {item.tag}
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2.2, md: 2.6 }, borderTop: '1px solid var(--border-subtle)' }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            mb: 1,
          }}
        >
          What was typed
        </Typography>
        <Typography
          sx={{
            fontFamily: MONO,
            fontSize: { xs: '0.82rem', md: '0.85rem' },
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
          }}
        >
          {item.prompt}
        </Typography>
      </Box>
    </Box>
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
        borderRadius: '16px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        p: { xs: 2.4, md: 3 },
      }}
    >
      <Typography
        component="code"
        sx={{
          display: 'block',
          fontFamily: MONO,
          fontSize: { xs: '0.9rem', md: '0.94rem' },
          lineHeight: 1.78,
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
          px: 1.8,
          py: 0.8,
          borderRadius: '9px',
          border: '1px solid',
          borderColor: copied ? 'rgba(255, 102, 0, 0.4)' : 'var(--border-subtle)',
          backgroundColor: 'transparent',
          color: copied ? ORANGE : 'var(--text-muted)',
          font: 'inherit',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
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
        px: 3.6,
        py: 1.7,
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 700,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        ...(solid
          ? {
              backgroundColor: ORANGE,
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(255, 102, 0, 0.28)',
              '&:hover': { backgroundColor: '#E65C00', boxShadow: '0 10px 30px rgba(255, 102, 0, 0.36)' },
            }
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

const RESULTS = [
  {
    tag: 'Portrait',
    tall: true,
    src: '/images/imagine_portrait.jpg',
    alt: 'Photoreal portrait at golden hour, generated from a written prompt',
    prompt:
      '"Portrait of a woman on a Santorini terrace at golden hour, white linen shirt, sea and whitewashed houses behind her, 85mm, shallow depth of field"',
  },
  {
    tag: 'Editorial',
    src: '/images/imagine_magazine.jpg',
    alt: 'Magazine spread mockup with legible type, generated from a written prompt',
    prompt:
      '"Open perfume magazine held over a coastal table at dusk, full spread, legible headline LA BELLE VIE, warm evening light"',
  },
  {
    tag: 'Product',
    src: '/images/imagine_sneaker.jpg',
    alt: 'Studio product photograph generated from a written prompt',
    prompt:
      '"Studio shot of a white running shoe held in two hands, hard directional light, deep black background, catalogue style"',
  },
];

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
                width: on ? 24 : 14,
                height: 2,
                flexShrink: 0,
                backgroundColor: on ? ORANGE : 'var(--border-strong)',
                transition: 'all 0.25s ease',
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
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <Head>
        <title>What You Can Make With Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Real results with the exact prompts that produced them, how to choose between 200+ models, and four prompts you can copy and run today."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

      {/* Ambient glow, same treatment as the capabilities page */}
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
          height: 760,
          background:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255, 102, 0, 0.18) 0%, rgba(255, 60, 0, 0.06) 55%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        data-ambient-blur
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%) translateX(-320px)',
          width: 620,
          height: 420,
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(100, 120, 255, 0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ================= HERO ================= */}
      <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 7, md: 11 }, pb: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
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
                <Pill>The guide</Pill>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.6rem', sm: '3.3rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.04,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-heading)',
                    mb: 3,
                    textWrap: 'balance',
                  }}
                >
                  Type a sentence.{' '}
                  <Box component="span" sx={{ color: ORANGE }}>
                    Get any of this.
                  </Box>
                </Typography>
                <Typography sx={{ ...LEAD, fontSize: { xs: '1.15rem', md: '1.28rem' }, mb: 4 }}>
                  Writing, code, research, photographs, audio and video come out of the same
                  message box. Here is what that looks like in practice, and how to ask for it.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.6 }}>
                  <CTA href={APP} solid>
                    Open the chat
                    <Box component="span" aria-hidden="true">→</Box>
                  </CTA>
                  <CTA href="#make">See what it makes</CTA>
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <Box
                sx={{
                  height: { xs: 380, sm: 440, md: 500 },
                  borderRadius: '22px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-popup)',
                }}
              >
                <ProductDemo flow="multimodel" active />
              </Box>
            </Reveal>
          </Box>
        </Container>
      </Box>

      {/* ================= WHAT YOU CAN MAKE ================= */}
      <Band id="make" alt>
        <Intro
          center
          pill="What you can make"
          title="Every one of these started as one sentence."
          lead="The request that produced each result is printed underneath it. Nothing here was retouched, and nothing needed a second tool."
        />

        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gridTemplateRows: { md: 'auto auto' },
              gap: { xs: 3, md: 3.5 },
            }}
          >
            <Box sx={{ gridRow: { md: 'span 2' } }}>
              <Result item={RESULTS[0]} />
            </Box>
            <Result item={RESULTS[1]} />
            <Result item={RESULTS[2]} />
          </Box>
        </Reveal>

        <Reveal delay={120}>
          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              p: { xs: 3, md: 4 },
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <Typography sx={{ ...BODY, fontSize: { xs: '1.02rem', md: '1.1rem' }, maxWidth: 760 }}>
              Describe it the way a photographer would and the result stops looking generic.{' '}
              <Box component="span" sx={{ color: 'var(--text-heading)', fontWeight: 700 }}>
                Subject, setting, light, lens, mood.
              </Box>{' '}
              Leave any of those out and the model picks for you, which is how everyone ends up
              with the same soft, over-lit image.
            </Typography>
          </Box>
        </Reveal>
      </Band>

      {/* ================= MODELS ================= */}
      <Band id="models">
        <Intro
          pill="Every model"
          title="One picker. Everything behind it."
          lead="Click the model name under the message box. Most people never open it, and it is where most of the difference sits."
        />

        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 8 } }}>
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
                        py: { xs: 2.4, md: 3 },
                        pr: 3,
                        fontSize: { xs: '1rem', md: '1.06rem' },
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
                        py: { xs: 2.4, md: 3 },
                        pr: 3,
                        fontSize: { xs: '1rem', md: '1.06rem' },
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
                        py: { xs: 2.4, md: 3 },
                        fontSize: { xs: '0.96rem', md: '1.02rem' },
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

      {/* ================= BETTER ANSWERS ================= */}
      <Band id="better" alt>
        <Intro
          pill="Better answers"
          title="The model is rarely the problem."
          lead="Nearly every disappointing answer traces back to a request that left the important decisions to the machine."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          <Reveal>
            <Box
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: '18px',
                border: '1px dashed var(--border-normal)',
                backgroundColor: 'transparent',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  mb: 2,
                }}
              >
                What most people send
              </Typography>
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: 'var(--text-muted)',
                  mb: 2.6,
                }}
              >
                {WEAK}
              </Typography>
              <Typography sx={{ ...BODY, fontSize: '0.98rem' }}>
                Nothing says who reads it, how long it should be, or what tone to take. The model
                guesses all three, and it guesses the average of everything it has ever seen.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                  mb: 2,
                }}
              >
                Send this instead
              </Typography>
              <Prompt>{STRONG}</Prompt>
              <Typography sx={{ ...BODY, mt: 3, fontSize: '0.98rem' }}>
                Same request, with the reader, the length, the tone and the ban list decided by you.
                Twenty seconds longer to write, three rounds of correction saved.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= RECIPES ================= */}
      <Band id="recipes">
        <Intro
          pill="Prompts to steal"
          title="Four that work on anything."
          lead="Replace what is in brackets and send it. Each is built around a single trick that reliably changes the reply."
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 7 } }}>
          {RECIPES.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1.35fr' },
                  gap: { xs: 2.5, md: 6 },
                  alignItems: 'start',
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.55rem' },
                      fontWeight: 750,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-heading)',
                      mb: 1.4,
                      textWrap: 'balance',
                    }}
                  >
                    {r.title}
                  </Typography>
                  <Typography sx={{ ...BODY, fontSize: '1rem' }}>{r.why}</Typography>
                </Box>
                <Prompt>{r.prompt}</Prompt>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Band>

      {/* ================= CLOSE ================= */}
      <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-section-alt)' }}>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 500,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 102, 0, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4, md: 6 }, py: { xs: 10, md: 16 }, position: 'relative' }}>
          <Reveal>
            <Box sx={{ maxWidth: 680, mx: 'auto', textAlign: 'center' }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 2.4,
                  textWrap: 'balance',
                }}
              >
                Pick one prompt and run it.
              </Typography>
              <Typography sx={{ ...LEAD, mx: 'auto', mb: 4 }}>
                Ten minutes in the chat will teach you more than the rest of this page.
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
