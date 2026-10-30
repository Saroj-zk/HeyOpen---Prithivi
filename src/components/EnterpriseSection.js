import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useThemeMode } from '@/context/ThemeContext';

// Icons
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { useReveal, revealSx } from '@/utils/reveal';

const leftFeatures = [
  {
    id: 'company-access',
    title: 'Company-wide AI access',
    description: 'Give every team access from one managed workspace.',
    icon: GroupsOutlinedIcon,
  },
  {
    id: 'model-controls',
    title: 'Model access controls',
    description: 'Choose which AI models each team can use.',
    icon: TuneOutlinedIcon,
  },
  {
    id: 'company-memory',
    title: 'Unified company memory',
    description: 'Keep approved company context available across models and teams.',
    icon: PsychologyOutlinedIcon,
  },
  {
    id: 'audit-visibility',
    title: 'Audit & visibility',
    description: 'See how AI is being used across your company.',
    icon: QueryStatsOutlinedIcon,
  },
];

const rightFeatures = [
  {
    id: 'private-data',
    title: 'Private company data',
    description: 'Your prompts and company data are not used to train models.',
    icon: ShieldOutlinedIcon,
  },
  {
    id: 'user-management',
    title: 'Central user management',
    description: 'Add, remove, and manage employee access from one place.',
    icon: AdminPanelSettingsOutlinedIcon,
  },
  {
    id: 'spend-controls',
    title: 'Usage & spend controls',
    description: 'Set limits and keep track of AI usage across the organization.',
    icon: AccountBalanceWalletOutlinedIcon,
  },
  {
    id: 'enterprise-api',
    title: 'Enterprise API',
    description: 'Connect your internal tools and agents through one API.',
    icon: CodeRoundedIcon,
  },
];

