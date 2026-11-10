import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, FormatTile } from '@/components/ui/LedgerUI';
import { CAPABILITIES } from '@/data/capabilities';
import { MODELS, countByKind } from '@/data/catalog';
import { useThemeMode } from '@/context/ThemeContext';
import PageMeta from '@/components/PageMeta';

function modelsFor(kind) {
  const list = MODELS.filter((m) => m.kind === kind);
  return kind === 'audio' ? [...list, ...MODELS.filter((m) => m.kind === 'music')] : list;
}

function countFor(kind) {
  return kind === 'audio' ? countByKind('audio') + countByKind('music') : countByKind(kind);
}

export default function CapabilitiesPage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <PageMeta
        title="Capabilities — Text, Photoreal Images, Voice & Video | Hey Open"
        description="Uncensored chat, photoreal image synthesis, speech-to-speech audio, and cinematic video. All private, with one subscription across 50+ models."
        path="/capabilities"
      />

      <PageHeader />

      {/* Ambient background glow streak — dual layer */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 750,
          background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255, 102, 0, 0.18) 0%, rgba(255, 60, 0, 0.06) 55%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Secondary soft blue-purple ambient accent */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%) translateX(-300px)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(100, 120, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Section 1: Hero Showcase ───────────────────────────── */}
        <Box sx={{ pt: { xs: 14, sm: 16, md: 18 }, pb: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                color: '#FF6600',
                mb: 3,
                px: 1.8,
                py: 0.6,
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 102, 0, 0.08)',
                border: '1px solid rgba(255, 102, 0, 0.25)',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              Full Multimodal AI Studio
            </Box>

            <Typography
              component="h1"
              sx={{
                maxWidth: '22ch',
                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--text-heading)',
                mb: 3,
              }}
            >
              Uncensored chat, photoreal images,{' '}
              <Box component="span" sx={{ color: '#FF6600' }}>
                voice & video.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: '64ch',
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                mb: 4.5,
              }}
            >
              Text, code, photoreal images, voice, video, and live search in one unified studio. One subscription, one persistent memory across every model, and complete zero-retention privacy.
            </Typography>

            {/* Quick jump pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 }}>
              {[
                { label: 'Image Synthesis', href: '#image', count: '10+ models', emoji: '🖼' },
                { label: 'Chat & Reasoning', href: '#text', count: '28+ models', emoji: '💬' },
                { label: 'Voice & Audio', href: '#audio', count: '8+ models', emoji: '🎙' },
                { label: 'Cinematic Video', href: '#video', count: '6+ models', emoji: '🎬' },
                { label: 'Autonomous Agents', href: '#agents', count: 'x402 Ready', emoji: '⚡' },
              ].map((item) => (
                <Box
                  key={item.label}
                  component="a"
                  href={item.href}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    px: 2.2,
                    py: 1,
                    borderRadius: '9999px',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    border: '1px solid var(--border-normal)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: '#FF6600',
                      color: '#FF6600',
                      backgroundColor: 'rgba(255, 102, 0, 0.06)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255,102,0,0.18)',
                    },
                  }}
                >
                  <span>{item.label}</span>
                  <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Primary CTA + secondary */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5, mb: 4 }}>
              <Box
                component="a"
                href="https://ais.openledger.xyz/chat"
                target="_blank"
                rel="noopener noreferrer"
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
                Start Creating &#8594;
              </Box>
              <Box
                component="a"
                href="#image"
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
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  '&:hover': {
                    borderColor: '#FF6600',
                    color: '#FF6600',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Explore Capabilities &#8595;
              </Box>
            </Box>

            {/* Stat badges row */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3.5, pt: 2.5, borderTop: '1px solid var(--border-subtle)' }}>
              {[
                { value: '200+', label: 'Frontier Models' },
                { value: '1', label: 'Subscription' },
                { value: '0s', label: 'Data Retention' },
                { value: '∞', label: 'Modalities' },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)', mt: 0.4, fontWeight: 500 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 2: Image Generation Showcase ──────────────── */}
        <Box component="section" id="image" sx={{ scrollMarginTop: '6rem', py: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ pt: 6, pb: 4 }}>
            <Reveal>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <FormatTile kind="image" size={32} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Image Generation & Inpainting • 10+ Models
                </Typography>
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '24ch',
                }}
              >
                Describe what you envision. Render in seconds.
              </Typography>
              <Typography sx={{ mt: 1.5, maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Photoreal portraits, magazine editorials, 3D product renders, and concept art. Edit specific regions with precision masking or produce endless high-fidelity variations.
              </Typography>
            </Reveal>

            {/* Visual Bento Gallery of Real Generated Art */}
            <Box
              sx={{
                mt: 5,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {[
                {
                  img: '/images/imagine_magazine.jpg',
                  title: 'Editorial Haute Couture',
                  prompt: 'Vogue editorial in a brutalist concrete archive with sculptural lighting',
                  model: 'FLUX.1 [dev]',
                  tag: 'Photoreal 2K',
                },
                {
                  img: '/images/imagine_portrait.jpg',
                  title: 'Studio Cinematic Portrait',
                  prompt: 'Close-up studio portrait with 85mm lens, volumetric backlight and natural skin texture',
                  model: 'Midjourney v6',
                  tag: 'Hyper-detailed',
                },
                {
                  img: '/images/imagine_sneaker.jpg',
                  title: 'Biomimetic Product Concept',
                  prompt: 'Futuristic biomimetic runner with translucent sole and carbon fiber weaves',
                  model: 'FLUX.1 [schnell]',
                  tag: 'Industrial Design',
                },
              ].map((item, idx) => (
                <Reveal key={item.title} delay={idx * 100}>
                  <Box
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-card)',
                      boxShadow: isDark ? '0 16px 36px rgba(0,0,0,0.5)' : '0 10px 25px rgba(15,23,42,0.06)',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      '&:hover': {
                        borderColor: '#FF6600',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 45px rgba(255,102,0,0.2)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 260 }}>
                      <Box
                        component="img"
                        src={item.img}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                          '&:hover': { transform: 'scale(1.04)' },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          px: 1.4,
                          py: 0.4,
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(12px)',
                          color: '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {item.tag}
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          right: 12,
                          px: 1.4,
                          py: 0.4,
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255,102,0,0.9)',
                          color: '#fff',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        {item.model}
                      </Box>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.8 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                        "{item.prompt}"
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>

            {/* Model badges pill list */}
            <Box sx={{ mt: 3.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', mr: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Supported Image Models:
              </Typography>
              {modelsFor('image').map((m) => (
                <Box
                  key={m.name}
                  sx={{
                    borderRadius: '9999px',
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-card)',
                    px: 1.8,
                    py: 0.6,
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {m.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Section 3: Text, Code & Reasoning Showcase ────────── */}
        <Box component="section" id="text" sx={{ scrollMarginTop: '6rem', py: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ pt: 6, pb: 4 }}>
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 6, lg: 8 },
                gridTemplateColumns: { lg: 'minmax(0,1fr) minmax(0,1fr)' },
                alignItems: 'center',
              }}
            >
              {/* Left Copy */}
              <Reveal>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <FormatTile kind="text" size={32} />
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Chat, Code & Deep Reasoning • 28+ Models
                  </Typography>
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    maxWidth: '22ch',
                  }}
                >
                  Unfiltered logic and chain-of-thought proofs.
                </Typography>
                <Typography sx={{ mt: 2, maxWidth: '56ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 3.5 }}>
                  Feed complex math proofs, entire Git repositories, legal briefs, and financial models. Switch instantly between DeepSeek R1, Claude 3.5 Sonnet, and GPT-4o with zero lost context.
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mb: 4 }}>
                  {[
                    ['1M+ Tokens Context', 'Ingest entire codebases & video transcripts'],
                    ['Deep Chain of Thought', 'Mathematical proofs and planning logic'],
                    ['Live Web Grounding', 'Citations and real-time verifiable sources'],
                    ['Zero Content Censorship', 'Research sensitive topics without blocks'],
                  ].map(([head, sub]) => (
                    <Box key={head} sx={{ p: 2, borderRadius: 2.5, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                      <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', mb: 0.3 }}>
                        {head}
                      </Typography>
                      <Typography sx={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {sub}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {modelsFor('text').slice(0, 8).map((m) => (
                    <Box
                      key={m.name}
                      sx={{
                        borderRadius: '9999px',
                        border: '1px solid var(--border-normal)',
                        backgroundColor: 'var(--bg-card)',
                        px: 1.6,
                        py: 0.5,
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {m.name}
                    </Box>
                  ))}
                  <Link href="/models" passHref style={{ textDecoration: 'none' }}>
                    <Box
                      component="span"
                      sx={{
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255,102,0,0.1)',
                        border: '1px solid rgba(255,102,0,0.3)',
                        px: 1.6,
                        py: 0.5,
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#FF6600',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      +20 more →
                    </Box>
                  </Link>
                </Box>
              </Reveal>

              {/* Right Visual Image Card */}
              <Reveal delay={120}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid var(--border-normal)',
                    boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 12px 35px rgba(15,23,42,0.08)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/chat_feature_bg.jpg"
                    alt="Hey Open Chat and Reasoning Feature"
                    sx={{
                      width: '100%',
                      height: 380,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(10,12,16,0.92) 90%)',
                      p: 3.5,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.6,
                        py: 0.5,
                        borderRadius: '9999px',
                        backgroundColor: '#FF6600',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: 'fit-content',
                        mb: 1.5,
                      }}
                    >
                      Reasoning Benchmark #1
                    </Box>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', mb: 0.5 }}>
                      DeepSeek R1 + Claude 3.5 Sonnet
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                      Competitive programming, competitive math, and automated bug bounties without filtering restrictions.
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Box>
          </Box>
        </Box>

        {/* ── Section 4: Voice & Audio Showcase ─────────────────── */}
        <Box component="section" id="audio" sx={{ scrollMarginTop: '6rem', py: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ pt: 6, pb: 4 }}>
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 6, lg: 8 },
                gridTemplateColumns: { lg: 'minmax(0,0.95fr) minmax(0,1.05fr)' },
                alignItems: 'center',
              }}
            >
              {/* Left Visual Card */}
              <Reveal>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid var(--border-normal)',
                    boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 12px 35px rgba(15,23,42,0.08)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/voice_orb.jpg"
                    alt="Hey Open Voice and Audio Synthesis"
                    sx={{
                      width: '100%',
                      height: 380,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      right: 16,
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: isDark ? 'rgba(10,12,16,0.85)' : 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--border-normal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          boxShadow: '0 0 10px #10B981',
                        }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                          Speech-to-Speech Engine
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          Ultra-low latency: &lt; 280ms
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.4,
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255,102,0,0.15)',
                        color: '#FF6600',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      Real-Time
                    </Box>
                  </Box>
                </Box>
              </Reveal>

              {/* Right Copy */}
              <Reveal delay={110}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <FormatTile kind="audio" size={32} />
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Speech In, Speech Out & Music
                  </Typography>
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    maxWidth: '22ch',
                  }}
                >
                  Real-time voice conversations without round-trip latency.
                </Typography>
                <Typography sx={{ mt: 2, maxWidth: '56ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 4 }}>
                  Turn multilingual recordings into flawless text, talk naturally with human-like vocal inflection, or generate full instrumental soundscapes from a written brief.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, mb: 4 }}>
                  {[
                    ['Transcribe', 'Over 90 languages handled accurately, accents and noisy conference rooms included.'],
                    ['Speech-to-Speech', 'Fluid voice conversation in a single streaming call, ideal for voice agents.'],
                    ['Music & Soundscapes', 'Full instrumental compositions with precise tempo, mood, and genre controls.'],
                  ].map(([title, desc]) => (
                    <Box key={title} sx={{ p: 2, borderRadius: 2.5, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.4 }}>
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Reveal>
            </Box>
          </Box>
        </Box>

        {/* ── Section 5: Cinematic Video Showcase ───────────────── */}
        <Box component="section" id="video" sx={{ scrollMarginTop: '6rem', py: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ pt: 6, pb: 4 }}>
            <Reveal>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <FormatTile kind="video" size={32} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Generative Video & World Models • 6+ Models
                </Typography>
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '24ch',
                }}
              >
                Clips from a written brief. Seamless physics & sound.
              </Typography>
              <Typography sx={{ mt: 1.5, maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Render video clips from textual prompts with camera control, realistic lighting physics, and automated audio effects generated in sync.
              </Typography>
            </Reveal>

            {/* Split Scenery Cards */}
            <Box
              sx={{
                mt: 5,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 3,
              }}
            >
              {[
                {
                  img: '/images/scenery_alpine.jpg',
                  title: 'Aerial Alpine Flyover',
                  desc: 'Photoreal dynamic camera pan across snow-capped peaks with volumetric fog and morning sun rays.',
                  model: 'Luma Dream Machine',
                },
                {
                  img: '/images/scenery_cliffs.jpg',
                  title: 'Coastal Dramatic Surge',
                  desc: 'Crashing ocean breakers against black basalt cliffs with accurate fluid dynamics and sound FX.',
                  model: 'Runway Gen-3',
                },
              ].map((item, idx) => (
                <Reveal key={item.title} delay={idx * 100}>
                  <Box
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-card)',
                      boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15,23,42,0.06)',
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 260 }}>
                      <Box
                        component="img"
                        src={item.img}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          left: 12,
                          px: 1.6,
                          py: 0.5,
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(12px)',
                          color: '#fff',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        {item.model}
                      </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.8 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Section 6: Autonomous Agents (x402) Showcase ──────── */}
        <Box component="section" id="agents" sx={{ scrollMarginTop: '6rem', py: { xs: 8, md: 12 } }}>
          <Rule />
          <Box sx={{ pt: 6, pb: 4 }}>
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
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    color: '#FF6600',
                    mb: 2,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                  x402 Micropayments Protocol
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    maxWidth: '24ch',
                  }}
                >
                  Built for Autonomous Agents.
                </Typography>
                <Typography sx={{ mt: 2, maxWidth: '58ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 4 }}>
                  Enable coding agents, scraping pipelines, and autonomous assistants to call any AI model dynamically without API keys or credit card limits. Streaming payments settle via the x402 standard per request.
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mb: 4 }}>
                  {[
                    ['Zero API Keys Needed', 'Direct agent-to-protocol authentication'],
                    ['Per-Token Micropayments', 'Stream fractions of a cent as tokens generate'],
                    ['Cross-Model Handoffs', 'Pass agent state between Claude and Gemini'],
                    ['Built-in Guardrails', 'Granular spending caps and sandbox isolation'],
                  ].map(([title, sub]) => (
                    <Box key={title} sx={{ p: 2, borderRadius: 2.5, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', mb: 0.3 }}>
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {sub}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Reveal>

              {/* Right Visual Image Card */}
              <Reveal delay={120}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid var(--border-normal)',
                    boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 12px 35px rgba(15,23,42,0.08)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/agent_feature_bg.jpg"
                    alt="Hey Open Autonomous Agent Infrastructure"
                    sx={{
                      width: '100%',
                      height: 380,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(10,12,16,0.92) 90%)',
                      p: 3.5,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.6,
                        py: 0.5,
                        borderRadius: '9999px',
                        backgroundColor: '#FF6600',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: 'fit-content',
                        mb: 1.5,
                      }}
                    >
                      Agent Ready • Python / JS SDK
                    </Box>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', mb: 0.5 }}>
                      Connect Once. Route Everywhere.
                    </Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                      Standardized endpoints compatible with LangChain, LlamaIndex, AutoGPT, and custom agent runtimes.
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Box>
          </Box>
        </Box>

        {/* ── Section 7: Bottom Cinematic CTA Banner ─────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 14 } }}>
          <Reveal>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: 4, md: 6 },
                p: { xs: 4, sm: 6, md: 8 },
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                boxShadow: isDark
                  ? '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,102,0,0.15)'
                  : '0 20px 45px rgba(15,23,42,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Background ambient radial glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 102, 0, 0.16) 0%, rgba(255, 102, 0, 0.02) 70%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 2,
                  py: 0.6,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.1)',
                  border: '1px solid rgba(255, 102, 0, 0.3)',
                  color: '#FF6600',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Every Modality • One Unified Thread
              </Box>

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
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Ready to unleash the full frontier of AI capabilities?
              </Typography>

              <Typography
                sx={{
                  maxWidth: '54ch',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Text, images, voice, video, and agents — all waiting in one private studio. Get started in seconds with zero sign-up friction.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.45)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 44px rgba(255,102,0,0.55)',
                    },
                  }}
                >
                  Start Creating Now →
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
                    View All 200+ Models
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
