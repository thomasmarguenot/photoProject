import { motion } from 'framer-motion';

import { containerVariants, itemVariants } from '../galleryAnimations';
import type { GalleryGridProps } from './GalleryGrid.types';

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
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
          onClick={() => onImageClick(index)}
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
  );
}
