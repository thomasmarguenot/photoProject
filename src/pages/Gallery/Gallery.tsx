import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

import { useHeader } from '@/context/Header.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

import type { Location } from './Gallery.types';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

export function Gallery() {
  const { images, isLoading, locations } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>('Tous');
  const { setHidden } = useHeader();

  useBodyOverflow(selectedIndex !== null);

  const filteredImages = useMemo(() => {
    if (selectedLocation === 'Tous') {
      return images;
    }
    return images.filter((img) => img.location === selectedLocation);
  }, [images, selectedLocation]);

  useEffect(() => {
    setHidden(selectedIndex !== null);
  }, [selectedIndex, setHidden]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  if (isLoading || images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-container">
          <div className="gallery-empty">
            <p>{isLoading ? '...' : 'No images found.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  return (
    <div className="gallery">
      <div className="gallery-container">
        <AnimatePresence>
          {selectedIndex === null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <GalleryFilter
                locations={locations}
                selected={selectedLocation}
                onSelect={setSelectedLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLocation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryGrid
              images={filteredImages}
              onImageClick={handleImageClick}
              selectedIndex={selectedIndex}
              isLightboxOpen={selectedIndex !== null}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div className="gallery-lightbox" onClick={handleClose}>
            <div
              className="gallery-lightbox-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`gallery-img-${selectedImage.src}`}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="gallery-lightbox-image"
                transition={{
                  type: 'tween',
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <span className="gallery-lightbox-location">
                {selectedImage.location}
              </span>
            </div>
            <button
              className="gallery-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
