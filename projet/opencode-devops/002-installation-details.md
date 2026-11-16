# 002 — Installation détaillée OpenCode DevOps

Guide pas à pas associé à [001-demarrage.md](./001-demarrage.md). Le fichier de configuration du poste client est **`~/.config/opencode/opencode.json`** ; son diagnostic et les règles de modification sont expliqués dans [003-configuration.md](./003-configuration.md).

**Contexte :** Fedora hôte, Podman, Distrobox, GitLab interne (environ dix dépôts Angular, React, Rust, Quarkus, Helm, Ansible, ArgoCD), OpenCode et deux modèles internes **Intelligence** et **Super Intelligence**, sans Internet public.

## 1. Vérifier Fedora

Dans le terminal hôte :

```bash
cat /etc/fedora-release
cat /etc/os-release
uname -m
```

Noter la version et l'architecture. La distribution de Distrobox peut être différente de Fedora.

## 2. Vérifier Podman et Distrobox

```bash
podman --version
podman info
distrobox --version
distrobox list
```

Podman gère les conteneurs ; Distrobox fournit des environnements de développement basés sur ces conteneurs. Repérer le nom de la Distrobox utilisée. Ne recréer aucun conteneur sans autorisation.

## 3. Entrer dans Distrobox

```bash
distrobox enter NOM_DISTROBOX
pwd
echo "$HOME"
cat /etc/os-release
command -v git
command -v node
command -v opencode
```

Utiliser le vrai nom affiché par `distrobox list`. Si OpenCode est absent du PATH dans la Distrobox, vérifier son emplacement sur l'hôte avant d'envisager une installation. Le HOME est généralement partagé avec Fedora, mais vérifier les montages personnalisés. Garder un environnement de travail cohérent.

## 4. Vérifier OpenCode et les modèles

```bash
opencode --version
opencode
```

Dans OpenCode : `/models`, puis vérifier les choix **Intelligence** et **Super Intelligence**.

**Prompt :**

> Identifie ta version, la configuration active et les identifiants techniques de mes deux modèles internes Intelligence et Super Intelligence. Décris uniquement leurs capacités vérifiables localement. Ne révèle aucun secret, ne contacte pas Internet et ne modifie rien.

Le nom « Super Intelligence » ne garantit ni meilleure performance, ni fenêtre de contexte supérieure : mesurer avec des tâches comparables.

## 5. Organiser les dépôts GitLab

```bash
mkdir -p ~/workspace/repositories
cd ~/workspace/repositories
ls -la
```

Exemple d'organisation, avec noms fictifs :

```text
~/workspace/
├── repositories/
│   ├── angular-01/
│   ├── angular-02/
│   ├── react-01/
│   ├── quarkus-01/
│   ├── quarkus-02/
│   ├── rust-01/
│   ├── rust-02/
│   ├── helm/
│   ├── ansible/
│   └── argocd/
└── tools/
```

Pour chaque dépôt autorisé :

```bash
git clone URL_GITLAB_INTERNE nom-du-depot
cd nom-du-depot
git status
git remote -v
git branch --show-current
```

Ne pas confondre GitLab interne et GitHub personnel. Chaque dépôt conserve son propre `.git` et ses branches. Ne pas mettre à jour tous les dépôts aveuglément.

## 6. Diagnostiquer OpenCode

La configuration globale réelle est `~/.config/opencode/opencode.json`. Ne pas la remplacer : examiner d'abord son contenu, masquer les secrets et vérifier les valeurs effectives. Voir [003-configuration.md](./003-configuration.md).


```bash
cd ~/workspace
opencode
```

**Prompt :**

> Analyse ton installation locale dans mon environnement Fedora/Podman/Distrobox. Nous avons GitLab interne, dix dépôts et deux LLM internes, sans Internet public. Vérifie les configurations réellement chargées, agents, commandes, permissions, modèles, compression de contexte, limites de sortie et statistiques de tokens. Ne parcours pas tous les dépôts ; ne change rien ; donne les trois améliorations prioritaires et les incertitudes.

Valider la syntaxe des réglages sur la version effectivement installée, avant toute édition.

