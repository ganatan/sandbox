# 012 — GitLab : collecte et liens entre tickets

## Étape 1 — Collecte des quatre derniers sprints

Objectif : créer un script Python qui produit un seul fichier `data.json` à partir de GitLab, sans intervention de LLM.

### Prompt à saisir dans OpenCode

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

## Étape 2 — Identification des liens entre tickets

Objectif : comprendre les relations présentes dans les tickets, sans analyser les dépôts.

### Prompt à saisir dans OpenCode

> Analyse le fichier `data.json` contenant les tickets des 4 derniers sprints.
>
> Pour chaque ticket :
> - Lire sa description et tous ses commentaires.
> - Identifier les liens avec les autres tickets.
> - Identifier les références aux projets, Merge Requests et commits.
> - Relever les dépendances et les relations entre tickets.
> - Expliquer brièvement le lien identifié.
>
> Générer un fichier `tickets-analysis.md` avec les relations trouvées et leurs références.
>
> Ne pas analyser les dépôts ni le code source.
>
> Ne rien inventer et distinguer les liens confirmés des liens supposés.

## Suite de la démarche

La collecte de `data.json` est déterministe et ne nécessite pas de LLM. OpenCode intervient ensuite uniquement pour comprendre et documenter les liens entre les tickets. L'analyse des dépôts GitLab locaux viendra dans une étape ultérieure.
