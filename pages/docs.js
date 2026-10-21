import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ProductWindow from '@/components/ProductWindow';
import { Reveal } from '@/components/ui/LedgerUI';

/**
 * How to use Hey Open.
 *
 * This is a guide, not a second landing page. Nothing here repeats the pitch
 * from the home, memory, models or private pages: it is written for someone
 * who has already decided to try it and now wants to know which model to pick,
 * how to phrase a request, and what is worth making first.
 *
 * Everything described was checked against the running app at
 * ais.openledger.xyz on 21 Oct 2026: the picker controls, the labels on
 * models, the suggestion chips, and which features ask you to sign in.
 */

const APP = 'https://ais.openledger.xyz/chat';
const ORANGE = '#FF6600';
const MONO = '"SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace';

const CHAPTERS = [
  { id: 'start', label: 'Start here' },
  { id: 'models', label: 'Pick a model' },
  { id: 'prompt', label: 'Write the request' },
  { id: 'images', label: 'Make images' },
  { id: 'recipes', label: 'Try these' },
  { id: 'more', label: 'Beyond chat' },
  { id: 'memory', label: 'Teach it' },
  { id: 'faq', label: 'Questions' },
];

/* ------------------------------------------------------------------ */

const EYEBROW = {
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  mb: 1.6,
};

const H2 = {
  fontSize: { xs: '1.7rem', md: '2.25rem' },
  fontWeight: 800,
  lineHeight: 1.14,
  letterSpacing: '-0.03em',
  color: 'var(--text-heading)',
  mb: 1.8,
  textWrap: 'balance',
};

const H3 = {
  fontSize: { xs: '1.1rem', md: '1.2rem' },
  fontWeight: 750,
  letterSpacing: '-0.015em',
  color: 'var(--text-heading)',
  mb: 1.2,
};

const LEAD = {
  fontSize: { xs: '1rem', md: '1.06rem' },
  lineHeight: 1.72,
  color: 'var(--text-secondary)',
  maxWidth: 640,
  textWrap: 'pretty',
};

const BODY = {
  fontSize: '0.94rem',
  lineHeight: 1.72,
  color: 'var(--text-secondary)',
  textWrap: 'pretty',
};

function Band({ id, alt, children }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: '96px',
        py: { xs: 7, md: 11 },
        backgroundColor: alt ? 'var(--bg-section-alt)' : 'var(--bg-page)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}

function Intro({ eyebrow, title, lead }) {
  return (
    <Reveal>
      <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
        <Typography sx={EYEBROW}>{eyebrow}</Typography>
        <Typography component="h2" sx={{ ...H2, maxWidth: 720 }}>
          {title}
        </Typography>
        {lead && <Typography sx={LEAD}>{lead}</Typography>}
      </Box>
    </Reveal>
  );
}

/* A prompt you are meant to copy. Monospace, selectable, with a copy button,
   because a guide full of prompts that have to be retyped is not a guide. */
function Prompt({ children, label }) {
  const [copied, setCopied] = React.useState(false);
  const text = String(children);

  const copy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {}
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '10px',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card)',
        p: 2,
        pr: 7,
      }}
    >
      {label && (
        <Typography sx={{ ...EYEBROW, fontSize: '0.62rem', mb: 1 }}>{label}</Typography>
      )}
      <Typography
        component="code"
        sx={{
          display: 'block',
          fontFamily: MONO,
          fontSize: '0.82rem',
          lineHeight: 1.65,
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </Typography>
      <Box
        component="button"
        type="button"
        onClick={copy}
        aria-label="Copy this prompt"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          px: 1.2,
          py: 0.6,
          borderRadius: '7px',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-page)',
          color: copied ? ORANGE : 'var(--text-muted)',
          font: 'inherit',
          fontSize: '0.68rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          '&:hover': { color: 'var(--text-heading)' },
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </Box>
    </Box>
  );
}

