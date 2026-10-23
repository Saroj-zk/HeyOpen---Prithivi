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

const CHAPTERS = [
  { id: 'uses', label: 'What you can build' },
  { id: 'why', label: 'The comparison' },
  { id: 'private', label: 'Private, uncensored' },
  { id: 'models', label: 'The picker' },
];

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

/* The three threads.
 *
 * Every artifact below is the real asset it claims to be, and the asks are
 * written to the assets rather than the other way round. The ridge still and
 * the battle footage are two shots of one scene, which is what the script
 * describes, so nothing here promises a shot the page cannot show. */
const THREADS = [
  {
    n: '01',
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
    n: '02',
    tag: 'Building on it',
    title: 'An app on every model at once.',
    body:
      'An OpenAI compatible endpoint. Change the base URL and the integration you already wrote reaches the whole catalogue.',
    turns: [
      {
        mode: 'Shell',
        ask: 'Give me a key.',
        note: 'One key reaches every model. There is no second integration later.',
        kind: 'code',
        lines: [{ t: '$ openledger keys create' }, { t: 'sk-ol-7f2c...9a41', hot: true }],
      },
      {
        mode: 'Code',
        ask: 'Point my client at it.',
        note: 'One line changes. The rest of your code does not know anything happened.',
        kind: 'code',
        lines: [{ t: 'new OpenAI({' }, { t: '  baseURL: ".../v1"', hot: true }, { t: '})' }],
      },
      {
        mode: 'Code',
        ask: 'Stop cheap requests hitting expensive models.',
        note: 'Set auto and each request is routed on what it actually needs.',
        kind: 'code',
        lines: [{ t: 'model: "auto"', hot: true }, { t: 'messages: [...]' }],
      },
      {
        mode: 'Response',
        ask: 'What did that cost?',
        note: 'Every response says which model served it and what it came to.',
        kind: 'code',
        lines: [
          { t: '200 OK', hot: true },
          { t: 'served_by: claude-opus-5' },
          { t: 'cost: $0.0021' },
        ],
      },
    ],
    result: 'One integration, every model.',
    resultNote: 'Adding a model later is a string change, not a sprint.',
  },
  {
    n: '03',
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

const ART = {
  position: 'relative',
  borderRadius: T.r,
  border: `1px solid ${T.line}`,
  overflow: 'hidden',
  aspectRatio: '16 / 9',
  minHeight: '160px',
};

/* A row of ruled lines standing in for body text on a page. Widths are fixed
   rather than random so the server and the client draw the same page. */
const RULES = [96, 88, 92, 74, 90, 84, 60];

function Artifact({ turn }) {
  if (turn.kind === 'image') {
    return (
      <Box sx={{ ...ART, backgroundColor: T.surface2 }}>
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
      <Box sx={{ ...ART, backgroundColor: T.ink }}>
        <Clip src={turn.video} from={turn.from || 0} />
      </Box>
    );
  }

  if (turn.kind === 'script') {
    return (
      <Box
        sx={{
          ...ART,
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
          ...ART,
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
          ...ART,
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

  if (turn.kind === 'picker' || turn.kind === 'receipt') {
    return (
      <Box
        sx={{
          ...ART,
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
        ...ART,
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

/* One turn: the ask and what came back, side by side, hung off the spine. */
function Turn({ turn, last }) {
  return (
    <Box
      sx={{
        position: 'relative',
        pl: { xs: '22px', md: '38px' },
        pb: last ? 0 : { xs: '34px', md: '40px' },
      }}
    >
      {/* The spine. Each turn draws its own full height run so the segments
          meet, which is the whole point: the thread does not break between
          turns. The last one stops at its node rather than trailing off. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '1px',
          backgroundColor: T.line2,
          ...(last
            ? { height: { xs: '10px', md: 'calc(50% - 24px)' } }
            : { bottom: 0 }),
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '-3px',
          top: { xs: '6px', md: '50%' },
          mt: { md: '-24px' },
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          border: `1px solid ${T.line2}`,
          backgroundColor: T.bg,
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
          gap: { xs: '16px', md: '36px' },
          alignItems: { xs: 'start', md: 'center' },
        }}
      >
        <Box>
          <Mono sx={{ color: T.brand, letterSpacing: '0.12em' }}>{turn.mode}</Mono>
          <Typography
            sx={{
              mt: '12px',
              mb: '12px',
              fontSize: { xs: '17px', md: '19px' },
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              color: T.fg,
              textWrap: 'pretty',
            }}
          >
            {turn.ask}
          </Typography>
          <Typography sx={{ fontSize: '14px', lineHeight: 1.6, color: T.fg3, maxWidth: '44ch' }}>
            {turn.note}
          </Typography>
        </Box>

        <Artifact turn={turn} />
      </Box>
    </Box>
  );
}

function Thread({ thread }) {
  return (
    <Reveal>
      <Box sx={{ pt: { xs: '44px', md: '72px' } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
            gap: { xs: '14px', md: '36px' },
            alignItems: 'end',
            mb: { xs: '28px', md: '38px' },
            pl: { xs: '22px', md: '38px' },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '14px' }}>
              <Mono sx={{ color: T.brand, fontSize: '11.5px' }}>{thread.n}</Mono>
              <Box sx={{ width: '14px', height: '1px', backgroundColor: T.line2 }} />
              <Mono>{thread.tag}</Mono>
            </Box>
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

        {thread.turns.map((turn, i) => (
          <Turn key={turn.ask} turn={turn} last={i === thread.turns.length - 1} />
        ))}

        {/* What the thread was for. The one other place orange appears. */}
        <Box
          sx={{
            mt: { xs: '26px', md: '32px' },
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
    </Reveal>
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

function Rail({ active }) {
  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'fixed',
        left: '24px',
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
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              '&:hover .lbl': { opacity: 1 },
            }}
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
            <Box
              sx={{
                width: on ? '18px' : '8px',
                height: '1px',
                backgroundColor: on ? T.brand : T.line2,
                transition: 'all .2s ease',
              }}
            />
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
        <title>What You Can Build With Hey Open | Hey Open</title>
        <meta
          name="description"
          content="Make a film in one thread, build on one API key across 200+ models, or put sensitive documents through AI that keeps nothing."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

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
          title="Three jobs, one subscription."
          lede="Each of these is one conversation read top to bottom. The chip on the left is the model answering that turn, and it is the only thing that changes."
        />
        {THREADS.map((thread) => (
          <Thread key={thread.n} thread={thread} />
        ))}
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

      {/* ================= PRIVATE ================= */}
      <Section id="private">
        <Header
          eyebrow="Private and uncensored"
          title="The two things we will not trade away."
          lede="Most of this industry treats both as features to switch on later. They are the reason this exists."
        />
        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' },
              gap: { xs: '32px', md: '56px' },
              alignItems: 'start',
            }}
          >
            <Box>
              {PRIVACY.map(([t, d], i) => (
                <Box
                  key={t}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '16px',
                    py: '18px',
                    borderTop: i === 0 ? 'none' : `1px solid ${T.line}`,
                  }}
                >
                  <Mono sx={{ color: T.brand, pt: '3px' }}>{String(i + 1).padStart(2, '0')}</Mono>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '17px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: T.fg,
                        mb: '6px',
                      }}
                    >
                      {t}
                    </Typography>
                    <Typography sx={{ fontSize: '14.5px', lineHeight: 1.6, color: T.fg2 }}>{d}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                borderRadius: T.r,
                backgroundColor: T.ink,
                p: { xs: '22px', md: '28px' },
              }}
            >
              <Mono sx={{ color: 'rgba(255,255,255,.4)' }}>Uncensored means</Mono>
              <Typography
                sx={{
                  mt: '16px',
                  fontSize: { xs: '17px', md: '19px' },
                  lineHeight: 1.5,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  textWrap: 'pretty',
                }}
              >
                A screenplay about addiction. A security write up with working exploit code. A
                medical question you would rather not have attached to your name.
              </Typography>
              <Typography
                sx={{ mt: '16px', fontSize: '14.5px', lineHeight: 1.6, color: 'rgba(255,255,255,.58)' }}
              >
                Mainstream assistants refuse all three, and none of them are unreasonable to ask.
                Models marked uncensored refuse less. That describes the model, not permission: the
                acceptable use terms apply on every model here, and what is illegal stays illegal.
              </Typography>
            </Box>
          </Box>
        </Reveal>
      </Section>

      {/* ================= THE PICKER ================= */}
      <Section id="models" sx={{ backgroundColor: T.surface }}>
        <Header
          eyebrow="The picker"
          title="One control. Everything behind it."
          lede="Click the model name under the message box. Switching never leaves your conversation."
        />
        <Reveal>
          <Box sx={{ ...TRAY, overflow: 'hidden', mb: { xs: '36px', md: '52px' }, backgroundColor: T.bg }}>
            <ProductWindow />
          </Box>
        </Reveal>

        <Reveal delay={100}>
          <Box sx={{ border: `1px solid ${T.line}`, borderRadius: T.r, backgroundColor: T.bg, overflow: 'hidden' }}>
            {PICK.map(([when, pick, why], i) => (
              <Box
                key={when}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1.5fr' },
                  gap: { xs: '4px', md: '20px' },
                  px: { xs: '16px', md: '24px' },
                  py: { xs: '16px', md: '18px' },
                  borderTop: i === 0 ? 'none' : `1px solid ${T.line}`,
                  alignItems: 'baseline',
                }}
              >
                <Typography sx={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.015em', color: T.fg }}>
                  {when}
                </Typography>
                <Typography sx={{ fontSize: '14.5px', fontWeight: 600, color: T.brand }}>{pick}</Typography>
                <Typography sx={{ fontSize: '14px', lineHeight: 1.55, color: T.fg2 }}>{why}</Typography>
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
