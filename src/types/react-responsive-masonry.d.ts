declare module 'react-responsive-masonry' {
  import type { ReactNode, ReactElement } from 'react';

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    gutterBreakPoints?: Record<number, string>;
    children: ReactNode;
  }

  export interface MasonryProps {
    gutter?: string;
    children: ReactNode;
  }

  export function ResponsiveMasonry(
    props: ResponsiveMasonryProps
  ): ReactElement;
  export default function Masonry(props: MasonryProps): ReactElement;
}
