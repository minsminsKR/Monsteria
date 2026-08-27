#!/usr/bin/env python3
"""Restore previous monster appearances, then fix only action registration.

Never reprocesses green-screen / square / generated sources (those change identity).
Works only from git HEAD / before-* backups of the prior game sheets.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from collections import Counter
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
MONSTERS = ROOT / "assets" / "monsters"
CELL = 96
COLS = 6
ROWS = 6
SHEET = (CELL * COLS, CELL * ROWS)
PADDING = 10
ALPHA = 8
ACTIONS = ("idle", "walk", "attack", "skill", "hit", "faint")


def git_head_image(rel_posix: str) -> Image.Image | None:
    try:
        data = subprocess.check_output(
            ["git", "show", f"HEAD:{rel_posix}"],
            cwd=ROOT,
            stderr=subprocess.DEVNULL,
        )
    except subprocess.CalledProcessError:
        return None
    return Image.open(BytesIO(data)).convert("RGBA")


def alpha_bbox(image: Image.Image, threshold: int = ALPHA):
    mask = image.getchannel("A").point(lambda value: 255 if value >= threshold else 0)
    return mask.getbbox()


def connected_components(cell: Image.Image, min_area: int = 160):
    hard = cell.getchannel("A").point(lambda value: 255 if value >= ALPHA else 0)
    data = hard.tobytes()
    width, height = cell.size
    visited = bytearray(len(data))
    components: list[list[int]] = []
    for start, value in enumerate(data):
        if value == 0 or visited[start]:
            continue
        stack = [start]
        visited[start] = 1
        component: list[int] = []
        while stack:
            index = stack.pop()
            component.append(index)
            y, x = divmod(index, width)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                row = ny * width
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    neighbor = row + nx
                    if data[neighbor] and not visited[neighbor]:
                        visited[neighbor] = 1
                        stack.append(neighbor)
        if len(component) >= min_area:
            components.append(component)
    components.sort(key=len, reverse=True)
    return components, data, hard.size


def _component_centroid(component: list[int], width: int) -> tuple[float, float]:
    xs = 0
    ys = 0
    for index in component:
        y, x = divmod(index, width)
        xs += x
        ys += y
    count = len(component)
    return xs / count, ys / count


def keep_primary_body(cell: Image.Image) -> tuple[Image.Image, bool]:
    """Remove true duplicate characters only; keep FX and split silhouettes.

    Identity rule: never strip a second blob unless it looks like a second full
    body (similar area + clear horizontal separation). Attached FX, breath
    trails, and faint debris must stay.
    """

    components, data, size = connected_components(cell)
    if len(components) < 2:
        return cell, False
    largest, second = components[0], components[1]
    # Stricter than audit: only near-equal second bodies are duplicates.
    if len(second) < len(largest) * 0.58:
        return cell, False

    width, height = size
    cx1, _cy1 = _component_centroid(largest, width)
    cx2, _cy2 = _component_centroid(second, width)
    # Same-character FX / split parts sit close horizontally.
    if abs(cx1 - cx2) < CELL * 0.30:
        return cell, False

    keep = bytearray(len(data))
    for index in largest:
        keep[index] = 255
    # Preserve tiny FX that were below min_area.
    visited = bytearray(len(data))
    for start, value in enumerate(data):
        if value == 0 or visited[start]:
            continue
        stack = [start]
        visited[start] = 1
        component: list[int] = []
        while stack:
            index = stack.pop()
            component.append(index)
            y, x = divmod(index, width)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                row = ny * width
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    neighbor = row + nx
                    if data[neighbor] and not visited[neighbor]:
                        visited[neighbor] = 1
                        stack.append(neighbor)
        if len(component) < 160:
            for index in component:
                keep[index] = 255

    mask = Image.frombytes("L", size, bytes(keep))
    cleaned = cell.copy()
    cleaned.putalpha(ImageChops.multiply(cell.getchannel("A"), mask))
    return cleaned, True


def sheet_from_128_grid(image: Image.Image) -> Image.Image:
    """Convert legacy 6x6 / 128px marionette sheet into 6x6 / 96px."""

    if image.size != (768, 768):
        raise ValueError(f"expected 768x768, got {image.size}")
    out = Image.new("RGBA", SHEET, (0, 0, 0, 0))
    src_cell = 128
    for row in range(ROWS):
        for col in range(COLS):
            cell = image.crop(
                (
                    col * src_cell,
                    row * src_cell,
                    (col + 1) * src_cell,
                    (row + 1) * src_cell,
                )
            )
            # Preserve the same art; only change display cell size.
            cell96 = cell.resize((CELL, CELL), Image.Resampling.LANCZOS)
            out.paste(cell96, (col * CELL, row * CELL))
    return out


def choose_restore_image(monster_id: str, monster_dir: Path) -> tuple[Image.Image, str]:
    rel = f"assets/monsters/{monster_id}/{monster_id}-spritesheet-game.png"
    head = git_head_image(rel.replace("\\", "/"))
    if head is not None:
        return head, "git:HEAD"

    bra = monster_dir / f"{monster_id}-spritesheet-game-before-row-align.png"
    if bra.is_file():
        return Image.open(bra).convert("RGBA"), bra.name

    bgn = monster_dir / f"{monster_id}-spritesheet-game-before-grid-normalize.png"
    if bgn.is_file():
        return Image.open(bgn).convert("RGBA"), bgn.name

    game = monster_dir / f"{monster_id}-spritesheet-game.png"
    if game.is_file():
        return Image.open(game).convert("RGBA"), game.name
    raise FileNotFoundError(monster_id)


def clear_cell_gutter(cell: Image.Image, gutter: int = 1) -> Image.Image:
    """Erase only the outermost seam pixels (true neighbor bleed), keep art."""

    cleaned = cell.copy()
    pixels = cleaned.load()
    width, height = cleaned.size
    gutter = max(0, min(gutter, width // 2, height // 2))
    for y in range(height):
        for x in range(gutter):
            pixels[x, y] = (0, 0, 0, 0)
            pixels[width - 1 - x, y] = (0, 0, 0, 0)
    return cleaned


def remove_neighbor_edge_bleed(cell: Image.Image) -> tuple[Image.Image, bool]:
    """Drop detached edge fragments that belong to the neighboring cut.

    Keeps the primary body and near-body FX. Only removes secondary blobs whose
    centroid sits in the outer side bands (classic neighbor-bleed slivers).
    """

    components, data, size = connected_components(cell, min_area=48)
    if len(components) < 2:
        return cell, False

    width, height = size
    largest = components[0]
    cx_main, _ = _component_centroid(largest, width)
    keep = bytearray(len(data))
    for index in largest:
        keep[index] = 255

    changed = False
    for component in components[1:]:
        cx, _ = _component_centroid(component, width)
        near_main = abs(cx - cx_main) < width * 0.38
        in_left = cx < width * 0.20
        in_right = cx > width * 0.80
        if near_main or not (in_left or in_right):
            for index in component:
                keep[index] = 255
            continue
        changed = True

    if not changed:
        return cell, False

    # Preserve tiny FX speckles below min_area.
    visited = bytearray(len(data))
    for start, value in enumerate(data):
        if value == 0 or visited[start]:
            continue
        stack = [start]
        visited[start] = 1
        component: list[int] = []
        while stack:
            index = stack.pop()
            component.append(index)
            y, x = divmod(index, width)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                row = ny * width
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    neighbor = row + nx
                    if data[neighbor] and not visited[neighbor]:
                        visited[neighbor] = 1
                        stack.append(neighbor)
        if len(component) < 48:
            for index in component:
                keep[index] = 255

    mask = Image.frombytes("L", size, bytes(keep))
    cleaned = cell.copy()
    cleaned.putalpha(ImageChops.multiply(cell.getchannel("A"), mask))
    return cleaned, True


RECLAIM = 48
# Extra inset inside the 10px gutter so art never sits flush on the separator.
CONTENT_INSET = 4


def _flood_from_seeds(
    opaque: bytes, width: int, height: int, seeds: list[int]
) -> bytearray:
    keep = bytearray(len(opaque))
    stack = list(seeds)
    for index in seeds:
        keep[index] = 255
    while stack:
        index = stack.pop()
        y, x = divmod(index, width)
        for ny in range(max(0, y - 1), min(height, y + 2)):
            row = ny * width
            for nx in range(max(0, x - 1), min(width, x + 2)):
                neighbor = row + nx
                if opaque[neighbor] and not keep[neighbor]:
                    keep[neighbor] = 255
                    stack.append(neighbor)
    return keep


def extract_cell_reclaiming_overflow(
    sheet: Image.Image, row: int, col: int
) -> Image.Image | None:
    """Crop one cell, then pull back wing/FX tips that spilled into neighbors.

    When HEAD art was painted to the cell edge, the missing tip often sits in the
    adjacent cell. Flood from this cell's body into a limited side band, but reject
    large neighbor bodies (next frame's character).
    """

    x0 = col * CELL
    y0 = row * CELL
    cell = sheet.crop((x0, y0, x0 + CELL, y0 + CELL))
    bounds = alpha_bbox(cell)
    if bounds is None:
        return None

    span = bounds[2] - bounds[0]
    # Full-width crops are complete cell art — only scale-to-fit, never merge
    # the next frame's body through the seam.
    incomplete = span < int(CELL * 0.72)
    # Stuck on the left → missing tip is in the right neighbor.
    right_need = incomplete and col < COLS - 1 and bounds[0] <= 2
    # Stuck on the right → missing tip is in the left neighbor.
    left_need = incomplete and col > 0 and bounds[2] >= CELL - 2
    left_r = min(RECLAIM, x0) if left_need else 0
    right_r = min(RECLAIM, sheet.width - (x0 + CELL)) if right_need else 0

    if left_r == 0 and right_r == 0:
        cleaned = clear_cell_gutter(cell, 1)
        cleaned, _ = remove_neighbor_edge_bleed(cleaned)
        cleaned, _ = keep_primary_body(cleaned)
        bounds = alpha_bbox(cleaned)
        return None if bounds is None else cleaned.crop(bounds)

    x_start = x0 - left_r
    x_end = x0 + CELL + right_r
    expanded = sheet.crop((x_start, y0, x_end, y0 + CELL)).convert("RGBA")
    width, height = expanded.size
    core_x0 = left_r
    core_x1 = left_r + CELL

    opaque = (
        expanded.getchannel("A")
        .point(lambda value: 255 if value >= ALPHA else 0)
        .tobytes()
    )
    # Seed only from this cell's core, then grow. Prefer seam-edge seeds first
    # so reclaim prefers tips attached to our cut edge.
    seeds = [
        y * width + x
        for y in range(height)
        for x in range(core_x0, core_x1)
        if opaque[y * width + x]
    ]
    if not seeds:
        return None

    keep = _flood_from_seeds(opaque, width, height, seeds)
    core_area = sum(
        1
        for y in range(height)
        for x in range(core_x0, core_x1)
        if keep[y * width + x]
    )

    # Drop reclaimed chunks that are really the next/prev character body.
    for zone_x0, zone_x1 in ((0, core_x0), (core_x1, width)):
        if zone_x1 <= zone_x0:
            continue
        visited = bytearray(len(opaque))
        for start_y in range(height):
            for start_x in range(zone_x0, zone_x1):
                start = start_y * width + start_x
                if not keep[start] or visited[start]:
                    continue
                stack = [start]
                visited[start] = 1
                component: list[int] = []
                while stack:
                    index = stack.pop()
                    component.append(index)
                    y, x = divmod(index, width)
                    for ny in range(max(0, y - 1), min(height, y + 2)):
                        row_i = ny * width
                        for nx in range(max(0, x - 1), min(width, x + 2)):
                            neighbor = row_i + nx
                            if keep[neighbor] and not visited[neighbor]:
                                # Stay inside this reclaim zone when measuring mass.
                                nx_local = neighbor % width
                                if nx_local < zone_x0 or nx_local >= zone_x1:
                                    continue
                                visited[neighbor] = 1
                                stack.append(neighbor)
                if len(component) > max(120, int(core_area * 0.22)):
                    for index in component:
                        keep[index] = 0

    mask = Image.frombytes("L", (width, height), bytes(keep))
    extracted = expanded.copy()
    extracted.putalpha(ImageChops.multiply(expanded.getchannel("A"), mask))
    extracted, _ = remove_neighbor_edge_bleed(extracted)
    extracted, _ = keep_primary_body(extracted)
    bounds = alpha_bbox(extracted)
    if bounds is None:
        return None
    return extracted.crop(bounds)


def extract_sprites(
    sheet: Image.Image,
) -> tuple[list[list[Image.Image | None]], int]:
    grid: list[list[Image.Image | None]] = []
    deduped = 0
    for row in range(ROWS):
        row_cells: list[Image.Image | None] = []
        for col in range(COLS):
            sprite = extract_cell_reclaiming_overflow(sheet, row, col)
            row_cells.append(sprite)
            if sprite is not None and sprite.width > CELL:
                deduped += 1  # counted as reclaim widen
        grid.append(row_cells)
    return grid, deduped


def compute_identity_scales(grid: list[list[Image.Image | None]]) -> list[list[float]]:
    """Fit each action so body+motion stay inside gutters without clipping art.

    Idle+walk share one quiet scale (stable character size). Other rows fit
    per-row so wide skill/attack FX is fully visible, never chopped at the line.
    """

    # Content must stay inside CONTENT_INSET beyond the transparent gutter.
    inner = CELL - 2 * (PADDING + CONTENT_INSET)
    idle_heights = [sprite.height for sprite in grid[0] if sprite is not None]
    idle_widths = [sprite.width for sprite in grid[0] if sprite is not None]
    idle_h = sorted(idle_heights)[len(idle_heights) // 2] if idle_heights else 0
    idle_w = sorted(idle_widths)[len(idle_widths) // 2] if idle_widths else 0

    quiet_sprites = [
        sprite
        for row in grid[:2]
        for sprite in row
        if sprite is not None
    ]
    quiet_scale = 1.0
    if quiet_sprites:
        quiet_scale = min(
            1.0,
            inner / max(sprite.width for sprite in quiet_sprites),
            inner / max(sprite.height for sprite in quiet_sprites),
        )

    scales: list[list[float]] = []
    for row in range(ROWS):
        if row <= 1:
            row_scale = quiet_scale
        else:
            row_sprites = [sprite for sprite in grid[row] if sprite is not None]
            row_scale = 1.0
            if row_sprites:
                row_scale = min(
                    1.0,
                    inner / max(sprite.width for sprite in row_sprites),
                    inner / max(sprite.height for sprite in row_sprites),
                )
        row_scales: list[float] = []
        for sprite in grid[row]:
            if sprite is None:
                row_scales.append(1.0)
                continue
            scale = row_scale
            if (
                row <= 2
                and idle_h > 0
                and idle_w > 0
                and sprite.height < idle_h * 0.82
                and sprite.width < idle_w * 0.82
            ):
                repair = min(idle_h / sprite.height, idle_w / max(1, sprite.width))
                repair = min(repair, 1.35)
                scale = min(
                    repair,
                    inner / max(1, sprite.width),
                    inner / max(1, sprite.height),
                )
            row_scales.append(scale)
        scales.append(row_scales)
    return scales


def _alpha_area(sprite: Image.Image) -> int:
    return sum(1 for value in sprite.getchannel("A").tobytes() if value >= ALPHA)


def _color_keys(sprite: Image.Image, quant: int = 32) -> Counter:
    counts: Counter = Counter()
    pixels = sprite.load()
    width, height = sprite.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if alpha < ALPHA:
                continue
            counts[(red // quant, green // quant, blue // quant)] += 1
    return counts


def _body_score(sprite: Image.Image, idle_keys: Counter) -> float:
    if not idle_keys:
        return 0.0
    keys = _color_keys(sprite)
    if not keys:
        return 0.0
    overlap = sum(min(keys[key], idle_keys[key]) for key in keys if key in idle_keys)
    return overlap / max(1, sum(idle_keys.values()))


def _stack_body_under_fx(body: Image.Image, fx: Image.Image) -> Image.Image:
    """Bottom-align body + FX so skill trails stay, but the character returns."""

    width = max(body.width, fx.width)
    height = max(body.height, fx.height)
    out = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    out.alpha_composite(body, ((width - body.width) // 2, height - body.height))
    out.alpha_composite(fx, ((width - fx.width) // 2, height - fx.height))
    return out


def repair_sparse_action_frames(
    grid: list[list[Image.Image | None]],
) -> int:
    """Restore missing bodies without inventing new art.

    1) Collapsed/empty frames → copy nearest full same-row body.
    2) FX-only frames (almost no idle body colors) → composite nearest full
       body underneath the existing FX (keeps skill trails).
    """

    idle_sprites = [sprite for sprite in grid[0] if sprite is not None]
    if not idle_sprites:
        return 0

    idle_heights = sorted(sprite.height for sprite in idle_sprites)
    idle_areas = sorted(_alpha_area(sprite) for sprite in idle_sprites)
    ref_h = idle_heights[len(idle_heights) // 2]
    ref_area = idle_areas[len(idle_areas) // 2]

    idle_keys: Counter = Counter()
    for sprite in idle_sprites:
        idle_keys.update(_color_keys(sprite))
    idle_keys = Counter(dict(idle_keys.most_common(48)))
    idle_scores = sorted(_body_score(sprite, idle_keys) for sprite in idle_sprites)
    ref_score = idle_scores[len(idle_scores) // 2] if idle_scores else 0.0
    fx_cutoff = ref_score * 0.30
    donor_score_min = ref_score * 0.70

    repaired = 0
    # Snapshot healthy donors before mutation so repaired FX stacks are not reused.
    healthy: list[list[bool]] = [[False] * COLS for _ in range(ROWS)]
    for row in range(0, 5):
        for col in range(COLS):
            candidate = grid[row][col]
            if candidate is None:
                continue
            if candidate.height < ref_h * 0.88:
                continue
            if _alpha_area(candidate) < ref_area * 0.45:
                continue
            if _body_score(candidate, idle_keys) < donor_score_min:
                continue
            healthy[row][col] = True

    def choose_donor(row: int, col: int) -> Image.Image | None:
        # Prefer earlier same-row standing bodies over lean/FX frames.
        ordered_cols = list(range(col - 1, -1, -1)) + list(range(col + 1, COLS))
        for candidate_col in ordered_cols:
            if not healthy[row][candidate_col]:
                continue
            candidate = grid[row][candidate_col]
            if candidate is not None:
                return candidate
        return grid[0][col] or next((sprite for sprite in grid[0] if sprite is not None), None)

    for row in range(0, 5):  # skip faint debris row
        for col in range(COLS):
            sprite = grid[row][col]
            height = 0 if sprite is None else sprite.height
            area = 0 if sprite is None else _alpha_area(sprite)
            score = 0.0 if sprite is None else _body_score(sprite, idle_keys)

            is_fx_only = sprite is not None and score < fx_cutoff
            is_collapsed = height < ref_h * 0.70 or area < ref_area * 0.35
            if not is_fx_only and not is_collapsed:
                continue

            donor = choose_donor(row, col)
            if donor is None:
                continue
            if is_fx_only and sprite is not None:
                grid[row][col] = _stack_body_under_fx(donor, sprite)
            else:
                grid[row][col] = donor.copy()
            repaired += 1
    return repaired


def place_in_cell(sprite: Image.Image, scale: float) -> Image.Image:
    """Fit full sprite (body + reclaimed motion) inside gutters — never clip art.

    Opaque pixels stay in [PADDING+CONTENT_INSET, CELL-(PADDING+CONTENT_INSET)],
    so the red cell separators always have a clear empty band.
    """

    content_pad = PADDING + CONTENT_INSET
    inner = CELL - 2 * content_pad
    size = (
        max(1, round(sprite.width * scale)),
        max(1, round(sprite.height * scale)),
    )
    fit = min(1.0, inner / size[0], inner / size[1])
    if fit < 1.0:
        size = (max(1, round(size[0] * fit)), max(1, round(size[1] * fit)))

    if size == (sprite.width, sprite.height):
        resized = sprite
    else:
        resized = sprite.resize(size, Image.Resampling.LANCZOS)

    # Final clamp — never allow rounded size to exceed the content box.
    if resized.width > inner or resized.height > inner:
        fit = min(inner / resized.width, inner / resized.height)
        new_size = (
            max(1, round(resized.width * fit)),
            max(1, round(resized.height * fit)),
        )
        resized = resized.resize(new_size, Image.Resampling.LANCZOS)

    cell_canvas = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    paste_x = content_pad + (inner - resized.width) // 2
    paste_y = CELL - content_pad - resized.height
    if paste_y < content_pad:
        paste_y = content_pad
    # Guard: paste must stay inside content box.
    paste_x = max(content_pad, min(paste_x, CELL - content_pad - resized.width))
    paste_y = max(content_pad, min(paste_y, CELL - content_pad - resized.height))
    cell_canvas.alpha_composite(resized, (paste_x, paste_y))

    # Hard transparent gutter (separator band) — never erase content box.
    pixels = cell_canvas.load()
    for y in range(CELL):
        for x in range(PADDING):
            pixels[x, y] = (0, 0, 0, 0)
            pixels[CELL - 1 - x, y] = (0, 0, 0, 0)
    for x in range(CELL):
        for y in range(PADDING):
            pixels[x, y] = (0, 0, 0, 0)
            pixels[x, CELL - 1 - y] = (0, 0, 0, 0)
    return cell_canvas


def compose_sheet(
    grid: list[list[Image.Image | None]], scales: list[list[float]]
) -> Image.Image:
    out = Image.new("RGBA", SHEET, (0, 0, 0, 0))
    for row in range(ROWS):
        for col in range(COLS):
            sprite = grid[row][col]
            if sprite is None:
                continue
            cell_canvas = place_in_cell(sprite, scales[row][col])
            out.alpha_composite(cell_canvas, (col * CELL, row * CELL))
    return out


def analyze(path: Path) -> dict:
    from audit_spritesheets import analyze_sheet

    return analyze_sheet(path)


def process_monster(monster_id: str, dry_run: bool = False) -> dict:
    monster_dir = MONSTERS / monster_id
    game_path = monster_dir / f"{monster_id}-spritesheet-game.png"
    restored, source_label = choose_restore_image(monster_id, monster_dir)

    if restored.size == (768, 768):
        restored = sheet_from_128_grid(restored)
        source_label = f"{source_label}->128to96"
    elif restored.size != SHEET:
        # Unexpected size: attempt uniform resize of whole sheet (last resort).
        restored = restored.resize(SHEET, Image.Resampling.LANCZOS)
        source_label = f"{source_label}->resized"

    # Snapshot pre-fix for safety.
    safety = monster_dir / f"{monster_id}-spritesheet-game-before-identity-restore.png"
    if game_path.is_file() and not safety.exists() and not dry_run:
        Image.open(game_path).convert("RGBA").save(safety)

    grid, deduped = extract_sprites(restored)
    repaired = repair_sparse_action_frames(grid)
    scales = compute_identity_scales(grid)
    flat_scales = [value for row in scales for value in row]
    fixed = compose_sheet(grid, scales)

    if not dry_run:
        fixed.save(game_path, format="PNG", optimize=True)

    report = {
        "id": monster_id,
        "restore_source": source_label,
        "deduped_cells": deduped,
        "repaired_sparse_frames": repaired,
        "scale_min": round(min(flat_scales), 6),
        "scale_max": round(max(flat_scales), 6),
        "output": str(game_path),
    }
    if not dry_run:
        # Local import path hack
        sys.path.insert(0, str(ROOT / "tools"))
        audit = analyze(game_path)
        report["audit_ok"] = audit["ok"]
        report["quiet_pose_height_span"] = audit["quiet_pose_height_span"]
        report["quiet_pose_width_span"] = audit["quiet_pose_width_span"]
        report["multi_body_cells"] = audit["multi_body_cells"]
        report["avg_height"] = audit["avg_height"]
        report["issues"] = audit["issues"][:12]
    return report


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--only", nargs="*")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--report",
        type=Path,
        default=MONSTERS / "identity-restore-report.json",
    )
    args = parser.parse_args(argv)

    ids = sorted(
        path.name
        for path in MONSTERS.iterdir()
        if path.is_dir() and not path.name.startswith(("_", "."))
    )
    if args.only:
        ids = [monster_id for monster_id in ids if monster_id in set(args.only)]

    reports = []
    failures = 0
    for monster_id in ids:
        try:
            report = process_monster(monster_id, dry_run=args.dry_run)
            reports.append(report)
            status = "OK" if report.get("audit_ok", True) else "WARN"
            if not report.get("audit_ok", True):
                failures += 1
            print(
                f"[{status}] {monster_id}: restore={report['restore_source']} "
                f"scale={report.get('scale_min')}-{report.get('scale_max')} "
                f"dedupe={report['deduped_cells']} "
                f"repair={report.get('repaired_sparse_frames')} "
                f"quietH={report.get('quiet_pose_height_span')} "
                f"bodies={report.get('multi_body_cells')} avgH={report.get('avg_height')}"
            )
            for issue in report.get("issues", [])[:5]:
                print(f"  - {issue}")
        except Exception as exc:  # noqa: BLE001
            failures += 1
            reports.append({"id": monster_id, "error": str(exc)})
            print(f"[ERR] {monster_id}: {exc}")

    args.report.write_text(json.dumps(reports, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {args.report}")
    print(f"summary failures={failures}/{len(ids)}")
    return 1 if failures else 0


if __name__ == "__main__":
    # Fix extract_sprites return typing used above
    raise SystemExit(main())
