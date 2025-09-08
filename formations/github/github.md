
# Creation du compte sur github

# Creation d'un repo via https
  Profile
  Repositories
  New
    Repository Name
    Description

# Principes
  
  git init → tu crées un dépôt local (un dossier .git caché).
  git add → tu prépares les fichiers à être commités.
  git commit → tu enregistres une version dans ton historique local.
  Cet historique reste uniquement sur ton disque, tant que tu n’as pas fait de push.

  Relier un dépôt local à un dépôt distant
    git remote add origin https://github.com/frontendganatan/test-angular.git

  Historiquement, Git créait toujours une branche par défaut appelée master.
  Donc dès que tu faisais git init, tu étais sur master.

  Depuis octobre 2020, GitHub (et ensuite Git) ont décidé de remplacer master par main comme branche par défaut :

# Liste des commandes
  - Liste des remotes
    git remote -v  

  - Liste des modifications en local
    git status    

  - Liste des branches en local
    git branch                  ( En cours )
    git branch -a               ( Toutes les branches )

  - Liste des branches des repo remote
    git branch -r    

  - Renommer une banche
    git branch -M main

   - Envoyer des commits
    git push origin main               ( envoie de la branche main vers la branche remote main )
    git push origin master:main        ( envoie de la branche master vers la branche remote main )



# Creation d'un repo local
  git init

  Création du fichier config

  [core]
    repositoryformatversion = 0
    filemode = false
    bare = false
    logallrefupdates = true
    symlinks = false
    ignorecase = true

# Relier à un repo distant

  git remote add origin https://github.com/frontendganatan/test-angular.git

  Rajout dans le fichier config
    [remote "origin"]
      url = https://github.com/frontendganatan/test-angular.git
      fetch = +refs/heads/*:refs/remotes/origin/*    
        