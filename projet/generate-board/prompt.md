# Mission OpenCode

Tu travailles dans le répertoire courant. Lis `data.json` et génère ou remplace exactement deux fichiers : `rapport.md` et `glossaire.md`.

## Contexte

- Société : ganatan
- Projet : xxx
- Les données sont fictives : le préciser visiblement dans les deux documents.
- Date du rapport : valeur `snapshotDate` du JSON.

## rapport.md

Rédige un rapport professionnel, concis et lisible (environ 1 à 3 pages en Markdown) avec :

1. Titre, société, projet, date, périmètre et mention « Simulation ».
2. Synthèse chiffrée, calculée à partir des données JSON.
3. Tableau des composants : nom, version, licence, dépôt, preuve, statut.
4. Points à vérifier : versions absentes, licences incertaines, preuves insuffisantes.
5. Conclusion courte.

## glossaire.md

Rédige un complément pédagogique et indépendant comprenant pour chaque terme important du JSON :

- Définition simple.
- Origine ou signification du nom, seulement si vérifiable.
- Repère historique bref, seulement si vérifiable.
- Rôle technique.
- Référence vers la documentation officielle, si connue et vérifiable.

## Règles strictes

- Utiliser le JSON comme unique source des constats sur le projet.
- Ne jamais inventer de version, licence, dépôt, preuve, déploiement ou date.
- Distinguer faits du JSON, incertitudes et connaissances générales.
- Ne jamais considérer « déclaré » comme « déployé ».
- Ne pas déduire la conformité d'une licence de son seul identifiant.
- Une référence non vérifiée doit être omise ou signalée « à vérifier ».
- Ne pas modifier `data.json` ni `prompt.md`.
- Aucun autre fichier à générer.
- Tout rédiger en français.
