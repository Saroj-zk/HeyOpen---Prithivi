import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useThemeMode } from '@/context/ThemeContext';
import { useReveal, revealSx } from '@/utils/reveal';

export default function ApiSection() {
  const [leftRef, leftShown] = useReveal();
  const [rightRef, rightShown] = useReveal();

  const { isDark } = useThemeMode();
  const [activeTab, setActiveTab] = React.useState('curl');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(codeSnippets[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlightCode = (line) => {
    const escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped.replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:curl|import|from|const|await|new|return|print|async)\b)|(-[Hd]\b)|(\/\/[^\n]*|#[^\n]*)/g,
      (match, str, kw, flag, comment) => {
        if (str) return `<span style="color: #A78BFA">${str}</span>`;
        if (kw) return `<span style="color: #F87171">${kw}</span>`;
        if (flag) return `<span style="color: #60A5FA">${flag}</span>`;
        if (comment) return `<span style="color: #6B7280; font-style: italic;">${comment}</span>`;
        return match;
      }
    );
  };

  const codeSnippets = {
    curl: `curl https://api.heyopen.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HEYOPEN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
      "model": "auto",
      "messages": [
        { "role": "user", "content": "Explain quantum computing" }
      ]
    }'`,
    python: `import os
from heyopen import Client

client = Client(
    api_key=os.getenv("HEYOPEN_API_KEY")
)

chat = client.chat.create(model="auto")
chat.append(user("Explain quantum computing"))
response = chat.sample()
print(response.content)`,
    typescript: `import { HeyOpen } from 'heyopen-node';

const client = new HeyOpen({
  apiKey: process.env.HEYOPEN_API_KEY
});

const response = await client.chat.completions.create({
  model: 'auto',
  messages: [{ role: 'user', content: 'Explain quantum computing' }]
});
console.log(response.choices[0].message.content);`,
    openai: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.HEYOPEN_API_KEY,
  baseURL: 'https://api.heyopen.ai/v1'
});

const response = await client.chat.completions.create({
  model: 'auto',
  messages: [{ role: 'user', content: 'Explain quantum computing' }]
});`
  };

  return (
    <Box
      component="section"
      id="api"
      sx={{
        position: 'relative',
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        py: { xs: 8, md: 14 },
        transition: 'background-color 0.35s ease',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
          
          {/* Left Column: Content */}
          <Grid item xs={12} md={5} ref={leftRef} sx={revealSx(leftShown)}>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase', mb: 3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ff6600' }} /> API
            </Typography>

            <Typography sx={{ color: '#ff6600', fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 500, lineHeight: 1.5, mb: 3, maxWidth: 500 }}>
              Access every model with one subscription, built for seamless use across humans and x402-ready agents.
            </Typography>

            <Typography variant="h2" sx={{ fontWeight: 600, fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' }, lineHeight: 1.1, letterSpacing: '-0.03em', mb: 5 }}>
              One endpoint. Every model behind it.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 8 }}>
              <Button 
                variant="contained"
                sx={{ 
                  display: 'inline-flex',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderRadius: '9999px',
                  py: 1.2,
                  px: 4,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '0.95rem', sm: '1.02rem' },
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
                }}>
                Get API Key
              </Button>
              <Button sx={{ 
                borderRadius: '9999px',
                py: 1.2,
                px: 3.5,
                fontWeight: 600,
                fontSize: '0.95rem',
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
                Read Docs
              </Button>
            </Box>

            {/* Stats Row */}
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>1M+</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>API calls per day</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>&lt;200ms</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Median latency</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>5+</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Model families</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column: Code Block & Tabs */}
          <Grid item xs={12} md={7} ref={rightRef} sx={revealSx(rightShown, 140)}>
            <Box sx={{ position: 'relative' }}>
              
              {/* Glow Behind Terminal */}
              <Box sx={{ 
                position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%',
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
                filter: 'blur(40px)', zIndex: 0, display: isDark ? 'block' : 'none'
              }} />

              {/* Terminal Window - Inner Canvas Black */}
              <Box sx={{ 
                position: 'relative', zIndex: 1,
                backgroundColor: '#0A0A0A',
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.18)',
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.8)' : '0 24px 60px rgba(15, 23, 42, 0.22)',
                mb: 3
              }}>
                
                {/* Top Bar */}
                <Box sx={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  px: 2.5, py: 1.5,
                  backgroundColor: '#121214',
                  borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}>
                  {/* Mac Window Dots */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  </Box>
                  
                  {/* Copy Button */}
                  <Box 
                    onClick={handleCopy}
                    sx={{ 
                      display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer',
                      color: copied ? '#34D399' : 'rgba(255,255,255,0.6)',
                      transition: 'color 0.2s ease',
                      '&:hover': { color: copied ? '#34D399' : '#FFFFFF' }
                    }}
                  >
                    {copied ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{copied ? 'Copied!' : 'Copy'}</Typography>
                  </Box>
                </Box>

                {/* Code Area */}
                <Box sx={{ p: 4, pt: 3, overflowX: 'auto', minHeight: 280, backgroundColor: '#0A0A0A' }}>
                  <pre style={{ margin: 0, fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: '0.86rem', lineHeight: 1.7, color: '#E5E7EB' }}>
                    <code>
                      {codeSnippets[activeTab].split('\n').map((line, i) => (
                        <div key={i} dangerouslySetInnerHTML={{ __html: highlightCode(line) || '&nbsp;' }} />
                      ))}
                    </code>
                  </pre>
                </Box>
              </Box>

              {/* Tabs Below the Window */}
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                  { id: 'python', label: 'Python' },
                  { id: 'typescript', label: 'TypeScript' },
                  { id: 'openai', label: 'TypeScript (OpenAI SDK)' },
                  { id: 'curl', label: 'cURL' }
                ].map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <Box 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      sx={{ 
                        px: { xs: 1.8, sm: 2.2 },
                        py: 0.8,
                        borderRadius: '9999px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        backdropFilter: 'blur(8px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                        backgroundColor: isActive
                          ? (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)')
                          : (isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.45)'),
                        background: isActive
                          ? (isDark
                              ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)')
                          : (isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.45)'),
                        color: isActive
                          ? '#ff6600'
                          : (isDark ? 'rgba(255, 255, 255, 0.65)' : '#64748B'),
                        border: isActive
                          ? (isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.22)')
                          : (isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)'),
                        boxShadow: isActive
                          ? (isDark
                              ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.25), inset 0 -0.5px 1px rgba(0, 0, 0, 0.2)'
                              : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)')
                          : (isDark
                              ? '0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
                              : '0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)'),
                        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        '&:hover': {
                          color: '#ff6600',
                          borderColor: isDark ? 'rgba(255, 102, 0, 0.4)' : 'rgba(255, 102, 0, 0.35)',
                          background: isActive
                            ? undefined
                            : (isDark
                                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'
                                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)'),
                          backdropFilter: 'blur(16px) saturate(200%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(200%)',
                          boxShadow: isDark
                            ? '0 3px 10px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3)'
                            : '0 3px 10px rgba(15, 23, 42, 0.08), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)',
                          transform: 'translateY(-1px)',
                        },
                        '&:active': {
                          transform: 'scale(0.95)',
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500 }}>{tab.label}</Typography>
                    </Box>
                  );
                })}
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
