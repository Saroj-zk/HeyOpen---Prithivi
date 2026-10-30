import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule } from '@/components/ui/LedgerUI';
import { TOKEN, STATS, FLOW, PRINCIPLES, UTILITY } from '@/data/token';
import { useThemeMode } from '@/context/ThemeContext';
import PageMeta from '@/components/PageMeta';

export default function TokenPage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <PageMeta
        title="Tokenomics — $OPEN Revenue Flywheel & Utility | Hey Open"
        description="$OPEN is rewarded for real AI usage, not printed out of thin air. Real protocol revenue buys back tokens, rewards compute providers, and burns the surplus on-chain."
        path="/token"
      />

      <PageHeader />

      {/* Ambient background glow streak — protocol/value aesthetic */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 750,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 102, 0, 0.20) 0%, rgba(255, 80, 0, 0.05) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Gold right-side accent — value / finance tint */}
      <Box
        data-ambient-blur
        sx={{
          position: 'absolute',
          top: '8%',
          right: 0,
          width: { xs: 250, md: 450 },
          height: 450,
          background: 'radial-gradient(ellipse 80% 70% at 100% 0%, rgba(255, 180, 0, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Section 1: Hero Showcase with Infographic ──────────── */}
        <Box sx={{ pt: { xs: 14, sm: 16, md: 18 }, pb: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.05fr) minmax(0,0.95fr)' },
              alignItems: 'center',
            }}
          >
            {/* Left Copy */}
            <Reveal>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  color: '#FF6600',
                  mb: 3,
                  px: 1.8,
                  py: 0.6,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.08)',
                  border: '1px solid rgba(255, 102, 0, 0.25)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Protocol Economics & Flywheel
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.4rem', sm: '3.2rem', md: '3.8rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 3,
                }}
              >
                {TOKEN.symbol} is rewarded for{' '}
                <Box component="span" sx={{ color: '#FF6600' }}>
                  real usage,
                </Box>{' '}
                not printed out of thin air.
              </Typography>

              <Typography
                sx={{
                  maxWidth: '56ch',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4,
                }}
              >
                Usage funds the loop. A share of every credit spent buys {TOKEN.symbol} on the open market, rewards the compute providers who served the work, and permanently burns what is left over verifiably on-chain.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5, mb: 5 }}>
                <Box
                  component="a"
                  href="#value-flow"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 4.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.38), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 40px rgba(255,102,0,0.52)',
                    },
                    '&:active': { transform: 'scale(0.98)' },
                  }}
                >
                  Explore Value Flow ↓
                </Box>

                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    px: 3.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-glass)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: '#FF6600',
                      color: '#FF6600',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255,102,0,0.12)',
                    },
                  }}
                >
                  Launch App & Spend Credits →
                </Box>
              </Box>

              {/* Quick Key Metrics */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3.5, pt: 2, borderTop: '1px solid var(--border-subtle)' }}>
                {[
                  ['1 Billion', 'Fixed Hard Cap'],
                  ['0% Inflation', 'No Mint Switch'],
                  ['100% On-Chain', 'Verifiable Burns'],
                ].map(([stat, label]) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>
                      {stat}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', mt: 0.4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>

            {/* Right Hero Image Infographic Showcase */}
            <Reveal delay={120}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: { xs: 4, md: 5 },
                  overflow: 'hidden',
                  border: '1px solid var(--border-normal)',
                  boxShadow: isDark
                    ? '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(255,102,0,0.15)'
                    : '0 20px 45px -12px rgba(15,23,42,0.12)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {/* Visual Image */}
                <Box
                  component="img"
                  src="/images/optimization.png"
                  alt="Hey Open Token Router and Optimization"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: { xs: 4, md: 5 },
                  }}
                />

                {/* Floating telemetry HUD over infographic */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: '16px',
                    backgroundColor: isDark ? 'rgba(10,12,16,0.85)' : 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-normal)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,102,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FF6600',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.2 }}>
                        Automated Buyback & Burn
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        Triggered on every completed inference batch
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      px: 1.6,
                      py: 0.5,
                      borderRadius: '9999px',
                      backgroundColor: '#FF6600',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                    }}
                  >
                    Active
                  </Box>
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 2: Four Key Token Stats ────────────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <Box
                  sx={{
                    p: 3.5,
                    borderRadius: 3.5,
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-card)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: '#FF6600',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px rgba(255,102,0,0.1)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '2.4rem', md: '3.2rem' },
                      fontWeight: 800,
                      color: '#FF6600',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      mb: 2,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* ── Section 3: Value Flow Pipeline ─────────────────────── */}
        <Rule />
        <Box id="value-flow" sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'baseline' }, justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  color: '#FF6600',
                  mb: 2,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Protocol Loop
              </Box>
              <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
                How value flows through {TOKEN.symbol}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              4 Sequential Steps • Fully Automated
            </Typography>
          </Reveal>

          <Box
            sx={{
              mt: 6,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2.5,
            }}
          >
            {FLOW.map((item, i) => (
              <Reveal key={item.step} delay={i * 90} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3.5,
                    borderRadius: 3.5,
                    border: '1px solid',
                    borderColor: item.highlight ? 'rgba(255, 102, 0, 0.45)' : 'var(--border-normal)',
                    backgroundColor: item.highlight
                      ? (isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.04)')
                      : 'var(--bg-card)',
                    boxShadow: item.highlight ? '0 12px 32px rgba(255, 102, 0, 0.15)' : 'none',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#FF6600',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography
                        sx={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          color: item.highlight ? '#FF6600' : 'var(--text-muted)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        STEP {item.step}
                      </Typography>
                      {item.highlight && (
                        <Box
                          sx={{
                            px: 1.2,
                            py: 0.3,
                            borderRadius: '9999px',
                            backgroundColor: '#FF6600',
                            color: '#fff',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Deflationary
                        </Box>
                      )}
                    </Box>
                    <Typography component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1.2 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                      {item.body}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: item.highlight ? '#FF6600' : '#10B981' }} />
                    <Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {item.highlight ? 'Perpetual Burn Pool' : 'Verified Smart Contract'}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* ── Section 4: Built for Agents & Token Utility Bento ─── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                color: '#FF6600',
                mb: 2,
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              Agent Economy
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                maxWidth: '22ch',
              }}
            >
              Native currency for autonomous agents.
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '58ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              AI agents don't have credit cards or bank accounts. They use $OPEN via the x402 payment standard to stream micropayments per token, tool call, and model handoff without human intervention.
            </Typography>
          </Reveal>

          <Box
            sx={{
              mt: 6,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
              gap: 3,
            }}
          >
            {/* Visual Image Card: Build for Agents (Spans 5 cols) */}
            <Box
              sx={{
                gridColumn: { xs: '1 / -1', md: 'span 5' },
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15,23,42,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                component="img"
                src="/images/Build for agents.jpg"
                alt="Hey Open Build for Autonomous Agents"
                sx={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box sx={{ p: 3.5, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.4,
                      py: 0.4,
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,102,0,0.1)',
                      color: '#FF6600',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    X402 PROTOCOL READY
                  </Box>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1.2 }}>
                    Autonomous Micropayments
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    Agents execute complex multi-step workflows, calling Claude for reasoning, Gemini for context, and FLUX for image synthesis, settling fractions of a cent automatically.
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600' }} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Sub-second Settlement • Sub-cent Gas
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Utility Grid (Spans 7 cols) */}
            <Box
              sx={{
                gridColumn: { xs: '1 / -1', md: 'span 7' },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              {UTILITY.map(([term, detail], i) => (
                <Reveal key={term} delay={i * 80} sx={{ display: 'flex' }}>
                  <Box
                    sx={{
                      width: '100%',
                      p: 3,
                      borderRadius: 3.5,
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(255,102,0,0.1)',
                      },
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,102,0,0.1)',
                          color: '#FF6600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2.5,
                          fontSize: '1rem',
                          fontWeight: 800,
                        }}
                      >
                        0{i + 1}
                      </Box>
                      <Typography component="h3" sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                        {term}
                      </Typography>
                      <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {detail}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Section 5: Long Term Immutable Principles ─────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                color: '#FF6600',
                mb: 2,
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              Contract Invariants
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                maxWidth: '22ch',
                mb: 2,
              }}
            >
              Built for the long term.
            </Typography>
            <Typography sx={{ maxWidth: '62ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 6 }}>
              A network that routes real funds to compute providers requires rules that cannot be silently modified. These cryptographic principles are immutably written into the smart contracts.
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3.5 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.tag} delay={i * 80}>
                <Box
                  sx={{
                    p: 3.5,
                    borderRadius: 3.5,
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-card)',
                    height: '100%',
                    transition: 'border-color 0.25s ease',
                    '&:hover': {
                      borderColor: '#FF6600',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600' }} />
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {p.tag}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    {p.body}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* ── Section 6: Bottom Cinematic CTA Banner ─────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 14 } }}>
          <Reveal>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: 4, md: 6 },
                p: { xs: 4, sm: 6, md: 8 },
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                boxShadow: isDark
                  ? '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,102,0,0.15)'
                  : '0 20px 45px rgba(15,23,42,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Background ambient radial glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 102, 0, 0.16) 0%, rgba(255, 102, 0, 0.02) 70%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 2,
                  py: 0.6,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.1)',
                  border: '1px solid rgba(255, 102, 0, 0.3)',
                  color: '#FF6600',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Real Usage • Deflationary Flywheel
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '22ch',
                  mb: 2.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Fueling the next generation of AI and autonomous compute.
              </Typography>

              <Typography
                sx={{
                  maxWidth: '54ch',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Join thousands of developers, researchers, and automated agent pipelines routing compute through Hey Open today.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.45)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 44px rgba(255,102,0,0.55)',
                    },
                  }}
                >
                  Start Using Hey Open →
                </Box>
                <Link href="/models" passHref style={{ textDecoration: 'none' }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'var(--text-primary)',
                      px: 4,
                      py: 1.8,
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-glass)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        color: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Browse Models & Pricing
                  </Box>
                </Link>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
