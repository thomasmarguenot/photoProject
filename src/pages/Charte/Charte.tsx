import type {
  ButtonExampleProps,
  ColorCardProps,
  SpacingExampleProps,
  TypographyExampleProps,
} from './Charte.types';
import './Charte.css';

export function Charte() {
  const colors: ColorCardProps[] = [
    {
      name: 'Primary',
      value: '#277DD4',
      description: 'Couleur principale - Actions et éléments interactifs',
    },
    {
      name: 'Primary Light',
      value: '#4A9FE8',
      description: 'Variante claire - Hover et états actifs',
    },
    {
      name: 'Primary Dark',
      value: '#1A5BA8',
      description: 'Variante foncée - Contraste et profondeur',
    },
    {
      name: 'Primary Subtle',
      value: 'rgba(39, 125, 212, 0.1)',
      description: 'Version transparente - Backgrounds subtils',
    },
    {
      name: 'Background',
      value: '#F5F7FA',
      description: 'Arrière-plan principal de la page',
    },
    {
      name: 'Surface',
      value: '#FFFFFF',
      description: 'Cartes et conteneurs',
    },
    {
      name: 'Text Primary',
      value: '#1A1D29',
      description: 'Texte principal - Titres et contenu important',
    },
    {
      name: 'Text Secondary',
      value: '#6B7280',
      description: 'Texte secondaire - Descriptions et labels',
    },
    {
      name: 'Text Tertiary',
      value: '#9CA3AF',
      description: 'Texte tertiaire - Placeholders et hints',
    },
    {
      name: 'Success',
      value: '#10B981',
      description: 'Messages de succès et validation',
    },
    {
      name: 'Warning',
      value: '#F59E0B',
      description: 'Avertissements et alertes',
    },
    {
      name: 'Error',
      value: '#EF4444',
      description: 'Erreurs et actions destructives',
    },
  ];

  const typographyExamples: TypographyExampleProps[] = [
    { tag: 'h1', text: 'Titre H1 - 72px / Poppins ExtraBold' },
    { tag: 'h2', text: 'Titre H2 - 56px / Poppins Bold' },
    { tag: 'h3', text: 'Titre H3 - 40px / Poppins SemiBold' },
    { tag: 'h4', text: 'Titre H4 - 32px / Poppins SemiBold' },
    { tag: 'h5', text: 'Titre H5 - 24px / Poppins Medium' },
    { tag: 'h6', text: 'Titre H6 - 20px / Poppins Medium' },
    {
      tag: 'body-large',
      text: 'Body Large - 18px / Space Grotesk - Pour les introductions et textes mis en avant',
    },
    {
      tag: 'body',
      text: 'Body - 16px / Space Grotesk - Texte standard pour le contenu principal',
    },
    {
      tag: 'small',
      text: 'Small - 14px / Space Grotesk - Texte secondaire, labels et annotations',
    },
  ];

  const buttons: ButtonExampleProps[] = [
    { variant: 'primary', children: 'Bouton Primary' },
    { variant: 'secondary', children: 'Bouton Secondary' },
    { variant: 'ghost', children: 'Bouton Ghost' },
  ];

  const spacings: SpacingExampleProps[] = [
    { size: 'xs', value: '8px' },
    { size: 'sm', value: '12px' },
    { size: 'md', value: '16px' },
    { size: 'lg', value: '24px' },
    { size: 'xl', value: '32px' },
    { size: '2xl', value: '48px' },
    { size: '3xl', value: '64px' },
    { size: '4xl', value: '96px' },
  ];

  const radii = [
    { size: 'xs', value: '4px' },
    { size: 'sm', value: '8px' },
    { size: 'md', value: '12px' },
    { size: 'lg', value: '16px' },
    { size: 'xl', value: '24px' },
    { size: '2xl', value: '32px' },
  ];

  const renderTypographyTag = (example: TypographyExampleProps) => {
    const className = 'typography-text';

    switch (example.tag) {
      case 'h1':
        return <h1 className={className}>{example.text}</h1>;
      case 'h2':
        return <h2 className={className}>{example.text}</h2>;
      case 'h3':
        return <h3 className={className}>{example.text}</h3>;
      case 'h4':
        return <h4 className={className}>{example.text}</h4>;
      case 'h5':
        return <h5 className={className}>{example.text}</h5>;
      case 'h6':
        return <h6 className={className}>{example.text}</h6>;
      case 'body-large':
        return (
          <p
            className={className}
            style={{ fontSize: 'var(--text-body-large)' }}
          >
            {example.text}
          </p>
        );
      case 'body':
        return (
          <p className={className} style={{ fontSize: 'var(--text-body)' }}>
            {example.text}
          </p>
        );
      case 'small':
        return (
          <p className={className} style={{ fontSize: 'var(--text-small)' }}>
            {example.text}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="charte-page">
      <div className="charte-container">
        {/* Hero Section */}
        <div className="charte-hero">
          <h1 className="charte-title">Charte Graphique</h1>
          <p className="charte-subtitle">
            Design System inspiré du Liquid Glass d&apos;Apple - Élégant,
            moderne et fluide
          </p>
        </div>

        {/* Colors Section */}
        <section className="charte-section">
          <h2 className="section-title">Palette de Couleurs</h2>
          <p className="section-description">
            Palette harmonieuse centrée sur le bleu #277DD4, avec des variations
            pour tous les besoins d&apos;interface.
          </p>
          <div className="color-grid">
            {colors.map((color) => (
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
        </section>

        {/* Typography Section */}
        <section className="charte-section">
          <h2 className="section-title">Typographie</h2>
          <p className="section-description">
            Système typographique utilisant Poppins pour les titres et Space
            Grotesk pour le corps de texte.
          </p>
          <div className="typography-grid">
            {typographyExamples.map((example) => (
              <div key={example.tag} className="typography-example">
                <div className="typography-label">
                  {example.tag.toUpperCase()}
                </div>
                {renderTypographyTag(example)}
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="charte-section">
          <h2 className="section-title">Boutons</h2>
          <p className="section-description">
            Trois variantes de boutons avec des états hover et actifs fluides.
          </p>
          <div className="button-grid">
            {buttons.map((button) => (
              <button
                key={button.variant}
                type="button"
                className={`demo-button ${button.variant}`}
                onClick={button.onClick}
              >
                {button.children}
              </button>
            ))}
          </div>
        </section>

        {/* Form Inputs Section */}
        <section className="charte-section">
          <h2 className="section-title">Champs de Formulaire</h2>
          <p className="section-description">
            Inputs avec effet glass et focus states élégants.
          </p>
          <div className="input-grid">
            <input type="text" className="demo-input" placeholder="Texte" />
            <input type="email" className="demo-input" placeholder="Email" />
            <input
              type="password"
              className="demo-input"
              placeholder="Mot de passe"
            />
          </div>
        </section>

        {/* Cards Section */}
        <section className="charte-section">
          <h2 className="section-title">Cartes</h2>
          <p className="section-description">
            Cartes avec effet de verre dépoli et ombres subtiles inspirées du
            Liquid Glass.
          </p>
          <div className="card-grid">
            <div className="demo-card">
              <h3 className="card-title">Card Title</h3>
              <p className="card-text">
                Exemple de carte avec effet glass et animation au hover. Le
                contenu est lisible et élégant.
              </p>
            </div>
            <div className="demo-card">
              <h3 className="card-title">Another Card</h3>
              <p className="card-text">
                Les cartes utilisent backdrop-filter pour un effet de flou
                sophistiqué.
              </p>
            </div>
            <div className="demo-card">
              <h3 className="card-title">Third Card</h3>
              <p className="card-text">
                Chaque carte réagit au survol avec une animation fluide et
                naturelle.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="charte-section">
          <h2 className="section-title">Espacements</h2>
          <p className="section-description">
            Échelle d&apos;espacements cohérente pour une hiérarchie visuelle
            harmonieuse.
          </p>
          <div className="spacing-grid">
            {spacings.map((spacing) => (
              <div key={spacing.size} className="spacing-item">
                <div className="spacing-label">
                  {spacing.size} ({spacing.value})
                </div>
                <div
                  className="spacing-demo"
                  style={{ width: spacing.value }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="charte-section">
          <h2 className="section-title">Border Radius</h2>
          <p className="section-description">
            Arrondis variés pour créer des interfaces douces et accueillantes.
          </p>
          <div className="radius-grid">
            {radii.map((radius) => (
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
        </section>

        {/* Glass Effects Section */}
        <section className="charte-section">
          <h2 className="section-title">Effets Liquid Glass</h2>
          <p className="section-description">
            Effets de transparence et de flou caractéristiques du design Apple.
          </p>
          <div className="card-grid">
            <div
              className="demo-card"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: `blur(var(--glass-blur))`,
              }}
            >
              <h3 className="card-title">Glass Subtle</h3>
              <p className="card-text">
                Effet de verre léger avec 70% d&apos;opacité et 20px de flou.
              </p>
            </div>
            <div
              className="demo-card"
              style={{
                background: 'var(--glass-bg-strong)',
                backdropFilter: `blur(var(--glass-blur-strong))`,
              }}
            >
              <h3 className="card-title">Glass Strong</h3>
              <p className="card-text">
                Effet de verre intense avec 90% d&apos;opacité et 40px de flou.
              </p>
            </div>
            <div
              className="demo-card"
              style={{
                background: 'var(--glass-bg-subtle)',
                backdropFilter: `blur(var(--glass-blur))`,
              }}
            >
              <h3 className="card-title">Glass Ultra Subtle</h3>
              <p className="card-text">
                Effet minimal avec 40% d&apos;opacité pour des overlays
                discrets.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Charte;
