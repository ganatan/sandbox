# 003 - OpenCode

## 1. Définition

**OpenCode** est un agent de développement open source piloté par intelligence artificielle. Il peut examiner les fichiers d'un projet, proposer des modifications, écrire du code et exécuter des commandes dans un terminal.

Il fonctionne notamment dans le terminal, dans une application de bureau ou depuis un IDE comme VS Code.

OpenCode n'est **pas un modèle d'IA** : c'est un outil qui connecte un modèle (OpenAI, Anthropic, modèles locaux, etc.) à un environnement de développement.

Site : https://opencode.ai/

Documentation : https://opencode.ai/docs/

## 2. Fonctionnement

```text
Développeur
     |
     v
OpenCode (agent)
     |
     +---- Modèle d'IA (analyse, génération)
     |
     +---- Fichiers du projet (lecture, écriture)
     |
     +---- Terminal (compilation, tests, Git)
     |
     +---- Outils / MCP (facultatif)
```

Le modèle propose des actions et OpenCode utilise ses outils pour les effectuer selon les permissions configurées.

L'agent n'est pas infaillible : relire les modifications et exécuter les tests reste indispensable.

## 3. Installation

### Prérequis

Disposer d'un terminal et d'un fournisseur de modèles accessible. Node.js est nécessaire pour l'installation via npm, mais pas pour toutes les méthodes d'installation.

### Windows, avec Node.js

```powershell
node --version
npm --version
npm install -g opencode-ai
opencode --version
```

### Fedora / Linux

Installation par npm :

```bash
npm install -g opencode-ai
opencode --version
```

Autre méthode proposée par OpenCode :

```bash
curl -fsSL https://opencode.ai/install | bash
```

Vérifier un script distant avant de l'exécuter. Une installation via le gestionnaire de paquets approprié peut également être utilisée.

Sur Windows, la documentation recommande WSL pour une compatibilité Linux optimale. L'installation npm native est aussi documentée.

**Attention aux versions :** la documentation distingue OpenCode 1 et OpenCode 2. Les deux emploient la commande `opencode` et ne doivent pas être installés au même emplacement de commande. Vérifier la version et la documentation correspondante.

## 4. Démarrage

Se placer dans le répertoire du projet :

```bash
cd media-protocol
opencode
```

OpenCode ouvre une interface de conversation dans le terminal.

Dans OpenCode :

```text
/init
```

Cette commande examine le projet et peut créer `AGENTS.md`, document destiné à guider le travail de l'agent.

Vérifier le contenu du fichier avant de le commiter.

## 5. Connexion à un modèle d'IA

Dans l'interface OpenCode :

```text
/connect
```

Sélectionner un fournisseur et suivre la procédure d'authentification proposée.

Puis sélectionner un modèle :

```text
/models
```

Autres commandes CLI :

```bash
opencode auth login
opencode models
```

### Avec un compte ChatGPT

La documentation OpenCode propose, selon la version, une authentification **OpenAI → ChatGPT Plus/Pro** dans `/connect`. Le navigateur est alors ouvert pour s'authentifier.

Cette intégration n'est pas la même chose que la facturation de l'API OpenAI. Les modèles accessibles, limites et conditions dépendent du fournisseur et de son intégration.

### Avec une clé API

Sélectionner une authentification par clé API pour le fournisseur concerné.

L'usage d'une API peut être facturé indépendamment d'un abonnement ChatGPT. Ne jamais inscrire de clé secrète en clair dans un fichier versionné sur Git.

### Avec un modèle local

OpenCode peut également communiquer avec des fournisseurs de modèles locaux, par exemple via une configuration compatible Ollama. La disponibilité des outils d'agent dépend des capacités du modèle retenu.

## 6. Utilisation dans VS Code

1. Ouvrir un projet dans VS Code.
2. Ouvrir son terminal intégré.
3. Exécuter `opencode`.
4. Installer l'extension OpenCode si nécessaire.

Selon la documentation officielle, lancer OpenCode depuis le terminal intégré peut installer automatiquement l'extension. Elle est également disponible depuis le magasin d'extensions.

Raccourcis documentés :

| Action | Windows / Linux |
|---|---|
| Ouvrir ou retrouver OpenCode | Ctrl + Esc |
| Nouvelle session OpenCode | Ctrl + Shift + Esc |
| Insérer une référence de fichier | Alt + Ctrl + K |

Ces raccourcis peuvent dépendre de la configuration de VS Code.

## 7. Premiers exercices

### Comprendre le projet sans modifier les fichiers

Demande :

```text
Analyse ce projet Java 8. Donne l'arborescence, les classes,
les dépendances, les points d'entrée et les commandes de compilation.
Ne modifie aucun fichier.
```

### Comprendre une méthode

```text
Explique la méthode decode de MediaDecoder.
Décris les octets lus, les contrôles effectués et les exceptions possibles.
Ne modifie pas le code.
```

### Générer un test

```text
Ajoute un test Java 8 sans JUnit pour vérifier qu'un message
binaire de 15 octets est rejeté. Ne modifie pas le protocole.
```

### Corriger une erreur

```text
Analyse cette erreur de compilation Java 8.
Explique d'abord la cause, puis propose la modification minimale.
```

### Refactoriser

```text
Refactorise cette classe sans changer le comportement public.
Conserve Java 8 et n'ajoute aucune dépendance.
Présente d'abord les modifications prévues.
```

## 8. Modes de travail et agents

Les agents peuvent avoir des responsabilités distinctes, par exemple :

