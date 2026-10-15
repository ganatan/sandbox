# 007 - GNOME

## Objectif

Comprendre et utiliser GNOME sous Fedora et Red Hat.

Maîtriser les éléments essentiels :

- Le bureau graphique
- Le menu Activités
- Le lancement des applications
- Le terminal
- Le gestionnaire de fichiers
- Les raccourcis clavier
- Les paramètres système

## 1. Présentation

GNOME est un environnement de bureau graphique pour les systèmes Linux.

Il fournit une interface permettant d'utiliser Linux avec des fenêtres, des menus et des applications.

Architecture :

```text
Fedora / Red Hat
    |
    +-- GNOME
    |     |
    |     +-- Bureau
    |     +-- Activités
    |     +-- Applications
    |     +-- Terminal
    |     +-- Fichiers
    |     +-- Paramètres
    |
    +-- Podman
          |
          +-- CentOS
```

Fedora et Red Hat sont des distributions Linux. GNOME fournit l'environnement graphique. Podman permet d'exécuter des conteneurs.

## 2. Vérifier GNOME

Ouvrir un terminal.

Afficher l'environnement de bureau :

```bash
echo $XDG_CURRENT_DESKTOP
```

Résultat possible :

```text
GNOME
```

Afficher la session graphique :

```bash
echo $XDG_SESSION_TYPE
```

Résultat possible :

```text
wayland
```

Ou :

```text
x11
```

Afficher la version de GNOME Shell :

```bash
gnome-shell --version
```

La disponibilité de cette commande dépend de l'installation GNOME.

## 3. Le bureau GNOME

| Élément | Fonction |
|---|---|
| Activités | Accès aux fenêtres et applications |
| Barre supérieure | État du système et menu rapide |
| Dash | Applications favorites et ouvertes |
| Applications | Liste des applications installées |
| Espaces de travail | Bureaux virtuels |
| Paramètres | Configuration du système |

La disposition peut varier selon la version et les extensions installées.

## 4. Menu Activités

Le menu Activités permet de rechercher une application, visualiser les fenêtres ouvertes, changer d'espace de travail et accéder aux favoris.

Pour ouvrir Activités :

```text
Touche Super
```

La touche Super correspond généralement à la touche Windows sur un clavier PC.

On peut également cliquer sur Activités dans la barre supérieure, selon la version de GNOME.

## 5. Lancer une application

Ouvrir Activités avec Super, saisir le nom d'une application, puis appuyer sur Entrée.

Exemple :

```text
Terminal
```

| Application | Utilisation |
|---|---|
| Terminal | Commandes Linux |
| Fichiers | Gestion des répertoires |
| Paramètres | Configuration système |
| Firefox | Navigateur |
| IntelliJ IDEA | Développement Java, si installé |

## 6. Terminal GNOME

Selon la version de Fedora, le terminal peut être GNOME Terminal, Ptyxis ou un autre émulateur.

Connaître le shell :

```bash
echo $SHELL
```

Résultat possible :

```text
/bin/bash
```

Commandes essentielles :

```bash
pwd
ls -la
cd ~
env
```

GNOME fournit l'interface graphique ; Bash interprète les commandes du terminal.

## 7. Gestionnaire de fichiers

L'application Fichiers (Nautilus) permet de parcourir, copier, déplacer et renommer les fichiers et les répertoires.

Lancer Fichiers :

```bash
nautilus
```

Ouvrir son répertoire personnel :

```bash
nautilus ~
```

Créer une workarea si nécessaire :

```bash
mkdir -p ~/workarea
```

L'ouvrir :

```bash
nautilus ~/workarea
```

## 8. Raccourcis clavier essentiels

| Raccourci | Fonction |
|---|---|
| Super | Ouvrir Activités |
| Super + A | Afficher les applications |
| Super + L | Verrouiller la session |
| Super + D | Afficher le bureau, selon configuration |
| Alt + Tab | Changer de fenêtre |
| Alt + F4 | Fermer une fenêtre |
| Super + Flèche gauche | Positionner une fenêtre à gauche |
| Super + Flèche droite | Positionner une fenêtre à droite |
| Ctrl + Alt + T | Ouvrir un terminal, si configuré |
| Ctrl + L | Saisir un emplacement dans Fichiers |

