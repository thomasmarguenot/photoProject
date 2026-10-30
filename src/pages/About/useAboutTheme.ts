import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect } from 'react';

// Scroll progress at which the page flips to its dark theme.
const DARK_THRESHOLD = 0.15;

// The page and the header read their colors from `body.about-dark` (CSS).
export function useAboutTheme() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    document.body.classList.toggle('about-dark', v >= DARK_THRESHOLD);
  });

  useEffect(() => () => document.body.classList.remove('about-dark'), []);
}
