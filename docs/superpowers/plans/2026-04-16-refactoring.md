# Refactoring Plan — CSS, Variables & Clean Architecture

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre le codebase cohérent : CSS entièrement piloté par des variables, zéro valeur en dur, et architecture propre (orchestrateurs + hooks + utils) pour tous les composants.

**Architecture:** Trois axes de refacto indépendants — (1) consolidation des variables CSS/TS, (2) extraction des fichiers trop longs, (3) suppression des valeurs en dur dans les CSS composant. Chaque tâche est auto-suffisante et commitée séparément.

**Tech Stack:** React 19, Tailwind v4, Framer Motion, TypeScript strict, CSS custom properties, pnpm

---

## Fichiers concernés

| Fichier | Action | Raison |
|---------|--------|--------|
| `src/utils/constants.ts` | Modifier | Ajouter constantes de délai d'animation |
| `src/index.css` | Modifier | Ajouter variables manquantes (couleurs, spacings) |
| `src/pages/Charte/Charte.tsx` | Splitter | 382 lignes > 150 |
| `src/pages/Charte/CharteData.ts` | Créer | Données extraites de Charte.tsx |
| `src/pages/Home/HeroSection/TechStackCard.tsx` | Splitter | 218 lignes > 150 |
| `src/pages/Home/HeroSection/useTechStack.ts` | Créer | Hook extrait de TechStackCard.tsx |
| `src/pages/Home/HeroSection/TechStackCard.utils.ts` | Créer | defaultTechnologies + helpers |
| `src/pages/Home/AgencySection/AgencySection.css` | Modifier | Remplacer valeurs en dur par var() |
| `src/pages/Home/ClientsSection/ClientsSection.css` | Modifier | Remplacer valeurs en dur par var() |
| `src/components/layout/Header/Header.css` | Modifier | Gradient et timing en variables |
| `src/components/layout/Footer/Footer.css` | Modifier | Couleur en variable |
| `src/components/atoms/TypewriterText/TypewriterText.css` | Modifier | rgba en variable |
| `src/components/common/LoadingFallback/LoadingFallback.css` | Modifier | Timing et rgba en variables |
| `src/pages/Home/HeroSection/HeroSection.css` | Modifier | Timing et spacing en variables |
| `src/pages/Home/HeroSection/TechStackCard.css` | Modifier | Timing, sizing en variables |
| `src/pages/Gallery/Gallery.css` | Modifier | Timing en variables |
| `src/pages/Gallery/GalleryGrid/GalleryGrid.css` | Modifier | Timing en variables |
| `src/pages/About/About.css` | Modifier | Timing et sizing en variables |
| `src/pages/Home/HeroSection/AgencySection.tsx` | Modifier | Délais hard-codés → constantes |
| `src/pages/Home/ClientsSection/ClientsSection.tsx` | Modifier | Délai hard-codé → constante |
| `src/pages/Home/HeroSection/HeroSection.tsx` | Modifier | Délai hard-codé → constante |

---

## Tâche 1 : Centraliser les variables CSS manquantes dans `src/index.css`

Les CSS composant utilisent des couleurs et spacings qui n'existent pas encore dans l'index (rgba opaques, couleurs `#1d1d1f`, `#86868b`, etc.).

**Fichiers :**
- Modifier : `src/index.css`

- [ ] **Step 1 : Ajouter les variables manquantes dans la section `:root` de `src/index.css`**

Ouvrir `src/index.css`. Après la section des variables de couleur existantes (chercher `--color-text-tertiary`), ajouter :

