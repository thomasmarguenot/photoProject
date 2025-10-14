import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { containerVariants, itemVariants } from '../galleryAnimations';
import type { GalleryGridProps } from './GalleryGrid.types';

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        gutterBreakPoints={{ 350: '12px', 750: '24px', 900: '56px' }}
      >
        <Masonry gutter="120px">
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
