donc mon code


PersonsServlet.java

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
public class PersonsServlet extends HttpServlet {
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


Person.java
package com.ganatan.servlets;

public class Person {
    private int id;
    private String name;
    private String city;

    public Person(int id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getCity() { return city; }
}


donne moi un test pour cette servlet



Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.
