import { useLayoutEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}
