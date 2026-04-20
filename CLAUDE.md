# PhotoProject

## Styling — RÈGLE PRINCIPALE
- Tailwind UNIQUEMENT via `@apply` dans les `.css` co-localisés avec les composants
- `className` = noms sémantiques seulement, jamais d'utilitaires Tailwind directs
- `@reference` en chemin relatif vers `../../../index.css`

## Animations — RÈGLE PRINCIPALE
- Toutes les variantes dans `src/utils/animations.ts`
- Constantes dans `src/utils/constants.ts` (`ANIMATION`, `TRANSITION`)
- Toujours utiliser `staggerContainerVariants` + `variants` pour les séquences enchaînées
- Jamais de `custom` props, jamais de valeurs hardcodées inline

## Avant chaque commit
```
pnpm typecheck && pnpm lint
```

## Conventions
- Imports : packages → `@/` aliases → relatifs → styles
- Types : `ComponentName.types.ts` à côté du composant
- Pages : `export default` + `React.lazy`, split si > 150 lignes
