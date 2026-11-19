# Fedora, Distrobox, Node.js et VS Code

## 1. Le contexte

Le poste professionnel utilise Fedora, administré par l'entreprise. Podman et Distrobox permettent de travailler dans un environnement de développement distinct du système hôte.

## 2. Rôle de chaque outil

- **Fedora** : système Linux du poste de travail.
- **Podman** : moteur de conteneurs.
- **Distrobox** : facilite la création et l'utilisation d'une distribution Linux dans un conteneur Podman.
- **Node.js** : exécute JavaScript et les outils de développement.
- **npm** : gère les dépendances Node.js.
- **Angular CLI** : outils de développement Angular.
- **VS Code** : éditeur et environnement de développement.
- **OpenCode** : assistant de développement, lorsqu'il est installé.

## 3. Pourquoi installer Node.js dans Distrobox ?

L'entreprise limite les modifications de Fedora. Installer Node.js dans Distrobox permet de conserver les paquets et dépendances de développement dans le conteneur. Les bibliothèques système du conteneur peuvent différer de celles de Fedora.

Distrobox n'est toutefois pas une machine virtuelle ni une frontière de sécurité forte : il partage le noyau Linux et intègre notamment le répertoire personnel de l'utilisateur.

## 4. NVM et Distrobox : deux fonctions différentes

NVM gère plusieurs versions de Node.js dans un même environnement. Distrobox fournit un environnement Linux conteneurisé.

Exemples NVM :

```bash
nvm install 22
nvm install 24
nvm use 22
node --version
```

NVM peut être installé à l'intérieur de Distrobox. Il n'est pas obligatoire si une seule version de Node.js suffit.

## 5. Pourquoi installer VS Code dans Distrobox ?

VS Code peut être exécuté depuis le conteneur, au même endroit que Node.js, npm et Angular CLI. Son terminal intégré retrouve alors normalement les outils et les bibliothèques du conteneur.

Une autre architecture possible consiste à installer VS Code sur Fedora et à configurer l'accès aux outils du conteneur. Le choix de l'entreprise simplifie potentiellement l'alignement des environnements.

## 6. Lancement par icône

Un raccourci créé dans la Distrobox peut être exporté vers le bureau Fedora. En cliquant sur l'icône, Fedora affiche la fenêtre graphique, tandis que l'application est exécutée dans le conteneur si le lanceur est correctement configuré.

Exemple de commande d'export, si l'application est enregistrée sous le nom `code` :

```bash
distrobox-export --app code
```

Le lanceur peut aussi être créé manuellement. Il faut examiner sa commande `Exec=` pour vérifier comment il lance VS Code.

## 7. Vérifier l'environnement depuis VS Code

Dans le terminal intégré :

```bash
cat /etc/os-release
printenv CONTAINER_ID
command -v node
command -v npm
command -v code
node --version
npm --version
```

`/etc/os-release` identifie la distribution, mais ne prouve pas à lui seul que le terminal se trouve dans un conteneur. `CONTAINER_ID` peut être absent selon la configuration. On peut également vérifier le processus depuis Fedora avec `podman ps` et l'état de Distrobox avec `distrobox list`.

## 8. Dépôts GitLab et répertoire partagé

Les projets peuvent rester dans :

```text
~/workspace/repositories
```

Distrobox partage généralement le répertoire personnel avec Fedora. Plusieurs Distrobox peuvent donc accéder aux mêmes dépôts. Attention aux conflits si plusieurs environnements modifient simultanément les mêmes fichiers ou dossiers `node_modules`.

## 9. Une ou plusieurs Distrobox ?

Une seule Distrobox peut suffire pour Angular, React, Node.js et OpenCode. Plusieurs conteneurs sont utiles si les projets nécessitent des bibliothèques système incompatibles, des distributions différentes ou des environnements séparés.

## 10. Résumé

**Fedora héberge le poste, Podman exécute les conteneurs, Distrobox rend leur usage pratique, Node.js et Angular fournissent les outils, VS Code les utilise.**

Le raccourci graphique permet d'ouvrir VS Code comme une application classique tout en conservant son exécution dans Distrobox, sous réserve de vérifier la configuration du lanceur.

## 11. Utiliser VS Code en ligne de commande

### Depuis Fedora : entrer dans le conteneur

```bash
distrobox list
distrobox enter nom-de-ta-distrobox
```

Remplacer `nom-de-ta-distrobox` par le nom réel affiché par `distrobox list`.

### Depuis la Distrobox : ouvrir VS Code

```bash
code
code .
code ~/workspace/repositories
code package.json
```

