import { motion, type HTMLMotionProps } from 'framer-motion';
import { memo, useMemo, useState } from 'react';
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
  src: string;
};

const loadedSrcs = new Set<string>();

function GalleryPhotoImpl({
  imgProps,
  layoutId,
  aspectRatio,
  src,
}: GalleryPhotoProps) {
  const wasAlreadyLoaded = loadedSrcs.has(src);
  const [isLoaded, setIsLoaded] = useState(wasAlreadyLoaded);

  const handleRef = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) {
      loadedSrcs.add(src);
      if (!isLoaded) setIsLoaded(true);
    }
  };

  const handleLoad = () => {
    loadedSrcs.add(src);
    setIsLoaded(true);
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
        layout={false}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        className={`${imgProps.className ?? ''} gallery-image ${
          isLoaded ? 'gallery-image--loaded' : ''
        }`}
      />
    </div>
  );
}

const GalleryPhoto = memo(
  GalleryPhotoImpl,
  (prev, next) => prev.src === next.src && prev.layoutId === next.layoutId
);

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
                src={photo.src}
              />
            );
          },
        }}
      />
    </div>
  );
}
