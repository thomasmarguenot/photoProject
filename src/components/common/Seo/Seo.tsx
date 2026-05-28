import { SITE_URL } from '@/utils/constants';

import type { SeoProps } from './Seo.types';

// React 19 hoists title/meta/link rendered anywhere in the tree into <head>,
// and removes them on unmount — so each route owns its own metadata.
export function Seo({ title, description, path, noindex }: SeoProps) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        path && <link rel="canonical" href={`${SITE_URL}${path}`} />
      )}
    </>
  );
}
