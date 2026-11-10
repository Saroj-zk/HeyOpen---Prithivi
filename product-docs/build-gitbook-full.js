#!/usr/bin/env node
/*
 * Build the complete GitBook from the review copy.
 *
 * The review copy is one flat Markdown file that already carries, before
 * every article, a line of the form
 *
 *     > Section: Getting Started | File: `01-getting-started/quickstart.md`
 *
 * and whose internal links are already written relative to those paths.
 * So this is a split, not a conversion: cut the file on those markers,
 * write each article to the path it names, and derive SUMMARY.md from the
 * order the markers appear in. Nothing is reworded here, because the
 * review copy is the approved text.
 *
 * Screenshots are the one addition. The review copy has no images; the
 * captures taken from the live product are mapped onto the articles that
 * describe those screens, in IMAGES below.
 *
 *   node product-docs/build-gitbook-full.js [path-to-review-copy.md]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'gitbook');
const ASSETS = path.join(ROOT, '.gitbook', 'assets');
const SHOTS = path.join(__dirname, '..', 'public', 'help');

const { EDITS, NEW_PAGES, DROP_PAGES = [] } = require('./amendments');

const SRC = process.argv[2] ||
  path.join(process.env.USERPROFILE || process.env.HOME,
            'Downloads', 'Hey_Open_GitBook_Complete_Documentation.md');

const MARKER = /^> Section: (.+?) \| File: `(.+?)`\s*$/gm;

/* Screenshot placement. Each entry is
 *   article path -> [image file, alt text, where to put it]
 * "where" is the heading the image is inserted after; null means directly
 * after the article's opening paragraph. Images are only placed on pages
 * that actually describe the screen shown, so a reader is never looking
 * at one screen while reading about another.
 */
const IMAGES = {
  '01-getting-started/platform-tour.md':
    ['a01-chat-signed-in.jpg', 'The Hey Open chat screen, signed in', null],
  '01-getting-started/guest-and-accounts.md':
    ['a03-account-menu.jpg', 'The account menu at the foot of the sidebar', null],
  '02-chat-and-workflows/using-the-chat.md':
    ['a01-chat-signed-in.jpg', 'The chat screen: sidebar, composer and model picker', null],
  '03-models-and-routing/model-catalog.md':
    ['a11-model-picker.jpg', 'The model picker, with privacy and capability badges', null],
  '03-models-and-routing/model-labels.md':
    ['a11-model-picker.jpg', 'Model badges in the picker, and the detail card on hover', null],
  '04-multimodal-creation/image-generation.md':
    ['a13-image-tools.jpg', 'The nine image tools', null],
  '05-universal-memory/memory-setup.md':
    ['a08-memory.jpg', 'Memory settings: three switches, and the saved memories list', null],
  '05-universal-memory/consensus-mode.md':
    ['a12-consensus.jpg', 'Consensus Mode: multiple models, one verdict', null],
  '06-privacy-and-security/privacy-at-a-glance.md':
    ['a02-privacy-filter.jpg', 'The privacy filter, set to Min', null],
  '06-privacy-and-security/local-data-and-history.md':
    ['a09-storage.jpg', 'Storage: chat history is kept in this browser', null],
  '07-plans-billing-and-account/subscriptions.md':
    ['a05-billing.jpg', 'The Billing tab: current plan, extra credits and invoices', null],
  '07-plans-billing-and-account/credits-and-usage.md':
    ['a06-usage.jpg', 'Usage for the current billing period', null],
  '07-plans-billing-and-account/billing-history.md':
    ['a07-credits-history.jpg', 'Credits History', null],
  '07-plans-billing-and-account/account-security.md':
    ['a04-settings-appearance.jpg', 'Settings: General, Billing, and Data and Privacy', null],
};

/* The affiliate article carries its own figures inline, so they are listed
 * here only to be copied into the assets folder. The Token Dashboard
 * capture is deliberately absent: it still reads "Hey Open Pro is free at
 * 100 staked", which the $1,000 threshold has superseded. */
const EXTRA_ASSETS = [
  'a14-affiliate-hero.jpg',
  'a15-affiliate-benefits.jpg',
  'a16-affiliate-steps.jpg',
  'a17-affiliate-rates.jpg',
];


/* Screens shown in the captures carry a real account's wallet, invoice and
 * account ids. Those regions are pixelated in public/help, and this note
 * travels with the images so nobody re-shoots them unredacted. */
const SHOT_NOTE = 'Account identifiers in the screenshots are redacted.';

// ---------------------------------------------------------------- helpers

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function write(rel, body) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, body.replace(/\r\n/g, '\n'), 'utf8');
}