## 7. Configurer AGENTS.md global

Le chemin personnel souvent utilisé est `~/.config/opencode/AGENTS.md` ; demander à OpenCode de confirmer la compatibilité locale.

**Prompt :**

> Propose un AGENTS.md global : répondre en français ; ne jamais contacter Internet public ; ne travailler qu'avec les ressources internes autorisées ; ne pas révéler de secret ; identifier le dépôt et le ticket ; lire les fichiers ciblés ; proposer un plan avant toute modification ; respecter les conventions ; tester ; ne jamais commit, push ni supprimer sans accord. Affiche le contenu et le chemin avant création.

Exemple :

```md
# Règles globales

- Répondre en français.
- Aucun accès Internet public.
- Ne jamais exposer de secrets.
- Identifier le dépôt, la branche et le ticket.
- Réduire la lecture aux fichiers utiles.
- Proposer un plan avant modification.
- Respecter les conventions existantes.
- Tester les changements.
- Ne jamais commit, push ou supprimer sans validation.
```

AGENTS.md n'est pas un contrôle de sécurité technique : permissions, ACL GitLab et filtrage réseau restent indispensables.

## 8. Configurer agents et modèles

| Agent | Mission | Modèle initial à tester | Droits |
|---|---|---|---|
| Plan | Analyse et conception | Super Intelligence | Lecture seule |
| Explore | Recherche ciblée | Intelligence | Lecture seule |
| Build | Codage et tests | Intelligence | Écriture contrôlée |
| Review | Analyse du diff | Super Intelligence | Lecture seule |

Conserver les agents intégrés s'ils suffisent. Ne pas multiplier des sous-agents sans mesurer leur coût.

**Prompt :**

> Vérifie les agents disponibles et les identifiants exacts des modèles. Propose Plan, Explore, Build et Review avec un minimum de configuration. Décris les permissions nécessaires et les règles de confirmation. Ne modifie rien sans mon approbation.

Les permissions d'édition, de commande, d'accès hors dépôt, de Git push et des outils Web doivent être contrôlées techniquement selon la version OpenCode installée.

## 9. Créer des commandes réutilisables

Les commandes personnalisées permettent d'abréger les prompts. Leur format et leur chemin (souvent `~/.config/opencode/commands/`) doivent être vérifiés localement.

**Prompt :**

> Propose et crée après validation trois commandes compatibles avec ma version :
>
> - /ticket NUMERO : lit le ticket GitLab si un outil autorisé existe, sinon réclame sa description. Produit un plan, les dépôts concernés, les risques et les tests. Lecture seule.
> - /implementer NUMERO : exige mon plan validé, travaille sur le dépôt et la branche courants, limite le diff, lance les tests. Aucun commit ou push.
> - /review : lit le diff en lecture seule, signale bugs, régressions, sécurité, tests manquants et fichiers concernés.
>
> Affiche les fichiers et les permissions avant de les créer.

Tester les commandes d'abord sur un petit ticket.

## 10. Étudier MCP GitLab

MCP (Model Context Protocol) peut fournir des outils de lecture des tickets GitLab, des commentaires ou des Merge Requests. Il faut un serveur GitLab MCP **interne autorisé**, pas seulement un dépôt cloné.

**Prompt :**

> Vérifie sans installation si un MCP GitLab interne approuvé est accessible et quels outils il expose. Propose un usage initial en lecture seule. N'essaie aucune adresse non autorisée, ne crée aucun token et ne révèle aucun secret.

Vérifier avec l'équipe :
- serveur existant et autorisé ;
- accès depuis la Distrobox ;
- permissions de lecture et écriture ;
- stockage des identifiants ;
- journalisation et restrictions réseau.

Sans MCP, coller la description du ticket dans OpenCode. Git local reste indépendant de MCP.

## 11. Analyser chaque dépôt

```bash
cd ~/workspace/repositories/nom-du-depot
git status
opencode
```

**Prompt :**

> Analyse uniquement le dépôt courant : technologie, versions, modules, conventions, scripts, dépendances et tests. Propose un AGENTS.md spécifique. Ne modifie rien avant validation et n'installe aucun paquet.

