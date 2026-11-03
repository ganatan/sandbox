# GitLab : tutoriel complet de collaboration, SSH et Merge Requests

## 1. Objectif

Deux comptes GitLab travaillent sur un même dépôt :

- `rosynady` : compte propriétaire du projet `rosynady/testrosy001`.
- `viger175` : développeur invité, qui clone le projet, modifie une branche et propose une Merge Request (MR).
- `main` : branche principale protégée.
- `feature/002` : branche de travail du développeur.

Le workflow attendu :

```text
rosynady/main
     |
     +--- viger175/feature/002
                 |
             modification
                 |
             add + commit
                 |
                push
                 |
          Merge Request vers main
                 |
             revue + conflits
                 |
              validation
                 |
           merge dans main
```

Une Merge Request est une proposition de fusion. Elle n'est pas la fusion elle-même.

## 2. Git, GitLab, GitHub : différences

| Élément | Rôle |
|---|---|
| Git | Gère les versions, branches et commits localement |
| GitLab | Héberge le dépôt, les droits d'accès, les MR et les pipelines |
| GitHub | Autre hébergeur Git : le terme utilisé est Pull Request |
| SSH | Authentifie le compte qui accède au serveur |
| Auteur Git | Identité inscrite dans un commit ; distincte du compte SSH |

Le nom local du remote (`origin`, `github` ou autre) est libre. Son URL détermine réellement le serveur.

## 3. Configuration SSH pour plusieurs comptes

Sous Windows, les fichiers sont généralement dans `C:\Users\<utilisateur>\.ssh\`.

Exemple de `~/.ssh/config` :

```sshconfig
Host gitlab-rosynady
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/rosynadygitlab
  IdentitiesOnly yes

Host gitlab-viger175
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/viger175gitlab
  IdentitiesOnly yes

Host github-rosynady
  HostName github.com
  User git
  IdentityFile ~/.ssh/rosynady
  IdentitiesOnly yes

Host github-viger175
  HostName github.com
  User git
  IdentityFile ~/.ssh/viger175
  IdentitiesOnly yes
```

Les clés privées restent sur le poste. Seules les clés publiques (`.pub`) sont enregistrées dans le compte GitLab correspondant : Preferences / Edit profile > SSH Keys selon l'interface.

Tester l'identité authentifiée :

```bash
ssh -T git@gitlab-rosynady
ssh -T git@gitlab-viger175
```

Il est possible que la commande retourne un code de sortie non nul même avec un message GitLab de bienvenue ; lire le message affiché.

### Pourquoi l'alias compte

```bash
git clone git@gitlab.com:rosynady/testrosy001.git
```

Cette URL n'utilise pas explicitement la règle `Host gitlab-viger175`. Une autre clé peut alors être présentée et provoquer `Permission denied (publickey)`.

Pour utiliser précisément le compte `viger175` :

```bash
git clone git@gitlab-viger175:rosynady/testrosy001.git
```

Si l'authentification échoue :

```bash
ssh -vT git@gitlab-viger175
```

Vérifier le chemin de la clé privée, la clé publique enregistrée dans GitLab, la correspondance du compte, et la configuration SSH.

## 4. Donner les droits à un autre compte

Avec `rosynady`, ouvrir le projet GitLab :

```text
https://gitlab.com/rosynady/testrosy001
```

Aller dans **Manage > Members > Invite members** (le libellé peut varier). Rechercher le compte GitLab exact de `viger175`, lui attribuer le rôle **Developer** et valider.

| Rôle | Usage courant |
|---|---|
| Guest | Accès limité |
| Reporter | Consultation et lecture du projet selon ses permissions |
| Developer | Clone, branches non protégées, push, Merge Requests |
| Maintainer | Gestion étendue du dépôt et de ses réglages |

Les autorisations effectives dépendent également des règles de protection de branche, des paramètres du groupe et des politiques du projet. Donner uniquement les droits nécessaires.

## 5. Cloner le dépôt dans Windows

Dans PowerShell :

```powershell
cd D:\demo\viger175
git clone git@gitlab-viger175:rosynady/testrosy001.git
cd testrosy001
git remote -v
git status
```

La commande `git remote -v` doit présenter l'alias GitLab attendu.

Configurer l'auteur local des commits :

```bash
git config user.name "viger175"
git config user.email "adresse-du-compte@example.com"
git config --local --list
```

L'adresse est à remplacer par l'adresse souhaitée, idéalement une adresse vérifiée sur GitLab. Cette configuration n'accorde aucun droit : seul le compte authentifié est autorisé à pousser.

## 6. Comprendre le fichier .git/config

Exemple :

```ini
[remote "origin"]
    url = git@gitlab-viger175:rosynady/testrosy001.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
    remote = origin
    merge = refs/heads/main
