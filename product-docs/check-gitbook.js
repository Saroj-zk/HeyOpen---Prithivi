#!/usr/bin/env node
/*
 * Verify the built GitBook: every relative link and image resolves, every
 * article is reachable from SUMMARY.md, and no page is empty.
 *
 *   node product-docs/check-gitbook.js [gitbook-dir]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.argv[2] || path.join(__dirname, 'gitbook'));

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const md = files.filter((f) => f.endsWith('.md'));
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

const problems = [];
let links = 0;
let images = 0;

for (const f of md) {
  const body = fs.readFileSync(f, 'utf8');
  if (body.trim().split(/\s+/).length < 20 && rel(f) !== 'SUMMARY.md') {
    problems.push(['thin', rel(f), body.trim().split(/\s+/).length + ' words']);
  }
  const re = /(!?)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const isImg = m[1] === '!';
    const target = m[2];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    if (isImg) images += 1; else links += 1;
    const clean = target.split('#')[0];
    if (!clean) continue;
    const resolved = path.resolve(path.dirname(f), clean);
    if (!fs.existsSync(resolved)) {
      problems.push([isImg ? 'image' : 'link', rel(f), target]);
    }
  }
}

// Reachability from SUMMARY
const summaryPath = path.join(ROOT, 'SUMMARY.md');
const summary = fs.readFileSync(summaryPath, 'utf8');
const listed = new Set();
let s;
const sre = /\[[^\]]*\]\(([^)\s]+)\)/g;
while ((s = sre.exec(summary)) !== null) listed.add(s[1].split('#')[0]);

const articles = md.map(rel).filter((r) => r !== 'SUMMARY.md');
const orphans = articles.filter((a) => !listed.has(a));
const dangling = [...listed].filter((l) => !fs.existsSync(path.join(ROOT, l)));

console.log('articles: %d   links checked: %d   images checked: %d',
            articles.length, links, images);
console.log('listed in SUMMARY: %d', listed.size);

for (const [kind, where, what] of problems) {
  console.log('  BROKEN ' + kind.padEnd(5) + ' ' + where + ' -> ' + what);
}
for (const o of orphans) console.log('  ORPHAN        ' + o + ' (not in SUMMARY)');
for (const d of dangling) console.log('  DANGLING      SUMMARY -> ' + d);

const bad = problems.length + orphans.length + dangling.length;
console.log(bad ? '\nFAILED: %d problem(s)' : '\nOK: no problems', bad || '');
process.exit(bad ? 1 : 0);