function titleOf(body, fallback) {
  const m = body.match(/^# (.+)$/m);
  return m ? m[1].trim() : fallback;
}

/* Put the figure after the first paragraph that follows the H1, so the page
 * opens with a sentence of context rather than a picture. */
function insertImage(body, rel) {
  const spec = IMAGES[rel];
  if (!spec) return body;
  const [file, alt] = spec;
  if (!fs.existsSync(path.join(SHOTS, file))) {
    console.warn('  ! missing screenshot: %s (%s)', file, rel);
    return body;
  }
  const fig = '\n![' + alt + '](../.gitbook/assets/' + file + ')\n' +
              '\n_' + alt + '. ' + SHOT_NOTE + '_\n';

  const lines = body.split('\n');
  let i = lines.findIndex((l) => /^# /.test(l));
  if (i < 0) return fig + body;
  i += 1;
  while (i < lines.length && lines[i].trim() === '') i += 1;      // to the paragraph
  while (i < lines.length && lines[i].trim() !== '') i += 1;      // past it
  lines.splice(i, 0, fig);
  return lines.join('\n');
}

// ---------------------------------------------------------------- read

if (!fs.existsSync(SRC)) {
  console.error('Review copy not found: %s', SRC);
  process.exit(1);
}
const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

const marks = [];
let m;
while ((m = MARKER.exec(src)) !== null) {
  marks.push({ section: m[1].trim(), file: m[2].trim(), at: m.index, end: MARKER.lastIndex });
}
if (!marks.length) {
  console.error('No "> Section: ... | File: ..." markers found. Wrong source file?');
  process.exit(1);
}

// ---------------------------------------------------------------- build

rmrf(ROOT);
fs.mkdirSync(ASSETS, { recursive: true });

/* README: everything before the first marker, minus the review-copy
 * preamble, which is about the review copy rather than the product. */
let intro = src.slice(0, marks[0].at);
intro = intro.replace(/^# Hey Open \| Complete GitBook Documentation[\s\S]*?\n---\n/, '');
intro = intro.replace(/\n-{3,}\s*$/g, '\n').trim() + '\n';
write('README.md', intro);

/* Split first, into memory, so amendments can be applied before anything
 * reaches disk. */
const articles = marks.map((mk, i) => {
  const to = i + 1 < marks.length ? marks[i + 1].at : src.length;
  let body = src.slice(mk.end, to);
  body = body.replace(/^\s*\n+/, '').replace(/\n*-{3,}\s*$/, '\n').trimEnd() + '\n';
  return { section: mk.section, file: mk.file, body };
});
const byFile = new Map(articles.map((a) => [a.file, a]));

/* Amendments. A find that does not match exactly once is a build failure:
 * the review copy has changed under the amendment and it needs re-reading,
 * which is far better caught here than noticed in a published PDF. */
for (const e of EDITS) {
  const art = byFile.get(e.file);
  if (!art) throw new Error('amendment targets a missing article: ' + e.file);
  const n = art.body.split(e.find).length - 1;
  if (n !== 1) {
    throw new Error('amendment in ' + e.file + ' matched ' + n + ' times, expected 1:\n  ' + e.find);
  }
  art.body = art.body.replace(e.find, e.replace);
}

for (const p of NEW_PAGES) {
  const at = articles.findIndex((a) => a.file === p.after);
  if (at < 0) throw new Error('new page anchored to a missing article: ' + p.after);
  articles.splice(at + 1, 0, { section: p.section, file: p.file, body: p.body });
}

/* Held-back articles. A link to one left behind would 404 in GitBook and
 * dangle in the PDF, so the build refuses rather than shipping it. */
for (const d of DROP_PAGES) {
  const at = articles.findIndex((a) => a.file === d.file);
  if (at < 0) throw new Error('drop targets a missing article: ' + d.file);
  articles.splice(at, 1);
}
for (const a of articles) {
  for (const d of DROP_PAGES) {
    const leaf = d.file.split('/').pop();
    if (a.body.includes(leaf)) {
      throw new Error(a.file + ' still links to the held-back ' + d.file);
    }
  }
}

const pages = [];
for (const a of articles) {
  const body = insertImage(a.body, a.file);
  write(a.file, body);
  pages.push({ section: a.section, file: a.file, title: titleOf(body, a.file) });
}

// ---------------------------------------------------------------- SUMMARY

const summary = ['# Table of contents', '', '* [Hey Open Documentation](README.md)', ''];
let current = null;
for (const p of pages) {
  if (p.section !== current) {
    current = p.section;
    summary.push('## ' + current, '');
  }
  summary.push('* [' + p.title + '](' + p.file + ')');
  if (p === pages[pages.length - 1] || pages[pages.indexOf(p) + 1].section !== current) {
    summary.push('');
  }
}
write('SUMMARY.md', summary.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

// ---------------------------------------------------------------- config

write('.gitbook.yaml', [
  'root: ./',
  '',
  'structure:',
  '  readme: README.md',
  '  summary: SUMMARY.md',
  '',
].join('\n'));

// ---------------------------------------------------------------- assets

let copied = 0;
const wanted = new Set([...Object.values(IMAGES).map((v) => v[0]), ...EXTRA_ASSETS]);
for (const f of wanted) {
  const from = path.join(SHOTS, f);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, path.join(ASSETS, f));
    copied += 1;
  }
}

// ---------------------------------------------------------------- report

const bySection = pages.reduce((a, p) => {
  a[p.section] = (a[p.section] || 0) + 1;
  return a;
}, {});
console.log('GitBook written to %s', path.relative(process.cwd(), ROOT));
const row = (label, n) => console.log('  ' + String(label).padEnd(26) + String(n).padStart(3));
for (const [s, n] of Object.entries(bySection)) row(s, n);
row('(total articles)', pages.length);
row('(amendments)', EDITS.length + ' edits, ' + NEW_PAGES.length + ' new, ' + DROP_PAGES.length + ' held back');
row('(images)', copied);
