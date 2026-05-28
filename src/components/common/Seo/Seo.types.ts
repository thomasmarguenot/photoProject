export interface SeoProps {
  title: string;
  description?: string;
  /** Route path used to build the canonical URL (e.g. "/about"). */
  path?: string;
  /** Keep the page out of search results — skips the canonical tag. */
  noindex?: boolean;
}
