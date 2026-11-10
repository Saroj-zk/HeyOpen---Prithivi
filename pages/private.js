import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule } from '@/components/ui/LedgerUI';
import { useThemeMode } from '@/context/ThemeContext';
import PageMeta from '@/components/PageMeta';

const ORANGE = '#FF6600';
const CHAT_URL = 'https://ais.openledger.xyz/chat';

/* One vertical scale for the whole page, so every band and row agrees. */
const SECTION_PY = { xs: 8, md: 12 }; // padding inside each section band
const BLOCK_GAP = { xs: 5, md: 7 };   // header to content, and between blocks
const ROW_PY = { xs: 3.5, md: 4 };    // ledger rows and divided columns

/* ── Content ─────────────────────────────────────────────────────── */

const GUARANTEES = ['Private History', 'Zero Retention', 'No Training'];

const DEFAULTS = [
  { term: 'Zero Retention', detail: 'We don’t keep your prompts or responses after they’re processed.' },
  { term: 'No Training', detail: 'Your conversations aren’t used to train AI models.' },
  { term: 'Private History', detail: 'Your conversations stay available to you in your browser.' },
];

const TELEMETRY = [
  { label: 'Retention', value: 'NONE' },
  { label: 'AI Training', value: 'OFF' },
  { label: 'Profiling', value: 'NONE' },
];

/* The path of a single request, in the order each property applies. The middle
   field is what lets TEE be spelled out without a parenthetical. */
const PILLARS = [
  {
    n: '01',
    term: 'Anonymous',
    sub: 'No account, no sign up',
    detail: 'Nothing to tie a question back to you.',
  },
  {
    n: '02',
    term: 'Encrypted',
    sub: 'Encrypted in transit',
    detail: 'Nobody in between can read what you sent.',
  },
  {
    n: '03',
    term: 'TEE',
    sub: 'Trusted Execution Environment',
    detail: 'Runs inside isolated hardware.',
  },
  {
    n: '04',
    term: 'Private',
    sub: 'Zero retention',
    detail: 'Nothing kept, trained on, or profiled.',
  },
  {
    n: '05',
    term: 'Unfiltered',
    sub: 'NSFW allowed',
    detail: 'No content filter between you and the model.',
  },
];

const STEPS = [
  {
    step: '01',
    glyph: 'device',
    zone: 'you',
    term: 'You Ask',
    line: 'START HERE',
    detail: 'Start a conversation or pick up where you left off.',
  },
  {
    step: '02',
    glyph: 'shield',
    zone: 'openledger',
    term: 'Secure Routing',
    line: 'SENT SECURELY',
    detail:
      'Your request is routed securely to the model you picked.',
  },
  {
    step: '03',
    glyph: 'cpu',
    zone: 'openledger',
    term: 'Private Inference',
    line: 'PRIVATELY PROCESSED',
    detail:
      'The model answers your question, and Hey Open keeps no copy of it.',
  },
  {
    step: '04',
    glyph: 'reply',
    zone: 'you',
    term: 'Back to You',
    line: 'ANSWER DELIVERED',
    detail:
      'The answer comes back, and your conversation stays available in your browser.',
  },
];

const PIPELINE_CHIPS = ['SECURE IN TRANSIT', 'PRIVATE BY DEFAULT', 'ZERO RETENTION'];

const FLOWS = [
  {
    label: 'Most platforms',
    accent: false,
    note: 'Another layer decides what reaches the model.',
  },
  {
    label: 'Hey Open',
    accent: true,
    note: 'Your request goes straight to the model, with no platform filter in between.',
  },
];



const CLOSING_SPECS = ['Zero Retention', 'No Training', 'No Profiling'];

const SURFACES = [
  { glyph: 'globe', term: 'Web', sub: 'Any browser' },
  { glyph: 'laptop', term: 'Native App', sub: 'macOS · Windows · Linux' },
  { glyph: 'code', term: 'API & SDKs', sub: 'Drop-in endpoint' },
  { glyph: 'terminal', term: 'CLI', sub: 'From your shell' },
];

