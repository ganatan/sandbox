# Gestion des utilisateurs et groupes

## Utilisateur actuel

```bash
whoami
```

## Identité et groupes

```bash
id
```

## Groupes de l'utilisateur

```bash
groups
```

## Afficher un compte

```bash
getent passwd developpeur
```

## Afficher un groupe

```bash
getent group developers
```

## Créer un groupe

```bash
sudo groupadd developers
```

## Créer un utilisateur avec home

```bash
sudo useradd -m -s /bin/bash developpeur
```

## Définir son mot de passe

```bash
sudo passwd developpeur
```

## Ajouter au groupe

```bash
sudo usermod -aG developers developpeur
```

## Voir les appartenances

```bash
id developpeur
```

## Changer d'utilisateur

```bash
su - developpeur
```

## Désactiver temporairement un compte

```bash
sudo usermod -L developpeur
```

## Réactiver un compte

```bash
sudo usermod -U developpeur
```

## Supprimer un utilisateur et son home

```bash
sudo userdel -r developpeur
```

## Supprimer le groupe inutilisé

```bash
sudo groupdel developers
```
