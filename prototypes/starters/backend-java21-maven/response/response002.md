# response

ajout dans pom.xml


<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.10.0</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.mockito</groupId>
  <artifactId>mockito-core</artifactId>
  <version>5.11.0</version>
  <scope>test</scope>
</dependency>


Test unitaire


PersonServletTest.java


package com.example;

import jakarta.servlet.http.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.*;

class PersonServletTest {

    @Test
    void testDoGet_returnsJson() throws Exception {
        PersonServlet servlet = new PersonServlet();

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);

        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        Mockito.when(response.getWriter()).thenReturn(writer);

        servlet.doGet(request, response);

        writer.flush();
        String json = stringWriter.toString();

        assertTrue(json.contains("Christopher Nolan"));
        assertTrue(json.contains("Steven Spielberg"));
        assertTrue(json.startsWith("["));
        assertTrue(json.endsWith("]"));
    }
}


coverage

dans pom.xml

<plugin>
  <groupId>org.jacoco</groupId>
  <artifactId>jacoco-maven-plugin</artifactId>
  <version>0.8.11</version>
  <executions>
    <execution>
      <goals>
        <goal>prepare-agent</goal>
      </goals>
    </execution>
    <execution>
      <id>report</id>
      <phase>test</phase>
      <goals>
        <goal>report</goal>
      </goals>
    </execution>
  </executions>
</plugin>


mvn clean test


rapport dans 

target/site/jacoco/index.html