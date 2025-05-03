dans 
package com.ganatan.modules.person;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/persons")
public class PersonController extends HttpServlet {

    private final PersonService personService;

    public PersonController() {
        PersonRepository repository = new PersonRepository(true);
        this.personService = new PersonService(repository);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<Person> items = personService.getItems();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), items);
    }
}

comment avoir une variable
        PersonRepository repository = new PersonRepository(true);

à la place de true et qui serait dans un fichier ENV comme en javascript