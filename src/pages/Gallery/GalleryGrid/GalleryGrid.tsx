import { motion, useScroll, useTransform } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import { MasonryPhotoAlbum, type Photo } from 'react-photo-album';

import type { GalleryGridProps } from './GalleryGrid.types';
import type { ImageVariant } from '../Gallery.types';
import 'react-photo-album/masonry.css';
import './GalleryGrid.css';

type GalleryPhotoItem = Photo & { location: string };

type GalleryPhotoProps = {
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
  aspectRatio: number;
  src: string;
  location: string;
  variants?: ImageVariant[];
  index: number;
  reducedMotion: boolean;
};

const loadedSrcs = new Set<string>();

// Subtle per-item vertical drift on scroll — the columns appear to float at
// slightly different speeds. Kept under the masonry gap (24px) to avoid overlap.
const PARALLAX_OFFSETS = [-12, 4, -7, 11, 0, -4, 8];

function GalleryPhotoImpl({
  imgProps,
  aspectRatio,
  src,
  location,
  variants,
  index,
  reducedMotion,
}: GalleryPhotoProps) {
  const wasAlreadyLoaded = loadedSrcs.has(src);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(
    wasAlreadyLoaded ? src : null
  );
  const isLoaded = loadedSrc === src || loadedSrcs.has(src);
  const [isInView, setIsInView] = useState(wasAlreadyLoaded);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });
  const drift = PARALLAX_OFFSETS[index % PARALLAX_OFFSETS.length];
  const parallaxY = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

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

  const srcSet = variants?.length
    ? variants.map((v) => `${v.src} ${v.width}w`).join(', ')
    : propSrcSet;

  // The image fades in over a light-grey placeholder on load (CSS-driven via
  // `.gallery-image` opacity). No entrance reveal — the load fade is the only
  // appearance animation.
  return (
    <div
      ref={wrapperRef}
      className="gallery-photo-parallax"
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <motion.div
        className="gallery-photo-drift"
        style={{ y: reducedMotion ? 0 : parallaxY }}
      >
        <div className="gallery-photo-wrapper">
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
          <div className="gallery-photo-overlay" aria-hidden>
            <span className="gallery-photo-location">{location}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const GalleryPhoto = memo(
  GalleryPhotoImpl,
  (prev, next) =>
    prev.src === next.src && prev.reducedMotion === next.reducedMotion
);

export function GalleryGrid({
  images,
  onImageClick,
  isLightboxOpen,
  reducedMotion,
}: GalleryGridProps) {
  const { photos, variantsMap } = useMemo(() => {
    const photos: GalleryPhotoItem[] = [];
    const variantsMap = new Map<string, ImageVariant[]>();

    images.forEach((img) => {
      photos.push({
        src: img.src,
        alt: img.alt,
        width: img.width ?? 1200,
        height: img.height ?? 800,
        location: img.location,
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
          image: (imgProps, { photo, index }) => (
            <GalleryPhoto
              imgProps={imgProps}
              aspectRatio={photo.width / photo.height}
              src={photo.src}
              location={(photo as GalleryPhotoItem).location}
              variants={variantsMap.get(photo.src)}
              index={index}
              reducedMotion={reducedMotion}
            />
          ),
        }}
      />
    </div>
  );
}
