import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * A stippled parametric mark.
 *
 * ------------------------------------------------------------------
 * Each card gets a three-dimensional curve, swept into a tube, sampled on
 * a grid and drawn as a field of dots. Depth decides a dot's size and its
 * opacity, which is the whole of the shading: nothing is lit, the far side
 * of a form is simply made of smaller, fainter dots than the near side.
 * That is what gives a flat SVG the sense of a solid object turning in
 * space.
 *
 * ------------------------------------------------------------------
 * NOTHING HERE IS RANDOM, and that is load-bearing rather than tasteful.
 *
 * Every point is a pure function of its index, so the markup this produces
 * on the server is identical to the markup the browser produces on hydration.
 * A Math.random() stipple would differ between the two and React would throw
 * a hydration mismatch on every card. This page has already had one of those
 * from another component, and they are miserable to trace back.
 *
 * It is also computed once at module load rather than per render, so eight
 * cards cost one pass, not one per mount.
 *
 * ------------------------------------------------------------------
 * ONE PATH PER DEPTH BAND, not one circle per dot.
 *
 * A thousand <circle> elements per card is eight thousand nodes on the
 * page. Instead the dots in a band are collected into a single path of
 * zero-length segments — "M x y h0" — drawn with a round linecap, so each
 * segment renders as a dot of the path's own stroke width. Five bands per
 * shape means five nodes per card instead of a thousand, and the `d` string
 * is about twelve characters a dot.
 *
 * ------------------------------------------------------------------
 * The palette is the site's. The reference this came from is cream on
 * teal; this page is ink and brand orange, and a third hue introduced for
 * a decoration would read as a different site.
 * ------------------------------------------------------------------
 */

/* ---- just enough vector algebra to build a frame on a curve ---- */

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const unit = (a) => {
  const m = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / m, a[1] / m, a[2] / m];
};

const TAU = Math.PI * 2;

/**
 * Eight space curves, one per card, each chosen for what the card says.
 *
 * They are not decoration picked at random from a shape library. A reward
 * that repeats is a closed ring; revenue that folds back into supply is a
 * figure of eight; credit issued against a locked holding is two rings that
 * cannot be separated. If a card's copy changes enough that its shape stops
 * meaning anything, the shape should change with it.
 */
const CURVES = {
  /* A cycle that returns to where it started. */
  ring: [(u) => [Math.cos(u), Math.sin(u), 0]],

  /* Opening outward: a spiral unwinding from the middle. */
  open: [(u) => {
    const r = 0.25 + 0.75 * (u / TAU);
    const a = u * 2.4;
    return [r * Math.cos(a), r * Math.sin(a), (u / TAU - 0.5) * 0.5];
  }],

  /* Climbing. */
  rise: [(u) => [Math.cos(3 * u) * 0.78, u / Math.PI - 1, Math.sin(3 * u) * 0.78]],

  /* Out and back through itself: what leaves returns. */
  fold: [(u) => [Math.cos(u), Math.sin(2 * u) * 0.56, Math.sin(u) * 0.62]],

  /* Two rings that cannot be pulled apart. */
  link: [
    (u) => [Math.cos(u) * 0.82 - 0.34, Math.sin(u) * 0.82, 0],
    (u) => [Math.cos(u) * 0.82 + 0.34, 0, Math.sin(u) * 0.82],
  ],

  /* A trefoil: one strand, no loose end. */
  knot: [(u) => [
    (Math.sin(u) + 2 * Math.sin(2 * u)) / 3.2,
    (Math.cos(u) - 2 * Math.cos(2 * u)) / 3.2,
    -Math.sin(3 * u) / 2.4,
  ]],

  /* Tiers, nested. */
  nest: [
    (u) => [Math.cos(u) * 1.0, Math.sin(u) * 1.0, 0],
    (u) => [Math.cos(u) * 0.68, Math.sin(u) * 0.68 * 0.6, Math.sin(u) * 0.5],
    (u) => [Math.cos(u) * 0.36, Math.sin(u) * 0.36, Math.cos(u) * 0.4],
  ],

  /* Many strands arriving at one place.
     Three arcs sharing a phase was the first attempt and it drew a
     crescent: at this tube radius they overlapped into one mass and the
     convergence was invisible. These start spread and are pulled to a
     common point by a factor that falls to zero across the sweep. */
  fan: [-1, 0, 1].map((k) => (u) => {
    const t = u / TAU;
    const f = Math.cos(t * Math.PI * 0.5);
    return [t * 2 - 1, k * 0.85 * f, k * 0.5 * f];
  }),
};

/* How each one is turned to the viewer, and how thick its tube is. The
   angles are chosen per shape so none of them presents itself flat on. */
