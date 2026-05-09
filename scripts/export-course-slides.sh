#!/usr/bin/env bash
# Export PPTX slide deck to numbered PNGs (slide-01.png … slide-NN.png).
# Usage:
#   bash scripts/export-course-slides.sh <source.pptx> <output-slides-dir>
#
# Requires LibreOffice (soffice) for PPTX→PDF and pdftoppm (Poppler) for PDF→PNG.
# ImageMagick is optional as an alternate PDF→PNG path when pdftoppm is unavailable.
set -euo pipefail

usage() {
  echo "Usage: bash scripts/export-course-slides.sh <source.pptx> <output-slides-directory>" >&2
  echo "" >&2
  echo "Dependencies:" >&2
  echo "  - LibreOffice (soffice) — converts PPTX to PDF. macOS: brew install --cask libreoffice" >&2
  echo "  - pdftoppm (Poppler) — converts PDF pages to PNG. macOS: brew install poppler" >&2
  echo "  - Optional: ImageMagick (magick) — alternate renderer. macOS: brew install imagemagick" >&2
  exit 2
}

if [[ "${1:-}" == "" || "${2:-}" == "" ]]; then
  usage
fi

SOURCE_PPTX="$1"
OUT_SLIDES_DIR="$2"

if [[ ! -f "$SOURCE_PPTX" ]]; then
  echo "error: source file not found: $SOURCE_PPTX" >&2
  exit 1
fi

find_soffice() {
  if command -v soffice >/dev/null 2>&1; then
    command -v soffice
    return 0
  fi
  for candidate in \
    "/Applications/LibreOffice.app/Contents/MacOS/soffice" \
    "/usr/local/bin/soffice" \
    "/opt/homebrew/bin/soffice"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

find_pdftoppm() {
  if command -v pdftoppm >/dev/null 2>&1; then
    command -v pdftoppm
    return 0
  fi
  for candidate in "/opt/homebrew/bin/pdftoppm" "/usr/local/bin/pdftoppm"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

find_magick() {
  if command -v magick >/dev/null 2>&1; then
    command -v magick
    return 0
  fi
  if command -v convert >/dev/null 2>&1; then
    command -v convert
    return 0
  fi
  return 1
}

SOFFICE="$(find_soffice)" || SOFFICE=""
PDFTOPPM="$(find_pdftoppm)" || PDFTOPPM=""
MAGICK="$(find_magick)" || MAGICK=""

if [[ -z "$SOFFICE" ]]; then
  echo "error: LibreOffice (soffice) not found. Install it and retry." >&2
  echo "  macOS: brew install --cask libreoffice" >&2
  echo "  Debian/Ubuntu: sudo apt-get install -y libreoffice" >&2
  exit 1
fi

if [[ -z "$PDFTOPPM" && -z "$MAGICK" ]]; then
  echo "error: need pdftoppm (Poppler) or ImageMagick to rasterize the PDF." >&2
  echo "  macOS: brew install poppler   # recommended" >&2
  echo "  macOS: brew install imagemagick" >&2
  echo "  Debian/Ubuntu: sudo apt-get install -y poppler-utils" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/jf-course-slides.XXXXXX")"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

mkdir -p "$OUT_SLIDES_DIR"

BASE_NAME="$(basename "$SOURCE_PPTX" .pptx)"
PDF_OUT="$TMP_DIR/${BASE_NAME}.pdf"

echo "→ Converting PPTX to PDF with: $SOFFICE"
"$SOFFICE" --headless --nologo --nofirststartwizard --convert-to pdf --outdir "$TMP_DIR" "$SOURCE_PPTX"

if [[ ! -f "$PDF_OUT" ]]; then
  # LibreOffice may name the pdf after the basename of the pptx
  found_pdf="$(find "$TMP_DIR" -maxdepth 1 -name '*.pdf' -print -quit)"
  if [[ -n "$found_pdf" ]]; then
    PDF_OUT="$found_pdf"
  else
    echo "error: PDF was not produced after LibreOffice conversion." >&2
    exit 1
  fi
fi

echo "→ Rasterizing PDF pages to PNG"

if [[ -n "$PDFTOPPM" ]]; then
  PREFIX="$TMP_DIR/slide"
  "$PDFTOPPM" -png -r 150 "$PDF_OUT" "$PREFIX"
  i=1
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    printf -v dest_name "slide-%02d.png" "$i"
    mv "$f" "$OUT_SLIDES_DIR/$dest_name"
    i=$((i + 1))
  done < <(find "$TMP_DIR" -maxdepth 1 -name 'slide-*.png' -print | LC_ALL=C sort -V)
  if [[ "$i" -eq 1 ]]; then
    echo "error: pdftoppm produced no slide-*.png files in $TMP_DIR" >&2
    exit 1
  fi
else
  page_count="$("$MAGICK" identify -format '%n\n' "$PDF_OUT[0]" 2>/dev/null | head -1 || true)"
  if [[ -z "${page_count:-}" || "$page_count" -lt 1 ]]; then
    page_count=200
  fi
  i=1
  while true; do
    printf -v dest_name "slide-%02d.png" "$i"
    if ! "$MAGICK" -density 150 "$PDF_OUT[$((i - 1))]" -quality 92 "$TMP_DIR/$dest_name" 2>/dev/null; then
      if [[ "$i" -eq 1 ]]; then
        echo "error: ImageMagick failed to read the PDF." >&2
        exit 1
      fi
      rm -f "$TMP_DIR/$dest_name" 2>/dev/null || true
      break
    fi
    if [[ ! -s "$TMP_DIR/$dest_name" ]]; then
      rm -f "$TMP_DIR/$dest_name" 2>/dev/null || true
      break
    fi
    mv "$TMP_DIR/$dest_name" "$OUT_SLIDES_DIR/$dest_name"
    i=$((i + 1))
    if [[ "$i" -gt 400 ]]; then
      echo "error: unexpectedly many pages (>400); aborting." >&2
      exit 1
    fi
  done
fi

count="$(find "$OUT_SLIDES_DIR" -maxdepth 1 -name 'slide-*.png' | wc -l | tr -d ' ')"
echo "→ Wrote $count PNG slide(s) to $OUT_SLIDES_DIR"

if [[ "$count" -eq 0 ]]; then
  echo "error: no slide-*.png files in output directory." >&2
  exit 1
fi

echo "done."
