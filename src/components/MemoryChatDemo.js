import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* Pulled from the live app at ais.openledger.xyz in its light theme, so the
   demo reads as the product rather than as the marketing page. The lab()
   tokens there resolve to these sRGB values. Orange is kept only for the
   memory highlights, which are a demo affordance the product has no
   equivalent for. */
const UI = {
  font: '"Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif',
  page: '#F5F4F0',
  surface: '#FFFFFF',
  sunken: '#F1F1F1',
  composer: '#FBFAF7',
  border: '#DDDEE0',
  borderSoft: '#EAE9E6',
  text: '#262626',
  textSecondary: '#6D6C6A',
  muted: '#71717A',
  inverse: '#171717',
  sendIdle: '#D8D7D3',
  chipBg: '#F1F1EF',
  violetBg: '#F1EDFC',
  violetFg: '#7C5CD6',
  greenBg: '#E6F4EC',
  greenFg: '#2F7D5B',
  amberBg: '#FBF2E3',
  amberFg: '#B5872C',
  searchBg: '#EFEEEC',
  toggleOff: '#E2E1DE',
  onInverse: '#F5F4F0',
};

const MODEL_ORDER = ['GG', 'AN', 'OA', 'DS'];

export const MODELS = {
  GG: { code: 'GG', name: 'Gemini', full: 'Gemini 2.5 Pro', tier: 'Pro+', tags: ['Incognito', 'web'] },
  AN: { code: 'AN', name: 'Claude', full: 'Claude Sonnet 5', tier: 'Enterprise', tags: ['Incognito'] },
  OA: { code: 'OA', name: 'GPT-4o', full: 'GPT-4o', tier: 'Pro', tags: ['Incognito', 'web'] },
  DS: { code: 'DS', name: 'DeepSeek', full: 'Deepseek V4 Pro', tier: 'Pro+', tags: ['E2EE', 'TEE'] },
};

/* The app tints these three differently and leaves the rest grey. */
const TAG_STYLE = {
  Incognito: { bg: 'violetBg', fg: 'violetFg' },
  TEE: { bg: 'greenBg', fg: 'greenFg' },
};
const TIER_STYLE = {
  'Pro+': { bg: 'amberBg', fg: 'amberFg' },
  Enterprise: { bg: 'violetBg', fg: 'violetFg' },
  Pro: { bg: 'chipBg', fg: 'textSecondary' },
};

function Badge({ label, bg, fg, lock }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.4,
        px: 0.85,
        py: '2px',
        borderRadius: '9999px',
        backgroundColor: bg,
        color: fg,
        fontSize: '0.66rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {lock && (
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      )}
      {label}
    </Box>
  );
}

/* Four facts, written once from the first message. */
const MEMORY = [
  { id: 'veg', label: 'Vegetarian' },
  { id: 'budget', label: 'Budget: $2,000' },
  { id: 'quiet', label: 'Prefers quieter places' },
  { id: 'trip', label: 'Japan · 7 days · October' },
];

/* The visitor names the model they want; the thread hands over and the new
   model answers from memory. Each request after the first carries no context
   at all, so every detail in the answers comes out of the four saved facts,
   which is the only way to show what universal memory is actually for. */
const SCRIPT = [
  {
    kind: 'user',
    text: "I'm planning a 7-day trip to Japan in October. My budget is $2,000, I'm vegetarian, and I'd rather avoid crowds.",
  },
  {
    kind: 'reply',
    model: 'GG',
    secs: '2.41',
    saves: ['veg', 'budget', 'quiet', 'trip'],
    uses: [],
    parts: [
      { t: "Got it. I've saved four things: Japan for 7 days in October, a $2,000 budget, vegetarian, and quieter places. Any model you switch to reads the same notes, so you won't have to say this twice." },
    ],
  },

  { kind: 'switch', model: 'AN' },
  { kind: 'user', text: 'Where should I stay in Kyoto?' },
  {
    kind: 'reply',
    model: 'AN',
    secs: '3.08',
    uses: ['quiet', 'budget', 'veg'],
    parts: [
      { t: 'Higashiyama and northern Kyoto both stay ' },
      { t: 'quiet', chip: true },
      { t: ' once the day visitors leave. Small ryokan there are around ¥12,000 a night, so the week still fits ' },
      { t: 'inside $2,000', chip: true },
      { t: ', and both areas have ' },
      { t: 'vegetarian', chip: true },
      { t: ' places within walking distance.' },
    ],
  },

  { kind: 'switch', model: 'OA' },
  { kind: 'user', text: 'Continue where I left off. What should I do on day two?' },
  {
    kind: 'reply',
    model: 'OA',
    secs: '1.96',
    uses: ['quiet', 'trip'],
    parts: [
      { t: 'Start at Nanzen-ji when it opens, then walk the Philosopher\u2019s Path north to Shisen-d\u014d. It is a ' },
      { t: 'quieter', chip: true },
      { t: ' route than Fushimi Inari, and all of it is on foot. Early ' },
      { t: 'October', chip: true },
      { t: ' is the best window, before the maple crowds arrive.' },
    ],
  },
];

