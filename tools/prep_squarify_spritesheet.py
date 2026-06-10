#!/usr/bin/env python3
"""Squarify AI-generated green-screen sheets so the main pipeline accepts them.

AI-generated sprite sheets often have non-square cells (e.g. 7x6 grids in a
3:2 image). This tool detects the real column count by minimizing sprite
pixels that sit on candidate cell boundaries, takes the first 6 columns, and
pads every cell with the key color so the output sheet has exactly square
cells in a 6x6 grid. The result can then be fed to
process_monster_spritesheet.py with auto grid detection.
"""

from __future__ import annotations

import argparse
import statistics
import sys
from pathlib import Path

from PIL import Image

ROWS = 6
TAKE_COLS = 6


def estimate_key_color(image: Image.Image) -> tuple[int, int, int]:
    rgb = image.convert("RGB")
    width, height = rgb.size
    stride = max(1, max(width, height) // 512)
    candidates = []
    pixels = rgb.load()
    for y in range(0, height, stride):
        for x in range(0, width, stride):
            red, green, blue = pixels[x, y]
            if green >= 80 and green - max(red, blue) >= 35:
                candidates.append((red, green, blue))
    if len(candidates) < 32:
        raise SystemExit("could not estimate the green-screen key color")
    return tuple(
        int(round(statistics.median(pixel[channel] for pixel in candidates)))
        for channel in range(3)
    )


def build_foreground_columns(image: Image.Image, key: tuple[int, int, int]) -> list[int]:
    """Count non-green pixels per x column."""
    rgb = image.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()
    counts = [0] * width
    kr, kg, kb = key
    for x in range(width):
        column_hits = 0
        for y in range(0, height, 2):
            r, g, b = pixels[x, y]
            if (r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2 > 60 ** 2:
                column_hits += 1
        counts[x] = column_hits
    return counts


def detect_columns(image: Image.Image, key: tuple[int, int, int]) -> int:
    """Pick the column count whose interior cell boundaries cross the fewest sprites."""
    counts = build_foreground_columns(image, key)
    width = image.width
    best_cols = TAKE_COLS
    best_score = float("inf")
    for cols in (6, 7, 8):
        score = 0
        for boundary in range(1, cols):
            x = round(width * boundary / cols)
            for dx in (-1, 0, 1):
                index = min(width - 1, max(0, x + dx))
                score += counts[index]
        score /= (cols - 1)
        if score < best_score:
            best_score = score
            best_cols = cols
    return best_cols


def squarify(input_path: Path, output_path: Path) -> None:
    image = Image.open(input_path).convert("RGB")
    key = estimate_key_color(image)
    cols = detect_columns(image, key)

    cell_w = image.width / cols
    cell_h = image.height / ROWS
    side = int(round(max(cell_w, cell_h)))
    sheet = Image.new("RGB", (side * TAKE_COLS, side * ROWS), key)

    for row in range(ROWS):
        for col in range(TAKE_COLS):
            left = round(col * cell_w)
            top = round(row * cell_h)
            right = round((col + 1) * cell_w)
            bottom = round((row + 1) * cell_h)
            cell = image.crop((left, top, right, bottom))
            paste_x = col * side + (side - cell.width) // 2
            paste_y = row * side + (side - cell.height) // 2
            sheet.paste(cell, (paste_x, paste_y))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, format="PNG", optimize=True)
    print(f"key color: {key}")
    print(f"detected columns: {cols} (took first {TAKE_COLS})")
    print(f"output: {output_path} ({sheet.width}x{sheet.height})")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    squarify(args.input, args.output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
