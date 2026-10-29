import { useCallback, useEffect, useRef, useState } from 'react';

import { useHeader } from '@/context/Header.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

import type { ImageData } from './Gallery.types';

export function useLightbox(images: ImageData[]) {
  const [index, setIndex] = useState<number | null>(null);
  // -1 prev, +1 next, 0 open/close — drives the slide variants.
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const { setHidden } = useHeader();
  const isOpen = index !== null;
  const count = images.length;

  useBodyOverflow(isOpen);

  useEffect(() => {
    setHidden(isOpen);
  }, [isOpen, setHidden]);

  // Move focus into the dialog on open and restore it to the trigger on close.
  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => lastFocusedRef.current?.focus?.();
  }, [isOpen]);

  // Preload prev and next images so navigation feels instant.
  useEffect(() => {
    if (index === null) return;
    const preload = (i: number) => {
      const src = images[i]?.src;
      if (src) new window.Image().src = src;
    };
    preload((index + 1) % images.length);
    preload((index - 1 + images.length) % images.length);
  }, [index, images]);

  const open = (i: number) => {
    setDirection(0);
    setIndex(i);
  };

  const close = useCallback(() => {
    setDirection(0);
    setIndex(null);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i !== null ? (i - 1 + count) % count : null));
  }, [count]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i !== null ? (i + 1) % count : null));
  }, [count]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>('button');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === root)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, prev, next]);

  return { index, direction, isOpen, dialogRef, open, close, prev, next };
}
