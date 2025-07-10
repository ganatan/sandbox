
Problème : Jest ne supporte pas ES Modules (import/export) par défaut
Jest utilise CommonJS par défaut (require), donc pour faire fonctionner ES Modules (import/export), il faut une configuration supplémentaire.


D’après la documentation officielle de Babel :

Type de fichier	Cas d’utilisation recommandé
.babelrc.json
  Configuration locale (uniquement pour src/). À éviter si Jest doit transformer des fichiers en dehors de src/.

babel.config.js
  Recommandé : Configuration globale, s’applique à tout le projet, y compris les tests.

babel.config.json
  Identique à babel.config.js mais en JSON.


Solution recommandée avec Jest et Babel

  jest : Framework de test.
  babel-jest : Permet à Jest d’utiliser Babel.
  @babel/core : Cœur de Babel.
  @babel/preset-env : Préréglage pour transpiler du JavaScript moderne.  