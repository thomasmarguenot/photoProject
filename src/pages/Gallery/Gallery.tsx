import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { useHeader } from '@/context/Header.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';
import { fadeUpVariants } from '@/utils/animations';

import type { ImageData, Location } from './Gallery.types';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

// Isolated component so isLoaded state resets on key change (new src).
// useLayoutEffect checks img.complete before the browser paints, avoiding
// the one-frame opacity:0 blink for already-cached images.
function LightboxImage({
  image,
  layoutId,
  onLoaded,
}: {
  image: ImageData;
  layoutId?: string;
  onLoaded?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
      onLoaded?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.img
      ref={imgRef}
      layoutId={layoutId}
      src={image.src}
      alt={image.alt}
      className="gallery-lightbox-image"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
      onLoad={() => {
        setIsLoaded(true);
        onLoaded?.();
      }}
      transition={{ type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function Gallery() {
  const { images, isLoading, locations } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>('Tous');
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);
  const { setHidden } = useHeader();

  useBodyOverflow(selectedIndex !== null);

  const filteredImages = useMemo(() => {
    if (selectedLocation === 'Tous') return images;
    return images.filter((img) => img.location === selectedLocation);
  }, [images, selectedLocation]);

  useEffect(() => {
    setHidden(selectedIndex !== null);
  }, [selectedIndex, setHidden]);

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
    setLightboxImageLoaded(false);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setLightboxImageLoaded(false);
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setLightboxImageLoaded(false);
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null
    );
  };

  const handleNext = () => {
    setLightboxImageLoaded(false);
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxImageLoaded(false);
        setSelectedIndex(null);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxImageLoaded(false);
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredImages.length) % filteredImages.length
            : null
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxImageLoaded(false);
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % filteredImages.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  if (isLoading || images.length === 0) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
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

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
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

          <GalleryGrid
            images={filteredImages}
            onImageClick={handleImageClick}
            selectedIndex={selectedIndex}
            isLightboxOpen={selectedIndex !== null}
          />
        </div>

        <AnimatePresence>
          {selectedImage && (
            <div className="gallery-lightbox" onClick={handleClose}>
              <div
                className="gallery-lightbox-frame"
                onClick={(e) => e.stopPropagation()}
              >
                <LightboxImage
                  key={selectedImage.src}
                  image={selectedImage}
                  onLoaded={() => setLightboxImageLoaded(true)}
                />
                <div
                  className={`gallery-lightbox-meta${lightboxImageLoaded ? ' gallery-lightbox-meta--visible' : ''}`}
                >
                  <span className="gallery-lightbox-location">
                    {selectedImage.location}
                  </span>
                  {selectedImage.exif && (
                    <>
                      {(selectedImage.exif.make ||
                        selectedImage.exif.model) && (
                        <span className="gallery-lightbox-exif">
                          {[selectedImage.exif.make, selectedImage.exif.model]
                            .filter(Boolean)
                            .join(' ')}
                        </span>
                      )}
                      {selectedImage.exif.focalLength !== undefined && (
                        <span className="gallery-lightbox-exif">
                          {`${selectedImage.exif.focalLength}mm`}
                        </span>
                      )}
                      {selectedImage.exif.fNumber !== undefined && (
                        <span className="gallery-lightbox-exif">
                          {`f/${selectedImage.exif.fNumber}`}
                        </span>
                      )}
                      {selectedImage.exif.exposureTime && (
                        <span className="gallery-lightbox-exif">
                          {`${selectedImage.exif.exposureTime}s`}
                        </span>
                      )}
                      {selectedImage.exif.iso !== undefined && (
                        <span className="gallery-lightbox-exif">
                          {`ISO ${selectedImage.exif.iso}`}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              <button
                className="gallery-close"
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
              <button
                className="gallery-nav gallery-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                className="gallery-nav gallery-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Gallery;
