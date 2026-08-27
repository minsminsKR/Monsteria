#!/usr/bin/env python3
"""Convert a green-screen monster spritesheet into a game-ready RGBA sheet."""

from __future__ import annotations

import argparse
import math
import statistics
import sys
from pathlib import Path
from typing import Iterable, Sequence

try:
    from PIL import (
        Image,
        ImageChops,
        ImageDraw,
        ImageFilter,
        UnidentifiedImageError,
        __version__ as PILLOW_VERSION,
    )
except ImportError as exc:  # pragma: no cover - only reached when Pillow is missing.
    raise SystemExit(
        "Pillow is required. Install it with: python -m pip install Pillow"
    ) from exc


OUTPUT_COLS = 6
OUTPUT_ROWS = 6
CELL_SIZE = 96
SHEET_SIZE = (OUTPUT_COLS * CELL_SIZE, OUTPUT_ROWS * CELL_SIZE)


class ProcessingError(RuntimeError):
    """A user-facing spritesheet processing error."""


def auto_or_positive_int(value: str) -> int | None:
    if value.lower() == "auto":
        return None
    try:
        number = int(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected 'auto' or a positive integer") from exc
    if number < 1:
        raise argparse.ArgumentTypeError("expected 'auto' or a positive integer")
    return number


def positive_int(value: str) -> int:
    try:
        number = int(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected a positive integer") from exc
    if number < 1:
        raise argparse.ArgumentTypeError("expected a positive integer")
    return number


def non_negative_int(value: str) -> int:
    try:
        number = int(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected a non-negative integer") from exc
    if number < 0:
        raise argparse.ArgumentTypeError("expected a non-negative integer")
    return number


def byte_value(value: str) -> int:
    try:
        number = int(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected an integer from 0 to 255") from exc
    if not 0 <= number <= 255:
        raise argparse.ArgumentTypeError("expected an integer from 0 to 255")
    return number


def unit_float(value: str) -> float:
    try:
        number = float(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected a number from 0.0 to 1.0") from exc
    if not 0.0 <= number <= 1.0:
        raise argparse.ArgumentTypeError("expected a number from 0.0 to 1.0")
    return number


def parse_color(value: str) -> tuple[int, int, int]:
    raw = value.strip()
    if raw.startswith("#") and len(raw) == 7:
        try:
            return tuple(int(raw[index : index + 2], 16) for index in (1, 3, 5))
        except ValueError as exc:
            raise argparse.ArgumentTypeError("expected #RRGGBB or R,G,B") from exc

    parts = raw.split(",")
    if len(parts) != 3:
        raise argparse.ArgumentTypeError("expected #RRGGBB or R,G,B")
    try:
        color = tuple(int(part.strip()) for part in parts)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("expected #RRGGBB or R,G,B") from exc
    if any(channel < 0 or channel > 255 for channel in color):
        raise argparse.ArgumentTypeError("RGB channels must be from 0 to 255")
    return color


def build_parser() -> argparse.ArgumentParser:
    examples = """examples:
  # Auto-detect a regular 6x6 source sheet.
  python tools/process_monster_spritesheet.py source.png game.png --preview

  # Take the first six columns from a 7x6 generated source sheet.
  python tools/process_monster_spritesheet.py source-7x6.png game.png \\
      --source-cols 7 --source-rows 6 --take-cols 6 --preview preview.png
"""
    parser = argparse.ArgumentParser(
        description=(
            "Remove a flat green background and convert the first six source "
            "columns into an exact 6x6, 576x576 RGBA PNG. Every source cell is "
            "keyed, trimmed, scaled, and composited independently."
        ),
        epilog=examples,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("input", type=Path, help="green-screen source image")
    parser.add_argument("output", type=Path, help="destination RGBA PNG")
    parser.add_argument(
        "--source-cols",
        type=auto_or_positive_int,
        default=None,
        metavar="AUTO|N",
        help=(
            "source column count; default: auto (detects 6x6 and 7x6 sheets "
            "from their aspect ratio)"
        ),
    )
    parser.add_argument(
        "--source-rows",
        type=auto_or_positive_int,
        default=OUTPUT_ROWS,
        metavar="AUTO|N",
        help="source row count; auto also resolves to the required 6 rows (default: 6)",
    )
    parser.add_argument(
        "--take-cols",
        type=positive_int,
        default=OUTPUT_COLS,
        metavar="N",
        help="number of leading source columns to use (must be 6; default: 6)",
    )
    parser.add_argument(
        "--key-color",
        type=parse_color,
        metavar="#RRGGBB|R,G,B",
        help="green-screen color; default: estimate it from green-dominant pixels",
    )
    parser.add_argument(
        "--key-threshold",
        type=byte_value,
        default=45,
        metavar="N",
        help="RGB distance from the key that becomes fully transparent (default: 45)",
    )
    parser.add_argument(
        "--edge-softness",
        type=byte_value,
        default=70,
        metavar="N",
        help="distance range used for a soft alpha edge (default: 70)",
    )
    parser.add_argument(
        "--despill",
        type=unit_float,
        default=0.85,
        metavar="0..1",
        help="strength of green spill removal (default: 0.85)",
    )
    parser.add_argument(
        "--padding",
        type=non_negative_int,
        default=10,
        metavar="PX",
        help="minimum transparent padding inside each 96x96 output cell (default: 10)",
    )
    parser.add_argument(
        "--trim-alpha",
        type=byte_value,
        default=8,
        metavar="N",
        help="minimum alpha used only to find each sprite's trim bounds (default: 8)",
    )
    parser.add_argument(
        "--capture-margin",
        type=unit_float,
        default=0.18,
        metavar="0..1",
        help=(
            "extra source-cell fraction searched for sprites crossing a source "
            "boundary (default: 0.18)"
        ),
    )
    parser.add_argument(
        "--min-component-area",
        type=positive_int,
        default=16,
        metavar="PX",
        help="discard smaller disconnected source specks (default: 16)",
    )
    parser.add_argument(
        "--preview",
        nargs="?",
        const="auto",
        metavar="PNG",
        help=(
            "also save an opaque checkerboard preview; without a path, uses "
            "<output-stem>-checker-preview.png"
        ),
    )
    parser.add_argument(
        "--checker-size",
        type=positive_int,
        default=24,
        metavar="PX",
        help="checkerboard square size in the optional preview (default: 24)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="overwrite output or preview files if they already exist",
    )
    parser.add_argument(
        "--no-trim",
        action="store_true",
        help=(
            "do not crop, align, or scale cells individually; key each full "
            "source cell and scale every cell with the same source-grid transform"
        ),
    )
    parser.add_argument(
        "--shared-scale",
        action=argparse.BooleanOptionalAction,
        default=True,
        help=(
            "use one shared scale for every pose so energetic frames never "
            "shrink relative to quiet frames (default: enabled)"
        ),
    )
    parser.add_argument(
        "--scale-rows",
        type=str,
        default="0-2",
        metavar="SPEC",
        help=(
            "rows used to compute the shared body scale; idle/walk/attack by "
            "default. Skill/FX rows are placed at that scale and clipped "
            "instead of shrinking the whole sheet (default: 0-2)"
        ),
    )
    return parser


def parse_row_spec(value: str) -> set[int]:
    rows: set[int] = set()
    for part in value.split(","):
        token = part.strip()
        if not token:
            continue
        if "-" in token:
            start_text, end_text = token.split("-", 1)
            start = int(start_text)
            end = int(end_text)
            if start > end:
                start, end = end, start
            rows.update(range(start, end + 1))
        else:
            rows.add(int(token))
    if not rows:
        raise argparse.ArgumentTypeError("expected at least one row in --scale-rows")
    if any(row < 0 or row >= OUTPUT_ROWS for row in rows):
        raise argparse.ArgumentTypeError(
            f"--scale-rows values must be between 0 and {OUTPUT_ROWS - 1}"
        )
    return rows


def resolve_grid(
    image_size: tuple[int, int],
    source_cols: int | None,
    source_rows: int | None,
    take_cols: int,
) -> tuple[int, int]:
    width, height = image_size
    rows = OUTPUT_ROWS if source_rows is None else source_rows

    if rows != OUTPUT_ROWS:
        raise ProcessingError(
            f"--source-rows must resolve to {OUTPUT_ROWS}; got {rows}. "
            "The output animation layout always has six rows."
        )
    if take_cols != OUTPUT_COLS:
        raise ProcessingError(
            f"--take-cols must be {OUTPUT_COLS}; got {take_cols}. "
            "The output layout is always 6x6."
        )

    if source_cols is None:
        estimated_cell_width = height / rows
        cols = round(width / estimated_cell_width)
        cols = max(take_cols, cols)
    else:
        cols = source_cols

    if cols < take_cols:
        raise ProcessingError(
            f"source has {cols} columns but --take-cols requests {take_cols}"
        )
    if width < cols or height < rows:
        raise ProcessingError(
            f"image size {width}x{height} is too small for a {cols}x{rows} source grid"
        )

    cell_width = width / cols
    cell_height = height / rows
    aspect = cell_width / cell_height
    if not 0.8 <= aspect <= 1.25:
        hint = (
            "Set --source-cols explicitly if auto-detection chose the wrong grid."
            if source_cols is None
            else "Check --source-cols and --source-rows."
        )
        raise ProcessingError(
            f"resolved source cells are not approximately square "
            f"({cell_width:.1f}x{cell_height:.1f}). {hint}"
        )

    return cols, rows


def estimate_key_color(image: Image.Image) -> tuple[int, int, int]:
    rgb = image.convert("RGB")
    width, height = rgb.size
    stride = max(1, max(width, height) // 512)
    candidates: list[tuple[int, int, int]] = []
    pixels = rgb.load()

    for y in range(0, height, stride):
        for x in range(0, width, stride):
            red, green, blue = pixels[x, y]
            if green >= 80 and green - max(red, blue) >= 35:
                candidates.append((red, green, blue))

    if len(candidates) < 32:
        raise ProcessingError(
            "could not estimate a green-screen color; pass --key-color R,G,B"
        )

    return tuple(
        int(round(statistics.median(pixel[channel] for pixel in candidates)))
        for channel in range(3)
    )


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def chroma_key(
    cell: Image.Image,
    key_color: tuple[int, int, int],
    threshold: int,
    softness: int,
    despill_strength: float,
) -> Image.Image:
    source = cell.convert("RGBA")
    keyed_pixels: list[tuple[int, int, int, int]] = []
    key_red, key_green, key_blue = key_color
    softness_denominator = max(1, softness)

    for red, green, blue, original_alpha in source.getdata():
        distance = math.sqrt(
            (red - key_red) ** 2
            + (green - key_green) ** 2
            + (blue - key_blue) ** 2
        )
        key_alpha = round(
            255 * smoothstep((distance - threshold) / softness_denominator)
        )
        alpha = round(original_alpha * key_alpha / 255)

        if alpha == 0:
            keyed_pixels.append((0, 0, 0, 0))
            continue

        spill = max(0, green - max(red, blue))
        green = round(green - spill * despill_strength)
        keyed_pixels.append((red, max(0, green), blue, alpha))

    keyed = Image.new("RGBA", source.size)
    keyed.putdata(keyed_pixels)
    return keyed


def alpha_bbox(image: Image.Image, threshold: int) -> tuple[int, int, int, int] | None:
    alpha = image.getchannel("A")
    mask = alpha.point(lambda value: 255 if value >= threshold else 0)
    return mask.getbbox()


def resize_premultiplied(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Resize RGBA without allowing hidden RGB values to create colored halos."""

    alpha = image.getchannel("A")
    premultiplied_pixels = [
        (
            round(red * opacity / 255),
            round(green * opacity / 255),
            round(blue * opacity / 255),
        )
        for red, green, blue, opacity in image.getdata()
    ]
    premultiplied = Image.new("RGB", image.size)
    premultiplied.putdata(premultiplied_pixels)

    resized_rgb = premultiplied.resize(size, Image.Resampling.LANCZOS)
    resized_alpha = alpha.resize(size, Image.Resampling.LANCZOS)
    straight_pixels: list[tuple[int, int, int, int]] = []

    for (red, green, blue), opacity in zip(
        resized_rgb.getdata(), resized_alpha.getdata()
    ):
        if opacity == 0:
            straight_pixels.append((0, 0, 0, 0))
            continue
        straight_pixels.append(
            (
                min(255, round(red * 255 / opacity)),
                min(255, round(green * 255 / opacity)),
                min(255, round(blue * 255 / opacity)),
                opacity,
            )
        )

    resized = Image.new("RGBA", size)
    resized.putdata(straight_pixels)
    return resized


def place_sprite(
    sprite: Image.Image,
    padding: int,
    *,
    bottom_align: bool = True,
    clip_overflow: bool = True,
) -> Image.Image:
    output = Image.new("RGBA", (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
    x = (CELL_SIZE - sprite.width) // 2
    if bottom_align:
        y = CELL_SIZE - padding - sprite.height
    else:
        y = (CELL_SIZE - sprite.height) // 2

    if not clip_overflow:
        output.alpha_composite(sprite, (max(0, x), max(0, y)))
        return output

    # Keep body scale; clip FX / outstretched limbs that exceed the safe cell.
    src_x0 = max(0, -x)
    src_y0 = max(0, -y)
    dst_x0 = max(0, x)
    dst_y0 = max(0, y)
    src_x1 = min(sprite.width, CELL_SIZE - x)
    src_y1 = min(sprite.height, CELL_SIZE - y)
    if src_x1 <= src_x0 or src_y1 <= src_y0:
        return output
    cropped = sprite.crop((src_x0, src_y0, src_x1, src_y1))
    output.alpha_composite(cropped, (dst_x0, dst_y0))
    return output


def normalize_cell(
    keyed_cell: Image.Image,
    base_scale: float,
    padding: int,
    trim_alpha: int,
    no_trim: bool = False,
    shared_scale: float | None = None,
) -> Image.Image:
    if no_trim:
        inner_size = CELL_SIZE - 2 * padding
        scale = shared_scale
        if scale is None:
            scale = min(inner_size / keyed_cell.width, inner_size / keyed_cell.height)
        resized_size = (
            max(1, round(keyed_cell.width * scale)),
            max(1, round(keyed_cell.height * scale)),
        )
        sprite = resize_premultiplied(keyed_cell, resized_size)
        return place_sprite(sprite, padding, bottom_align=False)

    bounds = alpha_bbox(keyed_cell, trim_alpha)
    if bounds is None:
        return Image.new("RGBA", (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))

    sprite = keyed_cell.crop(bounds)
    inner_size = CELL_SIZE - 2 * padding
    if shared_scale is None:
        scale = min(
            base_scale,
            inner_size / sprite.width,
            inner_size / sprite.height,
        )
    else:
        scale = shared_scale
    resized_size = (
        max(1, round(sprite.width * scale)),
        max(1, round(sprite.height * scale)),
    )
    sprite = resize_premultiplied(sprite, resized_size)
    return place_sprite(sprite, padding, bottom_align=True)


def compute_shared_scale(
    sprites: Sequence[Image.Image | None],
    base_scale: float,
    padding: int,
) -> float:
    """Shared scale from typical poses; ignore giant double-body outliers."""

    inner_size = CELL_SIZE - 2 * padding
    extents = [
        max(sprite.width, sprite.height)
        for sprite in sprites
        if sprite is not None and sprite.width > 0 and sprite.height > 0
    ]
    if not extents:
        return max(base_scale, 1e-6)

    extents.sort()
    median = extents[len(extents) // 2]
    limit = max(median * 1.55, median + 24)
    usable = [extent for extent in extents if extent <= limit] or extents

    scale = base_scale
    for sprite in sprites:
        if sprite is None:
            continue
        extent = max(sprite.width, sprite.height)
        if extent > limit and len(usable) < len(extents):
            continue
        scale = min(
            scale,
            inner_size / sprite.width,
            inner_size / sprite.height,
        )
    return max(scale, 1e-6)


def cell_bounds(
    image_size: tuple[int, int], cols: int, rows: int, col: int, row: int
) -> tuple[int, int, int, int]:
    width, height = image_size
    return (
        col * width // cols,
        row * height // rows,
        (col + 1) * width // cols,
        (row + 1) * height // rows,
    )


def extract_cell_subject(
    keyed_sheet: Image.Image,
    nominal_bounds: tuple[int, int, int, int],
    capture_margin: float,
    trim_alpha: int,
    min_component_area: int,
) -> Image.Image:
    """Select exactly one subject for a cell (nearest large body to cell center)."""

    x0, y0, x1, y1 = nominal_bounds
    margin_x = round((x1 - x0) * capture_margin)
    margin_y = round((y1 - y0) * capture_margin)
    region_bounds = (
        max(0, x0 - margin_x),
        max(0, y0 - margin_y),
        min(keyed_sheet.width, x1 + margin_x),
        min(keyed_sheet.height, y1 + margin_y),
    )
    region = keyed_sheet.crop(region_bounds)
    hard_alpha = region.getchannel("A").point(
        lambda value: 255 if value >= trim_alpha else 0
    )
    foreground = hard_alpha.tobytes()
    width, height = region.size
    visited = bytearray(len(foreground))
    candidates: list[tuple[float, int, list[int]]] = []
    nominal_center_x = (x0 + x1) / 2
    nominal_center_y = (y0 + y1) / 2
    region_x0, region_y0 = region_bounds[:2]
    cell_half_diag = ((x1 - x0) ** 2 + (y1 - y0) ** 2) ** 0.5 * 0.55

    for start, value in enumerate(foreground):
        if value == 0 or visited[start]:
            continue

        stack = [start]
        visited[start] = 1
        component: list[int] = []
        sum_x = 0
        sum_y = 0

        while stack:
            index = stack.pop()
            component.append(index)
            local_y, local_x = divmod(index, width)
            sum_x += local_x
            sum_y += local_y

            for neighbor_y in range(max(0, local_y - 1), min(height, local_y + 2)):
                row_offset = neighbor_y * width
                for neighbor_x in range(
                    max(0, local_x - 1), min(width, local_x + 2)
                ):
                    neighbor = row_offset + neighbor_x
                    if foreground[neighbor] and not visited[neighbor]:
                        visited[neighbor] = 1
                        stack.append(neighbor)

        area = len(component)
        if area < min_component_area:
            continue

        center_x = region_x0 + sum_x / area
        center_y = region_y0 + sum_y / area
        distance = (
            (center_x - nominal_center_x) ** 2 + (center_y - nominal_center_y) ** 2
        ) ** 0.5
        belongs_to_cell = x0 <= center_x < x1 and y0 <= center_y < y1
        # Prefer in-cell bodies; allow nearby bleed for oversized poses.
        if not belongs_to_cell and distance > cell_half_diag * 1.35:
            continue
        # Rank by body size first so sparks/FX never beat the character.
        # Distance is only a tie-breaker / soft penalty.
        in_cell_rank = 0 if belongs_to_cell else 1
        score = (-area, in_cell_rank, distance)
        candidates.append((score, component))

    selected = bytearray(len(foreground))
    if candidates:
        candidates.sort(key=lambda item: item[0])
        for index in candidates[0][1]:
            selected[index] = 255
    else:
        # Absolute fallback: largest component anywhere in the search region.
        largest: list[int] = []
        visited = bytearray(len(foreground))
        for start, value in enumerate(foreground):
            if value == 0 or visited[start]:
                continue
            stack = [start]
            visited[start] = 1
            component = []
            while stack:
                index = stack.pop()
                component.append(index)
                local_y, local_x = divmod(index, width)
                for neighbor_y in range(max(0, local_y - 1), min(height, local_y + 2)):
                    row_offset = neighbor_y * width
                    for neighbor_x in range(
                        max(0, local_x - 1), min(width, local_x + 2)
                    ):
                        neighbor = row_offset + neighbor_x
                        if foreground[neighbor] and not visited[neighbor]:
                            visited[neighbor] = 1
                            stack.append(neighbor)
            if len(component) > len(largest):
                largest = component
        for index in largest:
            selected[index] = 255

    selected_mask = Image.frombytes("L", region.size, bytes(selected))
    selected_mask = selected_mask.filter(ImageFilter.MaxFilter(3))
    selected_alpha = ImageChops.multiply(region.getchannel("A"), selected_mask)
    region.putalpha(selected_alpha)
    return region


def process_sheet(
    image: Image.Image,
    source_cols: int,
    source_rows: int,
    key_color: tuple[int, int, int],
    threshold: int,
    softness: int,
    despill_strength: float,
    padding: int,
    trim_alpha: int,
    capture_margin: float,
    min_component_area: int,
    no_trim: bool = False,
    use_shared_scale: bool = True,
    scale_rows: set[int] | None = None,
) -> tuple[Image.Image, float]:
    output = Image.new("RGBA", SHEET_SIZE, (0, 0, 0, 0))
    source_cell_width = image.width / source_cols
    source_cell_height = image.height / source_rows
    base_scale = min(
        CELL_SIZE / source_cell_width,
        CELL_SIZE / source_cell_height,
    )
    keyed_sheet = chroma_key(
        image,
        key_color,
        threshold,
        softness,
        despill_strength,
    )
    scale_row_set = scale_rows or set(range(OUTPUT_ROWS))

    extracted: list[list[Image.Image]] = []
    scale_sprites: list[Image.Image | None] = []

    for row in range(OUTPUT_ROWS):
        row_cells: list[Image.Image] = []
        for col in range(OUTPUT_COLS):
            bounds = cell_bounds(image.size, source_cols, source_rows, col, row)
            if no_trim:
                keyed_cell = keyed_sheet.crop(bounds)
            else:
                keyed_cell = extract_cell_subject(
                    keyed_sheet,
                    bounds,
                    capture_margin,
                    trim_alpha,
                    min_component_area,
                )
            row_cells.append(keyed_cell)
            if use_shared_scale and row in scale_row_set:
                if no_trim:
                    scale_sprites.append(keyed_cell)
                else:
                    bounds = alpha_bbox(keyed_cell, trim_alpha)
                    scale_sprites.append(
                        keyed_cell.crop(bounds) if bounds is not None else None
                    )
        extracted.append(row_cells)

    shared_scale = None
    if use_shared_scale:
        shared_scale = compute_shared_scale(scale_sprites, base_scale, padding)

    for row in range(OUTPUT_ROWS):
        for col in range(OUTPUT_COLS):
            output_cell = normalize_cell(
                extracted[row][col],
                base_scale,
                padding,
                trim_alpha,
                no_trim,
                shared_scale,
            )
            output.alpha_composite(output_cell, (col * CELL_SIZE, row * CELL_SIZE))

    return output, shared_scale if shared_scale is not None else base_scale


def make_checker_preview(image: Image.Image, checker_size: int) -> Image.Image:
    preview = Image.new("RGBA", image.size, (255, 255, 255, 255))
    draw = ImageDraw.Draw(preview)
    colors = ((208, 208, 208, 255), (160, 160, 160, 255))
    for y in range(0, image.height, checker_size):
        for x in range(0, image.width, checker_size):
            color = colors[(x // checker_size + y // checker_size) % 2]
            draw.rectangle(
                (
                    x,
                    y,
                    min(image.width, x + checker_size) - 1,
                    min(image.height, y + checker_size) - 1,
                ),
                fill=color,
            )
    preview.alpha_composite(image)
    return preview


def preview_path(output: Path, preview_argument: str | None) -> Path | None:
    if preview_argument is None:
        return None
    if preview_argument == "auto":
        return output.with_name(f"{output.stem}-checker-preview.png")
    return Path(preview_argument)


def ensure_png(path: Path, label: str) -> None:
    if path.suffix.lower() != ".png":
        raise ProcessingError(f"{label} must use a .png extension: {path}")


def ensure_writable(paths: Iterable[Path], force: bool) -> None:
    for path in paths:
        if path.exists() and not force:
            raise ProcessingError(f"refusing to overwrite {path}; pass --force")
        path.parent.mkdir(parents=True, exist_ok=True)


def run(args: argparse.Namespace) -> None:
    if not args.input.is_file():
        raise ProcessingError(f"input file does not exist: {args.input}")
    if args.padding * 2 >= CELL_SIZE:
        raise ProcessingError(f"--padding must be less than {CELL_SIZE // 2}")
    if args.output.resolve() == args.input.resolve():
        raise ProcessingError("input and output paths must be different")

    ensure_png(args.output, "output")
    checker_path = preview_path(args.output, args.preview)
    if checker_path is not None:
        ensure_png(checker_path, "preview")
        if checker_path.resolve() == args.output.resolve():
            raise ProcessingError("output and preview paths must be different")

    try:
        with Image.open(args.input) as opened:
            image = opened.convert("RGBA")
    except (OSError, UnidentifiedImageError) as exc:
        raise ProcessingError(f"could not open input image: {exc}") from exc

    source_cols, source_rows = resolve_grid(
        image.size,
        args.source_cols,
        args.source_rows,
        args.take_cols,
    )
    key_color = args.key_color or estimate_key_color(image)
    try:
        scale_rows = parse_row_spec(args.scale_rows)
    except (TypeError, ValueError) as exc:
        raise ProcessingError(f"invalid --scale-rows value: {args.scale_rows}") from exc

    sheet, shared_scale = process_sheet(
        image,
        source_cols,
        source_rows,
        key_color,
        args.key_threshold,
        args.edge_softness,
        args.despill,
        args.padding,
        args.trim_alpha,
        args.capture_margin,
        args.min_component_area,
        args.no_trim,
        args.shared_scale,
        scale_rows,
    )

    paths = [args.output]
    if checker_path is not None:
        paths.append(checker_path)
    ensure_writable(paths, args.force)

    sheet.save(args.output, format="PNG", optimize=True)
    if checker_path is not None:
        make_checker_preview(sheet, args.checker_size).save(
            checker_path, format="PNG", optimize=True
        )

    print(f"Pillow {PILLOW_VERSION}")
    print(
        f"source: {args.input} ({image.width}x{image.height}, "
        f"resolved grid {source_cols}x{source_rows}, taking first {OUTPUT_COLS} columns)"
    )
    print(f"key color: {key_color}")
    print(
        f"shared scale: {shared_scale:.6f} "
        f"(enabled={args.shared_scale}, rows={sorted(scale_rows)})"
    )
    print(f"output: {args.output} ({sheet.width}x{sheet.height}, {sheet.mode})")
    if checker_path is not None:
        print(f"preview: {checker_path}")


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        run(args)
    except ProcessingError as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    sys.exit(main())
