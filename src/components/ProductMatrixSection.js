import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/context/ThemeContext';
import useInView from '@/utils/useInView';
import { useReveal, revealSx } from '@/utils/reveal';
import ProductDemo from '@/components/ProductDemo';

// Icons
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

const OPTIONS = [
  {
    id: 'chat',
    title: 'Chat',
    icon: ChatBubbleOutlineRoundedIcon,
    video: '/Videos/AI ecosystem/Chat.mp4',
    fastUntil: 16,
    fastRate: 3.2,
    overlayEyebrow: 'CONVERSATIONAL INTELLIGENCE',
    overlayTitle: 'Contextual dialogue\nwithout boundaries.',
  },
  {
    id: 'imagine',
    title: 'Imagine',
    icon: ImageOutlinedIcon,
    video: '/Videos/AI ecosystem/Image generation new.mp4',
    overlayEyebrow: 'VISUAL GENERATION',
    overlayTitle: 'State-of-the-art multi-modal\ncreative synthesis.',
  },
  {
    id: 'video-gen',
    title: 'Video Gen',
    icon: PlayCircleOutlineRoundedIcon,
    video: '/Videos/AI ecosystem/video gen new.mp4',
    overlayEyebrow: 'VIDEO GENERATION',
    overlayTitle: 'High-fidelity video\nand motion synthesis.',
  },
  {
    id: 'build',
    title: 'Build',
    icon: CodeRoundedIcon,
    video: '/Videos/AI ecosystem/Build.webm',
    overlayEyebrow: 'CUSTOM INTEGRATIONS',
    overlayTitle: 'Create and deploy models\nseamlessly.',
  },
  {
    id: 'agent',
    title: 'Agent',
    icon: SmartToyOutlinedIcon,
    video: '/Videos/AI ecosystem/Agent.webm',
    demo: 'agent',
    overlayEyebrow: 'AUTONOMOUS EXECUTION',
    overlayTitle: 'Intelligent reconciliation\nand proactive action.',
  },
];

const GlassCard = ({ children, sx = {}, borderRadius = 24, ...props }) => {
  const { isDark } = useThemeMode();
  return (
    <Box
      sx={{
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)',
        borderRadius: `${borderRadius}px`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

const TabVideo = ({ src, isActive, primed, canPlay, onEnded, fastUntil = 0, fastRate = 1 }) => {
  const videoRef = React.useRef(null);

  /* timeupdate fires often enough to switch at the boundary, and reading
     currentTime means the rate resets correctly when the clip loops. */
  const pace = React.useCallback(
    (e) => {
      if (!fastUntil) return;
      const want = e.target.currentTime < fastUntil ? fastRate : 1;
      if (e.target.playbackRate !== want) e.target.playbackRate = want;
    },
    [fastUntil, fastRate]
  );

  /* Restart from the top each time the tab is selected, as before. */
  React.useEffect(() => {
    if (isActive && videoRef.current) videoRef.current.currentTime = 0;
  }, [isActive]);

  /* Decode only the clip that is both selected and on screen. The tabs cycle on
     a timer, so without the second condition this keeps running while the
     reader is somewhere else on the page. */
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !primed) return;
    if (isActive && canPlay) {
      v.play().catch((e) => console.log('Video play error:', e));
    } else {
      v.pause();
    }
  }, [isActive, canPlay, primed]);

  return (
    <Box
      component="video"
      ref={videoRef}
      /* No src until this tab is next in line. Attaching all five on mount
         starts ~58MB of parallel download during the first scroll. */
      src={primed ? src : undefined}
      muted
      preload="none"
      onEnded={onEnded}
      onTimeUpdate={pace}
      onLoadedMetadata={pace}
      playsInline
      sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
    />
  );
};

