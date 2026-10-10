# Droits utilisateurs Linux

## Afficher l'utilisateur courant

```bash
whoami
```

## Afficher les informations de l'utilisateur

```bash
id
```

## Afficher les groupes de l'utilisateur

```bash
groups
```

## Afficher les droits d'un fichier

```bash
ls -l fichier.txt
```

Exemple de résultat :

```text
-rwxr-xr-- 1 user developers 1024 oct 10 14:00 fichier.txt
```

- `-` : fichier classique
- `r` : lecture (read)
- `w` : écriture (write)
- `x` : exécution (execute)
- `user` : propriétaire
- `developers` : groupe propriétaire

## Comprendre les permissions

```text
-rwxr-xr--
 │  │  │
 │  │  └── Autres : r--
 │  └───── Groupe : r-x
 └──────── Propriétaire : rwx
```

| Droit | Valeur | Signification |
|---|---|---|
| `r` | 4 | Lecture |
| `w` | 2 | Écriture |
| `x` | 1 | Exécution |

## Modifier les droits d'un fichier

```bash
chmod 755 script.sh
```

## Donner les droits de lecture et écriture au propriétaire

```bash
chmod 600 fichier.txt
```

## Donner les droits de lecture à tous

```bash
chmod 644 fichier.txt
```

## Rendre un script exécutable

```bash
chmod +x script.sh
```

## Retirer le droit d'exécution

```bash
chmod -x script.sh
```

## Ajouter le droit d'écriture au groupe

```bash
chmod g+w fichier.txt
```

## Retirer tous les droits aux autres utilisateurs

```bash
chmod o-rwx fichier.txt
```

## Modifier les droits d'un répertoire et de son contenu

```bash
chmod -R 755 dossier/
```

## Modifier le propriétaire d'un fichier

```bash
sudo chown user fichier.txt
```

## Modifier le propriétaire et le groupe

```bash
sudo chown user:developers fichier.txt
```

## Modifier le propriétaire d'un répertoire récursivement

```bash
sudo chown -R user:developers dossier/
```

## Modifier uniquement le groupe

```bash
sudo chgrp developers fichier.txt
```

## Créer un utilisateur

```bash
sudo useradd -m developpeur
```

## Définir le mot de passe d'un utilisateur

```bash
sudo passwd developpeur
```

## Créer un groupe

```bash
sudo groupadd developers
```

## Ajouter un utilisateur à un groupe

```bash
sudo usermod -aG developers developpeur
```

## Afficher les groupes d'un utilisateur

```bash
groups developpeur
```

## Changer d'utilisateur

```bash
su - developpeur
```

## Exécuter une commande avec les droits administrateur

```bash
sudo whoami
```

## Afficher les autorisations sudo

```bash
sudo -l
```

## Afficher les permissions par défaut

```bash
umask
```

## Définir les permissions par défaut

```bash
umask 022
```

## Supprimer un utilisateur et son répertoire personnel

```bash
sudo userdel -r developpeur
```

## Supprimer un groupe

```bash
sudo groupdel developers
```

## Valeurs essentielles à retenir

| Valeur | Permissions | Utilisation courante |
|---|---|---|
| `600` | `rw-------` | Fichier privé |
| `644` | `rw-r--r--` | Fichier classique |
| `700` | `rwx------` | Répertoire privé |
| `755` | `rwxr-xr-x` | Répertoire ou script exécutable |
| `777` | `rwxrwxrwx` | Tous les droits à tous, à éviter |

**Attention :** sur un répertoire, `x` permet de le traverser, `r` de lister son contenu et `w` de modifier ses entrées sous certaines conditions. `chmod -R` doit être utilisé avec précaution.
