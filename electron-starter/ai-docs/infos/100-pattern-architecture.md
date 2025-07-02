# renderer.js
  👉 But
  C’est le script côté fenêtre (renderer process) — exactement comme un script JS sur une page web classique.
  Il sert à contrôler l’affichage, les interactions DOM, etc.

  Dans Electron :
  il tourne dans la page index.html
  il peut gérer les boutons, formulaires, interactions de l’utilisateur
  il peut aussi envoyer des messages au main process via ipcRenderer
  Exemple typique :

  // src/renderer/renderer.js
  console.log('renderer chargé')
  En clair :
  ✅ le main.js = lance la fenêtre
  ✅ le renderer.js = code front affiché dans la fenêtre

# 2️⃣ preload.js
  👉 But
  C’est un script qui s’exécute avant le renderer, dans un contexte sécurisé.
  Il sert à exposer des fonctions limitées au renderer en toute sécurité, via contextBridge.

  ⚠️ pourquoi ?
  Parce que dans ton main.js tu as mis :

  nodeIntegration: true
  → ça c’est dangereux en production : ça donne un accès complet à Node.js dans la page HTML, donc si jamais ton app charge un contenu externe compromis → risque d’exécution de code arbitraire.

  Avec preload.js :
  tu mets nodeIntegration: false
  tu exposes uniquement ce dont tu as besoin
  tu gardes la sécurité (sandboxée)
  Exemple simple de preload.js :
  // src/main/preload.js
  const { contextBridge, ipcRenderer } = require('electron')

  contextBridge.exposeInMainWorld('api', {
    ping: () => ipcRenderer.invoke('ping')
  })
  Puis dans renderer.js :

  js
  Copier
  Modifier
  window.api.ping().then(console.log)
  Résumé clair :
  rôle	explication
  main.js	Processus principal (lance la fenêtre, gère le cycle de vie Electron, WebSocket, etc.)
  renderer.js	Code exécuté côté fenêtre, DOM, interactions UI
  preload.js	Pont sécurisé entre main et renderer pour éviter les failles de sécurité via contextBridge

# 👉 conseil de pro
  en production

  mets nodeIntegration: false

  ajoute un preload.js

  expose juste les fonctions nécessaires
  → sinon grosse faille (XSS + RCE)