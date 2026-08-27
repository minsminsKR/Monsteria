#!/usr/bin/env python3
"""Export per-monster action strips/gifs for visual action QA."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MONSTERS = ROOT / "assets" / "monsters"
OUT = MONSTERS / "_action-previews"
CELL = 96
ACTIONS = ("idle", "walk", "attack", "skill", "hit", "faint")


def export_monster(game: Path, out_dir: Path) -> None:
    with Image.open(game) as opened:
        sheet = opened.convert("RGBA")
    monster = game.parent.name
    monster_dir = out_dir / monster
    monster_dir.mkdir(parents=True, exist_ok=True)

    contact = Image.new("RGBA", (CELL * 6 + 40, CELL * 6 + 40), (32, 36, 48, 255))
    for row, action in enumerate(ACTIONS):
        strip = Image.new("RGBA", (CELL * 6, CELL), (0, 0, 0, 0))
        frames = []
        for col in range(6):
            frame = sheet.crop((col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL))
            strip.paste(frame, (col * CELL, 0))
            frames.append(frame.convert("RGBA"))
            contact.alpha_composite(frame, (20 + col * CELL, 20 + row * CELL))
        strip_path = monster_dir / f"{monster}-{action}-strip.png"
        strip.save(strip_path)
        # Simple animated preview (ping-pong not needed).
        gif_path = monster_dir / f"{monster}-{action}.gif"
        frames[0].save(
            gif_path,
            save_all=True,
            append_images=frames[1:],
            duration=140,
            loop=0,
            disposal=2,
        )
    contact.save(monster_dir / f"{monster}-all-actions.png")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--only", nargs="*")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)

    sheets = sorted(MONSTERS.glob("*/*-spritesheet-game.png"))
    if args.only:
        wanted = set(args.only)
        sheets = [path for path in sheets if path.parent.name in wanted]

    for sheet in sheets:
        export_monster(sheet, OUT)
        print(f"exported {sheet.parent.name}")
    print(f"wrote previews under {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
