# 005 — Faire construire un outil de suivi des tokens par OpenCode

## Objectif

Ce fichier est un **cahier des charges**, pas une application. Il est destiné à être lu par OpenCode **sur le poste client** pour lui faire concevoir, réaliser et tester un outil fiable de mesure des tokens.

Environnement : Fedora + Podman + Distrobox ; OpenCode ; deux LLM internes « Intelligence » et « Super Intelligence » ; dix dépôts GitLab Angular, React, Rust, Quarkus, Helm, Ansible et ArgoCD ; **pas d'Internet public**.

Le fichier de configuration réel est `~/.config/opencode/opencode.json`. **Ne jamais copier sa configuration ou ses secrets dans sandbox.**

**Règle : mesurer les tokens réellement déclarés par OpenCode ou le fournisseur, ne pas les estimer à partir de caractères.**

## 1. Diagnostic avant toute programmation

Dans l'environnement qui exécute OpenCode :

```bash
opencode --version
opencode --help
opencode stats --help
opencode session --help
node --version
```

Vérifier la prise en charge effective des statistiques structurées (`opencode stats --json` lorsque disponible), des exports de sessions, d'une éventuelle API locale et du SDK. Ne présumer aucune option qui n'existe pas dans la version installée.

### Prompt 1 — À saisir dans OpenCode

> Je veux construire un outil professionnel de suivi des tokens OpenCode sur Fedora/Distrobox, sans Internet. J'ai deux modèles internes : Intelligence et Super Intelligence. Commence par vérifier ta version, tes commandes disponibles, tes statistiques et exports de sessions, les éventuelles API/SDK accessibles localement et les données de consommation réelles. Identifie les champs input, output, reasoning, cache read, cache write, coût, modèle, session, projet et dates lorsque disponibles. Distingue faits vérifiés, champs absents et hypothèses. Ne modifie aucun fichier, ne contacte pas Internet et ne révèle aucun secret. Propose une architecture minimale et attends mon accord.

## 2. Métriques : définition précise

| Mesure | Signification | Règle |
|---|---|---|
| Input | Tokens d'entrée déclarés | Vérifier s'ils incluent du cache |
| Output | Tokens de sortie déclarés | Vérifier si reasoning y est inclus |
| Reasoning | Tokens de raisonnement | Afficher « non disponible » si absents |
| Cache read | Tokens relus depuis le cache | Éviter le double comptage |
| Cache write | Tokens écrits dans le cache | Vérifier la sémantique fournisseur |
| Total | Somme compatible avec la source | Documenter la formule |
| Coût | Coût réellement fourni ou tarif validé | Ne pas inventer de prix interne |
| Modèle | Identifiant technique du modèle | Distinguer les deux profils |
| Date | Instant et fuseau de la mesure | Éviter d'inventer un historique |

**Absence de données ≠ zéro token.** Une somme n'est valide que si la définition des catégories est connue.

## 3. Fonctionnalités attendues

### MVP obligatoire

1. Afficher la consommation globale.
2. Séparer Intelligence et Super Intelligence à partir de leurs identifiants techniques.
3. Afficher entrée, sortie, reasoning, caches, seulement quand disponibles.
4. Filtrer par période **si les données datées existent**.
5. Afficher la source, la période et les limites de chaque chiffre.
6. Exporter JSON et CSV agrégés, sans messages de conversation.
7. Fonctionner localement sans Internet ni installation non autorisée.
8. Gérer les données manquantes et les erreurs avec des messages clairs.

### Améliorations après validation

- Ventilation par session et par dépôt **uniquement si la source permet une association fiable**.
- Association à un ticket GitLab par métadonnée vérifiable ou annotation locale explicite.
- Historique local sous forme de snapshots datés si la source ne fournit que des cumuls.
- Comparaison par modèle, durée, tests réussis et retouches humaines.

Une statistique cumulative actuelle ne permet pas de reconstruire le passé. Les différences entre snapshots doivent être étiquetées comme telles.

## 4. Architecture proposée

Privilégier **TypeScript avec Node.js**, seulement si les versions déjà installées le permettent. Préférer zéro dépendance externe.

Séparer les responsabilités :

```text
Sources OpenCode réelles
         |
         v
Collecte non destructive
         |
         v
Validation stricte des champs
         |
         v
Normalisation des métriques
         |
         v
Agrégation sans double comptage
         |
         v
Terminal + JSON + CSV
```

Ne pas lire directement les structures internes de stockage d'OpenCode tant qu'une interface officielle stable existe. Ne jamais lire ou exporter le contenu des conversations pour établir les totaux.

## 5. Prompt 2 — Faire coder l'outil par OpenCode

