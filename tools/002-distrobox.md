# 002 - Distrobox

## Objectif

Créer des environnements de développement Linux basés sur différentes distributions, sans remplacer le système hôte.

Exemple : Fedora sur le poste, Ubuntu dans un conteneur, avec Java et Git installés uniquement dans Ubuntu.

## Définition

Distrobox est un outil libre qui facilite l'utilisation de conteneurs Linux interactifs à l'aide de Podman, Docker ou d'un moteur compatible.

Il ne s'agit ni d'une machine virtuelle ni d'une distribution. Les conteneurs partagent le noyau Linux de l'hôte et s'intègrent à son terminal, à son répertoire personnel et à certains services.

```text
Fedora (hôte)
  |
  +-- Podman
       |
       +-- ubuntu-dev (Ubuntu 24.04)
       |     +-- Git
       |     +-- Java
       |
       +-- debian-dev (Debian)
             +-- Outils de développement
```

Distrobox est destiné à des environnements de travail de confiance : ce n'est pas une frontière de sécurité forte. Par défaut, le HOME de l'hôte est partagé avec les conteneurs.

## Prérequis et installation sur Fedora

```bash
sudo dnf install podman distrobox
```

Vérifier les installations :

```bash
podman --version
distrobox --version
podman info
```

Podman peut fonctionner sans privilèges administrateur (mode rootless), ce qui est généralement recommandé.

## Créer un environnement Ubuntu

```bash
distrobox create --name ubuntu-dev --image ubuntu:24.04
```

L'image est téléchargée lors de la première création si elle n'est pas déjà disponible.

Lister les environnements :

```bash
distrobox list
```

Entrer dans Ubuntu :

```bash
distrobox enter ubuntu-dev
```

Vérifier la distribution :

```bash
cat /etc/os-release
whoami
pwd
```

Le premier démarrage peut prendre du temps : Distrobox initialise les outils nécessaires dans le conteneur.

## Installer des outils dans Ubuntu

Depuis le terminal du conteneur :

```bash
sudo apt update
sudo apt install -y git curl wget vim build-essential
git --version
```

Les paquets installés avec apt restent dans l'environnement Ubuntu. Ils ne sont pas ajoutés aux paquets Fedora de l'hôte.

Pour quitter Ubuntu :

```bash
exit
```

## Gestion des conteneurs

Depuis Fedora :

| Commande | Fonction |
|---|---|
| `distrobox list` | Lister les environnements |
| `distrobox create --name ubuntu-dev --image ubuntu:24.04` | Créer Ubuntu |
| `distrobox enter ubuntu-dev` | Entrer dans Ubuntu |
| `distrobox enter ubuntu-dev -- git --version` | Exécuter une commande |
| `distrobox stop ubuntu-dev` | Arrêter Ubuntu |
| `distrobox upgrade ubuntu-dev` | Mettre à jour ses paquets |
| `distrobox rm ubuntu-dev` | Supprimer Ubuntu |

Arrêter le conteneur avant sa suppression :

```bash
distrobox stop ubuntu-dev
distrobox rm ubuntu-dev
```

La suppression efface les modifications propres au système de fichiers du conteneur, mais pas les fichiers du HOME partagé de l'hôte.

## Plusieurs distributions

Créer Debian :

```bash
distrobox create --name debian-dev --image debian:12
distrobox enter debian-dev
```

Créer une autre Fedora :

```bash
distrobox create --name fedora-dev --image fedora:42
distrobox enter fedora-dev
```

Chaque conteneur possède ses propres paquets et bibliothèques système, tout en partageant le noyau de l'hôte.

Les versions d'images sont des exemples : choisir une version encore maintenue pour les nouveaux projets.

## Fichiers et répertoires partagés

Le répertoire HOME de l'utilisateur est partagé par défaut. Par exemple, depuis Fedora :

```bash
mkdir -p ~/projects/java-demo
```

Depuis Ubuntu :

```bash
cd ~/projects/java-demo
pwd
```

Les modifications apportées dans ce répertoire sont visibles depuis Fedora.

Attention : supprimer un fichier partagé dans le conteneur le supprime également sur l'hôte.

Pour monter un répertoire supplémentaire à la création :

```bash
distrobox create --name ubuntu-work --image ubuntu:24.04 --volume /opt/projects:/workspace
```

Le répertoire source doit être accessible à l'utilisateur et les autorisations doivent permettre son utilisation.

## Exemple de développement Java

Entrer dans Ubuntu :

```bash
distrobox enter ubuntu-dev
```

