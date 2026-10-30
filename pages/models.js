import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, ProviderTile } from '@/components/ui/LedgerUI';
import ProductWindow from '@/components/ProductWindow';
import { MODELS, KINDS, PROVIDERS } from '@/data/catalog';
import PageMeta from '@/components/PageMeta';

/* How many models the product serves. The list further down carries the
   ones written up so far, which is fewer, so the two are kept apart: this
   is what the page claims, MODELS.length is what it is showing. */
const CATALOG_SIZE = '200+';

const ORANGE = '#FF6600';
const SECTION_PY = { xs: 8, md: 12 };

/* Headings even out their lines rather than filling one and leaving a word
   on the next. Body copy only avoids the single word last line, because
   balancing a long paragraph makes the measure wander. */
const BALANCE = { textWrap: 'balance' };
const PRETTY = { textWrap: 'pretty' };

/* The hero sits on a permanently light background image, so it keeps literal
   light colours. Everything below it reads from the theme tokens. */
const HERO_INK = 'rgb(71, 85, 105)';
const HERO_INK_2 = 'rgb(100, 116, 139)';
const HERO_HAIRLINE = 'rgba(15, 23, 42, 0.14)';

/* Section 3: what the router actually does with a prompt. Every lane is a real
   entry in the catalog below, so the claim and the list agree. */
const LANES = [
  { code: 'AN', model: 'Claude Opus 4', task: 'Refactor across forty files' },
  { code: 'DS', model: 'DeepSeek R1', task: 'Prove it, and show the steps' },
  { code: 'GG', model: 'Gemini 2.5 Pro', task: 'Read the whole repository' },
  { code: 'BF', model: 'FLUX 1.1 Pro', task: 'Render the hero image' },
];

const ROUTER_NOTES = [
  ['Pick by name', 'Choose any model on this page directly, the way you would inside its own app.'],
  ['Or let it choose', 'Describe the task and the router sends it to whichever model handles it best.'],
  ['Ask several at once', 'Run one prompt across three models and read the answers side by side.'],
];

const PAGE_SIZE = 40;

