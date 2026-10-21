import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductWindow from '@/components/ProductWindow';
import { Reveal } from '@/components/ui/LedgerUI';
import useInView from '@/utils/useInView';

/**
 * What Hey Open is for.
 *
 * Styled from a reference supplied for this page only, so the tokens below are
 * local rather than taken from globals.css. The idiom is editorial: sections
 * divided by a hairline instead of alternating fills, a two column header with
 * the headline left and the lede bottom aligned beside it, monospace eyebrows,
 * very tight tracking on display sizes, 10px radii, one accent used sparingly.
 * The reference's yellow is replaced with our orange; nothing else about our
 * palette is imported, which is why these are page scoped constants.
 *
 * Content is unchanged in substance: three audiences, the comparison, the
 * position, the picker. Checked against the running app on 21 Oct 2026.
 */

const APP = 'https://ais.openledger.xyz/chat';

/* ---- page scoped tokens ------------------------------------------ */
const T = {
  bg: '#FFFFFF',
  surface: '#FAFAFA',
  surface2: '#F4F4F5',
  fg: '#0C0C0E',
  fg2: '#4E4E55',
  fg3: '#8A8A92',
  line: 'rgba(12, 12, 14, 0.08)',
  line2: 'rgba(12, 12, 14, 0.15)',
  brand: '#FF6600',
  brandSoft: 'rgba(255, 102, 0, 0.10)',
  brandLine: 'rgba(255, 102, 0, 0.32)',
  ink: '#0C0C0E',
  r: '10px',
  shadow: '0 1px 2px rgba(12,12,14,.04), 0 12px 32px -12px rgba(12,12,14,.12)',
  mono: '"Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  maxw: 1200,
  gut: { xs: '20px', sm: '24px' },
};

const CHAPTERS = [
  { id: 'uses', label: 'What it is for' },
  { id: 'why', label: 'The comparison' },
  { id: 'private', label: 'Private, uncensored' },
  { id: 'models', label: 'The picker' },
];

/* ------------------------------------------------------------------ */

function Wrap({ children, sx }) {
  return (
    <Box sx={{ maxWidth: T.maxw, mx: 'auto', px: T.gut, ...sx }}>
      {children}
    </Box>
  );
}

/* Sections are divided by a hairline, never by a change of background. */
function Section({ id, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        borderTop: `1px solid ${T.line}`,
        py: { xs: 7, md: 12 },
        scrollMarginTop: '90px',
        ...sx,
      }}
    >
      <Wrap>{children}</Wrap>
    </Box>
  );
}

function Eyebrow({ children, accent }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: T.mono,
        fontSize: '11.5px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: accent ? T.brand : T.fg3,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: accent ? T.brand : T.fg3 }}
      />
      {children}
    </Box>
  );
}

/* Headline left, lede bottom aligned to its right. The motif the whole
   reference is built on. */
function Header({ eyebrow, title, lede }) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.25fr 1fr' },
          gap: { xs: '14px', md: '40px' },
          alignItems: 'end',
          mb: { xs: '28px', md: '40px' },
        }}
      >
        <Box>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Typography
            component="h2"
            sx={{
              fontSize: 'clamp(32px, 4.8vw, 58px)',
              lineHeight: 1.02,
              letterSpacing: '-0.038em',
              fontWeight: 600,
              color: T.fg,
              mt: '16px',
              textWrap: 'balance',
            }}
          >
            {title}
          </Typography>
        </Box>
        {lede && (
          <Typography
            sx={{
              color: T.fg2,
              fontSize: '17px',
              lineHeight: 1.55,
              maxWidth: '56ch',
              textWrap: 'pretty',
            }}
          >
            {lede}
          </Typography>
        )}
      </Box>
    </Reveal>
  );
}

