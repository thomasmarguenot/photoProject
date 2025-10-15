# Vérification des Polices - Liquid Glass Design

## ✅ Changements Appliqués

### 1. **index.html** - Chargement des polices
- ✅ Remplacement de Zen Maru Gothic par Poppins + Space Grotesk
- ✅ Preconnect optimisé pour Google Fonts
- ✅ Chargement asynchrone avec `media="print"` puis `onload="this.media='all'"`

### 2. **index.css** - Application des polices
- ✅ Variables CSS définies : `--font-heading` (Poppins) et `--font-body` (Space Grotesk)
- ✅ `body` utilise `font-family: var(--font-body)`
- ✅ Tous les titres `h1-h6` utilisent `font-family: var(--font-heading)`
- ✅ Suppression du `@import` redondant dans le CSS

## 🔍 Comment Vérifier

### Dans le Navigateur

1. **Ouvrez la page** `/charte` ou n'importe quelle page
2. **Inspectez un titre** (H1, H2, etc.)
   - Clic droit → Inspecter
   - Dans l'onglet "Computed" cherchez `font-family`
   - Devrait afficher : `Poppins, -apple-system, BlinkMacSystemFont, sans-serif`

3. **Inspectez un paragraphe** (texte normal)
   - Même procédure
   - Devrait afficher : `Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif`

4. **Vérifiez le chargement des fonts**
   - Ouvrez DevTools → Onglet "Network"
   - Filtrez par "Font" ou "CSS"
   - Vous devriez voir les requêtes vers `fonts.googleapis.com` et `fonts.gstatic.com`

### Dans le Code

#### Typographie Appliquée

```css
/* Body (texte normal) */
body {
  font-family: var(--font-body); /* Space Grotesk */
}

/* Titres */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading); /* Poppins */
}
```

#### Variables Disponibles

```css
--font-heading: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
```

## 🎯 Différences Visuelles Attendues

### Avant (SF Pro)
- Police système neutre
- Aspect standard macOS/iOS
- Lettres plus condensées

### Après (Poppins + Space Grotesk)
- **Titres (Poppins)** : Géométrique, moderne, graisses variées (300-800)
- **Corps (Space Grotesk)** : Grotesk contemporain, excellent pour le web, lisibilité optimale

## 🐛 Problèmes Potentiels

### Si les polices ne s'affichent toujours pas :

1. **Vider le cache du navigateur**
   ```
   Cmd + Shift + R (Mac)
   Ctrl + Shift + R (Windows/Linux)
   ```

2. **Vérifier la console**
   - Erreurs de chargement CORS ?
   - Polices bloquées par un bloqueur de pubs ?

3. **Tester l'URL des fonts**
   ```bash
   curl -I https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800
   ```
   Devrait retourner `200 OK`

4. **Fallback activé ?**
   Si vous voyez `-apple-system` ou `BlinkMacSystemFont`, les Google Fonts n'ont pas chargé.
   Vérifiez votre connexion internet et les CSP headers.

## 📝 Notes Techniques

### Pourquoi dans index.html plutôt que CSS ?

- **Performance** : Chargement parallèle avec le HTML parsing
- **Priorité** : Le navigateur télécharge les fonts plus tôt
- **Compatibilité** : Évite les problèmes avec Tailwind CSS v4 et `@import`
- **Preconnect** : Optimise la résolution DNS et la connexion TCP

### Poids des Polices Chargés

**Poppins** : 300, 400, 500, 600, 700, 800
- 300 (Light) : Texte léger
- 400 (Regular) : Standard
- 500 (Medium) : Légèrement accentué
- 600 (SemiBold) : Sous-titres
- 700 (Bold) : Titres importants
- 800 (ExtraBold) : H1, titres hero

**Space Grotesk** : 300, 400, 500, 600, 700
- 300-700 : Variété pour le corps de texte et emphases

## ✨ Test Visuel Rapide

Visitez `/charte` et vérifiez :
- ✅ Les titres de section sont-ils en **Poppins** (lettres rondes, géométriques) ?
- ✅ Les descriptions sont-elles en **Space Grotesk** (grotesk moderne, légèrement condensé) ?
- ✅ Les boutons utilisent-ils **Space Grotesk** ?
- ✅ Le titre "Charte Graphique" est-il en **Poppins ExtraBold** ?

Si OUI à tout = **✅ Polices correctement appliquées !**