| Projet | Fichiers | Validation possible |
|---|---|---|
| Angular / React | `package.json`, lockfile | scripts lint/test/build prévus |
| Rust | `Cargo.toml`, `Cargo.lock` | `cargo fmt --check`, `cargo test --offline` |
| Quarkus | `pom.xml` | Maven offline si caches complets |
| Helm | `Chart.yaml` | `helm lint` |
| Ansible | playbooks et inventaires | vérification syntaxique |
| ArgoCD | manifests `Application` | validation locale adaptée |

Tenir compte de la disponibilité des binaires, des caches et de Nexus interne. Un échec faute de dépendance n'est pas nécessairement une erreur du code.

## 12. Traiter un ticket réel

Depuis le dépôt concerné :

```bash
git status
git branch --show-current
opencode
```

**Séquence :**
1. Récupérer le ticket et les critères d'acceptation.
2. Plan : identifier exigences, impact, risques et tests en lecture seule.
3. Valider la solution, les dépôts concernés et la branche.
4. Build : modifications minimales, sans dépendances ajoutées sans accord.
5. Exécuter les tests locaux appropriés.
6. Examiner `git diff` et `git status`.
7. Review indépendante en lecture seule.
8. Après approbation, commit, push et Merge Request selon les règles client.

**Prompt Plan :**

> Analyse le ticket GitLab #NUMERO dans ce dépôt. Si le ticket est inaccessible, demande sa description. Identifie le besoin, les fichiers utiles, les risques, les tests et les éventuels autres dépôts impactés. Ne modifie rien.

**Prompt Build :**

> Implémente uniquement le plan approuvé pour #NUMERO. Préserve les conventions et contrats existants. Teste ce qui est possible hors Internet public et présente les modifications. Aucun commit ni push.

**Prompt Review :**

> En lecture seule, compare le diff au ticket #NUMERO. Signale régressions, sécurité, écarts de périmètre et tests manquants, en indiquant la priorité et les fichiers concernés.

Pour les tickets impliquant plusieurs dépôts, ouvrir des sessions séparées et transmettre un bref contrat API et les décisions validées. Ne pas mélanger les historiques Git.

## 13. Mesurer et optimiser les tokens

**But :** choisir le bon modèle d'après des mesures, plutôt que son nom.

**Prompt :**

> Détermine les commandes et statistiques disponibles localement dans ma version OpenCode pour mesurer tokens d'entrée et de sortie, contexte, latence et éventuellement coût. N'invente pas de fonction non disponible. Propose un protocole comparatif pour Intelligence et Super Intelligence.

Tester avec des tâches identiques et représentatives : explication d'un module, correction simple, revue d'un diff, analyse multi-dépôts.

| Mesure | Pourquoi |
|---|---|
| Tokens entrée | Mesurer le contexte transmis |
| Tokens sortie | Mesurer le volume généré |
| Durée | Évaluer la réactivité |
| Qualité de la réponse | Vérifier exactitude et pertinence |
| Tests réussis | Vérifier le résultat |
| Retouches humaines | Mesurer le travail restant |

Optimisations à tester : sessions par ticket ; consultation des fichiers ciblés ; résumés de passage entre dépôts ; sorties d'outils courtes ; compression de contexte ; modèle léger pour tâches simples **seulement si les mesures le confirment**.

## Contrôle final

- [ ] Fedora, Podman et Distrobox identifiés.
- [ ] OpenCode démarre dans l'environnement choisi.
- [ ] Intelligence et Super Intelligence identifiés.
- [ ] Dix dépôts organisés sans mélange des historiques.
- [ ] Configuration diagnostiquée avant modification.
- [ ] Règles globales et règles spécifiques validées.
- [ ] Agents et permissions testés.
- [ ] Commandes /ticket, /implementer, /review opérationnelles.
- [ ] GitLab MCP évalué sans risque.
- [ ] Un ticket simple traité avec tests et review.
- [ ] Comparaison des deux modèles documentée.

**Principe final : OpenCode assiste ; le développeur décide et valide.**
