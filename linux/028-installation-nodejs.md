# Installation et configuration Node.js

## Distribution

```bash
cat /etc/os-release
```

## Version Node

```bash
node --version
```

## Version npm

```bash
npm --version
```

## Emplacement

```bash
command -v node
```

## Installer Debian Ubuntu

```bash
sudo apt update
sudo apt install nodejs npm
```

## Installer Fedora

```bash
sudo dnf install nodejs npm
```

## Vérifier nvm optionnel

```bash
command -v nvm
```

## Versions nvm

```bash
nvm ls
```

## Installer LTS via nvm installé

```bash
nvm install --lts
```

## Activer LTS

```bash
nvm use --lts
```

## Initialiser un projet

```bash
npm init -y
```

## Installer avec lockfile

```bash
npm ci
```

## Démarrer projet

```bash
npm run dev
```

## Exécuter JavaScript

```bash
node server.js
```

## Trouver processus Node

```bash
pgrep -af node
```
