# Gestion des packages : apt, dnf, rpm

## Debian : actualiser l'index

```bash
sudo apt update
```

## Debian : installer

```bash
sudo apt install curl
```

## Debian : mettre à niveau

```bash
sudo apt upgrade
```

## Debian : rechercher

```bash
apt search openjdk
```

## Debian : information

```bash
apt show curl
```

## Debian : retirer

```bash
sudo apt remove curl
```

## Debian : lister les packages

```bash
dpkg -l
```

## Debian : contenu d'un package

```bash
dpkg -L curl
```

## Fedora : rechercher

```bash
dnf search java
```

## Fedora : installer

```bash
sudo dnf install curl
```

## Fedora : mise à jour

```bash
sudo dnf upgrade
```

## Fedora : désinstaller

```bash
sudo dnf remove curl
```

## RPM : vérifier l'installation

```bash
rpm -q bash
```

## RPM : lister les fichiers

```bash
rpm -ql bash
```

## Identifier sa distribution

```bash
cat /etc/os-release
```
