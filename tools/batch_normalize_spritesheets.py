#!/usr/bin/env python3
"""Reprocess every monster game sheet with shared-scale registration."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
PROCESS = ROOT / "tools" / "process_monster_spritesheet.py"
AUDIT = ROOT / "tools" / "audit_spritesheets.py"
MONSTERS = ROOT / "assets" / "monsters"
CELL = 96
ACTIONS_IDLE_ROW = 0

SOURCE_CANDIDATES = (
    "{id}-spritesheet-square.png",
    "{id}-spritesheet-generated-source.png",
    "{id}-spritesheet-v2-source.png",
    "{id}-spritesheet-source.png",
    "{id}-spritesheet-game-before-grid-normalize.png",
)


def choose_source(monster_dir: Path, monster_id: str) -> Path | None:
    for pattern in SOURCE_CANDIDATES:
        candidate = monster_dir / pattern.format(id=monster_id)
        if candidate.is_file():
            return candidate
    return None


def looks_like_green_screen(path: Path) -> bool:
    with Image.open(path) as opened:
        rgb = opened.convert("RGB")
    width, height = rgb.size
    stride = max(1, max(width, height) // 128)
    pixels = rgb.load()
    greenish = 0
    total = 0
    for y in range(0, height, stride):
        for x in range(0, width, stride):
            red, green, blue = pixels[x, y]
            total += 1
            if green >= 80 and green - max(red, blue) >= 30:
                greenish += 1
    return total > 0 and (greenish / total) >= 0.08


def _cell_alpha_bbox(cell: Image.Image, threshold: int = 8):
    mask = cell.getchannel("A").point(lambda value: 255 if value >= threshold else 0)
    return mask.getbbox()


def _row_average_height(sheet: Image.Image, row: int) -> float:
    heights = []
    for col in range(6):
        cell = sheet.crop((col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL))
        bounds = _cell_alpha_bbox(cell)
        if bounds is None:
            continue
        heights.append(bounds[3] - bounds[1])
    if not heights:
        return 0.0
    return sum(heights) / len(heights)


def _chroma_key_cell(cell: Image.Image, key=(0, 255, 0), threshold=45, softness=70) -> Image.Image:
    """Key a flat green background out of an RGB/RGBA cell."""

    import math

    source = cell.convert("RGBA")
    key_r, key_g, key_b = key
    pixels = []
    for red, green, blue, alpha in source.getdata():
        distance = math.sqrt(
            (red - key_r) ** 2 + (green - key_g) ** 2 + (blue - key_b) ** 2
        )
        # Also catch near-key green screens that aren't exact #00FF00.
        green_dominance = green - max(red, blue)
        if green_dominance >= 40 and green >= 180:
            distance = min(distance, max(0.0, 40.0 - green_dominance + 20.0))
        t = max(0.0, min(1.0, (distance - threshold) / max(1, softness)))
        t = t * t * (3.0 - 2.0 * t)
        keyed_alpha = round(alpha * t)
        if keyed_alpha == 0:
            pixels.append((0, 0, 0, 0))
        else:
            spill = max(0, green - max(red, blue))
            pixels.append((red, max(0, green - round(spill * 0.85)), blue, keyed_alpha))
    keyed = Image.new("RGBA", source.size)
    keyed.putdata(pixels)
    return keyed


def paste_idle_strip(game_sheet: Path, idle_strip: Path) -> None:
    """Paste a tuned idle strip, rescaled to the sheet's walk-row body height."""

    with Image.open(game_sheet) as opened:
        sheet = opened.convert("RGBA")
    with Image.open(idle_strip) as opened:
        strip = opened.convert("RGBA")
    if strip.size != (CELL * 6, CELL):
        raise RuntimeError(
            f"idle strip must be {CELL * 6}x{CELL}, got {strip.size}: {idle_strip}"
        )

    # Idle strip sources may still be green-screen RGB.
    keyed_cells = [_chroma_key_cell(strip.crop((col * CELL, 0, (col + 1) * CELL, CELL))) for col in range(6)]
    strip_heights = []
    for cell in keyed_cells:
        bounds = _cell_alpha_bbox(cell)
        if bounds is not None:
            strip_heights.append(bounds[3] - bounds[1])
    strip_h = (sum(strip_heights) / len(strip_heights)) if strip_heights else 0.0
    target_h = _row_average_height(sheet, 1) or _row_average_height(sheet, 2)
    scale = 1.0
    if target_h > 0 and strip_h > 0:
        scale = min(1.0, target_h / strip_h)

    padding = 10
    rebuilt = Image.new("RGBA", (CELL * 6, CELL), (0, 0, 0, 0))
    for col, cell in enumerate(keyed_cells):
        bounds = _cell_alpha_bbox(cell)
        if bounds is None:
            continue
        sprite = cell.crop(bounds)
        size = (
            max(1, round(sprite.width * scale)),
            max(1, round(sprite.height * scale)),
        )
        sprite = sprite.resize(size, Image.Resampling.LANCZOS)
        x = col * CELL + (CELL - sprite.width) // 2
        y = CELL - padding - sprite.height
        rebuilt.alpha_composite(sprite, (max(0, x), max(0, y)))

    sheet.paste(rebuilt, (0, ACTIONS_IDLE_ROW * CELL))
    sheet.save(game_sheet, format="PNG", optimize=True)


