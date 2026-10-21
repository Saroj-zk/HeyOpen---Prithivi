import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductWindow from '@/components/ProductWindow';
import { Reveal } from '@/components/ui/LedgerUI';
import useInView from '@/utils/useInView';

/**
 * What Hey Open is for.
 *
 * Three audiences, one page: someone making something, someone building on the
 * API, and someone who cannot put their documents into a consumer chatbot.
 * Each gets a short block and a real artifact, deliberately not an essay.
 *
 * The positioning underneath all three is the one the rest of the site leads
 * with and earlier drafts of this page buried: private by default, uncensored
 * when the work needs it.
 *
 * Checked against the running app and the published API shape on 21 Oct 2026.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';
const MONO = '"SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace';
const INK = '#0E1116';

const CHAPTERS = [
  { id: 'uses', label: 'What it is for' },
  { id: 'why', label: 'Why not four tools' },
  { id: 'private', label: 'Private, uncensored' },
  { id: 'models', label: 'Pick a model' },
];

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
  maxWidth: 660,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: { xs: '1.02rem', md: '1.1rem' },
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
        border: '1px solid rgba(255, 102, 0, 0.28)',
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
        <Typography component="h2" sx={{ ...H2, maxWidth: 860, mx: center ? 'auto' : 0 }}>
          {title}
        </Typography>
        {lead && <Typography sx={{ ...LEAD, mx: center ? 'auto' : 0 }}>{lead}</Typography>}
      </Box>
    </Reveal>
  );
}

/* Megabytes each, so nothing is fetched until the block is close. */
function Clip({ src }) {
  const [ref, inView] = useInView('300px');
  const videoRef = React.useRef(null);
  const [primed, setPrimed] = React.useState(false);

  React.useEffect(() => {
    if (inView) setPrimed(true);
  }, [inView]);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !primed) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, primed]);

  return (
    <Box ref={ref} sx={{ width: '100%', height: '100%' }}>
      <Box
        component="video"
        ref={videoRef}
        src={primed ? src : undefined}
        loop
        muted
        playsInline
        preload="none"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );
}

function Code({ children, caption }) {
  return (
    <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: INK }}>
      {caption && (
        <Box
          sx={{
            px: 2.4,
            py: 1.4,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: MONO,
          }}
        >
          {caption}
        </Box>
      )}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: { xs: 2.4, md: 3 },
          overflowX: 'auto',
          fontFamily: MONO,
          fontSize: { xs: '0.82rem', md: '0.88rem' },
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.88)',
        }}
      >
        {children}
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
              '&:hover': { backgroundColor: '#E65C00' },
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

const FRAMES = [
  { src: '/images/scenery_cliffs.jpg', alt: 'Generated still, cliffs at dusk' },
  { src: '/images/scenery_alpine.jpg', alt: 'Generated still, ridge at dawn' },
  { src: '/images/scenery_dunes.jpg', alt: 'Generated still, dunes' },
];

const API_SNIPPET = `curl https://api.openledger.xyz/v1/chat/completions \\
  -H "Authorization: Bearer $OPENLEDGER_API_KEY" \\
  -d '{ "model": "auto", "messages": [...] }'`;

const GUARANTEES = ['No account to start', 'Prompts not retained', 'Memory stays in your browser', 'TEE models available'];

const COMPARE = [
  ['Models you can reach', 'One family per tool', '200+ in one picker'],
  ['Text, images, video, voice', 'Four tools, four tabs', 'One conversation'],
  ['Context between steps', 'Re-explained every time', 'Carried the whole way'],
  ['Content limits', 'Fixed by whoever built it', 'Pick an uncensored model'],
  ['Your prompts afterwards', 'Kept, tied to your account', 'Not retained'],
  ['Account to start', 'Required', 'Not needed'],
  ['Every month', '$165', '$20'],
];

const PRIVACY = [
  ['Start with no account', 'No email, no name, nothing connecting the session to you.'],
  ['Prompts are not kept', 'We record that a request happened so we can bill and stop abuse. Not what was in it.'],
  ['Memory never leaves your browser', 'No server copy to leak, subpoena or restore.'],
  ['Hardware isolation where it matters', 'Models marked TEE run in an enclave. The picker shows which.'],
];

