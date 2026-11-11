# Mission OpenCode

Travaille depuis le dossier `generate-board`.

## Entrée

- Données : `code/data.json`
- Modèle du rapport : `models/rapport-v1.0.md`
- Modèle du glossaire : `models/glossaire-v1.0.md`

## Sortie

- `resultat/rapport.md`
- `resultat/glossaire.md`

## Instructions

1. Génère un rapport Markdown en reprenant la structure et la présentation de `models/rapport-v1.0.md`.
2. Remplace exclusivement les résultats fictifs du modèle par les données réelles de `code/data.json` (qui sont elles-mêmes simulées pour ce test).
3. Calcule les totaux uniquement à partir du JSON. N'utilise jamais les 125 composants du modèle comme résultat du JSON.
4. Génère un glossaire en reprenant la présentation de `models/glossaire-v1.0.md`.
5. Le glossaire doit être court : une définition simple par terme, éventuellement une expansion du sigle. Aucun historique ni développement inutile.
6. N'inclus dans le glossaire que les notions effectivement citées dans le rapport généré.
7. Les références doivent être officielles et vérifiables. Ne crée pas de référence imaginaire.
8. Distingue les composants déclarés des composants déployés. Une licence identifiée n'établit pas la conformité juridique.
9. Mentionne « Simulation », la société ganatan et le projet xxx dans les deux documents.
10. Ne modifie aucun fichier de `code/` ou de `models/`.
11. Produis uniquement les deux fichiers prévus dans `resultat/`, en français.
