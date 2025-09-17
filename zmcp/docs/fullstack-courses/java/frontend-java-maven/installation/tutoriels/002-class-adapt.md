# Resoudre le bug

Properties sur le projet
JavaBuildPath
  JRE
  Maven


L'architecture apparait
  src / main / java


Creer le fichier Home.java    
  src/main/java/com/ganatan/servlets/Home.java

creer un package
  com.ganatan.servlets  

Creer une class Home

  package com.ganatan.servlets;

  import java.io.IOException;
  import javax.servlet.ServletException;
  import javax.servlet.annotation.WebServlet;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;

  @WebServlet("/")
  public class Home extends HttpServlet {
      protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          response.setContentType("text/html");
          response.getWriter().println("<html><body><h1>Hello World!</h1></body></html>");
      }
  }



# Adapter à Java 21

web.xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app
    version="5.0"
    xmlns="https://jakarta.ee/xml/ns/jakartaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd">
  
  <display-name>Frontend Java Maven</display-name>

</web-app>


pom.xml

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
    <dependency>
      <groupId>jakarta.platform</groupId>
      <artifactId>jakarta.jakartaee-web-api</artifactId>
      <version>10.0.0</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>frontend-java-maven</finalName>
    <pluginManagement>
      <plugins>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.13.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.4.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>


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
        response.getWriter().println("<html><body><h1>Hello World Jakarta!</h1></body></html>");
    }
}

# Verification
  Properties/ Project Facets / 
  Dynamic Web Module / 5.0


# Executer les scripts
  mvn clean
  mvn test