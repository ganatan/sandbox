# rajout d'un package

# lint
  mvn checkstyle:check

  dans pom.xml

  <build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-checkstyle-plugin</artifactId>
      <version>3.3.0</version>
      <executions>
        <execution>
          <phase>verify</phase>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
      <configuration>
        <configLocation>google_checks.xml</configLocation>
        <encoding>UTF-8</encoding>
        <consoleOutput>true</consoleOutput>
        <failsOnError>true</failsOnError>
      </configuration>
    </plugin>


  <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.2.5</version>
    </plugin>


  </plugins>
</build>


# coverage

  mvn jacoco:report
  !!!!!!!!!!!!!! ne donne un resultat que si avant
  mvn test


# pour backend-spring

rajout de ces dependances


    <dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-test</artifactId>
	    <version>${spring.version}</version>
	    <scope>test</scope>
	</dependency>
	<dependency>
	    <groupId>org.hamcrest</groupId>
	    <artifactId>hamcrest</artifactId>
	    <version>2.2</version>
	    <scope>test</scope>
	</dependency>	
	<dependency>
	    <groupId>com.jayway.jsonpath</groupId>
	    <artifactId>json-path</artifactId>
	    <version>2.9.0</version>
	    <scope>test</scope>
	</dependency>
