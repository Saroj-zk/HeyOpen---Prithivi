import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useThemeMode } from '@/context/ThemeContext';

// Social SVGs for accurate official branding
const SocialIcons = {
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Discord: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.01c3.931 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.194.373.287a.077.077 0 0 1-.007.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  GitHub: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  Bluesky: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.762 1.5 4.502c0 2.213.626 9.489 1.012 10.895.967 3.52 4.457 4.437 7.075 2.25-2.226 2.059-4.834 3.738-3.087 5.433 3.328 3.228 5.5-1.08 5.5-1.08s2.172 4.308 5.5 1.08c1.747-1.695-.861-3.374-3.087-5.433 2.618 2.187 6.108 1.27 7.075-2.25.386-1.406 1.012-8.682 1.012-10.895 0-2.74-1.066-3.492-3.702-1.697-2.752 1.942-5.711 5.881-6.798 7.995z" />
    </svg>
  ),
};

/* Anything still on '#' has no page behind it yet. They are listed so the
   footer is complete, but each one needs a real destination before launch. */
const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Chat', href: 'https://ais.openledger.xyz/chat', external: true },
      { label: 'Models', href: '/models' },
      { label: 'Consensus Mode', href: '#consensus-mode' },
      { label: 'Universal Memory', href: '/memory' },
      { label: 'Private AI', href: '/private' },
      { label: 'Token', href: '/token' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'iOS app', href: '#' },
      { label: 'Android app', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'API reference', href: '#api' },
      { label: 'Quickstart', href: '#api' },
      { label: 'Model IDs', href: '/models' },
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Acceptable Use', href: '#' },
      { label: 'Data Processing', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

const COMPANY_LINKS = [
  { label: 'About', href: '#' },
  { label: '$OPEN token', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Investors', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Contact', href: '#' },
];

const SOCIAL_PLATFORMS = [
  { name: 'X', icon: SocialIcons.X, href: 'https://x.com/openledger' },
  { name: 'Discord', icon: SocialIcons.Discord, href: 'https://discord.gg/openledger' },
  { name: 'GitHub', icon: SocialIcons.GitHub, href: 'https://github.com/openledger' },
  { name: 'Bluesky', icon: SocialIcons.Bluesky, href: 'https://bsky.app/profile/openledger.xyz' },
];

export default function Footer({ showCta = false }) {
  const { isDark } = useThemeMode();
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-primary)',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 8 },
        overflow: 'hidden',
        transition: 'background-color 0.35s ease, color 0.35s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* ==============================================================
            1. TOP CTA BANNER CARD — homepage only, opt in with <Footer showCta />
           ============================================================== */}
        {showCta && (
          <Box
            sx={{
              position: 'relative',
              borderRadius: { xs: '22px', sm: '28px', md: '34px' },
              overflow: 'hidden',
              px: { xs: 3, sm: 6, md: 8 },
              py: { xs: 8, sm: 10, md: 12 },
              textAlign: 'center',
              mb: { xs: 8, sm: 10, md: 12 },
              // Ambient deep warm orange and amber light streaks matching Hey Open brand
              backgroundColor: '#120802',
              backgroundImage: `
                radial-gradient(ellipse 85% 65% at 50% 30%, rgba(255, 102, 0, 0.46) 0%, rgba(204, 75, 0, 0.22) 50%, rgba(18, 8, 2, 0.96) 85%),
                linear-gradient(180deg, rgba(65, 25, 4, 0.42) 0%, rgba(10, 4, 1, 0.98) 100%)
              `,
              boxShadow: isDark
                ? '0 24px 64px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 102, 0, 0.22), 0 0 40px rgba(255, 102, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.18)'
                : '0 24px 64px -12px rgba(255, 102, 0, 0.25), 0 0 0 1px rgba(255, 102, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            }}
          >
            {/* Subtle directional warm orange rays effect */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                backgroundImage: `
                  radial-gradient(circle at 50% 20%, rgba(255, 145, 50, 0.42) 0%, transparent 48%),
                  conic-gradient(from 225deg at 50% 30%, transparent 0deg, rgba(255, 120, 20, 0.18) 40deg, transparent 80deg, rgba(255, 165, 50, 0.22) 130deg, transparent 180deg)
                `,
                opacity: 0.9,
                mixBlendMode: 'screen',
              }}
            />

            {/* Vignette border shine */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(12, 5, 2, 0.85) 100%)',
              }}
            />

            {/* Content inside Banner */}
            <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '820px', mx: 'auto' }}>
              {/* Start Pill Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.2,
                  py: 0.6,
                  mb: 3,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.12)',
                  border: '1px solid rgba(255, 102, 0, 0.35)',
                  backdropFilter: 'blur(10px)',
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
                <Typography
                  sx={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  Start
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.8rem', md: '3.6rem' },
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: '-0.03em',
                  textWrap: 'balance',
                  color: '#FFFFFF',
                  mb: 1.5,
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                You shouldn’t have to bet on one model.
              </Typography>

              {/* Sub-headline italic serif */}
              <Typography
                sx={{
                  fontSize: { xs: '1.4rem', sm: '1.9rem', md: '2.4rem' },
                  fontFamily: 'serif',
                  fontStyle: 'italic',
                  textWrap: 'balance',
                  color: 'rgba(255, 225, 200, 0.9)',
                  mb: { xs: 4, sm: 5 },
                  fontWeight: 400,
                }}
              >
                Use all of them.
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                {/* Primary White Pill Button with warm orange glow */}
                <Button
                  variant="contained"
                  onClick={() => window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer')}
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '1.1rem !important' }} />}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#120802',
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    fontWeight: 700,
                    py: 1.5,
                    px: { xs: 4, sm: 5 },
                    borderRadius: '9999px',
                    textTransform: 'none',
                    letterSpacing: '0.01em',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 24px rgba(255, 102, 0, 0.42)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      backgroundColor: '#FFF7F2',
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 32px rgba(255, 102, 0, 0.65)',
                    },
                    '&:active': {
                      transform: 'scale(0.97)',
                    },
                  }}
                >
                  Start a chat
                </Button>

                {/* Secondary API Key Button */}
                <Button
                  variant="outlined"
                  href="#api"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    fontWeight: 600,
                    py: 1.45,
                    px: { xs: 3.5, sm: 4.5 },
                    borderRadius: '9999px',
                    textTransform: 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 102, 0, 0.14)',
                      borderColor: 'rgba(255, 102, 0, 0.55)',
                      color: '#FF6600',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get an API key
                </Button>
              </Box>

              {/* Sub-text note */}
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  mt: 3,
                  letterSpacing: '0.02em',
                }}
              >
                Free to start · No card · Nothing retained
              </Typography>
            </Box>
          </Box>
        )}

        {/* ==============================================================
            2. FOUR-COLUMN DIRECTORY SECTION (Layout matches Image 1)
           ============================================================== */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1.3fr 0.85fr 0.85fr 0.85fr',
              lg: '1.4fr 0.8fr 0.8fr 0.8fr 1.3fr',
            },
            gap: { xs: 5, sm: 6, md: 5, lg: 6 },
            pt: 2,
            pb: { xs: 6, md: 8 },
          }}
        >
          {/* COLUMN 1: Brand, Description, & Social Icon Boxes */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Logo */}
            <Box
              component="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                mb: 2.5,
              }}
            >
              <img
                src="/Open%20Ledegr%20Full%20Black.svg"
                alt="Hey Open"
                style={{
                  height: 26,
                  width: 'auto',
                  display: 'block',
                  filter: isDark ? 'brightness(0) invert(1)' : 'none',
                }}
              />
            </Box>

            {/* Description */}
            <Typography
              sx={{
                fontSize: '0.92rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '320px',
                mb: 3.5,
              }}
            >
              One private layer for every model. Chat anywhere, keep your memory, leave no trace.
            </Typography>

            {/* Social Icons in Clean Rounded Square Boxes (Image 1 style) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {SOCIAL_PLATFORMS.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <IconButton
                    key={platform.name}
                    component="a"
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid',
                      borderColor: 'var(--border-normal)',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 102, 0, 0.08)',
                        borderColor: '#FF6600',
                        color: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <IconComponent />
                  </IconButton>
                );
              })}
            </Box>
          </Box>

          {/* COLUMNS 2 TO 4: Product, Developers, Legal. Rendered from the
              data rather than by index, so a new column is a new entry. */}
          {FOOTER_COLUMNS.map((col) => (
            <Box key={col.title} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  mb: 2.5,
                  letterSpacing: '-0.01em',
                }}
              >
                {col.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {col.links.map((link) => (
                  <Box component="li" key={link.label}>
                    <Box
                      component="a"
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      sx={{
                        fontSize: '0.92rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        display: 'inline-block',
                        '&:hover': {
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      {link.label}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

          {/* COLUMN 5: Company Info & Newsletter Subscription (Image 1 style) */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                mb: 2,
                letterSpacing: '-0.01em',
              }}
            >
              Company
            </Typography>

            <Typography
              sx={{
                fontSize: '0.92rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                mb: 2,
              }}
            >
              Helping teams and developers orchestrate multiple frontier models with total privacy and zero retention.
            </Typography>

            {/* Quick company links */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px', mb: 3 }}>
              {COMPANY_LINKS.map((item) => (
                <Box
                  component="a"
                  key={item.label}
                  href={item.href}
                  sx={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#FF6600',
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            {/* Newsletter Pill Input Bar matching Image 1 */}
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                borderRadius: '9999px',
                p: '5px',
                pl: 2.2,
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.12)',
                boxShadow: isDark
                  ? 'inset 0 1px 2px rgba(0, 0, 0, 0.4)'
                  : '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                '&:focus-within': {
                  borderColor: '#FF6600',
                  boxShadow: '0 0 0 3px rgba(255, 102, 0, 0.18)',
                },
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                disabled={subscribed}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={subscribed}
                endIcon={
                  subscribed ? (
                    <CheckCircleRoundedIcon sx={{ fontSize: '1rem !important' }} />
                  ) : (
                    <ArrowForwardRoundedIcon sx={{ fontSize: '1rem !important' }} />
                  )
                }
                sx={{
                  backgroundColor: subscribed ? '#10B981' : isDark ? '#FFFFFF' : '#0F172A',
                  color: subscribed ? '#FFFFFF' : isDark ? '#0A0C10' : '#FFFFFF',
                  borderRadius: '9999px',
                  px: 2.8,
                  py: 1,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                  letterSpacing: '0.01em',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: subscribed ? '#10B981' : '#FF6600',
                    color: '#FFFFFF',
                    transform: 'none',
                  },
                }}
              >
                {subscribed ? 'Joined' : 'Subscribe'}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ==============================================================
            3. BOTTOM BAR (Rounded container matching Image 1)
           ============================================================== */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2.5,
            px: { xs: 3, sm: 4 },
            py: 2.5,
            borderRadius: { xs: '14px', sm: '18px' },
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F1F4F8',
            border: '1px solid',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {/* Copyright */}
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {new Date().getFullYear()} Hey Open. All rights reserved.
          </Typography>

          {/* System routing status dot */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 10,
                height: 10,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  opacity: 0.75,
                  animation: 'footerPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  '@keyframes footerPulse': {
                    '0%': { transform: 'scale(0.9)', opacity: 0.8 },
                    '70%': { transform: 'scale(2.4)', opacity: 0 },
                    '100%': { transform: 'scale(2.4)', opacity: 0 },
                  },
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                }}
              />
            </Box>
            <span>All systems routing</span>
          </Box>

          {/* Legal Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            <Box
              component="a"
              href="#"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'var(--text-primary)' },
              }}
            >
              Data Policy
            </Box>
            <Box sx={{ opacity: 0.4 }}>|</Box>
            <Box
              component="a"
              href="#"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'var(--text-primary)' },
              }}
            >
              Terms
            </Box>
            <Box sx={{ opacity: 0.4 }}>|</Box>
            <Box
              component="a"
              href="#"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'var(--text-primary)' },
              }}
            >
              Privacy Notice
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
