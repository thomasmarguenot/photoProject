import { createContext, useContext } from 'react';

import { PAGE_ORDER } from '@/utils/constants';

export type Direction = 'ltr' | 'rtl';

type RunTransition = (
  dir: Direction,
  onNavigate: () => void,
  preload?: () => Promise<unknown> | void
) => void;

// Outside the provider (tests), navigate immediately without the overlay.
export const PageTransitionContext = createContext<RunTransition>(
  (_dir, onNavigate) => onNavigate()
);

export const usePageTransition = () => useContext(PageTransitionContext);

export function getPageDirection(from: string, to: string): Direction {
  const order: readonly string[] = PAGE_ORDER;
  const fromIndex = order.indexOf(from);
  const toIndex = order.indexOf(to);
  return fromIndex >= 0 && toIndex >= 0 && toIndex < fromIndex ? 'rtl' : 'ltr';
}
