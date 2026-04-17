import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMemo, useState } from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';

import type { GalleryGridProps } from './GalleryGrid.types';
import 'react-photo-album/masonry.css';
import './GalleryGrid.css';

type PhotoEntry = {
  src: string;
  alt: string;
  width: number;
  height: number;
  gridIndex: number;
};

type GalleryPhotoProps = {
  imgProps: HTMLMotionProps<'img'>;
  layoutId: string;
  aspectRatio: number;
};

function GalleryPhoto({ imgProps, layoutId, aspectRatio }: GalleryPhotoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRef = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
    }
  };

  return (
    <div
      className="gallery-photo-wrapper"
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <div
        className={`gallery-placeholder-skeleton ${
          isLoaded ? 'gallery-placeholder-skeleton--hidden' : ''
        }`}
        aria-hidden
      />
      <motion.img
        {...imgProps}
        ref={handleRef}
        layoutId={layoutId}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{
          opacity: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`${imgProps.className ?? ''} gallery-image`}
      />
    </div>
  );
}

export function GalleryGrid({
  images,
  onImageClick,
  selectedIndex,
  isLightboxOpen,
}: GalleryGridProps) {
  const photos: PhotoEntry[] = useMemo(
    () =>
      images.map((img, idx) => ({
        src: img.src,
        alt: img.alt,
        width: img.width ?? 1200,
        height: img.height ?? 800,
        gridIndex: idx,
      })),
    [images]
  );

  return (
    <div
      className={`gallery-grid-wrapper ${
        isLightboxOpen ? 'gallery-grid-wrapper--dimmed' : ''
      }`}
    >
      <MasonryPhotoAlbum
        photos={photos}
        columns={(width) =>
          width < 600 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4
        }
        spacing={24}
        padding={0}
        onClick={({ index }) => {
          if (!isLightboxOpen) onImageClick(index);
        }}
        render={{
          image: (imgProps, { photo, index }) => {
            const isSelected = index === selectedIndex;
            if (isSelected) {
              return (
                <div
                  className="react-photo-album--image gallery-placeholder"
                  aria-hidden
                />
              );
            }
            return (
              <GalleryPhoto
                imgProps={imgProps as unknown as HTMLMotionProps<'img'>}
                layoutId={`gallery-img-${photo.src}`}
                aspectRatio={photo.width / photo.height}
              />
            );
          },
        }}
      />
    </div>
  );
}