Installer un JDK disponible dans les dépôts de la distribution :

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
java -version
javac -version
```

Créer une application simple :

```bash
mkdir -p ~/projects/java-demo
cd ~/projects/java-demo
printf 'public class Main { public static void main(String[] args) { System.out.println("Bonjour Distrobox"); } }\n' > Main.java
javac Main.java
java Main
```

Pour un projet nécessitant précisément Java 8, installer un JDK 8 provenant d'une source compatible avec la distribution et l'architecture ; ne pas supposer que le paquet `openjdk-8-jdk` est disponible sur toutes les versions d'Ubuntu.

## Exécuter une commande sans ouvrir de shell

Depuis Fedora :

```bash
distrobox enter ubuntu-dev -- java -version
distrobox enter ubuntu-dev -- git --version
```

Pratique pour les scripts de compilation et les tests.

## Exporter une application vers l'hôte

Depuis Ubuntu, après installation de l'application concernée :

```bash
distrobox-export --app vim
```

Cela crée un lanceur sur l'hôte lorsque l'application possède un fichier desktop adapté.

Pour exporter un binaire disponible dans le conteneur :

```bash
distrobox-export --bin /usr/bin/vim --export-path ~/.local/bin
```

Vérifier que `~/.local/bin` figure dans le PATH de l'hôte. Les exports dépendent des applications, de leur installation et des options prises en charge par la version de Distrobox.

## Mises à jour

Mettre à jour un environnement :

```bash
distrobox upgrade ubuntu-dev
```

Mettre à jour tous les environnements pris en charge :

```bash
distrobox upgrade --all
```

Cela met à jour les paquets dans les conteneurs. Cela ne remplace pas automatiquement leur image de base par une nouvelle version majeure de la distribution.

Mettre à jour Fedora séparément :

```bash
sudo dnf upgrade --refresh
```

## Podman et diagnostic

Lister les conteneurs Podman :

```bash
podman ps -a
```

Lister les images :

```bash
podman images
```

Inspecter un conteneur :

```bash
podman inspect ubuntu-dev
```

Afficher les journaux disponibles :

```bash
podman logs ubuntu-dev
```

Vérifier l'espace utilisé :

```bash
podman system df
```

Ne pas exécuter aveuglément `podman system prune` : cette commande peut supprimer des ressources Podman inutilisées par d'autres projets.

## Problèmes fréquents

### Le conteneur ne démarre pas

```bash
podman info
podman ps -a
distrobox list
```

Vérifier que Podman fonctionne en mode rootless et que l'image choisie est compatible.

### Une commande est introuvable

Vérifier d'abord si l'on se trouve sur Fedora ou dans Ubuntu :

```bash
cat /etc/os-release
command -v java
echo "$PATH"
```

### Problème de permissions sur un dossier partagé

```bash
id
ls -ld ~/projects
```

Contrôler les droits sur l'hôte et les éventuelles restrictions SELinux avant de modifier les permissions.

### Le conteneur n'est plus utile

```bash
distrobox stop ubuntu-dev
distrobox rm ubuntu-dev
```

Sauvegarder les données stockées uniquement dans le conteneur avant de le supprimer.

## Distrobox, conteneur classique et machine virtuelle

| Critère | Distrobox | Docker / Podman | Machine virtuelle |
|---|---|---|---|
| Objectif principal | Environnement Linux de développement | Exécuter et gérer des conteneurs | Exécuter un système complet |
| Noyau | Partagé | Partagé | Noyau invité |
| Intégration au HOME | Par défaut | À configurer | À configurer |
| Isolation forte | Non | Dépend de la configuration, pas équivalente à une VM | Généralement plus forte |
| Usage typique | Terminal et outils de développement | Applications et services | Systèmes complets |

Distrobox s'appuie sur un moteur comme Podman : ces outils sont complémentaires, pas concurrents.

## Bonnes pratiques

- Privilégier Podman rootless sur Fedora.
- Utiliser un environnement distinct par besoin technique.
- Nommer explicitement les conteneurs, par exemple `ubuntu-java` ou `debian-build`.
- Choisir des images officielles et des versions maintenues.
- Garder les sources dans un répertoire de travail connu et sauvegardé.
- Éviter de placer des secrets sensibles dans le HOME partagé.
- Ne pas considérer Distrobox comme un bac à sable de sécurité.
- Documenter les paquets installés pour pouvoir recréer l'environnement.

## À retenir

Distrobox permet de développer avec plusieurs distributions Linux sur une seule machine. Il utilise Podman ou Docker, partage le noyau de l'hôte et facilite l'accès aux fichiers et outils du poste. Il convient particulièrement aux tests, aux compilations et aux environnements de développement reproductibles.

Documentation officielle : https://distrobox.it/

Code source : https://github.com/89luca89/distrobox
