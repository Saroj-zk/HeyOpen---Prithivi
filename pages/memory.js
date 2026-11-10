import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PageHeader from '@/components/PageHeader';
import MemorySettingsPanel from '@/components/MemorySettingsPanel';
import Footer from '@/components/Footer';
import { Reveal, Rule, BrandTile } from '@/components/ui/LedgerUI';
import { useThemeMode } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';
import PageMeta from '@/components/PageMeta';

const MemoryChatDemo = dynamic(() => import('@/components/MemoryChatDemo'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1180,
        height: 520,
        mx: 'auto',
        borderRadius: { xs: '20px', md: '28px' },
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-normal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 12px #FF6600' }} />
    </Box>
  ),
});

const MODEL_NAMES = {
  OA: 'GPT-4o',
  AN: 'Claude',
  GG: 'Gemini',
  DS: 'DeepSeek',
};

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

/* Every section opens the same way. They had drifted to four different
   measures (36rem, 820, none, 46rem), three body sizes and three sets of gaps,
   which is what made the page feel like several pages. */
/* The controls sit on dark, matching the pane directly above them. On a pale
   page a hairline grid reads as a footnote, and these four are the privacy
   claims, which is the last thing that should whisper. */
const CTRL = {
  shell: '#0B0B0D',
  line: '#26262A',
  ink: '#F4F4F5',
  inkMid: '#A1A1AA',
  inkDim: '#6D6D73',
};

const LEAD_BLOCK = {
  maxWidth: 820,
  mx: 'auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const LEAD_H2 = {
  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
  fontWeight: 700,
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  color: 'var(--text-heading)',
  mb: 2,
  textWrap: 'balance',
};

const LEAD_COPY = {
  maxWidth: '72ch',
  fontSize: '1.05rem',
  lineHeight: 1.65,
  color: 'var(--text-secondary)',
  textWrap: 'balance',
};

const REMEMBERS = [
  {
    glyph: 'sliders',
    term: 'Preferences',
    detail: 'How you like things done, from tone and formatting to the way you work.',
    entries: ['Vegetarian', 'Concise answers', 'Avoid crowded places'],
  },
  {
    glyph: 'layers',
    term: 'Ongoing Context',
    detail: 'The projects, plans, and work you’re already in the middle of.',
    entries: ['Japan trip', 'October', '7 days'],
  },
  {
    glyph: 'note',
    term: 'Important Details',
    detail: 'The details that matter, so you don’t have to repeat them.',
    entries: ['Budget: $2,000', 'Travelling solo'],
  },
  {
    glyph: 'check',
    term: 'Decisions',
    detail: 'The decisions you’ve already made, so you don’t have to make them twice.',
    entries: ['Kyoto added', 'Hotel selected'],
  },
];

/* What the pane actually lets you do. Written off the app's own switches
   rather than from a generic privacy list: there is no server copy to erase
   and no public profile to be excluded from, so neither is claimed. */
const CONTROLS = [
  {
    kind: 'MANUAL ENTRY',
    term: 'Add it yourself',
    detail: 'Type a fact straight in. No waiting for it to come up in a conversation first.',
  },
  {
    kind: 'AUTOMATIC',
    term: 'Let it collect',
    detail: 'Durable facts are saved as you chat. Switch that off and nothing new is written.',
  },
  {
    kind: 'THIRD PARTIES',
    term: 'Hold it back',
    detail: 'Memory is not sent to models routed to outside providers unless you turn that on.',
  },
  {
    kind: 'DELETION',
    term: 'Remove anything',
    detail: 'Delete any entry. It lives in this browser, so clearing site data clears all of it.',
  },
];

const MECHANICS = [
  {
    step: '01',
    term: 'Remember',
    line: 'Context worth keeping.',
    detail: 'Hey Open remembers useful preferences, projects, decisions, and details.',
  },
  {
    step: '02',
    term: 'Unify',
    line: 'One memory across models.',
    detail: 'Your context isn’t stuck in one model or one conversation.',
  },
  {
    step: '03',
    term: 'Retrieve',
    line: 'The right context, when you need it.',
    detail: 'Hey Open brings back what matters for the conversation you’re having now.',
  },
  {
    step: '04',
    term: 'Control',
    line: 'You decide what stays.',
    detail: 'Keep control over what your AI remembers and what it can use.',
  },
];

