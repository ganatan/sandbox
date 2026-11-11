# Generate Board

Générer un rapport d'inventaire Open Source et un glossaire avec OpenCode.

## 1. Préparer la prochaine révision

Le fichier `code/data.json` contient actuellement la dernière révision : **REV002**.

Pour créer **REV003** :

1. Ouvrir `code/data.json`.
2. Dans `delivery`, remplacer `"revision": "REV002"` par `"revision": "REV003"`.
3. Modifier `snapshotDate` et `delivery.date` avec la nouvelle date du rapport (format `YYYY-MM-DD`).
4. Actualiser les données d'inventaire à analyser. Toutes les valeurs JSON restent en anglais.

Ne pas modifier les fichiers déjà archivés dans `results/REV002/`.

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

OpenCode crée :

```text
results/
└── REV003/
    ├── xxxx-data-rev003.json
    ├── xxxx-sbom-rev003.md
    ├── xxxx-sbom-rev003-fr.md
    ├── xxxx-glossary-rev003.md
    └── xxxx-glossary-rev003-fr.md
```

Les rapports et glossaires anglais sont les originaux. Les fichiers `-fr.md` sont leurs traductions françaises.

Pour la livraison suivante, utiliser **REV004**, puis **REV005**, etc.
