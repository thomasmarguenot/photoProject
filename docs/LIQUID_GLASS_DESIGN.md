# Liquid Glass Design System

## Vue d'ensemble

Le design de PhotoProject a été transformé pour adopter un style **Liquid Glass** moderne inspiré par Apple et les dernières tendances en UI/UX.

## Inspirations

- [Art Gallery - Artshop](https://dribbble.com/shots/26394129-Art-Gallery-Artshop)
- [Dia Browser](https://www.diabrowser.com/)
- [Apple Liquid Glass UI](https://dribbble.com/shots/26130788-A-glimpse-of-the-new-Apple-Liquid-Glass-UI-in-iOS-26)
- Design Apple en général (clean, aéré, élégant)

## Caractéristiques principales

### 🎨 Système de couleurs

Variables CSS définies dans `src/index.css` :

```css
--color-bg: #f5f5f7          /* Background principal */
--color-text: #1d1d1f         /* Texte principal */
--color-text-secondary: #86868b  /* Texte secondaire */
--color-accent: #0071e3       /* Couleur accent (bleu Apple) */
```

### 🥃 Effet Frosted Glass

Toutes les cartes et composants utilisent l'effet "frosted glass" :

- **Background semi-transparent** : `rgba(255, 255, 255, 0.7)`
- **Backdrop blur** : 20px (40px pour le lightbox)
- **Bordures subtiles** : `rgba(255, 255, 255, 0.3)`
- **Ombres douces** : multi-layer shadows pour depth

### 📐 Bordures arrondies

Système de border-radius cohérent :

- `--border-radius-sm: 16px`
- `--border-radius-md: 24px`
- `--border-radius-lg: 32px`

### 🎭 Animations

Animations fluides avec Framer Motion :

- **Spring transitions** pour un feeling Apple naturel
- **Staggered children** pour les animations de grille
- **Custom easing** : `[0.32, 0.72, 0, 1]` (Apple's easing)
- **Hover effects** : scale(1.02) + translateY(-8px)

### 📱 Typographie

Police système Apple :

```css
font-family: -apple-system, BlinkMacSystemFont, 
             'SF Pro Display', 'SF Pro Text', 
             'Helvetica Neue', Arial, sans-serif;
```

- **Titres** : font-semibold avec letter-spacing négatif (-0.02em)
- **Corps** : letter-spacing subtil pour lisibilité
- **Hiérarchie claire** : 7xl → 5xl → 2xl → xl

### 🖼️ Galerie d'images

Changements majeurs :

- ✅ **Plus de rotation** des images portrait
- ✅ **Aspect ratios cohérents** : 4/3, 3/4, 16/9
- ✅ **Espacement généreux** : 32-48px gaps
- ✅ **Effet glass** sur chaque carte
- ✅ **Lightbox amélioré** avec wrapper glass

### 🎯 Layout aéré

- **Max-width conteneurs** : 1400px
- **Padding responsive** : 6 → 8 → 12 (mobile → tablet → desktop)
- **Gaps importants** : 32-48px entre éléments
- **Hauteurs minimales** pour respiration

## Composants mis à jour

### `/src/index.css`
- Variables CSS pour le design system
- Police Apple SF Pro
- Couleurs et effets glass

### `/src/pages/Gallery/`
- **Gallery.css** : Refonte complète avec liquid glass
- **galleryAnimations.ts** : Animations spring Apple-style
- **Lightbox.tsx** : Wrapper glass pour images
- **GalleryGrid/** : Grid aéré avec cards glass

### `/src/components/layout/`
- **Header.css** : Sticky header avec backdrop blur
- **Footer.css** : Footer glass cohérent

### `/src/pages/`
- **Home.css** : Hero + feature cards glass
- **About.css** : Content card avec glass effect
- **LoadingFallback.css** : Spinner avec couleur accent

## Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

## Effets hover

Transitions cohérentes sur tous les éléments interactifs :

```css
transform: translateY(-8px) scale(1.02);
box-shadow: var(--glass-shadow-hover);
transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
```

## Performance

- **Backdrop-filter avec fallback** pour compatibilité
- **Will-change évité** pour performances
- **Transitions GPU-accelerated** (transform, opacity)
- **Lazy loading** des images maintenu

## Accessibilité

- ✅ Contraste texte/background respecté (WCAG AA)
- ✅ Focus states visibles
- ✅ ARIA labels sur boutons interactifs
- ✅ Keyboard navigation (Escape pour lightbox)

## Future améliorations

- [ ] Dark mode avec variables CSS
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Progressive Web App features
- [ ] Image lazy loading avec blur placeholder

## Commandes utiles

```bash
pnpm dev      # Lancer le dev server
pnpm build    # Build production
pnpm lint     # Vérifier le code
pnpm test     # Tests unitaires
```

---

**Design inspiré par Apple** • Moderne • Clean • Aéré • Élégant
