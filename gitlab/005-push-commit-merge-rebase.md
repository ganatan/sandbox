# Git : commit, push, merge et rebase

## 1. Principe

Git est un système de gestion de versions distribué. Il conserve l'historique du code, permet de travailler sur plusieurs branches et d'intégrer les modifications de plusieurs développeurs.

GitLab héberge les dépôts Git et propose notamment les Merge Requests.

## 2. Les zones Git

```text
Working directory     Staging area       Dépôt local       Dépôt distant
Fichiers modifiés  ->  git add       ->   git commit   ->    git push
                                                              GitLab
```

| Zone | Description |
|---|---|
| Working directory | Fichiers de travail |
| Staging area | Modifications préparées pour le commit |
| Local repository | Historique Git local |
| Remote repository | Dépôt distant GitLab |

## 3. Git status

```bash
git status
```

Exemple :

```text
On branch main

Changes not staged for commit:
    modified: README.md

Untracked files:
    tutorial.md
```

`README.md` est modifié mais non indexé ; `tutorial.md` n'est pas encore suivi.

## 4. Git add

```bash
git add README.md
git add .
git add -A
git add -p
git diff --cached
```

- `git add README.md` : indexer un fichier.
- `git add .` : indexer les changements du répertoire courant.
- `git add -A` : indexer tous les changements du dépôt.
- `git add -p` : choisir les modifications par blocs.
- `git diff --cached` : voir les modifications indexées.

## 5. Git commit

```bash
git commit -m "Ajout du tutoriel Git"
git log --oneline
```

Exemple d'historique :

```text
a1b2c3d Ajout du tutoriel Git
e4f5a6b Modification du README
c7d8e9f Initial commit
```

Un commit possède un identifiant SHA, un auteur, une date, un message et un ou plusieurs parents.

Modifier le dernier commit :

```bash
git commit --amend
```

`--amend` recrée le dernier commit : éviter de réécrire des commits déjà partagés sans coordination.

## 6. Git push

`push` envoie les commits locaux au dépôt distant, pas les fichiers simplement modifiés.

```bash
git push
git push origin main
git push -u origin feature/media
```

`-u` configure le suivi distant de la branche.

## 7. Git fetch

`fetch` récupère les objets et références distants sans intégrer automatiquement les changements à la branche courante.

```bash
git fetch origin
git branch -r
git log --oneline HEAD..origin/main
```

La dernière commande affiche les commits accessibles depuis `origin/main` mais pas depuis `HEAD`.

## 8. Git pull

`pull` effectue une récupération distante suivie d'une intégration.

```bash
git pull --no-rebase origin main
git pull --rebase origin main
```

Configurer la stratégie par défaut :

```bash
git config --global pull.rebase false
```

Ou :

```bash
git config --global pull.rebase true
```

Choisir une stratégie cohérente avec les conventions de l'équipe.

## 9. Branches

```bash
git switch -c feature/media
git branch
git switch main
git branch -d feature/media
```

Une branche isole un développement. `-d` supprime une branche locale déjà fusionnée selon les contrôles de Git.

## 10. Git merge

`merge` intègre les modifications d'une branche dans la branche courante.

```bash
git switch main
git merge feature/media
```

Exemple d'un merge avec commit de fusion :

```text
A---B-----------M  main
     \         /
      C-------D    feature/media
```

Le commit `M` a deux parents. Il préserve la structure de l'historique.

Si un fast-forward est possible, Git peut simplement déplacer le pointeur de branche sans créer de commit de fusion.

```bash
git merge --no-ff feature/media
git merge --abort
```

`--no-ff` demande un commit de fusion ; `--abort` abandonne une fusion en cours.

## 11. Git rebase

`rebase` rejoue les commits d'une branche sur une nouvelle base.

```bash
git switch feature/media
git fetch origin
git rebase origin/main
```

Avant :

```text
A---B---C---D      main
     \
      E---F        feature/media
```

Après :

