import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { containerVariants, itemVariants } from '../galleryAnimations';
import type { GalleryGridProps } from './GalleryGrid.types';

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
        <Masonry gutter="48px">
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
        </Masonry>
      </ResponsiveMasonry>
    </motion.div>
  );
}
