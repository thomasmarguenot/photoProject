import { motion } from 'framer-motion';

import { fadeUpVariants30 } from '@/utils/animations';

import type { AnimatedTextProps } from './AnimatedText.types';

export function AnimatedText({
  children,
  className = '',
  variants = fadeUpVariants30,
}: AnimatedTextProps) {
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
    >
      {children}
    </motion.p>
  );
}
