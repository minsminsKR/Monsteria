#!/usr/bin/env python3
"""Audit 6x6 monster game spritesheets for scale/baseline/edge issues."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:  # pragma: no cover
    raise SystemExit("Pillow is required. Activate .venv and pip install Pillow") from exc

CELL = 96
COLS = 6
ROWS = 6
ACTIONS = ("idle", "walk", "attack", "skill", "hit", "faint")
ALPHA_THRESHOLD = 8


def alpha_bbox(cell: Image.Image, threshold: int = ALPHA_THRESHOLD):
    alpha = cell.getchannel("A")
    mask = alpha.point(lambda value: 255 if value >= threshold else 0)
    return mask.getbbox()


def count_duplicate_bodies(cell: Image.Image, threshold: int = ALPHA_THRESHOLD, min_area: int = 160) -> int:
    """Return body count when two near-equal large bodies exist (ignore small FX)."""

    mask = cell.getchannel("A").point(lambda value: 255 if value >= threshold else 0)
    data = mask.tobytes()
    width, height = cell.size
    visited = bytearray(len(data))
    areas: list[int] = []

    for start, value in enumerate(data):
        if value == 0 or visited[start]:
            continue
        stack = [start]
        visited[start] = 1
        area = 0
        while stack:
            index = stack.pop()
            area += 1
            y, x = divmod(index, width)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                row = ny * width
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    neighbor = row + nx
                    if data[neighbor] and not visited[neighbor]:
                        visited[neighbor] = 1
                        stack.append(neighbor)
        if area >= min_area:
            areas.append(area)
    if len(areas) < 2:
        return 1 if areas else 0
    areas.sort(reverse=True)
    if areas[1] >= areas[0] * 0.42:
        return len([area for area in areas if area >= areas[0] * 0.42])
    return 1


def analyze_sheet(path: Path) -> dict:
    with Image.open(path) as opened:
        image = opened.convert("RGBA")

    issues: list[str] = []
    if image.size != (CELL * COLS, CELL * ROWS):
        issues.append(f"unexpected size {image.size}")

    row_stats = []
    heights = []
    widths = []
    baselines = []
    edge_hits = 0
    empty_cells = 0
    multi_body_cells = 0

    for row in range(ROWS):
        row_heights = []
        row_widths = []
        for col in range(COLS):
            cell = image.crop(
                (col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL)
            )
            bounds = alpha_bbox(cell)
            if bounds is None:
                empty_cells += 1
                continue
            left, top, right, bottom = bounds
            width = right - left
            height = bottom - top
            row_widths.append(width)
            row_heights.append(height)
            widths.append(width)
            heights.append(height)
            baselines.append(bottom)
            # Neighbor isolation: never allow opaque pixels on L/R cell borders.
            if left <= 0 or right >= CELL:
                edge_hits += 1
                issues.append(
                    f"{ACTIONS[row]}[{col}] touches L/R cell edge {bounds}"
                )
            # Also require content inset so art is not flush against the separator.
            content_pad = 10
            inset = 4
            if (
                left < content_pad + inset
                or right > CELL - content_pad - inset
            ):
                edge_hits += 1
                issues.append(
                    f"{ACTIONS[row]}[{col}] too close to L/R separator {bounds}"
                )
            bodies = count_duplicate_bodies(cell)
            # Faint may intentionally split; flag multi-body on gameplay rows.
            if row <= 4 and bodies >= 2:
                multi_body_cells += 1
                issues.append(f"{ACTIONS[row]}[{col}] has {bodies} large bodies")

        if row_heights:
            row_stats.append(
                {
                    "action": ACTIONS[row],
                    "avg_h": sum(row_heights) / len(row_heights),
                    "avg_w": sum(row_widths) / len(row_widths),
                    "min_h": min(row_heights),
                    "max_h": max(row_heights),
                }
            )
        else:
            row_stats.append(
                {
                    "action": ACTIONS[row],
                    "avg_h": 0,
                    "avg_w": 0,
                    "min_h": 0,
                    "max_h": 0,
                }
            )

    # Idle/walk define body scale; attack width may grow from limb extension.
    quiet = [
        stat
        for stat in row_stats
        if stat["action"] in {"idle", "walk"} and stat["avg_h"] > 0
    ]
    active = [stat for stat in row_stats if stat["action"] != "faint" and stat["avg_h"] > 0]
    cross_span = 0.0
    quiet_span = 0.0
    width_span = 0.0
    if active:
        cross_span = max(stat["avg_h"] for stat in active) - min(
            stat["avg_h"] for stat in active
        )
    if quiet:
        quiet_span = max(stat["avg_h"] for stat in quiet) - min(
            stat["avg_h"] for stat in quiet
        )
        width_span = max(stat["avg_w"] for stat in quiet) - min(
            stat["avg_w"] for stat in quiet
        )

    baseline_span = (max(baselines) - min(baselines)) if baselines else 0
    if baseline_span > 3:
        issues.append(f"baseline span {baseline_span}px > 3")
    if quiet_span > 12:
        issues.append(f"quiet-pose height span {quiet_span:.1f}px > 12")
    if width_span > 18:
        issues.append(f"quiet-pose width span {width_span:.1f}px > 18")

    return {
        "path": str(path),
        "ok": len(issues) == 0 and empty_cells == 0 and multi_body_cells == 0,
        "empty_cells": empty_cells,
        "edge_hits": edge_hits,
        "multi_body_cells": multi_body_cells,
        "cross_action_height_span": round(cross_span, 2),
        "quiet_pose_height_span": round(quiet_span, 2),
        "quiet_pose_width_span": round(width_span, 2),
        "baseline_span": baseline_span,
        "avg_height": round(sum(heights) / len(heights), 2) if heights else 0,
        "avg_width": round(sum(widths) / len(widths), 2) if widths else 0,
        "rows": row_stats,
        "issues": issues,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("assets/monsters"),
        help="monster assets root",
    )
    parser.add_argument(
        "--json-out",
        type=Path,
        default=None,
        help="optional JSON report path",
    )
    parser.add_argument(
        "--max-span",
        type=float,
        default=10.0,
        help="fail if non-faint row avg height span exceeds this",
    )
    args = parser.parse_args(argv)

    sheets = sorted(args.root.glob("*/*-spritesheet-game.png"))
    if not sheets:
        print(f"no game sheets under {args.root}", file=sys.stderr)
        return 1

    reports = []
    failures = 0
    for sheet in sheets:
        report = analyze_sheet(sheet)
        report["ok"] = (
            report["empty_cells"] == 0
            and report["edge_hits"] == 0
            and report["multi_body_cells"] == 0
            and report["baseline_span"] <= 3
            and report["quiet_pose_height_span"] <= args.max_span
            and report["quiet_pose_width_span"] <= 18
        )
        reports.append(report)
        status = "OK" if report["ok"] else "FAIL"
        if not report["ok"]:
            failures += 1
        print(
            f"[{status}] {sheet.parent.name}: "
            f"quietH={report['quiet_pose_height_span']:.1f} "
            f"quietW={report['quiet_pose_width_span']:.1f} "
            f"bodies={report['multi_body_cells']} "
            f"avgH={report['avg_height']:.1f} "
            f"baseline={report['baseline_span']} "
            f"edge={report['edge_hits']} empty={report['empty_cells']}"
        )
        for issue in report["issues"][:8]:
            print(f"  - {issue}")

    summary = {
        "sheets": len(reports),
        "failures": failures,
        "reports": reports,
    }
    if args.json_out:
        args.json_out.parent.mkdir(parents=True, exist_ok=True)
        args.json_out.write_text(
            json.dumps(summary, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"wrote {args.json_out}")

    print(f"summary: {len(reports) - failures}/{len(reports)} passed")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