[user]
    name = viger175
    email = adresse-du-compte@example.com
```

- `remote "origin"` : nom local du dépôt distant.
- `url` : serveur, alias SSH, espace de noms et dépôt cible.
- `fetch` : correspondance entre branches distantes et références locales.
- `branch "main"` : branche distante suivie par `main`.
- `user` : auteur des futurs commits effectués dans ce dépôt.

Un dépôt peut employer un remote appelé `github` même si ce nom est trompeur ; les commandes devront utiliser ce nom ou le renommer :

```bash
git remote -v
git remote rename github origin
git remote set-url origin git@gitlab-viger175:rosynady/testrosy001.git
```

Ne pas modifier l'URL sans vérifier le véritable dépôt cible.

## 7. Créer une branche, modifier, commiter et pousser

Se placer d'abord sur une branche principale à jour, sans modifications locales non enregistrées :

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/002
```

Modifier `README.md` avec VS Code ou IntelliJ, puis :

```bash
git status
git diff
git add README.md
git diff --cached
git commit -m "Mise à jour du README"
git push -u origin feature/002
```

- `git add` indexe les modifications.
- `git commit` enregistre localement.
- `git push` publie les commits distants.
- `-u` configure la branche distante suivie.

Pour une branche déjà créée et un commit déjà présent sur `main` localement, vérifier la situation avant de déplacer des commits. Dans notre démonstration, la création de `feature/002` depuis le commit local permettait de publier le travail sans pousser sur `main`.

## 8. Pourquoi GitLab refuse un push sur main

Message observé :

```text
GitLab: You are not allowed to push code to protected branches on this project.
! [remote rejected] main -> main (pre-receive hook declined)
```

L'authentification SSH peut avoir parfaitement réussi. C'est la protection de `main` qui refuse le push.

La démarche prévue est de créer une branche :

```bash
git switch -c feature/002
git push -u origin feature/002
```

Ne pas retirer la protection de `main` simplement pour contourner ce refus.

## 9. Créer et valider une Merge Request

Avec `viger175` :

1. Ouvrir le projet dans GitLab.
2. Aller dans **Merge requests > New merge request**.
3. Choisir `feature/002` comme branche source.
4. Choisir `main` comme branche cible.
5. Renseigner le titre et la description, puis créer la MR.

La MR compare les différences, permet les discussions, les vérifications automatiques et les validations. Avec `rosynady`, examiner les **Changes** et les **Commits**, puis fusionner lorsque les contrôles et les permissions le permettent.

La mention **Approval is optional** signifie qu'une approbation n'est pas obligatoire dans la configuration actuelle ; elle n'élimine pas les éventuels blocages de fusion.

## 10. Pourquoi une MR peut être bloquée

Messages observés :

```text
Merge blocked: 1 check failed
Merge conflicts must be resolved.
The source branch is 2 commits behind the target branch.
```

- **Behind** : `main` contient des commits absents de `feature/002`.
- **Conflit** : Git ne sait pas fusionner automatiquement des modifications concurrentes.
- Être en retard de deux commits n'implique pas, à lui seul, un conflit ; c'est un indicateur distinct.

Les modifications locales non encore fusionnées ne sont pas nécessairement visibles dans l'éditeur : il faut d'abord effectuer une tentative d'intégration.

## 11. Résoudre localement par merge : méthode conseillée

Avant de commencer, sauvegarder ou commiter les modifications personnelles en cours :

```bash
git status
git switch feature/002
git fetch origin
git merge origin/main
```

Si Git trouve un conflit :

