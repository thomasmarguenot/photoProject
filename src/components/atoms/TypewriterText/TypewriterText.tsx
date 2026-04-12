import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import './TypewriterText.css';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypewriterText({
  text,
  delay = 0,
  className,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const startId = setTimeout(() => {
      const type = () => {
        if (cancelled) return;
        if (i >= text.length) {
          setDone(true);
          return;
        }
        setDisplayed(text.slice(0, i + 1));
        i++;

        const char = text[i - 1];
        const base = 22 + Math.random() * 38;
        const extra =
          char === '.' || char === ','
            ? Math.random() * 160
            : char === ' '
              ? Math.random() * 60
              : Math.random() < 0.05
                ? Math.random() * 200
                : 0;

        timeoutId = setTimeout(type, base + extra);
      };
      type();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
}