/* ── Glyphs ──────────────────────────────────────────────────────── */

const GLYPH_PATHS = {
  device: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  nostore: (
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </>
  ),
  notrain: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  noprofile: (
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <circle cx="12" cy="13" r="2" />
      <path d="M9 18h6" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />,
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  spark: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />,
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="5" />
      <line x1="15" y1="2" x2="15" y2="5" />
      <line x1="9" y1="19" x2="9" y2="22" />
      <line x1="15" y1="19" x2="15" y2="22" />
      <line x1="19" y1="9" x2="22" y2="9" />
      <line x1="19" y1="15" x2="22" y2="15" />
      <line x1="2" y1="9" x2="5" y2="9" />
      <line x1="2" y1="15" x2="5" y2="15" />
    </>
  ),
  reply: (
    <>
      <polyline points="9 15 4 10 9 5" />
      <path d="M20 20v-6a4 4 0 0 0-4-4H4" />
    </>
  ),
  funnel: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </>
  ),
  laptop: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
};

function Glyph({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {GLYPH_PATHS[name]}
    </svg>
  );
}

/* ── Shared UI ───────────────────────────────────────────────────── */

function Eyebrow({ children }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        color: ORANGE,
        mb: 2.5,
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} />
      {children}
    </Box>
  );
}

function SectionHead({ eyebrow, title, lede }) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' },
          gap: { xs: 2.5, md: 6 },
          alignItems: 'end',
          mb: BLOCK_GAP,
        }}
      >
        <Box>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Typography
            component="h2"
            sx={{
              /* No ch cap: it stranded the last word of a heading on its own
                 line. The grid column sets the width, balance sets the break. */
              textWrap: 'balance',
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: 'var(--text-heading)',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          sx={{
            maxWidth: '48ch',
            fontSize: { xs: '1rem', md: '1.05rem' },
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            pb: { md: 0.75 },
          }}
        >
          {lede}
        </Typography>
      </Box>
    </Reveal>
  );
}

function SpecLine({ items, sx = {} }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, ...sx }}>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && (
            <Typography component="span" sx={{ fontSize: '0.6rem', color: 'var(--border-strong)', userSelect: 'none' }}>
              ◆
            </Typography>
          )}
          <Typography
            component="span"
            sx={{
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {item}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
}

/* Frosted tile — reads as glass rather than a filled brand swatch. */
function GlassTile({ name, size = 38 }) {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ORANGE,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.14)'
          : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 0 rgba(255, 255, 255, 1)',
      }}
    >
      <Glyph name={name} size={Math.round(size * 0.48)} />
    </Box>
  );
}

function GlyphTile({ name, size = 44 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        border: '1px solid rgba(255, 102, 0, 0.3)',
        color: ORANGE,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Glyph name={name} size={Math.round(size * 0.5)} />
    </Box>
  );
}

const getPrimaryCtaSx = (isDark) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 4.5,
  py: 1.7,
  fontSize: { xs: '1rem', md: '1.05rem' },
  fontWeight: 600,
  borderRadius: '9999px',
  color: '#ff6600',
  fontFamily: '"Inter", -apple-system, sans-serif',
  textDecoration: 'none',
  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  cursor: 'pointer',

  // Liquid Glass Pill Base (from active tab in CoreFeaturesSection)
  backgroundColor: isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)',
  background: isDark
      ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)',
  backdropFilter: 'blur(16px)',
  border: isDark
    ? '1px solid rgba(255, 102, 0, 0.28)'
    : '1px solid rgba(255, 102, 0, 0.2)',
  boxShadow: isDark
      ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3), inset 0 -0.5px 1px rgba(0, 0, 0, 0.3)'
      : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)',

  // Specular rim highlight (simulated using ::before)
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '12%',
    right: '12%',
    height: '2px',
    background: isDark
      ? 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.6), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.45), transparent)',
    borderRadius: '9999px',
    opacity: isDark ? 0.8 : 0.6,
    pointerEvents: 'none',
  },

  '&:hover': {
    backgroundColor: isDark ? 'rgba(255, 102, 0, 0.18)' : 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-1px)',
    boxShadow: isDark
      ? '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.35), inset 0 -0.5px 1px rgba(0, 0, 0, 0.3)'
      : '0 6px 16px rgba(15, 23, 42, 0.08), inset 0 2px 3px rgba(255, 255, 255, 1), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
});

