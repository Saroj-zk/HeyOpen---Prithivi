import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

/**
 * The shell both legal pages share, laid out the way Venice's legal pages are:
 * a preamble that defines the terms, then either Title Case headings with
 * lettered sub-parts (the privacy policy) or numbered sections with decimal
 * sub-clauses (the terms).
 *
 * Numbering is derived from array position here rather than written into the
 * copy, so inserting a section renumbers everything after it and cannot leave a
 * stale "see section 12" behind. Cross-references in the copy are by name.
 *
 * It carries no clauses of its own. A privacy policy and a set of terms are
 * commitments the company makes, so the wording has to come from the company,
 * not from the person building the page. Pass the document in; until it arrives
 * the page says so plainly rather than inventing it.
 */

const MEASURE = 760;

const P_SX = {
  fontSize: '1rem',
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  mb: 2,
  textWrap: 'pretty',
};

/* A contact address in a legal document is there to be used, so the ones
   written into the copy are turned into mailto links rather than left as text
   the reader has to retype. The capturing group means split() hands back the
   addresses at the odd indices, with the surrounding prose at the even ones. */
const EMAIL = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi;

function linkEmails(text) {
  if (typeof text !== 'string' || text.indexOf('@') === -1) return text;
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <Box
        component="a"
        key={i}
        href={`mailto:${part}`}
        sx={{
          color: '#FF6600',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {part}
      </Box>
    ) : (
      part
    )
  );
}

/* Venice leads most paragraphs with a short bold label. In list items the same
   shape is written inline ("Access. To know what..."), so it gets split back
   out here. Deliberately narrow: a short lead-in, a period, then real text. */
const LEAD_IN = /^([^.]{1,40})\.\s+(.+)$/;

function Paragraph({ children, sx }) {
  return <Typography sx={{ ...P_SX, ...sx }}>{children}</Typography>;
}

function Label({ children }) {
  return (
    <Box component="strong" sx={{ fontWeight: 700, color: 'var(--text-heading)' }}>
      {children}
    </Box>
  );
}

/**
 * A bracketed decision or missing fact. Rendered as a marked block on purpose:
 * these are the parts only the company can supply, and an unfinished document
 * must not be able to go out looking finished.
 */