function Step({ n, title, children }) {
  return (
    <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
      <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'rgba(255, 102, 0, 0.45)',
            color: ORANGE,
            fontSize: '0.78rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {n}
        </Box>
        <Box sx={{ flex: 1, width: '1px', backgroundColor: 'var(--border-subtle)', mt: 1 }} />
      </Box>
      <Box sx={{ pb: 4, minWidth: 0, flex: 1 }}>
        <Typography sx={H3}>{title}</Typography>
        {children}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const CHIPS = [
  ['Weather', 'a live-data question, which shows you which models can reach the web'],
  ['Code', 'a working React hook, with the constraints written into the request'],
  ['Write', 'a launch announcement, to show how to set tone and audience'],
  ['Analyze', 'a research question that needs sources rather than opinion'],
  ['Brainstorm', 'an idea list, where asking for a fixed count changes the output'],
];

const LABELS = [
  ['Web', 'The model can reach the live internet while it answers. Use it for anything that happened recently or needs a current number.'],
  ['Vision', 'You can attach an image and ask about it. Screenshots, diagrams, photographs of a whiteboard.'],
  ['Uncensored', 'Fewer refusals on sensitive subjects. The acceptable use rules still apply to you regardless of the model.'],
  ['TEE', 'Runs inside a hardware enclave, so the host machine cannot read the request while it is being processed.'],
  ['E2ee', 'The request is encrypted end to end.'],
  ['Incognito', 'The request is kept out of your chat history.'],
];

const PICK = [
  ['You are not sure', 'Leave the model as it is', 'The default is chosen to be reasonable at most things.'],
  ['The answer must be current', 'Anything labelled Web', 'Without web access a model can only tell you what it learned during training.'],
  ['Long document or codebase', 'A model with a large context window', 'Hover any model to see its context window. 200K and above swallows most repositories.'],
  ['You are iterating quickly', 'A small, cheap model', 'Draft with something fast, then re-run the final pass on a bigger one.'],
  ['The subject is sensitive', 'A model labelled TEE or Incognito', 'Different guarantees, so read both labels before deciding which you need.'],
  ['You want a picture', 'Switch the picker to Image', 'Text models cannot draw. The tab filters the list down to the ones that can.'],
];

const WEAK = 'Write about our new product.';

const STRONG = `You are writing for developers who have used ChatGPT but
never a multi-model tool.

Write a 150 word launch note for Hey Open, a single chat
that runs 200+ AI models.

Lead with the problem of juggling four subscriptions.
Plain English, no exclamation marks, no "revolutionary".
End with one line telling them where to start.`;

const PROMPT_PARTS = [
  ['Who it is for', 'Name the reader. "For developers who have never used a multi-model tool" changes the vocabulary, the examples and the assumed knowledge.'],
  ['What you want', 'One clear instruction. If there are two tasks, send two messages, because a single request with two goals usually does both of them badly.'],
  ['The shape of the answer', 'Length, format and structure. A word count, a table, five bullets, a code block only. Say it or you will get an essay.'],
  ['What to avoid', 'This is the one most people skip, and it is the one that fixes the output. Ban the specific thing you keep getting back.'],
];

const IMAGE_PARTS = [
  ['Subject', 'A ceramic coffee cup'],
  ['Setting', 'on a weathered oak table beside a window'],
  ['Light', 'soft morning light from the left, long shadows'],
  ['Lens or style', 'shot on 50mm, shallow depth of field'],
  ['Mood or palette', 'muted, warm, slightly desaturated'],
];

const GALLERY = [
  {
    src: '/images/imagine_portrait.jpg',
    tall: true,
    alt: 'Portrait at sunset generated from a written prompt',
    prompt: 'Portrait of a woman on a Santorini terrace at golden hour, white linen shirt, sea and whitewashed houses behind her, 85mm, shallow depth of field, warm natural light',
  },
  {
    src: '/images/imagine_sneaker.jpg',
    alt: 'Product photograph generated from a written prompt',
    prompt: 'Studio product shot of a white running shoe held in two hands, hard directional light, deep black background, commercial catalogue style',
  },
  {
    src: '/images/scenery_alpine.jpg',
    alt: 'Mountain landscape generated from a written prompt',
    prompt: 'Alpine ridge at dawn, low cloud in the valley, cool blue shadows against warm sunlit rock, wide landscape, high detail',
  },
];

const RECIPES = [
  {
    tag: 'Read',
    title: 'Get through a long document',
    why: 'Paste the whole thing. Ask for the shape of it before the detail, so you know which part to actually read.',
    prompt: `Here is a [contract / report / spec]. Before summarising, list the sections and what each one is for.

Then tell me: the three things that would cost me most if I missed them, and anything that reads as unusual for a document of this kind.

Quote the exact line for each point.`,
  },
  {
    tag: 'Build',
    title: 'Review code you did not write',
    why: 'Ask for risk, not praise. Requiring a severity and a file reference stops it listing style opinions as if they were bugs.',
    prompt: `Review this code as if you are on call for it tonight.

For each problem: the file and line, what breaks, the input that triggers it, and a severity of high, medium or low. Order by severity.

Ignore formatting and naming. If nothing is wrong at a given severity, say so instead of filling space.`,
  },
  {
    tag: 'Decide',
    title: 'Pressure test a decision',
    why: 'Most people ask for a recommendation. Asking for the strongest case against your preference is far more useful.',
    prompt: `I am planning to [decision]. My reasoning is [reasoning].

Give me the strongest argument against it, as someone who thinks it is a mistake would put it. Then tell me what would have to be true for their case to beat mine, and which of those things I can actually check this week.`,
  },
  {
    tag: 'Write',
    title: 'Draft in a voice that is not generic',
    why: 'Give it a sample of your own writing. Describing a tone rarely works. Showing it one almost always does.',
    prompt: `Here are two things I have written: [paste them].

Study the sentence length, how formal it is, and the words I avoid. Then write [the thing you want] in that voice.

Do not use: "delve", "leverage", "seamless", "robust", or any sentence starting with "In today's".`,
  },
  {
    tag: 'Learn',
    title: 'Understand something properly',
    why: 'The last line is the important one. It turns a lecture into a check on whether you actually followed it.',
    prompt: `Explain [topic] to me. I already understand [what you know], so start from there rather than the beginning.

Use one worked example with real numbers. Then name the mistake people usually make with this, and ask me two questions to check whether I followed it.`,
  },
  {
    tag: 'Compare',
    title: 'Get a straight comparison',
    why: 'Without a fixed set of criteria you get a list of features. With one you get something you can act on.',
    prompt: `Compare [A] and [B] for [your situation].

Use a table: the criteria down the side, the two options across the top. Pick the criteria yourself, but include cost, how hard it is to reverse, and what it needs from my team.

Below the table, say which you would choose and the one thing that would change your mind.`,
  },
];

const BEYOND = [
  {
    name: 'Consensus',
    gate: 'Pro plan, signed in',
    what: 'Sends one question to several models at once and reconciles the replies into a single answer.',
    when: 'Worth it when being wrong is expensive and you want to see where the models disagree rather than trust the first confident reply. Not worth it for routine questions, which it will only slow down.',
  },
  {
    name: 'Agentic Chat',
    gate: 'Pro plan, signed in',
    what: 'Works through a task in steps instead of answering in one pass, gathering what it needs as it goes.',
    when: 'Use it for research that needs several lookups, or anything you would otherwise do as five separate prompts.',
  },
  {
    name: 'Voice input',
    gate: 'Open to everyone',
    what: 'The microphone beside the send button dictates your message instead of typing it.',
    when: 'Good for long rambling context you would not bother to type, which is often exactly what the model needs.',
  },
  {
    name: 'Share chat',
    gate: 'Open to everyone',
    what: 'The share control at the top of a conversation produces a link to it.',
    when: 'Check what is in the thread before sending the link to anyone, including anything you pasted earlier.',
  },
];

const MEMORY_TEACH = [
  'How you write. British or American spelling, how formal, what you never want to see.',
  'What you work on. The stack, the repository layout, the names of things only your team uses.',
  'Constraints that always apply. Dietary requirements, accessibility needs, the budget you are working to.',
  'Who you are writing for. The audience you keep addressing, so you stop describing them every time.',
];

const FAQ = [
  {
    q: 'Which model should I use if I do not want to think about it?',
    a: 'Leave the picker alone. The default is set to be reasonable across most requests. Switching matters when you need live web access, a very large context window, or image generation.',
  },
  {
    q: 'Can I change model in the middle of a conversation?',
    a: 'Yes, and the thread carries over. It is a good way to get a second opinion: ask one model, switch, then ask the next to critique the answer.',
  },
  {
    q: 'Why did I get a short, generic answer?',
    a: 'Almost always because the request did not say how long the answer should be, who it is for, or what to leave out. Adding those three things fixes most disappointing replies.',
  },
  {
    q: 'What is the context window, and when does it matter?',
    a: 'It is how much text the model can hold at once, counting your conversation as well as anything you paste. It matters when you are working with long documents or a long thread. Hover a model in the picker to see its figure.',
  },
  {
    q: 'How do I get a picture rather than a description of one?',
    a: 'Switch the picker to the Image tab and choose a model there. Text models will describe an image rather than draw it.',
  },
  {
    q: 'Does it remember me between conversations?',
    a: 'Memory keeps facts you have told it and brings them to later chats, including after you switch model. It is held in your browser, so clearing site data erases it.',
  },
];

/* ------------------------------------------------------------------ */

function Rail({ active }) {
  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'fixed',
        left: 22,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: { xs: 'none', xl: 'flex' },
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {CHAPTERS.map((c) => {
        const on = active === c.id;
        return (
          <Box
            key={c.id}
            component="a"
            href={`#${c.id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              '&:hover .lbl': { opacity: 1 },
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 2,
                flexShrink: 0,
                backgroundColor: on ? ORANGE : 'var(--border-strong)',
                transition: 'background-color 0.25s ease',
              }}
            />
            <Typography
              className="lbl"
              sx={{
                fontSize: '0.73rem',
                fontWeight: on ? 700 : 500,
                color: on ? 'var(--text-heading)' : 'var(--text-muted)',
                opacity: on ? 1 : 0,
                transition: 'opacity 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {c.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function Question({ item, open, onToggle }) {
  return (
    <Box sx={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          py: 2.3,
          px: 0,
          color: 'var(--text-heading)',
          fontSize: { xs: '0.96rem', md: '1.02rem' },
          fontWeight: 650,
        }}
      >
        {item.q}
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 16,
            height: 16,
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: open ? ORANGE : 'var(--text-muted)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
            },
            '&::before': { top: 7, left: 0, width: 16, height: 2 },
            '&::after': { top: 0, left: 7, width: 2, height: 16, transform: open ? 'scaleY(0)' : 'scaleY(1)' },
          }}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography sx={{ ...BODY, maxWidth: 680, pb: 2.6 }}>{item.a}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function CTA({ children, href, solid }) {
  return (
    <Box
      component="a"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 1.4,
        borderRadius: '10px',
        fontSize: '0.94rem',
        fontWeight: 700,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        ...(solid
          ? { backgroundColor: ORANGE, color: '#FFFFFF', '&:hover': { backgroundColor: '#E65C00' } }
          : {
              border: '1px solid var(--border-normal)',
              color: 'var(--text-heading)',
              '&:hover': { borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-card)' },
            }),
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const [active, setActive] = React.useState(CHAPTERS[0].id);
  const [openQ, setOpenQ] = React.useState(0);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.intersectionRatio));
        let best = null;
        let ratio = 0;
        CHAPTERS.forEach((c) => {
          const r = seen.get(c.id) || 0;
          if (r > ratio) {
            ratio = r;
            best = c.id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.15, 0.4, 0.8] }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>How to Use Hey Open: Prompts, Models and Recipes | Hey Open</title>
        <meta
          name="description"
          content="A working guide: which model to pick and why, how to write a request that gets a usable answer, prompt recipes you can copy, and how to generate images."
        />
      </Head>

      <PageHeader />
      <Rail active={active} />

      {/* ================= HERO ================= */}
      <Box sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 1, md: 2 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 } }}>
          <Reveal>
            <Box sx={{ maxWidth: 740 }}>
              <Typography sx={EYEBROW}>Guide</Typography>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.3rem', sm: '2.9rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 2.4,
                  textWrap: 'balance',
                }}
              >
                How to actually use{' '}
                <Box component="span" sx={{ color: ORANGE }}>
                  Hey Open.
                </Box>
              </Typography>
              <Typography sx={{ ...LEAD, fontSize: { xs: '1.05rem', md: '1.15rem' }, mb: 3.4 }}>
                Which model to pick and why, how to phrase a request so the answer is worth
                reading, and a set of prompts you can copy and run today. If you have five
                minutes, read the first two sections and skip to the recipes.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                <CTA href={APP} solid>
                  Open the chat
                  <Box component="span" aria-hidden="true">→</Box>
                </CTA>
                <CTA href="#recipes">Jump to the recipes</CTA>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ================= START ================= */}
      <Band id="start">
        <Intro
          eyebrow="Start here"
          title="Your first five minutes."
          lead="There is nothing to install and nothing to configure. The whole product is one message box and a model name underneath it."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 0, md: 7 } }}>
          <Reveal>
            <Box>
              <Step n="1" title="Open the chat and ask something real">
                <Typography sx={{ ...BODY, mb: 2 }}>
                  Skip the test question. Ask the thing you were going to do manually this
                  afternoon, because a vague trial gives you a vague impression of the product.
                </Typography>
                <Prompt label="Try this first">
                  {'I have to [the task you were dreading]. Ask me four questions that would help you do it well, then wait for my answers before starting.'}
                </Prompt>
              </Step>

              <Step n="2" title="Use the five chips to learn the shape of a request">
                <Typography sx={BODY}>
                  Under the box sit Weather, Code, Write, Analyze and Brainstorm. Each one loads a
                  fully written example into the message box rather than sending anything, so you
                  can read how it is phrased and edit it before you send.
                </Typography>
                <Box sx={{ mt: 2.4, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {CHIPS.map(([name, what]) => (
                    <Box key={name} sx={{ display: 'flex', gap: 1.6, alignItems: 'baseline' }}>
                      <Box
                        component="span"
                        sx={{
                          flexShrink: 0,
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          px: 1.1,
                          py: 0.35,
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-pill)',
                          color: 'var(--text-heading)',
                          minWidth: 76,
                          textAlign: 'center',
                        }}
                      >
                        {name}
                      </Box>
                      <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>{what}</Typography>
                    </Box>
                  ))}
                </Box>
              </Step>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Step n="3" title="Keep going in the same thread">
                <Typography sx={BODY}>
                  The first answer is a draft, not a verdict. Replying inside the same conversation
                  keeps everything you have already said in play, so corrections compound instead
                  of starting over. Starting a new chat throws that away, which is sometimes what
                  you want and often not.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Prompt label="The most useful follow up">
                    {'That is close. Keep the structure, cut it by a third, and make the second point concrete with an example.'}
                  </Prompt>
                </Box>
              </Step>

              <Step n="4" title="Know what the sidebar is for">
                <Typography sx={{ ...BODY, mb: 1.6 }}>
                  Collapsed by default. Expand it for new chats and for search across everything
                  you have asked before, which is faster than scrolling. Some entries there are
                  gated or not open yet, and the section below says which.
                </Typography>
                <Typography sx={{ ...BODY, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  There is also a light and dark toggle at the top of it.
                </Typography>
              </Step>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= MODELS ================= */}
      <Band id="models" alt>
        <Intro
          eyebrow="Pick a model"
          title="The picker is the part worth learning."
          lead="Most people never open it, and it is where most of the value sits. Click the model name under the message box."
        />

        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <ProductWindow />
          </Box>
        </Reveal>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 7 }, mb: { xs: 5, md: 7 } }}>
          <Reveal>
            <Box>
              <Typography sx={H3}>What the controls do</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                {[
                  ['Search', 'Type part of a name. Faster than scrolling a list of hundreds.'],
                  ['All, Text, Image, Video', 'Filters by what the model produces. This is how you find an image model.'],
                  ['Sort', 'Alphabetical, or by the picker’s own ordering.'],
                  ['Star', 'Favourites a model so it sits at the top next time. Worth doing for the three you actually use.'],
                  ['Hover a row', 'Shows its context window and the estimated cost of a message.'],
                ].map(([t, d]) => (
                  <Box key={t}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {t}
                    </Typography>
                    <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>{d}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Typography sx={H3}>What the labels mean</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                {LABELS.map(([t, d]) => (
                  <Box key={t}>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        px: 1,
                        py: 0.3,
                        borderRadius: '5px',
                        border: '1px solid rgba(255, 102, 0, 0.3)',
                        backgroundColor: 'rgba(255, 102, 0, 0.08)',
                        color: ORANGE,
                        mb: 0.6,
                      }}
                    >
                      {t}
                    </Box>
                    <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>{d}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>

        <Reveal>
          <Box
            sx={{
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ backgroundColor: 'var(--bg-section-alt)' }}>
                    {['If', 'Pick', 'Because'].map((h) => (
                      <Box
                        key={h}
                        component="th"
                        sx={{
                          textAlign: 'left',
                          px: 2.4,
                          py: 1.6,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {PICK.map(([iff, pick, why]) => (
                    <Box key={iff} component="tr" sx={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <Box component="td" sx={{ px: 2.4, py: 1.8, fontSize: '0.88rem', fontWeight: 650, color: 'var(--text-heading)', verticalAlign: 'top' }}>
                        {iff}
                      </Box>
                      <Box component="td" sx={{ px: 2.4, py: 1.8, fontSize: '0.88rem', color: ORANGE, fontWeight: 650, verticalAlign: 'top' }}>
                        {pick}
                      </Box>
                      <Box component="td" sx={{ px: 2.4, py: 1.8, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        {why}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Band>

      {/* ================= PROMPT ================= */}
      <Band id="prompt">
        <Intro
          eyebrow="Write the request"
          title="Four things turn a bad answer into a good one."
          lead="The model is rarely the problem. Nearly every disappointing reply traces back to a request that left the important decisions to the machine."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 5, md: 7 } }}>
          <Reveal>
            <Box
              sx={{
                height: '100%',
                p: { xs: 2.4, md: 3 },
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <Typography sx={{ ...EYEBROW, color: 'var(--text-muted)', mb: 1.6 }}>
                What most people send
              </Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.84rem', color: 'var(--text-secondary)', mb: 2 }}>
                {WEAK}
              </Typography>
              <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>
                Nothing here says who reads it, how long it should be, or what tone to take. The
                model guesses all three, and it guesses the average of everything it has ever seen,
                which is why the answer sounds like nobody wrote it.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box
              sx={{
                height: '100%',
                p: { xs: 2.4, md: 3 },
                borderRadius: '14px',
                border: '1px solid',
                borderColor: 'rgba(255, 102, 0, 0.4)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <Typography sx={{ ...EYEBROW, color: ORANGE, mb: 1.6 }}>Send this instead</Typography>
              <Typography
                component="pre"
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  m: 0,
                  mb: 2,
                }}
              >
                {STRONG}
              </Typography>
              <Typography sx={{ ...BODY, fontSize: '0.88rem' }}>
                Same request, four decisions taken out of the model’s hands. It takes about twenty
                seconds longer to write and saves three rounds of correction.
              </Typography>
            </Box>
          </Reveal>
        </Box>

        <Reveal>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
            {PROMPT_PARTS.map(([t, d], i) => (
              <Box key={t} sx={{ display: 'flex', gap: 2 }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: ORANGE, pt: 0.4, minWidth: 20 }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-heading)', mb: 0.6 }}>
                    {t}
                  </Typography>
                  <Typography sx={{ ...BODY, fontSize: '0.89rem' }}>{d}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Band>

      {/* ================= IMAGES ================= */}
      <Band id="images" alt>
        <Intro
          eyebrow="Make images"
          title="Describe it the way a photographer would."
          lead="Switch the picker to the Image tab first, then build the prompt in layers. Naming the light and the lens does more than piling on adjectives."
        />

        <Reveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'start',
              mb: { xs: 5, md: 7 },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 1fr',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 1.6,
                height: { xs: 330, sm: 400, md: 450 },
              }}
            >
              {GALLERY.map((g) => (
                <Box
                  key={g.src}
                  sx={{
                    gridRow: g.tall ? 'span 2' : 'auto',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Box
                    component="img"
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>
              ))}
            </Box>

            <Box>
              <Typography sx={H3}>Build it in layers</Typography>
              <Typography sx={{ ...BODY, mb: 2.4 }}>
                Each line below adds one decision. Drop any of them and the model picks for you,
                which is how you end up with the same soft, over-lit image everybody else gets.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {IMAGE_PARTS.map(([t, example], i) => (
                  <Box
                    key={t}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      py: 1.4,
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)', minWidth: 104, flexShrink: 0 }}>
                      {t}
                    </Typography>
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {example}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Typography sx={{ ...H3, mb: 2.4 }}>The prompts behind those three</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {GALLERY.map((g) => (
              <Prompt key={g.src}>{g.prompt}</Prompt>
            ))}
          </Box>
        </Reveal>
      </Band>

      {/* ================= RECIPES ================= */}
      <Band id="recipes">
        <Intro
          eyebrow="Try these"
          title="Six prompts worth stealing."
          lead="Copy one, replace what is in brackets, and send it. Each is built around a trick that reliably changes the quality of the reply."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {RECIPES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 80}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.2 }}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      px: 1,
                      py: 0.35,
                      borderRadius: '5px',
                      backgroundColor: 'var(--bg-pill)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {r.tag}
                  </Box>
                </Box>
                <Typography sx={{ ...H3, mb: 0.8 }}>{r.title}</Typography>
                <Typography sx={{ ...BODY, fontSize: '0.89rem', mb: 2 }}>{r.why}</Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Prompt>{r.prompt}</Prompt>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Band>

      {/* ================= BEYOND ================= */}
      <Band id="more" alt>
        <Intro
          eyebrow="Beyond chat"
          title="What else is in there, and what it costs you."
          lead="Two of these need a paid plan and a sign in. Worth knowing before you go looking for them."
        />

        <Reveal>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 3, md: 4 } }}>
            {BEYOND.map((b) => (
              <Box
                key={b.name}
                sx={{
                  p: { xs: 2.4, md: 3 },
                  borderRadius: '14px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.2, mb: 1.4 }}>
                  <Typography sx={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-heading)' }}>
                    {b.name}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      px: 1,
                      py: 0.3,
                      borderRadius: '5px',
                      backgroundColor: 'var(--bg-pill)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {b.gate}
                  </Box>
                </Box>
                <Typography sx={{ ...BODY, fontSize: '0.9rem', mb: 1.4 }}>{b.what}</Typography>
                <Typography sx={{ ...BODY, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {b.when}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={100}>
          <Typography sx={{ ...BODY, fontSize: '0.88rem', mt: 4, maxWidth: 640 }}>
            Model Factory, Deploy and Staking appear in the sidebar but are marked coming soon in
            the app, so there is nothing to use there yet.
          </Typography>
        </Reveal>
      </Band>

      {/* ================= MEMORY ================= */}
      <Band id="memory">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 7 } }}>
          <Reveal>
            <Box>
              <Typography sx={EYEBROW}>Teach it</Typography>
              <Typography component="h2" sx={H2}>
                Spend ten minutes on memory once.
              </Typography>
              <Typography sx={BODY}>
                Memory is the difference between a tool you re-explain yourself to every morning
                and one that already knows the constraints. The fastest way to fill it is not to
                wait for it to notice things, but to tell it directly in a single message.
              </Typography>
              <Box sx={{ mt: 2.6 }}>
                <Prompt label="Paste this, edited, on your first day">
                  {'Remember these about me and use them from now on:\n\n1. I write in British English, no exclamation marks.\n2. I work on [stack], mostly [the part you own].\n3. When I ask for code, no comments unless the logic is genuinely unclear.\n4. I prefer short answers. Ask before writing anything over 300 words.'}
                </Prompt>
              </Box>
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box>
              <Typography sx={{ ...H3, mt: { md: 7 } }}>Worth teaching it</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {MEMORY_TEACH.map((m, i) => (
                  <Box
                    key={m}
                    sx={{
                      display: 'flex',
                      gap: 1.6,
                      py: 1.6,
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <Box
                      component="span"
                      aria-hidden="true"
                      sx={{ color: ORANGE, fontWeight: 800, fontSize: '0.8rem', pt: '2px' }}
                    >
                      ✓
                    </Box>
                    <Typography sx={{ ...BODY, fontSize: '0.9rem' }}>{m}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ ...BODY, fontSize: '0.88rem', mt: 2.4, color: 'var(--text-muted)' }}>
                Review it occasionally. A fact that was true in March and is wrong in October is
                worse than no memory at all, and you can delete entries one at a time in Settings.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ================= FAQ ================= */}
      <Band id="faq" alt>
        <Box sx={{ maxWidth: 820 }}>
          <Intro eyebrow="Questions" title="Things people hit in the first week." />
          <Reveal>
            <Box sx={{ borderTop: '1px solid var(--border-subtle)' }}>
              {FAQ.map((item, i) => (
                <Question key={item.q} item={item} open={openQ === i} onToggle={() => setOpenQ(openQ === i ? -1 : i)} />
              ))}
            </Box>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ mt: { xs: 6, md: 9 } }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.9rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  mb: 1.4,
                  textWrap: 'balance',
                }}
              >
                Pick one recipe and run it now.
              </Typography>
              <Typography sx={{ ...BODY, maxWidth: 480, mb: 3.2 }}>
                Reading about prompting does very little. Ten minutes with the review or the
                decision prompt above will teach you more than the rest of this page.
              </Typography>
              <CTA href={APP} solid>
                Open the chat
                <Box component="span" aria-hidden="true">→</Box>
              </CTA>
            </Box>
          </Reveal>
        </Box>
      </Band>

      <Footer />
    </Box>
  );
}
