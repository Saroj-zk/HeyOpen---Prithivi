import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/LedgerUI';
import useInView from '@/utils/useInView';

/**
 * What Hey Open is for.
 *
 * The page has one job: someone lands here and understands what they could
 * build. The earlier pass answered that with three rows of four cards, and
 * since every card was a dark panel of small monospace, the whole answer read
 * as twelve identical rectangles. You could not tell the film from the API.
 *
 * So the structure is now the product's own claim. Hey Open is one
 * conversation in which the model changes underneath you, and that is exactly
 * what the page is: a single thread, three chapters hanging off it, the
 * modality chip changing down the right hand side. A transcript is the most
 * legible way to show what you get, because everyone can already read one.
 *
 * The three chapters are told apart by material rather than by colour. The
 * film chapter is a screenplay, a photograph, footage and an audio timeline.
 * The developer chapter is a terminal. The confidential chapter is paper.
 * Orange appears twice only: the live chip, and the outcome marker.
 *
 * Tokens are page scoped, from a reference supplied for this page alone.
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

/* A mock sits in a tray: hairline, a ring of surface, a second hairline, over
   a deep soft drop. It is what makes the product look placed rather than
   pasted. Leave room for the 9px ring. */
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

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Wrap({ children, sx }) {
  return <Box sx={{ maxWidth: T.maxw, mx: 'auto', px: T.gut, ...sx }}>{children}</Box>;
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
        sx={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: accent ? T.brand : T.fg3 }}
      />
      {children}
    </Box>
  );
}

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
          <Typography sx={{ color: T.fg2, fontSize: '17px', lineHeight: 1.55, maxWidth: '56ch', textWrap: 'pretty' }}>
            {lede}
          </Typography>
        )}
      </Box>
    </Reveal>
  );
}

