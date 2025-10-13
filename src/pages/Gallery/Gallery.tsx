import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

import type { ImageData, ImageFormat } from './Gallery.types';
import './Gallery.css';

export function Gallery() {
  const [images, setImages] = useState<(ImageData & { format: ImageFormat })[]>(
    []
  );
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    // Dynamically import images from landscape and portrait folders
    const landscapeModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/landscape/*.webp'
    );
    const portraitModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/portrait/*.webp'
    );

    const loadImages = async () => {
      // Load landscape images
      const landscapePromises = Object.entries(landscapeModules).map(
        async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' '),
            format: 'landscape' as ImageFormat,
          };
        }
      );

      // Load portrait images
      const portraitPromises = Object.entries(portraitModules).map(
        async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' '),
            format: 'portrait' as ImageFormat,
          };
        }
      );

      const [landscapeImages, portraitImages] = await Promise.all([
        Promise.all(landscapePromises),
        Promise.all(portraitPromises),
      ]);

      // Mix landscape and portrait images for visual variety
      const mixedImages: (ImageData & { format: ImageFormat })[] = [];
      let landscapeIndex = 0;
      let portraitIndex = 0;

      // Alternate between landscape and portrait with some variation
      while (
        landscapeIndex < landscapeImages.length ||
        portraitIndex < portraitImages.length
      ) {
        // Add 1-2 landscape images
        for (let i = 0; i < 2 && landscapeIndex < landscapeImages.length; i++) {
          mixedImages.push(landscapeImages[landscapeIndex++]);
        }
        // Add 1 portrait image
        if (portraitIndex < portraitImages.length) {
          mixedImages.push(portraitImages[portraitIndex++]);
        }
      }

      setImages(mixedImages);
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
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
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`gallery-item ${image.format}`}
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
            ))}
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
                className={`lightbox-image ${images[selectedImage].format}`}
                initial={{
                  opacity: 0,
                  rotate: images[selectedImage].format === 'portrait' ? -90 : 0,
                }}
                animate={{
                  opacity: 1,
                  rotate: images[selectedImage].format === 'portrait' ? -90 : 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: images[selectedImage].format === 'portrait' ? -90 : 0,
                }}
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