/* ── Pieces ──────────────────────────────────────────────────────── */

function MemoryChip({ children }) {
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: UI.violetBg,
        color: UI.violetFg,
        fontWeight: 500,
        borderRadius: '5px',
        px: 0.7,
        py: '1px',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {children}
    </Box>
  );
}

function Parts({ parts }) {
  return (
    <>
      {parts.map((p, i) => (p.chip ? <MemoryChip key={i}>{p.t}</MemoryChip> : <React.Fragment key={i}>{p.t}</React.Fragment>))}
    </>
  );
}

function SwitchDivider({ model }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2.5 }}>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: UI.border }} />
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <BrandTile code={model} size={18} round />
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: UI.muted, whiteSpace: 'nowrap' }}>
          Switched to {MODELS[model].name}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: UI.border }} />
    </Box>
  );
}

function UserBubble({ text }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
      <Box
        sx={{
          maxWidth: '78%',
          px: 2,
          py: 1.35,
          borderRadius: '18px',
          backgroundColor: UI.sunken,
          fontSize: '0.94rem',
          lineHeight: 1.6,
          color: UI.text,
        }}
      >
        {text}
      </Box>
    </Box>
  );
}

/* The app's model list: a search field, modality tabs, then rows carrying a
   round provider avatar, the tier badge under the name, the capability
   badges, and a favourite star. Shown mid-selection, with the incoming
   model under the cursor. */
function PickerMenu({ target }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 'calc(100% + 8px)',
        left: 0,
        zIndex: 6,
        width: { xs: 268, sm: 310 },
        p: 1.25,
        borderRadius: '20px',
        backgroundColor: UI.surface,
        border: `1px solid ${UI.border}`,
        boxShadow: '0 16px 40px rgba(23, 23, 23, 0.14)',
        animation: 'olMenuIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {/* Search */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.4,
          py: 0.9,
          mb: 1.1,
          borderRadius: '9999px',
          backgroundColor: UI.searchBg,
        }}
      >
        <Box sx={{ display: 'flex', color: UI.muted, flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Box>
        <Typography sx={{ fontSize: '0.8rem', color: UI.muted }}>Search models&hellip;</Typography>
      </Box>

      {/* Modality tabs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, px: 0.25 }}>
        {['All', 'Text', 'Image'].map((tab) => {
          const on = tab === 'Text';
          return (
            <Typography
              key={tab}
              sx={{
                px: 1.1,
                py: 0.4,
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: on ? 600 : 400,
                color: on ? UI.text : UI.muted,
                backgroundColor: on ? UI.chipBg : 'transparent',
              }}
            >
              {tab}
            </Typography>
          );
        })}
      </Box>

      {MODEL_ORDER.map((code) => {
        const m = MODELS[code];
        const picked = code === target;
        const tier = TIER_STYLE[m.tier] || TIER_STYLE.Pro;
        return (
          <Box
            key={code}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.1,
              px: 1,
              py: 0.9,
              borderRadius: '12px',
              backgroundColor: picked ? UI.sunken : 'transparent',
              transition: 'background-color 0.25s ease',
            }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: UI.chipBg,
                overflow: 'hidden',
              }}
            >
              <BrandTile code={code} size={16} round />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontSize: '0.82rem', color: UI.text, whiteSpace: 'nowrap' }}>
                {m.full}
              </Typography>
              <Box sx={{ mt: 0.3 }}>
                <Badge label={m.tier} bg={UI[tier.bg]} fg={UI[tier.fg]} lock />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              {m.tags.map((t) => {
                const st = TAG_STYLE[t];
                return (
                  <Badge key={t} label={t} bg={st ? UI[st.bg] : UI.chipBg} fg={st ? UI[st.fg] : UI.textSecondary} />
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', color: UI.muted, flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

/* Shown while the incoming model pulls the context across. */
function ReadingRow({ model }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.15 }}>
        <BrandTile code={model} size={18} round />
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: UI.text, whiteSpace: 'nowrap' }}>
          {MODELS[model].full}
        </Typography>
      </Box>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2 }}>
        <Box sx={{ display: 'flex', gap: 0.55 }}>
          {[0, 1, 2].map((d) => (
            <Box
              key={d}
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                  backgroundColor: UI.muted,
                animation: `olDot 1.05s ease-in-out ${d * 0.16}s infinite`,
              }}
            />
          ))}
        </Box>
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: UI.textSecondary, whiteSpace: 'nowrap' }}>
          {MODELS[model].name} is reading your memory
        </Typography>
      </Box>
    </Box>
  );
}

