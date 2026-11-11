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

const SNAP = '10 November 2026';
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
    <Typography sx={{ mb: 1.6, fontSize: '1rem', lineHeight: 1.72, color: 'var(--text-secondary)' }}>
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
    <Box component="ol" sx={{ listStyle: 'none', m: '4px 0 20px', p: 0 }}>
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
    /* Full width, like the tables. Holding these to the prose measure
       left them visibly narrower than everything around them. */
    <Box className="help-block" sx={{ ...PANEL, backgroundColor: bg, borderColor: edge, p: '16px 19px', mb: 2.2 }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: ink, mb: 0.7 }}>
        {tag}
      </Typography>
      <Typography sx={{ fontSize: '0.94rem', lineHeight: 1.68, color: 'var(--text-secondary)' }}>{children}</Typography>
    </Box>
  );
}

/* The comparison total. On a phone the table scrolls sideways and the
   "Paid separately" header goes with it, so the strike carries the
   meaning the header would have: this is the eight-subscription total
   you do not pay, not a former price for Hey Open. The row label says
   so too, for anyone the styling does not reach. */
function Strike({ children }) {
  return (
    <Box
      component="span"
      sx={{
        textDecorationLine: { xs: 'line-through', md: 'none' },
        textDecorationThickness: '1.5px',
        textDecorationColor: 'var(--brand-accent)',
        color: { xs: 'var(--text-muted)', md: 'inherit' },
      }}
    >
      {children}
    </Box>
  );
}

function Table({ head, rows, widths }) {
  /* One minimum for every table pushed the two-column ones off a phone
     screen, taking the figures with them: the pricing table showed its
     labels and hid every price. Narrow tables now fit, and only the wide
     ones scroll. */
  const cols = head.length;
  const minWidth = cols <= 2 ? 0 : cols === 3 ? 430 : 520;
  return (
    <Box
      /* The table is wider than a phone and scrolls inside this panel.
         SmoothScroll captures pointer and wheel events for the whole
         document, so without this opt-out the swipe never arrives. */
      data-lenis-prevent=""
      sx={{
        ...PANEL,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        mb: 2.4,
        /* A hint that there is more to the right, on the screens where
           that is true. It sits above the panel's own background. */
        backgroundImage: minWidth
          ? { xs: 'linear-gradient(to right, transparent calc(100% - 34px), rgba(15,23,42,0.05))', md: 'none' }
          : 'none',
        backgroundAttachment: 'local',
      }}
    >
      <Box component="table" sx={{ borderCollapse: 'collapse', width: '100%', minWidth, fontVariantNumeric: 'tabular-nums' }}>
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
        <Box key={t} className="help-block" sx={{ ...PANEL, p: '14px 16px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', mb: 0.4 }}>{t}</Typography>
          <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{s}</Typography>
        </Box>
      ))}
    </Box>
  );
}

/* The screenshots were taken at three different sizes, and cropping a
   product screenshot to a single ratio cuts the sides off the very UI the
   caption is pointing at. So each one declares its own pixel size: the
   browser reserves exactly the right box, nothing is cropped, and the page
   does not jump as the images arrive. */
/* Odd-sized captures only. Everything shot from the application is
   1568x758 and falls through to SHOT_DEFAULT_A. */
const SHOT_SIZE = {};
const SHOT_DEFAULT_A = [1568, 758];   // the signed-in captures
const SHOT_WIDE = [800, 500];
const SHOT_TALL = [800, 600];

function shotSize(src) {
  const name = src.replace('/help/', '');
  if (SHOT_SIZE[name]) return SHOT_SIZE[name];
  if (name.startsWith('a')) return SHOT_DEFAULT_A;
  return Number(name.slice(0, 2)) >= 9 ? SHOT_TALL : SHOT_WIDE;
}

