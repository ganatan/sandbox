# 012 — GitLab : collecte et analyse progressive des tickets

## Objectif

Exploiter un an de sprints GitLab pour comprendre les tickets, identifier leurs relations et préparer le développement d'un ticket en cours.

La méthode reprend celle du SBOM : collecte déterministe, données structurées, analyse progressive avec OpenCode.

## Arborescence

```text
gitlab-analysis/
├── audit/
├── models/
├── results/
├── data.json
└── prompt.md
```

- `audit/` : scripts de collecte.
- `models/` : modèles documentaires.
- `results/` : rapports générés.
- `data.json` : données GitLab collectées.
- `prompt.md` : prompt actif, à la racine.

Les dépôts GitLab sont déjà clonés localement.

## Étape 1 — Collecte GitLab

### Prompt 1

```text
À partir de mon script Python GitLab existant, crée dans audit/ un script générant data.json avec les sprints des 12 derniers mois.

Identifie les boards, iterations ou milestones correspondant aux sprints.

Récupère tous les tickets ouverts et fermés, descriptions, commentaires, discussions, projets, labels, dates, dépendances, références aux MR, commits et dépôts.

Gère la pagination, les doublons et les erreurs.

Le script doit être autonome, sans LLM, sans modification de GitLab ni des dépôts locaux. Ne divulgue aucun token.
```

**Résultat :** `data.json`, à la racine.

OpenCode sert uniquement à développer le script. La collecte elle-même est exécutée en Python, sans LLM.

## Étape 2 — Compréhension des tickets

### Prompt 2

```text
Analyse data.json pour identifier les relations entre tickets, projets, dépôts, MR et commits.

Exploite les descriptions et les commentaires pour comprendre les liens fonctionnels et techniques.

Justifie chaque relation par une référence et distingue les faits des hypothèses.

Génère results/tickets-analysis.md.

Ne consulte pas les dépôts ni le code source.
```

**Résultat :** `results/tickets-analysis.md`.

## Étape 3 — Préparation d'un ticket

### Prompt 3

```text
Analyse le ticket PROJET#XXX à partir de data.json et results/tickets-analysis.md.

Comprends le besoin, retrouve les travaux antérieurs, identifie les dépôts concernés et vérifie leur pertinence dans le code local et l'historique Git.

Détermine ce qui existe déjà, ce qui reste à faire et les informations manquantes.

Génère results/ticket-XXX-analysis.md.

Ne modifie aucun code.
```

**Résultat :** `results/ticket-XXX-analysis.md`.

Remplacer PROJET#XXX par la référence complète du ticket GitLab et XXX par son identifiant dans le nom du rapport. Si plusieurs projets partagent le même numéro de ticket, ajouter le nom du projet au nom du rapport.

## Étape 4 — Analyse technique approfondie

### Prompt 4

```text
À partir de results/ticket-XXX-analysis.md, approfondis l'analyse des dépôts concernés.

Identifie les modules, fichiers, classes et fonctions impliqués. Analyse leur fonctionnement, leurs dépendances et les implémentations similaires.

Détermine précisément les modifications nécessaires, leur ordre, leurs impacts, leurs risques et les tests à réaliser.

Justifie chaque proposition par le code existant. Privilégie les solutions simples et respecte l'architecture actuelle.

Génère results/ticket-XXX-technical.md avec un plan d'implémentation directement exploitable.

Ne modifie aucun code et ne réalise aucun commit.
```

**Résultat :** `results/ticket-XXX-technical.md`.

## Ordre d'exécution

1. Utiliser le prompt 1 pour créer le script Python, puis exécuter ce script afin de générer `data.json`.
2. Placer le prompt 2 dans `prompt.md` et demander à OpenCode de l'exécuter.
3. Choisir un ticket en cours, placer le prompt 3 dans `prompt.md` et demander à OpenCode de l'exécuter.
4. Placer le prompt 4 dans `prompt.md` et demander à OpenCode de l'exécuter.
5. Vérifier le plan technique avant de commencer le développement.

## Principes communs

- Chaque étape exploite les résultats de la précédente.
- Utiliser les modèles de `models/` lorsqu'un modèle adapté existe.
- Ne pas charger inutilement un an de tickets pour l'analyse d'un seul ticket : identifier d'abord le contexte pertinent.
- Conserver les références complètes des tickets, MR, commits et chemins de fichiers.
- Distinguer les faits vérifiés des hypothèses et signaler les informations manquantes.
- Aucun MCP, aucune modification des dépôts analysés, aucun commit ni push pendant les analyses.
- Utiliser uniquement un LLM autorisé à traiter les données internes. Ne pas publier les données collectées ni les rapports internes dans un dépôt public.

## Chaîne de traitement

```text
01 - Collecter     -> data.json
02 - Comprendre   -> results/tickets-analysis.md
03 - Préparer     -> results/ticket-XXX-analysis.md
04 - Approfondir  -> results/ticket-XXX-technical.md
05 - Développer   -> après validation humaine
```

Le développement ne fait pas partie de cette procédure. Il commence uniquement lorsque le plan technique a été vérifié.