function Button({ children, href, primary }) {
  const external = href.startsWith('http');
  return (
    <Box
      component="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
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
      sx={{
        fontFamily: T.mono,
        fontSize: '11px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: T.fg3,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

/* `from` skips a lead-in. The generation clip opens on about three seconds
   of flat grey while its own UI animates, so starting at zero shows an empty
   panel every time the loop comes round. Looping is done by hand for the
   same reason. */
function Clip({ src, from = 0 }) {
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

  const seek = React.useCallback(() => {
    const v = videoRef.current;
    if (v && from > 0 && v.currentTime < from) v.currentTime = from;
  }, [from]);

  const again = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = from;
    v.play().catch(() => {});
  }, [from]);

  return (
    <Box ref={ref} sx={{ width: '100%', height: '100%' }}>
      <Box
        component="video"
        ref={videoRef}
        src={primed ? src : undefined}
        muted
        playsInline
        preload="none"
        onLoadedMetadata={seek}
        onEnded={again}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const MODES = ['Text', 'Image', 'Video', 'Audio'];

const COMPARE = [
  ['Models you can reach', 'One family per tool', '200+ in one picker'],
  ['Text, images, video, voice', 'Four tools, four tabs', 'One conversation'],
  ['Context between steps', 'Re-explained every time', 'Carried the whole way'],
  ['Content limits', 'Fixed by whoever built it', 'Pick an uncensored model'],
  ['Your prompts afterwards', 'Kept, tied to your account', 'Not retained'],
  ['Account to start', 'Required', 'Not needed'],
  ['Every month', '$165', '$20'],
];

/* The thread carrying on past the three worked examples. These are whole
   sentences rather than one word labels, because "Lesson plan" is a category
   and "Turn the syllabus into twelve lessons" is a thing someone types. The
   column fades out instead of ending, which makes the point that the list
   does not stop here without a line of copy claiming so. */
const OPEN_ENDED = [
  ['Text', 'Draft the quarterly memo before the board call.'],
  ['Data', 'Clean this export and tell me what actually changed.'],
  ['Code', 'Explain the service nobody has touched in two years.'],
  ['Image', 'Shoot the forty products that have no photography.'],
  ['Audio', 'Cut the interview down to twenty minutes.'],
  ['Text', 'Translate the supplier contract and flag what moved.'],
];

/* Three worked examples.
 *
 * Every artifact below is the real asset it claims to be, and the asks are
 * written to the assets rather than the other way round. The ridge still and
 * the battle footage are two shots of one scene, which is what the script
 * describes, so nothing here promises a shot the page cannot show. */
const THREADS = [
  {
    tag: 'Making something',
    title: 'A film, start to finish.',
    body:
      'Four turns, one conversation. The image model has already read the script, and the video model has already seen the frame, so nothing is described twice.',
    turns: [
      {
        mode: 'Text',
        ask: 'Write scene nine. Maren reaches the ridge at dawn and sees the field below.',
        note: 'A text model gives you the scene and the shot list.',
        kind: 'script',
        lines: [
          'SCENE 9 - THE RIDGE, DAWN',
          '',
          'Maren reaches the spine of the',
          'ridge. Below the cloud line the',
          'field is already moving.',
        ],
      },
      {
        mode: 'Image',
        ask: 'Make the establishing shot. Her, small, above the cloud.',
        note: 'Switch to an image model. It does not need the scene explained again.',
        kind: 'image',
        img: '/images/scenery_alpine.jpg',
      },
      {
        mode: 'Video',
        ask: 'Now the field below, in motion.',
        note: 'Switch to a video model and the still becomes a shot.',
        kind: 'video',
        video: '/Videos/AI ecosystem/video gen new.mp4',
        from: 4,
      },
      {
        mode: 'Audio',
        ask: 'Score it, and read her last line over the cut.',
        note: 'Music, atmosphere and voice, matched to the length of the cut.',
        kind: 'audio',
        tracks: [
          ['strings', '00:42', 0.82],
          ['wind bed', '00:42', 0.46],
          ['maren vo', '00:06', 0.2],
        ],
      },
    ],
    result: 'A finished two minute film.',
    resultNote: 'One subscription, one thread, nothing re-uploaded between tools.',
  },
  {
    tag: 'Building on it',
    title: 'A support agent that knows when to escalate.',
    body:
      'An OpenAI compatible endpoint, so this is the client you have already written. What changes is that one key triages on a cheap model, escalates the hard ones to a strong model, and reads the photo the customer attached.',
    turns: [
      {
        mode: 'Code',
        ask: 'Point the client you already have at us.',
        note: 'A base URL and a key. Nothing else in the application changes.',
        kind: 'code',
        lines: [
          { t: 'new OpenAI({' },
          { t: '  baseURL: ".../v1",', hot: true },
          { t: '  apiKey: OPENLEDGER_KEY' },
          { t: '})' },
        ],
      },
      {
        mode: 'Routing',
        ask: 'Answer the easy tickets on something cheap.',
        note: 'Set the model to auto. Most of the queue never reaches an expensive model, and the ones that need it still get it.',
        kind: 'table',
        cols: ['Ticket', 'Routed to'],
        rows: [
          ['Where is my order', 'haiku 4.5'],
          ['Refund, box arrived open', 'haiku 4.5'],
          ['Enterprise SLA, clause 9', 'opus 5'],
        ],
        meta: 'auto routed  ·  one escalated',
      },
      {
        mode: 'Vision',
        ask: 'A customer sent a photo asking if this is what they ordered.',
        note: 'The same key reads images. You did not sign up to a vision provider to get this.',
        kind: 'image',
        img: '/images/imagine_sneaker.jpg',
      },
      {
        mode: 'Ledger',
        ask: 'And how much of this do I now maintain?',
        note: 'Every response names the model that served it, so replacing one is config rather than a rewrite.',
        kind: 'receipt',
        rows: [
          ['models in use', '3', false],
          ['vendor accounts', '1', true],
          ['integrations', '1', true],
          ['code changed', 'one line', false],
        ],
      },
    ],
    result: 'An agent in production, on one key.',
    resultNote: 'Swapping or adding a model later is a string change, not a sprint.',
  },
  {
    tag: 'Work you cannot paste elsewhere',
    title: 'Sensitive documents, nothing left behind.',
    body:
      'Due diligence, case files, patient records and board papers. No account to create, and no copy of any of it afterwards.',
    turns: [
      {
        mode: 'Picker',
        ask: 'Use something the host cannot read.',
        note: 'Models marked TEE run inside a hardware enclave.',
        kind: 'picker',
        rows: [['Enclave', 'TEE', true], ['Web access', 'Off', false], ['Context', '200K', false]],
      },
      {
        mode: 'Document',
        ask: 'Here is the agreement. Eighty four pages.',
        note: 'Paste it. There is no upload quota and no account to create first.',
        kind: 'paper',
        meta: 'MSA_2026_final.pdf  ·  84 pages',
      },
      {
        mode: 'Answer',
        ask: 'Flag every clause that shifts liability to us.',
        note: 'Clause level answers, quoted back against the text you gave it.',
        kind: 'paper',
        meta: '3 clauses flagged  ·  §4.2  §9.1  §11.6',
        mark: true,
      },
      {
        mode: 'Receipt',
        ask: 'Now forget all of it.',
        note: 'There is nothing to forget. It was never written down.',
        kind: 'receipt',
        rows: [['retained', '0 bytes', true], ['account', 'none', false], ['memory', 'local only', false]],
      },
    ],
    result: 'An answer, and no copy anywhere.',
    resultNote: 'The strongest guarantee is not holding it in the first place.',
  },
];

/* ------------------------------------------------------------------ */
/* The thread                                                          */
/* ------------------------------------------------------------------ */

/* How far apart the turns sit, and how tall the stacked answer is. The gap
   between two panels in the stack is one minus the other, so both have to be
   known here rather than left to the content.

   The step is how much scrolling each answer gets before the next one takes
   the frame. */
const STEP = '64vh';
const PANEL = { md: 300, lg: 344 };

/* Inline under its ask, the panel sets its own height. In the stack it
   fills the frame it is laid into. */
const art = (fill) => ({
  position: 'relative',
  borderRadius: T.r,
  border: `1px solid ${T.line}`,
  overflow: 'hidden',
  ...(fill ? { height: '100%' } : { aspectRatio: '16 / 9', minHeight: '160px' }),
});

/* A row of ruled lines standing in for body text on a page. Widths are fixed
   rather than random so the server and the client draw the same page. */
const RULES = [96, 88, 92, 74, 90, 84, 60];

function Artifact({ turn, fill }) {
  if (turn.kind === 'image') {
    return (
      <Box sx={{ ...art(fill), backgroundColor: T.surface2 }}>
        <Box
          component="img"
          src={turn.img}
          alt=""
          loading="lazy"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  if (turn.kind === 'video') {
    /* An ink fill underneath, so a clip still buffering reads as a frame that
       has not arrived rather than as a hole in the thread. */
    return (
      <Box sx={{ ...art(fill), backgroundColor: T.ink }}>
        <Clip src={turn.video} from={turn.from || 0} />
      </Box>
    );
  }

  if (turn.kind === 'script') {
    return (
      <Box
        sx={{
          ...art(fill),
          backgroundColor: T.bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: '20px', md: '30px' },
          py: '20px',
        }}
      >
        {turn.lines.map((l, i) => (
          <Typography
            key={i}
            sx={{
              fontFamily: T.mono,
              fontSize: { xs: '11px', md: '12px' },
              lineHeight: 1.75,
              color: i === 0 ? T.fg : T.fg2,
              letterSpacing: i === 0 ? '0.08em' : 0,
              minHeight: l === '' ? '10px' : 'auto',
              whiteSpace: 'pre',
            }}
          >
            {l}
          </Typography>
        ))}
      </Box>
    );
  }

  if (turn.kind === 'code') {
    return (
      <Box
        sx={{
          ...art(fill),
          backgroundColor: T.ink,
          borderColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px',
          px: { xs: '18px', md: '24px' },
        }}
      >
        {turn.lines.map((l, i) => (
          <Typography
            key={i}
            sx={{
              fontFamily: T.mono,
              fontSize: { xs: '11.5px', md: '12.5px' },
              lineHeight: 1.5,
              color: l.hot ? T.brand : 'rgba(255,255,255,.66)',
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

  if (turn.kind === 'audio') {
    return (
      <Box
        sx={{
          ...art(fill),
          backgroundColor: T.surface2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '16px',
          px: { xs: '18px', md: '26px' },
        }}
      >
        {turn.tracks.map(([name, time, fill]) => (
          <Box key={name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '7px' }}>
              <Mono sx={{ fontSize: '10px', textTransform: 'none', letterSpacing: '0.04em' }}>{name}</Mono>
              <Mono sx={{ fontSize: '10px', letterSpacing: '0.04em' }}>{time}</Mono>
            </Box>
            <Box sx={{ height: '4px', borderRadius: '2px', backgroundColor: 'rgba(12,12,14,.09)' }}>
              <Box
                sx={{
                  width: `${Math.round(fill * 100)}%`,
                  height: '100%',
                  borderRadius: '2px',
                  backgroundColor: T.fg2,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (turn.kind === 'table') {
    return (
      <Box
        sx={{
          ...art(fill),
          backgroundColor: T.bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: '18px', md: '26px' },
          py: '20px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '10px 20px',
            pb: '10px',
            borderBottom: `1px solid ${T.line}`,
          }}
        >
          {turn.cols.map((c) => (
            <Mono key={c} sx={{ fontSize: '9.5px' }}>
              {c}
            </Mono>
          ))}
        </Box>
        {turn.rows.map(([label, served]) => (
          <Box
            key={label}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '10px 20px',
              py: '11px',
              alignItems: 'center',
              borderBottom: `1px solid ${T.line}`,
            }}
          >
            <Typography sx={{ fontSize: '13px', color: T.fg, lineHeight: 1.3 }}>{label}</Typography>
            {/* The model is the answer this table exists to give, so it is
                set as a chip rather than as another column of text. */}
            <Box
              sx={{
                px: '8px',
                py: '3px',
                borderRadius: '6px',
                backgroundColor: T.surface2,
                fontFamily: T.mono,
                fontSize: '10.5px',
                color: T.fg2,
                whiteSpace: 'nowrap',
              }}
            >
              {served}
            </Box>
          </Box>
        ))}
        <Mono sx={{ mt: '12px', fontSize: '10px', textTransform: 'none', letterSpacing: '0.03em' }}>
          {turn.meta}
        </Mono>
      </Box>
    );
  }

  if (turn.kind === 'picker' || turn.kind === 'receipt') {
    return (
      <Box
        sx={{
          ...art(fill),
          backgroundColor: turn.kind === 'receipt' ? T.ink : T.surface2,
          borderColor: turn.kind === 'receipt' ? 'transparent' : T.line,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '14px',
          px: { xs: '18px', md: '26px' },
        }}
      >
        {turn.rows.map(([k, v, hot]) => (
          <Box
            key={k}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <Mono
              sx={{
                fontSize: '10.5px',
                textTransform: 'none',
                letterSpacing: '0.04em',
                color: turn.kind === 'receipt' ? 'rgba(255,255,255,.42)' : T.fg3,
              }}
            >
              {k}
            </Mono>
            <Typography
              sx={{
                fontFamily: T.mono,
                fontSize: '12px',
                fontWeight: hot ? 600 : 400,
                color: hot ? T.brand : turn.kind === 'receipt' ? 'rgba(255,255,255,.74)' : T.fg,
              }}
            >
              {v}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  /* paper: a page of ruled text, optionally with one clause picked out. */
  return (
    <Box
      sx={{
        ...art(fill),
        backgroundColor: T.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '9px',
        px: { xs: '20px', md: '28px' },
        py: '22px',
      }}
    >
      {RULES.map((w, i) => {
        const marked = turn.mark && (i === 2 || i === 3);
        return (
          <Box
            key={i}
            sx={{
              width: `${w}%`,
              height: '6px',
              borderRadius: '3px',
              backgroundColor: marked ? T.brandSoft : 'rgba(12,12,14,.075)',
              boxShadow: marked ? `inset 0 0 0 1px ${T.brandLine}` : 'none',
            }}
          />
        );
      })}
      <Mono sx={{ mt: '8px', fontSize: '10px', textTransform: 'none', letterSpacing: '0.03em' }}>
        {turn.meta}
      </Mono>
    </Box>
  );
}

/* The shape every example below has in common, said once before any of them
   start. All three are the same three moves, and the middle one is the whole
   product: the model changes and the conversation does not.
 *
 * Drawn rather than written, and drawn evenly. The previous pass had the
 * right parts and no rhythm: stations sized to their own labels, so the gaps
 * between them came out unequal and the arrowheads never sat halfway between
 * anything; a rail that ran past the outer stations and stopped in mid air;
 * one caption wrapping while the other two did not; and the modality chips
 * hanging under the first column alone, which tipped the whole row to the
 * left. Evenness is most of what makes a diagram look deliberate.
 *
 * So: one word per station, which makes the three nearly the same width; the
 * rail inset to the first and last station rather than to the edges of the
 * page; arrowheads drawn rather than typed, so they sit on the line; and the
 * chips moved under the middle, where they belong to the whole flow instead
 * of to its first third.
 */
const STATION_H = 46;

const FLOW = [
  { n: '01', label: 'Ask', body: 'One box, and no mode to pick first.' },
  { n: '02', label: 'Build', body: 'Switch models without starting over.' },
  { n: '03', label: 'Finish', body: 'Take the work. Nothing is kept.' },
];

const MODES_IN = ['Text', 'Image', 'Video', 'Code'];

function Flow() {
  return (
    <Reveal>
      <Box sx={{ position: 'relative', mt: { xs: '36px', md: '62px' } }}>
        {/* The rail, running between the first and last station rather than
            off to the edges, and knocked out by each station's own fill. */}
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: '16.666%',
            right: '16.666%',
            top: `${STATION_H / 2}px`,
            height: '1px',
            backgroundColor: T.line2,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: '34px', md: '24px' },
          }}
        >
          {FLOW.map((step, i) => (
            <Box
              key={step.n}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
                textAlign: { md: 'center' },
              }}
            >
              {/* the direction, drawn so it sits on the line */}
              {i > 0 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    left: { md: '-12px' },
                    top: { xs: '-20px', md: `${STATION_H / 2}px` },
                    transform: { md: 'translate(-50%, -50%)' },
                    width: 0,
                    height: 0,
                    borderTop: { xs: `7px solid ${T.fg3}`, md: '5px solid transparent' },
                    borderBottom: { xs: 'none', md: '5px solid transparent' },
                    borderLeft: { xs: '5px solid transparent', md: `8px solid ${T.fg3}` },
                    borderRight: { xs: '5px solid transparent', md: 'none' },
                  }}
                />
              )}

              {/* the station */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '11px',
                  height: `${STATION_H}px`,
                  px: '22px',
                  borderRadius: '999px',
                  border: `1px solid ${T.line2}`,
                  backgroundColor: T.bg,
                }}
              >
                <Mono sx={{ color: T.brand, fontSize: '10.5px' }}>{step.n}</Mono>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '-0.018em',
                    color: T.fg,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: '20px',
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  color: T.fg2,
                  textWrap: 'pretty',
                }}
              >
                {step.body}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* What can go in the box. Under the whole flow, not under its first
            step, because it is true of the thread rather than of one move. */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '7px',
            mt: { xs: '30px', md: '36px' },
            justifyContent: { xs: 'flex-start', md: 'center' },
          }}
        >
          {MODES_IN.map((c) => (
            <Box
              key={c}
              sx={{
                px: '10px',
                py: '6px',
                borderRadius: '6px',
                backgroundColor: T.surface2,
                fontFamily: T.mono,
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: T.fg2,
              }}
            >
              {c}
            </Box>
          ))}
        </Box>
      </Box>
    </Reveal>
  );
}

/* One ask on the thread. The answer is not here on a wide screen: it is in
   the frame beside it, which stays put and changes. On a narrow screen there
   is no second column to pin, so the answer sits under its ask. */
function Ask({ turn, index, last, setRef }) {
  /* Stable, deliberately. An inline arrow is a new function every render, so
     React would detach the node and attach it again each time, and anything
     measuring in that gap finds nothing to measure. */
  const attach = React.useCallback((el) => setRef(index, el), [setRef, index]);

  return (
    <Box
      ref={attach}
      sx={{
        position: 'relative',
        pl: { xs: '22px', md: '38px' },
        minHeight: { md: STEP },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: { xs: index === 0 ? 0 : '30px', md: 0 },
      }}
    >
      {/* The spine. Each ask draws a full height run so the segments meet:
          the thread does not break between turns. The last stops at its node
          rather than trailing off the end. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1px',
          backgroundColor: T.line2,
          ...(last ? { height: { xs: '36px', md: '50%' } } : { bottom: 0 }),
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '-3px',
          top: { xs: '36px', md: '50%' },
          mt: '-3px',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          border: `1px solid ${T.line2}`,
          backgroundColor: T.bg,
        }}
      />

      <Mono sx={{ color: T.brand, letterSpacing: '0.12em' }}>{turn.mode}</Mono>
      <Typography
        sx={{
          mt: '12px',
          mb: '12px',
          fontSize: { xs: '18px', md: '22px' },
          lineHeight: 1.35,
          letterSpacing: '-0.025em',
          fontWeight: 500,
          color: T.fg,
          maxWidth: '26ch',
          textWrap: 'pretty',
        }}
      >
        {turn.ask}
      </Typography>
      <Typography sx={{ fontSize: '14.5px', lineHeight: 1.6, color: T.fg3, maxWidth: '40ch' }}>
        {turn.note}
      </Typography>
    </Box>
  );
}

function Thread({ thread }) {
  const [active, setActive] = React.useState(0);
  const askEls = React.useRef([]);
  const setRef = React.useCallback((i, el) => {
    askEls.current[i] = el;
  }, []);

  /* Which answer the frame is showing.
   *
   * Whichever ask is nearest the middle of the screen. Asked outright rather
   * than waiting to be told: this was four IntersectionObservers watching a
   * band about 30px tall, and a band that thin, over a page that scrolls
   * under Lenis, misses crossings often enough to leave the wrong answer up.
   *
   * The interval is a safety net rather than the mechanism. Scrolling drives
   * this, but the position can also change with no scroll event to hear: an
   * anchor jump, a position restored on reload, or the page reflowing as
   * images and video load and shift everything below them. Four rect reads,
   * five times a second, costs nothing. */
  React.useEffect(() => {
    const measure = () => {
      const middle = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      askEls.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - middle);
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      setActive((current) => (current === best ? current : best));
    };
    measure();
    const tick = window.setInterval(measure, 200);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Box sx={{ pt: { xs: '46px', md: '90px' } }}>
      <Reveal>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
            gap: { xs: '14px', md: '56px' },
            alignItems: 'end',
            mb: { xs: '10px', md: '26px' },
            pl: { xs: '22px', md: '38px' },
          }}
        >
          <Box>
            <Mono sx={{ display: 'block', mb: '14px' }}>{thread.tag}</Mono>
            <Typography
              component="h3"
              sx={{
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                lineHeight: 1.06,
                letterSpacing: '-0.034em',
                fontWeight: 600,
                color: T.fg,
                textWrap: 'balance',
              }}
            >
              {thread.title}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '15px', lineHeight: 1.6, color: T.fg2, textWrap: 'pretty' }}>
            {thread.body}
          </Typography>
        </Box>
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
          gap: { xs: 0, md: '56px' },
          alignItems: 'start',
        }}
      >
        <Box>
          {thread.turns.map((turn, i) => (
            <React.Fragment key={turn.ask}>
              <Ask turn={turn} index={i} last={i === thread.turns.length - 1} setRef={setRef} />
              {/* the answer, inline, narrow screens only */}
              <Box sx={{ display: { md: 'none' }, pl: '22px', pt: '18px', pb: '8px' }}>
                <Artifact turn={turn} />
              </Box>
            </React.Fragment>
          ))}
        </Box>

        {/* One frame, held in the middle of the screen, with the answers laid
            over each other inside it and only the current one up. The frame
            never moves: what changes is what is in it. */}
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: { md: `calc(50vh - ${PANEL.md / 2}px)`, lg: `calc(50vh - ${PANEL.lg / 2}px)` },
            alignSelf: 'start',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: { md: `${PANEL.md}px`, lg: `${PANEL.lg}px` },
            }}
          >
            {thread.turns.map((turn, i) => {
              const on = i === active;
              return (
                <Box
                  key={turn.ask}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: T.r,
                    overflow: 'hidden',
                    backgroundColor: T.bg,
                    opacity: on ? 1 : 0,
                    transform: on ? 'none' : 'translateY(10px) scale(0.99)',
                    boxShadow: on
                      ? '0 1px 2px rgba(12,12,14,.06), 0 24px 48px -20px rgba(12,12,14,.22)'
                      : 'none',
                    transition:
                      'opacity .45s cubic-bezier(.32,.72,0,1), transform .45s cubic-bezier(.32,.72,0,1)',
                    '@media (prefers-reduced-motion: reduce)': { transition: 'opacity .01ms' },
                  }}
                >
                  <Artifact turn={turn} fill />
                </Box>
              );
            })}
          </Box>

          {/* Where you are in the thread. */}
          <Box sx={{ display: 'flex', gap: '6px', mt: '18px' }}>
            {thread.turns.map((turn, i) => (
              <Box
                key={turn.ask}
                sx={{
                  height: '2px',
                  flex: 1,
                  borderRadius: '1px',
                  backgroundColor: i === active ? T.brand : T.line2,
                  transition: 'background-color .4s ease',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* What the thread was for. The one other place orange appears. */}
      <Box
        sx={{
          mt: { xs: '30px', md: '34px' },
          ml: { xs: '22px', md: '38px' },
          display: 'flex',
          alignItems: 'baseline',
          gap: { xs: '10px', md: '16px' },
          flexWrap: 'wrap',
          pt: '20px',
          borderTop: `1px solid ${T.line}`,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: T.brand, alignSelf: 'center' }}
        />
        <Typography sx={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.02em', color: T.fg }}>
          {thread.result}
        </Typography>
        <Typography sx={{ fontSize: '14.5px', color: T.fg2 }}>{thread.resultNote}</Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* The hero's one moving part                                          */
/* ------------------------------------------------------------------ */

/* One prompt, and the modality under it changing by itself. The page's whole
   argument in a single object, so the hero does not need a row of statistics
   to say something. Holds still if the reader asked for less motion. */
function ModeCycle() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (quiet.matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % MODES.length), 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <Box sx={{ ...TRAY, backgroundColor: T.bg, p: { xs: '18px', md: '24px' }, maxWidth: '620px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: { xs: '14px', md: '18px' },
          py: { xs: '13px', md: '15px' },
          borderRadius: '12px',
          border: `1px solid ${T.line}`,
          backgroundColor: T.surface,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '14px', md: '15.5px' },
            color: T.fg2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Keep going from the last answer
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            ml: 'auto',
            width: '2px',
            height: '17px',
            flexShrink: 0,
            backgroundColor: T.brand,
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'docsCaret 1.1s steps(1) infinite',
            },
            '@keyframes docsCaret': { '0%, 50%': { opacity: 1 }, '50.01%, 100%': { opacity: 0 } },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '14px', flexWrap: 'wrap' }}>
        {MODES.map((m, n) => {
          const on = n === i;
          return (
            <Box
              key={m}
              sx={{
                px: '11px',
                py: '6px',
                borderRadius: '999px',
                fontFamily: T.mono,
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all .34s cubic-bezier(.32,.72,0,1)',
                border: `1px solid ${on ? T.brandLine : T.line}`,
                backgroundColor: on ? T.brandSoft : 'transparent',
                color: on ? T.brand : T.fg3,
              }}
            >
              {m}
            </Box>
          );
        })}
        <Typography sx={{ ml: '6px', fontSize: '13px', color: T.fg3 }}>one thread</Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  /* clip, not hidden, on the wrapper below. Setting one axis to hidden
     resolves the other to auto, which makes the element a scroll container,
     and the stack in the examples then pins to that box rather than to the
     viewport, so it never appears to pin at all. clip stops the sideways
     scroll without becoming a scroll container. */
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: T.bg, position: 'relative', overflowX: 'clip' }}>
      <Head>
        <title>What You Can Build With Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Make a film in one thread, build on one API key across 200+ models, or put sensitive documents through AI that keeps nothing."
        />
      </Head>

      <PageHeader />

      {/* ================= HERO ================= */}
      <Box sx={{ position: 'relative', pt: { xs: '48px', md: '84px' }, pb: { xs: '44px', md: '72px' } }}>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '-60px',
            width: '70%',
            height: '300px',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(closest-side, rgba(255,102,0,.14), transparent)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
        <Wrap sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 0.95fr' },
              gap: { xs: '40px', lg: '56px' },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Eyebrow accent>Private and uncensored</Eyebrow>
              <Typography
                component="h1"
                sx={{
                  fontSize: 'clamp(40px, 6.2vw, 80px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.05em',
                  fontWeight: 600,
                  color: T.fg,
                  mt: '22px',
                  mb: '24px',
                  maxWidth: '15ch',
                  textWrap: 'balance',
                }}
              >
                The model changes. The thread does not.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '17px', md: '19px' },
                  lineHeight: 1.5,
                  color: T.fg2,
                  maxWidth: '50ch',
                  mb: '30px',
                  textWrap: 'pretty',
                }}
              >
                Write a script, draw the shot, move it, score it, and ship the API behind it. Same
                conversation, 200+ models, $20 a month, no account and nothing kept.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Button href={APP} primary>
                  Open the chat
                  <Box component="span" aria-hidden="true">→</Box>
                </Button>
                <Button href="#uses">See what people build</Button>
              </Box>
            </Reveal>

            <Reveal delay={140}>
              <ModeCycle />
            </Reveal>
          </Box>
        </Wrap>
      </Box>

      {/* ================= THE THREADS ================= */}
      <Section id="uses">
        <Header
          eyebrow="What you can build"
          title="Start anywhere. Finish in the same thread."
          lede="Scroll through any of these and watch one panel fill in. They are single conversations read top to bottom, and the only thing changing is which model answers."
        />
        <Flow />
        {THREADS.map((thread) => (
          <Thread key={thread.tag} thread={thread} />
        ))}

        {/* These are examples, not a menu. Saying so out loud, because three
            worked examples in a row can read as the whole of what the thing
            does. */}
        <Reveal>
          <Box
            sx={{
              mt: { xs: '48px', md: '90px' },
              pt: { xs: '30px', md: '40px' },
              borderTop: `1px solid ${T.line}`,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
              gap: { xs: '28px', md: '56px' },
              alignItems: { xs: 'start', md: 'center' },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '24px', md: '32px' },
                  lineHeight: 1.12,
                  letterSpacing: '-0.032em',
                  fontWeight: 600,
                  color: T.fg,
                  maxWidth: '18ch',
                  mb: '16px',
                  textWrap: 'balance',
                }}
              >
                None of that is a mode or a template.
              </Typography>
              <Typography sx={{ fontSize: '15.5px', lineHeight: 1.6, color: T.fg2, maxWidth: '40ch' }}>
                It is one message box, and the thread does not care what you put in it.
              </Typography>
            </Box>

            {/* The thread carrying on, fading out rather than ending. */}
            <Box
              sx={{
                position: 'relative',
                pl: { xs: '22px', md: '26px' },
                maskImage: 'linear-gradient(to bottom, #000 52%, transparent 96%)',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 52%, transparent 96%)',
              }}
            >
              <Box
                aria-hidden="true"
                sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', backgroundColor: T.line2 }}
              />
              {OPEN_ENDED.map(([mode, ask]) => (
                <Box key={ask} sx={{ position: 'relative', py: { xs: '11px', md: '13px' } }}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      left: { xs: '-25px', md: '-29px' },
                      top: { xs: '17px', md: '19px' },
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      border: `1px solid ${T.line2}`,
                      backgroundColor: T.bg,
                    }}
                  />
                  <Mono sx={{ color: T.brand, fontSize: '9.5px', letterSpacing: '0.12em' }}>{mode}</Mono>
                  <Typography
                    sx={{
                      mt: '5px',
                      fontSize: { xs: '15.5px', md: '17px' },
                      lineHeight: 1.4,
                      letterSpacing: '-0.015em',
                      color: T.fg,
                      textWrap: 'pretty',
                    }}
                  >
                    {ask}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ================= COMPARISON ================= */}
      <Section id="why" sx={{ backgroundColor: T.surface }}>
        <Header
          eyebrow="The comparison"
          title="The same work, counted honestly."
          lede="Against the four subscriptions it takes to do the film above anywhere else."
        />
        <Reveal>
          <Box
            sx={{
              border: `1px solid ${T.line}`,
              borderRadius: T.r,
              overflow: 'hidden',
              backgroundColor: T.bg,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1.1fr 1fr', md: '1.4fr 1fr 1fr' },
                px: { xs: '16px', md: '24px' },
                py: '14px',
                borderBottom: `1px solid ${T.line}`,
                backgroundColor: T.surface2,
              }}
            >
              <Mono sx={{ display: { xs: 'none', md: 'block' } }}>{' '}</Mono>
              <Mono>Four separate tools</Mono>
              <Mono sx={{ color: T.brand }}>Hey Open</Mono>
            </Box>
            {COMPARE.map(([k, a, b], i) => (
              <Box
                key={k}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1.1fr 1fr', md: '1.4fr 1fr 1fr' },
                  gap: { xs: '4px', md: '16px' },
                  px: { xs: '16px', md: '24px' },
                  py: { xs: '14px', md: '16px' },
                  borderTop: i === 0 ? 'none' : `1px solid ${T.line}`,
                  alignItems: 'baseline',
                }}
              >
                <Typography
                  sx={{
                    gridColumn: { xs: '1 / -1', md: 'auto' },
                    fontSize: { xs: '13px', md: '14.5px' },
                    fontWeight: { xs: 600, md: 500 },
                    color: { xs: T.fg, md: T.fg2 },
                    mb: { xs: '6px', md: 0 },
                  }}
                >
                  {k}
                </Typography>
                <Typography sx={{ fontSize: { xs: '13.5px', md: '14.5px' }, color: T.fg3 }}>{a}</Typography>
                <Typography
                  sx={{ fontSize: { xs: '13.5px', md: '14.5px' }, fontWeight: 600, color: T.fg }}
                >
                  {b}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Section>

      {/* ================= CLOSE ================= */}
      <Section>
        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
              gap: { xs: '28px', md: '56px' },
              alignItems: 'end',
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
                  <Box
                    key={a1}
                    sx={{
                      py: '14px',
                      pl: i === 0 ? 0 : '18px',
                      borderLeft: i === 0 ? 'none' : `1px solid ${T.line}`,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '19px', fontWeight: 600, letterSpacing: '-0.03em', color: T.fg, lineHeight: 1.1 }}
                    >
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
