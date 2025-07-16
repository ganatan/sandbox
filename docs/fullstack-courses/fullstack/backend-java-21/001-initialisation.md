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


  # !!!!!!! ne marche pas
	Create New / Project / Maven / Maven Project
		Sélectionnez un archétype
			Catalog					Maven Central
			Filter					org.apache.maven
			Group Id				org.apache.maven.archetypes
			Artifact Id			maven.archetype-webapp

    Indiquer 
		  Group Id				com.ganatan
			Artifact Id			backend-java-21
			Package					com.ganatan      

    Repondre Y lors de l'installation      

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
      </properties>
      
      <dependencies>
          <!-- Jakarta Servlet API 6.0 pour Tomcat 11 -->
          <dependency>
              <groupId>jakarta.servlet</groupId>
              <artifactId>jakarta.servlet-api</artifactId>
              <version>6.0.0</version>
              <scope>provided</scope>
          </dependency>
          
          <!-- JSON Processing pour Jakarta EE 11 -->
          <dependency>
              <groupId>org.glassfish</groupId>
              <artifactId>jakarta.json</artifactId>
              <version>2.0.1</version>
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
                      <webXml>false</webXml>
                  </configuration>
              </plugin>
          </plugins>
      </build>
  </project>

  # Compilation et execution
    
    mvn clean install
    
    java -jar target/backend-java-21.jar