import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* Light theme values from ais.openledger.xyz. These panels stand in for the
   screen recordings, so they follow the app rather than the marketing page. */
const C = {
  font: '"Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif',
  page: '#F5F4F0',
  surface: '#FFFFFF',
  chip: '#F1F1EF',
  border: '#DDDEE0',
  borderSoft: '#EAE9E6',
  text: '#262626',
  textSecondary: '#6D6C6A',
  muted: '#71717A',
  onInverse: '#F5F4F0',
  sendIdle: '#D8D7D3',
  violetBg: '#F1EDFC',
  violetFg: '#7C5CD6',
  greenBg: '#D8F3E3',
  greenFg: '#2F7D5B',
  toggleOff: '#E2E1DE',
};

/* Enough of the catalogue that scrolling it reads as a catalogue. Names and
   badges follow the list in the recording. */
const PICKER_ROWS = [
  { code: 'AN', name: 'Claude Opus 5', tags: ['Incognito', 'web'], ctx: '1M', cost: '$0.005 \u2013 $0.025' },
  { code: 'AN', name: 'Claude Sonnet 5', tags: ['Incognito'], ctx: '1M', cost: '$0.003 \u2013 $0.015' },
  { code: 'AN', name: 'Claude Haiku 4.5', tags: ['Incognito', 'web'], ctx: '200K', cost: '$0.001 \u2013 $0.005' },
  { code: 'MS', name: 'Codestral 2508', tags: ['Incognito', 'web'], ctx: '256K', cost: '$0.0003 \u2013 $0.0009' },
  { code: 'DS', name: 'Deepseek R1 0528', tags: ['Incognito', 'web'], ctx: '164K', cost: '$0.0005 \u2013 $0.0021' },
  { code: 'DS', name: 'Deepseek V4 Flash', tags: ['Incognito', 'web'], ctx: '128K', cost: '$0.0002 \u2013 $0.0008' },
  { code: 'DS', name: 'Deepseek V4 Flash E2ee', tags: ['E2EE', 'TEE'], ctx: '128K', cost: '$0.0004 \u2013 $0.0012' },
  { code: 'DS', name: 'Deepseek V4 Pro', tags: ['Incognito', 'web'], ctx: '256K', cost: '$0.0009 \u2013 $0.0036' },
  { code: 'OA', name: 'Fugu Ultra', tags: ['Incognito', 'web'], ctx: '400K', cost: '$0.004 \u2013 $0.016' },
  { code: 'GG', name: 'Gemini 2.5 Pro', tags: ['Incognito', 'web'], ctx: '1M', cost: '$0.0012 \u2013 $0.0050' },
  { code: 'GG', name: 'Gemini 3.5 Flash Lite', tags: ['Incognito', 'web'], ctx: '1M', cost: '$0.0001 \u2013 $0.0004' },
  { code: 'GG', name: 'Gemini 3.7 Flash', tags: ['Incognito', 'web'], ctx: '1M', cost: '$0.0004 \u2013 $0.0019', pick: true },
  { code: 'GG', name: 'Gemma 4 26b Uncensored', tags: ['uncensored'], ctx: '128K', cost: '$0.0002 \u2013 $0.0006' },
  { code: 'GG', name: 'Gemma 4 31b', tags: ['Incognito', 'web'], ctx: '128K', cost: '$0.0002 \u2013 $0.0007' },
  { code: 'ZP', name: 'GLM 4.7 Flash', tags: ['Incognito', 'web'], ctx: '128K', cost: '$0.0001 \u2013 $0.0005' },
  { code: 'ZP', name: 'GLM 5.3 Flash E2ee', tags: ['E2EE', 'TEE'], ctx: '128K', cost: '$0.0003 \u2013 $0.0011' },
  { code: 'OA', name: 'GPT 5.1', tags: ['Incognito', 'web'], ctx: '400K', cost: '$0.0025 \u2013 $0.0100' },
  { code: 'OA', name: 'GPT 5.6 Luna', tags: ['Incognito'], ctx: '1M', cost: '$0.0015 \u2013 $0.0060' },
  { code: 'OA', name: 'GPT 5.6 Terra', tags: ['Incognito'], ctx: '1M', cost: '$0.002 \u2013 $0.012' },
  { code: 'XA', name: 'Grok 4 Fast', tags: ['Incognito', 'web'], ctx: '2M', cost: '$0.0002 \u2013 $0.0010' },
  { code: 'XA', name: 'Grok 4.5', tags: ['Incognito', 'web'], ctx: '256K', cost: '$0.003 \u2013 $0.015' },
  { code: 'MO', name: 'Kimi K2', tags: ['Incognito', 'web'], ctx: '256K', cost: '$0.0006 \u2013 $0.0025' },
  { code: 'MT', name: 'Llama 4 Maverick', tags: ['Incognito', 'web'], ctx: '1M', cost: '$0.0002 \u2013 $0.0009' },
  { code: 'QW', name: 'Qwen3 235B', tags: ['Incognito', 'web'], ctx: '128K', cost: '$0.0003 \u2013 $0.0012' },
];
const PICKER_TABS = ['All', 'Text', 'Image', 'Text to Video', 'Image to Video'];
const CATALOG_COUNT = '200+';

