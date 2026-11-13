import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useThemeMode } from '@/context/ThemeContext';

/* Hidden for now. The button is the only thing this component puts on the
   page, so the whole block comes out rather than just the label: left in
   place and merely invisible, its wrapper would still hold its own bottom
   margin open under the hero. Set this back to true to restore it. */
const SHOW_WAITLIST = false;

export default function TrustBadges({ onIosClick, onAndroidClick }) {
  const { isDark } = useThemeMode();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activePlatform, setActivePlatform] = React.useState('ios'); // 'ios' | 'android'
  const [emailOrPhone, setEmailOrPhone] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleOpenPlatform = (platform, e) => {
    if (e) e.stopPropagation();
    setActivePlatform(platform);
    setIsSubmitted(false);
    setEmailOrPhone('');
    setModalOpen(true);

    if (platform === 'ios' && typeof onIosClick === 'function') {
      onIosClick();
    } else if (platform === 'android' && typeof onAndroidClick === 'function') {
      onAndroidClick();
    }
  };

  const handleCopyLink = () => {
    const url = activePlatform === 'ios'
      ? 'https://testflight.apple.com/join/openledger'
      : 'https://play.google.com/store/apps/details?id=com.openledger.app';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setToastMessage(`Link for ${activePlatform === 'ios' ? 'iOS' : 'Android'} copied to clipboard!`);
    setToastOpen(true);
  };

  const handleSimulateAction = (actionName) => {
    setToastMessage(actionName);
    setToastOpen(true);
  };

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <>
      {SHOW_WAITLIST && (
      <Box
        id="hero-trust-badges"
        sx={{
          textAlign: 'center',
          mt: 'auto',
          pt: { xs: 2, md: 3 },
          pb: { xs: 2.5, md: 3.5 },
          mb: { xs: 8, md: 12 },
          zIndex: 5,
        }}
      >
        {/* Join the Waitlist Button */}
        <Button
          variant="contained"
          sx={{
            display: 'inline-flex',
            cursor: 'pointer',
            userSelect: 'none',
            borderRadius: '999px',
            px: { xs: 4, sm: 5 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'none',
            backgroundColor: '#ff6600',
            color: '#ffffff',
            border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
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
            '&:active': {
              transform: 'scale(0.96)',
            },
          }}
          onClick={() => {
            // Optional: You can handle the waitlist click here
            console.log('Join the waitlist clicked');
          }}
        >
          Join the waitlist
        </Button>
      </Box>
      )}

      {/* Interactive Mobile Download Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            backgroundColor: isDark ? 'rgba(15, 18, 24, 0.96)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(32px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(0, 0, 0, 0.1)',
            p: { xs: 1.5, sm: 2 },
            color: isDark ? '#FFFFFF' : '#0F172A',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.65)',
          },
        }}
      >
        {/* Header with Close */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartphoneIcon sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 22 }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)',
              }}
            >
              HeyOpen Mobile
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setModalOpen(false)}
            sx={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.6)' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ pt: 1, pb: 2, px: { xs: 1, sm: 2 } }}>
          {/* Main Title */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.35rem', sm: '1.6rem' },
                letterSpacing: '-0.02em',
                mb: 0.8,
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              Get HeyOpen on your phone
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(15, 23, 42, 0.65)',
                maxWidth: 420,
                mx: 'auto',
                fontSize: '0.9rem',
              }}
            >
              Experience private, verifiable multi-model AI reasoning on iOS and Android.
            </Typography>
          </Box>

          {/* Platform Tab Switcher */}
          <Box
            sx={{
              display: 'flex',
              p: '5px',
              borderRadius: '9999px',
              backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.45)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(8px) saturate(180%)',
              WebkitBackdropFilter: 'blur(8px) saturate(180%)',
              mb: 3,
            }}
          >
            <Box
              id="modal-tab-ios"
              onClick={() => setActivePlatform('ios')}
              sx={{
                flex: 1,
                py: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                borderRadius: '9999px',
                cursor: 'pointer',
                userSelect: 'none',
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                backgroundColor: activePlatform === 'ios'
                  ? (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)')
                  : 'transparent',
                background: activePlatform === 'ios'
                  ? (isDark
                      ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)')
                  : 'transparent',
                color: activePlatform === 'ios'
                  ? '#ff6600'
                  : (isDark ? 'rgba(255, 255, 255, 0.65)' : '#64748B'),
                border: activePlatform === 'ios'
                  ? (isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.22)')
                  : '1px solid transparent',
                boxShadow: activePlatform === 'ios'
                  ? (isDark
                      ? '0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35), inset 0 0 0 0.5px rgba(255, 102, 0, 0.28)'
                      : '0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 1), inset 0 0 0 0.5px rgba(255, 102, 0, 0.18)')
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                '&:hover': {
                  color: '#ff6600',
                },
                '&:active': {
                  transform: 'scale(0.94)',
                },
              }}
            >
              <AppleIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'inherit' }}>
                iOS (iPhone & iPad)
              </Typography>
            </Box>

            <Box
              id="modal-tab-android"
              onClick={() => setActivePlatform('android')}
              sx={{
                flex: 1,
                py: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                borderRadius: '9999px',
                cursor: 'pointer',
                userSelect: 'none',
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                backgroundColor: activePlatform === 'android'
                  ? (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)')
                  : 'transparent',
                background: activePlatform === 'android'
                  ? (isDark
                      ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)')
                  : 'transparent',
                color: activePlatform === 'android'
                  ? '#ff6600'
                  : (isDark ? 'rgba(255, 255, 255, 0.65)' : '#64748B'),
                border: activePlatform === 'android'
                  ? (isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.22)')
                  : '1px solid transparent',
                boxShadow: activePlatform === 'android'
                  ? (isDark
                      ? '0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35), inset 0 0 0 0.5px rgba(255, 102, 0, 0.28)'
                      : '0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 1), inset 0 0 0 0.5px rgba(255, 102, 0, 0.18)')
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                '&:hover': {
                  color: '#ff6600',
                },
                '&:active': {
                  transform: 'scale(0.94)',
                },
              }}
            >
              <AndroidIcon sx={{ fontSize: 20, color: 'inherit' }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'inherit' }}>
                Android (Phones & Tablets)
              </Typography>
            </Box>
          </Box>

          {/* Platform Content Card */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1.2fr 1fr' },
              gap: 2.5,
              alignItems: 'center',
              p: 2.5,
              borderRadius: '18px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              mb: 2.5,
            }}
          >
            {/* Left Column: Details & Direct Actions */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    px: 1,
                    py: 0.3,
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                    color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
                  }}
                >
                  {activePlatform === 'ios' ? 'Apple TestFlight & App Store' : 'Google Play & Direct APK'}
                </Box>
                <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.5)' }}>
                  v1.4 • Beta
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
                {activePlatform === 'ios' ? 'HeyOpen for iOS' : 'HeyOpen for Android'}
              </Typography>

              <Box
                component="ul"
                sx={{
                  m: 0,
                  p: 0,
                  pl: 2,
                  mb: 2,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                }}
              >
                <li>Multi-model reasoning (GPT-4o, Claude 3.5, Gemini)</li>
                <li>Zero-knowledge private local history</li>
                <li>
                  {activePlatform === 'ios'
                    ? 'iOS 16+ with FaceID biometric lock'
                    : 'Android 10+ with native quick prompt widget'}
                </li>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    handleSimulateAction(
                      activePlatform === 'ios'
                        ? 'Opening Apple TestFlight Beta...'
                        : 'Opening Google Play Store...'
                    )
                  }
                  startIcon={activePlatform === 'ios' ? <AppleIcon /> : <AndroidIcon />}
                  endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    py: 1.3,
                    borderRadius: '9999px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    backgroundColor: '#ff6600',
                    color: '#ffffff',
                    border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
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
                    '&:active': {
                      transform: 'scale(0.96)',
                    },
                  }}
                >
                  {activePlatform === 'ios' ? 'Join TestFlight Beta' : 'Get on Google Play'}
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {activePlatform === 'android' && (
                    <Button
                      size="small"
                      fullWidth
                      onClick={() => handleSimulateAction('Downloading HeyOpen.apk...')}
                      startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        py: 0.75,
                        borderRadius: '9999px',
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        backdropFilter: 'blur(8px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                        backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                        color: 'var(--text-primary)',
                        boxShadow: isDark
                          ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.12)'
                          : '0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        '&:hover': {
                          background: isDark
                            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'
                            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
                          borderColor: isDark ? 'rgba(255, 102, 0, 0.4)' : 'rgba(255, 102, 0, 0.35)',
                          color: '#ff6600',
                          backdropFilter: 'blur(16px) saturate(200%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(200%)',
                          boxShadow: isDark
                            ? '0 3px 10px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.3)'
                            : '0 3px 10px rgba(15, 23, 42, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 1)',
                          transform: 'translateY(-1px)',
                        },
                        '&:active': {
                          transform: 'scale(0.94)',
                        },
                      }}
                    >
                      Download APK
                    </Button>
                  )}
                  <Button
                    size="small"
                    fullWidth
                    onClick={handleCopyLink}
                    startIcon={<ContentCopyIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      py: 0.75,
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                      backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                      color: 'var(--text-primary)',
                      boxShadow: isDark
                        ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.12)'
                        : '0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                      '&:hover': {
                        background: isDark
                          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'
                          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
                        borderColor: isDark ? 'rgba(255, 102, 0, 0.4)' : 'rgba(255, 102, 0, 0.35)',
                        color: '#ff6600',
                        backdropFilter: 'blur(16px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(200%)',
                        boxShadow: isDark
                          ? '0 3px 10px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.3)'
                          : '0 3px 10px rgba(15, 23, 42, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 1)',
                        transform: 'translateY(-1px)',
                      },
                      '&:active': {
                        transform: 'scale(0.94)',
                      },
                    }}
                  >
                    Copy Link
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Right Column: QR Code Card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderRadius: '14px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              {/* Crisp SVG QR Code */}
              <Box
                sx={{
                  p: 1.2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  mb: 1.2,
                }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <rect width="120" height="120" fill="white" />
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="black" />
                  <rect x="15" y="15" width="20" height="20" rx="2" fill="white" />
                  <rect x="20" y="20" width="10" height="10" fill="black" />
                  <rect x="80" y="10" width="30" height="30" rx="4" fill="black" />
                  <rect x="85" y="15" width="20" height="20" rx="2" fill="white" />
                  <rect x="90" y="20" width="10" height="10" fill="black" />
                  <rect x="10" y="80" width="30" height="30" rx="4" fill="black" />
                  <rect x="15" y="85" width="20" height="20" rx="2" fill="white" />
                  <rect x="20" y="90" width="10" height="10" fill="black" />
                  <circle cx="60" cy="60" r="14" fill="#0F172A" />
                  {activePlatform === 'ios' ? (
                    <path
                      d="M60 52C61 52 62.5 53 62.5 54C62.5 55 61.5 56 60 56C59 56 58 55 58 54C58 53 59 52 60 52ZM63 65C63 67 61.5 68 60 68C58.5 68 57 67 57 65C57 62 60 60 60 60C60 60 63 62 63 65Z"
                      fill="white"
                    />
                  ) : (
                    <path
                      d="M55 58C55 55.2 57.2 53 60 53C62.8 53 65 55.2 65 58V62H55V58ZM57 56C57.6 56 58 55.6 58 55C58 54.4 57.6 54 57 54C56.4 54 56 54.4 56 55C56 55.6 56.4 56 57 56ZM63 56C63.6 56 64 55.6 64 55C64 54.4 63.6 54 63 54C62.4 54 62 54.4 62 55C62 55.6 62.4 56 63 56Z"
                      fill="white"
                    />
                  )}
                  <rect x="48" y="14" width="6" height="6" fill="black" />
                  <rect x="62" y="14" width="6" height="6" fill="black" />
                  <rect x="52" y="24" width="6" height="6" fill="black" />
                  <rect x="66" y="24" width="6" height="6" fill="black" />
                  <rect x="48" y="34" width="6" height="6" fill="black" />
                  <rect x="62" y="34" width="6" height="6" fill="black" />
                  <rect x="14" y="48" width="6" height="6" fill="black" />
                  <rect x="24" y="48" width="6" height="6" fill="black" />
                  <rect x="34" y="54" width="6" height="6" fill="black" />
                  <rect x="14" y="62" width="6" height="6" fill="black" />
                  <rect x="28" y="62" width="6" height="6" fill="black" />
                  <rect x="80" y="48" width="6" height="6" fill="black" />
                  <rect x="94" y="48" width="6" height="6" fill="black" />
                  <rect x="86" y="58" width="6" height="6" fill="black" />
                  <rect x="100" y="62" width="6" height="6" fill="black" />
                  <rect x="48" y="80" width="6" height="6" fill="black" />
                  <rect x="62" y="86" width="6" height="6" fill="black" />
                  <rect x="52" y="96" width="6" height="6" fill="black" />
                  <rect x="66" y="100" width="6" height="6" fill="black" />
                  <rect x="80" y="80" width="6" height="6" fill="black" />
                  <rect x="94" y="92" width="6" height="6" fill="black" />
                  <rect x="84" y="102" width="6" height="6" fill="black" />
                </svg>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)',
                }}
              >
                Scan with phone camera
              </Typography>
            </Box>
          </Box>

          {/* Direct Link Sender via Email / Phone */}
          <Box
            component="form"
            onSubmit={handleSendLink}
            sx={{
              p: 2,
              borderRadius: '14px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            {isSubmitted ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.2, py: 0.8 }}>
                <CheckCircleOutlineIcon sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 24 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  Download link sent to {emailOrPhone}!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter email or phone to receive link..."
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontSize: '0.85rem',
                      '& fieldset': {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                      },
                      '&:hover fieldset': {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    whiteSpace: 'nowrap',
                    px: 3.5,
                    py: 1.1,
                    borderRadius: '9999px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    fontSize: '0.88rem',
                    backgroundColor: '#ff6600',
                    color: '#ffffff',
                    border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
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
                    '&:active': {
                      transform: 'scale(0.96)',
                    },
                  }}
                >
                  Send Link
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Action Toast Feedback */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
            '& .MuiAlert-icon': { color: '#FFFFFF' },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
