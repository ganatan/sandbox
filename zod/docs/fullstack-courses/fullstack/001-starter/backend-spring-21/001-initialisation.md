
# Création 

  je veux un projet Java 21 API REST avec Spring MVC moderne (sans Spring Boot).

  📦 Nom du projet : backend-spring-21
  ✅ STACK TECHNIQUE :
  Java 21 + Maven (packaging WAR)

  Spring Framework 6.x (Spring MVC uniquement, PAS Spring Boot)

  Servlet API 6.0+ + Tomcat 11.x externe

  Jackson pour JSON

  Eclipse IDE

  🛠️ ARCHITECTURE :
  backend-spring-21/
  ├── src/main/java/com/ganatan/config/
  │ ├── AppInitializer.java
  │ └── WebConfig.java
  ├── src/main/java/com/ganatan/modules/person/
  │ ├── Person.java
  │ └── PersonController.java
  └── pom.xml

  📡 ENDPOINTS API :
  http://localhost:8080/backend-spring-21/api/persons

  ⚙️ CONTRAINTES :
  WAR deployment (pas JAR exécutable)

  Tomcat 11.x externe (pas serveur embarqué)

  Spring MVC uniquement, PAS Spring Boot

  API REST pure (pas de vues JSP)

  Configuration 100% Java (PAS de XML)

  Pas de web.xml ni de spring-servlet.xml

  📄 LIVRABLES :
  pom.xml avec Spring MVC 6.x + Jackson

  AppInitializer.java : configuration servlet (remplace web.xml)

  WebConfig.java : configuration Spring MVC (remplace spring-servlet.xml)

  Person.java : classe métier

  PersonController.java : @Controller exposant l'API REST

  Instructions de déploiement WAR sur Tomcat externe

  Donne-moi l'implémentation complète étape par étape pour Eclipse.

# Installation

  File → New → Other
    Maven → Maven Project → Next
      Cocher Create a simple project (skip archetype selection)
      Group Id: com.ganatan
      Artifact Id: backend-spring-21
      Packaging: war
      Name: backend-spring-21

# Pom.xml

  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                              http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ganatan</groupId>
    <artifactId>backend-spring-21</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>

    <properties>
      <maven.compiler.source>21</maven.compiler.source>
      <maven.compiler.target>21</maven.compiler.target>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <spring.version>6.1.3</spring.version>
      <jackson.version>2.17.0</jackson.version>
      <jakarta.version>6.0.0</jakarta.version>
    </properties>

    <dependencies>
      <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>${jakarta.version}</version>
        <scope>provided</scope>
      </dependency>

      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>${spring.version}</version>
      </dependency>

      <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>${jackson.version}</version>
      </dependency>
    </dependencies>

  </project>


# Les sources


  package com.ganatan.config;

  import jakarta.servlet.ServletContext;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.ServletRegistration;
  import org.springframework.web.WebApplicationInitializer;
  import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
  import org.springframework.web.servlet.DispatcherServlet;

  public class AppInitializer implements WebApplicationInitializer {

      @Override
      public void onStartup(ServletContext container) throws ServletException {
          AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
          context.setConfigLocation("com.ganatan.config");

          ServletRegistration.Dynamic dispatcher = container.addServlet("dispatcher", new DispatcherServlet(context));
          dispatcher.setLoadOnStartup(1);
          dispatcher.addMapping("/");
      }
  }






  package com.ganatan.config;

  import org.springframework.context.annotation.ComponentScan;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.servlet.config.annotation.EnableWebMvc;

  @Configuration
  @EnableWebMvc
  @ComponentScan(basePackages = "com.ganatan")
  public class WebConfig {
  }



  package com.ganatan.controllers;

  import org.springframework.stereotype.Controller;

  @Controller
  public class RootController {

      @GetMapping("/")
      @ResponseBody
      public Map<String, Object> getStatus() {
          Map<String, Object> response = new HashMap<>();
          response.put("success", true);

          Map<String, Object> data = new HashMap<>();
          data.put("version", "1.1.1");
          data.put("status", "ok");
          data.put("app", "backend-spring-21");
          data.put("env", "development");
          data.put("dbClient", "mock");

          response.put("data", data);

          return response;
      }
  }



  package com.ganatan.modules.person;

  public class Person {
      private String name;

      public Person() {}

      public Person(String name) {
          this.name = name;
      }

      public String getName() {
          return name;
      }

      public void setName(String name) {
          this.name = name;
      }
  }





  package com.ganatan.modules.person;

  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.ResponseBody;

  import java.util.List;

  @Controller
  public class PersonController {

      @GetMapping("/persons")
      @ResponseBody
      public List<Person> getPersons() {
          return List.of(
              new Person("Christopher Nolan"),
              new Person("Quentin Tarantino"),
              new Person("Steven Spielberg"),
              new Person("Martin Scorsese"),
              new Person("Denis Villeneuve"),
              new Person("James Cameron"),
              new Person("Ridley Scott")
          );
      }
  }
