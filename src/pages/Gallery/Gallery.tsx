import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useBodyOverflow } from '@/hooks/useBodyOverflow';
import { ANIMATION, MOTION, TRANSITION } from '@/utils/constants';

import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

export function Gallery() {
  const { images, isLoading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [shouldExpand, setShouldExpand] = useState(false);
  const isLightboxOpen = selectedImage !== null;

  useBodyOverflow(isLightboxOpen);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.classList.add('lightbox-open');
      // Wait for grid items to fade out before expanding selected image
      const timer = setTimeout(() => {
        setShouldExpand(true);
      }, 500);
      return () => {
        clearTimeout(timer);
        document.body.classList.remove('lightbox-open');
      };
    }
  }, [isLightboxOpen]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };
  const handleCloseLightbox = () => {
    setShouldExpand(false);
    document.body.classList.remove('lightbox-open');
    // Wait for shrink animation before resetting selection
    setTimeout(() => {
      setSelectedImage(null);
    }, ANIMATION.DURATION * 1000);
  };

  if (isLoading || images.length === 0) {
    return (
      <div className="gallery">
        <motion.div
          className="gallery-container"
          {...MOTION.FADE_UP}
          transition={TRANSITION.SMOOTH}
        >
          <div className="gallery-empty">
            <p>
              {isLoading
                ? '...'
                : 'No images found. Add images to src/assets/pictures/'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="gallery"
      {...MOTION.FADE_IN}
      transition={{
        duration: ANIMATION.DURATION_SLOW,
        ease: ANIMATION.EASING_SMOOTH,
      }}
    >
      <motion.div
        className="gallery-container"
        {...MOTION.FADE_UP}
        transition={TRANSITION.SMOOTH}
      >
        <GalleryGrid
          images={images}
          onImageClick={handleImageClick}
          selectedIndex={selectedImage}
          isLightboxOpen={isLightboxOpen}
          shouldExpand={shouldExpand}
        />
      </motion.div>

      {shouldExpand && (
        <button
          className="lightbox-close"
          onClick={handleCloseLightbox}
          aria-label="Close lightbox"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}

export default Gallery;
