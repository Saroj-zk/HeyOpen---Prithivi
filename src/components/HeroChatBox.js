import * as React from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SuggestionChips from './SuggestionChips';

const SUPPORTED_MODELS = [
  { id: 'chatgpt-4o', name: 'ChatGPT 4o', provider: 'OpenAI', iconSrc: '/Models/Chatgpt.svg' },
  { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', iconSrc: '/Models/Claude.svg' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', iconSrc: '/Models/DeepSeek.svg' },
  { id: 'gemini-1-5', name: 'Gemini 1.5 Pro', provider: 'Google', iconSrc: '/Models/Gemini.svg' },
  { id: 'llama-3-3', name: 'Llama 3.3', provider: 'Meta', iconSrc: '/Models/Llama.svg' },
  { id: 'grok-2', name: 'Grok 2', provider: 'xAI', iconSrc: '/Models/Grok.svg' },
  { id: 'midjourney-v6', name: 'Midjourney V6', provider: 'Midjourney', iconSrc: '/Models/Midjourney.svg' },
  { id: 'flux-1', name: 'FLUX.1 Schnell', provider: 'Black Forest', iconSrc: '/Models/Flux.svg' },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI', iconSrc: '/Models/Mistral.svg' },
  { id: 'perplexity', name: 'Perplexity Pro', provider: 'Perplexity', iconSrc: '/Models/Perplexcity.svg' },
  { id: 'qwen-2-5', name: 'Qwen 2.5', provider: 'Alibaba', iconSrc: '/Models/Qwen.svg' },
];

const SAMPLE_PROMPTS = [
  'Explain quantum computing and superposition in simple terms...',
  'Write a performant React custom hook for debouncing search input...',
  'Analyze global weather patterns and atmospheric pressure shifts this week...',
  'Draft an engaging product launch announcement for an autonomous AI model...',
  'Compare DeepSeek R1 vs Claude 3.5 Sonnet on mathematical reasoning...',
  'Write a Solidity smart contract for automated token staking and rewards...',
  'Hyper-realistic portrait of an astronaut octopus floating in deep space, 8k...',
  'Help me debug a memory leak in my Next.js server-rendered application...',
  'What are the latest breakthroughs in on-chain verifiable AI inference?...',
  'Design a microservices architecture for real-time crypto telemetry...',
  'Cinematic drone shot swooping through misty mountain peaks at sunrise, 4k...',
  'Summarize the key differences between optimistic and ZK rollups...',
  'How can zero-knowledge proofs protect user privacy in machine learning?...',
  'Isometric 3D render of a futuristic decentralized server farm in Iceland...',
  'Draft an executive summary of global macro AI adoption trends in 2025...',
];

