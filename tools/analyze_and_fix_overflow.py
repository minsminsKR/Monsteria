#!/usr/bin/env python3
"""Analyze and fix spritesheet cell overflow issues."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Tuple

try:
    from PIL import Image, ImageDraw
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Install it with: python -m pip install Pillow"
    ) from exc


CELL_SIZE = 96
GRID_SIZE = 6
SHEET_SIZE = CELL_SIZE * GRID_SIZE  # 576


def create_checkerboard_preview(
    image_path: Path, 
    output_path: Path,
    cell_size: int = CELL_SIZE,
    checker_size: int = 24
) -> None:
    """Create a checkerboard preview with grid lines to show cell boundaries."""
    img = Image.open(image_path).convert('RGBA')
    
    # Create checkerboard background
    preview = Image.new('RGBA', img.size, (255, 255, 255, 255))
    draw = ImageDraw.Draw(preview)
    
    # Draw checkerboard
    colors = ((208, 208, 208, 255), (160, 160, 160, 255))
    for y in range(0, img.height, checker_size):
        for x in range(0, img.width, checker_size):
            color = colors[(x // checker_size + y // checker_size) % 2]
            draw.rectangle(
                (x, y, min(img.width, x + checker_size), min(img.height, y + checker_size)),
                fill=color
            )
    
    # Composite the sprite sheet
    preview.alpha_composite(img)
    
    # Draw grid lines to show cell boundaries (RED for visibility)
    draw = ImageDraw.Draw(preview)
    grid_color = (255, 0, 0, 255)  # Red
    line_width = 2
    
    # Vertical lines
    for col in range(1, GRID_SIZE):
        x = col * cell_size
        draw.line([(x, 0), (x, img.height)], fill=grid_color, width=line_width)
    
    # Horizontal lines
    for row in range(1, GRID_SIZE):
        y = row * cell_size
        draw.line([(0, y), (img.width, y)], fill=grid_color, width=line_width)
    
    # Draw border
    draw.rectangle([(0, 0), (img.width - 1, img.height - 1)], outline=grid_color, width=line_width)
    
    preview.save(output_path, format='PNG', optimize=True)
    print(f"Created preview: {output_path}")


def analyze_cell_content(img: Image.Image, col: int, row: int) -> Tuple[int, int, int, int, bool]:
    """
    Analyze a single cell to find its content bounds.
    Returns (x0, y0, x1, y1, has_content) where coordinates are relative to the cell.
    """
    x_start = col * CELL_SIZE
    y_start = row * CELL_SIZE
    
    cell = img.crop((x_start, y_start, x_start + CELL_SIZE, y_start + CELL_SIZE))
    
    # Get alpha channel
    if cell.mode != 'RGBA':
        cell = cell.convert('RGBA')
    
    alpha = cell.getchannel('A')
    
    # Find bounding box of non-transparent pixels (threshold > 10 for real content)
    bbox = alpha.point(lambda x: 255 if x > 10 else 0).getbbox()
    
    if bbox is None:
        return (0, 0, 0, 0, False)
    
    return (*bbox, True)


def check_overflow(image_path: Path) -> dict:
    """Check each cell for content that would overflow visually."""
    img = Image.open(image_path).convert('RGBA')
    
    if img.size != (SHEET_SIZE, SHEET_SIZE):
        print(f"Warning: {image_path.name} is {img.size}, expected {SHEET_SIZE}x{SHEET_SIZE}")
        return {}
    
    results = {
        'path': image_path,
        'cells': {},
        'has_overflow': False
    }
    
    row_names = ['idle', 'walk', 'attack', 'skill', 'hit', 'faint']
    
    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            x0, y0, x1, y1, has_content = analyze_cell_content(img, col, row)
            
            if not has_content:
                continue
            
            # Check if content fits comfortably in cell (with some padding margin)
            padding_needed = 2  # pixels of padding at edges
            overflow = False
            overflow_details = []
            
            if x0 < padding_needed:
                overflow = True
                overflow_details.append(f"left edge (x0={x0})")
            if y0 < padding_needed:
                overflow = True
                overflow_details.append(f"top edge (y0={y0})")
            if x1 > CELL_SIZE - padding_needed:
                overflow = True
                overflow_details.append(f"right edge (x1={x1}, exceeds {CELL_SIZE - padding_needed})")
            if y1 > CELL_SIZE - padding_needed:
                overflow = True
                overflow_details.append(f"bottom edge (y1={y1}, exceeds {CELL_SIZE - padding_needed})")
            
            cell_key = f"{row_names[row]}_frame{col}"
            results['cells'][cell_key] = {
                'bounds': (x0, y0, x1, y1),
                'overflow': overflow,
                'details': overflow_details
            }
            
            if overflow:
                results['has_overflow'] = True
    
    return results


def fix_spritesheet(source_path: Path, output_path: Path, padding: int = 8) -> None:
    """
    Fix spritesheet by ensuring all content fits within cells with padding.
    Maintains foot position alignment within rows.
    """
    img = Image.open(source_path).convert('RGBA')
    
    if img.size != (SHEET_SIZE, SHEET_SIZE):
        print(f"Error: {source_path.name} is not {SHEET_SIZE}x{SHEET_SIZE}")
        return
    
    fixed = Image.new('RGBA', (SHEET_SIZE, SHEET_SIZE), (0, 0, 0, 0))
    
    row_names = ['idle', 'walk', 'attack', 'skill', 'hit', 'faint']
    
    # Process each row to maintain consistent foot position
    for row in range(GRID_SIZE):
        row_cells = []
        
        # Extract all cells in this row
        for col in range(GRID_SIZE):
            x_start = col * CELL_SIZE
            y_start = row * CELL_SIZE
            cell = img.crop((x_start, y_start, x_start + CELL_SIZE, y_start + CELL_SIZE))
            row_cells.append(cell)
        
        # Find the maximum bottom position across all frames in this row
        # (to align all feet at the same level)
        row_bottom_positions = []
        for cell in row_cells:
            alpha = cell.getchannel('A')
            bbox = alpha.point(lambda x: 255 if x > 10 else 0).getbbox()
            if bbox:
                row_bottom_positions.append(bbox[3])  # y1
        
        if not row_bottom_positions:
            continue
        
        # Use consistent bottom position for all frames in the row
        target_bottom = CELL_SIZE - padding
        
        # Process each cell in the row
        for col, cell in enumerate(row_cells):
            alpha = cell.getchannel('A')
            bbox = alpha.point(lambda x: 255 if x > 10 else 0).getbbox()
            
            if bbox is None:
                # Empty cell, paste as is
                fixed.paste(cell, (col * CELL_SIZE, row * CELL_SIZE))
                continue
            
            x0, y0, x1, y1 = bbox
            sprite_width = x1 - x0
            sprite_height = y1 - y0
            
            # Calculate maximum size that fits in cell with padding
            max_width = CELL_SIZE - 2 * padding
            max_height = CELL_SIZE - 2 * padding
            
            # Crop the sprite content
            sprite = cell.crop(bbox)
            
            # Scale down if needed to fit in cell
            scale = min(1.0, max_width / sprite_width, max_height / sprite_height)
            if scale < 1.0:
                new_width = max(1, int(sprite_width * scale))
                new_height = max(1, int(sprite_height * scale))
                
                # Resize with proper alpha handling
                sprite = sprite.resize((new_width, new_height), Image.Resampling.LANCZOS)
                sprite_width = new_width
                sprite_height = new_height
            
            # Position sprite in cell
            # Center horizontally
            x_offset = (CELL_SIZE - sprite_width) // 2
            # Align bottom with target_bottom
            y_offset = target_bottom - sprite_height
            
            # Create cell with sprite positioned correctly
            new_cell = Image.new('RGBA', (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
            new_cell.alpha_composite(sprite, (x_offset, y_offset))
            
            # Paste into final image
            fixed.paste(new_cell, (col * CELL_SIZE, row * CELL_SIZE))
        
        print(f"Fixed row {row} ({row_names[row]})")
    
    fixed.save(output_path, format='PNG', optimize=True)
    print(f"Saved fixed spritesheet: {output_path}")


def main():
    workspace = Path(__file__).parent.parent
    monsters_dir = workspace / "assets" / "monsters"
    
    # Find all game spritesheets
    game_sheets = list(monsters_dir.glob("*/*-spritesheet-game.png"))
    
    if not game_sheets:
        print("No game spritesheets found!")
        return 1
    
    print(f"Found {len(game_sheets)} game spritesheets\n")
    
    # Create before previews and analyze
    print("=" * 60)
    print("CREATING BEFORE PREVIEWS AND ANALYZING OVERFLOW")
    print("=" * 60)
    
    sheets_with_overflow = []
    
    for sheet_path in sorted(game_sheets):
        print(f"\n{sheet_path.name}")
        print("-" * 60)
        
        # Create BEFORE preview
        before_preview = sheet_path.parent / f"{sheet_path.stem}-BEFORE-checker-preview.png"
        create_checkerboard_preview(sheet_path, before_preview)
        
        # Analyze overflow
        analysis = check_overflow(sheet_path)
        
        if analysis.get('has_overflow'):
            sheets_with_overflow.append(sheet_path)
            print(f"⚠️  OVERFLOW DETECTED!")
            for cell_key, cell_data in analysis['cells'].items():
                if cell_data['overflow']:
                    print(f"  {cell_key}: {', '.join(cell_data['details'])}")
        else:
            # Check visually - if any content is close to edges
            img = Image.open(sheet_path).convert('RGBA')
            close_to_edge = False
            for row in range(GRID_SIZE):
                for col in range(GRID_SIZE):
                    x0, y0, x1, y1, has_content = analyze_cell_content(img, col, row)
                    if has_content:
                        if x0 < 5 or y0 < 5 or x1 > CELL_SIZE - 5 or y1 > CELL_SIZE - 5:
                            close_to_edge = True
                            break
                if close_to_edge:
                    break
            
            if close_to_edge:
                sheets_with_overflow.append(sheet_path)
                print(f"⚠️  Content very close to cell edges - will fix for safety")
            else:
                print(f"✓ No obvious overflow")
    
    # Fix spritesheets
    if sheets_with_overflow:
        print("\n" + "=" * 60)
        print("FIXING SPRITESHEETS")
        print("=" * 60)
        
        for sheet_path in sheets_with_overflow:
            print(f"\n{sheet_path.name}")
            print("-" * 60)
            
            # Backup original
            backup_path = sheet_path.parent / f"{sheet_path.stem}-ORIGINAL-backup.png"
            if not backup_path.exists():
                img = Image.open(sheet_path)
                img.save(backup_path)
                print(f"Backed up original to: {backup_path.name}")
            
            # Fix the spritesheet
            fix_spritesheet(sheet_path, sheet_path, padding=8)
            
            # Create AFTER preview
            after_preview = sheet_path.parent / f"{sheet_path.stem}-AFTER-checker-preview.png"
            create_checkerboard_preview(sheet_path, after_preview)
            
            print(f"Created AFTER preview: {after_preview.name}")
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total spritesheets: {len(game_sheets)}")
    print(f"Fixed: {len(sheets_with_overflow)}")
    print(f"No changes needed: {len(game_sheets) - len(sheets_with_overflow)}")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
