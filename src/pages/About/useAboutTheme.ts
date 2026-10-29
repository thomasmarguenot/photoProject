import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';

// Scroll progress at which the page flips to its dark theme.
const DARK_THRESHOLD = 0.15;
const FLIP_RANGE = [0.149, DARK_THRESHOLD];

export function useAboutTheme() {
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(scrollYProgress, FLIP_RANGE, [
    '#ffffff',
    '#181818',
  ]);
  const fgColor = useTransform(scrollYProgress, FLIP_RANGE, [
    '#111111',
    '#f5f5f7',
  ]);
  const borderColor = useTransform(scrollYProgress, FLIP_RANGE, [
    'rgba(0,0,0,0.1)',
    'rgba(255,255,255,0.1)',
  ]);

  // Lets the header follow the theme via `body.about-dark`.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    document.body.classList.toggle('about-dark', v >= DARK_THRESHOLD);
  });

  useEffect(() => () => document.body.classList.remove('about-dark'), []);

  return { bgColor, fgColor, borderColor };
}
