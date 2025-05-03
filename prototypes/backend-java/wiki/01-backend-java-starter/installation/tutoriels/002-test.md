apres rajout du test

PersonsServletTest.java


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
        PersonsServlet servlet = new PersonsServlet();
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



  mvn clean
  mvn compile
  mvn test
  
  mvn clean test jacoco:report


  mvn -Dtest=PersonServletTest test