function Card({ children, sx, pad = true }) {
  return (
    <Box
      sx={{
        border: `1px solid ${T.line}`,
        borderRadius: T.r,
        backgroundColor: T.bg,
        overflow: 'hidden',
        ...(pad ? { p: { xs: '18px', md: '22px' } } : null),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function Button({ children, href, primary }) {
  return (
    <Box
      component="a"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        px: '20px',
        py: '12px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '-0.005em',
        textDecoration: 'none',
        transition: 'all .18s cubic-bezier(.32,.72,0,1)',
        ...(primary
          ? {
              backgroundColor: T.fg,
              color: '#FFFFFF',
              border: `1px solid ${T.fg}`,
              '&:hover': { backgroundColor: '#25252B', borderColor: '#25252B' },
            }
          : {
              backgroundColor: T.bg,
              color: T.fg,
              border: `1px solid ${T.line2}`,
              '&:hover': { backgroundColor: T.surface2 },
            }),
      }}
    >
      {children}
    </Box>
  );
}

function Mono({ children, sx }) {
  return (
    <Typography
      component="span"
      sx={{ fontFamily: T.mono, fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: T.fg3, ...sx }}
    >
      {children}
    </Typography>
  );
}

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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const STATS = [
  ['200+', 'Models'],
  ['4', 'Modalities'],
  ['$20', 'A month'],
  ['0', 'Prompts kept'],
];

const FRAMES = [
  { src: '/images/scenery_cliffs.jpg', alt: 'Generated still, cliffs at dusk' },
  { src: '/images/scenery_alpine.jpg', alt: 'Generated still, ridge at dawn' },
  { src: '/images/scenery_dunes.jpg', alt: 'Generated still, dunes' },
];

const API_SNIPPET = `curl https://api.openledger.xyz/v1/chat/completions \\
  -H "Authorization: Bearer $OPENLEDGER_API_KEY" \\
  -d '{ "model": "auto", "messages": [...] }'`;

const GUARANTEES = ['No account to start', 'Prompts not retained', 'Memory stays local', 'TEE models available'];

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
        left: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: { xs: 'none', xl: 'flex' },
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {CHAPTERS.map((c, i) => {
        const on = active === c.id;
        return (
          <Box
            key={c.id}
            component="a"
            href={`#${c.id}`}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', '&:hover .lbl': { opacity: 1 } }}
          >
            <Box
              sx={{
                fontFamily: T.mono,
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: on ? T.brand : T.fg3,
                transition: 'color .2s ease',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </Box>
            <Box sx={{ width: on ? 18 : 8, height: 1, backgroundColor: on ? T.brand : T.line2, transition: 'all .2s ease' }} />
            <Typography
              className="lbl"
              sx={{
                fontFamily: T.mono,
                fontSize: '10.5px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: on ? T.fg : T.fg3,
                opacity: on ? 1 : 0,
                transition: 'opacity .2s ease',
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

/* A numbered audience row: label column, claim, artifact. */
function Use({ n, tag, title, body, children }) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.82fr 1.18fr' },
          gap: { xs: '22px', md: '48px' },
          py: { xs: '32px', md: '46px' },
          borderTop: `1px solid ${T.line}`,
          alignItems: 'start',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '18px' }}>
            <Mono sx={{ color: T.brand, fontSize: '11.5px' }}>{n}</Mono>
            <Box sx={{ width: 14, height: 1, backgroundColor: T.line2 }} />
            <Mono>{tag}</Mono>
          </Box>
          <Typography
            component="h3"
            sx={{
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontWeight: 600,
              color: T.fg,
              mb: '14px',
              textWrap: 'balance',
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: '15px', lineHeight: 1.6, color: T.fg2, maxWidth: '46ch', textWrap: 'pretty' }}>
            {body}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 0 }}>{children}</Box>
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
    <Box sx={{ minHeight: '100vh', backgroundColor: T.bg, position: 'relative', overflowX: 'hidden' }}>
      <Head>
        <title>What You Can Do With Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Make a film in one thread, build on one API key across 200+ models, or put sensitive documents through AI that keeps nothing."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

      {/* ================= HERO ================= */}
      <Box sx={{ pt: { xs: '48px', md: '84px' }, pb: { xs: '44px', md: '68px' } }}>
        <Wrap>
          <Reveal>
            <Eyebrow accent>Private and uncensored</Eyebrow>
            <Typography
              component="h1"
              sx={{
                fontSize: 'clamp(40px, 7vw, 92px)',
                lineHeight: 0.98,
                letterSpacing: '-0.05em',
                fontWeight: 600,
                color: T.fg,
                mt: '22px',
                mb: '26px',
                maxWidth: '16ch',
                textWrap: 'balance',
              }}
            >
              The whole job in one thread.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '17px', md: '19px' },
                lineHeight: 1.5,
                color: T.fg2,
                maxWidth: '58ch',
                mb: '32px',
                textWrap: 'pretty',
              }}
            >
              200+ models behind one chat and one API key. Make a film, ship an application, or put
              a contract through it, without an account and without your work being stored.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Button href={APP} primary>
                Open the chat
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
              <Button href="#uses">What people do with it</Button>
            </Box>
          </Reveal>

          {/* Stat row */}
          <Reveal delay={120}>
            <Box
              sx={{
                mt: { xs: '44px', md: '68px' },
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                borderTop: `1px solid ${T.line}`,
              }}
            >
              {STATS.map(([v, k], i) => (
                <Box
                  key={k}
                  sx={{
                    py: { xs: '20px', md: '26px' },
                    pl: { md: i === 0 ? 0 : '26px' },
                    borderLeft: { xs: 'none', md: i === 0 ? 'none' : `1px solid ${T.line}` },
                    borderTop: { xs: i > 1 ? `1px solid ${T.line}` : 'none', md: 'none' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '30px', md: '38px' },
                      lineHeight: 1,
                      letterSpacing: '-0.045em',
                      fontWeight: 600,
                      color: T.fg,
                      fontVariantNumeric: 'tabular-nums',
                      mb: '8px',
                    }}
                  >
                    {v}
                  </Typography>
                  <Mono>{k}</Mono>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Wrap>
      </Box>

      {/* ================= USES ================= */}
      <Section id="uses">
        <Header
          eyebrow="What it is for"
          title="Three jobs, one subscription."
          lede="The same account covers someone making something, someone building on the API, and someone whose documents cannot go into a consumer chatbot."
        />

        <Use
          n="01"
          tag="Making something"
          title="Script, stills, motion and score. One thread."
          body="Write it, storyboard it, animate the closing shot and score it without opening a second tool. Each step still has the one before it, so nothing gets re-described."
        >
          <Box
            sx={{
              borderRadius: T.r,
              overflow: 'hidden',
              border: `1px solid ${T.line}`,
              backgroundColor: T.ink,
              aspectRatio: '16 / 10',
              mb: '10px',
            }}
          >
            <Clip src="/Videos/AI ecosystem/Video Gen.webm" />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {FRAMES.map((f) => (
              <Box
                key={f.src}
                sx={{ position: 'relative', aspectRatio: '3 / 2', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${T.line}` }}
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
        </Use>

        <Use
          n="02"
          tag="Building on it"
          title="One key. Every model. No rewrite."
          body="An OpenAI-compatible endpoint, so you change a base URL and keep your code. Set the model to auto and cheap requests stop going to expensive models."
        >
          <Box sx={{ borderRadius: T.r, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: T.ink }}>
            <Box
              sx={{
                px: '16px',
                py: '11px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontFamily: T.mono,
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.42)',
              }}
            >
              chat/completions
            </Box>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: { xs: '18px', md: '22px' },
                overflowX: 'auto',
                fontFamily: T.mono,
                fontSize: { xs: '12px', md: '13px' },
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              {API_SNIPPET}
            </Box>
          </Box>
        </Use>

        <Use
          n="03"
          tag="Work you cannot paste elsewhere"
          title="Contracts in. Nothing left behind."
          body="Due diligence, case files, patient records and board papers. No account to create, prompts not retained, and models that run inside a hardware enclave for the parts that need it."
        >
          <Box sx={{ borderRadius: T.r, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: T.ink, p: { xs: '20px', md: '26px' } }}>
            <Typography
              sx={{
                fontFamily: T.mono,
                fontSize: { xs: '12px', md: '13px' },
                lineHeight: 1.85,
                color: 'rgba(255,255,255,0.88)',
                mb: '22px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {'> Review the attached master services agreement.\n  Flag every clause that shifts liability to us,\n  quote it, and rank by exposure.'}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {GUARANTEES.map((g) => (
                <Box
                  key={g}
                  sx={{
                    px: '10px',
                    py: '5px',
                    borderRadius: '6px',
                    border: `1px solid ${T.brandLine}`,
                    color: T.brand,
                    fontFamily: T.mono,
                    fontSize: '10.5px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {g}
                </Box>
              ))}
            </Box>
          </Box>
        </Use>
      </Section>

      {/* ================= COMPARISON ================= */}
      <Section id="why" sx={{ backgroundColor: T.surface }}>
        <Header eyebrow="The comparison" title="The same work, counted honestly." />

        <Reveal>
          <Card pad={false} sx={{ backgroundColor: T.bg }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr">
                    {['', 'Four separate tools', 'Hey Open'].map((h, i) => (
                      <Box
                        key={i}
                        component="th"
                        sx={{
                          textAlign: 'left',
                          px: { xs: '16px', md: '22px' },
                          py: '14px',
                          borderBottom: `1px solid ${T.line}`,
                          fontFamily: T.mono,
                          fontSize: '10.5px',
                          fontWeight: 400,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: i === 2 ? T.brand : T.fg3,
                          width: i === 0 ? '34%' : '33%',
                        }}
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {COMPARE.map(([label, them, us], i) => (
                    <Box key={label} component="tr" sx={{ borderTop: i === 0 ? 'none' : `1px solid ${T.line}` }}>
                      <Box
                        component="td"
                        sx={{ px: { xs: '16px', md: '22px' }, py: '16px', fontSize: '14.5px', fontWeight: 500, color: T.fg }}
                      >
                        {label}
                      </Box>
                      <Box
                        component="td"
                        sx={{ px: { xs: '16px', md: '22px' }, py: '16px', fontSize: '14px', color: T.fg3, fontVariantNumeric: 'tabular-nums' }}
                      >
                        {them}
                      </Box>
                      <Box
                        component="td"
                        sx={{ px: { xs: '16px', md: '22px' }, py: '16px', fontSize: '14px', color: T.fg, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}
                      >
                        {us}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Reveal>
      </Section>

      {/* ================= PRIVATE ================= */}
      <Section id="private">
        <Header
          eyebrow="Private and uncensored"
          title="The two things we will not trade away."
          lede="Most of this industry treats both as features to switch on later. They are the reason this exists."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '28px', md: '48px' } }}>
          <Reveal>
            <Box>
              {PRIVACY.map(([t, d], i) => (
                <Box
                  key={t}
                  sx={{ display: 'flex', gap: '18px', py: '20px', borderTop: i === 0 ? 'none' : `1px solid ${T.line}` }}
                >
                  <Mono sx={{ color: T.brand, pt: '3px', minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</Mono>
                  <Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.015em', color: T.fg, mb: '6px' }}>
                      {t}
                    </Typography>
                    <Typography sx={{ fontSize: '14.5px', lineHeight: 1.6, color: T.fg2, textWrap: 'pretty' }}>{d}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box
              sx={{
                borderRadius: T.r,
                backgroundColor: T.ink,
                border: '1px solid rgba(255,255,255,0.1)',
                p: { xs: '22px', md: '30px' },
                height: 'fit-content',
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px', mb: '20px' }}>
                <Box aria-hidden="true" sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: T.brand }} />
                <Box
                  component="span"
                  sx={{ fontFamily: T.mono, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.brand }}
                >
                  On uncensored
                </Box>
              </Box>
              <Typography sx={{ fontSize: { xs: '16px', md: '17px' }, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', mb: '18px', textWrap: 'pretty' }}>
                A screenplay about addiction. A security write up with working exploit code. A
                medical question you would rather not have attached to your name. Mainstream
                assistants refuse all three, and none of them are unreasonable to ask.
              </Typography>
              <Typography sx={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', textWrap: 'pretty' }}>
                Models marked Uncensored refuse less. That describes the model, not permission: the
                acceptable use terms apply on every model here, and what is illegal stays illegal.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* ================= PICKER ================= */}
      <Section id="models" sx={{ backgroundColor: T.surface }}>
        <Header
          eyebrow="The picker"
          title="One control. Everything behind it."
          lede="Click the model name under the message box. Switching never leaves your conversation."
        />

        <Reveal>
          <Box sx={{ mb: { xs: '28px', md: '44px' }, borderRadius: T.r, overflow: 'hidden', boxShadow: T.shadow }}>
            <ProductWindow />
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
              <Box component="tbody">
                {PICK.map(([iff, pick, why], i) => (
                  <Box key={iff} component="tr" sx={{ borderTop: `1px solid ${T.line}` }}>
                    <Box
                      component="td"
                      sx={{ py: '18px', pr: '22px', fontSize: '14.5px', fontWeight: 500, color: T.fg, verticalAlign: 'top', width: '26%' }}
                    >
                      {iff}
                    </Box>
                    <Box
                      component="td"
                      sx={{ py: '18px', pr: '22px', fontSize: '14.5px', fontWeight: 500, color: T.brand, verticalAlign: 'top', width: '26%' }}
                    >
                      {pick}
                    </Box>
                    <Box component="td" sx={{ py: '18px', fontSize: '14px', lineHeight: 1.6, color: T.fg2 }}>
                      {why}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ================= CLOSE ================= */}
      <Section>
        <Reveal>
          <Box sx={{ py: { xs: '20px', md: '40px' }, maxWidth: '20ch' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: 'clamp(32px, 5vw, 62px)',
                lineHeight: 1.02,
                letterSpacing: '-0.045em',
                fontWeight: 600,
                color: T.fg,
                mb: '20px',
                textWrap: 'balance',
              }}
            >
              Bring the thing you gave up on.
            </Typography>
            <Typography sx={{ fontSize: '17px', lineHeight: 1.55, color: T.fg2, maxWidth: '48ch', mb: '28px', textWrap: 'pretty' }}>
              The project that needed four subscriptions, or the document you could not paste
              anywhere else.
            </Typography>
            <Button href={APP} primary>
              Open the chat
              <Box component="span" aria-hidden="true">→</Box>
            </Button>
          </Box>
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
