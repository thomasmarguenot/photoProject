import { motion } from 'framer-motion';

import type { FooterProps } from './Footer.types';
import './Footer.css';

export function Footer({
  year = new Date().getFullYear(),
  companyName = 'Thomas Marguenot - Agence Belle Époque',
}: FooterProps) {
  return (
    <footer className="footer">
      <motion.div
        className="footer-bg"
        initial={{ height: '0%' }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <div className="footer-container">
        <div className="footer-content">
          <motion.p
            className="footer-text"
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
          >
            {`© ${year} ${companyName}.`}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
