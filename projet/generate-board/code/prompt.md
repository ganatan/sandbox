# Mission OpenCode

Tu travailles depuis le dossier `generate-board`.

## Entrée

Lis `code/data.json`.

## Référence de présentation

Consulte `exemples/rapport-exemple.md` pour le style et la structure souhaités, mais ne réutilise JAMAIS ses chiffres fictifs : ils sont indépendants des données de test.

## Fichiers à générer

- `resultat/rapport.md`
- `resultat/glossaire.md`

## Rapport

Rédige un rapport synthétique, simple, lisible et professionnel (1 à 3 pages environ) avec :

1. Titre, projet, société, date et périmètre.
2. Synthèse chiffrée strictement calculée depuis `code/data.json`.
3. Inventaire : composant, version, licence, dépôt et fichier source.
4. Licences, SBOM et référentiels (SPDX, CycloneDX et ISO) lorsque pertinent, sans revendiquer une conformité non prouvée.
5. Points à vérifier et conclusion.

## Glossaire

Rédige un document distinct expliquant les termes importants du rapport : définition accessible, origine, bref historique, usage, et références officielles vérifiables.

## Règles

- Tout est simulé : le préciser dans les deux fichiers.
- Société : ganatan. Projet : xxx.
- Utiliser `code/data.json` comme seule source des constats sur xxx.
- Ne jamais inventer des mesures, versions, licences, installations ou déploiements.
- Conserver les valeurs inconnues comme « À vérifier ».
- Distinguer composant déclaré et composant réellement déployé.
- Un identifiant de licence ne prouve pas sa conformité.
- N'utiliser que des liens officiels connus et ne pas inventer de sources.
- Rédiger en français.
- Ne pas modifier les fichiers dans `code/` et `exemples/`.
- Ne créer aucun fichier supplémentaire.