```text
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

Voir les fichiers encore non résolus :

```bash
git status
git diff --name-only --diff-filter=U
git ls-files -u
```

Voir le contenu et le diff :

```bash
git diff -- README.md
git diff --diff-filter=U
```

Sous PowerShell :

```powershell
Get-Content README.md
```

Comparer directement les versions indexées :

```bash
git show :1:README.md
git show :2:README.md
git show :3:README.md
```

- `:1:` : ancêtre commun si disponible.
- `:2:` : version « ours » de l'index, côté branche courante lors d'un merge classique.
- `:3:` : version « theirs », côté branche intégrée.
- Pendant un **rebase**, la signification intuitive de « ours » et « theirs » peut surprendre : vérifier les versions, ne pas se fier aux libellés.

Marqueurs courants dans un fichier :

```text
<<<<<<< HEAD
Version de feature/002
=======
Version de main
>>>>>>> origin/main
```

Modifier le fichier pour conserver le résultat correct, supprimer les trois lignes de marqueurs et le code indésirable, puis enregistrer. Vérifier la syntaxe, compiler et lancer les tests adaptés.

Terminer **uniquement si git status confirme une fusion en cours** :

```bash
git add README.md
git status
git commit -m "Resolve merge conflicts"
git push origin feature/002
```

Pour annuler la tentative avant de la terminer :

```bash
git merge --abort
```

Ne pas lancer `git merge --abort` après avoir terminé le merge.

## 12. Alternative : résoudre par rebase

Autre stratégie, à choisir conformément aux conventions de l'équipe :

```bash
git switch feature/002
git fetch origin
git rebase origin/main
```

En cas de conflits, modifier les fichiers puis :

```bash
git add README.md
git rebase --continue
```

Répéter si plusieurs commits rencontrent des conflits. Pour abandonner :

```bash
git rebase --abort
```

Le rebase recrée les commits et peut donc changer leurs SHA. Si une branche a déjà été publiée, un push peut exiger :

```bash
git push --force-with-lease origin feature/002
```

Cette commande réécrit l'historique distant de la branche : ne l'utiliser qu'après vérification et coordination, particulièrement sur une branche partagée. Ne jamais employer `--force` pour contourner les protections de `main`.

**Ne pas confondre** `git commit` après un merge et `git rebase --continue` pendant un rebase. Si `git status` annonce `rebase in progress` ou `detached HEAD` pendant le rebase, finir ou annuler le rebase avant d'effectuer d'autres commits.

## 13. Résoudre directement dans GitLab

Quand l'interface propose **Resolve conflicts** :

1. Ouvrir la MR et ses conflits.
2. Comparer les deux versions.
3. Choisir l'un des côtés, ou éditer manuellement le résultat si l'interface le permet.
4. Vérifier chaque fichier et confirmer la résolution.
5. Valider la modification proposée par GitLab sur la branche source.

GitLab réalise alors les opérations distantes nécessaires selon sa fonctionnalité ; aucun `git push` local n'est requis pour cette résolution.

Si GitLab indique seulement **Resolve locally**, l'éditeur intégré n'est pas disponible pour ce conflit ou dans ce contexte. Effectuer la résolution locale comme décrit au chapitre précédent.

Une résolution de conflit n'est pas la validation définitive de la MR : la fusion reste à effectuer, après les éventuels contrôles.

## 14. IntelliJ IDEA et VS Code

### IntelliJ IDEA

- Sélectionner `feature/002`.
- Mettre à jour les références distantes avec **Fetch** ou le terminal.
- Lancer `git merge origin/main` si l'objectif est un merge.
- Utiliser **Git > Resolve Conflicts** si des conflits se produisent.
- Comparer les versions dans l'éditeur à trois panneaux, choisir ou combiner le résultat, puis valider.
- Terminer l'opération Git, lancer les tests et pousser.

Si le log Git affiche des branches divergentes sans fichier en conflit, cela ne signifie pas que la résolution a déjà commencé.

### VS Code

Le panneau **Source Control > Merge Changes** liste les fichiers non résolus. Un `README.md` visible sans marqueurs `<<<<<<<` peut rester en conflit dans l'index Git.

- Clic droit sur le fichier > **Open in Merge Editor** si disponible.
- Corriger le résultat et terminer l'édition.
- `git add README.md` marque le chemin comme résolu.
- Vérifier `git status` pour savoir s'il faut effectuer `git commit` (merge) ou `git rebase --continue` (rebase).
- Le bouton **Continue** dépend de l'opération en cours : ne pas cliquer sans vérifier.

## 15. Diagnostic des erreurs rencontrées

| Message | Cause probable | Vérification / action |
|---|---|---|
| `Permission denied (publickey)` | Clé absente, incorrecte ou alias SSH non utilisé | `ssh -vT git@gitlab-viger175` |
| `Could not read from remote repository` | Authentification, chemin ou permissions insuffisants | `git remote -v`, droits GitLab |
| `non-fast-forward` | La branche distante contient des commits absents localement | `git fetch origin`, comparer, intégrer |
| `pre-receive hook declined` | Règle serveur, par exemple branche protégée | Push vers une branche de feature |
| `detached HEAD` | HEAD ne pointe pas sur une branche, parfois pendant un rebase | `git status`, vérifier l'opération en cours |
| `Merge conflicts must be resolved` | Fusion automatique impossible | Resolve locally ou Resolve conflicts |
| `Everything up-to-date` | Aucun nouveau commit à pousser sur cette référence | `git status`, `git log`, branche/remote |

Pour analyser les divergences :

```bash
git branch -vv
git remote -v
git log --oneline --graph --decorate --all -20
git fetch origin
git log --oneline HEAD..origin/main
git log --oneline origin/main..HEAD
```

La première des deux dernières commandes montre les commits distants absents de `HEAD`, et la seconde ceux présents dans `HEAD` mais absents de `origin/main`.

## 16. Workflow quotidien recommandé

Première installation :

```powershell
cd D:\demo\viger175
git clone git@gitlab-viger175:rosynady/testrosy001.git
cd testrosy001
git config user.name "viger175"
git config user.email "adresse-du-compte@example.com"
```

Nouvelle fonctionnalité :

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/003
git status
git add README.md
git commit -m "Mise à jour documentation"
git push -u origin feature/003
```