- **Plan** : analyser et proposer une stratégie sans réaliser directement les modifications.
- **Build** : effectuer les changements, créer des fichiers et utiliser les outils autorisés.

Les noms, capacités exactes et raccourcis dépendent de la version d'OpenCode.

Méthode recommandée pour un changement important :

1. Demander l'analyse et le plan.
2. Vérifier le plan.
3. Autoriser l'implémentation.
4. Lire le diff Git.
5. Exécuter compilation et tests.
6. Commiter après validation.

## 9. Configuration opencode.json

OpenCode accepte une configuration globale et une configuration propre au projet.

Emplacements usuels :

```text
~/.config/opencode/opencode.json
projet/opencode.json
```

Exemple de configuration projet, avec permissions prudentes :

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "read": "allow",
    "edit": "ask",
    "bash": "ask",
    "external_directory": "deny"
  }
}
```

Ici, la lecture est autorisée ; la modification de fichiers et les commandes système nécessitent une approbation. L'accès à des répertoires extérieurs est interdit.

La configuration peut aussi définir un modèle par défaut, mais mieux vaut sélectionner d'abord un modèle réellement accessible via `/models`, plutôt que deviner son identifiant.

## 10. Permissions et sécurité

OpenCode peut lire du code, modifier des fichiers et exécuter des commandes. Les permissions sont donc essentielles.

| Valeur | Effet |
|---|---|
| `allow` | Exécuter sans demander |
| `ask` | Demander une validation |
| `deny` | Interdire |

Exemple de contrôle plus précis sur Git :

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "bash": {
      "*": "ask",
      "git status*": "allow",
      "git diff*": "allow",
      "git push*": "deny"
    }
  }
}
```

Ne pas activer le mode d'approbation automatique sur un dépôt sensible sans comprendre ses conséquences.

Sur un projet professionnel, respecter la politique de l'entreprise avant d'envoyer du code, des journaux ou des documents vers un modèle distant.

## 11. AGENTS.md

Le fichier `AGENTS.md` fournit à OpenCode des instructions propres au projet.

Exemple pour notre projet Media Protocol :

```markdown
# Instructions du projet

- Utiliser Java 8.
- Ne pas ajouter Maven ni Gradle.
- Ne pas ajouter de dépendances externes.
- Respecter Media Protocol V1.
- Utiliser UDP pour les communications.
- Conserver l'encodage Big Endian.
- Ne pas modifier la structure de message de 16 octets.
- Ne pas écrire de commentaires dans le code.
- Vérifier la compilation avant de terminer.
```

Ce document sert à orienter le comportement de l'agent. Il ne remplace ni les contraintes vérifiées par des tests, ni les permissions d'accès.

## 12. OpenCode et Git

Avant une modification :

```bash
git status
```

Après le travail de l'agent :

```bash
git diff
git status
```

Après revue et validation :

```bash
git add .
git commit -m "test: ajouter validation Media Protocol"
```

Éviter de laisser l'agent commiter et pousser automatiquement sans contrôle au début.

## 13. Commandes essentielles

| Commande | Utilisation |
|---|---|
| `opencode --version` | Afficher la version |
| `opencode` | Démarrer l'interface interactive |
| `opencode --help` | Afficher l'aide |
| `opencode auth login` | Configurer l'authentification |
| `opencode models` | Lister les modèles |
| `opencode run "Explique ce projet"` | Exécuter une demande en mode non interactif |
| `/connect` | Configurer un fournisseur dans l'interface |
| `/models` | Sélectionner un modèle dans l'interface |
| `/init` | Initialiser les instructions projet |

La commande `opencode run` est utile dans des scripts, mais il faut contrôler les permissions et les coûts des appels aux modèles.

## 14. Dépannage

### Commande introuvable

Vérifier :

```bash
opencode --version
npm prefix -g
```

Contrôler que le répertoire contenant l'exécutable npm global est dans le PATH.

### Aucun modèle disponible

Vérifier la connexion au fournisseur via `/connect`, puis la liste `/models`.

### Échec d'authentification

Relancer `opencode auth login` ou la connexion interactive. Ne pas publier les fichiers d'identification.

### Modification refusée

Vérifier la configuration des permissions et les règles de l'entreprise.

### Problème avec VS Code

Relancer `opencode` dans le terminal intégré et vérifier l'installation de l'extension.

## 15. OpenCode, ChatGPT et Copilot

| Outil | Usage principal |
|---|---|
| ChatGPT | Discussion, réflexion, conception et assistance polyvalente |
| OpenCode | Agent capable de travailler directement sur un dépôt de code et d'exécuter des commandes |
| GitHub Copilot | Assistance de programmation intégrée aux outils de développement, avec fonctions d'agent selon les offres |

OpenCode peut utiliser différents fournisseurs de modèles. Le choix d'un fournisseur ne transforme pas OpenCode en ce fournisseur.

## 16. À retenir

OpenCode est particulièrement utile pour :

- Comprendre une base de code existante.
- Explorer un projet Java, Angular ou Node.js.
- Préparer un plan de modification.
- Générer du code et des tests.
- Lancer compilation et tests.
- Analyser les erreurs.
- Réviser un diff avant commit.

La bonne pratique est de commencer en **lecture/analyse**, puis d'autoriser les modifications progressivement.

## Références

- https://opencode.ai/
- https://docs.opencode.ai/docs/
- https://docs.opencode.ai/docs/ide/
- https://docs.opencode.ai/docs/config/
- https://docs.opencode.ai/docs/permissions/
- https://docs.opencode.ai/docs/providers/
