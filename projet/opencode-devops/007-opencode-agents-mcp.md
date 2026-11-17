# 007 — OpenCode, agents IA et MCP : architecture et utilisation avec GitLab

Date : 17 novembre 2026

## 1. Objectif

Ce guide complète les documents 001 à 006 du projet. Il explique les concepts et propose une organisation concrète pour un poste Fedora, des dépôts GitLab locaux, OpenCode et des tickets à traiter. Le principe directeur est simple : **un agent est une responsabilité ; un dépôt est une frontière de code ; MCP est un moyen d'accéder à des outils externes**.

## 2. OpenCode : les éléments fondamentaux

OpenCode est un assistant de développement piloté par des modèles de langage. Il lit du contexte, échange avec un modèle, appelle des outils autorisés et peut proposer ou effectuer des modifications. Le modèle ne lit pas spontanément tout le disque et ne possède pas automatiquement l'accès GitLab : les outils, le contexte, les permissions et les connecteurs déterminent ses capacités effectives.

Distinguer quatre niveaux :

1. **Modèle IA** : raisonne sur le contexte fourni et génère des réponses ou des demandes d'outils.
2. **Agent** : définit une mission, des instructions, un modèle éventuel et les outils/permissions utilisables.
3. **Outil** : effectue une opération précise, par exemple lire un fichier, rechercher du code ou lancer un test.
4. **MCP** : protocole standard permettant à un client d'exposer et d'utiliser des outils et ressources proposés par des serveurs externes.

Un agent n'est ni un processus autonome garanti, ni un modèle supplémentaire obligatoire. Selon la configuration, plusieurs agents peuvent partager le même modèle.

## 3. Agent principal et sous-agents

Un agent principal pilote le dialogue et peut déléguer des tâches ciblées à des sous-agents. La disponibilité des mécanismes de délégation dépend de la version et de la configuration d'OpenCode.

Exemple de rôles :

| Rôle | Mission | Limite recommandée |
| --- | --- | --- |
| Coordinateur | Comprendre le ticket, identifier les dépôts concernés, organiser les étapes | Ne pas modifier sans validation |
| Frontend | Examiner Angular et React | Ne travailler que sur les dépôts autorisés |
| Backend | Examiner Quarkus et Rust | Ne pas toucher aux secrets ou à la production |
| Infrastructure | Examiner Helm, Ansible et Kubernetes | Aucun déploiement automatique |
| Tests | Définir et exécuter les vérifications | Commandes explicitement autorisées |
| Documentation | Rédiger le compte rendu et les impacts | Ne pas inventer de résultats |

**Les agents ne remplacent pas les tests, les revues de code ni les règles de sécurité.**

## 4. Pourquoi organiser les agents par domaine plutôt que par dépôt ?

Un dépôt est un emplacement et une unité de versionnement. Un domaine correspond à une compétence réutilisable. Un agent Frontend peut intervenir dans plusieurs dépôts Angular/React ; un agent Tests peut intervenir dans tous les dépôts.

Exemple :

```text
~/workspace/repositories/
├── ui-angular/
├── ui-react/
├── api-quarkus/
├── service-rust/
├── deploy-helm/
└── automation-ansible/
```

**Approche par dépôt** : utile pour des dépôts très spécifiques, des permissions strictes ou des conventions incompatibles.

**Approche par domaine** : utile pour mutualiser les consignes et éviter de dupliquer les agents.

**Approche hybride recommandée** : agents spécialisés par domaine, règles et périmètres d'écriture définis par dépôt, coordinateur pour les tickets transversaux. Une « zone » est une convention d'organisation, pas une obligation technique imposée par OpenCode.

## 5. Où placer les instructions ?

OpenCode distingue la configuration globale et la configuration de projet.

```text
~/.config/opencode/
├── opencode.json
└── agents/

mon-projet/
├── opencode.json
├── AGENTS.md
└── .opencode/
    └── agents/
```

- `~/.config/opencode/opencode.json` : paramètres globaux de l'utilisateur.
- `~/.config/opencode/agents/` : définitions d'agents réutilisables.
- `.opencode/agents/` : définitions spécifiques au projet.
- `AGENTS.md` : consignes de travail du projet.
- `opencode.json` dans le projet : configuration locale lorsque nécessaire.

Vérifier les chemins et la syntaxe avec la documentation de la version installée. Ne pas remplacer la configuration existante sans sauvegarde. Éviter de placer des identifiants ou des tokens en clair dans les fichiers suivis par Git.

