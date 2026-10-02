"""Optimize the three user-supplied project images for portfolio cards.

Usage: python scripts/prepare_project_images.py QCmed.png Archivefy.png Qundis.jpg
"""

from pathlib import Path
import sys

from PIL import Image, ImageOps


if len(sys.argv) != 4:
    raise SystemExit(__doc__)

assets = Path(__file__).resolve().parents[1] / "src" / "assets"
images = (
    (Path(sys.argv[1]), "qcmed-app.webp", (1210, 680), 84),
    (Path(sys.argv[2]), "archivefy-mobile.webp", (400, 430), 86),
    (Path(sys.argv[3]), "qundis-mobile.webp", (1200, 675), 84),
)

for source, filename, maximum_size, quality in images:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image.thumbnail(maximum_size, Image.Resampling.LANCZOS)
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        destination = assets / filename
        image.save(destination, "WEBP", quality=quality, method=6)
        print(f"{source.name} -> {destination.name}: {image.width}x{image.height}, {destination.stat().st_size:,} bytes")