- `code` ouvre VS Code.
- `code .` ouvre le dossier courant.
- `code ~/workspace/repositories` ouvre le dossier partagé des dépôts GitLab.
- `code package.json` ouvre le fichier indiqué.

### Options pratiques

| Commande | Fonction |
| --- | --- |
| `code -n .` | Ouvrir une nouvelle fenêtre sur le dossier courant |
| `code -r .` | Réutiliser la dernière fenêtre active |
| `code --version` | Afficher la version |
| `code --list-extensions` | Lister les extensions installées |
| `command -v code` | Afficher le chemin de la commande |

### Lancer directement depuis Fedora

```bash
distrobox enter nom-de-ta-distrobox -- code ~/workspace/repositories
```

Cette commande exécute VS Code dans le conteneur sans ouvrir préalablement un shell interactif. Le chemin doit être accessible dans le conteneur.

### Terminal intégré VS Code

Ouvrir le terminal avec `Ctrl + \`` ou via le menu Terminal. Si VS Code est réellement lancé dans Distrobox et si le profil de terminal n'a pas été redirigé, les commandes Node.js et Angular utilisent l'environnement du conteneur.

```bash
cat /etc/os-release
command -v node
node --version
npm --version
ng version
```

### Vérifier le raccourci graphique

Le raccourci créé depuis Distrobox permet de lancer VS Code depuis le bureau Fedora. Son comportement exact dépend de la commande `Exec=` de son fichier `.desktop`. Il faut vérifier cette commande si VS Code démarre dans le mauvais environnement.

### À retenir

Pour travailler sur un dépôt, entrer dans la Distrobox, se placer dans le répertoire GitLab puis lancer `code .`. C'est la méthode la plus simple pour ouvrir directement le bon projet avec les outils du conteneur.

## 12. Cargo, Rust et rust-analyzer

### Installation Rust dans le répertoire personnel

Sur le poste Fedora, Cargo est présent dans `~/.cargo/bin/cargo`. Ce chemin correspond souvent à une installation utilisateur via rustup, sans modification des paquets système Fedora. Le répertoire personnel étant généralement partagé avec Distrobox, Cargo peut être accessible depuis les deux environnements.

Cela ne garantit pas à lui seul une compilation identique : les bibliothèques natives et les outils de compilation peuvent différer entre Fedora et le conteneur.

### Rôle des outils

| Outil | Fonction |
| --- | --- |
| Rust | Langage de programmation |
| rustc | Compilateur Rust |
| Cargo | Gestion des projets, dépendances, compilation et tests |
| rustup | Installation et sélection des chaînes d'outils Rust |
| rust-analyzer | Serveur de langage pour l'analyse du code Rust dans VS Code |
| VS Code | Éditeur de code |

Cargo joue un rôle proche de npm dans l'écosystème Node.js : `Cargo.toml` décrit le projet et ses dépendances ; `Cargo.lock` enregistre les versions résolues.

### Pourquoi l'extension rust-analyzer dans VS Code ?

Elle apporte l'autocomplétion, les diagnostics, la navigation vers les définitions, les informations de types et des actions de refactoring. Elle s'appuie sur la structure du projet Rust et peut utiliser Cargo pour ses analyses et vérifications.

Elle ne remplace ni Cargo ni le compilateur `rustc`. Elle peut également nécessiter l'accès à la chaîne Rust depuis l'environnement dans lequel tourne VS Code.

### Vérifier depuis Fedora puis Distrobox

```bash
command -v cargo
cargo --version
rustc --version
rustup show
```

Si les commandes fonctionnent dans les deux environnements, comparer leurs chemins et versions. Pour contrôler les conteneurs :

```bash
distrobox list
podman ps
```

### Commandes Cargo courantes

```bash
cargo --version
cargo metadata --format-version 1
cargo check
cargo build
cargo test
```

Ces commandes doivent être lancées depuis la racine du projet Rust, là où se trouve `Cargo.toml`, sauf pour `cargo --version`. `cargo metadata` expose les métadonnées du projet et les dépendances résolues, utiles pour l'inventaire open source ; `Cargo.lock` est également une source importante. L'inventaire doit distinguer dépendances déclarées, résolues et réellement embarquées.

### Synthèse de l'architecture

Fedora héberge Podman ; Distrobox exécute VS Code et Node.js ; `~/.cargo/bin` fournit potentiellement la même chaîne Rust à Fedora et à Distrobox ; rust-analyzer apporte les fonctions d'analyse Rust dans VS Code. Cette organisation est pratique, mais la reproductibilité des compilations dépend aussi des bibliothèques système et de la configuration des outils.
