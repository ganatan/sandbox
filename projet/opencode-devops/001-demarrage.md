# 001 — Démarrage OpenCode DevOps

## Objectif

Mettre en place un usage maîtrisé d'OpenCode sur un poste **Fedora**, avec **Podman**, **Distrobox**, **un LLM interne sans accès Internet** et environ **10 dépôts GitLab** (Angular, React, Rust, Quarkus, Helm, Ansible, ArgoCD).

Deux modèles sont disponibles dans `/models` : **Intelligence** et **Super Intelligence**. Leurs capacités réelles restent à mesurer : ne pas déduire les coûts, la vitesse ou le raisonnement de leurs noms.

**Principe : un environnement stable, une configuration OpenCode commune, des règles par dépôt, des sessions isolées et une validation humaine avant les actions sensibles.**

## Les 13 étapes

| N° | Étape | Action minimale | Résultat attendu |
|---:|---|---|---|
| 1 | Vérifier Fedora | `cat /etc/fedora-release` | Version Fedora identifiée |
| 2 | Vérifier Podman / Distrobox | `podman --version` ; `distrobox --version` ; `distrobox list` | Conteneurs connus |
| 3 | Entrer dans la Distrobox de développement | `distrobox enter NOM_DISTROBOX` | Terminal du bon environnement |
| 4 | Vérifier OpenCode et les modèles | `opencode --version` ; dans OpenCode : `/models` | Version et modèles connus |
| 5 | Organiser les 10 dépôts | `mkdir -p ~/workspace/repositories` | Dépôts GitLab séparés |
| 6 | Diagnostiquer OpenCode | Demander une analyse *sans modification* | Diagnostic existant |
| 7 | Définir les règles globales | Préparer `AGENTS.md` global après validation | Règles communes |
| 8 | Configurer agents / LLM | Plan, Build, Explore, Review selon version | Répartition des rôles |
| 9 | Créer les commandes | `/ticket`, `/implementer`, `/review` | Prompts réutilisables |
| 10 | Étudier GitLab / MCP | Vérifier serveur et autorisations internes | Accès tickets défini |
| 11 | Documenter chaque dépôt | `AGENTS.md` adapté à sa technologie | Conventions locales |
| 12 | Tester sur un ticket | Plan → validation → code → tests → review → MR | Premier flux maîtrisé |
| 13 | Optimiser les tokens | Mesurer par modèle et par scénario | Choix fondés sur des mesures |

Les étapes sont détaillées dans [002-installation-details.md](./002-installation-details.md). Le fichier réel de configuration est **`~/.config/opencode/opencode.json`** : voir [003-configuration.md](./003-configuration.md). Ne pas recopier ni committer ce fichier interne.

## Premier jour : commandes à lancer

Sur Fedora :

```bash
cat /etc/fedora-release
podman --version
distrobox --version
distrobox list
```

Puis, avec le nom exact de la Distrobox :

```bash
distrobox enter NOM_DISTROBOX
git --version
opencode --version
mkdir -p ~/workspace/repositories
cd ~/workspace
opencode
```

Si `opencode` n'est pas présent dans la Distrobox, vérifier où il est installé avant toute nouvelle installation. Ne jamais installer de paquets en contournant Nexus, les images autorisées ou les règles du client.

## Premier prompt à saisir dans OpenCode

> Analyse mon installation OpenCode et son environnement Fedora / Distrobox / Podman. J'utilise un LLM interne sans Internet, deux modèles sélectionnables dans /models (« Intelligence » et « Super Intelligence »), GitLab interne pour une dizaine de dépôts et les tickets. Vérifie ta version, les configurations réellement chargées, les permissions, les modèles, l'éventuelle intégration GitLab/MCP et les moyens de mesurer les tokens. N'accède pas au réseau public. N'installe rien, ne modifie aucun fichier, n'affiche aucun secret. Produis un diagnostic synthétique et les trois améliorations prioritaires, puis attends ma validation.

## Workflow quotidien

1. Ouvrir un terminal **dans la Distrobox choisie**.
2. Aller dans le **dépôt concerné**, vérifier `git status`, puis lancer `opencode`.
3. Analyser le ticket : besoin, périmètre, fichiers, risques et tests (**mode plan, lecture seule**).
4. Valider le plan ; autoriser ensuite les modifications minimales.
5. Lancer les tests locaux appropriés ; lire `git diff`.
6. Faire une revue indépendante, idéalement avec l'autre modèle si cela apporte de la valeur.
7. **Créer le commit, le push et la Merge Request uniquement après validation explicite et selon les règles client.**

Ticket multi-dépôts : une session par dépôt ; transmettre un contrat d'interface et un résumé technique court plutôt que toute la conversation. Ne pas amalgamer les historiques Git.

## Garde-fous

- Aucune sortie vers Internet ; réseau et accès internes uniquement si autorisés.
- Aucun secret, jeton ou contenu sensible dans des prompts, journaux ou rapports partagés.
- Pas d'installation ou de nouvelle dépendance non approuvée.
- Ne pas autoriser automatiquement les commandes destructrices, commits, pushes et accès hors dépôt.
- Ne pas introduire de modifications techniques sur les dépôts pendant leur inventaire.
- Adapter la configuration à **la version effectivement installée** : ne pas copier de schéma JSON trouvé ailleurs sans vérification.
- Vérifier la conformité aux règles de confidentialité et de sécurité du client.

## Critères de réussite

- [ ] OpenCode démarre depuis l'environnement Distrobox retenu.
- [ ] Les deux modèles internes sont identifiés techniquement.
- [ ] Les dépôts sont séparés et leur origine GitLab est vérifiée.
- [ ] Le diagnostic de configuration est relu.
- [ ] Les permissions sensibles sont maîtrisées.
- [ ] Un premier dépôt possède ses règles techniques.
- [ ] Un ticket simple a été réalisé et revu.
- [ ] Les mesures de consommation et de latence sont documentées.