function Reply({ model, parts, secs }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.15 }}>
        <BrandTile code={model} size={18} round />
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: UI.text, whiteSpace: 'nowrap' }}>
          {MODELS[model].full}
        </Typography>
        {secs && (
          <Typography sx={{ fontSize: '0.85rem', color: UI.muted, whiteSpace: 'nowrap' }}>
            &middot; {secs}s
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.75, color: UI.text }}>
        <Parts parts={parts} />
      </Typography>
    </Box>
  );
}

function ThreadItem({ item }) {
  if (item.kind === 'user') return <UserBubble text={item.text} />;
  if (item.kind === 'reply') return <Reply model={item.model} parts={item.parts} secs={item.secs} />;
  return <SwitchDivider model={item.model} />;
}

/* ── Demo ────────────────────────────────────────────────────────── */

export function MemoryChatDemo() {
  const [shown, setShown] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const rootRef = React.useRef(null);

  // Only run while the demo is on screen. Without this the thread plays out
  // during page load and has already finished by the time anyone reaches it.
  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Each kind gets its own beat. The pause before a reply is where the
  // incoming model is shown reading memory.
  React.useEffect(() => {
    if (!inView) return undefined;

    const next = SCRIPT[shown];
    if (next) {
      const wait = shown === 0 ? 500 : { user: 1150, switch: 1900, reply: 1450 }[next.kind];
      const t = setTimeout(() => setShown((n) => n + 1), wait);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShown(0), 3800);
    return () => clearTimeout(t);
  }, [shown, inView]);

  const thread = SCRIPT.slice(0, shown);
  const pending = SCRIPT[shown];
  const fetching = pending && pending.kind === 'reply' ? pending : null;
  // A pending switch is the moment the picker is open and being chosen from.
  const picking = pending && pending.kind === 'switch' ? pending.model : null;
  const lastReply = [...thread].reverse().find((m) => m.kind === 'reply');
  const lastSwitch = [...thread].reverse().find((m) => m.kind === 'switch');

  const usedNow = lastReply ? lastReply.uses : [];
  const savedNow = lastReply && lastReply.saves ? lastReply.saves : [];
  const readingNow = fetching ? fetching.uses : [];
  // The header shows whichever model is in effect. It only changes once the
  // pick has landed, so you watch the name change as the menu closes.
  const activeModel = lastSwitch ? lastSwitch.model : SCRIPT[1].model;

  return (
    <Box
      ref={rootRef}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 0.62fr)' },
        gap: { xs: 2.5, md: 3 },
        alignItems: 'stretch',
        fontFamily: UI.font,
        '& *': { fontFamily: 'inherit' },
      }}
    >
      {/* ── Chat window ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: UI.surface,
          border: `1px solid ${UI.border}`,
          boxShadow: 'none',
        }}
      >
        {/* Thread. A hidden copy of the finished conversation holds the height
            open, so the window is exactly as tall as the full thread at any
            width, so it never grows as messages land and never scrolls. */}
        <Box sx={{ position: 'relative', flex: 1 }}>
          <style>{`
            @keyframes olMsgIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes olDot {
              0%, 100% { opacity: 0.25; transform: translateY(0); }
              50%      { opacity: 1; transform: translateY(-2px); }
            }
            @keyframes olMenuIn {
              from { opacity: 0; transform: translateY(6px) scale(0.98); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes olReading {
              0%, 100% { border-color: rgba(255, 102, 0, 0.3); }
              50%      { border-color: rgba(255, 102, 0, 0.85); }
            }
          `}</style>

          <Box aria-hidden="true" sx={{ visibility: 'hidden', px: { xs: 2.25, sm: 3 }, pt: 3, pb: 0.5 }}>
            {SCRIPT.map((m, i) => (
              <ThreadItem key={i} item={m} />
            ))}
          </Box>

          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, px: { xs: 2.25, sm: 3 }, pt: 3, pb: 0.5 }}>
            {thread.map((m, i) => (
              <Box key={i} sx={{ animation: 'olMsgIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                <ThreadItem item={m} />
              </Box>
            ))}
            {fetching && (
              <Box sx={{ animation: 'olMsgIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                <ReadingRow model={fetching.model} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Composer, matching the app: a white two row shell, the message
            line above, the model selector and the send control below. It is
            display only, so the send button keeps the app's disabled grey
            rather than its active dark fill. */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'relative',
            m: { xs: 1.75, sm: 2.25 },
            borderRadius: '20px',
            border: `1px solid ${UI.border}`,
            backgroundColor: UI.surface,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* Message line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pt: 1.6, pb: 1.2 }}>
            <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.94rem', color: UI.muted, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              Send a message&hellip;{'  '}(@ to mention, / for commands)
            </Typography>
            <Box sx={{ display: 'flex', color: UI.muted, flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </Box>
          </Box>

          {/* Control line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, pb: 1.5 }}>
            <Box sx={{ position: 'relative', minWidth: 0 }}>
              {picking && <PickerMenu target={picking} />}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.9,
                  height: 28,
                  px: 0.75,
                  borderRadius: '16px',
                  minWidth: 0,
                  backgroundColor: picking ? UI.sunken : 'transparent',
                  transition: 'background-color 0.25s ease',
                }}
              >
                <BrandTile code={activeModel} size={18} round />
                <Typography sx={{ fontSize: '0.875rem', color: UI.text, whiteSpace: 'nowrap' }}>
                  {MODELS[activeModel].full}
                </Typography>
                <Box
                  aria-hidden="true"
                  sx={{
                    display: 'flex',
                    color: UI.muted,
                    flexShrink: 0,
                    transform: picking ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }} />

            <Box sx={{ width: 32, height: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </Box>

            <Box
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: UI.textSecondary,
                backgroundColor: UI.sendIdle,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </Box>
          </Box>
        </Box>

        {/* The app prints this under the composer. */}
        <Typography
          sx={{
            px: 2,
            pb: 2,
            mt: -0.5,
            textAlign: 'center',
            fontSize: '0.74rem',
            color: UI.muted,
          }}
        >
          HeyOpen can make mistakes. Verify important information.
        </Typography>
      </Box>

      {/* ── Memory, drawn as the app's own settings pane: the storage note,
             the Use memory switch, then the saved list with its count. The
             only addition is the per turn marker, which the product has no
             need for and the demo cannot do without. ──────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          p: { xs: 2.25, sm: 2.75 },
          backgroundColor: UI.surface,
          border: `1px solid ${UI.border}`,
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: UI.text, letterSpacing: '-0.01em' }}>
          Memory
        </Typography>
        <Typography sx={{ mt: 1, fontSize: '0.82rem', lineHeight: 1.6, color: UI.textSecondary }}>
          Memory is stored only in this browser. It never syncs and is removed if you clear site data.
        </Typography>

        {/* Switch row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            mt: 2.25,
            pt: 2.25,
            borderTop: `1px solid ${UI.borderSoft}`,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: UI.text }}>
              Use memory
            </Typography>
            <Typography sx={{ mt: 0.4, fontSize: '0.8rem', lineHeight: 1.55, color: UI.textSecondary }}>
              Let the assistant use what it knows about you in new chats.
            </Typography>
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              width: 42,
              height: 24,
              flexShrink: 0,
              mt: 0.2,
              borderRadius: '9999px',
              backgroundColor: UI.inverse,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: '3px',
            }}
          >
            <Box sx={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
          </Box>
        </Box>

        {/* Saved list */}
        <Typography
          sx={{
            mt: 2.5,
            pt: 2.25,
            borderTop: `1px solid ${UI.borderSoft}`,
            fontSize: '0.92rem',
            fontWeight: 600,
            color: UI.text,
          }}
        >
          Saved memories{' '}
          <Box component="span" sx={{ color: UI.muted, fontWeight: 400 }}>
            ({MEMORY.length})
          </Box>
        </Typography>

        <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {MEMORY.map((item) => {
            const reading = readingNow.includes(item.id);
            const used = usedNow.includes(item.id);
            const saved = savedNow.includes(item.id);
            const lit = reading || used || saved;
            const tag = reading ? 'Reading' : used ? 'Used' : saved ? 'Saved' : null;
            return (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.1,
                  px: 1.5,
                  py: 1.15,
                  borderRadius: '12px',
                  backgroundColor: lit ? UI.sunken : 'transparent',
                  border: `1px solid ${lit ? UI.border : 'transparent'}`,
                  animation: reading ? 'olReading 1.05s ease-in-out infinite' : 'none',
                  transition: 'background-color 0.45s ease, border-color 0.45s ease',
                }}
              >
                <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.86rem', color: UI.text }}>
                  {item.label}
                </Typography>
                {tag && <Badge label={tag} bg={UI.violetBg} fg={UI.violetFg} />}
              </Box>
            );
          })}
        </Box>

        {/* Add row, as the app has it */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              px: 1.6,
              py: 1,
              borderRadius: '10px',
              border: `1px solid ${UI.border}`,
              backgroundColor: UI.surface,
            }}
          >
            <Typography sx={{ fontSize: '0.8rem', color: UI.muted, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              e.g. I prefer concise answers
            </Typography>
          </Box>
          <Box
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.6,
              py: 1,
              borderRadius: '10px',
              backgroundColor: UI.inverse,
              color: UI.onInverse,
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MemoryChatDemo;
