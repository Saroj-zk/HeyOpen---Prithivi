import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MemoryIcon from '@mui/icons-material/Memory';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import StorageIcon from '@mui/icons-material/Storage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useThemeMode } from '@/context/ThemeContext';
import ProductDemo from '@/components/ProductDemo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  window.ScrollTrigger = ScrollTrigger;
}

const TABS = [
  {
    id: 'multimodel',
    label: 'Multi-Model',
    icon: AutoAwesomeIcon,
    tagline: '200+ models, optimized for every request.',
    description: 'Choose any model yourself, or let Auto match each request to the right model and optimize token usage, so every task uses only what it needs.',
    hasExplore: true,
    exploreLink: '/models',
    video: '/Videos/Why Openledger/Multimodel & Token.webm',
    demo: 'multimodel',
    tags: ['200+ Models', 'Auto Routing', 'Token Optimized'],
  },
  {
    id: 'memory',
    label: 'Universal Memory',
    fullLabel: 'Universal Memory',
    shortLabel: 'Memory',
    icon: MemoryIcon,
    tagline: 'One memory. You decide what stays.',
    description: 'Switch models without losing context. Delete any memory you don’t want kept, or turn memory off so it isn’t used.',
    hasExplore: true,
    exploreLink: '/memory',
    video: '/Videos/Why Openledger/Unified Memory.webm',
    demo: 'memory',
    tags: ['One Memory', 'Full Control'],
  },
  {
    id: 'private',
    label: 'Private AI',
    fullLabel: 'Private AI',
    shortLabel: 'Private AI',
    icon: LockIcon,
    tagline: 'Private and uncensored, from the start.',
    description: 'Ask anything without your prompts being stored, used for training, or tied back to you.',
    hasExplore: true,
    exploreLink: '/private',
    video: '/Videos/Why Openledger/Private AI.webm',
    tags: ['Zero Retention', 'Uncensored'],
  },
  {
    id: 'agents',
    label: 'Built for agents. x402 native.',
    fullLabel: 'Built for Agents',
    shortLabel: 'Agents',
    icon: SmartToyIcon,
    tagline: 'Give your agents more ways to get things done.',
    description: 'Connect agents to leading models through one API, with x402-ready access for agent-to-agent interactions and transactions.',
    hasExplore: false,
    exploreLink: '/token',
    video: '/Videos/Why Openledger/Built For Agents.webm',
    tags: ['x402 Enabled', 'Agent Ready'],
  },
];

/* All four clips sit in this section at once and crossfade. On plain autoPlay
   every one of them loops for the whole visit, off screen included, which is
   four decodes competing with the scroll. Only the visible one runs. */
