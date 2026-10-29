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