/* Memory settings, in the app's own words. */
const MEMORY_ROWS = [
  { label: 'Use memory', note: 'Let the assistant use what it knows about you in new chats.', on: true },
  { label: 'Generate memory from chats', note: 'Automatically save durable facts as you chat.', on: true },
  { label: 'Share with external models', note: 'Off by default.', on: false },
];

/* Each flow mirrors one of the recordings: Auto picking the model and
   answering, and a second model carrying the first one's context. */
const FLOWS = {
  multimodel: {
    loop: 19000,
    pickerOpen: 6200,
    pickerClose: 15000,
    pickedName: 'Gemini 3.7 Flash',
    model: { name: 'Auto', code: null },
    question: 'Convert 2,400 euros to dollars at 1.08.',
    typeStart: 300,
    typeSpan: 1700,
    send: 2300,
    thinking: 1000,
    meta: { name: 'Auto Model', secs: '2.28', steps: 'Worked for 1s · 2 steps' },
    answerStart: 3500,
    answerSpan: 1500,
    answer: [
      { t: '2,400 euros at 1.08 comes to ' },
      { t: '$2,592', b: true },
      { t: '.' },
    ],
  },
  agent: {
    loop: 15000,
    compact: true,
    header: { title: 'Financial Analyst', sub: 'Research \u00b7 Analyze \u00b7 Report' },
    model: { name: 'Auto', code: null },
    question: 'Summarize what moved the S&P 500 this week.',
    typeStart: 400,
    typeSpan: 1600,
    send: 2300,
    thinking: 600,
    meta: { name: 'Financial Analyst', secs: '6.20' },
    /* The analyst reports what happened. It does not tell anyone what to buy. */
    steps: [
      'Pulling five day index history',
      'Comparing sector performance',
      'Reading this week’ earnings reports',
    ],
    stepStart: 3100,
    stepEvery: 1200,
    answerStart: 7400,
    answerSpan: 2300,
    answer: [
      { t: 'The index finished the week ' },
      { t: 'up 1.8%', b: true },
      { t: ', led by healthcare and utilities, while semiconductors gave back most of last week’ gain. Volume stayed under the monthly average throughout.' },
    ],
  },
  memory: {
    loop: 16500,
    settingsOpen: 9200,
    settingsClose: 14200,
    model: { name: 'GPT 5.6 Sol', code: 'OA' },
    switchTo: { name: 'Claude Opus 5', code: 'AN' },
    switchAt: 1400,
    priorFrom: 'GPT 5.6 Sol',
    prior: 'Lock the beta scope by October 16, sign off on the 18th, and hold the go/no-go review on the 27th.',
    question: 'Continue the launch plan from where I left off.',
    typeStart: 2400,
    typeSpan: 1800,
    send: 4500,
    thinking: 1100,
    meta: { name: 'Claude Opus 5', secs: '3.04' },
    answerStart: 5900,
    answerSpan: 2100,
    answer: [
      { t: 'Picking up after the ' },
      { t: 'October 27', b: true },
      { t: ' review: stage the rollout on the 28th, and freeze the metric definitions first so November stays comparable.' },
    ],
  },
};

