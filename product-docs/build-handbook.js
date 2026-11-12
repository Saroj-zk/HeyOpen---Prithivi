#!/usr/bin/env node
/*
 * Assemble the GitBook into one printable HTML document.
 *
 * Reads SUMMARY.md for the order (so the book and the PDF can never drift
 * apart), renders each article, and writes a single file with a cover, a
 * contents list, and a divider before each of the twelve sections.
 * Headless Chrome then prints it; see build-handbook-pdf.sh.
 *
 * Cross-article links such as ../03-models-and-routing/choose-a-model.md
 * become in-document anchors, so the PDF navigates internally instead of
 * pointing at files the reader does not have.
 *
 *   node product-docs/build-handbook.js
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.join(__dirname, 'gitbook');
const OUT = path.join(__dirname, 'handbook.html');
const REVIEWED = '5 November 2026';

// ---------------------------------------------------------------- read

const summary = fs.readFileSync(path.join(ROOT, 'SUMMARY.md'), 'utf8');

/* Walk SUMMARY line by line: "## X" opens a section, "* [T](p)" adds a
 * page to it. README is the cover's source and is not a numbered article. */
const sections = [];
let section = null;
for (const line of summary.split('\n')) {
  const h = line.match(/^##\s+(.+?)\s*$/);
  if (h) { section = { name: h[1], pages: [] }; sections.push(section); continue; }
  const p = line.match(/^\*\s+\[([^\]]+)\]\(([^)]+)\)/);
  if (!p) continue;
  const file = p[2].split('#')[0];
  if (file === 'README.md') continue;
  if (!section) { section = { name: '', pages: [] }; sections.push(section); }
  section.pages.push({ title: p[1], file });
}

const anchorOf = (file) => 'a-' + file.replace(/\.md$/, '').replace(/[^\w]+/g, '-');

/* Every article path that exists, so a link can be rewritten only when it
 * really points at a page in this book. */
const known = new Set();
for (const s of sections) for (const p of s.pages) known.add(p.file);

// ---------------------------------------------------------------- render

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderArticle(page, number, total) {
  const full = path.join(ROOT, page.file);
  let md = fs.readFileSync(full, 'utf8');

  // Images are relative to the article; make them relative to this file.
  md = md.replace(/\]\(\.\.\/\.gitbook\/assets\//g, '](gitbook/.gitbook/assets/');

  let html = marked.parse(md, { mangle: false, headerIds: false });

  /* Rewrite links to other articles into anchors. The hrefs in the book are
   * relative to the article's own folder, so resolve each against it before
   * looking it up. */
  html = html.replace(/href="([^"]+\.md)(#[^"]*)?"/g, (m, href) => {
    const abs = path.resolve(path.dirname(full), href);
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    return known.has(rel) ? 'href="#' + anchorOf(rel) + '"' : 'href="#"';
  });

  return (
    '<article class="page" id="' + anchorOf(page.file) + '">' +
    '<div class="page-num">' + String(number).padStart(2, '0') + ' / ' + total + '</div>' +
    html +
    '</article>'
  );
}

let body = '';
let n = 0;
const toc = [];
const total = sections.reduce((a, s) => a + s.pages.length, 0);

for (const s of sections) {
  body += '<section class="divider"><div class="divider-inner">' +
          '<div class="divider-kicker">Section</div>' +
          '<h1>' + esc(s.name) + '</h1>' +
          '<ol class="divider-list">' +
          s.pages.map((p) => '<li><a href="#' + anchorOf(p.file) + '">' + esc(p.title) + '</a></li>').join('') +
          '</ol></div></section>';

  toc.push({ section: s.name, pages: s.pages.map((p) => ({ ...p, n: null })) });

  for (const p of s.pages) {
    n += 1;
    toc[toc.length - 1].pages.find((x) => x.file === p.file).n = n;
    body += renderArticle(p, n, total);
  }
}

const tocHtml = toc.map((t) =>
  '<div class="toc-group"><h3>' + esc(t.section) + '</h3><ul>' +
  t.pages.map((p) =>
    '<li><span class="toc-n">' + String(p.n).padStart(2, '0') + '</span>' +
    '<a href="#' + anchorOf(p.file) + '">' + esc(p.title) + '</a></li>').join('') +
  '</ul></div>').join('');

// ---------------------------------------------------------------- shell

