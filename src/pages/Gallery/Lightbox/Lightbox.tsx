import { motion } from 'framer-motion';
import { useEffect } from 'react';

import {
  getLightboxImageVariants,
  lightboxOverlayVariants,
} from '../galleryAnimations';
import type { LightboxProps } from './Lightbox.types';

export function Lightbox({ image, onClose }: LightboxProps) {
  const isPortrait = image.format === 'portrait';
  const imageVariants = getLightboxImageVariants(isPortrait);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-overlay"
      variants={lightboxOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="lightbox-image-wrapper"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`lightbox-image ${image.format}`}
          />
        </motion.div>

        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