Certains raccourcis dépendent de la version et des paramètres GNOME.

Consulter Paramètres → Clavier → Raccourcis clavier.

## 9. Paramètres GNOME

Ouvrir les paramètres :

```bash
gnome-control-center
```

Ils permettent notamment de configurer les écrans, le clavier, la souris, le réseau, le Bluetooth, le son, les utilisateurs, l'apparence et les raccourcis.

Les options varient selon la distribution et les droits utilisateur.

## 10. Commandes GNOME essentielles

| Commande | Description |
|---|---|
| gnome-shell --version | Version GNOME Shell |
| gnome-control-center | Ouvrir les paramètres |
| nautilus | Ouvrir le gestionnaire de fichiers |
| echo $XDG_CURRENT_DESKTOP | Environnement de bureau |
| echo $XDG_SESSION_TYPE | Type de session graphique |
| echo $SHELL | Shell utilisé |
| gsettings list-schemas | Lister les schémas configurables |
| gsettings get | Lire une configuration |
| gsettings set | Modifier une configuration |

## 11. Configuration avec gsettings

GNOME utilise notamment GSettings pour stocker certains paramètres.

```bash
gsettings list-schemas
gsettings get org.gnome.desktop.interface icon-theme
gsettings get org.gnome.desktop.interface gtk-theme
gsettings get org.gnome.desktop.interface clock-format
```

Passer au format 24 heures :

```bash
gsettings set org.gnome.desktop.interface clock-format '24h'
```

Vérifier :

```bash
gsettings get org.gnome.desktop.interface clock-format
```

Les clés disponibles varient selon la version de GNOME.

## 12. GNOME et Bash

GNOME est un environnement graphique ; Bash est un interpréteur de commandes.

Le fichier `~/.bashrc` configure les sessions Bash interactives.

```bash
vi ~/.bashrc
```

Ajouter :

```bash
alias hello='echo Bonjour Fedora'
export APPLICATION_NAME=java-starter
```

Recharger :

```bash
source ~/.bashrc
```

Tester :

```bash
hello
echo $APPLICATION_NAME
```

GNOME n'exécute pas directement `.bashrc`. Bash le charge dans les sessions interactives non-login.

## 13. GNOME, Podman et CentOS

```text
Fedora
  |
  +-- GNOME
  |     |
  |     +-- Terminal
  |     +-- Fichiers
  |     +-- IntelliJ
  |
  +-- Podman
        |
        +-- CentOS
              |
              +-- Bash
              +-- Java
```

Depuis un terminal GNOME, redémarrer un conteneur CentOS préalablement créé avec Bash comme processus principal :

```bash
podman start -ai centos-java
```

Quitter :

```bash
exit
```

On revient au terminal Fedora. GNOME reste actif.

## 14. Workarea et GNOME

Une workarea est un espace de travail qui peut contenir des sources, des bibliothèques et des scripts.

```text
/home/user/workarea/
    |
    +-- sources/
    +-- libs/
    +-- build/
    +-- scripts/
```

Ouvrir graphiquement :

```bash
nautilus ~/workarea
```

Accéder depuis Bash :

```bash
cd ~/workarea
```

Si cette workarea est montée dans un conteneur via Podman, elle peut également être accessible depuis CentOS.

## 15. GNOME et les autres environnements graphiques

| Environnement | Description |
|---|---|
| GNOME | Interface graphique moderne et épurée |
| KDE Plasma | Interface personnalisable |
| XFCE | Interface légère |
| Cinnamon | Interface de bureau traditionnelle |
| MATE | Interface classique |

Fedora Workstation utilise GNOME par défaut. D'autres éditions de Fedora proposent d'autres environnements graphiques.

## 16. Bonnes pratiques

- Maîtriser le menu Activités.
- Connaître les raccourcis clavier essentiels.
- Utiliser le terminal pour les commandes techniques.
- Utiliser Fichiers pour explorer les répertoires.
- Identifier son environnement de bureau.
- Distinguer GNOME, Bash, Fedora et Podman.
- Éviter les modifications système inutiles.
- Respecter les politiques de configuration de l'entreprise.

## Documentation

- https://www.gnome.org/
- https://help.gnome.org/
- https://docs.fedoraproject.org/
