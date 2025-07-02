# Gestion du build  

Il manque côté electron-builder


  build.productName (nom commercial de l’app)
  build.mac.icon / build.win.icon → pour l’icône
  files → dire quels fichiers inclure (par défaut **/*)


  Modifier package.json

  "build": {
  "appId": "com.ganatan.electronstarter",
  "productName": "ElectronStarter",
  "files": [
    "src/**/*",
    "index.html",
    "package.json"
  ],
  "directories": {
    "buildResources": "assets"
  },
  "mac": {
    "icon": "assets/icon.icns"
  },
  "win": {
    "icon": "assets/icon.ico",
    "target": "nsis",
    "forceCodeSigning": false
  },
  "nsis": {
    "oneClick": false
  }
}

# Il faut une icone taille 256 x 256

cree avec https://www.icoconverter.com/