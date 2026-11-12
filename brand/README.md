# Brand assets

`HeyOpen logo (master).png` is the supplied artwork: 10957x3727, 8-bit
RGBA on transparency, 3.2MB. It is the master and is **not** served — it
sits here rather than in `public/` so a browser cannot request it.

The site uses one file derived from it:

| file | what it is | where |
| --- | --- | --- |
| `public/brand/heyopen-wordmark.png` | the HeyOpen wordmark, 720px wide | nav bars at 22px, footer at 30px, hero at 44–58px, tab icon |

Three things are worth knowing before regenerating it.

**The master carries a "by OpenLedger" line under the wordmark. It is not
used.** The asset is cropped above it, at y=2415 in the master, which is
below the descenders of the "y" and the "p" and above where that line
starts. If the artwork is reissued without that line, crop nothing.

**One file, because the site has one palette.** `ThemeContext` answers
`isDark: false` and nothing can change it, so a dark variant would never
load. The slots that used to invert the old flat-colour wordmark in CSS
now just point at this file. If a dark theme ever comes back, note that
`brightness(0) invert(1)` is not an option here: the wordmark is black
*and* orange, and an invert would take the orange with it. A second file
with the black ink taken to white is the way.

**There is no square icon.** The artwork has no separate mark, and the
wordmark is about 4.5:1, so the browser letterboxes it in the square slot
a favicon gives. The omega reads as an octopus head on its own and would
make a good square mark, but cutting the logo down to one glyph was
rejected, so the whole wordmark is used everywhere. If a square mark is
wanted it should be drawn, not cropped.

The OpenLedger logo files that used to be in `public/` — `Open Ledegr
Full Black.svg`, `Open Ledegr icon White.svg`, `openchat_full_logo.svg`,
`openchat_icon_mark.svg`, `Icons/Frosted logo OPL.png` and `favicon.ico`
— are gone. Nothing referenced them once this landed.

The script that produced the asset is not in the repo: it decodes and
re-encodes PNG by hand because this machine has no image tooling, which
is not worth keeping. Regenerating by any other means is fine as long as
the file comes out at the same size.
