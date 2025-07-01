
# Erreur lors de la compilation
  Electron-builder télécharge un outil de signature de code Windows (winCodeSign)
  et essaie d’extraire des symboles qui contiennent aussi des symlinks de type macOS/Linux (libcrypto.dylib).

  Sous Windows, la création de symlinks nécessite les droits administrateur ou d’avoir activé le mode développeur Windows.

  Ton message :

  ERROR: Cannot create symbolic link : Le client ne dispose pas d'un privilège nécessaire.

  → ça veut dire pas de privilège pour créer ces liens symboliques.


Est-ce grave ?
  ➡️ Non, car en fait tu n’as pas besoin des outils de code-sign macOS sur Windows.
  C’est un artefact automatique d’extraction par electron-builder,
  ça peut planter mais ne bloque pas la génération Windows.


