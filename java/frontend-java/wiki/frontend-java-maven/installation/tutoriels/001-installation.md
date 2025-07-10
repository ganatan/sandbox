
# Versions des outils demandées
	Jakarta EE 10
	Java 21
	Tomcat 11
	Eclipse 2025 03

# Telechargement Eclipse
	Eclipse IDE for Enterprise Java and Web Developers

	https://www.eclipse.org/downloads/packages/


# Creer un  frontend avec java

	Create New / Project / Maven / Maven Project
		Sélectionnez un archétype
			Catalog					Maven Central
			Filter					org.apache.maven
			Group Id				org.apache.maven.archetypes
			Artifact Id			maven.archetype-webapp
				
				Indiquer 
					Group Id				com.ganatan
					Artifact Id			frontend-java-maven
					Package					com.ganatan

			!!!!!!!
			Dans console Blocage à 33%
				Repondre Y à la question


# Tester le projet

    Rajouter le serveur Tomcat
    Servers / Create nex server
        port tomcat     8088
        port HTTP       8089


	Run as 
		Run on server
			Affecter Tomcat 11  (selection du serveur)
	Blocage sur le chargement

	Windows / Preferences / Install-update
		Available 			desactiver JBoss tools


	Redemarrer Eclipse
	
	Recommencer
		Run as
			Run on server
	Resultat dans le navigateur
		http://localhost:8089/frontend-java-maven/			


	Erreur sur le fichier index.jsp

# Fixe Erreur sur jsp avec Java 8

 	<dependency>
    	<groupId>javax</groupId>
        <artifactId>javaee-api</artifactId>
        <version>8.0</version>
        <scope>provided</scope>
    </dependency>    





# Modifier Pom.xml

<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.ganatan</groupId>
  <artifactId>frontend-java-maven</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>frontend-java-maven Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.1</version>
      <scope>test</scope>
    </dependency>
 	<dependency>
    	<groupId>javax</groupId>
        <artifactId>javaee-api</artifactId>
        <version>8.0</version>
        <scope>provided</scope>
    </dependency>    
  </dependencies>

  <build>
    <finalName>frontend-java-maven</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.4.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.3.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.13.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>3.3.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.4.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>3.1.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>3.1.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
