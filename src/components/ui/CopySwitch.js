import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MONO } from '@/components/ui/Ledger';

/**
 * A control for choosing between versions of a page's copy.
 *
 * This is a review tool rather than part of the page, and it is drawn to look
 * like one: fixed to the corner, monospace, deliberately not in the page's own
 * visual language, so nobody mistakes it for something a visitor is meant to
 * use. Take it out, or gate it, before this goes anywhere public.
 *
 * The choice is kept in localStorage so a reload or a jump to another page
 * does not lose it, which matters when the point is to compare. It is read
 * after mount rather than during render: reading storage while rendering
 * gives the server one answer and the browser another, and React rightly
 * complains about the mismatch.
 */
export function useCopyVersion(storageKey, count) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      const n = Number(saved);
      if (Number.isInteger(n) && n >= 0 && n < count) setIndex(n);
    } catch (err) {
      /* Private windows and blocked storage both throw here. The default
         version is a perfectly good answer, so there is nothing to do. */
    }
  }, [storageKey, count]);

  const choose = React.useCallback(
    (n) => {
      setIndex(n);
      try {
        window.localStorage.setItem(storageKey, String(n));
      } catch (err) {
        /* Same again: not being able to remember the choice is survivable. */
      }
    },
    [storageKey]
  );

  return [index, choose];
}

export default function CopySwitch({ versions, index, onChange }) {
  const [open, setOpen] = React.useState(true);
  const current = versions[index];

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: '12px', md: '20px' },
        bottom: { xs: '12px', md: '20px' },
        zIndex: 1300,
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.18)',
        backgroundColor: 'rgba(11,15,26,0.94)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 18px 48px -18px rgba(11,15,26,0.6)',
        px: '12px',
        py: '10px',
        maxWidth: { xs: 'calc(100vw - 24px)', md: '300px' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <Typography
          component="span"
          sx={{
            fontFamily: MONO,
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Copy version
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          sx={{
            appearance: 'none',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            p: 0,
            fontFamily: MONO,
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.5)',
            '&:hover': { color: '#FFFFFF' },
            '&:focus-visible': { outline: '2px solid #FF6600', outlineOffset: '2px' },
          }}
        >
          {open ? 'HIDE' : 'SHOW'}
        </Box>
      </Box>

      {open && (
        <>
          <Box sx={{ display: 'flex', gap: '6px', mt: '10px' }}>
            {versions.map((v, i) => {
              const on = i === index;
              return (
                <Box
                  key={v.id}
                  component="button"
                  type="button"
                  onClick={() => onChange(i)}
                  aria-pressed={on}
                  sx={{
                    appearance: 'none',
                    cursor: 'pointer',
                    flex: 1,
                    px: '10px',
                    py: '7px',
                    borderRadius: '4px',
                    border: `1px solid ${on ? '#FF6600' : 'rgba(255,255,255,0.2)'}`,
                    backgroundColor: on ? '#FF6600' : 'transparent',
                    color: on ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                    fontFamily: MONO,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    transition: 'all .16s ease',
                    '&:hover': { borderColor: on ? '#FF6600' : 'rgba(255,255,255,0.45)' },
                    '&:focus-visible': { outline: '2px solid #FF6600', outlineOffset: '2px' },
                  }}
                >
                  {v.id}
                </Box>
              );
            })}
          </Box>

          <Typography
            sx={{
              mt: '10px',
              fontFamily: MONO,
              fontSize: '0.66rem',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            {current.name}
          </Typography>
          <Typography
            sx={{
              mt: '3px',
              fontSize: '0.72rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {current.note}
          </Typography>
        </>
      )}
    </Box>
  );
}
