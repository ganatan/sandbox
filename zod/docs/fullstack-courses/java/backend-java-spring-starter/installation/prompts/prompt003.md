# voila mon architecture

- src
  - main
    - java
      - com
        - ganatan
          - config
            - AppInitializer.java
            - WebConfig.java
          - controllers
            - HomeController.java
          - models
            - Person.java
          - tools
            - GenerateStructure.java
    - resources
    - webapp
      - WEB-INF
        - views
  - test
    - java
    - resources

mon pom.xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>com.ganatan</groupId>
	<artifactId>backend-java-spring</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<maven.compiler.source>21</maven.compiler.source>
		<maven.compiler.target>21</maven.compiler.target>
		<maven.compiler.release>21</maven.compiler.release>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>6.2.4</version>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>2.18.3</version>
		</dependency>
		<dependency>
			<groupId>org.apache.tomcat.embed</groupId>
			<artifactId>tomcat-embed-core</artifactId>
			<version>11.0.5</version>
		</dependency>
		<dependency>
			<groupId>jakarta.servlet</groupId>
			<artifactId>jakarta.servlet-api</artifactId>
			<version>6.1.0</version>
			<scope>provided</scope>
		</dependency>
	</dependencies>

	<build>
		<finalName>frontend-java-spring</finalName>
	</build>

</project>



j'execute mvn test

je veux avoir du coverage comment faire


