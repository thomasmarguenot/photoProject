import { motion } from 'framer-motion';

import {
  imageRevealVariants,
  imageRevealVariantsRight,
} from '@/utils/animations';

interface ProjectImageRevealProps {
  src: string;
  alt: string;
  direction?: 'left' | 'right';
}

export function ProjectImageReveal({
  src,
  alt,
  direction = 'left',
}: ProjectImageRevealProps) {
  const variants =
    direction === 'right' ? imageRevealVariantsRight : imageRevealVariants;

  return (
    <div className="project-image-cell">
      <motion.div className="project-image-reveal" variants={variants}>
        <img src={src} alt={alt} className="project-image" loading="lazy" />
      </motion.div>
    </div>
  );
}
