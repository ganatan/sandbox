# response 06


1. @babel/preset-env
Tu as ajouté :

json
Copier
Modifier
"@babel/preset-env": "7.26.9"
Et dans babel.config.js :

js
Copier
Modifier
export default {
  presets: ['@babel/preset-env']
}
✅ Pourquoi ça fonctionne :
Jest utilise babel-jest (intégré par défaut) pour transformer ton code ESM (import, export) vers du code que Node.js peut exécuter dans un environnement contrôlé.

Le preset @babel/preset-env permet de traduire la syntaxe moderne (comme import/export, async/await, etc.) en code compatible avec l’environnement de test.

Grâce à ça, Jest peut exécuter tes fichiers .js en ESM sans erreur de parsing.




2. coverageProvider: 'v8'
Tu as ajouté dans jest.config.mjs :

js
Copier
Modifier
const config = {
  coverageProvider: 'v8',
};

export default config;
✅ Pourquoi ça fonctionne :
Ce paramètre indique à Jest d’utiliser le moteur de couverture de code natif de Node.js (V8) au lieu de Babel/Istanbul.

C’est plus rapide, et plus stable en ESM pur.

Sans ce paramètre, Jest utilise par défaut Istanbul via Babel, ce qui peut casser ou ralentir les tests dans des projets ESM natifs.

✅ En résumé : ces deux ajouts permettent à Jest de :
comprendre et transformer la syntaxe import/export

exécuter correctement les modules ESM

générer la couverture de test avec V8, ce qui est plus fiable sans hack