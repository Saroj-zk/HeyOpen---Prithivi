import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useThemeMode } from '@/context/ThemeContext';
import useInView from '@/utils/useInView';
import { useReveal, revealSx } from '@/utils/reveal';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

export default function PricingSection() {
  const { isDark } = useThemeMode();

  /* Below lg the wrapper is display:none, but a hidden <video> still downloads
     and decodes, so the clip waits on the observer either way. An element that
     is display:none never reports as intersecting, which is what keeps it off
     small screens entirely. */
  const [headRef, headShown] = useReveal();
  /* The two columns reveal on their own. The row that holds them must not,
     because the clip between them blends with the page and a transform on an
     ancestor would cut it off from what it blends against. */
  const [leftRef, leftShown] = useReveal();
  const [rightRef, rightShown] = useReveal();
  const [payRef, payShown] = useReveal();

  const [clipRef, clipInView] = useInView('1000px');
  const clipVideoRef = React.useRef(null);

  /* Latched: once fetched, leaving the section pauses the clip instead of
     dropping the src, which would rewind it and log an empty-src warning. */
  const [clipLoaded, setClipLoaded] = React.useState(false);
  React.useEffect(() => {
    if (clipInView) setClipLoaded(true);
  }, [clipInView]);

  React.useEffect(() => {
    const v = clipVideoRef.current;
    if (!v || !clipLoaded) return;
    if (clipInView) v.play().catch(() => {});
    else v.pause();
  }, [clipInView, clipLoaded]);

  // Theme-adaptive colors
  const primaryText = isDark ? '#FFFFFF' : '#111111';
  const secondaryText = isDark ? '#9CA3AF' : '#667085';
  const mutedText = isDark ? '#6B7280' : '#9CA3AF';

  // Elevated Glassmorphic Settings
  const cardBg = isDark ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, rgba(248, 250, 252, 0.6) 100%)';
  const cardBorder = isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)';
  const cardShadow = isDark ? '0 12px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)' : '0 12px 32px rgba(15,23,42,0.04), inset 0 1px 1px rgba(255,255,255,1)';

  // SVG Icons
  const GptIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: '#10B981' }}>
      <path d="M9.20508 8.75799V6.49833C9.20508 6.30802 9.27651 6.16525 9.44292 6.07022L13.9861 3.45378C14.6046 3.09701 15.342 2.93059 16.103 2.93059C18.9572 2.93059 20.7651 5.14272 20.7651 7.49741C20.7651 7.66388 20.7651 7.85418 20.7412 8.04449L16.0316 5.28529C15.7462 5.11887 15.4607 5.11887 15.1753 5.28529L9.20508 8.75799ZM19.8135 17.5588V12.1593C19.8135 11.8262 19.6707 11.5884 19.3854 11.4219L13.4152 7.94921L15.3656 6.83121C15.5321 6.73618 15.6748 6.73618 15.8413 6.83121L20.3845 9.44765C21.6928 10.2089 22.5728 11.8262 22.5728 13.396C22.5728 15.2037 21.5025 16.8688 19.8135 17.5586V17.5588ZM7.80173 12.8017L5.85129 11.66C5.68488 11.565 5.61345 11.4222 5.61345 11.2319V5.99903C5.61345 3.45403 7.56388 1.52724 10.2042 1.52724C11.2033 1.52724 12.1307 1.86032 12.9159 2.45494L8.23008 5.16661C7.94474 5.33302 7.80197 5.57087 7.80197 5.904V12.8019L7.80173 12.8017ZM12 15.2278L9.20508 13.6579V10.3281L12 8.75824L14.7947 10.3281V13.6579L12 15.2278ZM13.7958 22.4588C12.7967 22.4588 11.8693 22.1257 11.0841 21.5311L15.7699 18.8194C16.0553 18.653 16.198 18.4151 16.198 18.082V11.1841L18.1724 12.3258C18.3388 12.4208 18.4102 12.5636 18.4102 12.7539V17.9868C18.4102 20.5318 16.4359 22.4586 13.7958 22.4586V22.4588ZM8.1585 17.1545L3.61528 14.5381C2.30696 13.7769 1.427 12.1596 1.427 10.5897C1.427 8.75824 2.52116 7.11704 4.20985 6.42719V11.8503C4.20985 12.1834 4.35267 12.4213 4.63801 12.5877L10.5846 16.0365L8.63415 17.1545C8.46773 17.2496 8.32492 17.2496 8.1585 17.1545ZM7.89701 21.0554C5.20918 21.0554 3.23491 19.0336 3.23491 16.5361C3.23491 16.3458 3.25875 16.1555 3.2824 15.9651L7.96819 18.6768C8.25353 18.8433 8.53912 18.8433 8.82446 18.6768L14.7947 15.228V17.4877C14.7947 17.678 14.7233 17.8207 14.5568 17.9158L10.0137 20.5322C9.39519 20.889 8.65779 21.0554 7.89676 21.0554H7.89701ZM13.7958 23.8858C16.6739 23.8858 19.0762 21.8403 19.6234 19.1286C22.2874 18.4388 24 15.9413 24 13.3962C24 11.7312 23.2865 10.1139 22.002 8.9483C22.121 8.44876 22.1923 7.94922 22.1923 7.44992C22.1923 4.0486 19.4331 1.50335 16.2458 1.50335C15.6037 1.50335 14.9852 1.59838 14.3668 1.81258C13.2962 0.765956 11.8215 0.0999985 10.2042 0.0999985C7.32608 0.0999985 4.92384 2.14546 4.37656 4.85713C1.71258 5.54698 0 8.04449 0 10.5895C0 12.2546 0.713497 13.8719 1.99797 15.0374C1.87905 15.537 1.80766 16.0365 1.80766 16.5359C1.80766 19.9372 4.56687 22.4824 7.75419 22.4824C8.3963 22.4824 9.01477 22.3874 9.63323 22.1732C10.7035 23.2198 12.1782 23.8858 13.7958 23.8858Z" />
    </svg>
  );

  const ClaudeIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: '#E47B5A' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.62 2.45a1.15 1.15 0 0 0-1.62.43L9.67 7.02 7.06 2.87a1.15 1.15 0 0 0-1.96 1.22l2.6 4.15-4.88-.63a1.15 1.15 0 0 0-.29 2.28l4.98.65-4.18 2.76a1.15 1.15 0 1 0 1.26 1.92l4.18-2.76-.83 5.01a1.15 1.15 0 0 0 2.27.38l.88-5.25 3.91 3.4a1.15 1.15 0 0 0 1.52-1.72l-3.86-3.36 4.93-.2a1.15 1.15 0 0 0 .1-2.3l-5.01.2 3.09-4.13a1.15 1.15 0 0 0-.76-1.86z" />
    </svg>
  );

  const GeminiIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#3B82F6' }}>
      <path d="M21.3995 10.7291C19.5505 9.93273 17.9332 8.84182 16.545 7.455C15.1582 6.06818 14.0659 4.44955 13.2709 2.60045C12.9668 1.89273 12.72 1.16318 12.5318 0.415909C12.4705 0.171818 12.2523 0 12 0C11.7477 0 11.5295 0.171818 11.4682 0.415909C11.28 1.16318 11.0345 1.89 10.7291 2.60045C9.93273 4.44955 8.84182 6.06818 7.455 7.455C6.06818 8.84045 4.44955 9.93273 2.60045 10.7291C1.89273 11.0332 1.16318 11.28 0.415909 11.4682C0.171818 11.5295 0 11.7477 0 12C0 12.2523 0.171818 12.4705 0.415909 12.5318C1.16318 12.72 1.89 12.9655 2.60045 13.2709C4.44955 14.0673 6.06682 15.1582 7.455 16.545C8.84182 17.9318 9.93409 19.5505 10.7291 21.3995C11.0345 22.1086 11.28 22.8368 11.4682 23.5841C11.4979 23.7027 11.5664 23.808 11.6627 23.8833C11.759 23.9587 11.8777 23.9997 12 24C12.2523 24 12.4705 23.8282 12.5318 23.5841C12.72 22.8368 12.9655 22.11 13.2709 21.3995C14.0673 19.5505 15.1582 17.9332 16.545 16.545C17.9318 15.1582 19.5505 14.0659 21.3995 13.2709C22.1086 12.9655 22.8368 12.72 23.5841 12.5318C23.7027 12.5021 23.808 12.4336 23.8833 12.3373C23.9587 12.241 23.9997 12.1223 24 12C24 11.7477 23.8282 11.5295 23.5841 11.4682C22.8368 11.28 22.11 11.0345 21.3995 10.7291Z" />
    </svg>
  );

  const GrokIcon = () => (
    <Box sx={{ width: 22, height: 22, backgroundColor: isDark ? '#FFF' : '#111', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: isDark ? '#000' : '#fff', strokeWidth: 2, strokeLinecap: 'round' }}>
        <line x1="4" y1="4" x2="20" y2="20" />
        <line x1="20" y1="4" x2="4" y2="20" />
      </svg>
    </Box>
  );

  const SubCard = ({ name, price, icon }) => (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      p: 2,
      backgroundColor: cardBg,
      border: cardBorder,
      borderRadius: '16px',
      boxShadow: cardShadow,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,102,0,0.15)' : '0 16px 40px rgba(255,102,0,0.12), inset 0 1px 1px rgba(255,255,255,1)',
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {icon}
        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: primaryText }}>
          {name}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: primaryText }}>
        ${price}
      </Typography>
    </Box>
  );

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        py: { xs: 10, md: 14 },
        transition: 'background-color 0.35s ease',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Decor */}
      <Box sx={{ position: 'absolute', top: -200, right: -200, width: 800, height: 800, background: 'radial-gradient(circle, rgba(255,102,0,0.03) 0%, transparent 60%)', zIndex: 0 }} />

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, position: 'relative' }}>

        {/* HERO HEADER */}
        <Box ref={headRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 10 }, ...revealSx(headShown) }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#ff6600', textTransform: 'uppercase', mb: 2 }}>
            One bill
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' }, lineHeight: 1.1, letterSpacing: '-0.02em', color: primaryText, mb: 2.5, textWrap: 'balance' }}>
            Stop paying for{' '}
            <Box component="span" sx={{ color: '#ff6600' }}>every AI separately.</Box>
          </Typography>
          {/* The figures are the ones the cards below show: eight of them at
              $165 the hard way against $20 here. $20 is what ChatGPT Plus,
              Claude Pro, Gemini Pro and Perplexity Pro each ask on their own,
              which is the comparison being drawn. It does not claim to undercut
              the cheapest, since Copilot is $10 and Runway $15.

              What the price includes belongs in the same sentence as the price,
              not on a line of its own: split out, it read as a separate boast
              rather than as part of what the $20 buys. Unlimited generation is
              the claim doing the work here, so it carries the weight in the
              heading ink, and uncensored keeps the orange, since that is the
              one none of those eight will sell at any price. Both are made
              elsewhere on the site already: uncensored on the Private AI and
              capabilities pages, unlimited on the $20 card below, which still
              says "messages" and says nothing about images. */}
          <Typography sx={{ color: secondaryText, fontSize: { xs: '1rem', md: '1.125rem' }, fontWeight: 500, maxWidth: 680, mx: 'auto', lineHeight: 1.65, textWrap: 'balance' }}>
            Separate subscriptions to ChatGPT, Claude, Gemini and the rest come to{' '}
            <Box component="span" sx={{ color: '#ff6600', fontWeight: 700 }}>$165 a month</Box>.
            All of them, and 200+ more, cost{' '}
            <Box component="span" sx={{ color: '#ff6600', fontWeight: 700 }}>$20</Box> here, with{' '}
            <Box component="span" sx={{ color: primaryText, fontWeight: 700 }}>
              unlimited text and image generation
            </Box>
            ,{' '}
            <Box component="span" sx={{ color: '#ff6600', fontWeight: 700 }}>uncensored</Box>.
          </Typography>

        </Box>

        {/* COMPARISON LAYOUT (Flex Node Graph) */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
          justifyContent: 'center',
          maxWidth: 1200,
          mx: 'auto',
          gap: { xs: 8, lg: 0 }
        }}>

          {/* LEFT COLUMN: Separate Subscriptions */}
          <Box ref={leftRef} sx={{ width: { xs: '100%', sm: 340 }, flexShrink: 0, position: 'relative', ...revealSx(leftShown, 120) }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: secondaryText, mb: 3, textAlign: 'center' }}>
              The Cost of Fragmentation
            </Typography>

            {/* Cards container: Auto-Scrolling Carousel */}
            <Box sx={{
              position: 'relative',
              height: 380,
              overflow: 'hidden',
              // Fade out top and bottom for a seamless entering/exiting effect
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}>
              <style>{`
                @keyframes verticalMarquee {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
              `}</style>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                // The total height of one set must be exactly exactly 50% of this container's scrolling height.
                // By duplicating the content, -50% translates exactly to the start of the second set!
                animation: 'verticalMarquee 15s linear infinite',
                '&:hover': {
                  animationPlayState: 'paused'
                }
              }}>
                {/* First Set */}
                <SubCard name="ChatGPT Plus" price="20" icon={<GptIcon />} />
                <SubCard name="Claude Pro" price="20" icon={<ClaudeIcon />} />
                <SubCard name="Gemini Pro" price="20" icon={<GeminiIcon />} />
                <SubCard name="Grok" price="30" icon={<GrokIcon />} />
                <SubCard name="Midjourney" price="30" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#5865F2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>M</Box>} />
                <SubCard name="Perplexity Pro" price="20" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#21B3A4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>P</Box>} />
                <SubCard name="GitHub Copilot" price="10" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>C</Box>} />
                <SubCard name="Runway Gen-2" price="15" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#FFD700', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '10px', fontWeight: 'bold' }}>R</Box>} />

                {/* Duplicated Second Set for Seamless Looping */}
                <SubCard name="ChatGPT Plus" price="20" icon={<GptIcon />} />
                <SubCard name="Claude Pro" price="20" icon={<ClaudeIcon />} />
                <SubCard name="Gemini Pro" price="20" icon={<GeminiIcon />} />
                <SubCard name="Grok" price="30" icon={<GrokIcon />} />
                <SubCard name="Midjourney" price="30" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#5865F2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>M</Box>} />
                <SubCard name="Perplexity Pro" price="20" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#21B3A4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>P</Box>} />
                <SubCard name="GitHub Copilot" price="10" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>C</Box>} />
                <SubCard name="Runway Gen-2" price="15" icon={<Box sx={{ width: 22, height: 22, backgroundColor: '#FFD700', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '10px', fontWeight: 'bold' }}>R</Box>} />
              </Box>
            </Box>

            {/* Total Summary */}
            <Box sx={{
              mt: 2, pt: 3, px: 2,
              borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em', color: secondaryText, textTransform: 'uppercase' }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: '2.8rem', fontWeight: 800, color: mutedText, lineHeight: 1 }}>
                  $165
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: mutedText }}>
                  /mo
                </Typography>
              </Box>

              {/* Embedded Badge */}
              <Box sx={{
                mt: 2,
                display: 'inline-flex', alignItems: 'center', gap: 1,
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                px: 2, py: 0.75, borderRadius: '99px',
                fontSize: '0.8rem', fontWeight: 600, color: secondaryText,
              }}>
                <span style={{ color: '#ff6600', fontWeight: 800 }}>100+</span> hidden subscriptions
              </Box>
            </Box>
          </Box>

          {/* MIDDLE BRIDGE: Video ONLY */}
          <Box ref={clipRef} sx={{
            flexGrow: 1,
            height: 380,
            mt: '38px',
            position: 'relative',
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            mx: { lg: 2 }, // Small margin to prevent literal overlapping of cards
            mixBlendMode: isDark ? 'screen' : 'multiply',
            filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none',
            overflow: 'hidden', // Crops the baked-in grey borders of the video
            borderRadius: '24px', // Soft rounded edges for the crop
          }}>
            <video
              ref={clipVideoRef}
              src={clipLoaded ? '/pricing_video.mp4' : undefined}
              loop
              muted
              playsInline
              preload="none"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // This stretches the video to touch the edges, cropping excess white padding
                pointerEvents: 'none',
                transform: 'scale(1.3)' // Scale significantly to push the MP4's built-in grey borders far outside the hidden overflow
              }}
            />
          </Box>

          {/* RIGHT COLUMN: Hey Open Pro Premium Card */}
          <Box ref={rightRef} sx={{ width: { xs: '100%', sm: 380 }, flexShrink: 0, position: 'relative', mt: { xs: 0, lg: '28px' }, ...revealSx(rightShown, 220) }}>
            <style>{`
              @keyframes floatCard {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              @keyframes spinBorder {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pulseGlow {
                0%, 100% { opacity: 0.4; filter: blur(12px); transform: scale(1); }
                50% { opacity: 0.7; filter: blur(20px); transform: scale(1.02); }
              }
            `}</style>

            <Box sx={{
              maxWidth: 380, mx: 'auto', position: 'relative',
              animation: 'floatCard 6s ease-in-out infinite'
            }}>

              {/* Animated Premium Glow Underlay */}
              <Box sx={{
                position: 'absolute', inset: -4,
                background: 'linear-gradient(180deg, #ff6600 0%, rgba(255,102,0,0) 100%)',
                borderRadius: '30px',
                animation: 'pulseGlow 4s ease-in-out infinite',
                zIndex: 0
              }} />

              {/* Animated Border Wrapper */}
              <Box sx={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '26px',
                p: '1px', // This acts as the border thickness
                overflow: 'hidden',
                boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 24px 48px rgba(255,102,0,0.15)'
              }}>
                {/* Rotating Conic Gradient */}
                <Box sx={{
                  position: 'absolute',
                  top: '-50%', left: '-50%', width: '200%', height: '200%',
                  background: isDark
                    ? 'conic-gradient(from 0deg, transparent 0 300deg, #ff6600 360deg)'
                    : 'conic-gradient(from 0deg, transparent 0 280deg, #ff6600 360deg)',
                  animation: 'spinBorder 4s linear infinite',
                  zIndex: 0
                }} />

                {/* The Card Inner Content */}
                <Box sx={{
                  background: isDark ? 'linear-gradient(180deg, rgba(30,20,15,0.92) 0%, rgba(15,20,25,0.96) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,250,248,0.98) 100%)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: '25px', // Slightly smaller than wrapper
                  p: { xs: 3, sm: 3 },
                  textAlign: 'left',
                  boxShadow: isDark ? 'inset 0 1px 1px rgba(255,102,0,0.2)' : 'inset 0 1px 1px rgba(255,255,255,1)',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex', flexDirection: 'column'
                }}>

                  {/* Top Header Row */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                      <span style={{ color: primaryText }}>HEY OPEN</span> <span style={{ color: '#ff6600' }}>PRO</span>
                    </Typography>
                    <Box sx={{
                      backgroundColor: 'rgba(255,102,0,0.1)',
                      border: '1px solid rgba(255,102,0,0.3)',
                      color: '#ff6600',
                      px: 1, py: 0.25, borderRadius: '99px',
                      fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: 0.5
                    }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: '0.8rem' }} /> Best value
                    </Box>
                  </Box>

                  {/* Price Block */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 900, color: primaryText, lineHeight: 1, letterSpacing: '-0.04em' }}>
                      $20
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>
                      / mo
                    </Typography>
                    <Typography sx={{ ml: 'auto', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.5 }}>
                      $165
                    </Typography>
                  </Box>

                  {/* Divider */}
                  <Box sx={{ height: '1px', width: '100%', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', mb: 2 }} />

                  {/* Feature List */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,102,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                        <CheckCircleRoundedIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: primaryText }}>All premium models included</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,102,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                        <CheckCircleRoundedIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: primaryText }}>Unified context & memory</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,102,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                        <CheckCircleRoundedIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: primaryText }}>Zero hidden API costs</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,102,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                        <CheckCircleRoundedIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: primaryText }}>Unlimited text &amp; image generation</Typography>
                    </Box>
                  </Box>

                  {/* CTA Button Inside Card */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: '12px',
                      py: 1.2,
                      fontSize: '1rem',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      textTransform: 'none',
                      backgroundColor: '#ff6600',
                      color: '#ffffff',
                      boxShadow: isDark
                        ? '0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 8px 32px rgba(255, 102, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        backgroundColor: '#e65c00',
                        transform: 'translateY(-2px)',
                        boxShadow: isDark
                          ? '0 12px 36px rgba(255, 102, 0, 0.45), 0 0 20px rgba(255, 102, 0, 0.2)'
                          : '0 12px 36px rgba(255, 102, 0, 0.35), 0 0 20px rgba(255, 102, 0, 0.2)',
                      },
                      '&:active': { transform: 'scale(0.96)' },
                    }}>
                    Upgrade to Pro
                  </Button>

                  <Typography sx={{ mt: 2, fontSize: '0.75rem', fontWeight: 600, color: secondaryText, textAlign: 'center' }}>
                    Cancel anytime. No lock-in.
                  </Typography>

                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: { xs: 8, md: 12 } }}>
          <Button sx={{
            borderRadius: '9999px',
            py: 1.5,
            px: 4,
            fontWeight: 700,
            fontSize: '1rem',
            textTransform: 'none',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
            color: 'var(--text-primary)',
            boxShadow: isDark
              ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
              : '0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
              borderColor: isDark ? 'rgba(255, 102, 0, 0.35)' : 'rgba(255, 102, 0, 0.3)',
              color: '#ff6600',
              backdropFilter: 'blur(16px) saturate(200%)',
              WebkitBackdropFilter: 'blur(16px) saturate(200%)',
              boxShadow: isDark
                ? '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.3)'
                : '0 4px 12px rgba(15, 23, 42, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 1)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}>
            Compare all tiers
          </Button>
        </Box>

        {/* How you settle it.

            This has moved three times. A section of its own was a panel's
            worth of furniture for a reassurance. A grey line at the foot of
            this one was invisible. A tinted band under the price was seen,
            but it shouted, and it sat in the middle of the one paragraph on
            this page that is already carrying four highlighted figures.

            A card at the foot does both jobs. It has the mass to be noticed
            where a line had none, and it is in the same clothes as every
            other card in this section, so it reads as part of the page
            rather than as a notice stapled to it. One accent, on the half
            nobody expects.

            The hedge is inside the card and small, because it qualifies the
            claim rather than sharing its weight. IT HAS NOT BEEN REVIEWED.
            No rate appears: what a stake earns is not settled in this repo
            and a figure here would read as a promise. Nothing is said about
            chains, custody or lock-up, because none of that was given. */}
        <Box
          ref={payRef}
          sx={{
            maxWidth: 760,
            mx: 'auto',
            mt: { xs: 6, md: 8 },
            borderRadius: '20px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}`,
            background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
            boxShadow: isDark
              ? 'none'
              : '0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -32px rgba(15,23,42,0.18)',
            px: { xs: 2.6, md: 4 },
            py: { xs: 2.8, md: 3.2 },
            ...revealSx(payShown, 80),
          }}
        >
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: secondaryText,
              mb: 1.3,
            }}
          >
            How you pay
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.02rem', md: '1.14rem' },
              fontWeight: 650,
              lineHeight: 1.55,
              letterSpacing: '-0.015em',
              color: primaryText,
              textWrap: 'pretty',
            }}
          >
            Pay by card or crypto. Or stake{' '}
            <Box component="span" sx={{ color: '#ff6600', fontWeight: 800 }}>
              USDC, ETH or BTC
            </Box>{' '}
            and let the yield cover your credits.
          </Typography>

          <Typography sx={{ mt: 1.4, fontSize: '0.76rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            What a stake earns moves with the market. Rates are not fixed and nothing here is a
            guaranteed return.
          </Typography>
        </Box>

      </Container>

      {/* Keyframes for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 30px rgba(255,102,0,0.1), inset 0 0 20px rgba(255,102,0,0.05); }
          50% { box-shadow: 0 0 50px rgba(255,102,0,0.25), inset 0 0 30px rgba(255,102,0,0.15); }
          100% { box-shadow: 0 0 30px rgba(255,102,0,0.1), inset 0 0 20px rgba(255,102,0,0.05); }
        }
        .flow-line {
          stroke-dashoffset: 12;
          animation: flow 1s linear infinite;
        }
        .flow-line-alt {
          stroke-dashoffset: 12;
          animation: flow 1.5s linear infinite reverse;
        }
        @keyframes flow {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </Box>
  );
}
