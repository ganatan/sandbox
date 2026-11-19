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
