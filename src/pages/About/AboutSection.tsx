import { motion } from 'framer-motion';

import { fadeUpVariants, sectionStaggerVariants } from '@/utils/animations';

import type { AboutSectionProps } from './AboutSection.types';

export function AboutSection({
  title,
  className = '',
  children,
}: AboutSectionProps) {
  return (
    <motion.section
      className={`about-section ${className}`}
      variants={sectionStaggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="about-section-header" variants={fadeUpVariants}>
        <span className="about-section-number">—</span>
        <h2 className="about-section-title">{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  );
}
