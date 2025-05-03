mon code backend-java-starter

mon architecture

- src
  - main
    - java
      - com
        - ganatan
          - servlets
            - City.java
            - CityServlet.java
            - Person.java
            - PersonServlet.java
            - RootServlet.java
          - tools
            - GenerateProjectStructure.java
    - resources
    - webapp
      - WEB-INF
        - web.xml
  - test
    - java
      - com
        - ganatan
          - servlets
            - PersonsServletTest.java
          - tools
            - GenerateProjectStructureTest.java
    - resources


PersonServlet.java
package com.ganatan.servlets;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/persons")
public class PersonServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Person> persons = Arrays.asList(
            new Person(1, "Steven Spielberg", "Cincinnati"),
            new Person(2, "Christopher Nolan", "London"),
            new Person(3, "Martin Scorsese", "New York"),
            new Person(4, "Quentin Tarantino", "Knoxville")
        );
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), persons);
    }
}


PersonServletTest.java

package com.ganatan.servlets;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import static org.junit.jupiter.api.Assertions.*;

class PersonsServletTest {

    @Test
    void shouldReturnJsonResponse() throws Exception {
        PersonServlet servlet = new PersonServlet();
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter responseWriter = new StringWriter();

        Mockito.when(response.getWriter()).thenReturn(new PrintWriter(responseWriter));

        servlet.doGet(request, response);

        String json = responseWriter.toString();
        assertTrue(json.contains("\"name\":\"Steven Spielberg\""));
        assertTrue(json.contains("\"city\":\"Cincinnati\""));
        assertTrue(json.contains("\"name\":\"Quentin Tarantino\""));
    }
}


et mon coverage

backend-java-starter
Element	Missed Instructions	Cov.	Missed Branches	Cov.	Missed	Cxty	Missed	Lines	Missed	Methods	Missed	Classes
Total	115 of 249	53 %	3 of 10	70 %	11	21	26	52	8	16	3	6
com.ganatan.servlets	10778	42 %		n/a	7	13	23	37	7	13	3	5
com.ganatan.tools	856	87 %	37	70 %	4	8	3	15	1	3	0	1



que faire pour improve mon coverage

Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

