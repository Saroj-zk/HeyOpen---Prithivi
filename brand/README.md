# Brand assets

`HeyOpen logo (master).png` is the supplied artwork: 10957x3727, 8-bit
RGBA on transparency, 3.2MB. It is the master and is **not** served — it
sits here rather than in `public/` so a browser cannot request it.

Everything the site uses is derived from it:

| file | what it is | where |
| --- | --- | --- |
| `public/brand/heyopen-wordmark.png` | the HeyOpen wordmark, 720px wide | nav bars at 22px, footer at 30px, hero at 26/33/40px |
| `public/brand/heyopen-mark-32.png` | the omega alone, square | the tab icon |
| `public/brand/heyopen-mark-48.png` | the same, 48px | the payload inside `public/favicon.ico` |
| `public/brand/heyopen-mark-180.png` | the same, 180px | `apple-touch-icon` |
| `public/brand/heyopen-mark.png` | the same, 256px | the large `rel="icon"` |

Four things are worth knowing before regenerating any of it.

**The master carries a "by OpenLedger" line under the wordmark. It is not
used.** The wordmark is cropped above it, at y=2415 in the master, which
is below the descenders of the "y" and the "p" and above where that line
starts. If the artwork is reissued without that line, crop nothing.

**The wordmark is the logo. The mark is only for square slots.** Anywhere
a reader sees the brand, it is the whole wordmark. The icon slots are
square and as small as 16px, where a 4.5:1 wordmark is unreadable, so
they get the omega on its own.

**The mark is cut, not supplied.** A box crop is not enough: the glyph's
bounding box overlaps the tail of the "y" and the stem of the "p", so it
is flood-filled from a seed inside its own stroke and everything not
connected is dropped. That also drops the two eyes, which float inside
the counter unjoined to the stroke, so they are adopted back by the rule
"anything that sits wholly inside the glyph's box is part of it".

Each icon size is resampled from the full-resolution glyph rather than
from a smaller copy, because leaving the browser to take 256px down to 16
gives a soft icon in the tab, which is the one place it is really seen.
`favicon.ico` is a single directory entry wrapped around the 48px PNG —
ICO has carried PNG payloads since Vista — and exists so the browser's
unprompted request for `/favicon.ico` does not 404.

**One wordmark file, because the site has one palette.** `ThemeContext`
answers `isDark: false` and nothing can change it, so a dark variant
would never load. If a dark theme ever returns, note that
`brightness(0) invert(1)` is not an option: the wordmark is black *and*
orange, and an invert would take the orange with it. A second file with
the black ink taken to white is the way.

The OpenLedger logo files that used to be in `public/` — `Open Ledegr
Full Black.svg`, `Open Ledegr icon White.svg`, `openchat_full_logo.svg`,
`openchat_icon_mark.svg` and `Icons/Frosted logo OPL.png` — are gone, and
`favicon.ico` is now the HeyOpen mark rather than the OpenLedger octopus.

The scripts that produced these are not in the repo: they decode and
re-encode PNG by hand because this machine has no image tooling, which is
not worth keeping. Regenerating by any other means is fine as long as the
files come out at the same sizes.
