# Commandes essentielles Git

## Configuration

```bash
git config --list
git config --global user.name "ganatan"
git config --global user.email "user@gmail.com"
git config user.name
git config user.email
```

## Initialisation

```bash
git init
git clone https://github.com/ganatan/sandbox.git
```

## État du dépôt

```bash
git status
git log --oneline
git diff
```

## Branches

```bash
git branch
git branch -a
git branch develop
git checkout develop
git checkout -b feature/media
git switch develop
git switch -c feature/media
git branch -d feature/media
```

## Modifications et commits

```bash
git add README.md
git add .
git commit -m "Ajout documentation Git"
```

## Dépôt distant

```bash
git remote -v
git fetch origin
git pull origin main
git push origin main
git push -u origin feature/media
```

## Annulation

```bash
git restore README.md
git restore --staged README.md
git revert HEAD
```

## Stash

```bash
git stash
git stash list
git stash pop
```

## Fusion

```bash
git merge develop
git rebase main
```

## Workflow quotidien

```bash
git status
git pull
git checkout -b feature/media
git add .
git commit -m "Ajout fonctionnalité media"
git push -u origin feature/media
```
