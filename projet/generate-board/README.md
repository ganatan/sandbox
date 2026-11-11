# Generate Board

**Société :** ganatan  
**Projet :** xxx

Générer automatiquement deux documents Markdown avec OpenCode à partir de données JSON fictives.

## Architecture

```text
generate-board/
├── README.md
├── models/
│   ├── rapport-v1.0.md
│   └── glossaire-v1.0.md
├── code/
│   ├── data.json
│   └── prompt.md
└── resultat/
    ├── rapport.md
    └── glossaire.md
```

- `models/` : modèles versionnés du rapport et du glossaire.
- `code/` : données JSON et prompt de génération.
- `resultat/` : documents générés et remplaçables.

## 1. Récupérer les modifications

Depuis la racine du dépôt `sandbox` :

```powershell
git pull github master
cd projet/generate-board
```

Si ton dépôt utilise le remote `origin`, adapte en `git pull origin master`.

## 2. Vérifier les données et les modèles

```powershell
Get-Content code/data.json
Get-Content models/rapport-v1.0.md
Get-Content models/glossaire-v1.0.md
```

Le modèle de rapport utilise des chiffres fictifs de présentation indépendants de `code/data.json`.

## 3. Lancer OpenCode

Depuis `generate-board` :

```powershell
opencode
```

Puis saisir :

```text
Lis code/prompt.md et applique toutes ses instructions.
```

Alternative :

```powershell
opencode run --agent build "Lis code/prompt.md et applique toutes ses instructions."
```

OpenCode doit disposer des autorisations d'écriture nécessaires dans `resultat/`.

## 4. Vérifier les deux documents

```powershell
Get-Content resultat/rapport.md
Get-Content resultat/glossaire.md
git diff -- resultat/
```

Le rapport doit refléter les 6 composants du JSON, pas les 125 du modèle. Le glossaire définit seulement les termes utilisés dans le rapport, sans longs développements.

## 5. Recommencer

Modifie `code/data.json`, puis relance exactement la même consigne OpenCode. Les deux fichiers de `resultat/` doivent être régénérés sans modification des modèles.

## 6. Versionner les résultats

Depuis la racine du dépôt `sandbox` :

```powershell
git add projet/generate-board
git commit -m "docs: update generated OSS reports"
git push github master
```
