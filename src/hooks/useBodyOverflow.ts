import { useEffect } from 'react';

/**
 * Lock body scroll when `locked` is true.
 * Automatically restores on unmount.
 */
export function useBodyOverflow(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