const STACK_MODELS = ['OA', 'AN', 'GG', 'DS'];
const STACK_FACTS = ['Preferences', 'Projects', 'Decisions', 'Context'];

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
              letterSpacing: '0.04em',
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

function Eyebrow({ children }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        color: '#FF6600',
        mb: 2.5,
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: '#FF6600',
          boxShadow: '0 0 10px #FF6600',
        }}
      />
      {children}
    </Box>
  );
}

function CatGlyph({ name }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg viewBox="0 0 20 20" width={18} height={18} aria-hidden="true" style={{ display: 'block' }}>
      {name === 'sliders' && (
        <>
          <path d="M3 6h14M3 14h14" {...s} />
          <circle cx="8" cy="6" r="2.1" {...s} />
          <circle cx="13" cy="14" r="2.1" {...s} />
        </>
      )}
      {name === 'layers' && (
        <>
          <path d="M10 2.5L2.5 6.5L10 10.5L17.5 6.5L10 2.5Z" {...s} />
          <path d="M2.5 10.5L10 14.5L17.5 10.5" {...s} />
          <path d="M2.5 14L10 18L17.5 14" {...s} />
        </>
      )}
      {name === 'note' && (
        <>
          <path d="M4 2.5h8.5L16 6v11.5H4V2.5z" {...s} />
          <path d="M12.5 2.5V6H16" {...s} />
          <path d="M6.5 9.5h7M6.5 12.5h5" {...s} />
        </>
      )}
      {name === 'check' && (
        <>
          <circle cx="10" cy="10" r="7.5" {...s} />
          <path d="M7 10.2l2.2 2.2 4.1-4.4" {...s} />
        </>
      )}
    </svg>
  );
}

function Drop({ delay = 0, height = 24 }) {
  return (
    <Box
      sx={{
        position: 'relative',
        mx: 'auto',
        display: 'block',
        height,
        width: '1px',
        overflow: 'hidden',
        backgroundColor: 'var(--border-normal)',
      }}
      aria-hidden="true"
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FF6600',
          boxShadow: '0 0 8px #FF6600',
          animation: 'travelY 2.2s ease-in-out infinite',
          animationDelay: `${delay}ms`,
          '@keyframes travelY': {
            '0%': { transform: 'translateY(-100%)' },
            '50%, 100%': { transform: 'translateY(100%)' },
          },
        }}
      />
    </Box>
  );
}