function DraftNote({ children }) {
  return (
    <Box
      sx={{
        my: 2.5,
        p: { xs: 2, md: 2.5 },
        borderRadius: '10px',
        border: '1px dashed',
        borderColor: 'rgba(255, 102, 0, 0.45)',
        backgroundColor: 'rgba(255, 102, 0, 0.05)',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.7rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#C24E00',
          mb: 0.8,
        }}
      >
        Drafting note — not for publication
      </Typography>
      <Typography
        sx={{
          fontSize: '0.88rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          textWrap: 'pretty',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

const SUBHEAD_SX = {
  fontSize: { xs: '1rem', md: '1.05rem' },
  fontWeight: 700,
  color: 'var(--text-heading)',
  mt: 4,
  mb: 1.8,
};

/**
 * One body node. `number` is the parent section's number, for sub-clauses.
 *
 * `sub` carries its own label; `part` is numbered from its position in the
 * section, so 1.1, 1.2 and so on are derived the same way the section numbers
 * are and an inserted sub-part cannot leave the ones after it wrong.
 */
function Node({ node, number, clauseIndex, partIndex }) {
  if (typeof node === 'string') return <Paragraph>{linkEmails(node)}</Paragraph>;

  if (node.note) return <DraftNote>{node.note}</DraftNote>;

  if (node.sub) {
    return (
      <Typography component="h3" sx={SUBHEAD_SX}>
        {node.sub}
      </Typography>
    );
  }

  if (node.part) {
    return (
      <Typography component="h3" sx={SUBHEAD_SX}>
        {number}.{partIndex} {node.part}
      </Typography>
    );
  }

  if (node.caps) {
    return (
      <Paragraph
        sx={{
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.9rem',
          lineHeight: 1.8,
          letterSpacing: '0.01em',
          color: 'var(--text-primary)',
        }}
      >
        {node.caps}
      </Paragraph>
    );
  }

  if (node.clause) {
    return (
      <Paragraph>
        <Label>
          {number}.{clauseIndex} {node.clause}.
        </Label>{' '}
        {node.text}
      </Paragraph>
    );
  }

  if (node.label) {
    return (
      <Paragraph sx={node.text ? undefined : { mb: 1.2 }}>
        <Label>{node.label}</Label>
        {node.text ? ' ' : null}
        {linkEmails(node.text)}
      </Paragraph>
    );
  }

  if (node.list || node.alpha) {
    const items = node.list || node.alpha;
    return (
      <Box
        component={node.alpha ? 'ol' : 'ul'}
        sx={{
          m: 0,
          mb: 2.5,
          pl: 3.2,
          listStyleType: node.alpha ? 'lower-alpha' : 'disc',
          '& li': {
            ...P_SX,
            mb: 1.2,
            pl: 0.6,
            '&::marker': { color: 'var(--text-muted)' },
          },
        }}
      >
        {items.map((item, i) => {
          const m = node.list ? LEAD_IN.exec(item) : null;
          return (
            <Box component="li" key={i}>
              {m ? (
                <>
                  <Label>{m[1]}.</Label> {linkEmails(m[2])}
                </>
              ) : (
                linkEmails(item)
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return null;
}

/** Body nodes, with sub-clause and sub-part numbering counted as we go. */
function Body({ body, number }) {
  let clauses = 0;
  let parts = 0;
  return (
    <>
      {body.map((node, i) => {
        if (node && node.clause) clauses += 1;
        if (node && node.part) parts += 1;
        return (
          <Node
            key={i}
            node={node}
            number={number}
            clauseIndex={clauses}
            partIndex={parts}
          />
        );
      })}
    </>
  );
}

/* A bracketed capitalised slot is how this file marks a fact only the company
   can supply: [LEGAL ENTITY NAME], [EFFECTIVE DATE]. While any remain, the
   document is not finished, and an unfinished policy should not be the version
   search engines hold. */
const PLACEHOLDER = /\[[A-Z][A-Z0-9 ,./'-]{2,}\]/;

export default function LegalPage({ doc, description }) {
  const sections = (doc && doc.sections) || [];
  const hasText = sections.length > 0;
  const unfinished = !hasText || PLACEHOLDER.test(JSON.stringify(doc));

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>{`${doc.title} | Hey Open`}</title>
        <meta name="description" content={description} />
        {/* Not worth indexing while it is a holding page, and not safe to index
            while it still has blanks in it. */}
        {unfinished && <meta name="robots" content="noindex" />}
      </Head>

      <PageHeader />

      <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 6, md: 10 } }}>
        <Box sx={{ maxWidth: MEASURE }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.1rem', md: '3rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-heading)',
              mb: 1.5,
              textWrap: 'balance',
            }}
          >
            {doc.title}
          </Typography>

          {(doc.effective || doc.updated) && (
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              {doc.effective && (
                <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Effective: {doc.effective}
                </Typography>
              )}
              {doc.updated && (
                <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {doc.dateLabel || 'Last updated'}: {doc.updated}
                </Typography>
              )}
            </Box>
          )}

          {hasText ? (
            <>
              {/* Preamble: no heading, and it is where the defined terms live. */}
              {(doc.preamble || []).map((node, i) => (
                <Node key={`pre-${i}`} node={node} />
              ))}

              {/* The conspicuous acceptance notice, above section 1. */}
              {doc.notice && (
                <Box sx={{ mt: { xs: 4, md: 5 }, mb: { xs: 4, md: 5 } }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 800,
                      letterSpacing: '0.01em',
                      color: 'var(--text-heading)',
                      mb: 2,
                    }}
                  >
                    {doc.notice.heading}
                  </Typography>
                  {doc.notice.body.map((node, i) => (
                    <Node key={`notice-${i}`} node={node} />
                  ))}
                </Box>
              )}

              {sections.map((section, i) => (
                <Box key={section.heading} sx={{ mt: { xs: 5, md: 6 } }}>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.015em',
                      color: 'var(--text-heading)',
                      mb: 2,
                      textWrap: 'balance',
                    }}
                  >
                    {doc.numbered ? `${i + 1}. ${section.heading}` : section.heading}
                  </Typography>
                  <Body body={section.body} number={i + 1} />
                </Box>
              ))}
            </>
          ) : (
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '14px',
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-section-alt)',
              }}
            >
              <Typography sx={{ ...P_SX, mb: 2 }}>
                We are finalising the wording of this document. If you need it before it is
                published here, write to us and we will send you the current version.
              </Typography>
              <Box
                component="a"
                href="mailto:marketing@openledger.xyz"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#FF6600',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                marketing@openledger.xyz
                <Box component="span" aria-hidden="true">→</Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
