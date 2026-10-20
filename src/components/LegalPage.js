import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

/**
 * The shell both legal pages share: title, when it was last changed, the text,
 * and somewhere to write to.
 *
 * It carries no clauses of its own. A privacy policy and a set of terms are
 * commitments the company makes, so the wording has to come from the company,
 * not from the person building the page. Pass the sections in; until they
 * arrive the page says so plainly rather than inventing them.
 */
export default function LegalPage({ title, description, updated, sections }) {
  const hasText = Array.isArray(sections) && sections.length > 0;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>{`${title} | Hey Open`}</title>
        <meta name="description" content={description} />
        {/* Not worth indexing while it is a holding page. */}
        {!hasText && <meta name="robots" content="noindex" />}
      </Head>

      <PageHeader />

      <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 6, md: 10 } }}>
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
          {title}
        </Typography>

        {updated && (
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)', mb: { xs: 4, md: 5 } }}>
            Last updated {updated}
          </Typography>
        )}

        {hasText ? (
          sections.map((section) => (
            <Box key={section.heading} sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 700, color: 'var(--text-heading)', mb: 1.5 }}
              >
                {section.heading}
              </Typography>
              {section.body.map((para, i) => (
                <Typography
                  key={i}
                  sx={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', mb: 1.5, textWrap: 'pretty' }}
                >
                  {para}
                </Typography>
              ))}
            </Box>
          ))
        ) : (
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: '14px',
              border: '1px solid var(--border-normal)',
              backgroundColor: 'var(--bg-section-alt)',
            }}
          >
            <Typography sx={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', mb: 2, textWrap: 'pretty' }}>
              We are finalising the wording of this document. If you need it before it is published
              here, write to us and we will send you the current version.
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
      </Container>

      <Footer />
    </Box>
  );
}
