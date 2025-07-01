
# Erreur lors de la compilation

  Electron-builder télécharge un outil de signature de code Windows (winCodeSign)
  et essaie d’extraire des symboles qui contiennent aussi des symlinks de type macOS/Linux (libcrypto.dylib).

  Sous Windows, la création de symlinks nécessite les droits administrateur ou d’avoir activé le mode développeur Windows.
  ça veut dire pas de privilège pour créer ces liens symboliques.


  Est-ce grave ?
    Outils de code-sign macOS non necessaire sur Windows.
 
  # Modifier package.json  !!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    "build": {
  "win": {
    "sign": false
  }
}


# Passer en cmd en mode administrateur
La compilation fonctionnne
