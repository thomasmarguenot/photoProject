import { motion } from 'framer-motion';
import { useState } from 'react';

import type { ImageExif } from '../Gallery.types';
import { GALLERY_IMAGE_SIZES, toSrcSet } from '../imageSources';
import type { LightboxSlideProps } from './Lightbox.types';

function formatExif(exif?: ImageExif): string[] {
  if (!exif) return [];
  return [
    [exif.make, exif.model].filter(Boolean).join(' '),
    exif.focalLength !== undefined ? `${exif.focalLength}mm` : '',
    exif.fNumber !== undefined ? `f/${exif.fNumber}` : '',
    exif.exposureTime ? `${exif.exposureTime}s` : '',
    exif.iso !== undefined ? `ISO ${exif.iso}` : '',
  ].filter(Boolean);
}

// One slide = the photo currently shown + its metadata, sized to the image so
// the rotated location label hugs it. Keyed by src inside AnimatePresence so
// prev/next produces a directional slide and open/close a centered zoom.
export function LightboxSlide({
  image,
  direction,
  variants,
}: LightboxSlideProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Ref callback fires at commit: catch already-cached images (the clicked
  // photo is almost always in the grid cache) to skip the opacity:0 blink.
  const handleRef = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0 && !isLoaded) setIsLoaded(true);
  };

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
          srcSet={toSrcSet(image.variants)}
          sizes={GALLERY_IMAGE_SIZES}
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
          {formatExif(image.exif).map((value) => (
            <span key={value} className="gallery-lightbox-exif">
              {value}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