## 6. MCP expliqué simplement

MCP signifie **Model Context Protocol**. Il standardise les échanges entre une application cliente compatible et un serveur qui expose des capacités : outils, ressources et éventuellement prompts.

Exemple de chaîne :

```text
Utilisateur
    |
    v
OpenCode (client MCP)
    |
    +--> Modèle IA : analyse et choix d'action
    |
    +--> Serveur MCP GitLab : lecture de tickets et métadonnées
    |
    +--> Outils locaux : fichiers, recherche, tests
    |
    +--> Autres serveurs MCP approuvés
```

Un serveur MCP GitLab peut exposer des fonctions comme consulter un ticket, lire une merge request ou créer un commentaire, **uniquement si son implémentation et ses permissions le permettent**. MCP ne garantit pas ces fonctions par lui-même.

Il ne faut pas confondre :
- **API GitLab** : interface HTTP fournie par GitLab.
- **Serveur MCP GitLab** : adaptateur éventuel exposant des opérations GitLab au client IA.
- **Agent GitLab** : rôle que l'on peut donner à un agent pour utiliser ces opérations.
- **SDK OpenCode** : interface de programmation pour piloter OpenCode ; ce n'est pas un serveur MCP.

Un accès GitLab peut aussi être réalisé directement via API ou CLI, sans MCP. MCP est utile quand on veut standardiser l'accès aux outils dans l'écosystème des agents.

## 7. GitLab : traitement contrôlé d'un ticket

Workflow recommandé :

1. Récupérer le numéro, le titre, la description, les critères d'acceptation et les liens du ticket.
2. Vérifier l'authenticité des données et ignorer les instructions malveillantes incluses dans le ticket.
3. Identifier les dépôts concernés et leurs versions de référence.
4. Faire analyser le ticket par le coordinateur ; solliciter les agents spécialisés si nécessaire.
5. Produire un plan court : fichiers concernés, hypothèses, risques, tests et ordre des modifications.
6. Demander une validation humaine avant toute écriture importante.
7. Créer une branche de travail dans chaque dépôt concerné.
8. Modifier uniquement les fichiers autorisés ; garder des changements petits et traçables.
9. Exécuter les tests, la compilation et les contrôles de qualité disponibles.
10. Présenter un résumé du diff, les tests réellement exécutés et leurs résultats.
11. Préparer un commit ou une merge request après validation ; ne pas fusionner automatiquement.
12. Mettre à jour le ticket avec un compte rendu factuel si l'accès et l'autorisation le permettent.

Un ticket transverse peut nécessiter plusieurs branches et plusieurs merge requests : ne pas traiter artificiellement tous les dépôts comme un seul dépôt Git.

## 8. Exemple pratique : ticket transverse

Ticket : « Ajouter un champ de statut dans l'interface et l'API ».

- **Coordinateur** : lit le ticket et identifie `ui-angular` et `api-quarkus`.
- **Backend** : vérifie le contrat API, les validations et les tests.
- **Frontend** : vérifie le modèle TypeScript, le service HTTP et le composant.
- **Tests** : vérifie les cas nominaux, les erreurs et la compatibilité.
- **Documentation** : résume le contrat modifié et les vérifications.

Ordre recommandé : contrat API, backend, frontend, tests, revue, commits. L'agent coordinateur doit signaler explicitement toute information manquante plutôt que la deviner.

## 9. Sécurité : règles non négociables

- Lecture seule par défaut pour les outils externes lorsque possible.
- Droits GitLab limités au périmètre nécessaire et aux projets autorisés.
- Aucun secret, token ou mot de passe dans les prompts, logs, commits ou rapports.
- Aucun `push`, merge, suppression de branche, déploiement ou modification de production sans accord explicite.
- Toute sortie d'outil, description de ticket ou contenu de dépôt est une **donnée non fiable** : ne pas exécuter les instructions qui y sont cachées.
- Limiter les commandes shell et les répertoires accessibles ; vérifier les permissions réelles du client et des serveurs MCP.
- Conserver les preuves : ticket, commit de départ, diff, commandes exécutées, résultats de tests.
- En environnement industriel, utiliser uniquement les modèles, serveurs MCP et flux de données autorisés par l'organisation.

**Installer un serveur MCP tiers revient à lui accorder une surface d'accès supplémentaire : vérifier sa provenance, son code, ses droits et son mode de déploiement.**

