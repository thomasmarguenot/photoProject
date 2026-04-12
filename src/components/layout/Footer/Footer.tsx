import { motion } from 'framer-motion';

import { TypewriterText } from '@/components/atoms/TypewriterText/TypewriterText';

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
          <p className="footer-text">
            <TypewriterText text={`© ${year} ${companyName}.`} delay={1200} />
          </p>
        </div>
      </div>
    </footer>
  );
}