```css
/* Opacity utilities — replaces inline rgba() */
--color-text-primary-45: color-mix(in srgb, var(--color-text-primary) 45%, transparent);
--color-text-primary-10: color-mix(in srgb, var(--color-text-primary) 10%, transparent);
--color-primary-40: color-mix(in srgb, var(--color-primary) 40%, transparent);
--color-primary-20: color-mix(in srgb, var(--color-primary) 20%, transparent);
--color-black-10: color-mix(in srgb, #000 10%, transparent);
--color-black-8: color-mix(in srgb, #000 8%, transparent);
--color-black-6: color-mix(in srgb, #000 6%, transparent);

/* Extended semantic colors */
--color-surface-dark: #1d1d1f;
--color-text-muted: #86868b;
--color-text-subtle: #6e6e73;

/* Animation delay constants — mirror src/utils/constants.ts ANIMATION.DELAY */
--animation-delay-xs: 0.1s;
--animation-delay-sm: 0.3s;
--animation-delay-md: 0.6s;
--animation-delay-lg: 0.85s;
--animation-delay-xl: 1.1s;
--animation-delay-2xl: 1.2s;
--animation-delay-3xl: 1.4s;

/* Component-specific sizes that appear repeatedly */
--size-tech-card-width: 300px;
--size-hero-min-height: 80vh;
--size-agency-image-width: 240px;
--size-agency-image-width-sm: 120px;
--size-agency-max-width: 560px;
--size-clients-logo-height: 70px;
--size-about-col-width: 380px;
--size-gallery-min-col: 300px;

/* Loading fallback */
--loading-spinner-size: 60px;
--loading-spinner-duration: 3s;
--loading-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Hero scroll animation */
--hero-scroll-duration: 20s;
```

- [ ] **Step 2 : Vérifier typecheck + lint**

```bash
cd /Users/thomasmarguenot/Sites/photoProject
pnpm typecheck && pnpm lint
```

Expected : 0 erreurs.

- [ ] **Step 3 : Commit**

```bash
git add src/index.css
git commit -m "feat(css): add missing CSS custom properties for colors, spacing and animation delays"
```

---

## Tâche 2 : Ajouter les délais d'animation dans `src/utils/constants.ts`

Les composants utilisent des délais fractionnés (0.6, 0.85, 1.1, 1.2, 1.4) non déclarés dans les constantes TS.

**Fichiers :**
- Modifier : `src/utils/constants.ts`

- [ ] **Step 1 : Ouvrir `src/utils/constants.ts` et repérer le bloc `ANIMATION`**

Il contient actuellement `DURATION`, `EASING`. Ajouter un sous-objet `DELAY` :

```typescript
export const ANIMATION = {
  DURATION: 0.6,
  DURATION_FAST: 0.3,
  DURATION_SLOW: 0.9,
  EASING: [0.25, 0.46, 0.45, 0.94],
  EASING_SMOOTH: [0.4, 0, 0.2, 1],
  EASING_BOUNCE: [0.68, -0.55, 0.265, 1.55],
  DELAY: {
    XS: 0.1,
    SM: 0.3,
    MD: 0.6,
    LG: 0.85,
    XL: 1.1,
    XXL: 1.2,
    XXXL: 1.4,
  },
} as const;
```

> Note : adapter au contenu réel du fichier — ne pas supprimer ce qui existe déjà, juste ajouter `DELAY` et les easings manquants si besoin.

- [ ] **Step 2 : Vérifier typecheck**

```bash
pnpm typecheck
```

Expected : 0 erreurs.

- [ ] **Step 3 : Commit**

```bash
git add src/utils/constants.ts
git commit -m "feat(constants): add ANIMATION.DELAY and EASING_BOUNCE constants"
```

---

## Tâche 3 : Remplacer les délais hard-codés dans les composants TSX

**Fichiers :**
- Modifier : `src/pages/Home/AgencySection/AgencySection.tsx`
- Modifier : `src/pages/Home/ClientsSection/ClientsSection.tsx`
- Modifier : `src/pages/Home/HeroSection/HeroSection.tsx`
- Modifier : `src/pages/Gallery/Gallery.tsx`

- [ ] **Step 1 : Remplacer dans `AgencySection.tsx`**

