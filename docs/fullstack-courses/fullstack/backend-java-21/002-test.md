# rajout d'un package


  dans pom.xml

  <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.2</version>
      <scope>test</scope>
  </dependency>


  com.ganatan.modules.person


  Person.test.java

    package com.ganatan.modules.person;

    import org.junit.jupiter.api.Test;
    import static org.junit.jupiter.api.Assertions.*;

    public class PersonTest {

        @Test
        public void testPersonCreation() {
            Person person = new Person(1L, "Steven", "Spielberg");

            assertEquals(1L, person.getId());
            assertEquals("Steven", person.getFirstName());
            assertEquals("Spielberg", person.getLastName());
        }
    }



# Coverage

  dans pom.xml et exclure scripts

<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
        <configuration>
        <excludes>
            <exclude>scripts/**</exclude>
        </excludes>
        </configuration>			    
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



  mvn clean verify

  rapport dans 
    target/site/jacoco/index.html