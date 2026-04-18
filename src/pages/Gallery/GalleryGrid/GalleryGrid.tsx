import { motion, type HTMLMotionProps } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
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
  const [loadedSrc, setLoadedSrc] = useState<string | null>(
    wasAlreadyLoaded ? src : null
  );
  const isLoaded = loadedSrc === src || loadedSrcs.has(src);
  const [isInView, setIsInView] = useState(wasAlreadyLoaded);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  const handleRef = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) {
      loadedSrcs.add(src);
      if (!isLoaded) setLoadedSrc(src);
    }
  };

  const handleLoad = () => {
    loadedSrcs.add(src);
    setLoadedSrc(src);
  };

  const { src: propSrc, srcSet, ...restImgProps } = imgProps;

  return (
    <motion.div
      ref={wrapperRef}
      className="gallery-photo-wrapper"
      style={{ aspectRatio: `${aspectRatio}` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`gallery-placeholder-skeleton ${
          isLoaded ? 'gallery-placeholder-skeleton--hidden' : ''
        }`}
        aria-hidden
      />
      {isInView && (
        <motion.img
          key={src}
          {...restImgProps}
          src={propSrc}
          srcSet={srcSet}
          ref={handleRef}
          layoutId={layoutId}
          layout={false}
          decoding="async"
          onLoad={handleLoad}
          className={`${imgProps.className ?? ''} gallery-image ${
            isLoaded ? 'gallery-image--loaded' : ''
          }`}
        />
      )}
    </motion.div>
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
