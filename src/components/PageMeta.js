import * as React from 'react';
import Head from 'next/head';

/**
 * One page's metadata, in one place.
 *
 * ------------------------------------------------------------------
 * Every page was setting a title and a description by hand and nothing
 * else. _document.js carries og:image, og:type, og:site_name and the
 * Twitter card type, but there was no og:title, no og:description, no
 * og:url and no canonical anywhere on the site.
 *
 * A shared link still rendered, because crawlers fall back to <title> and
 * the description meta when the Open Graph pair is missing. It is a
 * fallback though, not a contract: the og: tags are what Slack, iMessage,
 * LinkedIn and the rest read first, and without og:url a share of a link
 * carrying UTM parameters or a trailing slash is a different page as far
 * as the crawler is concerned.
 *
 * So the seven tags are emitted together from one component, and a page
 * that states a title gets the whole set or none of it. They cannot drift
 * apart from each other because nothing can set one without the others.
 *
 * ------------------------------------------------------------------
 * SITE IS WHERE THIS DEPLOYS. og:url and canonical have to be absolute,
 * so this constant is what every page declares itself to be. If the site
 * ever serves from somewhere else, this is the one line to change, and
 * the og:image in _document has to follow it.
 */
const SITE = 'https://heyopen.ai';

export default function PageMeta({ title, description, path = '/' }) {
  /* Canonical URLs do not carry a trailing slash except at the root. */
  const url = path === '/' ? SITE : `${SITE}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {/* Twitter reads og: for most things but keeps its own title and
          description, and falls back to the page's rather than og's when
          they are absent. Stating them is a line each. */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