Chercher les `delay: 0.6`, `delay: 0.85`, `delay: 1.2` et les remplacer :

```typescript
import { ANIMATION } from '@/utils/constants';

// delay: 0.6  →  delay: ANIMATION.DELAY.MD
// delay: 0.85 →  delay: ANIMATION.DELAY.LG
// delay: 1.2  →  delay: ANIMATION.DELAY.XXL
```

- [ ] **Step 2 : Remplacer dans `ClientsSection.tsx`**

```typescript
// delay: 1.1  →  delay: ANIMATION.DELAY.XL
```

- [ ] **Step 3 : Remplacer dans `HeroSection.tsx`**

```typescript
// delay: 1.4  →  delay: ANIMATION.DELAY.XXXL
```

- [ ] **Step 4 : Remplacer le setTimeout hard-codé dans `Gallery.tsx`**

Chercher `setTimeout(..., 500)`. Remplacer par :

```typescript
import { ANIMATION } from '@/utils/constants';

setTimeout(() => { /* ... */ }, ANIMATION.DURATION_SLOW * 1000);
// ou si 500ms est intentionnellement différent de DURATION_SLOW :
// ajouter DURATION_MEDIUM: 0.5 dans ANIMATION puis utiliser ANIMATION.DURATION_MEDIUM * 1000
```

Si 500ms est délibérément différent de toutes les constantes existantes, ajouter dans `constants.ts` :

```typescript
DURATION_MEDIUM: 0.5,
```

- [ ] **Step 5 : Vérifier typecheck + lint**

```bash
pnpm typecheck && pnpm lint
```

- [ ] **Step 6 : Commit**

```bash
git add src/pages/Home/AgencySection/AgencySection.tsx \
        src/pages/Home/ClientsSection/ClientsSection.tsx \
        src/pages/Home/HeroSection/HeroSection.tsx \
        src/pages/Gallery/Gallery.tsx \
        src/utils/constants.ts
git commit -m "refactor(animations): replace hard-coded delay values with ANIMATION constants"
```

---

## Tâche 4 : Nettoyer les CSS composant — couleurs et timing

### 4a — `LoadingFallback.css`

**Fichiers :**
- Modifier : `src/components/common/LoadingFallback/LoadingFallback.css`

- [ ] **Step 1 : Remplacer les valeurs en dur**

```css
/* Avant */
width: 60px;
height: 60px;
animation: spin 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
background: rgba(39, 125, 212, 0.4);
box-shadow: 0 0 20px rgba(39, 125, 212, 0.2);

/* Après */
width: var(--loading-spinner-size);
height: var(--loading-spinner-size);
animation: spin var(--loading-spinner-duration) var(--loading-easing-bounce) infinite;
background: var(--color-primary-40);
box-shadow: 0 0 20px var(--color-primary-20);
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/common/LoadingFallback/LoadingFallback.css
git commit -m "refactor(css): replace hard-coded values in LoadingFallback with CSS variables"
```

### 4b — `TypewriterText.css`

**Fichiers :**
- Modifier : `src/components/atoms/TypewriterText/TypewriterText.css`

- [ ] **Step 1 : Remplacer les valeurs en dur**

```css
/* Avant */
color: rgba(255, 255, 255, 0.45);

/* Après */
color: var(--color-text-primary-45);
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/atoms/TypewriterText/TypewriterText.css
git commit -m "refactor(css): use CSS variable for TypewriterText opacity color"
```

### 4c — `Footer.css`

**Fichiers :**
- Modifier : `src/components/layout/Footer/Footer.css`

- [ ] **Step 1 : Remplacer les valeurs en dur**

```css
/* Avant */
background: #1d1d1f;
color: rgba(255, 255, 255, 0.75);

/* Après */
background: var(--color-surface-dark);
color: color-mix(in srgb, var(--color-text-primary) 75%, transparent);
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/layout/Footer/Footer.css
git commit -m "refactor(css): replace hard-coded colors in Footer with CSS variables"
```

