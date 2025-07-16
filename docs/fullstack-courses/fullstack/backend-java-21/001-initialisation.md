# Installation

    Je veux un projet Java 21, type API REST, avec :
    Maven (packaging war)
    Eclipse
    Jakarta EE 11 (namespace jakarta.*)
    Servlet API 6.0+
    Tomcat 11.x (externe) – pas de serveur GlassFish
    Déploiement : via un fichier WAR

    Je veux :
    Une classe métier : Person
    Un contrôleur REST : PersonController

    Les deux situées dans le package :
    com.ganatan.modules.person

    URL :    http://localhost:8080/persons
    Format : JSON (produit par Jakarta EE 11)
    Mon architecture projet sera :

    backend-java-21/
    ├── src/
    │   └── main/
    │       └── java/
    │           └── com/ganatan/modules/person/
    │               ├── Person.java
    │               └── PersonController.java
    ├── target/
    └── pom.xml
    Attention :

    Je veux un projet de type WAR, mais avec une API REST utilisant Jersey (implémentation JAX-RS) pour fonctionner sous Tomcat 11.x.

    Le projet doit être :
    Le plus simple possible
    Créé from scratch avec Eclipse
    Sans serveur GlassFish, ni serveur embarqué


# Installation
  
  File → New → Other
    Maven → Maven Project → Next
      Cocher Create a simple project (skip archetype selection)
      Group Id: com.ganatan
      Artifact Id: backend-java-21
      Packaging: war
      Name: backend-java-21

 # Créer la structure des packages
    Supprimer le package par défaut créé automatiquement
    Clic droit sur src/main/java → New → Package
    Créer : com.ganatan.modules.person
      com.ganatan.modules.person

# Pom Xml


<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.ganatan</groupId>
    <artifactId>backend-java-21</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>
    <name>backend-java-21</name>
    
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <jersey.version>3.1.5</jersey.version>
    </properties>
    
    <dependencies>
        <!-- Jakarta Servlet API 6.0 pour Tomcat 11 -->
        <dependency>
            <groupId>jakarta.servlet</groupId>
            <artifactId>jakarta.servlet-api</artifactId>
            <version>6.0.0</version>
            <scope>provided</scope>
        </dependency>
        
        <!-- Jersey JAX-RS Implementation -->
        <dependency>
            <groupId>org.glassfish.jersey.core</groupId>
            <artifactId>jersey-server</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        
        <!-- Jersey Servlet Container -->
        <dependency>
            <groupId>org.glassfish.jersey.containers</groupId>
            <artifactId>jersey-container-servlet</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        
        <!-- Jersey JSON Support avec Jackson -->
        <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-json-jackson</artifactId>
            <version>${jersey.version}</version>
        </dependency>
        
        <!-- Jersey Injection -->
        <dependency>
            <groupId>org.glassfish.jersey.inject</groupId>
            <artifactId>jersey-hk2</artifactId>
            <version>${jersey.version}</version>
        </dependency>
    </dependencies>
    
    <build>
        <finalName>backend-java-21</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>21</source>
                    <target>21</target>
                </configuration>
            </plugin>
            
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

# Creation des classes
  creation des packages
    com.ganatan.root
    com.ganatan.config
    com.ganatan.modules.person

  - Person.java
    package com.ganatan.modules.person;

    public class Person {
        private Long id;
        private String firstName;
        private String lastName;

        public Person(Long id, String firstName, String lastName) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public Long getId() {
            return id;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }
    }
    

    - PersonController.java

    package com.ganatan.modules.person;

    import jakarta.ws.rs.*;
    import jakarta.ws.rs.core.MediaType;
    import jakarta.ws.rs.core.Response;
    import java.util.ArrayList;
    import java.util.List;

    @Path("/persons")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public class PersonController {

        private static final List<Person> persons = new ArrayList<>();

        static {
            persons.add(new Person(1L, "Steven", "Spielberg"));
            persons.add(new Person(2L, "Martin", "Scorsese"));
            persons.add(new Person(3L, "Quentin", "Tarantino"));
            persons.add(new Person(4L, "Christopher", "Nolan"));
            persons.add(new Person(5L, "James", "Cameron"));
            persons.add(new Person(6L, "Clint", "Eastwood"));
            persons.add(new Person(7L, "Ridley", "Scott"));
        }

        @GET
        public Response getAllPersons() {
            return Response.ok(persons).build();
        }
    }


    - RootController



      package com.ganatan.root;

      import jakarta.ws.rs.GET;
      import jakarta.ws.rs.Path;
      import jakarta.ws.rs.Produces;
      import jakarta.ws.rs.core.MediaType;
      import jakarta.ws.rs.core.Response;
      import java.util.HashMap;
      import java.util.Map;

      @Path("/")
      @Produces(MediaType.APPLICATION_JSON)
      public class RootController {

          @GET
          public Response getStatus() {
              Map<String, Object> response = new HashMap<>();
              response.put("success", true);

              Map<String, Object> data = new HashMap<>();
              data.put("version", "1.1.1");
              data.put("status", "ok");
              data.put("app", "backend-java-21");
              data.put("env", "development");
              data.put("dbClient", "mock");

              response.put("data", data);

              return Response.ok(response).build();
          }
      }


    - ApplicationConfig

        package com.ganatan.config;

        import jakarta.ws.rs.ApplicationPath;
        import org.glassfish.jersey.server.ResourceConfig;

        @ApplicationPath("/")  
        public class ApplicationConfig extends ResourceConfig {

            public ApplicationConfig() {

                System.out.println("==================================");
                System.out.println("Démarrage backend-java-21 (Jersey)");
                System.out.println("API exposées :");
                System.out.println("- /            -> RootController");
                System.out.println("- /persons     -> PersonController");
                System.out.println("Serveur : Tomcat 11.x");
                System.out.println("==================================");

                packages(
                    "com.ganatan.root",
                    "com.ganatan.modules.person"
                );
            }
        }

      - Supprimer le fichier Web.xml
      tout le repertoire webapp



# Compilation et execution avec Tomcat
    
    mvn clean install
    
    copy de target/backend-java-21.war
    [TOMCAT_HOME]/webapps

  - Modifier le fichier de config
  [TOMCAT_HOME]/conf/tomcat-users.xml

  <role rolename="manager-gui"/>
  <user username="admin" password="admin" roles="manager-gui"/>

  - Lancer Tomcat
    http://localhost:8080/
    
    Manager App
    
    http://localhost:8080/manager/html