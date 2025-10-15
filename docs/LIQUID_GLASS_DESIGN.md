# Charte Graphique - Liquid Glass Design System# Liquid Glass Design System



## 🎨 Vue d'ensemble## Vue d'ensemble



Design System inspiré du **Liquid Glass d'Apple**, caractérisé par :Le design de PhotoProject a été transformé pour adopter un style **Liquid Glass** moderne inspiré par Apple et les dernières tendances en UI/UX.

- Élégance et minimalisme

- Effets de transparence et de flou (frosted glass)## Inspirations

- Animations fluides et naturelles

- Hiérarchie visuelle claire- [Art Gallery - Artshop](https://dribbble.com/shots/26394129-Art-Gallery-Artshop)

- Accessibilité et lisibilité optimales- [Dia Browser](https://www.diabrowser.com/)

- [Apple Liquid Glass UI](https://dribbble.com/shots/26130788-A-glimpse-of-the-new-Apple-Liquid-Glass-UI-in-iOS-26)

## 🔗 Accès- Design Apple en général (clean, aéré, élégant)



La charte graphique complète est accessible à l'adresse : `/charte`## Caractéristiques principales



Cette page présente visuellement tous les éléments du design system.### 🎨 Système de couleurs



---Variables CSS définies dans `src/index.css` :



## 💙 Palette de Couleurs```css

--color-bg: #f5f5f7          /* Background principal */

### Couleur Principale--color-text: #1d1d1f         /* Texte principal */

- **Primary**: `#277DD4` - Actions principales, liens, éléments interactifs--color-text-secondary: #86868b  /* Texte secondaire */

- **Primary Light**: `#4A9FE8` - États hover, variante claire--color-accent: #0071e3       /* Couleur accent (bleu Apple) */

- **Primary Dark**: `#1A5BA8` - Contraste élevé, éléments importants```

- **Primary Subtle**: `rgba(39, 125, 212, 0.1)` - Backgrounds subtils, highlights

### 🥃 Effet Frosted Glass

### Couleurs de Surface

- **Background**: `#F5F7FA` - Arrière-plan généralToutes les cartes et composants utilisent l'effet "frosted glass" :

- **Surface**: `#FFFFFF` - Cartes, conteneurs, éléments en relief

- **Surface Elevated**: `#FFFFFF` - Éléments surélevés (modals, dropdowns)- **Background semi-transparent** : `rgba(255, 255, 255, 0.7)`

- **Backdrop blur** : 20px (40px pour le lightbox)

### Couleurs de Texte- **Bordures subtiles** : `rgba(255, 255, 255, 0.3)`

- **Text Primary**: `#1A1D29` - Titres, contenu principal- **Ombres douces** : multi-layer shadows pour depth

- **Text Secondary**: `#6B7280` - Descriptions, labels, texte secondaire

- **Text Tertiary**: `#9CA3AF` - Placeholders, hints, texte désactivé### 📐 Bordures arrondies



### Couleurs SémantiquesSystème de border-radius cohérent :

- **Success**: `#10B981` - Validations, confirmations

- **Warning**: `#F59E0B` - Avertissements, alertes- `--border-radius-sm: 16px`

- **Error**: `#EF4444` - Erreurs, actions destructives- `--border-radius-md: 24px`

- **Info**: `#3B82F6` - Informations, tooltips- `--border-radius-lg: 32px`



### Variables CSS### 🎭 Animations

```css

var(--color-primary)Animations fluides avec Framer Motion :

var(--color-primary-light)

var(--color-primary-dark)- **Spring transitions** pour un feeling Apple naturel

var(--color-primary-subtle)- **Staggered children** pour les animations de grille

var(--color-background)- **Custom easing** : `[0.32, 0.72, 0, 1]` (Apple's easing)

var(--color-surface)- **Hover effects** : scale(1.02) + translateY(-8px)

var(--color-text-primary)

var(--color-text-secondary)### 📱 Typographie

var(--color-text-tertiary)

```Police système Apple :



---```css

font-family: -apple-system, BlinkMacSystemFont, 

## 🔤 Typographie             'SF Pro Display', 'SF Pro Text', 

             'Helvetica Neue', Arial, sans-serif;

### Polices```

- **Titres**: Poppins, sans-serif (Poids: 300-800)

- **Corps de texte**: Space Grotesk, sans-serif (Poids: 300-700)- **Titres** : font-semibold avec letter-spacing négatif (-0.02em)

- **Corps** : letter-spacing subtil pour lisibilité

### Échelle Typographique- **Hiérarchie claire** : 7xl → 5xl → 2xl → xl



| Élément | Taille | Poids | Line Height | Usage |### 🖼️ Galerie d'images

|---------|--------|-------|-------------|-------|

| **H1** | 72px (4.5rem) | 800 | 1.1 | Titres de pages, hero sections |Changements majeurs :

| **H2** | 56px (3.5rem) | 700 | 1.15 | Sections principales |

| **H3** | 40px (2.5rem) | 600 | 1.2 | Sous-sections |- ✅ **Plus de rotation** des images portrait

| **H4** | 32px (2rem) | 600 | 1.3 | Titres de cartes |- ✅ **Aspect ratios cohérents** : 4/3, 3/4, 16/9

| **H5** | 24px (1.5rem) | 500 | 1.4 | Sous-titres |- ✅ **Espacement généreux** : 32-48px gaps

| **H6** | 20px (1.25rem) | 500 | 1.5 | Petits titres |- ✅ **Effet glass** sur chaque carte

| **Body Large** | 18px (1.125rem) | 400 | 1.6 | Introductions, texte mis en avant |- ✅ **Lightbox amélioré** avec wrapper glass

| **Body** | 16px (1rem) | 400 | 1.6 | Texte standard |

| **Small** | 14px (0.875rem) | 400 | 1.5 | Labels, annotations |### 🎯 Layout aéré



### Variables CSS- **Max-width conteneurs** : 1400px

```css- **Padding responsive** : 6 → 8 → 12 (mobile → tablet → desktop)

/* Fonts */- **Gaps importants** : 32-48px entre éléments

var(--font-heading)  /* Poppins */- **Hauteurs minimales** pour respiration

var(--font-body)     /* Space Grotesk */

## Composants mis à jour

/* Sizes */

var(--text-h1) à var(--text-h6)### `/src/index.css`

var(--text-body-large)- Variables CSS pour le design system

var(--text-body)- Police Apple SF Pro

var(--text-small)- Couleurs et effets glass

```

### `/src/pages/Gallery/`

### Responsive- **Gallery.css** : Refonte complète avec liquid glass

Sur mobile (< 768px) :- **galleryAnimations.ts** : Animations spring Apple-style

- H1: 48px (3rem)- **Lightbox.tsx** : Wrapper glass pour images

- H2: 40px (2.5rem)- **GalleryGrid/** : Grid aéré avec cards glass

- H3: 32px (2rem)

- H4: 24px (1.5rem)### `/src/components/layout/`

- H5: 20px (1.25rem)- **Header.css** : Sticky header avec backdrop blur

- H6: 18px (1.125rem)- **Footer.css** : Footer glass cohérent



---### `/src/pages/`

- **Home.css** : Hero + feature cards glass

## 🧩 Composants- **About.css** : Content card avec glass effect

- **LoadingFallback.css** : Spinner avec couleur accent

### Boutons

## Breakpoints

#### Primary

```css```css

background: var(--color-primary);/* Mobile first */

color: white;@media (min-width: 640px)  { /* Tablet */ }

padding: 12px 24px;@media (min-width: 1024px) { /* Desktop */ }

border-radius: var(--radius-lg);@media (min-width: 1280px) { /* Large Desktop */ }

box-shadow: var(--shadow-md);```

```

**États** :## Effets hover

- Hover: `background: var(--color-primary-dark)`, `transform: translateY(-2px)`

- Active: `transform: translateY(0)`Transitions cohérentes sur tous les éléments interactifs :

- Focus: Outline avec `var(--color-primary)`

```css

#### Secondarytransform: translateY(-8px) scale(1.02);

```cssbox-shadow: var(--glass-shadow-hover);

background: var(--glass-bg);transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

color: var(--color-primary);```

border: 2px solid var(--color-primary);

backdrop-filter: blur(var(--glass-blur));## Performance

```

- **Backdrop-filter avec fallback** pour compatibilité

#### Ghost- **Will-change évité** pour performances

```css- **Transitions GPU-accelerated** (transform, opacity)

background: transparent;- **Lazy loading** des images maintenu

color: var(--color-primary);

```## Accessibilité

**Hover** : `background: var(--color-primary-subtle)`

- ✅ Contraste texte/background respecté (WCAG AA)

### Champs de Formulaire- ✅ Focus states visibles

- ✅ ARIA labels sur boutons interactifs

```css- ✅ Keyboard navigation (Escape pour lightbox)

background: var(--glass-bg);

border: 2px solid var(--color-border);## Future améliorations

border-radius: var(--radius-lg);

padding: 12px 16px;- [ ] Dark mode avec variables CSS

backdrop-filter: blur(var(--glass-blur));- [ ] Reduced motion support (`prefers-reduced-motion`)

```- [ ] Progressive Web App features

- [ ] Image lazy loading avec blur placeholder

**États** :

- Focus: `border-color: var(--color-primary)`, `box-shadow: 0 0 0 4px var(--color-primary-subtle)`## Commandes utiles

- Error: `border-color: var(--color-error)`

- Disabled: `opacity: 0.5`, `cursor: not-allowed````bash

pnpm dev      # Lancer le dev server

### Cartespnpm build    # Build production

pnpm lint     # Vérifier le code

```csspnpm test     # Tests unitaires

background: var(--glass-bg-strong);```

backdrop-filter: blur(var(--glass-blur-strong));

border: 1px solid var(--glass-border);---

border-radius: var(--radius-xl);

padding: 32px;**Design inspiré par Apple** • Moderne • Clean • Aéré • Élégant

box-shadow: var(--shadow-lg);
```

**Hover** :
```css
transform: translateY(-8px);
box-shadow: var(--shadow-xl);
```

---

## 🌊 Effets Liquid Glass

### Transparence et Flou

| Variante | Background | Backdrop Filter | Usage |
|----------|-----------|-----------------|-------|
| **Subtle** | `rgba(255, 255, 255, 0.4)` | `blur(20px)` | Overlays légers |
| **Normal** | `rgba(255, 255, 255, 0.7)` | `blur(20px)` | Header, Footer, Cards |
| **Strong** | `rgba(255, 255, 255, 0.9)` | `blur(40px)` | Modals, Menus |

### Variables CSS
```css
var(--glass-bg)           /* Normal */
var(--glass-bg-subtle)    /* Subtle */
var(--glass-bg-strong)    /* Strong */
var(--glass-border)       /* rgba(255, 255, 255, 0.3) */
var(--glass-blur)         /* 20px */
var(--glass-blur-strong)  /* 40px */
```

### Ombres - Système d'Élévation

```css
var(--shadow-sm)  /* 0 1px 2px rgba(0, 0, 0, 0.05) */
var(--shadow-md)  /* 0 4px 12px rgba(0, 0, 0, 0.08) */
var(--shadow-lg)  /* 0 8px 24px rgba(0, 0, 0, 0.12) */
var(--shadow-xl)  /* 0 16px 48px rgba(0, 0, 0, 0.16) */
```

**Liquid Glass Shadows** (pour effets glass) :
```css
var(--glass-shadow)       /* 0 8px 32px rgba(31, 38, 135, 0.15) */
var(--glass-shadow-lg)    /* 0 16px 48px rgba(31, 38, 135, 0.2) */
var(--glass-shadow-hover) /* 0 12px 40px rgba(31, 38, 135, 0.25) */
```

---

## 📐 Espacements

Échelle cohérente basée sur un système de 8px :

| Nom | Valeur | Variable CSS |
|-----|--------|--------------|
| **XS** | 8px (0.5rem) | `var(--spacing-xs)` |
| **SM** | 12px (0.75rem) | `var(--spacing-sm)` |
| **MD** | 16px (1rem) | `var(--spacing-md)` |
| **LG** | 24px (1.5rem) | `var(--spacing-lg)` |
| **XL** | 32px (2rem) | `var(--spacing-xl)` |
| **2XL** | 48px (3rem) | `var(--spacing-2xl)` |
| **3XL** | 64px (4rem) | `var(--spacing-3xl)` |
| **4XL** | 96px (6rem) | `var(--spacing-4xl)` |

---

## 🔘 Border Radius

| Nom | Valeur | Variable CSS | Usage |
|-----|--------|--------------|-------|
| **XS** | 4px (0.25rem) | `var(--radius-xs)` | Petits éléments |
| **SM** | 8px (0.5rem) | `var(--radius-sm)` | Badges, tags |
| **MD** | 12px (0.75rem) | `var(--radius-md)` | Inputs, buttons |
| **LG** | 16px (1rem) | `var(--radius-lg)` | Cards, sections |
| **XL** | 24px (1.5rem) | `var(--radius-xl)` | Grandes cards |
| **2XL** | 32px (2rem) | `var(--radius-2xl)` | Containers |
| **Full** | 9999px | `var(--radius-full)` | Cercles |

---

## ⚡ Animations

### Durées
```css
var(--animation-duration-fast)  /* 0.3s - Micro-interactions */
var(--animation-duration)       /* 0.6s - Transitions standard */
var(--animation-duration-slow)  /* 0.9s - Animations complexes */
```

### Easing
```css
var(--animation-easing)        /* cubic-bezier(0.25, 0.46, 0.45, 0.94) - Standard */
var(--animation-easing-smooth) /* cubic-bezier(0.32, 0.72, 0, 1) - Smooth */
var(--animation-easing-bounce) /* cubic-bezier(0.68, -0.55, 0.265, 1.55) - Bounce */
```

### Usage avec Framer Motion
```tsx
const transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={transition}
>
  Content
</motion.div>
```

---

## 🎯 Bonnes Pratiques

### Utilisation des Couleurs
- ✅ Toujours utiliser les variables CSS pour la cohérence
- ✅ Respecter les contrastes WCAG AA minimum (4.5:1 pour le texte)
- ✅ Utiliser `primary-subtle` pour les backgrounds subtils
- ❌ Ne jamais hardcoder de valeurs hexadécimales

### Typographie
- ✅ Utiliser la hiérarchie définie (H1 → H6)
- ✅ Respecter les line-heights pour la lisibilité
- ✅ Poppins pour les titres, Space Grotesk pour le corps
- ❌ Ne pas dépasser 80 caractères par ligne

### Glass Effects
- ✅ Utiliser `backdrop-filter: blur()` avec les variables
- ✅ Combiner avec des ombres légères
- ✅ Assurer la lisibilité du contenu
- ❌ Ne pas surcharger avec trop d'effets

### Animations
- ✅ Utiliser les durées et easing standards
- ✅ Privilégier `transform` et `opacity` pour la performance
- ✅ Toujours prévoir un état de repos
- ❌ Ne pas animer trop d'éléments simultanément

### Responsive
- ✅ Tester sur mobile, tablette et desktop
- ✅ Adapter la typographie pour mobile
- ✅ Utiliser les espacements de façon flexible
- ❌ Ne pas forcer de largeurs fixes

---

## 🛠️ Implémentation Technique

### Import des Polices
Les polices sont chargées via Google Fonts dans `index.css` :
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Utilisation avec Tailwind
Toutes les variables CSS peuvent être utilisées avec Tailwind :
```tsx
<div className="bg-[var(--color-primary)] rounded-[var(--radius-lg)]">
  Content
</div>
```

### Background Gradient
Le body utilise un gradient subtil :
```css
background: linear-gradient(135deg, #E3F2FD 0%, #F5F7FA 50%, #E8EAF6 100%);
background-attachment: fixed;
```

---

## 📚 Ressources

- **Apple Liquid Glass**: [Design Reference](https://www.apple.com/fr/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- **Poppins Font**: [Google Fonts](https://fonts.google.com/specimen/Poppins)
- **Space Grotesk Font**: [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
- **Framer Motion**: [Documentation](https://www.framer.com/motion/)

---

## 🔄 Évolutions Futures

### Mode Sombre
- Adapter les couleurs pour un thème sombre
- Ajuster les effets glass pour le fond noir
- Maintenir les contrastes accessibles

### Composants Avancés
- Modals avec effet glass
- Dropdowns animés
- Toasts et notifications
- Progress bars
- Sliders

### Tokens de Design
- Exporter en JSON pour Figma
- Créer un package NPM dédié
- Documentation interactive avec Storybook