### 4d — `HeroSection.css`

**Fichiers :**
- Modifier : `src/pages/Home/HeroSection/HeroSection.css`

- [ ] **Step 1 : Remplacer les valeurs en dur**

```css
/* Avant */
min-height: 80vh;
animation-duration: 20s;
transition: 0.35s;
transition: 0.65s;

/* Après */
min-height: var(--size-hero-min-height);
animation-duration: var(--hero-scroll-duration);
transition: var(--animation-duration-fast) var(--animation-easing);   /* 0.3s pour 0.35s */
transition: var(--animation-duration) var(--animation-easing);        /* 0.6s pour 0.65s */
```

> Note : si 0.35s et 0.65s sont intentionnellement distincts de `--animation-duration-fast` (0.3s) et `--animation-duration` (0.6s), créer deux nouvelles variables dans `index.css` : `--animation-duration-hero-in` et `--animation-duration-hero-out`.

- [ ] **Step 2 : Commit**

```bash
git add src/pages/Home/HeroSection/HeroSection.css
git commit -m "refactor(css): replace hard-coded values in HeroSection with CSS variables"
```

### 4e — `TechStackCard.css`

**Fichiers :**
- Modifier : `src/pages/Home/HeroSection/TechStackCard.css`

- [ ] **Step 1 : Remplacer les valeurs en dur majeures**

```css
/* Avant */
width: 300px;
transition: width 0.5s cubic-bezier(0.22, 0.8, 0.12, 1);
transition: opacity 0.2s ease, transform 0.18s ease;

/* Après */
width: var(--size-tech-card-width);
transition: width var(--animation-duration) var(--animation-easing-smooth);
transition: opacity var(--animation-duration-fast) ease, transform var(--animation-duration-fast) ease;
```

Remplacer aussi le `650ms cubic-bezier(0.22, 0.8, 0.12, 1)` pour les entrées de carte si présent, par `var(--animation-duration) var(--animation-easing-smooth)`.

- [ ] **Step 2 : Commit**

```bash
git add src/pages/Home/HeroSection/TechStackCard.css
git commit -m "refactor(css): replace hard-coded transition values in TechStackCard with CSS variables"
```

### 4f — `AgencySection.css`

**Fichiers :**
- Modifier : `src/pages/Home/AgencySection/AgencySection.css`

- [ ] **Step 1 : Remplacer les couleurs**

```css
/* Avant */
color: #1d1d1f;
color: #86868b;
color: #6e6e73;
background: rgba(0, 0, 0, 0.1);
border-color: rgba(0, 0, 0, 0.08);

/* Après */
color: var(--color-surface-dark);
color: var(--color-text-muted);
color: var(--color-text-subtle);
background: var(--color-black-10);
border-color: var(--color-black-8);
```

- [ ] **Step 2 : Remplacer les spacings**

```css
/* Avant */
width: 240px;
width: 120px;
max-width: 560px;

/* Après */
width: var(--size-agency-image-width);
width: var(--size-agency-image-width-sm);
max-width: var(--size-agency-max-width);
```

- [ ] **Step 3 : Commit**

```bash
git add src/pages/Home/AgencySection/AgencySection.css
git commit -m "refactor(css): replace hard-coded values in AgencySection with CSS variables"
```

### 4g — `ClientsSection.css`

**Fichiers :**
- Modifier : `src/pages/Home/ClientsSection/ClientsSection.css`

- [ ] **Step 1 : Remplacer les valeurs**

```css
/* Avant */
height: 70px;
background: #111;
color: #fff;
transition: 0.3s;

/* Après */
height: var(--size-clients-logo-height);
background: var(--color-surface-dark);
color: var(--color-text-primary);
transition: var(--animation-duration-fast) var(--animation-easing);
```

