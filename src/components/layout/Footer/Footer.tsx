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
            initial={{ x: 370, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 1.5, ease: 'easeOut' }}
          >
            {`© ${year} ${companyName}.`}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
