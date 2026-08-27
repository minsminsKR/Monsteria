#!/usr/bin/env python3
"""Aggressively fix ALL spritesheets."""
from pathlib import Path
from PIL import Image, ImageDraw

CELL_SIZE = 96
GRID_SIZE = 6
SHEET_SIZE = 576

def create_checkerboard_preview(image_path, output_path):
    img = Image.open(image_path).convert('RGBA')
    preview = Image.new('RGBA', img.size, (255, 255, 255, 255))
    draw = ImageDraw.Draw(preview)
    colors = ((208, 208, 208, 255), (160, 160, 160, 255))
    for y in range(0, img.height, 24):
        for x in range(0, img.width, 24):
            color = colors[(x // 24 + y // 24) % 2]
            draw.rectangle((x, y, min(img.width, x + 24), min(img.height, y + 24)), fill=color)
    preview.alpha_composite(img)
    draw = ImageDraw.Draw(preview)
    grid_color = (255, 0, 0, 255)
    for col in range(1, GRID_SIZE):
        x = col * CELL_SIZE
        draw.line([(x, 0), (x, img.height)], fill=grid_color, width=3)
    for row in range(1, GRID_SIZE):
        y = row * CELL_SIZE
        draw.line([(0, y), (img.width, y)], fill=grid_color, width=3)
    for i in range(3):
        draw.rectangle([(i, i), (img.width - 1 - i, img.height - 1 - i)], outline=grid_color)
    preview.save(output_path, format='PNG', optimize=True)

def fix_spritesheet(source_path, output_path, padding=10):
    img = Image.open(source_path).convert('RGBA')
    fixed = Image.new('RGBA', (SHEET_SIZE, SHEET_SIZE), (0, 0, 0, 0))
    
    for row in range(GRID_SIZE):
        row_cells = []
        row_bboxes = []
        for col in range(GRID_SIZE):
            cell = img.crop((col * CELL_SIZE, row * CELL_SIZE, (col + 1) * CELL_SIZE, (row + 1) * CELL_SIZE))
            bbox = cell.getchannel('A').point(lambda x: 255 if x > 10 else 0).getbbox()
            row_cells.append(cell)
            row_bboxes.append(bbox)
        
        max_bottom = max((b[3] for b in row_bboxes if b), default=0)
        if max_bottom == 0:
            continue
        target_bottom = CELL_SIZE - padding
        
        for col, (cell, bbox) in enumerate(zip(row_cells, row_bboxes)):
            if not bbox:
                fixed.paste(cell, (col * CELL_SIZE, row * CELL_SIZE))
                continue
            
            sprite = cell.crop(bbox)
            sw, sh = sprite.size
            max_w = CELL_SIZE - 2 * padding
            max_h = CELL_SIZE - 2 * padding
            scale = min(1.0, max_w / sw, max_h / sh) * 0.95
            
            if scale < 1.0:
                nw = max(1, int(sw * scale))
                nh = max(1, int(sh * scale))
                sprite = sprite.resize((nw, nh), Image.Resampling.LANCZOS)
                sw, sh = nw, nh
            
            x_off = (CELL_SIZE - sw) // 2
            y_off = target_bottom - sh
            y_off = max(padding, min(y_off, CELL_SIZE - padding - sh))
            x_off = max(padding, min(x_off, CELL_SIZE - padding - sw))
            
            new_cell = Image.new('RGBA', (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
            new_cell.alpha_composite(sprite, (x_off, y_off))
            fixed.paste(new_cell, (col * CELL_SIZE, row * CELL_SIZE))
    
    fixed.save(output_path, format='PNG', optimize=True)

workspace = Path(__file__).parent.parent
game_sheets = [s for s in (workspace / "assets" / "monsters").glob("*/*-spritesheet-game.png") 
               if 'backup' not in s.name.lower() and 'BEFORE' not in s.name and 'AFTER' not in s.name]

print(f"Fixing {len(game_sheets)} spritesheets")
for sheet_path in sorted(game_sheets):
    print(f"\n{sheet_path.parent.name}: {sheet_path.name}")
    backup = sheet_path.parent / f"{sheet_path.stem}-ORIGINAL-backup.png"
    if not backup.exists():
        Image.open(sheet_path).save(backup)
        print("  → Backed up")
    fix_spritesheet(sheet_path, sheet_path, padding=10)
    print("  ✓ Fixed")
    after = sheet_path.parent / f"{sheet_path.stem}-AFTER-checker-preview.png"
    create_checkerboard_preview(sheet_path, after)
    before = sheet_path.parent / f"{sheet_path.stem}-BEFORE-checker-preview.png"
    if not before.exists():
        create_checkerboard_preview(backup, before)
    print("  → Previews created")
print(f"\nComplete! Fixed {len(game_sheets)} spritesheets.")
