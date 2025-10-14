import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { Lightbox } from './Lightbox/Lightbox';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

export function Gallery() {
  const { images, isLoading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  if (isLoading || images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-container">
          <div className="gallery-empty">
            <p>
              {isLoading
                ? 'Loading images...'
                : 'No images found. Add images to src/assets/pictures/'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-container">
        <GalleryGrid images={images} onImageClick={handleImageClick} />
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            image={images[selectedImage]}
            onClose={handleCloseLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
