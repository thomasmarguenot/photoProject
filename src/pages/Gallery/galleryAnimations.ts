import type { Variants } from 'framer-motion';

// Apple-style spring animation config
const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

const smoothTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

export const lightboxOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(40px)',
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1], // Apple's custom easing
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

export function getLightboxImageVariants(_isPortrait: boolean): Variants {
  // Restore rotation for portrait images
  const rotation = _isPortrait ? -90 : 0;

  return {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      rotate: rotation,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: rotation,
      transition: {
        ...springTransition,
        opacity: { duration: 0.3 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      rotate: rotation,
      transition: {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };
}
