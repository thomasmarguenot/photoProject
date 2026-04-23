import { motion } from 'framer-motion';

import { EASE_DEFAULT } from '@/utils/animations';
import { ANIMATION } from '@/utils/constants';

import type { AnimatedHeadingProps } from './AnimatedHeading.types';

const fontWeightVariants = {
  hidden: { fontVariationSettings: '"wght" 400', opacity: 0 },
  visible: {
    fontVariationSettings: '"wght" 800',
    opacity: 1,
    transition: {
      duration: ANIMATION.DURATION_FONT_MORPH,
      ease: EASE_DEFAULT,
    },
  },
};

export function AnimatedHeading({
  children,
  className = '',
  as = 'h2',
  orchestrated = false,
}: AnimatedHeadingProps) {
  const Tag = motion[as] as typeof motion.h2;

  const selfTrigger = orchestrated
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-50px' },
      };

  return (
    <Tag
      className={`animated-heading ${className}`}
      variants={fontWeightVariants}
      {...selfTrigger}
    >
      {children}
    </Tag>
  );
}