def keep_largest_body_per_cell(path: Path, min_area: int = 160) -> int:
    """Remove true double-character ghosts; keep small FX blobs attached as-is."""

    with Image.open(path) as opened:
        sheet = opened.convert("RGBA")
    if sheet.size != (576, 576):
        raise RuntimeError(f"expected 576x576, got {sheet.size}: {path}")

    removed = 0
    output = sheet.copy()
    for row in range(5):  # skip faint row collapse debris
        for col in range(6):
            box = (col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL)
            cell = sheet.crop(box)
            alpha = cell.getchannel("A")
            hard = alpha.point(lambda value: 255 if value >= 8 else 0)
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
                        row_offset = ny * width
                        for nx in range(max(0, x - 1), min(width, x + 2)):
                            neighbor = row_offset + nx
                            if data[neighbor] and not visited[neighbor]:
                                visited[neighbor] = 1
                                stack.append(neighbor)
                if len(component) >= min_area:
                    components.append(component)
            if len(components) < 2:
                continue
            components.sort(key=len, reverse=True)
            largest = components[0]
            second = components[1]
            # Only treat near-equal large blobs as duplicate characters.
            if len(second) < len(largest) * 0.42:
                continue
            removed += 1
            mask = bytearray(len(data))
            for index in largest:
                mask[index] = 255
            # Keep tiny FX (< min_area) that were never in components list:
            # rebuild from original alpha where mask or original small speck.
            visited = bytearray(len(data))
            keep = bytearray(len(data))
            for index in largest:
                keep[index] = 255
            for start, value in enumerate(data):
                if value == 0 or visited[start] or keep[start]:
                    visited[start] = 1
                    continue
                stack = [start]
                visited[start] = 1
                component = []
                while stack:
                    index = stack.pop()
                    component.append(index)
                    y, x = divmod(index, width)
                    for ny in range(max(0, y - 1), min(height, y + 2)):
                        row_offset = ny * width
                        for nx in range(max(0, x - 1), min(width, x + 2)):
                            neighbor = row_offset + nx
                            if data[neighbor] and not visited[neighbor]:
                                visited[neighbor] = 1
                                stack.append(neighbor)
                if len(component) < min_area:
                    for index in component:
                        keep[index] = 255
            mask_img = Image.frombytes("L", cell.size, bytes(keep))
            cleaned = cell.copy()
            cleaned.putalpha(ImageChops.multiply(cell.getchannel("A"), mask_img))
            output.paste(cleaned, box)
    output.save(path, format="PNG", optimize=True)
    return removed