const TabClip = ({ src, play }) => {
  const ref = React.useRef(null);
  const [primed, setPrimed] = React.useState(false);

  React.useEffect(() => {
    if (play) setPrimed(true);
  }, [play]);

  React.useEffect(() => {
    const v = ref.current;
    if (!v || !primed) return;
    if (play) v.play().catch(() => {});
    else v.pause();
  }, [play, primed]);

  return (
    <Box
      component="video"
      ref={ref}
      src={primed ? src : undefined}
      loop
      muted
      playsInline
      preload="none"
      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};

export default function CoreFeaturesSection() {
  const { isDark } = useThemeMode();
  const [activeTab, setActiveTab] = React.useState(0);
  const [pressedIndex, setPressedIndex] = React.useState(null);
  const [isPressing, setIsPressing] = React.useState(false);
  const pressTargetRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const pinContainerRef = React.useRef(null);
  const imageContainerRef = React.useRef(null);
  const tabBarRef = React.useRef(null);
  const pillRef = React.useRef(null);
  const imageRefs = React.useRef([]);
  const scrollTriggerRef = React.useRef(null);
  const lastActiveTabRef = React.useRef(0);
  const isClickingRef = React.useRef(false);

  // Helper to get exact horizontal offset of each tab button relative to tab 0
  const getTabPositions = React.useCallback(() => {
    if (typeof document === 'undefined') return [0, 0, 0, 0];
    const b0 = document.getElementById('tab-btn-0');
    const b1 = document.getElementById('tab-btn-1');
    const b2 = document.getElementById('tab-btn-2');
    const b3 = document.getElementById('tab-btn-3');
    if (!b0 || !b1 || !b2 || !b3) {
      const w = tabBarRef.current ? (tabBarRef.current.offsetWidth - 12) / 4 : 0;
      return [0, w, w * 2, w * 3];
    }
    const x0 = b0.offsetLeft;
    return [
      0,
      b1.offsetLeft - x0,
      b2.offsetLeft - x0,
      b3.offsetLeft - x0,
    ];
  }, []);

  // Liquid Glass pointer press handler: swells pill, thins fill, sinks item contents, opens refraction
  const handlePointerDown = (idx) => {
    setPressedIndex(idx);
    setIsPressing(true);
    pressTargetRef.current = idx;

    // Immediately place the pill under the finger before activation
    if (pillRef.current) {
      const positions = getTabPositions();
      gsap.to(pillRef.current, {
        x: positions[idx] || 0,
        duration: 0.18,
        ease: 'power2.out',
      });
    }

    const release = () => {
      setIsPressing(false);
      setPressedIndex(null);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
  };

  /* Nothing in here needs to be playing until the section is close. */
  const [clipsLive, setClipsLive] = React.useState(false);
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setClipsLive(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => setClipsLive(e.isIntersecting), {
      rootMargin: '1400px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Initialize GSAP ScrollTrigger for pinning and scroll-based tab navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinContainerRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (isClickingRef.current) return;
          const p = self.progress;
          let idx = 0;
          if (p >= 0.75) {
            idx = 3;
          } else if (p >= 0.50) {
            idx = 2;
          } else if (p >= 0.25) {
            idx = 1;
          } else {
            idx = 0;
          }
          if (idx !== lastActiveTabRef.current) {
            lastActiveTabRef.current = idx;
            setActiveTab(idx);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [getTabPositions]);

  // Synchronize pill position and feature cards smoothly whenever activeTab changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Move pill with organic spring & stretch to the active tab
    if (pillRef.current && tabBarRef.current) {
      const positions = getTabPositions();
      const targetX = positions[activeTab] || 0;
      gsap.to(pillRef.current, {
        x: targetX,
        duration: 0.42,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.fromTo(
        pillRef.current,
        { scaleX: 1.14, scaleY: 0.92 },
        { scaleX: 1, scaleY: 1, duration: 0.38, ease: 'back.out(1.8)' }
      );
    }

    // 2. Crossfade feature card panels so activeTab is always 100% visible
    imageRefs.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === activeTab) {
        gsap.to(panel, {
          opacity: 1,
          scale: 1,
          duration: 0.42,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(panel, {
          opacity: 0,
          scale: 0.98,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  }, [activeTab, getTabPositions]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    lastActiveTabRef.current = index;

    if (!scrollTriggerRef.current) return;

    isClickingRef.current = true;
    const trigger = scrollTriggerRef.current;
    const scrollDistance = trigger.end - trigger.start;

    const TAB_DWELL_PROGRESS = [
      0.05,
      0.35,
      0.65,
      0.92,
    ];
    const targetScroll = trigger.start + TAB_DWELL_PROGRESS[index] * scrollDistance;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, {
        duration: 0.8,
        onComplete: () => {
          isClickingRef.current = false;
        },
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    }
  };

  return (
    <Box
      ref={sectionRef}
      id="core-features"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '330vh' },
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Pinned Viewport Container - Perfectly fits within 100vh */}
      <Box
        ref={pinContainerRef}
        sx={{
          position: { xs: 'relative', md: 'sticky' },
          top: 0,
          height: { xs: 'auto', md: '100vh' },
          maxHeight: { md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 6, md: 3 },
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
          {/* Top Pill Badge: • WHY HEY OPEN */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.6 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.9,
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-pill)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Removed dot */}
              <Typography
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Why Hey Open
              </Typography>
            </Box>
          </Box>

          {/* Two-Column Header matching content from design */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-start' },
              justifyContent: 'space-between',
              gap: { xs: 2, md: 4 },
              mb: { xs: 2.5, md: 3.2 },
            }}
          >
            {/* Headline: From multi-model access to private, uncensored AI. */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.5rem', md: '2.85rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                maxWidth: 640,
              }}
            >
              <Box component="span" sx={{ color: 'var(--text-heading)', display: 'block' }}>
                From multi-model access to
              </Box>
              <Box component="span" sx={{ color: 'var(--text-secondary)', display: 'block' }}>
                private, uncensored AI.
              </Box>
            </Typography>

            {/* Subtitle from design */}
            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                fontSize: { xs: '0.92rem', md: '1rem' },
                lineHeight: 1.6,
                maxWidth: 440,
                pt: { md: 0.8 },
              }}
            >
              Choose from 200+ models, keep your conversations private, explore without unnecessary restrictions, and carry your context wherever you go.
            </Typography>
          </Box>

          {/* Apple Liquid Glass Floating Tab Bar with Lens Optics & Stretching Pill */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 840 },
              mx: 'auto',
              mb: { xs: 2.2, md: 3 },
            }}
          >
            <Box
              ref={tabBarRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: 58,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                p: '6px',
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(20, 24, 30, 0.48)' : 'rgba(255, 255, 255, 0.45)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(8px) saturate(180%)',
                boxShadow: isDark
                  ? '0 20px 45px -12px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.22), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
                  : '0 20px 45px -12px rgba(15, 23, 42, 0.09), 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.03)',
                boxSizing: 'border-box',
                userSelect: 'none',
              }}
            >
              {/* Apple Liquid Glass Nested Lens Pill with subtle #ff6600 accent tint */}
              <Box
                ref={pillRef}
                sx={{
                  position: 'absolute',
                  top: '6px',
                  bottom: '6px',
                  left: '6px',
                  width: 'calc((100% - 12px) / 4)',
                  height: 46,
                  borderRadius: '9999px',
                  backgroundColor: isPressing
                    ? (isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.1)')
                    : (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)'),
                  background: isPressing
                    ? (isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.1)')
                    : (isDark
                      ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)'),
                  backdropFilter: 'blur(16px)',
                  border: isDark
                    ? '1px solid rgba(255, 102, 0, 0.28)'
                    : '1px solid rgba(255, 102, 0, 0.2)',
                  boxShadow: isPressing
                    ? (isDark
                      ? '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.25)'
                      : '0 4px 12px rgba(15, 23, 42, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.95)')
                    : (isDark
                      ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3), inset 0 -0.5px 1px rgba(0, 0, 0, 0.3)'
                      : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)'),
                  transform: isPressing ? 'scale(1.02, 1.15)' : 'scale(1, 1)',
                  transition: 'background 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  willChange: 'transform, left',
                  pointerEvents: 'none',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Specular curved lens rim highlight with warm orange touch */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '12%',
                    right: '12%',
                    height: '2px',
                    background: isDark
                      ? 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.6), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.45), transparent)',
                    borderRadius: '9999px',
                    opacity: isPressing ? 1 : 0.85,
                    transition: 'opacity 0.2s ease',
                  }}
                />
              </Box>

              {TABS.map((tab, idx) => {
                const isActive = activeTab === idx;
                const isItemPressed = pressedIndex === idx;
                const IconComponent = tab.icon;
                return (
                  <Box
                    key={tab.id}
                    id={`tab-btn-${idx}`}
                    data-tabbar-press
                    onPointerDown={() => handlePointerDown(idx)}
                    onClick={() => handleTabClick(idx)}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      height: 46,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: { xs: 0.5, sm: 1.2 },
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: isActive
                        ? '#ff6600'
                        : (isDark ? 'rgba(255, 255, 255, 0.55)' : '#64748B'),
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: isActive ? '#ff6600' : (isDark ? '#FFFFFF' : '#1E293B'),
                      },
                    }}
                  >
                    {/* The sink target: contents sink under finger press */}
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: { xs: 0.5, sm: 0.8 },
                        transform: isItemPressed ? 'scale(0.9)' : 'scale(1)',
                        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
                        pointerEvents: 'none',
                        width: '100%',
                      }}
                    >
                      {IconComponent && (
                        <IconComponent
                          sx={{
                            fontSize: { xs: '1.05rem', sm: '1.18rem' },
                            flexShrink: 0,
                            color: isActive
                              ? '#ff6600'
                              : (isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8'),
                            transition: 'color 0.2s ease',
                          }}
                        />
                      )}
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Inter", -apple-system, sans-serif',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: { xs: '0.72rem', sm: '0.82rem', md: '0.86rem' },
                          lineHeight: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          letterSpacing: '-0.01em',
                          color: isActive ? '#ff6600' : 'inherit',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                          {tab.fullLabel || tab.label}
                        </Box>
                        <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
                          {tab.shortLabel || tab.label}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Feature Display Container - Fluid, Silky Crossfading Panels */}
          <Box
            ref={imageContainerRef}
            sx={{
              position: 'relative',
              width: '100%',
              borderRadius: { xs: '16px', md: '22px' },
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              backgroundColor: 'var(--bg-card)',
              /* Fixed only where the panels are stacked absolutely. Below
                 md a single panel is in flow and sets the height itself,
                 otherwise tall mobile content spills past the border. */
              height: { xs: 'auto', md: '500px' },
              maxHeight: { md: '56vh' },
            }}
          >
            {TABS.map((tab, idx) => (
              <Box
                key={tab.id}
                ref={(el) => (imageRefs.current[idx] = el)}
                sx={{
                  position: { xs: 'static', md: 'absolute' },
                  inset: { md: 0 },
                  width: '100%',
                  height: { xs: 'auto', md: '100%' },
                  /* Only the active panel exists below md, so the
                     container can size to it. */
                  display: { xs: activeTab === idx ? 'flex' : 'none', md: 'flex' },
                  flexDirection: { xs: 'column', md: 'row-reverse' },
                  gap: { xs: 2, md: 4 },
                  p: { xs: 2.2, sm: 3.2, md: 3.8 },
                  boxSizing: 'border-box',
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'scale(1)' : 'scale(0.98)',
                  willChange: 'opacity, transform',
                  pointerEvents: activeTab === idx ? 'auto' : 'none',
                }}
              >
                {/* Corner Brackets matching reference aesthetic */}
                <Box sx={{ position: 'absolute', top: 10, left: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┌</Box>
                <Box sx={{ position: 'absolute', top: 10, right: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┐</Box>
                <Box sx={{ position: 'absolute', bottom: 10, left: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>└</Box>
                <Box sx={{ position: 'absolute', bottom: 10, right: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┘</Box>

                {/* Left Column: Video */}
                <Box sx={{ flex: 1, height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  {/* Two of these are built rather than recorded, so they stay
                      sharp at any size and match the app as it ships. */}
                  {tab.demo ? (
                    <ProductDemo flow={tab.demo} active={activeTab === idx} />
                  ) : (
                    <TabClip src={tab.video} play={activeTab === idx && clipsLive} />
                  )}
                </Box>

                {/* Right Column: Content */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { xs: 0, md: 2 } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.45rem', md: '1.8rem' },
                      fontWeight: 700,
                      color: 'var(--text-heading)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      mb: 1.5,
                    }}
                  >
                    {tab.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      mb: 1.5,
                    }}
                  >
                    {tab.tagline}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      mb: 4,
                    }}
                  >
                    {tab.description}
                  </Typography>

                  {tab.hasExplore && (
                    <Box
                      component="a"
                      href={tab.exploreLink || '/models'}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.6,
                        color: '#ff6600',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'opacity 0.2s, transform 0.2s',
                        '&:hover': { opacity: 0.8, transform: 'translateX(2px)' },
                        mb: 4,
                      }}
                    >
                      EXPLORE &rarr;
                    </Box>
                  )}
                  {/* Tags */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                      columnGap: 3,
                      rowGap: 0.75,
                      alignItems: 'center',
                      pt: 2,
                      borderTop: '1px solid var(--border-subtle)',
                      mt: 'auto'
                    }}
                  >
                    {tab.tags.map((tag) => (
                      <Typography
                        key={tag}
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: 'var(--text-secondary)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