function MemoryStack() {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: { xs: '20px', md: '28px' },
        backgroundColor: isDark ? 'rgba(14, 16, 21, 0.8)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark
          ? '0 20px 50px -10px rgba(0, 0, 0, 0.6)'
          : '0 20px 50px -10px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          mb: 4,
        }}
      >
        Architecture
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* You Badge */}
        <Box
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: '9999px',
            border: '1px solid var(--border-normal)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            color: 'var(--text-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          You (Local Device)
        </Box>

        <Drop height={26} />

        {/* Your Universal Memory Container */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 580,
            borderRadius: '16px',
            p: { xs: 2.5, sm: 3 },
            border: '1px solid rgba(255, 102, 0, 0.45)',
            background: isDark
              ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.12) 0%, rgba(255, 102, 0, 0.03) 100%)'
              : 'linear-gradient(180deg, rgba(255, 102, 0, 0.08) 0%, rgba(255, 102, 0, 0.02) 100%)',
            boxShadow: '0 14px 36px -12px rgba(255, 102, 0, 0.35)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
            <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#FF6600' }}>
              Your Universal Memory Layer
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Encrypted & Local
            </Typography>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {STACK_FACTS.map((f) => (
              <Box
                key={f}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                {f}
              </Box>
            ))}
          </Box>
        </Box>

        <Drop delay={200} height={26} />

        {/* Relevant context filtered slice */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 380,
            borderRadius: '12px',
            border: '1px dashed var(--border-strong)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            px: 3,
            py: 1.5,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Relevant Context (Only what prompt needs)
          </Typography>
        </Box>

        {/* Branching Lines Out to Models */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 440, mt: 0 }} aria-hidden="true">
          <Drop delay={400} height={18} />
          <Box
            sx={{
              position: 'absolute',
              left: '12.5%',
              right: '12.5%',
              top: 18,
              height: '1px',
              backgroundColor: 'var(--border-normal)',
            }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STACK_MODELS.map((code, i) => (
              <Drop key={code} delay={520 + i * 120} height={18} />
            ))}
          </Box>
        </Box>

        {/* 4 Models Row */}
        <Box sx={{ display: 'grid', width: '100%', maxWidth: 440, gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {STACK_MODELS.map((code) => (
            <Box key={code} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <BrandTile code={code} size={34} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {MODEL_NAMES[code] || code}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography component="div" sx={{ mt: 4.5, textAlign: 'center', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Models come and go.{' '}
          <Box component="span" sx={{ fontWeight: 700, color: '#FF6600' }}>
            Your memory stays with you.
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default function MemoryPage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <PageMeta
        title="Universal Memory — One Context Across Every AI Model | Hey Open"
        description="Say it once, every model knows. Your preferences, active projects, and decisions live in one private memory layer, independent of which model you chat with."
        path="/memory"
      />

      <PageHeader />

      {/* Ambient background glow streak — warm memory layer */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 720,
          background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255, 102, 0, 0.15) 0%, rgba(255, 80, 0, 0.04) 55%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Warm left accent */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: '10%',
          left: 0,
          width: { xs: 250, md: 400 },
          height: 400,
          background: 'radial-gradient(ellipse 80% 70% at 0% 0%, rgba(255, 140, 0, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Section 1: Hero Showcase with Portable Memory Image ─ */}
        <Box sx={{ pt: { xs: 14, sm: 16, md: 18 }, pb: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.1fr) minmax(0,0.9fr)' },
              alignItems: 'center',
            }}
          >
            {/* Left Copy */}
            <Reveal>
              <Eyebrow>UNIVERSAL MEMORY</Eyebrow>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 3,
                }}
              >
                Say it once.{' '}
                <Box component="span" sx={{ color: '#FF6600' }}>
                  Pick up anywhere.
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: '56ch',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4,
                }}
              >
                Your preferences, projects, and context stay with you, even when you switch models.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5, mb: 5 }}>
                <Box
                  component="a"
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 4.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.38), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 40px rgba(255,102,0,0.52)',
                    },
                    '&:active': { transform: 'scale(0.98)' },
                  }}
                >
                  Try Memory ↓
                </Box>

                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    px: 3.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-glass)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: '#FF6600',
                      color: '#FF6600',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255,102,0,0.12)',
                    },
                  }}
                >
                  Start a Chat →
                </Box>
              </Box>

              <SpecLine
                items={['PRIVATE BY DEFAULT', 'CROSS-MODEL MEMORY', 'YOUR MEMORY, YOURS']}
                sx={{ pt: 3, borderTop: '1px solid var(--border-subtle)' }}
              />
            </Reveal>

            {/* Right: the memory layer itself. One store, read by every model,
                which is the claim the headline makes. */}
            <Reveal delay={120}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: { xs: '16px', md: '20px' },
                  p: { xs: 2.5, sm: 3.5 },
                  backgroundColor: isDark ? 'rgba(18, 21, 28, 0.55)' : 'rgba(255, 255, 255, 0.52)',
                  backdropFilter: 'blur(28px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: isDark
                    ? '0 22px 55px -24px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.13)'
                    : '0 22px 55px -26px rgba(15, 23, 42, 0.22), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)',
                  // Specular sheen across the top edge, the way light sits on glass
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: isDark
                      ? 'linear-gradient(158deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 42%)'
                      : 'linear-gradient(158deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 46%)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 2.5,
                  }}
                >
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
                    <Typography
                      sx={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Universal memory
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      px: 1.4,
                      py: 0.4,
                      borderRadius: '9999px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      color: '#FF6600',
                      backgroundColor: 'rgba(255,102,0,0.1)',
                      border: '1px solid rgba(255,102,0,0.3)',
                    }}
                  >
                    Encrypted on device
                  </Typography>
                </Box>

                {/* The store, showing the four kinds of thing the copy names */}
                <Box
                  sx={{
                    position: 'relative',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {[
                    ['Preference', 'Concise answers'],
                    ['Active project', 'Payments API rewrite'],
                    ['Constraint', 'Postgres, not Mongo'],
                    ['Decision', 'Stripe over Adyen'],
                  ].map(([label, value], i) => (
                    <Box
                      key={label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.3,
                        py: 1.35,
                        borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexShrink: 0, color: '#FF6600' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </Box>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
                        {label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.82rem',
                          color: 'var(--text-secondary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* One store fanning out to every model */}
                <Box aria-hidden="true" sx={{ position: 'relative', height: 44 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      width: '2px',
                      height: 21,
                      ml: '-1px',
                      backgroundColor: 'rgba(255,102,0,0.45)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '12.5%',
                      right: '12.5%',
                      top: 21,
                      height: '2px',
                      backgroundColor: 'rgba(255,102,0,0.45)',
                    }}
                  />
                  {['12.5%', '37.5%', '62.5%', '87.5%'].map((x) => (
                    <Box
                      key={x}
                      sx={{
                        position: 'absolute',
                        left: x,
                        top: 21,
                        width: '2px',
                        height: 23,
                        ml: '-1px',
                        backgroundColor: 'rgba(255,102,0,0.45)',
                      }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                  }}
                >
                  {[
                    ['AN', 'Claude'],
                    ['OA', 'GPT-4o'],
                    ['GG', 'Gemini'],
                    ['DS', 'DeepSeek'],
                  ].map(([code, name]) => (
                    <Box key={code} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <BrandTile code={code} size={34} />
                      <Typography
                        sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography
                  sx={{
                    position: 'relative',
                    mt: 3,
                    pt: 2.5,
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  Written once. Read by every model you switch to.
                </Typography>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 2: Interactive Demo ───────────────────────── */}
        <Box component="section" id="demo" sx={{ scrollMarginTop: '96px', pb: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Box sx={{ ...LEAD_BLOCK, mb: { xs: 5, md: 7 } }}>
                <Eyebrow>SAME CONTEXT. DIFFERENT MODEL.</Eyebrow>
                <Typography
                  component="h2"
                  sx={{ ...LEAD_H2, whiteSpace: { md: 'nowrap' } }}
                >
                  Switch models. Keep the context.
                </Typography>
                <Typography sx={LEAD_COPY}>
                  Tell one model. Pick up with another. Hey Open brings the right context with you, so you don’t have to explain everything again.
                </Typography>
              </Box>
            </Reveal>

            <Reveal delay={80}>
              <MemoryChatDemo />
            </Reveal>

            <Reveal delay={140} sx={{ mt: 3.5, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#FF6600' }}>
                New model. Same context.
              </Typography>
            </Reveal>

            {/* A label rather than a sentence. The paragraph that was here
                listed the same four things the columns name underneath, and
                sat hard against the rule with nothing between them. */}
            <Reveal delay={200}>
              <Typography
                sx={{
                  mt: { xs: 7, md: 10 },
                  mb: 2.5,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                What carries over
              </Typography>
            </Reveal>

            {/* Records, not a table and not cards. The index gives the block
                scale and a rhythm to read down; the entries are filled rather
                than outlined so the real memories carry the weight. */}
            <Box>
              {REMEMBERS.map((cat, i) => (
                <Reveal key={cat.term} delay={i * 60}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: 'auto 1fr', md: 'auto minmax(0, 1fr) minmax(0, 20rem)' },
                      alignItems: { md: 'center' },
                      columnGap: { xs: 2.5, md: 4 },
                      rowGap: 1.5,
                      py: { xs: 3, md: 3.5 },
                      borderTop: '1px solid var(--border-normal)',
                    }}
                  >
                    <Typography
                      sx={{
                        gridRow: { xs: 'span 2', md: 'auto' },
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: 'var(--border-strong)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Typography>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 700, color: 'var(--text-heading)', mb: 0.6 }}>
                        {cat.term}
                      </Typography>
                      <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                        {cat.detail}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        gridColumn: { xs: '2', md: 'auto' },
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.8,
                        justifyContent: { md: 'flex-end' },
                      }}
                    >
                      {cat.entries.map((entry) => (
                        <Typography
                          key={entry}
                          sx={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-section-alt)',
                            px: 1.4,
                            py: 0.6,
                            borderRadius: '10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {entry}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>


        {/* ── Section 3: What you can change ───────────────────────── */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              {/* Centred, because the window it introduces is centred under it. */}
              <Box sx={{ ...LEAD_BLOCK, mb: { xs: 5, md: 7 } }}>
                <Eyebrow>YOURS TO CHANGE</Eyebrow>
                <Typography
                  component="h2"
                  sx={{ ...LEAD_H2, whiteSpace: { md: 'nowrap' } }}
                >
                  You decide what it keeps.
                </Typography>
                <Typography sx={LEAD_COPY}>
                  Nothing is remembered behind your back. Every entry is yours to read, add to or
                  delete, and memory never leaves your browser unless you allow it.
                </Typography>
              </Box>
            </Reveal>

            <Reveal delay={110}>
              <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
                <MemorySettingsPanel />
              </Box>
            </Reveal>

            <Reveal delay={190}>
              {/* A ruled grid on dark, continuing the pane above rather than
                  starting a new light block under it. The lines are the
                  structure, so no cell carries a border of its own. */}
              <Box
                sx={{
                  mt: { xs: 5, md: 7 },
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  backgroundColor: CTRL.shell,
                  borderRadius: { xs: '18px', md: '22px' },
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px -28px rgba(15, 23, 42, 0.45)',
                }}
              >
                {CONTROLS.map((c, i) => (
                  <Box
                    key={c.term}
                    sx={{
                      p: { xs: 3, md: 3.75 },
                      display: 'flex',
                      flexDirection: 'column',
                      borderTop: {
                        xs: i === 0 ? 'none' : `1px solid ${CTRL.line}`,
                        sm: i < 2 ? 'none' : `1px solid ${CTRL.line}`,
                        lg: 'none',
                      },
                      borderLeft: {
                        xs: 'none',
                        sm: i % 2 === 0 ? 'none' : `1px solid ${CTRL.line}`,
                        lg: i === 0 ? 'none' : `1px solid ${CTRL.line}`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 3 }}>
                      <Typography
                        sx={{
                          fontFamily: '"Roboto Mono", ui-monospace, monospace',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.16em',
                          color: '#FF6600',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {c.kind}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Roboto Mono", ui-monospace, monospace',
                          fontSize: '0.7rem',
                          letterSpacing: '0.12em',
                          color: CTRL.inkDim,
                        }}
                      >
                        {String(i + 1).padStart(3, '0')}
                      </Typography>
                    </Box>

                    <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.28rem' }, fontWeight: 700, letterSpacing: '-0.01em', color: CTRL.ink, mb: 1.4, textWrap: 'balance' }}>
                      {c.term}
                    </Typography>

                    <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.65, color: CTRL.inkMid, textWrap: 'pretty' }}>
                      {c.detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 4: What makes it different ─────────────────── */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Box sx={{ ...LEAD_BLOCK, mb: { xs: 5, md: 7 } }}>
                <Eyebrow>WHY UNIVERSAL MEMORY</Eyebrow>
                <Typography
                  component="h2"
                  sx={{ ...LEAD_H2, whiteSpace: { md: 'nowrap' } }}
                >
                  Most AI memory{' '}
                  <Box component="span" sx={{ color: '#FF6600' }}>
                    stops at the app.
                  </Box>
                </Typography>
                <Typography sx={LEAD_COPY}>
                  Switch apps or models, and suddenly you’re explaining yourself all over again.
                </Typography>
              </Box>
            </Reveal>

            <Reveal delay={80}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  borderRadius: { xs: '14px', md: '16px' },
                  overflow: 'hidden',
                  border: '1px solid var(--border-normal)',
                }}
              >
                {[
                  {
                    label: 'WITHOUT UNIVERSAL MEMORY',
                    ours: false,
                    points: [
                      'Every model starts from scratch.',
                      'Your context stays scattered.',
                      'You repeat the same details.',
                      'Switching models means starting over.',
                    ],
                  },
                  {
                    label: 'WITH UNIVERSAL MEMORY',
                    ours: true,
                    points: [
                      'Pick up where you left off.',
                      'Context follows the conversation.',
                      'Important details stay available.',
                      'Switch models without starting over.',
                    ],
                  },
                ].map((col) => (
                  <Box
                    key={col.label}
                    sx={{
                      p: { xs: 2.5, sm: 3.5 },
                      backgroundColor: col.ours ? 'rgba(255, 102, 0, 0.05)' : 'transparent',
                      borderLeft: { md: col.ours ? '1px solid var(--border-normal)' : 'none' },
                      borderTop: { xs: col.ours ? '1px solid var(--border-normal)' : 'none', md: 'none' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: col.ours ? '#FF6600' : 'var(--text-muted)',
                        pb: 2.5,
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      {col.label}
                    </Typography>

                    {col.points.map((point, i) => (
                      <Box
                        key={point}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.6,
                          py: { xs: 2, md: 2.35 },
                          borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                        }}
                      >
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            flexShrink: 0,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: col.ours ? '#FFFFFF' : 'var(--text-muted)',
                            backgroundColor: col.ours ? '#FF6600' : 'transparent',
                            border: col.ours ? 'none' : '1px solid var(--border-normal)',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            {col.ours ? (
                              <polyline points="20 6 9 17 4 12" />
                            ) : (
                              <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </>
                            )}
                          </svg>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.95rem',
                            lineHeight: 1.5,
                            fontWeight: col.ours ? 600 : 400,
                            color: col.ours ? 'var(--text-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 5: Architecture & Mechanics ───────────────── */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Box sx={{ ...LEAD_BLOCK, mb: { xs: 5, md: 7 } }}>
                <Eyebrow>HOW UNIVERSAL MEMORY WORKS</Eyebrow>
                <Typography
                  component="h2"
                  sx={LEAD_H2}
                >
                  Your memory belongs to you.<br />
                  <Box component="span" sx={{ color: '#FF6600' }}>
                    Not the model.
                  </Box>
                </Typography>
                <Typography sx={LEAD_COPY}>
                  Your context lives in one private memory that works across models. Switch models, and the right context comes with you.
                </Typography>
              </Box>
            </Reveal>

            {/* Architecture Stack */}
            <Reveal delay={80} sx={{ mb: 4 }}>
              <MemoryStack />
            </Reveal>

            {/* 4 Connected Mechanics Steps */}
            <Reveal delay={140}>
              <Box
                sx={{
                  borderRadius: { xs: '20px', md: '24px' },
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-normal)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                }}
              >
                {MECHANICS.map((item, i) => (
                  <Box
                    key={item.term}
                    sx={{
                      p: { xs: 3, sm: 3.5 },
                      position: 'relative',
                      borderBottom: { xs: '1px solid var(--border-subtle)', sm: i < 2 ? '1px solid var(--border-subtle)' : 'none', lg: 'none' },
                      borderRight: { lg: i < 3 ? '1px solid var(--border-subtle)' : 'none', sm: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', mb: 1.5, letterSpacing: '0.04em' }}>
                      {item.step} · {item.term}
                    </Typography>
                    <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                      {item.line}
                    </Typography>
                    <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </Typography>

                    {i < MECHANICS.length - 1 && (
                      <Box
                        sx={{
                          display: { xs: 'none', lg: 'flex' },
                          position: 'absolute',
                          right: -12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: isDark ? '#161922' : '#FFFFFF',
                          border: '1px solid var(--border-normal)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-secondary)',
                          fontSize: '0.75rem',
                        }}
                      >
                        →
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 6: Bottom Cinematic CTA Banner ─────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 14 } }}>
          <Reveal>
            {/* Weight from the fill and the size of it, not from a glow. The
                corner is 20px, which is the page's own, rather than the 48px
                it had. */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                px: { xs: 3, sm: 6, md: 10 },
                py: { xs: 6, sm: 8, md: 11 },
                borderRadius: '20px',
                backgroundColor: 'var(--bg-section-alt)',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 1.5,
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  mb: 3,
                }}
              >
                <Box component="span">Universal Memory</Box>
                <Box component="span" aria-hidden="true">·</Box>
                <Box component="span">Private by default</Box>
                <Box component="span" aria-hidden="true">·</Box>
                <Box component="span">Works across models</Box>
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '22ch',
                  mb: 2.5,
                }}
              >
                Stop starting over with AI.
              </Typography>

              <Typography
                sx={{
                  maxWidth: '54ch',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4.5,
                }}
              >
                Keep your projects, preferences, and context with you, no matter which model you use next.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={getPrimaryCtaSx(isDark)}
                >
                  Start Chatting with Memory →
                </Box>
                <Link href="/models" passHref style={{ textDecoration: 'none' }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'var(--text-primary)',
                      px: 4,
                      py: 1.8,
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-glass)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        color: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    See every model
                  </Box>
                </Link>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
