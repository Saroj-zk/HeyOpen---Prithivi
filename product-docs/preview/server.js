/**
 * A tiny static server so the GitBook can be read in a browser locally.
 *
 * It serves the viewer at /, the markdown under /md/, and the screenshots
 * at /images/. Nothing is installed: this is node's own http and fs, so
 * the preview cannot drift from what is actually in the gitbook folder.
 *
 * The gitbook folder stays clean. The viewer lives outside it so the
 * folder can be imported into GitBook without carrying preview assets.
 *
 * Run: node product-docs/preview/server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 4000;
const PREVIEW = __dirname;
const BOOK = path.join(__dirname, '..', 'gitbook');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/plain; charset=utf-8',
};

/* Keep every served path inside its own root. A docs viewer that will
   read ../../.. is a directory traversal hole, even on localhost. */
function safeJoin(root, rel) {
  const p = path.normalize(path.join(root, rel));
  return p.startsWith(root) ? p : null;
}

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);

  if (url === '/' || url === '/index.html') {
    return send(res, 200, fs.readFileSync(path.join(PREVIEW, 'index.html')), TYPES['.html']);
  }

  /* /md/<path>  -> the markdown source, read fresh on every request so a
     rebuild shows up on refresh without restarting the server. */
  if (url.startsWith('/md/')) {
    const p = safeJoin(BOOK, url.slice(4));
    if (!p || !fs.existsSync(p)) return send(res, 404, 'not found');
    return send(res, 200, fs.readFileSync(p), TYPES['.md']);
  }

  /* Everything else resolves inside the book, which covers /images/*. */
  const p = safeJoin(BOOK, url);
  if (p && fs.existsSync(p) && fs.statSync(p).isFile()) {
    return send(res, 200, fs.readFileSync(p), TYPES[path.extname(p)] || 'application/octet-stream');
  }

  return send(res, 404, 'not found');
});

server.listen(PORT, () => {
  const pages = fs.readdirSync(BOOK, { recursive: true }).filter((f) => String(f).endsWith('.md')).length;
  console.log(`Hey Open docs preview on http://localhost:${PORT}  (${pages} pages)`);
});
