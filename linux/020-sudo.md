# Sudo et privilèges

## Identité courante

```bash
id
```

## Exécuter comme administrateur

```bash
sudo whoami
```

## Vérifier les droits sudo

```bash
sudo -l
```

## Exécuter comme un autre utilisateur

```bash
sudo -u developpeur whoami
```

## Ouvrir un shell root si autorisé

```bash
sudo -i
```

## Éditer sudoers en sécurité

```bash
sudo visudo
```

## Vérifier sudoers

```bash
sudo visudo -c
```

## Consulter un groupe sudo

```bash
getent group sudo
```

## Consulter un groupe wheel

```bash
getent group wheel
```

## Lire des logs protégés

```bash
sudo journalctl -n 20
```

## Éditer un fichier système

```bash
sudoedit /etc/hosts
```

## Vérifier les permissions d'un fichier

```bash
stat -c '%A %U %G %n' /etc/sudoers
```
