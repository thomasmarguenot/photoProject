import { motion } from 'framer-motion';

import { fontWeightVariants } from '@/utils/animations';

import type { AnimatedHeadingProps } from './AnimatedHeading.types';

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
