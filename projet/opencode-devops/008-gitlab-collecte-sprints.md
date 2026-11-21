# 008 — GitLab : collecte des quatre derniers sprints

## Objectif

Créer un script Python qui produit un seul fichier `data.json` à partir de GitLab, sans intervention de LLM.

## Prompt à saisir dans OpenCode

> En utilisant mon script Python GitLab existant, crée un script qui génère un fichier `data.json` contenant les 4 derniers sprints de 3 semaines.
>
> Pour chaque sprint :
> - Nom et dates.
> - Tous les tickets ouverts et fermés.
>
> Pour chaque ticket :
> - ID, titre, description complète, statut et projet GitLab.
> - Auteur, assignés, labels et dates.
> - Tous les commentaires et discussions.
> - Tickets liés et dépendances.
> - Merge Requests associées.
> - Commits associés.
> - Dépôts concernés et URLs GitLab.
>
> Utilise l'API GitLab avec pagination complète.
>
> Le script doit être autonome, sans LLM, et ne modifier aucune donnée GitLab ni aucun dépôt local.
>
> Résultat : un seul fichier `data.json` contenant toutes les informations, organisé par sprint.

## Suite de la démarche

Comme pour le SBOM, la collecte est déterministe. Le fichier `data.json` sera ensuite utilisé séparément par OpenCode pour analyser les quatre sprints et produire des synthèses par projet, par dépôt ou par thème.
