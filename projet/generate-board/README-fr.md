# Generate Board — Projet xxxx

**Société :** ganatan  
**Objectif :** simuler l'inventaire Open Source et l'analyse des licences avec OpenCode.

## Structure

```text
generate-board/
├── README.md
├── README-fr.md
├── models/
│   ├── data-model.json
│   ├── report-v1.0.md
│   └── glossary-v1.0.md
├── code/
│   ├── data.json
│   └── prompt.md
└── results/
    ├── REV001/
    │   ├── xxxx-data-rev001.json
    │   ├── xxxx-sbom-rev001.md
    │   ├── xxxx-sbom-rev001-fr.md
    │   ├── xxxx-glossary-rev001.md
    │   └── xxxx-glossary-rev001-fr.md
    └── REV002/
        ├── xxxx-data-rev002.json
        ├── xxxx-sbom-rev002.md
        ├── xxxx-sbom-rev002-fr.md
        ├── xxxx-glossary-rev002.md
        └── xxxx-glossary-rev002-fr.md
```

## Conventions

- **Une seule numérotation :** `REV001`, `REV002`, `REV003`.
- Le numéro figure dans le dossier **et dans chaque nom de fichier**.
- L'anglais est la référence ; les traductions françaises portent `-fr`.
- Une révision validée contient cinq fichiers et conserve son JSON figé.
- La version du modèle `v1.0` est indépendante de la révision documentaire.
- Cette convention suit les principes généraux de maîtrise documentaire ISO, sans être un format imposé par l'ISO.
- Les deux révisions présentes sont fictives et ne prouvent aucune conformité.

## Générer REV003 (PowerShell)

À la racine du dépôt `sandbox` :

```powershell
git pull github master
cd projet/generate-board
opencode
```

Dans OpenCode :

```text
Read code/prompt.md and generate REV003 using code/data.json.
```

Le fichier `code/data.json` contient déjà `delivery.revision: REV003`. Actualiser les données et dates avant une vraie livraison. Ne jamais écraser une révision existante.

## Vérifier et archiver

```powershell
Get-ChildItem results/REV003
git diff -- results/
```

Depuis la racine de `sandbox` :

```powershell
git add projet/generate-board
git commit -m "docs: archive SBOM REV003"
git push github master
```

Avant publication, vérifier les données archivées, les chiffres et la cohérence entre anglais et français.
