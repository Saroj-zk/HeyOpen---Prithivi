import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * The ledger parts, shared by the two token pages.
 *
 * Staking is bookkeeping and this is OpenLedger, so both pages are drawn from
 * the same material: entries set with leader dots, figures in a monospace with
 * tabular numerals so columns line up, and a double rule above a total, which
 * is the one piece of accounting grammar a reader does not have to be taught.
 *
 * These live here rather than in either page because $OPEN and $HEY describe
 * one system from two ends. A figure styled one way on one page and another
 * way on the other would read as two products.
 */

/* Ink is a near black with a blue cast rather than a true black, so a dark
   band reads as paper stock rather than as a hole in the page. */
export const INK = '#0B0F1A';
export const MONO = '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
export const RULE = 'rgba(11, 15, 26, 0.14)';
export const RULE_ON_INK = 'rgba(255, 255, 255, 0.20)';
export const FIG = {
  fontFamily: MONO,
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '-0.01em',
};

export function Label({ children, sx, onInk }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: MONO,
        fontSize: '0.66rem',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: onInk ? 'rgba(255,255,255,0.52)' : 'var(--text-muted)',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

/* One line of a statement: what it is, a run of leader dots, what it comes
   to. The dots are what make a row read as an entry rather than as a label
   and a number that happen to share a line.
 *
 * `dashed` sets the figure inside a dashed rule instead of printing it, for
 * anything that is a target rather than a rate. `total` puts a double rule
 * above the row. */
export function Entry({ name, figure, dashed, total, onInk }) {
  const ink = onInk ? '#FFFFFF' : 'var(--text-heading)';
  const quiet = onInk ? 'rgba(255,255,255,0.62)' : 'var(--text-secondary)';
  const rule = onInk ? RULE_ON_INK : RULE;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '12px',
        pt: total ? { xs: '16px', md: '18px' } : '13px',
        pb: '13px',
        borderTop: total
          ? `3px double ${onInk ? 'rgba(255,255,255,0.5)' : 'rgba(11,15,26,0.45)'}`
          : 'none',
      }}
    >
      <Typography
        sx={{
          fontSize: total ? { xs: '0.95rem', md: '1rem' } : '0.92rem',
          fontWeight: total ? 600 : 400,
          color: total ? ink : quiet,
          /* Entries carry words as well as figures, so neither side can
             refuse to wrap: at 375px a nowrap value ran past the edge and
             was clipped rather than scrolled. */
          whiteSpace: { xs: 'normal', md: 'nowrap' },
          minWidth: 0,
        }}
      >
        {name}
      </Typography>
      <Box
        aria-hidden="true"
        sx={{
          flex: 1,
          minWidth: '16px',
          borderBottom: `1px dotted ${rule}`,
          transform: 'translateY(-5px)',
        }}
      />
      {dashed ? (
        <Box
          sx={{
            px: '9px',
            py: '3px',
            borderRadius: '4px',
            border: `1.5px dashed ${onInk ? 'rgba(255,255,255,0.4)' : 'rgba(11,15,26,0.3)'}`,
            ...FIG,
            fontSize: '0.9rem',
            fontWeight: 500,
            color: onInk ? 'rgba(255,255,255,0.72)' : 'var(--text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          {figure}
        </Box>
      ) : (
        <Typography
          sx={{
            ...FIG,
            fontSize: total ? { xs: '1.15rem', md: '1.3rem' } : '0.98rem',
            fontWeight: total ? 600 : 500,
            color: total ? 'var(--brand-accent)' : ink,
            whiteSpace: 'normal',
            textAlign: 'right',
            minWidth: 0,
          }}
        >
          {figure}
        </Typography>
      )}
    </Box>
  );
}

export function Button({ children, href, primary, onInk, small }) {
  const external = href.startsWith('http');
  /* A mailto is a plain anchor, not a route. Passed to next/link it is
     treated as a path and the mail client never opens. It does not get
     target="_blank" either: handing off to a mail client leaves the blank
     tab behind. */
  const bare = external || href === '#' || href.startsWith('mailto:');
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    px: small ? '17px' : '23px',
    py: small ? '10px' : '13px',
    borderRadius: '4px',
    fontSize: small ? '0.86rem' : '0.94rem',
    fontWeight: 600,
    letterSpacing: '-0.005em',
    textDecoration: 'none',
    transition: 'all .18s cubic-bezier(.32,.72,0,1)',
    ...(primary
      ? {
          backgroundColor: 'var(--brand-accent)',
          color: '#FFFFFF',
          border: '1px solid var(--brand-accent)',
          '&:hover': { filter: 'brightness(1.08)' },
        }
      : onInk
      ? {
          backgroundColor: 'transparent',
          color: '#FFFFFF',
          border: `1px solid ${RULE_ON_INK}`,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
        }
      : {
          backgroundColor: 'transparent',
          color: 'var(--text-heading)',
          border: `1px solid ${RULE}`,
          '&:hover': { backgroundColor: 'var(--bg-card-hover)' },
        }),
  };

  if (bare) {
    return (
      <Box
        component="a"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        sx={sx}
      >
        {children}
      </Box>
    );
  }
  return (
    <Link href={href} legacyBehavior>
      <Box component="a" sx={sx}>
        {children}
      </Box>
    </Link>
  );
}

export function Head2({ eyebrow, title, lede, onInk, center, maxWidth = 860 }) {
  return (
    <Box
      sx={{
        maxWidth,
        mx: center ? 'auto' : 0,
        textAlign: center ? 'center' : 'left',
      }}
    >
      <Label onInk={onInk} sx={{ color: onInk ? 'rgba(255,255,255,0.6)' : 'var(--brand-accent)' }}>
        {eyebrow}
      </Label>
      <Typography
        component="h2"
        sx={{
          mt: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3.05rem' },
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          color: onInk ? '#FFFFFF' : 'var(--text-heading)',
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>
      {lede && (
        <Typography
          sx={{
            mt: 2.2,
            fontSize: '1.04rem',
            lineHeight: 1.65,
            color: onInk ? 'rgba(255,255,255,0.66)' : 'var(--text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {lede}
        </Typography>
      )}
    </Box>
  );
}
