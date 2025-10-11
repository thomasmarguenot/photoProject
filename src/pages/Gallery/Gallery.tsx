import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

import type { ImageData, ImageFormat } from './Gallery.types';
import './Gallery.css';

export function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    // Dynamically import all images from the pictures folder
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}'
    );

    const loadImages = async () => {
      // Filter out .original files and deduplicate by base filename
      const imageMap = new Map<
        string,
        { path: string; importFunc: () => Promise<{ default: string }> }
      >();

      Object.entries(imageModules).forEach(([path, importFunc]) => {
        // Skip .original files
        if (path.includes('.original')) {
          return;
        }

        const fileName = path.split('/').pop() || '';
        const baseName = fileName.split('.')[0];
        const extension = fileName.split('.').pop()?.toLowerCase();

        // Prefer webp over other formats
        const existingEntry = imageMap.get(baseName);
        if (!existingEntry || extension === 'webp') {
          imageMap.set(baseName, { path, importFunc });
        }
      });

      const imagePromises = Array.from(imageMap.values()).map(
        async ({ path, importFunc }) => {
          const module = await importFunc();
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' '),
          };
        }
      );

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage !== null) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  // Determine image format based on index for alternating pattern
  const getImageFormat = (index: number): ImageFormat => {
    const patterns: ImageFormat[] = [
      'portrait',
      'landscape',
      'landscape',
      'portrait',
      'large',
      'landscape',
      'portrait',
      'landscape',
    ];
    return patterns[index % patterns.length];
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
        <motion.header
          className="gallery-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="gallery-title">Photo Gallery</h1>
          <p className="gallery-subtitle">
            A modern masonry layout showcasing beautiful photography
          </p>
        </motion.header>

        {images.length === 0 ? (
          <div className="gallery-empty">
            <p>No images found. Add images to src/assets/pictures/</p>
          </div>
        ) : (
          <motion.div
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {images.map((image, index) => {
              const format = getImageFormat(index);
              return (
                <motion.div
                  key={index}
                  className={`gallery-item ${format}`}
                  variants={itemVariants}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedImage}
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="lightbox-image"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