function Shot({ src, alt, caption }) {
  const [w, h] = shotSize(src);
  return (
    <Box component="figure" sx={{ m: '0 0 26px' }}>
      {/* No lazy loading. An <img> with no intrinsic size collapses to a 1px
          box before it loads; a 1px box never intersects the viewport, so a
          lazy image in it is never fetched and the figure stays blank
          forever. These are small enough not to need deferring. */}
      <Box
        component="img"
        src={src}
        alt={alt}
        width={w}
        height={h}
        sx={{
          display: 'block', width: '100%', height: 'auto',
          aspectRatio: `${w} / ${h}`,
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
        <Shot src="/help/a01-chat-signed-in.jpg" alt="The Hey Open chat screen signed in, with the sidebar, composer and model picker." caption="The chat screen, signed in. The sidebar foot shows the wallet, the plan and the credits left." />
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
        <Shot src="/help/a18-workspace.jpg" alt="The sidebar showing Workspace, AI Studio, Tools and Recent Chats." caption="The expanded sidebar: Workspace, AI Studio and Tools, with recent chats below." />
        <Table
          head={['Group', 'Item', 'What it does', 'State']}
          rows={[
            ['Workspace', 'New Chat', 'Starts a fresh conversation', <Pill>Live</Pill>],
            ['', 'Consensus', 'Ask several models at once', <Pill tone="a">Pro</Pill>],
            ['', 'Home', 'Quick actions and the community feed', <Pill>Live</Pill>],
            ['', 'More', 'Agents, Community Feed and API', <Pill>Live</Pill>],
            ['AI Studio', 'Model Factory', 'Customise and train your own models', <Pill tone="s">Soon</Pill>],
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
        <H3>Settings</H3>
        <Para>
          Settings opens from the account menu at the foot of the sidebar, not from the header. It
          holds Profile, Appearance and Memory under General; Billing, Usage and Credits History
          under Billing; and Storage under Data and Privacy. See
          Account, settings and your data.
        </Para>

        <H3>Finding an old chat</H3>
        <Para>
          Chat search is at the top of the sidebar, or press Ctrl K. Recent chats are listed below
          the Tools group.
        </Para>
        <Shot src="/help/a19-search-chats.jpg" alt="The chat search dialog, opened with Ctrl K." caption="Chat search, reachable with Ctrl K from anywhere in the app." />
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
        <Shot src="/help/a11-model-picker.jpg" alt="The model picker on the Video tab showing per-second prices." caption="The model picker on the Video tab. Video models show a price per second of output." />
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
        <Shot src="/help/a02-privacy-filter.jpg" alt="The privacy filter open, showing Min, Mid and Max." caption="The privacy filter, set to Min. Raising it removes models from the picker." />
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
        <Shot src="/help/a08-memory.jpg" alt="Memory settings, showing three switches, an add box and the saved memories list." caption="Memory settings. Three switches, a box to add a memory by hand, and the list of saved ones." />
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
        <Shot src="/help/a12-consensus.jpg" alt="The Consensus sign-in gate." caption="Consensus requires signing in, and a Pro plan." />
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
        <Para>
          Settings, Memory holds three switches, a box for adding a memory by hand, and the list of
          what has been saved.
        </Para>
        <Table
          head={['Switch', 'Default', 'What it does']}
          rows={[
            ['Save memories from chats', 'On', 'Automatically saves useful details about you as you chat. Requires Use memory to be on.'],
            ['Use memory', 'On', 'Lets the assistant use your saved memories in new chats.'],
            ['Share memory with external models', 'Off', 'While off, your memory is never sent to models hosted by external providers such as OpenAI, Anthropic, Google and OpenRouter.'],
          ]}
          widths={['28%', '12%', '60%']}
        />
        <Para>
          Turning Use memory off disables saving as well, because the save switch depends on it.
        </Para>
        <H3>Adding and removing memories</H3>
        <Para>
          Type into the Add a memory box to save one yourself, for example &ldquo;I prefer short,
          direct answers&rdquo;. Each saved memory has its own switch, so you can keep one without
          using it, and Delete All clears the list. Memories captured automatically are labelled
          with their source and an importance score.
        </Para>
        <Callout tag="Where memory lives" tone="warn">
          Memory is stored in the browser you are using. It does not sync across devices, and
          clearing your browser data may delete it. There is no server copy to restore from.
        </Callout>
        <Callout tag="Good to know">
          Memory is not chat history. It stores selected facts such as preferences, project details
          and decisions, not a transcript of every conversation. With the external sharing switch
          off, memory is confined to models that are not hosted by an outside provider.
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
          Eleven single-purpose tools, reached from the Tools group in the sidebar. Each does one
          job, so you do not have to describe it in a prompt.
        </Para>
        <Shot src="/help/a13-image-tools.jpg" alt="The Image Tools panel showing nine tools." caption="Image Tools opens as a panel over whatever screen you are on." />
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
          ['Voice to text', 'Transcribe spoken audio into text'],
        ]} />
        <Callout tag="Rights" tone="warn">
          Do not imitate a real person&rsquo;s voice or upload a protected recording without rights
          and consent. A paid plan does not grant ownership of third-party recordings or samples.
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
        <Shot src="/help/a21-agents.jpg" alt="The agent marketplace showing five agent cards, each badged Coming Soon." caption="The agent marketplace. Every agent is currently badged Coming Soon." />
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
            ['Total, bought separately', <Strike>$165</Strike>],
            ['Hey Open Pro', '$20'],
          ]}
          widths={['68%', '32%']}
        />
        <H3>Pro+</H3>
        <Para>
          There is a tier above Pro. An account on it shows HeyOpen Pro+ in Settings, Billing, with
          a monthly renewal at US$40.00 and an allowance of 40 credits a period.
        </Para>
        <Table
          head={['', 'Hey Open Pro', 'HeyOpen Pro+']}
          rows={[
            ['Price', '$20 per month, as advertised on the site', 'US$40.00 per month, as shown at renewal'],
            ['Credit allowance', 'Not shown on the site', '40 credits a period'],
            ['Consensus Mode', 'Included', 'Included'],
          ]}
          widths={['24%', '38%', '38%']}
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
        <Callout tag="What unlimited covers" tone="warn">
          Pro is described as unlimited text and image generation, and the Terms of Service also
          allow model-specific prices, included credits, rate limits and overages. Your actual
          entitlement is whatever the checkout screen shows, together with the fair-use policy it
          incorporates. Video is priced per second either way.
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
        <Para>
          Pay by card or in cryptocurrency, whichever you already use. One bill either way.
        </Para>
        <Table
          head={['', 'Card', 'Cryptocurrency']}
          rows={[
            ['Renewal', 'Automatic unless the checkout says otherwise', 'May require manual renewal'],
            ['Reversible', 'Subject to the processor and statutory rights', 'A completed payment may be irreversible'],
            ['Before paying', 'Check amount, currency, renewal date and tax', 'Check asset, amount, chain and destination'],
          ]}
          widths={['18%', '41%', '41%']}
        />
        <H3>Cancelling</H3>
        <Steps items={[
          ['Sign in with the identity that owns the subscription', 'A different wallet or browser profile may show a different plan.'],
          ['Open Billing or Subscription and find cancellation', 'Read the effective date carefully.'],
          ['Expect it at the end of the period', 'Cancellation generally takes effect at the end of the current paid period, not immediately.'],
          ['Keep the confirmation', 'Retain the message or email.'],
        ]} />
        <Para>
          Cancelling does not revoke API keys, delete your memory or close your account. Those
          are three separate actions.
        </Para>
      </>
    ),
  },

  /* ---------------- 5. BUILD ---------------- */
  {
    part: 'Plans and billing',
    id: 'account',
    nav: 'Account, settings and data',
    title: 'Account, settings and your data',
    body: (
      <>
        <Para>
          Everything about the account sits behind the wallet address at the foot of the sidebar.
          Clicking it opens the account menu; Settings opens a panel with three groups.
        </Para>
        <Shot src="/help/a03-account-menu.jpg" alt="The account menu showing Manage Subscription, Top up credits, Copy referral link, Affiliate, Settings, Help and Feedback, Learn More and Log Out." caption="The account menu, reached from the wallet address at the foot of the sidebar." />
        <Table
          head={['Item', 'What it does']}
          rows={[
            ['Manage Subscription', 'Change or cancel the plan'],
            ['Top up credits', 'Buy credits beyond the plan allowance'],
            ['Copy referral link', 'Your referral link, copied to the clipboard. See Referrals and the affiliate programme.'],
            ['Affiliate', 'The affiliate programme'],
            ['Settings', 'Profile, Appearance, Memory, Billing, Usage, Credits History and Storage'],
            ['Help and Feedback', 'Support and feedback'],
            ['Learn More', 'Product information'],
            ['Log Out', 'Signs out of this browser'],
          ]}
          widths={['30%', '70%']}
        />

        <H3>What is in Settings</H3>
        <Shot src="/help/a04-settings-appearance.jpg" alt="The Settings panel showing General, Billing and Data and Privacy groups." caption="Settings. General, Billing and Data and Privacy, with Appearance open." />
        <Table
          head={['Group', 'Tabs']}
          rows={[
            ['General', 'Profile, Appearance, Memory'],
            ['Billing', 'Billing, Usage, Credits History'],
            ['Data & Privacy', 'Storage'],
          ]}
          widths={['26%', '74%']}
        />
        <Para>
          Appearance offers Light, Dark and System themes.
        </Para>

        <H3>Billing</H3>
        <Shot src="/help/a05-billing.jpg" alt="The Billing tab showing the current plan, extra credits, an invoice with a PDF download, and a cancel control." caption="Billing: the current plan and renewal, extra credits, invoices with PDF downloads, and cancellation." />
        <Para>
          Billing shows the current plan with its renewal date and amount, a separate Extra Credits
          balance with a Buy Credits control, and a table of invoices with a PDF download for each
          one. Cancelling is at the foot, and states plainly that access continues to the end of the
          paid period.
        </Para>

        <H3>Usage</H3>
        <Shot src="/help/a06-usage.jpg" alt="The Usage tab showing plan period, percentage of credits used, and usage broken down by model." caption="Usage, for the current billing period, with a per-model breakdown and an Export control." />
        <Table
          head={['What it shows', 'Detail']}
          rows={[
            ['Plan and period', 'The active plan and the dates of the current billing period'],
            ['Credits used', 'As a percentage and as a figure to four decimal places, against the allowance'],
            ['Reset date', 'When the allowance refreshes'],
            ['Usage by model', 'Requests, credits and tokens split into input and output, searchable'],
            ['Export', 'Downloads the breakdown'],
          ]}
          widths={['26%', '74%']}
        />
        <Callout tag="Credits reset, they do not roll over">
          The Usage screen states a reset date for the allowance rather than a carry-over. Credits
          History records each grant separately, so a subscription renewal appears as its own entry.
        </Callout>

        <H3>Credits History</H3>
        <Shot src="/help/a07-credits-history.jpg" alt="The Credits History tab listing each credit grant with its date, source and amount." caption="Credits History. One line for each grant, with its source." />
        <Para>
          Credits History is the ledger behind the Usage figures. Each line gives a date, a source
          such as subscription, and the number of credits added.
        </Para>

        <H3>Storage</H3>
        <Shot src="/help/a09-storage.jpg" alt="The Storage tab showing space used, history from other accounts on the device, and a delete control." caption="Storage. Chat history is kept in the browser, with a 10 GB allowance." />
        <Para>
          Chat history is saved only in the browser you are using, with a 10 GB allowance. When that
          fills, the oldest images are removed first and the chat text is always kept.
        </Para>
        <Table
          head={['Control', 'What it does']}
          rows={[
            ['History from other accounts', 'Conversations saved in this browser under a different account stay on the device but do not appear in your chat list. Move to This Account files them under the account you are signed in as, or Delete removes them.'],
            ['Delete all history on this device', 'Permanently deletes every chat stored in this browser.'],
          ]}
          widths={['32%', '68%']}
        />
        <Callout tag="There is no backup" tone="stop">
          Deleting history cannot be undone, and no backup copy exists. Because history and memory
          both live in the browser, clearing browser data or moving to a new device loses both.
          Copy anything you need to keep before you clear anything.
        </Callout>
      </>
    ),
  },
  {
    part: 'Plans and billing',
    id: 'referrals',
    nav: 'Referrals and affiliate',
    title: 'Referrals and the affiliate programme',
    body: (
      <>
        <Para>
          Hey Open pays a commission on users you refer who go on to subscribe. Both ways in are
          in the account menu at the foot of the sidebar: Copy referral link hands you your link
          straight away, and Affiliate opens the programme page with the terms, a dashboard and an
          earnings calculator.
        </Para>
        <Shot src="/help/a14-affiliate-hero.jpg" alt="The affiliate page, offering 20 percent recurring commission with a 90 day cookie window and no cost to join." caption="The affiliate programme, reached from Affiliate in the account menu." />
        <H3>What it pays</H3>
        <Table
          head={['Term', 'What the page states']}
          rows={[
            ['Commission', '20% of every payment a referred user makes'],
            ['Duration', 'Up to 12 months per referral'],
            ['Attribution window', '90 days from the click'],
            ['Cost to join', '$0, with no approval waitlist'],
            ['Application review', 'Within 48 hours'],
            ['Payout', 'The 1st of each month, by PayPal or wire'],
            ['Minimum payout', '$25'],
            ['Referral cap', 'None'],
          ]}
          widths={['30%', '70%']}
        />
        <H3>How it works</H3>
        <Steps items={[
          ['Apply', 'A short application, reviewed within 48 hours. You then get your referral link and dashboard access.'],
          ['Share your link', 'It works anywhere: a blog, a newsletter, social media, a podcast. Banners, copy and email templates are provided.'],
          ['Earn', 'Commission accrues on each payment your referrals make, and is paid monthly.'],
        ]} />
        <Shot src="/help/a17-affiliate-rates.jpg" alt="The commission tiers, calculated against the plan the referral subscribes to." caption="Commission is calculated on the plan the referral subscribes to." />
        <H3>What counts as a referral</H3>
        <Para>
          Someone who clicks your link and creates a <Em>paid</Em> account within 90 days. Free
          sign-ups earn nothing. If a referral later upgrades, your commission adjusts to 20% of
          the new price for the rest of their window.
        </Para>
        <Callout tag="Check the current terms" tone="warn">
          Commission rates, the length of the earning window and the qualifying plans can change.
          The affiliate page in the application is the authority on what applies to you.
        </Callout>
      </>
    ),
  },
  {
    part: 'Enterprise',
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
          enquiries go to marketing@heyopen.ai.
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
    /* Held back: the product is going to market as a web2 subscription,
       so nothing about the token appears in the Help Center. Remove
       `draft` to publish it again. */
    draft: true,
    part: 'Enterprise',
    id: 'token',
    nav: '$OPEN',
    title: '$OPEN',
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
            ['Reserves', 'Held back, not spent'],
          ]}
          widths={['26%', '74%']}
        />
        <Para>
          A portion of what remains funds the buyback, and the tokens bought are burned.
        </Para>
        <H3>The Token Dashboard</H3>
        <Para>
          AI Studio, Token Dashboard is where the staking terms are published. It opens without a
          wallet connected; Connect Wallet is what reveals a position.
        </Para>
        <Table
          head={['Term', 'What is published']}
          rows={[
            ['Annual yield', '6%, paid in $OPEN'],
            ['Hey Open Pro', 'Free while $1,000 worth of $OPEN is staked'],
            ['Unstaking', 'A 7 day cooling period before tokens are released'],
          ]}
          widths={['26%', '74%']}
        />
        <Para>
          The same page carries the burn tracker: total $OPEN burned against the 1B fixed supply,
          burn volume over 1W, 1M, 3M and 1Y, a buyback breakdown, and a live-looking feed of
          individual burn events with their source and status.
        </Para>
        <Callout tag="The figures shown are samples" tone="stop">
          The Token Dashboard is in the product, but its numbers are labelled Sample data and it
          carries no live transactions. Staking is not yet something you can do. Read the yield,
          the burn totals and the buyback charts as an illustration of how the programme is meant
          to work, never as your own position.
        </Callout>
      </>
    ),
  },

  {
    /* Held back until $HEY is announced. Remove `draft` to publish; the
       section then appears in the rail and the article in its order. */
    draft: true,
    part: 'Enterprise',
    id: 'hey',
    nav: '$HEY',
    title: '$HEY',
    body: (
      <>
        <Para>
          $HEY is described as a compute credit. Staked $OPEN mints it, and holding it pays out
          compute credit daily, usable against any model on the network. It is accounted for
          separately from $OPEN: credits already claimed in $HEY come out of revenue before the
          share that funds the $OPEN buyback is calculated.
        </Para>
        <Callout tag="Not available yet" tone="stop">
          $HEY is a published design, not a feature you can use. There is nothing to mint, hold
          or spend in the product today.
        </Callout>
      </>
    ),
  },

  /* ---------------- 6. HELP ---------------- */
  {
    /* Held back. Remove `draft` to publish it again. */
    draft: true,
    part: 'Help',
    id: 'soon',
    nav: 'Not available yet',
    title: 'Not available yet',
    body: (
      <>
        <Para>
          Several things appear in the interface but cannot be used in the current build. Knowing
          this in advance saves a support ticket.
        </Para>
        <Table
          head={['Where', 'What it says it will do', 'State']}
          rows={[
            ['Developer API', 'An OpenAI-compatible endpoint for your own applications', <Pill tone="s">Coming soon</Pill>],
            ['AI Studio, Model Factory', 'Customise and train your own AI models', <Pill tone="s">Coming soon</Pill>],
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
            ['A page says Coming Soon', 'Model Factory, Voice Chat and every agent are unavailable in the current build.'],
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
/* Sections carrying `draft` are written but not published. They stay in
   SECTIONS so the copy lives with the rest of the page and cannot drift,
   and PUBLISHED is what the page actually renders. */
const PUBLISHED = SECTIONS.filter((s) => !s.draft);

const PARTS = PUBLISHED.reduce((acc, s) => {
  const last = acc[acc.length - 1];
  if (!last || last.name !== s.part) acc.push({ name: s.part, items: [s] });
  else last.items.push(s);
  return acc;
}, []);

export default function HelpPage() {
  const [active, setActive] = React.useState(PUBLISHED[0].id);
  /* Phones only: the rail is a disclosure, closed on arrival. */
  const [navOpen, setNavOpen] = React.useState(false);

  React.useEffect(() => {
    const marks = PUBLISHED.map((s) => document.getElementById(s.id)).filter(Boolean);
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

  const current = PUBLISHED.find((s) => s.id === active) || PUBLISHED[0];


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
    <Box className="help-root" sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-card)' }}>
      <PageMeta
        title="Help Center | Hey Open"
        description="How Hey Open works: choosing a model, the privacy filter, request modes, Consensus, memory, images and video, plans, the API and troubleshooting."
        path="/help"
      />
      <PageHeader spacer />

      <Box sx={{ maxWidth: 1340, mx: 'auto', px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          className="help-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '244px minmax(0, 1fr)' },
            columnGap: { md: 7, lg: 9 },
            alignItems: 'start',
          }}
        >
          {/* ---------------- section rail ---------------- */}
          <Box
            component="nav"
            aria-label="Help sections"
            /* SmoothScroll captures wheel events document-wide, so a nested
               scroller never receives them and the rail looks frozen unless
               you grab its scrollbar. This hands wheel events back. */
            data-lenis-prevent=""
            sx={{
              position: { md: 'sticky' },
              top: { md: 88 },
              maxHeight: { md: 'calc(100vh - 104px)' },
              pt: { xs: 2.5, md: 5 },
              pb: { xs: 0, md: 6 },
              mb: { xs: 3, md: 0 },
              ...quietScroll,
              /* quietScroll makes this a scroller, which is right for the
                 sticky desktop rail and wrong for a phone, where the
                 disclosure should simply grow the page. */
              overflowY: { xs: 'visible', md: 'auto' },
            }}
          >
            {/* Disclosure, small screens only. */}
            <Box
              component="button"
              type="button"
              onClick={() => setNavOpen((o) => !o)}
              aria-expanded={navOpen}
              aria-controls="help-section-list"
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%', alignItems: 'center', justifyContent: 'space-between',
                gap: 1, px: 1.8, py: 1.3, cursor: 'pointer',
                font: 'inherit', textAlign: 'left',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-heading)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <Box component="span" sx={{ minWidth: 0 }}>
                <Box
                  component="span"
                  sx={{
                    display: 'block', fontSize: '0.64rem', fontWeight: 700,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {current.part}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block', fontSize: '0.95rem', fontWeight: 600,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                >
                  {navOpen ? 'All sections' : current.nav}
                </Box>
              </Box>
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  flexShrink: 0, fontSize: '0.8rem', color: 'var(--text-muted)',
                  transform: navOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .18s ease',
                }}
              >
                &#9662;
              </Box>
            </Box>

            <Box
              id="help-section-list"
              sx={{ display: { xs: navOpen ? 'block' : 'none', md: 'block' }, pt: { xs: 2.4, md: 0 } }}
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
                      onClick={() => setNavOpen(false)}
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
          </Box>

          {/* ---------------- article ---------------- */}
          <Box component="main" className="help-main" sx={{ minWidth: 0, pt: { xs: 0, md: 5 }, pb: { xs: 7, md: 12 } }}>
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
              Get Started
            </Typography>

            <Typography sx={{ fontSize: '1.06rem', lineHeight: 1.72, color: 'var(--text-secondary)', mb: 0 }}>
              Everything Hey Open does and how to do it, from your first conversation to your
              account and billing. {PUBLISHED.length} sections: start at the top, or jump to what
              you need.
            </Typography>

            {PUBLISHED.map((s) => (
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

            <Box sx={{ mt: { xs: 6, md: 8 }, pt: 2.6, borderTop: '1px solid var(--border-subtle)' }}>
              <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Last updated {SNAP}. The model catalogue changes as providers add and retire
                models, so the application is always the authority on what is available to your
                account, and on current prices.
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
