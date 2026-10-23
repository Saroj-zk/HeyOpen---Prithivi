import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* The app itself, measured off ais.openledger.xyz in dark mode, and then run:
   the picker opens out of the composer, the list scrolls under a cursor that
   stays put, and the card beside it keeps up with whatever row it lands on.

   Values here are the app's own rather than the site's tokens, because the
   point is that this reads as the product and not as the page around it. */
const APP = 'https://ais.openledger.xyz/chat';

const D = {
  page: '#09090B',
  panel: '#18181B',
  panelHi: '#1C1C1F',
  line: '#27272A',
  lineHi: '#3F3F46',
  ink: '#DCDCDC',
  inkMuted: '#A1A1AA',
};

/* The capability pills keep their light colours in dark mode. Only the sign in
   pill inverts, which is worth copying rather than tidying up. */
const PILL = {
  incognito: { bg: '#F3E8FF', bd: '#DDD6FE', fg: '#7C3AED' },
  tee: { bg: '#D1FAE5', bd: '#A7F3D0', fg: '#059669' },
  plain: { bg: '#E2E8F0', bd: '#CBD5E1', fg: '#475569' },
  signin: { bg: '#09090B', bd: '#27272A', fg: '#A1A1AA' },
};

const ROWS = [
  { code: 'OA', name: 'GPT 3.5 Turbo', ctx: '16K', cost: '$0.0005 – $0.0015', pills: [['Incognito', 'incognito']] },
  { code: 'AN', name: 'Claude Fable 5', ctx: '200K', cost: '$0.0008 – $0.0040', pills: [['Incognito', 'incognito']] },
  { code: 'AN', name: 'Claude Haiku 4.5', ctx: '200K', cost: '$0.0008 – $0.0040', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'AN', name: 'Claude Opus 5', ctx: '200K', cost: '$0.0150 – $0.0750', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'AN', name: 'Claude Sonnet 5', ctx: '200K', cost: '$0.0030 – $0.0150', pills: [['Incognito', 'incognito']] },
  { code: 'MS', name: 'Codestral 2508', ctx: '256K', cost: '$0.0003 – $0.0009', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek R1 0528', ctx: '164K', cost: '$0.0005 – $0.0022', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek V4 Flash', ctx: '128K', cost: '$0.0002 – $0.0008', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek V4 Flash E2ee', ctx: '128K', cost: '$0.0002 – $0.0008', pills: [['E2EE', 'plain'], ['TEE', 'tee']] },
  { code: 'DS', name: 'Deepseek V4 Pro', ctx: '164K', cost: '$0.0006 – $0.0025', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'GG', name: 'Gemini 2.5 Flash', ctx: '1M', cost: '$0.0003 – $0.0025', pills: [['Incognito', 'incognito'], ['vision', 'plain']] },
  { code: 'GG', name: 'Gemini 2.5 Pro', ctx: '1M', cost: '$0.0012 – $0.0100', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'MT', name: 'Llama 4 Maverick', ctx: '1M', cost: '$0.0002 – $0.0006', pills: [['Incognito', 'incognito'], ['uncensored', 'plain']] },
  { code: 'MS', name: 'Mistral Large 3', ctx: '128K', cost: '$0.0020 – $0.0060', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'QW', name: 'Qwen3 Max', ctx: '256K', cost: '$0.0012 – $0.0060', pills: [['Incognito', 'incognito'], ['vision', 'plain']] },
  { code: 'XA', name: 'Grok 4', ctx: '256K', cost: '$0.0030 – $0.0150', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
];

const CHIPS = ['Weather', 'Code', 'Write', 'Analyze', 'Brainstorm'];

/* One clock. Every piece of the sequence is read off `t` rather than chained
   off timers, so nothing drifts out of step over a long visit. */
const ROW_H = 44;
const LIST_H = 264;
const MAX_SCROLL = ROWS.length * ROW_H - LIST_H;
/* Where the cursor rests inside the list. The list moves under it, so the row
   it is pointing at changes on its own. */
const CURSOR_Y = 112;

const T = {
  open: 1100,
  openSpan: 320,
  scrollStart: 2100,
  scrollSpan: 7600,
  cardIn: 2700,
  close: 10600,
  closeSpan: 300,
  loop: 12400,
};

const easeOut = (x) => 1 - Math.pow(1 - x, 3);
/* The list starts and stops gently but holds a readable pace in between.
   A plain ease out spends most of the run already at the bottom. */
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

const Pill = ({ label, tone }) => {
  const t = PILL[tone] || PILL.plain;
  return (
    <Box sx={{ px: '7px', py: '1px', borderRadius: '9999px', backgroundColor: t.bg, border: `1px solid ${t.bd}`, flexShrink: 0 }}>
      <Typography sx={{ fontSize: 9.5, fontWeight: 600, lineHeight: 1.15, color: t.fg, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
};

const Star = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const RailIcon = ({ d, circle = false }) => (
  <Box sx={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: circle ? `1px solid ${D.line}` : 'none', flexShrink: 0 }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  </Box>
);

export default function ProductWindow() {
  const ref = React.useRef(null);
  const [live, setLive] = React.useState(false);
  const [still, setStill] = React.useState(false);

  /* Everything that moves every frame is written straight to these nodes. A
     state update per frame means React reconciles the whole window sixty times
     a second, and the list judders under it. */
  const listRef = React.useRef(null);
  const pickerRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const headRef = React.useRef(null);
  const chipsRef = React.useRef(null);

  /* Only the two things that change in steps go through state. */
  const [cursorRow, setCursorRow] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!live || still) return undefined;

    const started = performance.now();
    let frame = 0;
    let lastRow = -1;
    let lastOpen = null;

    const tick = (now) => {
      const t = (now - started) % T.loop;

      /* Picker: out of the composer on the way in, back into it on the way out. */
      const shown = easeOut(clamp01((t - T.open) / T.openSpan)) *
        (1 - easeOut(clamp01((t - T.close) / T.closeSpan)));
      const scrolled = easeInOut(clamp01((t - T.scrollStart) / T.scrollSpan)) * MAX_SCROLL;
      const cardShown = clamp01((t - T.cardIn) / 260) *
        (1 - easeOut(clamp01((t - T.close) / T.closeSpan)));
      const row = Math.min(ROWS.length - 1, Math.floor((scrolled + CURSOR_Y) / ROW_H));

      if (listRef.current) {
        listRef.current.style.transform = `translate3d(0, ${-scrolled}px, 0)`;
      }
      if (pickerRef.current) {
        pickerRef.current.style.opacity = shown;
        pickerRef.current.style.transform =
          `translateX(-50%) translateY(${(1 - shown) * 16}px) scale(${0.97 + shown * 0.03})`;
      }
      if (cardRef.current) cardRef.current.style.opacity = cardShown;
      const dim = 1 - shown * 0.82;
      if (headRef.current) headRef.current.style.opacity = dim;
      if (chipsRef.current) chipsRef.current.style.opacity = dim;

      /* These two change in steps, so they are worth a render. */
      if (row !== lastRow) { lastRow = row; setCursorRow(row); }
      const isOpen = shown > 0.5;
      if (isOpen !== lastOpen) { lastOpen = isOpen; setOpen(isOpen); }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live, still]);

  const active = ROWS[cursorRow];

  return (
    <Box
      ref={ref}
      component="a"
      href={APP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hey Open and pick a model"
      sx={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: { xs: '18px', md: '24px' },
        overflow: 'hidden',
        border: `1px solid ${D.line}`,
        backgroundColor: D.page,
        boxShadow: '0 30px 70px -24px rgba(15, 23, 42, 0.45)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 40px 90px -24px rgba(15, 23, 42, 0.55)' },
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', minHeight: { xs: 420, sm: 520, md: 620 } }}>
        {/* Rail */}
        <Box sx={{ width: { xs: 44, md: 64 }, flexShrink: 0, borderRight: `1px solid ${D.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.1, py: 2 }}>
          <RailIcon circle d={<><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /></>} />
          <RailIcon circle d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>} />
          <RailIcon circle d={<><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} />
          {[
            <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 20h10" /></>,
            <><path d="M12 3v18" /><path d="M5 8l-2 6h4z" /><path d="M19 8l-2 6h4z" /></>,
            <><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /></>,
            <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" /></>,
            <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12h8" /></>,
          ].map((d, i) => <RailIcon key={i} d={d} />)}
          <Box sx={{ width: 22, height: '1px', backgroundColor: D.line, my: 0.6 }} />
          {[
            <><path d="M3 21V8l6-4 6 4v13" /><path d="M9 21v-5h3v5" /></>,
            <><path d="M5 19l5-9 4 4 5-9" /><circle cx="19" cy="5" r="2" /></>,
            <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
            <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
          ].map((d, i) => <RailIcon key={`b${i}`} d={d} />)}
        </Box>

        {/* Canvas */}
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: { xs: 1.2, md: 1.8 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.7, px: 1.4, py: 0.7, borderRadius: '9999px', backgroundColor: D.panel, border: `1px solid ${D.line}` }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="13" rx="2" /><path d="M16 12h2" />
              </svg>
              <Typography sx={{ fontSize: { xs: 10, md: 11.5 }, color: D.ink, whiteSpace: 'nowrap' }}>Connect wallet</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: { xs: 2, md: 4 }, pb: { xs: 3, md: 5 } }}>
            {/* The headline steps back while the picker is up, as it does in
                the app, rather than showing through it. */}
            <Box ref={headRef} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.6rem' }, lineHeight: 1.18, color: D.ink, textAlign: 'center' }}>
                Hey Open
              </Typography>
              <Typography sx={{ mt: { xs: 1.2, md: 1.8 }, fontSize: { xs: 11, md: 13.5 }, lineHeight: 1.6, color: D.inkMuted, textAlign: 'center', maxWidth: 360 }}>
                A private, multi-model AI experience with no account required to start.
              </Typography>
            </Box>

            {/* Composer */}
            <Box sx={{ width: '100%', maxWidth: 560, mt: { xs: 2.2, md: 3.2 }, backgroundColor: D.panel, border: `1px solid ${D.line}`, borderRadius: '20px', px: { xs: 1.6, md: 2 }, py: { xs: 1.3, md: 1.6 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Typography sx={{ flex: 1, fontSize: { xs: 11.5, md: 13.5 }, color: D.inkMuted }}>
                  Send a message…  (@ to mention, / for commands)
                </Typography>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 2, md: 2.6 } }}>
                {/* The chip the picker belongs to, lit while it is up. */}
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 0.8, py: 0.4, ml: -0.8, borderRadius: '14px', backgroundColor: open ? D.line : 'transparent', transition: 'background-color 0.2s ease' }}>
                  <BrandTile code="OA" size={16} round />
                  <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.ink, whiteSpace: 'nowrap' }}>GPT 3.5 Turbo</Typography>
                  <Box sx={{ display: 'flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }} />
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
                <Box sx={{ width: { xs: 26, md: 30 }, height: { xs: 26, md: 30 }, borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.page} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </Box>
              </Box>
            </Box>

            <Box ref={chipsRef} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.9, mt: { xs: 1.6, md: 2.2 } }}>
              {CHIPS.map((c) => (
                <Box key={c} sx={{ px: { xs: 1.2, md: 1.75 }, py: { xs: 0.5, md: 0.8 }, borderRadius: '9999px', backgroundColor: D.panel, border: `1px solid ${D.line}` }}>
                  <Typography sx={{ fontSize: { xs: 10, md: 12 }, color: D.ink, whiteSpace: 'nowrap' }}>{c}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* The picker, lifting out of the composer. Held back on small
              screens, where it would bury the window it is sitting in. */}
          <Box
            ref={pickerRef}
            aria-hidden="true"
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              bottom: 86,
              left: '50%',
              width: 400,
              backgroundColor: D.panel,
              border: `1px solid ${D.line}`,
              borderRadius: '22px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              p: 1.5,
              transformOrigin: 'bottom center',
              /* Resting state. The loop takes over from here. */
              opacity: 0,
              transform: 'translateX(-50%) translateY(16px) scale(0.97)',
              pointerEvents: 'none',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ flex: 1, minWidth: 0, height: 28, display: 'flex', alignItems: 'center', gap: 0.8, px: 1.2, borderRadius: '9999px', backgroundColor: D.line, border: `1px solid ${D.lineHi}` }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <Typography sx={{ fontSize: 11.5, color: D.inkMuted }}>Search models…</Typography>
              </Box>
              <Box sx={{ width: 28, height: 28, flexShrink: 0, borderRadius: '50%', border: `1px solid ${D.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star />
              </Box>
              <Box sx={{ height: 28, flexShrink: 0, px: 1.1, borderRadius: '9999px', backgroundColor: D.line, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 11, color: D.inkMuted, whiteSpace: 'nowrap' }}>A–Z</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.4, mt: 1.2, mb: 0.4 }}>
              {['All', 'Text', 'Image', 'Video'].map((x) => {
                const on = x === 'Text';
                return (
                  <Box key={x} sx={{ px: 1.2, py: 0.5, borderRadius: '9999px', backgroundColor: on ? D.line : 'transparent' }}>
                    <Typography sx={{ fontSize: 11.5, fontWeight: on ? 600 : 500, color: on ? D.ink : D.inkMuted }}>{x}</Typography>
                  </Box>
                );
              })}
            </Box>

            {/* The list, moving under a cursor that does not. */}
            <Box sx={{ position: 'relative', height: LIST_H, overflow: 'hidden' }}>
              <Box ref={listRef} sx={{ transform: 'translate3d(0, 0, 0)' }}>
                {ROWS.map((m, i) => (
                  <Box
                    key={m.name}
                    sx={{
                      height: ROW_H,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1,
                      borderRadius: '14px',
                      backgroundColor: i === cursorRow ? D.panelHi : 'transparent',
                      border: `1px solid ${i === cursorRow ? D.lineHi : 'transparent'}`,
                      boxSizing: 'border-box',
                    }}
                  >
                    <BrandTile code={m.code} size={14} round />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: D.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </Typography>
                        {i === 0 && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={D.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </Box>
                      {i !== 0 && (
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.35, mt: 0.3, px: '7px', py: '1px', borderRadius: '9999px', backgroundColor: PILL.signin.bg, border: `1px solid ${PILL.signin.bd}` }}>
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={PILL.signin.fg} strokeWidth="2.6" strokeLinecap="round">
                            <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                          </svg>
                          <Typography sx={{ fontSize: 9, fontWeight: 600, lineHeight: 1.1, color: PILL.signin.fg }}>Sign in</Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: { md: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                      {m.pills.map(([label, tone]) => <Pill key={label} label={label} tone={tone} />)}
                    </Box>
                    <Star />
                  </Box>
                ))}
              </Box>
              <Box sx={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, background: `linear-gradient(to bottom, ${D.panel}, rgba(24,24,27,0))`, pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 28, background: `linear-gradient(to bottom, rgba(24,24,27,0), ${D.panel})`, pointerEvents: 'none' }} />
            </Box>

            {/* The second popup: whatever the cursor is resting on. */}
            <Box
              ref={cardRef}
              sx={{
                display: { md: 'none', lg: 'block' },
                position: 'absolute',
                left: '100%',
                ml: 1.5,
                top: 150,
                width: 232,
                backgroundColor: D.panel,
                border: `1px solid ${D.line}`,
                borderRadius: '18px',
                p: 1.4,
                boxShadow: '0 18px 40px -16px rgba(0, 0, 0, 0.6)',
                willChange: 'opacity',
                opacity: 0,
                pointerEvents: 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
                <BrandTile code={active.code} size={16} round />
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: D.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {active.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.9 }}>
                {active.pills.map(([label, tone]) => <Pill key={label} label={label} tone={tone} />)}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 1.5, mt: 1.2, pt: 1, borderTop: `1px solid ${D.line}` }}>
                <Box>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: D.ink }}>{active.ctx}</Typography>
                  <Typography sx={{ fontSize: 9.5, color: D.inkMuted }}>Context</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: D.ink, whiteSpace: 'nowrap' }}>{active.cost}</Typography>
                  <Typography sx={{ fontSize: 9.5, color: D.inkMuted }}>Est. cost/1k tokens</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
