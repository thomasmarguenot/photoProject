import { Seo } from '@/components/common/Seo/Seo';

import {
  ButtonsSection,
  CardsSection,
  ColorsSection,
  GlassSection,
  InputsSection,
  RadiusSection,
  SpacingSection,
  TypographySection,
} from './CharteSections';
import './Charte.css';

export function Charte() {
  return (
    <div className="charte-page">
      <Seo title="Charte graphique — Thomas Marguenot" noindex />
      <div className="charte-container">
        <div className="charte-hero">
          <h1 className="charte-title">Charte Graphique</h1>
          <p className="charte-subtitle">
            Design System inspiré du Liquid Glass d&apos;Apple - Élégant,
            moderne et fluide
          </p>
        </div>

        <ColorsSection />
        <TypographySection />
        <ButtonsSection />
        <InputsSection />
        <CardsSection />
        <SpacingSection />
        <RadiusSection />
        <GlassSection />
      </div>
    </div>
  );
}

export default Charte;
