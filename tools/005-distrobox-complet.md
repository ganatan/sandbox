# 005 - Distrobox complet

## Objectif

Maîtriser Distrobox sur un poste Fedora : installation, création de plusieurs distributions, gestion des paquets, développement Java, partage des fichiers, exports et maintenance.

## Architecture

Distrobox crée des environnements Linux interactifs à partir d'images OCI, en utilisant Podman ou Docker.

```text
Fedora (hôte)
  |
  +-- Podman (rootless)
       |
       +-- ubuntu-dev (Ubuntu 24.04)
       |     +-- Git
       |     +-- JDK
       |
       +-- debian-dev (Debian 12)
             +-- Outils de compilation
```

Les conteneurs partagent le noyau de l'hôte. Le répertoire HOME est partagé par défaut : Distrobox ne constitue pas une isolation de sécurité forte.

## 1. Installation Fedora

```bash
sudo dnf install podman distrobox
podman --version
distrobox --version
podman info
```

Utiliser de préférence Podman en mode rootless.

## 2. Créer Ubuntu

```bash
distrobox create --name ubuntu-dev --image ubuntu:24.04
distrobox list
distrobox enter ubuntu-dev
```

Le premier lancement initialise le conteneur. Vérifier la distribution :

```bash
cat /etc/os-release
whoami
pwd
```

Quitter le conteneur :

```bash
exit
```

## 3. Installer des outils

Dans Ubuntu :

```bash
sudo apt update
sudo apt install -y git curl wget vim build-essential
git --version
```

Ces paquets sont installés dans Ubuntu, pas dans Fedora.

## 4. Créer plusieurs distributions

Depuis Fedora :

```bash
distrobox create --name debian-dev --image debian:12
distrobox enter debian-dev
```

Dans Debian :

```bash
cat /etc/os-release
sudo apt update
```

Pour créer un conteneur Fedora supplémentaire :

```bash
distrobox create --name fedora-dev --image fedora:42
distrobox enter fedora-dev
```

Adapter les versions aux distributions encore maintenues.

## 5. Commandes essentielles

| Commande | Description |
|---|---|
| `distrobox list` | Liste des conteneurs |
| `distrobox create --name ubuntu-dev --image ubuntu:24.04` | Création |
| `distrobox enter ubuntu-dev` | Terminal interactif |
| `distrobox enter ubuntu-dev -- git --version` | Commande ponctuelle |
| `distrobox stop ubuntu-dev` | Arrêt |
| `distrobox upgrade ubuntu-dev` | Mise à jour |
| `distrobox upgrade --all` | Mise à jour de tous les conteneurs |
| `distrobox rm ubuntu-dev` | Suppression |

Avant suppression :

```bash
distrobox stop ubuntu-dev
distrobox rm ubuntu-dev
```

Les données stockées uniquement dans le système de fichiers du conteneur seront perdues. Les fichiers du HOME partagé restent sur l'hôte.

## 6. Partage des fichiers

Depuis Fedora :

```bash
mkdir -p ~/projects/java-demo
```

Depuis Ubuntu :

```bash
cd ~/projects/java-demo
pwd
```

Les fichiers sont les mêmes : une modification dans le conteneur est visible sur l'hôte.

Pour monter un répertoire supplémentaire à la création :

```bash
distrobox create --name ubuntu-work --image ubuntu:24.04 --volume /opt/projects:/workspace
```

Vérifier les droits d'accès et SELinux avant de monter des répertoires sensibles.

## 7. Exemple Java

Dans Ubuntu :

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
java -version
javac -version
```

Créer un projet :

```bash
mkdir -p ~/projects/java-demo
cd ~/projects/java-demo
```

Créer `Main.java` :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour Distrobox");
    }
}
```

Compiler et exécuter :

```bash
javac Main.java
java Main
```

Pour Java 8, utiliser une distribution JDK 8 compatible : le paquet `openjdk-8-jdk` n'est pas disponible dans toutes les versions d'Ubuntu.

## 8. Exécuter sans entrer dans le conteneur

Depuis Fedora :

```bash
distrobox enter ubuntu-dev -- java -version
distrobox enter ubuntu-dev -- git --version
```

Cela permet d'appeler les outils du conteneur depuis des scripts locaux.

## 9. Exporter des applications et binaires

Depuis le conteneur, après installation de l'application :

```bash
distrobox-export --app vim
```

L'export d'application nécessite un lanceur desktop compatible.

Exporter un exécutable :

```bash
distrobox-export --bin /usr/bin/vim --export-path ~/.local/bin
```

Vérifier que `~/.local/bin` appartient au PATH de l'hôte. Les fonctionnalités d'export peuvent varier selon la version de Distrobox et le paquet installé.

## 10. Mettre à jour

Depuis Fedora :

```bash
distrobox upgrade ubuntu-dev
distrobox upgrade --all
sudo dnf upgrade --refresh
```

La mise à jour des paquets dans un conteneur ne change pas automatiquement sa version majeure de distribution.

## 11. Diagnostic Podman

```bash
podman ps -a
podman images
podman inspect ubuntu-dev
podman logs ubuntu-dev
podman system df
```

Éviter les commandes de nettoyage globales sans vérifier les ressources concernées.

## 12. Dépannage

### Le conteneur ne démarre pas

```bash
podman info
podman ps -a
distrobox list
```

### Une commande est introuvable

```bash
cat /etc/os-release
command -v java
echo "$PATH"
```

### Les fichiers ne sont pas accessibles

```bash
id
ls -ld ~/projects
```

Contrôler les permissions sur l'hôte et les éventuelles restrictions SELinux.

## 13. Distrobox, Podman et VM

| Critère | Distrobox | Podman | Machine virtuelle |
|---|---|---|---|
| Usage | Environnement de développement | Gestion de conteneurs | Système complet |
| Noyau | Partagé | Partagé | Noyau invité |
| HOME partagé | Par défaut | À configurer | À configurer |
| Isolation forte | Non | Dépend de la configuration | Généralement supérieure |

Distrobox et Podman sont complémentaires : Distrobox simplifie l'expérience de développement interactive, Podman gère les conteneurs.

## 14. Bonnes pratiques

- Utiliser Podman rootless.
- Prévoir un conteneur par environnement de développement.
- Conserver les sources dans des répertoires identifiés et sauvegardés.
- Utiliser des images de distributions maintenues.
- Documenter les paquets installés.
- Ne pas considérer le HOME partagé comme isolé.
- Sauvegarder les données propres au conteneur avant sa suppression.

## Documentation

- https://distrobox.it/
- https://github.com/89luca89/distrobox
