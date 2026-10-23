import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import HeroChatBox from './HeroChatBox';
import TrustBadges from './TrustBadges';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Two backgrounds, switchable from the corner of the hero. */
const BACKDROPS = [
  { src: '/images/hero-bg-1.webp', label: 'First background' },
  { src: '/images/hero-bg-2.webp', label: 'Second background' },
];

export default function HeroSection() {
  const [prompt, setPrompt] = React.useState('');
  const [backdrop, setBackdrop] = React.useState(0);
  const rootRef = React.useRef(null);
  const curvePathRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      tl.fromTo(
        '#hero-headline',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      )
        /* There is no subtitle element in this hero, and SuggestionChips is
           not rendered here, so the tweens for both are gone rather than
           firing at nothing. */
        .fromTo(
          '#hero-chat-container',
          { y: 24, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.85 },
          '-=0.5'
        )
        .fromTo(
          '#hero-trust-badges',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          '-=0.45'
        );

      // Scroll-driven bottom curve: curves inward as hero scrolls off, then flattens back
      const curveObj = { val: 0 };
      const maxCurve = 140;

      const updatePath = (v) => {
        if (curvePathRef.current) {
          const cy = 150 - v;
          curvePathRef.current.setAttribute(
            'd',
            `M 0,150 Q 720,${cy} 1440,150 L 1440,155 L 0,155 Z`
          );
        }
      };

      const curveTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      curveTl
        .to(curveObj, {
          val: maxCurve,
          ease: 'power2.out',
          duration: 0.5,
          onUpdate: () => updatePath(curveObj.val),
        })
        .to(curveObj, {
          val: 0,
          ease: 'power2.in',
          duration: 0.5,
          onUpdate: () => updatePath(curveObj.val),
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSelectPrompt = (samplePrompt) => {
    setPrompt(samplePrompt);
    // Auto-focus input
    setTimeout(() => {
      const inputEl = document.querySelector('#hero-chat-container textarea');
      if (inputEl) {
        inputEl.focus();
      }
    }, 50);
  };

  return (
    <Box
      ref={rootRef}
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${BACKDROPS[backdrop].src})`,
        transition: 'background-image 0.4s ease',
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#EEF0F0',
        overflow: 'hidden',
        pt: { xs: 7, sm: 9, md: 11 },
        pb: 2,
      }}
    >
      {/* Main Content Area */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          my: 'auto',
          py: { xs: 1.5, md: 3 },
        }}
      >
        {/* Headline with Icon */}
        <Box id="hero-headline" sx={{ mb: { xs: 3, sm: 4 }, opacity: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="img"
              src="/Icons/Frosted logo OPL.png"
              alt="Hey Open"
              sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, objectFit: 'contain' }}
            />
          </Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Inter", -apple-system, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.035em',
              color: 'rgb(71, 85, 105)',
              display: 'block',
            }}
          >
            Hey Open..
          </Typography>
        </Box>

        {/* Interactive Chat Box matching openledger_chat. The id is what
            the intro timeline animates. */}
        <Box id="hero-chat-container">
          <HeroChatBox
            prompt={prompt}
            setPrompt={setPrompt}
          />
        </Box>
      </Container>

      {/* Backdrop switch. Small, in the corner, and it does something. */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 14, md: 26 },
          bottom: { xs: 96, sm: 126, md: 192 },
          zIndex: 11,
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          p: 0.65,
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
        }}
      >
        {BACKDROPS.map((b, i) => {
          const on = backdrop === i;
          return (
            <Box
              key={b.src}
              component="button"
              type="button"
              aria-label={b.label}
              aria-pressed={on}
              onClick={() => setBackdrop(i)}
              sx={{
                width: 20,
                height: 20,
                p: 0,
                flexShrink: 0,
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundImage: `url(${b.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: on ? '2px solid #FF6600' : '2px solid rgba(255, 255, 255, 0.9)',
                outline: 'none',
                transition: 'border-color 0.25s ease, transform 0.25s ease',
                '&:hover': { transform: 'scale(1.08)' },
              }}
            />
          );
        })}
      </Box>

      {/* Trust Badges */}
      <Box id="hero-trust-badges">
        <TrustBadges />
      </Box>

      {/* Dynamic Curved Bottom Divider - Curves inwards on scroll and flattens back */}
      <Box
        id="hero-curve-container"
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          height: { xs: 80, sm: 110, md: 150 },
          pointerEvents: 'none',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            ref={curvePathRef}
            id="hero-curve-path"
            d="M 0,150 Q 720,150 1440,150 L 1440,155 L 0,155 Z"
            fill="var(--hero-curve-fill, #0A0C10)"
          />
        </svg>
      </Box>
    </Box>
  );
}
