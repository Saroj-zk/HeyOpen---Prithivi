import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useThemeMode } from '@/context/ThemeContext';
import { useReveal, revealSx } from '@/utils/reveal';

// Complete catalog of premier models based on reference
const ALL_MODELS = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerKey: 'openai',
    context: '128K',
    contextNum: 128,
    bestFor: 'Everyday reasoning and vision',
    categories: ['All', 'Reasoning', 'Vision', 'Coding'],
    modelType: 'openai',
  },
  {
    id: 'o3',
    name: 'o3',
    provider: 'OpenAI',
    providerKey: 'openai',
    context: '200K',
    contextNum: 200,
    bestFor: 'Hard maths, proofs, planning',
    categories: ['All', 'Reasoning', 'Coding'],
    modelType: 'openai',
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    providerKey: 'anthropic',
    context: '200K',
    contextNum: 200,
    bestFor: 'Long documents and drafting',
    categories: ['All', 'Reasoning', 'Long Context'],
    modelType: 'anthropic',
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    providerKey: 'anthropic',
    context: '200K',
    contextNum: 200,
    bestFor: 'Code review and refactors',
    categories: ['All', 'Coding', 'Reasoning', 'Long Context'],
    modelType: 'anthropic',
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    providerKey: 'google',
    context: '1M',
    contextNum: 1000,
    bestFor: 'Whole repositories and video',
    categories: ['All', 'Long Context', 'Vision', 'Coding'],
    modelType: 'google',
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    providerKey: 'xai',
    context: '256K',
    contextNum: 256,
    bestFor: 'Live search and conversation',
    categories: ['All', 'Live Search', 'Reasoning', 'Long Context'],
    modelType: 'xai',
  },
  // Extended catalog revealed on "See every model →"
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    providerKey: 'meta',
    context: '128K',
    contextNum: 128,
    bestFor: 'Open-weights agent workflows',
    categories: ['All', 'Reasoning', 'Coding'],
    modelType: 'meta',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    providerKey: 'deepseek',
    context: '64K',
    contextNum: 64,
    bestFor: 'Chain-of-thought mathematical proof',
    categories: ['All', 'Reasoning', 'Coding'],
    modelType: 'deepseek',
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    providerKey: 'mistral',
    context: '128K',
    contextNum: 128,
    bestFor: 'European multilingual reasoning',
    categories: ['All', 'Reasoning', 'Coding'],
    modelType: 'mistral',
  },
  {
    id: 'perplexity-sonar-pro',
    name: 'Perplexity Sonar Pro',
    provider: 'Perplexity',
    providerKey: 'perplexity',
    context: '128K',
    contextNum: 128,
    bestFor: 'Real-time citation grounded web search',
    categories: ['All', 'Live Search'],
    modelType: 'perplexity',
  },
  {
    id: 'cohere-command-r-plus',
    name: 'Cohere Command R+',
    provider: 'Cohere',
    providerKey: 'cohere',
    context: '128K',
    contextNum: 128,
    bestFor: 'Enterprise RAG and tool usage',
    categories: ['All', 'Long Context', 'Reasoning'],
    modelType: 'cohere',
  },
  {
    id: 'qwen-2-5-coder-32b',
    name: 'Qwen 2.5 Coder',
    provider: 'Alibaba',
    providerKey: 'alibaba',
    context: '128K',
    contextNum: 128,
    bestFor: 'Polyglot code completion & bug fixing',
    categories: ['All', 'Coding'],
    modelType: 'qwen',
  },
];

const CATEGORIES = ['All', 'Reasoning', 'Coding', 'Vision', 'Long Context', 'Live Search'];

