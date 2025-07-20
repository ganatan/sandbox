
# Compatibilité Java Tomcat

Tomcat	      API Servlet	            Java requis	      Spring MVC type	                      Version Spring MVC

Tomcat 8.x	  javax.servlet 3.1	      Java 7 / 8	      Spring MVC classique (javax.servlet)	Spring 4.x / 5.x	
Tomcat 9.x	  javax.servlet 4.0	      Java 8	          Spring MVC classique (javax.servlet)	Spring 5.x
Tomcat 10.x	  jakarta.servlet 5.0	    Java 11	          Spring MVC Jakarta (jakarta.servlet)	Spring 6.x
Tomcat 11.x	  jakarta.servlet 6.0	    Java 11	          Spring MVC Jakarta (jakarta.servlet)


# Installation de Tomcat 
  Version 9
  
  https://tomcat.apache.org/download-90.cgi


  installer dans
    D:\hal\Tomcat 9.0

  Rajouter les Raccourcis Tomact


# Lancement Eclipse

  windows / Preferences
    Install / Update  
      Decocher JBoss

  Rajouter Settings.xml      
  
  New Project Maven
    org.apache.maven
    maven-archetype-webapp


    Nom du projet   backend-spring-8
    GroupId         com.ganatan
    ArtifactId      backend-spring-8
    Packaging       war
    package         

    Valider Y   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      lors de l'installation

# Ajout des fichiers
  
    Verifier presence de 
    src/main/java
        Clic droit sur le projet → Properties
        Sélectionne : Java Build Path
        Onglet Source
        Clique sur Add Folder...
          Ajouter 
            src/main/java

    Supprimer index.jsp

# Liste des fichiers

  # pom.xml

  <project xmlns="http://maven.apache.org/POM/4.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.ganatan</groupId>
    <artifactId>backend-java-8</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>

    <properties>
      <java.version>1.8</java.version>
      <maven.compiler.source>1.8</maven.compiler.source>
      <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.22.RELEASE</version>
      </dependency>

      <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.0</version>
      </dependency>

      <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
      </dependency>
    </dependencies>

    <build>
      <finalName>backend-java-8</finalName>
    </build>

  </project>

  # webapp/WEB-INF/spring-servlet.xml

  <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

      <context:component-scan base-package="com.ganatan.modules.person"/>
      <mvc:annotation-driven />

  </beans>

  # webapp/WEB-INF/web.xml

  <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="3.1">

    <servlet>
      <servlet-name>spring</servlet-name>
      <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
      <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring-servlet.xml</param-value>
      </init-param>
      <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
      <servlet-name>spring</servlet-name>
      <url-pattern>/*</url-pattern>
    </servlet-mapping>

  </web-app>



    Person.java
      package com.ganatan.modules.person;

      public class Person {
          private String name;

          public Person() {}
          public Person(String name) { this.name = name; }

          public String getName() { return name; }
          public void setName(String name) { this.name = name; }
      }

    PersonController.java      

      package com.ganatan.modules.person;

      import org.springframework.web.bind.annotation.GetMapping;
      import org.springframework.web.bind.annotation.RestController;
      import java.util.Arrays;
      import java.util.List;

      @RestController
      public class PersonController {

        @GetMapping("/")
        public String test() {
            return "API is working";
        }
        
        
          @GetMapping("/persons")
          public List<Person> getPersons() {
              return Arrays.asList(
                  new Person("James Cameron"),
                  new Person("Christopher Nolan")
              );
          }
      }

