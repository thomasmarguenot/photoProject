import { useState, useEffect } from 'react';

import { GalleryGrid } from './GalleryGrid/GalleryGrid';
import { useGalleryImages } from './useGalleryImages';
import './Gallery.css';

export function Gallery() {
  const { images, isLoading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [shouldExpand, setShouldExpand] = useState(false);
  const isLightboxOpen = selectedImage !== null;

  // Gérer l'animation et le header
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.classList.add('lightbox-open');
      // Désactiver le scroll
      document.body.style.overflow = 'hidden';
      // Attendre que les images disparaissent (0.5s) avant d'agrandir
      const timer = setTimeout(() => {
        setShouldExpand(true);
      }, 500);
      return () => {
        clearTimeout(timer);
        document.body.classList.remove('lightbox-open');
        document.body.style.overflow = '';
      };
    }
  }, [isLightboxOpen]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseLightbox = () => {
    setShouldExpand(false);
    document.body.classList.remove('lightbox-open');
    document.body.style.overflow = '';
    // Attendre la fin de l'animation de réduction avant de réinitialiser
    setTimeout(() => {
      setSelectedImage(null);
    }, 600);
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
        <GalleryGrid
          images={images}
          onImageClick={handleImageClick}
          selectedIndex={selectedImage}
          isLightboxOpen={isLightboxOpen}
          shouldExpand={shouldExpand}
        />
      </div>

      {shouldExpand && (
        <button
          className="lightbox-close"
          onClick={handleCloseLightbox}
          aria-label="Close lightbox"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Gallery;
