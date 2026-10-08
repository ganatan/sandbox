# Conflits locaux lors d'un git pull

## Problème

La commande :

```bash
git pull github master
```

peut être interrompue si des modifications locales risquent d'être écrasées par les fichiers distants.

Deux cas fréquents :

- Fichiers suivis par Git : `Your local changes ... would be overwritten by merge`.
- Fichiers non suivis : `The following untracked working tree files would be overwritten by merge`.

Git interrompt l'opération pour protéger les fichiers locaux.

## Vérifier la situation

```bash
git status
```

## Conserver les changements locaux

```bash
git stash push -u -m "sauvegarde locale"
git pull github master
```

L'option `-u` inclut les fichiers non suivis. Les fichiers ignorés ne sont pas inclus.

Pour examiner la sauvegarde :

```bash
git stash list
git stash show --stat 'stash@{0}'
```

Pour réappliquer les modifications lorsque c'est pertinent :

```bash
git stash apply 'stash@{0}'
```

Des conflits peuvent apparaître lors de la réapplication.

## Abandonner les modifications locales

**Attention : ces commandes détruisent des modifications locales.**

Prévisualiser les fichiers non suivis qui seraient supprimés :

```bash
git clean -nd
```

Si toutes les modifications locales peuvent être abandonnées :

```bash
git reset --hard HEAD
git clean -fd
git pull github master
```

- `git reset --hard HEAD` : annule les modifications suivies et indexées.
- `git clean -fd` : supprime les fichiers et dossiers non suivis, sauf ceux ignorés par Git.
- `git pull github master` : récupère et intègre la branche distante.

Utiliser ces commandes uniquement après avoir vérifié qu'aucun travail local utile ne sera perdu.
