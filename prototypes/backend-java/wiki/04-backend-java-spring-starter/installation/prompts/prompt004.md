j'ai un projet backend-java-spring-starter

ce pom.xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>com.ganatan</groupId>
	<artifactId>backend-java-spring-starter</artifactId>
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

et ce controller
package com.ganatan.controllers;

import com.ganatan.models.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public List<Person> getPersons() {
        return List.of(
            new Person(1, "Christopher Nolan", "London"),
            new Person(2, "Quentin Tarantino", "Knoxville"),
            new Person(3, "Martin Scorsese", "New York"),
            new Person(4, "Steven Spielberg", "Cincinnati")
        );
    }
}

que faire pour avoir un test
peux tu me donner un test java