def normalize_rgba_shared_scale(path: Path, padding: int = 10) -> float:
    """Best-effort shared scale for already-transparent 576 game sheets."""

    with Image.open(path) as opened:
        sheet = opened.convert("RGBA")
    if sheet.size != (576, 576):
        raise RuntimeError(f"expected 576x576, got {sheet.size}: {path}")

    sprites: list[tuple[int, int, Image.Image]] = []
    max_w = 1
    max_h = 1
    for row in range(6):
        for col in range(6):
            cell = sheet.crop((col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL))
            alpha = cell.getchannel("A")
            mask = alpha.point(lambda value: 255 if value >= 8 else 0)
            bounds = mask.getbbox()
            if bounds is None:
                continue
            sprite = cell.crop(bounds)
            sprites.append((row, col, sprite))
            if row <= 4:
                max_w = max(max_w, sprite.width)
                max_h = max(max_h, sprite.height)

    inner = CELL - 2 * padding
    shared_scale = min(1.0, inner / max_w, inner / max_h)
    output = Image.new("RGBA", (576, 576), (0, 0, 0, 0))
    for row, col, sprite in sprites:
        size = (
            max(1, round(sprite.width * shared_scale)),
            max(1, round(sprite.height * shared_scale)),
        )
        resized = sprite.resize(size, Image.Resampling.LANCZOS)
        x = col * CELL + (CELL - resized.width) // 2
        y = row * CELL + CELL - padding - resized.height
        output.alpha_composite(resized, (x, y))
    output.save(path, format="PNG", optimize=True)
    return shared_scale


def run_process(source: Path, output: Path, preview: Path) -> None:
    command = [
        sys.executable,
        str(PROCESS),
        str(source),
        str(output),
        "--force",
        "--shared-scale",
        "--scale-rows",
        "0-2",
        "--capture-margin",
        "0.18",
        "--preview",
        str(preview),
    ]
    subprocess.run(command, check=True, cwd=ROOT)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--only", nargs="*", help="optional monster folder names")
    parser.add_argument(
        "--keep-idle-strip",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="after processing, paste *-idle-strip-source.png onto row 0 if present (default: on)",
    )
    parser.add_argument(
        "--report",
        type=Path,
        default=ROOT / "assets" / "monsters" / "shared-scale-batch-report.json",
    )
    args = parser.parse_args(argv)

    monster_dirs = sorted(
        path for path in MONSTERS.iterdir() if path.is_dir() and not path.name.startswith(".")
    )
    if args.only:
        wanted = set(args.only)
        monster_dirs = [path for path in monster_dirs if path.name in wanted]

    results = []
    for monster_dir in monster_dirs:
        monster_id = monster_dir.name
        game = monster_dir / f"{monster_id}-spritesheet-game.png"
        if not game.is_file():
            results.append({"id": monster_id, "status": "skip", "reason": "no game sheet"})
            continue

        backup = monster_dir / f"{monster_id}-spritesheet-game-before-shared-scale.png"
        if not backup.exists():
            shutil.copy2(game, backup)

        source = choose_source(monster_dir, monster_id)
        preview = monster_dir / f"{monster_id}-spritesheet-game-checker-preview.png"
        mode = None
        shared_scale = None
        try:
            if source is not None and (
                "source" in source.name
                or "square" in source.name
                or looks_like_green_screen(source)
            ):
                mode = f"process:{source.name}"
                run_process(source, game, preview)
            else:
                mode = "rgba-renorm"
                shared_scale = normalize_rgba_shared_scale(game)

            idle_strip = monster_dir / f"{monster_id}-idle-strip-source.png"
            if args.keep_idle_strip and idle_strip.is_file():
                paste_idle_strip(game, idle_strip)
                mode = f"{mode}+idle-strip"

            # Safety net for residual ghosts on transparent sheets.
            removed = keep_largest_body_per_cell(game)
            if removed:
                mode = f"{mode}+dedupe{removed}"
                shared_scale = normalize_rgba_shared_scale(game)

            results.append(
                {
                    "id": monster_id,
                    "status": "ok",
                    "mode": mode,
                    "source": str(source) if source else None,
                    "shared_scale": shared_scale,
                }
            )
            print(f"[OK] {monster_id} via {mode}")
        except Exception as exc:  # noqa: BLE001 - batch must continue
            results.append(
                {
                    "id": monster_id,
                    "status": "error",
                    "mode": mode,
                    "error": str(exc),
                }
            )
            print(f"[ERR] {monster_id}: {exc}")
            if backup.is_file():
                shutil.copy2(backup, game)

    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {args.report}")

    audit = subprocess.run(
        [
            sys.executable,
            str(AUDIT),
            "--root",
            str(MONSTERS),
            "--json-out",
            str(MONSTERS / "spritesheet-audit-after-shared-scale.json"),
            "--max-span",
            "14",
        ],
        cwd=ROOT,
    )
    batch_ok = all(item["status"] in {"ok", "skip"} for item in results)
    return 0 if batch_ok and audit.returncode == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
