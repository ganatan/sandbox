
# Lancement Electron

  Electron démarre le main process (ton main.js)
  ce main process crée une fenêtre via BrowserWindow
  cette fenêtre embarque Chromium (intégré dans Electron)
  et Chromium charge le index.html comme s’il ouvrait un onglet dans Chrome
  sauf que c’est isolé dans ton app, sans barre d’adresse, etc.



  Le process lancé est dans package.json

    "main": "main.js",

# Creation du livrable

Electron fonctionne sur :
  Windows (7, 8, 10, 11)
  macOS (10.10+)
  Linux (Ubuntu, Debian, CentOS, Fedora, etc.)    

Installez electron-builder :
  npm install electron-builder --save-dev

Modifier Package.json
    "build-win": "electron-builder --win",
    "build-mac": "electron-builder --mac",
    "build-linux": "electron-builder --linux"

    "pack": "electron-builder --dir",
    "dist": "electron-builder"


Rajouter dans package.json
  "description": "electron-starter description",



# Erreurs
"dependencies": {
  "electron": "^28.0.0"
}
⚠️ C’est interdit pour electron-builder,
Deplacer dans devDependencies.  

# Compilation
  "build": "electron-builder"
  Build pour l'OS actuel (Windows/Mac/Linux)