const PICK = [
  ['You are not sure', 'Leave it alone', 'The default is set to be reasonable at most things.'],
  ['It has to be current', 'Anything labelled Web', 'Without web access a model only knows what it was trained on.'],
  ['A long document', 'A large context window', 'Hover any model to see its figure.'],
  ['You want a picture', 'The Image tab', 'Text models describe a picture rather than draw one.'],
  ['The subject is sensitive', 'A model labelled TEE', 'It runs inside a hardware enclave.'],
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
            sx={{ display: 'flex', alignItems: 'center', gap: 1.4, textDecoration: 'none', '&:hover .lbl': { opacity: 1 } }}
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

/* One audience: a short claim on one side, a real artifact on the other. */
function UseCase({ tag, title, body, flip, children }) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
          gap: { xs: 3.5, md: 7 },
          alignItems: 'center',
        }}
      >
        <Box sx={{ order: { xs: 2, md: flip ? 2 : 1 } }}>
          <Typography
            sx={{
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: ORANGE,
              mb: 1.6,
            }}
          >
            {tag}
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '1.6rem', md: '2.1rem' },
              fontWeight: 780,
              letterSpacing: '-0.032em',
              lineHeight: 1.12,
              color: 'var(--text-heading)',
              mb: 1.8,
              textWrap: 'balance',
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ ...BODY, maxWidth: 440 }}>{body}</Typography>
        </Box>
        <Box sx={{ order: { xs: 1, md: flip ? 1 : 2 }, minWidth: 0 }}>{children}</Box>
      </Box>
    </Reveal>
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
        <title>What You Can Do With Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Make a film in one thread, build on one API key across 200+ models, or put sensitive documents through AI that keeps nothing. Private by default, uncensored when needed."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

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

      {/* ================= HERO ================= */}
      <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 8, md: 13 }, pb: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <Reveal>
            <Box sx={{ maxWidth: 900 }}>
              <Pill>Private and uncensored</Pill>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.5rem', md: '4.4rem' },
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '-0.042em',
                  color: 'var(--text-heading)',
                  mb: 3,
                  textWrap: 'balance',
                }}
              >
                The whole job in one thread.{' '}
                <Box component="span" sx={{ color: ORANGE }}>
                  Nothing kept afterwards.
                </Box>
              </Typography>
              <Typography sx={{ ...LEAD, fontSize: { xs: '1.15rem', md: '1.3rem' }, maxWidth: 720, mb: 4 }}>
                200+ models behind one chat and one API key. Make a film, ship an application, or
                put a contract through it, without an account and without your work being stored.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.6 }}>
                <CTA href={APP} solid>
                  Open the chat
                  <Box component="span" aria-hidden="true">→</Box>
                </CTA>
                <CTA href="#uses">See what people do with it</CTA>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ================= USE CASES ================= */}
      <Band id="uses" alt>
        <Intro pill="What it is for" title="Three jobs, one subscription." />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 14 } }}>
          {/* ---- Creators ---- */}
          <UseCase
            tag="Making something"
            title="Script, stills, motion and score. One thread."
            body="Write it, storyboard it, animate the closing shot and score it without opening a second tool. Each step still has the one before it, so nothing gets re-described."
          >
            <Box>
              <Box
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: INK,
                  aspectRatio: '16 / 10',
                  mb: 1.6,
                }}
              >
                <Clip src="/Videos/AI ecosystem/Video Gen.webm" />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.6 }}>
                {FRAMES.map((f) => (
                  <Box
                    key={f.src}
                    sx={{
                      position: 'relative',
                      aspectRatio: '3 / 2',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Box
                      component="img"
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </UseCase>

          {/* ---- Developers ---- */}
          <UseCase
            flip
            tag="Building on it"
            title="One key. Every model. No rewrite."
            body="An OpenAI-compatible endpoint, so you change a base URL and keep your code. Set the model to auto and cheap requests stop going to expensive models."
          >
            <Code caption="chat/completions">{API_SNIPPET}</Code>
          </UseCase>

          {/* ---- Sensitive work ---- */}
          <UseCase
            tag="Work you cannot paste elsewhere"
            title="Contracts in. Nothing left behind."
            body="Due diligence, case files, patient records and board papers. No account to create, prompts not retained, and models that run inside a hardware enclave for the parts that need it."
          >
            <Box
              sx={{
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: INK,
                p: { xs: 3, md: 3.6 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: { xs: '0.86rem', md: '0.92rem' },
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.88)',
                  mb: 3,
                }}
              >
                {'> Review the attached master services agreement.\n  Flag every clause that shifts liability to us,\n  quote it, and rank by exposure.'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {GUARANTEES.map((g) => (
                  <Box
                    key={g}
                    sx={{
                      px: 1.4,
                      py: 0.6,
                      borderRadius: '7px',
                      backgroundColor: 'rgba(255, 102, 0, 0.14)',
                      border: '1px solid rgba(255, 102, 0, 0.3)',
                      color: ORANGE,
                      fontSize: '0.74rem',
                      fontWeight: 700,
                    }}
                  >
                    {g}
                  </Box>
                ))}
              </Box>
            </Box>
          </UseCase>
        </Box>
      </Band>

      {/* ================= WHY ================= */}
      <Band id="why">
        <Intro pill="Why not four tools" title="The same work, counted honestly." />

        <Reveal>
          <Box sx={{ borderRadius: '18px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)', overflow: 'hidden' }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', minWidth: 660, borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ backgroundColor: 'var(--bg-section-alt)' }}>
                    {['', 'Four separate tools', 'Hey Open'].map((h, i) => (
                      <Box
                        key={i}
                        component="th"
                        sx={{
                          textAlign: 'left',
                          px: { xs: 2.4, md: 3 },
                          py: 2.2,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: i === 2 ? ORANGE : 'var(--text-muted)',
                          width: i === 0 ? '34%' : '33%',
                        }}
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {COMPARE.map(([label, them, us]) => (
                    <Box key={label} component="tr" sx={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <Box
                        component="td"
                        sx={{ px: { xs: 2.4, md: 3 }, py: { xs: 2.2, md: 2.6 }, fontSize: { xs: '0.96rem', md: '1.02rem' }, fontWeight: 700, color: 'var(--text-heading)' }}
                      >
                        {label}
                      </Box>
                      <Box
                        component="td"
                        sx={{ px: { xs: 2.4, md: 3 }, py: { xs: 2.2, md: 2.6 }, fontSize: { xs: '0.94rem', md: '1rem' }, color: 'var(--text-muted)' }}
                      >
                        {them}
                      </Box>
                      <Box
                        component="td"
                        sx={{ px: { xs: 2.4, md: 3 }, py: { xs: 2.2, md: 2.6 }, fontSize: { xs: '0.94rem', md: '1rem' }, fontWeight: 650, color: 'var(--text-heading)' }}
                      >
                        {us}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= PRIVATE ================= */}
      <Band id="private" alt>
        <Intro
          pill="Private and uncensored"
          title="The two things we will not trade away."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 6 } }}>
          <Reveal>
            <Box>
              {PRIVACY.map(([t, d], i) => (
                <Box key={t} sx={{ display: 'flex', gap: 2.4, py: 2.6, borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
                  <Typography aria-hidden="true" sx={{ fontSize: '0.78rem', fontWeight: 800, color: ORANGE, pt: 0.5, minWidth: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontSize: { xs: '1.08rem', md: '1.15rem' }, fontWeight: 700, color: 'var(--text-heading)', mb: 0.6 }}>
                      {t}
                    </Typography>
                    <Typography sx={{ ...BODY, fontSize: '1rem' }}>{d}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '20px', backgroundColor: INK, border: '1px solid rgba(255,255,255,0.08)', height: 'fit-content' }}>
              <Typography
                sx={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: ORANGE, mb: 2.4 }}
              >
                On uncensored
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.7, color: 'rgba(255,255,255,0.88)', mb: 2.4, textWrap: 'pretty' }}>
                A screenplay about addiction. A security write up with working exploit code. A
                medical question you would rather not have attached to your name. Mainstream
                assistants refuse all three, and none of them are unreasonable to ask.
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.96rem', md: '1rem' }, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', textWrap: 'pretty' }}>
                Models marked Uncensored refuse less. That describes the model, not permission: the
                acceptable use terms apply on every model here, and what is illegal stays illegal.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= MODELS ================= */}
      <Band id="models">
        <Intro
          pill="Pick a model"
          title="One picker. Everything behind it."
          lead="Click the model name under the message box. Switching never leaves your conversation."
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
                      sx={{ py: { xs: 2.4, md: 2.8 }, pr: 3, fontSize: { xs: '1rem', md: '1.04rem' }, fontWeight: 700, color: 'var(--text-heading)', verticalAlign: 'top', width: '26%' }}
                    >
                      {iff}
                    </Box>
                    <Box
                      component="td"
                      sx={{ py: { xs: 2.4, md: 2.8 }, pr: 3, fontSize: { xs: '1rem', md: '1.04rem' }, fontWeight: 700, color: ORANGE, verticalAlign: 'top', width: '26%' }}
                    >
                      {pick}
                    </Box>
                    <Box
                      component="td"
                      sx={{ py: { xs: 2.4, md: 2.8 }, fontSize: { xs: '0.96rem', md: '1rem' }, lineHeight: 1.65, color: 'var(--text-secondary)' }}
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

      {/* ================= CLOSE ================= */}
      <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-section-alt)' }}>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: -220,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 520,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 102, 0, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4, md: 6 }, py: { xs: 10, md: 16 }, position: 'relative' }}>
          <Reveal>
            <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center' }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '2rem', md: '2.9rem' }, fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--text-heading)', mb: 2.4, textWrap: 'balance' }}
              >
                Bring the thing you gave up on.
              </Typography>
              <Typography sx={{ ...LEAD, mx: 'auto', mb: 4 }}>
                The project that needed four subscriptions, or the document you could not paste
                anywhere else.
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
