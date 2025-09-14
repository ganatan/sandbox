# initialisation

Je veux developper une application backend avec java et maven

Mes outils 

	Jakarta 21
	Java 21
	Tomcat 11
	Eclipse Version: 2024-12 (4.34.0)


Je veux que le projet s'appelle backend-java-maven

il doit etre le plus simple possible 


j'ai un projet existant

je veux que l'url / renvoie du json
une liste de 4 realisateurs 

l'url devra etre localhost:8089/persons


voila mes fichiers

- pom.xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>

  <groupId>com.ganatan</groupId>
  <artifactId>frontend-java-maven</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
  </properties>

  <dependencies>
    <!-- Jakarta EE 10 -->
    <dependency>
      <groupId>jakarta.platform</groupId>
      <artifactId>jakarta.jakartaee-web-api</artifactId>
      <version>10.0.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- JUnit 5 -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>

    <!-- Mockito -->
    <dependency>
      <groupId>org.mockito</groupId>
      <artifactId>mockito-core</artifactId>
      <version>5.6.0</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.mockito</groupId>
      <artifactId>mockito-junit-jupiter</artifactId>
      <version>5.6.0</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>frontend-java-maven</finalName>
    <plugins>
      <!-- Compilation -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
      </plugin>

      <!-- Build WAR -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.4.0</version>
      </plugin>

      <!-- JaCoCo (Coverage) -->
      <plugin>
        <groupId>org.jacoco</groupId>
        <artifactId>jacoco-maven-plugin</artifactId>
        <version>0.8.10</version>
        <executions>
          <execution>
            <goals>
              <goal>prepare-agent</goal>
            </goals>
          </execution>
          <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals>
              <goal>report</goal>
            </goals>
          </execution>
        </executions>
      </plugin>

      <!-- Tests -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.0.0-M7</version>
      </plugin>
    </plugins>
  </build>
</project>


web.xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app
    version="5.0"
    xmlns="https://jakarta.ee/xml/ns/jakartaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd">
  
  <display-name>Frontend Java Maven</display-name>

</web-app>

Home.java

package com.ganatan.servlets;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/")
public class Home extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.getWriter().println("<html><body><h1>Hello World!</h1></body></html>");
    }
}



mon architecture est 
- src
  - main
    - java
      - com
        - ganatan
          - servlets
            - Home.java
          - tools
            - GenerateStructure.java
    - resources
    - webapp
      - WEB-INF
        - web.xml
  - test
    - java
      - com
        - ganatan
          - servlets
            - HomeTest.java
    - resources



Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