export default function ProductMatrixSection() {
  const { isDark } = useThemeMode();
  const [activeIdx, setActiveIdx] = React.useState(0);
  const activeTab = OPTIONS[activeIdx];

  /* The margin gives the clips a screen and a half of runway, so the one on
     show has already buffered by the time the section arrives. */
  const [sectionRef, sectionInView] = useInView('1400px');

  const [headRef, headShown] = useReveal();
  const [gridRef, gridShown] = useReveal();

  /* Fetch the clip on show plus the one the cycle moves to next, and keep
     anything already fetched. */
  const [primed, setPrimed] = React.useState({});
  React.useEffect(() => {
    if (!sectionInView) return;
    setPrimed((prev) => {
      const next = (activeIdx + 1) % OPTIONS.length;
      if (prev[activeIdx] && prev[next]) return prev;
      return { ...prev, [activeIdx]: true, [next]: true };
    });
  }, [sectionInView, activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % OPTIONS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + OPTIONS.length) % OPTIONS.length);
  };

  return (
    <Box
      component="section"
      id="ecosystem"
      ref={sectionRef}
      sx={{
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        py: { xs: 8, md: 12 },
        transition: 'background-color 0.35s ease',
        fontFamily: '"Inter", "Roboto", sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Soft background glow for glass effect enhancement */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(100,150,255,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, md: 4 } }}>
        {/* Top Header */}
        <Box ref={headRef} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: { xs: 4, md: 6 }, ...revealSx(headShown) }}>
          <Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#CD7A4C' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#CD7A4C' }}>
                What you can do
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
              Unfiltered. <br /> From Chat to Code.
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 360, mt: { xs: 2, md: 0 }, lineHeight: 1.5 }}>
            One workspace for chat, gen, audio, and search. Unrestricted on purpose.
          </Typography>
        </Box>

        {/* 4 Feature Value Highlights (Hidden as requested) */}
        <Grid container spacing={3} sx={{ display: 'none', mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <GlassCard sx={{ p: 2.5, borderRadius: '24px' }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: 'var(--bg-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <BoltRoundedIcon sx={{ fontSize: '1rem', color: '#EAB308' }} />
              </Box>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', mb: 0.5 }}>Rapid Inference</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Low-latency streaming responses optimized for high-throughput enterprise execution.</Typography>
            </GlassCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <GlassCard sx={{ p: 2.5, borderRadius: '24px' }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: 'var(--bg-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <AppsRoundedIcon sx={{ fontSize: '1rem', color: '#10B981' }} />
              </Box>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', mb: 0.5 }}>Multi-Agent Cohesion</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Deploy swarms of specialized agents that share universal memory and state instantly.</Typography>
            </GlassCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <GlassCard sx={{ p: 2.5, borderRadius: '24px' }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: 'var(--bg-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <BarChartRoundedIcon sx={{ fontSize: '1rem', color: '#EC4899' }} />
              </Box>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', mb: 0.5 }}>Token Optimization</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Cut inference overhead by up to 60% through proactive smart routing and context pruning.</Typography>
            </GlassCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <GlassCard sx={{ p: 2.5, borderRadius: '24px' }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: 'var(--bg-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <SecurityOutlinedIcon sx={{ fontSize: '1rem', color: '#3B82F6' }} />
              </Box>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', mb: 0.5 }}>Total Privacy</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Interact securely and anonymously without compromising your enterprise data or identity.</Typography>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid ref={gridRef} container spacing={3} alignItems="stretch" sx={{ flexGrow: 1, ...revealSx(gridShown, 120) }}>

          {/* Left Sidebar */}
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <GlassCard sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: { xs: 2, md: 3 }, borderRadius: '32px' }}>

              <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, px: 1, mb: 4 }}>
                The fastest way to build, govern, and scale enterprise AI agents.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1.2 }}>
                {OPTIONS.map((opt, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <Box
                      key={opt.id}
                      onClick={() => setActiveIdx(idx)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        backdropFilter: 'blur(8px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                        backgroundColor: isActive
                          ? (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)')
                          : 'transparent',
                        background: isActive
                          ? (isDark
                            ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)')
                          : 'transparent',
                        border: isActive
                          ? (isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.22)')
                          : '1px solid transparent',
                        boxShadow: isActive
                          ? (isDark
                            ? '0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35), inset 0 0 0 0.5px rgba(255, 102, 0, 0.28)'
                            : '0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 1), inset 0 0 0 0.5px rgba(255, 102, 0, 0.18)')
                          : 'none',
                        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        '&:hover': {
                          backgroundColor: isActive ? undefined : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)'),
                          borderColor: isActive ? undefined : (isDark ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.15)'),
                          '& .opt-title, & .opt-icon, & .opt-chevron': { color: '#ff6600' }
                        },
                        '&:active': {
                          transform: 'scale(0.96)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <opt.icon className="opt-icon" sx={{ fontSize: '1.2rem', color: isActive ? '#ff6600' : 'var(--text-secondary)', transition: 'color 0.2s' }} />
                        <Typography className="opt-title" sx={{ fontSize: '1rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#ff6600' : 'var(--text-heading)', transition: 'color 0.2s' }}>
                          {opt.title}
                        </Typography>
                      </Box>
                      <ChevronRightRoundedIcon className="opt-chevron" sx={{ fontSize: '1.1rem', color: isActive ? '#ff6600' : 'var(--text-secondary)', opacity: isActive ? 1 : 0.4, transition: 'all 0.2s' }} />
                    </Box>
                  );
                })}
              </Box>

              <Box
                component="a"
                href="https://ais.openledger.xyz/chat"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: 'none',
                  mt: 4,
                  width: '100%',
                  py: 1.5,
                  px: 3,
                  borderRadius: '9999px',
                  backgroundColor: '#ff6600',
                  color: '#ffffff',
                  border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 8px 32px rgba(255, 102, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    backgroundColor: '#e65c00',
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 12px 36px rgba(255, 102, 0, 0.45), 0 0 20px rgba(255, 102, 0, 0.2)'
                      : '0 12px 36px rgba(255, 102, 0, 0.35), 0 0 20px rgba(255, 102, 0, 0.2)',
                  },
                  '&:active': {
                    transform: 'scale(0.96)',
                  }
                }}
              >
                <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, letterSpacing: '0.02em', color: '#ffffff' }}>Explore Platform</Typography>
                <ArrowForwardRoundedIcon sx={{ fontSize: '1.25rem', color: '#ffffff' }} />
              </Box>
            </GlassCard>
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>

            {/* Image Display */}
            <Box sx={{ position: 'relative', flexGrow: 1, minHeight: { xs: '300px', md: '350px' }, borderRadius: '32px', overflow: 'hidden', backgroundColor: 'var(--bg-page)' }}>
              {OPTIONS.map((opt, idx) => (
                <Box
                  key={opt.id}
                  sx={{
                    position: 'absolute', inset: 0,
                    opacity: activeIdx === idx ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: activeIdx === idx ? 'auto' : 'none'
                  }}
                >
                  {opt.demo ? (
                    <ProductDemo flow={opt.demo} active={activeIdx === idx} />
                  ) : (
                    <TabVideo
                      src={opt.video}
                      isActive={activeIdx === idx}
                      primed={!!primed[idx]}
                      canPlay={sectionInView}
                      onEnded={handleNext}
                      fastUntil={opt.fastUntil}
                      fastRate={opt.fastRate}
                    />
                  )}
                </Box>
              ))}
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
