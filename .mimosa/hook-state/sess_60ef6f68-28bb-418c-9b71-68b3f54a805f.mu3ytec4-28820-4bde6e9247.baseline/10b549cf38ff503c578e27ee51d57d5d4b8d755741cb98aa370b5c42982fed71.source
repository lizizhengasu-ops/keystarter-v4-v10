#!/usr/bin/env python3
"""Generate -320w/-640w webp variants for product card images (PSI phase 1).

Reads slug->image map from src/data/product-images.ts, emits width variants
next to the originals under public/assets/images/. Originals are never
modified. Idempotent: existing variants with same size are skipped.
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MAP_FILE = ROOT / "src" / "data" / "product-images.ts"
IMG_DIR = ROOT / "public" / "assets" / "images"
WIDTHS = (320, 640)


def image_paths():
    text = MAP_FILE.read_text(encoding="utf-8")
    return sorted(set(re.findall(r'"(/assets/images/[^"]+)"', text)))


def main():
    if not IMG_DIR.exists():
        sys.exit(f"missing {IMG_DIR}")
    made = skipped = missing = 0
    manifest = {}
    for rel in image_paths():
        src = ROOT / "public" / rel.lstrip("/")
        if not src.exists():
            print(f"MISS {rel}")
            missing += 1
            continue
        widths = []
        with Image.open(src) as probe:
            w, _ = probe.size
        for target in WIDTHS:
            if w <= target:
                continue  # original not wider than variant: useless
            out = src.with_name(f"{src.stem}-{target}w.webp")
            if not out.exists():
                with Image.open(src) as im:
                    h = round(im.height * target / im.width)
                    resized = im.resize((target, h), Image.LANCZOS)
                    resized.save(out, "WEBP", quality=82, method=6)
                made += 1
                print(f"OK   {out.name} {target}x{h}")
            else:
                skipped += 1
            widths.append(target)
        if widths:
            manifest[rel] = widths
    out_json = ROOT / "src" / "data" / "image-variants.json"
    out_json.write_text(
        "{\n" + ",\n".join(f'  "{k}": {v}' for k, v in sorted(manifest.items())) + "\n}\n",
        encoding="utf-8",
    )
    print(f"DONE made={made} skipped={skipped} missing={missing} manifest={out_json.name}")


if __name__ == "__main__":
    main()