function PromptRouter() {
  const [active, setActive] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % LANES.length), 2300);
    return () => clearInterval(t);
  }, [running]);

  const LANE_H = 74;
  const HEAD_H = 46;
  const trunkTop = HEAD_H / 2;
  const laneCentre = (i) => HEAD_H + i * LANE_H + LANE_H / 2;

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      {/* The trunk runs from the prompt down to the last lane */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '19px',
          top: `${trunkTop}px`,
          height: `${laneCentre(LANES.length - 1) - trunkTop}px`,
          width: '1px',
          backgroundColor: 'var(--border-normal)',
        }}
      />
      {/* The marker is the only thing that moves */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '16px',
          top: `${laneCentre(active) - 3.5}px`,
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: ORANGE,
          boxShadow: '0 0 0 4px rgba(255, 102, 0, 0.16)',
          transition: 'top 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <Box sx={{ height: `${HEAD_H}px`, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            px: 1.8,
            py: 0.7,
            borderRadius: '10px',
            border: '1px solid var(--border-normal)',
            backgroundColor: 'var(--bg-card)',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE }} />
          One prompt
        </Box>
      </Box>

      {LANES.map((lane, i) => {
        const on = i === active;
        return (
          <Box
            key={lane.model}
            sx={{ height: `${LANE_H}px`, display: 'flex', alignItems: 'center', gap: 2, pl: '19px' }}
          >
            {/* Branch stub off the trunk */}
            <Box
              aria-hidden="true"
              sx={{
                width: 21,
                height: '1px',
                flexShrink: 0,
                backgroundColor: on ? ORANGE : 'var(--border-normal)',
                transition: 'background-color 0.4s ease',
              }}
            />
            <Box sx={{ opacity: on ? 1 : 0.55, transition: 'opacity 0.4s ease', flexShrink: 0 }}>
              <ProviderTile code={lane.code} size={34} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: on ? 'var(--text-heading)' : 'var(--text-secondary)',
                  transition: 'color 0.4s ease',
                }}
              >
                {lane.model}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-muted)', mt: 0.2 }}>
                {lane.task}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function ModelsPage() {
  const [selectedKind, setSelectedKind] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [providerFilter, setProviderFilter] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  /* Everything except the modality filter, so picking a modality narrows this
     rather than starting again from the full list. */
  const baseModels = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MODELS.filter((m) => {
      if (providerFilter && m.code !== providerFilter) return false;
      if (!q) return true;
      return [m.name, m.provider, m.bestFor, m.description, m.detail]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [searchQuery, providerFilter]);

  const filteredModels = React.useMemo(
    () => (selectedKind === 'all' ? baseModels : baseModels.filter((m) => m.kind === selectedKind)),
    [baseModels, selectedKind]
  );

  /* Any change to the filters starts the list from the top again. */
  React.useEffect(() => { setExpanded(false); }, [selectedKind, searchQuery, providerFilter]);

  const visibleModels = expanded ? filteredModels : filteredModels.slice(0, PAGE_SIZE);
  const activeProvider = providerFilter ? PROVIDERS.find((p) => p.code === providerFilter) : null;

  const jumpToCatalog = (code) => {
    setProviderFilter(code);
    setSelectedKind('all');
    setSearchQuery('');
    const el = document.getElementById('catalog-list');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <PageMeta
        title={`${CATALOG_SIZE} AI Models in One Subscription | Hey Open`}
        description={`Access GPT-4o, Claude Opus 4, DeepSeek R1, Gemini 2.5 Pro, FLUX and ${CATALOG_SIZE} models from ${PROVIDERS.length} providers in one subscription, with no tracking.`}
        path="/models"
      />

      <PageHeader spacer={false} />

      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <Box
        sx={{
          position: 'relative',
          /* 112/128/152px of hero padding plus the 78/92px the header spacer
             used to contribute, so the copy sits where it did before. */
          pt: { xs: '190px', sm: '206px', md: '244px' },
          pb: { xs: 13, md: 17 },
          backgroundImage: 'url(/images/hero_BG.png)',
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#EEF0F0',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Box
              sx={{
                maxWidth: '56rem',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  color: ORANGE,
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
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} />
                Every frontier lab
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.3rem' },
                  fontWeight: 700,
                  lineHeight: 1.07,
                  letterSpacing: '-0.035em',
                  color: HERO_INK,
                  mb: 3,
                }}
              >
                Every model.{' '}
                {/* Its own line: the sentence breaks on the full stop, and
                    balancing would put "One" at the end of the first line. */}
                <Box component="span" sx={{ color: ORANGE, display: 'block' }}>
                  One subscription.
                </Box>
              </Typography>

              <Typography
                sx={{
                  mx: 'auto',
                  maxWidth: '52ch',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  color: HERO_INK_2,
                  mb: 4.5,
                  ...BALANCE,
                }}
              >
                Text, code, images, video, audio and music from every frontier lab. Pick a model by
                name, or describe the task and let the router send it to whichever one handles it best.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center' }}>
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 102, 0, 0.12)',
                    color: ORANGE,
                    px: 4.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 102, 0, 0.18)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Launch all models →
                </Box>
                <Box
                  component="a"
                  href="#catalog-list"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: HERO_INK,
                    px: 3.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: `1px solid ${HERO_HAIRLINE}`,
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    transition: 'all 0.25s ease',
                    '&:hover': { borderColor: ORANGE, color: ORANGE, transform: 'translateY(-2px)' },
                  }}
                >
                  See all {CATALOG_SIZE} ↓
                </Box>
              </Box>
            </Box>
          </Reveal>

          {/* Counts sit on a hairline rail rather than four floating cards */}
          <Reveal delay={110}>
            <Box
              sx={{
                mt: { xs: 7, md: 9 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                borderTop: `1px solid ${HERO_HAIRLINE}`,
              }}
            >
              {[
                [CATALOG_SIZE, 'Models', 'Reasoning, vision and media'],
                [`${PROVIDERS.length}`, 'Providers', 'Every major lab, one bill'],
                ['10M', 'Longest context', 'Tokens in a single prompt'],
                [`${KINDS.length}`, 'Modalities', 'Text, image, video, audio, music'],
              ].map(([value, label, note], i) => (
                <Box
                  key={label}
                  sx={{
                    px: { xs: 2, md: 3.5 },
                    py: { xs: 3, md: 3.5 },
                    textAlign: 'left',
                    borderLeft: `1px solid ${HERO_HAIRLINE}`,
                    borderTop: { xs: i > 1 ? `1px solid ${HERO_HAIRLINE}` : 'none', md: 'none' },
                    '&:nth-of-type(2n+1)': { borderLeft: { xs: 'none', md: `1px solid ${HERO_HAIRLINE}` } },
                    '&:first-of-type': { borderLeft: 'none' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '2rem', md: '2.6rem' },
                      fontWeight: 700,
                      color: ORANGE,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      mb: 1.2,
                    }}
                  >
                    {value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: HERO_INK }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: HERO_INK_2, mt: 0.3, lineHeight: 1.45 }}>
                    {note}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Container>

        {/* Curved divider, matching the homepage */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: { xs: 40, sm: 60, md: 80 },
            pointerEvents: 'none',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M 0,80 Q 720,0 1440,80 L 1440,85 L 0,85 Z" fill="var(--bg-page)" />
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* ── Section 2: The provider index ───────────────────────── */}
        <Box sx={{ py: SECTION_PY }}>
          <Reveal>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
                gap: { xs: 2, md: 6 },
                alignItems: 'end',
                mb: { xs: 4, md: 5 },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.7rem' },
                  fontWeight: 700,
                  lineHeight: 1.22,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  ...BALANCE,
                }}
              >
                {PROVIDERS.length} labs. One account.
              </Typography>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '50ch', ...PRETTY }}>
                Every provider below is live today. Pick one to filter the list, or scroll past
                and browse the whole list.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={80}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {PROVIDERS.map((p) => (
                <Box
                  key={p.code}
                  component="button"
                  type="button"
                  onClick={() => jumpToCatalog(p.code)}
                  sx={{
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.4,
                    px: { xs: 1, md: 1.75 },
                    py: 1.9,
                    border: 0,
                    borderTop: '1px solid var(--border-subtle)',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.2s ease',
                    '&:hover': { backgroundColor: 'var(--bg-glass)' },
                    '&:hover .p-name': { color: ORANGE },
                  }}
                >
                  <ProviderTile code={p.code} size={26} />
                  <Typography
                    className="p-name"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      transition: 'color 0.2s ease',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 3: Routing ──────────────────────────────────── */}
        <Rule />
        <Box sx={{ py: SECTION_PY }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 10 },
              gridTemplateColumns: { lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    color: ORANGE,
                    mb: 2,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE }} />
                  Routing
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '2.9rem' },
                    fontWeight: 700,
                    lineHeight: 1.18,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    maxWidth: '24ch',
                    mb: 2.5,
                    ...BALANCE,
                  }}
                >
                  No model wins at everything.
                </Typography>
                <Typography sx={{ maxWidth: '52ch', fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 4.5, ...PRETTY }}>
                  Claude holds a long refactor together. DeepSeek shows its working on a proof.
                  Gemini swallows a whole repository. Knowing which one to reach for is most of the
                  skill, so you can hand that part over.
                </Typography>

                <Box>
                  {ROUTER_NOTES.map(([title, body], i) => (
                    <Box
                      key={title}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '180px minmax(0, 1fr)' },
                        gap: { xs: 0.4, sm: 3 },
                        py: 2.25,
                        borderTop: i === 0 ? '1px solid var(--border-normal)' : '1px solid var(--border-subtle)',
                        borderBottom: i === ROUTER_NOTES.length - 1 ? '1px solid var(--border-normal)' : 'none',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {body}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={120}>
              <PromptRouter />
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 4: The app itself ──────────────────────────── */}
        <Rule />
        <Box sx={{ py: SECTION_PY }}>
          <Reveal>
            <Box sx={{ textAlign: 'center', maxWidth: '58ch', mx: 'auto', mb: { xs: 5, md: 7 } }}>
              <Typography
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                  mb: 2.5,
                }}
              >
                <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE }} />
                Live in the app
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 2.5,
                  ...BALANCE,
                }}
              >
                Every one of them, one click away.
              </Typography>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '52ch', mx: 'auto', ...BALANCE }}>
                Search by name, narrow by modality, star the ones you keep coming back to. Each model
                carries what it can do, and you see context and cost before you commit. No account
                needed to start.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={110}>
            <Box sx={{ maxWidth: 1060, mx: 'auto' }}>
              <ProductWindow />
            </Box>
          </Reveal>

          <Reveal delay={190}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 5 } }}>
              <Box
                component="a"
                href="https://ais.openledger.xyz/chat"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3.5,
                  py: 1.6,
                  borderRadius: '9999px',
                  backgroundColor: ORANGE,
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px -8px rgba(255, 102, 0, 0.5)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                  '&:hover': { backgroundColor: '#E65C00', transform: 'translateY(-2px)' },
                }}
              >
                Open the app
                <Box component="span" aria-hidden="true">→</Box>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 5: The catalog ────────────────────────────── */}
        <Rule />
        <Box id="catalog-list" sx={{ py: SECTION_PY, scrollMarginTop: '96px' }}>
          <Reveal>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'flex-end' },
                justifyContent: 'space-between',
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.9rem', md: '2.5rem' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    ...BALANCE,
                  }}
                >
                  Browse every model
                </Typography>
                <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)', mt: 0.8 }}>
                  {filteredModels.length === MODELS.length
                    ? 'Filter by modality, or search for a model by name.'
                    : `Showing ${filteredModels.length}`}
                </Typography>
              </Box>

              {/* An underlined field rather than a pill, to keep the page flat */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  pb: 1,
                  borderBottom: '1px solid var(--border-normal)',
                  width: { xs: '100%', md: 320 },
                  transition: 'border-color 0.2s',
                  '&:focus-within': { borderColor: ORANGE },
                }}
              >
                <SearchIcon sx={{ fontSize: '1.15rem', color: 'var(--text-muted)' }} />
                <InputBase
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model, provider or task"
                  sx={{
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    width: '100%',
                    '& input::placeholder': { color: 'var(--text-muted)', opacity: 1 },
                  }}
                />
              </Box>
            </Box>

            {/* Modality tabs */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2.5, md: 3.5 },
                borderBottom: '1px solid var(--border-subtle)',
                mb: providerFilter ? 2.5 : 0,
              }}
            >
              {[{ id: 'all', label: 'All' }]
                .concat(KINDS.map((k) => ({ id: k.id, label: k.label })))
                .map((tab) => {
                  const on = selectedKind === tab.id;
                  return (
                    <Box
                      key={tab.id}
                      component="button"
                      type="button"
                      onClick={() => setSelectedKind(tab.id)}
                      sx={{
                        font: 'inherit',
                        cursor: 'pointer',
                        border: 0,
                        backgroundColor: 'transparent',
                        px: 0,
                        pb: 1.4,
                        mb: '-1px',
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 0.8,
                        borderBottom: `2px solid ${on ? ORANGE : 'transparent'}`,
                        color: on ? 'var(--text-heading)' : 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        fontWeight: on ? 700 : 500,
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                        '&:hover': { color: 'var(--text-heading)' },
                      }}
                    >
                      {tab.label}
                    </Box>
                  );
                })}
            </Box>

            {/* Only rendered when a provider filter is actually on */}
            {activeProvider && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Filtered to {activeProvider.name}
                </Typography>
                <Box
                  component="button"
                  type="button"
                  onClick={() => setProviderFilter(null)}
                  sx={{
                    font: 'inherit',
                    cursor: 'pointer',
                    border: 0,
                    backgroundColor: 'transparent',
                    p: 0,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: ORANGE,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Clear
                </Box>
              </Box>
            )}
          </Reveal>

          {/* One table. Hairline rows keep a long catalog scannable and let the
              columns line up all the way down the page. */}
          <Reveal delay={60}>
            <Box sx={{ mt: 4 }}>
              {/* Column headings */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'grid' },
                  gridTemplateColumns: '30px minmax(0, 2fr) minmax(0, 1.25fr) 86px 64px',
                  alignItems: 'center',
                  columnGap: 3,
                  pb: 1.4,
                  borderBottom: '1px solid var(--border-strong)',
                }}
              >
                <Box />
                {['Model', 'Best for', 'Context', ''].map((label, i) => (
                  <Typography
                    key={label || i}
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Box>

              {visibleModels.map((model) => (
                <Box
                  key={model.name}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '30px minmax(0, 1fr)',
                      md: '30px minmax(0, 2fr) minmax(0, 1.25fr) 86px 64px',
                    },
                    alignItems: 'center',
                    columnGap: { xs: 1.75, md: 3 },
                    rowGap: 0.75,
                    py: { xs: 2, md: 2.1 },
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 0.2s ease',
                    '&:hover': { backgroundColor: 'var(--bg-glass)' },
                    '&:hover .model-open': { color: ORANGE },
                  }}
                >
                  <ProviderTile code={model.code} size={30} />

                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {model.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {model.provider}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        mt: 0.25,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {model.description}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      gridColumn: { xs: '2 / -1', md: 'auto' },
                      fontSize: '0.84rem',
                      lineHeight: 1.45,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {model.bestFor || 'General purpose'}
                  </Typography>

                  <Typography
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {model.detail}
                  </Typography>

                  <Box
                    component="a"
                    className="model-open"
                    href="https://ais.openledger.xyz/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      textAlign: 'right',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Open →
                  </Box>
                </Box>
              ))}

              {filteredModels.length === 0 && (
                <Box sx={{ py: 7, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Nothing matches that. Try a provider name, or clear the search.
                  </Typography>
                </Box>
              )}

              {!expanded && filteredModels.length > PAGE_SIZE && (
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setExpanded(true)}
                    sx={{
                      font: 'inherit',
                      cursor: 'pointer',
                      px: 3.5,
                      py: 1.3,
                      borderRadius: '9999px',
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: ORANGE, color: ORANGE },
                    }}
                  >
                    Show more
                  </Box>
                </Box>
              )}
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 6: Closing ──────────────────────────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 9, md: 14 } }}>
          <Reveal>
            <Box sx={{ maxWidth: '44rem', mx: 'auto', textAlign: 'center' }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.3rem' },
                  fontWeight: 700,
                  lineHeight: 1.14,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  mb: 2.5,
                  ...BALANCE,
                }}
              >
                All {CATALOG_SIZE} of them, behind one login.
              </Typography>
              <Typography
                sx={{
                  maxWidth: '52ch',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 5,
                  ...BALANCE,
                }}
              >
                No separate accounts, no API keys to rotate, and no per provider subscription to
                cancel later. Open the chat and start with whichever model you like.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center' }}>
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: ORANGE,
                    color: '#FFFFFF',
                    px: 5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 30px rgba(255,102,0,0.32), inset 0 1px 0 rgba(255,255,255,0.25)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 40px rgba(255,102,0,0.45)',
                    },
                  }}
                >
                  Open the chat →
                </Box>
                <Link href="/private" passHref style={{ textDecoration: 'none' }}>
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
                      transition: 'all 0.25s ease',
                      '&:hover': { borderColor: ORANGE, color: ORANGE, transform: 'translateY(-2px)' },
                    }}
                  >
                    How privacy works
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
