# Éditeurs de texte Linux : vi, vim, nano

## 1. Nano

Éditeur simple, les commandes s'utilisent directement avec `Ctrl`.

### Ouvrir un fichier

```bash
nano fichier.txt
```

### Créer un nouveau fichier

```bash
nano nouveau.txt
```

### Enregistrer un fichier

```text
Ctrl + O
Entrée
```

### Quitter Nano

```text
Ctrl + X
```

### Rechercher du texte

```text
Ctrl + W
```

### Couper une ligne

```text
Ctrl + K
```

### Coller une ligne

```text
Ctrl + U
```

### Afficher l'aide

```text
Ctrl + G
```

## 2. Vi

Éditeur présent sur de nombreux systèmes Unix et Linux.

### Ouvrir un fichier

```bash
vi fichier.txt
```

### Passer en mode insertion

```text
i
```

### Revenir en mode commande

```text
Esc
```

### Enregistrer

```text
:w
```

### Quitter

```text
:q
```

### Enregistrer et quitter

```text
:wq
```

### Quitter sans enregistrer

```text
:q!
```

### Supprimer une ligne

```text
dd
```

### Copier une ligne

```text
yy
```

### Coller une ligne

```text
p
```

### Annuler une modification

```text
u
```

### Rechercher du texte

```text
/texte
```

### Rechercher l'occurrence suivante

```text
n
```

### Aller au début du fichier

```text
gg
```

### Aller à la fin du fichier

```text
G
```

## 3. Vim

Version améliorée de Vi, avec des fonctionnalités supplémentaires.

### Ouvrir un fichier

```bash
vim fichier.txt
```

### Passer en mode insertion

```text
i
```

### Revenir en mode normal

```text
Esc
```

### Enregistrer et quitter

```text
:wq
```

### Quitter sans enregistrer

```text
:q!
```

### Afficher les numéros de ligne

```text
:set number
```

### Masquer les numéros de ligne

```text
:set nonumber
```

### Activer la coloration syntaxique

```text
:syntax on
```

### Aller à une ligne précise

```text
:25
```

### Remplacer du texte dans tout le fichier

```text
:%s/ancien/nouveau/g
```

### Remplacer du texte avec confirmation

```text
:%s/ancien/nouveau/gc
```

### Annuler une modification

```text
u
```

### Rétablir une modification

```text
Ctrl + R
```

### Ouvrir un fichier en lecture seule

```bash
vim -R fichier.txt
```

## 4. Modifier un fichier système

### Avec Nano

```bash
sudo nano /etc/hosts
```

### Avec Vi

```bash
sudo vi /etc/hosts
```

### Avec Vim

```bash
sudo vim /etc/hosts
```

## 5. Vérifier les éditeurs installés

### Nano

```bash
nano --version
```

### Vim

```bash
vim --version
```

### Vi

```bash
command -v vi
```

## 6. Installer les éditeurs

### Debian / Ubuntu

```bash
sudo apt update
sudo apt install nano vim
```

### Fedora

```bash
sudo dnf install nano vim-enhanced
```

## 7. Comparaison

| Éditeur | Utilisation | Difficulté |
|---|---|---|
| `nano` | Modifications rapides | Facile |
| `vi` | Administration de serveurs | Moyenne |
| `vim` | Édition avancée | Moyenne à élevée |

## 8. Commandes à retenir

| Action | Nano | Vi / Vim |
|---|---|---|
| Ouvrir | `nano fichier.txt` | `vi fichier.txt` |
| Écrire | Directement | `i` |
| Enregistrer | `Ctrl + O` | `:w` |
| Quitter | `Ctrl + X` | `:q` |
| Enregistrer et quitter | `Ctrl + O`, puis `Ctrl + X` | `:wq` |
| Quitter sans enregistrer | Répondre Non à la sauvegarde | `:q!` |
| Rechercher | `Ctrl + W` | `/texte` |

**À retenir :** dans Vi/Vim, les commandes commençant par `:` s'exécutent depuis le mode normal. Appuyer sur `Esc` avant de les saisir.
