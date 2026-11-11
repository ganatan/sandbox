# 05 — Automatisation future

## Aujourd'hui

Le travail est volontairement **manuel** :

1. Lire les dépôts et configurations.
2. Identifier les composants, versions et licences.
3. Renseigner `code/data.json`.
4. Générer avec OpenCode, relire et archiver.

Cela permet de comprendre la méthode avant d'écrire des outils.

## Plus tard

Des programmes ou API pourront remplir **le même JSON**.

Exemple pour un dépôt Angular :

1. Lire `package.json`.
2. Lire `package-lock.json` pour les versions résolues.
3. Rechercher les informations de licence des paquets correspondants.
4. Identifier les champs inconnus et les cas ambigus.
5. Produire des données prêtes à intégrer dans `code/data.json`.

Commencer par un seul écosystème. Envisager des outils existants de génération SBOM avant d'écrire un analyseur complet.

## Technologies possibles

- **GitLab API** : découverte des dépôts et récupération de fichiers, selon les accès.
- **Node.js / TypeScript** : outil de collecte ou d'intégration avec OpenCode.
- **Outils npm, Maven et Cargo** : informations propres aux écosystèmes.
- **Outils SBOM** : collecte standardisée quand leur installation et leur usage sont autorisés.

Ne pas confier au LLM l'établissement d'un fait sans preuve. Les collecteurs fournissent les données ; OpenCode aide à rédiger et à traduire.

## Quand automatiser ?

Quand plusieurs dépôts demandent les mêmes opérations, quand la saisie est répétitive et quand les champs nécessaires sont bien compris.

**Architecture conservée :** collecte manuelle ou automatique → `data.json` → OpenCode → rapport et glossaire EN/FR → validation → archive.

Ne jamais intégrer de secrets ou d'informations internes dans un dépôt public.
