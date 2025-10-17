# Pictures Directory

This directory contains images for the Gallery page.

## Usage

Place your images here in the following formats:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.avif`

The Gallery component will automatically detect and display all images in this folder.

## Important

⚠️ **This directory is ignored by Git** (configured in `.gitignore`)

Images placed here will NOT be committed to the repository to avoid:
- Large repository size
- Slow git operations
- Unnecessary bandwidth usage

## For Development

If you're working on this project, add your own images to this folder for testing the Gallery page locally.

## Recommended Image Sizes

For optimal performance:
- Width: 800-1200px
- Format: WebP or AVIF (smaller file size)
- Compression: 80-90% quality

## Example Structure

```
pictures/
├── photo-1.jpg
├── photo-2.webp
├── photo-3.avif
└── ...
```