// Monochrome Provider Icon rendering
function renderProviderLogo(providerKey, isDark, size = 15) {
  const monoFilter = isDark ? 'brightness(0) invert(1)' : 'brightness(0)';
  const monoOpacity = isDark ? 0.92 : 0.85;

  if (providerKey === 'openai') {
    return (
      <Box
        component="img"
        src="/Models/Chatgpt.svg"
        alt="OpenAI"
        sx={{
          width: size,
          height: size,
          filter: monoFilter,
          opacity: monoOpacity,
        }}
      />
    );
  }
  if (providerKey === 'anthropic') {
    return (
      <Box
        component="img"
        src="/Models/Claude.svg"
        alt="Anthropic"
        sx={{
          width: size,
          height: size,
          filter: monoFilter,
          opacity: monoOpacity,
        }}
      />
    );
  }
  if (providerKey === 'google') {
    return (
      <Box
        component="svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        sx={{ width: size, height: size, color: isDark ? '#FFFFFF' : '#0F172A', opacity: monoOpacity }}
      >
        <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
        <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" />
        <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
        <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
      </Box>
    );
  }
  if (providerKey === 'xai') {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontFamily: 'monospace',
          fontSize: `${size * 0.85}px`,
          lineHeight: 1,
          color: isDark ? '#FFFFFF' : '#0F172A',
          opacity: monoOpacity,
        }}
      >
        𝕏I
      </Box>
    );
  }
  if (providerKey === 'meta') {
    return (
      <Box
        component="img"
        src="/Models/Llama.svg"
        alt="Meta"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  if (providerKey === 'deepseek') {
    return (
      <Box
        component="img"
        src="/Models/DeepSeek.svg"
        alt="DeepSeek"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  if (providerKey === 'mistral') {
    return (
      <Box
        component="img"
        src="/Models/Mistral.svg"
        alt="Mistral"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  if (providerKey === 'perplexity') {
    return (
      <Box
        component="img"
        src="/Models/Perplexcity.svg"
        alt="Perplexity"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  if (providerKey === 'cohere') {
    return (
      <Box
        component="img"
        src="/Models/Cohere.svg"
        alt="Cohere"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  if (providerKey === 'alibaba') {
    return (
      <Box
        component="img"
        src="/Models/Qwen.svg"
        alt="Alibaba"
        sx={{ width: size, height: size, filter: monoFilter, opacity: monoOpacity }}
      />
    );
  }
  return null;
}

// Model leading icon badge (Square with rounded corners) - Pure Monochrome
function renderModelSquareIcon(modelType, isDark) {
  const containerStyle = {
    width: 36,
    height: 36,
    borderRadius: '10px',
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const monoFilter = isDark ? 'brightness(0) invert(1)' : 'brightness(0)';
  const monoOpacity = isDark ? 0.92 : 0.85;

  if (modelType === 'openai') {
    return (
      <Box sx={containerStyle}>
        <Box
          component="img"
          src="/Models/Chatgpt.svg"
          alt="OpenAI"
          sx={{
            width: 19,
            height: 19,
            filter: monoFilter,
            opacity: monoOpacity,
          }}
        />
      </Box>
    );
  }
  if (modelType === 'anthropic') {
    return (
      <Box sx={containerStyle}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '0.86rem',
            color: isDark ? '#FFFFFF' : '#0F172A',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          AI
        </Typography>
      </Box>
    );
  }
  if (modelType === 'google') {
    return (
      <Box sx={containerStyle}>
        <Box
          component="svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          sx={{ width: 19, height: 19, color: isDark ? '#FFFFFF' : '#0F172A', opacity: monoOpacity }}
        >
          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" />
          <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
        </Box>
      </Box>
    );
  }
  if (modelType === 'xai') {
    return (
      <Box sx={containerStyle}>
        <Typography
          sx={{
            fontWeight: 900,
            fontFamily: 'monospace',
            fontSize: '0.96rem',
            color: isDark ? '#FFFFFF' : '#0F172A',
            lineHeight: 1,
          }}
        >
          𝕏I
        </Typography>
      </Box>
    );
  }
  if (modelType === 'meta') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/Llama.svg" alt="Meta" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  if (modelType === 'deepseek') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/DeepSeek.svg" alt="DeepSeek" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  if (modelType === 'mistral') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/Mistral.svg" alt="Mistral" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  if (modelType === 'perplexity') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/Perplexcity.svg" alt="Perplexity" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  if (modelType === 'cohere') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/Cohere.svg" alt="Cohere" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  if (modelType === 'qwen' || modelType === 'alibaba') {
    return (
      <Box sx={containerStyle}>
        <Box component="img" src="/Models/Qwen.svg" alt="Alibaba" sx={{ width: 19, height: 19, filter: monoFilter, opacity: monoOpacity }} />
      </Box>
    );
  }
  return (
    <Box sx={containerStyle}>
      <Typography sx={{ fontWeight: 800, fontSize: '0.82rem', color: isDark ? '#FFFFFF' : '#0F172A' }}>
        AI
      </Typography>
    </Box>
  );
}

// Provider badge styling - Pure Monochrome
function getProviderStyle(providerKey, isDark) {
  return {
    bg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)',
    border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)',
    color: isDark ? '#F1F5F9' : '#0F172A',
  };
}

export default function SupportedModelsSection() {
  /* Header, then the controls, then the table, each a beat behind the one
     before it. */
  const [headRef, headShown] = useReveal();
  const [barRef, barShown] = useReveal();
  const [tableRef, tableShown] = useReveal();

  const { isDark } = useThemeMode();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortOption, setSortOption] = React.useState('Most Relevant');
  const [sortMenuOpen, setSortMenuOpen] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  // Filter and sort logic
  const filteredModels = React.useMemo(() => {
    let result = ALL_MODELS.filter((m) => {
      // Category filter
      if (selectedCategory !== 'All' && !m.categories.includes(selectedCategory)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          m.bestFor.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sort
    if (sortOption === 'Context (Highest)') {
      result = [...result].sort((a, b) => b.contextNum - a.contextNum);
    } else if (sortOption === 'Name (A-Z)') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Limit to 6 by default unless showAll is true or query/category is active
    if (!showAll && !searchQuery.trim() && selectedCategory === 'All') {
      return result.slice(0, 6);
    }
    return result;
  }, [searchQuery, selectedCategory, sortOption, showAll]);

  return (
    <Box
      id="models"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        transition: 'background-color 0.35s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, md: 4 } }}>
        {/* Header: Badge + Big Title + Subtitle */}
        <Box ref={headRef} sx={{ mb: { xs: 4, md: 5 }, maxWidth: { xs: '100%', md: 680 }, ...revealSx(headShown) }}>
          {/* Pill Badge: • MODELS */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.85, mb: 1.8 }}>
            {/* Removed dot */}
            <Typography
              sx={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              Models
            </Typography>
          </Box>

          {/* Headline: Every model you already pay for. */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '2.85rem', md: '3.3rem' },
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--text-heading)',
              mb: 1.8,
            }}
          >
            Every model you need.<br />All in <span>One</span> place.
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: { xs: '0.96rem', md: '1.02rem' },
              lineHeight: 1.55,
              maxWidth: 540,
            }}
          >
            Reason with one. Code with another. Create with a third. Choose from 200+ models and use the right one for whatever you're working on.
          </Typography>
        </Box>

        {/* Search & Filter Bar Controls */}
        <Box
          ref={barRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'stretch', lg: 'center' },
            justifyContent: 'space-between',
            gap: 1.8,
            mb: 3,
            ...revealSx(barShown, 110),
          }}
        >
          {/* Search Pill Input */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2.2,
              py: 1,
              borderRadius: '9999px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.85)',
              boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.25)' : '0 4px 16px rgba(15,23,42,0.04)',
              width: { xs: '100%', lg: 390 },
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              '&:focus-within': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : '#0F172A',
                boxShadow: isDark ? '0 6px 20px rgba(0,0,0,0.4)' : '0 6px 20px rgba(15,23,42,0.08)',
              },
            }}
          >
            <SearchIcon sx={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }} />
            <Box
              component="input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models, providers, or use cases..."
              sx={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: '0.86rem',
                color: 'var(--text-heading)',
                '&::placeholder': {
                  color: 'var(--text-secondary)',
                  opacity: 0.8,
                },
              }}
            />
          </Box>

          {/* Center Category Filter Pills */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              overflowX: 'auto',
              py: 0.5,
              px: { xs: 0.2, lg: 0 },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Box
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    px: { xs: 1.8, sm: 2.2 },
                    py: 0.8,
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(8px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                    backgroundColor: isSelected
                      ? (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)')
                      : (isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.45)'),
                    background: isSelected
                      ? (isDark
                        ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)')
                      : (isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.45)'),
                    color: isSelected
                      ? '#ff6600'
                      : (isDark ? 'rgba(255, 255, 255, 0.65)' : '#64748B'),
                    border: isSelected
                      ? (isDark ? '1px solid rgba(255, 102, 0, 0.32)' : '1px solid rgba(255, 102, 0, 0.22)')
                      : (isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)'),
                    boxShadow: isSelected
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
                      background: isSelected
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
                  {cat}
                </Box>
              );
            })}
          </Box>

          {/* Right Sort Dropdown Pill */}
          <Box sx={{ position: 'relative', flexShrink: 0, alignSelf: { xs: 'flex-start', lg: 'auto' } }}>
            <Box
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 2.2,
                py: 0.85,
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                boxShadow: isDark
                  ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.12)'
                  : '0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)',
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
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
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  whiteSpace: 'nowrap',
                }}
              >
                {sortOption}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: '1.1rem', color: 'var(--text-secondary)', flexShrink: 0 }} />
            </Box>

            {/* Dropdown Menu */}
            {sortMenuOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: 170,
                  p: 0.8,
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-card)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-normal)',
                  boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 16px 36px rgba(15,23,42,0.12)',
                  zIndex: 20,
                }}
              >
                {['Most Relevant', 'Context (Highest)', 'Name (A-Z)'].map((opt) => (
                  <Box
                    key={opt}
                    onClick={() => {
                      setSortOption(opt);
                      setSortMenuOpen(false);
                    }}
                    sx={{
                      px: 1.6,
                      py: 0.8,
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: sortOption === opt ? 700 : 500,
                      color: sortOption === opt ? 'var(--text-heading)' : 'var(--text-secondary)',
                      backgroundColor: sortOption === opt ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)') : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
                      },
                    }}
                  >
                    {opt}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Main Models Table Container (The Big Apple Liquid Glass Surface Card) */}
        <Box
          ref={tableRef}
          sx={{
            ...revealSx(tableShown, 200),
            width: '100%',
            borderRadius: { xs: '20px', md: '26px' },
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(28px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: isDark
              ? '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 20px 50px rgba(15, 23, 42, 0.05), inset 0 1px 0 #FFFFFF',
            overflow: 'hidden',
          }}
        >
          {/* Table Header Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr auto 44px',
                md: '2fr 1.4fr 1fr 2.4fr 48px',
              },
              alignItems: 'center',
              px: { xs: 2.5, sm: 3.5, md: 4 },
              py: 2,
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Model
            </Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Provider
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Context
            </Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Best For
            </Typography>
            <Box />
          </Box>

          {/* Model Rows */}
          {filteredModels.length > 0 ? (
            filteredModels.map((m, idx) => {
              const provStyle = getProviderStyle(m.providerKey, isDark);
              const isLast = idx === filteredModels.length - 1;

              return (
                <Box
                  key={m.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr auto 44px',
                      md: '2fr 1.4fr 1fr 2.4fr 48px',
                    },
                    alignItems: 'center',
                    px: { xs: 2.5, sm: 3.5, md: 4 },
                    py: { xs: 1.8, md: 2.2 },
                    borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.02)',
                      '& .action-circle-btn': {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#0F172A',
                        color: isDark ? '#FFFFFF' : '#FFFFFF',
                        transform: 'translateX(2px)',
                      },
                    },
                  }}
                >
                  {/* Model Column: Square Icon + Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.2, sm: 1.8 }, pr: 1 }}>
                    {renderModelSquareIcon(m.modelType, isDark)}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '0.88rem', sm: '0.96rem' },
                        color: 'var(--text-heading)',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {m.name}
                    </Typography>
                  </Box>

                  {/* Provider Column: Frosted Brand Pill. Hidden on phones,
                      where the logo in the model cell already says who made
                      it and the pill crowded out the context value. */}
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.8,
                        px: { xs: 1.2, sm: 1.4 },
                        py: 0.5,
                        borderRadius: '9999px',
                        backgroundColor: provStyle.bg,
                        border: `1px solid ${provStyle.border}`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {renderProviderLogo(m.providerKey, isDark, 15)}
                      <Typography
                        sx={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: provStyle.color,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.provider}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Context Column */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        fontFamily: 'inherit',
                      }}
                    >
                      {m.context}
                    </Typography>
                  </Box>

                  {/* Best For Column (Hidden on mobile) */}
                  <Box sx={{ display: { xs: 'none', md: 'block' }, pr: 2 }}>
                    <Typography
                      sx={{
                        fontSize: '0.86rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {m.bestFor}
                    </Typography>
                  </Box>

                  {/* Action Column: Round Button with Arrow */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                      className="action-circle-btn"
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-heading)',
                        transition: 'all 0.22s ease',
                      }}
                    >
                      <ArrowForwardIcon sx={{ fontSize: '0.95rem' }} />
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.95rem', mb: 1.5 }}>
                No models found matching your search.
              </Typography>
              <Box
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                sx={{
                  display: 'inline-block',
                  px: 2.5,
                  py: 0.8,
                  borderRadius: '9999px',
                  backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(8px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#ff6600',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  '&:hover': {
                    background: isDark
                      ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 228, 0.85) 100%)',
                    borderColor: isDark ? 'rgba(255, 102, 0, 0.4)' : 'rgba(255, 102, 0, 0.35)',
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
                Reset filter
              </Box>
            </Box>
          )}

          {/* Table footer: how many are left, and the two ways to see them */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 1.5,
              px: { xs: 2.5, sm: 3.5, md: 4 },
              py: 2.2,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.015)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              200+ models, with more added as they ship
            </Typography>

            {/* The toggle opens the rest of the list here; this goes to the
                models page, where they can be searched and filtered. */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexWrap: 'wrap' }}>
              <Box
                onClick={() => setShowAll(!showAll)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  px: 2,
                  py: 0.7,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  backdropFilter: 'blur(8px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                  backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                  color: 'var(--text-heading)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
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
                {showAll ? 'Show fewer models ↑' : 'See every model →'}
              </Box>

              <Box
                component="a"
                href="/models"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  px: 2,
                  py: 0.7,
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  backgroundColor: '#ff6600',
                  border: '1px solid rgba(255, 102, 0, 0.35)',
                  color: '#FFFFFF',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(255, 102, 0, 0.28)',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  '&:hover': {
                    backgroundColor: '#e65c00',
                    boxShadow: '0 4px 14px rgba(255, 102, 0, 0.36)',
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'scale(0.94)',
                  },
                }}
              >
                Open the models page
                <ArrowForwardIcon sx={{ fontSize: 15 }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