const GHOST_CTA_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-primary)',
  px: 4,
  py: 1.7,
  borderRadius: '9999px',
  fontSize: '1rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '1px solid var(--border-normal)',
  backgroundColor: 'var(--bg-glass)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255, 255, 255, 0.45)',
  transition: 'all 0.25s ease',
  '&:hover': {
    borderColor: ORANGE,
    color: ORANGE,
    transform: 'translateY(-2px)',
    boxShadow: 'inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 6px 18px rgba(255, 102, 0, 0.14)',
  },
};

/* ── Filter-layer comparison ─────────────────────────────────────── */

/* Two lanes on identical grid tracks. The endpoints sit at the same x in both,
   so the eye compares one thing only: what happens in the middle.
   A pulse runs the lane to show the prompt moving. On the filtered lane it is
   drawn in two hops with a pause at the slab; on ours it is one clean run. */

const LANE_NODE = 44;
const LANE_H = 10;

function FlowKeyframes() {
  return (
    <style>{`
      @keyframes olLanePulse {
        0%   { transform: translateX(-130%); }
        100% { transform: translateX(340%); }
      }
    `}</style>
  );
}

function LaneNode({ icon, label, accent, align = 'start' }) {
  const node = (
    <Box
      sx={{
        width: LANE_NODE,
        height: LANE_NODE,
        flexShrink: 0,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: accent ? ORANGE : 'var(--bg-card)',
        border: `2px solid ${accent ? ORANGE : 'var(--border-strong)'}`,
        color: accent ? '#FFFFFF' : 'var(--text-secondary)',
        boxShadow: accent ? `0 6px 18px ${ORANGE}40` : '0 2px 8px rgba(15, 23, 42, 0.06)',
      }}
    >
      <Glyph name={icon} size={19} />
    </Box>
  );

  const text = (
    <Typography
      sx={{
        fontSize: { xs: '0.78rem', sm: '0.85rem' },
        fontWeight: 700,
        whiteSpace: 'nowrap',
        color: accent ? ORANGE : 'var(--text-primary)',
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.4,
        pr: align === 'start' ? 2 : 0,
        pl: align === 'end' ? 2 : 0,
      }}
    >
      {align === 'start' ? node : text}
      {align === 'start' ? text : node}
    </Box>
  );
}

/* A run of lane. Only the first run in a row is rounded on the left; the rest
   butt together square so a multi-track lane reads as one continuous channel
   rather than three pills in a row. */
function Lane({ accent, arrow = false, roundStart = false, delay = 0, duration = 2.6, sx = {} }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, ...sx }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          flex: 1,
          minWidth: 0,
          height: LANE_H,
          borderRadius: roundStart ? `${LANE_H / 2}px 0 0 ${LANE_H / 2}px` : 0,
          background: accent ? `linear-gradient(90deg, ${ORANGE} 0%, #FF8A2B 100%)` : 'var(--border-normal)',
          boxShadow: accent ? `0 0 16px ${ORANGE}55` : 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '32%',
            background: `linear-gradient(90deg, transparent 0%, ${
              accent ? 'rgba(255, 255, 255, 0.85)' : 'var(--border-strong)'
            } 50%, transparent 100%)`,
            animation: `olLanePulse ${duration}s linear ${delay}s infinite`,
          }}
        />
      </Box>

      {arrow && (
        <Box
          aria-hidden="true"
          sx={{
            width: 0,
            height: 0,
            flexShrink: 0,
            borderTop: `${LANE_H}px solid transparent`,
            borderBottom: `${LANE_H}px solid transparent`,
            borderLeft: `13px solid ${accent ? '#FF8A2B' : 'var(--border-normal)'}`,
            filter: accent ? `drop-shadow(0 0 8px ${ORANGE}55)` : 'none',
          }}
        />
      )}
    </Box>
  );
}

