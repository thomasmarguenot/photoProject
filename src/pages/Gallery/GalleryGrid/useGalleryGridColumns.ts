import { useEffect, useState } from 'react';

export function useGalleryGridColumns(): number {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth <= 750) {
        setColumns(1);
      } else if (window.innerWidth <= 900) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    }
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}
