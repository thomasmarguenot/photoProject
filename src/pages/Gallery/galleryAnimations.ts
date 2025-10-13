import type { Variants } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const lightboxOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function getLightboxImageVariants(isPortrait: boolean): Variants {
  const rotation = isPortrait ? -90 : 0;

  return {
    hidden: {
      opacity: 0,
      rotate: rotation,
    },
    visible: {
      opacity: 1,
      rotate: rotation,
    },
    exit: {
      opacity: 0,
      rotate: rotation,
    },
  };
}
