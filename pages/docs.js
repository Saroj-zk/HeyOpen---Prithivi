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

/* The reference's three signature devices, which the token list alone does not
   carry. Without these it reads as plain typesetting, which is what the first
   pass at this restyle was. */

/* 1. A mock sits in a tray: hairline, then a ring of surface, then a second
      hairline, over a deep soft drop. This is the thing that makes the
      product look placed rather than pasted. Leave room for the 9px ring. */
const TRAY = {
  borderRadius: '22px',
  boxShadow: [
    'inset 0 1px 0 rgba(255,255,255,.9)',
    '0 0 0 1px rgba(12,12,14,.07)',
    '0 0 0 8px #F4F4F5',
    '0 0 0 9px rgba(12,12,14,.06)',
    '0 36px 70px -34px rgba(12,12,14,.2)',
  ].join(','),
};

/* 2. A ruled grid behind the hero, faded out downward. */
const GRID = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  backgroundImage:
    'linear-gradient(90deg, rgba(12,12,14,.08) 1px, transparent 1px), linear-gradient(rgba(12,12,14,.08) 1px, transparent 1px)',
  backgroundSize: '64px 64px, 64px 64px',
  maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.35) 55%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.35) 55%, transparent 100%)',
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

/* ------------------------------------------------------------------ */
/* Flows                                                               */
/* ------------------------------------------------------------------ */

/* A step's media panel. Each flow uses a different register so the three
   sequences do not read as one block repeated three times. */
function Media({ step }) {
  const base = {
    position: 'relative',
    aspectRatio: '16 / 11',
    borderBottom: `1px solid ${T.line}`,
    overflow: 'hidden',
  };

  if (step.img) {
    return (
      <Box sx={base}>
        <Box
          component="img"
          src={step.img}
          alt=""
          loading="lazy"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  if (step.video) {
    return (
      <Box sx={{ ...base, backgroundColor: T.ink }}>
        <Clip src={step.video} />
      </Box>
    );
  }

  /* Everything else is drawn: a few lines of monospace on the right
     surface, which keeps the card honest about being a diagram. */
  return (
    <Box
      sx={{
        ...base,
        backgroundColor: step.dark ? T.ink : T.surface2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '6px',
        px: '16px',
      }}
    >
      {step.lines.map((l, i) => (
        <Typography
          key={i}
          sx={{
            fontFamily: T.mono,
            fontSize: '11.5px',
            lineHeight: 1.5,
            color: l.hot ? T.brand : step.dark ? 'rgba(255,255,255,.72)' : T.fg2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {l.t}
        </Typography>
      ))}
    </Box>
  );
}

function Flow({ flow }) {
  return (
    <Reveal>
      <Box sx={{ pt: { xs: '40px', md: '58px' } }}>
        {/* Heading row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: '16px',
            alignItems: 'end',
            mb: '26px',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '14px' }}>
              <Mono sx={{ color: T.brand, fontSize: '11.5px' }}>{flow.n}</Mono>
              <Box sx={{ width: 14, height: 1, backgroundColor: T.line2 }} />
              <Mono>{flow.tag}</Mono>
            </Box>
            <Typography
              component="h3"
              sx={{
                fontSize: 'clamp(22px, 2.6vw, 32px)',
                lineHeight: 1.08,
                letterSpacing: '-0.032em',
                fontWeight: 600,
                color: T.fg,
                textWrap: 'balance',
              }}
            >
              {flow.title}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '14.5px', lineHeight: 1.55, color: T.fg2, maxWidth: '38ch' }}>
            {flow.body}
          </Typography>
        </Box>

        {/* The sequence */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: '16px', lg: '14px' },
            position: 'relative',
          }}
        >
          {flow.steps.map((step, i) => (
            <Box key={step.t} sx={{ position: 'relative' }}>
              {/* Connector into the next card, drawn only where cards sit
                  side by side. */}
              {i < flow.steps.length - 1 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'none', lg: 'block' },
                    position: 'absolute',
                    top: '50%',
                    right: -14,
                    width: 14,
                    height: 1,
                    backgroundColor: T.line2,
                    zIndex: 1,
                  }}
                />
              )}
              <Box
                sx={{
                  border: `1px solid ${T.line}`,
                  borderRadius: T.r,
                  overflow: 'hidden',
                  backgroundColor: T.bg,
                  height: '100%',
                  transition: 'box-shadow .2s ease, border-color .2s ease',
                  '&:hover': { borderColor: T.line2, boxShadow: T.shadow },
                }}
              >
                <Media step={step} />
                <Box sx={{ p: '16px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', mb: '7px' }}>
                    <Mono sx={{ fontSize: '10px', color: T.brand }}>{String(i + 1).padStart(2, '0')}</Mono>
                    <Typography sx={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em', color: T.fg }}>
                      {step.t}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '13.5px', lineHeight: 1.55, color: T.fg3 }}>{step.d}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* The outcome */}
        <Box
          sx={{
            mt: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            px: '16px',
            py: '14px',
            borderRadius: T.r,
            border: `1px solid ${T.brandLine}`,
            backgroundColor: T.brandSoft,
          }}
        >
          <Mono sx={{ color: T.brand, fontSize: '10.5px' }}>Result</Mono>
          <Typography sx={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em', color: T.fg }}>
            {flow.result}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: T.fg2 }}>{flow.resultNote}</Typography>
        </Box>
      </Box>
    </Reveal>
  );
}

