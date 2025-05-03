# prompt

dans ce projet backend-java21-maven

avec 

Eclipse
Maven


j'ai ce code


Person.java
package com.example;

public class Person {
    private String name;

    public Person() {}

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


PersonServlet.java

package com.example;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PersonServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Person> persons = List.of(
            new Person("Christopher Nolan"),
            new Person("Steven Spielberg"),
            new Person("Quentin Tarantino"),
            new Person("Martin Scorsese"),
            new Person("Denis Villeneuve"),
            new Person("David Fincher"),
            new Person("Ridley Scott")
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), persons);
    }
}




je vexu faire un test
puis rajouter du coverage