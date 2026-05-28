import { createContext, useContext } from 'react';

export type Direction = 'ltr' | 'rtl';

export type PageTransitionContextValue = {
  runTransition: (
    dir: Direction,
    onNavigate: () => void,
    preload?: () => Promise<unknown> | void
  ) => void;
  getDirectionBetween: (from: string, to: string) => Direction;
};

export const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    // Provide safe noop defaults so components can render outside provider (tests, storybook)
    return {
      runTransition: (
        _dir: Direction,
        onNavigate: () => void,
        _preload?: () => Promise<unknown> | void
      ) => onNavigate(),
      getDirectionBetween: (_from: string, _to: string) => 'ltr' as Direction,
    } as PageTransitionContextValue;
  }
  return ctx;
}

export default PageTransitionContext;
