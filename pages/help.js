import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import { MONO, RULE } from '@/components/ui/Ledger';

/**
 * The Help Center.
 *
 * ------------------------------------------------------------------
 * It ships with the site rather than beside it, so it inherits the real
 * header, the real footer and the real tokens. Everything here is built
 * from var(--bg-card), var(--text-*) and var(--brand-accent): nothing
 * carries a hardcoded colour, which is what keeps it in step when the
 * palette moves.
 *
 * ------------------------------------------------------------------
 * THE CONTENT IS DATA, not markup. SECTIONS below is the whole document,
 * and the page renders it. The rail, the contents list and the sections
 * are all generated from that one array, so a new section appears in all
 * three at once and the numbering cannot drift.
 *
 * Six parts, in the order a reader needs them: start, chat, create, pay,
 * build, help. A reader who only wants to ask one question stops after
 * part one.
 *
 * ------------------------------------------------------------------
 * Everything here was read from the live application and the live site on
 * 4 and 5 November 2026. Counts, prices and availability are a snapshot
 * of that date; the application is the source of truth.
 */

const SNAP = '5 November 2026';
const APP = 'https://ais.openledger.xyz/chat';

/* ------------------------------------------------------------------ */
/* Blocks                                                              */
/* ------------------------------------------------------------------ */

const PANEL = {
  border: '1px solid var(--border-subtle)',
  borderRadius: '14px',
  backgroundColor: 'var(--bg-card)',
};

function Para({ children }) {
  return (
    <Typography sx={{ mb: 1.6, maxWidth: '68ch', fontSize: '1rem', lineHeight: 1.72, color: 'var(--text-secondary)' }}>
      {children}
    </Typography>
  );
}

function H3({ children }) {
  return (
    <Typography
      component="h3"
      sx={{
        mt: 3.4, mb: 1.2, fontSize: '1.06rem', fontWeight: 700,
        letterSpacing: '-0.02em', color: 'var(--text-heading)',
      }}
    >
      {children}
    </Typography>
  );
}

/* A numbered walkthrough. The rule down the left is what makes a set of
   steps read as a sequence rather than as a list that happens to count. */
function Steps({ items }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: '4px 0 20px', p: 0, maxWidth: '68ch' }}>
      {items.map(([title, body], i) => (
        <Box component="li" key={title} sx={{ position: 'relative', pl: 5.2, pb: i === items.length - 1 ? 0 : 2.4 }}>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute', left: 0, top: '1px', width: 26, height: 26, borderRadius: '50%',
              backgroundColor: 'var(--brand-accent)', color: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {i + 1}
          </Box>
          {i !== items.length - 1 && (
            <Box aria-hidden="true" sx={{ position: 'absolute', left: '13px', top: 30, bottom: 6, width: '1px', backgroundColor: 'var(--border-subtle)' }} />
          )}
          <Typography sx={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-heading)', mb: 0.3 }}>{title}</Typography>
          <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{body}</Typography>
        </Box>
      ))}
    </Box>
  );
}

const TONES = {
  note: ['var(--bg-section)', 'var(--border-subtle)', 'var(--text-muted)'],
  warn: ['rgba(255,102,0,0.055)', 'rgba(255,102,0,0.22)', '#B4531A'],
  stop: ['rgba(180,40,30,0.05)', 'rgba(180,40,30,0.2)', '#9B2F26'],
};

function Callout({ tag, tone = 'note', children }) {
  const [bg, edge, ink] = TONES[tone];
  return (
    <Box sx={{ ...PANEL, backgroundColor: bg, borderColor: edge, p: '14px 17px', mb: 2.2, maxWidth: '68ch' }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: ink, mb: 0.7 }}>
        {tag}
      </Typography>
      <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.68, color: 'var(--text-secondary)' }}>{children}</Typography>
    </Box>
  );
}

