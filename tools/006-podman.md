# 006 - Podman

## Objectif

Utiliser Podman sous Fedora pour exécuter CentOS.

Comprendre les deux modes de fonctionnement :

- Mode interactif avec `run -it`
- Mode arrière-plan avec `run -dit`

Apprendre à créer, démarrer, arrêter et réutiliser un conteneur.

Configurer des alias dans `.bashrc`.

## 1. Présentation

Podman est un moteur de conteneurs open source.

Il permet d'exécuter des environnements Linux isolés,
sans installer une nouvelle distribution sur la machine.

Architecture :

```text
Fedora
  |
  +-- Podman
        |
        +-- CentOS
              |
              +-- Bash
              +-- Git
              +-- Java
              +-- Applications
```

Fedora est le système hôte.

Podman gère les conteneurs.

CentOS fournit son propre environnement utilisateur
mais partage le noyau Linux de Fedora.

## 2. Installation

Sous Fedora :

```bash
sudo dnf install -y podman
```

Vérifier :

```bash
podman --version
podman info
```

Podman fonctionne en mode rootless sans nécessiter
de privilèges administrateur pour les opérations courantes.

## 3. Télécharger CentOS

Télécharger CentOS Stream 9 :

```bash
podman pull quay.io/centos/centos:stream9
```

Lister les images :

```bash
podman images
```

Une image est un modèle permettant de créer des conteneurs.

Un conteneur est une instance de cette image.

## 4. Mode interactif : run -it

Le mode interactif permet d'entrer immédiatement
dans le terminal CentOS.

Créer et démarrer le conteneur :

```bash
podman run -it --name centos-java quay.io/centos/centos:stream9 bash
```

Explication :

| Élément | Description |
|---|---|
| podman | Moteur de conteneurs |
| run | Créer et démarrer un conteneur |
| -i | Garder l'entrée standard ouverte |
| -t | Allouer un terminal |
| --name | Définir le nom du conteneur |
| centos-java | Nom du conteneur |
| quay.io/centos/centos:stream9 | Image utilisée |
| bash | Processus principal exécuté |

Tu es directement dans CentOS.

Vérifier :

```bash
cat /etc/os-release
```

Afficher l'utilisateur :

```bash
whoami
```

Quitter :

```bash
exit
```

Bash étant le processus principal du conteneur,
sa fermeture provoque l'arrêt du conteneur.

Le conteneur n'est pas supprimé.

### Redémarrer le conteneur

Depuis Fedora :

```bash
podman start -ai centos-java
```

Explication :

| Option | Description |
|---|---|
| start | Démarrer un conteneur existant |
| -a | Attacher le terminal à sa sortie |
| -i | Attacher l'entrée standard |

Tu retrouves le terminal CentOS.

Le conteneur conserve les fichiers et les logiciels
installés précédemment.

### Arrêter le conteneur

Depuis CentOS :

```bash
exit
```

Depuis Fedora, si le conteneur est actif :

```bash
podman stop centos-java
```

### Avantages

- Simple à comprendre
- Accès direct au terminal
- Adapté aux tests et aux expérimentations
- Aucun processus de maintien artificiel nécessaire

## 5. Mode arrière-plan : run -dit

Le mode arrière-plan permet de laisser CentOS actif
sans maintenir un terminal ouvert.

Pour tester ce second mode avec le même nom,
supprimer d'abord le conteneur précédent.

Depuis Fedora :

```bash
podman rm centos-java
```

Cette commande nécessite que le conteneur soit arrêté.

Attention : la suppression efface les données
conservées uniquement dans son système de fichiers.

Créer le conteneur en arrière-plan :

```bash
podman run -dit --name centos-java quay.io/centos/centos:stream9 sleep infinity
```

Explication :

| Élément | Description |
|---|---|
| run | Créer et démarrer |
| -d | Exécuter en arrière-plan |
| -i | Garder l'entrée standard ouverte |
| -t | Allouer un terminal |
| --name | Nom du conteneur |
| sleep infinity | Maintenir le processus principal actif |

Le terminal reste sur Fedora.

Le conteneur CentOS fonctionne en arrière-plan.

### Entrer dans CentOS

```bash
podman exec -it centos-java bash
```

La commande `exec` lance un nouveau processus Bash
dans le conteneur actif.

Vérifier :

```bash
cat /etc/os-release
```

Quitter :

```bash
exit
```

Contrairement au mode interactif précédent,
le conteneur continue de fonctionner.

Son processus principal `sleep infinity` reste actif.

### Arrêter le conteneur

Depuis Fedora :

```bash
podman stop centos-java
```

### Redémarrer le conteneur

```bash
podman start centos-java
```

Entrer à nouveau :

```bash
podman exec -it centos-java bash
```

### Avantages

- Conteneur indépendant du terminal
- Plusieurs terminaux possibles
- Adapté aux environnements de développement
- Adapté aux services et aux processus persistants

## 6. Comparaison des deux modes

| Fonctionnement | run -it | run -dit |
|---|---|---|
| Crée le conteneur | Oui | Oui |
| Démarre le conteneur | Oui | Oui |
| Ouvre immédiatement Bash | Oui | Non |
| Fonctionne en arrière-plan | Non | Oui |
| exit arrête le conteneur | Oui | Non |
| Conserve les données après arrêt | Oui | Oui |
| Commande pour revenir | start -ai | exec -it après start |
| Usage | Terminal interactif | Environnement persistant |

Dans les deux modes, les modifications restent dans
le conteneur jusqu'à sa suppression.

## 7. Différence entre run, start et exec

### run

```bash
podman run -it --name centos-test quay.io/centos/centos:stream9 bash
```

Crée un nouveau conteneur et le démarre.

### start