/* The obstruction: a solid slab sitting across the lane, cutting it in two. */
function LaneBlock() {
  return (
    <Box
      sx={{
        mx: 1.5,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.8,
        px: { xs: 1.2, sm: 1.6 },
        py: 1.25,
        borderRadius: '12px',
        whiteSpace: 'nowrap',
        fontSize: { xs: '0.7rem', sm: '0.78rem' },
        fontWeight: 700,
        color: 'var(--text-primary)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-strong)',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
      }}
    >
      <Box sx={{ display: 'flex', flexShrink: 0, color: 'var(--text-muted)' }}>
        <Glyph name="funnel" size={14} />
      </Box>
      Platform filter
    </Box>
  );
}

function FlowRow({ flow }) {
  const accent = flow.accent;

  return (
    <Box sx={{ py: ROW_PY, borderBottom: '1px solid var(--border-normal)' }}>
      <Typography
        sx={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: accent ? ORANGE : 'var(--text-muted)',
          mb: 2.5,
        }}
      >
        {flow.label}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto 1fr 150px 1fr auto',
            sm: 'auto 1fr 190px 1fr auto',
          },
          alignItems: 'center',
        }}
      >
        <LaneNode icon="user" label="You" accent={accent} align="start" />

        {accent ? (
          // One element across all three middle tracks, so a single pulse runs
          // the whole way and no seams show between segments.
          <Lane accent arrow roundStart duration={2.2} sx={{ gridColumn: '2 / 5' }} />
        ) : (
          <>
            <Lane arrow roundStart />
            <LaneBlock />
            <Lane arrow roundStart delay={1.3} />
          </>
        )}

        <LaneNode icon="spark" label="Model" accent={accent} align="end" />
      </Box>

      <Typography sx={{ mt: 2.75, maxWidth: '62ch', fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {flow.note}
      </Typography>
    </Box>
  );
}

/* ── Hero console ────────────────────────────────────────────────── */

function LockedToggle() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: 46,
        height: 26,
        flexShrink: 0,
        borderRadius: '9999px',
        position: 'relative',
        backgroundColor: ORANGE,
        boxShadow: '0 4px 12px rgba(255, 102, 0, 0.32), inset 0 1px 2px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          left: 23,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ORANGE,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Glyph name="lock" size={11} />
      </Box>
    </Box>
  );
}

