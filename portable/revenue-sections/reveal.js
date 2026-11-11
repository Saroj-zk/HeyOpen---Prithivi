import * as React from 'react';

/**
 * One-shot scroll reveal.
 *
 * Returns a ref to put on an element that is already in the tree and a flag for
 * whether it has been reached. Nothing is wrapped, so the markup and layout stay
 * exactly as they were; the caller spreads `revealSx` into the element's own sx.
 *
 * Reveals do not replay when you scroll back up. On a page this long that reads
 * as the content flickering rather than as an effect.
 */
export function useReveal(options) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.08 } = options || {};
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    /* Anyone who has asked for less motion gets the content, not the entrance.
       Same if the browser has no observer to give us. */
    const still =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof IntersectionObserver === 'undefined' || still) {
      setShown(true);
      return undefined;
    }

    let io = null;
    let backstop = null;
    let armed = null;

    const reveal = () => {
      setShown(true);
      if (io) io.disconnect();
      if (backstop) clearInterval(backstop);
      if (armed) clearTimeout(armed);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) reveal();
      },
      { rootMargin, threshold }
    );
    io.observe(el);

    /* The observer is the fast path and in a normal browser it always wins this
       race. It is not guaranteed to, though: embedded and preview contexts have
       been seen to deliver one callback and then go quiet, which would leave the
       section at zero opacity for good. A slow geometry check runs underneath as
       insurance and stops as soon as either path fires. Deliberately not tied to
       scroll events, so it costs the scroll nothing. */
    const check = () => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight || document.documentElement.clientHeight || 0;
      if (h && r.top < h * 0.92 && r.bottom > 0) reveal();
    };

    armed = setTimeout(() => {
      check();
      backstop = setInterval(check, 400);
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(armed);
      if (backstop) clearInterval(backstop);
    };
  }, [rootMargin, threshold]);

  return [ref, shown];
}

/**
 * The entrance itself: a short rise and a fade.
 *
 * Only opacity and transform, so the whole thing runs on the compositor and
 * costs the scroll nothing. The easing matches the Reveal used on the subpages
 * so the two read as the same site.
 */
export function revealSx(shown, delay = 0, distance = 22) {
  return {
    opacity: shown ? 1 : 0,
    /* `none` at rest, not a zero translate: a transform of any kind makes the
       element a stacking context, which would trap the blend modes and fixed
       positioning of anything inside it. */
    transform: shown ? 'none' : `translate3d(0, ${distance}px, 0)`,
    transition:
      'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  };
}
