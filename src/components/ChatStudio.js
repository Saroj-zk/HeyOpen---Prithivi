import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useThemeMode } from '@/context/ThemeContext';

export function ChatStudio() {
  const { isDark } = useThemeMode();
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      role: 'assistant',
      model: 'Claude 3.5 Sonnet',
      text: 'Hello! I have access to your universal memory stack across all models and sessions. How can I assist you with your project today?'
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userText },
      {
        role: 'assistant',
        model: 'DeepSeek-R1',
        text: `Processing with zero-retention ephemeral compute. Storing key facts to your local encrypted memory vault.`
      }
    ]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-page)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Orange ambient radial glow */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1200,
          height: 450,
          background: 'radial-gradient(ellipse at top, rgba(255, 102, 0, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Studio Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2.5, sm: 4 },
          py: 2,
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: isDark ? 'rgba(10, 12, 16, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 2,
                py: 0.8,
                borderRadius: '9999px',
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-glass)',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#FF6600',
                  color: '#FF6600',
                  boxShadow: '0 0 12px rgba(255, 102, 0, 0.2)'
                }
              }}
            >
              <ArrowBackRoundedIcon sx={{ fontSize: '1rem' }} />
              Exit Studio
            </Box>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              HeyOpen
            </Typography>
          </Box>
        </Box>

        {/* Privacy & Model Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              gap: 0.8,
              px: 2,
              py: 0.6,
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 102, 0, 0.08)',
              border: '1px solid rgba(255, 102, 0, 0.3)',
              color: '#FF6600',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            <LockRoundedIcon sx={{ fontSize: '0.9rem' }} />
            Zero-Retention Session
          </Box>
        </Box>
      </Box>

      {/* Main Chat Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 860,
          width: '100%',
          mx: 'auto',
          p: { xs: 2, sm: 3 },
          zIndex: 1
        }}
      >
        {/* Messages Stream */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5, py: 4, overflowY: 'auto' }}>
          {messages.map((m, idx) => (
            <Box
              key={idx}
              sx={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: { xs: '90%', sm: '75%' }
              }}
            >
              {m.role === 'assistant' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 6px #FF6600' }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF6600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {m.model}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  backgroundColor: m.role === 'user' ? 'rgba(255, 102, 0, 0.12)' : 'var(--bg-card)',
                  border: '1px solid',
                  borderColor: m.role === 'user' ? 'rgba(255, 102, 0, 0.4)' : 'var(--border-normal)',
                  boxShadow: m.role === 'user' ? '0 4px 18px rgba(255, 102, 0, 0.15)' : 'var(--shadow-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                {m.text}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input Dock */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 4,
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-normal)',
            boxShadow: 'var(--shadow-popup)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            transition: 'border-color 0.25s, box-shadow 0.25s',
            '&:focus-within': {
              borderColor: '#FF6600',
              boxShadow: '0 0 24px rgba(255, 102, 0, 0.25)'
            }
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              px: 1.8,
              py: 0.8,
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 102, 0, 0.08)',
              border: '1px solid rgba(255, 102, 0, 0.3)',
              color: '#FF6600',
              fontSize: '0.78rem',
              fontWeight: 700
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: '0.9rem' }} />
            Auto-Route
          </Box>

          <Box
            component="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything across models, code, images, and universal memory..."
            sx={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              px: 1,
              fontFamily: 'inherit',
              '&::placeholder': {
                color: 'var(--text-muted)'
              }
            }}
          />

          <Button
            onClick={handleSend}
            variant="contained"
            sx={{
              backgroundColor: '#FF6600',
              color: '#FFFFFF',
              minWidth: 44,
              height: 44,
              borderRadius: '9999px',
              p: 0,
              boxShadow: '0 4px 14px rgba(255, 102, 0, 0.4)',
              transition: 'all 0.25s',
              '&:hover': {
                backgroundColor: '#E65C00',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(255, 102, 0, 0.5)'
              }
            }}
          >
            <SendRoundedIcon sx={{ fontSize: '1.2rem' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
