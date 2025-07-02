eclaire moi sur ces 2 points
ex. librairies C/C++ en bindings Node

un vieux client Python

Avantages ElectronJS
  Déploiement simplifié - Un seul exécutable contient frontend + backend + runtime Node.js. Pas besoin d'installer Node.js sur chaque poste.
  
  API système natives - Notifications, barre d'état, auto-updater, accès fichiers... Toutes les API desktop dont tu as besoin.
  
  Isolation réseau - Le serveur local ElectronJS peut écouter sur localhost uniquement, plus sécurisé qu'un serveur Node.js exposé.
  
  Mise à jour automatique - electron-updater gère ça nativement. Avec Node.js + Angular séparé, c'est beaucoup plus complexe.