function Table({ head, rows, widths }) {
  return (
    <Box sx={{ ...PANEL, overflowX: 'auto', mb: 2.4 }}>
      <Box component="table" sx={{ borderCollapse: 'collapse', width: '100%', minWidth: 460, fontVariantNumeric: 'tabular-nums' }}>
        <Box component="thead">
          <Box component="tr">
            {head.map((h, i) => (
              <Box
                component="th"
                key={h}
                sx={{
                  textAlign: 'left', p: '10px 14px', fontSize: '0.74rem', fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-section)', borderBottom: `1px solid ${RULE}`,
                  whiteSpace: 'nowrap', width: widths ? widths[i] : undefined,
                }}
              >
                {h}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((r, ri) => (
            <Box component="tr" key={ri}>
              {r.map((c, ci) => (
                <Box
                  component="td"
                  key={ci}
                  sx={{
                    p: '10px 14px', fontSize: '0.9rem', lineHeight: 1.6, verticalAlign: 'top',
                    color: ci === 0 ? 'var(--text-heading)' : 'var(--text-secondary)',
                    fontWeight: ci === 0 ? 600 : 400,
                    borderBottom: ri === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  }}
                >
                  {c}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Cards({ items }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.6, mb: 2.4 }}>
      {items.map(([t, s]) => (
        <Box key={t} sx={{ ...PANEL, p: '14px 16px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', mb: 0.4 }}>{t}</Typography>
          <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{s}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function Shot({ src, alt, caption }) {
  return (
    <Box component="figure" sx={{ m: '0 0 26px' }}>
      {/* No lazy loading, and an explicit ratio. An <img> with no intrinsic
          size collapses to a 1px box before it loads; a 1px box never
          intersects the viewport, so a lazy image in it is never fetched
          and the figure stays blank forever. Reserving the ratio also
          stops the page jumping as each screenshot arrives. Nine images
          at about 200 KB in total do not need deferring. */}
      <Box
        component="img"
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sx={{
          display: 'block', width: '100%', height: 'auto', aspectRatio: '1440 / 900',
          objectFit: 'cover', objectPosition: 'top',
          backgroundColor: 'var(--bg-section)',
          borderRadius: '14px', border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      />
      <Typography component="figcaption" sx={{ mt: 1.2, fontSize: '0.84rem', color: 'var(--text-muted)' }}>{caption}</Typography>
    </Box>
  );
}

function Pill({ children, tone }) {
  const accent = tone === 'a';
  const stop = tone === 's';
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block', fontFamily: MONO, fontSize: '0.64rem', fontWeight: 500,
        padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap',
        border: `1px solid ${accent ? 'rgba(255,102,0,0.26)' : stop ? 'rgba(180,40,30,0.24)' : 'var(--border-normal)'}`,
        backgroundColor: accent ? 'rgba(255,102,0,0.08)' : stop ? 'rgba(180,40,30,0.06)' : 'var(--bg-section)',
        color: accent ? '#B4531A' : stop ? '#9B2F26' : 'var(--text-muted)',
      }}
    >
      {children}
    </Box>
  );
}

const Em = ({ children }) => (
  <Box component="strong" sx={{ color: 'var(--text-heading)', fontWeight: 650 }}>{children}</Box>
);

/* ------------------------------------------------------------------ */
/* The document                                                        */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  /* ---------------- 1. START ---------------- */
  {
    part: 'Start here',
    id: 'what',
    nav: 'What is Hey Open?',
    title: 'What is Hey Open?',
    body: (
      <>
        <Para>
          Hey Open is a private, multi-model AI workspace. One app gives you 133 AI models, a privacy
          level you set per conversation, a memory that follows you between models, and tools for
          images, video and audio in the same place.
        </Para>
        <Para>
          <Em>Available on:</Em> web at <Box component="a" href={APP} sx={{ color: 'var(--brand-accent)' }}>ais.openledger.xyz</Box>.
          The app opens straight into a chat. You can browse the whole catalogue without an account;
          sending a message requires signing in.
        </Para>
        <Shot src="/help/01-chat-empty.jpg" alt="The Hey Open chat screen with composer, model picker and starter chips." caption="The chat screen. Composer in the middle, model and request mode beneath it, privacy and memory in the header." />
        <H3>What makes it different</H3>
        <Cards items={[
          ['Every model, one subscription', 'Paying for ChatGPT, Claude, Gemini and the rest separately comes to about $165 a month. Hey Open is $20.'],
          ['Privacy per conversation', 'A filter in the header decides which models you may use, by how strongly each protects the prompt.'],
          ['Speed or cost, per request', 'A request mode on the composer biases the gateway toward the cheapest or the fastest providers.'],
          ['One memory across models', 'Saved details are reused in new chats, whichever model answers.'],
          ['Chat, image, video, audio', '64 text models, 35 image, 34 video, plus 12 single-purpose tools.'],
          ['One API endpoint', 'An OpenAI-compatible endpoint reaches every model behind one key.'],
        ]} />
      </>
    ),
  },
  {
    part: 'Start here',
    id: 'first',
    nav: 'Your first conversation',
    title: 'Your first conversation',
    body: (
      <>
        <Para>You do not need an account to look around. You do need one to send a message.</Para>
        <Steps items={[
          ['Open the app', <>Go to <Box component="a" href={APP} sx={{ color: 'var(--brand-accent)' }}>ais.openledger.xyz/chat</Box>. It opens on the chat screen.</>],
          ['Set your privacy level, if it matters', 'Click Privacy in the header and pick Min, Mid or Max. Leave it on Min for ordinary work.'],
          ['Choose a model, or leave it on Auto', 'The pill under the composer reads Auto, which picks a model per message. Click it to choose one yourself.'],
          ['Type your question', 'Be specific about what you want back. Instead of "write a launch post", try "write a 400 word launch announcement for enterprise IT buyers, with a headline, a subhead and three benefits".'],
          ['Sign in when prompted', 'Sending requires an account. Click Connect Wallet in the header.'],
          ['Follow up in the same thread', 'Keep going rather than starting over. The thread holds the context, and you can switch models mid-conversation without losing it.'],
        ]} />
        <H3>Starter prompts</H3>
        <Para>
          Five chips sit under the composer on an empty screen: Weather, Code, Write, Analyze and
          Brainstorm. Each fills the composer with a starting prompt you can edit.
        </Para>
        <H3>If the answer is not good enough</H3>
        <Table
          head={['Problem', 'What to do']}
          rows={[
            ['Too broad', 'Say what to keep, what to cut, and what a good answer looks like.'],
            ['Misunderstood', 'Ask the model to state its assumptions before continuing.'],
            ['Confidently wrong', 'Check it elsewhere, or ask a second model to criticise it. A second opinion sharpens scrutiny; it does not prove correctness.'],
            ['Forgot something', 'The thread may have outgrown the context window. Restate the decisive requirement.'],
          ]}
          widths={['28%', '72%']}
        />
        <Callout tag="Good to know">
          A long thread costs more per turn than a short one, because the earlier turns are sent
          again as context each time.
        </Callout>
      </>
    ),
  },
  {
    part: 'Start here',
    id: 'workspace',
    nav: 'The workspace',
    title: 'The workspace',
    body: (
      <>
        <Para>The sidebar groups everything into three areas. Click the menu icon to expand it.</Para>
        <Shot src="/help/09-sidebar-expanded.jpg" alt="The expanded sidebar showing Workspace, AI Studio and Tools." caption="The expanded sidebar: Workspace, AI Studio and Tools, with recent chats below." />
        <Table
          head={['Group', 'Item', 'What it does', 'State']}
          rows={[
            ['Workspace', 'New Chat', 'Starts a fresh conversation', <Pill>Live</Pill>],
            ['', 'Consensus', 'Ask several models at once', <Pill tone="a">Pro</Pill>],
            ['', 'Home', 'Quick actions and the community feed', <Pill>Live</Pill>],
            ['', 'More', 'Agents, Community Feed, API, Token Dashboard', <Pill>Live</Pill>],
            ['AI Studio', 'Model Factory', 'Customise and train your own models', <Pill tone="s">Soon</Pill>],
            ['', 'Staking', 'Stake tokens to support the network', <Pill tone="s">Soon</Pill>],
            ['Tools', 'Image', '9 single-purpose image tools', <Pill>Live</Pill>],
            ['', 'Audio', '3 audio tools', <Pill>Live</Pill>],
          ]}
          widths={['16%', '20%', '48%', '16%']}
        />
        <H3>The header and composer</H3>
        <Table
          head={['Control', 'Where', 'What it does']}
          rows={[
            ['Memory', 'Header', 'Two switches controlling what is saved and what is used'],
            ['Privacy', 'Header', 'The Min / Mid / Max filter'],
            ['Connect Wallet', 'Header', 'Signs you in'],
            ['Model pill', 'Composer', 'Reads Auto until you choose a model'],
            ['Request mode pill', 'Composer', 'Reads Boost by default'],
            ['Voice input', 'Composer', 'Dictate instead of typing'],
          ]}
          widths={['26%', '18%', '56%']}
        />
        <H3>Finding an old chat</H3>
        <Para>
          Chat search is at the top of the sidebar, or press Ctrl K. Recent chats are listed below
          the Tools group.
        </Para>
        <Shot src="/help/07-search-chats.jpg" alt="The chat search dialog." caption="Chat search, reachable with Ctrl K from anywhere in the app." />
      </>
    ),
  },

  /* ---------------- 2. CHAT ---------------- */
  {
    part: 'Chatting',
    id: 'models',
    nav: 'Choosing a model',
    title: 'Choosing a model',
    body: (
      <>
        <Para>
          Hey Open holds 133 models. The picker in the app is the source of truth; what follows is a
          snapshot taken on 4 November 2026.
        </Para>
        <Steps items={[
          ['Open the picker', 'Click the model pill under the composer. It reads Auto until you change it.'],
          ['Narrow the list', 'Use the All / Text / Image / Video tabs, or type in Search models.'],
          ['Read the badges', 'Each model carries badges for privacy, web access and restrictions.'],
          ['Pick one, or star it', 'Click a model to use it. Click the star to keep it at the top.'],
        ]} />
        <Shot src="/help/03-model-picker-video.jpg" alt="The model picker on the Video tab showing per-second prices." caption="The model picker on the Video tab. Video models show a price per second of output." />
        <H3>What the badges mean</H3>
        <Table
          head={['Badge', 'Meaning']}
          rows={[
            [<Pill>Incognito</Pill>, 'Routed so the provider does not receive your identity. The provider still processes the prompt under its own terms.'],
            [<Pill>Private</Pill>, 'Runs under zero-data-retention terms.'],
            [<Pill>TEE</Pill>, 'Trusted Execution Environment. Inference runs inside a hardware-isolated enclave, so the GPU operator cannot read the prompt.'],
            [<Pill>E2EE</Pill>, 'End to end encrypted. Encrypted on your device, decrypted only inside a verified enclave.'],
            [<Pill>Web</Pill>, 'Can retrieve live web results. 24 of the 64 text models carry this.'],
            [<Pill>Vision</Pill>, 'Accepts images as input.'],
            [<Pill>Uncensored</Pill>, 'Reduced content filtering. Applicable law and the Terms still apply.'],
            [<Pill>Not in Boost</Pill>, 'Unavailable when the request mode is Boost.'],
            [<Pill>Image required</Pill>, 'Needs a source image. Cannot generate from text alone.'],
          ]}
          widths={['22%', '78%']}
        />
        <H3>Which model should I use?</H3>
        <Table
          head={['If you want', 'Try']}
          rows={[
            ['Most everyday things', 'Auto, or GPT 6 Luna'],
            ['Hard reasoning', 'Claude Opus 5, o3, Kimi K2 Thinking'],
            ['Writing', 'Claude Sonnet 5, GPT 6 Sol'],
            ['Code', 'Kimi K2.7 Code, Claude Opus 5'],
            ['Speed', 'Gemini 3.8 Flash, Qwen3.8 Flash, Nemotron 3.5 Lightning'],
            ['Live web results', 'Any Web-badged model, such as Grok 4.6 or GPT 5.1'],
            ['Maximum privacy', 'Any E2EE model, such as Qwen3.8 27B (E2EE)'],
            ['Reading an image', 'Qwen3 VL 30B (E2EE) or Qwen3 VL 235B'],
          ]}
          widths={['36%', '64%']}
        />
        <H3>Who is in the catalogue</H3>
        <Table
          head={['Provider', 'Models']}
          rows={[
            ['OpenAI', 'GPT 6 Sol, Luna and Astra, GPT 5.6 Sol / Luna / Terra, GPT 5.4 and Mini, GPT 5.1, GPT 3.5 Turbo, GPT OSS 120B, o3, o4 mini'],
            ['Anthropic', 'Claude Opus 5, Claude Opus 4.7, Claude Sonnet 5, Claude Haiku 4.5, Claude Fable 5'],
            ['Google', 'Gemini 4 Argon, Gemini 3.8 and 3.7 Flash, Gemini 3.5 and 3.1 Flash Lite, Gemini 2.5 Pro, Gemma 4 26B and 31B IT'],
            ['xAI', 'Grok 4.6, Grok 4.5, Grok 4.3'],
            ['Others', 'DeepSeek V4 Pro / Flash / R1, Qwen3.8 Max, Qwen3.7 Max, Kimi K3, Kimi K2 Thinking, MiniMax M3, Mistral Large 4.0, GLM 5.3, Nemotron 3.5 Lightning, Fugu Ultra, Hy3, MiMo V2.5 Pro'],
          ]}
          widths={['18%', '82%']}
        />
        <Callout tag="Good to know">
          Every model in the picker shows Sign in. Browsing the catalogue is open to everyone;
          running a model is not. A context window figure is a technical maximum, not a target:
          filling it is slow and expensive.
        </Callout>
      </>
    ),
  },
  {
    part: 'Chatting',
    id: 'privacy',
    nav: 'Privacy filter',
    title: 'Privacy filter: Min, Mid and Max',
    body: (
      <>
        <Para>
          This is the control most people miss. It sits in the header next to Memory, and it decides
          which models you are allowed to use at all, by how strongly the route protects your prompt.
        </Para>
        <Shot src="/help/02-privacy-filter.jpg" alt="The privacy filter open, showing Min, Mid and Max." caption="The privacy filter, set to Min. Raising it removes models from the picker." />
        <Table
          head={['Setting', 'What it allows', 'Text models left']}
          rows={[
            ['Min', 'Every model, whatever it is tagged.', '64 of 64'],
            ['Mid', 'Private, TEE and E2EE models only.', '10 of 64'],
            ['Max', 'TEE and E2EE models only, hardware-protected prompts.', '9 of 64'],
          ]}
          widths={['14%', '62%', '24%']}
        />
        <Steps items={[
          ['Click Privacy in the header', 'Three settings appear, with a description of the current one underneath.'],
          ['Pick a level', 'Min for ordinary work. Mid when the material is confidential. Max when it must never leave an enclave in readable form.'],
          ['Check your model is still there', 'Raising the filter removes models. If one you were using has gone, this is why.'],
        ]} />
        <Callout tag="Important" tone="warn">
          HTTPS in transit is not end-to-end encryption, and Incognito is the weakest of the four
          badges: it hides who you are from the provider, but does not stop the provider keeping the
          prompt. Only E2EE means the prompt is encrypted before it leaves your device.
        </Callout>
        <Callout tag="Never">
          Do not put passwords, recovery phrases, secret keys or API credentials into a prompt, on
          any route and at any privacy level.
        </Callout>
      </>
    ),
  },
  {
    part: 'Chatting',
    id: 'mode',
    nav: 'Request mode',
    title: 'Request mode',
    body: (
      <>
        <Para>
          Separate from privacy, the request mode decides which providers the gateway reaches for
          first. It sits on the composer next to the model pill and reads Boost by default.
        </Para>
        <Shot src="/help/04-memory-and-request-mode.jpg" alt="Memory settings and the four request modes." caption="Memory settings in the header, and the four request modes on the composer." />
        <Table
          head={['Mode', 'What it does', 'Use it when']}
          rows={[
            ['Default', 'Every model; the gateway picks the vendor.', 'You have no preference.'],
            ['Saver', 'Cheapest providers first.', 'The task is routine and you care about cost.'],
            ['Balanced', 'A balance of speed and cost.', 'General work.'],
            ['Boost', 'Fastest providers first.', 'You are waiting on the answer.'],
          ]}
          widths={['16%', '46%', '38%']}
        />
        <Callout tag="Good to know">
          Three text models and ten image models are badged Not in Boost and disappear from the
          picker in that mode. If a model vanished and the privacy filter is unchanged, check this.
        </Callout>
        <H3>Token optimisation</H3>
        <Para>
          A request carries more than your message: the instruction, the chat history, retrieved
          memory, tool definitions and any media. Hey Open trims duplicated or irrelevant material
          and reuses context where it can, which the site describes as up to 60% fewer tokens billed
          on a typical example.
        </Para>
        <Para>
          That is an estimate, not a guarantee on any given request. Trimming carries a risk too: if
          correctness depends on an instruction stated earlier, restate it rather than trusting
          automatic selection.
        </Para>
      </>
    ),
  },
  {
    part: 'Chatting',
    id: 'consensus',
    nav: 'Consensus Mode',
    title: 'Consensus Mode',
    body: (
      <>
        <Para>
          Consensus sends one prompt to several models and brings their answers together, so you can
          see where they disagree before you act.
        </Para>
        <Shot src="/help/05-consensus-gate.jpg" alt="The Consensus sign-in gate." caption="Consensus requires signing in, and a Pro plan." />
        <Callout tag="Availability" tone="warn">
          Consensus is available to members on the Pro plan and above, and requires signing in.
          Opening it without an account shows a sign-in gate.
        </Callout>
        <Steps items={[
          ['Open Consensus from the sidebar', 'It carries a NEW badge in the Workspace group.'],
          ['Ask a question worth the cost', 'Use it for a decision, a review or a trade-off analysis, not for everyday questions.'],
          ['Read the individual answers first', 'The disagreements are the useful part. A combined answer can hide them.'],
          ['Verify anything that matters', 'Agreement between models is not proof. They can share training data and repeat the same error.'],
        ]} />
        <Callout tag="Cost" tone="warn">
          Every participating model consumes usage. One Consensus question can cost several times a
          single-model turn, which makes it the easiest way to spend a lot of credits by accident.
        </Callout>
      </>
    ),
  },
  {
    part: 'Chatting',
    id: 'memory',
    nav: 'Memory',
    title: 'Memory',
    body: (
      <>
        <Para>
          Memory keeps useful details about you so you do not have to re-explain yourself to each new
          model. Reach it from Memory in the header.
        </Para>
        <Table
          head={['Switch', 'What it does']}
          rows={[
            ['Save memories from chats', 'Automatically saves useful details about you as you chat. Requires Use memory to be on.'],
            ['Use memory', 'Lets the assistant use your saved memories in new chats.'],
          ]}
          widths={['30%', '70%']}
        />
        <Para>
          Turning Use memory off disables saving as well, because the save switch depends on it.
        </Para>
        <Callout tag="Important" tone="warn">
          Memory is sent to whichever model answers, so it travels under that model&rsquo;s privacy
          route. Raise the privacy filter before putting anything sensitive into memory.
        </Callout>
        <Callout tag="Good to know">
          Memory is not chat history. It stores selected facts such as preferences, project details
          and decisions, not a transcript of every conversation.
        </Callout>
      </>
    ),
  },

  /* ---------------- 3. CREATE ---------------- */
  {
    part: 'Creating',
    id: 'images',
    nav: 'Images',
    title: 'Images',
    body: (
      <>
        <Para>35 image models sit in the same picker as chat, under the Image tab.</Para>
        <Steps items={[
          ['Select an image-capable model', 'A text model cannot generate pictures. Check the Image tab.'],
          ['Describe the image, not the feeling', 'Cover subject, intended use, style, composition, background, lighting and framing.'],
          ['Set dimensions only if the model exposes them', 'Not every model lets you choose an aspect ratio.'],
          ['Assess before you regenerate', 'Check anatomy, text rendering, logos and likeness. Every regeneration is charged again.'],
          ['Change one variable at a time', 'Adjust the lighting or the composition, not both, or you will not know which change worked.'],
        ]} />
        <H3>What goes in a prompt</H3>
        <Table
          head={['Element', 'Example']}
          rows={[
            ['Subject', 'A private AI workspace represented as modular glass panels'],
            ['Style', 'Editorial illustration, restrained'],
            ['Palette', 'Neutral background, blue-grey'],
            ['Lighting', 'Soft directional'],
            ['Composition', 'Wide 16:9, generous negative space'],
            ['Exclusions', 'No text, no logos'],
          ]}
          widths={['22%', '78%']}
        />
        <H3>Model families</H3>
        <Table
          head={['Family', 'Models', 'Note']}
          rows={[
            ['Flux', 'Flux 2 Klein, Flux Pro, Flux Pro V1.1 and Ultra, Flux Realism, Flux Schnell, Flux Dev, Flux Kontext Pro and Max', 'All nine are Not in Boost'],
            ['Gemini', 'Gemini 3 Pro Image, 3.1 Flash Lite Image, Flash Image, each with an Edit variant', ''],
            ['GPT', 'GPT Image 2, GPT 5.4 Image 2, GPT 5 Image, GPT 5 Image Mini, each with an Edit variant', ''],
            ['Grok', 'Grok Imagine Image 2.0 and Edit', ''],
            ['Others', 'Nano Banana Pro, Seedream V5 Pro and Lite, Z Image and Pro, Qwen Image Edit', 'Seedream, Z Image and Qwen are Uncensored'],
          ]}
          widths={['14%', '58%', '28%']}
        />
        <Callout tag="Good to know">
          Models whose name ends in Edit expect a source image. Eleven image models are badged Image
          required and cannot generate from text alone.
        </Callout>
      </>
    ),
  },
  {
    part: 'Creating',
    id: 'video',
    nav: 'Video',
    title: 'Video',
    body: (
      <>
        <Para>
          34 video models, under the Video tab. Thirteen publish a price per second of output, which
          makes video the one place in the product where cost is visible before you commit.
        </Para>
        <Table
          head={['Model', 'Per second', '10 seconds', 'Note']}
          rows={[
            ['Seedance 1.5 Pro', '$0.02', '$0.20', 'Cheapest priced model'],
            ['Seedance 2.0 Mini', '$0.03', '$0.30', ''],
            ['Seedance 2.0 Fast', '$0.04', '$0.40', ''],
            ['Hailuo 2.3', '$0.08', '$0.80', ''],
            ['Hailuo 3 Max', '$0.08', '$0.80', ''],
            ['Kling V3.0 Standard', '$0.08', '$0.80', ''],
            ['Wan 2.7', '$0.10', '$1.00', ''],
            ['Kling V3.0 Pro', '$0.11', '$1.10', ''],
            ['Kling Video O1', '$0.11', '$1.10', ''],
            ['Runway Gen4.5', '$0.12', '$1.20', <Pill>Image required</Pill>],
            ['Hailuo 3', '$0.13', '$1.30', ''],
            ['Wan 3.0', '$0.20', '$2.00', <Pill>Image required</Pill>],
            ['Wan 3.0 Prime', '$0.28', '$2.80', 'Most expensive'],
          ]}
          widths={['32%', '18%', '18%', '32%']}
        />
        <Para>
          Ten seconds costs $0.20 on Seedance 1.5 Pro and $2.80 on Wan 3.0 Prime, a factor of 14.
          Clip length is the main cost lever, so plan the shot before you generate it.
        </Para>
        <H3>Models without a published price</H3>
        <Para>
          Veo 3.1 and its Fast and Lite variants, Grok Imagine Video, Flux 3 Video, Seedance 2.0,
          Happyhorse 1.0 and 1.1, Heygen Video 1, Mischief 1, Wan 2.6, and the Unfiltered variants of
          Seedance, Wan 2.6, Wan 2.7 and Wan 3.0.
        </Para>
        <H3>Describing a shot</H3>
        <Table
          head={['Element', 'Example']}
          rows={[
            ['Subject and action', 'Rain running down a glass office wall at dusk'],
            ['Camera', 'Locked off, slow focus pull to a distant skyline'],
            ['Duration', 'Six seconds'],
            ['Mood and palette', 'Muted blue light'],
            ['Exclusions', 'No text, no on-screen captions'],
          ]}
          widths={['26%', '74%']}
        />
        <Callout tag="Good to know">
          Media jobs queue differently from chat. Do not treat an unconfirmed job status as a
          finished asset. Some models produce silent video and others include audio, so check before
          planning a soundtrack.
        </Callout>
      </>
    ),
  },
  {
    part: 'Creating',
    id: 'tools',
    nav: 'Image and Audio Tools',
    title: 'Image and Audio Tools',
    body: (
      <>
        <Para>
          Twelve single-purpose tools, reached from the Tools group in the sidebar. Each does one
          job, so you do not have to describe it in a prompt.
        </Para>
        <Shot src="/help/06-image-tools.jpg" alt="The Image Tools panel showing nine tools." caption="Image Tools opens as a panel over whatever screen you are on." />
        <H3>Image Tools</H3>
        <Cards items={[
          ['Text to Image', 'Generate visuals from prompts'],
          ['Image to Image', 'Transform existing images'],
          ['Image Enhancer', 'Upscale resolution and clarity'],
          ['Image Unblur', 'Sharpen motion-blurred details'],
          ['Image to Anime', 'Convert photos into anime style'],
          ['Image to Cartoon', 'Turn portraits into 3D cartoons'],
          ['Image to text', 'Analyse and extract descriptions'],
          ['Headshots', 'Studio-quality portrait photos'],
          ['Background removal', 'Isolate subjects instantly'],
        ]} />
        <H3>Audio Tools</H3>
        <Cards items={[
          ['Text to speech', 'Natural AI voice synthesis'],
          ['Text to Music', 'Compose songs from text prompts'],
          ['Voice to text', 'Transcribe spoken audio into text'],
        ]} />
        <Callout tag="Rights" tone="warn">
          Do not imitate a real person&rsquo;s voice or upload a protected recording without rights
          and consent. A paid plan does not grant ownership of third-party music or samples.
        </Callout>
      </>
    ),
  },
  {
    part: 'Creating',
    id: 'agents',
    nav: 'Agents',
    title: 'Agents',
    body: (
      <>
        <Para>The agent marketplace sits under More in the sidebar.</Para>
        <Shot src="/help/11-agent-marketplace.jpg" alt="The agent marketplace showing agent cards." caption="The agent marketplace. Every agent is currently badged Coming Soon." />
        <Table
          head={['Agent', 'Category', 'What it does', 'Tier']}
          rows={[
            ['Deep Research Agent', 'Research', 'Researches complex topics, analyses multiple sources', 'Premium'],
            ['Trading Agent', 'Finance', 'Analyses market trends and tracks assets', 'Free'],
            ['Coding Agent', 'Coding', 'Writes, debugs and optimises code', 'Enterprise'],
            ['Financial Analyst', 'Finance', 'Stock prices, financials, earnings, SEC filings', 'Premium'],
            ['Web Research', 'Research', 'Live web search with citations', 'Free'],
          ]}
          widths={['24%', '16%', '44%', '16%']}
        />
        <Callout tag="Not available yet" tone="stop">
          Every agent in the marketplace is badged Coming Soon. You can browse them and read their
          descriptions, but none can be launched. The ratings and download counts on the cards are
          placeholder values.
        </Callout>
      </>
    ),
  },

  /* ---------------- 4. PAY ---------------- */
  {
    part: 'Plans and billing',
    id: 'plans',
    nav: 'Plans and pricing',
    title: 'Plans and pricing',
    body: (
      <>
        <Para>
          Hey Open Pro is $20 a month. The comparison the site makes is against paying for each AI
          separately.
        </Para>
        <Table
          head={['Paid separately', 'Per month']}
          rows={[
            ['ChatGPT Plus', '$20'],
            ['Claude Pro', '$20'],
            ['Gemini Pro', '$20'],
            ['Grok', '$30'],
            ['Midjourney', '$30'],
            ['Perplexity Pro', '$20'],
            ['GitHub Copilot', '$10'],
            ['Runway Gen-2', '$15'],
            ['Total', '$165'],
            ['Hey Open Pro', '$20'],
          ]}
          widths={['68%', '32%']}
        />
        <H3>What Pro includes</H3>
        <Cards items={[
          ['All premium models', 'The whole catalogue, not a subset.'],
          ['Unified context and memory', 'One memory across every model.'],
          ['Zero hidden API costs', 'No separate per-provider bill.'],
          ['Unlimited text and image generation', 'Subject to the caveat below.'],
          ['Consensus Mode', 'Pro plan and above.'],
          ['Cancel anytime', 'No lock-in, per the site.'],
        ]} />
        <Callout tag="Read this before quoting unlimited" tone="warn">
          The marketing page advertises unlimited text and image generation. The Terms of Service
          separately permit model-specific prices, included credits, rate limits and overages. The
          entitlement that applies is whatever the checkout screen shows, together with any fair-use
          policy it incorporates. Video is priced per second regardless.
        </Callout>
      </>
    ),
  },
  {
    part: 'Plans and billing',
    id: 'pay',
    nav: 'How you pay',
    title: 'How you pay',
    body: (
      <>
        <Para>Two ways to cover your credits, and one of them leaves what you hold untouched.</Para>
        <Cards items={[
          ['Pay directly', 'Card or crypto, whichever you already use. One bill either way.'],
          ['Or stake instead', 'Stake USDC, ETH or BTC and the yield covers your credits. The position stays yours, and unstaking simply stops the credits.'],
        ]} />
        <Table
          head={['', 'Card', 'Cryptocurrency']}
          rows={[
            ['Renewal', 'Automatic unless the checkout says otherwise', 'May require manual renewal'],
            ['Reversible', 'Subject to the processor and statutory rights', 'A completed payment may be irreversible'],
            ['Before paying', 'Check amount, currency, renewal date and tax', 'Check asset, amount, chain and destination'],
          ]}
          widths={['18%', '41%', '41%']}
        />
        <Callout tag="Not a guaranteed return" tone="warn">
          What a stake earns moves with the market. Rates are not fixed and nothing here is a
          guaranteed return.
        </Callout>
        <H3>Cancelling</H3>
        <Steps items={[
          ['Sign in with the identity that owns the subscription', 'A different wallet or browser profile may show a different plan.'],
          ['Open Billing or Subscription and find cancellation', 'Read the effective date carefully.'],
          ['Expect it at the end of the period', 'Cancellation generally takes effect at the end of the current paid period, not immediately.'],
          ['Keep the confirmation', 'Retain the message or email.'],
        ]} />
        <Para>
          Cancelling does not revoke API keys, delete memory, close your account or unwind a stake.
          Those are four separate actions.
        </Para>
      </>
    ),
  },

  /* ---------------- 5. BUILD ---------------- */
  {
    part: 'For builders',
    id: 'api',
    nav: 'API',
    title: 'API',
    body: (
      <>
        <Para>
          One endpoint reaches every model behind one subscription, built for use by people and by
          x402-ready agents. It is OpenAI-compatible, so an existing integration works by changing
          the base URL and the key.
        </Para>
        <Table
          head={['', 'Figure']}
          rows={[
            ['API calls per day', '1M+'],
            ['Median latency', 'Under 200ms'],
            ['Model families', '5+'],
          ]}
          widths={['60%', '40%']}
        />
        <Para>
          Set the model to <Box component="code" sx={{ fontFamily: MONO, fontSize: '0.85em', backgroundColor: 'var(--bg-section)', px: 0.7, py: 0.2, borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>auto</Box> to let the gateway choose.
        </Para>
        <Box
          component="pre"
          sx={{
            backgroundColor: '#0B0F1A', color: '#E6EAF0', p: '16px 18px', borderRadius: '12px',
            overflowX: 'auto', fontFamily: MONO, fontSize: '0.78rem', lineHeight: 1.65, mb: 2.4,
          }}
        >
{`curl https://api.openledger.xyz/v1/chat/completions \\
  -H "Authorization: Bearer $OPENLEDGER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [
      { "role": "user", "content": "Explain quantum computing" }
    ]
  }'`}
        </Box>
        <Para>
          The site shows the same request in Python, TypeScript, TypeScript with the OpenAI SDK, and
          cURL.
        </Para>
        <Callout tag="Good to know">
          Log the serving model returned in the response where it is available, so a result can be
          traced back to the model that produced it. Two auto calls are not guaranteed to use the
          same model.
        </Callout>
      </>
    ),
  },
  {
    part: 'For builders',
    id: 'enterprise',
    nav: 'Enterprise',
    title: 'Enterprise',
    body: (
      <>
        <Para>
          One secure workspace for a company to reach leading AI models, with the privacy and
          controls IT teams need.
        </Para>
        <Cards items={[
          ['Company-wide AI access', 'Give every team access from one managed workspace.'],
          ['Model access controls', 'Choose which AI models each team can use.'],
          ['Unified company memory', 'Keep approved context available across models and teams.'],
          ['Audit and visibility', 'See how AI is being used across your company.'],
          ['Private company data', 'Prompts and company data are not used to train models.'],
          ['Central user management', 'Add, remove and manage employee access from one place.'],
          ['Usage and spend controls', 'Set limits and track usage across the organisation.'],
          ['Enterprise API', 'Connect internal tools and agents through one API.'],
        ]} />
        <Para>
          The site states SOC 2 Type II Certified and Zero Model Training on Data. Enterprise
          enquiries go to marketing@openledger.xyz.
        </Para>
        <H3>Custom-branded products</H3>
        <Para>
          Hey Open also powers AI products that ship under the customer&rsquo;s own name, in three
          shapes: a branded AI workspace, an enterprise model API, and an agent platform. Compute
          costs behind them can be hedged with compute-price options so a quoted rate holds.
        </Para>
      </>
    ),
  },
  {
    part: 'For builders',
    id: 'token',
    nav: '$OPEN and $HEY',
    title: '$OPEN and $HEY',
    body: (
      <>
        <Para>
          $OPEN is the capital asset behind the product. The published model is that real usage
          generates revenue, a share of the net revenue buys $OPEN on the open market, and those
          tokens are burned.
        </Para>
        <Table
          head={['Line', 'Revenue source']}
          rows={[
            ['01', 'Enterprise inference and API'],
            ['02', 'Hey Open subscriptions'],
            ['03', 'Pay-as-you-go inference'],
            ['04', 'Compute agent marketplace'],
          ]}
          widths={['14%', '86%']}
        />
        <H3>What comes out before the buyback</H3>
        <Table
          head={['Deduction', 'What it covers']}
          rows={[
            ['Inference', 'The compute behind every call'],
            ['Platform costs', 'The cost of running the platform'],
            ['$HEY credits', 'Compute already claimed'],
            ['Reserves', 'Held back, not spent'],
          ]}
          widths={['26%', '74%']}
        />
        <Para>
          A portion of what remains funds the buyback, and the tokens bought are burned. $HEY is
          described as a compute credit: staked $OPEN mints it, and holding it pays out compute
          credit daily for any model on the network.
        </Para>
        <Callout tag="Not available in the app yet" tone="stop">
          The Staking page in the application reads Coming Soon. The marketing site describes
          staking, buybacks and burns in the present tense, but there is nothing to stake against in
          the product today. Treat the token material as a published plan rather than a feature you
          can use.
        </Callout>
      </>
    ),
  },

  /* ---------------- 6. HELP ---------------- */
  {
    part: 'Help',
    id: 'soon',
    nav: 'Not available yet',
    title: 'Not available yet',
    body: (
      <>
        <Para>
          Four things appear in the interface but cannot be used in the current build. Knowing this
          in advance saves a support ticket.
        </Para>
        <Table
          head={['Where', 'What it says it will do', 'State']}
          rows={[
            ['AI Studio, Model Factory', 'Customise and train your own AI models', <Pill tone="s">Coming soon</Pill>],
            ['AI Studio, Staking', 'Stake tokens to support the network and earn rewards', <Pill tone="s">Coming soon</Pill>],
            ['Home, Voice Chat', 'Have natural, real-time conversations', <Pill tone="s">Coming soon</Pill>],
            ['More, Agents', 'Five agents in the marketplace', <Pill tone="s">All coming soon</Pill>],
          ]}
          widths={['28%', '48%', '24%']}
        />
      </>
    ),
  },
  {
    part: 'Help',
    id: 'trouble',
    nav: 'Troubleshooting',
    title: 'Troubleshooting',
    body: (
      <>
        <Table
          head={['Problem', 'Cause and fix']}
          rows={[
            ['A model has disappeared from the picker', 'Two settings hide models. The privacy filter: on Mid or Max only Private, TEE and E2EE models appear. The request mode: models badged Not in Boost disappear in Boost mode.'],
            ['I cannot send a message', 'Sending requires signing in; browsing the catalogue does not. Click Connect Wallet.'],
            ['Consensus will not open', 'Consensus requires signing in and a Pro plan. The gate states both.'],
            ['The model forgot something from earlier', 'The thread may have outgrown the context window, or trimming removed it. Restate the decisive requirement.'],
            ['A model gave a different answer than last time', 'If the pill reads Auto, two requests can be served by different models. Name a model when you need a reproducible result.'],
            ['A page says Coming Soon', 'Model Factory, Staking, Voice Chat and every agent are unavailable in the current build.'],
          ]}
          widths={['34%', '66%']}
        />
        <H3>Getting help</H3>
        <Para>
          A Contact support control sits on the chat screen. Include the feature, the browser, the
          exact error text, the approximate time, the model used and a non-secret account reference.
          Never include a password, recovery phrase, private key or bearer token.
        </Para>
      </>
    ),
  },
  {
    part: 'Help',
    id: 'faq',
    nav: 'Frequently asked questions',
    title: 'Frequently asked questions',
    body: (
      <>
        <FAQ group="Hey Open" items={[
          ['How is Hey Open different from ChatGPT or Claude?', 'Those are models. Hey Open is the workspace that brings 133 of them together, with one memory and a privacy setting you choose per conversation, so you pick the right model per task instead of reorganising your work around one vendor.'],
          ['Do I need a separate subscription for each model?', 'No. One plan covers the catalogue. What your account can run depends on your plan and provider eligibility.'],
          ['Do I need an account to start?', 'You can open the app, browse all 133 models and open the Image and Audio Tools without an account. Sending a message requires signing in.'],
          ['Can I switch models without losing context?', 'Yes, within a conversation. Different models support different context lengths, so a very long thread may not carry over in full.'],
        ]} />
        <FAQ group="Privacy" items={[
          ['What do Min, Mid and Max do?', 'They are a privacy filter, not a speed or cost setting. Min allows every model, Mid allows Private, TEE and E2EE models only, and Max allows TEE and E2EE models only.'],
          ['Is Incognito the same as private?', 'No. Incognito means the provider does not receive your identity. It does not mean the provider stores nothing. Private means zero data retention, and TEE and E2EE are stronger again.'],
          ['Which models are the most private?', 'The nine badged E2EE. The prompt is encrypted on your device and decrypted only inside a verified enclave.'],
          ['Does Hey Open train on my chats?', 'Hey Open states it does not train its own models on private chats or memory without separate authorisation. What a model provider does with a prompt is governed by that provider’s own terms, which is why the privacy filter exists.'],
        ]} />
        <FAQ group="Models and usage" items={[
          ['What is the difference between the privacy filter and request mode?', 'The privacy filter decides which models you may use. Request mode decides which provider serves them, biased toward cost or speed.'],
          ['Which models can search the web?', 'The 24 badged Web. Everything else answers from training data alone.'],
          ['How much does video cost?', 'Thirteen video models publish a price per second of output, from $0.02 to $0.28. Ten seconds therefore runs from $0.20 to $2.80.'],
        ]} />
        <FAQ group="Plans" items={[
          ['Is Consensus Mode free?', 'No. It is available on the Pro plan and above, and requires signing in.'],
          ['Can I stake tokens?', 'Not yet. Staking is a Coming Soon page in the current build.'],
          ['Can I cancel any time?', 'Yes. The site states cancel anytime, no lock-in. Cancellation generally takes effect at the end of the current paid period.'],
        ]} />
      </>
    ),
  },
];

function FAQ({ group, items }) {
  return (
    <Box sx={{ mb: 3.4 }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--brand-accent)', mb: 1.4 }}>
        {group}
      </Typography>
      <Box sx={{ ...PANEL, overflow: 'hidden' }}>
        {items.map(([q, a], i) => (
          <Box key={q} sx={{ p: '14px 18px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
            <Typography sx={{ fontWeight: 650, fontSize: '0.96rem', color: 'var(--text-heading)', mb: 0.5 }}>{q}</Typography>
            <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{a}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

/* The parts, derived rather than restated, so a section added above
   appears in the rail without a second edit. */
const PARTS = SECTIONS.reduce((acc, s) => {
  const last = acc[acc.length - 1];
  if (!last || last.name !== s.part) acc.push({ name: s.part, items: [s] });
  else last.items.push(s);
  return acc;
}, []);

export default function HelpPage() {
  const [active, setActive] = React.useState(SECTIONS[0].id);

  React.useEffect(() => {
    const marks = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!marks.length) return undefined;
    const pick = () => {
      let current = marks[0].id;
      for (const el of marks) {
        if (el.getBoundingClientRect().top <= 140) current = el.id;
        else break;
      }
      setActive(current);
    };
    pick();
    window.addEventListener('scroll', pick, { passive: true });
    return () => window.removeEventListener('scroll', pick);
  }, []);

  const current = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  /* The sticky rails scroll independently, which on Windows draws a wide
     grey gutter down the middle of the page. Thin and transparent until
     hovered, as the reference does. */
  const quietScroll = {
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: 'transparent transparent',
    '&:hover': { scrollbarColor: 'var(--border-normal) transparent' },
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': { background: 'transparent', borderRadius: '3px' },
    '&:hover::-webkit-scrollbar-thumb': { background: 'var(--border-normal)' },
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-card)' }}>
      <PageMeta
        title="Help Center | Hey Open"
        description="How Hey Open works: choosing a model, the privacy filter, request modes, Consensus, memory, images and video, plans, the API and troubleshooting."
        path="/help"
      />
      <PageHeader spacer />

      <Box sx={{ maxWidth: 1340, mx: 'auto', px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '236px minmax(0, 1fr)', lg: '236px minmax(0, 1fr) 208px' },
            columnGap: { md: 6, lg: 7 },
            alignItems: 'start',
          }}
        >
          {/* ---------------- section rail ---------------- */}
          <Box
            component="nav"
            aria-label="Help sections"
            sx={{
              position: { md: 'sticky' },
              top: { md: 88 },
              maxHeight: { md: 'calc(100vh - 104px)' },
              pt: { xs: 3, md: 5 },
              pb: { xs: 3, md: 6 },
              mb: { xs: 3, md: 0 },
              borderBottom: { xs: '1px solid var(--border-subtle)', md: 'none' },
              ...quietScroll,
            }}
          >
            {PARTS.map((p) => (
              <Box key={p.name} sx={{ mb: 2.8 }}>
                <Typography
                  sx={{
                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--text-muted)', mb: 1.1,
                  }}
                >
                  {p.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, flexWrap: 'wrap', gap: { xs: 0.8, md: 0 } }}>
                  {p.items.map((s) => (
                    <Box
                      key={s.id}
                      component="a"
                      href={`#${s.id}`}
                      sx={{
                        display: 'block', textDecoration: 'none',
                        fontSize: '0.9rem', lineHeight: 1.45,
                        py: { xs: 0.6, md: 0.72 },
                        px: { xs: 1.4, md: 0 },
                        borderRadius: { xs: '999px', md: 0 },
                        border: { xs: '1px solid var(--border-subtle)', md: 'none' },
                        color: active === s.id ? 'var(--brand-accent)' : 'var(--text-secondary)',
                        fontWeight: active === s.id ? 600 : 400,
                        transition: 'color .12s ease',
                        '&:hover': { color: 'var(--text-heading)' },
                      }}
                    >
                      {s.nav}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ---------------- article ---------------- */}
          <Box component="main" sx={{ minWidth: 0, pt: { xs: 0, md: 5 }, pb: { xs: 7, md: 12 } }}>
            {/* Breadcrumb, which is the only wayfinding above the title. */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9, mb: 1.6, flexWrap: 'wrap' }}>
              <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Help Center</Typography>
              <Box component="span" aria-hidden="true" sx={{ color: 'var(--border-strong)', fontSize: '0.8rem' }}>&rsaquo;</Box>
              <Typography sx={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{current.part}</Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.1rem', md: '2.6rem' }, fontWeight: 700,
                letterSpacing: '-0.032em', lineHeight: 1.12, color: 'var(--text-heading)',
                textWrap: 'balance', mb: 2.2,
              }}
            >
              Hey Open Help Center
            </Typography>

            <Typography sx={{ fontSize: '1.06rem', lineHeight: 1.72, color: 'var(--text-secondary)', maxWidth: '68ch', mb: 0 }}>
              Everything Hey Open does and how to do it, from your first conversation to the API.
              Twenty sections: start at the top, or jump to what you need.
            </Typography>

            {SECTIONS.map((s) => (
              <Box
                key={s.id}
                component="section"
                id={s.id}
                sx={{ scrollMarginTop: '92px', mt: { xs: 5, md: 6.5 } }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.42rem', md: '1.62rem' }, fontWeight: 700,
                    letterSpacing: '-0.025em', lineHeight: 1.2, color: 'var(--text-heading)',
                    textWrap: 'balance',
                    pb: 1.3, mb: 2.4,
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {s.title}
                </Typography>
                {s.body}
              </Box>
            ))}

            <Box sx={{ mt: { xs: 6, md: 8 }, pt: 2.6, borderTop: '1px solid var(--border-subtle)', maxWidth: '68ch' }}>
              <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Written from the Hey Open application and the product site, both walked on 4 and
                5 November 2026. Model counts, badges, prices and availability were read from the
                live model picker with the privacy filter set to Min. The application is the source
                of truth: the catalogue changes as providers add and retire models, so treat every
                count and price here as a snapshot of {SNAP}.
              </Typography>
            </Box>
          </Box>

          {/* ---------------- on this page ---------------- */}
          <Box
            component="aside"
            aria-label="On this page"
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'sticky', top: 88,
              maxHeight: 'calc(100vh - 104px)',
              pt: 5, pb: 6,
              ...quietScroll,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text-muted)', mb: 1.2,
              }}
            >
              On this page
            </Typography>
            {SECTIONS.map((s) => (
              <Box
                key={s.id}
                component="a"
                href={`#${s.id}`}
                sx={{
                  display: 'block', textDecoration: 'none',
                  fontSize: '0.84rem', lineHeight: 1.42, py: 0.62, pl: 1.4,
                  borderLeft: '2px solid',
                  borderLeftColor: active === s.id ? 'var(--brand-accent)' : 'var(--border-subtle)',
                  color: active === s.id ? 'var(--brand-accent)' : 'var(--text-muted)',
                  transition: 'color .12s ease, border-color .12s ease',
                  '&:hover': { color: 'var(--text-heading)' },
                }}
              >
                {s.nav}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
