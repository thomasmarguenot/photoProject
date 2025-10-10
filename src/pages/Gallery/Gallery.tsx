import { motion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

import './Gallery.css';

interface ImageData {
  src: string;
  alt: string;
}

export function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    // Dynamically import all images from the pictures folder
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}'
    );

    const loadImages = async () => {
      const imagePromises = Object.entries(imageModules).map(
        async ([path, importFunc]) => {
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
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
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
    </div>
  );
}
