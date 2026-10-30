import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useThemeMode } from '@/context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  /* Guide is hidden from the nav on request. /docs is still reachable: the
     footer carries it as "Product guide". Uncomment to put it back. */
  // { label: 'Guide', href: '/docs' },
  { label: 'Models', href: '/models' },
  { label: 'Memory', href: '/memory' },
  { label: 'Private AI', href: '/private' },
  /* The staking page is about the token, so it is named after it. */
  { label: '$OPEN', href: '/stake' },
  { label: 'Enterprise', href: '/enterprise' },
  /* $HEY is hidden from the nav on request. Nothing else in the site links
     to /hey, so the page is now reachable only by typing the address.
     Uncomment to put it back. */
  // { label: '$HEY', href: '/hey' },
];

/* `spacer` pushes page content clear of the fixed header. Pages whose first
   section is a full bleed background pass spacer={false} and absorb the
   offset into their own padding, so the background runs up behind the
   header instead of leaving a bar of page colour above it. */
export default function PageHeader({ spacer = true }) {
  const { isDark } = useThemeMode();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* ── Floating pill header ─────────────────────────────── */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: { xs: 14, md: 20 },
          left: 0,
          right: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, md: 4 },
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1240,
            height: 60,
            borderRadius: '999px',
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.80)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.10)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isDark
              ? '0 12px 32px rgba(0, 0, 0, 0.6)'
              : '0 12px 32px rgba(15, 23, 42, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 1.5, md: 2 },
            pointerEvents: 'auto',
          }}
        >
          {/* Left — Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <Link href="/" passHref style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
              <img
                src="/Open%20Ledegr%20Full%20Black.svg"
                alt="Hey Open"
                style={{
                  height: 20,
                  width: 'auto',
                  display: 'block',
                  filter: isDark ? 'brightness(0) invert(1)' : 'none',
                }}
              />
            </Link>
          </Box>

          {/* Center — Nav links */}
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: { md: 2.5, lg: 3.5 },
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = router.pathname === link.href;
              const content = (
                  <Box
                    component={link.href ? 'a' : 'div'}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.6,
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      cursor: link.href ? 'pointer' : 'default',
                      color: isActive
                        ? '#FF6600'
                        : isDark ? 'rgba(255,255,255,0.75)' : '#475569',
                      textDecoration: 'none',
                      fontFamily: '"Inter", -apple-system, sans-serif',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: link.href
                          ? (isActive ? '#FF6600' : isDark ? '#FFFFFF' : '#0F172A')
                          : undefined,
                      },
                    }}
                  >
                    {isActive && (
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#FF6600',
                          boxShadow: '0 0 7px #FF6600',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {link.label}
                    {link.isComingSoon && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: '0.55rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          px: 0.6,
                          py: 0.2,
                          borderRadius: '4px',
                          backgroundColor: isDark ? 'rgba(255, 102, 0, 0.15)' : 'rgba(255, 102, 0, 0.1)',
                          color: '#FF6600',
                          border: isDark ? '1px solid rgba(255, 102, 0, 0.3)' : '1px solid rgba(255, 102, 0, 0.2)',
                          transform: 'translateY(-2px)',
                          ml: -0.2,
                        }}
                      >
                        Coming Soon
                      </Box>
                    )}
                  </Box>
              );

              return link.href ? (
                <Link key={link.label} href={link.href} passHref style={{ textDecoration: 'none' }}>
                  {content}
                </Link>
              ) : (
                <React.Fragment key={link.label}>
                  {content}
                </React.Fragment>
              );
            })}
          </Box>

          {/* Right — Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              flexShrink: 0,
            }}
          >
            {/* $OPEN button removed as requested */}
            <Box
              sx={{
                position: 'relative',
                /* Hidden on request. Restore by putting the display value
                   back; the pill and its COMING SOON badge are untouched. */
                display: 'none',
                alignItems: 'center',
                borderRadius: '9999px',
                py: 0.6,
                px: 2.2,
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ff6600',
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255,102,0,0.18) 0%, rgba(255,255,255,0.08) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,243,235,0.84) 100%)',
                border: isDark
                  ? '1px solid rgba(255,102,0,0.32)'
                  : '1px solid rgba(255,102,0,0.24)',
                boxShadow: isDark
                  ? '0 2px 8px rgba(0,0,0,0.35), inset 0 1.5px 1.5px rgba(255,255,255,0.35)'
                  : '0 2px 6px rgba(15,23,42,0.06), inset 0 1.5px 1.5px rgba(255,255,255,1)',
                fontFamily: '"Inter", -apple-system, sans-serif',
                userSelect: 'none',
              }}
            >
              Token
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: 'translate(10%, -40%)',
                  fontSize: '7px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '2px 5px',
                  borderRadius: '10px',
                  backgroundColor: '#FF6600',
                  color: '#FFF',
                  lineHeight: 1,
                  border: isDark ? '1.5px solid #0a0a0a' : '1.5px solid #ffffff',
                  boxShadow: '0 2px 4px rgba(255,102,0,0.3)',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                Coming Soon
              </Box>
            </Box>

            {/* Start a chat */}
            <Button
              onClick={() => window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer')}
              sx={{
                borderRadius: '9999px',
                py: 0.75,
                px: { xs: 2, sm: 2.5 },
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: '#FF6600',
                color: '#FFFFFF',
                fontFamily: '"Inter", -apple-system, sans-serif',
                boxShadow: isDark
                  ? '0 4px 14px rgba(255,102,0,0.35)'
                  : '0 4px 12px rgba(255,102,0,0.25)',
                border: isDark
                  ? '1px solid rgba(255,102,0,0.4)'
                  : '1px solid rgba(255,102,0,0.2)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                '&:hover': {
                  backgroundColor: '#e65c00',
                  transform: 'translateY(-1px)',
                  boxShadow: isDark
                    ? '0 6px 20px rgba(255,102,0,0.45)'
                    : '0 6px 20px rgba(255,102,0,0.35)',
                },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              Start a chat
            </Button>

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {mobileOpen && (
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: 86,
            left: 16,
            right: 16,
            borderRadius: '24px',
            backgroundColor: isDark
              ? 'rgba(10, 10, 10, 0.95)'
              : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(28px)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.1)',
            px: 3,
            py: 3,
            zIndex: 1290,
            boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map((link) => {
              const isActive = router.pathname === link.href;
              const content = (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      color: isActive
                        ? '#FF6600'
                        : isDark ? 'rgba(255,255,255,0.9)' : '#0F172A',
                      fontSize: '1.1rem',
                      fontWeight: isActive ? 700 : 600,
                    }}
                  >
                    {isActive && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#FF6600',
                          boxShadow: '0 0 8px #FF6600',
                        }}
                      />
                    )}
                    {link.label}
                    {link.isComingSoon && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: '0.55rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          px: 0.6,
                          py: 0.2,
                          borderRadius: '4px',
                          backgroundColor: isDark ? 'rgba(255, 102, 0, 0.15)' : 'rgba(255, 102, 0, 0.1)',
                          color: '#FF6600',
                          border: isDark ? '1px solid rgba(255, 102, 0, 0.3)' : '1px solid rgba(255, 102, 0, 0.2)',
                          transform: 'translateY(-1px)',
                          ml: -0.2,
                        }}
                      >
                        Coming Soon
                      </Box>
                    )}
                  </Box>
              );

              return link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  passHref
                  style={{ textDecoration: 'none' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {content}
                </Link>
              ) : (
                <Box key={link.label} sx={{ textDecoration: 'none' }}>
                  {content}
                </Box>
              );
            })}
            <Box
              sx={{
                height: 1,
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
                my: 1,
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  position: 'relative',
                  /* Hidden on request. Restore by putting the display value
                     back; the pill and its COMING SOON badge are untouched. */
                  display: 'none',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  py: 0.8,
                  px: 2.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#ff6600',
                  backdropFilter: 'blur(8px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)',
                  border: isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.24)',
                  boxShadow: isDark
                    ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3)'
                    : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)',
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  userSelect: 'none',
                }}
              >
                Token
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: 'translate(10%, -40%)',
                    fontSize: '7px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '2px 5px',
                    borderRadius: '10px',
                    backgroundColor: '#FF6600',
                    color: '#FFF',
                    lineHeight: 1,
                    border: isDark ? '1.5px solid #0a0a0a' : '1.5px solid #ffffff',
                    boxShadow: '0 2px 4px rgba(255,102,0,0.3)',
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Coming Soon
                </Box>
              </Box>
              <Link href="/" passHref style={{ textDecoration: 'none' }}>
                <Box
                  component="span"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.6)' : '#94a3b8',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  ← Home
                </Box>
              </Link>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer');
                }}
                sx={{
                  borderRadius: '9999px',
                  py: 0.8,
                  px: 2.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  backgroundColor: '#FF6600',
                  color: '#FFFFFF',
                }}
              >
                Start a chat
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* ── Spacer so page content doesn't sit under the fixed header ── */}
      {spacer && <Box sx={{ height: { xs: 78, md: 92 } }} />}
    </>
  );
}
