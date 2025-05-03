    Équivalents des scripts

Node.js (package.json)	                              Spring Boot (Maven / Terminal)

"start": "node src/server"	                          mvn spring-boot:run

"dev": "nodemon src/server"	                          mvn spring-boot:run (auto-reload via DevTools)

"lint": "eslint ."	                                  mvn checkstyle:check

"test": "jest"	                                      mvn test

"coverage": "jest --coverage"	                        mvn jacoco:report

"build": 
"webpack --mode production --output-path dist"	      mvn clean package

"serve": "node dist/bundle.js"	                      java -jar target/backend-java-springboot-0.0.1-SNAPSHOT.jar
                                                      puis
                                                      localhost:9000/persons

"audit": "npm audit"	                                mvn dependency:analyze

"generate-structure": 
"node tools/scripts/generate-structure.js"	          mvn archetype:generate




# Détails des commandes

# Build
  
  Commande Maven
    mvn clean package
  Via Eclipse    
    run as / Maven Build / Goals -> clean package

1️⃣ mvn clean
  Efface les fichiers temporaires et le dossier target/.
  Supprime tous les fichiers générés lors des builds précédents.
  Assure un environnement propre avant de reconstruire.

✅ 2️⃣ mvn package
  Compile, teste et assemble l'application en un fichier .jar ou .war.
  Télécharge les dépendances définies dans pom.xml (si ce n'est pas déjà fait).
  Compile le code source (src/main/java).
  Exécute les tests unitaires (mvn test).
  Assemble le projet en un JAR (target/backend-springboot-0.0.1-SNAPSHOT.jar).
  Place le fichier final dans le dossier target/.


# Lint
  
  Commande Maven
    mvn checkstyle:check 
  Via Eclipse
  checkstyle:check
    Run As / Maven build / Goals -> checkstyle:check