- [ ] **Step 2 : Commit**

```bash
git add src/pages/Home/ClientsSection/ClientsSection.css
git commit -m "refactor(css): replace hard-coded values in ClientsSection with CSS variables"
```

### 4h — `Gallery.css` et `GalleryGrid.css`

**Fichiers :**
- Modifier : `src/pages/Gallery/Gallery.css`
- Modifier : `src/pages/Gallery/GalleryGrid/GalleryGrid.css`

- [ ] **Step 1 : Remplacer dans `Gallery.css`**

```css
/* Avant */
min-width: 300px;
transition: 0.4s ease;
transition: 0.3s ease;

/* Après */
min-width: var(--size-gallery-min-col);
transition: var(--animation-duration-slow) var(--animation-easing);
transition: var(--animation-duration-fast) var(--animation-easing);
```

- [ ] **Step 2 : Remplacer dans `GalleryGrid.css`**

```css
/* Avant */
transition: opacity 400ms ease, transform 400ms ease;
transition: transform 300ms ease;

/* Après */
transition: opacity var(--animation-duration-slow) var(--animation-easing),
            transform var(--animation-duration-slow) var(--animation-easing);
transition: transform var(--animation-duration-fast) var(--animation-easing);
```

> Note : `--animation-duration-slow` vaut 0.9s, et 400ms = 0.4s — si 400ms est intentionnellement différent, ajouter `--animation-duration-medium: 0.4s` dans `index.css`.

- [ ] **Step 3 : Commit**

```bash
git add src/pages/Gallery/Gallery.css src/pages/Gallery/GalleryGrid/GalleryGrid.css
git commit -m "refactor(css): replace hard-coded transition values in Gallery with CSS variables"
```

### 4i — `About.css`

**Fichiers :**
- Modifier : `src/pages/About/About.css`

- [ ] **Step 1 : Remplacer les valeurs**

```css
/* Avant */
width: 380px;
animation: 700ms var(--animation-easing);
animation: 900ms var(--animation-easing);
background: rgba(10, 10, 10, 0.06);

/* Après */
width: var(--size-about-col-width);
animation: var(--animation-duration) var(--animation-easing);
animation: var(--animation-duration-slow) var(--animation-easing);
background: var(--color-black-6);
```

- [ ] **Step 2 : Commit**

```bash
git add src/pages/About/About.css
git commit -m "refactor(css): replace hard-coded values in About with CSS variables"
```

---

## Tâche 5 : Supprimer les styles inline des composants TSX

Les composants utilisent `style={{ ... }}` pour des règles qui devraient être en CSS.

**Fichiers :**
- Modifier : `src/pages/Home/HeroSection/TechStackCard.tsx`
- Modifier : `src/components/layout/Header/Header.tsx` (si inline styles présents)

- [ ] **Step 1 : Dans `TechStackCard.tsx`, déplacer les styles inline vers `TechStackCard.css`**

Chercher `style={{ position: 'relative', display: 'inline-block' }}` et similaires.

Dans `TechStackCard.css`, créer une classe correspondante :

```css
.tech-stack-tooltip-wrapper {
  @apply relative inline-block;
}
```

Dans le TSX, remplacer `style={{ ... }}` par `className="tech-stack-tooltip-wrapper"`.

- [ ] **Step 2 : Répéter pour tout autre style inline trouvé**

Chercher avec grep : `style={{` dans tous les .tsx du projet. Pour chaque occurrence, évaluer si c'est un style statique (→ CSS class) ou dynamique (→ garder inline ou utiliser CSS variable).

```bash
grep -rn "style={{" src/ --include="*.tsx"
```

Pour les styles dynamiques légitimes (e.g., `style={{ '--index': i } as CSSProperties}`), les laisser tels quels.

- [ ] **Step 3 : Vérifier typecheck + lint**

```bash
pnpm typecheck && pnpm lint
```

- [ ] **Step 4 : Commit**