const CSS = `
:root {
  --ink: #15181D; --body: #33383F; --mute: #6B7280;
  --rule: #E4E7EC; --rule-soft: #EFF1F4; --band: #F6F7F9;
  --accent: #FF6600;
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  margin: 0; color: var(--body);
  font: 10.5pt/1.62 "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #fff;
}
h1, h2, h3, h4 { color: var(--ink); line-height: 1.22; margin: 0; font-weight: 700; }
p { margin: 0 0 9pt; }
a { color: var(--ink); text-decoration: none; border-bottom: 0.5pt solid var(--rule); }
code {
  font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 0.88em;
  background: var(--band); padding: 1pt 3pt; border-radius: 2pt;
}
pre {
  background: #15181D; color: #E8EAED; padding: 10pt 12pt; border-radius: 5pt;
  overflow: hidden; margin: 0 0 11pt; break-inside: avoid;
}
pre code { background: none; color: inherit; padding: 0; font-size: 8.4pt; line-height: 1.5; }
blockquote {
  margin: 0 0 11pt; padding: 9pt 12pt; background: var(--band);
  border-left: 2.5pt solid var(--accent); border-radius: 0 4pt 4pt 0;
  break-inside: avoid;
}
blockquote p:last-child { margin: 0; }
ul, ol { margin: 0 0 10pt; padding-left: 16pt; }
li { margin-bottom: 4pt; }
table {
  width: 100%; border-collapse: collapse; margin: 0 0 12pt;
  font-size: 9.6pt; break-inside: avoid;
}
th {
  text-align: left; background: var(--band); color: var(--ink);
  font-size: 7.4pt; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 6pt 8pt; border-bottom: 0.75pt solid var(--rule);
}
td { padding: 6pt 8pt; border-bottom: 0.5pt solid var(--rule-soft); vertical-align: top; }
img {
  display: block; width: 100%; height: auto; margin: 10pt 0 5pt;
  border: 0.5pt solid var(--rule); border-radius: 5pt;
}
em { color: var(--mute); }

/* ---- cover ---- */
.cover { height: 247mm; display: flex; flex-direction: column; break-after: page; }
.cover-mark { font-size: 20pt; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; }
.cover-mark span { color: var(--accent); }
.cover-kicker {
  margin-top: 52mm; font-size: 8pt; letter-spacing: 0.17em;
  text-transform: uppercase; color: var(--mute);
}
.cover h1 { font-size: 38pt; letter-spacing: -0.028em; margin: 5mm 0 0; }
.cover-sub { margin-top: 7mm; font-size: 12pt; line-height: 1.6; color: var(--body); max-width: 128mm; }
.cover-meta {
  margin-top: auto; border-top: 0.75pt solid var(--rule); padding-top: 5mm;
  display: flex; gap: 14mm; font-size: 8.6pt; color: var(--mute);
}
.cover-meta b { display: block; color: var(--ink); font-size: 9.4pt; margin-bottom: 1mm; }

/* ---- contents ---- */
.toc { break-after: page; }
.toc > h2 { font-size: 20pt; margin-bottom: 2mm; }
.toc > p { color: var(--mute); margin-bottom: 7mm; }
.toc-group { break-inside: avoid; margin-bottom: 6mm; }
.toc-group h3 {
  font-size: 7.6pt; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--mute); padding-bottom: 2mm; margin-bottom: 2.5mm;
  border-bottom: 0.5pt solid var(--rule);
}
.toc-group ul { list-style: none; margin: 0; padding: 0; }
.toc-group li { display: flex; gap: 5mm; margin-bottom: 1.6mm; font-size: 10pt; }
.toc-n { color: var(--mute); font-variant-numeric: tabular-nums; min-width: 8mm; }
.toc-group a { border: 0; }

/* ---- section divider ---- */
.divider { break-before: page; height: 247mm; display: flex; }
.divider-inner { margin-top: 62mm; }
.divider-kicker {
  font-size: 8pt; letter-spacing: 0.17em; text-transform: uppercase; color: var(--accent);
}
.divider h1 { font-size: 30pt; letter-spacing: -0.025em; margin: 4mm 0 8mm; }
.divider-list { color: var(--mute); font-size: 10.5pt; columns: 2; column-gap: 12mm; }
.divider-list li { margin-bottom: 2.5mm; break-inside: avoid; }
.divider-list a { border: 0; color: var(--body); }

/* ---- articles ---- */
.page { break-before: page; }
.page-num {
  font-size: 7.4pt; letter-spacing: 0.12em; color: var(--mute);
  margin-bottom: 3mm; font-variant-numeric: tabular-nums;
}
.page > h1 {
  font-size: 19pt; letter-spacing: -0.02em;
  padding-bottom: 3mm; margin-bottom: 5mm; border-bottom: 0.75pt solid var(--rule);
}
.page h2 { font-size: 12.5pt; margin: 7mm 0 3mm; break-after: avoid; }
.page h3 { font-size: 10.5pt; margin: 5mm 0 2.5mm; break-after: avoid; }
.page h2 + *, .page h3 + * { break-before: avoid; }
p, li { orphans: 2; widows: 2; }
figure, img { break-inside: avoid; }
`;

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>HeyOpen | Product and Developer Handbook</title>
<style>
@page { size: A4; margin: 18mm 17mm 16mm; }
${CSS}
</style></head>
<body>

<section class="cover">
  <div class="cover-mark">hey <span>open.</span></div>
  <div class="cover-kicker">Product &amp; Developer Handbook</div>
  <h1>Complete Product<br>Documentation</h1>
  <div class="cover-sub">A practical, end-to-end guide to getting started, working with AI
  models, using privacy and memory features, managing subscriptions, building with the API,
  and understanding the HeyOpen ecosystem.</div>
  <div class="cover-meta">
    <div><b>Edition 1.0</b>Reviewed ${REVIEWED}</div>
    <div><b>Scope</b>${n} articles &middot; ${sections.length} sections</div>
    <div><b>Support</b>support@heyopen.ai</div>
  </div>
</section>

<section class="toc">
  <h2>Contents</h2>
  <p>Every article in the documentation, in reading order.</p>
  ${tocHtml}
</section>

${body}
</body></html>`;

fs.writeFileSync(OUT, html, 'utf8');
console.log('handbook.html written: %d articles, %d sections, %d KB',
            n, sections.length, Math.round(html.length / 1024));
