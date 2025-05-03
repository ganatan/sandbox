# Response

Étape 1 : Ouvre PowerShell en Administrateur et exécute :
wsl --install

Vérification :
wsl --version
WSL version: 2.0.x


Docker Desktop Installer.exe

Double-clique sur Docker Desktop Installer.exe
  Coche : "Use WSL 2 instead of Hyper-V"
  (utilisation de WSL 2 obligatoire pour être optimal)

  Laisse décoché Hyper-V si tu n'as pas besoin d'un environnement VM complet

Termine l'installation normalement

Ensuite, Docker Desktop va :

Détecter automatiquement ta distribution WSL (Ubuntu, etc.)

Te proposer de l'intégrer à Docker


# Response

sur 
Github
  Aller sur GitHub dans ton projet backend-javascript
  Clique sur Settings (en haut du dépôt)
  Dans le menu à gauche, descends jusqu’à Secrets and variables > Actions
  Clique sur New repository secret
  2. Ajouter les deux secrets
  Ajoute :
    Name : DOCKER_USERNAME
    Value : ganatan
et
    Name : DOCKER_PASSWORD
    Value : ton mot de passe DockerHub ou un Personal Access Token (recommandé)
  
  sur 

https://hub.docker.com/repositories/ganatan
Important : tu dois ajouter deux secrets GitHub :
DOCKER_USERNAME : ton nom DockerHub
DOCKER_PASSWORD : ton mot de passe ou un token d'accès DockerHub

