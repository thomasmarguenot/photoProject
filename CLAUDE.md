# Standards de développement — PhotoProject

Ces règles s'appliquent à chaque modification du codebase, sans exception.

## TypeScript

- Mode strict activé (`tsconfig.json`), zéro `any` toléré
- Toujours typer les variants Framer Motion avec `Variants` de `framer-motion`
- Les tableaux d'easing doivent être castés : `[...ANIMATION.EASING] as [number, number, number, number]`
- `pnpm typecheck` doit passer à 0 erreur avant tout commit

## ESLint & Prettier

- `pnpm lint` doit passer à 0 warning
- `pnpm format` avant tout commit
- Les hooks Husky + commitlint sont actifs — respecter le format `type(scope): message`

## Styling : Tailwind via @apply

- Toutes les classes Tailwind s'écrivent dans les fichiers `.css` via `@apply`, **jamais en inline** dans `className`
- `className` ne doit contenir que des noms de classes sémantiques (ex : `className="project-info"`)
- Exception unique : les classes **conditionnelles dynamiques** (ex : `className={isReverse ? 'project-row--reverse' : 'project-row'}`)
- N'écrire du CSS pur (sans `@apply`) **uniquement** quand :
  - Tailwind ne peut pas exprimer la règle (ex : `grid-template-columns: 55% 45%`)
  - Pseudo-sélecteurs complexes ou animations `@keyframes`
  - Référence à des CSS custom properties via `var(--...)`
- Les fonts `font-heading` et `font-body` sont enregistrées dans `@theme` (index.css) et disponibles comme classes via `@apply`

## Animations Framer Motion

- Tous les variants et transitions sont définis dans `src/utils/animations.ts`
- Ne jamais hardcoder des valeurs d'easing ou de durée inline — utiliser les constantes
- Les easings vivent dans `ANIMATION` (`src/utils/constants.ts`)
- Les presets de transition vivent dans `TRANSITION` (`src/utils/constants.ts`)
- Les variants Framer Motion vivent dans `src/utils/animations.ts`
- Utiliser `staggerContainerVariants` + `variants` sur les enfants plutôt que des `custom` props

## Architecture : Atomic Design

```
src/
├── components/
│   ├── atoms/       # Éléments primitifs (Button, Badge, Icon…)
│   ├── molecules/   # Compositions d'atomes (ProjectCard, TechTag…)
│   └── organisms/   # Sections complexes (ProjectsSection, HeroSection…)
├── pages/           # Assemblages de pages uniquement, zéro logique métier
└── utils/           # constants.ts, animations.ts, helpers
```

## Règles de composants

- Un composant par fichier
- Co-localiser les types dans `.types.ts` au même niveau
- Co-localiser le CSS (si nécessaire) dans le `.css` du même nom
- Exports nommés uniquement, pas de `export default` sauf pour les pages (`React.lazy`)
- Pas de styles inline sauf pour des valeurs dynamiques impossibles à exprimer en Tailwind
- Découper dès qu'un composant dépasse ~80 lignes ou a plusieurs responsabilités

## Vérification avant chaque changement

```bash
pnpm typecheck   # 0 erreur
pnpm lint        # 0 warning
pnpm format      # formaté
```