```bash
git add -p  # sélectionner les fichiers modifiés
git commit -m "refactor(styles): move static inline styles to CSS classes"
```

---

## Tâche 6 : Splitter `TechStackCard.tsx` (218 lignes → orchestrateur + hook + utils)

**Fichiers :**
- Modifier : `src/pages/Home/HeroSection/TechStackCard.tsx` (orchestrateur, < 100 lignes)
- Créer : `src/pages/Home/HeroSection/useTechStack.ts`
- Créer : `src/pages/Home/HeroSection/TechStackCard.utils.ts`

- [ ] **Step 1 : Lire `TechStackCard.tsx` en entier**

```bash
# Ouvrir le fichier avec Read tool
```

Identifier :
- L'array `defaultTechnologies` (données statiques)
- Le composant `TechTooltip` inline (si présent)
- Les états : `expanded`, `revealedCount`, `hasAnimated`
- Les handlers et effets

- [ ] **Step 2 : Créer `TechStackCard.utils.ts`**

```typescript
// src/pages/Home/HeroSection/TechStackCard.utils.ts
export const DEFAULT_TECHNOLOGIES = [
  // coller ici le contenu de l'array actuel
] as const;

export type Technology = (typeof DEFAULT_TECHNOLOGIES)[number];
```

- [ ] **Step 3 : Créer `useTechStack.ts`**

```typescript
// src/pages/Home/HeroSection/useTechStack.ts
import { useState, useEffect, useRef } from 'react';
import { ANIMATION } from '@/utils/constants';
import type { Technology } from './TechStackCard.utils';

interface UseTechStackReturn {
  expanded: boolean;
  revealedCount: number;
  hasAnimated: boolean;
  toggle: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function useTechStack(technologies: Technology[]): UseTechStackReturn {
  // déplacer ici tous les useState, useEffect, useRef, handlers
  // ...
  return { expanded, revealedCount, hasAnimated, toggle, containerRef };
}
```

- [ ] **Step 4 : Simplifier `TechStackCard.tsx` en orchestrateur**

```typescript
// src/pages/Home/HeroSection/TechStackCard.tsx
import { DEFAULT_TECHNOLOGIES } from './TechStackCard.utils';
import { useTechStack } from './useTechStack';
import './TechStackCard.css';

export function TechStackCard() {
  const { expanded, revealedCount, hasAnimated, toggle, containerRef } =
    useTechStack(DEFAULT_TECHNOLOGIES);

  return (
    // JSX épuré utilisant uniquement les valeurs du hook
  );
}
```

- [ ] **Step 5 : Vérifier typecheck + lint**

```bash
pnpm typecheck && pnpm lint
```

- [ ] **Step 6 : Commit**

```bash
git add src/pages/Home/HeroSection/TechStackCard.tsx \
        src/pages/Home/HeroSection/useTechStack.ts \
        src/pages/Home/HeroSection/TechStackCard.utils.ts
git commit -m "refactor(TechStackCard): split 218-line component into orchestrator + hook + utils"
```

---

## Tâche 7 : Splitter `Charte.tsx` (382 lignes → orchestrateur + données + renderers)

**Fichiers :**
- Modifier : `src/pages/Charte/Charte.tsx` (orchestrateur, < 80 lignes)
- Créer : `src/pages/Charte/CharteData.ts`
- Créer : `src/pages/Charte/CharteSections.tsx`

- [ ] **Step 1 : Lire `Charte.tsx` en entier**

Identifier :
- Les tableaux de données (couleurs, typographies, spacings, etc.)
- Les sous-sections renderisées
- Les imports

- [ ] **Step 2 : Créer `CharteData.ts`**

Extraire tous les tableaux/objets de données :

```typescript
// src/pages/Charte/CharteData.ts
export const CHARTE_COLORS = [
  // ...données des couleurs
];

export const CHARTE_TYPOGRAPHY = [
  // ...
];

export const CHARTE_SPACINGS = [
  // ...
];

export const CHARTE_RADII = [
  // ...
];

// etc.
```

