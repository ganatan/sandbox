# 012 — GitLab : collecte, compréhension et préparation des tickets

## Objectif

Exploiter un an de sprints GitLab pour comprendre les tickets en cours avant de toucher au code.

Méthode identique au SBOM : collecte déterministe, données structurées, puis analyse ciblée avec OpenCode. Les dépôts GitLab sont déjà clonés localement.

## Arborescence du projet

```text
gitlab-analysis/
├── audit/
├── models/
├── results/
├── data.json
└── prompt.md
```

- `audit/` : scripts Python existants ou nouveaux, et Rust si nécessaire. Aucun appel au LLM.
- `models/` : modèles de documents utilisés pour les restitutions.
- `results/` : rapports Markdown générés par OpenCode.
- `data.json` : données GitLab collectées, à la racine.
- `prompt.md` : consigne OpenCode active, à la racine ; son contenu change selon l'étape.

Les scripts existants de clonage et les dépôts locaux ne doivent pas être modifiés.

## Étape 1 — Collecter un an de sprints

La collecte se fait en Python, sans intervention du LLM. OpenCode sert uniquement à développer le script, puis on exécute ce script de manière autonome.

### Prompt de développement du script

> En utilisant mon script Python GitLab existant, crée dans `audit/` un script autonome qui génère `data.json` à la racine.
>
> Récupère les sprints des 12 derniers mois (environ 17 à 18 sprints de 3 semaines). Repère leur représentation réelle dans GitLab : boards, iterations ou milestones.
>
> Pour chaque sprint, conserve son nom, ses dates et tous ses tickets ouverts ou fermés.
>
> Pour chaque ticket, récupère :
> - ID, titre, description complète, état et projet GitLab.
> - Auteur, assignés, labels et dates.
> - Tous les commentaires et discussions.
> - Tickets liés et dépendances.
> - Références aux Merge Requests et aux commits.
> - Dépôts concernés lorsqu'ils sont identifiables et URLs GitLab.
>
> Utilise la pagination complète, évite les doublons et signale les données inaccessibles.
>
> Produit uniquement `data.json`, organisé par sprint. Aucun Markdown, aucun rapport ni appel LLM dans le script.
>
> Ne modifie pas GitLab, le script de clonage ni les dépôts locaux. N'expose pas le token.

### Résultat

`data.json` contient l'historique brut d'un an. Il constitue la source commune des analyses suivantes.

## Étape 2 — Comprendre les liens entre tickets

À cette étape, OpenCode ne doit **pas** inspecter les dépôts. On vérifie d'abord si les tickets et leurs échanges permettent de comprendre leurs relations.

Placer le prompt suivant dans `prompt.md`, puis lancer OpenCode depuis la racine du projet.

### Contenu de prompt.md — analyse des liens

> Analyse `data.json` contenant les tickets des sprints des 12 derniers mois.
>
> Pour chaque ticket :
> - Lis sa description et tous ses commentaires.
> - Identifie les liens avec les autres tickets.
> - Repère les références aux projets, Merge Requests et commits.
> - Relève les dépendances et explique brièvement chaque lien.
>
> Génère `results/tickets-analysis.md` avec les relations identifiées et leurs références.
>
> Ne consulte ni les dépôts ni le code source. Ne réalise aucune analyse technique du code.
>
> N'invente aucun lien et distingue les relations confirmées des hypothèses.

### Résultat

`results/tickets-analysis.md` documente les relations déduites des seules données GitLab.

## Étape 3 — Préparer un ticket en cours

On choisit un ticket précis. OpenCode exploite le JSON et le rapport de liens, puis **seulement à cette étape** examine les dépôts locaux pertinents, en lecture seule.

Remplacer `XXX` par la référence complète du ticket et placer cette consigne dans `prompt.md`.

### Contenu de prompt.md — préparation d'un ticket

> Analyse le ticket GitLab `#XXX` à partir de `data.json` et de `results/tickets-analysis.md`.
>
> - Comprends le besoin et ses commentaires.
> - Retrouve les anciens tickets, décisions et travaux similaires.
> - Identifie les projets et dépôts GitLab potentiellement concernés.
> - Vérifie les liens utiles dans les dépôts locaux et leur historique Git.
> - Examine uniquement le code nécessaire pour comprendre l'état actuel.
> - Détermine ce qu'il faudrait modifier, les dépendances et les tests à prévoir.
> - Signale les informations manquantes et distingue les faits des hypothèses.
>
> Génère `results/ticket-XXX-analysis.md` contenant le contexte, les dépôts concernés, les preuves et le plan de réalisation.
>
> Ne modifie aucun code, aucun dépôt ni aucun ticket. Aucun commit ni push.

### Résultat

`results/ticket-XXX-analysis.md` sert de préparation technique à la prise en charge du ticket, **pas** d'autorisation à développer.

## Principes de fonctionnement

1. **Python collecte les faits** depuis GitLab dans `data.json`, sans LLM.
2. **OpenCode comprend les liens** à partir du JSON, sans accéder au code.
3. **OpenCode prépare un ticket choisi** en consultant uniquement les dépôts concernés.
4. Les relations doivent rester traçables : référence de ticket, URL GitLab, IID de MR ou SHA de commit quand ils existent.
5. Les dépôts locaux restent en lecture seule : aucun commit, push ou modification.
6. Éviter de transmettre l'intégralité de l'année au modèle pour l'analyse d'un seul ticket : sélectionner d'abord les éléments pertinents.
7. Les données GitLab d'entreprise restent locales ; ne pas publier `data.json` ni les rapports contenant des informations internes dans un dépôt public.

## Ordre d'exécution

1. Développer puis exécuter le script de `audit/` pour générer `data.json`.
2. Mettre le prompt de l'étape 2 dans `prompt.md` et lancer OpenCode.
3. Choisir un ticket en cours, remplacer le contenu de `prompt.md` par le prompt de l'étape 3 et lancer OpenCode.
4. Examiner le plan proposé avant toute intervention sur les dépôts.

**Collecter → relier les tickets → préparer un ticket → décider ensuite du développement.**
