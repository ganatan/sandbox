# Generate Board

Générer un rapport d'inventaire Open Source et un glossaire avec OpenCode.

## 1. Préparer les données

Modifier `code/data.json`.

Renseigner la prochaine révision dans `delivery.revision`, par exemple `REV003`, puis actualiser la date et les données d'inventaire.

## 2. Lancer OpenCode

Depuis `generate-board/` :

```powershell
opencode
```

Saisir :

```text
Read code/prompt.md and generate the report.
```

## 3. Fichiers générés

Pour `REV003`, OpenCode crée :

```text
results/
└── REV003/
    ├── xxxx-data-rev003.json
    ├── xxxx-sbom-rev003.md
    ├── xxxx-sbom-rev003-fr.md
    ├── xxxx-glossary-rev003.md
    └── xxxx-glossary-rev003-fr.md
```

L'anglais est la version de référence. Les fichiers `-fr.md` sont les traductions françaises.

Les anciennes révisions restent inchangées.
