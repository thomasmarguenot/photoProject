import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { containerVariants, itemVariants } from '../galleryAnimations';
import type { GalleryGridProps } from './GalleryGrid.types';

export function GalleryGrid({
  images,
  onImageClick,
  selectedIndex,
  isLightboxOpen,
  shouldExpand,
}: GalleryGridProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (
      selectedIndex !== null &&
      shouldExpand &&
      itemRefs.current[selectedIndex]
    ) {
      const element = itemRefs.current[selectedIndex];
      const rect = element.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const currentCenterX = rect.left + rect.width / 2;
      const currentCenterY = rect.top + rect.height / 2;

      setCenterOffset({
        x: centerX - currentCenterX,
        y: centerY - currentCenterY,
      });
    }
  }, [selectedIndex, shouldExpand]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        gutterBreakPoints={{ 350: '12px', 750: '24px', 900: '36px' }}
      >
        <Masonry gutter="1.5rem" columnsCount={3}>
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            const shouldHide = isLightboxOpen && !isSelected;
            const offset =
              isSelected && shouldExpand ? centerOffset : { x: 0, y: 0 };

            return (
              <motion.div
                key={`${image.src}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="gallery-item"
                variants={itemVariants}
                initial="visible"
                animate={
                  shouldHide
                    ? 'hidden'
                    : isSelected && shouldExpand
                      ? {
                          opacity: 1,
                          scale: 3,
                          x: offset.x,
                          y: offset.y,
                          zIndex: 150,
                        }
                      : 'visible'
                }
                onClick={() => !isLightboxOpen && onImageClick(index)}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{
                  pointerEvents: shouldHide ? 'none' : 'auto',
                }}
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
        </Masonry>
      </ResponsiveMasonry>
    </motion.div>
  );
}