const VIEW = {
  ring: { ax: -1.02, ay: 0.26, r: 0.42, bands: 9 },
  open: { ax: -0.86, ay: 0.3, r: 0.17, bands: 7 },
  /* Tilted well off edge-on, and a fat tube. The three turns are 0.67
     apart in y, so at r 0.2 they float clear of each other and the thing
     reads as a stack of separate rings; at 0.3 they almost touch and it
     closes up into one coil. */
  rise: { ax: -0.46, ay: 0.5, r: 0.3, bands: 7 },
  fold: { ax: -0.62, ay: 0.44, r: 0.26, bands: 8 },
  link: { ax: -0.54, ay: 0.42, r: 0.2, bands: 7 },
  knot: { ax: -0.5, ay: 0.36, r: 0.2, bands: 7 },
  nest: { ax: -0.96, ay: 0.3, r: 0.15, bands: 6 },
  fan: { ax: -0.3, ay: 0.38, r: 0.14, bands: 6 },
};

/* Rotate about X, then about Y. Orthographic after that, so z is free to
   be used for depth instead of for perspective. */
function turn([x, y, z], ax, ay) {
  const ca = Math.cos(ax);
  const sa = Math.sin(ax);
  const y1 = y * ca - z * sa;
  const z1 = y * sa + z * ca;
  const cb = Math.cos(ay);
  const sb = Math.sin(ay);
  return [x * cb + z1 * sb, y1, -x * sb + z1 * cb];
}

/* A point on the tube around a curve. The frame is estimated from a finite
   difference rather than carried along the curve, which is enough for a
   decoration and avoids having to differentiate eight curves by hand. */
function onTube(curve, u, v, r) {
  const e = 0.0015;
  const p = curve(u);
  const t = unit(sub(curve(u + e), p));
  const up = Math.abs(t[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  const n = unit(cross(t, up));
  const b = cross(t, n);
  const cv = Math.cos(v);
  const sv = Math.sin(v);
  return [
    p[0] + r * (cv * n[0] + sv * b[0]),
    p[1] + r * (cv * n[1] + sv * b[1]),
    p[2] + r * (cv * n[2] + sv * b[2]),
  ];
}

const NU = 132;
const NV = 11;
const BOX = 100;
const PAD = 7;

/**
 * Build one mark: an array of depth bands, each a path string.
 *
 * The field is fitted to the viewBox from its own projected bounds, so a
 * shape does not have to be authored at any particular scale. Points are
 * sorted back to front and cut into bands of equal population rather than
 * equal depth, which keeps every band carrying a useful number of dots
 * whatever the shape's distribution happens to be.
 */
function build(name) {
  const { ax, ay, r, bands } = VIEW[name];
  const pts = [];

  CURVES[name].forEach((curve) => {
    for (let i = 0; i < NU; i += 1) {
      const u = (i / NU) * TAU;
      for (let j = 0; j < NV; j += 1) {
        /* The half-step on alternate rings breaks up the grid so the field
           reads as scattered rather than woven. */
        const v = ((j + (i % 2) * 0.5) / NV) * TAU;
        pts.push(turn(onTube(curve, u, v, r), ax, ay));
      }
    }
  });

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  pts.forEach(([x, y, z]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  });

  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const k = (BOX - PAD * 2) / span;
  const ox = PAD + ((BOX - PAD * 2) - (maxX - minX) * k) / 2;
  const oy = PAD + ((BOX - PAD * 2) - (maxY - minY) * k) / 2;
  const zSpan = maxZ - minZ || 1;

  const flat = pts
    .map(([x, y, z]) => ({
      x: ox + (x - minX) * k,
      /* SVG y grows downward; the curves are authored y-up. */
      y: BOX - (oy + (y - minY) * k),
      d: (z - minZ) / zSpan,
    }))
    .sort((a, b) => a.d - b.d);

  const per = Math.ceil(flat.length / bands);
  const out = [];
  for (let i = 0; i < bands; i += 1) {
    const slice = flat.slice(i * per, (i + 1) * per);
    if (!slice.length) continue;
    const t = bands === 1 ? 1 : i / (bands - 1);
    out.push({
      d: slice.map((p) => `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h0`).join(''),
      /* Back of the form: small and faint. Front: larger and brighter. */
      w: (0.5 + t * 1.25).toFixed(2),
      o: (0.12 + t * 0.78).toFixed(2),
    });
  }
  return out;
}

const MARKS = Object.keys(CURVES).reduce((acc, name) => {
  acc[name] = build(name);
  return acc;
}, {});

export const MARK_NAMES = Object.keys(CURVES);

/**
 * The mark itself.
 *
 * It is decoration, so it is hidden from assistive technology: the card's
 * meaning is entirely in the words underneath it, and "a stippled torus"
 * read aloud helps nobody.
 */
export default function ParticleMark({ shape, sx }) {
  const bands = MARKS[shape] || MARKS.ring;
  return (
    <Box
      component="svg"
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${BOX} ${BOX}`}
      preserveAspectRatio="xMidYMid meet"
      sx={{ display: 'block', width: '100%', height: '100%', ...sx }}
    >
      {bands.map((b) => (
        <path
          key={b.o + b.w}
          d={b.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={b.w}
          strokeLinecap="round"
          opacity={b.o}
        />
      ))}
    </Box>
  );
}