```bash
podman start centos-test
```

Redémarre un conteneur existant.

### exec

```bash
podman exec -it centos-java bash
```

Lance un processus Bash dans un conteneur déjà actif.

`exec` ne démarre pas un conteneur arrêté.

### stop

```bash
podman stop centos-java
```

Arrête le conteneur sans le supprimer.

### rm

```bash
podman rm centos-test
```

Supprime le conteneur arrêté.

Son nom peut ensuite être réutilisé.

## 8. Configurer les alias Bash

Le fichier `.bashrc` permet de définir des raccourcis
pour les commandes utilisées régulièrement.

Les alias dépendent du mode de fonctionnement choisi.

### Mode interactif

Pour un conteneur créé avec `run -it` et `bash` :

```bash
vi ~/.bashrc
```

Ajouter :

```bash
alias centos='podman start -ai centos-java'
alias centos-status='podman ps -a --filter name=centos-java'
```

Recharger :

```bash
source ~/.bashrc
```

Démarrer CentOS :

```bash
centos
```

Quitter et arrêter CentOS :

```bash
exit
```

### Mode arrière-plan

Pour un conteneur créé avec `run -dit`
et `sleep infinity` :

```bash
vi ~/.bashrc
```

Utiliser à la place :

```bash
alias centos='podman start centos-java >/dev/null && podman exec -it centos-java bash'
alias centos-stop='podman stop centos-java'
alias centos-status='podman ps -a --filter name=centos-java'
```

Recharger :

```bash
source ~/.bashrc
```

Entrer dans CentOS :

```bash
centos
```

Quitter le terminal CentOS :

```bash
exit
```

Le conteneur reste actif.

Pour l'arrêter :

```bash
centos-stop
```

Ne pas définir les deux alias `centos` simultanément.

Choisir celui qui correspond au mode de création du conteneur.

## 9. Partager des fichiers avec Fedora

Par défaut, le répertoire personnel Fedora
n'est pas automatiquement partagé avec CentOS.

Créer un répertoire sur Fedora :

```bash
mkdir -p ~/projets-java
```

Créer un conteneur interactif avec ce répertoire :

```bash
podman run -it \
  --name centos-work \
  -v ~/projets-java:/workspace:Z \
  quay.io/centos/centos:stream9 \
  bash
```

Explication :

| Élément | Description |
|---|---|
| ~/projets-java | Répertoire sur Fedora |
| /workspace | Répertoire dans CentOS |
| -v | Monter un répertoire |
| :Z | Appliquer un label SELinux privé |

Dans CentOS :

```bash
cd /workspace
touch test.txt
ls -l
```

Quitter :

```bash
exit
```

Sur Fedora :

```bash
ls ~/projets-java
```

Le fichier `test.txt` est visible.

Les modifications sont partagées entre Fedora et CentOS.

Le montage doit être défini lors de la création du conteneur.

## 10. Exemple Java

Dans CentOS, vérifier les outils Java :

```bash
java -version
javac -version
```

Si Java n'est pas disponible, installer un JDK
compatible avec l'environnement CentOS choisi.

Pour Java 8, vérifier la disponibilité d'une distribution
JDK 8 compatible avec CentOS Stream 9.

Créer un fichier :

```bash
cd /workspace
vi Main.java
```

Contenu :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour CentOS");
    }
}
```

Compiler :

```bash
javac Main.java
```

Exécuter :

```bash
java Main
```

Créer le JAR :

```bash
jar cfe app.jar Main Main.class
```

Exécuter :

```bash
java -jar app.jar
```

Le fichier `app.jar` est également disponible
dans le répertoire partagé sur Fedora.

## 11. Persistance des données

| Action | Données internes |
|---|---|
| exit | Conservées |
| podman stop | Conservées |
| podman start | Conservées |
| podman restart | Conservées |
| podman rm | Supprimées |

Les fichiers situés dans un répertoire monté
depuis Fedora restent sur Fedora.

La suppression d'un conteneur n'efface pas
le répertoire hôte monté.

## 12. Commandes essentielles

| Commande | Description |
|---|---|
| podman --version | Version de Podman |
| podman pull | Télécharger une image |
| podman images | Lister les images |
| podman run | Créer et démarrer |
| podman ps | Conteneurs actifs |
| podman ps -a | Tous les conteneurs |
| podman start | Démarrer |
| podman stop | Arrêter |
| podman restart | Redémarrer |
| podman exec | Exécuter une commande |
| podman logs | Afficher les logs |
| podman inspect | Inspecter un conteneur |
| podman rm | Supprimer un conteneur |
| podman rmi | Supprimer une image |

## 13. Podman, Docker et Distrobox

| Critère | Podman | Docker | Distrobox |
|---|---|---|---|
| Type | Moteur | Moteur | Environnement |
| Démon permanent | Non requis | Généralement requis | Non requis |
| Rootless | Oui | Possible | Selon le moteur |
| Images OCI | Oui | Oui | Oui |
| Usage | Conteneurs | Conteneurs | Développement |

Distrobox s'appuie sur Podman ou Docker.

Il simplifie la création d'environnements Linux
interactifs intégrés au poste de travail.

## 14. Bonnes pratiques

- Utiliser Podman en mode rootless.
- Préférer des images maintenues.
- Utiliser `run -it` pour les expérimentations interactives.
- Utiliser `run -dit` pour un conteneur qui doit rester actif.
- Utiliser `start` pour réutiliser un conteneur.
- Ne pas recréer systématiquement le conteneur avec `run`.
- Conserver les projets dans un répertoire monté.
- Vérifier les droits et SELinux.
- Vérifier les dépendances natives et la version du JDK.

## Documentation

- https://podman.io/
- https://docs.podman.io/
- https://www.centos.org/