export default function EnterpriseSection() {
  const [headRef, headShown] = useReveal();
  const [cardRef, cardShown] = useReveal();

  const { isDark } = useThemeMode();

  // Contact Sales Modal State
  const [salesModalOpen, setSalesModalOpen] = React.useState(false);
  const [securityModalOpen, setSecurityModalOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    teamSize: '20-50',
    message: '',
  });
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSalesSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSalesModalOpen(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', teamSize: '20-50', message: '' });
      setToastMessage('Thank you! An Enterprise Specialist will reach out within 2 business hours.');
      setToastOpen(true);
    }, 1200);
  };

  const renderFeatureRow = (feature, index, isLast) => {
    const IconComponent = feature.icon;

    return (
      <Box
        key={feature.id}
        sx={{
          py: { xs: 2.5, sm: 3 },
          px: { xs: 1.5, sm: 2.5 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 3 },
          borderRadius: '16px',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          borderBottom: isLast ? 'none' : isDark ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.07)',
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 102, 0, 0.03)',
            transform: 'translateX(3px)',
          },
        }}
      >
        {/* Left side: Icon + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: { sm: '230px', md: '250px' } }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? 'rgba(255, 102, 0, 0.1)' : 'rgba(255, 102, 0, 0.08)',
              color: '#ff6600',
              border: isDark ? '1px solid rgba(255, 102, 0, 0.25)' : '1px solid rgba(255, 102, 0, 0.18)',
              flexShrink: 0,
              transition: 'all 0.25s ease',
            }}
          >
            <IconComponent sx={{ fontSize: 20 }} />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.02rem' },
              fontWeight: 600,
              color: 'var(--text-heading)',
              letterSpacing: '-0.015em',
            }}
          >
            {feature.title}
          </Typography>
        </Box>

        {/* Right side: Description */}
        <Typography
          sx={{
            fontSize: { xs: '0.88rem', sm: '0.92rem' },
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            textAlign: { xs: 'left', sm: 'right' },
            maxWidth: { sm: '280px', md: '300px' },
            pl: { xs: 6.2, sm: 0 },
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      component="section"
      id="enterprise"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 16 },
        overflow: 'hidden',
        transition: 'background-color 0.35s ease',
      }}
    >
      {/* Ambient background glow behind section */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '320px', md: '750px' },
          height: { xs: '300px', md: '500px' },
          background: 'radial-gradient(ellipse at center, rgba(255, 102, 0, 0.07) 0%, rgba(255, 102, 0, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, md: 5 } }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>

          {/* TOP HEADER */}
          <Box ref={headRef} sx={{ mb: { xs: 6, md: 8 }, ...revealSx(headShown) }}>
            {/* Eyebrow Pill */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                px: 2,
                py: 0.65,
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.06)',
                border: isDark ? '1px solid rgba(255, 102, 0, 0.25)' : '1px solid rgba(255, 102, 0, 0.18)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#ff6600',
                  boxShadow: '0 0 10px #ff6600',
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#ff6600',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Enterprise
              </Typography>
            </Box>

            {/* Main Headline */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.6rem' },
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.12,
                color: 'var(--text-heading)',
                mb: 2,
              }}
            >
              Give your team AI.{' '}
              <Box
                component="span"
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #FFFFFF 30%, rgba(255, 255, 255, 0.65) 100%)'
                    : 'linear-gradient(135deg, #0F172A 20%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Keep your data private.
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: 720,
                fontWeight: 400,
              }}
            >
              One secure workspace for your company to access leading AI models, with the
              privacy and controls IT teams need.
            </Typography>
          </Box>

          {/* MASTER GLASS FEATURE CARD */}
          <Box
            ref={cardRef}
            sx={{
              ...revealSx(cardShown, 140),
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
              borderRadius: { xs: '24px', md: '32px' },
              p: { xs: 2.5, sm: 4, md: 5 },
              boxShadow: isDark
                ? '0 24px 64px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                : '0 24px 64px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              mb: 5,
            }}
          >
            {/* Sub-header inside Card */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: { xs: 2.5, sm: 3 },
                borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.09)',
                mb: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.05rem', sm: '1.25rem' },
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                One place for every team.
              </Typography>

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.6,
                  py: 0.5,
                  borderRadius: '999px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 13, color: '#ff6600' }} />
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
                    textTransform: 'uppercase',
                  }}
                >
                  Enterprise Controls
                </Typography>
              </Box>
            </Box>

            {/* 2-Column Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                columnGap: { lg: 6, xl: 8 },
              }}
            >
              {/* Left Column of Features */}
              <Box
                sx={{
                  borderRight: { lg: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)' },
                  pr: { lg: 5, xl: 6 },
                  borderBottom: { xs: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)', lg: 'none' },
                  pb: { xs: 1, lg: 0 },
                }}
              >
                {leftFeatures.map((item, idx) =>
                  renderFeatureRow(item, idx, idx === leftFeatures.length - 1 && typeof window !== 'undefined' && window.innerWidth >= 1200)
                )}
              </Box>

              {/* Right Column of Features */}
              <Box sx={{ pl: { lg: 1, xl: 2 }, pt: { xs: 1, lg: 0 } }}>
                {rightFeatures.map((item, idx) =>
                  renderFeatureRow(item, idx, idx === rightFeatures.length - 1)
                )}
              </Box>
            </Box>
          </Box>

          {/* ACTION BUTTONS & ENTERPRISE BADGES */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {/* Primary & Secondary Buttons matching user's image */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {/* Talk to Sales (Primary orange pill button) */}
              <Button
                variant="contained"
                onClick={() => setSalesModalOpen(true)}
                sx={{
                  display: 'inline-flex',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderRadius: '9999px',
                  py: 1.4,
                  px: { xs: 4, sm: 5 },
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
              >
                Talk to Sales
              </Button>

              {/* Enterprise Security (Outlined pill button with orange border) */}
              <Button
                variant="outlined"
                onClick={() => setSecurityModalOpen(true)}
                sx={{
                  borderRadius: '9999px',
                  py: 1.4,
                  px: { xs: 3.5, sm: 4 },
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  backdropFilter: 'blur(12px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                  backgroundColor: isDark ? 'rgba(255, 102, 0, 0.05)' : 'rgba(255, 102, 0, 0.04)',
                  border: isDark ? '1.5px solid rgba(255, 102, 0, 0.45)' : '1.5px solid rgba(255, 102, 0, 0.4)',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  boxShadow: isDark
                    ? '0 4px 14px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                    : '0 4px 14px rgba(255, 102, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 102, 0, 0.08)',
                    borderColor: '#ff6600',
                    color: '#ff6600',
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 8px 24px rgba(255, 102, 0, 0.25)'
                      : '0 8px 24px rgba(255, 102, 0, 0.15)',
                  },
                  '&:active': {
                    transform: 'scale(0.96)',
                  },
                }}
              >
                Enterprise Security
              </Button>
            </Box>

            {/* Security Guarantee Pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <VerifiedUserOutlinedIcon sx={{ fontSize: 17, color: '#ff6600' }} />
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  SOC2 Type II Certified
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <ShieldOutlinedIcon sx={{ fontSize: 17, color: '#ff6600' }} />
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Zero Model Training on Data
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* TALK TO SALES MODAL */}
      <Dialog
        open={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            backgroundColor: isDark ? 'rgba(15, 18, 24, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(32px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
            p: { xs: 2.5, sm: 4 },
            color: 'var(--text-primary)',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.1)',
                  color: '#ff6600',
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Enterprise Sales
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
                Deploy Hey Open across your org
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', mt: 0.5 }}>
                Custom pricing, SLA guarantees, SSO/SCIM integration, and dedicated VPC options.
              </Typography>
            </Box>
            <IconButton
              onClick={() => setSalesModalOpen(false)}
              sx={{
                color: 'var(--text-secondary)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {submitted ? (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <CheckCircleOutlineRoundedIcon sx={{ fontSize: 54, color: '#ff6600', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                Request received!
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.95rem', mt: 1 }}>
                Our enterprise architecture team will contact you shortly.
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSalesSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  size="small"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Work Email"
                  type="email"
                  size="small"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Company Name"
                  size="small"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                    },
                  }}
                />
                <TextField
                  select
                  fullWidth
                  label="Estimated Seats"
                  size="small"
                  SelectProps={{ native: true }}
                  value={formData.teamSize}
                  onChange={handleInputChange('teamSize')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                    },
                  }}
                >
                  <option value="10-50">10 – 50 team members</option>
                  <option value="51-200">51 – 200 team members</option>
                  <option value="201-1000">201 – 1,000 team members</option>
                  <option value="1000+">1,000+ enterprise seats</option>
                </TextField>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Any specific security or compliance requirements? (Optional)"
                size="small"
                value={formData.message}
                onChange={handleInputChange('message')}
                placeholder="e.g. HIPAA, dedicated tenant, custom LLM routing..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: '9999px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  fontSize: '0.95rem',
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
              >
                Submit Enterprise Request
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* ENTERPRISE SECURITY MODAL */}
      <Dialog
        open={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            backgroundColor: isDark ? 'rgba(15, 18, 24, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(32px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
            p: { xs: 2.5, sm: 4 },
            color: 'var(--text-primary)',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.1)',
                  color: '#ff6600',
                  mb: 1.5,
                }}
              >
                <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Enterprise Security & Privacy
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
                Your data stays exclusively yours.
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-secondary)', mt: 0.5 }}>
                Built from the ground up for strict confidentiality and regulatory compliance.
              </Typography>
            </Box>
            <IconButton
              onClick={() => setSecurityModalOpen(false)}
              sx={{
                color: 'var(--text-secondary)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, my: 2 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                Zero Data Training
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Neither Hey Open nor downstream model providers (OpenAI, Anthropic, Google) ever use your enterprise prompts or attachments for model training.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                End-to-End Encryption
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                All in-flight traffic is secured with TLS 1.3, and company memory stores are isolated with AES-256 encryption at rest with customer-managed keys (CMEK).
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                SSO & SCIM Provisioning
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Seamless integration with Okta, Azure AD, Google Workspace, and Ping Identity for automated user onboarding and instant offboarding.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                Audit Logging & DLP
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Export tamper-evident SIEM audit logs, configure sensitive data redaction rules, and monitor real-time token spend per department.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => {
                setSecurityModalOpen(false);
                setSalesModalOpen(true);
              }}
              sx={{
                borderRadius: '9999px',
                py: 1.3,
                px: 4,
                fontWeight: 700,
                letterSpacing: '0.02em',
                fontSize: '0.95rem',
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
            >
              Request Full Security Whitepaper
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Toast Feedback */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
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
            '& .MuiAlert-icon': { color: '#ff6600' },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
