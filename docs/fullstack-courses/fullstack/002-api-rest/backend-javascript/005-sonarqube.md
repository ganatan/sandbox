
# Installation


  # docker-compose.sonarqube.yml

    services:

      sonarqube:
        image: sonarqube:latest
        container_name: sonarqube
        ports:
          - "9000:9000"
        environment:
          - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
        volumes:
          - sonarqube_data:/opt/sonarqube/data
          - sonarqube_extensions:/opt/sonarqube/extensions

    volumes:
      sonarqube_data:
      sonarqube_extensions:


  docker compose -f docker-compose.sonarqube.yml up -d

# Utilisation
  
  Accès interface :
  
  http://localhost:9000
  
    login       admin
    password    admin

  !!!!!!! Demarrage Changer de password
    login       admin
    password    Trustno1234&
    


# Creer un toke
  
  MyAccount / Security
  http://localhost:9000/account/security

  Name        backend-javascript
  Type        User Token

  Generate

# Installation node
  
    npm install --save-dev sonarqube-scanner


    Creer Fichier sonar-project.properties à la racine

    sonar.projectKey=backend-javascript
    sonar.sources=src
    sonar.tests=src/__tests__

    sonar.exclusions=**/*.test.js, **/*.spec.js, **/__tests__/**

    sonar.javascript.lcov.reportPaths=coverage/lcov.info

    sonar.host.url=http://localhost:9000
    sonar.token=squ_f3e55d36ef92cee020c4615995e52476fce37a23


# Explications des parametres

  Propriété	                      Utilité
  
  sonar.sources=src	                    Analyse tout le code de src/ uniquement.
  sonar.tests=src/__tests__	            Identifie les tests présents dans les sous-dossiers.
  sonar.exclusions=**/*.test.js...	    Exclut les fichiers de test des sources.
  sonar.javascript.lcov.reportPaths=	  Envoie la couverture Jest (via npm run test:coverage).

# Fonctionnement  

    Le client SonarQube Scanner :
      Lit ton fichier sonar-project.properties.
      Analyse ton code localement (JavaScript, TypeScript, etc.).
      Rassemble :
        Bugs.
        Vulnérabilités.
        Code Smells.
        Couverture des tests (via Jest, si configuré).
        Duplications.
        Complexité.

      2️⃣ Connexion au Serveur SonarQube :
        Il envoie ensuite tous les résultats au SonarQube Server via HTTP :
          properties
            sonar.host.url=http://localhost:9000
            sonar.token=TON_TOKEN

      3️⃣ Serveur :
        Le serveur SonarQube :
          Reçoit les rapports.
          Les indexe dans la base PostgreSQL interne.
          Génère les dashboards et métriques visibles dans l’interface web.


# Commandes
    
    Dashboard         vue d’ensemble de la qualité du projet.
    Issues            liste des bugs, vulnérabilités et code smells.
    Code              analyse du code directement dans l'interface.
    Coverage          taux de couverture des tests unitaires (via Jest).
    Duplications      détection des duplications de code.