> Sur la base de ton diagnostic validé, crée dans un nouveau répertoire autorisé un outil « opencode-token-monitor ».
>
> - TypeScript/Node.js si possible, sans dépendances supplémentaires.
> - Aucun appel Internet et aucune installation automatique.
> - Ne modifie ni mes dix dépôts GitLab ni ~/.config/opencode/opencode.json.
> - Utilise exclusivement les données réelles de consommation que tu as vérifiées.
> - Sépare collecte, validation, normalisation, agrégation, affichage et export.
> - Indique « non disponible » pour un champ absent, jamais zéro.
> - Préviens tout double comptage input/output/reasoning/cache.
> - Conserve des identifiants techniques de modèles distincts.
> - Prévois une CLI avec aide, vues globale et par modèle, filtres réellement possibles, export JSON/CSV et codes d'erreur.
> - N'enregistre aucun prompt, réponse, secret ou jeton.
> - Écris des tests automatiques avec données anonymisées et un README d'utilisation.
> - Ne commit ni push sans mon accord.
>
> Propose d'abord les fichiers, les sources et les interfaces. Attends mon feu vert, puis implémente et exécute les tests.

## 6. Prompt 3 — Review indépendante

> Audite l'outil en lecture seule. Confronte ses agrégations aux données brutes réellement fournies par OpenCode. Vérifie les différences de sémantique entre les modèles et le cache, l'absence de double comptage, les périodes, les entrées invalides, la déduplication, les erreurs, les exports et la confidentialité. Produis un rapport d'anomalies priorisées avec preuves et tests réellement exécutés. Ne modifie rien.

## 7. Tests obligatoires

| Cas | Résultat |
|---|---|
| Aucune session | Aucun total inventé |
| Un modèle | Totaux exacts |
| Deux modèles | Séparation et agrégation cohérentes |
| Cache / reasoning | Aucune addition injustifiée |
| Champ absent | « Non disponible » |
| JSON malformé | Erreur contrôlée |
| CLI non disponible | Diagnostic compréhensible |
| Sessions dupliquées | Pas de double comptage |
| Historique indisponible | Limitation indiquée |
| Export | Aucun contenu de session ni secret |
| Périodes / fuseaux | Filtrage vérifiable |

Utiliser de petites fixtures anonymisées avec calculs attendus connus et comparer à la source OpenCode sur un jeu réel autorisé.

## 8. Évaluer les deux modèles sur les tickets GitLab

La métrique utile n'est pas seulement « combien de tokens ? » mais **quel résultat pour combien de travail ?**.

Pour des tâches équivalentes sur un même commit, comparer :

| Indicateur | Utilité |
|---|---|
| Modèle | Intelligence ou Super Intelligence |
| Dépôt / ticket | Attribution explicite ou vérifiable |
| Input / output / cache | Consommation réelle |
| Durée | Rapidité |
| Tests réussis | Qualité observable |
| Retouches humaines | Coût caché |
| Régressions détectées | Valeur de la review |

### Prompt 4 — Benchmark

> Propose un benchmark local reproductible des modèles Intelligence et Super Intelligence sur trois tâches : localisation d'un bug, correction simple et review d'un diff. Utilise les mêmes versions de sources, contraintes et critères de réussite. Mesure uniquement les statistiques disponibles, la durée, les tests et les retouches humaines. Documente les limites méthodologiques et ne conclue pas sur la base des tokens seuls.

## 9. Sécurité et limites

- Aucune sortie de données vers Internet.
- Pas d'intégration externe ni de téléchargement de paquet non approuvé.
- Aucun fichier réel de configuration, authentification, prompt ou session dans un Git personnel.
- Pas de surveillance permanente sans autorisation client.
- Aucun changement du stockage interne OpenCode.
- Les métriques absentes ou incertaines doivent rester explicitement marquées.
- Vérifier les contraintes et versions réelles avant de concevoir la collecte.

## 10. Ordre d'exécution sur le poste client

1. Ouvrir OpenCode depuis la Distrobox retenue.
2. Exécuter **Prompt 1** et valider l'accès réel aux statistiques.
3. Autoriser la conception puis l'implémentation avec **Prompt 2**.
4. Faire passer les tests puis la review avec **Prompt 3**.
5. Comparer les deux LLM sur des tâches contrôlées avec **Prompt 4**.
6. Ajouter l'association aux tickets GitLab uniquement lorsque les données sont fiables.

## 11. Critères d'acceptation

- [ ] Données mesurées à la source, jamais devinées.
- [ ] Compatible avec l'OpenCode réellement installé.
- [ ] Exécution locale et hors Internet.
- [ ] Statistiques globales et par modèle exactes.
- [ ] Catégories cache/reasoning correctement interprétées.
- [ ] Limites et données manquantes explicites.
- [ ] Export exempt de conversations et secrets.
- [ ] Tests automatisés reproductibles.
- [ ] Guide de lancement compréhensible.
- [ ] Modifications et installations validées par l'utilisateur.

**Conclusion :** commencer par une collecte minimale, vérifiable et sûre. La comparaison des LLM et des tickets doit reposer sur des mesures authentiques, pas sur des nombres vraisemblables.
