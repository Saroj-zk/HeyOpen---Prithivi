import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useThemeMode } from '@/context/ThemeContext';
import { useReveal, revealSx } from '@/utils/reveal';

const requests = [
  "Make a first call deck",
  "Summarise last three QBRs",
  "Explain this diagram",
  "What's our PTO policy?",
  "Turn this into a dashboard"
];

const models = [
  "Claude 3.5 Opus",
  "Claude 3.5 Sonnet",
  "Gemini 1.5 Flash",
  "GPT-4o",
  "GPT-4o mini"
];

const attributes = [
  "Reasoning level",
  "Quality",
  "Modality",
  "Complexity",
  "Cost",
  "Task type"
];

export default function TokenOptimizationSection() {
  /* Two columns side by side, so the copy lands first and the chart
     follows it in. */
  const [leftRef, leftShown] = useReveal();
  const [rightRef, rightShown] = useReveal();

  const { isDark } = useThemeMode();

  return (
    <Container id="token" maxWidth="xl" sx={{ pb: { xs: 6, md: 8 }, overflow: 'hidden', scrollMarginTop: '96px' }}>
      {/* NEW TOKEN OPTIMIZATION LAYOUT */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', mt: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'stretch' }}>
          
          {/* Left Column (Text & Blue Card) */}
          <Box ref={leftRef} sx={{ width: { xs: '100%', lg: '33.333%' }, display: 'flex', flexDirection: 'column', ...revealSx(leftShown) }}>
            <Box sx={{ mb: { xs: 3, md: 5 } }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#ff6600', textTransform: 'uppercase', mb: 2 }}>
                Token Optimisation
              </Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-primary)', mb: 2, letterSpacing: '-0.03em', lineHeight: 1.1, textWrap: 'balance' }}>
                Not every question needs{' '}
                <Box component="span" sx={{ color: '#ff6600' }}>the biggest model.</Box>
              </Typography>
              {/* The picture beside this one carries the figures, so the copy
                  does not repeat them. It says what is being done instead. */}
              <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Each request goes to a model that can actually handle it, reuses the context you
                have already sent, and drops what the model was never going to read. You are billed
                for the work, not for the largest name in the list.
              </Typography>
            </Box>
            
            {/* Orange Card */}
            <Box sx={{ 
              background: isDark ? 'linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(255,102,0,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,102,0,0.05) 0%, #FFFFFF 100%)',
              borderRadius: '20px', p: { xs: 3, md: 3.5 }, mt: 'auto',
              border: isDark ? '1px solid rgba(255, 102, 0, 0.2)' : '1px solid rgba(255, 102, 0, 0.1)',
              boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3 }}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', color: isDark ? '#ff6600' : '#ff6600', fontWeight: 600, lineHeight: 1, mb: 0.5 }}>Up to</Typography>
                    <Typography sx={{ fontSize: { xs: '3rem', md: '3.6rem' }, fontWeight: 800, color: '#ff6600', lineHeight: 1, letterSpacing: '-0.03em' }}>60%</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.95rem', color: isDark ? '#ff6600' : '#ff6600', fontWeight: 600, lineHeight: 1.3, opacity: 0.8 }}>
                    fewer<br/>tokens<br/>billed.
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.95rem', color: isDark ? '#94A3B8' : '#64748B', mt: 2 }}>
                  Fewer tokens through the meter.<br/>Same models. Same answer.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Column (Big Interactive Infographic matching Image 1) */}
          <Box ref={rightRef} sx={{ 
            ...revealSx(rightShown, 140),
            width: { xs: '100%', lg: '66.666%' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box 
              component="img"
              src="/images/token-optimisation.png"
              alt="Tokens in a typical request: around 10,000 without optimisation against around 4,000 with smart routing, a saving of 6,000 tokens per request, through smart routing, context caching and prompt trimming"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                display: 'block',
                borderRadius: '20px'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
