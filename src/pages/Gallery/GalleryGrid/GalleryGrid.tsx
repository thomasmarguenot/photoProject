import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  containerVariants,
  itemVariants,
} from '../galleryAnimations';
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
    <motion.div
      className="gallery-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((image, index) => {
        const isSelected = index === selectedIndex;
        const shouldHide = isLightboxOpen && !isSelected;
        const offset =
          isSelected && shouldExpand ? centerOffset : { x: 0, y: 0 };

        // Calculate appropriate scale based on image orientation
        // Portrait: height > width (use smaller scale to fit screen)
        // Landscape: width > height (use larger scale)
        const isPortrait = (image.height || 800) > (image.width || 1200);
        const expandScale = isPortrait ? 1.8 : 2.4;

        return (
          <motion.div
            key={`${image.src}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`gallery-item ${isSelected && shouldExpand ? 'expanded-item' : ''}`}
            variants={itemVariants}
            initial="visible"
            animate={
              shouldHide
                ? 'hidden'
                : isSelected && shouldExpand
                  ? {
                      opacity: 1,
                      scale: expandScale,
                      x: offset.x,
                      y: offset.y,
                      zIndex: 150,
                    }
                  : 'visible'
            }
            onClick={() => !isLightboxOpen && onImageClick(index)}
            transition={{
              duration: ANIMATION_DURATION,
              ease: ANIMATION_EASING,
            }}
            style={{
              pointerEvents: shouldHide ? 'none' : 'auto',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              loading={index < 6 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              width={image.width || 1200}
              height={image.height || 800}
              decoding="async"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
