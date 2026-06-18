import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Seo } from '@/components/common/Seo/Seo';
import { useHeader } from '@/context/Header.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';
import {
  fadeUpVariants,
  galleryFilterSwapVariants,
  lightboxBackdropVariants,
  lightboxChromeVariants,
  lightboxSlideVariants,
  lightboxSlideVariantsReduced,
} from '@/utils/animations';

import type { ImageData, Location } from './Gallery.types';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

// One slide = the photo currently shown + its metadata, sized to the image so
// the rotated location label hugs it. Keyed by src inside AnimatePresence so
// prev/next produces a directional slide and open/close a centered zoom.
function LightboxSlide({
  image,
  direction,
  variants,
}: {
  image: ImageData;
  direction: number;
  variants: Variants;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Ref callback fires at commit: catch already-cached images (the clicked
  // photo is almost always in the grid cache) to skip the opacity:0 blink.
  const handleRef = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0 && !isLoaded) setIsLoaded(true);
  };

  const { exif } = image;

  return (
    <motion.div
      className="gallery-lightbox-slide"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div className="gallery-lightbox-figure">
        <img
          ref={handleRef}
          src={image.src}
          alt={image.alt}
          className="gallery-lightbox-image"
          onLoad={() => setIsLoaded(true)}
          draggable={false}
        />
        <div
          className={`gallery-lightbox-meta${isLoaded ? ' gallery-lightbox-meta--visible' : ''}`}
        >
          <span className="gallery-lightbox-location">{image.location}</span>
          {exif && (
            <>
              {(exif.make || exif.model) && (
                <span className="gallery-lightbox-exif">
                  {[exif.make, exif.model].filter(Boolean).join(' ')}
                </span>
              )}
              {exif.focalLength !== undefined && (
                <span className="gallery-lightbox-exif">{`${exif.focalLength}mm`}</span>
              )}
              {exif.fNumber !== undefined && (
                <span className="gallery-lightbox-exif">{`f/${exif.fNumber}`}</span>
              )}
              {exif.exposureTime && (
                <span className="gallery-lightbox-exif">{`${exif.exposureTime}s`}</span>
              )}
              {exif.iso !== undefined && (
                <span className="gallery-lightbox-exif">{`ISO ${exif.iso}`}</span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Gallery() {
  const { images, isLoading, locations } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>('Tous');
  const [direction, setDirection] = useState(0);
  const { setHidden } = useHeader();
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = selectedIndex !== null;
  const prefersReducedMotion = useReducedMotion() ?? false;

  useBodyOverflow(selectedIndex !== null);

  const filteredImages = useMemo(() => {
    if (selectedLocation === 'Tous') return images;
    return images.filter((img) => img.location === selectedLocation);
  }, [images, selectedLocation]);

  useEffect(() => {
    setHidden(selectedIndex !== null);
  }, [selectedIndex, setHidden]);

  // Move focus into the dialog on open and restore it to the trigger on close.
  useEffect(() => {
    if (!isLightboxOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    lightboxRef.current?.focus();
    return () => lastFocusedRef.current?.focus?.();
  }, [isLightboxOpen]);

  // Preload prev and next images so navigation feels instant.
  useEffect(() => {
    if (selectedIndex === null) return;
    const preload = (idx: number) => {
      const src = filteredImages[idx]?.src;
      if (src) new window.Image().src = src;
    };
    preload((selectedIndex + 1) % filteredImages.length);
    preload(
      (selectedIndex - 1 + filteredImages.length) % filteredImages.length
    );
  }, [selectedIndex, filteredImages]);

  const handleImageClick = (index: number) => {
    setDirection(0);
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setDirection(0);
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  }, [filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Tab') {
        const root = lightboxRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>('button');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === root)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const seo = (
    <Seo
      title="Galerie — Thomas Marguenot"
      description="Une sélection de photographies de voyage — Japon, Vietnam, Paris, Marseille. Le regard photographique de Thomas Marguenot, développeur et photographe."
      path="/gallery"
    />
  );

  if (isLoading || images.length === 0) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
        {seo}
        <div className="gallery">
          <div className="gallery-container">
            <div className="gallery-empty">
              <p>{isLoading ? '...' : 'No images found.'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;
  const slideDirection = prefersReducedMotion ? 0 : direction;
  const slideVariants = prefersReducedMotion
    ? lightboxSlideVariantsReduced
    : lightboxSlideVariants;

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
      {seo}
      <div className="gallery">
        <div className="gallery-container">
          <motion.div
            animate={{ opacity: selectedIndex === null ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: selectedIndex !== null ? 'none' : 'auto' }}
          >
            <GalleryFilter
              locations={locations}
              selected={selectedLocation}
              onSelect={setSelectedLocation}
            />
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedLocation}
              variants={galleryFilterSwapVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <GalleryGrid
                images={filteredImages}
                onImageClick={handleImageClick}
                isLightboxOpen={selectedIndex !== null}
                reducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedImage && selectedIndex !== null && (
            <motion.div
              key="lightbox"
              className="gallery-lightbox"
              variants={lightboxBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleClose}
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo : ${selectedImage.location}`}
              tabIndex={-1}
            >
              <div
                className="gallery-lightbox-stage"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence custom={slideDirection} initial={false}>
                  <LightboxSlide
                    key={selectedImage.src}
                    image={selectedImage}
                    direction={slideDirection}
                    variants={slideVariants}
                  />
                </AnimatePresence>
              </div>

              <motion.span
                className="gallery-lightbox-counter"
                variants={lightboxChromeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {String(selectedIndex + 1).padStart(2, '0')}
                <span className="gallery-lightbox-counter-sep">/</span>
                {String(filteredImages.length).padStart(2, '0')}
              </motion.span>

              <motion.button
                className="gallery-close"
                variants={lightboxChromeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Close"
              >
                ×
              </motion.button>
              <motion.button
                className="gallery-nav gallery-nav--prev"
                variants={lightboxChromeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photo"
              >
                ‹
              </motion.button>
              <motion.button
                className="gallery-nav gallery-nav--next"
                variants={lightboxChromeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photo"
              >
                ›
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

export default Gallery;
