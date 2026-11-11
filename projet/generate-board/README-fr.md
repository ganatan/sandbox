# Generate Board — Projet xxxx

**Société :** ganatan  
**Statut :** données et rapports simulés

## Arborescence

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
    ├── REV00/
    │   ├── xxxx-data-001-rev00.json
    │   ├── xxxx-sbom-001-rev00.md
    │   ├── xxxx-sbom-001-rev00-fr.md
    │   ├── xxxx-glossary-001-rev00.md
    │   └── xxxx-glossary-001-rev00-fr.md
    └── REV01/
        ├── xxxx-data-001-rev01.json
        ├── xxxx-sbom-001-rev01.md
        ├── xxxx-sbom-001-rev01-fr.md
        ├── xxxx-glossary-001-rev01.md
        └── xxxx-glossary-001-rev01-fr.md
```

## Conventions

- **XXXX-SBOM-001** identifie la série documentaire du rapport.
- **REV00, REV01, ...** sont les révisions successives, indépendamment des dates.
- Chaque fichier contient son numéro de révision pour rester identifiable hors de son répertoire.
- L'anglais est la langue de référence. Seules les traductions françaises portent le suffixe `-fr`.
- Chaque révision validée contient cinq fichiers, dont une copie figée des données JSON.
- `models/*-v1.0.md` désigne la version des modèles, **pas** celle des rapports livrés.
- Les principes de maîtrise documentaire d'ISO 9001 prévoient l'identification et le suivi des révisions, mais **n'imposent pas** cette convention de nommage.

## Tester REV00 et REV01

Les deux révisions contiennent des données et des documents d'exemple.

REV01 illustre trois évolutions **fictives** : une mise à jour d'une dépendance Angular, une version Kafka déclarée dans Helm et une version Grafana ajoutée à l'inventaire. Aucune de ces informations n'est un constat vérifié.

## Générer REV02 avec OpenCode (PowerShell)

Depuis la racine du dépôt `sandbox` :

```powershell
git pull github master
cd projet/generate-board
```

Pour repartir de la dernière révision archivée, copier son JSON dans le fichier de travail :

```powershell
Copy-Item results/REV01/xxxx-data-001-rev01.json code/data.json
```

Dans `code/data.json`, définir `delivery.revision` à `REV02`, puis mettre à jour `snapshotDate`, `delivery.date` et les données collectées.

Conserver `null` pour les valeurs inconnues. Ne jamais considérer une licence supposée comme vérifiée sans preuve.

Lancer OpenCode :

```powershell
opencode
```

Puis saisir :

```text
Read code/prompt.md and perform the requested delivery for code/data.json.
```

Ou directement :

```powershell
opencode run --agent build "Read code/prompt.md and generate the next revision."
```

OpenCode doit produire exactement cinq fichiers dans `results/REV02/`. Si cette révision existe déjà, ne pas l'écraser.

## Vérifier et archiver

```powershell
Get-ChildItem results/REV02
git diff -- results/
```

Depuis la racine de `sandbox` :

```powershell
git add projet/generate-board
git commit -m "docs: archive SBOM revision REV02"
git push github master
```

Avant de valider, vérifier la cohérence des chiffres entre les documents anglais et français ainsi que la présence du JSON archivé.
