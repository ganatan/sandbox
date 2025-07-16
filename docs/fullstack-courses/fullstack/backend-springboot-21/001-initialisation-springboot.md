
# Création de deux projet

  - backend-java-21-eclipse    
  - backend-java-21-intellij 

# Création du projet Eclipse

  - Aller sur https://start.spring.io

    - Paramètres
        Project : Maven
        Language : Java
        Spring Boot : 3.5.3
        Group : com.ganatan
        description:Projet Spring Boot Java 21 WAR pour Eclipse
        package.name:com.ganatan.backend-java-21-eclipse
        Java : 21
        Packaging : jar


        Artifact : backend-java-21-eclipse
        name : backend-java-21-eclipse
        !!!!!! Choisir le nom de l'appli pas trop long !!!!!!!
          starter
          llm


  Ajoute les dépendances :
    Spring Web          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  Clique sur Generate    



# compilation du projet Eclipse
  mvn clean
  mvn install
  
  mvn clean install

  java -jar target/backend-java-21-eclipse-0.0.1-SNAPSHOT.jar
  java -jar target/starter-app-0.0.1-SNAPSHOT.jar


  http://localhost:8080/

# Rajout d'un controller

  - Creer un repertoire controllers
  
  package com.ganatan.backend_java_21_eclipse.controllers;

  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RestController;

  @RestController
  public class HelloController {

      @GetMapping("/")
      public String home() {
          return "starter-app";
      }
  }

# Gestion des dependencies
  https://mvnrepository.com/

# Liste des commandes maven

  mvn clean	                      Supprime le dossier target/ (nettoyage complet du build précédent)
  mvn install	                    Compile, teste et installe le .jar dans ton repo local (~/.m2)
  mvn clean install	              Nettoie puis installe : combo classique pour rebuild complet

  mvn compile	                    Compile les sources (src/main/java) uniquement
  mvn test	                      Exécute les tests (src/test/java)
  mvn package	                    Génére un .jar ou .war dans target/
  mvn spring-boot:run	            Lance l’application Spring Boot sans passer par un IDE
  mvn dependency:tree           	Affiche l’arbre des dépendances (utile pour debug)

  mvn test                        Exécute tous les tests JUnit
  mvn verify                      Exécute tests + vérifications (fail si test KO ou checkstyle)
  mvn failsafe:integration-test   Exécute des tests d’intégration (IT suffix)
  mvn cobertura:cobertura         Génére un rapport de couverture de test (si plugin actif)

  mvn dependency:analyze                      Vérifie les dépendances inutilisées ou manquantes
  mvn versions:display-dependency-updates	    Affiche les maj disponibles des libs
  mvn help:effective-pom                      Montre le POM final avec héritage/résolution complète

# Rajout des tests

  - Cobertura qui n’est pas compatible avec Java 9
 
  - Rajout de 
 <!-- Plugin JaCoCo -->
    <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
      <version>0.8.11</version>
      <executions>
        <!-- Agent JaCoCo avant les tests -->
        <execution>
          <goals>
            <goal>prepare-agent</goal>
          </goals>
        </execution>
        <!-- Génération du rapport après les tests -->
        <execution>
          <id>report</id>
          <phase>test</phase>
          <goals>
            <goal>report</goal>
          </goals>
        </execution>
      </executions>
    </plugin>			
		</plugins>
	</build>


  Lancer les tests

    mvn clean test	                      
    
    Rapport généré dans 
      target/site/jacoco/index.html