function PrivacyConsole() {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '26px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-normal)',
        boxShadow: isDark
          ? '0 30px 70px rgba(0, 0, 0, 0.65), 0 0 40px rgba(255, 102, 0, 0.08)'
          : '0 24px 60px rgba(15, 23, 42, 0.09)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(255, 102, 0, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Console header */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 3, sm: 4 },
          py: 2.5,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <GlyphTile name="shield" size={36} />
          <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
              Privacy Defaults
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Built into every private session.</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            gap: 0.8,
            px: 1.5,
            py: 0.5,
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 102, 0, 0.08)',
            border: '1px solid rgba(255, 102, 0, 0.3)',
            color: ORANGE,
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: ORANGE }} />
          ENFORCED
        </Box>
      </Box>

      {/* Default rows */}
      <Box sx={{ position: 'relative', px: { xs: 3, sm: 4 }, py: 1 }}>
        {DEFAULTS.map((item, i) => (
          <Box
            key={item.term}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              py: 2.4,
              borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.term}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-secondary)', mt: 0.3 }}>
                {item.detail}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                Always on
              </Typography>
              <LockedToggle />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Telemetry */}
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          px: { xs: 3, sm: 4 },
          py: 2.75,
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-glass)',
        }}
      >
        {TELEMETRY.map((t) => (
          <Box key={t.label}>
            <Typography
              sx={{
                fontSize: '0.66rem',
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {t.label}
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: ORANGE, mt: 0.4 }}>{t.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ── Pipeline ────────────────────────────────────────────────────── */

function Pipeline() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % STEPS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  // The wire sits at your level for 01 and 04 and drops to ours for 02 and 03,
  // so the trust boundary is carried by the geometry rather than a label alone.
  const GAP = 40;    // column gutter, shared by the grid and the connectors
  const RAIL_H = 156; // leaves 44px under the lowest marker
  const NODE = 44;
  const HIGH = 28;
  const LOW = 68;
  const cy = (i) => (STEPS[i].zone === 'you' ? HIGH : LOW) + NODE / 2;

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: { xs: 3.5, md: `${GAP}px` },
        }}
      >
        {STEPS.map((s, i) => {
          const isActive = i === active;
          const isOurs = s.zone === 'openledger';
          const passed = i < active;
          const top = isOurs ? LOW : HIGH;

          return (
            <Box
              key={s.step}
              onClick={() => setActive(i)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                display: { xs: 'flex', md: 'block' },
                flexDirection: { xs: 'row' },
                alignItems: { xs: 'flex-start' },
                gap: { xs: 2.5, md: 0 },
                pt: { md: `${RAIL_H}px` },
              }}
            >
              {/* Zone annotations, drawn once per stretch of the wire */}
              {(i === 0 || i === 1 || i === 3) && (
                <Typography
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 0,
                    left: i === 1 ? 'calc(100% + 16px)' : 0,
                    transform: i === 1 ? 'translateX(-50%)' : 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: i === 1 ? 'var(--text-muted)' : ORANGE,
                  }}
                >
                  {i === 1 ? 'Hey Open infrastructure' : 'Your device'}
                </Typography>
              )}

              {/* Where the wire crosses out of your device, and back in */}
              {(i === 0 || i === 2) && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 18,
                    right: -GAP / 2,
                    width: 0,
                    height: RAIL_H - 28,
                    borderLeft: '1px dashed var(--border-strong)',
                    opacity: 0.5,
                  }}
                />
              )}

              {/* The wire itself: it descends into our zone and climbs back out */}
              {i < STEPS.length - 1 && (
                <Box
                  component="svg"
                  aria-hidden="true"
                  viewBox={`0 0 100 ${RAIL_H}`}
                  preserveAspectRatio="none"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 0,
                    left: NODE / 2,
                    width: `calc(100% + ${GAP}px)`,
                    height: `${RAIL_H}px`,
                    overflow: 'visible',
                    pointerEvents: 'none',
                  }}
                >
                  <path
                    d={
                      cy(i) === cy(i + 1)
                        ? `M 0 ${cy(i)} L 100 ${cy(i + 1)}`
                        : `M 0 ${cy(i)} C 38 ${cy(i)} 62 ${cy(i + 1)} 100 ${cy(i + 1)}`
                    }
                    fill="none"
                    stroke={passed ? ORANGE : 'var(--border-normal)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      transition: 'stroke 0.55s ease',
                      filter: passed ? `drop-shadow(0 0 6px ${ORANGE}66)` : 'none',
                    }}
                  />
                </Box>
              )}

              {/* Run-out: the response leaves the diagram on its way back to you */}
              {i === STEPS.length - 1 && (
                <Box
                  component="svg"
                  aria-hidden="true"
                  viewBox={`0 0 100 ${RAIL_H}`}
                  preserveAspectRatio="none"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 0,
                    left: NODE / 2,
                    width: `calc(100% - ${NODE / 2}px)`,
                    height: `${RAIL_H}px`,
                    pointerEvents: 'none',
                  }}
                >
                  <defs>
                    <linearGradient id="ol-runout" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor={isActive ? ORANGE : 'currentColor'} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={isActive ? ORANGE : 'currentColor'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0 ${cy(i)} L 100 ${cy(i)}`}
                    fill="none"
                    stroke="url(#ol-runout)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    style={{ color: 'var(--border-normal)', transition: 'stroke 0.55s ease' }}
                  />
                </Box>
              )}

              {/* Marker. Solid ring where the data rests, dashed where it only passes through. */}
              <Box
                sx={{
                  position: { xs: 'static', md: 'absolute' },
                  top: { md: `${top}px` },
                  left: { md: 0 },
                  zIndex: 1,
                  width: NODE,
                  height: NODE,
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? ORANGE : 'var(--bg-page)',
                  border: `${isOurs ? '1.5px dashed' : '2px solid'} ${
                    isActive ? ORANGE : 'var(--border-strong)'
                  }`,
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  boxShadow: isActive ? `0 0 0 6px ${ORANGE}1f` : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <Glyph name={s.glyph} size={20} />
              </Box>

              {/* Mobile keeps the plain vertical run between markers */}
              {i < STEPS.length - 1 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'absolute',
                    left: NODE / 2 - 1,
                    top: NODE,
                    width: '2px',
                    height: 'calc(100% - 16px)',
                    borderRadius: '2px',
                    backgroundColor: passed ? ORANGE : 'var(--border-normal)',
                    transition: 'background-color 0.55s ease',
                  }}
                />
              )}

              <Box sx={{ pr: { md: 3.5 } }}>
                <Typography
                  sx={{ fontSize: '1.02rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-heading)' }}
                >
                  {s.term}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: isActive ? ORANGE : 'var(--text-muted)',
                    mt: 0.6,
                    mb: 1.6,
                    minHeight: { md: 35, lg: 0 },
                    transition: 'color 0.35s ease',
                  }}
                >
                  <Box component="span" sx={{ color: 'var(--text-muted)', mr: 0.9 }}>
                    {s.step}
                  </Box>
                  {s.line}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    // Reserve the tallest paragraph's height so all four
                    // columns end on the same baseline. Narrower desktops wrap
                    // to more lines, so the floor is taller there.
                    minHeight: { md: 120, lg: 100 },
                  }}
                >
                  {s.detail}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Guarantees — plain marks on a hairline, not pills */}
      <Box
        sx={{
          position: 'relative',
          mt: BLOCK_GAP,
          pt: { xs: 3, md: 3.5 },
          borderTop: '1px solid var(--border-normal)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2.5, md: 5 },
        }}
      >
        {PIPELINE_CHIPS.map((chip) => (
          <Box key={chip} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.1 }}>
            <Box sx={{ color: ORANGE, display: 'flex' }}>
              <Glyph name="check" size={14} />
            </Box>
            <Typography
              sx={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}
            >
              {chip}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function PrivatePage() {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: 'var(--bg-page)',
        transition: 'background-color 0.35s ease',
      }}
    >
      <PageMeta
        title="Private AI — Confidential Intelligence | Hey Open"
        description="Use powerful AI without giving up your privacy. Zero retention, no training, and local-only history by default."
        path="/private"
      />

      {/* Ambient layers */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 760,
          background:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255, 102, 0, 0.15) 0%, rgba(255, 80, 0, 0.04) 55%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: '12%',
          right: 0,
          width: { xs: 240, md: 420 },
          height: 420,
          background: 'radial-gradient(ellipse 80% 70% at 100% 0%, rgba(255, 140, 0, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <PageHeader />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Section 1: Hero ────────────────────────────────────── */}
        <Box component="section" sx={{ pt: { xs: 14, sm: 16, md: 18 }, pb: SECTION_PY }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Eyebrow>Private AI</Eyebrow>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.4rem' },
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 3,
                }}
              >
                What you ask
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: 'linear-gradient(92deg, #FF6600 0%, #FF9A2E 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  stays yours.
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: '52ch',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4.5,
                }}
              >
                Ask anything. Your conversations stay private, your prompts aren’t used for training, and Hey Open doesn’t keep your chat history on its servers.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 5 }}>
                <Box component="a" href={CHAT_URL} target="_blank" rel="noopener noreferrer" sx={getPrimaryCtaSx(isDark)}>
                  Start a Private Chat
                </Box>
                <Box component="a" href="#how-it-works" sx={GHOST_CTA_SX}>
                  See how it works
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, sm: 2.5 } }}>
                {GUARANTEES.map((g) => (
                  <Box
                    key={g}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.8,
                      py: 0.8,
                      borderRadius: '9999px',
                      backgroundColor: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Box sx={{ color: ORANGE, display: 'flex' }}>
                      <Glyph name="check" size={13} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {g}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <PrivacyConsole />
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 2: What you get ────────────────────────────── */}
        <Box component="section" sx={{ scrollMarginTop: '96px' }}>
          <Rule />
          {/* One list now. The promises and the ledger said the same things
              twice, so they are a single set of rows. */}
          <Box sx={{ py: SECTION_PY }}>
            {/* Centred and stacked, unlike the split head the later sections
                use, so the page's main claim sits on its own axis. */}
            <Reveal>
              <Box
                sx={{
                  maxWidth: '44rem',
                  mx: 'auto',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: BLOCK_GAP,
                }}
              >
                <Eyebrow>THE ARCHITECTURE</Eyebrow>
                <Typography
                  component="h2"
                  sx={{
                    textWrap: 'balance',
                    fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.4rem' },
                    fontWeight: 700,
                    lineHeight: 1.18,
                    letterSpacing: '-0.025em',
                    color: 'var(--text-heading)',
                  }}
                >
                  Privacy that is built, not promised.
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    textWrap: 'balance',
                    maxWidth: '54ch',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  The same protections apply to every request you send, from the moment it
                  leaves your device to the moment the answer comes back.
                </Typography>
              </Box>
            </Reveal>

            {/* Five columns across, not five rows down. Every other list on
                this page runs vertically, and the detail lines here are short
                enough that a row layout left most of the width empty. Each
                column ends on its label, so the orange sits on one baseline
                across the strip. */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
                borderTop: '1px solid var(--border-normal)',
                borderBottom: '1px solid var(--border-normal)',
              }}
            >
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.term} delay={i * 70}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      px: { xs: 0, sm: 2.5, md: 2.75 },
                      py: ROW_PY,
                      borderLeft: { sm: i % 2 === 0 ? 'none' : '1px solid var(--border-subtle)',
                                    md: i === 0 ? 'none' : '1px solid var(--border-subtle)' },
                      borderBottom: {
                        xs: i === PILLARS.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                        md: 'none',
                      },
                      transition: 'background-color 0.3s ease',
                      '&:hover': { backgroundColor: 'var(--bg-glass)' },
                      '&:hover .spec-n': { color: ORANGE },
                    }}
                  >
                    <Typography
                      className="spec-n"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                        transition: 'color 0.3s ease',
                        mb: 1.75,
                      }}
                    >
                      {pillar.n}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.15rem' },
                        fontWeight: 700,
                        lineHeight: 1.25,
                        letterSpacing: '-0.015em',
                        color: 'var(--text-heading)',
                        mb: 1,
                      }}
                    >
                      {pillar.term}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                        mb: 3,
                      }}
                    >
                      {pillar.detail}
                    </Typography>

                    {/* mt auto pins every label to the foot of the strip */}
                    <Typography
                      sx={{
                        mt: 'auto',
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        letterSpacing: '0.07em',
                        lineHeight: 1.5,
                        textTransform: 'uppercase',
                        color: ORANGE,
                      }}
                    >
                      {pillar.sub}
                    </Typography>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Section 3: How it works ────────────────────────────── */}
        <Box component="section" id="how-it-works" sx={{ scrollMarginTop: '96px' }}>
          <Rule />
          <Box sx={{ py: SECTION_PY }}>
            <SectionHead
              eyebrow="How it works"
              title="Your request goes in. Your data doesn’t stick around."
              lede="Ask your question, get your answer, keep your conversation. Hey Open handles the request without keeping a permanent copy on its servers."
            />
            <Reveal delay={120}>
              <Pipeline />
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 4: Uncensored by design ──────────────────────── */}
        <Box component="section" sx={{ scrollMarginTop: '96px' }}>
          <Rule />
          <Box sx={{ py: SECTION_PY }}>
            <SectionHead
              eyebrow="Uncensored by design"
              title="Private enough to ask. Unfiltered enough to answer."
              lede="Research difficult subjects, challenge an idea you disagree with, write, and code without a moderation layer deciding what reaches the model."
            />

            {/* Filter-layer comparison */}
            <Reveal>
              {/* The closing Rule of the next section already draws a line
                  here, so the last row drops its own. */}
              <Box
                sx={{
                  borderTop: '1px solid var(--border-normal)',
                  '& > *:last-child': { borderBottom: 'none' },
                }}
              >
                <FlowKeyframes />
                {FLOWS.map((flow) => (
                  <FlowRow key={flow.label} flow={flow} />
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 5: Start a private session ──────────────────── */}
        <Box component="section" sx={{ position: 'relative' }}>
          <Rule />

          {/* Colour sources that sit UNDER the glass, so the blur has something to refract */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: '18%',
              left: '-2%',
              width: { xs: 230, md: 400 },
              height: { xs: 230, md: 400 },
              borderRadius: '50%',
              backgroundColor: ORANGE,
              opacity: isDark ? 0.15 : 0.08,
              filter: 'blur(100px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              bottom: '14%',
              right: '-1%',
              width: { xs: 210, md: 360 },
              height: { xs: 210, md: 360 },
              borderRadius: '50%',
              backgroundColor: '#FFA53A',
              opacity: isDark ? 0.12 : 0.06,
              filter: 'blur(100px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: '38%',
              left: '44%',
              width: { xs: 170, md: 290 },
              height: { xs: 170, md: 290 },
              borderRadius: '50%',
              backgroundColor: '#FF5A1F',
              opacity: isDark ? 0.10 : 0.04,
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', py: SECTION_PY }}>
            <Reveal>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
                  borderRadius: { xs: '22px', md: '28px' },
                  // Dark mode tints the glass dark, or the blur just turns it milky grey.
                  backgroundColor: isDark ? 'rgba(16, 19, 26, 0.55)' : 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(30px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(190%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.75)',
                  boxShadow: isDark
                    ? '0 24px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
                    : '0 24px 70px rgba(15, 23, 42, 0.12), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)',
                  // Sheen across the top edge, the way light catches a pane of glass
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: isDark
                      ? 'linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 38%)'
                      : 'linear-gradient(160deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 45%)',
                  },
                }}
              >
                {/* Left pane: the invitation */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    p: { xs: 3.5, sm: 5, md: 6 },
                    borderBottom: { xs: '1px solid var(--border-subtle)', md: 'none' },
                    borderRight: { md: '1px solid var(--border-subtle)' },
                  }}
                >
                  <SpecLine items={CLOSING_SPECS} sx={{ mb: 3 }} />

                  <Typography
                    component="h2"
                    sx={{
                      maxWidth: '16ch',
                      fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.7rem' },
                      fontWeight: 700,
                      lineHeight: 1.14,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-heading)',
                      mb: 2,
                    }}
                  >
                    Ask anything.<br />Leave nothing behind.
                  </Typography>

                  <Typography
                    sx={{
                      maxWidth: '46ch',
                      fontSize: { xs: '0.98rem', md: '1.05rem' },
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      mb: 4,
                    }}
                  >
                    Choose your model, start a private session, and ask what you want without leaving a permanent chat history on Hey Open’s servers.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box component="a" href={CHAT_URL} target="_blank" rel="noopener noreferrer" sx={getPrimaryCtaSx(isDark)}>
                      Start a Private Chat →
                    </Box>
                    <Link href="/models" passHref legacyBehavior>
                      <Box component="a" sx={GHOST_CTA_SX}>
                        See every model
                      </Box>
                    </Link>
                  </Box>
                </Box>

                {/* Right pane: where it runs */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    p: { xs: 3.5, sm: 5, md: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      mb: 1,
                    }}
                  >
                    Private on every platform
                  </Typography>

                  {SURFACES.map((s, i) => (
                    <Box
                      key={s.term}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.8,
                        py: { xs: 1.5, md: 1.85 },
                        borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <GlassTile name={s.glyph} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                          {s.term}
                        </Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.sub}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
