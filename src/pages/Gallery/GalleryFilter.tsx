import { motion } from 'framer-motion';

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
    <div className="gallery-filter">
      {locations.map((location) => {
        const isActive = selected === location;
        return (
          <button
            key={location}
            className={`gallery-filter-btn${isActive ? ' active' : ''}`}
            onClick={() => onSelect(location)}
          >
            <span className="gallery-filter-label">{location}</span>
            {isActive && (
              <motion.span
                layoutId="gallery-filter-underline"
                className="gallery-filter-underline"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
