import { motion } from 'framer-motion';

import type { AnimatedHeadingProps } from './AnimatedHeading.types';

export function AnimatedHeading({
  children,
  className = '',
  as = 'h2',
}: AnimatedHeadingProps) {
  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      className={`animated-heading ${className}`}
      initial={{
        fontVariationSettings: '"wght" 400',
        opacity: 0,
      }}
      whileInView={{
        fontVariationSettings: '"wght" 800',
        opacity: 1,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </Tag>
  );
}
