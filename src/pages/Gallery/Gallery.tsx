import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { Seo } from '@/components/common/Seo/Seo';
import {
  fadeUpVariants,
  galleryFilterBarVariants,
  galleryFilterSwapVariants,
} from '@/utils/animations';

import type { Location } from './Gallery.types';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { Lightbox } from './Lightbox/Lightbox';
import { useGalleryImages } from './useGalleryImages';
import { useLightbox } from './useLightbox';
import './Gallery.css';

function Gallery() {
  const { images, locations } = useGalleryImages();
  const [selectedLocation, setSelectedLocation] = useState<Location>('Tous');
  const prefersReducedMotion = useReducedMotion() ?? false;

  const filteredImages = useMemo(() => {
    if (selectedLocation === 'Tous') return images;
    return images.filter((img) => img.location === selectedLocation);
  }, [images, selectedLocation]);

  const lightbox = useLightbox(filteredImages);

  const seo = (
    <Seo
      title="Galerie — Thomas Marguenot"
      description="Une sélection de photographies de voyage — Japon, Vietnam, Paris, Marseille. Le regard photographique de Thomas Marguenot, développeur et photographe."
      path="/gallery"
    />
  );

  if (images.length === 0) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
        {seo}
        <div className="gallery">
          <div className="gallery-container">
            <div className="gallery-empty">
              <p>No images found.</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
      {seo}
      <div className="gallery">
        <div className="gallery-container">
          <motion.div
            variants={galleryFilterBarVariants}
            animate={lightbox.isOpen ? 'dimmed' : 'visible'}
            style={{ pointerEvents: lightbox.isOpen ? 'none' : 'auto' }}
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
                onImageClick={lightbox.open}
                isLightboxOpen={lightbox.isOpen}
                reducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        images={filteredImages}
        index={lightbox.index}
        direction={lightbox.direction}
        reducedMotion={prefersReducedMotion}
        dialogRef={lightbox.dialogRef}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
      />
    </motion.div>
  );
}

export default Gallery;
