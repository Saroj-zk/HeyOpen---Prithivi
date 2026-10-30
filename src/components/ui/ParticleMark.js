import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * A stippled three-dimensional object, one per revenue card.
 *
 * ------------------------------------------------------------------
 * THESE ARE OBJECTS, NOT PATTERNS, and that is the whole of the change
 * from the first version.
 *
 * That one swept tubes around space curves: a torus, a coil, two linked
 * rings, a folded ribbon. They were handsome and they meant nothing. A
 * reader cannot look at a torus and arrive at "subscriptions", so the
 * shapes were decoration with a rationale attached in a comment where
 * nobody would read it.
 *
 * What is here instead is four things a reader can name:
 *
 *   coins   a stack of discs            money that arrives again
 *   routes  a vortex drawn into a point  many calls through one layer
 *   vault   a sealed box                 private, enclosed, contained
 *   surface a saddle                     the shape of an options book
 *
 * The last is the only one that asks anything of the reader, and it is the
 * canonical picture of an option surface, so it is the right demand to
 * make on a page about compute options.
 *
 * ------------------------------------------------------------------
 * Surfaces, sampled and shaded by depth.
 *
 * Every shape is a set of patches, each a function from the unit square to
 * a point in space. The patch is sampled on a grid, the whole set is turned
 * to face the viewer and projected flat, and each point becomes a dot whose
 * size and opacity come from how far away it is. Nothing is lit: the back
 * of a form is simply made of smaller, fainter dots than the front, which
 * is enough to read as a solid turning in space.
 *
 * ------------------------------------------------------------------
 * NOTHING HERE IS RANDOM, and that is load-bearing rather than tasteful.
 *
 * Every point is a pure function of its index, so the markup produced on
 * the server is identical to the markup the browser produces on hydration.
 * A Math.random() stipple would differ between the two and React would
 * throw a hydration mismatch on every card. This page has already had one
 * of those from another component and they are miserable to trace back.
 *
 * It is computed once at module load rather than per render, so four cards
 * cost one pass and not one per mount.
 *
 * ------------------------------------------------------------------
 * ONE PATH PER DEPTH BAND, not one circle per dot.
 *
 * A thousand <circle> elements a card is four thousand nodes on the page.
 * Instead the dots in a band are collected into a single path of
 * zero-length segments — "M x y h0" — drawn with a round linecap, so each
 * segment renders as a dot of the path's own stroke width. Eight bands
 * means eight nodes a card, and about twelve characters a dot.
 *
 * ------------------------------------------------------------------
 * The palette is the site's. The reference these came from is cream on
 * teal; this page is ink and brand orange, and a third hue introduced for
 * a decoration would read as a different site.
 * ------------------------------------------------------------------
 */

const TAU = Math.PI * 2;

/* A patch is {f, na, nb}: a map from the unit square into space, and how
   finely to walk it. Density is set per patch rather than per shape so a
   coin's rim does not get the same number of dots as its face. */

/* ---- 1. coins: a stack of discs ------------------------------------
   Recurring revenue, drawn as the thing it is. Five discs, each a face
   and a rim, spaced so the stack reads as separate payments rather than
   as one cylinder. sqrt on the radius spreads the dots evenly over the
   area; without it they crowd the middle and the face looks like a
   target. */
const COIN_N = 5;
/* Taller than it is wide. At radius 0.92 and a 0.34 gap the stack was
   1.8 across and 1.4 high, so it read as one broad disc however it was
   turned. */
const COIN_R = 0.74;
const COIN_H = 0.11;
const COIN_GAP = 0.42;

const coins = [];
for (let k = 0; k < COIN_N; k += 1) {
  const y = (k - (COIN_N - 1) / 2) * COIN_GAP;
  coins.push({
    f: (a, b) => {
      const r = COIN_R * Math.sqrt(b);
      return [r * Math.cos(a * TAU), y + COIN_H / 2, r * Math.sin(a * TAU)];
    },
    na: 30,
    nb: 9,
  });
  coins.push({
    f: (a, b) => [
      COIN_R * Math.cos(a * TAU),
      y + COIN_H * (b - 0.5),
      COIN_R * Math.sin(a * TAU),
    ],
    na: 34,
    nb: 4,
  });
}

/* ---- 2. routes: a vortex pulled down to a point ---------------------
   Many calls arriving at one layer. The radius closes as it descends and
   the angle twists with it, so the strands sweep rather than drop
   straight, which is what keeps it from reading as a traffic cone. */
