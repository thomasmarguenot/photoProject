import { motion } from 'framer-motion';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import { ANIMATION, PAGE_ORDER } from '@/utils/constants';
import './PageTransition.css';

type Direction = 'ltr' | 'rtl';

type PageTransitionContextValue = {
  runTransition: (dir: Direction, onNavigate: () => void) => void;
  getDirectionBetween: (from: string, to: string) => Direction;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    // Provide safe noop defaults so components can render outside provider (tests, storybook)
    return {
      runTransition: (_dir: Direction, onNavigate: () => void) => onNavigate(),
      getDirectionBetween: (_from: string, _to: string) => 'ltr' as Direction,
    } as PageTransitionContextValue;
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [animState, setAnimState] = useState<0 | 1>(0); // 0 idle, 1 cover
  const [dirState, setDirState] = useState<Direction>('ltr');
  const pendingNavigateRef = useRef<(() => void) | null>(null);

  const runTransition = useCallback(
    (dir: Direction, onNavigate: () => void) => {
      if (animState !== 0) return; // already animating

      setDirState(dir);
      pendingNavigateRef.current = onNavigate;
      setAnimState(1);
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
      // covered: perform navigation then hide the overlay
      pendingNavigateRef.current?.();
      pendingNavigateRef.current = null;

      // small delay to allow the new route to mount, then hide overlay
      setTimeout(() => setAnimState(0), 40);
    }
  }, [animState]);

  const duration = ANIMATION.DURATION;

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

      {/* Only render the overlay while animating to avoid stray motion when idle */}
      {shouldRenderOverlay && (
        <motion.div
          className="page-transition-overlay"
          initial={dirState === 'ltr' ? 'offLeft' : 'offRight'}
          animate="cover"
          variants={overlayVariants}
          transition={{ duration, ease: ANIMATION.EASING }}
          onAnimationComplete={onAnimationComplete}
        />
      )}
    </PageTransitionContext.Provider>
  );
}

export default PageTransitionProvider;
