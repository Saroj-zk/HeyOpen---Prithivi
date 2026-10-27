/**
 * The glass the token sections are drawn in.
 *
 * Lifted out of TokenFlowSection when a second section needed the same
 * surface. Two copies of a recipe this fiddly drift within a week, and the
 * thing that gives it away is the bevel: get the rim or the specular sweep
 * slightly wrong and one section looks cheap next to the other.
 *
 * The bevel is what reads as glass, not the transparency. The bodies are
 * nearly opaque on purpose, since a see-through orange over a light panel
 * just looks washed out.
 */

export const ORANGE = '#ff6600';
export const INK = '#14161B';
export const DASH_C = 'rgba(20, 22, 27, 0.42)';

export const LABEL = {
  fontSize: '0.6rem',
  fontWeight: 800,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
};

/* One recipe, three tints. Every tile gets the same construction and only the
   body colour changes: a gradient body, a blurred and saturated backdrop, a
   gradient rim brightest at the top left, an inner shadow along the bottom for
   thickness, and a specular sweep where the light lands. */
export function glass({ hi, mid, lo, rim, inner, drop }) {
  return {
    position: 'relative',
    background: `linear-gradient(150deg, ${hi} 0%, ${mid} 52%, ${lo} 100%)`,
    backdropFilter: 'blur(20px) saturate(200%)',
    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
    boxShadow: [
      `inset 0 1px 0 ${rim}`,
      `inset 0 0 0 0.5px ${rim}`,
      `inset 0 -16px 28px -20px ${inner}`,
      '0 1px 2px rgba(20,22,27,0.05)',
      `0 20px 40px -18px ${drop}`,
    ].join(','),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      padding: '1px',
      background: `linear-gradient(145deg, ${rim} 0%, rgba(255,255,255,0.08) 44%, rgba(255,255,255,0.06) 62%, ${rim} 100%)`,
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      background: 'radial-gradient(130% 95% at 6% -14%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 56%)',
      pointerEvents: 'none',
    },
  };
}

export const CLEAR = glass({
  hi: 'rgba(255,255,255,0.92)',
  mid: 'rgba(255,255,255,0.72)',
  lo: 'rgba(255,255,255,0.86)',
  rim: 'rgba(255,255,255,0.95)',
  inner: 'rgba(15,23,42,0.30)',
  drop: 'rgba(15,23,42,0.26)',
});

export const AMBER = glass({
  hi: 'rgba(255,151,78,0.98)',
  mid: 'rgba(255,102,0,0.96)',
  lo: 'rgba(217,80,0,0.98)',
  rim: 'rgba(255,255,255,0.80)',
  inner: 'rgba(150,52,0,0.55)',
  drop: 'rgba(214,86,0,0.42)',
});

export const SMOKE = glass({
  hi: 'rgba(48,53,65,0.98)',
  mid: 'rgba(17,19,24,0.97)',
  lo: 'rgba(7,9,13,0.99)',
  rim: 'rgba(255,255,255,0.42)',
  inner: 'rgba(0,0,0,0.6)',
  drop: 'rgba(14,16,22,0.5)',
});

/* A small tile needs a tighter, brighter rim than a large one or the bevel
   disappears at that size. Everything under about 48px uses this instead. */
export const CHIP_BEVEL = [
  'inset 0 1px 0 rgba(255,255,255,1)',
  'inset 0 0 0 0.5px rgba(255,255,255,0.6)',
  'inset 0 -6px 12px -8px rgba(15,23,42,0.32)',
  '0 2px 4px rgba(20,22,27,0.06)',
  '0 10px 20px -10px rgba(15,23,42,0.3)',
].join(',');

/* The panel the tiles sit on. One warm pool only, so the clear tiles have
   something to pick up. The fill underneath is the site's own panel colour; a
   bespoke gradient here read as a different section. Padding is left to the
   caller, since the two sections carry different amounts. */
export const CANVAS = {
  position: 'relative',
  borderRadius: '24px',
  border: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-section-alt)',
  backgroundImage:
    'radial-gradient(62% 82% at 16% 10%, rgba(255,150,80,0.16) 0%, transparent 62%)',
  overflow: 'hidden',
};
