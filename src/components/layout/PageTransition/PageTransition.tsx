import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { flushSync } from 'react-dom';

import { ANIMATION, PAGE_ORDER } from '@/utils/constants';
import './PageTransition.css';

import type { Direction } from './PageTransition.context';
import { PageTransitionContext } from './PageTransition.context';

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [animState, setAnimState] = useState<0 | 1>(0); // 0 idle, 1 cover
  const [dirState, setDirState] = useState<Direction>('ltr');
  const pendingNavigateRef = useRef<(() => void) | null>(null);

  const runTransition = useCallback(
    (dir: Direction, onNavigate: () => void) => {
      if (animState !== 0) return; // already animating

      setDirState(dir);
      pendingNavigateRef.current = onNavigate;
      setAnimState(1); // start overlay animation - Page 1 stays visible
    },
    [animState]
  );

  const getDirectionBetween = useCallback(
    (_from: string, _to: string): Direction => {
      const order = PAGE_ORDER as readonly string[];
      const prevIndex = order.indexOf(_from);
      const nextIndex = order.indexOf(_to);

      if (prevIndex >= 0 && nextIndex >= 0) {
        return nextIndex >= prevIndex ? 'ltr' : 'rtl';
      }

      return 'ltr';
    },
    []
  );

  const onAnimationComplete = useCallback(() => {
    if (animState === 1) {
      // 1. flushSync mounts Page 2 immediately (hidden by blue overlay)
      if (pendingNavigateRef.current) {
        flushSync(() => {
          pendingNavigateRef.current?.();
        });
        pendingNavigateRef.current = null;
      }

      // 2. Keep blue overlay for 60ms, then hide it → Page 2 shows directly
      setTimeout(() => {
        setAnimState(0);
      }, 60);
    }
  }, [animState]);

  const duration = ANIMATION.DURATION; // Page 1 visible during overlay animation

  const overlayVariants = {
    offLeft: { x: '-100%' },
    offRight: { x: '100%' },
    cover: { x: '0%' },
  } as const;

  const shouldRenderOverlay = animState === 1;

  return (
    <PageTransitionContext.Provider
      value={{ runTransition, getDirectionBetween }}
    >
      {children}

      {shouldRenderOverlay &&
        typeof document !== 'undefined' &&
        createPortal(
          <motion.div
            className="page-transition-overlay"
            initial={dirState === 'ltr' ? 'offLeft' : 'offRight'}
            animate="cover"
            variants={overlayVariants}
            transition={{ duration, ease: ANIMATION.EASING }}
            onAnimationComplete={onAnimationComplete}
          />,
          document.body
        )}
    </PageTransitionContext.Provider>
  );
}

export default PageTransitionProvider;