const routes = [
  {
    f: (a, b) => {
      const r = 1 - 0.93 * b * b;
      const t = a * TAU + b * 2.6;
      return [r * Math.cos(t), 0.95 - 1.9 * b, r * Math.sin(t)];
    },
    na: 56,
    nb: 26,
  },
];

/* ---- 3. vault: a sealed box ----------------------------------------
   Private deployment: enclosed, and visibly closed on every side. All six
   faces are drawn. The far three come through as a faint wash because
   depth makes them small and dim, which is what gives the box its volume
   instead of leaving a flat square. */
const FACE = [
  (a, b) => [a, b, 1],
  (a, b) => [a, b, -1],
  (a, b) => [1, a, b],
  (a, b) => [-1, a, b],
  (a, b) => [a, 1, b],
  (a, b) => [a, -1, b],
];
const vault = FACE.map((face) => ({
  f: (a, b) => face(a * 2 - 1, b * 2 - 1),
  na: 17,
  nb: 17,
}));

/* ---- 4. surface: a saddle ------------------------------------------
   What an option book looks like when it is drawn: value rising along one
   axis and falling along the other, through a seat in the middle. It is
   the one shape here that asks the reader to know something, and on a card
   about compute options that is a fair thing to ask. */
const surface = [
  {
    f: (a, b) => {
      const x = a * 2 - 1;
      const z = b * 2 - 1;
      return [x, (x * x - z * z) * 0.62, z];
    },
    na: 46,
    nb: 40,
  },
];

/* How each one is turned to the viewer, and how many depth bands it is
   cut into. The angles are per shape: a cube square to the camera is a
   square, and a stack of coins seen edge-on is a row of lines. */
const SHAPES = {
  /* A three-quarter view, not a plan view. Near -0.9 the camera is almost
     overhead: the top face fills the frame, the discs below it collapse
     into their own edges, and five coins read as one. */
  coins: { patches: coins, ax: -0.42, ay: 0.34, bands: 9 },
  routes: { patches: routes, ax: -0.6, ay: 0.3, bands: 8 },
  vault: { patches: vault, ax: -0.52, ay: 0.62, bands: 8 },
  surface: { patches: surface, ax: -0.74, ay: 0.46, bands: 8 },
};

/* Rotate about X, then about Y. Orthographic after that, so z stays free
   to be spent on depth instead of on perspective. */
function turn([x, y, z], ax, ay) {
  const ca = Math.cos(ax);
  const sa = Math.sin(ax);
  const y1 = y * ca - z * sa;
  const z1 = y * sa + z * ca;
  const cb = Math.cos(ay);
  const sb = Math.sin(ay);
  return [x * cb + z1 * sb, y1, -x * sb + z1 * cb];
}

const BOX = 100;
const PAD = 6;

/**
 * Build one mark: an array of depth bands, each a path string.
 *
 * The field is fitted to the viewBox from its own projected bounds, so a
 * shape need not be authored at any particular scale. Points are sorted
 * back to front and cut into bands of equal population rather than equal
 * depth, which keeps every band carrying a useful number of dots whatever
 * the shape's distribution happens to be.
 */
function build(name) {
  const { patches, ax, ay, bands } = SHAPES[name];
  const pts = [];

  patches.forEach(({ f, na, nb }) => {
    for (let i = 0; i < na; i += 1) {
      for (let j = 0; j < nb; j += 1) {
        /* The half-step on alternate columns breaks the grid up so the
           field reads as scattered rather than woven. */
        const a = i / na;
        const b = (j + (i % 2) * 0.5) / nb;
        pts.push(turn(f(a, b), ax, ay));
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
  const ox = PAD + (BOX - PAD * 2 - (maxX - minX) * k) / 2;
  const oy = PAD + (BOX - PAD * 2 - (maxY - minY) * k) / 2;
  const zSpan = maxZ - minZ || 1;

  const flat = pts
    .map(([x, y, z]) => ({
      x: ox + (x - minX) * k,
      /* SVG y grows downward; the shapes are authored y-up. */
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
      w: (0.5 + t * 1.3).toFixed(2),
      o: (0.1 + t * 0.8).toFixed(2),
    });
  }
  return out;
}

const MARKS = Object.keys(SHAPES).reduce((acc, name) => {
  acc[name] = build(name);
  return acc;
}, {});

export const MARK_NAMES = Object.keys(SHAPES);

/**
 * The mark itself.
 *
 * It is decoration, so it is hidden from assistive technology: the card's
 * meaning is in the words underneath it, and "a stippled saddle" read
 * aloud helps nobody.
 */
export default function ParticleMark({ shape, sx }) {
  const bands = MARKS[shape] || MARKS.coins;
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
