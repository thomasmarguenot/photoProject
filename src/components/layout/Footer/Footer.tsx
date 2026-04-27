import { motion } from 'framer-motion';

import { useIsMobile } from '@/hooks/useIsMobile';
import type { FooterProps } from './Footer.types';
import './Footer.css';

export function Footer({
  year = new Date().getFullYear(),
  companyName = 'Thomas Marguenot - Agence Belle Époque',
}: FooterProps) {
  const isMobile = useIsMobile();

  return (
    <footer className="footer">
      <motion.div
        className="footer-bg"
        initial={isMobile ? { height: '100%' } : { height: '0%' }}
        whileInView={isMobile ? { height: '100%' } : { height: '100%' }}
        viewport={{ once: true }}
        transition={isMobile ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' }}
      />
      <div className="footer-container">
        <div className="footer-content">
          <motion.p
            className="footer-text"
            initial={isMobile ? { x: 0, opacity: 1 } : { x: 370, opacity: 0 }}
            whileInView={isMobile ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0 } : { duration: 0.9, delay: 1.5, ease: 'easeOut' }}
          >
            {`© ${year} ${companyName}.`}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
