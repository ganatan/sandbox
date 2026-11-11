# 04 — Générer une révision avec OpenCode

## 1. Situation actuelle

`code/data.json` contient **REV002**. Les dossiers `results/REV001/` et `results/REV002/` sont des livraisons fictives déjà archivées.

Pour préparer la prochaine livraison, **tu modifies le JSON toi-même** avant de lancer OpenCode.

## 2. Préparer REV003

Dans `code/data.json`, chercher :

```json
"delivery": {
  "documentId": "XXXX-SBOM",
  "revision": "REV002",
  "modelVersion": "1.0",
  "language": "en",
  "status": "SIMULATION",
  "date": "2026-11-18"
}
```

1. Remplacer `"revision": "REV002"` par `"revision": "REV003"`.
2. Actualiser `snapshotDate` et `delivery.date` (format `YYYY-MM-DD`).
3. Mettre à jour manuellement les technologies, dépendances, licences et statuts.
4. Conserver les descriptions en anglais.
5. Ne pas modifier les archives des révisions antérieures.

Le statut `SIMULATION` doit rester explicite pour des données fictives. Pour un inventaire réel, définir un statut fidèle au niveau de vérification.

## 3. Vérifier la syntaxe JSON

Depuis `generate-board/` :

```bash
python3 -m json.tool code/data.json > /dev/null
```

Cela valide la **syntaxe**, pas les licences ni les chiffres.

## 4. Générer

```bash
opencode
```

Puis :

```text
Read code/prompt.md and generate the report.
```

OpenCode lit `code/data.json`, `models/report-v1.0.md` et `models/glossary-v1.0.md`.

Il doit créer **exactement cinq fichiers** :

```text
results/REV003/
├── xxxx-data-rev003.json
├── xxxx-sbom-rev003.md
├── xxxx-sbom-rev003-fr.md
├── xxxx-glossary-rev003.md
└── xxxx-glossary-rev003-fr.md
```

L'anglais est la référence. Les fichiers `-fr.md` sont des traductions de l'anglais, pas des rapports générés indépendamment.

## 5. Vérifier

```bash
ls -la results/REV003
diff -u code/data.json results/REV003/xxxx-data-rev003.json
git status --short
```

Si `diff` n'affiche rien, les données de travail et les données archivées sont identiques.

Lire le rapport et contrôler : date, révision, totaux, composants, versions, licences, copyleft, incertitudes, cohérence EN/FR et définitions du glossaire.

**OpenCode peut se tromper.** Il ne doit pas inventer une version ou déclarer une licence vérifiée si le JSON ne le prouve pas.

## 6. En cas d'erreur

Avant validation : corriger les fichiers de travail et régénérer le brouillon.

Après livraison approuvée : ne pas modifier l'archive silencieusement ; créer une nouvelle révision mentionnant la correction.

## 7. Enregistrer dans Git

Sur un dépôt professionnel **autorisé**, depuis la racine :

```bash
git status
git add projet/generate-board/code/data.json projet/generate-board/results/REV003
git commit -m "docs: archive inventory REV003"
```

Ne pousser que vers une destination approuvée. Ne jamais publier des données internes dans le dépôt public d'exercice.

Pour la livraison suivante, préparer `REV004`, actualiser les données et recommencer.
