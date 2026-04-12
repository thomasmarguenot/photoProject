import { motion } from 'framer-motion';

import { imageRevealVariants } from '@/utils/animations';

interface ProjectImageRevealProps {
  src: string;
  alt: string;
}

export function ProjectImageReveal({ src, alt }: ProjectImageRevealProps) {
  return (
    <div className="project-image-cell">
      <motion.div
        className="project-image-reveal"
        variants={imageRevealVariants}
      >
        <img src={src} alt={alt} className="project-image" loading="lazy" />
      </motion.div>
    </div>
  );
}
