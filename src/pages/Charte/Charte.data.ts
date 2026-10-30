import type {
  ButtonExample,
  CardExample,
  ColorToken,
  GlassExample,
  ScaleToken,
  TypographyExample,
} from './Charte.types';

export const COLORS: ColorToken[] = [
  {
    name: 'Primary',
    token: '--color-primary',
    description: 'Couleur principale - Actions et éléments interactifs',
  },
  {
    name: 'Primary Light',
    token: '--color-primary-light',
    description: 'Variante claire - Hover et états actifs',
  },
  {
    name: 'Primary Dark',
    token: '--color-primary-dark',
    description: 'Variante foncée - Contraste et profondeur',
  },
  {
    name: 'Primary Subtle',
    token: '--color-primary-subtle',
    description: 'Version transparente - Backgrounds subtils',
  },
  {
    name: 'Background',
    token: '--color-background',
    description: 'Arrière-plan principal de la page',
  },
  {
    name: 'Surface',
    token: '--color-surface',
    description: 'Cartes et conteneurs',
  },
  {
    name: 'Text Primary',
    token: '--color-text-primary',
    description: 'Texte principal - Titres et contenu important',
  },
  {
    name: 'Text Secondary',
    token: '--color-text-secondary',
    description: 'Texte secondaire - Descriptions et labels',
  },
  {
    name: 'Text Tertiary',
    token: '--color-text-tertiary',
    description: 'Texte tertiaire - Placeholders et hints',
  },
  {
    name: 'Success',
    token: '--color-success',
    description: 'Messages de succès et validation',
  },
  {
    name: 'Warning',
    token: '--color-warning',
    description: 'Avertissements et alertes',
  },
  {
    name: 'Error',
    token: '--color-error',
    description: 'Erreurs et actions destructives',
  },
];

export const TYPOGRAPHY_EXAMPLES: TypographyExample[] = [
  { label: 'h1', element: 'h1', text: 'Titre H1 - 72px / Poppins ExtraBold' },
  { label: 'h2', element: 'h2', text: 'Titre H2 - 56px / Poppins Bold' },
  { label: 'h3', element: 'h3', text: 'Titre H3 - 40px / Poppins SemiBold' },
  { label: 'h4', element: 'h4', text: 'Titre H4 - 32px / Poppins SemiBold' },
  { label: 'h5', element: 'h5', text: 'Titre H5 - 24px / Poppins Medium' },
  { label: 'h6', element: 'h6', text: 'Titre H6 - 20px / Poppins Medium' },
  {
    label: 'body-large',
    element: 'p',
    text: 'Body Large - 18px / Space Grotesk - Pour les introductions et textes mis en avant',
    fontSize: 'var(--text-body-large)',
  },
  {
    label: 'body',
    element: 'p',
    text: 'Body - 16px / Space Grotesk - Texte standard pour le contenu principal',
    fontSize: 'var(--text-body)',
  },
  {
    label: 'small',
    element: 'p',
    text: 'Small - 14px / Space Grotesk - Texte secondaire, labels et annotations',
    fontSize: 'var(--text-small)',
  },
];

export const BUTTONS: ButtonExample[] = [
  { variant: 'primary', label: 'Bouton Primary' },
  { variant: 'secondary', label: 'Bouton Secondary' },
  { variant: 'ghost', label: 'Bouton Ghost' },
];

export const SPACINGS: ScaleToken[] = [
  { size: 'xs', value: '8px' },
  { size: 'sm', value: '12px' },
  { size: 'md', value: '16px' },
  { size: 'lg', value: '24px' },
  { size: 'xl', value: '32px' },
  { size: '2xl', value: '48px' },
  { size: '3xl', value: '64px' },
  { size: '4xl', value: '96px' },
];

export const RADII: ScaleToken[] = [
  { size: 'xs', value: '4px' },
  { size: 'sm', value: '8px' },
  { size: 'md', value: '12px' },
  { size: 'lg', value: '16px' },
  { size: 'xl', value: '24px' },
  { size: '2xl', value: '32px' },
];

export const DEMO_CARDS: CardExample[] = [
  {
    title: 'Card Title',
    text: 'Exemple de carte avec effet glass et animation au hover. Le contenu est lisible et élégant.',
  },
  {
    title: 'Another Card',
    text: 'Les cartes utilisent backdrop-filter pour un effet de flou sophistiqué.',
  },
  {
    title: 'Third Card',
    text: 'Chaque carte réagit au survol avec une animation fluide et naturelle.',
  },
];

export const GLASS_EXAMPLES: GlassExample[] = [
  {
    title: 'Glass Subtle',
    text: "Effet de verre léger avec 70% d'opacité et 20px de flou.",
    background: 'var(--glass-bg)',
    blur: 'var(--glass-blur)',
  },
  {
    title: 'Glass Strong',
    text: "Effet de verre intense avec 90% d'opacité et 40px de flou.",
    background: 'var(--glass-bg-strong)',
    blur: 'var(--glass-blur-strong)',
  },
  {
    title: 'Glass Ultra Subtle',
    text: "Effet minimal avec 40% d'opacité pour des overlays discrets.",
    background: 'var(--glass-bg-subtle)',
    blur: 'var(--glass-blur)',
  },
];