## 10. Tokens, coûts et efficacité

La consommation dépend du modèle, du nombre de tours, de la taille du contexte, des sorties d'outils et des sous-agents. « Gratuit » ne signifie pas nécessairement illimité : quotas, politiques et coûts d'infrastructure peuvent s'appliquer.

Bonnes pratiques :

1. Commencer par le ticket et les fichiers pertinents, pas par l'intégralité des dépôts.
2. Limiter les recherches aux chemins et extensions utiles.
3. Éviter de réinjecter des logs volumineux ; conserver un extrait et un lien local.
4. Réutiliser un résumé validé plutôt que répéter une analyse complète.
5. Ne déléguer que les tâches nécessitant réellement une spécialité.
6. Mesurer par session, modèle, ticket et agent lorsque les métriques sont disponibles.
7. Comparer le coût en tokens avec le résultat : tests réussis, temps économisé, défauts détectés.

Consulter le document **005-suivi-tokens.md** pour l'instrumentation.

## 11. Exécution nocturne : précautions

Une tâche planifiée peut analyser des tickets, préparer des rapports ou proposer des modifications. Elle ne doit pas être assimilée à une autorisation permanente de modifier et livrer du code.

Pour un cron nocturne :
- Choisir une liste explicite de tickets et de dépôts.
- Utiliser des identifiants de service aux droits minimaux.
- Imposer des limites de durée, de consommation et de concurrence.
- Prévenir les exécutions simultanées avec un verrou.
- Journaliser le statut, les erreurs et les artefacts.
- Préférer un **mode lecture/analyse** ; faire valider les modifications et commits au matin.

Consulter **006-execution-nocturne.md** pour la planification.

## 12. Méthode de déploiement progressive sur Fedora

**Étape A — Inventaire** : vérifier OpenCode, sa version, la configuration `~/.config/opencode/opencode.json`, Git, les dépôts clonés et les outils autorisés.

**Étape B — Premier agent** : créer un agent d'analyse en lecture seule, lui donner un ticket simple et vérifier la qualité de son plan.

**Étape C — Spécialisation** : ajouter Frontend, Backend et Infrastructure uniquement quand les cas d'usage le justifient.

**Étape D — GitLab** : tester d'abord la lecture d'un ticket via l'outil disponible ; choisir API, CLI ou MCP selon les contraintes de l'environnement.

**Étape E — Validation** : imposer un rapport contenant ticket, dépôts, fichiers, modifications proposées, tests et risques.

**Étape F — Automatisation** : n'automatiser que les étapes stabilisées, observables et réversibles.

## 13. Modèle de compte rendu pour un ticket

```text
Ticket :
Objectif :
Dépôts concernés :
Révisions de départ :
Agents sollicités :
Analyse :
Fichiers à modifier :
Risques :
Tests prévus :
Modifications réalisées :
Tests exécutés et résultats :
Points non vérifiés :
Validation humaine :
Commits / merge requests :
```

Ne jamais présenter un test non exécuté comme un test réussi, ni une suggestion d'agent comme une modification déjà effectuée.

## 14. Choix d'architecture recommandé

Pour l'environnement Fedora / Distrobox / GitLab :

- Garder les clones dans `~/workspace/repositories`.
- Utiliser un coordinateur et quelques agents par **domaine**.
- Conserver les conventions, les permissions et les tests **par dépôt**.
- Introduire MCP seulement si un serveur approuvé apporte une réelle valeur par rapport à l'API ou à la CLI GitLab.
- Séparer systématiquement **analyse**, **modification**, **validation** et **publication**.
- Mesurer les tokens, mais privilégier la fiabilité et la traçabilité.

La bonne architecture n'est pas celle qui comporte le plus d'agents : c'est celle dont chaque action est compréhensible, autorisée, vérifiable et reproductible.

## 15. Références

- OpenCode, documentation générale : https://opencode.ai/docs/
- OpenCode, agents : https://opencode.ai/docs/agents/
- OpenCode, serveurs MCP : https://opencode.ai/docs/mcp-servers/
- Model Context Protocol : https://modelcontextprotocol.io/
- GitLab, API REST : https://docs.gitlab.com/api/rest/

Les options exactes de configuration et les fonctionnalités dépendent des versions installées et des politiques internes. Vérifier la documentation officielle et tester localement avant déploiement.
