import { motion } from 'framer-motion';

import {
  galleryFilterContainerVariants,
  galleryFilterItemVariants,
} from '@/utils/animations';

import type { Location } from './Gallery.types';
import './GalleryFilter.css';

interface GalleryFilterProps {
  locations: Location[];
  selected: Location;
  onSelect: (location: Location) => void;
}

export function GalleryFilter({
  locations,
  selected,
  onSelect,
}: GalleryFilterProps) {
  return (
    <motion.div
      className="gallery-filter"
      variants={galleryFilterContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {locations.map((location) => {
        const isActive = selected === location;
        return (
          <motion.button
            key={location}
            className={`gallery-filter-btn${isActive ? ' active' : ''}`}
            onClick={() => onSelect(location)}
            variants={galleryFilterItemVariants}
          >
            <span className="gallery-filter-label">{location}</span>
            {isActive && (
              <motion.span
                layoutId="gallery-filter-underline"
                className="gallery-filter-underline"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
