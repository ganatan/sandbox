
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