```text
A---B---C---D          main
             \
              E'---F'  feature/media
```

`E` et `F` sont recréés avec de nouveaux SHA. Ne pas rebaser une branche partagée sans coordination.

## 12. Conflits

Un conflit apparaît quand Git ne peut pas intégrer automatiquement des modifications.

```bash
git merge feature/media
```

Exemple de message :

```text
CONFLICT (content): Merge conflict in README.md
Automatic merge failed
```

Marqueurs dans le fichier :

```text
<<<<<<< HEAD
Version actuelle
=======
Version de la branche fusionnée
>>>>>>> feature/media
```

Résoudre manuellement le contenu et retirer les marqueurs, puis, pour un merge :

```bash
git add README.md
git commit
```

Pour un rebase :

```bash
git add README.md
git rebase --continue
```

Abandonner l'opération en cours :

```bash
git merge --abort
git rebase --abort
```

Utiliser uniquement la commande correspondant à l'opération en cours.

## 13. Merge ou rebase ?

| Critère | Merge | Rebase |
|---|---|---|
| Historique | Préserve la divergence | Peut rendre l'historique linéaire |
| Commits existants | Conservés | Recréés |
| SHA des commits rejoués | Inchangés | Modifiés |
| Branche partagée | Généralement adapté | Prudence nécessaire |
| Usage courant | Intégration de branches | Mise à jour d'une branche de travail |

## 14. Git reset et revert

Annuler le dernier commit en conservant ses modifications indexées :

```bash
git reset --soft HEAD~1
```

Conserver les modifications mais les désindexer :

```bash
git reset --mixed HEAD~1
```

Revenir à l'état du commit précédent, en supprimant les changements locaux correspondants :

```bash
git reset --hard HEAD~1
```

`--hard` peut provoquer une perte de modifications non sauvegardées.

Pour annuler un commit partagé, préférer généralement :

```bash
git revert <commit-sha>
```

`revert` crée un nouveau commit inverse sans réécrire l'historique existant.

## 15. Git cherry-pick

Appliquer sur la branche courante les modifications introduites par un commit :

```bash
git switch main
git cherry-pick a1b2c3d
```

Utile pour récupérer une correction précise sans fusionner toute une branche.

## 16. Git stash

Mettre temporairement de côté les modifications locales :

```bash
git stash push -m "Travail en cours"
git stash list
git stash pop
```

Inclure également les fichiers non suivis :

```bash
git stash push -u -m "Travail en cours"
```

## 17. Workflow complet GitLab

```bash
git switch main
git pull --ff-only origin main

git switch -c feature/media

git add .
git commit -m "Ajout de la fonctionnalité media"

git fetch origin
git rebase origin/main

git push -u origin feature/media
```

Sur GitLab :

1. Créer une Merge Request de `feature/media` vers `main`.
2. Faire relire le code.
3. Exécuter les tests et la pipeline CI/CD.
4. Fusionner selon la stratégie du projet.
5. Supprimer la branche si elle n'est plus nécessaire.

Après un rebase d'une branche déjà publiée, `git push --force-with-lease` peut être nécessaire. Ne l'utiliser qu'en connaissance de cause et si la réécriture de l'historique est autorisée.

## 18. Commandes essentielles

| Commande | Fonction |
|---|---|
| `git status` | État du dépôt |
| `git add .` | Préparer les modifications |
| `git commit -m "..."` | Créer un commit local |
| `git push` | Envoyer les commits |
| `git fetch` | Récupérer les références distantes |
| `git pull` | Récupérer et intégrer |
| `git switch -c branche` | Créer une branche |
| `git merge branche` | Fusionner une branche |
| `git rebase main` | Rejouer des commits sur `main` |
| `git rebase --abort` | Annuler un rebase |
| `git cherry-pick SHA` | Appliquer un commit |
| `git revert SHA` | Annuler par un nouveau commit |
| `git stash` | Mettre de côté le travail |
| `git log --oneline --graph --all` | Visualiser l'historique |
