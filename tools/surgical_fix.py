#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

CELL_SIZE = 96
GRID_SIZE = 6

def create_checkerboard(img_path, out_path):
    img = Image.open(img_path).convert('RGBA')
    preview = Image.new('RGBA', img.size, (255, 255, 255, 255))
    draw = ImageDraw.Draw(preview)
    colors = ((208, 208, 208, 255), (160, 160, 160, 255))
    for y in range(0, img.height, 24):
        for x in range(0, img.width, 24):
            color = colors[(x // 24 + y // 24) % 2]
            draw.rectangle((x, y, min(img.width, x + 24), min(img.height, y + 24)), fill=color)
    preview.alpha_composite(img)
    draw = ImageDraw.Draw(preview)
    for col in range(1, GRID_SIZE):
        draw.line([(col * CELL_SIZE, 0), (col * CELL_SIZE, img.height)], fill=(255, 0, 0, 255), width=3)
    for row in range(1, GRID_SIZE):
        draw.line([(0, row * CELL_SIZE), (img.width, row * CELL_SIZE)], fill=(255, 0, 0, 255), width=3)
    for i in range(3):
        draw.rectangle([(i, i), (img.width - 1 - i, img.height - 1 - i)], outline=(255, 0, 0, 255))
    preview.save(out_path, format='PNG', optimize=True)

def get_cell(sheet, col, row):
    x, y = col * CELL_SIZE, row * CELL_SIZE
    return sheet.crop((x, y, x + CELL_SIZE, y + CELL_SIZE))

def put_cell(sheet, cell, col, row):
    sheet.paste(cell, (col * CELL_SIZE, row * CELL_SIZE))

def trim_cell(cell, left=0, right=0, top=0, bottom=0, foot_y=83):
    bbox = cell.getchannel('A').point(lambda x: 255 if x > 10 else 0).getbbox()
    if not bbox:
        return cell
    x0, y0, x1, y1 = bbox
    sprite = cell.crop((x0 + left, y0 + top, x1 - right, y1 - bottom))
    new_cell = Image.new('RGBA', (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
    sw, sh = sprite.size
    x_off = (CELL_SIZE - sw) // 2
    y_off = foot_y - sh
    new_cell.alpha_composite(sprite, (x_off, max(0, y_off)))
    return new_cell

def shrink_cell(cell, target_w, foot_y=83):
    bbox = cell.getchannel('A').point(lambda x: 255 if x > 10 else 0).getbbox()
    if not bbox:
        return cell
    x0, y0, x1, y1 = bbox
    sprite = cell.crop(bbox)
    sw, sh = sprite.size
    scale = (target_w - 8) / sw if sw > target_w - 8 else 1.0
    if scale < 1.0:
        nw, nh = max(1, int(sw * scale)), max(1, int(sh * scale))
        sprite = sprite.resize((nw, nh), Image.Resampling.LANCZOS)
        sw, sh = nw, nh
    new_cell = Image.new('RGBA', (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
    x_off = (CELL_SIZE - sw) // 2
    y_off = foot_y - sh
    new_cell.alpha_composite(sprite, (x_off, max(0, y_off)))
    return new_cell

def shift_cell(cell, shift_x):
    bbox = cell.getchannel('A').point(lambda x: 255 if x > 10 else 0).getbbox()
    if not bbox:
        return cell
    x0, y0, x1, y1 = bbox
    sprite = cell.crop(bbox)
    new_cell = Image.new('RGBA', (CELL_SIZE, CELL_SIZE), (0, 0, 0, 0))
    new_cell.alpha_composite(sprite, (x0 + shift_x, y0))
    return new_cell

# Fix cyclopsis
path = Path("assets/monsters/0_2_cyclopsis/0_2_cyclopsis-spritesheet-game.png")
backup = path.parent / f"{path.stem}-ORIGINAL-backup.png"
sheet = Image.open(backup).convert('RGBA')
cell = get_cell(sheet, 3, 2)
fixed = trim_cell(cell, left=4, right=4, foot_y=83)
put_cell(sheet, fixed, 3, 2)
sheet.save(path, format='PNG', optimize=True)
print("✓ cyclopsis attack col 3")

# Fix cutie
path = Path("assets/monsters/1_2_cutie/1_2_cutie-spritesheet-game.png")
backup = path.parent / f"{path.stem}-ORIGINAL-backup.png"
sheet = Image.open(backup).convert('RGBA')
cell = get_cell(sheet, 5, 5)
put_cell(sheet, shift_cell(cell, 4), 5, 5)
cell = get_cell(sheet, 1, 1)
put_cell(sheet, trim_cell(cell, right=4, foot_y=84), 1, 1)
cell = get_cell(sheet, 3, 1)
put_cell(sheet, trim_cell(cell, right=4, foot_y=84), 3, 1)
cell = get_cell(sheet, 3, 2)
put_cell(sheet, shrink_cell(cell, 87, foot_y=84), 3, 2)
sheet.save(path, format='PNG', optimize=True)
print("✓ cutie (faint col 5, walk col 1&3, attack col 3)")

# Fix unnyangsam
path = Path("assets/monsters/2_2_unnyangsam/2_2_unnyangsam-spritesheet-game.png")
backup = path.parent / f"{path.stem}-ORIGINAL-backup.png"
sheet = Image.open(backup).convert('RGBA')
cell = get_cell(sheet, 3, 2)
put_cell(sheet, trim_cell(cell, right=4, foot_y=83), 3, 2)
cell = get_cell(sheet, 5, 4)
put_cell(sheet, shrink_cell(cell, 88, foot_y=83), 5, 4)
cell = get_cell(sheet, 5, 5)
put_cell(sheet, shrink_cell(cell, 88, foot_y=83), 5, 5)
sheet.save(path, format='PNG', optimize=True)
print("✓ unnyangsam (attack col 3, hit col 5, faint col 5)")

# Regenerate AFTER previews
for name in ["0_2_cyclopsis", "1_2_cutie", "2_2_unnyangsam"]:
    path = Path(f"assets/monsters/{name}/{name}-spritesheet-game.png")
    after = path.parent / f"{path.stem}-AFTER-checker-preview.png"
    create_checkerboard(path, after)
    print(f"→ {name} AFTER preview")

print("\nFixed 3 sheets surgically. Untouched: cyclopse, lovelydoll, unnyangi")
