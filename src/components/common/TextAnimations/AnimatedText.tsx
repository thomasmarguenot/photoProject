import { motion } from 'framer-motion';

import { fadeUpVariants30 } from '@/utils/animations';

import type { AnimatedTextProps } from './AnimatedText.types';

export function AnimatedText({
  children,
  className = '',
  variants = fadeUpVariants30,
  orchestrated = false,
}: AnimatedTextProps) {
  const selfTrigger = orchestrated
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-50px' },
      };

  return (
    <motion.p className={className} variants={variants} {...selfTrigger}>
      {children}
    </motion.p>
  );
}