export default function HeroChatBox({ prompt, setPrompt }) {
  const [modelIndex, setModelIndex] = React.useState(0);
  const [modelFade, setModelFade] = React.useState(false);

  // Dynamic typewriter placeholder state
  const [placeholderText, setPlaceholderText] = React.useState(SAMPLE_PROMPTS[0]);

  const textareaRef = React.useRef(null);

  // Automatically cycle through supported models so users visually see multi-model support
  React.useEffect(() => {
    const interval = setInterval(() => {
      setModelFade(true);
      setTimeout(() => {
        setModelIndex((prev) => (prev + 1) % SUPPORTED_MODELS.length);
        setModelFade(false);
      }, 240);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect generating random sample texts
  React.useEffect(() => {
    let currentIdx = 0;
    let charIdx = SAMPLE_PROMPTS[0].length;
    let isDeleting = true;
    let timer = null;

    const runTypewriter = () => {
      const currentFull = SAMPLE_PROMPTS[currentIdx] || SAMPLE_PROMPTS[0];

      if (isDeleting) {
        if (charIdx > 0) {
          charIdx--;
          setPlaceholderText(currentFull.substring(0, charIdx));
          timer = setTimeout(runTypewriter, 16);
        } else {
          isDeleting = false;
          let nextIdx;
          if (SAMPLE_PROMPTS.length > 1) {
            do {
              nextIdx = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
            } while (nextIdx === currentIdx);
          } else {
            nextIdx = 0;
          }
          currentIdx = nextIdx;
          timer = setTimeout(runTypewriter, 300);
        }
      } else {
        const targetFull = SAMPLE_PROMPTS[currentIdx];
        if (charIdx < targetFull.length) {
          charIdx++;
          setPlaceholderText(targetFull.substring(0, charIdx));
          const typingSpeed = 26 + Math.random() * 18;
          timer = setTimeout(runTypewriter, typingSpeed);
        } else {
          isDeleting = true;
          timer = setTimeout(runTypewriter, 2400);
        }
      }
    };

    // Pause briefly on initial prompt before beginning deletion & cycling
    timer = setTimeout(runTypewriter, 1800);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleSend = (textToSend) => {
    let query = typeof textToSend === 'string' ? textToSend.trim() : (prompt || '').trim();
    if (!query && placeholderText) {
      query = placeholderText.replace(/\.\.\.$/, '').trim();
    }
    let targetUrl = 'https://ais.openledger.xyz/chat';
    if (query) {
      targetUrl = `https://ais.openledger.xyz/chat?q=${encodeURIComponent(query)}`;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && !prompt && placeholderText) {
      e.preventDefault();
      setPrompt(placeholderText.replace(/\.\.\.$/, '').trim());
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const activeModel = SUPPORTED_MODELS[modelIndex];

  return (
    <Box
      id="hero-chat-container"
      sx={{
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        zIndex: 10,
        display: 'block',
        opacity: 1,
        visibility: 'visible',
      }}
    >
        <Box
          sx={{
            backgroundColor: 'rgba(18, 20, 26, 0.92)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            borderRadius: '1.2rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              '0 25px 70px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            '&:focus-within': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.75), 0 0 20px rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            },
          }}
        >
          {/* Upper Composer Area */}
          <Box
            sx={{
              p: { xs: 2, sm: 2.4 },
              pb: 1.4,
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 1.5,
            }}
          >
            <InputBase
              multiline
              inputRef={textareaRef}
              minRows={2}
              maxRows={6}
              fullWidth
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={prompt ? '' : placeholderText}
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '0.96rem', sm: '1.04rem' },
                lineHeight: 1.5,
                fontFamily: 'inherit',
                flex: 1,
                '& .MuiInputBase-input': {
                  padding: 0,
                  outline: 'none !important',
                  '&:focus, &:focus-visible': {
                    outline: 'none !important',
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.48)',
                    opacity: 1,
                  },
                },
              }}
            />

            {/* Top Right Action Icons (Visual only, no functionality) */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                flexShrink: 0,
                pt: 0.2,
              }}
            >
              {/* Temporary Chat */}
              <Tooltip title="Temporary Chat" placement="top">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <img
                    src="/Icons/Tempary Chat.svg"
                    alt="Temporary Chat"
                    style={{
                      width: 17,
                      height: 17,
                      filter: 'brightness(0) invert(0.65)',
                    }}
                  />
                </Box>
              </Tooltip>

              {/* Enhance Prompt */}
              <Tooltip title="Enhance Prompt" placement="top">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <img
                    src="/Icons/Prompt Enhance.svg"
                    alt="Enhance prompt"
                    style={{
                      width: 18,
                      height: 18,
                      filter: 'brightness(0) invert(0.65)',
                    }}
                  />
                </Box>
              </Tooltip>

              {/* Expand */}
              <Tooltip title="Expand" placement="top">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <OpenInFullIcon
                    sx={{
                      fontSize: 16,
                      color: 'rgba(255, 255, 255, 0.65)',
                    }}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>

          {/* Separator line */}
          <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

          {/* Bottom Toolbar */}
          <Box
            sx={{
              px: { xs: 2, sm: 2.5 },
              py: 1.1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(0, 0, 0, 0.18)',
              position: 'relative',
            }}
          >
            {/* Left: Automatically Rotating Multi-Model Pill */}
            <Tooltip
              title="HeyOpen dynamically routes prompts across multiple leading AI models"
              placement="top"
            >
              <Box
                onClick={() => {
                  setModelFade(true);
                  setTimeout(() => {
                    setModelIndex((prev) => (prev + 1) % SUPPORTED_MODELS.length);
                    setModelFade(false);
                  }, 180);
                }}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  py: 0.6,
                  px: 1.6,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  '&:hover': {
                    background: 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                    borderColor: 'rgba(255, 102, 0, 0.45)',
                    backdropFilter: 'blur(16px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.3), inset 0 0 0 0.5px rgba(255, 102, 0, 0.3)',
                    transform: 'translateY(-1px)',
                    '& .model-name': { color: '#ff6600' },
                  },
                  '&:active': {
                    transform: 'scale(0.94)',
                  },
                }}
              >
                {/* Active Model with smooth transition */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.1,
                    opacity: modelFade ? 0 : 1,
                    transform: modelFade ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'opacity 0.22s ease, transform 0.22s ease',
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={activeModel.iconSrc}
                      alt={activeModel.name}
                      style={{
                        width: 17,
                        height: 17,
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#FFFFFF',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activeModel.name}
                  </Typography>

                  <Box
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '5px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activeModel.provider}
                  </Box>
                </Box>
              </Box>
            </Tooltip>

            {/* Right: Attach, Voice input (Visual only, no functionality), and Send Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              {/* Attach Icon */}
              <Tooltip title="Attach files" placement="top">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <img
                    src="/Icons/Attach.svg"
                    alt="Attach"
                    style={{
                      width: 17,
                      height: 17,
                      filter: 'brightness(0) invert(0.65)',
                    }}
                  />
                </Box>
              </Tooltip>

              {/* Voice Input Icon */}
              <Tooltip title="Voice input" placement="top">
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      borderColor: 'rgba(255, 255, 255, 0.22)',
                    },
                  }}
                >
                  <img
                    src="/Icons/Voice input.svg"
                    alt="Voice input"
                    style={{
                      width: 18,
                      height: 18,
                      filter: 'brightness(0) invert(0.8)',
                    }}
                  />
                </Box>
              </Tooltip>

              {/* Send Button */}
              <Tooltip title="Open in HeyOpen" placement="top">
                <IconButton
                  onClick={() => handleSend()}
                  aria-label="Send message"
                  sx={{
                    width: 34,
                    height: 34,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 243, 235, 0.88) 100%)',
                    border: '1px solid rgba(255, 102, 0, 0.28)',
                    color: '#ff6600',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08), inset 0 1.5px 1.5px rgba(255, 255, 255, 1), inset 0 0 0 0.5px rgba(255, 102, 0, 0.2)',
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    '&:hover': {
                      background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 235, 220, 0.95) 100%)',
                      borderColor: 'rgba(255, 102, 0, 0.45)',
                      transform: 'scale(1.06)',
                      backdropFilter: 'blur(16px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(200%)',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12), inset 0 2px 2px rgba(255, 255, 255, 1), inset 0 0 0 0.5px rgba(255, 102, 0, 0.3)',
                    },
                    '&:active': { transform: 'scale(0.92)' },
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: 18, fontWeight: 700 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

      {/* Suggestion Chips */}
      <Box sx={{ mt: 2.5 }}>
        <SuggestionChips
          onSelectPrompt={(sample) => {
            setPrompt(sample);
            if (textareaRef.current) {
              textareaRef.current.focus();
            }
            // Automatically launch into the product page with the selected prompt
            handleSend(sample);
          }}
        />
      </Box>
    </Box>
  );
}
