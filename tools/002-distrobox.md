# 002 - Distrobox

## Définition

**Distrobox** permet de créer et d'utiliser des environnements Linux dans des conteneurs, tout en les intégrant au système hôte.

Il s'appuie sur **Podman** ou **Docker** : ce n'est ni une machine virtuelle ni une distribution Linux.

Exemple : travailler sur Fedora et lancer un environnement Ubuntu pour installer des outils de développement sans les installer directement sur Fedora.

## Fonctionnement

```text
Fedora (hôte)
    |
    +-- Podman
          |
          +-- Distrobox Ubuntu
                |
                +-- bash, git, java, outils de développement
```

Le conteneur partage notamment le noyau Linux et, par défaut, le répertoire personnel de l'utilisateur avec l'hôte.

**Attention : Distrobox n'est pas une frontière de sécurité forte.** Les fichiers du HOME de l'hôte sont accessibles depuis le conteneur par défaut.

## Installation sur Fedora

```bash
sudo dnf install podman distrobox
```

Vérifier :

```bash
podman --version
distrobox --version
```

## Créer un conteneur Ubuntu

```bash
distrobox create --name ubuntu-dev --image ubuntu:24.04
```

L'image est téléchargée si nécessaire.

## Entrer dans le conteneur

```bash
distrobox enter ubuntu-dev
```

Une fois dans Ubuntu :

```bash
cat /etc/os-release
sudo apt update
sudo apt install git
git --version
```

Les paquets installés avec `apt` sont installés dans le conteneur, pas directement dans Fedora.

## Quitter le conteneur

```bash
exit
```

Retour au terminal du système hôte.

## Commandes essentielles

| Commande | Fonction |
|---|---|
| `distrobox create --name ubuntu-dev --image ubuntu:24.04` | Créer un conteneur |
| `distrobox enter ubuntu-dev` | Entrer dans le conteneur |
| `distrobox list` | Lister les conteneurs |
| `distrobox enter ubuntu-dev -- git --version` | Exécuter une commande dans le conteneur |
| `distrobox stop ubuntu-dev` | Arrêter le conteneur |
| `distrobox rm ubuntu-dev` | Supprimer le conteneur |
| `distrobox upgrade ubuntu-dev` | Mettre à jour les paquets du conteneur |

Pour supprimer un conteneur en cours d'utilisation, il faut d'abord l'arrêter.

## Distrobox, Docker et VM

| Outil | Usage |
|---|---|
| Distrobox | Environnement de développement Linux intégré au poste |
| Docker / Podman | Exécution et gestion de conteneurs |
| Machine virtuelle | Système isolé utilisant un noyau propre |

Distrobox utilise un moteur de conteneurs, mais vise principalement le confort d'utilisation interactif sur le poste de développement.

## À retenir

- Distrobox permet de travailler avec plusieurs distributions Linux sur un même poste.
- Les environnements sont créés à partir d'images de conteneurs.
- Le noyau est partagé avec l'hôte.
- Le HOME de l'utilisateur est partagé par défaut.
- Les outils installés dans un conteneur ne sont pas installés dans la distribution hôte.
- Utile pour essayer des outils et conserver des environnements de développement séparés.

Documentation officielle : https://distrobox.it/
