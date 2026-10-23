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

/** One body node. `number` is the parent section's number, for sub-clauses. */
function Node({ node, number, clauseIndex }) {
  if (typeof node === 'string') return <Paragraph>{node}</Paragraph>;

  if (node.note) return <DraftNote>{node.note}</DraftNote>;

  if (node.sub) {
    return (
      <Typography
        component="h3"
        sx={{
          fontSize: { xs: '1rem', md: '1.05rem' },
          fontWeight: 700,
          color: 'var(--text-heading)',
          mt: 4,
          mb: 1.8,
        }}
      >
        {node.sub}
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
        {node.text}
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
                  <Label>{m[1]}.</Label> {m[2]}
                </>
              ) : (
                item
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return null;
}

/** Body nodes, with sub-clause numbering counted as we go. */
function Body({ body, number }) {
  let clauses = 0;
  return (
    <>
      {body.map((node, i) => {
        if (node && node.clause) clauses += 1;
        return <Node key={i} node={node} number={number} clauseIndex={clauses} />;
      })}
    </>
  );
}

export default function LegalPage({ doc, description }) {
  const sections = (doc && doc.sections) || [];
  const hasText = sections.length > 0;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>{`${doc.title} | Hey Open`}</title>
        <meta name="description" content={description} />
        {/* Not worth indexing while it is a holding page. */}
        {!hasText && <meta name="robots" content="noindex" />}
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

          {doc.updated && (
            <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)', mb: { xs: 4, md: 5 } }}>
              {doc.dateLabel || 'Last updated'}: {doc.updated}
            </Typography>
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
