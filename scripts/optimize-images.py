"""Generate WebP delivery copies for every image currently used by the site.

Original source images remain untouched in public/images. Optimized copies are
written to public/images/optimized with the same folder structure.
"""

from pathlib import Path
import re

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "main.jsx"
IMAGE_ROOT = ROOT / "public" / "images"
OUTPUT_ROOT = IMAGE_ROOT / "optimized"
PATTERN = re.compile(r"\$\{A\}([^`\"}]+?\.(?:png|jpe?g))", re.IGNORECASE)
MAX_EDGE = 1600


def has_alpha(image: Image.Image) -> bool:
    if image.mode in {"RGBA", "LA"}:
        return True
    return image.mode == "P" and "transparency" in image.info


def main() -> None:
    source = SOURCE.read_text(encoding="utf-8")
    paths = sorted(set(PATTERN.findall(source)))
    for relative in paths:
        origin = IMAGE_ROOT / relative
        if not origin.exists():
            print(f"Skip missing file: {relative}")
            continue

        target = (OUTPUT_ROOT / relative).with_suffix(".webp")
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(origin) as opened:
            image = ImageOps.exif_transpose(opened)
            image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
            if has_alpha(image):
                image.convert("RGBA").save(target, "WEBP", lossless=True, method=6)
            else:
                image.convert("RGB").save(target, "WEBP", quality=82, method=6)
        print(f"Optimized: {relative}")


if __name__ == "__main__":
    main()
