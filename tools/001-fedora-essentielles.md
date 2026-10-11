# 001 - Fedora Essentielles

## Objectif

Retrouver les commandes essentielles de Fedora Linux.

## Informations système

```bash
cat /etc/fedora-release
uname -a
hostnamectl
```

## Mise à jour

```bash
sudo dnf upgrade --refresh
```

## Recherche et installation

```bash
dnf search git
sudo dnf install git
```

## Suppression

```bash
sudo dnf remove git
```

## Liste des paquets

```bash
dnf list --installed
```

## Services

```bash
systemctl status sshd
sudo systemctl enable --now sshd
sudo systemctl restart sshd
```

## Réseau

```bash
ip addr
ip route
ss -tuln
```

## Journaux

```bash
journalctl -xe
journalctl -u sshd
```

## Aide

```bash
dnf --help
man dnf
```

Les commandes utilisant `sudo` nécessitent les droits administrateur. Le service `sshd` doit être installé pour être géré par `systemctl`.