Après création de la MR, si `main` a évolué et qu'un merge local est souhaité :

```bash
git switch feature/003
git fetch origin
git merge origin/main
git status
```

En absence de conflit, pousser la branche. En cas de conflit, résoudre, indexer, terminer le merge puis pousser. Sur GitLab, faire la revue et fusionner la MR dans `main`.

Après fusion :

```bash
git switch main
git pull --ff-only origin main
git branch -d feature/003
```

La suppression distante de `feature/003`, si souhaitée, peut être effectuée via l'option GitLab lors de la fusion ou en ligne de commande avec les autorisations adéquates.

## 17. Commandes essentielles en une page

| Action | Commande |
|---|---|
| Voir la branche et les changements | `git status` |
| Voir les remotes | `git remote -v` |
| Vérifier la clé GitLab | `ssh -T git@gitlab-viger175` |
| Récupérer les références | `git fetch origin` |
| Créer une branche | `git switch -c feature/002` |
| Indexer un fichier | `git add README.md` |
| Créer un commit | `git commit -m "Message"` |
| Publier une branche | `git push -u origin feature/002` |
| Intégrer main dans une feature | `git merge origin/main` |
| Lister les fichiers en conflit | `git diff --name-only --diff-filter=U` |
| Afficher les versions en conflit | `git show :2:README.md` et `git show :3:README.md` |
| Terminer un rebase | `git rebase --continue` |
| Abandonner un merge | `git merge --abort` |
| Abandonner un rebase | `git rebase --abort` |

## 18. Bonnes pratiques

1. Garder `main` protégée et travailler sur `feature/*`.
2. Donner au développeur le rôle minimal nécessaire, généralement Developer.
3. Vérifier l'alias SSH et le dépôt cible avant de cloner ou pousser.
4. Vérifier `git status` avant un merge, un rebase et un commit de résolution.
5. Conserver uniquement du code valide lors d'une résolution de conflit ; ne pas supprimer aveuglément des modifications.
6. Tester localement avant de pousser et faire relire le diff dans la MR.
7. Éviter `git push --force`, `git reset --hard` et toute réécriture de branche partagée sans coordination.

## 19. Documentation officielle

- [GitLab : permissions et rôles](https://docs.gitlab.com/user/permissions/)
- [GitLab : clés SSH](https://docs.gitlab.com/user/ssh/)
- [GitLab : Merge Requests](https://docs.gitlab.com/user/project/merge_requests/)
- [GitLab : résolution des conflits](https://docs.gitlab.com/user/project/merge_requests/conflicts/)
- [Git : merge](https://git-scm.com/docs/git-merge)
- [Git : rebase](https://git-scm.com/docs/git-rebase)
