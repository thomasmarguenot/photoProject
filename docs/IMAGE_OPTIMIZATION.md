# Image Pipeline

Gallery images go through three Node scripts (based on `sharp`). Nothing is optimized automatically at build time: `pnpm build` only regenerates the manifest.

```
src/assets/pictures/          pnpm optimize-images      (resize + WebP, .original backup)
        │
        ▼
public/images/                pnpm gallery:images       (copy + -600w/-1200w/-1800w variants)
        │
        ▼
src/assets/gallery-manifest.json   pnpm gallery:manifest  (also run by pnpm build)
        │
        ▼
Gallery (useGalleryImages → GalleryGrid srcSet, Lightbox EXIF)
```

## ➕ Adding photos

```bash
# 1. Drop the new photos in src/assets/pictures/ (JPEG, PNG or WebP)
pnpm optimize-images
pnpm gallery:images
pnpm gallery:manifest

# 2. Commit the photos, their variants and the manifest
git add src/assets/pictures public/images src/assets/gallery-manifest.json
```

The location shown in the gallery filter comes from the file name prefix: `japon_`, `marseille_`, `paris_` or `vietnam_` (default: Japon). To add a location, update `LOCATION_MAP` in `scripts/generate-gallery-manifest.js`.

## 1. `pnpm optimize-images`

`scripts/optimize-images.js`, applied to every new image in `src/assets/pictures/`:

1. Renames the source to `<file>.original` (backup).
2. Applies EXIF orientation (`.rotate()`), so Safari doesn't show portraits as landscape.
3. Resizes to **1800 px** wide maximum (`MAX_WIDTH`).
4. Writes the optimized image (JPEG with mozjpeg, PNG) and a `.webp` version, quality **95** (`QUALITY`).

Images that already have a backup are skipped: `photo.jpg.original` covers both `photo.jpg` and the derived `photo.webp`. Re-running the script only processes new photos, and never overwrites an original. To re-optimize a photo from its source, delete its optimized files and rename the `.original` back.

## 2. `pnpm gallery:images`

`scripts/generate-responsive-images.js`, for each `.webp` in `src/assets/pictures/`:

- generates `-600w`, `-1200w` and `-1800w` variants in `public/images/` (WebP, quality 80), skipping widths larger than the original;
- copies the full-size image to `public/images/`.

These widths must stay in sync with `GALLERY_IMAGE_SIZES` in `src/pages/Gallery/imageSources.ts`, used by both the grid and the lightbox.

## 3. `pnpm gallery:manifest`

`scripts/generate-gallery-manifest.js` reads `public/images/` and writes `src/assets/gallery-manifest.json`. Each entry holds:

- `src`, `width`, `height`, `location`;
- `exif` (camera, aperture, shutter speed, ISO, focal length), shown in the lightbox;
- `variants`: only the `-Nw.webp` files actually present on disk, so the `srcSet` never points to a missing file.

The script runs automatically before `tsc` and `vite build`.

## 🔄 `pnpm rotate-portraits <directory>`

`scripts/rotate-portraits.js` rotates every image in the given directory by 270°, in place. It's a one-off fix for photos whose pixels are stored sideways without an EXIF orientation tag. `optimize-images` already applies EXIF orientation, so this is rarely needed.

```bash
pnpm rotate-portraits path/to/sideways-photos
```

## 🚨 Troubleshooting

- **A photo doesn't show up in the gallery**: check that it is in `public/images/` (not only in `src/assets/pictures/`), then rerun `pnpm gallery:manifest`.
- **404 on a `-Nw.webp` file**: the manifest is out of date. Rerun `pnpm gallery:manifest`.
- **`sharp` error**: rerun `pnpm install` (sharp downloads a native binary for your platform).
