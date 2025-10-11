# Image Optimization Guide

## Overview

This project includes **automatic image optimization** to ensure fast loading times without sacrificing visual quality. Images are optimized during the build process and can also be manually optimized using a dedicated script.

---

## 🚀 Automatic Optimization (Production Build)

All images are **automatically optimized** when you run `pnpm build`.

### What happens:
- **Compression**: Images are compressed to 85% quality (imperceptible loss)
- **Format conversion**: Modern formats (WebP, AVIF) are generated
- **Size reduction**: Typically 50-80% smaller file sizes
- **Quality preservation**: Visual quality remains excellent

### Configuration

The optimization is handled by `vite-plugin-image-optimizer` in `vite.config.ts`:

```typescript
ViteImageOptimizer({
  png: { quality: 85 },
  jpeg: { quality: 85 },
  jpg: { quality: 85 },
  webp: { quality: 85 },
  avif: { quality: 85 },
})
```

**No action needed** - just run `pnpm build` and images are optimized!

---

## 🛠️ Manual Optimization (Existing Images)

To optimize images already in your project (like in `src/assets/pictures/`), use the optimization script:

```bash
pnpm optimize-images
```

### What the script does:

1. ✅ **Backs up originals**: Original files saved as `.original`
2. ✅ **Resizes large images**: Max width 2000px (keeps aspect ratio)
3. ✅ **Compresses**: 85% quality (visually lossless)
4. ✅ **Creates WebP versions**: 30-50% smaller than JPEG/PNG
5. ✅ **Shows statistics**: Before/after comparison

### Example output:

```
🎨 Image Optimization Script

📁 Directory: /src/assets/pictures/

⚙️  Settings:
   - Max width: 2000px
   - Quality: 85%
   - Formats: Original + WebP
────────────────────────────────────────────────────────────

📊 Found 43 images to optimize

📸 Processing: photo1.JPG
   Original size: 8.45 MB
   Dimensions: 4032x3024px
   ✅ Backup created: photo1.JPG.original
   🔄 Resizing to max 2000px width
   ✅ Optimized size: 1.23 MB
   💾 Saved: 85.4% reduction
   🚀 WebP created: 0.87 MB (89.7% reduction)

═══════════════════════════════════════════════════════════
📊 OPTIMIZATION SUMMARY
═══════════════════════════════════════════════════════════

✅ Processed: 43 images

📦 Total original size: 356.78 MB
📦 Total optimized size: 52.34 MB
📦 Total WebP size: 31.89 MB

💾 Average reduction: 85.3%
🚀 Average WebP reduction: 91.1%

💡 Tip: Use WebP images in production for best performance!
💡 Original files backed up with .original extension
```

---

## 📋 Best Practices

### 1. **Use WebP for modern browsers**

WebP offers the best quality-to-size ratio. Update your Gallery component to prefer WebP:

```tsx
<picture>
  <source srcSet={image.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
  <img src={image.src} alt={image.alt} />
</picture>
```

### 2. **Optimize before committing**

Run `pnpm optimize-images` on new images before adding them to git:

```bash
# Add new images to src/assets/pictures/
pnpm optimize-images

# Remove .original files (or keep as backup)
rm src/assets/pictures/*.original

# Commit optimized images
git add src/assets/pictures/
git commit -m "feat: add optimized gallery images"
```

### 3. **Ideal image specifications**

- **Max width**: 2000px (sufficient for 4K displays)
- **Format**: WebP for web, JPEG/PNG as fallback
- **Quality**: 85% (sweet spot for quality/size)
- **File size**: < 500KB per image (after optimization)

### 4. **Responsive images**

For different screen sizes, create multiple versions:

```tsx
<img
  src={image.src}
  srcSet={`
    ${image.src.replace('.jpg', '-small.jpg')} 640w,
    ${image.src.replace('.jpg', '-medium.jpg')} 1280w,
    ${image.src} 2000w
  `}
  sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 2000px"
  alt={image.alt}
/>
```

---

## 🔧 Manual Optimization Tools

If you prefer manual optimization, these tools are excellent:

### Desktop Apps
- **[ImageOptim](https://imageoptim.com/)** (Mac, free)
  - Drag & drop interface
  - Lossy and lossless compression
  - Supports all formats

- **[Squoosh](https://squoosh.app/)** (Web, free)
  - Google's web-based tool
  - Real-time preview
  - Compare formats side-by-side

### Online Services
- **[TinyPNG](https://tinypng.com/)** (free for < 20 images)
- **[Compressor.io](https://compressor.io/)** (free)
- **[Optimizilla](https://imagecompressor.com/)** (free)

---

## 📊 Optimization Script Details

### Script location
```
scripts/optimize-images.js
```

### Customization

Edit the script to change settings:

```javascript
const MAX_WIDTH = 2000;  // Maximum width in pixels
const QUALITY = 85;      // Quality (0-100)
```

### Supported formats
- JPEG / JPG (`.jpg`, `.jpeg`, `.JPG`, `.JPEG`)
- PNG (`.png`, `.PNG`)
- WebP output is always generated

### What it does NOT do
- ❌ Delete original files (they're backed up)
- ❌ Modify file names
- ❌ Convert to AVIF (only WebP)

---

## 🎯 Optimization Results

### Typical reductions:
- **JPEG**: 70-85% size reduction
- **PNG**: 60-80% size reduction
- **WebP**: 85-95% size reduction vs original

### Quality comparison:
- **90-100%**: Overkill, huge files, minimal visual improvement
- **85%**: ⭐ Sweet spot - excellent quality, great compression
- **70-80%**: Good quality, smaller files, may show artifacts
- **< 70%**: Noticeable quality loss

---

## 🚨 Troubleshooting

### Images not optimizing during build

Make sure `vite-plugin-image-optimizer` is in your `vite.config.ts`:

```typescript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    // ... other plugins
    ViteImageOptimizer({ /* config */ }),
  ],
});
```

### Script fails with "sharp" error

Install sharp dependencies:

```bash
pnpm install -D sharp
```

### Out of memory errors

Reduce the number of images processed at once or increase Node.js memory:

```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm optimize-images
```

---

## 📚 Additional Resources

- [Web.dev - Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP Format Guide](https://developers.google.com/speed/webp)
- [AVIF Format Guide](https://jakearchibald.com/2020/avif-has-landed/)

---

## 🎨 Summary

1. **Build**: Images optimized automatically with `pnpm build`
2. **Manual**: Run `pnpm optimize-images` for existing images
3. **Format**: WebP is 30-50% smaller than JPEG/PNG
4. **Quality**: 85% quality is the sweet spot
5. **Size**: Aim for < 500KB per optimized image

**Result**: Fast-loading gallery with beautiful, high-quality images! 🚀
