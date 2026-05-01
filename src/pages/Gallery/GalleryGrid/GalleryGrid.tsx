import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { MasonryPhotoAlbum, type Photo } from 'react-photo-album';

import type { GalleryGridProps } from './GalleryGrid.types';
import type { ImageVariant } from '../Gallery.types';
import 'react-photo-album/masonry.css';
import './GalleryGrid.css';

type GalleryPhotoProps = {
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
  aspectRatio: number;
  src: string;
  variants?: ImageVariant[];
};

const loadedSrcs = new Set<string>();

function GalleryPhotoImpl({
  imgProps,
  aspectRatio,
  src,
  variants,
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
      { rootMargin: '800px 0px' }
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

  const { src: propSrc, srcSet: propSrcSet, ...restImgProps } = imgProps;

  // Build srcSet from responsive variants
  const srcSet = variants?.length
    ? variants.map((v) => `${v.src} ${v.width}w`).join(', ')
    : propSrcSet;

  return (
    <div
      ref={wrapperRef}
      className="gallery-photo-wrapper"
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <div
        className={`gallery-placeholder-skeleton ${
          isLoaded ? 'gallery-placeholder-skeleton--hidden' : ''
        }`}
        aria-hidden
      />
      {isInView && (
        <img
          key={src}
          {...restImgProps}
          src={propSrc}
          srcSet={srcSet}
          sizes="(max-width: 600px) 600px, (max-width: 1200px) 1200px, 1800px"
          ref={handleRef}
          decoding="async"
          loading="lazy"
          onLoad={handleLoad}
          className={`${imgProps.className ?? ''} gallery-image ${
            isLoaded ? 'gallery-image--loaded' : ''
          }`}
        />
      )}
    </div>
  );
}

const GalleryPhoto = memo(
  GalleryPhotoImpl,
  (prev, next) => prev.src === next.src
);

export function GalleryGrid({
  images,
  onImageClick,
  selectedIndex,
  isLightboxOpen,
}: GalleryGridProps) {
  // Build photos array and variants map
  const { photos, variantsMap } = useMemo(() => {
    const photos: Photo[] = [];
    const variantsMap = new Map<string, ImageVariant[]>();

    images.forEach((img) => {
      photos.push({
        src: img.src,
        alt: img.alt,
        width: img.width ?? 1200,
        height: img.height ?? 800,
      });

      if (img.variants?.length) {
        variantsMap.set(img.src, img.variants);
      }
    });

    return { photos, variantsMap };
  }, [images]);

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
                imgProps={imgProps}
                aspectRatio={photo.width / photo.height}
                src={photo.src}
                variants={variantsMap.get(photo.src)}
              />
            );
          },
        }}
      />
    </div>
  );
}
