# 012 — GitLab : collecte et analyse progressive des tickets

## Objectif

Exploiter un an de sprints GitLab pour comprendre les tickets, identifier leurs relations et préparer, développer et vérifier un ticket en cours jusqu'à la préparation de sa livraison.

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

## Étape 5 — Validation de la compréhension

### Prompt 5

```text
Relis le ticket PROJET#XXX dans data.json et ses rapports analysis et technical.

Vérifie le besoin, les contradictions, les hypothèses et les critères d'acceptation. Confronte le plan au ticket et aux commentaires.

Liste les questions restantes et les points bloquants. Propose des critères d'acceptation vérifiables sans inventer de besoin.

Génère results/ticket-XXX-validation.md et indique si le plan est prêt ou reste à clarifier.

Ne modifie aucun code.
```

**Résultat :** `results/ticket-XXX-validation.md`.

Le développeur valide le besoin et le plan avant de passer à l'étape 6.

## Étape 6 — Développement

### Prompt 6

```text
Implémente le ticket PROJET#XXX en suivant les rapports technical et validation approuvés.

Vérifie git status et le diff initial dans chaque dépôt concerné. Préserve les modifications existantes.

Modifie uniquement les fichiers nécessaires. Respecte l'architecture, les conventions et les dépendances existantes. Ajoute les tests utiles.

Si un point bloquant apparaît ou si le plan doit changer, arrête-toi et explique pourquoi.

Génère results/ticket-XXX-development.md avec les fichiers modifiés, les choix réalisés et les tests ajoutés.

Aucun commit, push ou modification de GitLab.
```

**Résultat :** modifications locales et `results/ticket-XXX-development.md`.

Seule cette étape autorise la modification du code, après validation humaine.

## Étape 7 — Vérification et revue de code

### Prompt 7

```text
Effectue une revue indépendante du ticket PROJET#XXX à partir de data.json, des rapports précédents et du git diff de chaque dépôt concerné.

Vérifie les critères d'acceptation, la qualité du code, les impacts, les régressions et les modifications inutiles. Distingue les changements du ticket des modifications préexistantes.

Exécute les commandes de compilation et de test prévues par les dépôts. Indique les résultats réels et les vérifications impossibles.

Classe les anomalies par gravité avec leurs fichiers et lignes. Donne un verdict : validé, à corriger ou non vérifiable.

Génère results/ticket-XXX-review.md.

Ne corrige pas le code pendant la revue. Aucun commit ni push.
```

**Résultat :** `results/ticket-XXX-review.md`.

Utiliser de préférence une nouvelle session OpenCode. Si des anomalies sont détectées, revenir à l'étape 6 avec le rapport de revue, puis relancer l'étape 7.

## Étape 8 — Préparation de la livraison

### Prompt 8

```text
Prépare la livraison du ticket PROJET#XXX à partir du git diff et des rapports development, validation et review.

Résume les modifications par dépôt, les critères d'acceptation, les tests réellement exécutés et les limitations restantes.

Propose pour chaque dépôt un message de commit et une description de Merge Request avec la référence du ticket.

Génère results/ticket-XXX-delivery.md. Signale tout point bloquant avant livraison.

Ne crée aucun commit, push ou Merge Request. Ne modifie aucun ticket GitLab.
```

**Résultat :** `results/ticket-XXX-delivery.md`.

La livraison effective reste une décision humaine.

## Ordre d'exécution

1. Utiliser le prompt 1 pour créer le script Python, puis l'exécuter afin de générer `data.json`.
2. Placer le prompt 2 dans `prompt.md` et demander à OpenCode de l'exécuter.
3. Sélectionner un ticket en cours et exécuter successivement les prompts 3, 4 et 5.
4. Valider humainement le besoin et le plan technique.
5. Exécuter le prompt 6 pour développer.
6. Exécuter le prompt 7 dans une nouvelle session si possible. Corriger puis vérifier de nouveau si nécessaire.
7. Exécuter le prompt 8 pour préparer la livraison.

Pour chaque étape, remplacer le contenu de `prompt.md` par le prompt correspondant et conserver les rapports dans `results/`. Réutiliser la même référence de ticket et le même nom de fichier pour toute la chaîne.

## Principes communs

- Chaque étape exploite les résultats de la précédente.
- Utiliser les modèles de `models/` lorsqu'un modèle adapté existe.
- Ne pas charger inutilement un an de tickets pour l'analyse d'un seul ticket : identifier d'abord le contexte pertinent.
- Conserver les références complètes des tickets, MR, commits et chemins de fichiers.
- Distinguer les faits vérifiés des hypothèses et signaler les informations manquantes.
- Seule l'étape 6 permet de modifier le code, après validation humaine. Préserver les modifications locales existantes.
- Aucun MCP, aucun commit, push ou changement de ticket GitLab dans les huit étapes.
- Ne jamais présenter un test non exécuté comme réussi.
- Utiliser uniquement un LLM autorisé à traiter les données internes. Ne pas publier les données collectées ni les rapports internes dans un dépôt public.

## Chaîne de traitement

```text
01 - Collecter       -> data.json
02 - Comprendre     -> results/tickets-analysis.md
03 - Préparer       -> results/ticket-XXX-analysis.md
04 - Approfondir    -> results/ticket-XXX-technical.md
05 - Valider        -> results/ticket-XXX-validation.md
     Validation humaine
06 - Développer     -> results/ticket-XXX-development.md + code local
07 - Vérifier       -> results/ticket-XXX-review.md
08 - Préparer       -> results/ticket-XXX-delivery.md
     Livraison manuelle après validation
```

Les étapes 1 et 2 constituent le contexte commun, à actualiser lorsque nécessaire. Les étapes 3 à 8 sont répétées pour chaque ticket.
