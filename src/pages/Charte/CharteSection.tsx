import type { CharteSectionProps } from './CharteSection.types';

export function CharteSection({
  title,
  description,
  children,
}: CharteSectionProps) {
  return (
    <section className="charte-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
      {children}
    </section>
  );
}