- [ ] **Step 3 : Créer `CharteSections.tsx`**

Extraire les blocs JSX répétitifs en composants nommés :

```typescript
// src/pages/Charte/CharteSections.tsx
import { CHARTE_COLORS, CHARTE_TYPOGRAPHY } from './CharteData';

export function CharteColorsSection() {
  return (/* ... */);
}

export function CharteTypographySection() {
  return (/* ... */);
}

// etc. — un composant par section majeure
```

- [ ] **Step 4 : Simplifier `Charte.tsx` en orchestrateur**

```typescript
// src/pages/Charte/Charte.tsx
import { CharteColorsSection, CharteTypographySection } from './CharteSections';
import './Charte.css';

export default function Charte() {
  return (
    <main>
      <CharteColorsSection />
      <CharteTypographySection />
      {/* ... */}
    </main>
  );
}
```

- [ ] **Step 5 : Vérifier typecheck + lint**

```bash
pnpm typecheck && pnpm lint
```

- [ ] **Step 6 : Commit**

```bash
git add src/pages/Charte/Charte.tsx \
        src/pages/Charte/CharteData.ts \
        src/pages/Charte/CharteSections.tsx
git commit -m "refactor(Charte): split 382-line page into orchestrator + data + sections"
```

---

## Tâche 8 : Nettoyage final — ROUTES orphelines et vérification globale

**Fichiers :**
- Modifier : `src/utils/constants.ts`
- Modifier : `src/router.tsx`

- [ ] **Step 1 : Décider du sort de `ROUTES.PRIVACY` et `ROUTES.TERMS`**

Ces routes sont dans `constants.ts` mais absentes de `router.tsx`. Deux options :
- **Si pas implémentées et sans plan immédiat** : supprimer de `constants.ts` (YAGNI)
- **Si planifiées** : laisser dans constants, ajouter une route placeholder dans `router.tsx`

Choisir l'option et appliquer.

- [ ] **Step 2 : Vérification globale**

```bash
pnpm typecheck
pnpm lint
pnpm format
```

Expected : 0 erreurs, 0 warnings.

- [ ] **Step 3 : Vérification visuelle**

Lancer le dev server et inspecter manuellement :
- Page Home (toutes les sections)
- Page Gallery
- Page About
- Page Contact
- Page Charte

```bash
pnpm dev
# Ouvrir https://photoproject.local:5173
```

- [ ] **Step 4 : Commit final si modifications nécessaires**

```bash
git add src/utils/constants.ts src/router.tsx
git commit -m "chore: remove orphaned ROUTES constants not implemented in router"
```

---

## Récapitulatif des commits attendus

```
feat(css): add missing CSS custom properties for colors, spacing and animation delays
feat(constants): add ANIMATION.DELAY and EASING_BOUNCE constants
refactor(animations): replace hard-coded delay values with ANIMATION constants
refactor(css): replace hard-coded values in LoadingFallback with CSS variables
refactor(css): use CSS variable for TypewriterText opacity color
refactor(css): replace hard-coded colors in Footer with CSS variables
refactor(css): replace hard-coded values in HeroSection with CSS variables
refactor(css): replace hard-coded transition values in TechStackCard with CSS variables
refactor(css): replace hard-coded values in AgencySection with CSS variables
refactor(css): replace hard-coded values in ClientsSection with CSS variables
refactor(css): replace hard-coded transition values in Gallery with CSS variables
refactor(css): replace hard-coded values in About with CSS variables
refactor(styles): move static inline styles to CSS classes
refactor(TechStackCard): split 218-line component into orchestrator + hook + utils
refactor(Charte): split 382-line page into orchestrator + data + sections
chore: remove orphaned ROUTES constants not implemented in router
```
