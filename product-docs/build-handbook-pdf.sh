#!/usr/bin/env bash
# Rebuild the handbook PDF from the GitBook source, end to end.
#
#   bash product-docs/build-handbook-pdf.sh [path-to-review-copy.md]
#
# Chrome is used rather than a PDF library so the output matches what the
# stylesheet in build-handbook.js actually renders: real page breaks, real
# table layout, real web fonts.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVIEW="${1:-$HOME/Downloads/Hey_Open_GitBook_Complete_Documentation.md}"
PDF="$HERE/HeyOpen-Complete-Documentation.pdf"

CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
[ -x "$CHROME" ] || { echo "Chrome not found at: $CHROME (set CHROME=...)" >&2; exit 1; }

echo "1/4  building GitBook from review copy"
node "$HERE/build-gitbook-full.js" "$REVIEW"

echo "2/4  checking links"
node "$HERE/check-gitbook.js"

echo "3/4  assembling handbook.html"
node "$HERE/build-handbook.js"

echo "4/4  printing PDF"
rm -f "$PDF"
"$CHROME" \
  --headless --disable-gpu --no-sandbox \
  --allow-file-access-from-files \
  --virtual-time-budget=40000 \
  --run-all-compositor-stages-before-draw \
  --no-pdf-header-footer \
  --print-to-pdf="$(cygpath -w "$PDF" 2>/dev/null || echo "$PDF")" \
  "file:///$(cygpath -m "$HERE/handbook.html" 2>/dev/null || echo "$HERE/handbook.html")"

echo
echo "wrote $PDF"