const FLOWS = [
  {
    n: '01',
    tag: 'Making something',
    title: 'A short film, start to finish.',
    body: 'Four messages in one conversation. Each step still has the one before it, so nothing is re-described.',
    steps: [
      {
        t: 'Write the script',
        d: 'Ask a text model for the scenes and the shot list.',
        dark: true,
        lines: [
          { t: 'SCENE 4 - THE ORCHARD' },
          { t: 'She holds the photograph' },
          { t: 'up until the hill behind' },
          { t: 'it lines up.' },
        ],
      },
      { t: 'Generate the stills', d: 'Switch to an image model. It already knows the script.', img: '/images/scenery_cliffs.jpg' },
      { t: 'Animate the shot', d: 'Switch to a video model and move the frame you picked.', video: '/Videos/AI ecosystem/Video Gen.webm' },
      {
        t: 'Score and voice it',
        d: 'Music, effects and the closing line, matched to the cut.',
        lines: [
          { t: 'strings.wav      00:42' },
          { t: 'wind_bed.wav     00:42' },
          { t: 'maren_vo.wav     00:06', hot: true },
        ],
      },
    ],
    result: 'A finished two minute film.',
    resultNote: 'One subscription, one thread, no re-uploading between tools.',
  },
  {
    n: '02',
    tag: 'Building on it',
    title: 'An app on every model at once.',
    body: 'An OpenAI-compatible endpoint, so the integration you already wrote keeps working.',
    steps: [
      { t: 'Create a key', d: 'One key reaches the whole catalogue.', dark: true, lines: [{ t: '$ openledger keys create' }, { t: 'sk-ol-7f2c...9a41', hot: true }] },
      { t: 'Point your client', d: 'Change the base URL. Leave the rest of your code alone.', dark: true, lines: [{ t: 'new OpenAI({' }, { t: '  baseURL: ".../v1"', hot: true }, { t: '})' }] },
      { t: 'Let it route', d: 'Set auto and cheap requests stop hitting expensive models.', dark: true, lines: [{ t: 'model: "auto"', hot: true }, { t: 'messages: [...]' }] },
      { t: 'Ship it', d: 'Swap or add a model later without another integration.', dark: true, lines: [{ t: '200 OK', hot: true }, { t: 'served_by: claude-opus-4' }, { t: 'cost: $0.0021' }] },
    ],
    result: 'One integration, every model.',
    resultNote: 'Adding a model later is a string change, not a sprint.',
  },
  {
    n: '03',
    tag: 'Work you cannot paste elsewhere',
    title: 'Sensitive documents, nothing left behind.',
    body: 'Due diligence, case files, patient records and board papers, without creating an account first.',
    steps: [
      { t: 'Pick a TEE model', d: 'It runs in an enclave, so the host cannot read the request.', lines: [{ t: '[ TEE ]  enclave', hot: true }, { t: '[ WEB ]  off' }, { t: '[ CTX ]  200K' }] },
      { t: 'Paste the document', d: 'No upload quota and no account to create first.', lines: [{ t: 'MSA_2026_final.pdf' }, { t: '84 pages' }, { t: 'attached' }] },
      { t: 'Ask in plain English', d: 'Clause level answers, quoted back with the text.', lines: [{ t: '> flag every clause' }, { t: '  shifting liability' }, { t: '  to us' }] },
      { t: 'Close the tab', d: 'The prompt was never retained and memory stayed local.', lines: [{ t: 'retained:   0 bytes', hot: true }, { t: 'account:    none' }, { t: 'memory:     local only' }] },
    ],
    result: 'An answer, and no copy anywhere.',
    resultNote: 'The strongest guarantee is not holding it in the first place.',
  },
];

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
      <Box sx={{ position: 'relative', pt: { xs: '48px', md: '84px' }, pb: { xs: '44px', md: '68px' } }}>
        <Box aria-hidden="true" sx={GRID} />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '50%',
            top: -60,
            width: '70%',
            height: 300,
            transform: 'translateX(-50%)',
            background: 'radial-gradient(closest-side, rgba(255,102,0,.16), transparent)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
        <Wrap sx={{ position: 'relative' }}>
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
          lede="Each of these is a sequence, not a feature. The point is that every step stays in the same conversation."
        />

        {FLOWS.map((f) => (
          <Flow key={f.n} flow={f} />
        ))}
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
          <Box sx={{ ...TRAY, overflow: 'hidden', mx: '9px', mb: { xs: '44px', md: '60px' } }}>
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
      <Section sx={{ overflow: 'hidden', position: 'relative' }}>
        {/* Outlined, enormous, purely graphic. Sits behind the closing copy
            rather than above it, which stops the section being a tall column
            of text against an empty right half. */}
        <Typography
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: { xs: '-6%', md: '-14%' },
            transform: 'translateX(-50%)',
            fontSize: 'clamp(110px, 20vw, 290px)',
            lineHeight: 0.8,
            letterSpacing: '-0.07em',
            fontWeight: 600,
            color: 'transparent',
            WebkitTextStroke: `1px ${T.line2}`,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          HEY OPEN
        </Typography>

        <Reveal>
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
              gap: { xs: '28px', md: '56px' },
              alignItems: 'end',
              py: { xs: '12px', md: '28px' },
            }}
          >
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: 'clamp(32px, 4.6vw, 58px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.045em',
                  fontWeight: 600,
                  color: T.fg,
                  mb: '20px',
                  maxWidth: '14ch',
                  textWrap: 'balance',
                }}
              >
                Bring the thing you gave up on.
              </Typography>
              <Button href={APP} primary>
                Open the chat
                <Box component="span" aria-hidden="true">→</Box>
              </Button>
            </Box>

            <Box sx={{ pb: '6px' }}>
              <Typography sx={{ fontSize: '17px', lineHeight: 1.55, color: T.fg2, mb: '22px', textWrap: 'pretty' }}>
                The project that needed four subscriptions, or the document you could not paste
                anywhere else.
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: `1px solid ${T.line}` }}>
                {[['No account', 'to start'], ['Nothing', 'retained']].map(([a1, a2], i) => (
                  <Box key={a1} sx={{ py: '14px', pl: i === 0 ? 0 : '18px', borderLeft: i === 0 ? 'none' : `1px solid ${T.line}` }}>
                    <Typography sx={{ fontSize: '19px', fontWeight: 600, letterSpacing: '-0.03em', color: T.fg, lineHeight: 1.1 }}>
                      {a1}
                    </Typography>
                    <Mono sx={{ fontSize: '10.5px' }}>{a2}</Mono>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Section>

      <Footer />
    </Box>
  );
}
