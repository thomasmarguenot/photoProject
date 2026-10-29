import { AnimatePresence, motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import {
  lightboxBackdropVariants,
  lightboxChromeVariants,
  lightboxSlideVariants,
  lightboxSlideVariantsReduced,
} from '@/utils/animations';

import type { LightboxProps } from './Lightbox.types';
import { LightboxSlide } from './LightboxSlide';
import './Lightbox.css';

const chromeMotionProps = {
  variants: lightboxChromeVariants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
} as const;

// Chrome buttons sit on the backdrop, whose click closes the lightbox.
const withoutBubbling = (action: () => void) => (e: MouseEvent) => {
  e.stopPropagation();
  action();
};

const pad = (n: number) => String(n).padStart(2, '0');

export function Lightbox({
  images,
  index,
  direction,
  reducedMotion,
  dialogRef,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const image = index !== null ? images[index] : undefined;
  const slideDirection = reducedMotion ? 0 : direction;
  const slideVariants = reducedMotion
    ? lightboxSlideVariantsReduced
    : lightboxSlideVariants;

  return createPortal(
    <AnimatePresence>
      {image && index !== null && (
        <motion.div
          key="lightbox"
          className="gallery-lightbox"
          variants={lightboxBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${image.location}`}
          tabIndex={-1}
        >
          <div
            className="gallery-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence custom={slideDirection} initial={false}>
              <LightboxSlide
                key={image.src}
                image={image}
                direction={slideDirection}
                variants={slideVariants}
              />
            </AnimatePresence>
          </div>

          <motion.span
            className="gallery-lightbox-counter"
            {...chromeMotionProps}
          >
            {pad(index + 1)}
            <span className="gallery-lightbox-counter-sep">/</span>
            {pad(images.length)}
          </motion.span>

          <motion.button
            className="gallery-close"
            {...chromeMotionProps}
            onClick={withoutBubbling(onClose)}
            aria-label="Close"
          >
            ×
          </motion.button>
          <motion.button
            className="gallery-nav gallery-nav--prev"
            {...chromeMotionProps}
            onClick={withoutBubbling(onPrev)}
            aria-label="Previous photo"
          >
            ‹
          </motion.button>
          <motion.button
            className="gallery-nav gallery-nav--next"
            {...chromeMotionProps}
            onClick={withoutBubbling(onNext)}
            aria-label="Next photo"
          >
            ›
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