function Caret() {
  return (
    <Box component="span" sx={{ ml: '1px', animation: 'pdCaret 0.9s steps(1) infinite' }}>
      &#9611;
    </Box>
  );
}

/* Shuffle mark, which is how the app badges the Auto router. */
function AutoMark({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

function ModelMark({ code, size = 15, color }) {
  if (!code) return <AutoMark size={size} color={color} />;
  return <BrandTile code={code} size={size} round />;
}

/* Reveals a parts array one character at a time, keeping bold runs bold. */
function Streamed({ parts, n }) {
  let used = 0;
  const out = [];
  let total = 0;
  parts.forEach((p) => { total += p.t.length; });
  for (let i = 0; i < parts.length; i += 1) {
    const p = parts[i];
    const take = Math.max(0, Math.min(p.t.length, n - used));
    if (take > 0) {
      out.push(
        <Box key={i} component="span" sx={p.b ? { fontWeight: 600, color: C.text } : null}>
          {p.t.slice(0, take)}
        </Box>
      );
    }
    used += p.t.length;
  }
  return (
    <>
      {out}
      {n < total && <Caret />}
    </>
  );
}

function Tag({ label }) {
  const violet = label === 'Incognito';
  const green = label === 'TEE';
  return (
    <Box
      component="span"
      sx={{
        px: 0.7,
        py: '1px',
        borderRadius: '9999px',
        fontSize: '0.6rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        backgroundColor: violet ? C.violetBg : green ? C.greenBg : C.chip,
        color: violet ? C.violetFg : green ? C.greenFg : C.textSecondary,
      }}
    >
      {label}
    </Box>
  );
}

function Star({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.8" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Switch({ on }) {
  return (
    <Box
      sx={{
        width: 30, height: 17, flexShrink: 0, borderRadius: '9999px', p: '2.5px',
        display: 'flex', alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        backgroundColor: on ? C.text : C.toggleOff,
        transition: 'background-color 0.35s ease',
      }}
    >
      <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
    </Box>
  );
}

/* The model list, as the app opens it over the thread. */
/* One row every 708ms, which is the rate the track scrolls at, so the card
   stays with the part of the list on screen. */
const SCROLL_MS_PER_ROW = (17 * 1000) / PICKER_ROWS.length;

function PickerOverlay({ elapsed }) {
  const hovered = PICKER_ROWS[(Math.floor(elapsed / SCROLL_MS_PER_ROW) + 3) % PICKER_ROWS.length];
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: '6% 4% 12%',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: C.surface,
        boxShadow: '0 20px 48px rgba(23, 23, 23, 0.20)',
        animation: 'pdIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, px: 1.25, py: 1.1 }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.8, px: 1.1, py: 0.6, borderRadius: '9999px', backgroundColor: C.chip }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Typography sx={{ fontSize: '0.7rem', color: C.muted }}>Search models&hellip;</Typography>
        </Box>
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: C.chip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Star size={10} />
        </Box>
        <Box sx={{ px: 0.9, py: 0.5, borderRadius: '8px', backgroundColor: C.chip }}>
          <Typography sx={{ fontSize: '0.68rem', color: C.text, whiteSpace: 'nowrap' }}>A&ndash;Z</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, px: 1.25, pb: 0.9, borderBottom: `1px solid ${C.borderSoft}`, overflow: 'hidden' }}>
        {PICKER_TABS.map((tab) => {
          const on = tab === 'Text';
          return (
            <Typography
              key={tab}
              sx={{
                px: 0.85, py: 0.3, borderRadius: '9999px',
                fontSize: '0.66rem', whiteSpace: 'nowrap',
                fontWeight: on ? 600 : 400,
                color: on ? C.text : C.muted,
                backgroundColor: on ? C.chip : 'transparent',
              }}
            >
              {tab}
            </Typography>
          );
        })}
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ fontSize: '0.66rem', fontWeight: 600, color: C.muted, pr: 0.25, whiteSpace: 'nowrap' }}>
          {CATALOG_COUNT}
        </Typography>
      </Box>

      {/* The list runs on its own. The rows are rendered twice and the track
          travels exactly half its height, so the loop has no seam. */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', px: 1, py: 0.6 }}>
        <Box sx={{ animation: 'pdScroll 17s linear infinite' }}>
        {[...PICKER_ROWS, ...PICKER_ROWS].map((m, i) => (
          <Box
            key={`${m.name}-${i}`}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.9,
              px: 0.9, py: 0.75, borderRadius: '10px',
              boxShadow: m.name === hovered.name ? `inset 0 0 0 1.2px ${C.border}` : 'none',
            }}
          >
            <Box sx={{ width: 20, height: 20, flexShrink: 0, borderRadius: '50%', border: `1px solid ${C.borderSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrandTile code={m.code} size={12} round />
            </Box>
            <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.72rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {m.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.35, flexShrink: 0 }}>
              {m.tags.map((x) => <Tag key={x} label={x} />)}
            </Box>
            <Star />
          </Box>
        ))}
        </Box>
      </Box>

      {/* The hover card the app floats beside the list */}
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          width: '55%',
          p: 1.1,
          borderRadius: '12px',
          backgroundColor: C.surface,
          boxShadow: '0 10px 28px rgba(23, 23, 23, 0.18)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, mb: 0.7 }}>
          <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: `1px solid ${C.borderSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrandTile code={hovered.code} size={11} round />
          </Box>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {hovered.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.35, mb: 0.8 }}>
          {hovered.tags.map((x) => <Tag key={x} label={x} />)}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1, pt: 0.8, borderTop: `1px solid ${C.borderSoft}` }}>
          <Box>
            <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: C.text, lineHeight: 1.2 }}>{hovered.ctx}</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: C.muted }}>Context</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: C.text, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{hovered.cost}</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: C.muted }}>Est. cost/1k tokens</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* Memory settings, opened after the thread has made its point. */
