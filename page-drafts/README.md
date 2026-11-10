# Pages held back

Routes that are written but not published. A file here is outside `pages/`,
so Next.js does not route to it and the URL 404s.

To publish one, move it back:

    git mv page-drafts/<name>.js pages/<name>.js

and restore whatever navigation entry points at it.

| File | Route it would serve | Held back because |
| --- | --- | --- |
| `hey.js` | `/hey` | $HEY is not announced yet. Its nav entries in `src/components/Header.js` and `src/components/PageHeader.js` are already commented out, and the Help Center's `$HEY` section carries `draft: true`. |
