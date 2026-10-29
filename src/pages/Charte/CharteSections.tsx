import {
  BUTTONS,
  COLORS,
  DEMO_CARDS,
  GLASS_EXAMPLES,
  RADII,
  SPACINGS,
  TYPOGRAPHY_EXAMPLES,
} from './Charte.data';
import { CharteSection } from './CharteSection';

export function ColorsSection() {
  return (
    <CharteSection
      title="Palette de Couleurs"
      description="Palette harmonieuse centrée sur le bleu #277DD4, avec des variations pour tous les besoins d'interface."
    >
      <div className="color-grid">
        {COLORS.map((color) => (
          <div key={color.name} className="color-card">
            <div
              className="color-preview"
              style={{ backgroundColor: color.value }}
            />
            <div className="color-info">
              <div className="color-name">{color.name}</div>
              <div className="color-value">{color.value}</div>
              {color.description && (
                <div className="color-description">{color.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </CharteSection>
  );
}

export function TypographySection() {
  return (
    <CharteSection
      title="Typographie"
      description="Système typographique utilisant Poppins pour les titres et Space Grotesk pour le corps de texte."
    >
      <div className="typography-grid">
        {TYPOGRAPHY_EXAMPLES.map(({ label, element: Tag, text, fontSize }) => (
          <div key={label} className="typography-example">
            <div className="typography-label">{label.toUpperCase()}</div>
            <Tag
              className="typography-text"
              style={fontSize ? { fontSize } : undefined}
            >
              {text}
            </Tag>
          </div>
        ))}
      </div>
    </CharteSection>
  );
}

export function ButtonsSection() {
  return (
    <CharteSection
      title="Boutons"
      description="Trois variantes de boutons avec des états hover et actifs fluides."
    >
      <div className="button-grid">
        {BUTTONS.map((button) => (
          <button
            key={button.variant}
            type="button"
            className={`demo-button ${button.variant}`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </CharteSection>
  );
}

export function InputsSection() {
  return (
    <CharteSection
      title="Champs de Formulaire"
      description="Inputs avec effet glass et focus states élégants."
    >
      <div className="input-grid">
        <input type="text" className="demo-input" placeholder="Texte" />
        <input type="email" className="demo-input" placeholder="Email" />
        <input
          type="password"
          className="demo-input"
          placeholder="Mot de passe"
        />
      </div>
    </CharteSection>
  );
}

export function CardsSection() {
  return (
    <CharteSection
      title="Cartes"
      description="Cartes avec effet de verre dépoli et ombres subtiles inspirées du Liquid Glass."
    >
      <div className="card-grid">
        {DEMO_CARDS.map((card) => (
          <div key={card.title} className="demo-card">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-text">{card.text}</p>
          </div>
        ))}
      </div>
    </CharteSection>
  );
}

export function SpacingSection() {
  return (
    <CharteSection
      title="Espacements"
      description="Échelle d'espacements cohérente pour une hiérarchie visuelle harmonieuse."
    >
      <div className="spacing-grid">
        {SPACINGS.map((spacing) => (
          <div key={spacing.size} className="spacing-item">
            <div className="spacing-label">
              {spacing.size} ({spacing.value})
            </div>
            <div className="spacing-demo" style={{ width: spacing.value }} />
          </div>
        ))}
      </div>
    </CharteSection>
  );
}

export function RadiusSection() {
  return (
    <CharteSection
      title="Border Radius"
      description="Arrondis variés pour créer des interfaces douces et accueillantes."
    >
      <div className="radius-grid">
        {RADII.map((radius) => (
          <div key={radius.size} className="radius-item">
            <div
              className="radius-demo"
              style={{ borderRadius: `var(--radius-${radius.size})` }}
            />
            <div className="radius-label">
              {radius.size} ({radius.value})
            </div>
          </div>
        ))}
      </div>
    </CharteSection>
  );
}

export function GlassSection() {
  return (
    <CharteSection
      title="Effets Liquid Glass"
      description="Effets de transparence et de flou caractéristiques du design Apple."
    >
      <div className="card-grid">
        {GLASS_EXAMPLES.map((glass) => (
          <div
            key={glass.title}
            className="demo-card"
            style={{
              background: glass.background,
              backdropFilter: `blur(${glass.blur})`,
            }}
          >
            <h3 className="card-title">{glass.title}</h3>
            <p className="card-text">{glass.text}</p>
          </div>
        ))}
      </div>
    </CharteSection>
  );
}
