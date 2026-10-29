import { useEffect, useRef } from 'react';

// Below this width the desktop nav links are display:none.
const DESKTOP_MIN_WIDTH = 1024;

export function useNavIndicator(activePath: string) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const positioned = useRef(false);

  useEffect(() => {
    const update = () => {
      const navEl = navRef.current;
      const indicatorEl = indicatorRef.current;
      if (!navEl || !indicatorEl) return;
      // Reset the snap flag so re-entering desktop positions without sliding.
      if (window.innerWidth < DESKTOP_MIN_WIDTH) {
        indicatorEl.style.opacity = '0';
        positioned.current = false;
        return;
      }
      const linkEl = linkRefs.current[activePath];
      if (!linkEl) {
        indicatorEl.style.opacity = '0';
        return;
      }
      const navRect = navEl.getBoundingClientRect();
      const linkRect = linkEl.getBoundingClientRect();
      const rootStyle = getComputedStyle(document.documentElement);
      const paddingX = parseFloat(
        rootStyle.getPropertyValue('--header-indicator-padding') || '16'
      );
      const paddingY = parseFloat(
        rootStyle.getPropertyValue('--header-indicator-vertical-padding') || '6'
      );

      const left = linkRect.left - navRect.left + navEl.scrollLeft - paddingX;
      const transform = `translateX(${left}px) translateY(-50%) scaleX(1)`;
      indicatorEl.style.width = `${linkRect.width + paddingX * 2}px`;
      indicatorEl.style.height = `${linkRect.height + paddingY + 8}px`;

      if (!positioned.current) {
        indicatorEl.style.transition = 'none';
        indicatorEl.style.transform = transform;
        indicatorEl.style.opacity = '1';
        // Force a reflow so the snap is committed before transitions come back.
        void indicatorEl.offsetWidth;
        requestAnimationFrame(() => {
          indicatorEl.style.transition = '';
        });
        positioned.current = true;
        return;
      }

      indicatorEl.style.transform = transform;
      indicatorEl.style.opacity = '1';
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activePath]);

  return { navRef, indicatorRef, linkRefs };
}
