import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useGalleryGridColumns } from './useGalleryGridColumns';
import './GalleryGrid.css';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  containerVariants,
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
  const columns = useGalleryGridColumns();

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
  // For grid, row-major order is just the original array

  return (
    <motion.div
      className="gallery-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((image, i) => {
        const isSelected = i === selectedIndex;
        const shouldHide = isLightboxOpen && !isSelected;
        const offset =
          isSelected && shouldExpand ? centerOffset : { x: 0, y: 0 };
        const isMobile = columns === 1;

        const row = Math.floor(i / columns);
        const col = i % columns;
        const delay = 0.1 + (row * columns + col) * 0.01;
        const isPortrait = (image.height || 800) > (image.width || 1200);
        const expandScale = isMobile ? 1 : isPortrait ? 1.8 : 2.4;

        return (
          <motion.div
            key={`${image.src}-${i}`}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[i] = el;
            }}
            className={`gallery-item${isSelected && shouldExpand ? ' expanded-item' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={
              shouldHide
                ? { opacity: 0, y: 30 }
                : isSelected && shouldExpand
                  ? {
                      opacity: 1,
                      scale: expandScale,
                      x: offset.x,
                      y: offset.y,
                      zIndex: 150,
                    }
                  : { opacity: 1, y: 0 }
            }
            onClick={() => {
              if (!isLightboxOpen && !isMobile) {
                onImageClick(i);
              }
            }}
            transition={{
              duration: ANIMATION_DURATION,
              ease: ANIMATION_EASING,
              delay,
            }}
            style={{
              pointerEvents: shouldHide ? 'none' : 'auto',
              WebkitTransform: 'translateZ(0)',
              willChange: isSelected && shouldExpand ? 'transform' : 'auto',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              loading={i < 6 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
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
