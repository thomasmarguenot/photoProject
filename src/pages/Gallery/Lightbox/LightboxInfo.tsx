import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

import {
  lightboxInfoVariants,
  lightboxInfoVariantsReduced,
} from '@/utils/animations';

import type { LightboxInfoProps } from './Lightbox.types';
import { getPhotoDetails } from './photoDetails';

export function LightboxInfo({
  image,
  isOpen,
  isVisible,
  onToggle,
}: LightboxInfoProps) {
  const panelId = useId();
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className={`gallery-lightbox-info${isVisible ? ' gallery-lightbox-info--visible' : ''}`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.dl
            id={panelId}
            className="gallery-lightbox-info-panel"
            variants={
              reducedMotion ? lightboxInfoVariantsReduced : lightboxInfoVariants
            }
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {getPhotoDetails(image).map(({ label, value }) => (
              <div key={label} className="gallery-lightbox-info-row">
                <dt className="gallery-lightbox-info-label">{label}</dt>
                <dd className="gallery-lightbox-info-value">{value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`gallery-lightbox-info-toggle${isOpen ? ' gallery-lightbox-info-toggle--active' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-label={
          isOpen
            ? 'Masquer les informations de la photo'
            : 'Afficher les informations de la photo'
        }
      >
        <svg
          className="gallery-lightbox-info-icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <circle cx="8" cy="3.5" r="1.25" />
          <rect x="7" y="6.5" width="2" height="7" rx="1" />
        </svg>
      </button>
    </div>
  );
}
