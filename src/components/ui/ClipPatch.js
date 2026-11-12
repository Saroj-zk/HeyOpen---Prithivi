import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * Cover a label inside a recorded clip.
 *
 * Two of the clips on this site were recorded from the application before
 * it was renamed, so they still show the old name and the old disclaimer.
 * The recordings cannot be edited here, but each label sits on a flat
 * colour that holds still, so a block of that same colour over it reads as
 * part of the frame. Where the label has to say something instead of
 * nothing, the replacement is set on top of the block.
 *
 * Every coordinate below was measured off the clip's own frame rather than
 * estimated, and the measurements are recorded with each entry so the next
 * person can check them rather than trust them.
 *
 * This is a patch over a recording, not a fix. The clips should be re-cut.
 */

export const CLIP_PATCHES = {
  /* Measured on the 1024x768 frame:
   *   card interior      x 510..659 pure white
   *   gap above the name y 298..301 pure white
   *   "OpenLedger"       y 302..314, ink #000000
   *   "One API ..."      y 315..322, ink #afafad
   *   gap below          y 323+
   *
   * The subtitle is covered along with the name even though it names
   * nobody: there is no white gap between them, because the descenders of
   * "p" and "g" run into the subtitle's first row. Covering only the name
   * would leave a boundary one pixel wide to land correctly at every size.
   *
   * Timing is tight on purpose. The card and the name arrive together --
   * no ink at 1.2s, a trace at 1.3s, solid by 1.4s -- so a patch that
   * waits until 1.45s flashes the name once per loop. This one is opaque
   * by 1.33s, and its own fade happens against a background it cannot be
   * seen against: the page is 250,248,246 and the patch is white.
   */
  '/Videos/Why HeyOpen/Built For Agents.webm': {
    frame: { w: 1024, h: 768 },
    rect: { x: 513, y: 298, w: 144, h: 26 },
    fill: '#FFFFFF',
    from: 1.24,
    fade: 0.09,
    lines: [
      { text: 'HeyOpen', size: 15.5, weight: 700, color: '#000000', top: 1 },
      { text: 'One API · 100+ models', size: 9.5, weight: 500, color: '#AFAFAD', top: 16 },
    ],
  },

  /* Measured on the 2274x1400 frame:
   *   disclaimer  y 1330..1349, x 786..1473
   *   background  244,242,238 across the whole rect below, at every
   *               timestamp sampled, text present or not
   *
   * Because that background never varies, this patch needs no timing and
   * nothing drawn on it: a block of the same colour is invisible whether
   * the line is on screen or not. The line is removed rather than
   * replaced, which is what it is for.
   */
  '/Videos/AI ecosystem/Chat.mp4': {
    frame: { w: 2274, h: 1400 },
    rect: { x: 740, y: 1322, w: 780, h: 34 },
    fill: '#F4F2EE',
    from: 0,
    fade: 0,
    lines: [],
  },
};

/**
 * Wraps a <video> and places the patch over it.
 *
 * `objectFit: cover` scales the clip to fill its box and crops the
 * overflow, so a percentage of the box is not a percentage of the frame.
 * This repeats that arithmetic to find where the frame actually landed,
 * and follows the box as it resizes.
 *
 * Opacity is driven off currentTime on a frame loop rather than on
 * timeupdate, which fires about four times a second -- too coarse to land
 * on a fade without a visible step.
 *
 * Anything that needs to apply to the clip AND the patch together, such as
 * the ecosystem section's 0.8 opacity, belongs in `sx` here rather than on
 * the video: a patch outside that opacity would be mixed with the page
 * behind it in a different proportion and stop matching.
 */
export default function ClipPatch({ src, videoRef, sx, children }) {
  const boxRef = React.useRef(null);
  const patchRef = React.useRef(null);
  const patch = CLIP_PATCHES[src];

  React.useEffect(() => {
    if (!patch) return undefined;
    const v = videoRef.current;
    const box = boxRef.current;
    const el = patchRef.current;
    if (!v || !box || !el) return undefined;

    let frame = 0;

    const place = () => {
      const bw = box.clientWidth;
      const bh = box.clientHeight;
      if (!bw || !bh) return;
      const k = Math.max(bw / patch.frame.w, bh / patch.frame.h);
      const ox = (bw - patch.frame.w * k) / 2;
      const oy = (bh - patch.frame.h * k) / 2;
      el.style.left = `${ox + patch.rect.x * k}px`;
      el.style.top = `${oy + patch.rect.y * k}px`;
      el.style.width = `${patch.rect.w * k}px`;
      el.style.height = `${patch.rect.h * k}px`;
      for (const child of el.children) {
        const line = patch.lines[Number(child.dataset.line)];
        child.style.fontSize = `${line.size * k}px`;
        child.style.top = `${line.top * k}px`;
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(box);

    /* A patch with no fade is simply always on, which is right when the
       colour it covers never changes. */
    if (!patch.fade) {
      el.style.opacity = '1';
    } else {
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const t = v.currentTime;
        const a = t <= patch.from ? 0 : Math.min(1, (t - patch.from) / patch.fade);
        el.style.opacity = String(a);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [patch, videoRef]);

  if (!patch) return children;

  return (
    <Box ref={boxRef} sx={{ position: 'relative', width: '100%', height: '100%', ...sx }}>
      {children}
      <Box
        ref={patchRef}
        aria-hidden="true"
        sx={{
          position: 'absolute',
          opacity: 0,
          backgroundColor: patch.fill,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {patch.lines.map((line, i) => (
          <Box
            key={line.text}
            data-line={i}
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              fontFamily: '"Inter", -apple-system, sans-serif',
              fontWeight: line.weight,
              color: line.color,
              letterSpacing: '-0.01em',
            }}
          >
            {line.text}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
