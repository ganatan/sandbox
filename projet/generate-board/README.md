# Generate Board

**Société :** ganatan  
**Projet :** xxx  
**Objectif :** produire un rapport d'inventaire Open Source et un glossaire en Markdown avec OpenCode à partir de données JSON fictives.

## 1. Arborescence

```text
generate-board/
├── README.md
├── exemples/
│   └── rapport-exemple.md
├── code/
│   ├── data.json
│   └── prompt.md
└── resultat/
    ├── rapport.md
    └── glossaire.md
```

- **exemples/** : présentation de référence, à ne pas confondre avec les résultats calculés.
- **code/** : données JSON et instructions d'OpenCode (aucune application à développer).
- **resultat/** : fichiers Markdown générés. Les fichiers déjà présents sont des exemples initiaux, destinés à être remplacés.

## 2. Récupérer le projet

Dans ton clone local du dépôt `sandbox` :

```bash
git pull
cd projet/generate-board
```

Si tu n'as pas encore cloné `sandbox` :

```bash
git clone git@github.com:ganatan/sandbox.git
cd sandbox/projet/generate-board
```

## 3. Examiner les données

```bash
cat code/data.json
```

Les composants, versions et licences sont fictifs. Le fichier est volontairement limité à un petit ensemble pour tester le rendu.

## 4. Lancer OpenCode

OpenCode doit être installé et configuré avec un modèle autorisé avant ce test.

Depuis la racine de `generate-board` :

```bash
opencode
```

Dans la session OpenCode, saisir :

```text
Lis code/prompt.md et applique intégralement ses instructions.
```

Alternative non interactive :

```bash
opencode run --agent build "Lis code/prompt.md et applique intégralement ses instructions."
```

Autoriser les écritures dans `resultat/` si OpenCode le demande.

## 5. Vérifier le résultat

```bash
cat resultat/rapport.md
cat resultat/glossaire.md
git diff -- resultat/
```

Vérifier que :
- Le rapport correspond aux **6 composants** présents dans `code/data.json`, et non aux 125 composants fictifs de l'exemple de présentation.
- Le rapport et le glossaire mentionnent clairement la simulation.
- Aucune version ou licence inconnue n'a été inventée.
- Les deux fichiers ont été mis à jour dans `resultat/`.

## 6. Recommencer

Modifier uniquement les données de `code/data.json`, puis relancer OpenCode avec la même consigne. Il doit remplacer les fichiers dans `resultat/`.

## 7. Versionner le test

```bash
git add projet/generate-board
git commit -m "docs: update generated OSS report"
git push
```

Exécuter ces commandes depuis la racine du dépôt `sandbox`.

**Important :** l'exemple dans `exemples/` décrit le style attendu, pas les statistiques à reproduire.