function MemoryOverlay() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: '6% 4% 12%',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: C.surface,
        boxShadow: '0 20px 48px rgba(23, 23, 23, 0.20)',
        animation: 'pdIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
        px: 1.6,
        py: 1.05,
      }}
    >
      <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: C.text }}>Memory</Typography>
      <Typography sx={{ mt: 0.6, fontSize: '0.68rem', lineHeight: 1.5, color: C.textSecondary }}>
        Memory is stored only in this browser. It never syncs and is removed if you clear site data.
      </Typography>

      {MEMORY_ROWS.map((r, i) => (
        <Box
          key={r.label}
          sx={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            gap: 1.5, mt: 0.9, pt: 0.9,
            borderTop: `1px solid ${C.borderSoft}`,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: C.text }}>{r.label}</Typography>
            <Typography sx={{ mt: 0.2, fontSize: '0.64rem', lineHeight: 1.45, color: C.textSecondary }}>{r.note}</Typography>
          </Box>
          <Switch on={r.on} />
        </Box>
      ))}

      <Typography sx={{ mt: 1.1, pt: 0.9, borderTop: `1px solid ${C.borderSoft}`, fontSize: '0.74rem', fontWeight: 600, color: C.text }}>
        Saved memories{' '}
        <Box component="span" sx={{ color: C.muted, fontWeight: 400 }}>(1)</Box>
      </Typography>
      <Box sx={{ mt: 0.6, display: 'flex', flexDirection: 'column', gap: 0.45 }}>
        {['Launch target: October 28'].map((m) => (
          <Box key={m} sx={{ px: 1.1, py: 0.6, borderRadius: '9px', backgroundColor: C.chip }}>
            <Typography sx={{ fontSize: '0.68rem', color: C.text }}>{m}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function ProductDemo({ flow = 'multimodel', active = true }) {
  const F = FLOWS[flow];
  const ref = React.useRef(null);
  const [live, setLive] = React.useState(false);
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!live || !active) return undefined;
    const started = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const id = setInterval(() => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      setT((now - started) % F.loop);
    }, 45);
    return () => clearInterval(id);
  }, [live, active, F.loop]);

  const ramp = (from, span) => Math.max(0, Math.min(1, (t - from) / span));
  const typedLen = Math.round(ramp(F.typeStart, F.typeSpan) * F.question.length);
  const sent = t >= F.send;
  const thinking = sent && t < F.send + F.thinking;
  const answerTotal = F.answer.reduce((a, p) => a + p.t.length, 0);
  const answerLen = Math.round(ramp(F.answerStart, F.answerSpan) * answerTotal);
  const switched = F.switchTo ? t >= F.switchAt : false;
  const pickerOpen = F.pickerOpen ? t >= F.pickerOpen && t < F.pickerClose : false;
  const settingsOpen = F.settingsOpen ? t >= F.settingsOpen && t < F.settingsClose : false;
  const pickedAfter = F.pickedName && t >= F.pickerClose ? { name: F.pickedName, code: 'GG' } : null;
  const current = pickedAfter || (switched ? F.switchTo : F.model);

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: C.page,
        fontFamily: C.font,
        '& *': { fontFamily: 'inherit' },
      }}
    >
      {pickerOpen && <PickerOverlay elapsed={t - F.pickerOpen} />}
      {settingsOpen && <MemoryOverlay />}
      {/* Agent header, when the flow has one */}
      {F.header && (
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.1,
            px: { xs: 1.75, sm: 2.25 }, py: 1.2,
            borderBottom: `1px solid ${C.borderSoft}`,
          }}
        >
          <Box sx={{ width: 24, height: 24, flexShrink: 0, borderRadius: '8px', backgroundColor: C.chip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: C.text, lineHeight: 1.2 }}>
              {F.header.title}
            </Typography>
            <Typography sx={{ fontSize: '0.66rem', color: C.muted, lineHeight: 1.3 }}>
              {F.header.sub}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 0.9, py: 0.3, borderRadius: '9999px', backgroundColor: C.chip, flexShrink: 0 }}>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: C.greenFg }} />
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', color: C.textSecondary }}>LIVE</Typography>
          </Box>
        </Box>
      )}

      {/* Thread */}
      <Box sx={{ flex: 1, minHeight: 0, px: { xs: 1.75, sm: 2.25 }, pt: F.header ? 1.5 : { xs: 2, sm: 2.5 }, overflow: 'hidden' }}>
        {!sent && !F.prior ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: 'italic', fontWeight: 600, fontSize: { xs: '1.15rem', sm: '1.4rem' }, lineHeight: 1.2, color: C.text }}>
              Hey Open..
            </Typography>
            <Typography sx={{ mt: 1.2, fontSize: '0.76rem', lineHeight: 1.55, color: C.textSecondary }}>
              A private, multi-model AI experience
              <br />
              with no account required to start.
            </Typography>
          </Box>
        ) : (
          <>
            {/* What the first model already said, in the memory flow */}
            {F.prior && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                  <ModelMark code={F.model.code} size={14} color={C.textSecondary} />
                  <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: C.text }}>{F.priorFrom}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.6, color: C.textSecondary, opacity: 0.75 }}>
                  {F.prior}
                </Typography>
              </Box>
            )}

            {sent && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: F.compact ? 1.2 : 1.75 }}>
                  <Box sx={{ maxWidth: '82%', px: 1.6, py: F.compact ? 0.8 : 1, borderRadius: '16px', backgroundColor: C.chip }}>
                    <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.55, color: C.text }}>{F.question}</Typography>
                  </Box>
                </Box>

                {/* While the steps run, the panel header already names the
                    agent, so this line would only repeat it. */}
                {!(F.steps && answerLen <= 0) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.9 }}>
                  <ModelMark code={current.code} size={14} color={C.textSecondary} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: C.text }}>
                    {thinking ? current.name : F.meta.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: C.muted }}>
                    &middot; {thinking ? 'Thinking' : `${F.meta.secs}s`}
                  </Typography>
                </Box>
                )}

                {/* Once the summary is being written the steps have done their
                    job, so they fold into one line and give the answer room. */}
                {F.steps && answerLen > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, mb: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <Typography sx={{ fontSize: '0.72rem', color: C.muted }}>
                      {F.steps.length} steps
                    </Typography>
                  </Box>
                )}

                {F.steps && answerLen <= 0 && (
                  <Box sx={{ mb: 1.2 }}>
                    {F.steps.map((label, i) => {
                      const started = t >= F.stepStart + i * F.stepEvery;
                      const done = t >= F.stepStart + (i + 1) * F.stepEvery;
                      if (!started) return null;
                      return (
                        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.9, py: 0.3 }}>
                          <Box
                            sx={{
                              width: 13, height: 13, flexShrink: 0, borderRadius: '50%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              border: done ? 'none' : `1.4px solid ${C.toggleOff}`,
                              backgroundColor: done ? C.greenBg : 'transparent',
                            }}
                          >
                            {done && (
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.greenFg} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </Box>
                          <Typography sx={{ fontSize: '0.74rem', color: done ? C.textSecondary : C.muted }}>
                            {label}{done ? '' : '\u2026'}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {!thinking && F.meta.steps && (
                  <Typography sx={{ fontSize: '0.72rem', color: C.muted, mb: 0.9 }}>
                    {F.meta.steps}
                  </Typography>
                )}

                {!thinking && (
                  <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.65, color: C.textSecondary }}>
                    <Streamed parts={F.answer} n={answerLen} />
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>

      {/* Composer */}
      <Box sx={{ px: { xs: 1.75, sm: 2.25 }, pb: F.compact ? 0.75 : 1, pt: F.compact ? 0.5 : 1 }}>
        <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 1.5, pt: F.compact ? 0.9 : 1.15, pb: F.compact ? 0.7 : 0.9, borderBottom: `1px solid ${C.borderSoft}` }}>
            <Typography
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: '0.78rem',
                color: typedLen > 0 && !sent ? C.text : C.muted,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {typedLen > 0 && !sent
                ? (<>{F.question.slice(0, typedLen)}{typedLen < F.question.length && <Caret />}</>)
                : 'Send a message…  (@ to mention, / for commands)'}
            </Typography>
            <Box sx={{ display: 'flex', color: C.muted, flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, px: 1, py: F.compact ? 0.7 : 0.85 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 0.7,
                py: 0.35,
                borderRadius: '14px',
                minWidth: 0,
                backgroundColor: switched && t < F.switchAt + 900 ? C.chip : 'transparent',
                transition: 'background-color 0.35s ease',
              }}
            >
              <ModelMark code={current.code} size={14} color={C.textSecondary} />
              <Typography sx={{ fontSize: '0.76rem', color: C.text, whiteSpace: 'nowrap' }}>
                {current.name}
              </Typography>
              <Box sx={{ display: 'flex', color: C.muted }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }} />

            <Box sx={{ width: 22, height: 22, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </Box>

            <Box
              sx={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: typedLen > 0 || thinking ? C.text : C.sendIdle,
                color: typedLen > 0 || thinking ? C.onInverse : C.textSecondary,
                transition: 'background-color 0.3s ease',
              }}
            >
              {thinking ? (
                <Box sx={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: C.onInverse }} />
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </Box>
          </Box>
        </Box>

        {!sent && !F.compact && !F.prior && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.7, mt: 1 }}>
            {['Weather', 'Code', 'Write', 'Analyze', 'Brainstorm'].map((x) => (
              <Box key={x} sx={{ px: 1.1, py: 0.45, borderRadius: '9999px', backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
                <Typography sx={{ fontSize: '0.68rem', color: C.text, whiteSpace: 'nowrap' }}>{x}</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Typography sx={{ mt: F.compact ? 0.5 : 0.8, textAlign: 'center', fontSize: '0.62rem', color: C.muted }}>
          Hey Open can make mistakes. Verify important information.
        </Typography>
      </Box>

      <style>{`
        @keyframes pdScroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes pdIn {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pdCaret {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
}
